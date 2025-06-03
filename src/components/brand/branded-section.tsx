import React from 'react'
import { useBrandColors } from '../../brand'

interface BrandedSectionProps {
	children: React.ReactNode
	className?: string
	style?: React.CSSProperties
	variant?: 'default' | 'surface' | 'primary' | 'secondary' | 'gradient'
	padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
	maxWidth?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '7xl' | 'full'
	centered?: boolean
	id?: string
}

export function BrandedSection({
	children,
	className = '',
	style = {},
	variant = 'default',
	padding = 'xl',
	maxWidth = '7xl',
	centered = true,
	id,
	...props
}: BrandedSectionProps) {
	const colors = useBrandColors()
	
	const getBackgroundStyle = () => {
		switch (variant) {
			case 'default':
				return { backgroundColor: colors.background }
			case 'surface':
				return { backgroundColor: colors.surface }
			case 'primary':
				return { backgroundColor: colors.primary }
			case 'secondary':
				return { backgroundColor: colors.secondary }
			case 'gradient':
				return {
					background: `linear-gradient(135deg, ${colors.primary}15 0%, ${colors.secondary}15 100%)`
				}
			default:
				return { backgroundColor: colors.background }
		}
	}
	
	const getPadding = () => {
		const paddings = {
			none: '0',
			sm: 'var(--brand-spacing-md) 0',
			md: 'var(--brand-spacing-lg) 0',
			lg: 'var(--brand-spacing-xl) 0',
			xl: 'var(--brand-spacing-2xl) 0',
			'2xl': '6rem 0'
		}
		return paddings[padding]
	}
	
	const getMaxWidth = () => {
		const maxWidths = {
			none: 'none',
			sm: '640px',
			md: '768px',
			lg: '1024px',
			xl: '1280px',
			'2xl': '1536px',
			'7xl': '1440px',
			full: '100%'
		}
		return maxWidths[maxWidth]
	}
	
	const combinedStyle = {
		...getBackgroundStyle(),
		padding: getPadding(),
		...style
	}
	
	const containerStyle = {
		maxWidth: getMaxWidth(),
		margin: centered ? '0 auto' : '0',
		padding: '0 var(--brand-spacing-md)'
	}

	return (
		<section
			id={id}
			className={`brand-section ${className}`}
			style={combinedStyle}
			{...props}
		>
			<div style={containerStyle}>
				{children}
			</div>
		</section>
	)
}

// Specific section variants
export function HeroSection({ children, className = '', ...props }: Omit<BrandedSectionProps, 'variant' | 'padding'>) {
	return (
		<BrandedSection
			variant="gradient"
			padding="2xl"
			className={`hero-section ${className}`}
			{...props}
		>
			{children}
		</BrandedSection>
	)
}

export function FeatureSection({ children, className = '', ...props }: Omit<BrandedSectionProps, 'variant'>) {
	return (
		<BrandedSection
			variant="default"
			className={`feature-section ${className}`}
			{...props}
		>
			{children}
		</BrandedSection>
	)
}

export function TestimonialSection({ children, className = '', ...props }: Omit<BrandedSectionProps, 'variant'>) {
	return (
		<BrandedSection
			variant="surface"
			className={`testimonial-section ${className}`}
			{...props}
		>
			{children}
		</BrandedSection>
	)
}

export function CTASection({ children, className = '', ...props }: Omit<BrandedSectionProps, 'variant' | 'padding'>) {
	return (
		<BrandedSection
			variant="primary"
			padding="2xl"
			className={`cta-section ${className}`}
			{...props}
		>
			{children}
		</BrandedSection>
	)
} 