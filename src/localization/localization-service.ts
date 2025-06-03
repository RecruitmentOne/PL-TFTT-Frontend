import axios from 'axios'
import { SUPPORTED_LANGUAGES, SupportedLanguageKey } from './i18n-config'

// Backend API response types
interface SupportedCulture {
	code: string
	name: string
	displayName: string
}

interface LocalizedStringResponse {
	key: string
	value: string
	culture: string
}

interface ApiResponse<T> {
	success: boolean
	data: T
	message?: string
}

class LocalizationService {
	private baseUrl = '/api/localization'
	private currentCulture = 'en-US'

	/**
	 * Get supported cultures from backend
	 */
	async getSupportedCultures(): Promise<SupportedCulture[]> {
		try {
			const response = await axios.get<ApiResponse<SupportedCulture[]>>(
				`${this.baseUrl}/cultures`
			)
			return response.data.data || []
		} catch (error) {
			console.warn('Failed to fetch supported cultures from backend:', error)
			// Return fallback cultures
			return Object.values(SUPPORTED_LANGUAGES).map(lang => ({
				code: lang.code,
				name: lang.name,
				displayName: lang.displayName
			}))
		}
	}

	/**
	 * Get current culture from backend
	 */
	async getCurrentCulture(): Promise<SupportedCulture | null> {
		try {
			const response = await axios.get<ApiResponse<SupportedCulture>>(
				`${this.baseUrl}/current-culture`,
				{
					headers: {
						'Accept-Language': this.currentCulture
					}
				}
			)
			return response.data.data || null
		} catch (error) {
			console.warn('Failed to fetch current culture from backend:', error)
			return null
		}
	}

	/**
	 * Set culture preference on backend
	 */
	async setCulture(cultureCode: string): Promise<boolean> {
		try {
			const response = await axios.post<ApiResponse<{ culture: string }>>(
				`${this.baseUrl}/set-culture`,
				cultureCode,
				{
					headers: {
						'Content-Type': 'application/json'
					}
				}
			)
			
			if (response.data.success) {
				this.currentCulture = cultureCode
				return true
			}
			return false
		} catch (error) {
			console.warn('Failed to set culture on backend:', error)
			return false
		}
	}

	/**
	 * Get localized string from backend
	 */
	async getLocalizedString(
		key: string, 
		culture?: string
	): Promise<string | null> {
		try {
			const cultureParam = culture || this.currentCulture
			const response = await axios.get<ApiResponse<LocalizedStringResponse>>(
				`${this.baseUrl}/string/${key}`,
				{
					params: { culture: cultureParam },
					headers: {
						'Accept-Language': cultureParam
					}
				}
			)
			
			return response.data.data?.value || null
		} catch (error) {
			console.warn(`Failed to fetch localized string for key "${key}":`, error)
			return null
		}
	}

	/**
	 * Get multiple localized strings at once
	 */
	async getLocalizedStrings(
		keys: string[], 
		culture?: string
	): Promise<Record<string, string>> {
		const results: Record<string, string> = {}
		
		// Use Promise.allSettled to handle partial failures
		const promises = keys.map(async (key) => {
			const value = await this.getLocalizedString(key, culture)
			if (value) {
				results[key] = value
			}
		})

		await Promise.allSettled(promises)
		return results
	}

	/**
	 * Set current culture for service instance
	 */
	setCurrentCulture(cultureCode: string): void {
		this.currentCulture = cultureCode
	}

	/**
	 * Get current culture code
	 */
	getCurrentCultureCode(): string {
		return this.currentCulture
	}

	/**
	 * Map i18next language key to backend culture code
	 */
	mapLanguageToCulture(langKey: SupportedLanguageKey): string {
		return SUPPORTED_LANGUAGES[langKey].code
	}

	/**
	 * Map backend culture code to i18next language key
	 */
	mapCultureToLanguage(cultureCode: string): SupportedLanguageKey {
		const entry = Object.entries(SUPPORTED_LANGUAGES).find(
			([_, lang]) => lang.code === cultureCode
		)
		return (entry?.[0] as SupportedLanguageKey) || 'en'
	}

	/**
	 * Check if culture is supported
	 */
	isCultureSupported(cultureCode: string): boolean {
		return Object.values(SUPPORTED_LANGUAGES).some(
			lang => lang.code === cultureCode
		)
	}

	/**
	 * Get formatted error messages from backend
	 */
	async getErrorMessage(errorKey: string, culture?: string): Promise<string> {
		const message = await this.getLocalizedString(errorKey, culture)
		return message || 'An error occurred'
	}

	/**
	 * Handle authentication responses with localized messages
	 */
	async handleAuthResponse(response: any): Promise<string> {
		// Extract error key from backend response if available
		const errorKey = response?.errorKey || 'General.Error'
		return this.getErrorMessage(errorKey, this.currentCulture)
	}

	/**
	 * Initialize service with browser language detection
	 */
	async initialize(): Promise<void> {
		try {
			// Try to detect language from browser
			const browserLang = navigator.language || 'en-US'
			
			// Find closest supported culture
			const supportedCultures = await this.getSupportedCultures()
			const matchedCulture = supportedCultures.find(
				culture => culture.code.startsWith(browserLang.split('-')[0])
			)

			if (matchedCulture) {
				this.currentCulture = matchedCulture.code
			}

			// Set initial culture on backend
			await this.setCulture(this.currentCulture)
		} catch (error) {
			console.warn('Failed to initialize localization service:', error)
		}
	}
}

// Create singleton instance
export const localizationService = new LocalizationService()

// Export types for use in components
export type { SupportedCulture, LocalizedStringResponse } 