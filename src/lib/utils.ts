// Simple className utility without external dependencies
export function cn(...classes: (string | undefined | null | false)[]): string {
	return classes.filter(Boolean).join(' ')
}

// Format currency
export function formatCurrency(amount: number, currency = 'USD'): string {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency,
	}).format(amount)
}

// Format date
export function formatDate(date: string | Date): string {
	return new Intl.DateTimeFormat('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	}).format(new Date(date))
}

// Format relative time
export function formatRelativeTime(date: string | Date): string {
	const now = new Date()
	const inputDate = new Date(date)
	const diffInSeconds = Math.floor((now.getTime() - inputDate.getTime()) / 1000)

	if (diffInSeconds < 60) {
		return 'just now'
	}

	const diffInMinutes = Math.floor(diffInSeconds / 60)
	if (diffInMinutes < 60) {
		return `${diffInMinutes} minute${diffInMinutes === 1 ? '' : 's'} ago`
	}

	const diffInHours = Math.floor(diffInMinutes / 60)
	if (diffInHours < 24) {
		return `${diffInHours} hour${diffInHours === 1 ? '' : 's'} ago`
	}

	const diffInDays = Math.floor(diffInHours / 24)
	if (diffInDays < 7) {
		return `${diffInDays} day${diffInDays === 1 ? '' : 's'} ago`
	}

	return formatDate(date)
}

// Validation helpers
export function isValidEmail(email: string): boolean {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
	return emailRegex.test(email)
}

export function isValidPhone(phone: string): boolean {
	const phoneRegex = /^\+?[\d\s-()]+$/
	return phoneRegex.test(phone)
}

// Text helpers
export function truncateText(text: string, maxLength: number): string {
	if (text.length <= maxLength) return text
	return text.substring(0, maxLength).trim() + '...'
}

export function capitalizeFirst(text: string): string {
	return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
}

// API error handling
export function getErrorMessage(error: any): string {
	if (typeof error === 'string') return error
	if (error?.message) return error.message
	if (error?.response?.data?.message) return error.response.data.message
	if (error?.response?.data?.errors) {
		return Array.isArray(error.response.data.errors) 
			? error.response.data.errors.join(', ')
			: error.response.data.errors
	}
	return 'An unexpected error occurred'
}

// File size formatter
export function formatFileSize(bytes: number): string {
	const sizes = ['Bytes', 'KB', 'MB', 'GB']
	if (bytes === 0) return '0 Bytes'
	const i = Math.floor(Math.log(bytes) / Math.log(1024))
	return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i]
}

// Generate initials from name
export function getInitials(firstName?: string, lastName?: string): string {
	const first = firstName?.charAt(0)?.toUpperCase() || ''
	const last = lastName?.charAt(0)?.toUpperCase() || ''
	return first + last
} 