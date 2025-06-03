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
	Activity
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

interface MetricCardProps {
	title: string
	value: string | number
	icon: React.ReactNode
	change?: number
	changeType?: 'increase' | 'decrease'
	color: string
	bgColor: string
}

interface ActivityItemProps {
	activity: ActivityType
}

interface MatchCardProps {
	match: Match
	userType: 'team' | 'talent'
	onViewDetails: () => void
}

function MetricCard({ title, value, icon, change, changeType, color, bgColor }: MetricCardProps) {
	const colors = useBrandColors()

	return (
		<div 
			className="p-6 rounded-xl border shadow-sm transition-transform duration-200 hover:scale-105"
			style={{ 
				backgroundColor: colors.surface,
				borderColor: colors.border
			}}
		>
			<div className="flex items-center justify-between">
				<div>
					<p 
						className="text-sm font-medium"
						style={{ color: colors.text.secondary }}
					>
						{title}
					</p>
					<p 
						className="text-2xl font-bold mt-1"
						style={{ color: colors.text.primary }}
					>
						{value}
					</p>
					{change !== undefined && (
						<div className="flex items-center mt-2 space-x-1">
							{changeType === 'increase' ? (
								<ArrowUpRight className="w-4 h-4 text-green-500" />
							) : (
								<ArrowDownRight className="w-4 h-4 text-red-500" />
							)}
							<span 
								className={`text-sm font-medium ${
									changeType === 'increase' ? 'text-green-500' : 'text-red-500'
								}`}
							>
								{Math.abs(change)}%
							</span>
							<span 
								className="text-sm"
								style={{ color: colors.text.tertiary }}
							>
								from last month
							</span>
						</div>
					)}
				</div>
				<div 
					className="w-12 h-12 rounded-xl flex items-center justify-center"
					style={{ backgroundColor: bgColor }}
				>
					<span style={{ color }}>
						{icon}
					</span>
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
		<div className="flex items-start space-x-3 py-3">
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

	return (
		<div 
			className="p-4 rounded-lg border transition-transform duration-200 hover:scale-105 cursor-pointer"
			style={{ 
				backgroundColor: colors.surface,
				borderColor: colors.border
			}}
			onClick={onViewDetails}
		>
			<div className="flex items-center space-x-3">
				<div 
					className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-semibold"
					style={{ 
						backgroundColor: colors.primary,
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
						className="text-sm font-medium truncate"
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
					<p 
						className="text-xs"
						style={{ color: colors.text.tertiary }}
					>
						Matched {new Date(match.matchedAt).toLocaleDateString()}
					</p>
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
						profileViewsByTeams: 15,
						profileCompletionProgress: 85
					}
				})
				setActivities([
					{
						id: '1',
						type: 'talent_liked_job',
						timestamp: new Date().toISOString(),
						title: 'New Job Like',
						description: 'Sarah Johnson liked your Frontend Developer position'
					},
					{
						id: '2',
						type: 'mutual_match',
						timestamp: new Date(Date.now() - 3600000).toISOString(),
						title: 'Mutual Match!',
						description: 'You and TechCorp have a mutual match for Backend Developer'
					}
				])
				setTopMatches([
					{
						id: '1',
						jobId: 'job1',
						talentId: 'talent1',
						teamId: 'team1',
						jobTitle: 'Frontend Developer',
						companyName: 'TechCorp',
						talentName: 'Sarah Johnson',
						talentEmail: 'sarah@example.com',
						matchedAt: new Date().toISOString(),
						creditsSpent: 5,
						profileViewed: false
					}
				])
			} finally {
				setLoading(false)
			}
		}

		fetchDashboardData()
	}, [])

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

	const getMetricCards = () => {
		if (isTeam && metrics?.teams) {
			return [
				{
					title: 'Active Job Postings',
					value: metrics.teams.totalActiveJobPostings,
					icon: <Briefcase className="w-6 h-6" />,
					change: 12,
					changeType: 'increase' as const,
					color: colors.primary,
					bgColor: `${colors.primary}20`
				},
				{
					title: 'Total Likes Received',
					value: metrics.teams.totalTalentLikesReceived,
					icon: <Heart className="w-6 h-6" />,
					change: 8,
					changeType: 'increase' as const,
					color: colors.error,
					bgColor: `${colors.error}20`
				},
				{
					title: 'Mutual Matches',
					value: metrics.teams.totalMutualMatches,
					icon: <Award className="w-6 h-6" />,
					change: 15,
					changeType: 'increase' as const,
					color: colors.success,
					bgColor: `${colors.success}20`
				},
				{
					title: 'Credits Remaining',
					value: metrics.teams.creditsRemaining,
					icon: <CreditCard className="w-6 h-6" />,
					color: colors.warning,
					bgColor: `${colors.warning}20`
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
					color: colors.primary,
					bgColor: `${colors.primary}20`
				},
				{
					title: 'Mutual Matches',
					value: metrics.talents.totalMutualMatches,
					icon: <Award className="w-6 h-6" />,
					change: 12,
					changeType: 'increase' as const,
					color: colors.success,
					bgColor: `${colors.success}20`
				},
				{
					title: 'Profile Views',
					value: metrics.talents.profileViewsByTeams,
					icon: <Eye className="w-6 h-6" />,
					change: 31,
					changeType: 'increase' as const,
					color: colors.info,
					bgColor: `${colors.info}20`
				},
				{
					title: 'Profile Complete',
					value: `${metrics.talents.profileCompletionProgress}%`,
					icon: <Target className="w-6 h-6" />,
					color: colors.secondary,
					bgColor: `${colors.secondary}20`
				}
			]
		}
		return []
	}

	const metricCards = getMetricCards()

	return (
		<div className="space-y-6">
			{/* Metrics Cards */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
				{metricCards.map((card, index) => (
					<MetricCard key={index} {...card} />
				))}
			</div>

			{/* Subscription Banner (Teams only) */}
			{isTeam && user.subscriptionPlan && (
				<div 
					className="p-6 rounded-xl border-l-4"
					style={{ 
						backgroundColor: colors.surfaceVariant,
						borderLeftColor: colors.primary,
						borderTopColor: colors.border,
						borderRightColor: colors.border,
						borderBottomColor: colors.border
					}}
				>
					<div className="flex items-center justify-between">
						<div>
							<h3 
								className="text-lg font-semibold"
								style={{ color: colors.text.primary }}
							>
								{user.subscriptionPlan.name} Plan
							</h3>
							<p 
								className="text-sm mt-1"
								style={{ color: colors.text.secondary }}
							>
								{user.subscriptionPlan.creditsPerMonth} credits per month • 
								Renews on {new Date(user.subscriptionPlan.renewalDate).toLocaleDateString()}
							</p>
						</div>
						<button 
							className="px-4 py-2 rounded-lg font-medium transition-opacity duration-200 hover:opacity-90"
							style={{ 
								backgroundColor: colors.primary,
								color: colors.text.inverse
							}}
						>
							Upgrade Plan
						</button>
					</div>
				</div>
			)}

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				{/* Recent Activity Feed */}
				<div 
					className="lg:col-span-2 p-6 rounded-xl border"
					style={{ 
						backgroundColor: colors.surface,
						borderColor: colors.border
					}}
				>
					<div className="flex items-center justify-between mb-6">
						<h2 
							className="text-xl font-semibold"
							style={{ color: colors.text.primary }}
						>
							Recent Activity
						</h2>
						<Clock className="w-5 h-5" style={{ color: colors.text.secondary }} />
					</div>

					<div className="space-y-1">
						{activities.length > 0 ? (
							activities.map((activity) => (
								<ActivityItem key={activity.id} activity={activity} />
							))
						) : (
							<div className="text-center py-8">
								<Activity 
									className="w-12 h-12 mx-auto mb-4"
									style={{ color: colors.text.tertiary }}
								/>
								<p 
									className="text-sm"
									style={{ color: colors.text.secondary }}
								>
									No recent activity to show
								</p>
							</div>
						)}
					</div>
				</div>

				{/* Top Matches */}
				<div 
					className="p-6 rounded-xl border"
					style={{ 
						backgroundColor: colors.surface,
						borderColor: colors.border
					}}
				>
					<div className="flex items-center justify-between mb-6">
						<h2 
							className="text-xl font-semibold"
							style={{ color: colors.text.primary }}
						>
							Top Matches
						</h2>
						<Award className="w-5 h-5" style={{ color: colors.text.secondary }} />
					</div>

					<div className="space-y-4">
						{topMatches.length > 0 ? (
							topMatches.slice(0, 5).map((match) => (
								<MatchCard 
									key={match.id} 
									match={match} 
									userType={user.userType}
									onViewDetails={() => {
										// Navigate to match details or profile
										console.log('View match details:', match.id)
									}}
								/>
							))
						) : (
							<div className="text-center py-8">
								<Heart 
									className="w-12 h-12 mx-auto mb-4"
									style={{ color: colors.text.tertiary }}
								/>
								<p 
									className="text-sm"
									style={{ color: colors.text.secondary }}
								>
									No matches yet
								</p>
							</div>
						)}
					</div>

					{topMatches.length > 5 && (
						<button 
							className="w-full mt-4 py-2 text-sm font-medium rounded-lg transition-opacity duration-200 hover:opacity-90"
							style={{ 
								backgroundColor: colors.primary,
								color: colors.text.inverse
							}}
						>
							View All Matches
						</button>
					)}
				</div>
			</div>

			{/* Performance Charts */}
			<div 
				className="p-6 rounded-xl border"
				style={{ 
					backgroundColor: colors.surface,
					borderColor: colors.border
				}}
			>
				<div className="flex items-center justify-between mb-6">
					<h2 
						className="text-xl font-semibold"
						style={{ color: colors.text.primary }}
					>
						Performance Overview
					</h2>
					<BarChart3 className="w-5 h-5" style={{ color: colors.text.secondary }} />
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<div className="text-center py-12">
						<TrendingUp 
							className="w-16 h-16 mx-auto mb-4"
							style={{ color: colors.text.tertiary }}
						/>
						<p 
							className="text-sm"
							style={{ color: colors.text.secondary }}
						>
							Likes over time chart will be displayed here
						</p>
					</div>
					<div className="text-center py-12">
						<TrendingUp 
							className="w-16 h-16 mx-auto mb-4"
							style={{ color: colors.text.tertiary }}
						/>
						<p 
							className="text-sm"
							style={{ color: colors.text.secondary }}
						>
							Matches over time chart will be displayed here
						</p>
					</div>
				</div>
			</div>
		</div>
	)
} 