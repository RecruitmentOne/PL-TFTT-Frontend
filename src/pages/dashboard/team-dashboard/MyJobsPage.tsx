import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { fetchMyJobs, deleteJob, updateJob } from '../../../store/slices/jobSlice'
import { Link } from 'react-router-dom'
import DashboardLayoutWithSidebar from '../../../components/layout/DashboardLayoutWithSidebar'
import { Plus, Edit2, Trash2, Eye, Users, Calendar, MapPin, DollarSign, MoreVertical } from 'lucide-react'

function MyJobsPage() {
	const dispatch = useAppDispatch()
	const { myJobs, isLoading, error } = useAppSelector((state) => state.jobs)
	const { user } = useAppSelector((state) => state.auth)
	const [selectedJob, setSelectedJob] = useState<number | null>(null)
	const [showDeleteModal, setShowDeleteModal] = useState<number | null>(null)

	useEffect(() => {
		if (user?.id) {
			// For now, we'll pass a dummy employer ID. In real app, this should come from user profile
			dispatch(fetchMyJobs('1'))
		}
	}, [dispatch, user?.id])

	const handleDeleteJob = async (jobId: number) => {
		try {
			await dispatch(deleteJob(jobId.toString())).unwrap()
			setShowDeleteModal(null)
			alert('Job deleted successfully!')
		} catch (error) {
			console.error('Failed to delete job:', error)
			alert('Failed to delete job. Please try again.')
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
		const posted = new Date(dateString)
		const diffTime = Math.abs(now.getTime() - posted.getTime())
		const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
		
		if (diffDays === 1) return '1 day ago'
		if (diffDays < 7) return `${diffDays} days ago`
		if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`
		return `${Math.ceil(diffDays / 30)} months ago`
	}

	const isJobActive = (closingDate: string) => {
		return new Date(closingDate) > new Date()
	}

	if (isLoading) {
		return (
			<DashboardLayoutWithSidebar 
				title="My Job Listings"
				subtitle="Manage your job postings and track applications"
			>
				<div className="p-8">
					<div className="animate-pulse space-y-6">
						<div className="h-8 bg-gray-200 rounded w-1/4"></div>
						<div className="grid gap-6">
							{[...Array(3)].map((_, i) => (
								<div key={i} className="h-48 bg-gray-200 rounded-lg"></div>
							))}
						</div>
					</div>
				</div>
			</DashboardLayoutWithSidebar>
		)
	}

	return (
		<DashboardLayoutWithSidebar 
			title="My Job Listings"
			subtitle="Manage your job postings and track applications"
		>
			<div className="p-8">
				{/* Header */}
				<div className="flex justify-between items-center mb-8">
					<div>
						<h1 className="text-2xl font-bold text-gray-900 mb-2">Job Management</h1>
						<p className="text-gray-600">Track performance and manage your active job listings</p>
					</div>
					<Link
						to="/team/post-job"
						className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
					>
						<Plus className="w-4 h-4" />
						Post New Job
					</Link>
				</div>

				{/* Error Message */}
				{error && (
					<div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
						<p className="text-red-700">{error}</p>
					</div>
				)}

				{/* Job Statistics */}
				<div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
					<div className="bg-white p-6 rounded-lg border border-gray-200">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm font-medium text-gray-600">Total Jobs</p>
								<p className="text-2xl font-bold text-gray-900">{myJobs.length}</p>
							</div>
							<div className="p-3 bg-blue-100 rounded-full">
								<Users className="w-6 h-6 text-blue-600" />
							</div>
						</div>
					</div>
					<div className="bg-white p-6 rounded-lg border border-gray-200">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm font-medium text-gray-600">Active Jobs</p>
								<p className="text-2xl font-bold text-green-600">
									{myJobs.filter(job => isJobActive(job.closingDate)).length}
								</p>
							</div>
							<div className="p-3 bg-green-100 rounded-full">
								<Eye className="w-6 h-6 text-green-600" />
							</div>
						</div>
					</div>
					<div className="bg-white p-6 rounded-lg border border-gray-200">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm font-medium text-gray-600">Expired Jobs</p>
								<p className="text-2xl font-bold text-red-600">
									{myJobs.filter(job => !isJobActive(job.closingDate)).length}
								</p>
							</div>
							<div className="p-3 bg-red-100 rounded-full">
								<Calendar className="w-6 h-6 text-red-600" />
							</div>
						</div>
					</div>
					<div className="bg-white p-6 rounded-lg border border-gray-200">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm font-medium text-gray-600">Total Applications</p>
								<p className="text-2xl font-bold text-purple-600">0</p>
							</div>
							<div className="p-3 bg-purple-100 rounded-full">
								<Users className="w-6 h-6 text-purple-600" />
							</div>
						</div>
					</div>
				</div>

				{/* Job Listings */}
				{myJobs.length > 0 ? (
					<div className="space-y-6">
						{myJobs.map((job) => (
							<div key={job.jobId} className="bg-white rounded-lg border border-gray-200 p-6">
								<div className="flex justify-between items-start mb-4">
									<div className="flex-1">
										<div className="flex items-center gap-3 mb-2">
											<h3 className="text-xl font-semibold text-gray-900">{job.jobTitle}</h3>
											{isJobActive(job.closingDate) ? (
												<span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
													Active
												</span>
											) : (
												<span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">
													Expired
												</span>
											)}
										</div>
										<div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
											<div className="flex items-center gap-1">
												<MapPin className="w-4 h-4" />
												<span>{job.cityName}</span>
											</div>
											<div className="flex items-center gap-1">
												<Calendar className="w-4 h-4" />
												<span>Posted {getTimeAgo(job.postingDate)}</span>
											</div>
											<div className="flex items-center gap-1">
												<Calendar className="w-4 h-4" />
												<span>Closes {formatDate(job.closingDate)}</span>
											</div>
											{job.salaryRange && (
												<div className="flex items-center gap-1">
													<DollarSign className="w-4 h-4" />
													<span>{job.salaryRange}</span>
												</div>
											)}
										</div>
										<div className="flex items-center gap-3 text-sm">
											{job.employmentTypeName && (
												<span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
													{job.employmentTypeName}
												</span>
											)}
											{job.jobRoleName && (
												<span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full">
													{job.jobRoleName}
												</span>
											)}
										</div>
									</div>
									<div className="flex items-center gap-2">
										<button
											onClick={() => setSelectedJob(selectedJob === job.jobId ? null : job.jobId)}
											className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
										>
											<MoreVertical className="w-4 h-4" />
										</button>
										{selectedJob === job.jobId && (
											<div className="absolute right-6 mt-8 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
												<button className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full text-left">
													<Eye className="w-4 h-4" />
													View Applications
												</button>
												<button className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full text-left">
													<Edit2 className="w-4 h-4" />
													Edit Job
												</button>
												<button 
													onClick={() => setShowDeleteModal(job.jobId)}
													className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left"
												>
													<Trash2 className="w-4 h-4" />
													Delete Job
												</button>
											</div>
										)}
									</div>
								</div>
								
								{job.jobDescription && (
									<div className="mt-4">
										<p className="text-gray-700 line-clamp-2">{job.jobDescription}</p>
									</div>
								)}

								<div className="mt-4 pt-4 border-t border-gray-100">
									<div className="flex items-center justify-between text-sm text-gray-600">
										<span>0 applications received</span>
										<span>Job ID: {job.jobId}</span>
									</div>
								</div>
							</div>
						))}
					</div>
				) : (
					<div className="text-center py-12 bg-white rounded-lg border border-gray-200">
						<Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
						<h3 className="text-xl font-semibold text-gray-900 mb-2">No job listings yet</h3>
						<p className="text-gray-600 mb-6">
							Start attracting top talent by posting your first job listing.
						</p>
						<Link
							to="/team/post-job"
							className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
						>
							<Plus className="w-4 h-4" />
							Post Your First Job
						</Link>
					</div>
				)}

				{/* Delete Modal */}
				{showDeleteModal && (
					<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
						<div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
							<h3 className="text-lg font-semibold text-gray-900 mb-4">Delete Job Listing</h3>
							<p className="text-gray-600 mb-6">
								Are you sure you want to delete this job listing? This action cannot be undone and all related applications will be lost.
							</p>
							<div className="flex justify-end gap-3">
								<button
									onClick={() => setShowDeleteModal(null)}
									className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
								>
									Cancel
								</button>
								<button
									onClick={() => handleDeleteJob(showDeleteModal)}
									className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
								>
									Delete Job
								</button>
							</div>
						</div>
					</div>
				)}
			</div>
		</DashboardLayoutWithSidebar>
	)
}

export default MyJobsPage 