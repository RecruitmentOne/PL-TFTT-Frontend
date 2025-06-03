import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { realtimeAPI } from '../../services/api'

// Interfaces for real-time data
export interface Notification {
	id: string
	type: 'match' | 'application' | 'message' | 'profile_view' | 'job_update' | 'system'
	title: string
	message: string
	timestamp: string
	isRead: boolean
	data?: any
	actionUrl?: string
	priority: 'low' | 'medium' | 'high'
}

export interface LiveMatch {
	id: string
	type: 'talent_match' | 'job_match' | 'mutual_match'
	matchScore: number
	timestamp: string
	talentId?: string
	jobId?: string
	employerId?: string
	status: 'new' | 'viewed' | 'liked' | 'passed'
	metadata: any
}

export interface RealTimeStats {
	profileViews: number
	newMatches: number
	newApplications: number
	activeJobs: number
	credits: number
	notifications: number
	lastUpdated: string
}

export interface RealtimeState {
	// Connection status
	isConnected: boolean
	connectionError: string | null
	lastConnectionAttempt: string | null
	reconnectAttempts: number
	
	// Notifications
	notifications: Notification[]
	unreadCount: number
	isLoadingNotifications: boolean
	notificationsError: string | null
	
	// Live matches
	liveMatches: LiveMatch[]
	isLoadingMatches: boolean
	matchesError: string | null
	
	// Real-time stats
	realTimeStats: RealTimeStats | null
	isLoadingStats: boolean
	statsError: string | null
	
	// Settings
	settings: {
		enableNotifications: boolean
		enableSound: boolean
		enableDesktop: boolean
		notificationTypes: {
			matches: boolean
			applications: boolean
			messages: boolean
			profileViews: boolean
			jobUpdates: boolean
			system: boolean
		}
		updateInterval: number // in seconds
	}
	
	// Update queues
	pendingUpdates: Array<{
		type: string
		data: any
		timestamp: string
	}>
}

const initialState: RealtimeState = {
	isConnected: false,
	connectionError: null,
	lastConnectionAttempt: null,
	reconnectAttempts: 0,
	
	notifications: [],
	unreadCount: 0,
	isLoadingNotifications: false,
	notificationsError: null,
	
	liveMatches: [],
	isLoadingMatches: false,
	matchesError: null,
	
	realTimeStats: null,
	isLoadingStats: false,
	statsError: null,
	
	settings: {
		enableNotifications: true,
		enableSound: true,
		enableDesktop: false,
		notificationTypes: {
			matches: true,
			applications: true,
			messages: true,
			profileViews: false,
			jobUpdates: true,
			system: true
		},
		updateInterval: 30
	},
	
	pendingUpdates: []
}

// Async thunks
export const fetchNotifications = createAsyncThunk(
	'realtime/fetchNotifications',
	async ({ userId, limit }: { userId: string; limit?: number }, { rejectWithValue }) => {
		try {
			const response = await realtimeAPI.getNotifications(userId, limit)
			return response
		} catch (error: any) {
			return rejectWithValue(error.response?.data?.message || 'Failed to fetch notifications')
		}
	}
)

export const markNotificationRead = createAsyncThunk(
	'realtime/markNotificationRead',
	async (notificationId: string, { rejectWithValue }) => {
		try {
			const response = await realtimeAPI.markNotificationRead(notificationId)
			return { notificationId, ...response }
		} catch (error: any) {
			return rejectWithValue(error.response?.data?.message || 'Failed to mark notification as read')
		}
	}
)

export const fetchLiveMatches = createAsyncThunk(
	'realtime/fetchLiveMatches',
	async ({ userId, userType }: { userId: string; userType: 'talent' | 'employer' }, { rejectWithValue }) => {
		try {
			const response = await realtimeAPI.getLiveMatches(userId, userType)
			return response
		} catch (error: any) {
			return rejectWithValue(error.response?.data?.message || 'Failed to fetch live matches')
		}
	}
)

