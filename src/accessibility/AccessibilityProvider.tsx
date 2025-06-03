import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { useBrandColors } from '../brand'
import { useAnalytics } from '../analytics/AnalyticsProvider'

// Accessibility preferences interface
interface AccessibilityPreferences {
	highContrast: boolean
	reducedMotion: boolean
	largeText: boolean
	screenReader: boolean
	keyboardNavigation: boolean
	focusVisible: boolean
	skipLinks: boolean
	audioDescriptions: boolean
	colorBlindnessMode: 'none' | 'protanopia' | 'deuteranopia' | 'tritanopia' | 'achromatopsia'
	fontSize: 'small' | 'medium' | 'large' | 'x-large'
	lineSpacing: 'normal' | 'increased' | 'double'
}

// Accessibility context type
interface AccessibilityContextType {
	preferences: AccessibilityPreferences
	updatePreference: <K extends keyof AccessibilityPreferences>(
		key: K,
		value: AccessibilityPreferences[K]
	) => void
	resetPreferences: () => void
	announceToScreenReader: (message: string, priority?: 'polite' | 'assertive') => void
	isKeyboardUser: boolean
	currentFocusElement: Element | null
	skipToMain: () => void
	skipToNavigation: () => void
}

// Default accessibility preferences
const defaultPreferences: AccessibilityPreferences = {
	highContrast: false,
	reducedMotion: false,
	largeText: false,
	screenReader: false,
	keyboardNavigation: true,
	focusVisible: true,
	skipLinks: true,
	audioDescriptions: false,
	colorBlindnessMode: 'none',
	fontSize: 'medium',
	lineSpacing: 'normal'
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined)

interface AccessibilityProviderProps {
	children: ReactNode
}

