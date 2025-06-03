import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { analyticsAPI } from '../../services/api'

// Interfaces for analytics data
export interface TalentAnalytics {
	profileViews: {
		current: number
		change: number
		trend: 'up' | 'down'
		chartData: Array<{ date: string; views: number }>
	}
	matchQuality: {
		score: number
		change: number
		trend: 'up' | 'down'
		factors: Array<{ factor: string; score: number; weight: number }>
	}
	marketDemand: {
		percentage: number
		change: number
		trend: 'up' | 'down'
		skillsInDemand: string[]
		location: string
	}
	recentActivity: Array<{
		id: string
		type: 'view' | 'match' | 'application' | 'skill_update' | 'profile_update'
		description: string
		timestamp: string
		value?: string
		metadata?: any
	}>
	careerProgress: Array<{
		metric: string
		current: number
		target: number
		unit: string
		trend: 'up' | 'down'
		changePercent: number
	}>
	skillsAnalysis: {
		topSkills: Array<{ skill: string; proficiency: number; demand: number }>
		improvementSuggestions: Array<{ skill: string; reason: string; priority: 'high' | 'medium' | 'low' }>
		skillGaps: Array<{ skill: string; marketDemand: number; currentLevel: number }>
	}
}

export interface TeamAnalytics {
	overview: {
		activeJobs: number
		totalApplications: number
		avgTimeToHire: number
		costPerHire: number
		conversionRate: number
		activeCredits: number
	}
	jobPerformance: Array<{
		jobId: string
		title: string
		views: number
		applications: number
		qualifiedCandidates: number
		conversionRate: number
		timeToFill: number
		status: 'active' | 'filled' | 'paused' | 'closed'
		postedDate: string
		location: string
	}>
	candidateFlow: {
		applied: number
		reviewed: number
		interviewed: number
		offered: number
		hired: number
		chartData: Array<{ stage: string; count: number; dropoffRate: number }>
	}
	hiringMetrics: Array<{
		metric: string
		value: string | number
		change: number
		trend: 'up' | 'down'
		period: string
	}>
	topSources: Array<{
		source: string
		applications: number
		qualityScore: number
		costPerCandidate: number
	}>
	recentActivity: Array<{
		id: string
		type: 'application' | 'interview' | 'hire' | 'job_posted' | 'match'
		description: string
		timestamp: string
		jobId?: string
		candidateId?: string
		metadata?: any
	}>
}

export interface AnalyticsState {
	talent: {
		data: TalentAnalytics | null
		isLoading: boolean
		error: string | null
		lastUpdated: string | null
		timeRange: '7d' | '30d' | '90d'
	}
	team: {
		data: TeamAnalytics | null
		isLoading: boolean
		error: string | null
		lastUpdated: string | null
		timeRange: '7d' | '30d' | '90d'
	}
	marketTrends: {
		data: any | null
		isLoading: boolean
		error: string | null
		lastUpdated: string | null
	}
	realTimeUpdates: {
		enabled: boolean
		lastUpdate: string | null
		pendingUpdates: Array<any>
	}
}

const initialState: AnalyticsState = {
	talent: {
		data: null,
		isLoading: false,
		error: null,
		lastUpdated: null,
		timeRange: '30d'
	},
	team: {
		data: null,
		isLoading: false,
		error: null,
		lastUpdated: null,
		timeRange: '30d'
	},
	marketTrends: {
		data: null,
		isLoading: false,
		error: null,
		lastUpdated: null
	},
	realTimeUpdates: {
		enabled: false,
		lastUpdate: null,
		pendingUpdates: []
	}
}

// Async thunks for talent analytics
export const fetchTalentAnalytics = createAsyncThunk(
	'analytics/fetchTalentAnalytics',
	async ({ talentId, timeRange }: { talentId: string; timeRange: '7d' | '30d' | '90d' }, { rejectWithValue }) => {
		try {
			const response = await analyticsAPI.getTalentAnalytics(talentId, timeRange)
			return { data: response, timeRange }
		} catch (error: any) {
			return rejectWithValue(error.response?.data?.message || 'Failed to fetch talent analytics')
		}
	}
)

export const fetchTalentProfileViews = createAsyncThunk(
	'analytics/fetchTalentProfileViews',
	async ({ talentId, timeRange }: { talentId: string; timeRange: string }, { rejectWithValue }) => {
		try {
			const response = await analyticsAPI.getTalentProfileViews(talentId, timeRange)
			return response
		} catch (error: any) {
			return rejectWithValue(error.response?.data?.message || 'Failed to fetch profile views')
		}
	}
)

export const fetchTalentMatchQuality = createAsyncThunk(
	'analytics/fetchTalentMatchQuality',
	async (talentId: string, { rejectWithValue }) => {
		try {
			const response = await analyticsAPI.getTalentMatchQuality(talentId)
			return response
		} catch (error: any) {
			return rejectWithValue(error.response?.data?.message || 'Failed to fetch match quality')
		}
	}
)

