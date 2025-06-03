import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import DashboardLayoutWithSidebar from '../../../components/layout/DashboardLayoutWithSidebar'
import WebSocketProvider from '../../../components/talent-dashboard/WebSocketProvider'
import RealTimeActivityFeed from '../../../components/talent-dashboard/RealTimeActivityFeed'
import LiveNotificationCenter from '../../../components/talent-dashboard/LiveNotificationCenter'
import LiveChatWidget from '../../../components/talent-dashboard/LiveChatWidget'
import RealTimeConnectionManager from '../../../components/talent-dashboard/RealTimeConnectionManager'
import CreditSystemDashboard from '../../../components/team-dashboard/CreditSystemDashboard'
import { useAppSelector, useAppDispatch } from '../../../store/hooks'
import { fetchTeamAnalytics } from '../../../store/slices/analyticsSlice'
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
	CreditCard, 
	Eye, 
	Heart, 
	Target, 
	Plus, 
	TrendingUp, 
	Users, 
	Zap,
	MapPin,
	Star,
	Filter,
	Search,
	Download,
	MoreHorizontal,
	ExternalLink,
	ChevronRight,
	Award,
	UserCheck,
	Clock,
	CheckCircle2,
	AlertTriangle,
	BarChart3,
	MessageSquare,
	Briefcase,
	Calendar,
	RefreshCw,
	Activity,
	Brain,
	Settings,
	Bell,
	Loader
} from 'lucide-react'

// Sample data for credit-based matching system focused on EU talent in German/Swiss markets
const teamStats = [
	{ 
		name: 'Active Credits', 
		value: 45, 
		change: '+12', 
		trend: 'up',
		icon: CreditCard, 
		color: 'primary',
		description: 'Available CV access credits'
	},
	{ 
		name: 'EU Mutual Interests', 
		value: 23, 
		change: '+8', 
		trend: 'up',
		icon: Heart, 
		color: 'secondary',
		description: 'EU talents interested in your DE/CH jobs'
	},
	{ 
		name: 'Profiles Accessed', 
		value: 18, 
		change: '+6', 
		trend: 'up',
		icon: Eye, 
		color: 'success',
		description: 'EU talent CVs viewed this month'
	},
	{ 
		name: 'Direct Contacts', 
		value: 12, 
		change: '+4', 
		trend: 'up',
		icon: Zap, 
		color: 'warning',
		description: 'Initiated conversations with EU talent'
	}
]

const interestedTalents = [
	{
		id: 1,
		name: 'Tomáš Novák',
		role: 'Senior React Developer',
		location: 'Prague, Czech Republic → Berlin, Germany',
		experience: '6+ years',
		skills: ['React', 'TypeScript', 'Node.js', 'AWS'],
		matchScore: 96,
		avatar: 'TN',
		appliedDate: '1 day ago',
		jobTitle: 'Senior Frontend Developer - Berlin',
		status: 'new',
		euCitizen: true,
		sourceCountry: '🇨🇿 Czech Republic',
		targetCity: 'Berlin, Germany'
	},
	{
		id: 2,
		name: 'Anna Kowalska',
		role: 'Full Stack Engineer',
		location: 'Warsaw, Poland → Zurich, Switzerland',
		experience: '5+ years',
		skills: ['React', 'Python', 'Django', 'PostgreSQL'],
		matchScore: 92,
		avatar: 'AK',
		appliedDate: '2 days ago',
		jobTitle: 'Full Stack Developer - Zurich',
		status: 'reviewed',
		euCitizen: true,
		sourceCountry: '🇵🇱 Poland',
		targetCity: 'Zurich, Switzerland'
	},
	{
		id: 3,
		name: 'Mihai Popescu',
		role: 'DevOps Engineer',
		location: 'Bucharest, Romania → Munich, Germany',
		experience: '4+ years',
		skills: ['Kubernetes', 'Docker', 'AWS', 'Terraform'],
		matchScore: 89,
		avatar: 'MP',
		appliedDate: '3 days ago',
		jobTitle: 'DevOps Engineer - Munich',
		status: 'contacted',
		euCitizen: true,
		sourceCountry: '🇷🇴 Romania',
		targetCity: 'Munich, Germany'
	},
	{
		id: 4,
		name: 'Eszter Nagy',
		role: 'Data Scientist',
		location: 'Budapest, Hungary → Frankfurt, Germany',
		experience: '3+ years',
		skills: ['Python', 'TensorFlow', 'SQL', 'Jupyter'],
		matchScore: 87,
		avatar: 'EN',
		appliedDate: '4 days ago',
		jobTitle: 'Data Scientist - Frankfurt',
		status: 'new',
		euCitizen: true,
		sourceCountry: '🇭🇺 Hungary',
		targetCity: 'Frankfurt, Germany'
	},
	{
		id: 5,
		name: 'Janko Stojanović',
		role: 'Mobile Developer',
		location: 'Vienna, Austria → Basel, Switzerland',
		experience: '5+ years',
		skills: ['React Native', 'Swift', 'Kotlin', 'Firebase'],
		matchScore: 84,
		avatar: 'JS',
		appliedDate: '5 days ago',
		jobTitle: 'Mobile Developer - Basel',
		status: 'reviewed',
		euCitizen: true,
		sourceCountry: '🇦🇹 Austria',
		targetCity: 'Basel, Switzerland'
	}
]