export function AccessibilityProvider({ children }: AccessibilityProviderProps) {
	const colors = useBrandColors()
	const { track } = useAnalytics()
	
	// Accessibility preferences state
	const [preferences, setPreferences] = useState<AccessibilityPreferences>(() => {
		if (typeof window !== 'undefined') {
			const stored = localStorage.getItem('tftt-accessibility-preferences')
			if (stored) {
				try {
					return { ...defaultPreferences, ...JSON.parse(stored) }
				} catch (error) {
					console.error('Error parsing accessibility preferences:', error)
				}
			}
			
			// Detect system preferences
			const systemPreferences: Partial<AccessibilityPreferences> = {}
			
			if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
				systemPreferences.reducedMotion = true
			}
			
			if (window.matchMedia('(prefers-contrast: high)').matches) {
				systemPreferences.highContrast = true
			}
			
			return { ...defaultPreferences, ...systemPreferences }
		}
		return defaultPreferences
	})
	
	// Keyboard user detection
	const [isKeyboardUser, setIsKeyboardUser] = useState(false)
	const [currentFocusElement, setCurrentFocusElement] = useState<Element | null>(null)
	
	// Screen reader announcer
	const [announcer, setAnnouncer] = useState<HTMLElement | null>(null)

	// Update preference function
	const updatePreference = <K extends keyof AccessibilityPreferences>(
		key: K,
		value: AccessibilityPreferences[K]
	) => {
		setPreferences(prev => {
			const updated = { ...prev, [key]: value }
			localStorage.setItem('tftt-accessibility-preferences', JSON.stringify(updated))
			
			track('accessibility_preference_changed', {
				preference: key,
				value: value,
				timestamp: Date.now()
			})
			
			return updated
		})
	}

	// Reset preferences function
	const resetPreferences = () => {
		setPreferences(defaultPreferences)
		localStorage.removeItem('tftt-accessibility-preferences')
		track('accessibility_preferences_reset')
	}

	// Screen reader announcement function
	const announceToScreenReader = (message: string, priority: 'polite' | 'assertive' = 'polite') => {
		if (announcer) {
			announcer.setAttribute('aria-live', priority)
			announcer.textContent = message
			
			// Clear after announcement
			setTimeout(() => {
				if (announcer) {
					announcer.textContent = ''
				}
			}, 1000)
			
			track('screen_reader_announcement', {
				message: message.substring(0, 50), // Truncate for privacy
				priority
			})
		}
	}

	// Skip to main content
	const skipToMain = () => {
		const mainElement = document.getElementById('main-content') || document.querySelector('main')
		if (mainElement) {
			mainElement.focus()
			announceToScreenReader('Skipped to main content')
			track('skip_to_main_used')
		}
	}

	// Skip to navigation
	const skipToNavigation = () => {
		const navElement = document.getElementById('main-navigation') || document.querySelector('nav')
		if (navElement) {
			navElement.focus()
			announceToScreenReader('Skipped to navigation')
			track('skip_to_navigation_used')
		}
	}

	// Keyboard interaction detection
	useEffect(() => {
		let keyboardUsed = false
		
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Tab' || event.key === 'Enter' || event.key === ' ') {
				keyboardUsed = true
				setIsKeyboardUser(true)
			}
		}
		
		const handleMouseDown = () => {
			if (keyboardUsed) {
				setIsKeyboardUser(false)
				keyboardUsed = false
			}
		}
		
		const handleFocus = (event: FocusEvent) => {
			setCurrentFocusElement(event.target as Element)
		}
		
		document.addEventListener('keydown', handleKeyDown)
		document.addEventListener('mousedown', handleMouseDown)
		document.addEventListener('focusin', handleFocus)
		
		return () => {
			document.removeEventListener('keydown', handleKeyDown)
			document.removeEventListener('mousedown', handleMouseDown)
			document.removeEventListener('focusin', handleFocus)
		}
	}, [])

	// Create screen reader announcer
	useEffect(() => {
		const announcerElement = document.createElement('div')
		announcerElement.setAttribute('aria-live', 'polite')
		announcerElement.setAttribute('aria-atomic', 'true')
		announcerElement.className = 'sr-only'
		announcerElement.style.cssText = `
			position: absolute !important;
			width: 1px !important;
			height: 1px !important;
			padding: 0 !important;
			margin: -1px !important;
			overflow: hidden !important;
			clip: rect(0, 0, 0, 0) !important;
			white-space: nowrap !important;
			border: 0 !important;
		`
		
		document.body.appendChild(announcerElement)
		setAnnouncer(announcerElement)
		
		return () => {
			if (document.body.contains(announcerElement)) {
				document.body.removeChild(announcerElement)
			}
		}
	}, [])

	// Apply accessibility preferences to document
	useEffect(() => {
		const root = document.documentElement
		
		// High contrast mode
		if (preferences.highContrast) {
			root.classList.add('high-contrast')
		} else {
			root.classList.remove('high-contrast')
		}
		
		// Reduced motion
		if (preferences.reducedMotion) {
			root.classList.add('reduce-motion')
		} else {
			root.classList.remove('reduce-motion')
		}
		
		// Large text
		if (preferences.largeText) {
			root.classList.add('large-text')
		} else {
			root.classList.remove('large-text')
		}
		
		// Focus visible
		if (preferences.focusVisible) {
			root.classList.add('focus-visible')
		} else {
			root.classList.remove('focus-visible')
		}
		
		// Font size
		root.setAttribute('data-font-size', preferences.fontSize)
		
		// Line spacing
		root.setAttribute('data-line-spacing', preferences.lineSpacing)
		
		// Color blindness mode
		root.setAttribute('data-color-blindness', preferences.colorBlindnessMode)
		
	}, [preferences])

	// System preference changes detection
	useEffect(() => {
		const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
		const highContrastQuery = window.matchMedia('(prefers-contrast: high)')
		
		const handleReducedMotionChange = (e: MediaQueryListEvent) => {
			if (e.matches) {
				updatePreference('reducedMotion', true)
				announceToScreenReader('Reduced motion enabled')
			}
		}
		
		const handleHighContrastChange = (e: MediaQueryListEvent) => {
			if (e.matches) {
				updatePreference('highContrast', true)
				announceToScreenReader('High contrast mode enabled')
			}
		}
		
		reducedMotionQuery.addEventListener('change', handleReducedMotionChange)
		highContrastQuery.addEventListener('change', handleHighContrastChange)
		
		return () => {
			reducedMotionQuery.removeEventListener('change', handleReducedMotionChange)
			highContrastQuery.removeEventListener('change', handleHighContrastChange)
		}
	}, [updatePreference])

	// Keyboard shortcuts
	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			// Alt + M: Skip to main content
			if (event.altKey && event.key === 'm') {
				event.preventDefault()
				skipToMain()
			}
			
			// Alt + N: Skip to navigation
			if (event.altKey && event.key === 'n') {
				event.preventDefault()
				skipToNavigation()
			}
			
			// Alt + H: Toggle high contrast
			if (event.altKey && event.key === 'h') {
				event.preventDefault()
				updatePreference('highContrast', !preferences.highContrast)
				announceToScreenReader(
					preferences.highContrast ? 'High contrast disabled' : 'High contrast enabled'
				)
			}
			
			// Alt + R: Toggle reduced motion
			if (event.altKey && event.key === 'r') {
				event.preventDefault()
				updatePreference('reducedMotion', !preferences.reducedMotion)
				announceToScreenReader(
					preferences.reducedMotion ? 'Animations enabled' : 'Animations reduced'
				)
			}
		}
		
		document.addEventListener('keydown', handleKeyDown)
		
		return () => {
			document.removeEventListener('keydown', handleKeyDown)
		}
	}, [preferences.highContrast, preferences.reducedMotion, updatePreference])

	const contextValue: AccessibilityContextType = {
		preferences,
		updatePreference,
		resetPreferences,
		announceToScreenReader,
		isKeyboardUser,
		currentFocusElement,
		skipToMain,
		skipToNavigation
	}

	return (
		<AccessibilityContext.Provider value={contextValue}>
			{children}
		</AccessibilityContext.Provider>
	)
}

