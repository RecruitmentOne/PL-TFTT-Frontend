import React, { forwardRef } from 'react'
import { useBrand, useBrandColors } from '../../../brand/theme-provider'

interface BrandedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
	size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
	loading?: boolean
	leftIcon?: React.ReactNode
	rightIcon?: React.ReactNode
	fullWidth?: boolean
	rounded?: boolean
}

export const BrandedButton = forwardRef<HTMLButtonElement, BrandedButtonProps>(
	(
		{
			variant = 'primary',
			size = 'md',
			loading = false,
			leftIcon,
			rightIcon,
			fullWidth = false,
			rounded = false,
			disabled,
			children,
			className = '',
			...props
		},
		ref
	) => {
		const { theme } = useBrand()
		const colors = useBrandColors()

		// Size configurations
		const sizeConfig = {
			xs: {
				padding: 'px-2 py-1',
				text: 'text-xs',
				iconSize: 'w-3 h-3'
			},
			sm: {
				padding: 'px-3 py-1.5',
				text: 'text-sm',
				iconSize: 'w-4 h-4'
			},
			md: {
				padding: 'px-4 py-2',
				text: 'text-base',
				iconSize: 'w-5 h-5'
			},
			lg: {
				padding: 'px-6 py-3',
				text: 'text-lg',
				iconSize: 'w-6 h-6'
			},
			xl: {
				padding: 'px-8 py-4',
				text: 'text-xl',
				iconSize: 'w-7 h-7'
			}
		}

		// Variant configurations
		const getVariantStyles = (): Record<string, string> => {
			const base: Record<string, string> = {
				backgroundColor: 'transparent',
				color: colors.text.primary,
				borderColor: 'transparent'
			}

			switch (variant) {
				case 'primary':
					return {
						backgroundColor: colors.primary,
						color: colors.text.inverse,
						borderColor: colors.primary,
						'--hover-bg': `color-mix(in srgb, ${colors.primary} 90%, black)`,
						'--focus-ring': colors.primary
					}
				
				case 'secondary':
					return {
						backgroundColor: colors.secondary,
						color: colors.text.inverse,
						borderColor: colors.secondary,
						'--hover-bg': `color-mix(in srgb, ${colors.secondary} 90%, black)`,
						'--focus-ring': colors.secondary
					}
				
				case 'outline':
					return {
						backgroundColor: 'transparent',
						color: colors.primary,
						borderColor: colors.primary,
						'--hover-bg': colors.surface,
						'--hover-border': `color-mix(in srgb, ${colors.primary} 80%, black)`,
						'--focus-ring': colors.primary
					}
				
				case 'ghost':
					return {
						backgroundColor: 'transparent',
						color: colors.text.primary,
						borderColor: 'transparent',
						'--hover-bg': colors.surface,
						'--hover-color': colors.primary,
						'--focus-ring': colors.primary
					}
				
				case 'danger':
					return {
						backgroundColor: '#EF4444',
						color: colors.text.inverse,
						borderColor: '#EF4444',
						'--hover-bg': '#DC2626',
						'--focus-ring': '#EF4444'
					}
				
				default:
					return base
			}
		}

		const variantStyles = getVariantStyles()
		const config = sizeConfig[size]

		// Base classes
		const baseClasses = [
			'inline-flex items-center justify-center',
			'font-medium transition-all duration-200',
			'border-2 focus:outline-none focus:ring-2 focus:ring-offset-2',
			'disabled:opacity-50 disabled:cursor-not-allowed',
			'relative overflow-hidden',
			config.padding,
			config.text,
			fullWidth ? 'w-full' : '',
			rounded ? 'rounded-full' : 'rounded-md',
			className
		].filter(Boolean).join(' ')

		// Loading spinner component
		const LoadingSpinner = () => (
			<svg
				className={`animate-spin ${config.iconSize} mr-2`}
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
			>
				<circle
					className="opacity-25"
					cx="12"
					cy="12"
					r="10"
					stroke="currentColor"
					strokeWidth="4"
				/>
				<path
					className="opacity-75"
					fill="currentColor"
					d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
				/>
			</svg>
		)

		return (
			<button
				ref={ref}
				disabled={disabled || loading}
				className={baseClasses}
				style={{
					fontFamily: theme.typography.fontFamily.primary,
					backgroundColor: variantStyles.backgroundColor,
					color: variantStyles.color,
					borderColor: variantStyles.borderColor,
					'--brand-focus-ring-color': variantStyles['--focus-ring']
				} as React.CSSProperties}
				onMouseEnter={(e) => {
					if (!disabled && !loading) {
						if (variantStyles['--hover-bg']) {
							e.currentTarget.style.backgroundColor = variantStyles['--hover-bg']
						}
						if (variantStyles['--hover-color']) {
							e.currentTarget.style.color = variantStyles['--hover-color']
						}
						if (variantStyles['--hover-border']) {
							e.currentTarget.style.borderColor = variantStyles['--hover-border']
						}
					}
				}}
				onMouseLeave={(e) => {
					if (!disabled && !loading) {
						e.currentTarget.style.backgroundColor = variantStyles.backgroundColor
						e.currentTarget.style.color = variantStyles.color
						e.currentTarget.style.borderColor = variantStyles.borderColor
					}
				}}
				{...props}
			>
				{/* Content */}
				<span className="flex items-center">
					{loading && <LoadingSpinner />}
					{!loading && leftIcon && (
						<span className={`mr-2 ${config.iconSize} flex items-center`}>
							{leftIcon}
						</span>
					)}
					{children}
					{!loading && rightIcon && (
						<span className={`ml-2 ${config.iconSize} flex items-center`}>
							{rightIcon}
						</span>
					)}
				</span>
			</button>
		)
	}
)

BrandedButton.displayName = 'BrandedButton'

// Convenience components for common use cases
export function PrimaryButton(props: Omit<BrandedButtonProps, 'variant'>) {
	return <BrandedButton variant="primary" {...props} />
}

export function SecondaryButton(props: Omit<BrandedButtonProps, 'variant'>) {
	return <BrandedButton variant="secondary" {...props} />
}

export function OutlineButton(props: Omit<BrandedButtonProps, 'variant'>) {
	return <BrandedButton variant="outline" {...props} />
}

export function GhostButton(props: Omit<BrandedButtonProps, 'variant'>) {
	return <BrandedButton variant="ghost" {...props} />
}

export function DangerButton(props: Omit<BrandedButtonProps, 'variant'>) {
	return <BrandedButton variant="danger" {...props} />
}

// Button group component
interface ButtonGroupProps {
	children: React.ReactNode
	orientation?: 'horizontal' | 'vertical'
	spacing?: 'none' | 'sm' | 'md' | 'lg'
	className?: string
}

export function ButtonGroup({
	children,
	orientation = 'horizontal',
	spacing = 'sm',
	className = ''
}: ButtonGroupProps) {
	const spacingClasses = {
		none: '',
		sm: orientation === 'horizontal' ? 'space-x-2' : 'space-y-2',
		md: orientation === 'horizontal' ? 'space-x-4' : 'space-y-4',
		lg: orientation === 'horizontal' ? 'space-x-6' : 'space-y-6'
	}

	const orientationClass = orientation === 'horizontal' ? 'flex' : 'flex flex-col'

	return (
		<div className={`${orientationClass} ${spacingClasses[spacing]} ${className}`}>
			{children}
		</div>
	)
} 