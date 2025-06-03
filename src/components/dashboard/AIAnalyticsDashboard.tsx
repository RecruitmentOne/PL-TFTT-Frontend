import { useState, useEffect } from 'react'
import { 
	TrendingUp, 
	Eye, 
	Target, 
	Star, 
	
	Activity,
	Zap,
	Award,
	
	ArrowUp,
	ArrowDown
} from 'lucide-react'

interface AnalyticsData {
	profileViews: { current: number; change: number; trend: 'up' | 'down' }
	matchQuality: { score: number; change: number; trend: 'up' | 'down' }
	marketDemand: { percentage: number; change: number; trend: 'up' | 'down' }
	skillsInDemand: string[]
	recentActivity: ActivityItem[]
	careerProgress: ProgressItem[]
}

interface ActivityItem {
	id: string
	type: 'view' | 'match' | 'application' | 'skill_update'
	description: string
	timestamp: string
	value?: string
}

interface ProgressItem {
	metric: string
	current: number
	target: number
	unit: string
}

function AIAnalyticsDashboard() {
	const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null)
	const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d')
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		// Simulate API call for analytics data
		const fetchAnalytics = async () => {
			setLoading(true)
			// Simulate API delay
			await new Promise(resolve => setTimeout(resolve, 1000))
			
			// Mock data - in real app, this would come from API
			setAnalyticsData({
				profileViews: { current: 342, change: 23, trend: 'up' },
				matchQuality: { score: 92, change: 5, trend: 'up' },
				marketDemand: { percentage: 78, change: 12, trend: 'up' },
				skillsInDemand: ['React', 'TypeScript', 'Node.js', 'Python', 'AWS'],
				recentActivity: [
					{ id: '1', type: 'match', description: 'High-quality match found (excellent compatibility)', timestamp: '2 hours ago', value: 'Excellent' },
					{ id: '2', type: 'view', description: 'Profile viewed by TechCorp', timestamp: '4 hours ago' },
					{ id: '3', type: 'skill_update', description: 'TypeScript skill boost detected', timestamp: '1 day ago', value: '+15%' },
					{ id: '4', type: 'application', description: 'Application response rate improved', timestamp: '2 days ago', value: '+8%' }
				],
				careerProgress: [
					{ metric: 'Profile Completeness', current: 85, target: 100, unit: '%' },
					{ metric: 'Skill Matches', current: 23, target: 30, unit: 'skills' },
					{ metric: 'Market Visibility', current: 78, target: 90, unit: '%' },
					{ metric: 'Response Rate', current: 42, target: 60, unit: '%' }
				]
			})
			setLoading(false)
		}

		fetchAnalytics()
	}, [timeRange])

	const getActivityIcon = (type: string) => {
		switch (type) {
			case 'view': return <Eye className="w-4 h-4" />
			case 'match': return <Target className="w-4 h-4" />
			case 'application': return <Activity className="w-4 h-4" />
			case 'skill_update': return <Zap className="w-4 h-4" />
			default: return <Activity className="w-4 h-4" />
		}
	}

	const getActivityColor = (type: string) => {
		switch (type) {
			case 'view': return 'text-blue-600 bg-blue-50'
			case 'match': return 'text-green-600 bg-green-50'
			case 'application': return 'text-purple-600 bg-purple-50'
			case 'skill_update': return 'text-orange-600 bg-orange-50'
			default: return 'text-gray-600 bg-gray-50'
		}
	}

	if (loading) {
		return (
			<div className="bg-white rounded-lg shadow-sm p-6">
				<div className="animate-pulse">
					<div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
						{[1, 2, 3].map(i => (
							<div key={i} className="h-24 bg-gray-200 rounded"></div>
						))}
					</div>
					<div className="h-48 bg-gray-200 rounded"></div>
				</div>
			</div>
		)
	}

	if (!analyticsData) return null

	return (
		<div className="space-y-6">
			{/* Header */}
			<div className="flex justify-between items-center">
				<div>
					<h2 className="text-2xl font-bold text-gray-900">AI Analytics Dashboard</h2>
					<p className="text-gray-600">Real-time insights powered by advanced analytics</p>
				</div>
				<div className="flex space-x-2">
					{['7d', '30d', '90d'].map((range) => (
						<button
							key={range}
							onClick={() => setTimeRange(range as any)}
							className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
								timeRange === range
									? 'bg-blue-600 text-white'
									: 'bg-gray-100 text-gray-700 hover:bg-gray-200'
							}`}
						>
							{range === '7d' ? '7 Days' : range === '30d' ? '30 Days' : '90 Days'}
						</button>
					))}
				</div>
			</div>

			{/* Key Metrics */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				{/* Profile Views */}
				<div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm font-medium text-gray-600">Profile Views</p>
							<p className="text-3xl font-bold text-gray-900">{analyticsData.profileViews.current}</p>
						</div>
						<div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
							<Eye className="w-6 h-6 text-blue-600" />
						</div>
					</div>
					<div className="mt-4 flex items-center">
						{analyticsData.profileViews.trend === 'up' ? (
							<ArrowUp className="w-4 h-4 text-green-500 mr-1" />
						) : (
							<ArrowDown className="w-4 h-4 text-red-500 mr-1" />
						)}
						<span className={`text-sm font-medium ${
							analyticsData.profileViews.trend === 'up' ? 'text-green-600' : 'text-red-600'
						}`}>
							{analyticsData.profileViews.change}% from last period
						</span>
					</div>
				</div>

				{/* AI Match Quality */}
				<div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm font-medium text-gray-600">AI Match Quality</p>
							<p className="text-3xl font-bold text-gray-900">{analyticsData.matchQuality.score}%</p>
						</div>
						<div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
							<Target className="w-6 h-6 text-green-600" />
						</div>
					</div>
					<div className="mt-4 flex items-center">
						{analyticsData.matchQuality.trend === 'up' ? (
							<ArrowUp className="w-4 h-4 text-green-500 mr-1" />
						) : (
							<ArrowDown className="w-4 h-4 text-red-500 mr-1" />
						)}
						<span className={`text-sm font-medium ${
							analyticsData.matchQuality.trend === 'up' ? 'text-green-600' : 'text-red-600'
						}`}>
							+{analyticsData.matchQuality.change}% improvement
						</span>
					</div>
				</div>

				{/* Market Demand */}
				<div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm font-medium text-gray-600">Market Demand</p>
							<p className="text-3xl font-bold text-gray-900">{analyticsData.marketDemand.percentage}%</p>
						</div>
						<div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
							<TrendingUp className="w-6 h-6 text-purple-600" />
						</div>
					</div>
					<div className="mt-4 flex items-center">
						{analyticsData.marketDemand.trend === 'up' ? (
							<ArrowUp className="w-4 h-4 text-green-500 mr-1" />
						) : (
							<ArrowDown className="w-4 h-4 text-red-500 mr-1" />
						)}
						<span className={`text-sm font-medium ${
							analyticsData.marketDemand.trend === 'up' ? 'text-green-600' : 'text-red-600'
						}`}>
							+{analyticsData.marketDemand.change}% this month
						</span>
					</div>
				</div>
			</div>

			{/* Detailed Analytics */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				{/* Skills in Demand */}
				<div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
					<h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
						<Star className="w-5 h-5 text-yellow-500 mr-2" />
						Top Skills in Demand
					</h3>
					<div className="space-y-3">
						{analyticsData.skillsInDemand.map((skill, index) => (
							<div key={skill} className="flex items-center justify-between">
								<span className="text-gray-700">{skill}</span>
								<div className="flex items-center">
									<div className="w-24 bg-gray-200 rounded-full h-2 mr-3">
										<div
											className="bg-blue-600 h-2 rounded-full transition-all duration-300"
											style={{ width: `${100 - index * 15}%` }}
										></div>
									</div>
									<span className="text-sm text-gray-500 w-8">#{index + 1}</span>
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Recent Activity */}
				<div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
					<h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
						<Activity className="w-5 h-5 text-blue-500 mr-2" />
						Recent AI Activity
					</h3>
					<div className="space-y-4">
						{analyticsData.recentActivity.map((activity) => (
							<div key={activity.id} className="flex items-start space-x-3">
								<div className={`w-8 h-8 rounded-full flex items-center justify-center ${getActivityColor(activity.type)}`}>
									{getActivityIcon(activity.type)}
								</div>
								<div className="flex-1">
									<p className="text-sm font-medium text-gray-900">{activity.description}</p>
									<div className="flex items-center justify-between mt-1">
										<p className="text-xs text-gray-500">{activity.timestamp}</p>
										{activity.value && (
											<span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded">
												{activity.value}
											</span>
										)}
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* Career Progress */}
			<div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
				<h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
					<Award className="w-5 h-5 text-purple-500 mr-2" />
					Career Progression Tracking
				</h3>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
					{analyticsData.careerProgress.map((item, index) => (
						<div key={index} className="text-center">
							<div className="relative w-20 h-20 mx-auto mb-3">
								<svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
									<path
										d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
										fill="none"
										stroke="#e5e7eb"
										strokeWidth="2"
									/>
									<path
										d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
										fill="none"
										stroke="#3b82f6"
										strokeWidth="2"
										strokeDasharray={`${(item.current / item.target) * 100}, 100`}
									/>
								</svg>
								<div className="absolute inset-0 flex items-center justify-center">
									<span className="text-sm font-semibold text-gray-900">
										{Math.round((item.current / item.target) * 100)}%
									</span>
								</div>
							</div>
							<h4 className="text-sm font-medium text-gray-900 mb-1">{item.metric}</h4>
							<p className="text-xs text-gray-500">
								{item.current} / {item.target} {item.unit}
							</p>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export default AIAnalyticsDashboard 