// Hook to use accessibility context
export function useAccessibility(): AccessibilityContextType {
	const context = useContext(AccessibilityContext)
	if (context === undefined) {
		throw new Error('useAccessibility must be used within an AccessibilityProvider')
	}
	return context
}

// Skip links component
export function SkipLinks() {
	const { preferences, skipToMain, skipToNavigation } = useAccessibility()
	const colors = useBrandColors()
	
	if (!preferences.skipLinks) return null
	
	return (
		<div className="sr-only focus-within:not-sr-only">
			<a
				href="#main-content"
				onClick={(e) => {
					e.preventDefault()
					skipToMain()
				}}
				className="absolute top-0 left-0 z-50 px-4 py-2 font-medium transition-transform -translate-y-full focus:translate-y-0"
				style={{
					backgroundColor: colors.primary,
					color: colors.text.inverse
				}}
			>
				Skip to main content
			</a>
			<a
				href="#main-navigation"
				onClick={(e) => {
					e.preventDefault()
					skipToNavigation()
				}}
				className="absolute top-0 left-32 z-50 px-4 py-2 font-medium transition-transform -translate-y-full focus:translate-y-0"
				style={{
					backgroundColor: colors.secondary,
					color: colors.text.inverse
				}}
			>
				Skip to navigation
			</a>
		</div>
	)
}

// Accessibility settings panel component
interface AccessibilitySettingsProps {
	isOpen: boolean
	onClose: () => void
}

