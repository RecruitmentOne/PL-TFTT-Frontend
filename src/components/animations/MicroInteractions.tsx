import React from 'react'
import { motion, AnimatePresence, MotionProps } from 'framer-motion'
import { useBrandColors, useBrandAnimations } from '../../brand'
import { useAnalytics } from '../../analytics/AnalyticsProvider'

// Enhanced button with micro-interactions
interface InteractiveButtonProps {
	children: React.ReactNode
	variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
	size?: 'sm' | 'md' | 'lg'
	disabled?: boolean
	loading?: boolean
	onClick?: () => void
	className?: string
	rippleEffect?: boolean
	hapticFeedback?: boolean
}

export function InteractiveButton({
	children,
	variant = 'primary',
	size = 'md',
	disabled = false,
	loading = false,
	onClick,
	className = '',
	rippleEffect = true,
	hapticFeedback = false
}: InteractiveButtonProps) {
	const colors = useBrandColors()
	const animations = useBrandAnimations()
	const { track } = useAnalytics()
	const [isPressed, setIsPressed] = React.useState(false)
	const [ripples, setRipples] = React.useState<Array<{ id: number; x: number; y: number }>>([])

	const sizeStyles = {
		sm: { padding: '0.5rem 1rem', fontSize: '0.875rem', height: '36px' },
		md: { padding: '0.75rem 1.5rem', fontSize: '1rem', height: '44px' },
		lg: { padding: '1rem 2rem', fontSize: '1.125rem', height: '52px' }
	}

	const variantStyles = {
		primary: {
			backgroundColor: disabled ? colors.disabled : colors.primary,
			color: colors.text.inverse,
			border: 'none'
		},
		secondary: {
			backgroundColor: disabled ? colors.disabled : colors.secondary,
			color: colors.text.inverse,
			border: 'none'
		},
		outline: {
			backgroundColor: 'transparent',
			color: disabled ? colors.text.disabled : colors.primary,
			border: `2px solid ${disabled ? colors.border : colors.primary}`
		},
		ghost: {
			backgroundColor: 'transparent',
			color: disabled ? colors.text.disabled : colors.text.primary,
			border: 'none'
		}
	}

	const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		if (disabled || loading) return

		// Haptic feedback for mobile devices
		if (hapticFeedback && 'vibrate' in navigator) {
			navigator.vibrate(10)
		}

		// Ripple effect
		if (rippleEffect) {
			const rect = e.currentTarget.getBoundingClientRect()
			const x = e.clientX - rect.left
			const y = e.clientY - rect.top
			const newRipple = { id: Date.now(), x, y }
			
			setRipples(prev => [...prev, newRipple])
			
			// Remove ripple after animation
			setTimeout(() => {
				setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id))
			}, 600)
		}

		// Analytics tracking
		track('button_click', {
			variant,
			size,
			element: 'InteractiveButton'
		})

		onClick?.()
	}

	return (
		<motion.button
			className={`relative overflow-hidden rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed ${className}`}
			style={{
				...sizeStyles[size],
				...variantStyles[variant]
			}}
			whileHover={disabled ? {} : {
				scale: 1.02,
				y: -1,
				boxShadow: `0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)`
			}}
			whileTap={disabled ? {} : {
				scale: 0.98,
				y: 0
			}}
			onMouseDown={() => setIsPressed(true)}
			onMouseUp={() => setIsPressed(false)}
			onMouseLeave={() => setIsPressed(false)}
			onClick={handleClick}
			disabled={disabled || loading}
			transition={{
				duration: 0.15,
				ease: [0.4, 0, 0.2, 1]
			}}
		>
			{/* Ripple effects */}
			<AnimatePresence>
				{ripples.map(ripple => (
					<motion.span
						key={ripple.id}
						className="absolute rounded-full pointer-events-none"
						style={{
							backgroundColor: 'rgba(255, 255, 255, 0.3)',
							left: ripple.x,
							top: ripple.y
						}}
						initial={{
							width: 0,
							height: 0,
							x: 0,
							y: 0,
							opacity: 1
						}}
						animate={{
							width: 100,
							height: 100,
							x: -50,
							y: -50,
							opacity: 0
						}}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.6, ease: 'easeOut' }}
					/>
				))}
			</AnimatePresence>

			{/* Loading spinner */}
			{loading && (
				<motion.div
					className="absolute inset-0 flex items-center justify-center"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
				>
					<motion.div
						className="w-5 h-5 border-2 border-current border-t-transparent rounded-full"
						animate={{ rotate: 360 }}
						transition={{
							duration: 1,
							repeat: Infinity,
							ease: 'linear'
						}}
					/>
				</motion.div>
			)}

			{/* Button content */}
			<motion.span
				className="flex items-center justify-center space-x-2"
				style={{
					opacity: loading ? 0 : 1
				}}
				animate={{
					opacity: loading ? 0 : 1
				}}
				transition={{ duration: 0.2 }}
			>
				{children}
			</motion.span>
		</motion.button>
	)
}

