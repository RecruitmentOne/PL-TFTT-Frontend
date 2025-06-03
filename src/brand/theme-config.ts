import type { 
	BrandTheme, 
	BrandVariant, 
	ThemeMode, 
	ColorScheme,
	ExtendedBrandColors,
	BrandAnimations,
	AdvancedBrandTheme 
} from './brand-types'

// Enhanced Brand Color Specifications with Dark Mode Support
const brandColors = {
	teams: {
		light: {
			primary: '#F47E22',      // Orange (Teams Primary)
			secondary: '#FACAA5',    // light (Teams Secondary/Links)
			tertiary: '#FF6B35',     // Accent Orange
			background: '#FFFFFF',   // White
			surface: '#F8F9FA',      // Light Gray Surface
			surfaceVariant: '#F1F3F4', // Subtle Surface Variant
			text: {
				primary: '#393841',   // Dark Gray (Main Text)
				secondary: '#6B7280', // Medium Gray (Secondary Text)
				tertiary: '#9CA3AF',  // Light Gray (Tertiary Text)
				inverse: '#FFFFFF',   // White (Text on colored backgrounds)
				disabled: '#D1D5DB'   // Disabled Text
			},
			border: '#E5E7EB',       // Light Border
			borderFocus: '#F47E22',  // Focus Border (Teams Primary)
			shadow: 'rgba(0, 0, 0, 0.1)', // Subtle Shadow
			// Status colors
			success: '#10B981',
			warning: '#F59E0B',
			error: '#EF4444',
			info: '#3B82F6',
			// Interactive states
			hover: '#FEF3E2',       // Light Orange Hover
			active: '#FED7AA',      // Orange Active
			disabled: '#F3F4F6',    // Disabled Background
			// Gradients
			gradients: {
				primary: 'linear-gradient(135deg, #F47E22 0%, #FF6B35 100%)',
				secondary: 'linear-gradient(135deg, #22C2EA 0%, #06B6D4 100%)',
				accent: 'linear-gradient(135deg, #F47E22 0%, #22C2EA 100%)'
			}
		},
		dark: {
			primary: '#FF8F40',      // Lighter Orange for dark mode
			secondary: '#FACAA5',    // Lighter Orange for dark mode
			tertiary: '#FFB366',     // Lighter Accent Orange
			background: '#0F1419',   // Dark Background
			surface: '#1A1F2E',      // Dark Surface
			surfaceVariant: '#252A3A', // Dark Surface Variant
			text: {
				primary: '#F9FAFB',   // Light Gray (Main Text)
				secondary: '#D1D5DB', // Medium Gray (Secondary Text)
				tertiary: '#9CA3AF',  // Darker Gray (Tertiary Text)
				inverse: '#111827',   // Dark (Text on light backgrounds)
				disabled: '#6B7280'   // Disabled Text
			},
			border: '#374151',       // Dark Border
			borderFocus: '#FF8F40',  // Focus Border (Teams Primary Dark)
			shadow: 'rgba(0, 0, 0, 0.4)', // Stronger Shadow for dark
			// Status colors (adjusted for dark mode)
			success: '#34D399',
			warning: '#FBBF24',
			error: '#F87171',
			info: '#60A5FA',
			// Interactive states
			hover: '#2A1A0F',       // Dark Orange Hover
			active: '#3D2317',      // Dark Orange Active
			disabled: '#1F2937',    // Dark Disabled Background
			// Gradients (adjusted for dark mode)
			gradients: {
				primary: 'linear-gradient(135deg, #FF8F40 0%, #FFB366 100%)',
				secondary: 'linear-gradient(135deg, #4DD4F0 0%, #22D3EE 100%)',
				accent: 'linear-gradient(135deg, #FF8F40 0%, #4DD4F0 100%)'
			}
		}
	},
	talent: {
		light: {
			primary: '#478CCA',      // Blue (Talent Primary)
			secondary: '#22C2EA',    // Cyan (Talent Secondary/Links)
			tertiary: '#5B9BD5',     // Accent Blue
			background: '#FFFFFF',   // White
			surface: '#F8F9FA',      // Light Gray Surface
			surfaceVariant: '#F1F3F4', // Subtle Surface Variant
			text: {
				primary: '#393841',   // Dark Gray (Main Text)
				secondary: '#6B7280', // Medium Gray (Secondary Text)
				tertiary: '#9CA3AF',  // Light Gray (Tertiary Text)
				inverse: '#FFFFFF',   // White (Text on colored backgrounds)
				disabled: '#D1D5DB'   // Disabled Text
			},
			border: '#E5E7EB',       // Light Border
			borderFocus: '#478CCA',  // Focus Border (Talent Primary)
			shadow: 'rgba(0, 0, 0, 0.1)', // Subtle Shadow
			// Status colors
			success: '#10B981',
			warning: '#F59E0B',
			error: '#EF4444',
			info: '#3B82F6',
			// Interactive states
			hover: '#EBF4FF',       // Light Blue Hover
			active: '#DBEAFE',      // Blue Active
			disabled: '#F3F4F6',    // Disabled Background
			// Gradients
			gradients: {
				primary: 'linear-gradient(135deg, #478CCA 0%, #5B9BD5 100%)',
				secondary: 'linear-gradient(135deg, #22C2EA 0%, #06B6D4 100%)',
				accent: 'linear-gradient(135deg, #478CCA 0%, #22C2EA 100%)'
			}
		},
		dark: {
			primary: '#60A5FA',      // Lighter Blue for dark mode
			secondary: '#4DD4F0',    // Lighter Cyan for dark mode
			tertiary: '#7CB9E8',     // Lighter Accent Blue
			background: '#0F1419',   // Dark Background
			surface: '#1A1F2E',      // Dark Surface
			surfaceVariant: '#252A3A', // Dark Surface Variant
			text: {
				primary: '#F9FAFB',   // Light Gray (Main Text)
				secondary: '#D1D5DB', // Medium Gray (Secondary Text)
				tertiary: '#9CA3AF',  // Darker Gray (Tertiary Text)
				inverse: '#111827',   // Dark (Text on light backgrounds)
				disabled: '#6B7280'   // Disabled Text
			},
			border: '#374151',       // Dark Border
			borderFocus: '#60A5FA',  // Focus Border (Talent Primary Dark)
			shadow: 'rgba(0, 0, 0, 0.4)', // Stronger Shadow for dark
			// Status colors (adjusted for dark mode)
			success: '#34D399',
			warning: '#FBBF24',
			error: '#F87171',
			info: '#60A5FA',
			// Interactive states
			hover: '#1E293B',       // Dark Blue Hover
			active: '#334155',      // Dark Blue Active
			disabled: '#1F2937',    // Dark Disabled Background
			// Gradients (adjusted for dark mode)
			gradients: {
				primary: 'linear-gradient(135deg, #60A5FA 0%, #7CB9E8 100%)',
				secondary: 'linear-gradient(135deg, #4DD4F0 0%, #22D3EE 100%)',
				accent: 'linear-gradient(135deg, #60A5FA 0%, #4DD4F0 100%)'
			}
		}
	}
}

