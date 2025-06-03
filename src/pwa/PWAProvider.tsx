import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import localForage from 'localforage'
import { useBrandColors } from '../brand'
import { useAnalytics } from '../analytics/AnalyticsProvider'

// PWA context types
interface PWAContextType {
	isOnline: boolean
	isAppInstallable: boolean
	isUpdateAvailable: boolean
	isOfflineReady: boolean
	installApp: () => Promise<void>
	updateApp: () => Promise<void>
	offlineStorage: {
		set: (key: string, value: any) => Promise<void>
		get: (key: string) => Promise<any>
		remove: (key: string) => Promise<void>
		clear: () => Promise<void>
		keys: () => Promise<string[]>
	}
	networkSpeed: 'slow' | 'fast' | 'unknown'
	dataUsage: 'low' | 'normal' | 'unlimited'
}

// BeforeInstallPrompt interface
interface BeforeInstallPromptEvent extends Event {
	prompt(): Promise<void>
	userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

// Service Worker Registration interface extension
interface ServiceWorkerRegistrationWithSync extends ServiceWorkerRegistration {
	sync?: {
		register(tag: string): Promise<void>
	}
}

const PWAContext = createContext<PWAContextType | undefined>(undefined)

interface PWAProviderProps {
	children: ReactNode
}

export function PWAProvider({ children }: PWAProviderProps) {
	const colors = useBrandColors()
	const { track } = useAnalytics()
	
	// Online/Offline state
	const [isOnline, setIsOnline] = useState(navigator.onLine)
	const [networkSpeed, setNetworkSpeed] = useState<'slow' | 'fast' | 'unknown'>('unknown')
	const [dataUsage, setDataUsage] = useState<'low' | 'normal' | 'unlimited'>('normal')
	
	// App installation state
	const [isAppInstallable, setIsAppInstallable] = useState(false)
	const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null)
	
	// PWA state (fallback without service worker)
	const [isUpdateAvailable, setIsUpdateAvailable] = useState(false)
	const [isOfflineReady, setIsOfflineReady] = useState(false)

	// Service Worker registration (if available)
	useEffect(() => {
		if ('serviceWorker' in navigator) {
			navigator.serviceWorker.register('/sw.js')
				.then((registration: ServiceWorkerRegistration) => {
					console.log('SW Registered:', registration)
					track('sw_registered', { timestamp: Date.now() })
					setIsOfflineReady(true)
					
					// Check for updates
					registration.addEventListener('updatefound', () => {
						setIsUpdateAvailable(true)
						track('sw_update_found')
					})
				})
				.catch((error: Error) => {
					console.log('SW registration error:', error)
					track('sw_registration_error', { error: error.message })
				})
		}
	}, [track])

	// Configure offline storage
	const offlineStorage = React.useMemo(() => {
		localForage.config({
			name: 'TFTT',
			storeName: 'offline_data',
			version: 1.0,
			description: 'TFTT offline data storage'
		})

		return {
			async set(key: string, value: any): Promise<void> {
				try {
					await localForage.setItem(key, value)
					track('offline_storage_write', { key })
				} catch (error) {
					console.error('Offline storage write failed:', error)
					track('offline_storage_error', { operation: 'write', key, error: (error as Error).message })
				}
			},
			async get(key: string): Promise<any> {
				try {
					const value = await localForage.getItem(key)
					track('offline_storage_read', { key, hasValue: value !== null })
					return value
				} catch (error) {
					console.error('Offline storage read failed:', error)
					track('offline_storage_error', { operation: 'read', key, error: (error as Error).message })
					return null
				}
			},
			async remove(key: string): Promise<void> {
				try {
					await localForage.removeItem(key)
					track('offline_storage_remove', { key })
				} catch (error) {
					console.error('Offline storage remove failed:', error)
					track('offline_storage_error', { operation: 'remove', key, error: (error as Error).message })
				}
			},
			async clear(): Promise<void> {
				try {
					await localForage.clear()
					track('offline_storage_clear')
				} catch (error) {
					console.error('Offline storage clear failed:', error)
					track('offline_storage_error', { operation: 'clear', error: (error as Error).message })
				}
			},
			async keys(): Promise<string[]> {
				try {
					const keys = await localForage.keys()
					track('offline_storage_keys', { count: keys.length })
					return keys
				} catch (error) {
					console.error('Offline storage keys failed:', error)
					track('offline_storage_error', { operation: 'keys', error: (error as Error).message })
					return []
				}
			}
		}
	}, [track])

	// Network monitoring
	useEffect(() => {
		const handleOnline = () => {
			setIsOnline(true)
			track('network_online')
		}
		
		const handleOffline = () => {
			setIsOnline(false)
			track('network_offline')
		}

		window.addEventListener('online', handleOnline)
		window.addEventListener('offline', handleOffline)

		// Network speed detection
		if ('connection' in navigator) {
			const connection = (navigator as any).connection
			const updateNetworkInfo = () => {
				const speed = connection.effectiveType === '4g' ? 'fast' : 
							 connection.effectiveType === '3g' ? 'fast' : 'slow'
				setNetworkSpeed(speed)
				
				// Data usage preferences
				const saveData = connection.saveData || false
				setDataUsage(saveData ? 'low' : 'normal')
				
				track('network_info', {
					effectiveType: connection.effectiveType,
					downlink: connection.downlink,
					saveData
				})
			}
			
			updateNetworkInfo()
			connection.addEventListener('change', updateNetworkInfo)
			
			return () => {
				connection.removeEventListener('change', updateNetworkInfo)
			}
		}

		return () => {
			window.removeEventListener('online', handleOnline)
			window.removeEventListener('offline', handleOffline)
		}
	}, [track])

