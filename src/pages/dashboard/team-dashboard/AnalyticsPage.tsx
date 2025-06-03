import React, { useState } from 'react'
import { useAppSelector } from '../../../store/hooks'
import DashboardLayoutWithSidebar from '../../../components/layout/DashboardLayoutWithSidebar'
import {
	BarChart3,
	TrendingUp,
	TrendingDown,
	Users,
	Eye,
	Calendar,
	Clock,
	Target,
	Activity,
	Award,
	Briefcase,
	MapPin,
	DollarSign,
	Filter,
	Download,
	RefreshCw,
	ArrowRight,
	PieChart,
	LineChart,
	Info
} from 'lucide-react'

// Sample analytics data
const analyticsData = {
	overview: {
		totalViews: 1250,
		totalApplications: 89,
		avgTimeToHire: 18,
		costPerHire: 3250,
		activeJobs: 8,
		filledPositions: 12
	},
	trends: {
		weeklyViews: [120, 145, 110, 178, 156, 189, 167],
		weeklyApplications: [8, 12, 6, 15, 11, 18, 14],
		monthlyHires: [2, 4, 3, 2, 1, 3, 5, 4, 2, 6, 3, 4]
	},
	jobPerformance: [
		{
			id: 1,
			title: 'Senior React Developer',
			views: 245,
			applications: 23,
			conversionRate: 9.4,
			status: 'active',
			postedDate: '2024-01-10',
			location: 'San Francisco, CA'
		},
		{
			id: 2,
			title: 'Full Stack Engineer',
			views: 189,
			applications: 16,
			conversionRate: 8.5,
			status: 'active',
			postedDate: '2024-01-08',
			location: 'Remote'
		},
		{
			id: 3,
			title: 'Product Designer',
			views: 156,
			applications: 19,
			conversionRate: 12.2,
			status: 'filled',
			postedDate: '2024-01-05',
			location: 'New York, NY'
		},
		{
			id: 4,
			title: 'Backend Developer',
			views: 134,
			applications: 12,
			conversionRate: 9.0,
			status: 'active',
			postedDate: '2024-01-12',
			location: 'Austin, TX'
		}
	],
	demographics: {
		locations: [
			{ name: 'San Francisco, CA', value: 35, color: 'bg-blue-500' },
			{ name: 'Remote', value: 28, color: 'bg-green-500' },
			{ name: 'New York, NY', value: 22, color: 'bg-purple-500' },
			{ name: 'Austin, TX', value: 15, color: 'bg-orange-500' }
		],
		experience: [
			{ level: '1-3 years', count: 25, percentage: 28 },
			{ level: '3-5 years', count: 34, percentage: 38 },
			{ level: '5+ years', count: 30, percentage: 34 }
		],
		skills: [
			{ skill: 'React', count: 45, trending: 'up' },
			{ skill: 'Python', count: 38, trending: 'up' },
			{ skill: 'Node.js', count: 32, trending: 'stable' },
			{ skill: 'TypeScript', count: 28, trending: 'up' },
			{ skill: 'AWS', count: 22, trending: 'down' }
		]
	}
}

