import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../store/hooks'
import { 
	Bell, 
	Search, 
	Settings, 
	LogOut,
	Menu,
	Plus,
	Users,
	CreditCard,
	BarChart3
} from 'lucide-react'

interface TeamDashboardHeaderProps {
	onMenuClick?: () => void
}

function TeamDashboardHeader({ onMenuClick }: TeamDashboardHeaderProps) {
	const navigate = useNavigate()
	const { user } = useAppSelector((state) => state.auth)

	return (
		<header className="bg-white shadow-sm border-b border-gray-200">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center h-16">
					{/* Left side */}
					<div className="flex items-center space-x-4">
						<button
							onClick={onMenuClick}
							className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 lg:hidden"
						>
							<Menu className="h-6 w-6" />
						</button>
						
						<div className="flex items-center space-x-3">
							<div className="flex-shrink-0">
								<h1 className="text-xl font-bold text-gray-900">Team Dashboard</h1>
							</div>
						</div>
					</div>

					{/* Center - Quick Actions */}
					<div className="hidden md:flex items-center space-x-2">
						<button
							onClick={() => navigate('/team/post-job')}
							className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
						>
							<Plus className="h-4 w-4 mr-1" />
							Post Job
						</button>
						
						<button
							onClick={() => navigate('/team/candidates')}
							className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
						>
							<Users className="h-4 w-4 mr-1" />
							Candidates
						</button>
						
						<button
							onClick={() => navigate('/team/analytics')}
							className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
						>
							<BarChart3 className="h-4 w-4 mr-1" />
							Analytics
						</button>
					</div>

					{/* Right side */}
					<div className="flex items-center space-x-4">
						{/* Search */}
						<div className="hidden md:block">
							<div className="relative">
								<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
									<Search className="h-5 w-5 text-gray-400" />
								</div>
								<input
									type="text"
									placeholder="Search candidates..."
									className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
								/>
							</div>
						</div>

						{/* Notifications */}
						<button className="p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
							<Bell className="h-6 w-6" />
						</button>

						{/* User menu */}
						<div className="flex items-center space-x-3">
							<div className="flex items-center space-x-2">
								<div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
									<span className="text-blue-600 font-semibold text-sm">
										{user?.firstName?.[0]}{user?.lastName?.[0]}
									</span>
								</div>
								<div className="hidden md:block">
									<p className="text-sm font-medium text-gray-700">{user?.firstName} {user?.lastName}</p>
									<p className="text-xs text-gray-500">Team Member</p>
								</div>
							</div>
							
							<div className="flex items-center space-x-1">
								<button
									onClick={() => navigate('/team/settings')}
									className="p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
								>
									<Settings className="h-5 w-5" />
								</button>
								<button
									onClick={() => {
										// Handle logout
										console.log('Logout')
									}}
									className="p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
								>
									<LogOut className="h-5 w-5" />
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</header>
	)
}

export default TeamDashboardHeader 