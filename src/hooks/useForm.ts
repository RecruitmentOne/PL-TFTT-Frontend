import { useState, useCallback } from 'react'

interface ValidationRule {
	required?: boolean
	minLength?: number
	maxLength?: number
	pattern?: RegExp
	custom?: (value: any) => string | null
}

interface ValidationRules {
	[key: string]: ValidationRule
}

interface FormErrors {
	[key: string]: string
}

interface UseFormOptions<T> {
	initialValues: T
	validationRules?: ValidationRules
	onSubmit: (values: T) => Promise<void> | void
}

export function useForm<T extends Record<string, any>>({
	initialValues,
	validationRules = {},
	onSubmit,
}: UseFormOptions<T>) {
	const [values, setValues] = useState<T>(initialValues)
	const [errors, setErrors] = useState<FormErrors>({})
	const [touched, setTouched] = useState<Record<string, boolean>>({})
	const [isSubmitting, setIsSubmitting] = useState(false)

	const validateField = useCallback((name: string, value: any): string => {
		const rules = validationRules[name]
		if (!rules) return ''

		// Required validation
		if (rules.required && (!value || (typeof value === 'string' && value.trim() === ''))) {
			return `${name} is required`
		}

		// Skip other validations if value is empty and not required
		if (!value || (typeof value === 'string' && value.trim() === '')) {
			return ''
		}

		// String validations
		if (typeof value === 'string') {
			if (rules.minLength && value.length < rules.minLength) {
				return `${name} must be at least ${rules.minLength} characters`
			}

			if (rules.maxLength && value.length > rules.maxLength) {
				return `${name} must be no more than ${rules.maxLength} characters`
			}

			if (rules.pattern && !rules.pattern.test(value)) {
				return `${name} format is invalid`
			}
		}

		// Custom validation
		if (rules.custom) {
			const customError = rules.custom(value)
			if (customError) return customError
		}

		return ''
	}, [validationRules])

	const validateForm = useCallback((): boolean => {
		const newErrors: FormErrors = {}
		let isValid = true

		Object.keys(validationRules).forEach((fieldName) => {
			const error = validateField(fieldName, values[fieldName])
			if (error) {
				newErrors[fieldName] = error
				isValid = false
			}
		})

		setErrors(newErrors)
		return isValid
	}, [values, validationRules, validateField])

	const handleChange = useCallback((name: string, value: any) => {
		setValues((prev) => ({ ...prev, [name]: value }))

		// Clear error when user starts typing
		if (errors[name]) {
			setErrors((prev) => ({ ...prev, [name]: '' }))
		}
	}, [errors])

	const handleBlur = useCallback((name: string) => {
		setTouched((prev) => ({ ...prev, [name]: true }))
		
		// Validate field on blur
		const error = validateField(name, values[name])
		setErrors((prev) => ({ ...prev, [name]: error }))
	}, [validateField, values])

	const handleSubmit = useCallback(async (e?: React.FormEvent) => {
		if (e) {
			e.preventDefault()
		}

		// Mark all fields as touched
		const allTouched = Object.keys(validationRules).reduce((acc, key) => {
			acc[key] = true
			return acc
		}, {} as Record<string, boolean>)
		setTouched(allTouched)

		// Validate form
		if (!validateForm()) {
			return
		}

		setIsSubmitting(true)
		try {
			await onSubmit(values)
		} catch (error) {
			// Handle submission error
			console.error('Form submission error:', error)
		} finally {
			setIsSubmitting(false)
		}
	}, [values, validationRules, validateForm, onSubmit])

	const reset = useCallback(() => {
		setValues(initialValues)
		setErrors({})
		setTouched({})
		setIsSubmitting(false)
	}, [initialValues])

	const setFieldValue = useCallback((name: string, value: any) => {
		handleChange(name, value)
	}, [handleChange])

	const setFieldError = useCallback((name: string, error: string) => {
		setErrors((prev) => ({ ...prev, [name]: error }))
	}, [])

	return {
		values,
		errors,
		touched,
		isSubmitting,
		handleChange,
		handleBlur,
		handleSubmit,
		reset,
		setFieldValue,
		setFieldError,
		validateForm,
		isValid: Object.keys(errors).length === 0,
	}
} 