const hiringMetrics = [
	{ label: 'EU Interest Rate', value: '24.8%', trend: 'up', change: '+3.2%' },
	{ label: 'Avg Response Time', value: '2.8 days', trend: 'down', change: '-1.1 days' },
	{ label: 'CV Quality Score', value: '94%', trend: 'up', change: '+7%' },
	{ label: 'Cost Per Qualified CV', value: '€8.40', trend: 'down', change: '-€1.60' }
]

const activeJobs = [
	{
		id: 1,
		title: 'Senior React Developer',
		department: 'Engineering',
		posted: '2 days ago',
		applicants: 18,
		status: 'active',
		priority: 'high',
		location: 'Berlin, Germany',
		euInterest: 12
	},
	{
		id: 2,
		title: 'Full Stack Engineer',
		department: 'Engineering',
		posted: '1 week ago',
		applicants: 14,
		status: 'active',
		priority: 'medium',
		location: 'Zurich, Switzerland',
		euInterest: 9
	},
	{
		id: 3,
		title: 'DevOps Engineer',
		department: 'Infrastructure',
		posted: '5 days ago',
		applicants: 11,
		status: 'active',
		priority: 'high',
		location: 'Munich, Germany',
		euInterest: 7
	},
	{
		id: 4,
		title: 'Data Scientist',
		department: 'Analytics',
		posted: '3 days ago',
		applicants: 8,
		status: 'paused',
		priority: 'low',
		location: 'Frankfurt, Germany',
		euInterest: 5
	}
]

