import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import DashboardLayoutWithSidebar from '../../../components/layout/DashboardLayoutWithSidebar'
import WebSocketProvider from '../../../components/talent-dashboard/WebSocketProvider'
import RealTimeActivityFeed from '../../../components/talent-dashboard/RealTimeActivityFeed'
import LiveNotificationCenter from '../../../components/talent-dashboard/LiveNotificationCenter'
import LiveChatWidget from '../../../components/talent-dashboard/LiveChatWidget'
import RealTimeConnectionManager from '../../../components/talent-dashboard/RealTimeConnectionManager'
import AdvancedAnalyticsHub from '../../../components/talent-dashboard/AdvancedAnalyticsHub'
import AICareerAdvisory from '../../../components/talent-dashboard/AICareerAdvisory'
import SmartMatchingEngine from '../../../components/talent-dashboard/SmartMatchingEngine'
import IntelligentSkillAssessment from '../../../components/talent-dashboard/IntelligentSkillAssessment'
import RealTimeAnalyticsDashboard from '../../../components/talent-dashboard/RealTimeAnalyticsDashboard'
import PerformanceMonitoringDashboard from '../../../components/talent-dashboard/PerformanceMonitoringDashboard'
import { useAppSelector, useAppDispatch } from '../../../store/hooks'
import { fetchTalentAnalytics } from '../../../store/slices/analyticsSlice'
import { fetchNotifications, fetchLiveMatches, fetchRealTimeStats } from '../../../store/slices/realtimeSlice'
import { useRealTime } from '../../../hooks/useRealTime'
import { useBrand, useBrandColors } from '../../../brand'
import { 
	BrandedH1, 
	BrandedH2, 
	BrandedH3, 
	BrandedP, 
	BrandedSpan,
	BrandedCard,
	BrandedSection 
} from '../../../components/brand'
import { 
	TrendingUp, 
	Eye, 
	Heart, 
	Star, 
	Users, 
	ArrowUpRight,
	ChevronRight,
	MapPin,
	Calendar,
	Clock,
	CheckCircle2,
	ExternalLink,
	BarChart3,
	Sparkles,
	Target,
	Award,
	Building2,
	DollarSign,
	Briefcase,
	Euro,
	Brain,
	Zap,
	Activity,
	Settings,
	TrendingDown,
	Bell,
	MessageCircle,
	RefreshCw,
	AlertCircle,
	CheckCircle,
	PlayCircle
} from 'lucide-react'

