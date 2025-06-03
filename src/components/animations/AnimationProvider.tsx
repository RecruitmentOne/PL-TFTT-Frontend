import React, { createContext, useContext, ReactNode } from 'react'
import { motion, AnimatePresence, MotionProps } from 'framer-motion'
import { useBrandAnimations, useBrandColors } from '../../brand'
import type { BrandAnimations } from '../../brand/brand-types'

interface AnimationContextType {
	pageTransition: MotionProps
	cardHover: MotionProps
	buttonHover: MotionProps
	fadeIn: MotionProps
	slideIn: MotionProps
	scaleIn: MotionProps
	staggerContainer: MotionProps
	staggerChild: MotionProps
	floatingElement: MotionProps
	pulseLoading: MotionProps
}

const AnimationContext = createContext<AnimationContextType | undefined>(undefined)

interface AnimationProviderProps {
	children: ReactNode
	reducedMotion?: boolean
}

export function AnimationProvider({ children, reducedMotion = false }: AnimationProviderProps) {
	const brandAnimations = useBrandAnimations()
	const colors = useBrandColors()

	// Detect reduced motion preference
	const shouldReduceMotion = reducedMotion || (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches)

	// Base animation configurations
	const animationConfig: AnimationContextType = {
		// Page transitions
		pageTransition: {
			initial: shouldReduceMotion ? {} : { opacity: 0, y: 20 },
			animate: { opacity: 1, y: 0 },
			exit: shouldReduceMotion ? {} : { opacity: 0, y: -20 },
			transition: shouldReduceMotion ? { duration: 0 } : {
				duration: 0.4,
				ease: [0.4, 0, 0.2, 1]
			}
		},

		// Card hover animations
		cardHover: {
			whileHover: shouldReduceMotion ? {} : {
				y: -4,
				scale: 1.02,
				boxShadow: `0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)`
			},
			transition: shouldReduceMotion ? { duration: 0 } : {
				duration: 0.2,
				ease: [0.4, 0, 0.2, 1]
			}
		},

		// Button hover animations
		buttonHover: {
			whileHover: shouldReduceMotion ? {} : {
				scale: 1.02,
				y: -1
			},
			whileTap: shouldReduceMotion ? {} : {
				scale: 0.98,
				y: 0
			},
			transition: shouldReduceMotion ? { duration: 0 } : {
				duration: 0.15,
				ease: [0.4, 0, 0.2, 1]
			}
		},

		// Fade in animation
		fadeIn: {
			initial: shouldReduceMotion ? {} : { opacity: 0 },
			animate: { opacity: 1 },
			transition: shouldReduceMotion ? { duration: 0 } : {
				duration: 0.3,
				ease: 'easeOut'
			}
		},

		// Slide in animation
		slideIn: {
			initial: shouldReduceMotion ? {} : { opacity: 0, x: -20 },
			animate: { opacity: 1, x: 0 },
			transition: shouldReduceMotion ? { duration: 0 } : {
				duration: 0.4,
				ease: [0.4, 0, 0.2, 1]
			}
		},

		// Scale in animation
		scaleIn: {
			initial: shouldReduceMotion ? {} : { opacity: 0, scale: 0.9 },
			animate: { opacity: 1, scale: 1 },
			transition: shouldReduceMotion ? { duration: 0 } : {
				duration: 0.3,
				ease: [0.4, 0, 0.2, 1]
			}
		},

		// Stagger container
		staggerContainer: {
			initial: shouldReduceMotion ? {} : { opacity: 0 },
			animate: { opacity: 1 },
			transition: shouldReduceMotion ? { duration: 0 } : {
				staggerChildren: 0.1,
				delayChildren: 0.1
			}
		},

		// Stagger child
		staggerChild: {
			initial: shouldReduceMotion ? {} : { opacity: 0, y: 20 },
			animate: { opacity: 1, y: 0 },
			transition: shouldReduceMotion ? { duration: 0 } : {
				duration: 0.4,
				ease: [0.4, 0, 0.2, 1]
			}
		},

		// Floating element animation
		floatingElement: {
			animate: shouldReduceMotion ? {} : {
				y: [-2, 2, -2],
				transition: {
					duration: 3,
					repeat: Infinity,
					ease: 'easeInOut'
				}
			}
		},

		// Pulse loading animation
		pulseLoading: {
			animate: shouldReduceMotion ? {} : {
				scale: [1, 1.05, 1],
				opacity: [0.7, 1, 0.7],
				transition: {
					duration: 1.5,
					repeat: Infinity,
					ease: 'easeInOut'
				}
			}
		}
	}

	return (
		<AnimationContext.Provider value={animationConfig}>
			{children}
		</AnimationContext.Provider>
	)
}

