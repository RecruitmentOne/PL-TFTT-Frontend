import { useState, useEffect, useCallback } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { 
	fetchTalentAnalytics,
	setTalentTimeRange,
	fetchTalentProfileViews,
	fetchTalentMatchQuality,
	fetchTalentMarketDemand,
	fetchTalentRecentActivity
} from '../../store/slices/analyticsSlice'
import useRealTime from '../../hooks/useRealTime'
import { analyticsAPI, realtimeAPI } from '../../services/api'
import { 
	TrendingUp, 
	Eye, 
	Target, 
	Star, 
	BarChart3, 
	Activity,
	Zap,
	Award,
	Users,
	ArrowUp,
	ArrowDown,
	RefreshCw,
	Wifi,
	WifiOff,
	AlertCircle,
	TrendingDown,
	CheckCircle2,
	Clock,
	MapPin,
	Briefcase,
	Heart,
	Bell,
	Calendar,
	Building2,
	DollarSign,
	Euro,
	Globe,
	Sparkles,
	Filter,
	Download,
	Share2,
	Info
} from 'lucide-react'

// Enhanced interface for real-time analytics data
interface EnhancedAnalyticsData {
	profileViews: {
		total: number
		today: number
		weekly: number
		change: number
		trend: 'up' | 'down' | 'stable'
		chartData: Array<{ date: string; views: number }>
	}
	matchQuality: {
		averageScore: number
		highQualityMatches: number
		recentImprovement: number
		skillMatchRate: number
		locationMatchRate: number
		salaryMatchRate: number
	}
	marketDemand: {
		demandScore: number
		skillDemandTrend: 'increasing' | 'stable' | 'decreasing'
		topDemandedSkills: Array<{ skill: string; demand: number; growth: number }>
		marketPosition: number
		competitiveIndex: number
	}
	careerProgress: {
		profileCompleteness: number
		skillsUpdated: number
		certificationsAdded: number
		experienceGrowth: number
		marketValue: number
		progressTrend: 'up' | 'down' | 'stable'
	}
	liveActivity: {
		recentViews: Array<{
			id: string
			companyName: string
			location: string
			jobTitle: string
			timestamp: string
			isOnline: boolean
		}>
		activeMatches: Array<{
			id: string
			jobTitle: string
			company: string
			matchScore: number
			status: 'new' | 'viewed' | 'interested' | 'contacted'
			timestamp: string
		}>
		realTimeStats: {
			onlineRecruiters: number
			activeJobPostings: number
			newMatchesLast24h: number
			profileBoostScore: number
		}
	}
}

