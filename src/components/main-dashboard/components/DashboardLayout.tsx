import React, { useState, useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { 
	Home, 
	Briefcase, 
	Users, 
	Heart, 
	CreditCard, 
	Bell, 
	Settings, 
	Menu, 
	X,
	User,
	LogOut
} from 'lucide-react'
import { useBrand, useBrandColors } from '../../../brand'
import { DashboardUser, Notification } from '../../../types/dashboard'
import { dashboardAPI } from '../../../services/dashboardAPI'

interface DashboardLayoutProps {
	user: DashboardUser
	onLogout: () => void
}

interface NavItem {
	id: string
	label: string
	icon: React.ReactNode
	path: string
	userTypes: ('team' | 'talent')[]
}

export function DashboardLayout({ user, onLogout }: DashboardLayoutProps) {
	const [sidebarOpen, setSidebarOpen] = useState(false)
	const [notifications, setNotifications] = useState<Notification[]>([])
	const [unreadCount, setUnreadCount] = useState(0)
	const [hoveredElement, setHoveredElement] = useState<string | null>(null)
	const location = useLocation()
	const navigate = useNavigate()
	const { currentVariant } = useBrand()
	const colors = useBrandColors()

	const isTeam = user.userType === 'team'

	const navItems: NavItem[] = [
		{
			id: 'home',
			label: 'Dashboard',
			icon: <Home className="w-5 h-5" />,
			path: '/dashboard',
			userTypes: ['team', 'talent']
		},
		{
			id: 'jobs',
			label: 'Jobs',
			icon: <Briefcase className="w-5 h-5" />,
			path: '/dashboard/jobs',
			userTypes: ['team', 'talent']
		},
		{
			id: 'talents',
			label: 'Talents',
			icon: <Users className="w-5 h-5" />,
			path: '/dashboard/talents',
			userTypes: ['team']
		},
		{
			id: 'matches',
			label: 'Matches',
			icon: <Heart className="w-5 h-5" />,
			path: '/dashboard/matches',
			userTypes: ['team', 'talent']
		},
		{
			id: 'credits',
			label: 'Credits',
			icon: <CreditCard className="w-5 h-5" />,
			path: '/dashboard/credits',
			userTypes: ['team']
		},
		{
			id: 'notifications',
			label: 'Notifications',
			icon: <Bell className="w-5 h-5" />,
			path: '/dashboard/notifications',
			userTypes: ['team', 'talent']
		},
		{
			id: 'settings',
			label: 'Settings',
			icon: <Settings className="w-5 h-5" />,
			path: '/dashboard/settings',
			userTypes: ['team', 'talent']
		}
	]

	const filteredNavItems = navItems.filter(item => 
		item.userTypes.includes(user.userType)
	)

	useEffect(() => {
		const fetchNotifications = async () => {
			try {
				const response = await dashboardAPI.getNotifications({ 
					limit: 5, 
					unreadOnly: true 
				})
				setNotifications(response.notifications)
				setUnreadCount(response.unreadCount)
			} catch (error) {
				console.error('Failed to fetch notifications:', error)
			}
		}

		fetchNotifications()
		
		// Poll for new notifications every 30 seconds
		const interval = setInterval(fetchNotifications, 30000)
		return () => clearInterval(interval)
	}, [])

	const handleNavigation = (path: string) => {
		navigate(path)
		setSidebarOpen(false)
	}

	const isActivePath = (path: string) => {
		if (path === '/dashboard') {
			return location.pathname === '/dashboard'
		}
		return location.pathname.startsWith(path)
	}

	const getUserDisplayName = () => {
		if (isTeam && user.companyName) {
			return user.companyName
		}
		return `${user.firstName} ${user.lastName}`
	}

	return (
		<div 
			className="min-h-screen flex"
			style={{ backgroundColor: colors.background }}
		>
			{/* Sidebar */}
			<div className={`
				fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0
				${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
			`}>
				<div 
					className="h-full flex flex-col"
					style={{ backgroundColor: colors.surface }}
				>
					{/* Logo Section */}
					<div className="flex items-center justify-between h-16 px-6 border-b"
						style={{ borderColor: colors.border }}
					>
						<div className="flex items-center space-x-3">
							<div 
								className="w-8 h-8 rounded-lg flex items-center justify-center"
								style={{ background: colors.gradients?.primary || colors.primary }}
							>
								<span className="text-white font-bold text-lg">T</span>
							</div>
							<span 
								className="text-xl font-bold"
								style={{ color: colors.text.primary }}
							>
								TFTT
							</span>
						</div>
						
						{/* Mobile close button */}
						<button
							onClick={() => setSidebarOpen(false)}
							className="lg:hidden p-2 rounded-md transition-colors duration-200"
							style={{ 
								color: colors.text.secondary,
								backgroundColor: hoveredElement === 'close-button' ? colors.hover : 'transparent'
							}}
							onMouseEnter={() => setHoveredElement('close-button')}
							onMouseLeave={() => setHoveredElement(null)}
						>
							<X className="w-5 h-5" />
						</button>
					</div>

					{/* User Info */}
					<div className="p-6 border-b" style={{ borderColor: colors.border }}>
						<div className="flex items-center space-x-3">
							<div 
								className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold"
								style={{ 
									backgroundColor: colors.primary,
									backgroundImage: user.profilePicture ? `url(${user.profilePicture})` : undefined,
									backgroundSize: 'cover',
									backgroundPosition: 'center'
								}}
							>
								{!user.profilePicture && (
									<User className="w-5 h-5" />
								)}
							</div>
							<div className="flex-1 min-w-0">
								<p 
									className="text-sm font-medium truncate"
									style={{ color: colors.text.primary }}
								>
									{getUserDisplayName()}
								</p>
								<p 
									className="text-xs truncate capitalize"
									style={{ color: colors.text.secondary }}
								>
									{user.userType} Account
								</p>
							</div>
						</div>
					</div>

					{/* Navigation */}
					<nav className="flex-1 px-4 py-6 space-y-1">
						{filteredNavItems.map((item) => {
							const isActive = isActivePath(item.path)
							const isHovered = hoveredElement === `nav-${item.id}`
							return (
								<button
									key={item.id}
									onClick={() => handleNavigation(item.path)}
									className="w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-left transition-all duration-200 shadow-sm"
									style={{
										backgroundColor: isActive ? colors.primary : (isHovered ? colors.hover : 'transparent'),
										color: isActive ? colors.text.inverse : colors.text.primary
									}}
									onMouseEnter={() => setHoveredElement(`nav-${item.id}`)}
									onMouseLeave={() => setHoveredElement(null)}
								>
									<span className={isActive ? 'text-white' : ''}>
										{item.icon}
									</span>
									<span className="font-medium">{item.label}</span>
									{item.id === 'notifications' && unreadCount > 0 && (
										<span 
											className="ml-auto text-xs px-2 py-1 rounded-full text-white"
											style={{ backgroundColor: colors.error }}
										>
											{unreadCount}
										</span>
									)}
								</button>
							)
						})}
					</nav>

					{/* Subscription Banner (Teams only) */}
					{isTeam && user.subscriptionPlan && (
						<div className="px-4 pb-4">
							<div 
								className="p-4 rounded-lg border"
								style={{ 
									backgroundColor: colors.surfaceVariant,
									borderColor: colors.border
								}}
							>
								<div className="flex items-center justify-between">
									<div>
										<p 
											className="text-sm font-medium"
											style={{ color: colors.text.primary }}
										>
											{user.subscriptionPlan.name} Plan
										</p>
										<p 
											className="text-xs"
											style={{ color: colors.text.secondary }}
										>
											{user.subscriptionPlan.creditsPerMonth} credits/month
										</p>
									</div>
									<button 
										className="text-xs px-3 py-1 rounded-md font-medium transition-opacity duration-200"
										style={{ 
											backgroundColor: colors.primary,
											color: colors.text.inverse,
											opacity: hoveredElement === 'upgrade-btn' ? 0.9 : 1
										}}
										onClick={() => handleNavigation('/dashboard/settings')}
										onMouseEnter={() => setHoveredElement('upgrade-btn')}
										onMouseLeave={() => setHoveredElement(null)}
									>
										Upgrade
									</button>
								</div>
							</div>
						</div>
					)}

					{/* Logout */}
					<div className="px-4 pb-6">
						<button
							onClick={onLogout}
							className="w-full flex items-center space-x-3 px-3 py-3 rounded-lg transition-colors duration-200"
							style={{ 
								color: hoveredElement === 'logout-btn' ? colors.text.primary : colors.text.secondary,
								backgroundColor: hoveredElement === 'logout-btn' ? colors.hover : 'transparent'
							}}
							onMouseEnter={() => setHoveredElement('logout-btn')}
							onMouseLeave={() => setHoveredElement(null)}
						>
							<LogOut className="w-5 h-5" />
							<span className="font-medium">Logout</span>
						</button>
					</div>
				</div>
			</div>

			{/* Mobile Overlay */}
			{sidebarOpen && (
				<div 
					className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
					onClick={() => setSidebarOpen(false)}
				/>
			)}

			{/* Main Content */}
			<div className="flex-1 flex flex-col min-w-0">
				{/* Header */}
				<header 
					className="h-16 flex items-center justify-between px-6 border-b"
					style={{ 
						backgroundColor: colors.background,
						borderColor: colors.border
					}}
				>
					<button
						onClick={() => setSidebarOpen(true)}
						className="lg:hidden p-2 rounded-md transition-colors duration-200"
						style={{ 
							color: colors.text.secondary,
							backgroundColor: hoveredElement === 'menu-btn' ? colors.hover : 'transparent'
						}}
						onMouseEnter={() => setHoveredElement('menu-btn')}
						onMouseLeave={() => setHoveredElement(null)}
					>
						<Menu className="w-5 h-5" />
					</button>

					<div className="flex-1 lg:flex-none">
						<h1 
							className="text-xl font-semibold"
							style={{ color: colors.text.primary }}
						>
							{location.pathname === '/dashboard' ? 'Dashboard' : 
							 location.pathname.split('/').pop()?.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
						</h1>
					</div>

					<div className="flex items-center space-x-4">
						{/* Notifications Bell */}
						<button
							onClick={() => handleNavigation('/dashboard/notifications')}
							className="relative p-2 rounded-md transition-colors duration-200"
							style={{ 
								color: colors.text.secondary,
								backgroundColor: hoveredElement === 'notifications-btn' ? colors.hover : 'transparent'
							}}
							onMouseEnter={() => setHoveredElement('notifications-btn')}
							onMouseLeave={() => setHoveredElement(null)}
						>
							<Bell className="w-5 h-5" />
							{unreadCount > 0 && (
								<span 
									className="absolute -top-1 -right-1 w-4 h-4 text-xs rounded-full flex items-center justify-center text-white"
									style={{ backgroundColor: colors.error }}
								>
									{unreadCount > 9 ? '9+' : unreadCount}
								</span>
							)}
						</button>

						{/* Profile Button */}
						<button
							onClick={() => handleNavigation('/dashboard/settings')}
							className="flex items-center space-x-2 p-2 rounded-md transition-colors duration-200"
							style={{ 
								color: colors.text.secondary,
								backgroundColor: hoveredElement === 'profile-btn' ? colors.hover : 'transparent'
							}}
							onMouseEnter={() => setHoveredElement('profile-btn')}
							onMouseLeave={() => setHoveredElement(null)}
						>
							<div 
								className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-semibold"
								style={{ 
									backgroundColor: colors.primary,
									backgroundImage: user.profilePicture ? `url(${user.profilePicture})` : undefined,
									backgroundSize: 'cover',
									backgroundPosition: 'center'
								}}
							>
								{!user.profilePicture && (
									<User className="w-4 h-4" />
								)}
							</div>
						</button>
					</div>
				</header>

				{/* Content Area */}
				<main className="flex-1 p-6 overflow-auto">
					<Outlet />
				</main>
			</div>
		</div>
	)
} 