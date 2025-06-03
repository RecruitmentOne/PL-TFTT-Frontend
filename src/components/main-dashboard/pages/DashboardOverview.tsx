import React, { useState, useEffect } from 'react'
import { 
	TrendingUp, 
	Users, 
	Heart, 
	CreditCard, 
	Briefcase, 
	Eye,
	Calendar,
	Award,
	ArrowUpRight,
	ArrowDownRight,
	Clock,
	Target,
	BarChart3,
	Activity,
	Star,
	Zap,
	Sparkles,
	TrendingDown
} from 'lucide-react'
import { useBrandColors } from '../../../brand'
import { 
	DashboardMetrics, 
	Activity as ActivityType, 
	Match, 
	DashboardStats, 
	DashboardUser,
	ChartDataPoint 
} from '../../../types/dashboard'
import { dashboardAPI } from '../../../services/dashboardAPI'

interface DashboardOverviewProps {
	user: DashboardUser
}

interface EnhancedMetricCardProps {
	title: string
	value: string | number
	icon: React.ReactNode
	change?: number
	changeType?: 'increase' | 'decrease'
	gradient: string
	accentColor: string
	description?: string
}

interface ActivityItemProps {
	activity: ActivityType
}

interface MatchCardProps {
	match: Match
	userType: 'team' | 'talent'
	onViewDetails: () => void
}

interface ChartData {
	labels: string[]
	primaryData: number[]
	secondaryData?: number[]
}

function EnhancedMetricCard({ 
	title, 
	value, 
	icon, 
	change, 
	changeType, 
	gradient, 
	accentColor, 
	description 
}: EnhancedMetricCardProps) {
	const colors = useBrandColors()
	const [isHovered, setIsHovered] = useState(false)

	return (
		<div 
			className="relative p-6 rounded-2xl border shadow-lg transition-all duration-300 cursor-pointer overflow-hidden group"
			style={{ 
				backgroundColor: colors.surface,
				borderColor: colors.border,
				transform: isHovered ? 'translateY(-4px) scale(1.02)' : 'translateY(0) scale(1)',
				boxShadow: isHovered ? `0 12px 24px ${colors.shadow}` : `0 4px 8px ${colors.shadow}`
			}}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			{/* Gradient Background Overlay */}
			<div 
				className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-300"
				style={{ background: gradient }}
			/>
			
			{/* Glowing Effect */}
			<div 
				className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-300 blur-xl"
				style={{ background: gradient }}
			/>

			<div className="relative z-10">
				<div className="flex items-start justify-between mb-4">
					<div className="flex-1">
						<div className="flex items-center space-x-2 mb-2">
							<div 
								className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-lg"
								style={{ background: gradient }}
							>
								{icon}
							</div>
							<div>
								<p 
									className="text-sm font-semibold"
									style={{ color: colors.text.secondary }}
								>
									{title}
								</p>
								{description && (
									<p 
										className="text-xs opacity-75"
										style={{ color: colors.text.tertiary }}
									>
										{description}
									</p>
								)}
							</div>
						</div>
						
						<p 
							className="text-3xl font-bold mb-2"
							style={{ color: colors.text.primary }}
						>
							{value}
						</p>
					</div>
				</div>

				{change !== undefined && (
					<div className="flex items-center space-x-2">
						<div 
							className="flex items-center space-x-1 px-2 py-1 rounded-lg"
							style={{ 
								backgroundColor: changeType === 'increase' ? 
									`${colors.success}20` : `${colors.error}20` 
							}}
						>
							{changeType === 'increase' ? (
								<ArrowUpRight className="w-4 h-4" style={{ color: colors.success }} />
							) : (
								<ArrowDownRight className="w-4 h-4" style={{ color: colors.error }} />
							)}
							<span 
								className="text-sm font-semibold"
								style={{ 
									color: changeType === 'increase' ? colors.success : colors.error 
								}}
							>
								{Math.abs(change)}%
							</span>
						</div>
						<span 
							className="text-xs"
							style={{ color: colors.text.tertiary }}
						>
							vs last month
						</span>
					</div>
				)}
			</div>

			{/* Sparkle Animation */}
			<div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
				<Sparkles 
					className="w-4 h-4 animate-pulse"
					style={{ color: accentColor }}
				/>
			</div>
		</div>
	)
}

