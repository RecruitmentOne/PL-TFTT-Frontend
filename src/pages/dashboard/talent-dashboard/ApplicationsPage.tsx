import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { fetchMyApplications } from '../../../store/slices/jobSlice'
import DashboardLayoutWithSidebar from '../../../components/layout/DashboardLayoutWithSidebar'
import { 
	Calendar, 
	Building, 
	MapPin, 
	Clock, 
	CheckCircle, 
	XCircle, 
	AlertCircle,
	Filter,
	Search,
	Eye,
	ExternalLink,
	TrendingUp,
	FileText,
	Star,
	Briefcase,
	SlidersHorizontal,
	Grid3X3,
	List,
	ChevronDown,
	BarChart3,
	Award,
	Users,
	Heart
} from 'lucide-react'

// Sample enhanced application data - Updated for interest-based system
const sampleApplications = [
	{
		applicationId: 1,
		jobId: 101,
		jobTitle: 'Senior React Developer',
		company: 'TechCorp Solutions',
		companyLogo: 'TC',
		location: 'San Francisco, CA',
		salary: '$120k - $150k',
		applicationDate: '2024-01-15T10:00:00Z',
		applicationStatusId: 2,
		status: 'Under Review',
		progress: 60,
		nextStep: 'Company Response Expected',
		recruiterName: 'Sarah Johnson',
		description: 'Build cutting-edge React applications with TypeScript and modern frameworks.',
		skills: ['React', 'TypeScript', 'Node.js', 'AWS'],
		appliedVia: 'Company Website',
		responseTime: '2-3 business days'
	},
	{
		applicationId: 2,
		jobId: 102,
		jobTitle: 'Full Stack Engineer',
		company: 'DataFlow Inc',
		companyLogo: 'DF',
		location: 'Seattle, WA',
		salary: '$110k - $140k',
		applicationDate: '2024-01-10T14:30:00Z',
		applicationStatusId: 3,
		status: 'Mutual Interest',
		progress: 75,
		nextStep: 'Direct Contact Expected - Jan 20, 2024',
		recruiterName: 'Mike Chen',
		description: 'Join our dynamic team building scalable web applications.',
		skills: ['React', 'Python', 'Django', 'PostgreSQL'],
		appliedVia: 'LinkedIn',
		responseTime: '1-2 business days'
	},
	{
		applicationId: 3,
		jobId: 103,
		jobTitle: 'Frontend Developer',
		company: 'DesignLab Studios',
		companyLogo: 'DL',
		location: 'Austin, TX',
		salary: '$90k - $115k',
		applicationDate: '2024-01-05T09:15:00Z',
		applicationStatusId: 5,
		status: 'Not Selected',
		progress: 100,
		nextStep: 'Application Closed',
		recruiterName: 'Emma Davis',
		description: 'Create beautiful user interfaces for our design platform.',
		skills: ['Vue.js', 'JavaScript', 'CSS', 'Figma'],
		appliedVia: 'Job Board',
		responseTime: '3-5 business days'
	},
	{
		applicationId: 4,
		jobId: 104,
		jobTitle: 'React Native Developer',
		company: 'MobileFirst Co',
		companyLogo: 'MF',
		location: 'Remote',
		salary: '$100k - $130k',
		applicationDate: '2024-01-20T16:45:00Z',
		applicationStatusId: 1,
		status: 'Applied',
		progress: 25,
		nextStep: 'Initial Review',
		recruiterName: 'Alex Rivera',
		description: 'Develop mobile applications for iOS and Android platforms.',
		skills: ['React Native', 'JavaScript', 'Mobile Development'],
		appliedVia: 'Direct Application',
		responseTime: '1 week'
	},
	{
		applicationId: 5,
		jobId: 105,
		jobTitle: 'Senior Backend Developer',
		company: 'CloudTech Systems',
		companyLogo: 'CS',
		location: 'Denver, CO',
		salary: '$130k - $160k',
		applicationDate: '2024-01-18T11:20:00Z',
		applicationStatusId: 4,
		status: 'Offer Extended',
		progress: 95,
		nextStep: 'Waiting for Response',
		recruiterName: 'David Kim',
		description: 'Lead backend development for cloud infrastructure platform.',
		skills: ['Node.js', 'Python', 'Kubernetes', 'AWS'],
		appliedVia: 'Referral',
		responseTime: 'Next day'
	}
]

