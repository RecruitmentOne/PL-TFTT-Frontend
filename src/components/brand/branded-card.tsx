import React from 'react'
import { useBrandColors } from '../../brand'

interface BrandedCardProps {
	children: React.ReactNode
	className?: string
	style?: React.CSSProperties
	variant?: 'default' | 'elevated' | 'outlined' | 'surface' | 'primary' | 'secondary'
	padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
	radius?: 'sm' | 'md' | 'lg' | 'full'
	shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
	interactive?: boolean
	onClick?: () => void
}

export function BrandedCard({
	children,
	className = '',
	style = {},
	variant = 'default',
	padding = 'md',
	radius = 'lg',
	shadow = 'md',
	interactive = false,
	onClick,
	...props
}: BrandedCardProps) {
	const colors = useBrandColors()
	
	const getBackgroundColor = () => {
		switch (variant) {
			case 'default':
				return colors.background
			case 'elevated':
				return colors.background
			case 'outlined':
				return colors.background
			case 'surface':
				return colors.surface
			case 'primary':
				return colors.primary
			case 'secondary':
				return colors.secondary
			default:
				return colors.background
		}
	}
	
	const getBorderStyle = () => {
		switch (variant) {
			case 'outlined':
				return `1px solid ${colors.border}`
			case 'primary':
			case 'secondary':
				return 'none'
			default:
				return 'none'
		}
	}
	
	const getPadding = () => {
		const paddings = {
			none: '0',
			sm: 'var(--brand-spacing-sm)',
			md: 'var(--brand-spacing-md)',
			lg: 'var(--brand-spacing-lg)',
			xl: 'var(--brand-spacing-xl)'
		}
		return paddings[padding]
	}
	
	const getBorderRadius = () => {
		const radiuses = {
			sm: 'var(--brand-radius-sm)',
			md: 'var(--brand-radius-md)',
			lg: 'var(--brand-radius-lg)',
			full: 'var(--brand-radius-full)'
		}
		return radiuses[radius]
	}
	
	const getBoxShadow = () => {
		if (shadow === 'none') return 'none'
		const shadows = {
			sm: 'var(--brand-shadow-sm)',
			md: 'var(--brand-shadow-md)',
			lg: 'var(--brand-shadow-lg)',
			xl: 'var(--brand-shadow-xl)'
		}
		return shadows[shadow]
	}
	
	const combinedStyle = {
		backgroundColor: getBackgroundColor(),
		border: getBorderStyle(),
		padding: getPadding(),
		borderRadius: getBorderRadius(),
		boxShadow: getBoxShadow(),
		transition: interactive ? 'transform 0.2s ease, box-shadow 0.2s ease' : 'none',
		cursor: interactive || onClick ? 'pointer' : 'default',
		...style
	}
	
	const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
		if (interactive || onClick) {
			e.currentTarget.style.transform = 'translateY(-2px)'
			if (shadow !== 'none') {
				e.currentTarget.style.boxShadow = 'var(--brand-shadow-xl)'
			}
		}
	}
	
	const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
		if (interactive || onClick) {
			e.currentTarget.style.transform = 'translateY(0)'
			e.currentTarget.style.boxShadow = getBoxShadow()
		}
	}

	return (
		<div
			className={`brand-card ${className}`}
			style={combinedStyle}
			onClick={onClick}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			{...props}
		>
			{children}
		</div>
	)
}

// Specific card variants
export function FeatureCard({ children, className = '', ...props }: Omit<BrandedCardProps, 'variant'>) {
	return (
		<BrandedCard
			variant="elevated"
			padding="lg"
			shadow="md"
			interactive
			className={`feature-card ${className}`}
			{...props}
		>
			{children}
		</BrandedCard>
	)
}

export function StatsCard({ children, className = '', ...props }: Omit<BrandedCardProps, 'variant' | 'padding'>) {
	return (
		<BrandedCard
			variant="surface"
			padding="lg"
			shadow="sm"
			className={`stats-card ${className}`}
			{...props}
		>
			{children}
		</BrandedCard>
	)
}

export function TestimonialCard({ children, className = '', ...props }: Omit<BrandedCardProps, 'variant'>) {
	return (
		<BrandedCard
			variant="default"
			padding="xl"
			shadow="lg"
			interactive
			className={`testimonial-card ${className}`}
			{...props}
		>
			{children}
		</BrandedCard>
	)
}

export function PricingCard({ children, className = '', featured = false, ...props }: Omit<BrandedCardProps, 'variant'> & { featured?: boolean }) {
	return (
		<BrandedCard
			variant={featured ? 'primary' : 'outlined'}
			padding="xl"
			shadow={featured ? 'xl' : 'md'}
			interactive
			className={`pricing-card ${featured ? 'featured' : ''} ${className}`}
			{...props}
		>
			{children}
		</BrandedCard>
	)
} 