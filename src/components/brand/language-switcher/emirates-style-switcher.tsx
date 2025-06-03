import React, { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useBrand, useBrandColors } from '../../../brand/theme-provider'
import { useLanguage } from '../../../localization/hooks'
import type { SupportedLanguageKey } from '../../../localization/i18n-config'

interface EmiratesStyleSwitcherProps {
	className?: string
}

export function EmiratesStyleSwitcher({ className = '' }: EmiratesStyleSwitcherProps) {
	const { t } = useTranslation()
	const colors = useBrandColors()
	const { currentLanguage, availableLanguages, changeLanguage, isChanging } = useLanguage()
	const [isOpen, setIsOpen] = useState(false)
	const dropdownRef = useRef<HTMLDivElement>(null)

	// Close dropdown when clicking outside
	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
				setIsOpen(false)
			}
		}

		document.addEventListener('mousedown', handleClickOutside)
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [])

	// Get current language country code
	const getCurrentCountryCode = () => {
		const currentLang = availableLanguages.find(l => l.isCurrent)
		if (currentLang?.key === 'en') return 'US'
		if (currentLang?.key === 'de') return 'DE'
		return 'US' // fallback
	}

	// Get country flag based on language
	const getCountryFlag = (langKey: SupportedLanguageKey) => {
		if (langKey === 'en') return '🇺🇸'
		if (langKey === 'de') return '🇩🇪'
		return '🇺🇸'
	}

	// Get country name based on language
	const getCountryName = (langKey: SupportedLanguageKey) => {
		if (langKey === 'en') return 'United States'
		if (langKey === 'de') return 'Germany'
		return 'United States'
	}

	const handleLanguageChange = async (langKey: SupportedLanguageKey) => {
		const success = await changeLanguage(langKey)
		if (success) {
			setIsOpen(false)
		}
	}

	return (
		<div className={`relative ${className}`} ref={dropdownRef}>
			{/* Emirates-style trigger button */}
			<button
				onClick={() => setIsOpen(!isOpen)}
				disabled={isChanging}
				className="
					inline-flex items-center justify-center
					h-8 px-2 min-w-[2.5rem]
					text-sm font-medium
					transition-all duration-200
					hover:bg-opacity-10 hover:bg-gray-500
					focus:outline-none focus:ring-2 focus:ring-offset-2
					disabled:opacity-50 disabled:cursor-not-allowed
					rounded-md
				"
				style={{
					color: colors.text.primary,
					'--brand-focus-ring-color': colors.primary
				} as React.CSSProperties}
				aria-label={t('language.switch', 'Switch language')}
				aria-expanded={isOpen}
			>
				<span className="font-medium tracking-wide">
					{getCurrentCountryCode()}
				</span>
				
				{/* Small dropdown arrow */}
				<svg
					className={`ml-1 h-3 w-3 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
					strokeWidth={2.5}
				>
					<path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
				</svg>
			</button>

			{/* Dropdown menu */}
			{isOpen && (
				<div
					className="absolute right-0 z-50 mt-2 w-64 rounded-lg shadow-xl border"
					style={{
						backgroundColor: colors.background,
						borderColor: colors.border,
						boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
					}}
				>
					{/* Header */}
					<div 
						className="px-4 py-3 border-b"
						style={{ borderColor: colors.border }}
					>
						<h3 
							className="text-sm font-semibold"
							style={{ color: colors.text.primary }}
						>
							{t('language.switch', 'Select your country/region')}
						</h3>
					</div>

					{/* Language options */}
					<div className="py-2">
						{availableLanguages.map((lang) => {
							const countryName = getCountryName(lang.key)
							const flag = getCountryFlag(lang.key)
							
							return (
								<button
									key={lang.key}
									onClick={() => handleLanguageChange(lang.key)}
									disabled={isChanging}
									className={`
										w-full text-left px-4 py-3
										transition-colors duration-150
										disabled:opacity-50 disabled:cursor-not-allowed
										flex items-center space-x-3
										hover:bg-opacity-5 hover:bg-gray-500
										${lang.isCurrent ? 'bg-opacity-5 bg-gray-500' : ''}
									`}
									style={{
										backgroundColor: lang.isCurrent ? colors.surface : 'transparent'
									}}
								>
									{/* Flag */}
									<span className="text-xl flex-shrink-0">
										{flag}
									</span>
									
									{/* Country and language info */}
									<div className="flex-grow min-w-0">
										<div 
											className={`text-sm ${lang.isCurrent ? 'font-semibold' : 'font-medium'}`}
											style={{ 
												color: lang.isCurrent ? colors.primary : colors.text.primary 
											}}
										>
											{countryName}
										</div>
										<div 
											className="text-xs mt-0.5"
											style={{ color: colors.text.secondary }}
										>
											{lang.displayName}
										</div>
									</div>
									
									{/* Current indicator */}
									{lang.isCurrent && (
										<div className="flex-shrink-0">
											<svg
												className="w-4 h-4"
												fill="currentColor"
												viewBox="0 0 20 20"
												style={{ color: colors.primary }}
											>
												<path
													fillRule="evenodd"
													d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
													clipRule="evenodd"
												/>
											</svg>
										</div>
									)}
								</button>
							)
						})}
					</div>

					{/* Footer note */}
					<div 
						className="px-4 py-3 border-t"
						style={{ borderColor: colors.border }}
					>
						<p 
							className="text-xs"
							style={{ color: colors.text.secondary }}
						>
							{t('language.note', 'Choose your preferred language and region for the best experience')}
						</p>
					</div>
				</div>
			)}
		</div>
	)
}

// Compact version for navigation bars (like Emirates)
export function CompactEmiratesStyleSwitcher({ className = '' }: { className?: string }) {
	return (
		<EmiratesStyleSwitcher className={`${className}`} />
	)
} 