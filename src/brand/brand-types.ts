export type BrandVariant = 'teams' | 'talent'
export type ThemeMode = 'light' | 'dark' | 'auto'
export type ColorScheme = 'default' | 'high-contrast' | 'colorblind-friendly'

export interface ExtendedBrandColors {
	primary: string
	secondary: string
	tertiary?: string
	background: string
	surface: string
	surfaceVariant?: string
	text: {
		primary: string
		secondary: string
		tertiary?: string
		inverse: string
		disabled?: string
	}
	border: string
	borderFocus?: string
	shadow: string
	// Status colors
	success: string
	warning: string
	error: string
	info: string
	// Interactive states
	hover: string
	active: string
	disabled: string
	// Gradients
	gradients?: {
		primary: string
		secondary: string
		accent?: string
	}
}

export interface BrandColors {
	primary: string
	secondary: string
	background: string
	surface: string
	text: {
		primary: string
		secondary: string
		inverse: string
	}
	border: string
	shadow: string
}

export interface BrandTypography {
	fontFamily: {
		primary: string
		fallback: string
		mono?: string
	}
	fontSize: {
		xs: string
		sm: string
		base: string
		lg: string
		xl: string
		'2xl': string
		'3xl': string
		'4xl': string
		'5xl'?: string
		'6xl'?: string
	}
	fontWeight: {
		light: number
		normal: number
		medium: number
		semibold: number
		bold: number
		extrabold?: number
	}
	lineHeight: {
		tight: string
		normal: string
		relaxed: string
		loose?: string
	}
	letterSpacing?: {
		tight: string
		normal: string
		wide: string
	}
}

export interface AdvancedSpacing {
	xs: string
	sm: string
	md: string
	lg: string
	xl: string
	'2xl': string
	'3xl'?: string
	'4xl'?: string
	// Component specific spacing
	component?: {
		button: string
		input: string
		card: string
		modal: string
	}
}

export interface BrandAnimations {
	timing: {
		fast: string
		normal: string
		slow: string
		slower: string
	}
	easing: {
		ease: string
		easeIn: string
		easeOut: string
		easeInOut: string
		bounce: string
	}
	durations: {
		transition: string
		hover: string
		focus: string
		modal: string
		page: string
	}
	transitions: {
		smooth: string
		colors: string
		transform: string
		opacity: string
	}
	keyframes?: Record<string, string>
}

export interface BrandBreakpoints {
	sm: string
	md: string
	lg: string
	xl: string
	'2xl': string
}

export interface AdvancedBrandTheme {
	variant: BrandVariant
	mode: ThemeMode
	colorScheme: ColorScheme
	colors: ExtendedBrandColors
	typography: BrandTypography
	spacing: AdvancedSpacing
	borderRadius: {
		none: string
		sm: string
		md: string
		lg: string
		xl: string
		full: string
	}
	shadows: {
		none: string
		sm: string
		md: string
		lg: string
		xl: string
		inner: string
		glow?: string
	}
	animations: BrandAnimations
	breakpoints: BrandBreakpoints
	// Accessibility features
	accessibility?: {
		reducedMotion: boolean
		highContrast: boolean
		largeText: boolean
	}
}

export interface BrandTheme {
	variant: BrandVariant
	colors: BrandColors
	typography: BrandTypography
	spacing: {
		xs: string
		sm: string
		md: string
		lg: string
		xl: string
		'2xl': string
	}
	borderRadius: {
		sm: string
		md: string
		lg: string
		full: string
	}
	shadows: {
		sm: string
		md: string
		lg: string
		xl: string
	}
}

export interface BrandContextType {
	currentVariant: BrandVariant
	theme: BrandTheme
	advancedTheme?: AdvancedBrandTheme
	mode: ThemeMode
	colorScheme: ColorScheme
	switchVariant: (variant: BrandVariant) => void
	switchMode: (mode: ThemeMode) => void
	switchColorScheme: (scheme: ColorScheme) => void
	isTeamsVariant: boolean
	isTalentVariant: boolean
	isDarkMode: boolean
	isHighContrast: boolean
}

export interface MarketingTarget {
	region: string
	isPrimary: boolean
	forTeams: boolean
	forTalent: boolean
}

export const SUPPORTED_MARKETS: MarketingTarget[] = [
	{ region: 'Germany', isPrimary: true, forTeams: true, forTalent: true },
	{ region: 'Switzerland', isPrimary: true, forTeams: true, forTalent: true },
	{ region: 'Austria', isPrimary: false, forTeams: false, forTalent: true },
	{ region: 'Slovakia', isPrimary: false, forTeams: false, forTalent: true },
	{ region: 'Czech Republic', isPrimary: false, forTeams: false, forTalent: true },
	{ region: 'Hungary', isPrimary: false, forTeams: false, forTalent: true },
	{ region: 'Bulgaria', isPrimary: false, forTeams: false, forTalent: true },
	{ region: 'Poland', isPrimary: false, forTeams: false, forTalent: true },
	{ region: 'Romania', isPrimary: false, forTeams: false, forTalent: true }
]

// Theme preference detection
export const getSystemThemePreference = (): ThemeMode => {
	if (typeof window === 'undefined') return 'light'
	return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

// Accessibility preference detection
export const getAccessibilityPreferences = () => {
	if (typeof window === 'undefined') {
		return {
			reducedMotion: false,
			highContrast: false,
			largeText: false
		}
	}

	return {
		reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
		highContrast: window.matchMedia('(prefers-contrast: high)').matches,
		largeText: window.matchMedia('(min-resolution: 192dpi)').matches
	}
} 