import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import type { BrandContextType, BrandVariant, ThemeMode, ColorScheme, ExtendedBrandColors } from './brand-types'
import { getTheme, getAdvancedTheme, generateCSSVariables, defaultTheme } from './theme-config'

// Create the brand context
const BrandContext = createContext<BrandContextType | undefined>(undefined)

interface BrandProviderProps {
	children: ReactNode
	initialVariant?: BrandVariant
}

// Local storage keys for persisting preferences
const BRAND_VARIANT_STORAGE_KEY = 'tftt-brand-variant'
const THEME_MODE_STORAGE_KEY = 'tftt-theme-mode'
const COLOR_SCHEME_STORAGE_KEY = 'tftt-color-scheme'

export function BrandProvider({ children, initialVariant = 'teams' }: BrandProviderProps) {
	// Initialize state with stored variant or initial variant
	const [currentVariant, setCurrentVariant] = useState<BrandVariant>(() => {
		if (typeof window !== 'undefined') {
			const stored = localStorage.getItem(BRAND_VARIANT_STORAGE_KEY)
			if (stored === 'teams' || stored === 'talent') {
				return stored
			}
		}
		return initialVariant
	})

	// Initialize theme mode
	const [mode, setMode] = useState<ThemeMode>(() => {
		if (typeof window !== 'undefined') {
			const stored = localStorage.getItem(THEME_MODE_STORAGE_KEY)
			if (stored === 'light' || stored === 'dark' || stored === 'auto') {
				return stored
			}
		}
		return 'light'
	})

	// Initialize color scheme
	const [colorScheme, setColorScheme] = useState<ColorScheme>(() => {
		if (typeof window !== 'undefined') {
			const stored = localStorage.getItem(COLOR_SCHEME_STORAGE_KEY)
			if (stored === 'default' || stored === 'high-contrast' || stored === 'colorblind-friendly') {
				return stored
			}
		}
		return 'default'
	})

	// Determine if dark mode should be active
	const isDarkMode = mode === 'dark' || (mode === 'auto' && typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches)
	const isHighContrast = colorScheme === 'high-contrast'

	// Get theme with proper mode and color scheme
	const theme = getTheme(currentVariant, isDarkMode ? 'dark' : 'light', colorScheme)
	const advancedTheme = getAdvancedTheme(currentVariant, isDarkMode ? 'dark' : 'light', colorScheme)

	// Function to switch brand variants
	const switchVariant = (variant: BrandVariant) => {
		setCurrentVariant(variant)
		if (typeof window !== 'undefined') {
			localStorage.setItem(BRAND_VARIANT_STORAGE_KEY, variant)
		}
	}

	// Function to switch theme mode
	const switchMode = (newMode: ThemeMode) => {
		setMode(newMode)
		if (typeof window !== 'undefined') {
			localStorage.setItem(THEME_MODE_STORAGE_KEY, newMode)
		}
	}

	// Function to switch color scheme
	const switchColorScheme = (scheme: ColorScheme) => {
		setColorScheme(scheme)
		if (typeof window !== 'undefined') {
			localStorage.setItem(COLOR_SCHEME_STORAGE_KEY, scheme)
		}
	}

	// Apply CSS custom properties to document root
	useEffect(() => {
		if (typeof window !== 'undefined') {
			const root = document.documentElement
			const cssVariables = generateCSSVariables(advancedTheme, isDarkMode)
			
			// Apply all CSS variables to root
			Object.entries(cssVariables).forEach(([property, value]) => {
				root.style.setProperty(property, value)
			})

			// Add brand variant class to body for additional styling
			document.body.classList.remove('brand-teams', 'brand-talent')
			document.body.classList.add(`brand-${currentVariant}`)

			// Add theme mode classes
			document.body.classList.remove('theme-light', 'theme-dark')
			document.body.classList.add(`theme-${isDarkMode ? 'dark' : 'light'}`)

			// Add color scheme classes
			document.body.classList.remove('scheme-default', 'scheme-high-contrast', 'scheme-colorblind-friendly')
			document.body.classList.add(`scheme-${colorScheme}`)

			// Set color-scheme property for proper browser defaults
			root.style.setProperty('color-scheme', isDarkMode ? 'dark' : 'light')
		}
	}, [advancedTheme, currentVariant, isDarkMode, colorScheme])

	// Listen for system theme changes when in auto mode
	useEffect(() => {
		if (mode === 'auto' && typeof window !== 'undefined') {
			const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
			
			const handleChange = () => {
				// Force re-render when system preference changes
				setMode('auto')
			}
			
			mediaQuery.addEventListener('change', handleChange)
			return () => mediaQuery.removeEventListener('change', handleChange)
		}
	}, [mode])

	// Preload Avenir Next font
	useEffect(() => {
		if (typeof window !== 'undefined') {
			// Create link element for font preloading if not already present
			const existing = document.head.querySelector('link[href*="avenir"]')
			if (!existing) {
				const link = document.createElement('link')
				link.rel = 'preload'
				link.href = 'https://fonts.googleapis.com/css2?family=Avenir+Next:wght@300;400;500;600;700&display=swap'
				link.as = 'style'
				link.onload = () => {
					// Convert to stylesheet after preload
					link.rel = 'stylesheet'
				}
				document.head.appendChild(link)
			}
		}
	}, [])

	const contextValue: BrandContextType = {
		currentVariant,
		theme,
		advancedTheme,
		mode,
		colorScheme,
		switchVariant,
		switchMode,
		switchColorScheme,
		isTeamsVariant: currentVariant === 'teams',
		isTalentVariant: currentVariant === 'talent',
		isDarkMode,
		isHighContrast
	}

	return (
		<BrandContext.Provider value={contextValue}>
			{children}
		</BrandContext.Provider>
	)
}

