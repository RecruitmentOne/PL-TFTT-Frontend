import { useState, useEffect, useCallback } from 'react'
import { Bell, Eye, Heart, MessageCircle, UserCheck, Briefcase, TrendingUp, Clock, MapPin, Building, Star, Zap, AlertCircle } from 'lucide-react'
import { useRealTime } from '../../hooks/useRealTime'
import { useAppSelector } from '../../store/hooks'
import api from '../../services/api'

interface Activity {
	id: string
	type: 'profile_view' | 'match' | 'application' | 'message' | 'job_alert' | 'skill_update' | 'achievement'
	title: string
	description: string
	timestamp: string
	isRead: boolean
	metadata?: {
		companyName?: string
		jobTitle?: string
		location?: string
		matchScore?: number
		skillName?: string
		achievementType?: string
		viewerInfo?: {
			title: string
			company: string
			location: string
		}
	}
	priority: 'low' | 'medium' | 'high'
	actionUrl?: string
}

interface RealTimeActivityFeedProps {
	className?: string
	showHeader?: boolean
	maxItems?: number
}

function RealTimeActivityFeed({ 
	className = '', 
	showHeader = true, 
	maxItems = 20 
}: RealTimeActivityFeedProps) {
	const [activities, setActivities] = useState<Activity[]>([])
	const [isLoading, setIsLoading] = useState(true)
	const [filter, setFilter] = useState<'all' | 'unread' | 'matches' | 'views'>('all')
	const [error, setError] = useState<string | null>(null)

	const { user } = useAppSelector(state => state.auth)
	const { isConnected } = useAppSelector(state => state.realtime)

	// Initialize real-time connection
	const { sendMessage } = useRealTime({
		enabled: true,
		userId: user?.id,
		userType: 'talent',
		autoReconnect: true
	})

	// Fetch activities from API
	const fetchActivities = useCallback(async () => {
		if (!user?.id) return

		try {
			setIsLoading(true)
			setError(null)
			
			const response = await api.get(`/activity-feed/${user.id}?limit=${maxItems}`)
			
			if (response.data?.activities) {
				const transformedActivities: Activity[] = response.data.activities.map((item: any) => ({
					id: item.id,
					type: item.type,
					title: item.title,
					description: item.description,
					timestamp: item.timestamp,
					isRead: item.isRead || false,
					metadata: item.metadata,
					priority: item.priority || 'medium',
					actionUrl: item.actionUrl
				}))
				
				setActivities(transformedActivities)
			}
		} catch (err) {
			console.error('Error fetching activities:', err)
			setError('Failed to load activities')
		} finally {
			setIsLoading(false)
		}
	}, [user?.id, maxItems])

	// Initial data fetch
	useEffect(() => {
		fetchActivities()
	}, [fetchActivities])

	// Periodic refresh when not connected via WebSocket
	useEffect(() => {
		if (!isConnected) {
			const interval = setInterval(fetchActivities, 30000) // 30 seconds
			return () => clearInterval(interval)
		}
	}, [isConnected, fetchActivities])

	// Handle real-time activity updates
	useEffect(() => {
		if (isConnected && sendMessage) {
			// Subscribe to activity updates
			sendMessage({
				type: 'subscribe',
				channel: 'activities',
				userId: user?.id
			})
		}
	}, [isConnected, sendMessage, user?.id])

	const getActivityIcon = (type: string, priority: string) => {
		const iconClass = `w-5 h-5 ${
			priority === 'high' ? 'text-red-500' : 
			priority === 'medium' ? 'text-blue-500' : 
			'text-gray-500'
		}`

		switch (type) {
			case 'profile_view':
				return <Eye className={iconClass} />
			case 'match':
				return <Heart className={iconClass} />
			case 'application':
				return <Briefcase className={iconClass} />
			case 'message':
				return <MessageCircle className={iconClass} />
			case 'job_alert':
				return <Bell className={iconClass} />
			case 'skill_update':
				return <TrendingUp className={iconClass} />
			case 'achievement':
				return <Star className={iconClass} />
			default:
				return <AlertCircle className={iconClass} />
		}
	}

	const getActivityBadgeColor = (type: string) => {
		switch (type) {
			case 'profile_view':
				return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
			case 'match':
				return 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300'
			case 'application':
				return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
			case 'message':
				return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300'
			case 'job_alert':
				return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300'
			case 'skill_update':
				return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300'
			case 'achievement':
				return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
			default:
				return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
		}
	}

	const formatTimeAgo = (timestamp: string) => {
		const now = new Date()
		const time = new Date(timestamp)
		const diffInMinutes = Math.floor((now.getTime() - time.getTime()) / (1000 * 60))

		if (diffInMinutes < 1) return 'Just now'
		if (diffInMinutes < 60) return `${diffInMinutes}m ago`
		
		const diffInHours = Math.floor(diffInMinutes / 60)
		if (diffInHours < 24) return `${diffInHours}h ago`
		
		const diffInDays = Math.floor(diffInHours / 24)
		if (diffInDays < 7) return `${diffInDays}d ago`
		
		return time.toLocaleDateString()
	}

	const filteredActivities = activities.filter(activity => {
		switch (filter) {
			case 'unread':
				return !activity.isRead
			case 'matches':
				return activity.type === 'match'
			case 'views':
				return activity.type === 'profile_view'
			default:
				return true
		}
	})

	const markAsRead = async (activityId: string) => {
		try {
			await api.put(`/activity-feed/${activityId}/read`)
			setActivities(prev => 
				prev.map(activity => 
					activity.id === activityId 
						? { ...activity, isRead: true }
						: activity
				)
			)
		} catch (err) {
			console.error('Error marking activity as read:', err)
		}
	}

	const markAllAsRead = async () => {
		try {
			await api.put(`/activity-feed/mark-all-read/${user?.id}`)
			setActivities(prev => 
				prev.map(activity => ({ ...activity, isRead: true }))
			)
		} catch (err) {
			console.error('Error marking all activities as read:', err)
		}
	}

	if (error) {
		return (
			<div className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 ${className}`}>
				<div className="text-center">
					<AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
					<h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
						Unable to Load Activities
					</h3>
					<p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
					<button
						onClick={fetchActivities}
						className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
					>
						Try Again
					</button>
				</div>
			</div>
		)
	}

	return (
		<div className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 ${className}`}>
			{showHeader && (
				<div className="p-6 border-b border-gray-200 dark:border-gray-700">
					<div className="flex items-center justify-between mb-4">
						<div className="flex items-center space-x-3">
							<div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
								<Zap className="w-5 h-5 text-blue-600 dark:text-blue-400" />
							</div>
							<div>
								<h2 className="text-xl font-bold text-gray-900 dark:text-white">
									Live Activity Feed
								</h2>
								<p className="text-sm text-gray-600 dark:text-gray-400">
									Real-time updates on your profile activity
								</p>
							</div>
						</div>
						<div className="flex items-center space-x-2">
							<div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} />
							<span className="text-sm text-gray-600 dark:text-gray-400">
								{isConnected ? 'Live' : 'Offline'}
							</span>
						</div>
					</div>

					{/* Filter Tabs */}
					<div className="flex space-x-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
						{[
							{ key: 'all', label: 'All' },
							{ key: 'unread', label: 'Unread' },
							{ key: 'matches', label: 'Matches' },
							{ key: 'views', label: 'Views' }
						].map(tab => (
							<button
								key={tab.key}
								onClick={() => setFilter(tab.key as any)}
								className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
									filter === tab.key
										? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm'
										: 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
								}`}
							>
								{tab.label}
							</button>
						))}
					</div>

					{filteredActivities.some(a => !a.isRead) && (
						<button
							onClick={markAllAsRead}
							className="mt-3 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
						>
							Mark all as read
						</button>
					)}
				</div>
			)}

			<div className="p-6">
				{isLoading ? (
					<div className="space-y-4">
						{[...Array(5)].map((_, i) => (
							<div key={i} className="flex items-start space-x-3 animate-pulse">
								<div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full" />
								<div className="flex-1 space-y-2">
									<div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
									<div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
								</div>
							</div>
						))}
					</div>
				) : filteredActivities.length === 0 ? (
					<div className="text-center py-8">
						<Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
						<h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
							No Activities Yet
						</h3>
						<p className="text-gray-600 dark:text-gray-400">
							{filter === 'all' 
								? "Your activity feed will appear here as you interact with the platform."
								: `No ${filter} activities found.`
							}
						</p>
					</div>
				) : (
					<div className="space-y-4">
						{filteredActivities.map((activity) => (
							<div
								key={activity.id}
								className={`flex items-start space-x-3 p-4 rounded-lg border transition-colors cursor-pointer ${
									activity.isRead
										? 'bg-gray-50 dark:bg-gray-900/50 border-gray-200 dark:border-gray-700'
										: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800'
								} hover:bg-gray-100 dark:hover:bg-gray-700`}
								onClick={() => !activity.isRead && markAsRead(activity.id)}
							>
								<div className={`p-2 rounded-full ${
									activity.isRead ? 'bg-gray-200 dark:bg-gray-700' : 'bg-white dark:bg-gray-800'
								}`}>
									{getActivityIcon(activity.type, activity.priority)}
								</div>

								<div className="flex-1 min-w-0">
									<div className="flex items-start justify-between">
										<div className="flex-1">
											<div className="flex items-center space-x-2 mb-1">
												<h4 className={`text-sm font-medium ${
													activity.isRead ? 'text-gray-700 dark:text-gray-300' : 'text-gray-900 dark:text-white'
												}`}>
													{activity.title}
												</h4>
												<span className={`px-2 py-1 text-xs font-medium rounded-full ${getActivityBadgeColor(activity.type)}`}>
													{activity.type.replace('_', ' ')}
												</span>
											</div>
											<p className={`text-sm ${
												activity.isRead ? 'text-gray-500 dark:text-gray-400' : 'text-gray-600 dark:text-gray-300'
											}`}>
												{activity.description}
											</p>

											{/* Metadata display */}
											{activity.metadata && (
												<div className="mt-2 space-y-1">
													{activity.metadata.companyName && (
														<div className="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400">
															<Building className="w-3 h-3" />
															<span>{activity.metadata.companyName}</span>
														</div>
													)}
													{activity.metadata.location && (
														<div className="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400">
															<MapPin className="w-3 h-3" />
															<span>{activity.metadata.location}</span>
														</div>
													)}
													{activity.metadata.matchScore && (
														<div className="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400">
															<Star className="w-3 h-3" />
															<span>{activity.metadata.matchScore}% match</span>
														</div>
													)}
												</div>
											)}
										</div>

										<div className="flex items-center space-x-2 ml-2">
											<div className="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400">
												<Clock className="w-3 h-3" />
												<span>{formatTimeAgo(activity.timestamp)}</span>
											</div>
											{!activity.isRead && (
												<div className="w-2 h-2 bg-blue-500 rounded-full" />
											)}
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	)
}

export default RealTimeActivityFeed 