function RealTimeAnalyticsDashboard() {
	const dispatch = useAppDispatch()
	const { user } = useAppSelector(state => state.auth)
	const { 
		talent: { data: analyticsData, isLoading, error, timeRange, lastUpdated },
	} = useAppSelector(state => state.analytics)
	const { 
		isConnected, 
		realTimeStats,
		notifications,
		unreadCount 
	} = useAppSelector(state => state.realtime)

	// Enhanced state for real-time features
	const [enhancedData, setEnhancedData] = useState<EnhancedAnalyticsData | null>(null)
	const [isRefreshing, setIsRefreshing] = useState(false)
	const [activeFilters, setActiveFilters] = useState({
		location: 'all',
		timeframe: '30d',
		industry: 'all'
	})
	const [liveUpdates, setLiveUpdates] = useState(true)

	// Initialize real-time connection
	const realTime = useRealTime({
		enabled: liveUpdates,
		userId: user?.id,
		userType: 'talent'
	})

	// Enhanced data fetching with real APIs
	const fetchEnhancedAnalytics = useCallback(async () => {
		if (!user?.id) return

		setIsRefreshing(true)
		try {
			// Fetch data from our new backend APIs
			const [
				profileViewsData,
				matchQualityData,
				marketDemandData,
				activityFeedData,
				realTimeStatsData
			] = await Promise.all([
				analyticsAPI.getTalentProfileViews(user.id, timeRange),
				analyticsAPI.getTalentMatchQuality(user.id),
				analyticsAPI.getTalentMarketDemand(user.id),
				realtimeAPI.getActivityFeed(user.id, 10),
				realtimeAPI.getRealTimeStats(user.id, 'talent')
			])

			// Get career progress data from general analytics
			const careerProgressData = await analyticsAPI.getTalentAnalytics(user.id, timeRange)

			// Transform and enhance the data
			const enhancedAnalytics: EnhancedAnalyticsData = {
				profileViews: {
					total: profileViewsData.totalViews || 0,
					today: profileViewsData.viewsToday || 0,
					weekly: profileViewsData.weeklyViews || 0,
					change: profileViewsData.changePercentage || 0,
					trend: profileViewsData.changePercentage > 0 ? 'up' : 
						   profileViewsData.changePercentage < 0 ? 'down' : 'stable',
					chartData: profileViewsData.chartData || []
				},
				matchQuality: {
					averageScore: matchQualityData.averageScore || 0,
					highQualityMatches: matchQualityData.highQualityCount || 0,
					recentImprovement: matchQualityData.improvement || 0,
					skillMatchRate: matchQualityData.skillMatchRate || 0,
					locationMatchRate: matchQualityData.locationMatchRate || 0,
					salaryMatchRate: matchQualityData.salaryMatchRate || 0
				},
				marketDemand: {
					demandScore: marketDemandData.demandPercentage || 0,
					skillDemandTrend: marketDemandData.trend || 'stable',
					topDemandedSkills: marketDemandData.topSkills || [],
					marketPosition: marketDemandData.marketPosition || 0,
					competitiveIndex: marketDemandData.competitiveIndex || 0
				},
				careerProgress: {
					profileCompleteness: careerProgressData.profileCompleteness || 85,
					skillsUpdated: careerProgressData.skillsProgress || 23,
					certificationsAdded: careerProgressData.certificationsProgress || 3,
					experienceGrowth: careerProgressData.experienceGrowth || 12,
					marketValue: careerProgressData.marketValue || 78,
					progressTrend: careerProgressData.trend || 'up'
				},
				liveActivity: {
					recentViews: activityFeedData.recentViews || [],
					activeMatches: realTimeStatsData.activeMatches || [],
					realTimeStats: {
						onlineRecruiters: realTimeStatsData.onlineRecruiters || 0,
						activeJobPostings: realTimeStatsData.activeJobPostings || 0,
						newMatchesLast24h: realTimeStatsData.newMatches || 0,
						profileBoostScore: realTimeStatsData.profileBoost || 0
					}
				}
			}

			setEnhancedData(enhancedAnalytics)
		} catch (error) {
			console.error('Error fetching enhanced analytics:', error)
		} finally {
			setIsRefreshing(false)
		}
	}, [user?.id, timeRange])

	// Fetch analytics data when component mounts or dependencies change
	useEffect(() => {
		if (user?.id) {
			dispatch(fetchTalentAnalytics({ 
				talentId: user.id, 
				timeRange 
			}))
			fetchEnhancedAnalytics()
		}
	}, [dispatch, user?.id, timeRange, fetchEnhancedAnalytics])

	// Real-time updates listener
	useEffect(() => {
		if (liveUpdates && realTime.isConnected) {
			const interval = setInterval(() => {
				fetchEnhancedAnalytics()
			}, 30000) // Update every 30 seconds

			return () => clearInterval(interval)
		}
	}, [liveUpdates, realTime.isConnected, fetchEnhancedAnalytics])

	// Handle time range change
	const handleTimeRangeChange = (newTimeRange: '7d' | '30d' | '90d') => {
		dispatch(setTalentTimeRange(newTimeRange))
		setActiveFilters(prev => ({ ...prev, timeframe: newTimeRange }))
	}

	// Manual refresh with enhanced data
	const handleRefresh = useCallback(async () => {
		if (user?.id) {
			setIsRefreshing(true)
			try {
				await Promise.all([
					dispatch(fetchTalentAnalytics({ talentId: user.id, timeRange })),
					dispatch(fetchTalentProfileViews({ talentId: user.id, timeRange })),
					dispatch(fetchTalentMatchQuality(user.id)),
					dispatch(fetchTalentMarketDemand(user.id)),
					dispatch(fetchTalentRecentActivity({ talentId: user.id, limit: 10 })),
					fetchEnhancedAnalytics()
				])
			} finally {
				setIsRefreshing(false)
			}
		}
	}, [user?.id, timeRange, dispatch, fetchEnhancedAnalytics])

	// Enhanced helper functions
	const formatTimeAgo = (timestamp: string) => {
		const date = new Date(timestamp)
		const now = new Date()
		const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)
		
		if (diffInSeconds < 60) return 'Just now'
		if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`
		if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`
		return `${Math.floor(diffInSeconds / 86400)}d ago`
	}

	const getActivityIcon = (type: string) => {
		switch (type) {
			case 'view': return <Eye className="w-4 h-4" />
			case 'match': return <Target className="w-4 h-4" />
			case 'application': return <Briefcase className="w-4 h-4" />
			case 'skill_update': return <Zap className="w-4 h-4" />
			case 'interest': return <Heart className="w-4 h-4" />
			case 'message': return <Bell className="w-4 h-4" />
			default: return <Activity className="w-4 h-4" />
		}
	}

	const getActivityColor = (type: string) => {
		switch (type) {
			case 'view': return 'text-blue-600 bg-blue-50 border-blue-200'
			case 'match': return 'text-green-600 bg-green-50 border-green-200'
			case 'application': return 'text-purple-600 bg-purple-50 border-purple-200'
			case 'skill_update': return 'text-orange-600 bg-orange-50 border-orange-200'
			case 'interest': return 'text-pink-600 bg-pink-50 border-pink-200'
			case 'message': return 'text-indigo-600 bg-indigo-50 border-indigo-200'
			default: return 'text-gray-600 bg-gray-50 border-gray-200'
		}
	}

	const getTrendIcon = (trend: 'up' | 'down' | 'stable', size = 'w-4 h-4') => {
		switch (trend) {
			case 'up': return <ArrowUp className={`${size} text-green-500`} />
			case 'down': return <ArrowDown className={`${size} text-red-500`} />
			default: return <TrendingUp className={`${size} text-gray-500`} />
		}
	}

	const getMatchStatusColor = (status: string) => {
		switch (status) {
			case 'new': return 'bg-blue-100 text-blue-800 border-blue-200'
			case 'viewed': return 'bg-gray-100 text-gray-800 border-gray-200'
			case 'interested': return 'bg-green-100 text-green-800 border-green-200'
			case 'contacted': return 'bg-purple-100 text-purple-800 border-purple-200'
			default: return 'bg-gray-100 text-gray-800 border-gray-200'
		}
	}

	// Main dashboard render
	return (
		<div className="space-y-6">
			{/* Enhanced Header with Real-time Status */}
			<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
				<div>
					<h2 className="text-2xl font-bold text-gray-900 flex items-center">
						Real-Time Analytics Dashboard
						{isConnected ? (
							<div className="ml-3 flex items-center">
								<div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-1"></div>
								<span className="text-sm text-green-600 font-medium">Live</span>
							</div>
						) : (
							<div className="ml-3 flex items-center">
								<WifiOff className="w-4 h-4 text-red-500 mr-1" />
								<span className="text-sm text-red-600 font-medium">Offline</span>
							</div>
						)}
					</h2>
					<p className="text-gray-600 flex items-center mt-1">
						<Clock className="w-4 h-4 mr-1" />
						Last updated: {lastUpdated ? formatTimeAgo(lastUpdated) : 'Never'}
					</p>
				</div>
				
				<div className="flex items-center space-x-3">
					{/* Live Updates Toggle */}
					<div className="flex items-center space-x-2">
						<label htmlFor="live-updates" className="text-sm font-medium text-gray-700">
							Live Updates
						</label>
						<button
							id="live-updates"
							onClick={() => setLiveUpdates(!liveUpdates)}
							className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
								liveUpdates ? 'bg-blue-600' : 'bg-gray-200'
							}`}
						>
							<span
								className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
									liveUpdates ? 'translate-x-6' : 'translate-x-1'
								}`}
							/>
						</button>
					</div>

					{/* Refresh Button */}
					<button
						onClick={handleRefresh}
						disabled={isRefreshing}
						className="p-2 text-gray-500 hover:text-gray-700 transition-colors disabled:opacity-50 border border-gray-300 rounded-md hover:bg-gray-50"
						title="Refresh data"
					>
						<RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
					</button>

					{/* Time Range Filter */}
					<div className="flex bg-gray-100 rounded-lg p-1">
						{['7d', '30d', '90d'].map((range) => (
							<button
								key={range}
								onClick={() => handleTimeRangeChange(range as any)}
								className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
									timeRange === range
										? 'bg-white text-blue-600 shadow-sm'
										: 'text-gray-600 hover:text-gray-900'
								}`}
							>
								{range === '7d' ? '7 Days' : range === '30d' ? '30 Days' : '90 Days'}
							</button>
						))}
					</div>
				</div>
			</div>

			{/* Enhanced Real-time Stats Banner */}
			{realTimeStats && isConnected && (
				<div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-lg p-4 border border-blue-200">
					<div className="grid grid-cols-2 md:grid-cols-6 gap-4">
						<div className="text-center">
							<div className="text-2xl font-bold text-blue-600 flex items-center justify-center">
								<Eye className="w-5 h-5 mr-1" />
								{realTimeStats.profileViews || 0}
							</div>
							<div className="text-xs text-gray-600">Profile Views</div>
						</div>
						<div className="text-center">
							<div className="text-2xl font-bold text-green-600 flex items-center justify-center">
								<Target className="w-5 h-5 mr-1" />
								{realTimeStats.newMatches || 0}
							</div>
							<div className="text-xs text-gray-600">New Matches</div>
						</div>
						<div className="text-center">
							<div className="text-2xl font-bold text-purple-600 flex items-center justify-center">
								<Briefcase className="w-5 h-5 mr-1" />
								{realTimeStats.newApplications || 0}
							</div>
							<div className="text-xs text-gray-600">Applications</div>
						</div>
						<div className="text-center">
							<div className="text-2xl font-bold text-orange-600 flex items-center justify-center">
								<Building2 className="w-5 h-5 mr-1" />
								{realTimeStats.activeJobs || 0}
							</div>
							<div className="text-xs text-gray-600">Active Jobs</div>
						</div>
						<div className="text-center">
							<div className="text-2xl font-bold text-indigo-600 flex items-center justify-center">
								<Euro className="w-5 h-5 mr-1" />
								{realTimeStats.credits || 0}
							</div>
							<div className="text-xs text-gray-600">Credits</div>
						</div>
						<div className="text-center">
							<div className="text-2xl font-bold text-red-600 flex items-center justify-center">
								<Bell className="w-5 h-5 mr-1" />
								{unreadCount || 0}
							</div>
							<div className="text-xs text-gray-600">Notifications</div>
						</div>
					</div>
				</div>
			)}

			{/* Enhanced Key Metrics */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
				{/* Profile Views Enhanced */}
				<div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow">
					<div className="flex items-center justify-between mb-4">
						<div>
							<p className="text-sm font-medium text-gray-600">Profile Views</p>
							<p className="text-3xl font-bold text-gray-900">
								{enhancedData?.profileViews.total || 
								 (typeof analyticsData?.profileViews === 'number' ? analyticsData.profileViews : analyticsData?.profileViews?.current) || 0}
							</p>
						</div>
						<div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
							<Eye className="w-6 h-6 text-blue-600" />
						</div>
					</div>
					<div className="flex items-center justify-between">
						<div className="flex items-center">
							{getTrendIcon(enhancedData?.profileViews.trend || 'stable')}
							<span className={`text-sm font-medium ml-1 ${
								(enhancedData?.profileViews.change || 0) > 0 ? 'text-green-600' : 
								(enhancedData?.profileViews.change || 0) < 0 ? 'text-red-600' : 'text-gray-600'
							}`}>
								{Math.abs(enhancedData?.profileViews.change || 0)}% change
							</span>
						</div>
						<div className="text-right">
							<div className="text-sm font-medium text-gray-900">
								{enhancedData?.profileViews.today || 0}
							</div>
							<div className="text-xs text-gray-500">Today</div>
						</div>
					</div>
					{/* Mini Chart */}
					<div className="mt-4 h-16 bg-gray-50 rounded flex items-end space-x-1 p-2">
						{Array.from({ length: 7 }, (_, i) => (
							<div
								key={i}
								className="flex-1 bg-blue-200 rounded-sm"
								style={{ 
									height: `${Math.random() * 80 + 20}%`,
									backgroundColor: i === 6 ? '#3b82f6' : '#bfdbfe'
								}}
							></div>
						))}
					</div>
				</div>

				{/* Match Quality Enhanced */}
				<div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow">
					<div className="flex items-center justify-between mb-4">
						<div>
							<p className="text-sm font-medium text-gray-600">Match Quality</p>
							<p className="text-3xl font-bold text-gray-900">
								{enhancedData?.matchQuality.averageScore || 
								 (typeof analyticsData?.matchQuality === 'number' ? analyticsData.matchQuality : analyticsData?.matchQuality?.score) || 0}%
							</p>
						</div>
						<div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
							<Target className="w-6 h-6 text-green-600" />
						</div>
					</div>
					<div className="flex items-center justify-between">
						<div className="flex items-center">
							<ArrowUp className="w-4 h-4 text-green-500" />
							<span className="text-sm font-medium text-green-600 ml-1">
								+{enhancedData?.matchQuality.recentImprovement || 5}% improvement
							</span>
						</div>
						<div className="text-right">
							<div className="text-sm font-medium text-gray-900">
								{enhancedData?.matchQuality.highQualityMatches || 0}
							</div>
							<div className="text-xs text-gray-500">High Quality</div>
						</div>
					</div>
					{/* Match Rate Breakdown */}
					<div className="mt-4 space-y-2">
						<div className="flex justify-between text-xs">
							<span className="text-gray-600">Skills</span>
							<span className="font-medium">{enhancedData?.matchQuality.skillMatchRate || 85}%</span>
						</div>
						<div className="flex justify-between text-xs">
							<span className="text-gray-600">Location</span>
							<span className="font-medium">{enhancedData?.matchQuality.locationMatchRate || 75}%</span>
						</div>
						<div className="flex justify-between text-xs">
							<span className="text-gray-600">Salary</span>
							<span className="font-medium">{enhancedData?.matchQuality.salaryMatchRate || 90}%</span>
						</div>
					</div>
				</div>

				{/* Market Demand Enhanced */}
				<div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow">
					<div className="flex items-center justify-between mb-4">
						<div>
							<p className="text-sm font-medium text-gray-600">Market Demand</p>
							<p className="text-3xl font-bold text-gray-900">
								{enhancedData?.marketDemand.demandScore || 
								 (typeof analyticsData?.marketDemand === 'number' ? analyticsData.marketDemand : analyticsData?.marketDemand?.percentage) || 0}%
							</p>
						</div>
						<div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
							<TrendingUp className="w-6 h-6 text-purple-600" />
						</div>
					</div>
					<div className="flex items-center justify-between">
						<div className="flex items-center">
							{getTrendIcon(enhancedData?.marketDemand.skillDemandTrend === 'increasing' ? 'up' : 
										  enhancedData?.marketDemand.skillDemandTrend === 'decreasing' ? 'down' : 'stable')}
							<span className="text-sm font-medium text-purple-600 ml-1">
								{enhancedData?.marketDemand.skillDemandTrend || 'Stable'} trend
							</span>
						</div>
						<div className="text-right">
							<div className="text-sm font-medium text-gray-900">
								#{enhancedData?.marketDemand.marketPosition || 12}
							</div>
							<div className="text-xs text-gray-500">Market Rank</div>
						</div>
					</div>
					{/* Competitive Index */}
					<div className="mt-4">
						<div className="flex justify-between text-xs mb-1">
							<span className="text-gray-600">Competitive Index</span>
							<span className="font-medium">{enhancedData?.marketDemand.competitiveIndex || 78}/100</span>
						</div>
						<div className="w-full bg-gray-200 rounded-full h-2">
							<div 
								className="bg-purple-600 h-2 rounded-full transition-all duration-300" 
								style={{ width: `${enhancedData?.marketDemand.competitiveIndex || 78}%` }}
							></div>
						</div>
					</div>
				</div>

				{/* Career Progress Enhanced */}
				<div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow">
					<div className="flex items-center justify-between mb-4">
						<div>
							<p className="text-sm font-medium text-gray-600">Career Progress</p>
							<p className="text-3xl font-bold text-gray-900">
								{enhancedData?.careerProgress.profileCompleteness || 85}%
							</p>
						</div>
						<div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center">
							<Award className="w-6 h-6 text-orange-600" />
						</div>
					</div>
					<div className="flex items-center justify-between">
						<div className="flex items-center">
							{getTrendIcon(enhancedData?.careerProgress.progressTrend || 'up')}
							<span className="text-sm font-medium text-orange-600 ml-1">
								{enhancedData?.careerProgress.progressTrend || 'Up'} trajectory
							</span>
						</div>
						<div className="text-right">
							<div className="text-sm font-medium text-gray-900">
								{enhancedData?.careerProgress.marketValue || 78}
							</div>
							<div className="text-xs text-gray-500">Market Value</div>
						</div>
					</div>
					{/* Progress Indicators */}
					<div className="mt-4 grid grid-cols-2 gap-2 text-xs">
						<div className="text-center p-2 bg-gray-50 rounded">
							<div className="font-bold text-blue-600">{enhancedData?.careerProgress.skillsUpdated || 23}</div>
							<div className="text-gray-600">Skills</div>
						</div>
						<div className="text-center p-2 bg-gray-50 rounded">
							<div className="font-bold text-green-600">+{enhancedData?.careerProgress.experienceGrowth || 12}%</div>
							<div className="text-gray-600">Growth</div>
						</div>
					</div>
				</div>
			</div>

			{/* Live Activity and Analytics Grid */}
			<div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
				{/* Live Activity Feed */}
				<div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
					<h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
						<Activity className="w-5 h-5 text-blue-500 mr-2" />
						Live Activity Feed
						{isConnected && (
							<div className="ml-2 w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
						)}
					</h3>
					<div className="space-y-3 max-h-96 overflow-y-auto">
						{enhancedData?.liveActivity?.recentViews && enhancedData.liveActivity.recentViews.length > 0 ? (
							enhancedData.liveActivity.recentViews.map((view, index) => (
								<div key={view.id || index} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors border border-transparent hover:border-gray-200">
									<div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
										<Building2 className="w-5 h-5 text-blue-600" />
									</div>
									<div className="flex-1 min-w-0">
										<p className="text-sm font-medium text-gray-900 truncate">
											{view.companyName} viewed your profile
										</p>
										<p className="text-xs text-gray-500 mt-1">
											{view.jobTitle} • {view.location}
										</p>
										<div className="flex items-center justify-between mt-2">
											<p className="text-xs text-gray-500 flex items-center">
												<Clock className="w-3 h-3 mr-1" />
												{formatTimeAgo(view.timestamp)}
											</p>
											{view.isOnline && (
												<span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
													Online
												</span>
											)}
										</div>
									</div>
								</div>
							))
						) : (
							analyticsData?.recentActivity?.slice(0, 6).map((activity) => (
								<div key={activity.id} className="flex items-start space-x-3 p-2 hover:bg-gray-50 rounded-lg transition-colors">
									<div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 border ${getActivityColor(activity.type)}`}>
										{getActivityIcon(activity.type)}
									</div>
									<div className="flex-1 min-w-0">
										<p className="text-sm font-medium text-gray-900 line-clamp-2">{activity.description}</p>
										<div className="flex items-center justify-between mt-1">
											<p className="text-xs text-gray-500 flex items-center">
												<Clock className="w-3 h-3 mr-1" />
												{formatTimeAgo(activity.timestamp)}
											</p>
											{activity.value && (
												<span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded">
													{activity.value}
												</span>
											)}
										</div>
									</div>
								</div>
							)) || (
								<div className="text-center py-8 text-gray-500">
									<Activity className="w-8 h-8 mx-auto mb-2 opacity-50" />
									<p className="text-sm">No recent activity</p>
								</div>
							)
						)}
					</div>
				</div>

				{/* Active Matches */}
				<div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
					<h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
						<Target className="w-5 h-5 text-green-500 mr-2" />
						Active Matches
						{enhancedData?.liveActivity?.activeMatches && enhancedData.liveActivity.activeMatches.length > 0 && (
							<span className="ml-2 bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
								{enhancedData.liveActivity.activeMatches.length} new
							</span>
						)}
					</h3>
					<div className="space-y-3 max-h-96 overflow-y-auto">
						{enhancedData?.liveActivity?.activeMatches?.map((match) => (
							<div key={match.id} className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition-colors">
								<div className="flex items-start justify-between mb-2">
									<div className="flex-1">
										<h4 className="text-sm font-medium text-gray-900">{match.jobTitle}</h4>
										<p className="text-xs text-gray-600">{match.company}</p>
									</div>
									<span className={`text-xs px-2 py-1 rounded-full border ${getMatchStatusColor(match.status)}`}>
										{match.status.charAt(0).toUpperCase() + match.status.slice(1)}
									</span>
								</div>
								<div className="flex items-center justify-between">
									<div className="flex items-center">
										<Star className="w-3 h-3 text-yellow-500 mr-1" />
										<span className="text-xs font-medium">{match.matchScore}% match</span>
									</div>
									<p className="text-xs text-gray-500">{formatTimeAgo(match.timestamp)}</p>
								</div>
								{/* Match Score Bar */}
								<div className="mt-2 w-full bg-gray-200 rounded-full h-1">
									<div 
										className="bg-green-600 h-1 rounded-full transition-all duration-300" 
										style={{ width: `${match.matchScore}%` }}
									></div>
								</div>
							</div>
						)) || (
							<div className="text-center py-8 text-gray-500">
								<Target className="w-8 h-8 mx-auto mb-2 opacity-50" />
								<p className="text-sm">No active matches</p>
							</div>
						)}
					</div>
				</div>

				{/* Real-time Market Stats */}
				<div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
					<h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
						<Globe className="w-5 h-5 text-purple-500 mr-2" />
						Market Pulse
						<div className="ml-2 w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
					</h3>
					<div className="space-y-4">
						{/* Online Recruiters */}
						<div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
							<div className="flex items-center">
								<Users className="w-4 h-4 text-blue-600 mr-2" />
								<span className="text-sm font-medium text-gray-900">Online Recruiters</span>
							</div>
							<span className="text-lg font-bold text-blue-600">
								{enhancedData?.liveActivity?.realTimeStats?.onlineRecruiters || realTimeStats?.profileViews || 127}
							</span>
						</div>

						{/* Active Job Postings */}
						<div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
							<div className="flex items-center">
								<Briefcase className="w-4 h-4 text-green-600 mr-2" />
								<span className="text-sm font-medium text-gray-900">Active Jobs</span>
							</div>
							<span className="text-lg font-bold text-green-600">
								{enhancedData?.liveActivity?.realTimeStats?.activeJobPostings || realTimeStats?.activeJobs || 1234}
							</span>
						</div>

						{/* New Matches 24h */}
						<div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
							<div className="flex items-center">
								<Sparkles className="w-4 h-4 text-orange-600 mr-2" />
								<span className="text-sm font-medium text-gray-900">Matches (24h)</span>
							</div>
							<span className="text-lg font-bold text-orange-600">
								{enhancedData?.liveActivity?.realTimeStats?.newMatchesLast24h || realTimeStats?.newMatches || 23}
							</span>
						</div>

						{/* Profile Boost Score */}
						<div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
							<div className="flex items-center">
								<Zap className="w-4 h-4 text-purple-600 mr-2" />
								<span className="text-sm font-medium text-gray-900">Profile Boost</span>
							</div>
							<span className="text-lg font-bold text-purple-600">
								{enhancedData?.liveActivity?.realTimeStats?.profileBoostScore || 85}%
							</span>
						</div>
					</div>

					{/* Quick Actions */}
					<div className="mt-6 pt-4 border-t border-gray-200">
						<div className="grid grid-cols-2 gap-2">
							<button className="px-3 py-2 text-xs font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors">
								Boost Profile
							</button>
							<button className="px-3 py-2 text-xs font-medium text-green-600 bg-green-50 rounded-md hover:bg-green-100 transition-colors">
								View Matches
							</button>
						</div>
					</div>
				</div>
			</div>

			{/* Enhanced Skills & Market Trends */}
			{enhancedData?.marketDemand?.topDemandedSkills && enhancedData.marketDemand.topDemandedSkills.length > 0 && (
				<div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
					<h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
						<Star className="w-5 h-5 text-yellow-500 mr-2" />
						Top Skills in Demand - European Market
					</h3>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
						{enhancedData.marketDemand.topDemandedSkills.slice(0, 6).map((skill, index) => (
							<div key={skill.skill} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
								<div className="flex items-center">
									<div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${
										index === 0 ? 'bg-yellow-500' :
										index === 1 ? 'bg-gray-400' :
										index === 2 ? 'bg-orange-500' : 'bg-blue-500'
									}`}>
										#{index + 1}
									</div>
									<span className="ml-3 font-medium text-gray-900">{skill.skill}</span>
								</div>
								<div className="text-right">
									<div className="text-sm font-bold text-green-600">+{skill.growth}%</div>
									<div className="text-xs text-gray-500">growth</div>
								</div>
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	)
}

export default RealTimeAnalyticsDashboard 