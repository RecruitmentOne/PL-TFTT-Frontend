import { useState, useEffect } from 'react'
import { 
	CreditCard, 
	TrendingUp, 
	TrendingDown,
	Eye, 
	Target, 
	Users, 
	DollarSign,
	Calendar,
	BarChart3,
	Zap,
	RefreshCw,
	AlertTriangle,
	CheckCircle,
	Clock
} from 'lucide-react'

interface CreditData {
	currentPlan: {
		name: string
		totalCredits: number
		usedCredits: number
		remainingCredits: number
		costPerCredit: number
		renewalDate: string
		autoRenewal: boolean
	}
	usage: {
		today: number
		thisWeek: number
		thisMonth: number
		trend: 'up' | 'down' | 'stable'
		efficiency: number
	}
	analytics: {
		profileViews: number
		successfulMatches: number
		averageCostPerHire: number
		roi: number
	}
	recentActivity: CreditActivity[]
}

interface CreditActivity {
	id: string
	type: 'view' | 'match' | 'bulk_operation' | 'refund'
	description: string
	creditsUsed: number
	timestamp: string
	candidate?: string
}

function CreditSystemDashboard() {
	const [creditData, setCreditData] = useState<CreditData | null>(null)
	const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d')
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		// Simulate API call for credit data
		const fetchCreditData = async () => {
			setLoading(true)
			// Simulate API delay
			await new Promise(resolve => setTimeout(resolve, 1000))
			
			// Mock data - in real app, this would come from API
			setCreditData({
				currentPlan: {
					name: 'Professional',
					totalCredits: 500,
					usedCredits: 127,
					remainingCredits: 373,
					costPerCredit: 0.798,
					renewalDate: '2024-03-15',
					autoRenewal: true
				},
				usage: {
					today: 8,
					thisWeek: 45,
					thisMonth: 127,
					trend: 'up',
					efficiency: 85
				},
				analytics: {
					profileViews: 127,
					successfulMatches: 23,
					averageCostPerHire: 95.50,
					roi: 340
				},
				recentActivity: [
					{ id: '1', type: 'view', description: 'Viewed profile: Sarah Johnson - React Developer', creditsUsed: 1, timestamp: '2 hours ago', candidate: 'Sarah Johnson' },
					{ id: '2', type: 'bulk_operation', description: 'Bulk operation: 5 AI-matched candidates', creditsUsed: 5, timestamp: '4 hours ago' },
					{ id: '3', type: 'match', description: 'High-quality match found: John Smith (excellent compatibility)', creditsUsed: 1, timestamp: '6 hours ago', candidate: 'John Smith' },
					{ id: '4', type: 'view', description: 'Viewed profile: Maria Garcia - Full Stack Developer', creditsUsed: 1, timestamp: '1 day ago', candidate: 'Maria Garcia' },
					{ id: '5', type: 'refund', description: 'Credit refund: Duplicate profile view', creditsUsed: -1, timestamp: '1 day ago' }
				]
			})
			setLoading(false)
		}

		fetchCreditData()
	}, [timeRange])

	const getActivityIcon = (type: string) => {
		switch (type) {
			case 'view': return <Eye className="w-4 h-4" />
			case 'match': return <Target className="w-4 h-4" />
			case 'bulk_operation': return <Users className="w-4 h-4" />
			case 'refund': return <RefreshCw className="w-4 h-4" />
			default: return <Eye className="w-4 h-4" />
		}
	}

	const getActivityColor = (type: string) => {
		switch (type) {
			case 'view': return 'text-blue-600 bg-blue-50'
			case 'match': return 'text-green-600 bg-green-50'
			case 'bulk_operation': return 'text-purple-600 bg-purple-50'
			case 'refund': return 'text-orange-600 bg-orange-50'
			default: return 'text-gray-600 bg-gray-50'
		}
	}

	const usagePercentage = creditData ? (creditData.currentPlan.usedCredits / creditData.currentPlan.totalCredits) * 100 : 0
	const isLowCredits = usagePercentage > 80

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

	if (!creditData) return null

	return (
		<div className="space-y-6">
			{/* Header */}
			<div className="flex justify-between items-center">
				<div>
					<h2 className="text-2xl font-bold text-gray-900">Credit System Dashboard</h2>
					<p className="text-gray-600">Monitor your credit usage and optimize recruitment costs</p>
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

			{/* Low Credits Warning */}
			{isLowCredits && (
				<div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
					<div className="flex items-center">
						<AlertTriangle className="w-5 h-5 text-orange-600 mr-3" />
						<div className="flex-1">
							<h3 className="text-sm font-medium text-orange-800">Credit Balance Low</h3>
							<p className="text-sm text-orange-700">
								You have {creditData.currentPlan.remainingCredits} credits remaining. Consider upgrading your plan or purchasing additional credits.
							</p>
						</div>
						<button className="bg-orange-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-orange-700">
							Add Credits
						</button>
					</div>
				</div>
			)}

			{/* Current Plan Overview */}
			<div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
				<div className="flex justify-between items-start mb-4">
					<div>
						<h3 className="text-lg font-semibold">{creditData.currentPlan.name} Plan</h3>
						<p className="text-blue-100">Active subscription with auto-renewal</p>
					</div>
					<div className="text-right">
						<p className="text-sm text-blue-100">Renewal Date</p>
						<p className="font-semibold">{creditData.currentPlan.renewalDate}</p>
					</div>
				</div>
				
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					<div>
						<p className="text-blue-100 text-sm">Total Credits</p>
						<p className="text-3xl font-bold">{creditData.currentPlan.totalCredits}</p>
					</div>
					<div>
						<p className="text-blue-100 text-sm">Used This Month</p>
						<p className="text-3xl font-bold">{creditData.currentPlan.usedCredits}</p>
					</div>
					<div>
						<p className="text-blue-100 text-sm">Remaining</p>
						<p className="text-3xl font-bold">{creditData.currentPlan.remainingCredits}</p>
					</div>
				</div>

				<div className="mt-4">
					<div className="flex justify-between text-sm text-blue-100 mb-2">
						<span>Credit Usage</span>
						<span>{Math.round(usagePercentage)}%</span>
					</div>
					<div className="w-full bg-blue-500 rounded-full h-2">
						<div 
							className="bg-white rounded-full h-2 transition-all duration-300"
							style={{ width: `${usagePercentage}%` }}
						></div>
					</div>
				</div>
			</div>

			{/* Key Metrics */}
			<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
				{/* Usage Efficiency */}
				<div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
					<div className="flex items-center justify-between mb-2">
						<h4 className="text-sm font-medium text-gray-600">Usage Efficiency</h4>
						<Zap className="w-5 h-5 text-yellow-500" />
					</div>
					<p className="text-2xl font-bold text-gray-900">{creditData.usage.efficiency}%</p>
					<p className="text-sm text-green-600">+5% from last month</p>
				</div>

				{/* Average Cost per Hire */}
				<div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
					<div className="flex items-center justify-between mb-2">
						<h4 className="text-sm font-medium text-gray-600">Cost per Hire</h4>
						<DollarSign className="w-5 h-5 text-green-500" />
					</div>
					<p className="text-2xl font-bold text-gray-900">${creditData.analytics.averageCostPerHire}</p>
					<p className="text-sm text-green-600">-12% vs industry avg</p>
				</div>

				{/* Successful Matches */}
				<div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
					<div className="flex items-center justify-between mb-2">
						<h4 className="text-sm font-medium text-gray-600">Successful Matches</h4>
						<Target className="w-5 h-5 text-blue-500" />
					</div>
					<p className="text-2xl font-bold text-gray-900">{creditData.analytics.successfulMatches}</p>
					<p className="text-sm text-blue-600">92% match quality</p>
				</div>

				{/* ROI */}
				<div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
					<div className="flex items-center justify-between mb-2">
						<h4 className="text-sm font-medium text-gray-600">ROI</h4>
						<TrendingUp className="w-5 h-5 text-purple-500" />
					</div>
					<p className="text-2xl font-bold text-gray-900">{creditData.analytics.roi}%</p>
					<p className="text-sm text-purple-600">Excellent return</p>
				</div>
			</div>

			{/* Detailed Analytics */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				{/* Usage Timeline */}
				<div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
					<h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
						<BarChart3 className="w-5 h-5 text-blue-500 mr-2" />
						Credit Usage Pattern
					</h3>
					<div className="space-y-4">
						<div className="flex justify-between items-center">
							<span className="text-gray-600">Today</span>
							<div className="flex items-center">
								<span className="text-sm font-medium text-gray-900 mr-3">{creditData.usage.today} credits</span>
								<div className="w-24 bg-gray-200 rounded-full h-2">
									<div className="bg-blue-600 h-2 rounded-full" style={{ width: '40%' }}></div>
								</div>
							</div>
						</div>
						<div className="flex justify-between items-center">
							<span className="text-gray-600">This Week</span>
							<div className="flex items-center">
								<span className="text-sm font-medium text-gray-900 mr-3">{creditData.usage.thisWeek} credits</span>
								<div className="w-24 bg-gray-200 rounded-full h-2">
									<div className="bg-green-600 h-2 rounded-full" style={{ width: '70%' }}></div>
								</div>
							</div>
						</div>
						<div className="flex justify-between items-center">
							<span className="text-gray-600">This Month</span>
							<div className="flex items-center">
								<span className="text-sm font-medium text-gray-900 mr-3">{creditData.usage.thisMonth} credits</span>
								<div className="w-24 bg-gray-200 rounded-full h-2">
									<div className="bg-purple-600 h-2 rounded-full" style={{ width: `${usagePercentage}%` }}></div>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Recent Activity */}
				<div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
					<h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
						<Clock className="w-5 h-5 text-green-500 mr-2" />
						Recent Credit Activity
					</h3>
					<div className="space-y-4">
						{creditData.recentActivity.map((activity) => (
							<div key={activity.id} className="flex items-start space-x-3">
								<div className={`w-8 h-8 rounded-full flex items-center justify-center ${getActivityColor(activity.type)}`}>
									{getActivityIcon(activity.type)}
								</div>
								<div className="flex-1 min-w-0">
									<p className="text-sm font-medium text-gray-900 truncate">{activity.description}</p>
									<div className="flex items-center justify-between mt-1">
										<p className="text-xs text-gray-500">{activity.timestamp}</p>
										<span className={`text-xs font-medium px-2 py-1 rounded ${
											activity.creditsUsed > 0 
												? 'text-red-600 bg-red-50' 
												: 'text-green-600 bg-green-50'
										}`}>
											{activity.creditsUsed > 0 ? '-' : '+'}{Math.abs(activity.creditsUsed)} credit{Math.abs(activity.creditsUsed) !== 1 ? 's' : ''}
										</span>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* Plan Management */}
			<div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
				<h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
					<CreditCard className="w-5 h-5 text-indigo-500 mr-2" />
					Plan Management
				</h3>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					<div className="text-center p-4 border border-gray-200 rounded-lg">
						<h4 className="font-medium text-gray-900 mb-2">Starter</h4>
						<p className="text-2xl font-bold text-gray-900 mb-1">$99</p>
						<p className="text-sm text-gray-600 mb-3">100 credits/month</p>
						<button className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-md text-sm font-medium">
							Current: Professional
						</button>
					</div>
					<div className="text-center p-4 border-2 border-blue-500 rounded-lg bg-blue-50">
						<h4 className="font-medium text-gray-900 mb-2">Professional</h4>
						<p className="text-2xl font-bold text-gray-900 mb-1">$399</p>
						<p className="text-sm text-gray-600 mb-3">500 credits/month</p>
						<button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md text-sm font-medium">
							Current Plan
						</button>
					</div>
					<div className="text-center p-4 border border-gray-200 rounded-lg">
						<h4 className="font-medium text-gray-900 mb-2">Enterprise</h4>
						<p className="text-2xl font-bold text-gray-900 mb-1">$999</p>
						<p className="text-sm text-gray-600 mb-3">Unlimited credits</p>
						<button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-blue-700">
							Upgrade
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default CreditSystemDashboard 