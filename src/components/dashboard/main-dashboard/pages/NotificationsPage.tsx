import React, { useState, useEffect } from 'react'
import { 
	Bell, 
	Heart, 
	Users, 
	Eye, 
	CreditCard,
	Award,
	Check,
	CheckCircle,
	Trash2,
	Filter,
	Search,
	Calendar,
	MoreVertical,
	Circle,
	Archive
} from 'lucide-react'
import { useBrandColors } from '../../../brand'
import { Notification, DashboardUser } from '../../../types/dashboard'
import { dashboardAPI } from '../../../services/dashboardAPI'

interface NotificationsPageProps {
	user: DashboardUser
}

interface NotificationItemProps {
	notification: Notification
	onMarkRead: () => void
	onDelete: () => void
}

interface NotificationFilterProps {
	onFilterChange: (filters: any) => void
}

function NotificationItem({ notification, onMarkRead, onDelete }: NotificationItemProps) {
	const colors = useBrandColors()
	const [showActions, setShowActions] = useState(false)

	const getNotificationIcon = () => {
		switch (notification.type) {
			case 'like':
				return <Heart className="w-5 h-5" style={{ color: colors.error }} />
			case 'match':
				return <Award className="w-5 h-5" style={{ color: colors.success }} />
			case 'credit_spent':
				return <CreditCard className="w-5 h-5" style={{ color: colors.warning }} />
			case 'profile_viewed':
				return <Eye className="w-5 h-5" style={{ color: colors.info }} />
			default:
				return <Bell className="w-5 h-5" style={{ color: colors.text.secondary }} />
		}
	}

	const getNotificationBgColor = () => {
		if (!notification.read) {
			return colors.surfaceVariant
		}
		return colors.surface
	}

	return (
		<div 
			className={`p-4 rounded-lg border transition-all duration-200 hover:scale-105 relative ${
				!notification.read ? 'ring-1 ring-opacity-20' : ''
			}`}
			style={{ 
				backgroundColor: getNotificationBgColor(),
				borderColor: colors.border,
				...((!notification.read) && { '--tw-ring-color': colors.primary + '20' })
			}}
		>
			<div className="flex items-start space-x-3">
				{/* Icon */}
				<div className="flex-shrink-0 mt-1">
					{getNotificationIcon()}
				</div>

				{/* Content */}
				<div className="flex-1 min-w-0">
					<div className="flex items-start justify-between">
						<div className="flex-1">
							<h4 
								className={`text-sm font-medium ${!notification.read ? 'font-semibold' : ''}`}
								style={{ color: colors.text.primary }}
							>
								{notification.title}
							</h4>
							<p 
								className="text-sm mt-1"
								style={{ color: colors.text.secondary }}
							>
								{notification.message}
							</p>
							<div className="flex items-center space-x-4 mt-2">
								<p 
									className="text-xs"
									style={{ color: colors.text.tertiary }}
								>
									{new Date(notification.timestamp).toLocaleDateString()} at{' '}
									{new Date(notification.timestamp).toLocaleTimeString([], { 
										hour: '2-digit', 
										minute: '2-digit' 
									})}
								</p>
								{!notification.read && (
									<span 
										className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full"
										style={{ 
											backgroundColor: colors.primary + '20',
											color: colors.primary
										}}
									>
										New
									</span>
								)}
							</div>
						</div>

						{/* Actions Menu */}
						<div className="relative">
							<button
								onClick={() => setShowActions(!showActions)}
								className="p-1 rounded-md transition-colors duration-200"
								style={{ 
									color: colors.text.secondary,
									backgroundColor: showActions ? colors.hover : 'transparent'
								}}
							>
								<MoreVertical className="w-4 h-4" />
							</button>

							{showActions && (
								<div 
									className="absolute right-0 top-full mt-1 w-32 rounded-lg border shadow-lg z-10"
									style={{ 
										backgroundColor: colors.surface,
										borderColor: colors.border
									}}
								>
									<div className="py-1">
										{!notification.read ? (
											<button
												onClick={() => {
													onMarkRead()
													setShowActions(false)
												}}
												className="w-full flex items-center space-x-2 px-3 py-2 text-left text-sm transition-colors duration-200"
												style={{ 
													color: colors.text.primary,
													backgroundColor: 'transparent'
												}}
												onMouseEnter={(e) => e.currentTarget.style.backgroundColor = colors.hover}
												onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
											>
												<Check className="w-4 h-4" />
												<span>Mark Read</span>
											</button>
										) : (
											<button
												className="w-full flex items-center space-x-2 px-3 py-2 text-left text-sm transition-colors duration-200"
												style={{ 
													color: colors.text.primary,
													backgroundColor: 'transparent'
												}}
												onMouseEnter={(e) => e.currentTarget.style.backgroundColor = colors.hover}
												onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
											>
												<Circle className="w-4 h-4" />
												<span>Mark Unread</span>
											</button>
										)}
										<button
											onClick={() => {
												onDelete()
												setShowActions(false)
											}}
											className="w-full flex items-center space-x-2 px-3 py-2 text-left text-sm transition-colors duration-200"
											style={{ 
												color: colors.error,
												backgroundColor: 'transparent'
											}}
											onMouseEnter={(e) => e.currentTarget.style.backgroundColor = colors.hover}
											onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
										>
											<Trash2 className="w-4 h-4" />
											<span>Delete</span>
										</button>
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>

			{/* Unread Indicator */}
			{!notification.read && (
				<div 
					className="absolute top-2 left-2 w-2 h-2 rounded-full"
					style={{ backgroundColor: colors.primary }}
				/>
			)}
		</div>
	)
}

function NotificationFilter({ onFilterChange }: NotificationFilterProps) {
	const colors = useBrandColors()
	const [showFilters, setShowFilters] = useState(false)
	const [filters, setFilters] = useState({
		search: '',
		type: '',
		status: '',
		dateRange: ''
	})

	const handleFilterChange = (newFilters: any) => {
		setFilters(newFilters)
		onFilterChange(newFilters)
	}

	return (
		<div 
			className="p-4 rounded-lg border mb-6"
			style={{ 
				backgroundColor: colors.surface,
				borderColor: colors.border
			}}
		>
			<div className="flex items-center space-x-4 mb-4">
				<div className="flex-1 relative">
					<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" 
						style={{ color: colors.text.secondary }} />
					<input
						type="text"
						placeholder="Search notifications..."
						value={filters.search}
						onChange={(e) => handleFilterChange({ ...filters, search: e.target.value })}
						className="w-full pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:border-current"
						style={{ 
							borderColor: colors.border,
							backgroundColor: colors.background,
							color: colors.text.primary
						}}
					/>
				</div>
				<button
					onClick={() => setShowFilters(!showFilters)}
					className="flex items-center space-x-2 px-4 py-2 rounded-lg border font-medium transition-colors duration-200"
					style={{ 
						borderColor: colors.border,
						backgroundColor: showFilters ? colors.primary : colors.background,
						color: showFilters ? colors.text.inverse : colors.text.primary
					}}
				>
					<Filter className="w-4 h-4" />
					<span>Filters</span>
				</button>
			</div>

			{showFilters && (
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					<div>
						<label 
							className="block text-sm font-medium mb-1"
							style={{ color: colors.text.secondary }}
						>
							Type
						</label>
						<select
							value={filters.type}
							onChange={(e) => handleFilterChange({ ...filters, type: e.target.value })}
							className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2"
							style={{ 
								borderColor: colors.border,
								backgroundColor: colors.background,
								color: colors.text.primary
							}}
						>
							<option value="">All types</option>
							<option value="like">Likes</option>
							<option value="match">Matches</option>
							<option value="credit_spent">Credits</option>
							<option value="profile_viewed">Profile Views</option>
						</select>
					</div>
					<div>
						<label 
							className="block text-sm font-medium mb-1"
							style={{ color: colors.text.secondary }}
						>
							Status
						</label>
						<select
							value={filters.status}
							onChange={(e) => handleFilterChange({ ...filters, status: e.target.value })}
							className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2"
							style={{ 
								borderColor: colors.border,
								backgroundColor: colors.background,
								color: colors.text.primary
							}}
						>
							<option value="">All notifications</option>
							<option value="unread">Unread only</option>
							<option value="read">Read only</option>
						</select>
					</div>
					<div>
						<label 
							className="block text-sm font-medium mb-1"
							style={{ color: colors.text.secondary }}
						>
							Date Range
						</label>
						<select
							value={filters.dateRange}
							onChange={(e) => handleFilterChange({ ...filters, dateRange: e.target.value })}
							className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2"
							style={{ 
								borderColor: colors.border,
								backgroundColor: colors.background,
								color: colors.text.primary
							}}
						>
							<option value="">All time</option>
							<option value="today">Today</option>
							<option value="week">This week</option>
							<option value="month">This month</option>
						</select>
					</div>
				</div>
			)}
		</div>
	)
}

export function NotificationsPage({ user }: NotificationsPageProps) {
	const [notifications, setNotifications] = useState<Notification[]>([])
	const [loading, setLoading] = useState(true)
	const [unreadCount, setUnreadCount] = useState(0)
	const [filters, setFilters] = useState({})
	const colors = useBrandColors()

	useEffect(() => {
		const fetchNotifications = async () => {
			try {
				setLoading(true)
				const response = await dashboardAPI.getNotifications()
				setNotifications(response.notifications)
				setUnreadCount(response.unreadCount)
			} catch (error) {
				console.error('Failed to fetch notifications:', error)
				// Mock data for demo
				setNotifications([
					{
						id: '1',
						type: 'like',
						title: 'New Job Like',
						message: 'Sarah Johnson liked your Frontend Developer position',
						timestamp: new Date().toISOString(),
						read: false,
						relatedJobId: 'job1',
						relatedTalentId: 'talent1'
					},
					{
						id: '2',
						type: 'match',
						title: 'Mutual Match!',
						message: 'You and TechCorp have a mutual match for Backend Developer',
						timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
						read: false,
						relatedJobId: 'job2',
						relatedTeamId: 'team1'
					},
					{
						id: '3',
						type: 'credit_spent',
						title: 'Credits Used',
						message: 'You spent 5 credits to view Michael Chen\'s profile',
						timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
						read: true,
						relatedTalentId: 'talent2',
						creditsAmount: 5
					},
					{
						id: '4',
						type: 'profile_viewed',
						title: 'Profile Viewed',
						message: 'A team viewed your profile',
						timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
						read: true,
						relatedTeamId: 'team2'
					},
					{
						id: '5',
						type: 'like',
						title: 'Job Application Interest',
						message: 'Emily Rodriguez liked your UI/UX Designer position',
						timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
						read: false,
						relatedJobId: 'job3',
						relatedTalentId: 'talent3'
					}
				])
				setUnreadCount(3)
			} finally {
				setLoading(false)
			}
		}

		fetchNotifications()
	}, [filters])

	const handleMarkRead = async (notificationId: string) => {
		try {
			await dashboardAPI.markNotificationRead(notificationId)
			setNotifications(prev => 
				prev.map(notif => 
					notif.id === notificationId ? { ...notif, read: true } : notif
				)
			)
			setUnreadCount(prev => Math.max(0, prev - 1))
		} catch (error) {
			console.error('Failed to mark notification as read:', error)
		}
	}

	const handleMarkAllRead = async () => {
		try {
			await dashboardAPI.markAllNotificationsRead()
			setNotifications(prev => 
				prev.map(notif => ({ ...notif, read: true }))
			)
			setUnreadCount(0)
		} catch (error) {
			console.error('Failed to mark all notifications as read:', error)
		}
	}

	const handleDeleteNotification = async (notificationId: string) => {
		try {
			await dashboardAPI.deleteNotification(notificationId)
			setNotifications(prev => prev.filter(notif => notif.id !== notificationId))
		} catch (error) {
			console.error('Failed to delete notification:', error)
		}
	}

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
		<div className="space-y-6">
			{/* Header */}
			<div className="flex items-center justify-between">
				<div>
					<h1 
						className="text-2xl font-bold"
						style={{ color: colors.text.primary }}
					>
						Notifications
					</h1>
					<p 
						className="text-sm mt-1"
						style={{ color: colors.text.secondary }}
					>
						{unreadCount > 0 ? 
							`${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}` :
							'All caught up!'
						}
					</p>
				</div>

				{/* Action Buttons */}
				<div className="flex items-center space-x-3">
					{unreadCount > 0 && (
						<button
							onClick={handleMarkAllRead}
							className="flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-opacity duration-200 hover:opacity-80"
							style={{ 
								backgroundColor: colors.success,
								color: colors.text.inverse
							}}
						>
							<CheckCircle className="w-4 h-4" />
							<span>Mark All Read</span>
						</button>
					)}
				</div>
			</div>

			{/* Stats */}
			<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
				<div 
					className="p-4 rounded-lg border text-center"
					style={{ 
						backgroundColor: colors.surface,
						borderColor: colors.border
					}}
				>
					<div 
						className="text-2xl font-bold"
						style={{ color: colors.text.primary }}
					>
						{notifications.length}
					</div>
					<div 
						className="text-sm"
						style={{ color: colors.text.secondary }}
					>
						Total
					</div>
				</div>
				<div 
					className="p-4 rounded-lg border text-center"
					style={{ 
						backgroundColor: colors.surface,
						borderColor: colors.border
					}}
				>
					<div 
						className="text-2xl font-bold"
						style={{ color: colors.primary }}
					>
						{unreadCount}
					</div>
					<div 
						className="text-sm"
						style={{ color: colors.text.secondary }}
					>
						Unread
					</div>
				</div>
				<div 
					className="p-4 rounded-lg border text-center"
					style={{ 
						backgroundColor: colors.surface,
						borderColor: colors.border
					}}
				>
					<div 
						className="text-2xl font-bold"
						style={{ color: colors.success }}
					>
						{notifications.filter(n => n.type === 'match').length}
					</div>
					<div 
						className="text-sm"
						style={{ color: colors.text.secondary }}
					>
						Matches
					</div>
				</div>
				<div 
					className="p-4 rounded-lg border text-center"
					style={{ 
						backgroundColor: colors.surface,
						borderColor: colors.border
					}}
				>
					<div 
						className="text-2xl font-bold"
						style={{ color: colors.error }}
					>
						{notifications.filter(n => n.type === 'like').length}
					</div>
					<div 
						className="text-sm"
						style={{ color: colors.text.secondary }}
					>
						Likes
					</div>
				</div>
			</div>

			{/* Filters */}
			<NotificationFilter onFilterChange={setFilters} />

			{/* Notifications List */}
			<div className="space-y-4">
				{notifications.length > 0 ? (
					notifications.map((notification) => (
						<NotificationItem
							key={notification.id}
							notification={notification}
							onMarkRead={() => handleMarkRead(notification.id)}
							onDelete={() => handleDeleteNotification(notification.id)}
						/>
					))
				) : (
					<div className="text-center py-12">
						<Bell 
							className="w-16 h-16 mx-auto mb-4"
							style={{ color: colors.text.tertiary }}
						/>
						<h3 
							className="text-lg font-medium mb-2"
							style={{ color: colors.text.primary }}
						>
							No notifications
						</h3>
						<p 
							className="text-sm"
							style={{ color: colors.text.secondary }}
						>
							You're all caught up! We'll notify you when something happens.
						</p>
					</div>
				)}
			</div>
		</div>
	)
} 