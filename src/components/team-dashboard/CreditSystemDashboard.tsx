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
	Clock,
	MapPin,
	Globe
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
	type: 'view' | 'match' | 'bulk_operation' | 'refund' | 'eu_verification'
	description: string
	creditsUsed: number
	timestamp: string
	candidate?: string
	sourceCountry?: string
	targetCity?: string
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
			
			// Mock data - EU/German/Swiss focused
			setCreditData({
				currentPlan: {
					name: 'EU Professional',
					totalCredits: 300,
					usedCredits: 78,
					remainingCredits: 222,
					costPerCredit: 8.20,
					renewalDate: '2024-04-15',
					autoRenewal: true
				},
				usage: {
					today: 5,
					thisWeek: 22,
					thisMonth: 78,
					trend: 'up',
					efficiency: 91
				},
				analytics: {
					profileViews: 78,
					successfulMatches: 18,
					averageCostPerHire: 640.00,
					roi: 420
				},
				recentActivity: [
					{ 
						id: '1', 
						type: 'view', 
						description: 'Accessed CV: Tomáš Novák - React Developer from Prague targeting Berlin', 
						creditsUsed: 8, 
						timestamp: '2 hours ago', 
						candidate: 'Tomáš Novák',
						sourceCountry: '🇨🇿 Czech Republic',
						targetCity: 'Berlin, Germany'
					},
					{ 
						id: '2', 
						type: 'bulk_operation', 
						description: 'Bulk CV access: 3 EU DevOps engineers for Munich positions', 
						creditsUsed: 24, 
						timestamp: '4 hours ago'
					},
					{ 
						id: '3', 
						type: 'match', 
						description: 'High-quality match: Anna Kowalska (96% compatibility) - Poland to Zurich', 
						creditsUsed: 8, 
						timestamp: '6 hours ago', 
						candidate: 'Anna Kowalska',
						sourceCountry: '🇵🇱 Poland',
						targetCity: 'Zurich, Switzerland'
					},
					{ 
						id: '4', 
						type: 'view', 
						description: 'Accessed CV: Mihai Popescu - Full Stack from Bucharest targeting Frankfurt', 
						creditsUsed: 8, 
						timestamp: '1 day ago', 
						candidate: 'Mihai Popescu',
						sourceCountry: '🇷🇴 Romania',
						targetCity: 'Frankfurt, Germany'
					},
					{ 
						id: '5', 
						type: 'eu_verification', 
						description: 'EU work eligibility verified for Hungarian candidate targeting Basel', 
						creditsUsed: 0, 
						timestamp: '1 day ago'
					},
					{ 
						id: '6', 
						type: 'refund', 
						description: 'Credit refund: Duplicate CV access for Slovak developer', 
						creditsUsed: -8, 
						timestamp: '2 days ago'
					}
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
			case 'eu_verification': return <Globe className="w-4 h-4" />
			default: return <Eye className="w-4 h-4" />
		}
	}

	const getActivityColor = (type: string) => {
		switch (type) {
			case 'view': return 'text-blue-600 bg-blue-50'
			case 'match': return 'text-green-600 bg-green-50'
			case 'bulk_operation': return 'text-purple-600 bg-purple-50'
			case 'refund': return 'text-orange-600 bg-orange-50'
			case 'eu_verification': return 'text-indigo-600 bg-indigo-50'
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
					<h2 className="text-2xl font-bold text-gray-900">EU Credit System Dashboard</h2>
					<p className="text-gray-600">Monitor your CV access credits and optimize EU recruitment costs</p>
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
								You have {creditData.currentPlan.remainingCredits} credits remaining (€{(creditData.currentPlan.remainingCredits * creditData.currentPlan.costPerCredit).toFixed(0)} value). Consider purchasing additional credits to continue accessing EU talent CVs.
							</p>
						</div>
						<button className="bg-orange-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-orange-700">
							Buy Credits
						</button>
					</div>
				</div>
			)}

			{/* Current Plan Overview */}
			<div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
				<div className="flex justify-between items-start mb-4">
					<div>
						<h3 className="text-lg font-semibold">{creditData.currentPlan.name} Plan</h3>
						<p className="text-blue-100">Active EU recruitment subscription with auto-renewal</p>
					</div>
					<div className="text-right">
						<p className="text-sm text-blue-100">Renewal Date</p>
						<p className="font-semibold">{creditData.currentPlan.renewalDate}</p>
					</div>
				</div>
				
				<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
					<div>
						<p className="text-blue-100 text-sm">Cost per CV Access</p>
						<p className="text-3xl font-bold">€{creditData.currentPlan.costPerCredit}</p>
					</div>
				</div>

				<div className="mt-4">
					<div className="flex justify-between text-sm text-blue-100 mb-2">
						<span>Credit Usage</span>
						<span>{Math.round(usagePercentage)}% (€{(creditData.currentPlan.usedCredits * creditData.currentPlan.costPerCredit).toFixed(0)} spent)</span>
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
						<h4 className="text-sm font-medium text-gray-600">EU Match Efficiency</h4>
						<Zap className="w-5 h-5 text-yellow-500" />
					</div>
					<p className="text-2xl font-bold text-gray-900">{creditData.usage.efficiency}%</p>
					<p className="text-sm text-green-600">+8% from last month</p>
				</div>

				{/* Average Cost per Hire */}
				<div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
					<div className="flex items-center justify-between mb-2">
						<h4 className="text-sm font-medium text-gray-600">Avg Cost per EU Hire</h4>
						<DollarSign className="w-5 h-5 text-green-500" />
					</div>
					<p className="text-2xl font-bold text-gray-900">€{creditData.analytics.averageCostPerHire}</p>
					<p className="text-sm text-green-600">-25% vs traditional recruitment</p>
				</div>

				{/* Successful Matches */}
				<div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
					<div className="flex items-center justify-between mb-2">
						<h4 className="text-sm font-medium text-gray-600">EU Talent Matches</h4>
						<Target className="w-5 h-5 text-blue-500" />
					</div>
					<p className="text-2xl font-bold text-gray-900">{creditData.analytics.successfulMatches}</p>
					<p className="text-sm text-blue-600">96% EU work eligibility</p>
				</div>

				{/* ROI */}
				<div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
					<div className="flex items-center justify-between mb-2">
						<h4 className="text-sm font-medium text-gray-600">ROI vs Agencies</h4>
						<TrendingUp className="w-5 h-5 text-purple-500" />
					</div>
					<p className="text-2xl font-bold text-gray-900">{creditData.analytics.roi}%</p>
					<p className="text-sm text-purple-600">No agency fees</p>
				</div>
			</div>

			{/* Detailed Analytics */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				{/* Usage Timeline */}
				<div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
					<h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
						<BarChart3 className="w-5 h-5 text-blue-500 mr-2" />
						EU CV Access Pattern
					</h3>
					<div className="space-y-4">
						<div className="flex justify-between items-center">
							<span className="text-gray-600">Today</span>
							<div className="flex items-center">
								<span className="text-sm font-medium text-gray-900 mr-3">{creditData.usage.today} CV accesses (€{(creditData.usage.today * creditData.currentPlan.costPerCredit).toFixed(0)})</span>
								<div className="w-24 bg-gray-200 rounded-full h-2">
									<div className="bg-blue-600 h-2 rounded-full" style={{ width: '40%' }}></div>
								</div>
							</div>
						</div>
						<div className="flex justify-between items-center">
							<span className="text-gray-600">This Week</span>
							<div className="flex items-center">
								<span className="text-sm font-medium text-gray-900 mr-3">{creditData.usage.thisWeek} CV accesses (€{(creditData.usage.thisWeek * creditData.currentPlan.costPerCredit).toFixed(0)})</span>
								<div className="w-24 bg-gray-200 rounded-full h-2">
									<div className="bg-green-600 h-2 rounded-full" style={{ width: '70%' }}></div>
								</div>
							</div>
						</div>
						<div className="flex justify-between items-center">
							<span className="text-gray-600">This Month</span>
							<div className="flex items-center">
								<span className="text-sm font-medium text-gray-900 mr-3">{creditData.usage.thisMonth} CV accesses (€{(creditData.usage.thisMonth * creditData.currentPlan.costPerCredit).toFixed(0)})</span>
								<div className="w-24 bg-gray-200 rounded-full h-2">
									<div className="bg-purple-600 h-2 rounded-full" style={{ width: `${usagePercentage}%` }}></div>
								</div>
							</div>
						</div>
					</div>
					<div className="mt-4 pt-4 border-t border-gray-200">
						<p className="text-xs text-gray-500">EU talent CVs are priced transparently at €{creditData.currentPlan.costPerCredit} each, with no hidden fees or recruitment agency commissions.</p>
					</div>
				</div>

				{/* Recent Activity */}
				<div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
					<h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
						<Clock className="w-5 h-5 text-green-500 mr-2" />
						Recent EU Recruitment Activity
					</h3>
					<div className="space-y-4">
						{creditData.recentActivity.map((activity) => (
							<div key={activity.id} className="flex items-start space-x-3">
								<div className={`w-8 h-8 rounded-full flex items-center justify-center ${getActivityColor(activity.type)}`}>
									{getActivityIcon(activity.type)}
								</div>
								<div className="flex-1 min-w-0">
									<p className="text-sm font-medium text-gray-900 truncate">{activity.description}</p>
									{activity.sourceCountry && activity.targetCity && (
										<p className="text-xs text-gray-500 mt-1">
											<MapPin className="w-3 h-3 inline mr-1" />
											{activity.sourceCountry} → {activity.targetCity}
										</p>
									)}
									<div className="flex items-center justify-between mt-1">
										<p className="text-xs text-gray-500">{activity.timestamp}</p>
										<span className={`text-xs font-medium px-2 py-1 rounded ${
											activity.creditsUsed > 0 
												? 'text-red-600 bg-red-50' 
												: activity.creditsUsed < 0
												? 'text-green-600 bg-green-50'
												: 'text-gray-600 bg-gray-50'
										}`}>
											{activity.creditsUsed > 0 ? '-€' + (activity.creditsUsed * creditData.currentPlan.costPerCredit).toFixed(0) : 
											 activity.creditsUsed < 0 ? '+€' + Math.abs(activity.creditsUsed * creditData.currentPlan.costPerCredit).toFixed(0) :
											 'Free'}
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
					EU Recruitment Credit Plans
				</h3>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					<div className="text-center p-4 border border-gray-200 rounded-lg">
						<h4 className="font-medium text-gray-900 mb-2">EU Starter</h4>
						<p className="text-2xl font-bold text-gray-900 mb-1">€399</p>
						<p className="text-sm text-gray-600 mb-1">50 CV accesses/month</p>
						<p className="text-xs text-gray-500 mb-3">€7.98 per CV access</p>
						<button className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-md text-sm font-medium">
							Downgrade
						</button>
					</div>
					<div className="text-center p-4 border-2 border-blue-500 rounded-lg bg-blue-50">
						<h4 className="font-medium text-gray-900 mb-2">EU Professional</h4>
						<p className="text-2xl font-bold text-gray-900 mb-1">€1,995</p>
						<p className="text-sm text-gray-600 mb-1">300 CV accesses/month</p>
						<p className="text-xs text-gray-500 mb-3">€6.65 per CV access</p>
						<button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md text-sm font-medium">
							Current Plan
						</button>
					</div>
					<div className="text-center p-4 border border-gray-200 rounded-lg">
						<h4 className="font-medium text-gray-900 mb-2">EU Enterprise</h4>
						<p className="text-2xl font-bold text-gray-900 mb-1">€4,995</p>
						<p className="text-sm text-gray-600 mb-1">1000 CV accesses/month</p>
						<p className="text-xs text-gray-500 mb-3">€4.99 per CV access</p>
						<button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-blue-700">
							Upgrade
						</button>
					</div>
				</div>
				<div className="mt-4 pt-4 border-t border-gray-200">
					<div className="flex items-center justify-between text-sm text-gray-600">
						<span>✓ Direct employer-candidate communication</span>
						<span>✓ No recruitment agency fees (save 15-30%)</span>
						<span>✓ EU work eligibility guaranteed</span>
					</div>
				</div>
			</div>
		</div>
	)
}

export default CreditSystemDashboard 