import React, { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react'
import { useAppSelector, useAppDispatch } from '../../store/hooks'
import { 
	setConnected, 
	setConnectionError, 
	incrementReconnectAttempts,
	resetReconnectAttempts,
	addNotification,
	addLiveMatch,
	updateRealTimeStats,
	addPendingUpdate
} from '../../store/slices/realtimeSlice'

// WebSocket message types
interface WebSocketMessage {
	type: 'notification' | 'match' | 'stats_update' | 'activity' | 'system' | 'heartbeat'
	data: any
	timestamp: string
	userId?: string
	sessionId?: string
}

interface WebSocketContextType {
	isConnected: boolean
	connectionQuality: 'excellent' | 'good' | 'fair' | 'poor'
	latency: number
	sendMessage: (message: WebSocketMessage) => void
	forceReconnect: () => void
	subscribe: (eventType: string, callback: (data: any) => void) => () => void
	getConnectionStats: () => ConnectionStats
}

interface ConnectionStats {
	connectedAt: string | null
	reconnectCount: number
	messagesReceived: number
	messagesSent: number
	lastHeartbeat: string | null
	averageLatency: number
	uptime: number
}

interface WebSocketProviderProps {
	children: React.ReactNode
	endpoint?: string
	autoConnect?: boolean
	heartbeatInterval?: number
	reconnectDelay?: number
	maxReconnectAttempts?: number
}

const WebSocketContext = createContext<WebSocketContextType | null>(null)

export function WebSocketProvider({
	children,
	endpoint = 'ws://localhost:5255/ws',
	autoConnect = false,
	heartbeatInterval = 30000, // 30 seconds
	reconnectDelay = 5000, // 5 seconds
	maxReconnectAttempts = 10
}: WebSocketProviderProps) {
	const [ws, setWs] = useState<WebSocket | null>(null)
	const [connectionQuality, setConnectionQuality] = useState<'excellent' | 'good' | 'fair' | 'poor'>('good')
	const [latency, setLatency] = useState(0)
	const [connectionStats, setConnectionStats] = useState<ConnectionStats>({
		connectedAt: null,
		reconnectCount: 0,
		messagesReceived: 0,
		messagesSent: 0,
		lastHeartbeat: null,
		averageLatency: 0,
		uptime: 0
	})

	const dispatch = useAppDispatch()
	const { user } = useAppSelector(state => state.auth)
	const { isConnected, connectionError, reconnectAttempts, settings } = useAppSelector(state => state.realtime)

	const wsRef = useRef<WebSocket | null>(null)
	const heartbeatRef = useRef<NodeJS.Timeout | null>(null)
	const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null)
	const latencyCheckRef = useRef<NodeJS.Timeout | null>(null)
	const eventListenersRef = useRef<Map<string, Set<(data: any) => void>>>(new Map())
	const latencyHistoryRef = useRef<number[]>([])

	// Calculate connection quality based on latency and reconnection count
	const updateConnectionQuality = useCallback(() => {
		const avgLatency = latencyHistoryRef.current.length > 0 
			? latencyHistoryRef.current.reduce((a, b) => a + b, 0) / latencyHistoryRef.current.length 
			: latency

		let quality: 'excellent' | 'good' | 'fair' | 'poor'
		
		if (avgLatency < 100 && reconnectAttempts === 0) {
			quality = 'excellent'
		} else if (avgLatency < 250 && reconnectAttempts < 2) {
			quality = 'good'
		} else if (avgLatency < 500 && reconnectAttempts < 5) {
			quality = 'fair'
		} else {
			quality = 'poor'
		}

		setConnectionQuality(quality)
	}, [latency, reconnectAttempts])

	// Send heartbeat to measure latency
	const sendHeartbeat = useCallback(() => {
		if (wsRef.current?.readyState === WebSocket.OPEN) {
			const heartbeatMessage: WebSocketMessage = {
				type: 'heartbeat',
				data: { timestamp: Date.now() },
				timestamp: new Date().toISOString(),
				userId: user?.id,
				sessionId: `session_${Date.now()}`
			}

			wsRef.current.send(JSON.stringify(heartbeatMessage))
			setConnectionStats(prev => ({
				...prev,
				messagesSent: prev.messagesSent + 1
			}))
		}
	}, [user?.id])

	// Start heartbeat interval
	const startHeartbeat = useCallback(() => {
		if (heartbeatRef.current) {
			clearInterval(heartbeatRef.current)
		}

		heartbeatRef.current = setInterval(sendHeartbeat, heartbeatInterval)
	}, [sendHeartbeat, heartbeatInterval])

	// Stop heartbeat interval
	const stopHeartbeat = useCallback(() => {
		if (heartbeatRef.current) {
			clearInterval(heartbeatRef.current)
			heartbeatRef.current = null
		}
	}, [])

	// Handle incoming WebSocket messages
	const handleMessage = useCallback((event: MessageEvent) => {
		try {
			const message: WebSocketMessage = JSON.parse(event.data)
			
			setConnectionStats(prev => ({
				...prev,
				messagesReceived: prev.messagesReceived + 1,
				lastHeartbeat: message.type === 'heartbeat' ? new Date().toISOString() : prev.lastHeartbeat
			}))

			// Handle heartbeat response for latency calculation
			if (message.type === 'heartbeat' && message.data?.timestamp) {
				const currentLatency = Date.now() - message.data.timestamp
				setLatency(currentLatency)
				
				// Update latency history (keep last 10 measurements)
				latencyHistoryRef.current.push(currentLatency)
				if (latencyHistoryRef.current.length > 10) {
					latencyHistoryRef.current.shift()
				}

				const avgLatency = latencyHistoryRef.current.reduce((a, b) => a + b, 0) / latencyHistoryRef.current.length
				setConnectionStats(prev => ({
					...prev,
					averageLatency: avgLatency
				}))

				updateConnectionQuality()
				return
			}

			// Dispatch to Redux store based on message type
			switch (message.type) {
				case 'notification':
					if (settings.enableNotifications && settings.notificationTypes[message.data.type as keyof typeof settings.notificationTypes]) {
						dispatch(addNotification(message.data))
						
						// Desktop notification if enabled
						if (settings.enableDesktop && 'Notification' in window && Notification.permission === 'granted') {
							new Notification(message.data.title, {
								body: message.data.message,
								icon: '/favicon.ico',
								tag: message.data.id
							})
						}

						// Sound notification if enabled
						if (settings.enableSound) {
							// Play notification sound
							const audio = new Audio('/notification.mp3')
							audio.volume = 0.3
							audio.play().catch(() => {
								// Ignore audio play errors (browser restrictions)
							})
						}
					}
					break

				case 'match':
					dispatch(addLiveMatch(message.data))
					break

				case 'stats_update':
					dispatch(updateRealTimeStats(message.data))
					break

				case 'activity':
					dispatch(addPendingUpdate({ type: 'activity', data: message.data }))
					break

				case 'system':
					// Handle system messages (maintenance, updates, etc.)
					dispatch(addNotification({
						id: `system_${Date.now()}`,
						type: 'system',
						title: 'System Notice',
						message: message.data.message || 'System update received',
						timestamp: message.timestamp,
						isRead: false,
						priority: message.data.priority || 'medium'
					}))
					break
			}

			// Notify event listeners
			const listeners = eventListenersRef.current.get(message.type)
			if (listeners) {
				listeners.forEach(callback => callback(message.data))
			}

		} catch (error) {
			console.error('Error parsing WebSocket message:', error)
			dispatch(setConnectionError('Failed to parse incoming message'))
		}
	}, [dispatch, settings, updateConnectionQuality])

	// Connect to WebSocket
	const connect = useCallback(() => {
		if (wsRef.current?.readyState === WebSocket.OPEN) {
			return // Already connected
		}

		try {
			const websocket = new WebSocket(`${endpoint}?userId=${user?.id}&userType=talent`)
			wsRef.current = websocket
			setWs(websocket)

			websocket.onopen = () => {
				console.log('WebSocket connected')
				dispatch(setConnected(true))
				dispatch(resetReconnectAttempts())
				setConnectionStats(prev => ({
					...prev,
					connectedAt: new Date().toISOString(),
					uptime: 0
				}))
				startHeartbeat()

				// Send initial connection message
				const connectMessage: WebSocketMessage = {
					type: 'system',
					data: { 
						action: 'connect',
						userAgent: navigator.userAgent,
						timestamp: Date.now()
					},
					timestamp: new Date().toISOString(),
					userId: user?.id
				}
				websocket.send(JSON.stringify(connectMessage))
			}

			websocket.onmessage = handleMessage

			websocket.onclose = (event) => {
				console.log('WebSocket disconnected:', event.code, event.reason)
				dispatch(setConnected(false))
				stopHeartbeat()
				
				// Auto-reconnect if not intentional disconnect
				if (event.code !== 1000 && reconnectAttempts < maxReconnectAttempts) {
					dispatch(incrementReconnectAttempts())
					setConnectionStats(prev => ({
						...prev,
						reconnectCount: prev.reconnectCount + 1
					}))
					
					reconnectTimeoutRef.current = setTimeout(() => {
						connect()
					}, reconnectDelay * Math.pow(2, reconnectAttempts)) // Exponential backoff
				}
			}

			websocket.onerror = (error) => {
				console.error('WebSocket error:', error)
				dispatch(setConnectionError('Connection error occurred'))
			}

		} catch (error) {
			console.error('Failed to create WebSocket connection:', error)
			dispatch(setConnectionError('Failed to establish connection'))
		}
	}, [endpoint, user?.id, handleMessage, startHeartbeat, stopHeartbeat, reconnectAttempts, maxReconnectAttempts, reconnectDelay, dispatch])

	// Disconnect from WebSocket
	const disconnect = useCallback(() => {
		stopHeartbeat()
		
		if (reconnectTimeoutRef.current) {
			clearTimeout(reconnectTimeoutRef.current)
			reconnectTimeoutRef.current = null
		}

		if (wsRef.current) {
			wsRef.current.close(1000, 'User disconnected')
			wsRef.current = null
			setWs(null)
		}

		dispatch(setConnected(false))
		dispatch(resetReconnectAttempts())
	}, [stopHeartbeat, dispatch])

	// Send message through WebSocket
	const sendMessage = useCallback((message: WebSocketMessage) => {
		if (wsRef.current?.readyState === WebSocket.OPEN) {
			wsRef.current.send(JSON.stringify(message))
			setConnectionStats(prev => ({
				...prev,
				messagesSent: prev.messagesSent + 1
			}))
		} else {
			console.warn('WebSocket not connected, cannot send message')
			dispatch(setConnectionError('Cannot send message: not connected'))
		}
	}, [dispatch])

	// Force reconnection
	const forceReconnect = useCallback(() => {
		disconnect()
		setTimeout(connect, 1000)
	}, [disconnect, connect])

	// Subscribe to specific event types
	const subscribe = useCallback((eventType: string, callback: (data: any) => void) => {
		if (!eventListenersRef.current.has(eventType)) {
			eventListenersRef.current.set(eventType, new Set())
		}
		
		eventListenersRef.current.get(eventType)!.add(callback)

		// Return unsubscribe function
		return () => {
			const listeners = eventListenersRef.current.get(eventType)
			if (listeners) {
				listeners.delete(callback)
				if (listeners.size === 0) {
					eventListenersRef.current.delete(eventType)
				}
			}
		}
	}, [])

	// Get connection statistics
	const getConnectionStats = useCallback((): ConnectionStats => {
		const currentTime = Date.now()
		const connectedAt = connectionStats.connectedAt ? new Date(connectionStats.connectedAt).getTime() : null
		const uptime = connectedAt ? Math.floor((currentTime - connectedAt) / 1000) : 0

		return {
			...connectionStats,
			uptime
		}
	}, [connectionStats])

	// Initialize connection
	useEffect(() => {
		if (autoConnect && user?.id && settings.enableNotifications) {
			connect()
		}

		return () => {
			disconnect()
		}
	}, [autoConnect, user?.id, settings.enableNotifications])

	// Update uptime periodically
	useEffect(() => {
		const interval = setInterval(() => {
			if (connectionStats.connectedAt) {
				const uptime = Math.floor((Date.now() - new Date(connectionStats.connectedAt).getTime()) / 1000)
				setConnectionStats(prev => ({ ...prev, uptime }))
			}
		}, 1000)

		return () => clearInterval(interval)
	}, [connectionStats.connectedAt])

	// Request desktop notification permission
	useEffect(() => {
		if (settings.enableDesktop && 'Notification' in window && Notification.permission === 'default') {
			Notification.requestPermission()
		}
	}, [settings.enableDesktop])

	const contextValue: WebSocketContextType = {
		isConnected,
		connectionQuality,
		latency,
		sendMessage,
		forceReconnect,
		subscribe,
		getConnectionStats
	}

	return (
		<WebSocketContext.Provider value={contextValue}>
			{children}
		</WebSocketContext.Provider>
	)
}

export function useWebSocket(): WebSocketContextType {
	const context = useContext(WebSocketContext)
	if (!context) {
		throw new Error('useWebSocket must be used within a WebSocketProvider')
	}
	return context
}

// Hook for subscribing to specific WebSocket events
export function useWebSocketEvent(eventType: string, callback: (data: any) => void) {
	const { subscribe } = useWebSocket()

	useEffect(() => {
		const unsubscribe = subscribe(eventType, callback)
		return unsubscribe
	}, [eventType, callback, subscribe])
}

// Hook for getting real-time connection metrics
export function useConnectionMetrics() {
	const { isConnected, connectionQuality, latency, getConnectionStats } = useWebSocket()
	const [stats, setStats] = useState<ConnectionStats | null>(null)

	useEffect(() => {
		const interval = setInterval(() => {
			setStats(getConnectionStats())
		}, 1000)

		return () => clearInterval(interval)
	}, [getConnectionStats])

	return {
		isConnected,
		connectionQuality,
		latency,
		stats
	}
}

export default WebSocketProvider 