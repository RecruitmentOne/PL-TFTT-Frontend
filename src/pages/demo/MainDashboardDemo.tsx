import React, { useState } from 'react'
import { 
	Home, 
	Briefcase, 
	Users, 
	Heart, 
	CreditCard, 
	Bell, 
	Settings, 
	Menu, 
	X,
	User,
	LogOut
} from 'lucide-react'
import { BrandProvider, useBrandColors } from '../../brand'
import { DashboardOverview } from '../../components/main-dashboard/pages/DashboardOverview'
import { JobsPage } from '../../components/main-dashboard/pages/JobsPage'
import { TalentsPage } from '../../components/main-dashboard/pages/TalentsPage'
import { MatchesPage } from '../../components/main-dashboard/pages/MatchesPage'
import { CreditsPage } from '../../components/main-dashboard/pages/CreditsPage'
import { NotificationsPage } from '../../components/main-dashboard/pages/NotificationsPage'
import { SettingsPage } from '../../components/main-dashboard/pages/SettingsPage'
import { DashboardUser } from '../../types/dashboard'

interface NavItem {
	id: string
	label: string
	icon: React.ReactNode
	userTypes: ('team' | 'talent')[]
}

function DashboardContent({ userType, onUserTypeChange }: { userType: 'team' | 'talent', onUserTypeChange: (type: 'team' | 'talent') => void }) {
	const [currentPage, setCurrentPage] = useState('dashboard')
	const [sidebarOpen, setSidebarOpen] = useState(false)
	const colors = useBrandColors()

	// Mock user data for demo
	const mockUser: DashboardUser = {
		id: '1',
		email: 'demo@tftt.com',
		firstName: userType === 'team' ? 'Tech' : 'John',
		lastName: userType === 'team' ? 'Corp' : 'Doe',
		userType: userType,
		profilePicture: undefined,
		companyName: userType === 'team' ? 'TechCorp Inc.' : undefined,
		phone: '+1 (555) 123-4567',
		location: 'San Francisco, CA',
		bio: userType === 'team' 
			? 'We are a fast-growing tech company looking for talented developers to join our team.'
			: 'Experienced software developer with 5+ years in React and Node.js. Passionate about building scalable web applications.',
		website: userType === 'team' ? 'https://techcorp.com' : undefined,
		linkedin: userType === 'team' ? 'https://linkedin.com/company/techcorp' : 'https://linkedin.com/in/johndoe',
		currentJobTitle: userType === 'talent' ? 'Senior Frontend Developer' : undefined,
		subscriptionPlan: userType === 'team' ? {
			id: 'pro',
			name: 'Professional',
			creditsPerMonth: 100,
			price: 99,
			renewalDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
			status: 'active',
			features: ['Unlimited job posts', '100 credits/month', 'Advanced analytics', 'Priority support']
		} : undefined
	}

	const navItems: NavItem[] = [
		{
			id: 'dashboard',
			label: 'Dashboard',
			icon: <Home className="w-5 h-5" />,
			userTypes: ['team', 'talent']
		},
		{
			id: 'jobs',
			label: 'Jobs',
			icon: <Briefcase className="w-5 h-5" />,
			userTypes: ['team', 'talent']
		},
		{
			id: 'talents',
			label: 'Talents',
			icon: <Users className="w-5 h-5" />,
			userTypes: ['team']
		},
		{
			id: 'matches',
			label: 'Matches',
			icon: <Heart className="w-5 h-5" />,
			userTypes: ['team', 'talent']
		},
		{
			id: 'credits',
			label: 'Credits',
			icon: <CreditCard className="w-5 h-5" />,
			userTypes: ['team']
		},
		{
			id: 'notifications',
			label: 'Notifications',
			icon: <Bell className="w-5 h-5" />,
			userTypes: ['team', 'talent']
		},
		{
			id: 'settings',
			label: 'Settings',
			icon: <Settings className="w-5 h-5" />,
			userTypes: ['team', 'talent']
		}
	]

	const filteredNavItems = navItems.filter(item => 
		item.userTypes.includes(userType)
	)

	const handleLogout = () => {
		console.log('Logout clicked')
	}

	const handleUserUpdate = (updatedUser: DashboardUser) => {
		console.log('User updated:', updatedUser)
	}

	const renderCurrentPage = () => {
		switch (currentPage) {
			case 'dashboard':
				return <DashboardOverview user={mockUser} />
			case 'jobs':
				return <JobsPage user={mockUser} />
			case 'talents':
				return <TalentsPage user={mockUser} />
			case 'matches':
				return <MatchesPage user={mockUser} />
			case 'credits':
				return <CreditsPage user={mockUser} />
			case 'notifications':
				return <NotificationsPage user={mockUser} />
			case 'settings':
				return <SettingsPage user={mockUser} onUserUpdate={handleUserUpdate} />
			default:
				return <DashboardOverview user={mockUser} />
		}
	}

	return (
		<div className="min-h-screen bg-gray-50">
			{/* Demo Controls */}
			<div 
				className="text-white p-4 relative z-50"
				style={{ 
					background: userType === 'team' 
						? 'linear-gradient(135deg, #F47E22 0%, #FF6B35 100%)' 
						: 'linear-gradient(135deg, #478CCA 0%, #22C2EA 100%)'
				}}
			>
				<div className="max-w-7xl mx-auto flex items-center justify-between">
					<div className="flex items-center space-x-4">
						<h1 className="text-lg font-semibold">
							🚀 TFTT {userType === 'team' ? 'Team' : 'Talent'} Dashboard Demo
						</h1>
						<div className="flex items-center space-x-2">
							<span className="text-sm">User Type:</span>
							<button
								onClick={() => {
									onUserTypeChange('team')
									setCurrentPage('dashboard')
								}}
								className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
									userType === 'team' 
										? 'bg-white text-orange-600' 
										: 'bg-black bg-opacity-20 hover:bg-opacity-30'
								}`}
							>
								Team
							</button>
							<button
								onClick={() => {
									onUserTypeChange('talent')
									if (currentPage === 'talents' || currentPage === 'credits') {
										setCurrentPage('dashboard')
									}
								}}
								className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
									userType === 'talent' 
										? 'bg-white text-blue-600' 
										: 'bg-black bg-opacity-20 hover:bg-opacity-30'
								}`}
							>
								Talent
							</button>
						</div>
					</div>
					<div className="text-sm hidden md:block">
						Switch between Team (Orange) and Talent (Blue) color schemes
					</div>
				</div>
			</div>

			{/* Dashboard Layout */}
			<div className="flex h-screen" style={{ backgroundColor: colors.background, paddingTop: '0px' }}>
				{/* Sidebar */}
				<div className={`
					fixed inset-y-0 left-0 z-40 w-64 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0
					${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
				`} style={{ marginTop: '76px', height: 'calc(100vh - 76px)' }}>
					<div 
						className="h-full flex flex-col"
						style={{ backgroundColor: colors.surface }}
					>
						{/* Logo Section */}
						<div className="flex items-center justify-between h-16 px-6 border-b"
							style={{ borderColor: colors.border }}
						>
							<div className="flex items-center space-x-3">
								<div 
									className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg"
									style={{ background: colors.gradients?.primary || colors.primary }}
								>
									<span className="text-white font-bold text-lg">T</span>
								</div>
								<span 
									className="text-xl font-bold"
									style={{ color: colors.text.primary }}
								>
									TFTT
								</span>
							</div>
							
							{/* Mobile close button */}
							<button
								onClick={() => setSidebarOpen(false)}
								className="lg:hidden p-2 rounded-md transition-colors duration-200 hover:bg-opacity-10"
								style={{ 
									color: colors.text.secondary,
									backgroundColor: 'transparent'
								}}
								onMouseEnter={(e) => {
									e.currentTarget.style.backgroundColor = colors.hover
								}}
								onMouseLeave={(e) => {
									e.currentTarget.style.backgroundColor = 'transparent'
								}}
							>
								<X className="w-5 h-5" />
							</button>
						</div>

						{/* User Info */}
						<div className="p-6 border-b" style={{ borderColor: colors.border }}>
							<div className="flex items-center space-x-3">
								<div 
									className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-semibold shadow-lg"
									style={{ background: colors.gradients?.primary || colors.primary }}
								>
									<User className="w-6 h-6" />
								</div>
								<div className="flex-1 min-w-0">
									<p 
										className="text-sm font-semibold truncate"
										style={{ color: colors.text.primary }}
									>
										{userType === 'team' ? mockUser.companyName : `${mockUser.firstName} ${mockUser.lastName}`}
									</p>
									<p 
										className="text-xs truncate capitalize"
										style={{ color: colors.text.secondary }}
									>
										{userType} Account
									</p>
								</div>
							</div>
						</div>

						{/* Navigation */}
						<nav className="flex-1 px-4 py-6 space-y-2">
							{filteredNavItems.map((item) => (
								<button
									key={item.id}
									onClick={() => setCurrentPage(item.id)}
									className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 shadow-sm hover:scale-105"
									style={{
										backgroundColor: currentPage === item.id ? colors.primary : 'transparent',
										color: currentPage === item.id ? colors.text.inverse : colors.text.primary,
										border: `1px solid ${currentPage === item.id ? colors.primary : 'transparent'}`
									}}
									onMouseEnter={(e) => {
										if (currentPage !== item.id) {
											e.currentTarget.style.backgroundColor = colors.hover
										}
									}}
									onMouseLeave={(e) => {
										if (currentPage !== item.id) {
											e.currentTarget.style.backgroundColor = 'transparent'
										}
									}}
								>
									<span className={currentPage === item.id ? 'text-white' : ''}>
										{item.icon}
									</span>
									<span className="font-semibold">{item.label}</span>
								</button>
							))}
						</nav>

						{/* Subscription Banner (Teams only) */}
						{userType === 'team' && mockUser.subscriptionPlan && (
							<div className="px-4 pb-4">
								<div 
									className="relative p-4 rounded-xl border overflow-hidden"
									style={{ 
										backgroundColor: colors.surfaceVariant,
										borderColor: colors.border
									}}
								>
									{/* Gradient Background */}
									<div 
										className="absolute inset-0 opacity-5"
										style={{ background: colors.gradients?.primary || colors.primary }}
									/>
									
									<div className="relative z-10">
										<div className="flex items-center justify-between">
											<div>
												<p 
													className="text-sm font-semibold"
													style={{ color: colors.text.primary }}
												>
													{mockUser.subscriptionPlan.name} Plan
												</p>
												<p 
													className="text-xs"
													style={{ color: colors.text.secondary }}
												>
													{mockUser.subscriptionPlan.creditsPerMonth} credits/month
												</p>
											</div>
											<button 
												className="text-xs px-3 py-1 rounded-lg font-medium transition-all duration-200 hover:scale-105"
												style={{ 
													backgroundColor: colors.primary,
													color: colors.text.inverse
												}}
												onClick={() => setCurrentPage('settings')}
											>
												Upgrade
											</button>
										</div>
									</div>
								</div>
							</div>
						)}

						{/* Logout */}
						<div className="px-4 pb-6">
							<button
								onClick={handleLogout}
								className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 hover:scale-105"
								style={{ 
									color: colors.text.secondary,
									backgroundColor: 'transparent'
								}}
								onMouseEnter={(e) => {
									e.currentTarget.style.backgroundColor = colors.hover
									e.currentTarget.style.color = colors.text.primary
								}}
								onMouseLeave={(e) => {
									e.currentTarget.style.backgroundColor = 'transparent'
									e.currentTarget.style.color = colors.text.secondary
								}}
							>
								<LogOut className="w-5 h-5" />
								<span className="font-semibold">Logout</span>
							</button>
						</div>
					</div>
				</div>

				{/* Mobile Overlay */}
				{sidebarOpen && (
					<div 
						className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
						style={{ marginTop: '76px' }}
						onClick={() => setSidebarOpen(false)}
					/>
				)}

				{/* Main Content */}
				<div className="flex-1 flex flex-col min-w-0" style={{ marginTop: '76px', height: 'calc(100vh - 76px)' }}>
					{/* Header */}
					<header 
						className="h-16 flex items-center justify-between px-6 border-b shadow-sm"
						style={{ 
							backgroundColor: colors.surface,
							borderColor: colors.border
						}}
					>
						<button
							onClick={() => setSidebarOpen(true)}
							className="lg:hidden p-2 rounded-xl transition-all duration-200 hover:scale-105"
							style={{ 
								color: colors.text.secondary,
								backgroundColor: 'transparent'
							}}
							onMouseEnter={(e) => {
								e.currentTarget.style.backgroundColor = colors.hover
							}}
							onMouseLeave={(e) => {
								e.currentTarget.style.backgroundColor = 'transparent'
							}}
						>
							<Menu className="w-5 h-5" />
						</button>

						<div className="flex-1 lg:flex-none">
							<h1 
								className="text-2xl font-bold"
								style={{ color: colors.text.primary }}
							>
								{navItems.find(item => item.id === currentPage)?.label || 'Dashboard'}
							</h1>
						</div>

						<div className="flex items-center space-x-4">
							{/* Notifications Bell */}
							<button
								onClick={() => setCurrentPage('notifications')}
								className="relative p-2 rounded-xl transition-all duration-200 hover:scale-105"
								style={{ 
									color: colors.text.secondary,
									backgroundColor: 'transparent'
								}}
								onMouseEnter={(e) => {
									e.currentTarget.style.backgroundColor = colors.hover
								}}
								onMouseLeave={(e) => {
									e.currentTarget.style.backgroundColor = 'transparent'
								}}
							>
								<Bell className="w-5 h-5" />
								<span 
									className="absolute -top-1 -right-1 w-4 h-4 text-xs rounded-full flex items-center justify-center text-white"
									style={{ backgroundColor: colors.error }}
								>
									3
								</span>
							</button>

							{/* Profile Button */}
							<button
								onClick={() => setCurrentPage('settings')}
								className="flex items-center space-x-2 p-2 rounded-xl transition-all duration-200 hover:scale-105"
								style={{ 
									color: colors.text.secondary,
									backgroundColor: 'transparent'
								}}
								onMouseEnter={(e) => {
									e.currentTarget.style.backgroundColor = colors.hover
								}}
								onMouseLeave={(e) => {
									e.currentTarget.style.backgroundColor = 'transparent'
								}}
							>
								<div 
									className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm font-semibold shadow-lg"
									style={{ background: colors.gradients?.primary || colors.primary }}
								>
									<User className="w-5 h-5" />
								</div>
							</button>
						</div>
					</header>

					{/* Content Area */}
					<main className="flex-1 p-8 overflow-auto" style={{ backgroundColor: colors.background }}>
						{renderCurrentPage()}
					</main>
				</div>
			</div>
		</div>
	)
}

export default function MainDashboardDemo() {
	const [userType, setUserType] = useState<'team' | 'talent'>('team')

	return (
		<BrandProvider key={userType} initialVariant={userType === 'team' ? 'teams' : 'talent'}>
			<DashboardContent userType={userType} onUserTypeChange={setUserType} />
		</BrandProvider>
	)
} 