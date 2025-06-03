import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { 
	LineChart, Line, AreaChart, Area, BarChart, Bar, ResponsiveContainer,
	XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell
} from 'recharts'
import { 
	Activity, TrendingUp, TrendingDown, Cpu, Database,
	Globe, Users, Clock, Zap, AlertTriangle, CheckCircle, 
	XCircle, Server, Wifi, Signal, Eye, MousePointer, 
	Navigation, RefreshCw, Download, Settings, Bell,
	BarChart3, PieChart as PieChartIcon, Target
} from 'lucide-react'
import { useWebSocket, useConnectionMetrics } from './WebSocketProvider'
import { useAppSelector } from '../../store/hooks'

interface SystemMetrics {
	timestamp: string
	cpu: number
	memory: number
	network: number
	responseTime: number
	throughput: number
	errorRate: number
	activeUsers: number
	concurrentSessions: number
}

interface UserEngagementMetrics {
	pageViews: number
	sessionDuration: number
	bounceRate: number
	clickThroughRate: number
	conversionRate: number
	userSatisfaction: number
	interactionRate: number
	timeOnSite: number
}

interface PerformanceAlert {
	id: string
	type: 'critical' | 'warning' | 'info'
	title: string
	message: string
	timestamp: string
	metric: string
	value: number
	threshold: number
	isResolved: boolean
}

interface GeographicData {
	country: string
	users: number
	responseTime: number
	errorRate: number
	satisfaction: number
}

const METRIC_THRESHOLDS = {
	cpu: { warning: 70, critical: 85 },
	memory: { warning: 75, critical: 90 },
	responseTime: { warning: 1000, critical: 2000 },
	errorRate: { warning: 1, critical: 5 },
	throughput: { warning: 100, critical: 50 }
}

const CHART_COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4']