function AnalyticsPage() {
	const { user } = useAppSelector((state) => state.auth)
	const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d')
	const [selectedMetric, setSelectedMetric] = useState<'views' | 'applications' | 'hires'>('views')

	const formatNumber = (num: number) => {
		if (num >= 1000) {
			return (num / 1000).toFixed(1) + 'k'
		}
		return num.toString()
	}

	const getPercentageChange = (current: number, previous: number) => {
		const change = ((current - previous) / previous) * 100
		return change.toFixed(1)
	}

	return (
		<DashboardLayoutWithSidebar 
			title="Hiring Analytics"
			subtitle="Track your recruitment performance and get insights"
		>
			<div className="p-8 space-y-8">
				{/* Header Controls */}
				<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
					<div className="flex items-center space-x-4">
						<div className="flex bg-gray-100 rounded-lg p-1">
							{['7d', '30d', '90d', '1y'].map((range) => (
								<button
									key={range}
									onClick={() => setTimeRange(range as any)}
									className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
										timeRange === range
											? 'bg-white text-blue-600 shadow-sm'
											: 'text-gray-600 hover:text-gray-900'
									}`}
								>
									{range === '7d' ? 'Last 7 days' :
									 range === '30d' ? 'Last 30 days' :
									 range === '90d' ? 'Last 3 months' : 'Last year'}
								</button>
							))}
						</div>
					</div>
					
					<div className="flex items-center space-x-3">
						<button className="flex items-center space-x-2 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
							<RefreshCw className="w-4 h-4" />
							<span>Refresh</span>
						</button>
						<button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
							<Download className="w-4 h-4" />
							<span>Export Report</span>
						</button>
					</div>
				</div>

				{/* Key Metrics Overview */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
					<div className="bg-white rounded-xl border border-gray-200 p-6">
						<div className="flex items-center justify-between mb-4">
							<div className="p-2 bg-blue-100 rounded-lg">
								<Eye className="w-5 h-5 text-blue-600" />
							</div>
							<div className="flex items-center text-green-600 text-sm">
								<TrendingUp className="w-4 h-4 mr-1" />
								<span>+12%</span>
							</div>
						</div>
						<p className="text-2xl font-bold text-gray-900">{formatNumber(analyticsData.overview.totalViews)}</p>
						<p className="text-gray-600 text-sm">Total Views</p>
					</div>

					<div className="bg-white rounded-xl border border-gray-200 p-6">
						<div className="flex items-center justify-between mb-4">
							<div className="p-2 bg-green-100 rounded-lg">
								<Users className="w-5 h-5 text-green-600" />
							</div>
							<div className="flex items-center text-green-600 text-sm">
								<TrendingUp className="w-4 h-4 mr-1" />
								<span>+8%</span>
							</div>
						</div>
						<p className="text-2xl font-bold text-gray-900">{analyticsData.overview.totalApplications}</p>
						<p className="text-gray-600 text-sm">Applications</p>
					</div>

					<div className="bg-white rounded-xl border border-gray-200 p-6">
						<div className="flex items-center justify-between mb-4">
							<div className="p-2 bg-purple-100 rounded-lg">
								<Clock className="w-5 h-5 text-purple-600" />
							</div>
							<div className="flex items-center text-red-600 text-sm">
								<TrendingDown className="w-4 h-4 mr-1" />
								<span>-3%</span>
							</div>
						</div>
						<p className="text-2xl font-bold text-gray-900">{analyticsData.overview.avgTimeToHire}</p>
						<p className="text-gray-600 text-sm">Avg Days to Hire</p>
					</div>

					<div className="bg-white rounded-xl border border-gray-200 p-6">
						<div className="flex items-center justify-between mb-4">
							<div className="p-2 bg-orange-100 rounded-lg">
								<DollarSign className="w-5 h-5 text-orange-600" />
							</div>
							<div className="flex items-center text-green-600 text-sm">
								<TrendingUp className="w-4 h-4 mr-1" />
								<span>+5%</span>
							</div>
						</div>
						<p className="text-2xl font-bold text-gray-900">${formatNumber(analyticsData.overview.costPerHire)}</p>
						<p className="text-gray-600 text-sm">Cost per Hire</p>
					</div>

					<div className="bg-white rounded-xl border border-gray-200 p-6">
						<div className="flex items-center justify-between mb-4">
							<div className="p-2 bg-yellow-100 rounded-lg">
								<Briefcase className="w-5 h-5 text-yellow-600" />
							</div>
							<div className="flex items-center text-green-600 text-sm">
								<Activity className="w-4 h-4 mr-1" />
								<span>Active</span>
							</div>
						</div>
						<p className="text-2xl font-bold text-gray-900">{analyticsData.overview.activeJobs}</p>
						<p className="text-gray-600 text-sm">Active Jobs</p>
					</div>

					<div className="bg-white rounded-xl border border-gray-200 p-6">
						<div className="flex items-center justify-between mb-4">
							<div className="p-2 bg-pink-100 rounded-lg">
								<Award className="w-5 h-5 text-pink-600" />
							</div>
							<div className="flex items-center text-green-600 text-sm">
								<TrendingUp className="w-4 h-4 mr-1" />
								<span>+2</span>
							</div>
						</div>
						<p className="text-2xl font-bold text-gray-900">{analyticsData.overview.filledPositions}</p>
						<p className="text-gray-600 text-sm">Positions Filled</p>
					</div>
				</div>

				{/* Charts Section */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
					{/* Trend Chart */}
					<div className="bg-white rounded-xl border border-gray-200 p-6">
						<div className="flex items-center justify-between mb-6">
							<h3 className="text-lg font-semibold text-gray-900">Performance Trends</h3>
							<div className="flex bg-gray-100 rounded-lg p-1">
								{['views', 'applications', 'hires'].map((metric) => (
									<button
										key={metric}
										onClick={() => setSelectedMetric(metric as any)}
										className={`px-3 py-1 text-sm font-medium rounded-md transition-all capitalize ${
											selectedMetric === metric
												? 'bg-white text-blue-600 shadow-sm'
												: 'text-gray-600 hover:text-gray-900'
										}`}
									>
										{metric}
									</button>
								))}
							</div>
						</div>
						
						{/* Simple chart representation */}
						<div className="h-64 flex items-end justify-between space-x-2">
							{analyticsData.trends.weeklyViews.map((value, index) => (
								<div key={index} className="flex-1 flex flex-col items-center">
									<div 
										className="w-full bg-blue-500 rounded-t transition-all duration-300 hover:bg-blue-600"
										style={{ 
											height: `${(value / Math.max(...analyticsData.trends.weeklyViews)) * 200}px`,
											minHeight: '8px'
										}}
									/>
									<span className="text-xs text-gray-500 mt-2">
										{['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}
									</span>
								</div>
							))}
						</div>
					</div>

					{/* Application Sources */}
					<div className="bg-white rounded-xl border border-gray-200 p-6">
						<h3 className="text-lg font-semibold text-gray-900 mb-6">Candidate Locations</h3>
						<div className="space-y-4">
							{analyticsData.demographics.locations.map((location, index) => (
								<div key={index} className="flex items-center justify-between">
									<div className="flex items-center space-x-3">
										<div className={`w-3 h-3 rounded-full ${location.color}`} />
										<span className="text-gray-700">{location.name}</span>
									</div>
									<div className="flex items-center space-x-3">
										<div className="w-24 bg-gray-200 rounded-full h-2">
											<div 
												className={`h-2 rounded-full ${location.color}`}
												style={{ width: `${location.value}%` }}
											/>
										</div>
										<span className="text-sm font-medium text-gray-900 w-8">{location.value}%</span>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>

				{/* Job Performance Table */}
				<div className="bg-white rounded-xl border border-gray-200 p-6">
					<div className="flex items-center justify-between mb-6">
						<h3 className="text-lg font-semibold text-gray-900">Job Performance</h3>
						<div className="flex items-center space-x-2">
							<button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg">
								<Filter className="w-4 h-4" />
							</button>
							<button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg">
								<Download className="w-4 h-4" />
							</button>
						</div>
					</div>
					
					<div className="overflow-x-auto">
						<table className="w-full">
							<thead className="bg-gray-50">
								<tr>
									<th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job Title</th>
									<th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
									<th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Views</th>
									<th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applications</th>
									<th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Conversion</th>
									<th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
									<th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Posted</th>
								</tr>
							</thead>
							<tbody className="bg-white divide-y divide-gray-200">
								{analyticsData.jobPerformance.map((job) => (
									<tr key={job.id} className="hover:bg-gray-50 transition-colors">
										<td className="px-4 py-4">
											<div className="font-medium text-gray-900">{job.title}</div>
										</td>
										<td className="px-4 py-4">
											<div className="flex items-center text-sm text-gray-600">
												<MapPin className="w-4 h-4 mr-1" />
												{job.location}
											</div>
										</td>
										<td className="px-4 py-4 text-gray-900 font-medium">{job.views}</td>
										<td className="px-4 py-4 text-gray-900 font-medium">{job.applications}</td>
										<td className="px-4 py-4">
											<div className="flex items-center">
												<span className="text-gray-900 font-medium mr-2">{job.conversionRate}%</span>
												{job.conversionRate > 10 ? (
													<TrendingUp className="w-4 h-4 text-green-500" />
												) : job.conversionRate > 7 ? (
													<Activity className="w-4 h-4 text-yellow-500" />
												) : (
													<TrendingDown className="w-4 h-4 text-red-500" />
												)}
											</div>
										</td>
										<td className="px-4 py-4">
											<span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
												job.status === 'active' 
													? 'bg-green-100 text-green-800' 
													: 'bg-gray-100 text-gray-800'
											}`}>
												{job.status}
											</span>
										</td>
										<td className="px-4 py-4 text-sm text-gray-600">
											{new Date(job.postedDate).toLocaleDateString()}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>

				{/* Skills & Experience Analytics */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
					{/* Top Skills */}
					<div className="bg-white rounded-xl border border-gray-200 p-6">
						<h3 className="text-lg font-semibold text-gray-900 mb-6">Trending Skills</h3>
						<div className="space-y-4">
							{analyticsData.demographics.skills.map((skill, index) => (
								<div key={index} className="flex items-center justify-between">
									<div className="flex items-center space-x-3">
										<span className="text-gray-700 font-medium">{skill.skill}</span>
										{skill.trending === 'up' ? (
											<TrendingUp className="w-4 h-4 text-green-500" />
										) : skill.trending === 'down' ? (
											<TrendingDown className="w-4 h-4 text-red-500" />
										) : (
											<Activity className="w-4 h-4 text-gray-400" />
										)}
									</div>
									<div className="flex items-center space-x-3">
										<div className="w-20 bg-gray-200 rounded-full h-2">
											<div 
												className="h-2 bg-blue-500 rounded-full"
												style={{ width: `${(skill.count / 50) * 100}%` }}
											/>
										</div>
										<span className="text-sm font-medium text-gray-900 w-8">{skill.count}</span>
									</div>
								</div>
							))}
						</div>
					</div>

					{/* Experience Distribution */}
					<div className="bg-white rounded-xl border border-gray-200 p-6">
						<h3 className="text-lg font-semibold text-gray-900 mb-6">Experience Distribution</h3>
						<div className="space-y-6">
							{analyticsData.demographics.experience.map((exp, index) => (
								<div key={index} className="space-y-2">
									<div className="flex items-center justify-between">
										<span className="text-gray-700 font-medium">{exp.level}</span>
										<span className="text-sm font-medium text-gray-900">{exp.count} candidates ({exp.percentage}%)</span>
									</div>
									<div className="w-full bg-gray-200 rounded-full h-3">
										<div 
											className="h-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-300"
											style={{ width: `${exp.percentage}%` }}
										/>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>

				{/* Insights & Recommendations */}
				<div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 p-6">
					<div className="flex items-start space-x-4">
						<div className="p-2 bg-blue-100 rounded-lg">
							<Info className="w-5 h-5 text-blue-600" />
						</div>
						<div className="flex-1">
							<h3 className="text-lg font-semibold text-gray-900 mb-2">AI-Powered Insights</h3>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div className="bg-white rounded-lg p-4 border border-blue-100">
									<h4 className="font-medium text-gray-900 mb-2">🎯 Top Recommendation</h4>
									<p className="text-sm text-gray-600">
										Your "Senior React Developer" job has a 94% match rate with available candidates. 
										Consider promoting it for better visibility.
									</p>
								</div>
								<div className="bg-white rounded-lg p-4 border border-blue-100">
									<h4 className="font-medium text-gray-900 mb-2">📈 Performance Tip</h4>
									<p className="text-sm text-gray-600">
										Jobs with salary ranges get 23% more applications. Consider adding salary info to improve conversion.
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</DashboardLayoutWithSidebar>
	)
}

export default AnalyticsPage 