function TeamDashboard() {
	const navigate = useNavigate()
	const { t } = useTranslation()
	const searchParams = useSearchParams()[0]
	const dispatch = useAppDispatch()
	const { switchVariant } = useBrand()
	const colors = useBrandColors()

	// Redux state
	const { user } = useAppSelector((state) => state.auth)
	const teamAnalytics = useAppSelector((state) => state.analytics.team)
	const { 
		notifications, 
		unreadCount, 
		liveMatches, 
		realTimeStats, 
		isConnected 
	} = useAppSelector((state) => state.realtime)

	// Local state
	const [refreshing, setRefreshing] = useState(false)
	const [showNotifications, setShowNotifications] = useState(false)
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
		userType: 'employer',
		autoReconnect: true
	})

	// Set brand variant to teams
	useEffect(() => {
		switchVariant('teams')
	}, [switchVariant])

	// Fetch initial data
	useEffect(() => {
		if (user?.id) {
			dispatch(fetchTeamAnalytics({ employerId: user.id, timeRange: '30d' }))
			dispatch(fetchNotifications({ userId: user.id }))
			dispatch(fetchLiveMatches({ userId: user.id, userType: 'employer' }))
			dispatch(fetchRealTimeStats({ userId: user.id, userType: 'employer' }))
		}
	}, [dispatch, user?.id])

	// Refresh all data
	const handleRefreshData = async () => {
		if (!user?.id || refreshing) return
		
		setRefreshing(true)
		try {
			await Promise.all([
				dispatch(fetchTeamAnalytics({ employerId: user.id, timeRange: '30d' })),
				dispatch(fetchNotifications({ userId: user.id })),
				dispatch(fetchLiveMatches({ userId: user.id, userType: 'employer' })),
				dispatch(fetchRealTimeStats({ userId: user.id, userType: 'employer' }))
			])
		} catch (error) {
			console.error('Failed to refresh dashboard data:', error)
		} finally {
			setRefreshing(false)
		}
	}

	const handleViewProfile = (talentId: number) => {
		console.log('Viewing profile for talent:', talentId)
	}

	const handleContactTalent = (talentId: number) => {
		console.log('Contacting talent:', talentId)
	}

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
			case 'down': return <TrendingUp className="w-4 h-4 rotate-180" />
			default: return <MoreHorizontal className="w-4 h-4" />
		}
	}

	const getTrendColor = (trend: 'up' | 'down' | 'stable') => {
		switch (trend) {
			case 'up': return '#10B981'
			case 'down': return '#EF4444'
			default: return colors.text.secondary
		}
	}

	// Mock data - replace with real analytics data
	const quickStats = [
		{ 
			name: 'Active Credits', 
			value: realTimeStats?.credits || 45, 
			change: '+12', 
			trend: 'up' as const,
			icon: CreditCard, 
			color: 'primary',
			description: 'Available CV access credits'
		},
		{ 
			name: 'Live Applications', 
			value: realTimeStats?.newApplications || 23, 
			change: '+8', 
			trend: 'up' as const,
			icon: Heart, 
			color: 'secondary',
			description: 'New applications today'
		},
		{ 
			name: 'Active Jobs', 
			value: realTimeStats?.activeJobs || 18, 
			change: '+6', 
			trend: 'up' as const,
			icon: Briefcase, 
			color: 'success',
			description: 'Currently posted positions'
		},
		{ 
			name: 'Response Rate', 
			value: '84%', 
			change: '+4%', 
			trend: 'up' as const,
			icon: Zap, 
			color: 'warning',
			description: 'Candidate response rate'
		}
	]

	// Tab configuration
	const tabConfig = [
		{ 
			id: 'overview', 
			name: t('dashboard.tabs.overview', 'Team Overview'), 
			icon: BarChart3,
			badge: notifications.length > 0 ? notifications.length : undefined
		},
		{ 
			id: 'analytics', 
			name: t('dashboard.tabs.analytics', 'Hiring Analytics'), 
			icon: Activity,
			badge: 'Live'
		},
		{ 
			id: 'candidates', 
			name: t('dashboard.tabs.candidates', 'Candidates'), 
			icon: Users,
			badge: liveMatches.length > 0 ? liveMatches.length : undefined
		},
		{ 
			id: 'jobs', 
			name: t('dashboard.tabs.jobs', 'Job Management'), 
			icon: Briefcase
		},
		{ 
			id: 'credits', 
			name: t('dashboard.tabs.credits', 'Credits & Billing'), 
			icon: CreditCard,
			badge: realTimeStats?.credits && realTimeStats.credits < 10 ? 'Low' : undefined
		},
		{ 
			id: 'real-time', 
			name: t('dashboard.tabs.realtime', 'Live Activity'), 
			icon: Activity,
			badge: 'Live'
		},
		{ 
			id: 'insights', 
			name: t('dashboard.tabs.insights', 'AI Insights'), 
			icon: Brain,
			badge: 'New'
		}
	]

	// Tab navigation component
	const tabNavigation = (
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
	)

	return (
		<WebSocketProvider autoConnect={import.meta.env.PROD}>
			<DashboardLayoutWithSidebar 
				title={`${t('dashboard.teams.welcome', 'Welcome')}, ${user?.firstName || 'Team'}!`}
				subtitle={t('dashboard.teams.subtitle', 'Manage your hiring process and find the best talent')}
			>
				<BrandedSection className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
					{/* Development Notice */}
					{!import.meta.env.PROD && (
						<div className="mb-6 p-4 rounded-lg" style={{ backgroundColor: '#FEF3C7', borderColor: '#F59E0B', border: '1px solid' }}>
							<div className="flex items-center space-x-2">
								<div className="w-2 h-2 rounded-full bg-yellow-500"></div>
								<BrandedSpan className="text-yellow-800 text-sm font-medium">
									Development Mode: Real-time features will show mock data until backend WebSocket is connected
								</BrandedSpan>
							</div>
						</div>
					)}

					{/* Header */}
					<div className="flex items-center justify-between mb-8">
						<div>
							<BrandedH1>
								{t('dashboard.teams.title', 'Team Dashboard')}
							</BrandedH1>
							<BrandedP style={{ color: colors.text.secondary }}>
								{t('dashboard.teams.description', 'Monitor your hiring performance and manage candidates')}
							</BrandedP>
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

					{/* Live Notifications Banner */}
					{unreadCount > 0 && (
						<div className="mb-6 p-4 rounded-lg border border-blue-200 bg-blue-50">
							<div className="flex items-center justify-between">
								<div className="flex items-center space-x-3">
									<div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
										<Bell className="w-4 h-4 text-white" />
									</div>
									<div>
										<BrandedP className="font-medium text-blue-900">
											You have {unreadCount} new notification{unreadCount !== 1 ? 's' : ''}
										</BrandedP>
										<BrandedP className="text-sm text-blue-700">
											New applications, matches, and updates available
										</BrandedP>
									</div>
								</div>
								<button
									onClick={() => setShowNotifications(true)}
									className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
								>
									View All
								</button>
							</div>
						</div>
					)}

					{/* Live Notifications Modal */}
					{showNotifications && (
						<div className="fixed inset-0 z-50 overflow-hidden">
							<div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setShowNotifications(false)} />
							<div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
								<div className="h-full overflow-y-auto">
									<LiveNotificationCenter 
										isOpen={showNotifications}
										onClose={() => setShowNotifications(false)}
									/>
								</div>
							</div>
						</div>
					)}

					{/* Navigation Tabs */}
					<div className="mb-8">{tabNavigation}</div>

					{/* Tab Content */}
					{selectedTab === 'overview' && (
						<div className="space-y-8">
							{/* Loading State */}
							{teamAnalytics.isLoading ? (
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
											{t('dashboard.teams.keyMetrics', 'Key Performance Metrics')}
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
												{t('dashboard.teams.recentActivity', 'Recent Hiring Activity')}
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

									{/* Quick Actions */}
									<div>
										<BrandedH2 className="mb-6">
											{t('dashboard.teams.quickActions', 'Quick Actions')}
										</BrandedH2>
										<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
											<button
												onClick={() => navigate('/team/post-job')}
												className="flex items-center space-x-3 p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all group"
											>
												<div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
													<Plus className="w-5 h-5 text-blue-600" />
												</div>
												<div className="text-left">
													<BrandedP className="font-medium text-gray-900">Post New Job</BrandedP>
													<BrandedP className="text-sm text-gray-500">Create job posting</BrandedP>
												</div>
											</button>

											<button
												onClick={() => setSelectedTab('candidates')}
												className="flex items-center space-x-3 p-4 bg-white border border-gray-200 rounded-lg hover:border-green-300 hover:shadow-md transition-all group"
											>
												<div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center group-hover:bg-green-200 transition-colors">
													<Users className="w-5 h-5 text-green-600" />
												</div>
												<div className="text-left">
													<BrandedP className="font-medium text-gray-900">View Candidates</BrandedP>
													<BrandedP className="text-sm text-gray-500">Browse applications</BrandedP>
												</div>
											</button>

											<button
												onClick={() => setSelectedTab('analytics')}
												className="flex items-center space-x-3 p-4 bg-white border border-gray-200 rounded-lg hover:border-purple-300 hover:shadow-md transition-all group"
											>
												<div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center group-hover:bg-purple-200 transition-colors">
													<BarChart3 className="w-5 h-5 text-purple-600" />
												</div>
												<div className="text-left">
													<BrandedP className="font-medium text-gray-900">View Analytics</BrandedP>
													<BrandedP className="text-sm text-gray-500">Hiring insights</BrandedP>
												</div>
											</button>

											<button
												onClick={() => setSelectedTab('credits')}
												className="flex items-center space-x-3 p-4 bg-white border border-gray-200 rounded-lg hover:border-yellow-300 hover:shadow-md transition-all group"
											>
												<div className="w-10 h-10 rounded-lg bg-yellow-100 flex items-center justify-center group-hover:bg-yellow-200 transition-colors">
													<CreditCard className="w-5 h-5 text-yellow-600" />
												</div>
												<div className="text-left">
													<BrandedP className="font-medium text-gray-900">Manage Credits</BrandedP>
													<BrandedP className="text-sm text-gray-500">Buy more credits</BrandedP>
												</div>
											</button>
										</div>
									</div>
								</>
							)}
						</div>
					)}

					{selectedTab === 'analytics' && (
						<div className="space-y-6">
							<BrandedH2>Hiring Analytics Dashboard</BrandedH2>
							<div className="bg-white p-8 rounded-lg border border-gray-200">
								<div className="text-center py-12">
									<BarChart3 className="w-12 h-12 mx-auto text-gray-400 mb-4" />
									<BrandedP className="text-gray-500">
										Advanced analytics dashboard coming soon...
									</BrandedP>
								</div>
							</div>
						</div>
					)}

					{selectedTab === 'candidates' && (
						<div className="space-y-6">
							<BrandedH2>Candidate Management</BrandedH2>
							<div className="bg-white p-8 rounded-lg border border-gray-200">
								<div className="text-center py-12">
									<Users className="w-12 h-12 mx-auto text-gray-400 mb-4" />
									<BrandedP className="text-gray-500">
										Candidate management interface coming soon...
									</BrandedP>
								</div>
							</div>
						</div>
					)}

					{selectedTab === 'jobs' && (
						<div className="space-y-6">
							<BrandedH2>Job Management</BrandedH2>
							<div className="bg-white p-8 rounded-lg border border-gray-200">
								<div className="text-center py-12">
									<Briefcase className="w-12 h-12 mx-auto text-gray-400 mb-4" />
									<BrandedP className="text-gray-500">
										Job management interface coming soon...
									</BrandedP>
								</div>
							</div>
						</div>
					)}

					{selectedTab === 'credits' && (
						<CreditSystemDashboard />
					)}

					{selectedTab === 'real-time' && (
						<div className="space-y-6">
							<BrandedH2>Live Activity Feed</BrandedH2>
							<RealTimeActivityFeed showHeader={true} />
						</div>
					)}

					{selectedTab === 'insights' && (
						<div className="space-y-6">
							<BrandedH2>AI-Powered Insights</BrandedH2>
							<div className="bg-white p-8 rounded-lg border border-gray-200">
								<div className="text-center py-12">
									<Brain className="w-12 h-12 mx-auto text-gray-400 mb-4" />
									<BrandedP className="text-gray-500">
										AI insights and recommendations coming soon...
									</BrandedP>
								</div>
							</div>
						</div>
					)}
				</BrandedSection>

				{/* Live Chat Widget */}
				<LiveChatWidget position="bottom-right" />
			</DashboardLayoutWithSidebar>
		</WebSocketProvider>
	)
}

export default TeamDashboard 