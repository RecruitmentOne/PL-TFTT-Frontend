import { useBrand, useBrandColors } from '../../brand'
import TfttWhiteTextLogo from '../../assets/images/Logos/TFTT White Text logo.png'
import TfttBlackTextLogo from '../../assets/images/Logos/TFTT Black Text Logo.png'
import TfttWhiteFavicon from '../../assets/images/Favicon/TFTT Favicon White BackGround.png'
import TfttBlackFavicon from '../../assets/images/Favicon/TFTT Favicon Black BackGround.png'

interface BrandLogoProps {
	variant?: 'full' | 'icon'
	size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
	className?: string
	onClick?: () => void
}

export function BrandLogo({ 
	variant = 'full', 
	size = 'md', 
	className = '',
	onClick 
}: BrandLogoProps) {
	const { isDarkMode, currentVariant } = useBrand()
	const colors = useBrandColors()

	// Size mappings
	const sizeClasses = {
		xs: variant === 'full' ? 'h-6' : 'h-4 w-4',
		sm: variant === 'full' ? 'h-8' : 'h-6 w-6',
		md: variant === 'full' ? 'h-10' : 'h-8 w-8',
		lg: variant === 'full' ? 'h-12' : 'h-10 w-10',
		xl: variant === 'full' ? 'h-16' : 'h-12 w-12'
	}

	// Choose the appropriate logo based on theme
	const logoSrc = variant === 'full' 
		? (isDarkMode ? TfttWhiteTextLogo : TfttBlackTextLogo)
		: (isDarkMode ? TfttWhiteFavicon : TfttWhiteFavicon) // Use white favicon for icon variant

	// Fallback: Create text-based logo if images fail to load
	const FallbackLogo = () => (
		<div 
			className={`flex items-center ${className}`}
			onClick={onClick}
			style={{ cursor: onClick ? 'pointer' : 'default' }}
		>
			{variant === 'full' ? (
				<>
					<div 
						className={`rounded-lg flex items-center justify-center mr-2 ${
							size === 'xs' ? 'w-6 h-6' :
							size === 'sm' ? 'w-8 h-8' :
							size === 'md' ? 'w-10 h-10' :
							size === 'lg' ? 'w-12 h-12' :
							'w-16 h-16'
						}`}
						style={{ backgroundColor: colors.primary }}
					>
						<span 
							className={`text-white font-bold font-brand ${
								size === 'xs' ? 'text-xs' :
								size === 'sm' ? 'text-sm' :
								size === 'md' ? 'text-lg' :
								size === 'lg' ? 'text-xl' :
								'text-2xl'
							}`}
						>
							{currentVariant === 'teams' ? 'T' : 'F'}
						</span>
					</div>
					<span 
						className={`font-bold font-brand ${
							size === 'xs' ? 'text-sm' :
							size === 'sm' ? 'text-lg' :
							size === 'md' ? 'text-xl' :
							size === 'lg' ? 'text-2xl' :
							'text-3xl'
						}`}
						style={{ color: colors.text.primary }}
					>
						TFTT
					</span>
				</>
			) : (
				<div 
					className={`rounded-lg flex items-center justify-center ${sizeClasses[size]}`}
					style={{ backgroundColor: colors.primary }}
				>
					<span 
						className={`text-white font-bold font-brand ${
							size === 'xs' ? 'text-xs' :
							size === 'sm' ? 'text-sm' :
							size === 'md' ? 'text-lg' :
							size === 'lg' ? 'text-xl' :
							'text-2xl'
						}`}
					>
						{currentVariant === 'teams' ? 'T' : 'F'}
					</span>
				</div>
			)}
		</div>
	)

	return (
		<div 
			className={`flex items-center ${className}`}
			onClick={onClick}
			style={{ cursor: onClick ? 'pointer' : 'default' }}
		>
			<img 
				src={logoSrc}
				alt="TFTT Platform Logo"
				className={`${sizeClasses[size]} object-contain`}
				onError={(e) => {
					// Hide the image and show fallback
					e.currentTarget.style.display = 'none'
					e.currentTarget.nextElementSibling?.removeAttribute('style')
				}}
			/>
			{/* Fallback logo - hidden by default */}
			<div style={{ display: 'none' }}>
				<FallbackLogo />
			</div>
		</div>
	)
}

// Specialized components for common use cases
export function BrandLogoFull(props: Omit<BrandLogoProps, 'variant'>) {
	return <BrandLogo {...props} variant="full" />
}

export function BrandLogoIcon(props: Omit<BrandLogoProps, 'variant'>) {
	return <BrandLogo {...props} variant="icon" />
} 