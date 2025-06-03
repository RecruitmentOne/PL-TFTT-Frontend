import React, { Suspense, ComponentType } from 'react'
import { motion } from 'framer-motion'
import { useBrandColors } from '../../brand'

// Generic loading spinner component
interface LoadingSpinnerProps {
	size?: 'sm' | 'md' | 'lg'
	text?: string
	className?: string
}

export function LoadingSpinner({ size = 'md', text, className = '' }: LoadingSpinnerProps) {
	const colors = useBrandColors()
	
	const sizeClasses = {
		sm: 'w-4 h-4',
		md: 'w-8 h-8',
		lg: 'w-12 h-12'
	}

	return (
		<div className={`flex flex-col items-center justify-center p-8 ${className}`}>
			<motion.div
				className={`border-2 border-current border-t-transparent rounded-full ${sizeClasses[size]}`}
				style={{ color: colors.primary }}
				animate={{ rotate: 360 }}
				transition={{
					duration: 1,
					repeat: Infinity,
					ease: 'linear'
				}}
			/>
			{text && (
				<motion.p
					className="mt-3 text-sm"
					style={{ color: colors.text.secondary }}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.2 }}
				>
					{text}
				</motion.p>
			)}
		</div>
	)
}

// Enhanced fallback component for lazy loading
interface LazyFallbackProps {
	height?: string
	text?: string
	showSpinner?: boolean
	className?: string
}

export function LazyFallback({ 
	height = 'auto', 
	text = 'Loading...', 
	showSpinner = true,
	className = '' 
}: LazyFallbackProps) {
	const colors = useBrandColors()

	return (
		<motion.div
			className={`flex items-center justify-center rounded-lg border ${className}`}
			style={{
				height,
				backgroundColor: colors.surface,
				borderColor: colors.border,
				minHeight: height === 'auto' ? '200px' : height
			}}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.3 }}
		>
			{showSpinner ? (
				<LoadingSpinner text={text} />
			) : (
				<p className="text-sm" style={{ color: colors.text.secondary }}>
					{text}
				</p>
			)}
		</motion.div>
	)
}

// Higher-order component for lazy loading with enhanced error boundaries
interface WithLazyLoadingOptions {
	fallback?: React.ComponentType<any>
	fallbackProps?: any
}

export function withLazyLoading<P extends object>(
	importFn: () => Promise<{ default: ComponentType<P> }>,
	options: WithLazyLoadingOptions = {}
) {
	const LazyComponent = React.lazy(importFn)
	const {
		fallback: FallbackComponent = LazyFallback,
		fallbackProps = {}
	} = options

	return React.forwardRef<any, P>((props, ref) => {
		return (
			<Suspense fallback={<FallbackComponent {...fallbackProps} />}>
				<LazyComponent {...props} ref={ref} />
			</Suspense>
		)
	})
}

// Lazy loading hook for dynamic imports
export function useLazyImport<T = any>(
	importFn: () => Promise<T>,
	deps: React.DependencyList = []
) {
	const [data, setData] = React.useState<T | null>(null)
	const [loading, setLoading] = React.useState(false)
	const [error, setError] = React.useState<Error | null>(null)

	React.useEffect(() => {
		let cancelled = false
		setLoading(true)
		setError(null)

		importFn()
			.then(result => {
				if (!cancelled) {
					setData(result)
					setLoading(false)
				}
			})
			.catch(err => {
				if (!cancelled) {
					setError(err)
					setLoading(false)
				}
			})

		return () => {
			cancelled = true
		}
	}, deps)

	return { data, loading, error }
}

// Intersection Observer hook for lazy loading
export function useIntersectionObserver(
	ref: React.RefObject<Element>,
	options: IntersectionObserverInit = {}
) {
	const [isIntersecting, setIsIntersecting] = React.useState(false)
	const [hasIntersected, setHasIntersected] = React.useState(false)

	React.useEffect(() => {
		const element = ref.current
		if (!element) return

		const observer = new IntersectionObserver(([entry]) => {
			setIsIntersecting(entry.isIntersecting)
			if (entry.isIntersecting && !hasIntersected) {
				setHasIntersected(true)
			}
		}, {
			threshold: 0.1,
			...options
		})

		observer.observe(element)

		return () => {
			observer.unobserve(element)
		}
	}, [ref, hasIntersected, options])

	return { isIntersecting, hasIntersected }
}

// Lazy image component with loading states
interface LazyImageProps {
	src: string
	alt: string
	className?: string
	placeholder?: string
	onLoad?: () => void
	onError?: () => void
}

export function LazyImage({ 
	src, 
	alt, 
	className = '', 
	placeholder,
	onLoad,
	onError 
}: LazyImageProps) {
	const [loaded, setLoaded] = React.useState(false)
	const [error, setError] = React.useState(false)
	const imgRef = React.useRef<HTMLImageElement>(null)
	const { hasIntersected } = useIntersectionObserver(imgRef)
	const colors = useBrandColors()

	const handleLoad = () => {
		setLoaded(true)
		onLoad?.()
	}

	const handleError = () => {
		setError(true)
		onError?.()
	}

	return (
		<div ref={imgRef} className={`relative overflow-hidden ${className}`}>
			{!loaded && !error && (
				<motion.div
					className="absolute inset-0 flex items-center justify-center"
					style={{ backgroundColor: colors.surface }}
					initial={{ opacity: 1 }}
					exit={{ opacity: 0 }}
				>
					{placeholder ? (
						<img src={placeholder} alt="" className="w-full h-full object-cover opacity-50" />
					) : (
						<LoadingSpinner size="sm" />
					)}
				</motion.div>
			)}
			
			{error && (
				<div 
					className="absolute inset-0 flex items-center justify-center"
					style={{ backgroundColor: colors.surface, color: colors.text.secondary }}
				>
					<span className="text-sm">Failed to load image</span>
				</div>
			)}

			{hasIntersected && (
				<motion.img
					src={src}
					alt={alt}
					className={`w-full h-full object-cover ${loaded ? 'opacity-100' : 'opacity-0'}`}
					onLoad={handleLoad}
					onError={handleError}
					initial={{ opacity: 0 }}
					animate={{ opacity: loaded ? 1 : 0 }}
					transition={{ duration: 0.3 }}
				/>
			)}
		</div>
	)
}

export default {
	LoadingSpinner,
	LazyFallback,
	withLazyLoading,
	useLazyImport,
	useIntersectionObserver,
	LazyImage
} 