import React, { useState, useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '../../../store/hooks'
import { fetchJobs, fetchRecommendedJobs } from '../../../store/slices/jobSlice'
import { useBrand, useBrandColors } from '../../../brand'
import { 
	BrandedH1, 
	BrandedH3,
	BrandedP, 
	BrandedSpan,
	BrandedCard,
	BrandedSection 
} from '../../../components/brand'
import DashboardLayoutWithSidebar from '../../../components/layout/DashboardLayoutWithSidebar'
import {
	Search,
	MapPin,
	Clock,
	DollarSign,
	Building2,
	Heart,
	Star,
	ExternalLink,
	Send,
	RefreshCw,
	AlertCircle,
	Loader,
	Calendar
} from 'lucide-react'

function JobsPage() {
	const dispatch = useAppDispatch()
	const { switchVariant } = useBrand()
	const colors = useBrandColors()
	
	// Redux state
	const { user } = useAppSelector((state) => state.auth)
	const { 
		jobs, 
		recommendedJobs, 
		isLoading, 
		error
	} = useAppSelector((state) => state.jobs)

	// Local state
	const [searchTerm, setSearchTerm] = useState('')
	const [showRecommended, setShowRecommended] = useState(false)
	const [isRefreshing, setIsRefreshing] = useState(false)

	// Set brand variant
	useEffect(() => {
		switchVariant('talent')
	}, [switchVariant])

	// Fetch jobs on mount
	useEffect(() => {
		if (user?.id) {
			dispatch(fetchJobs({ search: searchTerm }))
		}
	}, [dispatch, user?.id, searchTerm])

	// Fetch recommendations on mount
	useEffect(() => {
		if (user?.id && !recommendedJobs.length) {
			dispatch(fetchRecommendedJobs(user.id))
		}
	}, [dispatch, user?.id, recommendedJobs.length])

	const handleRefresh = async () => {
		setIsRefreshing(true)
		try {
			await dispatch(fetchJobs({ search: searchTerm }))
			if (user?.id) {
				await dispatch(fetchRecommendedJobs(user.id))
			}
		} finally {
			setIsRefreshing(false)
		}
	}

	const displayJobs = showRecommended ? recommendedJobs : jobs

	return (
		<DashboardLayoutWithSidebar 
			title="Job Search"
			subtitle="Discover opportunities that match your skills and experience"
		>
			<BrandedSection className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				{/* Header */}
				<div className="flex items-center justify-between mb-8">
					<div>
						<BrandedH1>Job Search</BrandedH1>
						<BrandedP style={{ color: colors.text.secondary }}>
							Find your next career opportunity
						</BrandedP>
					</div>
					<div className="flex items-center space-x-3">
						<button
							onClick={handleRefresh}
							disabled={isRefreshing}
							className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-colors"
						>
							<RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
							<span>{isRefreshing ? 'Refreshing...' : 'Refresh'}</span>
						</button>
					</div>
				</div>

				{/* Search Bar */}
				<div className="mb-8">
					<div className="relative">
						<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
						<input
							type="text"
							placeholder="Search for jobs, companies, or keywords..."
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
						/>
					</div>
				</div>

				{/* Tabs */}
				<div className="mb-8">
					<div className="border-b border-gray-200">
						<nav className="-mb-px flex space-x-8">
							<button
								onClick={() => setShowRecommended(false)}
								className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
									!showRecommended
										? 'border-blue-500 text-blue-600'
										: 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
								}`}
							>
								All Jobs ({jobs.length})
							</button>
							<button
								onClick={() => setShowRecommended(true)}
								className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
									showRecommended
										? 'border-blue-500 text-blue-600'
										: 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
								}`}
							>
								Recommended ({recommendedJobs.length})
							</button>
						</nav>
					</div>
				</div>

				{/* Loading State */}
				{isLoading ? (
					<div className="flex items-center justify-center py-12">
						<div className="flex items-center space-x-3">
							<Loader className="w-6 h-6 animate-spin" style={{ color: colors.primary }} />
							<BrandedSpan style={{ color: colors.text.secondary }}>
								Loading jobs...
							</BrandedSpan>
						</div>
					</div>
				) : (
					/* Jobs Grid */
					<div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
						{displayJobs.map((job) => (
							<BrandedCard key={job.jobId} variant="outlined" padding="lg">
								<div className="space-y-4">
									{/* Job Header */}
									<div className="flex items-start justify-between">
										<div className="flex-1">
											<BrandedH3 className="text-lg font-semibold mb-2">
												{job.jobTitle}
											</BrandedH3>
											<div className="flex items-center space-x-2 mb-2">
												<Building2 className="w-4 h-4 text-gray-400" />
												<BrandedSpan className="text-sm" style={{ color: colors.text.secondary }}>
													{job.employerName}
												</BrandedSpan>
											</div>
											<div className="flex items-center space-x-2">
												<MapPin className="w-4 h-4 text-gray-400" />
												<BrandedSpan className="text-sm" style={{ color: colors.text.secondary }}>
													{job.cityName}
												</BrandedSpan>
											</div>
										</div>
										{job.isRecommended && (
											<div className="flex items-center space-x-1 px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
												<Star className="w-3 h-3" />
												<span>Recommended</span>
											</div>
										)}
									</div>

									{/* Job Details */}
									<div className="space-y-2">
										{job.salaryRange && (
											<div className="flex items-center space-x-2">
												<DollarSign className="w-4 h-4 text-gray-400" />
												<BrandedSpan className="text-sm" style={{ color: colors.text.secondary }}>
													{job.salaryRange}
												</BrandedSpan>
											</div>
										)}
										{job.employmentTypeName && (
											<div className="flex items-center space-x-2">
												<Clock className="w-4 h-4 text-gray-400" />
												<BrandedSpan className="text-sm" style={{ color: colors.text.secondary }}>
													{job.employmentTypeName}
												</BrandedSpan>
											</div>
										)}
										<div className="flex items-center space-x-2">
											<Calendar className="w-4 h-4 text-gray-400" />
											<BrandedSpan className="text-sm" style={{ color: colors.text.secondary }}>
												Posted {new Date(job.postingDate).toLocaleDateString()}
											</BrandedSpan>
										</div>
									</div>

									{/* Actions */}
									<div className="flex items-center space-x-3 pt-4 border-t border-gray-200">
										<button
											className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors"
											style={{ backgroundColor: colors.primary }}
										>
											<Send className="w-4 h-4" />
											<span>Apply</span>
										</button>
										<button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
											<Heart className="w-4 h-4" />
										</button>
										<button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
											<ExternalLink className="w-4 h-4" />
										</button>
									</div>
								</div>
							</BrandedCard>
						))}
					</div>
				)}

				{/* Empty State */}
				{!isLoading && displayJobs.length === 0 && (
					<div className="text-center py-12">
						<Search className="w-12 h-12 mx-auto text-gray-400 mb-4" />
						<BrandedH3 className="text-lg font-medium mb-2">No jobs found</BrandedH3>
						<BrandedP style={{ color: colors.text.secondary }}>
							Try adjusting your search criteria or check back later for new opportunities.
						</BrandedP>
					</div>
				)}

				{/* Error State */}
				{error && (
					<div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
						<div className="flex items-center space-x-2">
							<AlertCircle className="w-5 h-5 text-red-500" />
							<BrandedSpan className="text-red-700 font-medium">
								Error loading jobs: {error}
							</BrandedSpan>
						</div>
					</div>
				)}
			</BrandedSection>
		</DashboardLayoutWithSidebar>
	)
}

export default JobsPage 