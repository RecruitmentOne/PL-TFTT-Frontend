import React, { useState } from 'react'
import { useAppSelector } from '../../../store/hooks'
import DashboardLayoutWithSidebar from '../../../components/layout/DashboardLayoutWithSidebar'
import {
	Search,
	Filter,
	Users,
	MapPin,
	Star,
	Eye,
	MessageSquare,
	Download,
	Heart,
	Briefcase,
	GraduationCap,
	Calendar,
	Mail,
	Phone,
	ExternalLink,
	ChevronDown,
	SlidersHorizontal,
	UserCheck,
	Clock,
	Award,
	Building2
} from 'lucide-react'

// Sample candidate data
const candidates = [
	{
		id: 1,
		name: 'Sarah Chen',
		title: 'Senior React Developer',
		location: 'San Francisco, CA',
		experience: '5+ years',
		skills: ['React', 'TypeScript', 'Node.js', 'AWS', 'GraphQL'],
		avatar: 'SC',
		matchScore: 94,
		salary: '$120k - $150k',
		availability: 'Available now',
		lastActive: '2 hours ago',
		status: 'interested',
		jobsApplied: ['Senior Frontend Developer', 'React Engineer'],
		education: 'Stanford University - Computer Science',
		previousCompanies: ['Google', 'Meta', 'Startup Inc'],
		portfolio: 'https://sarahchen.dev',
		github: 'https://github.com/sarahchen',
		summary: 'Experienced frontend developer with expertise in modern React ecosystem and scalable web applications.',
		isBookmarked: true
	},
	{
		id: 2,
		name: 'Michael Rodriguez',
		title: 'Full Stack Engineer',
		location: 'Austin, TX',
		experience: '4+ years',
		skills: ['React', 'Python', 'Django', 'PostgreSQL', 'Docker'],
		avatar: 'MR',
		matchScore: 87,
		salary: '$100k - $130k',
		availability: 'Available in 2 weeks',
		lastActive: '1 day ago',
		status: 'reviewing',
		jobsApplied: ['Full Stack Developer'],
		education: 'UT Austin - Software Engineering',
		previousCompanies: ['IBM', 'Dell', 'Local Startup'],
		portfolio: 'https://mrodriguez.io',
		github: 'https://github.com/mrodriguez',
		summary: 'Full-stack developer passionate about building scalable backend systems and intuitive user interfaces.',
		isBookmarked: false
	},
	{
		id: 3,
		name: 'Emily Johnson',
		title: 'Frontend Developer',
		location: 'Seattle, WA',
		experience: '3+ years',
		skills: ['Vue.js', 'JavaScript', 'CSS', 'Figma', 'Webpack'],
		avatar: 'EJ',
		matchScore: 82,
		salary: '$90k - $115k',
		availability: 'Available now',
		lastActive: '5 hours ago',
		status: 'contacted',
		jobsApplied: ['Frontend Developer', 'UI Developer'],
		education: 'University of Washington - Design',
		previousCompanies: ['Microsoft', 'Adobe'],
		portfolio: 'https://emilyj.design',
		github: 'https://github.com/emilyj',
		summary: 'Creative frontend developer with strong design sensibilities and expertise in modern JavaScript frameworks.',
		isBookmarked: true
	},
	{
		id: 4,
		name: 'David Kim',
		title: 'Senior Backend Developer',
		location: 'Remote',
		experience: '6+ years',
		skills: ['Node.js', 'Python', 'Kubernetes', 'MongoDB', 'Redis'],
		avatar: 'DK',
		matchScore: 91,
		salary: '$130k - $160k',
		availability: 'Available in 1 month',
		lastActive: '3 days ago',
		status: 'new',
		jobsApplied: ['Senior Backend Engineer'],
		education: 'MIT - Computer Science',
		previousCompanies: ['Amazon', 'Netflix', 'Spotify'],
		portfolio: 'https://davidkim.tech',
		github: 'https://github.com/davidkim',
		summary: 'Senior backend engineer with expertise in distributed systems and high-performance applications.',
		isBookmarked: false
	}
]

const filterOptions = {
	location: ['San Francisco, CA', 'Austin, TX', 'Seattle, WA', 'Remote', 'New York, NY'],
	experience: ['1-2 years', '3-5 years', '5+ years', '10+ years'],
	skills: ['React', 'Vue.js', 'Angular', 'Node.js', 'Python', 'Java', 'TypeScript'],
	availability: ['Available now', 'Available in 2 weeks', 'Available in 1 month', 'Not looking'],
	salary: ['$50k - $75k', '$75k - $100k', '$100k - $125k', '$125k - $150k', '$150k+']
}