// Enhanced card with hover interactions
interface InteractiveCardProps {
	children: React.ReactNode
	variant?: 'default' | 'elevated' | 'bordered' | 'glass'
	clickable?: boolean
	expandOnHover?: boolean
	glowEffect?: boolean
	onClick?: () => void
	className?: string
}

export function InteractiveCard({
	children,
	variant = 'default',
	clickable = false,
	expandOnHover = true,
	glowEffect = false,
	onClick,
	className = ''
}: InteractiveCardProps) {
	const colors = useBrandColors()
	const { track } = useAnalytics()
	const [isHovered, setIsHovered] = React.useState(false)

	const variantStyles = {
		default: {
			backgroundColor: colors.surface,
			border: `1px solid ${colors.border}`,
			borderRadius: '0.75rem'
		},
		elevated: {
			backgroundColor: colors.surface,
			border: `1px solid ${colors.border}`,
			borderRadius: '0.75rem',
			boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
		},
		bordered: {
			backgroundColor: colors.surface,
			border: `2px solid ${colors.border}`,
			borderRadius: '0.75rem'
		},
		glass: {
			backgroundColor: `${colors.surface}80`,
			border: `1px solid ${colors.border}40`,
			borderRadius: '0.75rem',
			backdropFilter: 'blur(8px)'
		}
	}

	const handleClick = () => {
		if (clickable && onClick) {
			track('card_click', {
				variant,
				element: 'InteractiveCard'
			})
			onClick()
		}
	}

	return (
		<motion.div
			className={`relative p-6 transition-all duration-300 ${clickable ? 'cursor-pointer' : ''} ${className}`}
			style={variantStyles[variant]}
			whileHover={expandOnHover ? {
				y: -4,
				scale: 1.02,
				boxShadow: glowEffect 
					? `0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04), 0 0 20px ${colors.primary}30`
					: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
			} : {}}
			whileTap={clickable ? { scale: 0.98 } : {}}
			onHoverStart={() => setIsHovered(true)}
			onHoverEnd={() => setIsHovered(false)}
			onClick={handleClick}
			transition={{
				duration: 0.2,
				ease: [0.4, 0, 0.2, 1]
			}}
		>
			{/* Glow effect */}
			{glowEffect && isHovered && (
				<motion.div
					className="absolute inset-0 rounded-lg pointer-events-none"
					style={{
						background: `linear-gradient(135deg, ${colors.primary}20, ${colors.secondary}20)`,
						filter: 'blur(20px)'
					}}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.3 }}
				/>
			)}

			{/* Border animation */}
			{clickable && (
				<motion.div
					className="absolute inset-0 rounded-lg pointer-events-none"
					style={{
						border: `2px solid ${colors.primary}`,
						opacity: 0
					}}
					animate={{
						opacity: isHovered ? 0.3 : 0
					}}
					transition={{ duration: 0.2 }}
				/>
			)}

			{children}
		</motion.div>
	)
}

// Floating action button with micro-interactions
interface FloatingActionButtonProps {
	icon: React.ReactNode
	onClick?: () => void
	variant?: 'primary' | 'secondary'
	size?: 'sm' | 'md' | 'lg'
	position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'
	tooltip?: string
	className?: string
}

export function FloatingActionButton({
	icon,
	onClick,
	variant = 'primary',
	size = 'md',
	position = 'bottom-right',
	tooltip,
	className = ''
}: FloatingActionButtonProps) {
	const colors = useBrandColors()
	const { track } = useAnalytics()
	const [showTooltip, setShowTooltip] = React.useState(false)

	const sizeStyles = {
		sm: { width: '48px', height: '48px' },
		md: { width: '56px', height: '56px' },
		lg: { width: '64px', height: '64px' }
	}

	const positionStyles = {
		'bottom-right': { bottom: '24px', right: '24px' },
		'bottom-left': { bottom: '24px', left: '24px' },
		'top-right': { top: '24px', right: '24px' },
		'top-left': { top: '24px', left: '24px' }
	}

	const variantStyles = {
		primary: {
			backgroundColor: colors.primary,
			color: colors.text.inverse
		},
		secondary: {
			backgroundColor: colors.secondary,
			color: colors.text.inverse
		}
	}

	const handleClick = () => {
		track('fab_click', {
			variant,
			size,
			position,
			element: 'FloatingActionButton'
		})
		onClick?.()
	}

	return (
		<>
			<motion.button
				className={`fixed z-50 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center justify-center ${className}`}
				style={{
					...sizeStyles[size],
					...positionStyles[position],
					...variantStyles[variant]
				}}
				whileHover={{
					scale: 1.1,
					boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
				}}
				whileTap={{ scale: 0.9 }}
				animate={{
					y: [0, -2, 0],
					transition: {
						duration: 2,
						repeat: Infinity,
						ease: 'easeInOut'
					}
				}}
				onHoverStart={() => setShowTooltip(true)}
				onHoverEnd={() => setShowTooltip(false)}
				onClick={handleClick}
			>
				{icon}
			</motion.button>

			{/* Tooltip */}
			<AnimatePresence>
				{tooltip && showTooltip && (
					<motion.div
						className="fixed z-50 px-2 py-1 text-sm rounded shadow-lg"
						style={{
							backgroundColor: colors.surface,
							color: colors.text.primary,
							border: `1px solid ${colors.border}`,
							...positionStyles[position],
							[position.includes('right') ? 'right' : 'left']: position.includes('right') ? '80px' : '80px',
							bottom: position.includes('bottom') ? '36px' : undefined,
							top: position.includes('top') ? '36px' : undefined
						}}
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.8 }}
						transition={{ duration: 0.15 }}
					>
						{tooltip}
					</motion.div>
				)}
			</AnimatePresence>
		</>
	)
}

