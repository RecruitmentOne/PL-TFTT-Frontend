import { useState } from 'react'
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../../store/hooks'
import { logout } from '../../store/slices/authSlice'
import DashboardHeader from './DashboardHeader'
import {
	X,
	Home,
	User,
	Briefcase,
	Heart,
	MessageSquare,
	Settings,
	LogOut,
	Search,
	Building,
	Users,
	BarChart3,
	FileText,
	ChevronDown,
} from 'lucide-react'

function DashboardLayout() {
	const [sidebarOpen, setSidebarOpen] = useState(false)
	const [userMenuOpen, setUserMenuOpen] = useState(false)
	const location = useLocation()
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const { user } = useAppSelector((state) => state.auth)

	const talentNavigation = [
		{ name: 'Dashboard', href: '/dashboard', icon: Home },
		{ name: 'Find Jobs', href: '/dashboard/jobs', icon: Search },
		{ name: 'Applications', href: '/dashboard/applications', icon: Briefcase },
		{ name: 'Matches', href: '/dashboard/matches', icon: Heart },
		{ name: 'Messages', href: '/dashboard/messages', icon: MessageSquare },
		{ name: 'Profile', href: '/dashboard/profile', icon: User },
		{ name: 'Settings', href: '/dashboard/settings', icon: Settings },
	]

	const employerNavigation = [
		{ name: 'Dashboard', href: '/dashboard', icon: Home },
		{ name: 'Post Job', href: '/dashboard/post-job', icon: FileText },
		{ name: 'My Jobs', href: '/dashboard/my-jobs', icon: Building },
		{ name: 'Candidates', href: '/dashboard/candidates', icon: Users },
		{ name: 'Applications', href: '/dashboard/applications', icon: Briefcase },
		{ name: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
		{ name: 'Messages', href: '/dashboard/messages', icon: MessageSquare },
		{ name: 'Settings', href: '/dashboard/settings', icon: Settings },
	]

	const navigation = user?.userType === 'employer' ? employerNavigation : talentNavigation

	const handleLogout = async () => {
		await dispatch(logout())
		navigate('/')
	}

	const isActive = (path: string) => {
		if (path === '/dashboard') {
			return location.pathname === path
		}
		return location.pathname.startsWith(path)
	}

	return (
		<div className="min-h-screen bg-gray-50 flex">
			{/* Sidebar */}
			<div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${
				sidebarOpen ? 'translate-x-0' : '-translate-x-full'
			} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
				<div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
					<div className="flex items-center">
						<div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
							<span className="text-white font-bold text-lg">T</span>
						</div>
						<span className="ml-2 text-xl font-bold text-gray-900">TFT Platform</span>
					</div>
					<button
						onClick={() => setSidebarOpen(false)}
						className="lg:hidden text-gray-500 hover:text-gray-700"
					>
						<X className="h-6 w-6" />
					</button>
				</div>

				{/* User Info Badge */}
				<div className="px-6 py-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
					<div className="flex items-center">
						<div className={`w-3 h-3 rounded-full mr-2 ${
							user?.userType === 'employer' ? 'bg-blue-500' : 'bg-green-500'
						}`}></div>
						<span className={`text-sm font-medium ${
							user?.userType === 'employer' ? 'text-blue-700' : 'text-green-700'
						}`}>
							{user?.userType === 'employer' ? 'Employer Account' : 'Talent Account'}
						</span>
					</div>
				</div>

				<nav className="mt-6 px-4 flex-1">
					<ul className="space-y-1">
						{navigation.map((item) => {
							const Icon = item.icon
							const active = isActive(item.href)
							return (
								<li key={item.name}>
									<Link
										to={item.href}
										onClick={() => setSidebarOpen(false)}
										className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
											active
												? 'bg-blue-50 text-blue-700 border-r-4 border-blue-600 shadow-sm'
												: 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
										}`}
									>
										<Icon className={`mr-3 h-5 w-5 ${active ? 'text-blue-600' : ''}`} />
										{item.name}
									</Link>
								</li>
							)
						})}
					</ul>
				</nav>

				{/* User Profile Section */}
				<div className="p-4 border-t border-gray-200">
					<div className="relative">
						<button
							onClick={() => setUserMenuOpen(!userMenuOpen)}
							className="flex items-center w-full p-3 text-left hover:bg-gray-50 rounded-lg transition-colors"
						>
							<div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
								{user?.profilePicture ? (
									<img
										src={user.profilePicture}
										alt="Profile"
										className="w-10 h-10 rounded-full object-cover"
									/>
								) : (
									<span className="text-white font-semibold text-sm">
										{user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
									</span>
								)}
							</div>
							<div className="ml-3 flex-1 min-w-0">
								<p className="text-sm font-medium text-gray-900 truncate">
									{user?.firstName} {user?.lastName}
								</p>
								<p className="text-xs text-gray-500 truncate">{user?.email}</p>
							</div>
							<ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${
								userMenuOpen ? 'rotate-180' : ''
							}`} />
						</button>

						{/* User Menu Dropdown */}
						{userMenuOpen && (
							<div className="absolute bottom-full left-0 right-0 mb-2 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
								<Link
									to="/dashboard/profile"
									onClick={() => {
										setUserMenuOpen(false)
										setSidebarOpen(false)
									}}
									className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
								>
									<User className="mr-3 h-4 w-4" />
									View Profile
								</Link>
								<Link
									to="/dashboard/settings"
									onClick={() => {
										setUserMenuOpen(false)
										setSidebarOpen(false)
									}}
									className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
								>
									<Settings className="mr-3 h-4 w-4" />
									Account Settings
								</Link>
								<hr className="my-2" />
								<button
									onClick={handleLogout}
									className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
								>
									<LogOut className="mr-3 h-4 w-4" />
									Sign out
								</button>
							</div>
						)}
					</div>
				</div>
			</div>

			{/* Main Content */}
			<div className="flex-1 flex flex-col lg:ml-0">
				{/* Header Component */}
				<DashboardHeader onMenuClick={() => setSidebarOpen(true)} />

				{/* Page Content */}
				<main className="flex-1 overflow-auto bg-gray-50">
					<Outlet />
				</main>
			</div>

			{/* Overlay for mobile */}
			{sidebarOpen && (
				<div
					className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
					onClick={() => setSidebarOpen(false)}
				/>
			)}

			{/* Click outside to close user menu */}
			{userMenuOpen && (
				<div
					className="fixed inset-0 z-30"
					onClick={() => setUserMenuOpen(false)}
				/>
			)}
		</div>
	)
}

export default DashboardLayout 