export function AccessibilitySettings({ isOpen, onClose }: AccessibilitySettingsProps) {
	const { preferences, updatePreference, resetPreferences } = useAccessibility()
	const colors = useBrandColors()
	
	if (!isOpen) return null
	
	return (
		<div
			className="fixed inset-0 z-50 flex items-center justify-center p-4"
			style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
		>
			<div
				className="w-full max-w-2xl p-6 rounded-lg shadow-xl max-h-[80vh] overflow-y-auto"
				style={{
					backgroundColor: colors.surface,
					color: colors.text.primary,
					border: `1px solid ${colors.border}`
				}}
				role="dialog"
				aria-labelledby="accessibility-settings-title"
				aria-modal="true"
			>
				<div className="flex items-center justify-between mb-6">
					<h2 id="accessibility-settings-title" className="text-xl font-semibold">
						Accessibility Settings
					</h2>
					<button
						onClick={onClose}
						className="p-2 rounded-lg hover:bg-opacity-80 transition-colors"
						style={{ backgroundColor: colors.surface }}
						aria-label="Close accessibility settings"
					>
						✕
					</button>
				</div>
				
				<div className="space-y-6">
					{/* Visual Preferences */}
					<fieldset>
						<legend className="text-lg font-medium mb-4">Visual Preferences</legend>
						<div className="space-y-4">
							<label className="flex items-center space-x-3">
								<input
									type="checkbox"
									checked={preferences.highContrast}
									onChange={(e) => updatePreference('highContrast', e.target.checked)}
									className="w-4 h-4"
								/>
								<span>High contrast mode</span>
							</label>
							
							<label className="flex items-center space-x-3">
								<input
									type="checkbox"
									checked={preferences.largeText}
									onChange={(e) => updatePreference('largeText', e.target.checked)}
									className="w-4 h-4"
								/>
								<span>Large text</span>
							</label>
							
							<div>
								<label htmlFor="font-size" className="block text-sm font-medium mb-1">
									Font Size
								</label>
								<select
									id="font-size"
									value={preferences.fontSize}
									onChange={(e) => updatePreference('fontSize', e.target.value as any)}
									className="w-full p-2 border rounded-lg"
									style={{
										backgroundColor: colors.surface,
										borderColor: colors.border,
										color: colors.text.primary
									}}
								>
									<option value="small">Small</option>
									<option value="medium">Medium</option>
									<option value="large">Large</option>
									<option value="x-large">Extra Large</option>
								</select>
							</div>
						</div>
					</fieldset>
					
					{/* Motion Preferences */}
					<fieldset>
						<legend className="text-lg font-medium mb-4">Motion Preferences</legend>
						<label className="flex items-center space-x-3">
							<input
								type="checkbox"
								checked={preferences.reducedMotion}
								onChange={(e) => updatePreference('reducedMotion', e.target.checked)}
								className="w-4 h-4"
							/>
							<span>Reduce motion and animations</span>
						</label>
					</fieldset>
					
					{/* Navigation Preferences */}
					<fieldset>
						<legend className="text-lg font-medium mb-4">Navigation Preferences</legend>
						<div className="space-y-4">
							<label className="flex items-center space-x-3">
								<input
									type="checkbox"
									checked={preferences.keyboardNavigation}
									onChange={(e) => updatePreference('keyboardNavigation', e.target.checked)}
									className="w-4 h-4"
								/>
								<span>Enhanced keyboard navigation</span>
							</label>
							
							<label className="flex items-center space-x-3">
								<input
									type="checkbox"
									checked={preferences.skipLinks}
									onChange={(e) => updatePreference('skipLinks', e.target.checked)}
									className="w-4 h-4"
								/>
								<span>Show skip links</span>
							</label>
						</div>
					</fieldset>
				</div>
				
				<div className="flex justify-between mt-6 pt-6 border-t" style={{ borderColor: colors.border }}>
					<button
						onClick={resetPreferences}
						className="px-4 py-2 rounded-lg transition-colors"
						style={{
							backgroundColor: colors.error,
							color: colors.text.inverse
						}}
					>
						Reset to Defaults
					</button>
					
					<button
						onClick={onClose}
						className="px-4 py-2 rounded-lg transition-colors"
						style={{
							backgroundColor: colors.primary,
							color: colors.text.inverse
						}}
					>
						Save & Close
					</button>
				</div>
			</div>
		</div>
	)
}

export default AccessibilityProvider 