// Hook to use animation context
export function useAnimations(): AnimationContextType {
	const context = useContext(AnimationContext)
	if (context === undefined) {
		throw new Error('useAnimations must be used within an AnimationProvider')
	}
	return context
}

// Enhanced Motion components with brand awareness
interface MotionCardProps extends MotionProps {
	children: ReactNode
	variant?: 'default' | 'elevated' | 'interactive'
	className?: string
}

export function MotionCard({ children, variant = 'default', className = '', ...motionProps }: MotionCardProps) {
	const colors = useBrandColors()
	const animations = useAnimations()

	const baseStyles = {
		backgroundColor: colors.surface,
		borderColor: colors.border,
		color: colors.text.primary
	}

	const variantStyles = {
		default: {
			border: `1px solid ${colors.border}`,
			borderRadius: '0.75rem'
		},
		elevated: {
			border: `1px solid ${colors.border}`,
			borderRadius: '0.75rem',
			boxShadow: `0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)`
		},
		interactive: {
			border: `1px solid ${colors.border}`,
			borderRadius: '0.75rem',
			cursor: 'pointer'
		}
	}

	return (
		<motion.div
			{...animations.cardHover}
			{...motionProps}
			className={`p-6 transition-all ${className}`}
			style={{
				...baseStyles,
				...variantStyles[variant]
			}}
		>
			{children}
		</motion.div>
	)
}

// Enhanced Motion button
interface MotionButtonProps extends MotionProps {
	children: ReactNode
	variant?: 'primary' | 'secondary' | 'outline'
	size?: 'sm' | 'md' | 'lg'
	className?: string
	onClick?: () => void
}

export function MotionButton({ 
	children, 
	variant = 'primary', 
	size = 'md', 
	className = '', 
	onClick,
	...motionProps 
}: MotionButtonProps) {
	const colors = useBrandColors()
	const animations = useAnimations()

	const sizeStyles = {
		sm: { padding: '0.5rem 1rem', fontSize: '0.875rem' },
		md: { padding: '0.75rem 1.5rem', fontSize: '1rem' },
		lg: { padding: '1rem 2rem', fontSize: '1.125rem' }
	}

	const variantStyles = {
		primary: {
			backgroundColor: colors.primary,
			color: colors.text.inverse,
			border: 'none'
		},
		secondary: {
			backgroundColor: colors.secondary,
			color: colors.text.inverse,
			border: 'none'
		},
		outline: {
			backgroundColor: 'transparent',
			color: colors.primary,
			border: `2px solid ${colors.primary}`
		}
	}

	return (
		<motion.button
			{...animations.buttonHover}
			{...motionProps}
			className={`font-medium rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 ${className}`}
			style={{
				...sizeStyles[size],
				...variantStyles[variant]
			}}
			onClick={onClick}
		>
			{children}
		</motion.button>
	)
}

// Page transition wrapper
interface PageTransitionProps {
	children: ReactNode
	className?: string
}

export function PageTransition({ children, className = '' }: PageTransitionProps) {
	const animations = useAnimations()

	return (
		<motion.div
			{...animations.pageTransition}
			className={className}
		>
			{children}
		</motion.div>
	)
}

// Stagger animation wrapper
interface StaggerAnimationProps {
	children: ReactNode
	className?: string
}

export function StaggerAnimation({ children, className = '' }: StaggerAnimationProps) {
	const animations = useAnimations()

	return (
		<motion.div
			{...animations.staggerContainer}
			className={className}
		>
			{React.Children.map(children, (child, index) => (
				<motion.div key={index} {...animations.staggerChild}>
					{child}
				</motion.div>
			))}
		</motion.div>
	)
}

export default AnimationProvider 