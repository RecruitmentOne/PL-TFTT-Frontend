import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useBrand, useBrandColors } from '../../../brand/theme-provider'
import { useLanguage } from '../../../localization/hooks'
import type { SupportedLanguageKey } from '../../../localization/i18n-config'

interface LanguageSwitcherProps {
	variant?: 'dropdown' | 'buttons'
	size?: 'sm' | 'md' | 'lg'
	showFlag?: boolean
	showLabel?: boolean
	className?: string
}

export function LanguageSwitcher({
	variant = 'dropdown',
	size = 'md',
	showFlag = true,
	showLabel = true,
	className = ''
}: LanguageSwitcherProps) {
	const { t } = useTranslation()
	const { theme } = useBrand()
	const colors = useBrandColors()
	const { currentLanguage, availableLanguages, changeLanguage, isChanging } = useLanguage()
	const [isOpen, setIsOpen] = useState(false)

	const handleLanguageChange = async (langKey: SupportedLanguageKey) => {
		const success = await changeLanguage(langKey)
		if (success) {
			setIsOpen(false)
		}
	}

	// Size-based styling
	const sizeClasses = {
		sm: 'text-sm py-1 px-2',
		md: 'text-base py-2 px-3',
		lg: 'text-lg py-3 px-4'
	}

	if (variant === 'buttons') {
		return (
			<div className={`flex space-x-2 ${className}`}>
				{availableLanguages.map((lang) => (
					<button
						key={lang.key}
						onClick={() => handleLanguageChange(lang.key)}
						disabled={isChanging || lang.isCurrent}
						className={`
							${sizeClasses[size]}
							rounded-md font-medium transition-all duration-200
							border-2 border-transparent
							focus:outline-none focus:ring-2 focus:ring-offset-2
							disabled:opacity-50 disabled:cursor-not-allowed
							${lang.isCurrent
								? `bg-gradient-to-r from-[${colors.primary}] to-[${colors.secondary}] text-white`
								: `text-[${colors.text.primary}] hover:bg-[${colors.surface}] hover:border-[${colors.primary}]`
							}
						`}
						style={{
							backgroundColor: lang.isCurrent ? colors.primary : 'transparent',
							borderColor: lang.isCurrent ? colors.primary : colors.border,
							color: lang.isCurrent ? colors.text.inverse : colors.text.primary,
							'--brand-focus-ring-color': colors.primary
						} as React.CSSProperties}
					>
						{showFlag && <span className="mr-2">{lang.flag}</span>}
						{showLabel && <span>{lang.name}</span>}
					</button>
				))}
			</div>
		)
	}

	// Dropdown variant
	return (
		<div className={`relative inline-block text-left ${className}`}>
			{/* Trigger Button */}
			<button
				onClick={() => setIsOpen(!isOpen)}
				disabled={isChanging}
				className={`
					${sizeClasses[size]}
					inline-flex items-center justify-center
					rounded-md border-2 font-medium
					transition-all duration-200
					focus:outline-none focus:ring-2 focus:ring-offset-2
					disabled:opacity-50 disabled:cursor-not-allowed
					${showLabel ? 'min-w-[120px]' : 'w-10 h-8'}
				`}
				style={{
					backgroundColor: colors.surface,
					borderColor: colors.border,
					color: colors.text.primary,
					'--brand-focus-ring-color': colors.primary
				} as React.CSSProperties}
			>
				{showFlag && !showLabel ? (
					// Flag only mode - centered
					<span className="text-lg">{availableLanguages.find(l => l.isCurrent)?.flag}</span>
				) : (
					// Full mode with label
					<>
						<div className="flex items-center">
							{showFlag && (
								<span className="mr-2">{availableLanguages.find(l => l.isCurrent)?.flag}</span>
							)}
							{showLabel && (
								<span>{availableLanguages.find(l => l.isCurrent)?.name}</span>
							)}
						</div>
						
						{/* Dropdown Arrow */}
						<svg
							className={`ml-2 h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
						</svg>
					</>
				)}
			</button>

			{/* Dropdown Menu */}
			{isOpen && (
				<>
					{/* Backdrop */}
					<div
						className="fixed inset-0 z-10"
						onClick={() => setIsOpen(false)}
					/>
					
					{/* Menu - Emirates Style */}
					<div
						className="emirates-dropdown absolute right-0 z-20 mt-2 w-56 rounded-md overflow-hidden"
						style={{
							backgroundColor: colors.background,
							border: `1px solid ${colors.border}`,
							boxShadow: theme.shadows.lg,
							fontFamily: theme.typography.fontFamily.primary
						}}
					>
						<div className="py-2" role="menu">
							{/* Header */}
							<div 
								className="px-4 py-2 border-b"
								style={{ 
									borderColor: colors.border,
									backgroundColor: colors.surface 
								}}
							>
								<span 
									className="text-xs font-semibold uppercase tracking-wide"
									style={{ color: colors.text.secondary }}
								>
									{t('language.selectLanguage', 'Select Language')}
								</span>
							</div>
							
							{availableLanguages.map((lang) => (
								<button
									key={lang.key}
									onClick={() => handleLanguageChange(lang.key)}
									disabled={isChanging}
									className={`
										emirates-dropdown-item w-full text-left
										transition-all duration-200 ease-in-out
										disabled:opacity-50 disabled:cursor-not-allowed
										flex items-center justify-between
										${lang.isCurrent ? 'active' : ''}
									`}
									style={{
										backgroundColor: lang.isCurrent ? `${colors.primary}15` : 'transparent',
										borderLeft: `3px solid ${lang.isCurrent ? colors.primary : 'transparent'}`,
										color: lang.isCurrent ? colors.primary : colors.text.primary,
										fontWeight: lang.isCurrent ? theme.typography.fontWeight.semibold : theme.typography.fontWeight.normal
									}}
									onMouseEnter={(e) => {
										if (!lang.isCurrent && !isChanging) {
											e.currentTarget.style.backgroundColor = colors.surface
											e.currentTarget.style.borderLeftColor = colors.secondary
											e.currentTarget.style.color = colors.secondary
										}
									}}
									onMouseLeave={(e) => {
										if (!lang.isCurrent) {
											e.currentTarget.style.backgroundColor = 'transparent'
											e.currentTarget.style.borderLeftColor = 'transparent'
											e.currentTarget.style.color = colors.text.primary
										}
									}}
									role="menuitem"
								>
									<div className="flex items-center flex-1">
										{showFlag && (
											<span className="mr-3 text-lg leading-none">
												{lang.flag}
											</span>
										)}
										<div className="flex-1">
											<div className="font-medium leading-tight">
												{lang.name}
											</div>
											<div 
												className="text-xs opacity-75 leading-tight mt-0.5"
												style={{ color: colors.text.secondary }}
											>
												{lang.displayName}
											</div>
										</div>
									</div>
									
									{/* Status indicators */}
									<div className="flex items-center space-x-2">
										{isChanging && lang.key === currentLanguage && (
											<div className="animate-spin">
												<svg className="w-3 h-3" viewBox="0 0 24 24">
													<circle 
														className="opacity-25" 
														cx="12" cy="12" r="10" 
														stroke="currentColor" 
														strokeWidth="4" 
														fill="none"
													/>
													<path 
														className="opacity-75" 
														fill="currentColor" 
														d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
													/>
												</svg>
											</div>
										)}
										
										{lang.isCurrent && (
											<svg
												className="w-4 h-4"
												fill="currentColor"
												viewBox="0 0 20 20"
											>
												<path
													fillRule="evenodd"
													d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
													clipRule="evenodd"
												/>
											</svg>
										)}
									</div>
								</button>
							))}
							
							{/* Footer - Optional branding */}
							{availableLanguages.length > 2 && (
								<div 
									className="mt-2 pt-2 border-t px-4 py-2"
									style={{ 
										borderColor: colors.border,
										backgroundColor: colors.surface 
									}}
								>
									<span 
										className="text-xs"
										style={{ color: colors.text.secondary }}
									>
										{t('language.poweredByAI', 'Powered by AI Translation')}
									</span>
								</div>
							)}
						</div>
					</div>
				</>
			)}
		</div>
	)
}

// Compact version for headers/navigation
export function CompactLanguageSwitcher({ className = '' }: { className?: string }) {
	return (
		<LanguageSwitcher
			variant="dropdown"
			size="sm"
			showFlag={true}
			showLabel={false}
			className={`min-w-[2.5rem] ${className}`}
		/>
	)
}

// Full version with labels for settings pages
export function FullLanguageSwitcher({ className = '' }: { className?: string }) {
	return (
		<LanguageSwitcher
			variant="buttons"
			size="md"
			showFlag={true}
			showLabel={true}
			className={className}
		/>
	)
} 