export const fetchTalentMarketDemand = createAsyncThunk(
	'analytics/fetchTalentMarketDemand',
	async (talentId: string, { rejectWithValue }) => {
		try {
			const response = await analyticsAPI.getTalentMarketDemand(talentId)
			return response
		} catch (error: any) {
			return rejectWithValue(error.response?.data?.message || 'Failed to fetch market demand')
		}
	}
)

export const fetchTalentRecentActivity = createAsyncThunk(
	'analytics/fetchTalentRecentActivity',
	async ({ talentId, limit }: { talentId: string; limit?: number }, { rejectWithValue }) => {
		try {
			const response = await analyticsAPI.getRecentActivity(talentId, 'talent', limit)
			return response
		} catch (error: any) {
			return rejectWithValue(error.response?.data?.message || 'Failed to fetch recent activity')
		}
	}
)

// Async thunks for team analytics
export const fetchTeamAnalytics = createAsyncThunk(
	'analytics/fetchTeamAnalytics',
	async ({ employerId, timeRange }: { employerId: string; timeRange: '7d' | '30d' | '90d' }, { rejectWithValue }) => {
		try {
			const response = await analyticsAPI.getTeamAnalytics(employerId, timeRange)
			return { data: response, timeRange }
		} catch (error: any) {
			return rejectWithValue(error.response?.data?.message || 'Failed to fetch team analytics')
		}
	}
)

export const fetchJobPerformance = createAsyncThunk(
	'analytics/fetchJobPerformance',
	async ({ employerId, timeRange }: { employerId: string; timeRange: string }, { rejectWithValue }) => {
		try {
			const response = await analyticsAPI.getJobPerformance(employerId, timeRange)
			return response
		} catch (error: any) {
			return rejectWithValue(error.response?.data?.message || 'Failed to fetch job performance')
		}
	}
)

export const fetchHiringMetrics = createAsyncThunk(
	'analytics/fetchHiringMetrics',
	async ({ employerId, timeRange }: { employerId: string; timeRange: string }, { rejectWithValue }) => {
		try {
			const response = await analyticsAPI.getHiringMetrics(employerId, timeRange)
			return response
		} catch (error: any) {
			return rejectWithValue(error.response?.data?.message || 'Failed to fetch hiring metrics')
		}
	}
)

export const fetchCandidateFlow = createAsyncThunk(
	'analytics/fetchCandidateFlow',
	async ({ employerId, timeRange }: { employerId: string; timeRange: string }, { rejectWithValue }) => {
		try {
			const response = await analyticsAPI.getCandidateFlow(employerId, timeRange)
			return response
		} catch (error: any) {
			return rejectWithValue(error.response?.data?.message || 'Failed to fetch candidate flow')
		}
	}
)

// Market trends
export const fetchMarketTrends = createAsyncThunk(
	'analytics/fetchMarketTrends',
	async (_, { rejectWithValue }) => {
		try {
			const response = await analyticsAPI.getMarketTrends()
			return response
		} catch (error: any) {
			return rejectWithValue(error.response?.data?.message || 'Failed to fetch market trends')
		}
	}
)

export const fetchSkillDemand = createAsyncThunk(
	'analytics/fetchSkillDemand',
	async (location: string | undefined, { rejectWithValue }) => {
		try {
			const response = await analyticsAPI.getSkillDemand(location)
			return response
		} catch (error: any) {
			return rejectWithValue(error.response?.data?.message || 'Failed to fetch skill demand')
		}
	}
)

