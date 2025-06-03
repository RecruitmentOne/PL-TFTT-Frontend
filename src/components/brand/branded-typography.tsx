import React from 'react'
import { useBrandColors } from '../../brand'

interface BrandedTextProps {
	children: React.ReactNode
	className?: string
	style?: React.CSSProperties
	as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div'
	variant?: 'primary' | 'secondary' | 'inverse' | 'accent' | 'muted'
	size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl'
	weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold'
}

export function BrandedText({
	children,
	className = '',
	style = {},
	as: Component = 'div',
	variant = 'primary',
	size = 'base',
	weight = 'normal',
	...props
}: BrandedTextProps) {
	const colors = useBrandColors()
	
	const getTextColor = () => {
		switch (variant) {
			case 'primary':
				return colors.text.primary
			case 'secondary':
				return colors.text.secondary
			case 'inverse':
				return colors.text.inverse
			case 'accent':
				return colors.primary
			case 'muted':
				return colors.text.secondary
			default:
				return colors.text.primary
		}
	}
	
	const getFontSize = () => {
		const sizes = {
			xs: '0.75rem',
			sm: '0.875rem',
			base: '1rem',
			lg: '1.125rem',
			xl: '1.25rem',
			'2xl': '1.5rem',
			'3xl': '1.875rem',
			'4xl': '2.25rem'
		}
		return sizes[size]
	}
	
	const getFontWeight = () => {
		const weights = {
			light: 300,
			normal: 400,
			medium: 500,
			semibold: 600,
			bold: 700
		}
		return weights[weight]
	}

	const combinedStyle = {
		color: getTextColor(),
		fontSize: getFontSize(),
		fontWeight: getFontWeight(),
		fontFamily: 'var(--brand-font-primary)',
		...style
	}

	return (
		<Component
			className={`${className}`}
			style={combinedStyle}
			{...props}
		>
			{children}
		</Component>
	)
}

// Predefined heading components
export function BrandedH1({ children, className = '', ...props }: Omit<BrandedTextProps, 'as' | 'size' | 'weight'>) {
	return (
		<BrandedText
			as="h1"
			size="4xl"
			weight="bold"
			className={`leading-tight ${className}`}
			{...props}
		>
			{children}
		</BrandedText>
	)
}

export function BrandedH2({ children, className = '', ...props }: Omit<BrandedTextProps, 'as' | 'size' | 'weight'>) {
	return (
		<BrandedText
			as="h2"
			size="3xl"
			weight="bold"
			className={`leading-tight ${className}`}
			{...props}
		>
			{children}
		</BrandedText>
	)
}

export function BrandedH3({ children, className = '', ...props }: Omit<BrandedTextProps, 'as' | 'size' | 'weight'>) {
	return (
		<BrandedText
			as="h3"
			size="2xl"
			weight="semibold"
			className={`leading-tight ${className}`}
			{...props}
		>
			{children}
		</BrandedText>
	)
}

export function BrandedH4({ children, className = '', ...props }: Omit<BrandedTextProps, 'as' | 'size' | 'weight'>) {
	return (
		<BrandedText
			as="h4"
			size="xl"
			weight="semibold"
			className={`leading-normal ${className}`}
			{...props}
		>
			{children}
		</BrandedText>
	)
}

export function BrandedP({ children, className = '', ...props }: Omit<BrandedTextProps, 'as'>) {
	return (
		<BrandedText
			as="p"
			size="base"
			weight="normal"
			variant="secondary"
			className={`leading-relaxed ${className}`}
			{...props}
		>
			{children}
		</BrandedText>
	)
}

export function BrandedSpan({ children, className = '', ...props }: Omit<BrandedTextProps, 'as'>) {
	return (
		<BrandedText
			as="span"
			size="base"
			weight="normal"
			className={className}
			{...props}
		>
			{children}
		</BrandedText>
	)
} 