// Progress indicator with smooth animations
interface AnimatedProgressProps {
	value: number
	max?: number
	size?: 'sm' | 'md' | 'lg'
	variant?: 'linear' | 'circular'
	showPercentage?: boolean
	color?: string
	className?: string
}

export function AnimatedProgress({
	value,
	max = 100,
	size = 'md',
	variant = 'linear',
	showPercentage = false,
	color,
	className = ''
}: AnimatedProgressProps) {
	const colors = useBrandColors()
	const percentage = Math.min((value / max) * 100, 100)

	const sizeStyles = {
		sm: variant === 'linear' ? { height: '4px' } : { width: '32px', height: '32px' },
		md: variant === 'linear' ? { height: '8px' } : { width: '48px', height: '48px' },
		lg: variant === 'linear' ? { height: '12px' } : { width: '64px', height: '64px' }
	}

	const progressColor = color || colors.primary

	if (variant === 'circular') {
		const sizeConfig = sizeStyles[size] as { width: string; height: string }
		const radius = parseInt(sizeConfig.width) / 2 - 4
		const circumference = 2 * Math.PI * radius
		const strokeDasharray = circumference
		const strokeDashoffset = circumference - (percentage / 100) * circumference

		return (
			<div className={`relative inline-flex items-center justify-center ${className}`}>
				<svg
					className="transform -rotate-90"
					style={sizeConfig}
					viewBox={`0 0 ${parseInt(sizeConfig.width)} ${parseInt(sizeConfig.height)}`}
				>
					{/* Background circle */}
					<circle
						cx={parseInt(sizeConfig.width) / 2}
						cy={parseInt(sizeConfig.height) / 2}
						r={radius}
						stroke={colors.border}
						strokeWidth="4"
						fill="transparent"
					/>
					{/* Progress circle */}
					<motion.circle
						cx={parseInt(sizeConfig.width) / 2}
						cy={parseInt(sizeConfig.height) / 2}
						r={radius}
						stroke={progressColor}
						strokeWidth="4"
						fill="transparent"
						strokeLinecap="round"
						style={{
							strokeDasharray,
							strokeDashoffset: circumference
						}}
						animate={{
							strokeDashoffset
						}}
						transition={{
							duration: 1,
							ease: [0.4, 0, 0.2, 1]
						}}
					/>
				</svg>
				{showPercentage && (
					<motion.span
						className="absolute text-sm font-medium"
						style={{ color: colors.text.primary }}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.5 }}
					>
						{Math.round(percentage)}%
					</motion.span>
				)}
			</div>
		)
	}

	return (
		<div className={`relative ${className}`}>
			<div
				className="w-full rounded-full overflow-hidden"
				style={{
					...sizeStyles[size],
					backgroundColor: colors.surface,
					border: `1px solid ${colors.border}`
				}}
			>
				<motion.div
					className="h-full rounded-full"
					style={{
						backgroundColor: progressColor,
						background: `linear-gradient(90deg, ${progressColor}, ${colors.secondary})`
					}}
					initial={{ width: 0 }}
					animate={{ width: `${percentage}%` }}
					transition={{
						duration: 1,
						ease: [0.4, 0, 0.2, 1]
					}}
				/>
			</div>
			{showPercentage && (
				<motion.span
					className="absolute right-0 top-full mt-1 text-sm"
					style={{ color: colors.text.secondary }}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.5 }}
				>
					{Math.round(percentage)}%
				</motion.span>
			)}
		</div>
	)
}

export default {
	InteractiveButton,
	InteractiveCard,
	FloatingActionButton,
	AnimatedProgress
} 