export default function PerformanceMonitoringDashboard() {
	const [selectedTimeRange, setSelectedTimeRange] = useState<'1h' | '6h' | '24h' | '7d'>('1h')
	const [activeTab, setActiveTab] = useState<'overview' | 'system' | 'users' | 'geography' | 'alerts'>('overview')
	const [isAutoRefresh, setIsAutoRefresh] = useState(true)
	const [refreshInterval, setRefreshInterval] = useState(30) // seconds
	
	// Mock data - in real implementation this would come from WebSocket and API
	const [systemMetrics, setSystemMetrics] = useState<SystemMetrics[]>([])
	const [userEngagement, setUserEngagement] = useState<UserEngagementMetrics>({
		pageViews: 15420,
		sessionDuration: 185,
		bounceRate: 32.5,
		clickThroughRate: 4.2,
		conversionRate: 2.8,
		userSatisfaction: 87,
		interactionRate: 68.5,
		timeOnSite: 342
	})
	const [performanceAlerts, setPerformanceAlerts] = useState<PerformanceAlert[]>([])
	const [geographicData, setGeographicData] = useState<GeographicData[]>([])

	const { isConnected, connectionQuality, latency, stats } = useConnectionMetrics()
	const { sendMessage } = useWebSocket()

	// Generate mock system metrics
	const generateSystemMetrics = useCallback(() => {
		const now = new Date()
		const newMetrics: SystemMetrics[] = []
		
		for (let i = 0; i < 60; i++) {
			const timestamp = new Date(now.getTime() - i * 60000).toISOString()
			newMetrics.unshift({
				timestamp,
				cpu: Math.random() * 40 + 30 + Math.sin(i / 10) * 15,
				memory: Math.random() * 30 + 45 + Math.cos(i / 8) * 10,
				network: Math.random() * 50 + 25,
				responseTime: Math.random() * 200 + 300 + (Math.random() > 0.9 ? 500 : 0),
				throughput: Math.random() * 100 + 150,
				errorRate: Math.random() * 2 + 0.5,
				activeUsers: Math.floor(Math.random() * 500 + 1200),
				concurrentSessions: Math.floor(Math.random() * 300 + 800)
			})
		}
		
		setSystemMetrics(newMetrics)
	}, [])

	// Generate mock geographic data
	const generateGeographicData = useCallback(() => {
		const countries = ['Germany', 'Netherlands', 'France', 'UK', 'Switzerland', 'Austria', 'Belgium', 'Sweden', 'Denmark', 'Norway']
		const data = countries.map(country => ({
			country,
			users: Math.floor(Math.random() * 1000 + 100),
			responseTime: Math.random() * 300 + 200,
			errorRate: Math.random() * 3,
			satisfaction: Math.random() * 20 + 75
		}))
		setGeographicData(data)
	}, [])

	// Generate mock alerts
	const generateAlerts = useCallback(() => {
		const alerts: PerformanceAlert[] = [
			{
				id: '1',
				type: 'warning',
				title: 'High Response Time',
				message: 'Average response time exceeded 1.2s in the Netherlands region',
				timestamp: new Date(Date.now() - 300000).toISOString(),
				metric: 'responseTime',
				value: 1245,
				threshold: 1000,
				isResolved: false
			},
			{
				id: '2',
				type: 'critical',
				title: 'Memory Usage Spike',
				message: 'Server memory usage reached 88% - immediate attention required',
				timestamp: new Date(Date.now() - 180000).toISOString(),
				metric: 'memory',
				value: 88,
				threshold: 85,
				isResolved: false
			},
			{
				id: '3',
				type: 'info',
				title: 'User Traffic Surge',
				message: 'Concurrent users increased by 35% in the last hour',
				timestamp: new Date(Date.now() - 120000).toISOString(),
				metric: 'activeUsers',
				value: 1650,
				threshold: 1200,
				isResolved: true
			}
		]
		setPerformanceAlerts(alerts)
	}, [])

	// Initialize data
	useEffect(() => {
		generateSystemMetrics()
		generateGeographicData()
		generateAlerts()
	}, [generateSystemMetrics, generateGeographicData, generateAlerts])

	// Auto-refresh data
	useEffect(() => {
		if (!isAutoRefresh) return

		const interval = setInterval(() => {
			generateSystemMetrics()
			setUserEngagement(prev => ({
				...prev,
				pageViews: prev.pageViews + Math.floor(Math.random() * 50),
				sessionDuration: Math.max(0, prev.sessionDuration + (Math.random() - 0.5) * 10),
				userSatisfaction: Math.min(100, Math.max(0, prev.userSatisfaction + (Math.random() - 0.5) * 2))
			}))
		}, refreshInterval * 1000)

		return () => clearInterval(interval)
	}, [isAutoRefresh, refreshInterval, generateSystemMetrics])

	// Get current system health status
	const systemHealthStatus = useMemo(() => {
		if (systemMetrics.length === 0) return 'unknown'
		
		const latest = systemMetrics[systemMetrics.length - 1]
		const criticalIssues = [
			latest.cpu > METRIC_THRESHOLDS.cpu.critical,
			latest.memory > METRIC_THRESHOLDS.memory.critical,
			latest.responseTime > METRIC_THRESHOLDS.responseTime.critical,
			latest.errorRate > METRIC_THRESHOLDS.errorRate.critical
		].filter(Boolean).length

		const warnings = [
			latest.cpu > METRIC_THRESHOLDS.cpu.warning,
			latest.memory > METRIC_THRESHOLDS.memory.warning,
			latest.responseTime > METRIC_THRESHOLDS.responseTime.warning,
			latest.errorRate > METRIC_THRESHOLDS.errorRate.warning
		].filter(Boolean).length

		if (criticalIssues > 0) return 'critical'
		if (warnings > 0) return 'warning'
		return 'healthy'
	}, [systemMetrics])

	const getHealthColor = (status: string) => {
		switch (status) {
			case 'healthy': return 'text-green-600 bg-green-100'
			case 'warning': return 'text-yellow-600 bg-yellow-100'
			case 'critical': return 'text-red-600 bg-red-100'
			default: return 'text-gray-600 bg-gray-100'
		}
	}

	const getHealthIcon = (status: string) => {
		switch (status) {
			case 'healthy': return <CheckCircle className="w-5 h-5" />
			case 'warning': return <AlertTriangle className="w-5 h-5" />
			case 'critical': return <XCircle className="w-5 h-5" />
			default: return <Activity className="w-5 h-5" />
		}
	}

	const formatTimeAgo = (timestamp: string) => {
		const diff = Date.now() - new Date(timestamp).getTime()
		const minutes = Math.floor(diff / 60000)
		const hours = Math.floor(minutes / 60)
		
		if (hours > 0) return `${hours}h ${minutes % 60}m ago`
		return `${minutes}m ago`
	}

	const renderOverviewTab = () => (
		<div className="space-y-6">
			{/* System Health Overview */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
				<div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm text-gray-600">System Health</p>
							<div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mt-2 ${getHealthColor(systemHealthStatus)}`}>
								{getHealthIcon(systemHealthStatus)}
								<span className="ml-2 capitalize">{systemHealthStatus}</span>
							</div>
						</div>
						<Activity className="w-8 h-8 text-blue-500" />
					</div>
				</div>

				<div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm text-gray-600">Connection Quality</p>
							<p className="text-2xl font-bold text-gray-900 capitalize">{connectionQuality}</p>
							<p className="text-sm text-gray-500">{latency}ms latency</p>
						</div>
						<Wifi className="w-8 h-8 text-green-500" />
					</div>
				</div>

				<div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm text-gray-600">Active Users</p>
							<p className="text-2xl font-bold text-gray-900">
								{systemMetrics[systemMetrics.length - 1]?.activeUsers || 0}
							</p>
							<p className="text-sm text-green-600 flex items-center">
								<TrendingUp className="w-4 h-4 mr-1" />
								+12% from yesterday
							</p>
						</div>
						<Users className="w-8 h-8 text-purple-500" />
					</div>
				</div>

				<div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm text-gray-600">Avg Response Time</p>
							<p className="text-2xl font-bold text-gray-900">
								{Math.round(systemMetrics[systemMetrics.length - 1]?.responseTime || 0)}ms
							</p>
							<p className="text-sm text-blue-600 flex items-center">
								<Clock className="w-4 h-4 mr-1" />
								Within target
							</p>
						</div>
						<Zap className="w-8 h-8 text-orange-500" />
					</div>
				</div>
			</div>

			{/* Performance Charts */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				<div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
					<h3 className="text-lg font-semibold text-gray-900 mb-4">System Performance</h3>
					<ResponsiveContainer width="100%" height={300}>
						<LineChart data={systemMetrics.slice(-20)}>
							<CartesianGrid strokeDasharray="3 3" />
							<XAxis dataKey="timestamp" tickFormatter={(time) => new Date(time).toLocaleTimeString().slice(0, 5)} />
							<YAxis />
							<Tooltip labelFormatter={(time) => new Date(time).toLocaleTimeString()} />
							<Legend />
							<Line type="monotone" dataKey="cpu" stroke="#3B82F6" name="CPU %" strokeWidth={2} />
							<Line type="monotone" dataKey="memory" stroke="#10B981" name="Memory %" strokeWidth={2} />
							<Line type="monotone" dataKey="network" stroke="#F59E0B" name="Network %" strokeWidth={2} />
						</LineChart>
					</ResponsiveContainer>
				</div>

				<div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
					<h3 className="text-lg font-semibold text-gray-900 mb-4">Response Time & Throughput</h3>
					<ResponsiveContainer width="100%" height={300}>
						<LineChart data={systemMetrics.slice(-20)}>
							<CartesianGrid strokeDasharray="3 3" />
							<XAxis dataKey="timestamp" tickFormatter={(time) => new Date(time).toLocaleTimeString().slice(0, 5)} />
							<YAxis yAxisId="left" />
							<YAxis yAxisId="right" orientation="right" />
							<Tooltip labelFormatter={(time) => new Date(time).toLocaleTimeString()} />
							<Legend />
							<Line yAxisId="left" type="monotone" dataKey="responseTime" stroke="#EF4444" name="Response Time (ms)" strokeWidth={2} />
							<Line yAxisId="right" type="monotone" dataKey="throughput" stroke="#8B5CF6" name="Throughput (req/s)" strokeWidth={2} />
						</LineChart>
					</ResponsiveContainer>
				</div>
			</div>

			{/* User Engagement Metrics */}
			<div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
				<h3 className="text-lg font-semibold text-gray-900 mb-6">User Engagement Metrics</h3>
				<div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
					{Object.entries(userEngagement).map(([key, value]) => (
						<div key={key} className="text-center">
							<p className="text-2xl font-bold text-gray-900">
								{typeof value === 'number' ? 
									(key.includes('Rate') || key.includes('satisfaction') ? `${value.toFixed(1)}%` : 
									 key.includes('Duration') || key.includes('timeOnSite') ? `${Math.floor(value / 60)}:${(value % 60).toString().padStart(2, '0')}` :
									 value.toLocaleString()) : 
									value}
							</p>
							<p className="text-xs text-gray-600 capitalize">
								{key.replace(/([A-Z])/g, ' $1').toLowerCase()}
							</p>
						</div>
					))}
				</div>
			</div>
		</div>
	)

	const renderGeographyTab = () => (
		<div className="space-y-6">
			<div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
				<h3 className="text-lg font-semibold text-gray-900 mb-4">European Market Performance</h3>
				<ResponsiveContainer width="100%" height={400}>
					<BarChart data={geographicData}>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="country" />
						<YAxis yAxisId="left" />
						<YAxis yAxisId="right" orientation="right" />
						<Tooltip />
						<Legend />
						<Bar yAxisId="left" dataKey="users" fill="#3B82F6" name="Active Users" />
						<Bar yAxisId="right" dataKey="responseTime" fill="#F59E0B" name="Response Time (ms)" />
					</BarChart>
				</ResponsiveContainer>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				<div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
					<h3 className="text-lg font-semibold text-gray-900 mb-4">User Satisfaction by Country</h3>
					<ResponsiveContainer width="100%" height={300}>
						<PieChart>
							<Pie
								data={geographicData}
								dataKey="satisfaction"
								nameKey="country"
								cx="50%"
								cy="50%"
								outerRadius={80}
								label={({ country, satisfaction }) => `${country}: ${satisfaction.toFixed(1)}%`}
							>
								{geographicData.map((_, index) => (
									<Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
								))}
							</Pie>
							<Tooltip />
						</PieChart>
					</ResponsiveContainer>
				</div>

				<div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
					<h3 className="text-lg font-semibold text-gray-900 mb-4">Regional Statistics</h3>
					<div className="space-y-4">
						{geographicData.map((country, index) => (
							<div key={country.country} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
								<div className="flex items-center space-x-3">
									<div 
										className="w-4 h-4 rounded-full" 
										style={{ backgroundColor: CHART_COLORS[index % CHART_COLORS.length] }}
									></div>
									<span className="font-medium text-gray-900">{country.country}</span>
								</div>
								<div className="text-right text-sm text-gray-600">
									<div>{country.users} users</div>
									<div>{country.responseTime.toFixed(0)}ms avg</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	)

	const renderAlertsTab = () => (
		<div className="space-y-6">
			{performanceAlerts.map((alert) => (
				<div key={alert.id} className={`bg-white rounded-xl p-6 shadow-sm border-l-4 ${
					alert.type === 'critical' ? 'border-red-500' :
					alert.type === 'warning' ? 'border-yellow-500' :
					'border-blue-500'
				}`}>
					<div className="flex items-start justify-between">
						<div className="flex items-center space-x-3">
							<div className={`p-2 rounded-full ${
								alert.type === 'critical' ? 'bg-red-100 text-red-600' :
								alert.type === 'warning' ? 'bg-yellow-100 text-yellow-600' :
								'bg-blue-100 text-blue-600'
							}`}>
								{alert.type === 'critical' ? <XCircle className="w-5 h-5" /> :
								 alert.type === 'warning' ? <AlertTriangle className="w-5 h-5" /> :
								 <CheckCircle className="w-5 h-5" />}
							</div>
							<div>
								<h3 className="text-lg font-semibold text-gray-900">{alert.title}</h3>
								<p className="text-gray-600">{alert.message}</p>
								<div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
									<span>Metric: {alert.metric}</span>
									<span>Value: {alert.value}{alert.metric.includes('Time') ? 'ms' : alert.metric.includes('Rate') ? '%' : ''}</span>
									<span>Threshold: {alert.threshold}{alert.metric.includes('Time') ? 'ms' : alert.metric.includes('Rate') ? '%' : ''}</span>
									<span>{formatTimeAgo(alert.timestamp)}</span>
								</div>
							</div>
						</div>
						<div className="flex items-center space-x-2">
							{alert.isResolved && (
								<span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
									Resolved
								</span>
							)}
							<span className={`px-2 py-1 text-xs font-medium rounded-full uppercase ${
								alert.type === 'critical' ? 'bg-red-100 text-red-800' :
								alert.type === 'warning' ? 'bg-yellow-100 text-yellow-800' :
								'bg-blue-100 text-blue-800'
							}`}>
								{alert.type}
							</span>
						</div>
					</div>
				</div>
			))}
		</div>
	)

	return (
		<div className="max-w-7xl mx-auto p-6">
			{/* Header */}
			<div className="flex items-center justify-between mb-8">
				<div>
					<h1 className="text-3xl font-bold text-gray-900">Performance Monitoring</h1>
					<p className="text-gray-600 mt-2">Real-time system health and user engagement analytics</p>
				</div>
				<div className="flex items-center space-x-4">
					<div className="flex items-center space-x-2">
						<input
							type="checkbox"
							id="autoRefresh"
							checked={isAutoRefresh}
							onChange={(e) => setIsAutoRefresh(e.target.checked)}
							className="rounded border-gray-300"
						/>
						<label htmlFor="autoRefresh" className="text-sm text-gray-700">Auto refresh</label>
					</div>
					<select
						value={refreshInterval}
						onChange={(e) => setRefreshInterval(Number(e.target.value))}
						className="px-3 py-1 border border-gray-300 rounded-md text-sm"
						disabled={!isAutoRefresh}
					>
						<option value={10}>10s</option>
						<option value={30}>30s</option>
						<option value={60}>1m</option>
						<option value={300}>5m</option>
					</select>
					<button
						onClick={() => {
							generateSystemMetrics()
							generateGeographicData()
						}}
						className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
					>
						<RefreshCw className="w-4 h-4 mr-2" />
						Refresh
					</button>
				</div>
			</div>

			{/* Connection Status */}
			<div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 mb-6">
				<div className="flex items-center justify-between">
					<div className="flex items-center space-x-4">
						<div className={`flex items-center space-x-2 ${isConnected ? 'text-green-600' : 'text-red-600'}`}>
							<Wifi className="w-5 h-5" />
							<span className="font-medium">{isConnected ? 'Connected' : 'Disconnected'}</span>
						</div>
						<div className="text-gray-600">
							<span className="text-sm">Quality: </span>
							<span className="font-medium capitalize">{connectionQuality}</span>
						</div>
						<div className="text-gray-600">
							<span className="text-sm">Latency: </span>
							<span className="font-medium">{latency}ms</span>
						</div>
						{stats && (
							<div className="text-gray-600">
								<span className="text-sm">Uptime: </span>
								<span className="font-medium">{Math.floor(stats.uptime / 60)}m</span>
							</div>
						)}
					</div>
					<div className="text-sm text-gray-500">
						Last updated: {new Date().toLocaleTimeString()}
					</div>
				</div>
			</div>

			{/* Navigation Tabs */}
			<div className="flex space-x-1 bg-gray-100 rounded-lg p-1 mb-8">
				{[
					{ key: 'overview', label: 'Overview', icon: BarChart3 },
					{ key: 'system', label: 'System Metrics', icon: Server },
					{ key: 'users', label: 'User Analytics', icon: Users },
					{ key: 'geography', label: 'Geography', icon: Globe },
					{ key: 'alerts', label: 'Alerts', icon: Bell }
				].map((tab) => {
					const Icon = tab.icon
					return (
						<button
							key={tab.key}
							onClick={() => setActiveTab(tab.key as any)}
							className={`flex items-center px-4 py-2 rounded-md transition-colors ${
								activeTab === tab.key
									? 'bg-white text-blue-600 shadow-sm'
									: 'text-gray-600 hover:text-gray-900'
							}`}
						>
							<Icon className="w-4 h-4 mr-2" />
							{tab.label}
							{tab.key === 'alerts' && performanceAlerts.filter(a => !a.isResolved).length > 0 && (
								<span className="ml-2 px-2 py-0.5 bg-red-500 text-white text-xs rounded-full">
									{performanceAlerts.filter(a => !a.isResolved).length}
								</span>
							)}
						</button>
					)
				})}
			</div>

			{/* Content based on active tab */}
			{activeTab === 'overview' && renderOverviewTab()}
			{activeTab === 'system' && renderOverviewTab()}
			{activeTab === 'users' && renderOverviewTab()}
			{activeTab === 'geography' && renderGeographyTab()}
			{activeTab === 'alerts' && renderAlertsTab()}
		</div>
	)
} 