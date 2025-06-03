import { cn } from '../../lib/utils'

interface LoadingSpinnerProps {
	size?: 'sm' | 'md' | 'lg' | 'xl'
	className?: string
	color?: 'blue' | 'white' | 'gray'
}

function LoadingSpinner({ 
	size = 'md', 
	className,
	color = 'blue' 
}: LoadingSpinnerProps) {
	const sizeClasses = {
		sm: 'h-4 w-4',
		md: 'h-8 w-8',
		lg: 'h-12 w-12',
		xl: 'h-16 w-16'
	}

	const colorClasses = {
		blue: 'border-blue-600',
		white: 'border-white',
		gray: 'border-gray-600'
	}

	return (
		<div
			className={cn(
				'animate-spin rounded-full border-2 border-transparent border-t-current',
				sizeClasses[size],
				colorClasses[color],
				className
			)}
			role="status"
			aria-label="Loading"
		>
			<span className="sr-only">Loading...</span>
		</div>
	)
}

export default LoadingSpinner