function CandidatesPage() {
	const { user } = useAppSelector((state) => state.auth)
	const [searchTerm, setSearchTerm] = useState('')
	const [selectedCandidate, setSelectedCandidate] = useState(null)
	const [showFilters, setShowFilters] = useState(false)
	const [filters, setFilters] = useState({
		location: '',
		experience: '',
		skills: [],
		availability: '',
		salary: '',
		status: ''
	})
	const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

	const getStatusColor = (status: string) => {
		switch (status) {
			case 'interested': return 'bg-green-100 text-green-800'
			case 'reviewing': return 'bg-yellow-100 text-yellow-800'
			case 'contacted': return 'bg-blue-100 text-blue-800'
			case 'new': return 'bg-purple-100 text-purple-800'
			default: return 'bg-gray-100 text-gray-800'
		}
	}

	const handleContactCandidate = (candidateId: number) => {
		console.log('Contacting candidate:', candidateId)
		// In real app, this would open a message modal or redirect to messaging
	}

	const handleViewProfile = (candidateId: number) => {
		console.log('Viewing profile:', candidateId)
		// In real app, this would deduct credits and show full profile
	}

	const handleToggleBookmark = (candidateId: number) => {
		console.log('Toggling bookmark for candidate:', candidateId)
		// In real app, this would update the bookmark status
	}

	const filteredCandidates = candidates.filter(candidate => {
		const matchesSearch = candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			candidate.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
			candidate.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
		
		// Add other filter logic here
		return matchesSearch
	})

	return (
		<DashboardLayoutWithSidebar 
			title="Candidate Management"
			subtitle="Browse and manage your talent pipeline"
		>
			<div className="p-8 space-y-6">
				{/* Header with Search and Filters */}
				<div className="bg-white rounded-xl border border-gray-200 p-6">
					<div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
						{/* Search */}
						<div className="flex-1 max-w-md">
							<div className="relative">
								<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
								<input
									type="text"
									placeholder="Search candidates by name, skills, or title..."
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
									className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
								/>
							</div>
						</div>

						{/* Action Buttons */}
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
									onClick={() => setViewMode('grid')}
									className={`p-3 ${viewMode === 'grid' ? 'bg-blue-50 text-blue-600' : 'text-gray-600'}`}
								>
									<Users className="w-4 h-4" />
								</button>
								<button
									onClick={() => setViewMode('list')}
									className={`p-3 ${viewMode === 'list' ? 'bg-blue-50 text-blue-600' : 'text-gray-600'}`}
								>
									<Filter className="w-4 h-4" />
								</button>
							</div>

							<button className="flex items-center space-x-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
								<Download className="w-4 h-4" />
								<span>Export</span>
							</button>
						</div>
					</div>

					{/* Expanded Filters */}
					{showFilters && (
						<div className="mt-6 pt-6 border-t border-gray-200">
							<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
								<select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
									<option value="">All Locations</option>
									{filterOptions.location.map(location => (
										<option key={location} value={location}>{location}</option>
									))}
								</select>
								
								<select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
									<option value="">All Experience</option>
									{filterOptions.experience.map(exp => (
										<option key={exp} value={exp}>{exp}</option>
									))}
								</select>
								
								<select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
									<option value="">All Skills</option>
									{filterOptions.skills.map(skill => (
										<option key={skill} value={skill}>{skill}</option>
									))}
								</select>
								
								<select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
									<option value="">All Availability</option>
									{filterOptions.availability.map(avail => (
										<option key={avail} value={avail}>{avail}</option>
									))}
								</select>
								
								<select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
									<option value="">All Salaries</option>
									{filterOptions.salary.map(salary => (
										<option key={salary} value={salary}>{salary}</option>
									))}
								</select>
							</div>
						</div>
					)}
				</div>

				{/* Results Summary */}
				<div className="flex items-center justify-between">
					<div className="flex items-center space-x-4">
						<p className="text-gray-600">
							<span className="font-semibold text-gray-900">{filteredCandidates.length}</span> candidates found
						</p>
						<div className="flex items-center space-x-2">
							<div className="w-2 h-2 bg-green-500 rounded-full"></div>
							<span className="text-sm text-gray-600">
								{candidates.filter(c => c.status === 'interested').length} interested
							</span>
						</div>
					</div>
					
					<select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
						<option>Sort by Match Score</option>
						<option>Sort by Experience</option>
						<option>Sort by Last Active</option>
						<option>Sort by Salary</option>
					</select>
				</div>

				{/* Candidates Grid/List */}
				<div className={`grid gap-6 ${
					viewMode === 'grid' 
						? 'grid-cols-1 lg:grid-cols-2 xl:grid-cols-3' 
						: 'grid-cols-1'
				}`}>
					{filteredCandidates.map((candidate) => (
						<div key={candidate.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all">
							{/* Header */}
							<div className="flex items-start justify-between mb-4">
								<div className="flex items-center space-x-3">
									<div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
										{candidate.avatar}
									</div>
									<div>
										<h3 className="text-lg font-semibold text-gray-900">{candidate.name}</h3>
										<p className="text-blue-600 font-medium">{candidate.title}</p>
									</div>
								</div>
								
								<div className="flex items-center space-x-2">
									<button
										onClick={() => handleToggleBookmark(candidate.id)}
										className={`p-2 rounded-lg transition-colors ${
											candidate.isBookmarked 
												? 'text-red-500 bg-red-50 hover:bg-red-100' 
												: 'text-gray-400 hover:text-red-500 hover:bg-red-50'
										}`}
									>
										<Heart className={`w-4 h-4 ${candidate.isBookmarked ? 'fill-current' : ''}`} />
									</button>
									
									<div className="flex items-center space-x-1 bg-green-50 px-2 py-1 rounded-full">
										<Star className="w-4 h-4 text-green-600" />
										<span className="text-sm font-medium text-green-700">{candidate.matchScore}%</span>
									</div>
								</div>
							</div>

							{/* Details */}
							<div className="space-y-3 mb-4">
								<div className="flex items-center text-sm text-gray-600">
									<MapPin className="w-4 h-4 mr-2" />
									{candidate.location}
								</div>
								
								<div className="flex items-center text-sm text-gray-600">
									<Briefcase className="w-4 h-4 mr-2" />
									{candidate.experience} experience
								</div>
								
								<div className="flex items-center text-sm text-gray-600">
									<Clock className="w-4 h-4 mr-2" />
									{candidate.availability}
								</div>
								
								<div className="flex items-center text-sm text-gray-600">
									<GraduationCap className="w-4 h-4 mr-2" />
									{candidate.education}
								</div>
							</div>

							{/* Skills */}
							<div className="mb-4">
								<div className="flex flex-wrap gap-2">
									{candidate.skills.slice(0, 3).map((skill, index) => (
										<span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
											{skill}
										</span>
									))}
									{candidate.skills.length > 3 && (
										<span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
											+{candidate.skills.length - 3} more
										</span>
									)}
								</div>
							</div>

							{/* Status and Actions */}
							<div className="flex items-center justify-between">
								<span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(candidate.status)}`}>
									{candidate.status.charAt(0).toUpperCase() + candidate.status.slice(1)}
								</span>
								
								<div className="flex items-center space-x-2">
									<button
										onClick={() => handleViewProfile(candidate.id)}
										className="flex items-center space-x-1 px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
									>
										<Eye className="w-4 h-4" />
										<span>View (1 credit)</span>
									</button>
									
									<button
										onClick={() => handleContactCandidate(candidate.id)}
										className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
									>
										<MessageSquare className="w-4 h-4" />
									</button>
								</div>
							</div>

							{/* Last Activity */}
							<div className="mt-3 pt-3 border-t border-gray-100">
								<p className="text-xs text-gray-500">
									Last active: {candidate.lastActive}
								</p>
							</div>
						</div>
					))}
				</div>

				{/* Empty State */}
				{filteredCandidates.length === 0 && (
					<div className="text-center py-12 bg-white rounded-xl border border-gray-200">
						<Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
						<h3 className="text-xl font-semibold text-gray-900 mb-2">No candidates found</h3>
						<p className="text-gray-600 mb-6">
							Try adjusting your search criteria or filters to find more candidates.
						</p>
						<button 
							onClick={() => {
								setSearchTerm('')
								setFilters({
									location: '',
									experience: '',
									skills: [],
									availability: '',
									salary: '',
									status: ''
								})
							}}
							className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
						>
							Clear Filters
						</button>
					</div>
				)}
			</div>
		</DashboardLayoutWithSidebar>
	)
}

export default CandidatesPage 