export const fetchRealTimeStats = createAsyncThunk(
	'realtime/fetchRealTimeStats',
	async ({ userId, userType }: { userId: string; userType: 'talent' | 'employer' }, { rejectWithValue }) => {
		try {
			const response = await realtimeAPI.getRealTimeStats(userId, userType)
			return response
		} catch (error: any) {
			return rejectWithValue(error.response?.data?.message || 'Failed to fetch real-time stats')
		}
	}
)

const realtimeSlice = createSlice({
	name: 'realtime',
	initialState,
	reducers: {
		// Connection management
		setConnected: (state, action: PayloadAction<boolean>) => {
			state.isConnected = action.payload
			if (action.payload) {
				state.connectionError = null
				state.reconnectAttempts = 0
			}
		},
		setConnectionError: (state, action: PayloadAction<string>) => {
			state.connectionError = action.payload
			state.isConnected = false
		},
		incrementReconnectAttempts: (state) => {
			state.reconnectAttempts += 1
			state.lastConnectionAttempt = new Date().toISOString()
		},
		resetReconnectAttempts: (state) => {
			state.reconnectAttempts = 0
		},
		
		// Notifications
		addNotification: (state, action: PayloadAction<Notification>) => {
			state.notifications.unshift(action.payload)
			if (!action.payload.isRead) {
				state.unreadCount += 1
			}
			// Keep only last 100 notifications
			state.notifications = state.notifications.slice(0, 100)
		},
		markNotificationReadLocal: (state, action: PayloadAction<string>) => {
			const notification = state.notifications.find(n => n.id === action.payload)
			if (notification && !notification.isRead) {
				notification.isRead = true
				state.unreadCount = Math.max(0, state.unreadCount - 1)
			}
		},
		markAllNotificationsRead: (state) => {
			state.notifications.forEach(n => n.isRead = true)
			state.unreadCount = 0
		},
		removeNotification: (state, action: PayloadAction<string>) => {
			const index = state.notifications.findIndex(n => n.id === action.payload)
			if (index !== -1) {
				const notification = state.notifications[index]
				if (!notification.isRead) {
					state.unreadCount = Math.max(0, state.unreadCount - 1)
				}
				state.notifications.splice(index, 1)
			}
		},
		clearNotifications: (state) => {
			state.notifications = []
			state.unreadCount = 0
		},
		
		// Live matches
		addLiveMatch: (state, action: PayloadAction<LiveMatch>) => {
			state.liveMatches.unshift(action.payload)
			// Keep only last 50 matches
			state.liveMatches = state.liveMatches.slice(0, 50)
		},
		updateLiveMatchStatus: (state, action: PayloadAction<{ matchId: string; status: LiveMatch['status'] }>) => {
			const match = state.liveMatches.find(m => m.id === action.payload.matchId)
			if (match) {
				match.status = action.payload.status
			}
		},
		removeLiveMatch: (state, action: PayloadAction<string>) => {
			state.liveMatches = state.liveMatches.filter(m => m.id !== action.payload)
		},
		clearLiveMatches: (state) => {
			state.liveMatches = []
		},
		
		// Real-time stats updates
		updateRealTimeStats: (state, action: PayloadAction<Partial<RealTimeStats>>) => {
			if (state.realTimeStats) {
				state.realTimeStats = { ...state.realTimeStats, ...action.payload }
			} else {
				state.realTimeStats = {
					profileViews: 0,
					newMatches: 0,
					newApplications: 0,
					activeJobs: 0,
					credits: 0,
					notifications: 0,
					lastUpdated: new Date().toISOString(),
					...action.payload
				}
			}
		},
		
		// Settings
		updateNotificationSettings: (state, action: PayloadAction<Partial<RealtimeState['settings']>>) => {
			state.settings = { ...state.settings, ...action.payload }
		},
		toggleNotificationType: (state, action: PayloadAction<keyof RealtimeState['settings']['notificationTypes']>) => {
			state.settings.notificationTypes[action.payload] = !state.settings.notificationTypes[action.payload]
		},
		
		// Pending updates
		addPendingUpdate: (state, action: PayloadAction<{ type: string; data: any }>) => {
			state.pendingUpdates.push({
				...action.payload,
				timestamp: new Date().toISOString()
			})
		},
		processPendingUpdate: (state, action: PayloadAction<string>) => {
			state.pendingUpdates = state.pendingUpdates.filter(update => update.timestamp !== action.payload)
		},
		clearPendingUpdates: (state) => {
			state.pendingUpdates = []
		},
		
		// Bulk operations
		bulkUpdateNotifications: (state, action: PayloadAction<Notification[]>) => {
			action.payload.forEach(notification => {
				const existingIndex = state.notifications.findIndex(n => n.id === notification.id)
				if (existingIndex !== -1) {
					state.notifications[existingIndex] = notification
				} else {
					state.notifications.unshift(notification)
				}
			})
			// Recalculate unread count
			state.unreadCount = state.notifications.filter(n => !n.isRead).length
			// Keep only last 100 notifications
			state.notifications = state.notifications.slice(0, 100)
		}
	},
	extraReducers: (builder) => {
		builder
			// Fetch Notifications
			.addCase(fetchNotifications.pending, (state) => {
				state.isLoadingNotifications = true
				state.notificationsError = null
			})
			.addCase(fetchNotifications.fulfilled, (state, action) => {
				state.isLoadingNotifications = false
				state.notifications = action.payload
				state.unreadCount = action.payload.filter((n: Notification) => !n.isRead).length
				state.notificationsError = null
			})
			.addCase(fetchNotifications.rejected, (state, action) => {
				state.isLoadingNotifications = false
				state.notificationsError = action.payload as string
			})
			
			// Mark Notification Read
			.addCase(markNotificationRead.fulfilled, (state, action) => {
				const notification = state.notifications.find(n => n.id === action.payload.notificationId)
				if (notification && !notification.isRead) {
					notification.isRead = true
					state.unreadCount = Math.max(0, state.unreadCount - 1)
				}
			})
			
			// Fetch Live Matches
			.addCase(fetchLiveMatches.pending, (state) => {
				state.isLoadingMatches = true
				state.matchesError = null
			})
			.addCase(fetchLiveMatches.fulfilled, (state, action) => {
				state.isLoadingMatches = false
				state.liveMatches = action.payload
				state.matchesError = null
			})
			.addCase(fetchLiveMatches.rejected, (state, action) => {
				state.isLoadingMatches = false
				state.matchesError = action.payload as string
			})
			
			// Fetch Real-time Stats
			.addCase(fetchRealTimeStats.pending, (state) => {
				state.isLoadingStats = true
				state.statsError = null
			})
			.addCase(fetchRealTimeStats.fulfilled, (state, action) => {
				state.isLoadingStats = false
				state.realTimeStats = action.payload
				state.statsError = null
			})
			.addCase(fetchRealTimeStats.rejected, (state, action) => {
				state.isLoadingStats = false
				state.statsError = action.payload as string
			})
	}
})

export const {
	setConnected,
	setConnectionError,
	incrementReconnectAttempts,
	resetReconnectAttempts,
	addNotification,
	markNotificationReadLocal,
	markAllNotificationsRead,
	removeNotification,
	clearNotifications,
	addLiveMatch,
	updateLiveMatchStatus,
	removeLiveMatch,
	clearLiveMatches,
	updateRealTimeStats,
	updateNotificationSettings,
	toggleNotificationType,
	addPendingUpdate,
	processPendingUpdate,
	clearPendingUpdates,
	bulkUpdateNotifications
} = realtimeSlice.actions

export default realtimeSlice.reducer 