// High contrast color schemes
const highContrastColors = {
	teams: {
		light: {
			...brandColors.teams.light,
			primary: '#E55100',      // Higher contrast orange
			text: {
				primary: '#000000',   // Pure black for maximum contrast
				secondary: '#424242', // Darker gray
				tertiary: '#757575',  // Medium gray
				inverse: '#FFFFFF',
				disabled: '#BDBDBD'
			},
			border: '#757575',       // Darker border
			background: '#FFFFFF',
			surface: '#FAFAFA'
		},
		dark: {
			...brandColors.teams.dark,
			primary: '#FFB74D',      // Higher contrast orange for dark
			text: {
				primary: '#FFFFFF',   // Pure white for maximum contrast
				secondary: '#E0E0E0', // Lighter gray
				tertiary: '#BDBDBD',  // Medium gray
				inverse: '#000000',
				disabled: '#757575'
			},
			border: '#BDBDBD',       // Lighter border
			background: '#000000',   // Pure black
			surface: '#121212'       // Very dark surface
		}
	},
	talent: {
		light: {
			...brandColors.talent.light,
			primary: '#1565C0',      // Higher contrast blue
			text: {
				primary: '#000000',
				secondary: '#424242',
				tertiary: '#757575',
				inverse: '#FFFFFF',
				disabled: '#BDBDBD'
			},
			border: '#757575',
			background: '#FFFFFF',
			surface: '#FAFAFA'
		},
		dark: {
			...brandColors.talent.dark,
			primary: '#64B5F6',      // Higher contrast blue for dark
			text: {
				primary: '#FFFFFF',
				secondary: '#E0E0E0',
				tertiary: '#BDBDBD',
				inverse: '#000000',
				disabled: '#757575'
			},
			border: '#BDBDBD',
			background: '#000000',
			surface: '#121212'
		}
	}
}

