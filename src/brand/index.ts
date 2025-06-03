// Brand system exports
export type { 
	BrandVariant, 
	BrandTheme, 
	BrandColors,
	ExtendedBrandColors,
	BrandTypography,
	ThemeMode,
	ColorScheme,
	BrandContextType,
	BrandAnimations,
	AdvancedBrandTheme
} from './brand-types'

export { SUPPORTED_MARKETS } from './brand-types'

export { 
	getTheme, 
	getAdvancedTheme,
	generateCSSVariables, 
	generateBrandUtilities,
	defaultTheme 
} from './theme-config'

export { 
	BrandProvider, 
	useBrand, 
	useBrandColors, 
	useBrandTypography, 
	useIsBrandVariant,
	useAdvancedTheme,
	useBrandAnimations,
	BrandVariant as BrandVariantComponent, 
	withBrand 
} from './theme-provider' 