// Custom hook to use brand context
export function useBrand(): BrandContextType {
	const context = useContext(BrandContext)
	if (context === undefined) {
		throw new Error('useBrand must be used within a BrandProvider')
	}
	return context
}

// Hook to get current brand colors
export function useBrandColors(): ExtendedBrandColors {
	const { advancedTheme } = useBrand()
	return advancedTheme?.colors || {
		primary: '#F47E22',
		secondary: '#22C2EA',
		tertiary: '#FF6B35',
		background: '#FFFFFF',
		surface: '#F8F9FA',
		surfaceVariant: '#F1F3F4',
		text: {
			primary: '#393841',
			secondary: '#6B7280',
			tertiary: '#9CA3AF',
			inverse: '#FFFFFF',
			disabled: '#D1D5DB'
		},
		border: '#E5E7EB',
		borderFocus: '#F47E22',
		shadow: 'rgba(0, 0, 0, 0.1)',
		success: '#10B981',
		warning: '#F59E0B',
		error: '#EF4444',
		info: '#3B82F6',
		hover: '#FEF3E2',
		active: '#FED7AA',
		disabled: '#F3F4F6',
		gradients: {
			primary: 'linear-gradient(135deg, #F47E22 0%, #FF6B35 100%)',
			secondary: 'linear-gradient(135deg, #22C2EA 0%, #06B6D4 100%)',
			accent: 'linear-gradient(135deg, #F47E22 0%, #22C2EA 100%)'
		}
	}
}

// Hook to get current brand typography
export function useBrandTypography() {
	const { theme } = useBrand()
	return theme.typography
}

// Hook to check if current variant matches
export function useIsBrandVariant(variant: BrandVariant): boolean {
	const { currentVariant } = useBrand()
	return currentVariant === variant
}

// Hook to get advanced theme features
export function useAdvancedTheme() {
	const { advancedTheme } = useBrand()
	return advancedTheme
}

// Hook to get animation configurations
export function useBrandAnimations() {
	const { advancedTheme } = useBrand()
	return advancedTheme?.animations
}

// Component to conditionally render based on brand variant
interface BrandVariantProps {
	variant: BrandVariant | BrandVariant[]
	children: ReactNode
	fallback?: ReactNode
}

export function BrandVariant({ variant, children, fallback = null }: BrandVariantProps) {
	const { currentVariant } = useBrand()
	
	const shouldRender = Array.isArray(variant) 
		? variant.includes(currentVariant)
		: variant === currentVariant
		
	return shouldRender ? <>{children}</> : <>{fallback}</>
}

// Higher-order component for brand-aware components
export function withBrand<P extends object>(
	Component: React.ComponentType<P>
) {
	return function BrandAwareComponent(props: P) {
		const brandContext = useBrand()
		return <Component {...props} brand={brandContext} />
	}
} 