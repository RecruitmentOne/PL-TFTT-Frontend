import { useTranslation } from 'react-i18next'
import { useState, useEffect, useCallback } from 'react'
import { localizationService } from '../localization-service'
import { SUPPORTED_LANGUAGES, SupportedLanguageKey } from '../i18n-config'
import type { SupportedCulture } from '../localization-service'

/**
 * Enhanced translation hook with backend integration
 */
export function useLocalizedTranslation() {
	const { t, i18n } = useTranslation()
	
	/**
	 * Get translation with backend fallback
	 */
	const getTranslation = useCallback(async (key: string, options?: any) => {
		// Try frontend translation first
		const frontendTranslation = t(key, options)
		
		// If key not found in frontend, try backend
		if (frontendTranslation === key) {
			const backendTranslation = await localizationService.getLocalizedString(key)
			return backendTranslation || frontendTranslation
		}
		
		return frontendTranslation
	}, [t])

	/**
	 * Get error message from backend with fallback
	 */
	const getErrorMessage = useCallback(async (errorKey: string) => {
		const message = await localizationService.getErrorMessage(errorKey)
		return message
	}, [])

	return {
		t,
		i18n,
		getTranslation,
		getErrorMessage,
		currentLanguage: i18n.language as SupportedLanguageKey
	}
}

/**
 * Hook for managing language switching
 */
export function useLanguage() {
	const { i18n } = useTranslation()
	const [isChanging, setIsChanging] = useState(false)
	const [supportedCultures, setSupportedCultures] = useState<SupportedCulture[]>([])
	
	// Load supported cultures on mount
	useEffect(() => {
		localizationService.getSupportedCultures()
			.then(setSupportedCultures)
			.catch(console.warn)
	}, [])

	/**
	 * Change language with backend sync
	 */
	const changeLanguage = useCallback(async (langKey: SupportedLanguageKey) => {
		if (isChanging) return false

		setIsChanging(true)
		try {
			// Get culture code for backend
			const cultureCode = localizationService.mapLanguageToCulture(langKey)
			
			// Set on backend first
			const backendSuccess = await localizationService.setCulture(cultureCode)
			
			// Change i18next language
			await i18n.changeLanguage(langKey)
			
			// Update service current culture
			localizationService.setCurrentCulture(cultureCode)
			
			return true
		} catch (error) {
			console.error('Failed to change language:', error)
			return false
		} finally {
			setIsChanging(false)
		}
	}, [i18n, isChanging])

	/**
	 * Get current language info
	 */
	const currentLanguage = i18n.language as SupportedLanguageKey
	const currentLanguageInfo = SUPPORTED_LANGUAGES[currentLanguage] || SUPPORTED_LANGUAGES.en

	/**
	 * Get available languages
	 */
	const availableLanguages = Object.entries(SUPPORTED_LANGUAGES).map(([key, info]) => ({
		key: key as SupportedLanguageKey,
		...info,
		isCurrent: key === currentLanguage
	}))

	return {
		currentLanguage,
		currentLanguageInfo,
		availableLanguages,
		supportedCultures,
		changeLanguage,
		isChanging
	}
}

/**
 * Hook for backend error handling with localization
 */
export function useLocalizedErrors() {
	const [errorMessages, setErrorMessages] = useState<Record<string, string>>({})
	
	/**
	 * Handle API error response
	 */
	const handleApiError = useCallback(async (error: any): Promise<string> => {
		let errorKey = 'General.Error'
		
		// Extract error key from different response formats
		if (error?.response?.data?.errorKey) {
			errorKey = error.response.data.errorKey
		} else if (error?.errorKey) {
			errorKey = error.errorKey
		} else if (error?.response?.status === 401) {
			errorKey = 'Auth.Unauthorized'
		} else if (error?.response?.status === 404) {
			errorKey = 'General.NotFound'
		}

		// Get localized message
		const message = await localizationService.getErrorMessage(errorKey)
		
		// Cache the message
		setErrorMessages(prev => ({ ...prev, [errorKey]: message }))
		
		return message
	}, [])

	/**
	 * Get cached error message
	 */
	const getCachedErrorMessage = useCallback((errorKey: string): string | undefined => {
		return errorMessages[errorKey]
	}, [errorMessages])

	/**
	 * Clear error messages cache
	 */
	const clearErrorMessages = useCallback(() => {
		setErrorMessages({})
	}, [])

	return {
		handleApiError,
		getCachedErrorMessage,
		clearErrorMessages,
		errorMessages
	}
}

