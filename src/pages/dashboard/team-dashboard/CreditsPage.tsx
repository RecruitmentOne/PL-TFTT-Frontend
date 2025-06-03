import React, { useState } from 'react'
import { useAppSelector } from '../../../store/hooks'
import DashboardLayoutWithSidebar from '../../../components/layout/DashboardLayoutWithSidebar'
import {
	CreditCard,
	Zap,
	Check,
	TrendingUp,
	Calendar,
	Download,
	Star,
	Shield,
	Clock,
	Users,
	Eye,
	Crown,
	Gift,
	ArrowRight,
	Plus,
	X
} from 'lucide-react'

// Sample data for credits and billing
const currentSubscription = {
	plan: 'Professional',
	creditsRemaining: 45,
	creditsTotal: 100,
	renewalDate: '2024-01-15',
	monthlyPrice: 99,
	status: 'active'
}

const subscriptionPlans = [
	{
		id: 'starter',
		name: 'Starter',
		price: 49,
		credits: 50,
		features: [
			'50 profile views per month',
			'Basic candidate search',
			'Email support',
			'1 job posting at a time'
		],
		popular: false,
		color: 'gray'
	},
	{
		id: 'professional',
		name: 'Professional',
		price: 99,
		credits: 100,
		features: [
			'100 profile views per month',
			'Advanced candidate search',
			'Priority email support',
			'5 job postings at a time',
			'Analytics dashboard',
			'Resume parsing'
		],
		popular: true,
		color: 'blue'
	},
	{
		id: 'enterprise',
		name: 'Enterprise',
		price: 199,
		credits: 250,
		features: [
			'250 profile views per month',
			'AI-powered matching',
			'Dedicated account manager',
			'Unlimited job postings',
			'Advanced analytics',
			'API access',
			'Custom integrations'
		],
		popular: false,
		color: 'purple'
	}
]

const creditPacks = [
	{ credits: 10, price: 15, bonus: 0 },
	{ credits: 25, price: 35, bonus: 5 },
	{ credits: 50, price: 65, bonus: 15 },
	{ credits: 100, price: 120, bonus: 35 }
]

const recentTransactions = [
	{
		id: 1,
		type: 'subscription',
		description: 'Professional Plan - Monthly',
		amount: -99,
		credits: 100,
		date: '2024-01-01',
		status: 'completed'
	},
	{
		id: 2,
		type: 'view',
		description: 'Profile view - Sarah Chen',
		amount: 0,
		credits: -1,
		date: '2023-12-28',
		status: 'completed'
	},
	{
		id: 3,
		type: 'bonus',
		description: 'New customer bonus',
		amount: 0,
		credits: 10,
		date: '2023-12-15',
		status: 'completed'
	}
]

