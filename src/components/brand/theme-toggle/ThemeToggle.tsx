import { useState, useEffect } from 'react'
import { Sun, Moon, Monitor, Palette, Eye } from 'lucide-react'
import { useBrand, useBrandColors, useBrandAnimations } from '../../../brand'
import type { ThemeMode, ColorScheme } from '../../../brand/brand-types'

interface ThemeToggleProps {
	variant?: 'button' | 'dropdown' | 'compact'
	showColorScheme?: boolean
	className?: string
}

export function ThemeToggle({ 
	variant = 'dropdown', 
	showColorScheme = true,
	className = '' 
}: ThemeToggleProps) {
	const { mode, colorScheme, switchMode, switchColorScheme, isDarkMode } = useBrand()
	const colors = useBrandColors()
	const animations = useBrandAnimations()
	const [isOpen, setIsOpen] = useState(false)
	const [mounted, setMounted] = useState(false)

	// Ensure component is mounted before showing to prevent hydration issues
	useEffect(() => {
		setMounted(true)
	}, [])

	if (!mounted) {
		return (
			<div 
				className={`w-10 h-10 rounded-lg animate-pulse ${className}`}
				style={{ backgroundColor: colors.surface }}
			/>
		)
	}

	const themeOptions = [
		{
			mode: 'light' as ThemeMode,
			icon: Sun,
			label: 'Light Theme',
			description: 'Clean and bright interface'
		},
		{
			mode: 'dark' as ThemeMode,
			icon: Moon,
			label: 'Dark Theme',
			description: 'Easy on the eyes'
		},
		{
			mode: 'auto' as ThemeMode,
			icon: Monitor,
			label: 'System Theme',
			description: 'Follows your device settings'
		}
	]

	const colorSchemeOptions = [
		{
			scheme: 'default' as ColorScheme,
			icon: Palette,
			label: 'Default Colors',
			description: 'Standard color palette'
		},
		{
			scheme: 'high-contrast' as ColorScheme,
			icon: Eye,
			label: 'High Contrast',
			description: 'Enhanced accessibility'
		},
		{
			scheme: 'colorblind-friendly' as ColorScheme,
			icon: Palette,
			label: 'Colorblind Friendly',
			description: 'Optimized for color vision'
		}
	]

	const currentThemeOption = themeOptions.find(option => option.mode === mode)
	const currentColorSchemeOption = colorSchemeOptions.find(option => option.scheme === colorScheme)
	const CurrentIcon = currentThemeOption?.icon || Sun

	// Compact button variant (just icon)
	if (variant === 'button') {
		return (
			<button
				onClick={() => {
					const nextMode = mode === 'light' ? 'dark' : mode === 'dark' ? 'auto' : 'light'
					switchMode(nextMode)
				}}
				className={`group relative w-10 h-10 rounded-lg transition-all duration-200 flex items-center justify-center ${className}`}
				style={{
					backgroundColor: colors.surface,
					borderColor: colors.border,
					color: colors.text.primary
				}}
				onMouseEnter={(e) => {
					e.currentTarget.style.backgroundColor = colors.hover
					e.currentTarget.style.transform = 'scale(1.05)'
				}}
				onMouseLeave={(e) => {
					e.currentTarget.style.backgroundColor = colors.surface
					e.currentTarget.style.transform = 'scale(1)'
				}}
				title={`Current: ${currentThemeOption?.label} - Click to cycle themes`}
			>
				<CurrentIcon className="w-5 h-5 transition-transform duration-200 group-hover:scale-110" />
			</button>
		)
	}

	// Compact dropdown variant
	if (variant === 'compact') {
		return (
			<div className={`relative ${className}`}>
				<button
					onClick={() => setIsOpen(!isOpen)}
					className="group w-10 h-10 rounded-lg transition-all duration-200 flex items-center justify-center border"
					style={{
						backgroundColor: colors.surface,
						borderColor: colors.border,
						color: colors.text.primary
					}}
					onMouseEnter={(e) => {
						e.currentTarget.style.backgroundColor = colors.hover
						e.currentTarget.style.borderColor = colors.primary
					}}
					onMouseLeave={(e) => {
						e.currentTarget.style.backgroundColor = colors.surface
						e.currentTarget.style.borderColor = colors.border
					}}
				>
					<CurrentIcon className="w-5 h-5 transition-transform duration-200 group-hover:scale-110" />
				</button>

				{isOpen && (
					<>
						{/* Backdrop */}
						<div 
							className="fixed inset-0 z-40"
							onClick={() => setIsOpen(false)}
						/>
						
						{/* Dropdown */}
						<div 
							className="absolute right-0 top-12 w-64 rounded-lg border shadow-lg z-50 p-2 animate-in slide-in-from-top-2 duration-200"
							style={{
								backgroundColor: colors.surface,
								borderColor: colors.border,
								boxShadow: colors.shadow
							}}
						>
							<div className="space-y-1">
								{themeOptions.map((option) => {
									const IconComponent = option.icon
									const isSelected = option.mode === mode
									
									return (
										<button
											key={option.mode}
											onClick={() => {
												switchMode(option.mode)
												setIsOpen(false)
											}}
											className="w-full p-3 rounded-md transition-all duration-150 flex items-center space-x-3 text-left"
											style={{
												backgroundColor: isSelected ? `${colors.primary}15` : 'transparent',
												color: isSelected ? colors.primary : colors.text.primary
											}}
											onMouseEnter={(e) => {
												if (!isSelected) {
													e.currentTarget.style.backgroundColor = colors.hover
												}
											}}
											onMouseLeave={(e) => {
												if (!isSelected) {
													e.currentTarget.style.backgroundColor = 'transparent'
												}
											}}
										>
											<IconComponent className="w-5 h-5 flex-shrink-0" />
											<div>
												<div className="font-medium text-sm">{option.label}</div>
												<div 
													className="text-xs"
													style={{ color: colors.text.secondary }}
												>
													{option.description}
												</div>
											</div>
										</button>
									)
								})}
							</div>
						</div>
					</>
				)}
			</div>
		)
	}

	// Full dropdown variant (default)
	return (
		<div className={`relative ${className}`}>
			<button
				onClick={() => setIsOpen(!isOpen)}
				className="group flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 border"
				style={{
					backgroundColor: colors.surface,
					borderColor: colors.border,
					color: colors.text.primary
				}}
				onMouseEnter={(e) => {
					e.currentTarget.style.backgroundColor = colors.hover
					e.currentTarget.style.borderColor = colors.primary
				}}
				onMouseLeave={(e) => {
					e.currentTarget.style.backgroundColor = colors.surface
					e.currentTarget.style.borderColor = colors.border
				}}
			>
				<CurrentIcon className="w-4 h-4" />
				<span className="text-sm font-medium hidden sm:inline">
					{currentThemeOption?.label}
				</span>
				<svg 
					className="w-4 h-4 transition-transform duration-200"
					style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
					fill="none" 
					stroke="currentColor" 
					viewBox="0 0 24 24"
				>
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
				</svg>
			</button>

			{isOpen && (
				<>
					{/* Backdrop */}
					<div 
						className="fixed inset-0 z-40"
						onClick={() => setIsOpen(false)}
					/>
					
					{/* Dropdown */}
					<div 
						className="absolute right-0 top-12 w-80 rounded-lg border shadow-lg z-50 p-4 animate-in slide-in-from-top-2 duration-200"
						style={{
							backgroundColor: colors.surface,
							borderColor: colors.border,
							boxShadow: colors.shadow
						}}
					>
						{/* Theme Mode Section */}
						<div className="mb-6">
							<h3 
								className="text-sm font-semibold mb-3"
								style={{ color: colors.text.primary }}
							>
								Theme Mode
							</h3>
							<div className="space-y-1">
								{themeOptions.map((option) => {
									const IconComponent = option.icon
									const isSelected = option.mode === mode
									
									return (
										<button
											key={option.mode}
											onClick={() => {
												switchMode(option.mode)
											}}
											className="w-full p-3 rounded-md transition-all duration-150 flex items-center space-x-3 text-left"
											style={{
												backgroundColor: isSelected ? `${colors.primary}15` : 'transparent',
												color: isSelected ? colors.primary : colors.text.primary
											}}
											onMouseEnter={(e) => {
												if (!isSelected) {
													e.currentTarget.style.backgroundColor = colors.hover
												}
											}}
											onMouseLeave={(e) => {
												if (!isSelected) {
													e.currentTarget.style.backgroundColor = 'transparent'
												}
											}}
										>
											<IconComponent className="w-5 h-5 flex-shrink-0" />
											<div>
												<div className="font-medium text-sm">{option.label}</div>
												<div 
													className="text-xs"
													style={{ color: colors.text.secondary }}
												>
													{option.description}
												</div>
											</div>
											{isSelected && (
												<div 
													className="ml-auto w-2 h-2 rounded-full"
													style={{ backgroundColor: colors.primary }}
												/>
											)}
										</button>
									)
								})}
							</div>
						</div>

						{/* Color Scheme Section */}
						{showColorScheme && (
							<div>
								<h3 
									className="text-sm font-semibold mb-3"
									style={{ color: colors.text.primary }}
								>
									Color Scheme
								</h3>
								<div className="space-y-1">
									{colorSchemeOptions.map((option) => {
										const IconComponent = option.icon
										const isSelected = option.scheme === colorScheme
										
										return (
											<button
												key={option.scheme}
												onClick={() => {
													switchColorScheme(option.scheme)
												}}
												className="w-full p-3 rounded-md transition-all duration-150 flex items-center space-x-3 text-left"
												style={{
													backgroundColor: isSelected ? `${colors.secondary}15` : 'transparent',
													color: isSelected ? colors.secondary : colors.text.primary
												}}
												onMouseEnter={(e) => {
													if (!isSelected) {
														e.currentTarget.style.backgroundColor = colors.hover
													}
												}}
												onMouseLeave={(e) => {
													if (!isSelected) {
														e.currentTarget.style.backgroundColor = 'transparent'
													}
												}}
											>
												<IconComponent className="w-5 h-5 flex-shrink-0" />
												<div>
													<div className="font-medium text-sm">{option.label}</div>
													<div 
														className="text-xs"
														style={{ color: colors.text.secondary }}
													>
														{option.description}
													</div>
												</div>
												{isSelected && (
													<div 
														className="ml-auto w-2 h-2 rounded-full"
														style={{ backgroundColor: colors.secondary }}
													/>
												)}
											</button>
										)
									})}
								</div>
							</div>
						)}

						{/* Current Status */}
						<div 
							className="mt-4 pt-4 border-t text-xs"
							style={{ 
								borderColor: colors.border,
								color: colors.text.secondary 
							}}
						>
							Currently using {currentThemeOption?.label.toLowerCase()} 
							{isDarkMode ? ' (dark)' : ' (light)'} with {currentColorSchemeOption?.label.toLowerCase()}
						</div>
					</div>
				</>
			)}
		</div>
	)
}

export default ThemeToggle 