/**
 * Hook for formatting dates/numbers based on current locale
 */
export function useLocaleFormatting() {
	const { i18n } = useTranslation()
	const currentLanguage = i18n.language as SupportedLanguageKey
	const cultureCode = SUPPORTED_LANGUAGES[currentLanguage].code

	/**
	 * Format date according to current locale
	 */
	const formatDate = useCallback((date: Date | string | number, options?: Intl.DateTimeFormatOptions) => {
		const dateObj = new Date(date)
		return new Intl.DateTimeFormat(cultureCode, options).format(dateObj)
	}, [cultureCode])

	/**
	 * Format number according to current locale
	 */
	const formatNumber = useCallback((number: number, options?: Intl.NumberFormatOptions) => {
		return new Intl.NumberFormat(cultureCode, options).format(number)
	}, [cultureCode])

	/**
	 * Format currency according to current locale
	 */
	const formatCurrency = useCallback((amount: number, currency = 'EUR') => {
		return new Intl.NumberFormat(cultureCode, {
			style: 'currency',
			currency
		}).format(amount)
	}, [cultureCode])

	/**
	 * Format relative time (e.g., "2 hours ago")
	 */
	const formatRelativeTime = useCallback((date: Date | string | number) => {
		const now = new Date()
		const targetDate = new Date(date)
		const diffInSeconds = (targetDate.getTime() - now.getTime()) / 1000

		// Use Intl.RelativeTimeFormat if available
		if (typeof Intl.RelativeTimeFormat !== 'undefined') {
			const rtf = new Intl.RelativeTimeFormat(cultureCode, { numeric: 'auto' })
			
			if (Math.abs(diffInSeconds) < 60) {
				return rtf.format(Math.round(diffInSeconds), 'second')
			} else if (Math.abs(diffInSeconds) < 3600) {
				return rtf.format(Math.round(diffInSeconds / 60), 'minute')
			} else if (Math.abs(diffInSeconds) < 86400) {
				return rtf.format(Math.round(diffInSeconds / 3600), 'hour')
			} else {
				return rtf.format(Math.round(diffInSeconds / 86400), 'day')
			}
		}

		// Fallback for older browsers
		return formatDate(targetDate, { 
			dateStyle: 'medium', 
			timeStyle: 'short' 
		})
	}, [cultureCode, formatDate])

	return {
		cultureCode,
		formatDate,
		formatNumber,
		formatCurrency,
		formatRelativeTime
	}
}

/**
 * Hook for managing language-specific validation messages
 */
export function useValidationMessages() {
	const { getTranslation } = useLocalizedTranslation()

	/**
	 * Get validation error message
	 */
	const getValidationMessage = useCallback(async (
		field: string, 
		rule: string, 
		params?: any
	) => {
		const key = `validation.${rule}`
		const message = await getTranslation(key, { field, ...params })
		return typeof message === 'string' ? message : key
	}, [getTranslation])

	/**
	 * Common validation messages
	 */
	const getCommonValidationMessages = useCallback(async () => {
		const keys = [
			'validation.required',
			'validation.email',
			'validation.minLength',
			'validation.maxLength',
			'validation.pattern'
		]
		
		const messages: Record<string, string> = {}
		
		for (const key of keys) {
			const message = await getTranslation(key)
			messages[key] = typeof message === 'string' ? message : key
		}
		
		return messages
	}, [getTranslation])

	return {
		getValidationMessage,
		getCommonValidationMessages
	}
} 