	// App installation handling
	useEffect(() => {
		const handleBeforeInstallPrompt = (e: Event) => {
			e.preventDefault()
			setInstallPrompt(e as BeforeInstallPromptEvent)
			setIsAppInstallable(true)
			track('app_installable')
		}

		const handleAppInstalled = () => {
			setIsAppInstallable(false)
			setInstallPrompt(null)
			track('app_installed')
		}

		window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
		window.addEventListener('appinstalled', handleAppInstalled)

		return () => {
			window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
			window.removeEventListener('appinstalled', handleAppInstalled)
		}
	}, [track])

	// Install app function
	const installApp = async (): Promise<void> => {
		if (!installPrompt) return

		try {
			await installPrompt.prompt()
			const { outcome } = await installPrompt.userChoice
			
			track('app_install_prompt_result', { outcome })
			
			if (outcome === 'accepted') {
				setIsAppInstallable(false)
				setInstallPrompt(null)
			}
		} catch (error) {
			console.error('App installation failed:', error)
			track('app_install_error', { error: (error as Error).message })
		}
	}

	// Update app function
	const updateApp = async (): Promise<void> => {
		try {
			if ('serviceWorker' in navigator) {
				const registration = await navigator.serviceWorker.getRegistration()
				if (registration) {
					await registration.update()
					window.location.reload()
				}
			}
			track('app_updated')
		} catch (error) {
			console.error('App update failed:', error)
			track('app_update_error', { error: (error as Error).message })
		}
	}

	// Background sync for offline actions
	useEffect(() => {
		if ('serviceWorker' in navigator) {
			navigator.serviceWorker.ready.then((registration: ServiceWorkerRegistrationWithSync) => {
				// Register background sync for offline actions (if supported)
				if (registration.sync) {
					return registration.sync.register('background-sync')
				}
			}).catch((error: Error) => {
				console.error('Background sync registration failed:', error)
				track('background_sync_error', { error: error.message })
			})
		}
	}, [track])

	const contextValue: PWAContextType = {
		isOnline,
		isAppInstallable,
		isUpdateAvailable,
		isOfflineReady,
		installApp,
		updateApp,
		offlineStorage,
		networkSpeed,
		dataUsage
	}

	return (
		<PWAContext.Provider value={contextValue}>
			{children}
		</PWAContext.Provider>
	)
}

// Hook to use PWA context
export function usePWA(): PWAContextType {
	const context = useContext(PWAContext)
	if (context === undefined) {
		throw new Error('usePWA must be used within a PWAProvider')
	}
	return context
}

// PWA status indicator component
interface PWAStatusProps {
	className?: string
	showUpdateButton?: boolean
	showInstallButton?: boolean
}

export function PWAStatus({ 
	className = '', 
	showUpdateButton = true, 
	showInstallButton = true 
}: PWAStatusProps) {
	const colors = useBrandColors()
	const { 
		isOnline, 
		isAppInstallable, 
		isUpdateAvailable, 
		isOfflineReady,
		installApp, 
		updateApp,
		networkSpeed 
	} = usePWA()

	const [showOfflineToast, setShowOfflineToast] = useState(false)

	useEffect(() => {
		if (!isOnline) {
			setShowOfflineToast(true)
			const timer = setTimeout(() => setShowOfflineToast(false), 5000)
			return () => clearTimeout(timer)
		}
	}, [isOnline])

	return (
		<div className={`flex items-center space-x-2 ${className}`}>
			{/* Online/Offline Indicator */}
			<div 
				className="flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium"
				style={{
					backgroundColor: isOnline ? `${colors.success}20` : `${colors.error}20`,
					color: isOnline ? colors.success : colors.error
				}}
			>
				<div 
					className="w-2 h-2 rounded-full"
					style={{ backgroundColor: isOnline ? colors.success : colors.error }}
				/>
				<span>{isOnline ? 'Online' : 'Offline'}</span>
				{networkSpeed !== 'unknown' && isOnline && (
					<span className="text-xs opacity-75">
						({networkSpeed})
					</span>
				)}
			</div>

			{/* Update Available Button */}
			{isUpdateAvailable && showUpdateButton && (
				<button
					onClick={updateApp}
					className="px-3 py-1 text-xs font-medium rounded-full transition-colors"
					style={{
						backgroundColor: colors.primary,
						color: colors.text.inverse
					}}
				>
					Update Available
				</button>
			)}

			{/* Install App Button */}
			{isAppInstallable && showInstallButton && (
				<button
					onClick={installApp}
					className="px-3 py-1 text-xs font-medium rounded-full transition-colors"
					style={{
						backgroundColor: colors.secondary,
						color: colors.text.inverse
					}}
				>
					Install App
				</button>
			)}

			{/* Offline Ready Indicator */}
			{isOfflineReady && (
				<div 
					className="px-2 py-1 rounded-full text-xs font-medium"
					style={{
						backgroundColor: `${colors.info}20`,
						color: colors.info
					}}
				>
					Ready for offline use
				</div>
			)}

			{/* Offline Toast */}
			{showOfflineToast && (
				<div 
					className="fixed top-4 right-4 z-50 px-4 py-2 rounded-lg shadow-lg"
					style={{
						backgroundColor: colors.surface,
						color: colors.text.primary,
						border: `1px solid ${colors.border}`
					}}
				>
					<p className="text-sm font-medium">You're now offline</p>
					<p className="text-xs opacity-75">Some features may be limited</p>
				</div>
			)}
		</div>
	)
}

export default PWAProvider 