// Animation configurations
const animations: BrandAnimations = {
	timing: {
		fast: '150ms',
		normal: '300ms',
		slow: '500ms',
		slower: '700ms'
	},
	easing: {
		ease: 'ease',
		easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
		easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
		easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
		bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
	},
	durations: {
		transition: '300ms',
		hover: '150ms',
		focus: '200ms',
		modal: '400ms',
		page: '500ms'
	},
	transitions: {
		smooth: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
		colors: 'color 200ms ease, background-color 200ms ease, border-color 200ms ease',
		transform: 'transform 300ms cubic-bezier(0.4, 0, 0.2, 1)',
		opacity: 'opacity 200ms ease'
	}
}

// Typography configuration (Avenir Next)
const typography = {
	fontFamily: {
		primary: 'Avenir Next, system-ui, -apple-system, sans-serif',
		fallback: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
	},
	fontSize: {
		xs: '0.75rem',    // 12px
		sm: '0.875rem',   // 14px
		base: '1rem',     // 16px
		lg: '1.125rem',   // 18px
		xl: '1.25rem',    // 20px
		'2xl': '1.5rem',  // 24px
		'3xl': '1.875rem', // 30px
		'4xl': '2.25rem'  // 36px
	},
	fontWeight: {
		light: 300,
		normal: 400,
		medium: 500,
		semibold: 600,
		bold: 700
	},
	lineHeight: {
		tight: '1.25',
		normal: '1.5',
		relaxed: '1.75'
	}
}

// Enhanced spacing system
const spacing = {
	xs: '0.5rem',    // 8px
	sm: '0.75rem',   // 12px
	md: '1rem',      // 16px
	lg: '1.5rem',    // 24px
	xl: '2rem',      // 32px
	'2xl': '3rem',   // 48px
	'3xl': '4rem',   // 64px
	'4xl': '5rem'    // 80px
}

// Enhanced border radius
const borderRadius = {
	none: '0',
	sm: '0.375rem',  // 6px
	md: '0.5rem',    // 8px
	lg: '0.75rem',   // 12px
	xl: '1rem',      // 16px
	full: '9999px'   // Full rounded
}

// Enhanced shadows with dark mode variants
const shadows = {
	light: {
		none: 'none',
		sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
		md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
		lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
		xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
		inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
		glow: '0 0 20px rgba(244, 126, 34, 0.3)' // Brand glow effect
	},
	dark: {
		none: 'none',
		sm: '0 1px 2px 0 rgba(0, 0, 0, 0.3)',
		md: '0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.3)',
		lg: '0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -2px rgba(0, 0, 0, 0.4)',
		xl: '0 20px 25px -5px rgba(0, 0, 0, 0.6), 0 10px 10px -5px rgba(0, 0, 0, 0.5)',
		inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.4)',
		glow: '0 0 20px rgba(255, 143, 64, 0.4)' // Adjusted glow for dark mode
	}
}

// Enhanced theme factory function
export function getTheme(
	variant: BrandVariant, 
	mode: ThemeMode = 'light', 
	colorScheme: ColorScheme = 'default'
): BrandTheme {
	const isDark = mode === 'dark'
	const isHighContrast = colorScheme === 'high-contrast'
	
	let colors: ExtendedBrandColors
	
	if (isHighContrast) {
		colors = highContrastColors[variant][isDark ? 'dark' : 'light'] as ExtendedBrandColors
	} else {
		colors = brandColors[variant][isDark ? 'dark' : 'light'] as ExtendedBrandColors
	}
	
	return {
		variant,
		colors,
		typography,
		spacing,
		borderRadius,
		shadows: isDark ? shadows.dark : shadows.light
	}
}

