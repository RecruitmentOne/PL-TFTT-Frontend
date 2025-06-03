import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useBrand, useBrandColors } from '../../brand'
import { CompactEmiratesStyleSwitcher } from '../brand/language-switcher/emirates-style-switcher'
import { BrandLogo } from '../brand/brand-logo'

function PublicHeader() {
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const location = useLocation()
	const { t } = useTranslation()
	const { isTeamsVariant } = useBrand()
	const colors = useBrandColors()

	// Define brand-specific color schemes matching hero section
	const brandColors = {
		teams: {
			primary: '#F47E22',      // Orange (Teams Primary)
			secondary: '#FACAA5',    // Light Orange (Teams Secondary)
			tertiary: '#FF6B35',     // Accent Orange
		},
		talent: {
			primary: '#478CCA',      // Blue (Talent Primary)
			secondary: '#22C2EA',    // Cyan (Talent Secondary)
			tertiary: '#5B9BD5',     // Accent Blue
		}
	}

	const navigation = [
		{ name: t('nav.home'), href: '/', type: 'general' },
		{ name: t('nav.about', 'About'), href: '/about', type: 'general' },
		{ name: t('nav.presentation', 'Presentation'), href: '/project-presentation', type: 'general' },
		{ name: t('nav.forTalent', 'For Talent'), href: '/for-talent', type: 'talent' },
		{ name: t('nav.forTeams', 'For Teams'), href: '/teams', type: 'teams' },
		{ name: t('nav.contact', 'Contact'), href: '/contact', type: 'general' },
	]

	const isActive = (path: string) => {
		return location.pathname === path
	}

	// Get contextual color for navigation item
	const getNavItemColor = (item: typeof navigation[0], isActiveItem: boolean) => {
		if (isActiveItem) {
			switch (item.type) {
				case 'talent':
					return brandColors.talent.primary
				case 'teams':
					return brandColors.teams.primary
				default:
					return colors.primary
			}
		}
		return colors.text.secondary
	}

	// Get hover color for navigation item
	const getNavItemHoverColor = (item: typeof navigation[0]) => {
		switch (item.type) {
			case 'talent':
				return brandColors.talent.primary
			case 'teams':
				return brandColors.teams.primary
			default:
				return colors.primary
		}
	}

	return (
		<header className="bg-brand-background shadow-brand-sm border-b border-brand sticky top-0 z-40 backdrop-blur-md">
			{/* Enhanced background with subtle gradient */}
			<div className="absolute inset-0 opacity-30" 
				style={{
					background: `linear-gradient(90deg, ${brandColors.talent.primary}05 0%, transparent 30%, transparent 70%, ${brandColors.teams.primary}05 100%)`
				}}></div>
			
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
				<div className="flex justify-between items-center h-16">
					{/* Logo with Brand Variant */}
					<div className="flex-shrink-0">
						<Link to="/" className="flex items-center group">
							<BrandLogo variant="full" size="md" />
							{/* Subtle glow effect on hover */}
							<div className="absolute -inset-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
								style={{ 
									background: `linear-gradient(45deg, ${brandColors.talent.primary}10, ${brandColors.teams.primary}10)`,
									filter: 'blur(8px)',
									zIndex: -1
								}}></div>
						</Link>
					</div>

					{/* Desktop Navigation - Center */}
					<nav className="hidden md:flex space-x-6 flex-1 justify-center">
						{navigation.map((item) => {
							const isActiveItem = isActive(item.href)
							const activeColor = getNavItemColor(item, isActiveItem)
							const hoverColor = getNavItemHoverColor(item)
							
							return (
								<Link
									key={item.name}
									to={item.href}
									className="nav-link text-sm whitespace-nowrap font-medium transition-all duration-300 relative group px-3 py-2 rounded-lg"
									style={{
										color: activeColor,
										transform: isActiveItem ? 'translateY(-1px)' : 'translateY(0)'
									}}
									onMouseEnter={(e) => {
										if (!isActiveItem) {
											e.currentTarget.style.color = hoverColor
											e.currentTarget.style.transform = 'translateY(-1px)'
										}
									}}
									onMouseLeave={(e) => {
										if (!isActiveItem) {
											e.currentTarget.style.color = colors.text.secondary
											e.currentTarget.style.transform = 'translateY(0)'
										}
									}}
								>
									{item.name}
									{/* Active indicator */}
									{isActiveItem && (
										<div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full animate-pulse"
											style={{ backgroundColor: activeColor }}></div>
									)}
									{/* Hover indicator */}
									<div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 group-hover:w-full transition-all duration-300 rounded-full"
										style={{ backgroundColor: hoverColor }}></div>
								</Link>
							)
						})}
					</nav>

					{/* Right Side Actions */}
					<div className="flex items-center space-x-2">
						{/* Language Switcher - Fixed Width */}
						<div className="hidden sm:block">
							<div className="w-10 flex justify-center">
								<CompactEmiratesStyleSwitcher />
							</div>
						</div>

						{/* CTA Buttons - Desktop */}
						<div className="hidden lg:flex items-center space-x-3 ml-4">
							{/* Talent Login Button */}
							<Link
								to="/login/talent"
								className="btn btn-secondary text-sm px-4 py-2 whitespace-nowrap rounded-lg font-medium transition-all duration-300 hover:transform hover:scale-105 relative group overflow-hidden"
								style={{
									backgroundColor: `${brandColors.talent.primary}10`,
									color: brandColors.talent.primary,
									borderColor: brandColors.talent.primary,
									border: `2px solid ${brandColors.talent.primary}`,
									boxShadow: `0 2px 8px ${brandColors.talent.primary}20`
								}}
								onMouseEnter={(e) => {
									e.currentTarget.style.backgroundColor = brandColors.talent.primary
									e.currentTarget.style.color = colors.text.inverse
									e.currentTarget.style.boxShadow = `0 4px 16px ${brandColors.talent.primary}40`
								}}
								onMouseLeave={(e) => {
									e.currentTarget.style.backgroundColor = `${brandColors.talent.primary}10`
									e.currentTarget.style.color = brandColors.talent.primary
									e.currentTarget.style.boxShadow = `0 2px 8px ${brandColors.talent.primary}20`
								}}
							>
								{t('auth.loginAsTalent', 'Login as Talent')}
								{/* Ripple effect */}
								<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
							</Link>
							
							{/* Team Login Button */}
							<Link
								to="/login/team"
								className="btn btn-primary text-sm px-4 py-2 whitespace-nowrap rounded-lg font-medium transition-all duration-300 hover:transform hover:scale-105 relative group overflow-hidden"
								style={{
									backgroundColor: brandColors.teams.primary,
									color: colors.text.inverse,
									borderColor: brandColors.teams.primary,
									border: `2px solid ${brandColors.teams.primary}`,
									boxShadow: `0 2px 8px ${brandColors.teams.primary}20`
								}}
								onMouseEnter={(e) => {
									e.currentTarget.style.backgroundColor = brandColors.teams.secondary
									e.currentTarget.style.borderColor = brandColors.teams.secondary
									e.currentTarget.style.boxShadow = `0 4px 16px ${brandColors.teams.primary}40`
									e.currentTarget.style.transform = 'scale(1.05) translateY(-1px)'
								}}
								onMouseLeave={(e) => {
									e.currentTarget.style.backgroundColor = brandColors.teams.primary
									e.currentTarget.style.borderColor = brandColors.teams.primary
									e.currentTarget.style.boxShadow = `0 2px 8px ${brandColors.teams.primary}20`
									e.currentTarget.style.transform = 'scale(1) translateY(0)'
								}}
							>
								{t('auth.loginAsTeam', 'Login as Team')}
								{/* Ripple effect */}
								<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
							</Link>
						</div>

						{/* Mobile menu button */}
						<button
							onClick={() => setIsMenuOpen(!isMenuOpen)}
							className="md:hidden inline-flex items-center justify-center p-2 rounded-md transition-all duration-300 relative"
							style={{
								color: colors.text.secondary,
								backgroundColor: 'transparent'
							}}
							onMouseEnter={(e) => {
								e.currentTarget.style.color = colors.primary
								e.currentTarget.style.backgroundColor = colors.surface
								e.currentTarget.style.transform = 'scale(1.05)'
							}}
							onMouseLeave={(e) => {
								e.currentTarget.style.color = colors.text.secondary
								e.currentTarget.style.backgroundColor = 'transparent'
								e.currentTarget.style.transform = 'scale(1)'
							}}
							aria-expanded={isMenuOpen}
							aria-label={t('nav.openMenu', 'Open main menu')}
						>
							{!isMenuOpen ? (
								<svg
									className="block h-6 w-6 transition-transform duration-300"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									aria-hidden="true"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M4 6h16M4 12h16M4 18h16"
									/>
								</svg>
							) : (
								<svg
									className="block h-6 w-6 transition-transform duration-300 rotate-90"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									aria-hidden="true"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M6 18L18 6M6 6l12 12"
									/>
								</svg>
							)}
						</button>
					</div>
				</div>
			</div>

			{/* Enhanced Mobile menu */}
			{isMenuOpen && (
				<div className="md:hidden bg-brand-background border-t border-brand backdrop-blur-md relative">
					{/* Background enhancement */}
					<div className="absolute inset-0 opacity-20" 
						style={{
							background: `linear-gradient(135deg, ${brandColors.talent.primary}05 0%, transparent 50%, ${brandColors.teams.primary}05 100%)`
						}}></div>
					
					<div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 relative">
						{navigation.map((item) => {
							const isActiveItem = isActive(item.href)
							const activeColor = getNavItemColor(item, isActiveItem)
							const hoverColor = getNavItemHoverColor(item)
							
							return (
								<Link
									key={item.name}
									to={item.href}
									className="nav-link block px-3 py-2 rounded-md text-base font-medium transition-all duration-300 relative"
									style={{
										color: activeColor,
										backgroundColor: isActiveItem ? `${activeColor}10` : 'transparent'
									}}
									onMouseEnter={(e) => {
										if (!isActiveItem) {
											e.currentTarget.style.color = hoverColor
											e.currentTarget.style.backgroundColor = `${hoverColor}10`
										}
									}}
									onMouseLeave={(e) => {
										if (!isActiveItem) {
											e.currentTarget.style.color = colors.text.secondary
											e.currentTarget.style.backgroundColor = 'transparent'
										}
									}}
									onClick={() => setIsMenuOpen(false)}
								>
									{item.name}
									{/* Active indicator for mobile */}
									{isActiveItem && (
										<div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-6 rounded-r-full"
											style={{ backgroundColor: activeColor }}></div>
									)}
								</Link>
							)
						})}
						
						{/* Mobile Language Switcher */}
						<div className="px-3 py-2 border-t border-brand mt-2 pt-4">
							<div className="flex items-center justify-between">
								<span className="text-sm font-medium text-brand-text-primary">
									{t('language.switch', 'Language')}
								</span>
								<CompactEmiratesStyleSwitcher />
							</div>
						</div>
						
						{/* Enhanced Mobile CTA Buttons */}
						<div className="px-3 pt-4 pb-3 border-t border-brand">
							<div className="space-y-3">
								{/* Talent Login Button - Mobile */}
								<Link
									to="/login/talent"
									className="btn btn-secondary w-full text-center block py-3 rounded-lg font-medium transition-all duration-300 relative group overflow-hidden"
									style={{
										backgroundColor: `${brandColors.talent.primary}10`,
										color: brandColors.talent.primary,
										borderColor: brandColors.talent.primary,
										border: `2px solid ${brandColors.talent.primary}`,
										boxShadow: `0 2px 8px ${brandColors.talent.primary}20`
									}}
									onMouseEnter={(e) => {
										e.currentTarget.style.backgroundColor = brandColors.talent.primary
										e.currentTarget.style.color = colors.text.inverse
									}}
									onMouseLeave={(e) => {
										e.currentTarget.style.backgroundColor = `${brandColors.talent.primary}10`
										e.currentTarget.style.color = brandColors.talent.primary
									}}
									onClick={() => setIsMenuOpen(false)}
								>
									{t('auth.loginAsTalent', 'Login as Talent')}
									{/* Mobile ripple effect */}
									<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
								</Link>
								
								{/* Team Login Button - Mobile */}
								<Link
									to="/login/team"
									className="btn btn-primary w-full text-center block py-3 rounded-lg font-medium transition-all duration-300 relative group overflow-hidden"
									style={{
										backgroundColor: brandColors.teams.primary,
										color: colors.text.inverse,
										borderColor: brandColors.teams.primary,
										border: `2px solid ${brandColors.teams.primary}`,
										boxShadow: `0 2px 8px ${brandColors.teams.primary}20`
									}}
									onMouseEnter={(e) => {
										e.currentTarget.style.backgroundColor = brandColors.teams.secondary
										e.currentTarget.style.borderColor = brandColors.teams.secondary
									}}
									onMouseLeave={(e) => {
										e.currentTarget.style.backgroundColor = brandColors.teams.primary
										e.currentTarget.style.borderColor = brandColors.teams.primary
									}}
									onClick={() => setIsMenuOpen(false)}
								>
									{t('auth.loginAsTeam', 'Login as Team')}
									{/* Mobile ripple effect */}
									<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
								</Link>
							</div>
						</div>
					</div>
				</div>
			)}
		</header>
	)
}

export default PublicHeader 