const analyticsSlice = createSlice({
	name: 'analytics',
	initialState,
	reducers: {
		// Clear analytics data
		clearTalentAnalytics: (state) => {
			state.talent.data = null
			state.talent.error = null
		},
		clearTeamAnalytics: (state) => {
			state.team.data = null
			state.team.error = null
		},
		
		// Set time range
		setTalentTimeRange: (state, action: PayloadAction<'7d' | '30d' | '90d'>) => {
			state.talent.timeRange = action.payload
		},
		setTeamTimeRange: (state, action: PayloadAction<'7d' | '30d' | '90d'>) => {
			state.team.timeRange = action.payload
		},
		
		// Real-time updates
		enableRealTimeUpdates: (state) => {
			state.realTimeUpdates.enabled = true
		},
		disableRealTimeUpdates: (state) => {
			state.realTimeUpdates.enabled = false
		},
		addRealTimeUpdate: (state, action: PayloadAction<any>) => {
			state.realTimeUpdates.pendingUpdates.push(action.payload)
			state.realTimeUpdates.lastUpdate = new Date().toISOString()
		},
		clearRealTimeUpdates: (state) => {
			state.realTimeUpdates.pendingUpdates = []
		},
		
		// Update individual metrics (for real-time updates)
		updateTalentProfileViews: (state, action: PayloadAction<any>) => {
			if (state.talent.data) {
				state.talent.data.profileViews = { ...state.talent.data.profileViews, ...action.payload }
			}
		},
		updateTeamMetrics: (state, action: PayloadAction<any>) => {
			if (state.team.data) {
				state.team.data.overview = { ...state.team.data.overview, ...action.payload }
			}
		},
		
		// Add new activity
		addTalentActivity: (state, action: PayloadAction<any>) => {
			if (state.talent.data) {
				state.talent.data.recentActivity.unshift(action.payload)
				// Keep only last 20 activities
				state.talent.data.recentActivity = state.talent.data.recentActivity.slice(0, 20)
			}
		},
		addTeamActivity: (state, action: PayloadAction<any>) => {
			if (state.team.data) {
				state.team.data.recentActivity.unshift(action.payload)
				// Keep only last 20 activities
				state.team.data.recentActivity = state.team.data.recentActivity.slice(0, 20)
			}
		}
	},
	extraReducers: (builder) => {
		builder
			// Talent Analytics
			.addCase(fetchTalentAnalytics.pending, (state) => {
				state.talent.isLoading = true
				state.talent.error = null
			})
			.addCase(fetchTalentAnalytics.fulfilled, (state, action) => {
				state.talent.isLoading = false
				state.talent.data = action.payload.data
				state.talent.timeRange = action.payload.timeRange
				state.talent.lastUpdated = new Date().toISOString()
				state.talent.error = null
			})
			.addCase(fetchTalentAnalytics.rejected, (state, action) => {
				state.talent.isLoading = false
				state.talent.error = action.payload as string
			})
			
			// Team Analytics
			.addCase(fetchTeamAnalytics.pending, (state) => {
				state.team.isLoading = true
				state.team.error = null
			})
			.addCase(fetchTeamAnalytics.fulfilled, (state, action) => {
				state.team.isLoading = false
				state.team.data = action.payload.data
				state.team.timeRange = action.payload.timeRange
				state.team.lastUpdated = new Date().toISOString()
				state.team.error = null
			})
			.addCase(fetchTeamAnalytics.rejected, (state, action) => {
				state.team.isLoading = false
				state.team.error = action.payload as string
			})
			
			// Market Trends
			.addCase(fetchMarketTrends.pending, (state) => {
				state.marketTrends.isLoading = true
				state.marketTrends.error = null
			})
			.addCase(fetchMarketTrends.fulfilled, (state, action) => {
				state.marketTrends.isLoading = false
				state.marketTrends.data = action.payload
				state.marketTrends.lastUpdated = new Date().toISOString()
				state.marketTrends.error = null
			})
			.addCase(fetchMarketTrends.rejected, (state, action) => {
				state.marketTrends.isLoading = false
				state.marketTrends.error = action.payload as string
			})
			
			// Individual metric updates
			.addCase(fetchTalentProfileViews.fulfilled, (state, action) => {
				if (state.talent.data) {
					state.talent.data.profileViews = { ...state.talent.data.profileViews, ...action.payload }
				}
			})
			.addCase(fetchTalentMatchQuality.fulfilled, (state, action) => {
				if (state.talent.data) {
					state.talent.data.matchQuality = { ...state.talent.data.matchQuality, ...action.payload }
				}
			})
			.addCase(fetchTalentMarketDemand.fulfilled, (state, action) => {
				if (state.talent.data) {
					state.talent.data.marketDemand = { ...state.talent.data.marketDemand, ...action.payload }
				}
			})
			.addCase(fetchTalentRecentActivity.fulfilled, (state, action) => {
				if (state.talent.data) {
					state.talent.data.recentActivity = action.payload
				}
			})
			.addCase(fetchJobPerformance.fulfilled, (state, action) => {
				if (state.team.data) {
					state.team.data.jobPerformance = action.payload
				}
			})
			.addCase(fetchHiringMetrics.fulfilled, (state, action) => {
				if (state.team.data) {
					state.team.data.hiringMetrics = action.payload
				}
			})
			.addCase(fetchCandidateFlow.fulfilled, (state, action) => {
				if (state.team.data) {
					state.team.data.candidateFlow = action.payload
				}
			})
	}
})

export const {
	clearTalentAnalytics,
	clearTeamAnalytics,
	setTalentTimeRange,
	setTeamTimeRange,
	enableRealTimeUpdates,
	disableRealTimeUpdates,
	addRealTimeUpdate,
	clearRealTimeUpdates,
	updateTalentProfileViews,
	updateTeamMetrics,
	addTalentActivity,
	addTeamActivity
} = analyticsSlice.actions

export default analyticsSlice.reducer 