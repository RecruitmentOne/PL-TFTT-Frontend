import { useState, useEffect, useCallback } from 'react'
import { useAppSelector } from '../../store/hooks'
import { realtimeAPI } from '../../services/api'
import { 
	Bell, 
	X, 
	Check, 
	Eye, 
	Heart, 
	Target, 
	Briefcase, 
	Star, 
	Clock,
	Building2,
	Users,
	CheckCircle2,
	AlertCircle,
	Info,
	Trash2,
	Settings,
	Filter
} from 'lucide-react'

interface Notification {
	id: string
	type: 'profile_view' | 'match' | 'application' | 'message' | 'system' | 'achievement'
	title: string
	message: string
	timestamp: string
	isRead: boolean
	priority: 'low' | 'normal' | 'high' | 'urgent'
	actionUrl?: string
	metadata?: {
		companyName?: string
		jobTitle?: string
		matchScore?: number
		viewerCount?: number
	}
}

interface LiveNotificationCenterProps {
	isOpen: boolean
	onClose: () => void
	className?: string
}

function LiveNotificationCenter({ isOpen, onClose, className = '' }: LiveNotificationCenterProps) {
	const { user } = useAppSelector(state => state.auth)
	const { isConnected } = useAppSelector(state => state.realtime)
	
	const [notifications, setNotifications] = useState<Notification[]>([])
	const [loading, setLoading] = useState(false)
	const [filter, setFilter] = useState<'all' | 'unread' | 'important'>('all')
	const [selectedNotifications, setSelectedNotifications] = useState<string[]>([])

	// Fetch notifications
	const fetchNotifications = useCallback(async () => {
		if (!user?.id) return

		setLoading(true)
		try {
			const response = await realtimeAPI.getNotifications(user.id, 20, 0)
			setNotifications(response.notifications || [])
		} catch (error) {
			console.error('Error fetching notifications:', error)
		} finally {
			setLoading(false)
		}
	}, [user?.id])

	// Initial fetch
	useEffect(() => {
		if (isOpen && user?.id) {
			fetchNotifications()
		}
	}, [isOpen, user?.id, fetchNotifications])

	// Real-time updates
	useEffect(() => {
		if (isConnected && user?.id) {
			const interval = setInterval(() => {
				fetchNotifications()
			}, 30000) // Fetch every 30 seconds

			return () => clearInterval(interval)
		}
	}, [isConnected, user?.id, fetchNotifications])

	// Mark notification as read
	const markAsRead = useCallback(async (notificationId: string) => {
		try {
			await realtimeAPI.markNotificationRead(notificationId)
			setNotifications(prev => 
				prev.map(notif => 
					notif.id === notificationId 
						? { ...notif, isRead: true } 
						: notif
				)
			)
		} catch (error) {
			console.error('Error marking notification as read:', error)
		}
	}, [])

	// Mark all as read
	const markAllAsRead = useCallback(async () => {
		if (!user?.id) return

		try {
			await realtimeAPI.markAllNotificationsRead(user.id)
			setNotifications(prev => 
				prev.map(notif => ({ ...notif, isRead: true }))
			)
		} catch (error) {
			console.error('Error marking all notifications as read:', error)
		}
	}, [user?.id])

	// Delete notification
	const deleteNotification = useCallback(async (notificationId: string) => {
		try {
			await realtimeAPI.deleteNotification(notificationId)
			setNotifications(prev => prev.filter(notif => notif.id !== notificationId))
		} catch (error) {
			console.error('Error deleting notification:', error)
		}
	}, [])

	// Bulk actions
	const handleBulkAction = useCallback(async (action: 'read' | 'delete') => {
		if (selectedNotifications.length === 0) return

		try {
			const notificationIds = selectedNotifications.map(id => parseInt(id))
			
			if (action === 'read') {
				await realtimeAPI.bulkMarkAsRead(notificationIds)
				setNotifications(prev => 
					prev.map(notif => 
						selectedNotifications.includes(notif.id) 
							? { ...notif, isRead: true } 
							: notif
					)
				)
			} else if (action === 'delete') {
				await realtimeAPI.bulkDelete(notificationIds)
				setNotifications(prev => 
					prev.filter(notif => !selectedNotifications.includes(notif.id))
				)
			}
			
			setSelectedNotifications([])
		} catch (error) {
			console.error(`Error performing bulk ${action}:`, error)
		}
	}, [selectedNotifications])

	// Get notification icon
	const getNotificationIcon = (type: string, priority: string) => {
		const iconClass = priority === 'urgent' ? 'text-red-600' : 
						 priority === 'high' ? 'text-orange-600' :
						 priority === 'normal' ? 'text-blue-600' : 'text-gray-600'

		switch (type) {
			case 'profile_view': return <Eye className={`w-4 h-4 ${iconClass}`} />
			case 'match': return <Target className={`w-4 h-4 ${iconClass}`} />
			case 'application': return <Briefcase className={`w-4 h-4 ${iconClass}`} />
			case 'message': return <Bell className={`w-4 h-4 ${iconClass}`} />
			case 'achievement': return <Star className={`w-4 h-4 ${iconClass}`} />
			default: return <Info className={`w-4 h-4 ${iconClass}`} />
		}
	}

	// Get priority badge
	const getPriorityBadge = (priority: string) => {
		switch (priority) {
			case 'urgent': return 'bg-red-100 text-red-800 border-red-200'
			case 'high': return 'bg-orange-100 text-orange-800 border-orange-200'
			case 'normal': return 'bg-blue-100 text-blue-800 border-blue-200'
			default: return 'bg-gray-100 text-gray-800 border-gray-200'
		}
	}

	// Format timestamp
	const formatTimeAgo = (timestamp: string) => {
		const date = new Date(timestamp)
		const now = new Date()
		const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)
		
		if (diffInSeconds < 60) return 'Just now'
		if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`
		if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`
		return `${Math.floor(diffInSeconds / 86400)}d ago`
	}

	// Filter notifications
	const filteredNotifications = notifications.filter(notification => {
		switch (filter) {
			case 'unread': return !notification.isRead
			case 'important': return notification.priority === 'high' || notification.priority === 'urgent'
			default: return true
		}
	})

	const unreadCount = notifications.filter(n => !n.isRead).length

	if (!isOpen) return null

	return (
		<div className={`fixed inset-0 z-50 ${className}`}>
			{/* Backdrop */}
			<div className="fixed inset-0 bg-black bg-opacity-25" onClick={onClose} />
			
			{/* Notification Panel */}
			<div className="fixed right-0 top-0 h-full w-96 bg-white shadow-xl transform transition-transform duration-300 ease-in-out">
				{/* Header */}
				<div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
					<div className="flex items-center space-x-3">
						<div className="relative">
							<Bell className="w-6 h-6 text-gray-700" />
							{unreadCount > 0 && (
								<span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
									{unreadCount > 9 ? '9+' : unreadCount}
								</span>
							)}
						</div>
						<div>
							<h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
							{isConnected && (
								<div className="flex items-center text-xs text-green-600">
									<div className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse"></div>
									Live
								</div>
							)}
						</div>
					</div>
					<div className="flex items-center space-x-2">
						<button
							onClick={markAllAsRead}
							className="p-1 text-gray-500 hover:text-gray-700 transition-colors"
							title="Mark all as read"
							disabled={unreadCount === 0}
						>
							<CheckCircle2 className="w-4 h-4" />
						</button>
						<button
							onClick={onClose}
							className="p-1 text-gray-500 hover:text-gray-700 transition-colors"
						>
							<X className="w-5 h-5" />
						</button>
					</div>
				</div>

				{/* Filters */}
				<div className="p-4 border-b border-gray-200">
					<div className="flex space-x-2">
						{['all', 'unread', 'important'].map((filterOption) => (
							<button
								key={filterOption}
								onClick={() => setFilter(filterOption as any)}
								className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
									filter === filterOption
										? 'bg-blue-600 text-white'
										: 'bg-gray-100 text-gray-700 hover:bg-gray-200'
								}`}
							>
								{filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
								{filterOption === 'unread' && unreadCount > 0 && (
									<span className="ml-1 bg-white text-blue-600 text-xs rounded-full px-1">
										{unreadCount}
									</span>
								)}
							</button>
						))}
					</div>

					{/* Bulk Actions */}
					{selectedNotifications.length > 0 && (
						<div className="mt-3 flex items-center space-x-2">
							<span className="text-sm text-gray-600">
								{selectedNotifications.length} selected
							</span>
							<button
								onClick={() => handleBulkAction('read')}
								className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200 transition-colors"
							>
								Mark Read
							</button>
							<button
								onClick={() => handleBulkAction('delete')}
								className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded hover:bg-red-200 transition-colors"
							>
								Delete
							</button>
						</div>
					)}
				</div>

				{/* Notification List */}
				<div className="flex-1 overflow-y-auto">
					{loading ? (
						<div className="p-8 text-center">
							<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
							<p className="text-gray-600 mt-2">Loading notifications...</p>
						</div>
					) : filteredNotifications.length === 0 ? (
						<div className="p-8 text-center">
							<Bell className="w-12 h-12 text-gray-400 mx-auto mb-2" />
							<p className="text-gray-600">No notifications to show</p>
						</div>
					) : (
						<div className="divide-y divide-gray-200">
							{filteredNotifications.map((notification) => (
								<div
									key={notification.id}
									className={`p-4 hover:bg-gray-50 transition-colors cursor-pointer ${
										!notification.isRead ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
									}`}
									onClick={() => !notification.isRead && markAsRead(notification.id)}
								>
									<div className="flex items-start space-x-3">
										{/* Checkbox */}
										<input
											type="checkbox"
											checked={selectedNotifications.includes(notification.id)}
											onChange={(e) => {
												e.stopPropagation()
												setSelectedNotifications(prev =>
													e.target.checked
														? [...prev, notification.id]
														: prev.filter(id => id !== notification.id)
												)
											}}
											className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
										/>

										{/* Icon */}
										<div className="flex-shrink-0 mt-1">
											{getNotificationIcon(notification.type, notification.priority)}
										</div>

										{/* Content */}
										<div className="flex-1 min-w-0">
											<div className="flex items-start justify-between">
												<div className="flex-1">
													<h4 className={`text-sm font-medium ${
														!notification.isRead ? 'text-gray-900' : 'text-gray-700'
													}`}>
														{notification.title}
													</h4>
													<p className="text-sm text-gray-600 mt-1">
														{notification.message}
													</p>
													
													{/* Metadata */}
													{notification.metadata && (
														<div className="mt-2 flex items-center space-x-3 text-xs text-gray-500">
															{notification.metadata.companyName && (
																<div className="flex items-center">
																	<Building2 className="w-3 h-3 mr-1" />
																	{notification.metadata.companyName}
																</div>
															)}
															{notification.metadata.matchScore && (
																<div className="flex items-center">
																	<Star className="w-3 h-3 mr-1" />
																	{notification.metadata.matchScore}% match
																</div>
															)}
															{notification.metadata.viewerCount && (
																<div className="flex items-center">
																	<Users className="w-3 h-3 mr-1" />
																	{notification.metadata.viewerCount} viewers
																</div>
															)}
														</div>
													)}
												</div>
												
												{/* Priority Badge & Actions */}
												<div className="flex items-center space-x-2 ml-2">
													{notification.priority !== 'low' && (
														<span className={`text-xs px-2 py-1 rounded-full border ${getPriorityBadge(notification.priority)}`}>
															{notification.priority}
														</span>
													)}
													<button
														onClick={(e) => {
															e.stopPropagation()
															deleteNotification(notification.id)
														}}
														className="text-gray-400 hover:text-red-600 transition-colors"
													>
														<Trash2 className="w-3 h-3" />
													</button>
												</div>
											</div>
											
											<div className="flex items-center justify-between mt-3">
												<div className="flex items-center text-xs text-gray-500">
													<Clock className="w-3 h-3 mr-1" />
													{formatTimeAgo(notification.timestamp)}
												</div>
												{!notification.isRead && (
													<div className="w-2 h-2 bg-blue-500 rounded-full"></div>
												)}
											</div>
										</div>
									</div>
								</div>
							))}
						</div>
					)}
				</div>

				{/* Footer */}
				<div className="p-4 border-t border-gray-200 bg-gray-50">
					<div className="flex items-center justify-between">
						<div className="text-xs text-gray-500">
							{filteredNotifications.length} of {notifications.length} notifications
						</div>
						<div className="flex items-center space-x-2">
							<button className="text-xs text-blue-600 hover:text-blue-800 transition-colors">
								<Settings className="w-4 h-4" />
							</button>
							<button className="text-xs bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors">
								View All
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default LiveNotificationCenter 