// Advanced theme factory function
export function getAdvancedTheme(
	variant: BrandVariant,
	mode: ThemeMode = 'light',
	colorScheme: ColorScheme = 'default'
): AdvancedBrandTheme {
	const baseTheme = getTheme(variant, mode, colorScheme)
	const isDark = mode === 'dark'
	
	return {
		variant,
		mode,
		colorScheme,
		colors: baseTheme.colors as ExtendedBrandColors,
		typography,
		spacing,
		borderRadius,
		shadows: isDark ? shadows.dark : shadows.light,
		animations,
		breakpoints: {
			sm: '640px',
			md: '768px',
			lg: '1024px',
			xl: '1280px',
			'2xl': '1536px'
		},
		accessibility: {
			reducedMotion: false,
			highContrast: colorScheme === 'high-contrast',
			largeText: false
		}
	}
}

// Enhanced CSS Custom Properties Generator
export function generateCSSVariables(
	theme: BrandTheme | AdvancedBrandTheme, 
	isDark: boolean = false
): Record<string, string> {
	const variables: Record<string, string> = {
		// Brand Colors
		'--brand-primary': theme.colors.primary,
		'--brand-secondary': theme.colors.secondary,
		'--brand-background': theme.colors.background,
		'--brand-surface': theme.colors.surface,
		'--brand-text-primary': theme.colors.text.primary,
		'--brand-text-secondary': theme.colors.text.secondary,
		'--brand-text-inverse': theme.colors.text.inverse,
		'--brand-border': theme.colors.border,
		'--brand-shadow': theme.colors.shadow,
		
		// Typography
		'--brand-font-primary': theme.typography.fontFamily.primary,
		'--brand-font-fallback': theme.typography.fontFamily.fallback,
		
		// Spacing
		'--brand-spacing-xs': theme.spacing.xs,
		'--brand-spacing-sm': theme.spacing.sm,
		'--brand-spacing-md': theme.spacing.md,
		'--brand-spacing-lg': theme.spacing.lg,
		'--brand-spacing-xl': theme.spacing.xl,
		'--brand-spacing-2xl': theme.spacing['2xl'],
		
		// Border Radius
		'--brand-radius-sm': theme.borderRadius.sm,
		'--brand-radius-md': theme.borderRadius.md,
		'--brand-radius-lg': theme.borderRadius.lg,
		'--brand-radius-full': theme.borderRadius.full,
		
		// Shadows
		'--brand-shadow-sm': theme.shadows.sm,
		'--brand-shadow-md': theme.shadows.md,
		'--brand-shadow-lg': theme.shadows.lg,
		'--brand-shadow-xl': theme.shadows.xl
	}
	
	// Add extended properties if available
	if ('tertiary' in theme.colors) {
		const extendedColors = theme.colors as ExtendedBrandColors
		variables['--brand-tertiary'] = extendedColors.tertiary || extendedColors.primary
		variables['--brand-surface-variant'] = extendedColors.surfaceVariant || extendedColors.surface
		variables['--brand-text-tertiary'] = extendedColors.text.tertiary || extendedColors.text.secondary
		variables['--brand-text-disabled'] = extendedColors.text.disabled || extendedColors.text.secondary
		variables['--brand-border-focus'] = extendedColors.borderFocus || extendedColors.primary
		
		// Status colors
		variables['--brand-success'] = extendedColors.success
		variables['--brand-warning'] = extendedColors.warning
		variables['--brand-error'] = extendedColors.error
		variables['--brand-info'] = extendedColors.info
		
		// Interactive states
		variables['--brand-hover'] = extendedColors.hover
		variables['--brand-active'] = extendedColors.active
		variables['--brand-disabled'] = extendedColors.disabled
		
		// Gradients
		if (extendedColors.gradients) {
			variables['--brand-gradient-primary'] = extendedColors.gradients.primary
			variables['--brand-gradient-secondary'] = extendedColors.gradients.secondary
			if (extendedColors.gradients.accent) {
				variables['--brand-gradient-accent'] = extendedColors.gradients.accent
			}
		}
	}
	
	// Add animation properties if available
	if ('animations' in theme) {
		const advancedTheme = theme as AdvancedBrandTheme
		variables['--brand-transition-smooth'] = advancedTheme.animations.transitions.smooth
		variables['--brand-transition-colors'] = advancedTheme.animations.transitions.colors
		variables['--brand-transition-transform'] = advancedTheme.animations.transitions.transform
		variables['--brand-transition-opacity'] = advancedTheme.animations.transitions.opacity
	}
	
	return variables
}