function MiniChart({ data, type, color }: { data: ChartData, type: 'line' | 'bar', color: string }) {
	const colors = useBrandColors()
	const maxValue = Math.max(...data.primaryData)
	
	return (
		<div className="h-24 flex items-end space-x-1 p-2">
			{data.primaryData.map((value, index) => {
				const height = (value / maxValue) * 100
				return (
					<div
						key={index}
						className="flex-1 rounded-t-sm transition-all duration-300 hover:opacity-80"
						style={{
							height: `${height}%`,
							backgroundColor: color,
							minHeight: '4px'
						}}
					/>
				)
			})}
		</div>
	)
}

function InteractiveChart({ 
	title, 
	data, 
	primaryColor, 
	secondaryColor,
	icon 
}: { 
	title: string
	data: ChartData
	primaryColor: string
	secondaryColor?: string
	icon: React.ReactNode
}) {
	const colors = useBrandColors()
	const [activeDataPoint, setActiveDataPoint] = useState<number | null>(null)

	return (
		<div 
			className="p-6 rounded-xl border"
			style={{ 
				backgroundColor: colors.surface,
				borderColor: colors.border
			}}
		>
			<div className="flex items-center justify-between mb-4">
				<div className="flex items-center space-x-3">
					<div 
						className="w-8 h-8 rounded-lg flex items-center justify-center"
						style={{ backgroundColor: `${primaryColor}20` }}
					>
						<span style={{ color: primaryColor }}>
							{icon}
						</span>
					</div>
					<h3 
						className="text-lg font-semibold"
						style={{ color: colors.text.primary }}
					>
						{title}
					</h3>
				</div>
			</div>

			<div className="relative">
				<MiniChart data={data} type="bar" color={primaryColor} />
				
				{/* Chart Labels */}
				<div className="flex justify-between mt-2 text-xs" style={{ color: colors.text.tertiary }}>
					{data.labels.map((label, index) => (
						<span key={index}>{label}</span>
					))}
				</div>
			</div>
		</div>
	)
}

function ActivityItem({ activity }: ActivityItemProps) {
	const colors = useBrandColors()

	const getActivityIcon = () => {
		switch (activity.type) {
			case 'talent_liked_job':
				return <Heart className="w-4 h-4" style={{ color: colors.primary }} />
			case 'team_liked_talent':
				return <Users className="w-4 h-4" style={{ color: colors.secondary }} />
			case 'mutual_match':
				return <Award className="w-4 h-4" style={{ color: colors.success }} />
			case 'profile_viewed':
				return <Eye className="w-4 h-4" style={{ color: colors.info }} />
			case 'credits_spent':
				return <CreditCard className="w-4 h-4" style={{ color: colors.warning }} />
			default:
				return <Activity className="w-4 h-4" style={{ color: colors.text.secondary }} />
		}
	}

	return (
		<div className="flex items-start space-x-3 py-3 hover:bg-opacity-50 rounded-lg px-2 transition-colors duration-200"
			style={{ backgroundColor: 'transparent' }}
			onMouseEnter={(e) => {
				e.currentTarget.style.backgroundColor = `${colors.hover}`
			}}
			onMouseLeave={(e) => {
				e.currentTarget.style.backgroundColor = 'transparent'
			}}
		>
			<div className="flex-shrink-0 mt-1">
				{getActivityIcon()}
			</div>
			<div className="flex-1 min-w-0">
				<p 
					className="text-sm font-medium"
					style={{ color: colors.text.primary }}
				>
					{activity.title}
				</p>
				<p 
					className="text-sm mt-1"
					style={{ color: colors.text.secondary }}
				>
					{activity.description}
				</p>
				<p 
					className="text-xs mt-1"
					style={{ color: colors.text.tertiary }}
				>
					{new Date(activity.timestamp).toLocaleDateString()} at{' '}
					{new Date(activity.timestamp).toLocaleTimeString([], { 
						hour: '2-digit', 
						minute: '2-digit' 
					})}
				</p>
			</div>
		</div>
	)
}

