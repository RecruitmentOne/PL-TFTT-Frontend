import React, { useState, useEffect } from 'react'
import { 
	Plus, 
	Search, 
	Filter, 
	Heart, 
	Users, 
	Calendar, 
	MapPin, 
	DollarSign,
	Edit,
	Trash2,
	Eye,
	Clock,
	Briefcase,
	Building,
	X,
	ChevronDown
} from 'lucide-react'
import { useBrandColors } from '../../../brand'
import { Job, JobFilters, DashboardUser, TalentLike } from '../../../types/dashboard'
import { dashboardAPI } from '../../../services/dashboardAPI'

interface JobsPageProps {
	user: DashboardUser
}

interface JobCardProps {
	job: Job
	userType: 'team' | 'talent'
	onEdit?: () => void
	onDelete?: () => void
	onViewLikes?: () => void
	onLike?: () => void
	onDislike?: () => void
	isLiked?: boolean
}

interface FilterBarProps {
	filters: JobFilters
	onFiltersChange: (filters: JobFilters) => void
	userType: 'team' | 'talent'
}

interface CreateJobModalProps {
	isOpen: boolean
	onClose: () => void
	onSubmit: (jobData: Partial<Job>) => void
}

function JobCard({ job, userType, onEdit, onDelete, onViewLikes, onLike, onDislike, isLiked }: JobCardProps) {
	const colors = useBrandColors()
	const [hoveredAction, setHoveredAction] = useState<string | null>(null)

	return (
		<div 
			className="p-6 rounded-xl border shadow-sm transition-transform duration-200 hover:scale-105"
			style={{ 
				backgroundColor: colors.surface,
				borderColor: colors.border
			}}
		>
			<div className="flex items-start justify-between mb-4">
				<div className="flex-1">
					<h3 
						className="text-lg font-semibold mb-2"
						style={{ color: colors.text.primary }}
					>
						{job.title}
					</h3>
					<div className="flex items-center space-x-4 text-sm mb-2">
						<div className="flex items-center space-x-1">
							<Building className="w-4 h-4" style={{ color: colors.text.secondary }} />
							<span style={{ color: colors.text.secondary }}>{job.company}</span>
						</div>
						<div className="flex items-center space-x-1">
							<MapPin className="w-4 h-4" style={{ color: colors.text.secondary }} />
							<span style={{ color: colors.text.secondary }}>{job.location}</span>
						</div>
						{job.salaryRange && (
							<div className="flex items-center space-x-1">
								<DollarSign className="w-4 h-4" style={{ color: colors.text.secondary }} />
								<span style={{ color: colors.text.secondary }}>{job.salaryRange}</span>
							</div>
						)}
					</div>
					<div className="flex items-center space-x-4 text-sm">
						<div className="flex items-center space-x-1">
							<Calendar className="w-4 h-4" style={{ color: colors.text.tertiary }} />
							<span style={{ color: colors.text.tertiary }}>
								Posted {new Date(job.postedDate).toLocaleDateString()}
							</span>
						</div>
						<span 
							className={`px-2 py-1 rounded-full text-xs font-medium ${
								job.status === 'active' ? 'bg-green-100 text-green-800' :
								job.status === 'closed' ? 'bg-red-100 text-red-800' :
								'bg-gray-100 text-gray-800'
							}`}
						>
							{job.status}
						</span>
					</div>
				</div>

				{userType === 'team' && (
					<div className="flex items-center space-x-2">
						<button
							onClick={onEdit}
							className="p-2 rounded-lg transition-colors duration-200"
							style={{ 
								color: colors.text.secondary,
								backgroundColor: hoveredAction === 'edit' ? colors.hover : 'transparent'
							}}
							onMouseEnter={() => setHoveredAction('edit')}
							onMouseLeave={() => setHoveredAction(null)}
						>
							<Edit className="w-4 h-4" />
						</button>
						<button
							onClick={onDelete}
							className="p-2 rounded-lg transition-colors duration-200"
							style={{ 
								color: colors.error,
								backgroundColor: hoveredAction === 'delete' ? colors.hover : 'transparent'
							}}
							onMouseEnter={() => setHoveredAction('delete')}
							onMouseLeave={() => setHoveredAction(null)}
						>
							<Trash2 className="w-4 h-4" />
						</button>
					</div>
				)}
			</div>

			<p 
				className="text-sm mb-4"
				style={{ color: colors.text.secondary }}
			>
				{job.description.length > 150 ? 
					`${job.description.substring(0, 150)}...` : 
					job.description
				}
			</p>

			<div className="flex items-center justify-between">
				{userType === 'team' ? (
					<div className="flex items-center space-x-4">
						<div className="flex items-center space-x-1">
							<Heart className="w-4 h-4" style={{ color: colors.error }} />
							<span 
								className="text-sm font-medium"
								style={{ color: colors.text.primary }}
							>
								{job.likesCount} likes
							</span>
						</div>
						<button
							onClick={onViewLikes}
							className="text-sm font-medium transition-opacity duration-200 hover:opacity-80"
							style={{ color: colors.primary }}
						>
							View Talents
						</button>
					</div>
				) : (
					<div className="flex items-center space-x-2">
						<button
							onClick={onLike}
							className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
								isLiked ? 'scale-105' : 'hover:scale-105'
							}`}
							style={{ 
								backgroundColor: isLiked ? colors.error : colors.primary,
								color: colors.text.inverse
							}}
						>
							<Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
							<span>{isLiked ? 'Liked' : 'Like'}</span>
						</button>
						<button
							onClick={onDislike}
							className="px-4 py-2 rounded-lg font-medium transition-opacity duration-200 hover:opacity-80"
							style={{ 
								backgroundColor: colors.border,
								color: colors.text.primary
							}}
						>
							Pass
						</button>
					</div>
				)}
			</div>
		</div>
	)
}

function FilterBar({ filters, onFiltersChange, userType }: FilterBarProps) {
	const colors = useBrandColors()
	const [showFilters, setShowFilters] = useState(false)

	return (
		<div 
			className="p-4 rounded-lg border mb-6"
			style={{ 
				backgroundColor: colors.surface,
				borderColor: colors.border
			}}
		>
			<div className="flex items-center space-x-4 mb-4">
				<div className="flex-1 relative">
					<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" 
						style={{ color: colors.text.secondary }} />
					<input
						type="text"
						placeholder="Search jobs..."
						value={filters.search}
						onChange={(e) => onFiltersChange({ ...filters, search: e.target.value })}
						className="w-full pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:border-current"
						style={{ 
							borderColor: colors.border,
							backgroundColor: colors.background,
							color: colors.text.primary
						}}
					/>
				</div>
				<button
					onClick={() => setShowFilters(!showFilters)}
					className="flex items-center space-x-2 px-4 py-2 rounded-lg border font-medium transition-colors duration-200"
					style={{ 
						borderColor: colors.border,
						backgroundColor: showFilters ? colors.primary : colors.background,
						color: showFilters ? colors.text.inverse : colors.text.primary
					}}
				>
					<Filter className="w-4 h-4" />
					<span>Filters</span>
					<ChevronDown className={`w-4 h-4 transition-transform duration-200 ${showFilters ? 'rotate-180' : ''}`} />
				</button>
			</div>

			{showFilters && (
				<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
					<div>
						<label 
							className="block text-sm font-medium mb-1"
							style={{ color: colors.text.secondary }}
						>
							Location
						</label>
						<input
							type="text"
							placeholder="Any location"
							value={filters.location}
							onChange={(e) => onFiltersChange({ ...filters, location: e.target.value })}
							className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2"
							style={{ 
								borderColor: colors.border,
								backgroundColor: colors.background,
								color: colors.text.primary
							}}
						/>
					</div>
					<div>
						<label 
							className="block text-sm font-medium mb-1"
							style={{ color: colors.text.secondary }}
						>
							Employment Type
						</label>
						<select
							value={filters.employmentType}
							onChange={(e) => onFiltersChange({ ...filters, employmentType: e.target.value })}
							className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2"
							style={{ 
								borderColor: colors.border,
								backgroundColor: colors.background,
								color: colors.text.primary
							}}
						>
							<option value="">Any type</option>
							<option value="full-time">Full-time</option>
							<option value="part-time">Part-time</option>
							<option value="contract">Contract</option>
							<option value="remote">Remote</option>
						</select>
					</div>
					<div>
						<label 
							className="block text-sm font-medium mb-1"
							style={{ color: colors.text.secondary }}
						>
							Salary Range
						</label>
						<select
							value={filters.salaryRange}
							onChange={(e) => onFiltersChange({ ...filters, salaryRange: e.target.value })}
							className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2"
							style={{ 
								borderColor: colors.border,
								backgroundColor: colors.background,
								color: colors.text.primary
							}}
						>
							<option value="">Any salary</option>
							<option value="0-50k">$0 - $50k</option>
							<option value="50k-100k">$50k - $100k</option>
							<option value="100k-150k">$100k - $150k</option>
							<option value="150k+">$150k+</option>
						</select>
					</div>
					<div>
						<label 
							className="block text-sm font-medium mb-1"
							style={{ color: colors.text.secondary }}
						>
							Date Posted
						</label>
						<select
							value={filters.datePosted}
							onChange={(e) => onFiltersChange({ ...filters, datePosted: e.target.value })}
							className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2"
							style={{ 
								borderColor: colors.border,
								backgroundColor: colors.background,
								color: colors.text.primary
							}}
						>
							<option value="">Any time</option>
							<option value="today">Today</option>
							<option value="week">This week</option>
							<option value="month">This month</option>
						</select>
					</div>
				</div>
			)}
		</div>
	)
}

function CreateJobModal({ isOpen, onClose, onSubmit }: CreateJobModalProps) {
	const colors = useBrandColors()
	const [jobData, setJobData] = useState<Partial<Job>>({
		title: '',
		company: '',
		description: '',
		location: '',
		salaryRange: '',
		employmentType: 'full-time',
		requirements: [],
		benefits: []
	})

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		onSubmit(jobData)
		onClose()
		setJobData({
			title: '',
			company: '',
			description: '',
			location: '',
			salaryRange: '',
			employmentType: 'full-time',
			requirements: [],
			benefits: []
		})
	}

	if (!isOpen) return null

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
			<div 
				className="w-full max-w-2xl max-h-screen overflow-y-auto rounded-xl border"
				style={{ 
					backgroundColor: colors.surface,
					borderColor: colors.border
				}}
			>
				<div className="flex items-center justify-between p-6 border-b" style={{ borderColor: colors.border }}>
					<h2 
						className="text-xl font-semibold"
						style={{ color: colors.text.primary }}
					>
						Create New Job
					</h2>
					<button
						onClick={onClose}
						className="p-2 rounded-lg transition-colors duration-200 hover:bg-opacity-10"
						style={{ 
							color: colors.text.secondary
						}}
					>
						<X className="w-5 h-5" />
					</button>
				</div>

				<form onSubmit={handleSubmit} className="p-6 space-y-4">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div>
							<label 
								className="block text-sm font-medium mb-2"
								style={{ color: colors.text.secondary }}
							>
								Job Title *
							</label>
							<input
								type="text"
								required
								value={jobData.title}
								onChange={(e) => setJobData({ ...jobData, title: e.target.value })}
								className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2"
								style={{ 
									borderColor: colors.border,
									backgroundColor: colors.background,
									color: colors.text.primary
								}}
							/>
						</div>
						<div>
							<label 
								className="block text-sm font-medium mb-2"
								style={{ color: colors.text.secondary }}
							>
								Company *
							</label>
							<input
								type="text"
								required
								value={jobData.company}
								onChange={(e) => setJobData({ ...jobData, company: e.target.value })}
								className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2"
								style={{ 
									borderColor: colors.border,
									backgroundColor: colors.background,
									color: colors.text.primary
								}}
							/>
						</div>
					</div>

					<div>
						<label 
							className="block text-sm font-medium mb-2"
							style={{ color: colors.text.secondary }}
						>
							Job Description *
						</label>
						<textarea
							required
							rows={4}
							value={jobData.description}
							onChange={(e) => setJobData({ ...jobData, description: e.target.value })}
							className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2"
							style={{ 
								borderColor: colors.border,
								backgroundColor: colors.background,
								color: colors.text.primary
							}}
						/>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						<div>
							<label 
								className="block text-sm font-medium mb-2"
								style={{ color: colors.text.secondary }}
							>
								Location *
							</label>
							<input
								type="text"
								required
								value={jobData.location}
								onChange={(e) => setJobData({ ...jobData, location: e.target.value })}
								className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2"
								style={{ 
									borderColor: colors.border,
									backgroundColor: colors.background,
									color: colors.text.primary
								}}
							/>
						</div>
						<div>
							<label 
								className="block text-sm font-medium mb-2"
								style={{ color: colors.text.secondary }}
							>
								Employment Type
							</label>
							<select
								value={jobData.employmentType}
								onChange={(e) => setJobData({ ...jobData, employmentType: e.target.value })}
								className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2"
								style={{ 
									borderColor: colors.border,
									backgroundColor: colors.background,
									color: colors.text.primary
								}}
							>
								<option value="full-time">Full-time</option>
								<option value="part-time">Part-time</option>
								<option value="contract">Contract</option>
								<option value="remote">Remote</option>
							</select>
						</div>
						<div>
							<label 
								className="block text-sm font-medium mb-2"
								style={{ color: colors.text.secondary }}
							>
								Salary Range
							</label>
							<input
								type="text"
								placeholder="e.g. $50,000 - $70,000"
								value={jobData.salaryRange}
								onChange={(e) => setJobData({ ...jobData, salaryRange: e.target.value })}
								className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2"
								style={{ 
									borderColor: colors.border,
									backgroundColor: colors.background,
									color: colors.text.primary
								}}
							/>
						</div>
					</div>

					<div className="flex justify-end space-x-4 pt-4">
						<button
							type="button"
							onClick={onClose}
							className="px-4 py-2 rounded-lg font-medium transition-colors duration-200"
							style={{ 
								backgroundColor: colors.border,
								color: colors.text.primary
							}}
						>
							Cancel
						</button>
						<button
							type="submit"
							className="px-4 py-2 rounded-lg font-medium transition-opacity duration-200 hover:opacity-90"
							style={{ 
								backgroundColor: colors.primary,
								color: colors.text.inverse
							}}
						>
							Create Job
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}

export function JobsPage({ user }: JobsPageProps) {
	const [jobs, setJobs] = useState<Job[]>([])
	const [loading, setLoading] = useState(true)
	const [filters, setFilters] = useState<JobFilters>({
		search: '',
		location: '',
		employmentType: '',
		salaryRange: '',
		datePosted: ''
	})
	const [likedJobs, setLikedJobs] = useState<Set<string>>(new Set())
	const [showCreateModal, setShowCreateModal] = useState(false)
	const colors = useBrandColors()

	const isTeam = user.userType === 'team'

	useEffect(() => {
		const fetchJobs = async () => {
			try {
				setLoading(true)
				const response = await dashboardAPI.getJobs({ filters })
				setJobs(response.jobs)
			} catch (error) {
				console.error('Failed to fetch jobs:', error)
				// Mock data for demo
				setJobs([
					{
						id: '1',
						title: 'Frontend Developer',
						company: 'TechCorp',
						description: 'We are looking for an experienced Frontend Developer to join our team...',
						location: 'San Francisco, CA',
						salaryRange: '$80,000 - $120,000',
						employmentType: 'full-time',
						postedDate: new Date().toISOString(),
						closingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
						status: 'active',
						likesCount: 12,
						employerId: 'employer1'
					},
					{
						id: '2',
						title: 'Backend Engineer',
						company: 'StartupXYZ',
						description: 'Join our growing team as a Backend Engineer...',
						location: 'Remote',
						salaryRange: '$90,000 - $140,000',
						employmentType: 'full-time',
						postedDate: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
						closingDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString(),
						status: 'active',
						likesCount: 8,
						employerId: 'employer2'
					}
				])
			} finally {
				setLoading(false)
			}
		}

		fetchJobs()
	}, [filters])

	const handleLikeJob = async (jobId: string) => {
		try {
			await dashboardAPI.likeJob(jobId)
			setLikedJobs(prev => new Set([...prev, jobId]))
		} catch (error) {
			console.error('Failed to like job:', error)
		}
	}

	const handleDislikeJob = async (jobId: string) => {
		try {
			await dashboardAPI.dislikeJob(jobId)
			setLikedJobs(prev => {
				const newSet = new Set(prev)
				newSet.delete(jobId)
				return newSet
			})
		} catch (error) {
			console.error('Failed to dislike job:', error)
		}
	}

	const handleCreateJob = async (jobData: Partial<Job>) => {
		try {
			const newJob = await dashboardAPI.createJob(jobData)
			setJobs(prev => [newJob, ...prev])
		} catch (error) {
			console.error('Failed to create job:', error)
		}
	}

	if (loading) {
		return (
			<div className="flex items-center justify-center h-64">
				<div 
					className="w-8 h-8 border-4 border-t-transparent rounded-full animate-spin"
					style={{ borderColor: colors.primary }}
				/>
			</div>
		)
	}

	return (
		<div className="space-y-6">
			{/* Header */}
			<div className="flex items-center justify-between">
				<div>
					<h1 
						className="text-2xl font-bold"
						style={{ color: colors.text.primary }}
					>
						{isTeam ? 'Manage Jobs' : 'Browse Jobs'}
					</h1>
					<p 
						className="text-sm mt-1"
						style={{ color: colors.text.secondary }}
					>
						{isTeam ? 
							`${jobs.length} active job postings` : 
							`${jobs.length} jobs available`
						}
					</p>
				</div>

				{isTeam && (
					<button
						onClick={() => setShowCreateModal(true)}
						className="flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-opacity duration-200 hover:opacity-90"
						style={{ 
							backgroundColor: colors.primary,
							color: colors.text.inverse
						}}
					>
						<Plus className="w-5 h-5" />
						<span>Create Job</span>
					</button>
				)}
			</div>

			{/* Filters */}
			<FilterBar filters={filters} onFiltersChange={setFilters} userType={user.userType} />

			{/* Jobs Grid */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				{jobs.map((job) => (
					<JobCard
						key={job.id}
						job={job}
						userType={user.userType}
						isLiked={likedJobs.has(job.id)}
						onLike={() => handleLikeJob(job.id)}
						onDislike={() => handleDislikeJob(job.id)}
						onEdit={() => console.log('Edit job:', job.id)}
						onDelete={() => console.log('Delete job:', job.id)}
						onViewLikes={() => console.log('View likes for job:', job.id)}
					/>
				))}
			</div>

			{jobs.length === 0 && (
				<div className="text-center py-12">
					<Briefcase 
						className="w-16 h-16 mx-auto mb-4"
						style={{ color: colors.text.tertiary }}
					/>
					<h3 
						className="text-lg font-medium mb-2"
						style={{ color: colors.text.primary }}
					>
						No jobs found
					</h3>
					<p 
						className="text-sm"
						style={{ color: colors.text.secondary }}
					>
						{isTeam ? 
							'Create your first job posting to get started' :
							'Try adjusting your filters to see more results'
						}
					</p>
				</div>
			)}

			{/* Create Job Modal */}
			<CreateJobModal
				isOpen={showCreateModal}
				onClose={() => setShowCreateModal(false)}
				onSubmit={handleCreateJob}
			/>
		</div>
	)
} 