// Default theme (Teams variant, light mode)
export const defaultTheme = getTheme('teams')

// Brand-aware utility classes generator with dark mode support
export function generateBrandUtilities(theme: BrandTheme, isDark: boolean = false): string {
	return `
		/* Theme Mode Class */
		.theme-${isDark ? 'dark' : 'light'} {
			color-scheme: ${isDark ? 'dark' : 'light'};
		}
		
		/* Brand Text Colors */
		.text-brand-primary { color: ${theme.colors.primary}; }
		.text-brand-secondary { color: ${theme.colors.secondary}; }
		.text-brand-text-primary { color: ${theme.colors.text.primary}; }
		.text-brand-text-secondary { color: ${theme.colors.text.secondary}; }
		.text-brand-text-inverse { color: ${theme.colors.text.inverse}; }
		
		/* Brand Background Colors */
		.bg-brand-primary { background-color: ${theme.colors.primary}; }
		.bg-brand-secondary { background-color: ${theme.colors.secondary}; }
		.bg-brand-surface { background-color: ${theme.colors.surface}; }
		.bg-brand-background { background-color: ${theme.colors.background}; }
		
		/* Brand Border Colors */
		.border-brand-primary { border-color: ${theme.colors.primary}; }
		.border-brand-secondary { border-color: ${theme.colors.secondary}; }
		.border-brand { border-color: ${theme.colors.border}; }
		
		/* Enhanced Interactive Elements */
		.brand-card {
			background: ${theme.colors.surface};
			border: 1px solid ${theme.colors.border};
			border-radius: ${theme.borderRadius.lg};
			box-shadow: ${theme.shadows.md};
			transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
		}
		
		.brand-card:hover {
			box-shadow: ${theme.shadows.lg};
			transform: translateY(-2px);
		}
		
		.brand-button {
			background: ${theme.colors.primary};
			color: ${theme.colors.text.inverse};
			border-radius: ${theme.borderRadius.md};
			font-family: ${theme.typography.fontFamily.primary};
			font-weight: ${theme.typography.fontWeight.medium};
			transition: all 200ms ease;
		}
		
		.brand-button:hover {
			transform: translateY(-1px);
			box-shadow: ${theme.shadows.lg};
		}
		
		/* Dark Mode Specific Styles */
		${isDark ? `
			.brand-glow {
				box-shadow: 0 0 20px rgba(255, 143, 64, 0.3);
			}
			
			.brand-surface-elevated {
				background: ${theme.colors.surface};
				border: 1px solid rgba(255, 255, 255, 0.1);
			}
		` : `
			.brand-glow {
				box-shadow: 0 0 20px rgba(244, 126, 34, 0.2);
			}
			
			.brand-surface-elevated {
				background: ${theme.colors.surface};
				border: 1px solid ${theme.colors.border};
			}
		`}
		
		/* Typography */
		.font-brand { font-family: ${theme.typography.fontFamily.primary}; }
		
		/* Animations */
		.brand-transition { transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1); }
		.brand-transition-fast { transition: all 150ms ease; }
		.brand-transition-slow { transition: all 500ms ease; }
		
		/* Accessibility */
		@media (prefers-reduced-motion: reduce) {
			.brand-transition,
			.brand-transition-fast,
			.brand-transition-slow,
			.brand-card,
			.brand-button {
				transition: none !important;
				animation: none !important;
			}
		}
		
		/* Focus States */
		.brand-focus:focus,
		.brand-focus:focus-visible {
			outline: 2px solid ${theme.colors.primary};
			outline-offset: 2px;
		}
	`
} 