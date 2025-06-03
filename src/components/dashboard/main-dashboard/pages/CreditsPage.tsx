import React, { useState, useEffect } from 'react'
import { 
	CreditCard, 
	Plus, 
	TrendingUp,
	TrendingDown,
	Calendar,
	Eye,
	Heart,
	Users,
	ArrowUpRight,
	ArrowDownRight,
	Receipt,
	ShoppingCart,
	Zap,
	Star,
	CheckCircle
} from 'lucide-react'
import { useBrandColors } from '../../../brand'
import { Credit, CreditBalance, DashboardUser } from '../../../types/dashboard'
import { dashboardAPI } from '../../../services/dashboardAPI'

interface CreditsPageProps {
	user: DashboardUser
}

interface CreditStatsCardProps {
	title: string
	value: string | number
	icon: React.ReactNode
	change?: number
	changeType?: 'increase' | 'decrease'
	color: string
	bgColor: string
}

interface TransactionItemProps {
	transaction: Credit
}

interface PurchaseModalProps {
	isOpen: boolean
	onClose: () => void
	onPurchase: (amount: number, paymentData: any) => void
}

function CreditStatsCard({ title, value, icon, change, changeType, color, bgColor }: CreditStatsCardProps) {
	const colors = useBrandColors()

	return (
		<div 
			className="p-6 rounded-xl border shadow-sm transition-transform duration-200 hover:scale-105"
			style={{ 
				backgroundColor: colors.surface,
				borderColor: colors.border
			}}
		>
			<div className="flex items-center justify-between">
				<div>
					<p 
						className="text-sm font-medium"
						style={{ color: colors.text.secondary }}
					>
						{title}
					</p>
					<p 
						className="text-2xl font-bold mt-1"
						style={{ color: colors.text.primary }}
					>
						{value}
					</p>
					{change !== undefined && (
						<div className="flex items-center mt-2 space-x-1">
							{changeType === 'increase' ? (
								<ArrowUpRight className="w-4 h-4 text-green-500" />
							) : (
								<ArrowDownRight className="w-4 h-4 text-red-500" />
							)}
							<span 
								className={`text-sm font-medium ${
									changeType === 'increase' ? 'text-green-500' : 'text-red-500'
								}`}
							>
								{Math.abs(change)}%
							</span>
							<span 
								className="text-sm"
								style={{ color: colors.text.tertiary }}
							>
								this month
							</span>
						</div>
					)}
				</div>
				<div 
					className="w-12 h-12 rounded-xl flex items-center justify-center"
					style={{ backgroundColor: bgColor }}
				>
					<span style={{ color }}>
						{icon}
					</span>
				</div>
			</div>
		</div>
	)
}

function TransactionItem({ transaction }: TransactionItemProps) {
	const colors = useBrandColors()

	const getTransactionIcon = () => {
		switch (transaction.type) {
			case 'purchase':
				return <ShoppingCart className="w-4 h-4" style={{ color: colors.success }} />
			case 'spent':
				return <Eye className="w-4 h-4" style={{ color: colors.primary }} />
			case 'refund':
				return <ArrowUpRight className="w-4 h-4" style={{ color: colors.info }} />
			default:
				return <CreditCard className="w-4 h-4" style={{ color: colors.text.secondary }} />
		}
	}

	const getAmountDisplay = () => {
		const prefix = transaction.type === 'spent' ? '-' : '+'
		const color = transaction.type === 'spent' ? colors.error : colors.success
		return (
			<span className="font-semibold" style={{ color }}>
				{prefix}{transaction.amount}
			</span>
		)
	}

	return (
		<div 
			className="flex items-center justify-between py-3 border-b last:border-b-0"
			style={{ borderColor: colors.border }}
		>
			<div className="flex items-center space-x-3">
				<div className="flex-shrink-0">
					{getTransactionIcon()}
				</div>
				<div className="flex-1 min-w-0">
					<p 
						className="text-sm font-medium"
						style={{ color: colors.text.primary }}
					>
						{transaction.description}
					</p>
					<p 
						className="text-xs"
						style={{ color: colors.text.tertiary }}
					>
						{new Date(transaction.timestamp).toLocaleDateString()} at{' '}
						{new Date(transaction.timestamp).toLocaleTimeString([], { 
							hour: '2-digit', 
							minute: '2-digit' 
						})}
					</p>
				</div>
			</div>
			<div className="text-right">
				{getAmountDisplay()}
				<p 
					className="text-xs capitalize"
					style={{ color: colors.text.tertiary }}
				>
					{transaction.type}
				</p>
			</div>
		</div>
	)
}