function TalentDashboard() {
	const navigate = useNavigate()
	const { t } = useTranslation()
	const dispatch = useAppDispatch()
	const { switchVariant } = useBrand()
	const colors = useBrandColors()
	const searchParams = useSearchParams()[0]

	// Redux state
	const { user } = useAppSelector((state) => state.auth)
	const { talent: talentAnalytics } = useAppSelector((state) => state.analytics)
	const { 
		notifications, 
		liveMatches, 
		realTimeStats, 
		isConnected,
		unreadCount 
	} = useAppSelector((state) => state.realtime)

	// Local state
	const [refreshing, setRefreshing] = useState(false)
	const [selectedTab, setSelectedTab] = useState(() => {
		return searchParams.get('tab') || 'overview'
	})

	// Handle tab changes from URL
	useEffect(() => {
		const urlTab = searchParams.get('tab') || 'overview'
		setSelectedTab(urlTab)
	}, [searchParams])

	// Real-time hook
	const { isConnected: rtConnected } = useRealTime({
		enabled: true,
		userId: user?.id,
		userType: 'talent',
		autoReconnect: true
	})

	// Set brand variant to talent
	useEffect(() => {
		switchVariant('talent')
	}, [switchVariant])

	// Fetch initial data
	useEffect(() => {
		if (user?.id) {
			dispatch(fetchTalentAnalytics({ talentId: user.id, timeRange: '30d' }))
			dispatch(fetchNotifications({ userId: user.id }))
			dispatch(fetchLiveMatches({ userId: user.id, userType: 'talent' }))
			dispatch(fetchRealTimeStats({ userId: user.id, userType: 'talent' }))
		}
	}, [dispatch, user?.id])

	// Refresh all data
	const handleRefreshData = async () => {
		if (!user?.id || refreshing) return
		
		setRefreshing(true)
		try {
			await Promise.all([
				dispatch(fetchTalentAnalytics({ talentId: user.id, timeRange: '30d' })),
				dispatch(fetchNotifications({ userId: user.id })),
				dispatch(fetchLiveMatches({ userId: user.id, userType: 'talent' })),
				dispatch(fetchRealTimeStats({ userId: user.id, userType: 'talent' }))
			])
		} catch (error) {
			console.error('Error refreshing dashboard data:', error)
		} finally {
			setRefreshing(false)
		}
	}

	// Get quick stats from analytics data
	const quickStats = talentAnalytics.data ? [
		{
			name: 'Profile Views',
			value: talentAnalytics.data.profileViews.current,
			change: `${talentAnalytics.data.profileViews.change > 0 ? '+' : ''}${talentAnalytics.data.profileViews.change}`,
			trend: talentAnalytics.data.profileViews.trend as 'up' | 'down' | 'stable',
			icon: Eye,
			color: 'primary',
			description: 'Companies viewed your profile'
		},
		{
			name: 'Match Quality',
			value: `${talentAnalytics.data.matchQuality.score}%`,
			change: `${talentAnalytics.data.matchQuality.change > 0 ? '+' : ''}${talentAnalytics.data.matchQuality.change}%`,
			trend: talentAnalytics.data.matchQuality.trend as 'up' | 'down' | 'stable',
			icon: Heart,
			color: 'secondary',
			description: 'AI-calculated compatibility score'
		},
		{
			name: 'Market Demand',
			value: `${talentAnalytics.data.marketDemand.percentage}%`,
			change: `${talentAnalytics.data.marketDemand.change > 0 ? '+' : ''}${talentAnalytics.data.marketDemand.change}%`,
			trend: talentAnalytics.data.marketDemand.trend as 'up' | 'down' | 'stable',
			icon: TrendingUp,
			color: 'success',
			description: 'Demand for your skills in the market'
		},
		{
			name: 'Live Matches',
			value: liveMatches.length,
			change: `${realTimeStats?.newMatches || 0} today`,
			trend: 'up' as const,
			icon: Target,
			color: 'warning',
			description: 'Active job matches available'
		}
	] : []

	const getColorForStat = (colorKey: string) => {
		switch (colorKey) {
			case 'primary': return colors.primary
			case 'secondary': return colors.secondary
			case 'success': return '#10B981'
			case 'warning': return '#F59E0B'
			default: return colors.primary
		}
	}

	const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
		switch (trend) {
			case 'up': return <TrendingUp className="w-4 h-4" />
			case 'down': return <TrendingDown className="w-4 h-4" />
			default: return <Activity className="w-4 h-4" />
		}
	}

	const getTrendColor = (trend: 'up' | 'down' | 'stable') => {
		switch (trend) {
			case 'up': return '#10B981'
			case 'down': return '#EF4444'
			default: return colors.text.secondary
		}
	}

	const tabConfig = [
		{ id: 'overview', name: 'Overview', icon: BarChart3, badge: null },
		{ id: 'analytics', name: 'Analytics', icon: TrendingUp, badge: null },
		{ id: 'matches', name: 'Smart Matches', icon: Heart, badge: liveMatches.length > 0 ? liveMatches.length : null },
		{ id: 'career-advisory', name: 'Career Advisory', icon: Brain, badge: null },
		{ id: 'skills', name: 'Skills Assessment', icon: Award, badge: null },
		{ id: 'real-time', name: 'Real-time Feed', icon: Activity, badge: unreadCount > 0 ? unreadCount : null },
		{ id: 'performance', name: 'Performance', icon: Zap, badge: null }
	]

	return (
		<WebSocketProvider autoConnect={import.meta.env.PROD}>
			<DashboardLayoutWithSidebar 
				title={`${t('dashboard.talent.welcome', 'Welcome')}, ${user?.firstName || 'Talent'}!`}
				subtitle={t('dashboard.talent.subtitle', 'Track your profile performance and discover opportunities')}
			>
				<BrandedSection className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
					{/* Development Notice */}
					{!import.meta.env.PROD && (
						<div className="mb-6 p-4 rounded-lg" style={{ backgroundColor: '#FEF3C7', borderColor: '#F59E0B', border: '1px solid' }}>
							<div className="flex items-center space-x-2">
								<div className="w-2 h-2 rounded-full bg-yellow-500" />
								<BrandedSpan className="text-sm font-medium" style={{ color: '#92400e' }}>
									Development Mode: WebSocket disabled. Real-time features use HTTP polling.
								</BrandedSpan>
							</div>
						</div>
					)}

					{/* Header with Real-time Status */}
					<div className="flex items-center justify-between mb-8">
						<div>
							<BrandedH1 className="mb-2">
								{t('dashboard.talent.title', 'Talent Dashboard')}
							</BrandedH1>
							<div className="flex items-center space-x-4">
								<div className="flex items-center space-x-2">
									<div 
										className={`w-2 h-2 rounded-full ${isConnected && rtConnected ? 'bg-green-500' : 'bg-red-500'}`}
									/>
									<BrandedSpan 
										className="text-sm" 
										style={{ color: colors.text.secondary }}
									>
										{isConnected && rtConnected ? 'Real-time Connected' : 'Connecting...'}
									</BrandedSpan>
								</div>
								{realTimeStats && (
									<BrandedSpan 
										className="text-sm" 
										style={{ color: colors.text.secondary }}
									>
										Last updated: {new Date(realTimeStats.lastUpdated).toLocaleTimeString()}
									</BrandedSpan>
								)}
							</div>
						</div>

						<div className="flex items-center space-x-3">
							{/* Refresh */}
							<button
								onClick={handleRefreshData}
								disabled={refreshing}
								className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-colors"
							>
								<RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
								<span>{refreshing ? 'Refreshing...' : 'Refresh'}</span>
							</button>

							{/* Real-time Connection Manager */}
							<RealTimeConnectionManager showDetailed={false} />
						</div>
					</div>

					{/* Tab Navigation */}
					<div className="mb-8">
						<div 
							className="border-b"
							style={{ borderColor: colors.border }}
						>
							<nav className="-mb-px flex space-x-8 overflow-x-auto">
								{tabConfig.map((tab) => {
									const Icon = tab.icon
									return (
										<button
											key={tab.id}
											onClick={() => setSelectedTab(tab.id as any)}
											className="flex items-center space-x-2 py-3 px-1 border-b-2 font-medium text-sm transition-colors whitespace-nowrap relative"
											style={{
												borderBottomColor: selectedTab === tab.id ? colors.primary : 'transparent',
												color: selectedTab === tab.id ? colors.primary : colors.text.secondary
											}}
											onMouseEnter={(e) => {
												if (selectedTab !== tab.id) {
													e.currentTarget.style.color = colors.text.primary
													e.currentTarget.style.borderBottomColor = colors.border
												}
											}}
											onMouseLeave={(e) => {
												if (selectedTab !== tab.id) {
													e.currentTarget.style.color = colors.text.secondary
													e.currentTarget.style.borderBottomColor = 'transparent'
												}
											}}
										>
											<Icon className="w-5 h-5" />
											<span>{tab.name}</span>
											{tab.badge && (
												<span 
													className="ml-2 px-2 py-1 text-xs font-medium rounded-full text-white"
													style={{ backgroundColor: colors.primary }}
												>
													{tab.badge}
												</span>
											)}
										</button>
									)
								})}
							</nav>
						</div>
					</div>

					{/* Tab Content */}
					{selectedTab === 'overview' && (
						<div className="space-y-8">
							{/* Loading State */}
							{talentAnalytics.isLoading ? (
								<div className="flex items-center justify-center py-12">
									<div className="flex items-center space-x-3">
										<RefreshCw className="w-6 h-6 animate-spin" style={{ color: colors.primary }} />
										<BrandedSpan style={{ color: colors.text.secondary }}>
											Loading dashboard data...
										</BrandedSpan>
									</div>
								</div>
							) : (
								<>
									{/* Quick Stats */}
									<div>
										<BrandedH2 className="mb-6">
											{t('dashboard.talent.keyMetrics', 'Performance Overview')}
										</BrandedH2>
										<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
											{quickStats.map((stat, index) => {
												const Icon = stat.icon
												const statColor = getColorForStat(stat.color)
												return (
													<BrandedCard key={index} variant="elevated" padding="lg">
														<div className="flex items-center justify-between">
															<div className="flex-1">
																<BrandedP className="text-sm font-medium mb-2" style={{ color: colors.text.secondary }}>
																	{stat.name}
																</BrandedP>
																<BrandedH3 className="text-2xl font-bold mb-2">
																	{stat.value}
																</BrandedH3>
																<div className="flex items-center mb-2">
																	<div 
																		className="flex items-center mr-2"
																		style={{ color: getTrendColor(stat.trend) }}
																	>
																		{getTrendIcon(stat.trend)}
																	</div>
																	<BrandedSpan 
																		className="text-sm font-medium"
																		style={{ color: getTrendColor(stat.trend) }}
																	>
																		{stat.change}
																	</BrandedSpan>
																</div>
																<BrandedP className="text-xs" style={{ color: colors.text.secondary }}>
																	{stat.description}
																</BrandedP>
															</div>
															<div 
																className="w-12 h-12 rounded-lg flex items-center justify-center ml-4"
																style={{ 
																	backgroundColor: `${statColor}15`,
																	color: statColor 
																}}
															>
																<Icon className="w-6 h-6" />
															</div>
														</div>
													</BrandedCard>
												)
											})}
										</div>
									</div>

									{/* Recent Activity */}
									<div>
										<div className="flex items-center justify-between mb-6">
											<BrandedH2>
												{t('dashboard.talent.recentActivity', 'Recent Activity')}
											</BrandedH2>
											<button
												onClick={() => setSelectedTab('real-time')}
												className="flex items-center text-sm font-medium transition-colors"
												style={{ color: colors.primary }}
											>
												View Live Feed
												<ChevronRight className="w-4 h-4 ml-1" />
											</button>
										</div>
										<RealTimeActivityFeed 
											className="max-h-96"
											showHeader={false}
											maxItems={5}
										/>
									</div>

									{/* Live Matches Preview */}
									{liveMatches.length > 0 && (
										<div>
											<div className="flex items-center justify-between mb-6">
												<BrandedH2>
													{t('dashboard.talent.liveMatches', 'Live Matches')}
												</BrandedH2>
												<button
													onClick={() => setSelectedTab('matches')}
													className="flex items-center text-sm font-medium transition-colors"
													style={{ color: colors.primary }}
												>
													View All Matches
													<ChevronRight className="w-4 h-4 ml-1" />
												</button>
											</div>
											<div className="grid gap-4">
												{liveMatches.slice(0, 3).map((match) => (
													<BrandedCard key={match.id} variant="outlined" padding="lg">
														<div className="flex items-center justify-between">
															<div className="flex items-center space-x-4">
																<div 
																	className="w-12 h-12 rounded-lg flex items-center justify-center"
																	style={{ backgroundColor: `${colors.primary}15` }}
																>
																	<Briefcase className="w-6 h-6" style={{ color: colors.primary }} />
																</div>
																<div>
																	<BrandedP className="font-semibold mb-1">
																		{match.type === 'job_match' ? 'New Job Match' : 'Mutual Interest'}
																	</BrandedP>
																	<BrandedP className="text-sm mb-2" style={{ color: colors.text.secondary }}>
																		Match Score: {match.matchScore}%
																	</BrandedP>
																	<BrandedSpan className="text-xs" style={{ color: colors.text.secondary }}>
																		{new Date(match.timestamp).toLocaleString()}
																	</BrandedSpan>
																</div>
															</div>
															<div className="flex items-center space-x-2">
																<BrandedSpan 
																	className="px-3 py-1 rounded-full text-sm font-medium"
																	style={{
																		backgroundColor: match.status === 'new' ? '#10B98115' : `${colors.primary}15`,
																		color: match.status === 'new' ? '#10B981' : colors.primary
																	}}
																>
																	{match.status}
																</BrandedSpan>
															</div>
														</div>
													</BrandedCard>
												))}
											</div>
										</div>
									)}
								</>
							)}
						</div>
					)}

					{selectedTab === 'analytics' && (
						<AdvancedAnalyticsHub />
					)}

					{selectedTab === 'matches' && (
						<SmartMatchingEngine userType="talent" />
					)}

					{selectedTab === 'career-advisory' && (
						<AICareerAdvisory />
					)}

					{selectedTab === 'skills' && (
						<IntelligentSkillAssessment />
					)}

					{selectedTab === 'real-time' && (
						<RealTimeAnalyticsDashboard />
					)}

					{selectedTab === 'performance' && (
						<PerformanceMonitoringDashboard />
					)}
				</BrandedSection>

				{/* Live Chat Widget */}
				<LiveChatWidget position="bottom-right" />
			</DashboardLayoutWithSidebar>
		</WebSocketProvider>
	)
}

export default TalentDashboard 