import { useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAppSelector } from '../../store/hooks'
import { useBrand, useBrandColors } from '../../brand'
import { CompactLanguageSwitcher } from '../brand/language-switcher/language-switcher'
import { Bell, Search, Menu, ChevronRight } from 'lucide-react'

interface DashboardHeaderProps {
	onMenuClick: () => void
}

function DashboardHeader({ onMenuClick }: DashboardHeaderProps) {
	const [notificationsOpen, setNotificationsOpen] = useState(false)
	const location = useLocation()
	const { t } = useTranslation()
	const { user } = useAppSelector((state) => state.auth)
	const { currentVariant } = useBrand()
	const colors = useBrandColors()

	const getBreadcrumbs = () => {
		const pathSegments = location.pathname.split('/').filter(Boolean)
		const breadcrumbs = []
		
		// Determine if we're in team or talent dashboard
		const dashboardType = pathSegments[0] // 'team' or 'talent'
		const dashboardName = dashboardType === 'team' ? t('nav.teamDashboard', 'Team Dashboard') : t('nav.talentDashboard', 'Talent Dashboard')
		
		// Always start with appropriate Dashboard
		breadcrumbs.push({ 
			name: dashboardName, 
			href: `/${dashboardType}` 
		})
		
		// Map path segments to readable names
		const pathMap: Record<string, string> = {
			'profile': t('nav.profile'),
			'settings': t('nav.settings'),
			'jobs': t('nav.jobs'),
			'applications': t('nav.applications', 'Applications'),
			'post-job': t('nav.postJob', 'Post Job'),
			'my-jobs': t('nav.myJobs', 'My Jobs'),
			'candidates': t('nav.candidates', 'Candidates'),
			'analytics': t('nav.analytics', 'Analytics'),
			'matches': t('nav.matches', 'Matches'),
			'recommendations': t('nav.recommendations', 'Recommendations'),
			'credits': t('nav.credits', 'Credits'),
		}
		
		// Build breadcrumb trail
		let currentPath = ''
		for (let i = 1; i < pathSegments.length; i++) {
			currentPath += `/${pathSegments[i]}`
			const fullPath = `/${dashboardType}${currentPath}`
			const name = pathMap[pathSegments[i]] || pathSegments[i]
			breadcrumbs.push({ name, href: fullPath })
		}
		
		return breadcrumbs
	}

	const breadcrumbs = getBreadcrumbs()
	const currentPage = breadcrumbs[breadcrumbs.length - 1]

	// Mock notifications - replace with real data
	const notifications = [
		{
			id: 1,
			title: t('notifications.newMatch', 'New job match found'),
			message: t('notifications.newMatchDesc', 'A new Senior Developer position matches your profile'),
			time: t('notifications.timeAgo.minutes', '{{count}} minutes ago', { count: 2 }),
			unread: true,
		},
		{
			id: 2,
			title: t('notifications.applicationUpdate', 'Application status update'),
			message: t('notifications.applicationUpdateDesc', 'Your application for Frontend Developer has been reviewed'),
			time: t('notifications.timeAgo.hour', '1 hour ago'),
			unread: true,
		},
		{
			id: 3,
			title: t('notifications.profileCompletion', 'Profile completion'),
			message: t('notifications.profileCompletionDesc', 'Complete your profile to get better matches'),
			time: t('notifications.timeAgo.hours', '{{count}} hours ago', { count: 2 }),
			unread: false,
		},
	]

	const unreadCount = notifications.filter(n => n.unread).length

	return (
		<header className="bg-brand-background shadow-brand-sm border-b border-brand sticky top-0 z-20">
			<div className="flex items-center justify-between h-16 px-4 lg:px-6">
				{/* Left side - Mobile menu + Breadcrumbs */}
				<div className="flex items-center flex-1 min-w-0">
					{/* Mobile menu button */}
					<button
						onClick={onMenuClick}
						className="lg:hidden transition-colors mr-4"
						style={{
							color: colors.text.secondary
						}}
						onMouseEnter={(e) => {
							e.currentTarget.style.color = colors.text.primary
						}}
						onMouseLeave={(e) => {
							e.currentTarget.style.color = colors.text.secondary
						}}
					>
						<Menu className="h-6 w-6" />
					</button>
					
					{/* Breadcrumbs - Desktop */}
					<nav className="hidden md:flex items-center space-x-2 text-sm font-brand">
						{breadcrumbs.map((breadcrumb, index) => (
							<div key={breadcrumb.href} className="flex items-center">
								{index > 0 && (
									<ChevronRight 
										className="h-4 w-4 mx-2" 
										style={{ color: colors.text.secondary }}
									/>
								)}
								{index === breadcrumbs.length - 1 ? (
									<span 
										className="font-medium"
										style={{ color: colors.text.primary }}
									>
										{breadcrumb.name}
									</span>
								) : (
									<Link
										to={breadcrumb.href}
										className="transition-colors hover:underline"
										style={{ color: colors.text.secondary }}
										onMouseEnter={(e) => {
											e.currentTarget.style.color = colors.primary
										}}
										onMouseLeave={(e) => {
											e.currentTarget.style.color = colors.text.secondary
										}}
									>
										{breadcrumb.name}
									</Link>
								)}
							</div>
						))}
					</nav>

					{/* Page Title - Mobile */}
					<h1 
						className="md:hidden text-lg font-semibold font-brand truncate"
						style={{ color: colors.text.primary }}
					>
						{currentPage.name}
					</h1>
				</div>

				{/* Right side - Language, Search, Notifications, User */}
				<div className="flex items-center space-x-4">
					{/* Language Switcher - Desktop */}
					<div className="hidden lg:block">
						<CompactLanguageSwitcher />
					</div>

					{/* Search - Desktop only */}
					<button 
						className="hidden lg:flex items-center transition-colors"
						style={{ color: colors.text.secondary }}
						onMouseEnter={(e) => {
							e.currentTarget.style.color = colors.primary
						}}
						onMouseLeave={(e) => {
							e.currentTarget.style.color = colors.text.secondary
						}}
					>
						<Search className="h-5 w-5" />
					</button>

					{/* Notifications */}
					<div className="relative">
						<button
							onClick={() => setNotificationsOpen(!notificationsOpen)}
							className="relative p-1 transition-colors"
							style={{ color: colors.text.secondary }}
							onMouseEnter={(e) => {
								e.currentTarget.style.color = colors.primary
							}}
							onMouseLeave={(e) => {
								e.currentTarget.style.color = colors.text.secondary
							}}
						>
							<Bell className="h-6 w-6" />
							{unreadCount > 0 && (
								<span 
									className="absolute -top-1 -right-1 h-5 w-5 text-white text-xs rounded-full flex items-center justify-center"
									style={{ backgroundColor: '#EF4444' }}
								>
									{unreadCount > 9 ? '9+' : unreadCount}
								</span>
							)}
						</button>

						{/* Notifications Dropdown */}
						{notificationsOpen && (
							<>
								{/* Backdrop */}
								<div
									className="fixed inset-0 z-10"
									onClick={() => setNotificationsOpen(false)}
								/>
								
								{/* Dropdown */}
								<div 
									className="absolute right-0 mt-2 w-80 rounded-lg shadow-brand-lg border py-2 z-50"
									style={{
										backgroundColor: colors.background,
										borderColor: colors.border
									}}
								>
									<div 
										className="px-4 py-2 border-b"
										style={{ borderColor: colors.border }}
									>
										<div className="flex items-center justify-between">
											<h3 
												className="text-sm font-semibold font-brand"
												style={{ color: colors.text.primary }}
											>
												{t('notifications.title', 'Notifications')}
											</h3>
											{unreadCount > 0 && (
												<span 
													className="text-xs"
													style={{ color: colors.primary }}
												>
													{t('notifications.newCount', '{{count}} new', { count: unreadCount })}
												</span>
											)}
										</div>
									</div>
									<div className="max-h-80 overflow-y-auto">
										{notifications.map((notification) => (
											<div
												key={notification.id}
												className="px-4 py-3 cursor-pointer border-l-4 transition-colors"
												style={{
													borderLeftColor: notification.unread ? colors.primary : 'transparent',
													backgroundColor: notification.unread ? `${colors.primary}08` : 'transparent'
												}}
												onMouseEnter={(e) => {
													e.currentTarget.style.backgroundColor = colors.surface
												}}
												onMouseLeave={(e) => {
													e.currentTarget.style.backgroundColor = notification.unread ? `${colors.primary}08` : 'transparent'
												}}
											>
												<div className="flex justify-between items-start">
													<div className="flex-1 min-w-0">
														<p 
															className={`text-sm font-medium font-brand`}
															style={{ 
																color: notification.unread ? colors.text.primary : colors.text.secondary 
															}}
														>
															{notification.title}
														</p>
														<p 
															className="text-sm mt-1 line-clamp-2"
															style={{ color: colors.text.secondary }}
														>
															{notification.message}
														</p>
														<p 
															className="text-xs mt-1"
															style={{ color: colors.text.secondary }}
														>
															{notification.time}
														</p>
													</div>
													{notification.unread && (
														<div 
															className="w-2 h-2 rounded-full mt-2 ml-2"
															style={{ backgroundColor: colors.primary }}
														></div>
													)}
												</div>
											</div>
										))}
									</div>
									<div 
										className="px-4 py-2 border-t"
										style={{ borderColor: colors.border }}
									>
										<button 
											className="text-sm font-medium font-brand hover:underline"
											style={{ color: colors.primary }}
										>
											{t('notifications.viewAll', 'View all notifications')}
										</button>
									</div>
								</div>
							</>
						)}
					</div>
					
					{/* Mobile user avatar */}
					<div className="lg:hidden">
						<div 
							className="w-8 h-8 rounded-full flex items-center justify-center"
							style={{
								background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`
							}}
						>
							{user?.profilePicture ? (
								<img
									src={user.profilePicture}
									alt="Profile"
									className="w-8 h-8 rounded-full object-cover"
								/>
							) : (
								<span className="text-white font-semibold text-xs font-brand">
									{user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
								</span>
							)}
						</div>
					</div>
				</div>
			</div>
		</header>
	)
}

export default DashboardHeader 