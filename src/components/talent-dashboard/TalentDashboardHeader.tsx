import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../store/hooks'
import { 
	Bell, 
	Search, 
	Settings, 
	LogOut,
	Menu,
	Heart,
	User,
	Sparkles,
	TrendingUp,
	MessageSquare
} from 'lucide-react'

interface TalentDashboardHeaderProps {
	onMenuClick?: () => void
}

function TalentDashboardHeader({ onMenuClick }: TalentDashboardHeaderProps) {
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
								<h1 className="text-xl font-bold text-gray-900">Talent Dashboard</h1>
							</div>
						</div>
					</div>

					{/* Center - Quick Actions */}
					<div className="hidden md:flex items-center space-x-2">
						<button
							onClick={() => navigate('/talent/matches')}
							className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
						>
							<Heart className="h-4 w-4 mr-1" />
							Matches
						</button>
						
						<button
							onClick={() => navigate('/talent/recommendations')}
							className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
						>
							<Sparkles className="h-4 w-4 mr-1" />
							AI Jobs
						</button>
						
						<button
							onClick={() => navigate('/talent/profile')}
							className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
						>
							<User className="h-4 w-4 mr-1" />
							Profile
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
									placeholder="Search jobs..."
									className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
								/>
							</div>
						</div>

						{/* Notifications */}
						<button className="p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 relative">
							<Bell className="h-6 w-6" />
							<span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white"></span>
						</button>

						{/* Messages */}
						<button className="p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
							<MessageSquare className="h-6 w-6" />
						</button>

						{/* User menu */}
						<div className="flex items-center space-x-3">
							<div className="flex items-center space-x-2">
								<div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
									<span className="text-purple-600 font-semibold text-sm">
										{user?.firstName?.[0]}{user?.lastName?.[0]}
									</span>
								</div>
								<div className="hidden md:block">
									<p className="text-sm font-medium text-gray-700">{user?.firstName} {user?.lastName}</p>
									<p className="text-xs text-gray-500">Talent</p>
								</div>
							</div>
							
							<div className="flex items-center space-x-1">
								<button
									onClick={() => navigate('/talent/settings')}
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

export default TalentDashboardHeader 