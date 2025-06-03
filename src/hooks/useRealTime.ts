import { useEffect, useCallback, useRef } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import {
	setConnected,
	setConnectionError,
	incrementReconnectAttempts,
	resetReconnectAttempts,
	addNotification,
	addLiveMatch,
	updateRealTimeStats,
	fetchNotifications,
	fetchLiveMatches,
	fetchRealTimeStats,
	type Notification,
	type LiveMatch,
	type RealTimeStats
} from '../store/slices/realtimeSlice'
import {
	addTalentActivity,
	addTeamActivity,
	updateTalentProfileViews,
	updateTeamMetrics
} from '../store/slices/analyticsSlice'

interface UseRealTimeOptions {
	enabled?: boolean
	userId?: string
	userType?: 'talent' | 'employer'
	autoReconnect?: boolean
	maxReconnectAttempts?: number
	updateInterval?: number
}

interface WebSocketMessage {
	type: 'notification' | 'match' | 'stats_update' | 'activity' | 'error'
	data: any
	timestamp: string
}

export function useRealTime(options: UseRealTimeOptions = {}) {
	const {
		enabled = true,
		userId,
		userType = 'talent',
		autoReconnect = true,
		maxReconnectAttempts = 5,
		updateInterval = 30000 // 30 seconds
	} = options

	const dispatch = useAppDispatch()
	const { 
		isConnected, 
		connectionError, 
		reconnectAttempts,
		settings
	} = useAppSelector(state => state.realtime)
	const { user } = useAppSelector(state => state.auth)

	const wsRef = useRef<WebSocket | null>(null)
	const reconnectTimeoutRef = useRef<NodeJS.Timeout>()
	const updateIntervalRef = useRef<NodeJS.Timeout>()

	// Get WebSocket URL from environment
	const getWebSocketUrl = useCallback(() => {
		const baseUrl = import.meta.env.VITE_WS_URL || 'ws://localhost:5255'
		const token = localStorage.getItem('token')
		return `${baseUrl}/ws?token=${token}&userId=${userId}&userType=${userType}`
	}, [userId, userType])

	// Handle WebSocket messages
	const handleMessage = useCallback((event: MessageEvent) => {
		try {
			const message: WebSocketMessage = JSON.parse(event.data)
			
			switch (message.type) {
				case 'notification':
					if (settings.notificationTypes[message.data.type as keyof typeof settings.notificationTypes]) {
						dispatch(addNotification(message.data as Notification))
						
						// Browser notification if enabled
						if (settings.enableDesktop && 'Notification' in window && Notification.permission === 'granted') {
							new Notification(message.data.title, {
								body: message.data.message,
								icon: '/favicon.ico'
							})
						}
						
						// Sound notification if enabled
						if (settings.enableSound) {
							// Play notification sound
							const audio = new Audio('/notification.mp3')
							audio.play().catch(() => {
								// Ignore audio play errors
							})
						}
					}
					break

				case 'match':
					dispatch(addLiveMatch(message.data as LiveMatch))
					
					// Add to analytics activity
					if (userType === 'talent') {
						dispatch(addTalentActivity({
							id: `match_${Date.now()}`,
							type: 'match',
							description: `New job match found with ${message.data.matchScore}% compatibility`,
							timestamp: new Date().toISOString(),
							value: `${message.data.matchScore}%`,
							metadata: message.data
						}))
					} else {
						dispatch(addTeamActivity({
							id: `match_${Date.now()}`,
							type: 'match',
							description: `New candidate match found`,
							timestamp: new Date().toISOString(),
							metadata: message.data
						}))
					}
					break

				case 'stats_update':
					dispatch(updateRealTimeStats(message.data as Partial<RealTimeStats>))
					
					// Update analytics if specific metrics
					if (userType === 'talent' && message.data.profileViews) {
						dispatch(updateTalentProfileViews({
							current: message.data.profileViews,
							change: message.data.profileViewsChange || 0,
							trend: message.data.profileViewsTrend || 'up'
						}))
					} else if (userType === 'employer') {
						dispatch(updateTeamMetrics(message.data))
					}
					break

				case 'activity':
					if (userType === 'talent') {
						dispatch(addTalentActivity(message.data))
					} else {
						dispatch(addTeamActivity(message.data))
					}
					break

				case 'error':
					console.error('WebSocket error:', message.data)
					dispatch(setConnectionError(message.data.message || 'Unknown error'))
					break

				default:
					console.warn('Unknown message type:', message.type)
			}
		} catch (error) {
			console.error('Error parsing WebSocket message:', error)
		}
	}, [dispatch, settings, userType])

	// Connect to WebSocket
	const connect = useCallback(() => {
		if (!enabled || !userId || !user) return

		try {
			const wsUrl = getWebSocketUrl()
			wsRef.current = new WebSocket(wsUrl)

			wsRef.current.onopen = () => {
				console.log('WebSocket connected')
				dispatch(setConnected(true))
				dispatch(resetReconnectAttempts())
			}

			wsRef.current.onmessage = handleMessage

			wsRef.current.onclose = (event) => {
				console.log('WebSocket disconnected:', event.code, event.reason)
				dispatch(setConnected(false))

				// Auto-reconnect if enabled and not intentionally closed
				if (autoReconnect && event.code !== 1000 && reconnectAttempts < maxReconnectAttempts) {
					const delay = Math.min(1000 * Math.pow(2, reconnectAttempts), 30000) // Exponential backoff, max 30s
					
					reconnectTimeoutRef.current = setTimeout(() => {
						dispatch(incrementReconnectAttempts())
						connect()
					}, delay)
				}
			}

			wsRef.current.onerror = (error) => {
				console.error('WebSocket error:', error)
				dispatch(setConnectionError('Connection failed'))
			}

		} catch (error) {
			console.error('Failed to create WebSocket connection:', error)
			dispatch(setConnectionError('Failed to connect'))
		}
	}, [
		enabled, 
		userId, 
		user, 
		autoReconnect, 
		reconnectAttempts, 
		maxReconnectAttempts, 
		getWebSocketUrl, 
		handleMessage, 
		dispatch
	])

	// Disconnect WebSocket
	const disconnect = useCallback(() => {
		if (reconnectTimeoutRef.current) {
			clearTimeout(reconnectTimeoutRef.current)
		}
		
		if (wsRef.current) {
			wsRef.current.close(1000, 'Intentional disconnect')
			wsRef.current = null
		}
		
		dispatch(setConnected(false))
	}, [dispatch])

	// Send message through WebSocket
	const sendMessage = useCallback((message: any) => {
		if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
			wsRef.current.send(JSON.stringify(message))
			return true
		}
		return false
	}, [])

	// Periodic data refresh
	const startPeriodicRefresh = useCallback(() => {
		if (!enabled || !userId) return

		updateIntervalRef.current = setInterval(() => {
			// Fetch latest data if WebSocket is not connected
			if (!isConnected) {
				dispatch(fetchNotifications({ userId }))
				dispatch(fetchLiveMatches({ userId, userType }))
				dispatch(fetchRealTimeStats({ userId, userType }))
			}
		}, updateInterval)
	}, [enabled, userId, userType, isConnected, updateInterval, dispatch])

	// Stop periodic refresh
	const stopPeriodicRefresh = useCallback(() => {
		if (updateIntervalRef.current) {
			clearInterval(updateIntervalRef.current)
		}
	}, [])

	// Request desktop notification permission
	const requestNotificationPermission = useCallback(async () => {
		if ('Notification' in window && Notification.permission === 'default') {
			const permission = await Notification.requestPermission()
			return permission === 'granted'
		}
		return Notification.permission === 'granted'
	}, [])

	// Initialize real-time connection
	useEffect(() => {
		if (enabled && settings.enableNotifications) {
			// Request notification permission if needed
			requestNotificationPermission()
			
			// Connect WebSocket
			connect()
			
			// Start periodic refresh as fallback
			startPeriodicRefresh()
			
			// Initial data fetch
			if (userId) {
				dispatch(fetchNotifications({ userId }))
				dispatch(fetchLiveMatches({ userId, userType }))
				dispatch(fetchRealTimeStats({ userId, userType }))
			}
		}

		return () => {
			disconnect()
			stopPeriodicRefresh()
		}
	}, [
		enabled,
		settings.enableNotifications,
		userId,
		userType,
		connect,
		disconnect,
		startPeriodicRefresh,
		stopPeriodicRefresh,
		requestNotificationPermission,
		dispatch
	])

	// Clean up on unmount
	useEffect(() => {
		return () => {
			disconnect()
			stopPeriodicRefresh()
		}
	}, [disconnect, stopPeriodicRefresh])

	// Public API
	return {
		// Connection state
		isConnected,
		connectionError,
		reconnectAttempts,

		// Actions
		connect,
		disconnect,
		sendMessage,
		requestNotificationPermission,

		// Utilities
		isSupported: typeof WebSocket !== 'undefined',
		hasNotificationPermission: 'Notification' in window && Notification.permission === 'granted'
	}
}

export default useRealTime 