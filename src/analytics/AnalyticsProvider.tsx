import React, { createContext, useContext, useEffect, ReactNode } from 'react'
import { useBrand } from '../brand'

// Analytics event types
export interface AnalyticsEvent {
	name: string
	properties?: Record<string, any>
	timestamp?: number
	userId?: string
	sessionId?: string
	variant?: string
}

// Performance metrics interface
export interface PerformanceMetrics {
	pageLoadTime: number
	firstContentfulPaint: number
	largestContentfulPaint: number
	firstInputDelay: number
	cumulativeLayoutShift: number
	timeToInteractive: number
}

// User journey tracking
export interface JourneyStep {
	step: string
	timestamp: number
	duration?: number
	metadata?: Record<string, any>
}

// Analytics configuration
interface AnalyticsConfig {
	enabled: boolean
	trackPerformance: boolean
	trackUserJourney: boolean
	trackErrors: boolean
	privacyCompliant: boolean
	consentRequired: boolean
	debugMode: boolean
}

// Analytics context type
interface AnalyticsContextType {
	config: AnalyticsConfig
	track: (event: string, properties?: Record<string, any>) => void
	trackPage: (pageName: string, properties?: Record<string, any>) => void
	trackPerformance: (metrics: Partial<PerformanceMetrics>) => void
	trackError: (error: Error, context?: Record<string, any>) => void
	trackJourney: (step: string, metadata?: Record<string, any>) => void
	setUserProperties: (properties: Record<string, any>) => void
	identify: (userId: string, properties?: Record<string, any>) => void
	getSessionData: () => Record<string, any>
	optOut: () => void
	optIn: () => void
}

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined)

interface AnalyticsProviderProps {
	children: ReactNode
	config?: Partial<AnalyticsConfig>
}