function PurchaseModal({ isOpen, onClose, onPurchase }: PurchaseModalProps) {
	const colors = useBrandColors()
	const [selectedPackage, setSelectedPackage] = useState<number>(100)
	const [paymentMethod, setPaymentMethod] = useState<string>('card')

	const creditPackages = [
		{ credits: 50, price: 49, popular: false },
		{ credits: 100, price: 89, popular: true },
		{ credits: 250, price: 199, popular: false },
		{ credits: 500, price: 349, popular: false }
	]

	const handlePurchase = () => {
		const paymentData = {
			paymentMethod,
			package: creditPackages.find(pkg => pkg.credits === selectedPackage)
		}
		onPurchase(selectedPackage, paymentData)
		onClose()
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
				<div className="p-6">
					<div className="flex items-center justify-between mb-6">
						<h2 
							className="text-xl font-semibold"
							style={{ color: colors.text.primary }}
						>
							Purchase Credits
						</h2>
						<button
							onClick={onClose}
							className="p-2 rounded-lg transition-colors duration-200"
							style={{ color: colors.text.secondary }}
						>
							×
						</button>
					</div>

					{/* Credit Packages */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
						{creditPackages.map((pkg) => (
							<div
								key={pkg.credits}
								onClick={() => setSelectedPackage(pkg.credits)}
								className={`relative p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
									selectedPackage === pkg.credits ? 'scale-105' : 'hover:scale-105'
								}`}
								style={{
									borderColor: selectedPackage === pkg.credits ? colors.primary : colors.border,
									backgroundColor: selectedPackage === pkg.credits ? colors.surfaceVariant : colors.surface
								}}
							>
								{pkg.popular && (
									<div 
										className="absolute -top-2 left-1/2 transform -translate-x-1/2 px-3 py-1 text-xs font-medium rounded-full"
										style={{ 
											backgroundColor: colors.primary,
											color: colors.text.inverse
										}}
									>
										Most Popular
									</div>
								)}
								
								<div className="text-center">
									<div 
										className="text-2xl font-bold"
										style={{ color: colors.text.primary }}
									>
										{pkg.credits}
									</div>
									<div 
										className="text-sm"
										style={{ color: colors.text.secondary }}
									>
										Credits
									</div>
									<div 
										className="text-lg font-semibold mt-2"
										style={{ color: colors.primary }}
									>
										${pkg.price}
									</div>
									<div 
										className="text-xs"
										style={{ color: colors.text.tertiary }}
									>
										${(pkg.price / pkg.credits).toFixed(2)} per credit
									</div>
								</div>

								{selectedPackage === pkg.credits && (
									<CheckCircle 
										className="absolute top-2 right-2 w-5 h-5"
										style={{ color: colors.primary }}
									/>
								)}
							</div>
						))}
					</div>

					{/* Payment Method */}
					<div className="mb-6">
						<h3 
							className="text-lg font-medium mb-3"
							style={{ color: colors.text.primary }}
						>
							Payment Method
						</h3>
						<div className="space-y-2">
							<label className="flex items-center space-x-3 cursor-pointer">
								<input
									type="radio"
									value="card"
									checked={paymentMethod === 'card'}
									onChange={(e) => setPaymentMethod(e.target.value)}
									style={{ accentColor: colors.primary }}
								/>
								<span style={{ color: colors.text.primary }}>Credit/Debit Card</span>
							</label>
							<label className="flex items-center space-x-3 cursor-pointer">
								<input
									type="radio"
									value="paypal"
									checked={paymentMethod === 'paypal'}
									onChange={(e) => setPaymentMethod(e.target.value)}
									style={{ accentColor: colors.primary }}
								/>
								<span style={{ color: colors.text.primary }}>PayPal</span>
							</label>
						</div>
					</div>

					{/* Actions */}
					<div className="flex justify-end space-x-4">
						<button
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
							onClick={handlePurchase}
							className="px-6 py-2 rounded-lg font-medium transition-opacity duration-200 hover:opacity-90"
							style={{ 
								backgroundColor: colors.primary,
								color: colors.text.inverse
							}}
						>
							Purchase {selectedPackage} Credits
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export function CreditsPage({ user }: CreditsPageProps) {
	const [balance, setBalance] = useState<CreditBalance | null>(null)
	const [transactions, setTransactions] = useState<Credit[]>([])
	const [loading, setLoading] = useState(true)
	const [showPurchaseModal, setShowPurchaseModal] = useState(false)
	const colors = useBrandColors()

	useEffect(() => {
		const fetchCreditsData = async () => {
			try {
				setLoading(true)
				const response = await dashboardAPI.getCredits()
				setBalance(response.balance)
				setTransactions(response.transactions)
			} catch (error) {
				console.error('Failed to fetch credits data:', error)
				// Mock data for demo
				setBalance({
					current: 156,
					spent: 344,
					purchased: 500,
					lastPurchaseDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
				})
				setTransactions([
					{
						id: '1',
						amount: 5,
						type: 'spent',
						description: 'Viewed Sarah Johnson profile',
						relatedTalentId: 'talent1',
						timestamp: new Date().toISOString()
					},
					{
						id: '2',
						amount: 5,
						type: 'spent',
						description: 'Viewed Michael Chen profile',
						relatedTalentId: 'talent2',
						timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
					},
					{
						id: '3',
						amount: 100,
						type: 'purchase',
						description: 'Credit package purchase',
						timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
					},
					{
						id: '4',
						amount: 10,
						type: 'spent',
						description: 'Premium job posting boost',
						relatedJobId: 'job1',
						timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
					}
				])
			} finally {
				setLoading(false)
			}
		}

		fetchCreditsData()
	}, [])

	const handlePurchaseCredits = async (amount: number, paymentData: any) => {
		try {
			await dashboardAPI.purchaseCredits(amount, paymentData)
			// Refresh credits data
			const response = await dashboardAPI.getCredits()
			setBalance(response.balance)
			setTransactions(response.transactions)
		} catch (error) {
			console.error('Failed to purchase credits:', error)
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

	const statsCards = balance ? [
		{
			title: 'Current Balance',
			value: balance.current,
			icon: <CreditCard className="w-6 h-6" />,
			color: colors.primary,
			bgColor: `${colors.primary}20`
		},
		{
			title: 'Total Purchased',
			value: balance.purchased,
			icon: <ShoppingCart className="w-6 h-6" />,
			change: 15,
			changeType: 'increase' as const,
			color: colors.success,
			bgColor: `${colors.success}20`
		},
		{
			title: 'Total Spent',
			value: balance.spent,
			icon: <TrendingDown className="w-6 h-6" />,
			change: 8,
			changeType: 'increase' as const,
			color: colors.warning,
			bgColor: `${colors.warning}20`
		},
		{
			title: 'Efficiency Rate',
			value: `${Math.round((balance.spent / balance.purchased) * 100)}%`,
			icon: <Zap className="w-6 h-6" />,
			color: colors.info,
			bgColor: `${colors.info}20`
		}
	] : []

	return (
		<div className="space-y-6">
			{/* Header */}
			<div className="flex items-center justify-between">
				<div>
					<h1 
						className="text-2xl font-bold"
						style={{ color: colors.text.primary }}
					>
						Credits Management
					</h1>
					<p 
						className="text-sm mt-1"
						style={{ color: colors.text.secondary }}
					>
						Manage your credits for viewing talent profiles and boosting job posts
					</p>
				</div>

				<button
					onClick={() => setShowPurchaseModal(true)}
					className="flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-opacity duration-200 hover:opacity-90"
					style={{ 
						backgroundColor: colors.primary,
						color: colors.text.inverse
					}}
				>
					<Plus className="w-5 h-5" />
					<span>Buy Credits</span>
				</button>
			</div>

			{/* Stats Cards */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
				{statsCards.map((card, index) => (
					<CreditStatsCard key={index} {...card} />
				))}
			</div>

			{/* Subscription Alert */}
			{user.subscriptionPlan && (
				<div 
					className="p-6 rounded-xl border-l-4"
					style={{ 
						backgroundColor: colors.surfaceVariant,
						borderLeftColor: colors.primary,
						borderTopColor: colors.border,
						borderRightColor: colors.border,
						borderBottomColor: colors.border
					}}
				>
					<div className="flex items-center justify-between">
						<div>
							<h3 
								className="text-lg font-semibold"
								style={{ color: colors.text.primary }}
							>
								{user.subscriptionPlan.name} Plan Benefits
							</h3>
							<p 
								className="text-sm mt-1"
								style={{ color: colors.text.secondary }}
							>
								You receive {user.subscriptionPlan.creditsPerMonth} credits every month with your subscription
							</p>
							<p 
								className="text-xs mt-1"
								style={{ color: colors.text.tertiary }}
							>
								Next renewal: {new Date(user.subscriptionPlan.renewalDate).toLocaleDateString()}
							</p>
						</div>
						<div className="text-right">
							<div 
								className="text-2xl font-bold"
								style={{ color: colors.primary }}
							>
								{user.subscriptionPlan.creditsPerMonth}
							</div>
							<div 
								className="text-sm"
								style={{ color: colors.text.secondary }}
							>
								credits/month
							</div>
						</div>
					</div>
				</div>
			)}

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				{/* Transaction History */}
				<div 
					className="lg:col-span-2 p-6 rounded-xl border"
					style={{ 
						backgroundColor: colors.surface,
						borderColor: colors.border
					}}
				>
					<div className="flex items-center justify-between mb-6">
						<h2 
							className="text-xl font-semibold"
							style={{ color: colors.text.primary }}
						>
							Transaction History
						</h2>
						<Receipt className="w-5 h-5" style={{ color: colors.text.secondary }} />
					</div>

					<div className="space-y-1 max-h-96 overflow-y-auto">
						{transactions.length > 0 ? (
							transactions.map((transaction) => (
								<TransactionItem key={transaction.id} transaction={transaction} />
							))
						) : (
							<div className="text-center py-8">
								<Receipt 
									className="w-12 h-12 mx-auto mb-4"
									style={{ color: colors.text.tertiary }}
								/>
								<p 
									className="text-sm"
									style={{ color: colors.text.secondary }}
								>
									No transactions yet
								</p>
							</div>
						)}
					</div>
				</div>

				{/* Credit Usage Breakdown */}
				<div 
					className="p-6 rounded-xl border"
					style={{ 
						backgroundColor: colors.surface,
						borderColor: colors.border
					}}
				>
					<div className="flex items-center justify-between mb-6">
						<h2 
							className="text-xl font-semibold"
							style={{ color: colors.text.primary }}
						>
							Usage Breakdown
						</h2>
						<TrendingUp className="w-5 h-5" style={{ color: colors.text.secondary }} />
					</div>

					<div className="space-y-4">
						<div className="flex items-center justify-between">
							<div className="flex items-center space-x-2">
								<Eye className="w-4 h-4" style={{ color: colors.primary }} />
								<span 
									className="text-sm"
									style={{ color: colors.text.primary }}
								>
									Profile Views
								</span>
							</div>
							<span 
								className="text-sm font-medium"
								style={{ color: colors.text.primary }}
							>
								65%
							</span>
						</div>

						<div className="flex items-center justify-between">
							<div className="flex items-center space-x-2">
								<TrendingUp className="w-4 h-4" style={{ color: colors.success }} />
								<span 
									className="text-sm"
									style={{ color: colors.text.primary }}
								>
									Job Boosts
								</span>
							</div>
							<span 
								className="text-sm font-medium"
								style={{ color: colors.text.primary }}
							>
								25%
							</span>
						</div>

						<div className="flex items-center justify-between">
							<div className="flex items-center space-x-2">
								<Star className="w-4 h-4" style={{ color: colors.warning }} />
								<span 
									className="text-sm"
									style={{ color: colors.text.primary }}
								>
									Premium Features
								</span>
							</div>
							<span 
								className="text-sm font-medium"
								style={{ color: colors.text.primary }}
							>
								10%
							</span>
						</div>
					</div>

					<div 
						className="mt-6 p-4 rounded-lg border"
						style={{ 
							backgroundColor: colors.surfaceVariant,
							borderColor: colors.border
						}}
					>
						<h4 
							className="text-sm font-medium mb-2"
							style={{ color: colors.text.primary }}
						>
							Monthly Spending
						</h4>
						<div 
							className="text-2xl font-bold"
							style={{ color: colors.primary }}
						>
							{balance?.spent || 0}
						</div>
						<div 
							className="text-xs"
							style={{ color: colors.text.secondary }}
						>
							credits this month
						</div>
					</div>
				</div>
			</div>

			{/* Purchase Modal */}
			<PurchaseModal
				isOpen={showPurchaseModal}
				onClose={() => setShowPurchaseModal(false)}
				onPurchase={handlePurchaseCredits}
			/>
		</div>
	)
} 