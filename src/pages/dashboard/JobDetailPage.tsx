import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useAppSelector } from '../../store/hooks'
import { jobAPI, matchingAPI } from '../../services/api'
import { 
	ArrowLeft, 
	MapPin, 
	Clock, 
	DollarSign, 
	Users, 
	Building, 
	Heart, 
	Send, 
	Bookmark,
	Share2,
	Calendar,
	Star,
	Trophy,
	CheckCircle,
	AlertCircle,
	Eye,
	Globe
} from 'lucide-react'
import LoadingSpinner from '../../components/shared/LoadingSpinner'

interface JobDetail {
	id: string
	title: string
	company: string
	location: string
	type: string
	salary: string
	description: string
	requirements: string[]
	benefits: string[]
	postedDate: string
	applicationDeadline: string
	companyLogo?: string
	companySize: string
	industry: string
	website?: string
	applicationCount: number
	matchScore?: number
}

function JobDetailPage() {
	const { jobId } = useParams<{ jobId: string }>()
	const navigate = useNavigate()
	const { user } = useAppSelector((state) => state.auth)
	const [job, setJob] = useState<JobDetail | null>(null)
	const [loading, setLoading] = useState(true)
	const [applying, setApplying] = useState(false)
	const [applied, setApplied] = useState(false)
	const [saved, setSaved] = useState(false)
	const [matchData, setMatchData] = useState<any>(null)
	const [error, setError] = useState('')

	useEffect(() => {
		if (jobId) {
			fetchJobDetails()
			if (user?.userType === 'talent') {
				fetchMatchData()
			}
		}
	}, [jobId, user])

	const fetchJobDetails = async () => {
		try {
			setLoading(true)
			const response = await jobAPI.getJobById(jobId!)
			
			// Transform API response to match our interface
			const jobDetail: JobDetail = {
				id: response.jobId?.toString() || jobId!,
				title: response.jobTitle || 'Job Title',
				company: response.companyName || 'Company Name',
				location: response.location || 'Location',
				type: response.employmentType || 'Full-time',
				salary: response.salaryRange || 'Competitive',
				description: response.jobDescription || 'Job description not available.',
				requirements: response.requirements ? response.requirements.split('\n') : [],
				benefits: response.benefits ? response.benefits.split('\n') : [],
				postedDate: response.datePosted || new Date().toISOString(),
				applicationDeadline: response.applicationDeadline || '',
				companyLogo: response.companyLogo,
				companySize: response.companySize || 'Not specified',
				industry: response.industry || 'Technology',
				website: response.companyWebsite,
				applicationCount: response.applicationCount || 0,
				matchScore: response.matchScore
			}
			
			setJob(jobDetail)
		} catch (error: any) {
			console.error('Error fetching job details:', error)
			setError('Failed to load job details')
		} finally {
			setLoading(false)
		}
	}

	const fetchMatchData = async () => {
		if (!user?.id) return
		
		try {
			const response = await matchingAPI.calculateMatch(user.id, jobId!)
			setMatchData(response)
		} catch (error) {
			console.error('Error fetching match data:', error)
		}
	}

	const handleApply = async () => {
		if (!user || !jobId) return
		
		try {
			setApplying(true)
			await jobAPI.applyToJob(jobId, { userId: user.id })
			setApplied(true)
		} catch (error: any) {
			console.error('Error applying to job:', error)
			setError('Failed to apply to job')
		} finally {
			setApplying(false)
		}
	}

	const handleSave = () => {
		setSaved(!saved)
		// TODO: Implement save functionality with backend
	}

	const handleShare = () => {
		navigator.clipboard.writeText(window.location.href)
		// TODO: Show toast notification
	}

	const getMatchScoreColor = (score: number) => {
		if (score >= 80) return 'text-green-600 bg-green-50'
		if (score >= 60) return 'text-yellow-600 bg-yellow-50'
		return 'text-red-600 bg-red-50'
	}

	const getMatchScoreIcon = (score: number) => {
		if (score >= 80) return CheckCircle
		if (score >= 60) return AlertCircle
		return AlertCircle
	}

	if (loading) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<LoadingSpinner size="lg" />
			</div>
		)
	}

	if (error || !job) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="text-center">
					<h2 className="text-2xl font-bold text-gray-900 mb-4">Job Not Found</h2>
					<p className="text-gray-600 mb-6">{error || 'The job you\'re looking for doesn\'t exist.'}</p>
					<Link
						to="/dashboard/jobs"
						className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
					>
						<ArrowLeft className="h-4 w-4 mr-2" />
						Back to Jobs
					</Link>
				</div>
			</div>
		)
	}

	return (
		<div className="min-h-screen bg-gray-50">
			{/* Header */}
			<div className="bg-white border-b border-gray-200 sticky top-16 z-10">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex items-center justify-between py-4">
						<button
							onClick={() => navigate(-1)}
							className="flex items-center text-gray-600 hover:text-gray-900"
						>
							<ArrowLeft className="h-5 w-5 mr-2" />
							Back
						</button>
						
						<div className="flex items-center space-x-4">
							<button
								onClick={handleShare}
								className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
							>
								<Share2 className="h-5 w-5" />
							</button>
							<button
								onClick={handleSave}
								className={`p-2 rounded-lg ${
									saved 
										? 'text-yellow-600 bg-yellow-50' 
										: 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
								}`}
							>
								<Bookmark className={`h-5 w-5 ${saved ? 'fill-current' : ''}`} />
							</button>
						</div>
					</div>
				</div>
			</div>

			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					{/* Main Content */}
					<div className="lg:col-span-2 space-y-8">
						{/* Job Header */}
						<div className="bg-white rounded-lg shadow-sm p-6">
							<div className="flex items-start justify-between mb-6">
								<div className="flex items-start space-x-4">
									<div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
										{job.companyLogo ? (
											<img
												src={job.companyLogo}
												alt={`${job.company} logo`}
												className="w-16 h-16 rounded-lg object-cover"
											/>
										) : (
											<Building className="h-8 w-8 text-gray-400" />
										)}
									</div>
									<div>
										<h1 className="text-2xl font-bold text-gray-900 mb-2">{job.title}</h1>
										<div className="flex items-center space-x-4 text-gray-600">
											<div className="flex items-center">
												<Building className="h-4 w-4 mr-1" />
												{job.company}
											</div>
											<div className="flex items-center">
												<MapPin className="h-4 w-4 mr-1" />
												{job.location}
											</div>
											<div className="flex items-center">
												<Clock className="h-4 w-4 mr-1" />
												{job.type}
											</div>
										</div>
									</div>
								</div>
								
								{/* Match Score - Only for talents */}
								{user?.userType === 'talent' && job.matchScore && (
									<div className={`px-4 py-2 rounded-lg ${getMatchScoreColor(job.matchScore)}`}>
										<div className="flex items-center">
											{(() => {
												const Icon = getMatchScoreIcon(job.matchScore)
												return <Icon className="h-4 w-4 mr-2" />
											})()}
											<span className="font-semibold">{job.matchScore}% Match</span>
										</div>
									</div>
								)}
							</div>

							{/* Job Meta */}
							<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
								<div className="flex items-center">
									<DollarSign className="h-4 w-4 text-gray-400 mr-2" />
									<span className="text-sm text-gray-600">{job.salary}</span>
								</div>
								<div className="flex items-center">
									<Users className="h-4 w-4 text-gray-400 mr-2" />
									<span className="text-sm text-gray-600">{job.companySize}</span>
								</div>
								<div className="flex items-center">
									<Calendar className="h-4 w-4 text-gray-400 mr-2" />
									<span className="text-sm text-gray-600">
										Posted {new Date(job.postedDate).toLocaleDateString()}
									</span>
								</div>
								<div className="flex items-center">
									<Eye className="h-4 w-4 text-gray-400 mr-2" />
									<span className="text-sm text-gray-600">{job.applicationCount} applications</span>
								</div>
							</div>

							{/* Quick Apply - Only for talents */}
							{user?.userType === 'talent' && (
								<div className="flex items-center space-x-4">
									{applied ? (
										<div className="flex items-center text-green-600 bg-green-50 px-4 py-2 rounded-lg">
											<CheckCircle className="h-5 w-5 mr-2" />
											Applied Successfully
										</div>
									) : (
										<button
											onClick={handleApply}
											disabled={applying}
											className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
										>
											{applying ? (
												<LoadingSpinner size="sm" color="white" />
											) : (
												<Send className="h-5 w-5 mr-2" />
											)}
											{applying ? 'Applying...' : 'Quick Apply'}
										</button>
									)}
									<button className="flex items-center px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
										<Heart className="h-5 w-5 mr-2" />
										Save Job
									</button>
								</div>
							)}
						</div>

						{/* Job Description */}
						<div className="bg-white rounded-lg shadow-sm p-6">
							<h2 className="text-xl font-semibold text-gray-900 mb-4">Job Description</h2>
							<div className="prose prose-gray max-w-none">
								<p className="text-gray-700 leading-relaxed whitespace-pre-line">
									{job.description}
								</p>
							</div>
						</div>

						{/* Requirements */}
						{job.requirements.length > 0 && (
							<div className="bg-white rounded-lg shadow-sm p-6">
								<h2 className="text-xl font-semibold text-gray-900 mb-4">Requirements</h2>
								<ul className="space-y-2">
									{job.requirements.map((requirement, index) => (
										<li key={index} className="flex items-start">
											<CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
											<span className="text-gray-700">{requirement}</span>
										</li>
									))}
								</ul>
							</div>
						)}

						{/* Benefits */}
						{job.benefits.length > 0 && (
							<div className="bg-white rounded-lg shadow-sm p-6">
								<h2 className="text-xl font-semibold text-gray-900 mb-4">Benefits & Perks</h2>
								<ul className="space-y-2">
									{job.benefits.map((benefit, index) => (
										<li key={index} className="flex items-start">
											<Star className="h-5 w-5 text-yellow-500 mr-3 mt-0.5 flex-shrink-0" />
											<span className="text-gray-700">{benefit}</span>
										</li>
									))}
								</ul>
							</div>
						)}
					</div>

					{/* Sidebar */}
					<div className="space-y-6">
						{/* Company Info */}
						<div className="bg-white rounded-lg shadow-sm p-6">
							<h3 className="text-lg font-semibold text-gray-900 mb-4">About {job.company}</h3>
							<div className="space-y-3">
								<div className="flex items-center justify-between">
									<span className="text-gray-600">Industry</span>
									<span className="font-medium">{job.industry}</span>
								</div>
								<div className="flex items-center justify-between">
									<span className="text-gray-600">Company Size</span>
									<span className="font-medium">{job.companySize}</span>
								</div>
								{job.website && (
									<div className="flex items-center justify-between">
										<span className="text-gray-600">Website</span>
										<a
											href={job.website}
											target="_blank"
											rel="noopener noreferrer"
											className="flex items-center text-blue-600 hover:text-blue-700"
										>
											<Globe className="h-4 w-4 mr-1" />
											Visit
										</a>
									</div>
								)}
							</div>
						</div>

						{/* Match Insights - Only for talents */}
						{user?.userType === 'talent' && matchData && (
							<div className="bg-white rounded-lg shadow-sm p-6">
								<h3 className="text-lg font-semibold text-gray-900 mb-4">Match Insights</h3>
								<div className="space-y-4">
									<div className="flex items-center justify-between">
										<span className="text-gray-600">Overall Match</span>
										<div className={`px-2 py-1 rounded ${getMatchScoreColor(matchData.overallScore)}`}>
											{matchData.overallScore}%
										</div>
									</div>
									{matchData.skillMatch && (
										<div className="flex items-center justify-between">
											<span className="text-gray-600">Skills Match</span>
											<div className={`px-2 py-1 rounded ${getMatchScoreColor(matchData.skillMatch)}`}>
												{matchData.skillMatch}%
											</div>
										</div>
									)}
									{matchData.experienceMatch && (
										<div className="flex items-center justify-between">
											<span className="text-gray-600">Experience Match</span>
											<div className={`px-2 py-1 rounded ${getMatchScoreColor(matchData.experienceMatch)}`}>
												{matchData.experienceMatch}%
											</div>
										</div>
									)}
								</div>
							</div>
						)}

						{/* Application Deadline */}
						{job.applicationDeadline && (
							<div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
								<div className="flex items-center">
									<AlertCircle className="h-5 w-5 text-yellow-600 mr-2" />
									<div>
										<p className="text-sm font-medium text-yellow-800">Application Deadline</p>
										<p className="text-sm text-yellow-700">
											{new Date(job.applicationDeadline).toLocaleDateString()}
										</p>
									</div>
								</div>
							</div>
						)}

						{/* Similar Jobs */}
						<div className="bg-white rounded-lg shadow-sm p-6">
							<h3 className="text-lg font-semibold text-gray-900 mb-4">Similar Jobs</h3>
							<div className="space-y-3">
								{/* Mock similar jobs - replace with real data */}
								{[1, 2, 3].map((item) => (
									<Link
										key={item}
										to={`/dashboard/jobs/${item}`}
										className="block p-3 hover:bg-gray-50 rounded-lg transition-colors"
									>
										<h4 className="font-medium text-gray-900 mb-1">Similar Job Title</h4>
										<p className="text-sm text-gray-600">Company Name • Location</p>
									</Link>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default JobDetailPage 