// Generate session ID
function generateSessionId(): string {
	return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

// Privacy-compliant storage
class PrivateStorage {
	private prefix = 'tftt_analytics_'
	
	set(key: string, value: any): void {
		try {
			localStorage.setItem(this.prefix + key, JSON.stringify(value))
		} catch (error) {
			console.warn('Analytics storage failed:', error)
		}
	}
	
	get(key: string): any {
		try {
			const item = localStorage.getItem(this.prefix + key)
			return item ? JSON.parse(item) : null
		} catch (error) {
			console.warn('Analytics storage read failed:', error)
			return null
		}
	}
	
	remove(key: string): void {
		try {
			localStorage.removeItem(this.prefix + key)
		} catch (error) {
			console.warn('Analytics storage removal failed:', error)
		}
	}
	
	clear(): void {
		try {
			const keys = Object.keys(localStorage).filter(key => key.startsWith(this.prefix))
			keys.forEach(key => localStorage.removeItem(key))
		} catch (error) {
			console.warn('Analytics storage clear failed:', error)
		}
	}
}

export function AnalyticsProvider({ children, config: userConfig = {} }: AnalyticsProviderProps) {
	const { currentVariant } = useBrand()
	const storage = new PrivateStorage()
	
	// Default configuration
	const defaultConfig: AnalyticsConfig = {
		enabled: true,
		trackPerformance: true,
		trackUserJourney: true,
		trackErrors: true,
		privacyCompliant: true,
		consentRequired: false,
		debugMode: process.env.NODE_ENV === 'development'
	}
	
	const config = { ...defaultConfig, ...userConfig }
	
	// Session management
	const [sessionId] = React.useState(() => {
		return storage.get('sessionId') || generateSessionId()
	})
	
	const [userId, setUserId] = React.useState<string | null>(() => {
		return storage.get('userId')
	})
	
	const [userProperties, setUserPropertiesState] = React.useState<Record<string, any>>(() => {
		return storage.get('userProperties') || {}
	})
	
	const [hasConsent, setHasConsent] = React.useState(() => {
		return !config.consentRequired || storage.get('analyticsConsent') === true
	})
	
	// Journey tracking
	const [journeySteps, setJourneySteps] = React.useState<JourneyStep[]>([])
	
	// Store session data
	useEffect(() => {
		storage.set('sessionId', sessionId)
	}, [sessionId])
	
	useEffect(() => {
		if (userId) {
			storage.set('userId', userId)
		}
	}, [userId])
	
	useEffect(() => {
		storage.set('userProperties', userProperties)
	}, [userProperties])
	
	// Event queue for batching
	const [eventQueue, setEventQueue] = React.useState<AnalyticsEvent[]>([])
	
	// Send events (mock implementation - replace with real analytics service)
	const sendEvents = React.useCallback((events: AnalyticsEvent[]) => {
		if (!config.enabled || !hasConsent) return
		
		if (config.debugMode) {
			console.group('📊 Analytics Events')
			events.forEach(event => {
				console.log('Event:', event.name, event.properties)
			})
			console.groupEnd()
		}
		
		// Here you would integrate with your analytics service
		// Examples: Google Analytics, Mixpanel, Amplitude, etc.
		// analytics.track(events)
	}, [config.enabled, config.debugMode, hasConsent])
	
	// Flush events periodically
	useEffect(() => {
		if (eventQueue.length === 0) return
		
		const timeout = setTimeout(() => {
			sendEvents(eventQueue)
			setEventQueue([])
		}, 1000) // Batch events every second
		
		return () => clearTimeout(timeout)
	}, [eventQueue, sendEvents])
	
	// Track function
	const track = React.useCallback((eventName: string, properties: Record<string, any> = {}) => {
		if (!config.enabled || !hasConsent) return
		
		const event: AnalyticsEvent = {
			name: eventName,
			properties: {
				...properties,
				variant: currentVariant,
				sessionId,
				...userProperties
			},
			timestamp: Date.now(),
			userId: userId || undefined,
			sessionId,
			variant: currentVariant
		}
		
		setEventQueue(prev => [...prev, event])
	}, [config.enabled, hasConsent, currentVariant, sessionId, userId, userProperties])
	
	// Track page views
	const trackPage = React.useCallback((pageName: string, properties: Record<string, any> = {}) => {
		track('page_view', {
			page: pageName,
			...properties
		})
	}, [track])
	
	// Track performance metrics
	const trackPerformance = React.useCallback((metrics: Partial<PerformanceMetrics>) => {
		if (!config.trackPerformance) return
		
		track('performance_metrics', {
			...metrics,
			userAgent: navigator.userAgent,
			viewport: {
				width: window.innerWidth,
				height: window.innerHeight
			}
		})
	}, [config.trackPerformance, track])
	
	// Track errors
	const trackError = React.useCallback((error: Error, context: Record<string, any> = {}) => {
		if (!config.trackErrors) return
		
		track('error_occurred', {
			errorMessage: error.message,
			errorStack: error.stack,
			errorName: error.name,
			...context
		})
	}, [config.trackErrors, track])
	
	// Track user journey
	const trackJourney = React.useCallback((step: string, metadata: Record<string, any> = {}) => {
		if (!config.trackUserJourney) return
		
		const journeyStep: JourneyStep = {
			step,
			timestamp: Date.now(),
			metadata
		}
		
		setJourneySteps(prev => {
			const newSteps = [...prev, journeyStep]
			
			// Calculate duration from previous step
			if (prev.length > 0) {
				const previousStep = prev[prev.length - 1]
				journeyStep.duration = journeyStep.timestamp - previousStep.timestamp
			}
			
			// Keep only last 50 steps
			return newSteps.slice(-50)
		})
		
		track('journey_step', {
			step,
			stepIndex: journeySteps.length,
			...metadata
		})
	}, [config.trackUserJourney, track, journeySteps.length])
	
	// Set user properties
	const setUserProperties = React.useCallback((properties: Record<string, any>) => {
		setUserPropertiesState(prev => ({
			...prev,
			...properties
		}))
	}, [])
	
	// Identify user
	const identify = React.useCallback((newUserId: string, properties: Record<string, any> = {}) => {
		setUserId(newUserId)
		setUserProperties(properties)
		track('user_identified', { userId: newUserId, ...properties })
	}, [setUserProperties, track])
	
	// Get session data
	const getSessionData = React.useCallback(() => {
		return {
			sessionId,
			userId,
			userProperties,
			journeySteps: journeySteps.slice(-10), // Last 10 steps
			variant: currentVariant
		}
	}, [sessionId, userId, userProperties, journeySteps, currentVariant])
	
	// Privacy controls
	const optOut = React.useCallback(() => {
		setHasConsent(false)
		storage.set('analyticsConsent', false)
		storage.clear()
		setEventQueue([])
		track('analytics_opt_out')
	}, [track])
	
	const optIn = React.useCallback(() => {
		setHasConsent(true)
		storage.set('analyticsConsent', true)
		track('analytics_opt_in')
	}, [track])
	
	// Automatic performance tracking
	useEffect(() => {
		if (!config.trackPerformance || typeof window === 'undefined') return
		
		// Track page load metrics
		window.addEventListener('load', () => {
			setTimeout(() => {
				const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
				const paint = performance.getEntriesByType('paint')
				
				if (navigation) {
					const metrics: Partial<PerformanceMetrics> = {
						pageLoadTime: navigation.loadEventEnd - navigation.loadEventStart,
						firstContentfulPaint: paint.find(p => p.name === 'first-contentful-paint')?.startTime || 0
					}
					
					trackPerformance(metrics)
				}
			}, 0)
		})
		
		// Track CLS (Cumulative Layout Shift)
		if ('PerformanceObserver' in window) {
			const observer = new PerformanceObserver((list) => {
				for (const entry of list.getEntries()) {
					if (entry.entryType === 'layout-shift' && !(entry as any).hadRecentInput) {
						trackPerformance({
							cumulativeLayoutShift: (entry as any).value
						})
					}
				}
			})
			
			observer.observe({ entryTypes: ['layout-shift'] })
			
			return () => observer.disconnect()
		}
	}, [config.trackPerformance, trackPerformance])
	
	// Error boundary integration
	useEffect(() => {
		const handleError = (event: ErrorEvent) => {
			trackError(new Error(event.message), {
				filename: event.filename,
				lineno: event.lineno,
				colno: event.colno
			})
		}
		
		const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
			trackError(new Error(String(event.reason)), {
				type: 'unhandled_promise_rejection'
			})
		}
		
		window.addEventListener('error', handleError)
		window.addEventListener('unhandledrejection', handleUnhandledRejection)
		
		return () => {
			window.removeEventListener('error', handleError)
			window.removeEventListener('unhandledrejection', handleUnhandledRejection)
		}
	}, [trackError])
	
	const contextValue: AnalyticsContextType = {
		config,
		track,
		trackPage,
		trackPerformance,
		trackError,
		trackJourney,
		setUserProperties,
		identify,
		getSessionData,
		optOut,
		optIn
	}
	
	return (
		<AnalyticsContext.Provider value={contextValue}>
			{children}
		</AnalyticsContext.Provider>
	)
}

// Hook to use analytics
export function useAnalytics(): AnalyticsContextType {
	const context = useContext(AnalyticsContext)
	if (context === undefined) {
		throw new Error('useAnalytics must be used within an AnalyticsProvider')
	}
	return context
}

// Higher-order component for automatic page tracking
export function withPageTracking<P extends object>(
	Component: React.ComponentType<P>,
	pageName: string
) {
	return function PageTrackedComponent(props: P) {
		const { trackPage } = useAnalytics()
		
		useEffect(() => {
			trackPage(pageName)
		}, [trackPage])
		
		return <Component {...props} />
	}
}

// Hook for tracking user interactions
export function useInteractionTracking() {
	const { track } = useAnalytics()
	
	return React.useCallback((action: string, element: string, properties: Record<string, any> = {}) => {
		track('user_interaction', {
			action,
			element,
			...properties
		})
	}, [track])
}

export default AnalyticsProvider 