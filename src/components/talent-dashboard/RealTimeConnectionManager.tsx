import React, { useState, useEffect, useCallback } from 'react'
import { Wifi, WifiOff, Activity, Zap, AlertTriangle, CheckCircle, Globe, Settings, RefreshCw, Signal, BarChart3, Clock, TrendingUp, Users } from 'lucide-react'
import { useRealTime } from '../../hooks/useRealTime'
import { useAppSelector, useAppDispatch } from '../../store/hooks'
import { updateNotificationSettings } from '../../store/slices/realtimeSlice'
import api from '../../services/api'

interface ConnectionMetrics {
	latency: number
	lastHeartbeat: string
	packetsReceived: number
	packetsSent: number
	reconnectCount: number
	uptime: number
	bandwidth: number
	quality: 'excellent' | 'good' | 'fair' | 'poor'
}

interface ServerStatus {
	isOnline: boolean
	version: string
	uptime: number
	connectedUsers: number
	serverLoad: number
	region: string
	lastUpdated: string
}

interface RealTimeConnectionManagerProps {
	className?: string
	showDetailed?: boolean
}

function RealTimeConnectionManager({ 
	className = '', 
	showDetailed = false 
}: RealTimeConnectionManagerProps) {
	const [metrics, setMetrics] = useState<ConnectionMetrics>({
		latency: 0,
		lastHeartbeat: new Date().toISOString(),
		packetsReceived: 0,
		packetsSent: 0,
		reconnectCount: 0,
		uptime: 0,
		bandwidth: 0,
		quality: 'good'
	})
	const [serverStatus, setServerStatus] = useState<ServerStatus>({
		isOnline: true,
		version: '1.0.0',
		uptime: 0,
		connectedUsers: 0,
		serverLoad: 0,
		region: 'EU-West',
		lastUpdated: new Date().toISOString()
	})
	const [isLoading, setIsLoading] = useState(false)
	const [showSettings, setShowSettings] = useState(false)
	const [connectionHistory, setConnectionHistory] = useState<Array<{ timestamp: string; status: 'connected' | 'disconnected'; reason?: string }>>([])

	const dispatch = useAppDispatch()
	const { user } = useAppSelector(state => state.auth)
	const { isConnected, connectionError, reconnectAttempts } = useAppSelector(state => state.realtime)
	const settings = useAppSelector(state => state.realtime.settings)

	// Add missing properties with default values
	const connectionSettings = {
		...settings,
		isEnabled: settings.enableNotifications, // Map enableNotifications to isEnabled
		autoReconnect: true // Default value since not in slice
	}

	// Initialize real-time connection with detailed monitoring
	const { sendMessage, disconnect, connect } = useRealTime({
		enabled: connectionSettings.isEnabled,
		userId: user?.id,
		userType: 'talent',
		autoReconnect: connectionSettings.autoReconnect,
		maxReconnectAttempts: 5,
		updateInterval: settings.updateInterval
	})

	// Fetch server status
	const fetchServerStatus = useCallback(async () => {
		try {
			const response = await api.get('/real-time/server-status')
			if (response.data) {
				setServerStatus(prev => ({
					...prev,
					...response.data,
					lastUpdated: new Date().toISOString()
				}))
			}
		} catch (err) {
			console.error('Failed to fetch server status:', err)
		}
	}, [])

	// Test connection quality
	const testConnectionQuality = useCallback(async () => {
		if (!isConnected || !sendMessage) return

		const startTime = performance.now()
		
		try {
			// Send ping message
			sendMessage({
				type: 'ping',
				timestamp: startTime
			})

			// Wait for pong response (would be handled in WebSocket message handler)
			// This is a simplified version - actual implementation would track response
			setTimeout(() => {
				const endTime = performance.now()
				const latency = Math.round(endTime - startTime)
				
				setMetrics(prev => ({
					...prev,
					latency,
					lastHeartbeat: new Date().toISOString(),
					quality: latency < 50 ? 'excellent' : 
							latency < 150 ? 'good' : 
							latency < 300 ? 'fair' : 'poor'
				}))
			}, 100)
		} catch (err) {
			console.error('Connection test failed:', err)
		}
	}, [isConnected, sendMessage])

	// Update connection settings
	const updateConnectionSettings = useCallback((newSettings: Partial<typeof connectionSettings>) => {
		// Map back to actual slice properties
		const sliceSettings: any = {}
		
		if ('isEnabled' in newSettings) {
			sliceSettings.enableNotifications = newSettings.isEnabled
		}
		
		// Copy other valid properties
		Object.keys(newSettings).forEach(key => {
			if (key !== 'isEnabled' && key !== 'autoReconnect' && key in settings) {
				sliceSettings[key] = newSettings[key as keyof typeof settings]
			}
		})
		
		if (Object.keys(sliceSettings).length > 0) {
			dispatch(updateNotificationSettings(sliceSettings))
		}
	}, [dispatch, settings])

	// Force reconnection
	const handleReconnect = useCallback(async () => {
		setIsLoading(true)
		try {
			if (isConnected) {
				await disconnect()
				setTimeout(() => {
					connect()
				}, 1000)
			} else {
				connect()
			}
		} catch (err) {
			console.error('Reconnection failed:', err)
		} finally {
			setIsLoading(false)
		}
	}, [isConnected, disconnect, connect])

	// Periodic health checks
	useEffect(() => {
		if (isConnected) {
			const interval = setInterval(() => {
				testConnectionQuality()
				fetchServerStatus()
				
				// Update uptime
				setMetrics(prev => ({
					...prev,
					uptime: prev.uptime + 30 // 30 seconds interval
				}))
			}, 30000) // Every 30 seconds

			return () => clearInterval(interval)
		}
	}, [isConnected, testConnectionQuality, fetchServerStatus])

	// Initial data fetch
	useEffect(() => {
		fetchServerStatus()
		if (isConnected) {
			testConnectionQuality()
		}
	}, [isConnected, fetchServerStatus, testConnectionQuality])

	const getConnectionQualityColor = (quality: string) => {
		switch (quality) {
			case 'excellent':
				return 'text-green-500'
			case 'good':
				return 'text-blue-500'
			case 'fair':
				return 'text-yellow-500'
			case 'poor':
				return 'text-red-500'
			default:
				return 'text-gray-500'
		}
	}

	const getConnectionQualityBars = (quality: string) => {
		const bars = []
		const levels = quality === 'excellent' ? 4 : quality === 'good' ? 3 : quality === 'fair' ? 2 : 1
		
		for (let i = 0; i < 4; i++) {
			bars.push(
				<div
					key={i}
					className={`w-1 h-${2 + i} rounded-full ${
						i < levels ? getConnectionQualityColor(quality).replace('text-', 'bg-') : 'bg-gray-300 dark:bg-gray-600'
					}`}
				/>
			)
		}
		return bars
	}

	const formatUptime = (seconds: number) => {
		const hours = Math.floor(seconds / 3600)
		const minutes = Math.floor((seconds % 3600) / 60)
		const secs = seconds % 60
		
		if (hours > 0) {
			return `${hours}h ${minutes}m`
		} else if (minutes > 0) {
			return `${minutes}m ${secs}s`
		} else {
			return `${secs}s`
		}
	}

	return (
		<div className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 ${className}`}>
			{/* Main Status Bar */}
			<div className="p-4 border-b border-gray-200 dark:border-gray-700">
				<div className="flex items-center justify-between">
					<div className="flex items-center space-x-3">
						<div className="relative">
							{isConnected ? (
								<Wifi className="w-5 h-5 text-green-500" />
							) : (
								<WifiOff className="w-5 h-5 text-red-500" />
							)}
							{isLoading && (
								<div className="absolute inset-0 animate-spin">
									<RefreshCw className="w-5 h-5 text-blue-500" />
								</div>
							)}
						</div>
						<div>
							<h3 className="font-medium text-gray-900 dark:text-white">
								Real-Time Connection
							</h3>
							<p className="text-sm text-gray-600 dark:text-gray-400">
								{isConnected ? 'Connected' : connectionError || 'Disconnected'}
							</p>
						</div>
					</div>

					<div className="flex items-center space-x-3">
						{/* Connection Quality */}
						<div className="flex items-center space-x-2">
							<div className="flex items-end space-x-px">
								{getConnectionQualityBars(metrics.quality)}
							</div>
							<span className={`text-sm font-medium ${getConnectionQualityColor(metrics.quality)}`}>
								{metrics.quality}
							</span>
						</div>

						{/* Latency */}
						<div className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-400">
							<Activity className="w-4 h-4" />
							<span>{metrics.latency}ms</span>
						</div>

						{/* Settings */}
						<button
							onClick={() => setShowSettings(!showSettings)}
							className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
						>
							<Settings className="w-4 h-4 text-gray-600 dark:text-gray-400" />
						</button>
					</div>
				</div>

				{/* Status Indicators */}
				<div className="mt-3 flex items-center space-x-6">
					<div className="flex items-center space-x-2">
						<div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} />
						<span className="text-sm text-gray-600 dark:text-gray-400">
							{isConnected ? 'Live' : 'Offline'}
						</span>
					</div>
					
					{reconnectAttempts > 0 && (
						<div className="flex items-center space-x-2">
							<AlertTriangle className="w-4 h-4 text-yellow-500" />
							<span className="text-sm text-gray-600 dark:text-gray-400">
								{reconnectAttempts} reconnect attempts
							</span>
						</div>
					)}

					<div className="flex items-center space-x-2">
						<Globe className="w-4 h-4 text-gray-400" />
						<span className="text-sm text-gray-600 dark:text-gray-400">
							{serverStatus.region}
						</span>
					</div>

					<div className="flex items-center space-x-2">
						<Users className="w-4 h-4 text-gray-400" />
						<span className="text-sm text-gray-600 dark:text-gray-400">
							{serverStatus.connectedUsers} online
						</span>
					</div>
				</div>
			</div>

			{/* Settings Panel */}
			{showSettings && (
				<div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
					<h4 className="font-medium text-gray-900 dark:text-white mb-3">Connection Settings</h4>
					
					<div className="space-y-3">
						<div className="flex items-center justify-between">
							<label className="text-sm text-gray-700 dark:text-gray-300">
								Enable Real-Time Features
							</label>
							<label className="relative inline-flex items-center cursor-pointer">
								<input
									type="checkbox"
									checked={connectionSettings.isEnabled}
									onChange={(e) => updateConnectionSettings({ isEnabled: e.target.checked })}
									className="sr-only peer"
								/>
								<div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" />
							</label>
						</div>

						<div className="flex items-center justify-between">
							<label className="text-sm text-gray-700 dark:text-gray-300">
								Auto-Reconnect
							</label>
							<label className="relative inline-flex items-center cursor-pointer">
								<input
									type="checkbox"
									checked={connectionSettings.autoReconnect}
									onChange={(e) => updateConnectionSettings({ autoReconnect: e.target.checked })}
									className="sr-only peer"
								/>
								<div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" />
							</label>
						</div>

						<div className="flex items-center justify-between">
							<label className="text-sm text-gray-700 dark:text-gray-300">
								Desktop Notifications
							</label>
							<label className="relative inline-flex items-center cursor-pointer">
								<input
									type="checkbox"
									checked={connectionSettings.enableDesktop}
									onChange={(e) => updateConnectionSettings({ enableDesktop: e.target.checked })}
									className="sr-only peer"
								/>
								<div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" />
							</label>
						</div>

						<div className="flex items-center justify-between">
							<label className="text-sm text-gray-700 dark:text-gray-300">
								Sound Notifications
							</label>
							<label className="relative inline-flex items-center cursor-pointer">
								<input
									type="checkbox"
									checked={connectionSettings.enableSound}
									onChange={(e) => updateConnectionSettings({ enableSound: e.target.checked })}
									className="sr-only peer"
								/>
								<div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" />
							</label>
						</div>

						<div>
							<label className="text-sm text-gray-700 dark:text-gray-300 block mb-2">
								Update Interval: {settings.updateInterval / 1000}s
							</label>
							<input
								type="range"
								min="10000"
								max="60000"
								step="5000"
								value={settings.updateInterval}
								onChange={(e) => updateConnectionSettings({ updateInterval: parseInt(e.target.value) })}
								className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
							/>
						</div>
					</div>

					<div className="mt-4 flex space-x-2">
						<button
							onClick={handleReconnect}
							disabled={isLoading}
							className="px-3 py-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white text-sm rounded transition-colors"
						>
							{isLoading ? 'Reconnecting...' : 'Reconnect'}
						</button>
						<button
							onClick={testConnectionQuality}
							className="px-3 py-1 bg-gray-600 hover:bg-gray-700 text-white text-sm rounded transition-colors"
						>
							Test Connection
						</button>
					</div>
				</div>
			)}

			{/* Detailed Metrics */}
			{showDetailed && (
				<div className="p-4">
					<h4 className="font-medium text-gray-900 dark:text-white mb-3">Connection Metrics</h4>
					
					<div className="grid grid-cols-2 gap-4">
						<div className="bg-gray-50 dark:bg-gray-900/50 p-3 rounded-lg">
							<div className="flex items-center space-x-2 mb-1">
								<BarChart3 className="w-4 h-4 text-blue-500" />
								<span className="text-sm font-medium text-gray-700 dark:text-gray-300">Packets</span>
							</div>
							<p className="text-xs text-gray-600 dark:text-gray-400">
								Sent: {metrics.packetsSent} | Received: {metrics.packetsReceived}
							</p>
						</div>

						<div className="bg-gray-50 dark:bg-gray-900/50 p-3 rounded-lg">
							<div className="flex items-center space-x-2 mb-1">
								<Clock className="w-4 h-4 text-green-500" />
								<span className="text-sm font-medium text-gray-700 dark:text-gray-300">Uptime</span>
							</div>
							<p className="text-xs text-gray-600 dark:text-gray-400">
								{formatUptime(metrics.uptime)}
							</p>
						</div>

						<div className="bg-gray-50 dark:bg-gray-900/50 p-3 rounded-lg">
							<div className="flex items-center space-x-2 mb-1">
								<TrendingUp className="w-4 h-4 text-purple-500" />
								<span className="text-sm font-medium text-gray-700 dark:text-gray-300">Bandwidth</span>
							</div>
							<p className="text-xs text-gray-600 dark:text-gray-400">
								{(metrics.bandwidth / 1024).toFixed(1)} KB/s
							</p>
						</div>

						<div className="bg-gray-50 dark:bg-gray-900/50 p-3 rounded-lg">
							<div className="flex items-center space-x-2 mb-1">
								<Zap className="w-4 h-4 text-yellow-500" />
								<span className="text-sm font-medium text-gray-700 dark:text-gray-300">Server Load</span>
							</div>
							<p className="text-xs text-gray-600 dark:text-gray-400">
								{serverStatus.serverLoad}%
							</p>
						</div>
					</div>

					<div className="mt-4 text-xs text-gray-500 dark:text-gray-400 text-center">
						Last updated: {new Date(serverStatus.lastUpdated).toLocaleTimeString()}
					</div>
				</div>
			)}
		</div>
	)
}

export default RealTimeConnectionManager 