function ApplicationsPage() {
	const dispatch = useAppDispatch()
	const { myApplications, isLoading, error } = useAppSelector((state) => state.jobs)
	const { user } = useAppSelector((state) => state.auth)
	
	const [searchTerm, setSearchTerm] = useState('')
	const [statusFilter, setStatusFilter] = useState('')
	const [sortBy, setSortBy] = useState('newest')
	const [viewMode, setViewMode] = useState<'grid' | 'list'>('list')
	const [showFilters, setShowFilters] = useState(false)

	// Use sample data for now
	const applications = sampleApplications

	useEffect(() => {
		if (user?.id) {
			dispatch(fetchMyApplications(user.id))
		}
	}, [dispatch, user?.id])

	const getStatusInfo = (statusId: number) => {
		switch (statusId) {
			case 1:
				return {
					label: 'Applied',
					color: 'blue',
					icon: Clock,
					bgColor: 'bg-blue-50',
					textColor: 'text-blue-700',
					borderColor: 'border-blue-200'
				}
			case 2:
				return {
					label: 'Under Review',
					color: 'yellow',
					icon: AlertCircle,
					bgColor: 'bg-yellow-50',
					textColor: 'text-yellow-700',
					borderColor: 'border-yellow-200'
				}
			case 3:
				return {
					label: 'Mutual Interest',
					color: 'purple',
					icon: Heart,
					bgColor: 'bg-purple-50',
					textColor: 'text-purple-700',
					borderColor: 'border-purple-200'
				}
			case 4:
				return {
					label: 'Offer Extended',
					color: 'green',
					icon: CheckCircle,
					bgColor: 'bg-green-50',
					textColor: 'text-green-700',
					borderColor: 'border-green-200'
				}
			case 5:
				return {
					label: 'Not Selected',
					color: 'red',
					icon: XCircle,
					bgColor: 'bg-red-50',
					textColor: 'text-red-700',
					borderColor: 'border-red-200'
				}
			default:
				return {
					label: 'Unknown',
					color: 'gray',
					icon: Clock,
					bgColor: 'bg-gray-50',
					textColor: 'text-gray-700',
					borderColor: 'border-gray-200'
				}
		}
	}

	const formatDate = (dateString: string) => {
		const date = new Date(dateString)
		return date.toLocaleDateString('en-US', { 
			year: 'numeric', 
			month: 'short', 
			day: 'numeric' 
		})
	}

	const getTimeAgo = (dateString: string) => {
		const now = new Date()
		const applied = new Date(dateString)
		const diffTime = Math.abs(now.getTime() - applied.getTime())
		const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
		
		if (diffDays === 1) return '1 day ago'
		if (diffDays < 7) return `${diffDays} days ago`
		if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`
		return `${Math.ceil(diffDays / 30)} months ago`
	}

	const getProgressColor = (progress: number) => {
		if (progress >= 90) return 'bg-green-500'
		if (progress >= 70) return 'bg-purple-500'
		if (progress >= 50) return 'bg-yellow-500'
		return 'bg-blue-500'
	}

	const filteredApplications = applications.filter(app => {
		const matchesSearch = app.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
			app.company.toLowerCase().includes(searchTerm.toLowerCase())
		const matchesStatus = !statusFilter || app.applicationStatusId.toString() === statusFilter
		return matchesSearch && matchesStatus
	})

	const sortedApplications = [...filteredApplications].sort((a, b) => {
		switch (sortBy) {
			case 'newest':
				return new Date(b.applicationDate).getTime() - new Date(a.applicationDate).getTime()
			case 'oldest':
				return new Date(a.applicationDate).getTime() - new Date(b.applicationDate).getTime()
			case 'company':
				return a.company.localeCompare(b.company)
			case 'status':
				return a.applicationStatusId - b.applicationStatusId
			default:
				return 0
		}
	})

	const stats = [
		{
			name: 'Total Applications',
			value: applications.length,
			icon: FileText,
			color: 'bg-blue-100 text-blue-600',
			change: '+2 this week'
		},
		{
			name: 'Under Review',
			value: applications.filter(app => app.applicationStatusId === 2).length,
			icon: AlertCircle,
			color: 'bg-yellow-100 text-yellow-600',
			change: '+1 this week'
		},
		{
			name: 'Mutual Interest',
			value: applications.filter(app => app.applicationStatusId === 3).length,
			icon: Heart,
			color: 'bg-purple-100 text-purple-600',
			change: 'Next: Direct Contact'
		},
		{
			name: 'Response Rate',
			value: '75%',
			icon: TrendingUp,
			color: 'bg-green-100 text-green-600',
			change: '+5% vs last month'
		}
	]

	if (isLoading) {
		return (
			<DashboardLayoutWithSidebar 
				title="My Applications"
				subtitle="Track the status of your job applications"
			>
				<div className="p-8">
					<div className="animate-pulse space-y-6">
						<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
							{[...Array(4)].map((_, i) => (
								<div key={i} className="h-24 bg-gray-200 rounded-lg"></div>
							))}
						</div>
						<div className="h-8 bg-gray-200 rounded w-1/4"></div>
						<div className="space-y-4">
							{[...Array(3)].map((_, i) => (
								<div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
							))}
						</div>
					</div>
				</div>
			</DashboardLayoutWithSidebar>
		)
	}

	return (
		<DashboardLayoutWithSidebar 
			title="My Applications"
			subtitle="Track the status of your job applications"
		>
			<div className="p-8 space-y-8">
				{/* Error Message */}
				{error && (
					<div className="bg-red-50 border border-red-200 rounded-lg p-4">
						<p className="text-red-700">{error}</p>
					</div>
				)}

				{/* Stats Cards */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
					{stats.map((stat, index) => {
						const Icon = stat.icon
						return (
							<div key={index} className="bg-white rounded-xl border border-gray-200 p-6">
								<div className="flex items-center justify-between">
									<div>
										<p className="text-sm font-medium text-gray-600">{stat.name}</p>
										<p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
										<p className="text-xs text-gray-500 mt-1">{stat.change}</p>
									</div>
									<div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.color}`}>
										<Icon className="w-6 h-6" />
									</div>
								</div>
							</div>
						)
					})}
				</div>

				{/* Search and Filters */}
				<div className="bg-white rounded-xl border border-gray-200 p-6">
					<div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
						{/* Search */}
						<div className="flex-1 max-w-md">
							<div className="relative">
								<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
								<input
									type="text"
									placeholder="Search applications..."
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
									className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
								/>
							</div>
						</div>

						{/* Controls */}
						<div className="flex items-center space-x-3">
							<button
								onClick={() => setShowFilters(!showFilters)}
								className={`flex items-center space-x-2 px-4 py-3 rounded-lg border transition-all ${
									showFilters 
										? 'bg-blue-50 border-blue-300 text-blue-700' 
										: 'border-gray-300 text-gray-700 hover:bg-gray-50'
								}`}
							>
								<SlidersHorizontal className="w-4 h-4" />
								<span>Filters</span>
							</button>
							
							<div className="flex items-center border border-gray-300 rounded-lg">
								<button
									onClick={() => setViewMode('list')}
									className={`p-3 ${viewMode === 'list' ? 'bg-blue-50 text-blue-600' : 'text-gray-600'}`}
								>
									<List className="w-4 h-4" />
								</button>
								<button
									onClick={() => setViewMode('grid')}
									className={`p-3 ${viewMode === 'grid' ? 'bg-blue-50 text-blue-600' : 'text-gray-600'}`}
								>
									<Grid3X3 className="w-4 h-4" />
								</button>
							</div>

							<select 
								value={sortBy}
								onChange={(e) => setSortBy(e.target.value)}
								className="px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
							>
								<option value="newest">Newest First</option>
								<option value="oldest">Oldest First</option>
								<option value="company">Company A-Z</option>
								<option value="status">Status</option>
							</select>
						</div>
					</div>

					{/* Expanded Filters */}
					{showFilters && (
						<div className="pt-6 border-t border-gray-200">
							<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
								<select 
									value={statusFilter}
									onChange={(e) => setStatusFilter(e.target.value)}
									className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
								>
									<option value="">All Statuses</option>
									<option value="1">Applied</option>
									<option value="2">Under Review</option>
									<option value="3">Mutual Interest</option>
									<option value="4">Offer Extended</option>
									<option value="5">Not Selected</option>
								</select>
							</div>
						</div>
					)}
				</div>

				{/* Applications List/Grid */}
				{sortedApplications.length > 0 ? (
					<div className={`${
						viewMode === 'grid' 
							? 'grid grid-cols-1 lg:grid-cols-2 gap-6' 
							: 'space-y-6'
					}`}>
						{sortedApplications.map((application) => {
							const statusInfo = getStatusInfo(application.applicationStatusId)
							const StatusIcon = statusInfo.icon

							return (
								<div key={application.applicationId} className="bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-all">
									<div className="p-6">
										{/* Header */}
										<div className="flex items-start justify-between mb-4">
											<div className="flex items-start space-x-3">
												<div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-semibold text-sm">
													{application.companyLogo}
												</div>
												<div className="flex-1">
													<h3 className="text-lg font-semibold text-gray-900 mb-1">
														{application.jobTitle}
													</h3>
													<p className="text-blue-600 font-medium">{application.company}</p>
													<div className="flex items-center text-sm text-gray-500 mt-1">
														<MapPin className="w-4 h-4 mr-1" />
														{application.location}
													</div>
												</div>
											</div>
											<div className="text-right">
												<div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusInfo.bgColor} ${statusInfo.textColor} ${statusInfo.borderColor} border`}>
													<StatusIcon className="w-4 h-4 mr-2" />
													{statusInfo.label}
												</div>
											</div>
										</div>

										{/* Progress Bar */}
										<div className="mb-4">
											<div className="flex items-center justify-between text-sm mb-2">
												<span className="text-gray-600">Application Progress</span>
												<span className="font-medium text-gray-900">{application.progress}%</span>
											</div>
											<div className="w-full bg-gray-200 rounded-full h-2">
												<div 
													className={`h-2 rounded-full transition-all ${getProgressColor(application.progress)}`}
													style={{ width: `${application.progress}%` }}
												></div>
											</div>
										</div>

										{/* Job Details */}
										<div className="space-y-3 mb-4">
											<div className="bg-gray-50 rounded-lg p-4">
												<div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
													<div>
														<span className="font-medium text-gray-700">Applied:</span>
														<p className="text-gray-900">{formatDate(application.applicationDate)}</p>
														<p className="text-gray-500 text-xs">{getTimeAgo(application.applicationDate)}</p>
													</div>
													<div>
														<span className="font-medium text-gray-700">Salary Range:</span>
														<p className="text-gray-900">{application.salary}</p>
													</div>
													<div>
														<span className="font-medium text-gray-700">Next Step:</span>
														<p className="text-gray-900">{application.nextStep}</p>
													</div>
													<div>
														<span className="font-medium text-gray-700">Recruiter:</span>
														<p className="text-gray-900">{application.recruiterName}</p>
													</div>
												</div>
											</div>

											{/* Skills */}
											<div>
												<span className="text-sm font-medium text-gray-700 mb-2 block">Required Skills:</span>
												<div className="flex flex-wrap gap-2">
													{application.skills.map((skill, index) => (
														<span key={index} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full border border-blue-200">
															{skill}
														</span>
													))}
												</div>
											</div>
										</div>

										{/* Actions */}
										<div className="pt-4 border-t border-gray-200">
											<div className="flex items-center justify-between">
												<div className="flex items-center space-x-4 text-sm text-gray-500">
													<span>Applied via {application.appliedVia}</span>
													<span>•</span>
													<span>Response: {application.responseTime}</span>
												</div>
												<div className="flex items-center space-x-2">
													<button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
														<Eye className="w-4 h-4" />
													</button>
													<button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
														<ExternalLink className="w-4 h-4" />
													</button>
												</div>
											</div>
										</div>
									</div>
								</div>
							)
						})}
					</div>
				) : (
					<div className="text-center py-12 bg-white rounded-xl border border-gray-200">
						<FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
						<h3 className="text-xl font-semibold text-gray-900 mb-2">No applications found</h3>
						<p className="text-gray-600 mb-6">
							{searchTerm || statusFilter 
								? 'Try adjusting your search or filters to find applications.'
								: "You haven't applied to any jobs yet. Start exploring opportunities!"
							}
						</p>
						<button
							onClick={() => {
								setSearchTerm('')
								setStatusFilter('')
							}}
							className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors mr-3"
						>
							{searchTerm || statusFilter ? 'Clear Filters' : 'Browse Jobs'}
						</button>
					</div>
				)}
			</div>
		</DashboardLayoutWithSidebar>
	)
}

export default ApplicationsPage 