function MatchCard({ match, userType, onViewDetails }: MatchCardProps) {
	const colors = useBrandColors()
	const [isHovered, setIsHovered] = useState(false)

	return (
		<div 
			className="p-4 rounded-xl border transition-all duration-200 cursor-pointer"
			style={{ 
				backgroundColor: colors.surface,
				borderColor: colors.border,
				transform: isHovered ? 'scale(1.02)' : 'scale(1)',
				boxShadow: isHovered ? `0 4px 12px ${colors.shadow}` : 'none'
			}}
			onClick={onViewDetails}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<div className="flex items-center space-x-3">
				<div 
					className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-sm font-semibold shadow-lg"
					style={{ 
						background: colors.gradients?.primary || colors.primary,
						backgroundImage: match.talentProfilePicture ? `url(${match.talentProfilePicture})` : undefined,
						backgroundSize: 'cover',
						backgroundPosition: 'center'
					}}
				>
					{!match.talentProfilePicture && (
						userType === 'team' ? match.talentName.charAt(0).toUpperCase() : 
						match.companyName.charAt(0).toUpperCase()
					)}
				</div>
				<div className="flex-1 min-w-0">
					<p 
						className="text-sm font-semibold truncate"
						style={{ color: colors.text.primary }}
					>
						{userType === 'team' ? match.talentName : match.companyName}
					</p>
					<p 
						className="text-xs truncate"
						style={{ color: colors.text.secondary }}
					>
						{userType === 'team' ? match.jobTitle : match.jobTitle}
					</p>
					<div className="flex items-center space-x-2 mt-1">
						<Star className="w-3 h-3" style={{ color: colors.warning }} />
						<p 
							className="text-xs"
							style={{ color: colors.text.tertiary }}
						>
							Matched {new Date(match.matchedAt).toLocaleDateString()}
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export function DashboardOverview({ user }: DashboardOverviewProps) {
	const [metrics, setMetrics] = useState<DashboardMetrics | null>(null)
	const [activities, setActivities] = useState<ActivityType[]>([])
	const [topMatches, setTopMatches] = useState<Match[]>([])
	const [stats, setStats] = useState<DashboardStats | null>(null)
	const [loading, setLoading] = useState(true)
	const colors = useBrandColors()

	const isTeam = user.userType === 'team'

	// Mock chart data
	const chartData: ChartData = {
		labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
		primaryData: [12, 19, 8, 15, 23, 18],
		secondaryData: [5, 8, 12, 7, 15, 11]
	}

	const matchesChartData: ChartData = {
		labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
		primaryData: [3, 7, 4, 8, 12, 9],
		secondaryData: [2, 4, 6, 5, 8, 7]
	}

	useEffect(() => {
		const fetchDashboardData = async () => {
			try {
				setLoading(true)
				const response = await dashboardAPI.getDashboardData()
				setMetrics(response.metrics)
				setActivities(response.recentActivity)
				setTopMatches(response.topMatches)
				setStats(response.stats)
			} catch (error) {
				console.error('Failed to fetch dashboard data:', error)
				// Set mock data for demo purposes
				setMetrics({
					teams: {
						totalActiveJobPostings: 12,
						totalTalentLikesReceived: 89,
						totalMutualMatches: 24,
						creditsRemaining: 156
					},
					talents: {
						totalJobsLiked: 34,
						totalMutualMatches: 8,
						profileViewsByTeams: 67,
						profileCompletionProgress: 85
					}
				})

				// Mock activities with more variety
				setActivities([
					{
						id: '1',
						type: 'mutual_match',
						title: 'New Mutual Like!',
						description: 'You have a new mutual match with Sarah Chen for Senior Frontend Developer position.',
						timestamp: new Date().toISOString(),
						metadata: { matchId: 'match123' }
					},
					{
						id: '2',
						type: 'profile_viewed',
						title: 'Profile Viewed',
						description: 'Tech Corp viewed your profile.',
						timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
						metadata: { viewerId: 'company456' }
					},
					{
						id: '3',
						type: isTeam ? 'talent_liked_job' : 'team_liked_talent',
						title: isTeam ? 'Talent Liked Your Job' : 'Team Liked Your Profile',
						description: isTeam ? 
							'Alex Johnson liked your React Developer position.' : 
							'Innovation Labs liked your profile.',
						timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
						metadata: { likerId: 'user789' }
					}
				])

				// Mock matches
				setTopMatches([
					{
						id: '1',
						talentId: 'talent1',
						talentName: 'Sarah Chen',
						talentProfilePicture: '',
						companyName: 'Tech Innovators',
						jobTitle: 'Senior Frontend Developer',
						jobId: 'job1',
						matchedAt: new Date().toISOString(),
						isNewMatch: true
					},
					{
						id: '2',
						talentId: 'talent2',
						talentName: 'Michael Rodriguez',
						talentProfilePicture: '',
						companyName: 'Digital Solutions',
						jobTitle: 'Full Stack Engineer',
						jobId: 'job2',
						matchedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
						isNewMatch: false
					}
				])
			} finally {
				setLoading(false)
			}
		}

		fetchDashboardData()
	}, [isTeam])

	const getEnhancedMetricCards = () => {
		if (isTeam && metrics?.teams) {
			return [
				{
					title: 'Active Job Postings',
					value: metrics.teams.totalActiveJobPostings,
					icon: <Briefcase className="w-6 h-6" />,
					change: 12,
					changeType: 'increase' as const,
					gradient: colors.gradients?.primary || `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
					accentColor: colors.primary,
					description: 'Currently hiring'
				},
				{
					title: 'Total Likes Received',
					value: metrics.teams.totalTalentLikesReceived,
					icon: <Heart className="w-6 h-6" />,
					change: 8,
					changeType: 'increase' as const,
					gradient: `linear-gradient(135deg, ${colors.error} 0%, #FF6B8A 100%)`,
					accentColor: colors.error,
					description: 'From talented candidates'
				},
				{
					title: 'Mutual Likes',
					value: metrics.teams.totalMutualMatches,
					icon: <Award className="w-6 h-6" />,
					change: 15,
					changeType: 'increase' as const,
					gradient: `linear-gradient(135deg, ${colors.success} 0%, #4ADE80 100%)`,
					accentColor: colors.success,
					description: 'Perfect candidate matches'
				},
				{
					title: 'Credits Remaining',
					value: metrics.teams.creditsRemaining,
					icon: <CreditCard className="w-6 h-6" />,
					gradient: `linear-gradient(135deg, ${colors.warning} 0%, #FBBF24 100%)`,
					accentColor: colors.warning,
					description: 'Available for talent access'
				}
			]
		} else if (metrics?.talents) {
			return [
				{
					title: 'Jobs Liked',
					value: metrics.talents.totalJobsLiked,
					icon: <Heart className="w-6 h-6" />,
					change: 23,
					changeType: 'increase' as const,
					gradient: colors.gradients?.primary || `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
					accentColor: colors.primary,
					description: 'Total likes for jobs'
				},
				{
					title: 'Mutual Likes',
					value: metrics.talents.totalMutualMatches,
					icon: <Award className="w-6 h-6" />,
					change: 12,
					changeType: 'increase' as const,
					gradient: `linear-gradient(135deg, ${colors.success} 0%, #4ADE80 100%)`,
					accentColor: colors.success,
					description: 'Companies interested in you'
				},
				{
					title: 'Profile Views',
					value: metrics.talents.profileViewsByTeams,
					icon: <Eye className="w-6 h-6" />,
					change: 31,
					changeType: 'increase' as const,
					gradient: `linear-gradient(135deg, ${colors.info} 0%, #60A5FA 100%)`,
					accentColor: colors.info,
					description: 'Companies checking you out'
				},
				{
					title: 'Profile Complete',
					value: `${metrics.talents.profileCompletionProgress}%`,
					icon: <Target className="w-6 h-6" />,
					gradient: `linear-gradient(135deg, ${colors.secondary} 0%, #A78BFA 100%)`,
					accentColor: colors.secondary,
					description: 'Optimization score'
				}
			]
		}
		return []
	}

	const enhancedMetricCards = getEnhancedMetricCards()

	if (loading) {
		return (
			<div className="flex items-center justify-center h-64">
				<div 
					className="w-8 h-8 border-4 border-t-transparent rounded-full animate-spin"
					style={{ borderColor: colors.primary }}
				/>
			</div>
		)
	}

	return (
		<div className="space-y-8">
			{/* Enhanced Metrics Cards */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
				{enhancedMetricCards.map((card, index) => (
					<EnhancedMetricCard key={index} {...card} />
				))}
			</div>

			{/* Subscription Banner (Teams only) */}
			{isTeam && user.subscriptionPlan && (
				<div 
					className="relative p-6 rounded-2xl border-l-4 overflow-hidden"
					style={{ 
						backgroundColor: colors.surfaceVariant,
						borderLeftColor: colors.primary,
						borderTopColor: colors.border,
						borderRightColor: colors.border,
						borderBottomColor: colors.border
					}}
				>
					{/* Gradient Background */}
					<div 
						className="absolute inset-0 opacity-5"
						style={{ background: colors.gradients?.primary || colors.primary }}
					/>
					
					<div className="relative z-10">
						<div className="flex items-center justify-between">
							<div className="flex items-center space-x-4">
								<div 
									className="w-12 h-12 rounded-xl flex items-center justify-center text-white"
									style={{ background: colors.gradients?.primary || colors.primary }}
								>
									<Zap className="w-6 h-6" />
								</div>
								<div>
									<h3 
										className="text-lg font-bold"
										style={{ color: colors.text.primary }}
									>
										{user.subscriptionPlan.name} Plan
									</h3>
									<p 
										className="text-sm"
										style={{ color: colors.text.secondary }}
									>
										{user.subscriptionPlan.creditsPerMonth} credits per month • 
										Renews on {new Date(user.subscriptionPlan.renewalDate).toLocaleDateString()}
									</p>
								</div>
							</div>
							<button 
								className="px-6 py-3 rounded-xl font-semibold transition-all duration-200 hover:scale-105 shadow-lg"
								style={{ 
									background: colors.gradients?.primary || colors.primary,
									color: colors.text.inverse
								}}
							>
								Upgrade Plan
							</button>
						</div>
					</div>
				</div>
			)}

			{/* Performance Charts */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				<InteractiveChart
					title={isTeam ? "Talent Engagement" : "Job Interactions"}
					data={chartData}
					primaryColor={colors.primary}
					secondaryColor={colors.secondary}
					icon={<TrendingUp className="w-5 h-5" />}
				/>
				<InteractiveChart
					title="Mutual Likes"
					data={matchesChartData}
					primaryColor={colors.success}
					secondaryColor={colors.info}
					icon={<Award className="w-5 h-5" />}
				/>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				{/* Recent Activity Feed */}
				<div 
					className="lg:col-span-2 p-6 rounded-2xl border"
					style={{ 
						backgroundColor: colors.surface,
						borderColor: colors.border
					}}
				>
					<div className="flex items-center justify-between mb-6">
						<div className="flex items-center space-x-3">
							<div 
								className="w-10 h-10 rounded-xl flex items-center justify-center"
								style={{ background: colors.gradients?.secondary || colors.secondary }}
							>
								<Clock className="w-5 h-5 text-white" />
							</div>
							<h2 
								className="text-xl font-bold"
								style={{ color: colors.text.primary }}
							>
								Recent Activity
							</h2>
						</div>
					</div>

					<div className="space-y-2">
						{activities.length > 0 ? (
							activities.map((activity) => (
								<ActivityItem key={activity.id} activity={activity} />
							))
						) : (
							<div className="text-center py-12">
								<Activity 
									className="w-16 h-16 mx-auto mb-4"
									style={{ color: colors.text.tertiary }}
								/>
								<p 
									className="text-lg font-medium mb-2"
									style={{ color: colors.text.secondary }}
								>
									No recent activity
								</p>
								<p 
									className="text-sm"
									style={{ color: colors.text.tertiary }}
								>
									Start engaging with {isTeam ? 'talents' : 'job opportunities'} to see activity here
								</p>
							</div>
						)}
					</div>
				</div>

				{/* Top Matches */}
				<div 
					className="p-6 rounded-2xl border"
					style={{ 
						backgroundColor: colors.surface,
						borderColor: colors.border
					}}
				>
					<div className="flex items-center justify-between mb-6">
						<div className="flex items-center space-x-3">
							<div 
								className="w-10 h-10 rounded-xl flex items-center justify-center"
								style={{ background: colors.gradients?.accent || colors.success }}
							>
								<Award className="w-5 h-5 text-white" />
							</div>
							<h2 
								className="text-xl font-bold"
								style={{ color: colors.text.primary }}
							>
								Top Matches
							</h2>
						</div>
					</div>

					<div className="space-y-4">
						{topMatches.length > 0 ? (
							topMatches.slice(0, 5).map((match) => (
								<MatchCard 
									key={match.id} 
									match={match} 
									userType={user.userType}
									onViewDetails={() => {
										console.log('View match details:', match.id)
									}}
								/>
							))
						) : (
							<div className="text-center py-12">
								<Heart 
									className="w-16 h-16 mx-auto mb-4"
									style={{ color: colors.text.tertiary }}
								/>
								<p 
									className="text-lg font-medium mb-2"
									style={{ color: colors.text.secondary }}
								>
									No matches yet
								</p>
								<p 
									className="text-sm"
									style={{ color: colors.text.tertiary }}
								>
									Start liking {isTeam ? 'talents' : 'jobs'} to find perfect matches
								</p>
							</div>
						)}
					</div>

					{topMatches.length > 5 && (
						<button 
							className="w-full mt-6 py-3 text-sm font-semibold rounded-xl transition-all duration-200 hover:scale-105 shadow-lg"
							style={{ 
								background: colors.gradients?.primary || colors.primary,
								color: colors.text.inverse
							}}
						>
							View All Matches
						</button>
					)}
				</div>
			</div>
		</div>
	)
}