function CreditsPage() {
	const { user } = useAppSelector((state) => state.auth)
	const [selectedPlan, setSelectedPlan] = useState('professional')
	const [showPurchaseModal, setShowPurchaseModal] = useState(false)
	const [selectedCreditPack, setSelectedCreditPack] = useState<number | null>(null)

	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		})
	}

	const creditsUsagePercentage = (currentSubscription.creditsTotal - currentSubscription.creditsRemaining) / currentSubscription.creditsTotal * 100

	return (
		<DashboardLayoutWithSidebar 
			title="Credits & Billing"
			subtitle="Manage your subscription and purchase additional credits"
		>
			<div className="p-8 space-y-8">
				{/* Current Subscription Overview */}
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
					{/* Credits Remaining */}
					<div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
						<div className="flex items-center justify-between mb-4">
							<Zap className="w-8 h-8" />
							<span className="text-blue-100 text-sm font-medium">Credits</span>
						</div>
						<div className="space-y-2">
							<p className="text-3xl font-bold">{currentSubscription.creditsRemaining}</p>
							<p className="text-blue-100">of {currentSubscription.creditsTotal} remaining</p>
							<div className="w-full bg-blue-400 rounded-full h-2 mt-3">
								<div 
									className="bg-white rounded-full h-2 transition-all duration-300"
									style={{ width: `${(currentSubscription.creditsRemaining / currentSubscription.creditsTotal) * 100}%` }}
								/>
							</div>
						</div>
					</div>

					{/* Current Plan */}
					<div className="bg-white rounded-xl border border-gray-200 p-6">
						<div className="flex items-center justify-between mb-4">
							<Crown className="w-8 h-8 text-yellow-500" />
							<span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
								Active
							</span>
						</div>
						<div className="space-y-2">
							<p className="text-xl font-bold text-gray-900">{currentSubscription.plan}</p>
							<p className="text-gray-600">${currentSubscription.monthlyPrice}/month</p>
							<p className="text-sm text-gray-500">
								Renews on {formatDate(currentSubscription.renewalDate)}
							</p>
						</div>
					</div>

					{/* Quick Stats */}
					<div className="bg-white rounded-xl border border-gray-200 p-6">
						<div className="flex items-center justify-between mb-4">
							<TrendingUp className="w-8 h-8 text-green-500" />
							<span className="text-gray-500 text-sm font-medium">This Month</span>
						</div>
						<div className="space-y-2">
							<p className="text-xl font-bold text-gray-900">
								{currentSubscription.creditsTotal - currentSubscription.creditsRemaining}
							</p>
							<p className="text-gray-600">Credits Used</p>
							<div className="flex items-center text-green-600 text-sm">
								<TrendingUp className="w-4 h-4 mr-1" />
								<span>+23% from last month</span>
							</div>
						</div>
					</div>
				</div>

				{/* Quick Actions */}
				<div className="bg-white rounded-xl border border-gray-200 p-6">
					<h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						<button 
							onClick={() => setShowPurchaseModal(true)}
							className="flex items-center justify-center p-4 border-2 border-dashed border-blue-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-all group"
						>
							<div className="text-center">
								<Plus className="w-8 h-8 text-blue-500 mx-auto mb-2 group-hover:scale-110 transition-transform" />
								<p className="font-medium text-gray-900">Buy More Credits</p>
								<p className="text-sm text-gray-600">Get instant access to more profiles</p>
							</div>
						</button>
						
						<button className="flex items-center justify-center p-4 border-2 border-dashed border-purple-300 rounded-lg hover:border-purple-400 hover:bg-purple-50 transition-all group">
							<div className="text-center">
								<Crown className="w-8 h-8 text-purple-500 mx-auto mb-2 group-hover:scale-110 transition-transform" />
								<p className="font-medium text-gray-900">Upgrade Plan</p>
								<p className="text-sm text-gray-600">Get more credits and features</p>
							</div>
						</button>
						
						<button className="flex items-center justify-center p-4 border-2 border-dashed border-green-300 rounded-lg hover:border-green-400 hover:bg-green-50 transition-all group">
							<div className="text-center">
								<Download className="w-8 h-8 text-green-500 mx-auto mb-2 group-hover:scale-110 transition-transform" />
								<p className="font-medium text-gray-900">Download Invoice</p>
								<p className="text-sm text-gray-600">Get your latest billing statement</p>
							</div>
						</button>
					</div>
				</div>

				{/* Subscription Plans */}
				<div className="bg-white rounded-xl border border-gray-200 p-6">
					<div className="flex items-center justify-between mb-6">
						<h3 className="text-lg font-semibold text-gray-900">Subscription Plans</h3>
						<div className="flex items-center space-x-2 text-sm text-gray-600">
							<Shield className="w-4 h-4" />
							<span>30-day money-back guarantee</span>
						</div>
					</div>
					
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						{subscriptionPlans.map((plan) => (
							<div 
								key={plan.id}
								className={`relative rounded-xl border-2 p-6 transition-all cursor-pointer ${
									plan.popular 
										? 'border-blue-500 bg-blue-50 shadow-lg' 
										: selectedPlan === plan.id
											? 'border-blue-300 bg-blue-25'
											: 'border-gray-200 hover:border-gray-300'
								}`}
								onClick={() => setSelectedPlan(plan.id)}
							>
								{plan.popular && (
									<div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
										<span className="bg-blue-500 text-white text-xs font-medium px-3 py-1 rounded-full">
											Most Popular
										</span>
									</div>
								)}
								
								<div className="text-center">
									<h4 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h4>
									<div className="mb-4">
										<span className="text-3xl font-bold text-gray-900">${plan.price}</span>
										<span className="text-gray-600">/month</span>
									</div>
									<div className="mb-6">
										<div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
											plan.color === 'blue' ? 'bg-blue-100 text-blue-800' :
											plan.color === 'purple' ? 'bg-purple-100 text-purple-800' :
											'bg-gray-100 text-gray-800'
										}`}>
											<Zap className="w-4 h-4 mr-1" />
											{plan.credits} credits/month
										</div>
									</div>
								</div>
								
								<ul className="space-y-3 mb-6">
									{plan.features.map((feature, index) => (
										<li key={index} className="flex items-center text-sm">
											<Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
											<span className="text-gray-600">{feature}</span>
										</li>
									))}
								</ul>
								
								<button 
									className={`w-full py-3 px-4 rounded-lg font-medium transition-all ${
										plan.popular || selectedPlan === plan.id
											? 'bg-blue-600 text-white hover:bg-blue-700'
											: 'bg-gray-100 text-gray-900 hover:bg-gray-200'
									}`}
								>
									{currentSubscription.plan.toLowerCase() === plan.name.toLowerCase() 
										? 'Current Plan' 
										: selectedPlan === plan.id 
											? 'Select Plan' 
											: 'Choose Plan'
									}
								</button>
							</div>
						))}
					</div>
				</div>

				{/* Recent Transactions */}
				<div className="bg-white rounded-xl border border-gray-200 p-6">
					<div className="flex items-center justify-between mb-6">
						<h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
						<button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
							View All
						</button>
					</div>
					
					<div className="space-y-4">
						{recentTransactions.map((transaction) => (
							<div key={transaction.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
								<div className="flex items-center space-x-3">
									<div className={`w-10 h-10 rounded-full flex items-center justify-center ${
										transaction.type === 'subscription' ? 'bg-blue-100' :
										transaction.type === 'view' ? 'bg-red-100' :
										'bg-green-100'
									}`}>
										{transaction.type === 'subscription' ? (
											<CreditCard className="w-5 h-5 text-blue-600" />
										) : transaction.type === 'view' ? (
											<Eye className="w-5 h-5 text-red-600" />
										) : (
											<Gift className="w-5 h-5 text-green-600" />
										)}
									</div>
									<div>
										<p className="font-medium text-gray-900">{transaction.description}</p>
										<p className="text-sm text-gray-600">{formatDate(transaction.date)}</p>
									</div>
								</div>
								<div className="text-right">
									{transaction.amount !== 0 && (
										<p className={`font-medium ${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
											{transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount)}
										</p>
									)}
									<p className={`text-sm ${transaction.credits > 0 ? 'text-green-600' : 'text-red-600'}`}>
										{transaction.credits > 0 ? '+' : ''}{transaction.credits} credits
									</p>
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Purchase Credits Modal */}
				{showPurchaseModal && (
					<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
						<div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
							<div className="p-6 border-b border-gray-200">
								<div className="flex items-center justify-between">
									<h3 className="text-xl font-semibold text-gray-900">Purchase Additional Credits</h3>
									<button 
										onClick={() => setShowPurchaseModal(false)}
										className="text-gray-400 hover:text-gray-600"
									>
										<X className="w-6 h-6" />
									</button>
								</div>
							</div>
							
							<div className="p-6">
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									{creditPacks.map((pack, index) => (
										<div 
											key={index}
											className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
												selectedCreditPack === index 
													? 'border-blue-500 bg-blue-50' 
													: 'border-gray-200 hover:border-gray-300'
											}`}
											onClick={() => setSelectedCreditPack(index)}
										>
											<div className="text-center">
												<div className="flex items-center justify-center mb-2">
													<Zap className="w-8 h-8 text-blue-600" />
												</div>
												<h4 className="text-lg font-bold text-gray-900 mb-1">
													{pack.credits + pack.bonus} Credits
												</h4>
												{pack.bonus > 0 && (
													<p className="text-sm text-green-600 mb-2">
														+{pack.bonus} bonus credits!
													</p>
												)}
												<p className="text-2xl font-bold text-blue-600">${pack.price}</p>
												<p className="text-sm text-gray-600">
													${(pack.price / (pack.credits + pack.bonus)).toFixed(2)} per credit
												</p>
											</div>
										</div>
									))}
								</div>
								
								<div className="mt-6 flex justify-end space-x-3">
									<button 
										onClick={() => setShowPurchaseModal(false)}
										className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
									>
										Cancel
									</button>
									<button 
										disabled={selectedCreditPack === null}
										className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
									>
										<CreditCard className="w-4 h-4 mr-2" />
										Purchase Credits
									</button>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		</DashboardLayoutWithSidebar>
	)
}

export default CreditsPage 