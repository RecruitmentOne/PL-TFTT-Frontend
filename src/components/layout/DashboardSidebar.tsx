import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { logout } from '../../store/slices/authSlice'
import { BrandLogo } from '../brand/brand-logo'
import { 
	Home,
	Search, 
	Settings, 
	LogOut,
	Menu,
	Plus,
	Users,
	CreditCard,
	BarChart3,
	Heart,
	User,
	Sparkles,
	MessageSquare,
	FileText,
	Briefcase,
	Building2,
	X,
	ChevronDown,
	Bell,
	Crown,
	Zap,
	Award,
	Brain,
	Activity,
	Wifi,
	WifiOff,
	Eye,
	TrendingUp
} from 'lucide-react'

interface DashboardSidebarProps {
	isOpen: boolean
	onClose: () => void
}

interface NavigationItem {
	name: string
	href: string
	icon: React.ComponentType<{ className?: string }>
	current?: boolean
	badge?: string | number
	color?: string
	isLive?: boolean
}

function DashboardSidebar({ isOpen, onClose }: DashboardSidebarProps) {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const location = useLocation()
	const { user } = useAppSelector((state) => state.auth)
	const { 
		unreadCount, 
		isConnected: realtimeConnected,
		liveMatches,
		realTimeStats 
	} = useAppSelector((state) => state.realtime)
	const [showUserMenu, setShowUserMenu] = useState(false)

	// Determine if this is team or talent dashboard
	// Primary check: URL path
	const isTeamDashboardByPath = location.pathname.startsWith('/team')
	const isTalentDashboardByPath = location.pathname.startsWith('/talent')
	
	// Secondary check: User type (fallback for dashboard root)
	const isTeamDashboardByUser = user?.userType === 'employer'
	const isTalentDashboardByUser = user?.userType === 'talent'
	
	// Final determination with proper fallback
	let isTeamDashboard: boolean
	if (isTeamDashboardByPath) {
		isTeamDashboard = true
	} else if (isTalentDashboardByPath) {
		isTeamDashboard = false
	} else {
		// Fallback to user type if on root dashboard or ambiguous path
		isTeamDashboard = isTeamDashboardByUser
	}
	
	const basePath = isTeamDashboard ? '/team' : '/talent'

	// Get dynamic badge counts
	const newMatches = liveMatches.length
	const profileViews = realTimeStats?.profileViews || 0
	const notifications = unreadCount || 0

	const teamNavigation: NavigationItem[] = [
		
		{ 
			name: 'Team Overview', 
			href: '/team?tab=overview', 
			icon: BarChart3, 
			current: location.pathname === '/team' && location.search.includes('tab=overview'),
			badge: notifications > 0 ? notifications : undefined,
			color: 'text-indigo-600'
		},
		{ 
			name: 'Hiring Analytics', 
			href: '/team?tab=analytics', 
			icon: Activity, 
			current: location.pathname === '/team' && location.search.includes('tab=analytics'),
			badge: 'Live',
			color: 'text-purple-600',
			isLive: true
		},
		{ 
			name: 'Candidates', 
			href: '/team?tab=candidates', 
			icon: Users, 
			current: location.pathname === '/team' && location.search.includes('tab=candidates'),
			badge: (liveMatches && liveMatches.length > 0) ? liveMatches.length : undefined,
			color: 'text-orange-600'
		},
		{ 
			name: 'Job Management', 
			href: '/team?tab=jobs', 
			icon: Briefcase, 
			current: location.pathname === '/team' && location.search.includes('tab=jobs'),
			color: 'text-emerald-600'
		},
		{ 
			name: 'Post New Job', 
			href: '/team/post-job', 
			icon: Plus, 
			current: location.pathname === '/team/post-job',
			badge: 'Quick',
			color: 'text-green-600'
		},
		{ 
			name: 'Credits & Billing', 
			href: '/team?tab=credits', 
			icon: CreditCard, 
			current: location.pathname === '/team' && location.search.includes('tab=credits'),
			badge: realTimeStats?.credits && realTimeStats.credits < 10 ? 'Low' : undefined,
			color: 'text-yellow-600'
		},
		{ 
			name: 'Live Activity', 
			href: '/team?tab=real-time', 
			icon: Zap, 
			current: location.pathname === '/team' && location.search.includes('tab=real-time'),
			badge: 'Live',
			color: 'text-red-600',
			isLive: true
		},
		{ 
			name: 'AI Insights', 
			href: '/team?tab=insights', 
			icon: Brain, 
			current: location.pathname === '/team' && location.search.includes('tab=insights'),
			badge: 'New',
			color: 'text-violet-600'
		},
	]

	const talentNavigation: NavigationItem[] = [
		{ 
			name: 'Dashboard', 
			href: '/talent', 
			icon: Home, 
			current: location.pathname === '/talent' && !location.search.includes('tab='),
			color: 'text-blue-600'
		},
		{ 
			name: 'Profile', 
			href: '/talent/profile', 
			icon: User, 
			current: location.pathname === '/talent/profile',
			badge: profileViews > 0 ? profileViews : undefined,
			color: 'text-green-600'
		},
		{ 
			name: 'Job Search', 
			href: '/talent/jobs', 
			icon: Search, 
			current: location.pathname === '/talent/jobs',
			badge: 'New',
			color: 'text-purple-600'
		},
		{ 
			name: 'Smart Matches', 
			href: '/talent?tab=matches', 
			icon: Heart, 
			current: location.pathname === '/talent' && location.search.includes('tab=matches'),
			badge: newMatches > 0 ? newMatches : undefined,
			color: 'text-pink-600',
			isLive: newMatches > 0
		},
		{ 
			name: 'Analytics Hub', 
			href: '/talent?tab=analytics', 
			icon: BarChart3, 
			current: location.pathname === '/talent' && location.search.includes('tab=analytics'),
			color: 'text-indigo-600'
		},
		{ 
			name: 'Career Advisory', 
			href: '/talent?tab=career-advisory', 
			icon: Brain, 
			current: location.pathname === '/talent' && location.search.includes('tab=career-advisory'),
			color: 'text-emerald-600'
		},
		{ 
			name: 'Skills Assessment', 
			href: '/talent?tab=skills', 
			icon: Award, 
			current: location.pathname === '/talent' && location.search.includes('tab=skills'),
			badge: 'New',
			color: 'text-amber-600'
		},
		{ 
			name: 'Applications', 
			href: '/talent/applications', 
			icon: FileText, 
			current: location.pathname === '/talent/applications',
			badge: '3',
			color: 'text-orange-600'
		},
		{ 
			name: 'Real-time Feed', 
			href: '/talent?tab=real-time', 
			icon: Activity, 
			current: location.pathname === '/talent' && location.search.includes('tab=real-time'),
			badge: notifications > 0 ? notifications : 'Live',
			color: 'text-red-600',
			isLive: true
		},
		{ 
			name: 'Performance', 
			href: '/talent?tab=performance', 
			icon: Zap, 
			current: location.pathname === '/talent' && location.search.includes('tab=performance'),
			color: 'text-violet-600'
		},
	]

	// Debug logging - REMOVE IN PRODUCTION
	if (import.meta.env.DEV) {
		console.log('🔍 DashboardSidebar Debug Info:')
		console.log('📍 Current path:', location.pathname)
		console.log('🔍 URL Query:', location.search)
		console.log('👤 User type:', user?.userType)
		console.log('🏢 isTeamDashboard (final):', isTeamDashboard)
		console.log('📋 Selected navigation:', isTeamDashboard ? `Team (${teamNavigation.length} items)` : `Talent (${talentNavigation.length} items)`)
		console.log('---')
	}

	const navigation = isTeamDashboard ? teamNavigation : talentNavigation

	const handleLogout = async () => {
		try {
			await dispatch(logout()).unwrap()
			navigate('/login')
		} catch (error) {
			console.error('Logout failed:', error)
		}
	}

	return (
		<>
			{/* Mobile overlay */}
			{isOpen && (
				<div 
					className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" 
					onClick={onClose}
				/>
			)}

			{/* Sidebar */}
			<div className={`fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-gray-200 shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
				isOpen ? 'translate-x-0' : '-translate-x-full'
			}`}>
				<div className="flex flex-col h-full">
					{/* Header */}
					<div className="flex items-center justify-between p-6 border-b border-gray-200">
						<div className="flex items-center space-x-3">
							<BrandLogo variant="icon" size="md" />
							<div>
								<h2 className="text-lg font-bold text-gray-900">
									{isTeamDashboard ? 'Team Portal' : 'Talent Portal'}
								</h2>
								<p className="text-xs text-gray-500">
									{isTeamDashboard ? 'Hire the best talent' : 'Find your dream job'}
								</p>
							</div>
						</div>
						<button
							onClick={onClose}
							className="lg:hidden p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
						>
							<X className="w-5 h-5" />
						</button>
					</div>

					{/* User Info with Credits */}
					{isTeamDashboard && (
						<div className="p-4 mx-4 mt-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
							<div className="flex items-center justify-between mb-3">
								<div className="flex items-center space-x-3">
									<div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
										<span className="text-white text-sm font-semibold">
											{user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
										</span>
									</div>
									<div>
										<p className="text-sm font-medium text-gray-900">
											{user?.firstName} {user?.lastName}
										</p>
										<p className="text-xs text-blue-600 font-medium">Professional Plan</p>
									</div>
								</div>
								<Crown className="w-5 h-5 text-yellow-500" />
							</div>
							<div className="flex items-center justify-between">
								<div className="flex items-center space-x-2">
									<Zap className="w-4 h-4 text-blue-600" />
									<span className="text-sm font-medium text-gray-900">45 Credits</span>
								</div>
								<Link 
									to="/team/credits"
									className="text-xs text-blue-600 hover:text-blue-700 font-medium"
								>
									Buy More
								</Link>
							</div>
						</div>
					)}

					{/* Real-time Connection Status for Talent */}
					{!isTeamDashboard && (
						<div className="p-4 mx-4 mt-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200">
							<div className="flex items-center justify-between mb-3">
								<div className="flex items-center space-x-3">
									<div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
										<span className="text-white text-sm font-semibold">
											{user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
										</span>
									</div>
									<div>
										<p className="text-sm font-medium text-gray-900">
											{user?.firstName} {user?.lastName}
										</p>
										<p className="text-xs text-indigo-600 font-medium">Talent Account</p>
									</div>
								</div>
								<div className="flex items-center space-x-2">
									{realtimeConnected ? (
										<Wifi className="w-4 h-4 text-green-500" />
									) : (
										<WifiOff className="w-4 h-4 text-red-500" />
									)}
								</div>
							</div>
							<div className="flex items-center justify-between">
								<div className="flex items-center space-x-2">
									<div className={`w-2 h-2 rounded-full ${realtimeConnected ? 'bg-green-500' : 'bg-red-500'}`} />
									<span className="text-xs text-gray-600">
										{realtimeConnected ? 'Real-time Connected' : 'Offline Mode'}
									</span>
								</div>
								{notifications > 0 && (
									<div className="flex items-center space-x-1">
										<Bell className="w-3 h-3 text-red-500" />
										<span className="text-xs text-red-600 font-medium">{notifications}</span>
									</div>
								)}
							</div>
						</div>
					)}

					{/* Navigation */}
					<nav className="px-4 py-6 space-y-2 overflow-y-auto">
						{navigation.map((item) => {
							const Icon = item.icon
							return (
								<Link
									key={item.name}
									to={item.href}
									onClick={() => onClose()}
									className={`group flex items-center justify-between px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 relative ${
										item.current
											? 'bg-blue-50 text-blue-700 shadow-sm border border-blue-200'
											: 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
									}`}
								>
									<div className="flex items-center space-x-3">
										<div className="relative">
											<Icon className={`w-5 h-5 ${
												item.current 
													? item.color || 'text-blue-600'
													: 'text-gray-400 group-hover:text-gray-600'
											} transition-colors`} />
											{/* Live indicator pulse */}
											{item.isLive && (
												<div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse">
													<div className="absolute inset-0 w-2 h-2 bg-red-500 rounded-full animate-ping opacity-75"></div>
												</div>
											)}
										</div>
										<span>{item.name}</span>
									</div>
									{item.badge && (
										<span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
											typeof item.badge === 'number' || !isNaN(Number(item.badge))
												? item.badge === 'Live' 
													? 'bg-red-100 text-red-800 animate-pulse'
													: 'bg-red-100 text-red-800'
												: item.badge === 'New'
													? 'bg-green-100 text-green-800'
													: 'bg-blue-100 text-blue-800'
										}`}>
											{item.badge}
										</span>
									)}
								</Link>
							)
						})}
					</nav>

					{/* Quick Actions */}
					<div className="px-4 py-4 border-t border-gray-200 mt-auto">
						<div className="space-y-2">
							{isTeamDashboard ? (
								<Link
									to="/team/post-job"
									className="flex items-center space-x-3 px-4 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all group"
								>
									<Plus className="w-5 h-5" />
									<span className="font-medium">Post New Job</span>
								</Link>
							) : (
								<Link
									to="/talent/jobs"
									className="flex items-center space-x-3 px-4 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all group"
								>
									<Search className="w-5 h-5" />
									<span className="font-medium">Find Jobs</span>
								</Link>
							)}
						</div>
					</div>

					{/* Bottom section */}
					<div className="px-4 py-4 border-t border-gray-200 space-y-2">
						<Link
							to={`${basePath}/settings`}
							className={`group flex items-center space-x-3 px-4 py-3 text-sm font-medium rounded-xl transition-all ${
								location.pathname === `${basePath}/settings`
									? 'bg-gray-100 text-gray-900'
									: 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
							}`}
						>
							<Settings className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
							<span>Settings</span>
						</Link>
						
						<button
							onClick={handleLogout}
							className="w-full group flex items-center space-x-3 px-4 py-3 text-sm font-medium text-red-700 hover:bg-red-50 rounded-xl transition-all"
						>
							<LogOut className="w-5 h-5 text-red-500" />
							<span>Sign Out</span>
						</button>
					</div>
				</div>
			</div>
		</>
	)
}

export default DashboardSidebar 