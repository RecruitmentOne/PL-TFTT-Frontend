import React from 'react'
import { useAppSelector } from '../../store/hooks'
import { useBrandColors } from '../../brand'
import ThemeToggle from '../brand/theme-toggle/ThemeToggle'
import { 
	Bell, 
	Search, 
	Menu,
	MessageSquare
} from 'lucide-react'

interface DashboardTopBarProps {
	onMenuClick: () => void
	title?: string
	subtitle?: string
}

function DashboardTopBar({ onMenuClick, title, subtitle }: DashboardTopBarProps) {
	const { user } = useAppSelector((state) => state.auth)
	const colors = useBrandColors()

	return (
		<header 
			className="shadow-sm border-b"
			style={{
				backgroundColor: colors?.background || '#FFFFFF',
				borderColor: colors?.border || '#E5E7EB'
			}}
		>
			<div className="mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center h-16">
					{/* Left side - Mobile menu button and title */}
					<div className="flex items-center space-x-4">
						<button
							onClick={onMenuClick}
							className="p-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-inset lg:hidden"
							style={{
								color: colors?.text.secondary || '#6B7280',
								backgroundColor: 'transparent'
							}}
							onMouseEnter={(e) => {
								e.currentTarget.style.backgroundColor = colors?.hover || '#F3F4F6'
								e.currentTarget.style.color = colors?.text.primary || '#374151'
							}}
							onMouseLeave={(e) => {
								e.currentTarget.style.backgroundColor = 'transparent'
								e.currentTarget.style.color = colors?.text.secondary || '#6B7280'
							}}
						>
							<Menu className="h-6 w-6" />
						</button>
						
						{title && (
							<div className="flex items-center space-x-3">
								<div className="flex-shrink-0">
									<h1 
										className="text-xl font-bold font-brand"
										style={{ color: colors?.text.primary || '#111827' }}
									>
										{title}
									</h1>
									{subtitle && (
										<p 
											className="text-sm"
											style={{ color: colors?.text.secondary || '#6B7280' }}
										>
											{subtitle}
										</p>
									)}
								</div>
							</div>
						)}
					</div>

					{/* Right side - Search, theme toggle, and notifications */}
					<div className="flex items-center space-x-4">
						{/* Search */}
						<div className="hidden md:block">
							<div className="relative">
								<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
									<Search 
										className="h-5 w-5"
										style={{ color: colors?.text.secondary || '#9CA3AF' }}
									/>
								</div>
								<input
									type="text"
									placeholder={user?.userType === 'employer' ? 'Search candidates...' : 'Search jobs...'}
									className="block w-full pl-10 pr-3 py-2 border rounded-md leading-5 placeholder-gray-500 focus:outline-none focus:ring-1 focus:border-blue-500 sm:text-sm transition-colors"
									style={{
										backgroundColor: colors?.surface || '#FFFFFF',
										borderColor: colors?.border || '#D1D5DB',
										color: colors?.text.primary || '#111827'
									}}
									onFocus={(e) => {
										e.currentTarget.style.borderColor = colors?.primary || '#3B82F6'
										e.currentTarget.style.boxShadow = `0 0 0 1px ${colors?.primary || '#3B82F6'}`
									}}
									onBlur={(e) => {
										e.currentTarget.style.borderColor = colors?.border || '#D1D5DB'
										e.currentTarget.style.boxShadow = 'none'
									}}
								/>
							</div>
						</div>

						{/* Theme Toggle */}
						<ThemeToggle variant="compact" showColorScheme={false} />

						{/* Notifications */}
						<button 
							className="p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 relative transition-colors"
							style={{
								color: colors?.text.secondary || '#9CA3AF',
								backgroundColor: 'transparent'
							}}
							onMouseEnter={(e) => {
								e.currentTarget.style.backgroundColor = colors?.hover || '#F3F4F6'
								e.currentTarget.style.color = colors?.text.primary || '#374151'
							}}
							onMouseLeave={(e) => {
								e.currentTarget.style.backgroundColor = 'transparent'
								e.currentTarget.style.color = colors?.text.secondary || '#9CA3AF'
							}}
						>
							<Bell className="h-6 w-6" />
							<span 
								className="absolute top-0 right-0 block h-2 w-2 rounded-full"
								style={{ 
									backgroundColor: '#EF4444',
									boxShadow: `0 0 0 2px ${colors?.background || '#FFFFFF'}`
								}}
							></span>
						</button>

						{/* Messages */}
						<button 
							className="p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors"
							style={{
								color: colors?.text.secondary || '#9CA3AF',
								backgroundColor: 'transparent'
							}}
							onMouseEnter={(e) => {
								e.currentTarget.style.backgroundColor = colors?.hover || '#F3F4F6'
								e.currentTarget.style.color = colors?.text.primary || '#374151'
							}}
							onMouseLeave={(e) => {
								e.currentTarget.style.backgroundColor = 'transparent'
								e.currentTarget.style.color = colors?.text.secondary || '#9CA3AF'
							}}
						>
							<MessageSquare className="h-6 w-6" />
						</button>
					</div>
				</div>
			</div>
		</header>
	)
}

export default DashboardTopBar 