import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../store/hooks'
import { 
	Plus, 
	Users, 
	BarChart3, 
	Heart, 
	Sparkles, 
	User,
	Briefcase,
	FileText,
	MessageSquare,
	Settings
} from 'lucide-react'

interface QuickNavAction {
	label: string
	icon: React.ComponentType<{ className?: string }>
	path: string
	color: string
	description: string
}

function DashboardQuickNav() {
	const navigate = useNavigate()
	const { user } = useAppSelector((state) => state.auth)

	// Define actions based on user role
	const getQuickActions = (): QuickNavAction[] => {
		if (user?.userType === 'employer') {
			return [
				{
					label: 'Post Job',
					icon: Plus,
					path: '/team/post-job',
					color: 'bg-blue-500 hover:bg-blue-600',
					description: 'Create a new job posting'
				},
				{
					label: 'View Candidates',
					icon: Users,
					path: '/team/candidates',
					color: 'bg-green-500 hover:bg-green-600',
					description: 'Browse interested candidates'
				},
				{
					label: 'My Jobs',
					icon: Briefcase,
					path: '/team/my-jobs',
					color: 'bg-purple-500 hover:bg-purple-600',
					description: 'Manage your job postings'
				},
				{
					label: 'Analytics',
					icon: BarChart3,
					path: '/team/analytics',
					color: 'bg-orange-500 hover:bg-orange-600',
					description: 'View hiring analytics'
				}
			]
		} else {
			// Talent actions
			return [
				{
					label: 'View Matches',
					icon: Heart,
					path: '/talent/matches',
					color: 'bg-pink-500 hover:bg-pink-600',
					description: 'See mutual interests'
				},
				{
					label: 'AI Jobs',
					icon: Sparkles,
					path: '/talent/recommendations',
					color: 'bg-purple-500 hover:bg-purple-600',
					description: 'AI-recommended opportunities'
				},
				{
					label: 'Browse Jobs',
					icon: Briefcase,
					path: '/talent/jobs',
					color: 'bg-blue-500 hover:bg-blue-600',
					description: 'Explore job opportunities'
				},
				{
					label: 'My Profile',
					icon: User,
					path: '/talent/profile',
					color: 'bg-green-500 hover:bg-green-600',
					description: 'Update your profile'
				}
			]
		}
	}

	const quickActions = getQuickActions()

	return (
		<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
			<div className="flex items-center justify-between mb-4">
				<h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
				<button
					onClick={() => navigate(user?.userType === 'employer' ? '/team/settings' : '/talent/settings')}
					className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
				>
					<Settings className="w-5 h-5" />
				</button>
			</div>
			
			<div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
				{quickActions.map((action) => {
					const Icon = action.icon
					return (
						<button
							key={action.path}
							onClick={() => navigate(action.path)}
							className={`${action.color} text-white rounded-lg p-4 text-left transition-colors group`}
						>
							<div className="flex items-center justify-between mb-2">
								<Icon className="w-6 h-6" />
								<div className="w-2 h-2 bg-white bg-opacity-30 rounded-full group-hover:bg-opacity-50 transition-colors"></div>
							</div>
							<h4 className="font-medium text-sm mb-1">{action.label}</h4>
							<p className="text-xs text-white text-opacity-80">{action.description}</p>
						</button>
					)
				})}
			</div>

			{/* Additional Actions */}
			<div className="mt-6 pt-4 border-t border-gray-200">
				<div className="flex items-center justify-between">
					<button
						onClick={() => navigate(user?.userType === 'employer' ? '/team/candidates' : '/talent/applications')}
						className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
					>
						<FileText className="w-4 h-4" />
						<span>{user?.userType === 'employer' ? 'View All Candidates' : 'My Applications'}</span>
					</button>
					<button
						onClick={() => navigate(user?.userType === 'employer' ? '/team' : '/talent/messages')}
						className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
					>
						<MessageSquare className="w-4 h-4" />
						<span>Messages</span>
					</button>
				</div>
			</div>
		</div>
	)
}

export default DashboardQuickNav 