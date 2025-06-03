import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../../../store/hooks'
import { logout } from '../../../store/slices/authSlice'
import { useBrand, useBrandColors } from '../../../brand'
import { 
	BrandedSpan,
	BrandedCard
} from '../../../components/brand'
import type { RootState } from '../../../store'
import { 
	Bell, 
	Search, 
	Settings, 
	LogOut,
	Menu,
	Heart,
	User,
	Sparkles,
	MessageSquare,
	ChevronDown,
	Activity,
	BarChart3,
	Briefcase
} from 'lucide-react'

interface TalentDashboardHeaderProps {
	onMenuClick?: () => void
}

function TalentDashboardHeader({ onMenuClick }: TalentDashboardHeaderProps) {
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const { user } = useAppSelector((state: RootState) => state.auth)
	const { unreadCount, isConnected } = useAppSelector((state: RootState) => state.realtime)
	const colors = useBrandColors()
	const [showUserMenu, setShowUserMenu] = useState(false)
	const [searchQuery, setSearchQuery] = useState('')

	const handleLogout = async () => {
		try {
			await dispatch(logout()).unwrap()
			navigate('/login')
		} catch (error) {
			console.error('Logout failed:', error)
		}
	}

	const handleSearch = (e: React.FormEvent) => {
		e.preventDefault()
		if (searchQuery.trim()) {
			navigate(`/talent/jobs?search=${encodeURIComponent(searchQuery.trim())}`)
		}
	}

	const quickActions = [
		{
			label: 'Jobs',
			icon: Briefcase,
			path: '/talent/jobs',
			color: colors.primary,
			description: 'Browse opportunities'
		},
		{
			label: 'Matches',
			icon: Heart,
			path: '/talent/matches',
			color: '#EF4444',
			description: 'View smart matches',
			badge: unreadCount > 0 ? unreadCount : null
		},
		{
			label: 'Analytics',
			icon: BarChart3,
			path: '/talent/analytics',
			color: colors.secondary,
			description: 'View insights'
		},
		{
			label: 'Profile',
			icon: User,
			path: '/talent/profile',
			color: '#10B981',
			description: 'Manage profile'
		}
	]

	return (
		<header className="bg-white shadow-sm border-b" style={{ borderColor: colors.border }}>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center h-16">
					{/* Left side */}
					<div className="flex items-center space-x-4">
						<button
							onClick={onMenuClick}
							className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset lg:hidden"
							style={{ 
								'--tw-ring-color': colors.primary,
								color: colors.text.secondary 
							} as any}
							onMouseEnter={(e) => {
								e.currentTarget.style.color = colors.text.primary
							}}
							onMouseLeave={(e) => {
								e.currentTarget.style.color = colors.text.secondary
							}}
						>
							<Menu className="h-6 w-6" />
						</button>
						
						<div className="flex items-center space-x-3">
							<div className="flex-shrink-0">
								<h1 
									className="text-xl font-bold"
									style={{ color: colors.text.primary }}
								>
									Talent Dashboard
								</h1>
								{!isConnected && (
									<div className="flex items-center space-x-1 mt-1">
										<div className="w-2 h-2 rounded-full bg-yellow-500" />
										<BrandedSpan className="text-xs" style={{ color: colors.text.secondary }}>
											Offline Mode
										</BrandedSpan>
									</div>
								)}
							</div>
						</div>
					</div>

					{/* Center - Quick Actions */}
					<div className="hidden lg:flex items-center space-x-2">
						{quickActions.map((action) => {
							const Icon = action.icon
							return (
								<button
									key={action.path}
									onClick={() => navigate(action.path)}
									className="relative inline-flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 group"
									style={{
										color: action.color,
										backgroundColor: `${action.color}10`,
										border: `1px solid ${action.color}20`
									}}
									onMouseEnter={(e) => {
										e.currentTarget.style.backgroundColor = `${action.color}20`
										e.currentTarget.style.transform = 'translateY(-1px)'
									}}
									onMouseLeave={(e) => {
										e.currentTarget.style.backgroundColor = `${action.color}10`
										e.currentTarget.style.transform = 'translateY(0)'
									}}
									title={action.description}
								>
									<Icon className="h-4 w-4 mr-1.5" />
									{action.label}
									{action.badge && (
										<span 
											className="absolute -top-1 -right-1 w-5 h-5 text-xs font-medium rounded-full flex items-center justify-center text-white"
											style={{ backgroundColor: '#EF4444' }}
										>
											{action.badge > 9 ? '9+' : action.badge}
										</span>
									)}
								</button>
							)
						})}
					</div>

					{/* Right side */}
					<div className="flex items-center space-x-4">
						{/* Search */}
						<div className="hidden md:block">
							<form onSubmit={handleSearch} className="relative">
								<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
									<Search className="h-5 w-5" style={{ color: colors.text.secondary }} />
								</div>
								<input
									type="text"
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
									placeholder="Search jobs, companies..."
									className="block w-full pl-10 pr-3 py-2 border rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:border-transparent sm:text-sm transition-all"
									style={{ 
										borderColor: colors.border,
										'--tw-ring-color': colors.primary
									} as any}
									onFocus={(e) => {
										e.currentTarget.style.borderColor = colors.primary
									}}
									onBlur={(e) => {
										e.currentTarget.style.borderColor = colors.border
									}}
								/>
							</form>
						</div>

						{/* Real-time Status */}
						<div className="hidden sm:flex items-center space-x-2 px-3 py-1 rounded-lg bg-gray-50">
							<div 
								className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-gray-400'}`}
							/>
							<BrandedSpan className="text-xs" style={{ color: colors.text.secondary }}>
								{isConnected ? 'Live' : 'Offline'}
							</BrandedSpan>
						</div>

						{/* Notifications */}
						<button 
							onClick={() => navigate('/talent/notifications')}
							className="relative p-2 rounded-lg transition-colors"
							style={{ 
								color: colors.text.secondary,
								backgroundColor: `${colors.primary}10`
							}}
							onMouseEnter={(e) => {
								e.currentTarget.style.backgroundColor = `${colors.primary}20`
								e.currentTarget.style.color = colors.primary
							}}
							onMouseLeave={(e) => {
								e.currentTarget.style.backgroundColor = `${colors.primary}10`
								e.currentTarget.style.color = colors.text.secondary
							}}
							title={`${unreadCount} unread notifications`}
						>
							<Bell className="h-5 w-5" />
							{unreadCount > 0 && (
								<span 
									className="absolute -top-1 -right-1 w-5 h-5 text-xs font-medium rounded-full flex items-center justify-center text-white"
									style={{ backgroundColor: '#EF4444' }}
								>
									{unreadCount > 9 ? '9+' : unreadCount}
								</span>
							)}
						</button>

						{/* Messages */}
						<button 
							onClick={() => navigate('/talent/messages')}
							className="p-2 rounded-lg transition-colors"
							style={{ 
								color: colors.text.secondary,
								backgroundColor: `${colors.secondary}10`
							}}
							onMouseEnter={(e) => {
								e.currentTarget.style.backgroundColor = `${colors.secondary}20`
								e.currentTarget.style.color = colors.secondary
							}}
							onMouseLeave={(e) => {
								e.currentTarget.style.backgroundColor = `${colors.secondary}10`
								e.currentTarget.style.color = colors.text.secondary
							}}
							title="Messages"
						>
							<MessageSquare className="h-5 w-5" />
						</button>

						{/* User Menu */}
						<div className="relative">
							<button
								onClick={() => setShowUserMenu(!showUserMenu)}
								className="flex items-center space-x-3 p-1 rounded-lg transition-colors"
								style={{ 
									backgroundColor: showUserMenu ? `${colors.primary}15` : 'transparent'
								}}
								onMouseEnter={(e) => {
									if (!showUserMenu) {
										e.currentTarget.style.backgroundColor = `${colors.primary}10`
									}
								}}
								onMouseLeave={(e) => {
									if (!showUserMenu) {
										e.currentTarget.style.backgroundColor = 'transparent'
									}
								}}
							>
								<div className="flex items-center space-x-2">
									<div 
										className="w-8 h-8 rounded-full flex items-center justify-center"
										style={{ backgroundColor: `${colors.primary}15` }}
									>
										{user?.profilePicture ? (
											<img 
												src={user.profilePicture} 
												alt="Profile" 
												className="w-8 h-8 rounded-full object-cover"
											/>
										) : (
											<BrandedSpan 
												className="font-semibold text-sm"
												style={{ color: colors.primary }}
											>
												{user?.firstName?.[0]}{user?.lastName?.[0]}
											</BrandedSpan>
										)}
									</div>
									<div className="hidden sm:block text-left">
										<BrandedSpan className="block text-sm font-medium" style={{ color: colors.text.primary }}>
											{user?.firstName} {user?.lastName}
										</BrandedSpan>
										<BrandedSpan className="block text-xs" style={{ color: colors.text.secondary }}>
											Talent Profile
										</BrandedSpan>
									</div>
								</div>
								<ChevronDown 
									className={`h-4 w-4 transition-transform ${showUserMenu ? 'rotate-180' : ''}`}
									style={{ color: colors.text.secondary }}
								/>
							</button>

							{/* User Menu Dropdown */}
							{showUserMenu && (
								<div className="absolute right-0 mt-2 w-56 origin-top-right">
									<BrandedCard className="py-1 shadow-lg ring-1 ring-black ring-opacity-5">
										<div className="px-4 py-3 border-b" style={{ borderColor: colors.border }}>
											<BrandedSpan className="block text-sm font-medium" style={{ color: colors.text.primary }}>
												{user?.firstName} {user?.lastName}
											</BrandedSpan>
											<BrandedSpan className="block text-xs" style={{ color: colors.text.secondary }}>
												{user?.email}
											</BrandedSpan>
										</div>
										
										<div className="py-1">
											<button
												onClick={() => {
													navigate('/talent/profile')
													setShowUserMenu(false)
												}}
												className="flex items-center w-full px-4 py-2 text-sm transition-colors"
												style={{ color: colors.text.secondary }}
												onMouseEnter={(e) => {
													e.currentTarget.style.backgroundColor = `${colors.primary}10`
													e.currentTarget.style.color = colors.text.primary
												}}
												onMouseLeave={(e) => {
													e.currentTarget.style.backgroundColor = 'transparent'
													e.currentTarget.style.color = colors.text.secondary
												}}
											>
												<User className="h-4 w-4 mr-3" />
												Your Profile
											</button>
											
											<button
												onClick={() => {
													navigate('/talent/settings')
													setShowUserMenu(false)
												}}
												className="flex items-center w-full px-4 py-2 text-sm transition-colors"
												style={{ color: colors.text.secondary }}
												onMouseEnter={(e) => {
													e.currentTarget.style.backgroundColor = `${colors.primary}10`
													e.currentTarget.style.color = colors.text.primary
												}}
												onMouseLeave={(e) => {
													e.currentTarget.style.backgroundColor = 'transparent'
													e.currentTarget.style.color = colors.text.secondary
												}}
											>
												<Settings className="h-4 w-4 mr-3" />
												Settings
											</button>

											<button
												onClick={() => {
													navigate('/talent')
													setShowUserMenu(false)
												}}
												className="flex items-center w-full px-4 py-2 text-sm transition-colors"
												style={{ color: colors.text.secondary }}
												onMouseEnter={(e) => {
													e.currentTarget.style.backgroundColor = `${colors.primary}10`
													e.currentTarget.style.color = colors.text.primary
												}}
												onMouseLeave={(e) => {
													e.currentTarget.style.backgroundColor = 'transparent'
													e.currentTarget.style.color = colors.text.secondary
												}}
											>
												<Activity className="h-4 w-4 mr-3" />
												Dashboard
											</button>
										</div>
										
										<div className="border-t" style={{ borderColor: colors.border }}>
											<button
												onClick={() => {
													handleLogout()
													setShowUserMenu(false)
												}}
												className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
											>
												<LogOut className="h-4 w-4 mr-3" />
												Sign out
											</button>
										</div>
									</BrandedCard>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>

			{/* Mobile Menu */}
			<div className="lg:hidden border-t" style={{ borderColor: colors.border }}>
				<div className="px-4 py-3 space-y-2">
					{quickActions.map((action) => {
						const Icon = action.icon
						return (
							<button
								key={action.path}
								onClick={() => navigate(action.path)}
								className="flex items-center justify-between w-full px-3 py-2 text-sm font-medium rounded-lg transition-colors"
								style={{
									color: action.color,
									backgroundColor: `${action.color}10`
								}}
								onMouseEnter={(e) => {
									e.currentTarget.style.backgroundColor = `${action.color}20`
								}}
								onMouseLeave={(e) => {
									e.currentTarget.style.backgroundColor = `${action.color}10`
								}}
							>
								<div className="flex items-center">
									<Icon className="h-4 w-4 mr-3" />
									{action.label}
								</div>
								{action.badge && (
									<span 
										className="w-5 h-5 text-xs font-medium rounded-full flex items-center justify-center text-white"
										style={{ backgroundColor: '#EF4444' }}
									>
										{action.badge > 9 ? '9+' : action.badge}
									</span>
								)}
							</button>
						)
					})}
				</div>
			</div>

			{/* Click outside to close menu */}
			{showUserMenu && (
				<div 
					className="fixed inset-0 z-10" 
					onClick={() => setShowUserMenu(false)}
				/>
			)}
		</header>
	)
}

export default TalentDashboardHeader 