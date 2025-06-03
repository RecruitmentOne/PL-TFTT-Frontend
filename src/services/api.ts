import axios, { AxiosInstance } from 'axios'

// Create axios instance with default config
const api: AxiosInstance = axios.create({
	baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5255/api',
	timeout: 10000,
	headers: {
		'Content-Type': 'application/json',
	},
})

// Request interceptor to add auth token
api.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem('token')
		if (token) {
			config.headers.Authorization = `Bearer ${token}`
		}
		return config
	},
	(error) => {
		return Promise.reject(error)
	}
)

// Response interceptor to handle token refresh
api.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config
		
		if (error.response?.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true
			
			const refreshToken = localStorage.getItem('refreshToken')
			if (refreshToken) {
				try {
					const response = await axios.post(`${api.defaults.baseURL}/authentication/refresh`, {
						refreshToken,
					})
					
					const { accessToken, refreshToken: newRefreshToken } = response.data
					localStorage.setItem('token', accessToken)
					localStorage.setItem('refreshToken', newRefreshToken)
					
					originalRequest.headers.Authorization = `Bearer ${accessToken}`
					return api(originalRequest)
				} catch (refreshError) {
					// Clear localStorage but don't force redirect
					// Let Redux handle the authentication state and navigation
					localStorage.removeItem('token')
					localStorage.removeItem('refreshToken')
					return Promise.reject(refreshError)
				}
			} else {
				// Clear localStorage but don't force redirect  
				// Let Redux handle the authentication state and navigation
				localStorage.removeItem('token')
				localStorage.removeItem('refreshToken')
			}
		}
		
		return Promise.reject(error)
	}
)

// Auth API endpoints
export const authAPI = {
	login: async (credentials: { email: string; password: string; userType?: string }) => {
		const response = await api.post('/authentication/login', {
			email: credentials.email,
			password: credentials.password,
			userType: credentials.userType || 'talent'
		})
		return response.data
	},

	registerTalent: async (userData: {
		fullName: string
		email: string
		phoneNumber: string
		password: string
		termsAccepted: boolean
	}) => {
		const response = await api.post('/authentication/register/talent', userData)
		return response.data
	},

	registerEmployer: async (userData: {
		companyName: string
		email: string
		phoneNumber: string
		password: string
		industryId: number
		website?: string
		companyAddress?: string
		streetAddress?: string
		cityId: number
		countryId: number
		companySizeId?: number
		companyTypeId?: number
	}) => {
		const response = await api.post('/authentication/register/employer', userData)
		return response.data
	},

	logout: async () => {
		const refreshToken = localStorage.getItem('refreshToken')
		if (refreshToken) {
			const response = await api.post('/authentication/logout', { refreshToken })
			return response.data
		}
	},

	getCurrentUser: async () => {
		const response = await api.get('/authentication/me')
		return response.data
	},

	refreshToken: async (refreshToken: string) => {
		const response = await api.post('/authentication/refresh', { refreshToken })
		return response.data
	},

	changePassword: async (currentPassword: string, newPassword: string) => {
		const response = await api.post('/authentication/change-password', {
			currentPassword,
			newPassword
		})
		return response.data
	},

	checkEmail: async (email: string, userType: string = 'talent') => {
		const response = await api.get(`/authentication/check-email?email=${encodeURIComponent(email)}&userType=${userType}`)
		return response.data
	},
}

// User API endpoints
export const userAPI = {
	getProfile: async () => {
		const response = await api.get('/ProfileCompletion/status')
		return response.data
	},

	updateProfile: async (profileData: any) => {
		// For now, we'll use the manual profile completion endpoint
		const response = await api.post('/ProfileCompletion/manual', profileData)
		return response.data
	},

	uploadProfilePicture: async (file: File) => {
		const formData = new FormData()
		formData.append('file', file)
		
		const response = await api.post('/user/profile/picture', formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		})
		return response.data
	},

	uploadCV: async (file: File) => {
		const formData = new FormData()
		formData.append('cvFile', file)
		
		const response = await api.post('/ProfileCompletion/cv-upload', formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		})
		return response.data
	},

	parseCV: async (file: File) => {
		const formData = new FormData()
		formData.append('cvFile', file)
		
		const response = await api.post('/ProfileCompletion/cv-parse-ai-preview', formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		})
		return response.data
	},

	deleteAccount: async () => {
		// This endpoint may not exist yet - would need to be implemented in backend
		const response = await api.delete('/user/account')
		return response.data
	},
}

// Job API endpoints
export const jobAPI = {
	getJobs: async (params?: { page?: number; limit?: number; search?: string }) => {
		const response = await api.get('/JobListing', { params })
		return response.data
	},

	getJobById: async (id: string) => {
		const response = await api.get(`/JobListing/${id}`)
		return response.data
	},

	applyToJob: async (jobId: string, applicationData?: any) => {
		const response = await api.post('/JobApplication', {
			jobId: parseInt(jobId),
			userId: applicationData?.userId,
			applicationDate: new Date(),
			applicationStatusId: 1, // Default status
			...applicationData
		})
		return response.data
	},

	getMyApplications: async (userId: string) => {
		const response = await api.get(`/JobApplication/user/${userId}`)
		return response.data
	},
}

// Employer API endpoints
export const employerAPI = {
	createJob: async (jobData: any) => {
		const response = await api.post('/JobListing', jobData)
		return response.data
	},

	getMyJobs: async (employerId: string) => {
		const response = await api.get('/JobListing')
		// TODO: Backend should have employer-specific endpoint
		return response.data
	},

	updateJob: async (jobId: string, jobData: any) => {
		const response = await api.put('/JobListing', { jobId: parseInt(jobId), ...jobData })
		return response.data
	},

	deleteJob: async (jobId: string) => {
		const response = await api.delete(`/JobListing/${jobId}`)
		return response.data
	},

	getJobApplications: async (jobId: string) => {
		const response = await api.get(`/JobApplication/job/${jobId}`)
		return response.data
	},

	updateApplicationStatus: async (applicationId: string, statusId: number) => {
		const response = await api.put('/JobApplication', { 
			applicationId: parseInt(applicationId), 
			applicationStatusId: statusId 
		})
		return response.data
	},
}

// Matching API endpoints
export const matchingAPI = {
	getMatches: async (talentId: string, params?: { page?: number; limit?: number }) => {
		const response = await api.get(`/matchmaking/talent/${talentId}/matches`, { params })
		return response.data
	},

	getJobMatches: async (jobId: string, params?: { page?: number; limit?: number }) => {
		const response = await api.get(`/matchmaking/job/${jobId}/matches`, { params })
		return response.data
	},

	calculateMatch: async (talentUserId: string, jobId: string) => {
		const response = await api.post('/ai-matchmaking/analyze-match', {
			TalentUserId: parseInt(talentUserId, 10),
			JobId: parseInt(jobId, 10),
		})
		return response.data // Returns AiMatchAnalysisDto (or similar)
	},

	getRecommendedJobs: async (talentUserId: string, requestBody?: any) => {
		// requestBody should match AiRecommendationRequestDto from backend if needed
		const response = await api.post(`/ai-matchmaking/talent/${talentUserId}/ai-recommendations`, requestBody || {})
		return response.data // Should be a list of AiJobRecommendationDto or similar
	},

	getRecommendedTalents: async (jobId: string, requestBody?: any) => {
		// requestBody should match AiRecommendationRequestDto from backend if needed
		const response = await api.post(`/ai-matchmaking/job/${jobId}/ai-recommendations`, requestBody || {})
		return response.data
	},

	likeMatch: async (jobId: string) => {
		const response = await api.post('/TalentLikeDislike', {
			jobId: parseInt(jobId),
			interactionTypeId: 1 // Like
		})
		return response.data
	},

	passMatch: async (jobId: string) => {
		const response = await api.post('/TalentLikeDislike', {
			jobId: parseInt(jobId),
			interactionTypeId: 2 // Dislike/Pass
		})
		return response.data
	},
}

// Lookup/Reference Data API endpoints
export const lookupAPI = {
	getIndustries: async () => {
		const response = await api.get('/Industries')
		return response.data.map((item: any) => ({
			id: item.industryId,
			name: item.industryName
		}))
	},

	getCountries: async () => {
		const response = await api.get('/Countries')
		return response.data.map((item: any) => ({
			id: item.countryId,
			name: item.countryName,
			code: item.countryCode,
			isJobMarket: item.isJobMarket,
			isTalentSource: item.isTalentSource
		}))
	},

	getJobMarkets: async () => {
		const response = await api.get('/Countries/job-markets')
		return response.data.map((item: any) => ({
			id: item.countryId,
			name: item.countryName,
			code: item.countryCode,
			isJobMarket: item.isJobMarket,
			isTalentSource: item.isTalentSource
		}))
	},

	getTalentSources: async () => {
		const response = await api.get('/Countries/talent-sources')
		return response.data.map((item: any) => ({
			id: item.countryId,
			name: item.countryName,
			code: item.countryCode,
			isJobMarket: item.isJobMarket,
			isTalentSource: item.isTalentSource
		}))
	},

	getCountriesByUserType: async (userType: 'talent' | 'employer') => {
		const response = await api.get(`/Countries/by-user-type/${userType}`)
		return response.data.map((item: any) => ({
			id: item.countryId,
			name: item.countryName,
			code: item.countryCode,
			isJobMarket: item.isJobMarket,
			isTalentSource: item.isTalentSource
		}))
	},

	getCitiesByCountry: async (countryId: number) => {
		const response = await api.get(`/Cities/country/${countryId}`)
		return response.data.map((item: any) => ({
			id: item.cityId,
			name: item.cityName
		}))
	},

	getCities: async () => {
		const response = await api.get('/Cities')
		return response.data.map((item: any) => ({
			id: item.cityId,
			name: item.cityName
		}))
	},

	getEmploymentTypes: async () => {
		const response = await api.get('/EmploymentType')
		return response.data.map((item: any) => ({
			id: item.typeId,
			name: item.typeName
		}))
	},

	getJobRoles: async () => {
		const response = await api.get('/JobRole')
		return response.data.map((item: any) => ({
			id: item.roleId,
			name: item.roleName
		}))
	},

	getCompanySizes: async () => {
		const response = await api.get('/CompanySize')
		return response.data.map((item: any) => ({
			id: item.sizeId,
			name: item.sizeRange
		}))
	},

	getCompanyTypes: async () => {
		const response = await api.get('/CompanyType')
		return response.data.map((item: any) => ({
			id: item.typeId,
			name: item.typeName
		}))
	},

	getSkills: async () => {
		const response = await api.get('/Skill')
		return response.data.map((item: any) => ({
			id: item.skillId,
			name: item.skillName
		}))
	},

	getLanguages: async () => {
		const response = await api.get('/Language')
		return response.data.map((item: any) => ({
			id: item.languageId,
			name: item.languageName
		}))
	},

	getEducationLevels: async () => {
		const response = await api.get('/EducationLevel')
		return response.data.map((item: any) => ({
			id: item.levelId,
			name: item.levelName
		}))
	},

	getEmployers: async () => {
		const response = await api.get('/Employer')
		return response.data.map((item: any) => ({
			id: item.employerId,
			name: item.companyName
		}))
	},
}

// Credit system API endpoints
export const creditAPI = {
	getPlans: async () => {
		const response = await api.get('/credit/plans')
		return response.data
	},

	subscribe: async (planId: number) => {
		const response = await api.post('/credit/subscribe', { planId })
		return response.data
	},

	canView: async (talentId: string) => {
		const response = await api.get(`/credit/can-view?talentId=${talentId}`)
		return response.data
	},

	logView: async (talentId: string) => {
		const response = await api.post('/credit/log-view', { talentId })
		return response.data
	},
}

export const profileAPI = {
	getProfile: async () => {
		const response = await api.get('/ProfileCompletion/status')
		return response.data
	},
	updateProfile: async (profileData: any) => {
		const response = await api.post('/ProfileCompletion/manual', profileData)
		return response.data
	},
	parseCvWithAi: async (cvFile: File) => {
		const formData = new FormData()
		formData.append('cvFile', cvFile)
		const response = await api.post('/ProfileCompletion/cv-parse-ai-preview', formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
			timeout: 30000, // 30 seconds timeout for OpenAI processing
		})
		return response.data // Should be CvParsingResponseDto
	},
	updateProfileFromExtracted: async (extractedData: any) => { // ExtractedProfileDataDto
        const response = await api.post('/ProfileCompletion/update-from-extracted', extractedData)
		return response.data
	},
	markOnboardingCompleted: async () => {
		const response = await api.post('/ProfileCompletion/mark-onboarding-complete')
		return response.data
	}
}

// Analytics API endpoints for real-time dashboard data
export const analyticsAPI = {
	// Talent Analytics
	getTalentAnalytics: async (talentId: string, timeRange: '7d' | '30d' | '90d' = '30d') => {
		const response = await api.get(`/analytics/talent/${talentId}?timeRange=${timeRange}`)
		return response.data
	},

	getTalentProfileViews: async (talentId: string, timeRange: string = '30d') => {
		const response = await api.get(`/analytics/talent/${talentId}/profile-views?timeRange=${timeRange}`)
		return response.data
	},

	getTalentMatchQuality: async (talentId: string) => {
		const response = await api.get(`/analytics/talent/${talentId}/match-quality`)
		return response.data
	},

	getTalentMarketDemand: async (talentId: string) => {
		const response = await api.get(`/analytics/talent/${talentId}/market-demand`)
		return response.data
	},

	// Team/Employer Analytics
	getTeamAnalytics: async (employerId: string, timeRange: '7d' | '30d' | '90d' = '30d') => {
		const response = await api.get(`/analytics/team/${employerId}?timeRange=${timeRange}`)
		return response.data
	},

	getJobPerformance: async (employerId: string, timeRange: string = '30d') => {
		const response = await api.get(`/analytics/team/${employerId}/job-performance?timeRange=${timeRange}`)
		return response.data
	},

	getHiringMetrics: async (employerId: string, timeRange: string = '30d') => {
		const response = await api.get(`/analytics/team/${employerId}/hiring-metrics?timeRange=${timeRange}`)
		return response.data
	},

	getCandidateFlow: async (employerId: string, timeRange: string = '30d') => {
		const response = await api.get(`/analytics/team/${employerId}/candidate-flow?timeRange=${timeRange}`)
		return response.data
	},

	// General Analytics
	getMarketTrends: async () => {
		const response = await api.get('/analytics/market-trends')
		return response.data
	},

	getSkillDemand: async (location?: string) => {
		const params = location ? `?location=${encodeURIComponent(location)}` : ''
		const response = await api.get(`/analytics/skill-demand${params}`)
		return response.data
	},

	// Analytics Logging
	logProfileView: async (talentId: string, viewerId?: string, viewerType?: string) => {
		const response = await api.post('/analytics/log/profile-view', { 
			talentId: parseInt(talentId), 
			viewerId: viewerId ? parseInt(viewerId) : null, 
			viewerType 
		})
		return response.data
	},

	logJobView: async (jobId: string, viewerId?: string, viewerType?: string) => {
		const response = await api.post('/analytics/log/job-view', { 
			jobId: parseInt(jobId), 
			viewerId: viewerId ? parseInt(viewerId) : null, 
			viewerType 
		})
		return response.data
	},

	logApplication: async (jobId: string, talentId: string) => {
		const response = await api.post('/analytics/log/application', { 
			jobId: parseInt(jobId), 
			talentId: parseInt(talentId) 
		})
		return response.data
	},

	logMatchInteraction: async (talentId: string, jobId: string, action: string) => {
		const response = await api.post('/analytics/log/match-interaction', { 
			talentId: parseInt(talentId), 
			jobId: parseInt(jobId), 
			action 
		})
		return response.data
	},

	// Dashboard Stats
	getDashboardStats: async (userId: string, userType: 'talent' | 'employer') => {
		const response = await api.get(`/analytics/dashboard/${userId}?userType=${userType}`)
		return response.data
	},

	getRecentActivity: async (userId: string, userType: 'talent' | 'employer', limit: number = 10) => {
		const response = await api.get(`/analytics/activity/${userId}?userType=${userType}&limit=${limit}`)
		return response.data
	}
}

// Real-time notifications and updates
export const realtimeAPI = {
	// Notifications
	getNotifications: async (userId: string, limit: number = 20, offset: number = 0) => {
		const response = await api.get(`/notifications/user/${userId}?limit=${limit}&offset=${offset}`)
		return response.data
	},

	getNotificationById: async (notificationId: string) => {
		const response = await api.get(`/notifications/${notificationId}`)
		return response.data
	},

	sendNotification: async (notificationData: {
		userId: number
		type: string
		title: string
		message: string
		data?: any
		actionUrl?: string
		priority?: string
	}) => {
		const response = await api.post('/notifications', notificationData)
		return response.data
	},

	markNotificationRead: async (notificationId: string) => {
		const response = await api.put(`/notifications/${notificationId}/read`)
		return response.data
	},

	markAllNotificationsRead: async (userId: string) => {
		const response = await api.put(`/notifications/user/${userId}/read-all`)
		return response.data
	},

	deleteNotification: async (notificationId: string) => {
		const response = await api.delete(`/notifications/${notificationId}`)
		return response.data
	},

	getUnreadCount: async (userId: string) => {
		const response = await api.get(`/notifications/user/${userId}/unread-count`)
		return response.data
	},

	getNotificationStats: async (userId: string) => {
		const response = await api.get(`/notifications/user/${userId}/stats`)
		return response.data
	},

	getNotificationPreferences: async (userId: string) => {
		const response = await api.get(`/notifications/user/${userId}/preferences`)
		return response.data
	},

	updateNotificationPreferences: async (userId: string, preferences: any) => {
		const response = await api.put(`/notifications/user/${userId}/preferences`, preferences)
		return response.data
	},

	bulkMarkAsRead: async (notificationIds: number[]) => {
		const response = await api.post('/notifications/bulk/mark-read', { notificationIds })
		return response.data
	},

	bulkDelete: async (notificationIds: number[]) => {
		const response = await api.post('/notifications/bulk/delete', { notificationIds })
		return response.data
	},

	// Live Matches
	getLiveMatches: async (userId: string, userType: 'talent' | 'employer') => {
		const response = await api.get(`/live-matches/${userType}/${userId}`)
		return response.data
	},

	createLiveMatch: async (talentId: number, jobId: number, matchScore: number) => {
		const response = await api.post('/live-matches', { talentId, jobId, matchScore })
		return response.data
	},

	updateLiveMatch: async (matchId: string, updateData: {
		matchId: string
		status: string
		userId: number
		notes?: string
	}) => {
		const response = await api.put(`/live-matches/${matchId}`, updateData)
		return response.data
	},

	// Real-time Stats
	getRealTimeStats: async (userId: string, userType: 'talent' | 'employer') => {
		const response = await api.get(`/real-time-stats/${userType}/${userId}`)
		return response.data
	},

	refreshRealTimeStats: async (userId: string, userType: 'talent' | 'employer') => {
		const response = await api.post(`/real-time-stats/${userType}/${userId}/refresh`)
		return response.data
	},

	// Activity Feed
	getActivityFeed: async (userId: string, limit: number = 20, offset: number = 0) => {
		const response = await api.get(`/activity-feed/${userId}?limit=${limit}&offset=${offset}`)
		return response.data
	},

	logActivity: async (activityData: {
		userId: number
		type: string
		title: string
		description: string
		entityId?: string
		entityType?: string
		metadata?: any
	}) => {
		const response = await api.post('/activity-feed/log', activityData)
		return response.data
	},

	getRecentActivities: async (userId: string, limit: number = 10) => {
		const response = await api.get(`/activity-feed/${userId}/recent?limit=${limit}`)
		return response.data
	},

	// Online Status
	getOnlineStatus: async (userId: string) => {
		const response = await api.get(`/online-status/${userId}`)
		return response.data
	},

	updateOnlineStatus: async (statusData: {
		userId: number
		isOnline: boolean
		status?: string
	}) => {
		const response = await api.put('/online-status', statusData)
		return response.data
	},

	getOnlineUsers: async (userType: 'talent' | 'employer') => {
		const response = await api.get(`/online-users/${userType}`)
		return response.data
	},

	// Connection Management
	registerConnection: async (connectionData: {
		userId: number
		userType: string
		connectionId: string
	}) => {
		const response = await api.post('/connections/register', connectionData)
		return response.data
	},

	unregisterConnection: async (connectionId: string) => {
		const response = await api.delete(`/connections/${connectionId}`)
		return response.data
	},

	getConnectionStats: async () => {
		const response = await api.get('/connections/stats')
		return response.data
	},

	getActiveConnectionsCount: async () => {
		const response = await api.get('/connections/count')
		return response.data
	},

	// Real-time Notifications
	notifyProfileView: async (talentId: number, viewerId: number, viewerType: string) => {
		const response = await api.post('/notify/profile-view', { talentId, viewerId, viewerType })
		return response.data
	},

	syncUserData: async (userId: string, userType: 'talent' | 'employer') => {
		const response = await api.post(`/sync/${userType}/${userId}`)
		return response.data
	}
}

// Enhanced matching API with more endpoints
export const enhancedMatchingAPI = {
	...matchingAPI,

	// Get detailed match analysis
	getDetailedMatchAnalysis: async (talentId: string, jobId: string) => {
		const response = await api.post('/ai-matchmaking/detailed-analysis', {
			TalentUserId: parseInt(talentId),
			JobId: parseInt(jobId)
		})
		return response.data
	},

	// Get mutual matches (both sides interested)
	getMutualMatches: async (userId: string, userType: 'talent' | 'employer') => {
		const response = await api.get(`/matchmaking/mutual-matches/${userType}/${userId}`)
		return response.data
	},

	// Update match preferences
	updateMatchPreferences: async (preferences: any) => {
		const response = await api.put('/matchmaking/preferences', preferences)
		return response.data
	},

	// Get match statistics
	getMatchStats: async (userId: string, userType: 'talent' | 'employer') => {
		const response = await api.get(`/matchmaking/stats/${userType}/${userId}`)
		return response.data
	},

	// Bulk actions on matches
	bulkMatchActions: async (actions: Array<{ matchId: string; action: 'like' | 'pass' | 'bookmark' }>) => {
		const response = await api.post('/matchmaking/bulk-actions', { actions })
		return response.data
	}
}

// Credit system API - enhanced
export const enhancedCreditAPI = {
	...creditAPI,

	// Get current credit balance and usage
	getCreditBalance: async () => {
		const response = await api.get('/credit/balance')
		return response.data
	},

	// Get credit usage history
	getCreditHistory: async (page: number = 1, limit: number = 20) => {
		const response = await api.get(`/credit/history?page=${page}&limit=${limit}`)
		return response.data
	},

	// Purchase credits
	purchaseCredits: async (packageId: string, paymentMethod: any) => {
		const response = await api.post('/credit/purchase', { packageId, paymentMethod })
		return response.data
	},

	// Check if action requires credits
	checkCreditRequirement: async (action: string, targetId: string) => {
		const response = await api.get(`/credit/check-requirement?action=${action}&targetId=${targetId}`)
		return response.data
	},

	// Spend credits for action
	spendCredits: async (action: string, targetId: string, amount: number) => {
		const response = await api.post('/credit/spend', { action, targetId, amount })
		return response.data
	}
}

// Job management API - enhanced
export const enhancedJobAPI = {
	...jobAPI,

	// Get jobs with advanced filtering
	getJobsAdvanced: async (params: {
		page?: number
		limit?: number
		search?: string
		location?: string
		salaryMin?: number
		salaryMax?: number
		employmentType?: string
		experienceLevel?: string
		skills?: string[]
		remote?: boolean
		sortBy?: 'date' | 'salary' | 'relevance'
		sortOrder?: 'asc' | 'desc'
	}) => {
		const response = await api.get('/JobListing/advanced', { params })
		return response.data
	},

	// Get job analytics
	getJobAnalytics: async (jobId: string) => {
		const response = await api.get(`/JobListing/${jobId}/analytics`)
		return response.data
	},

	// Boost job visibility
	boostJob: async (jobId: string, duration: number) => {
		const response = await api.post(`/JobListing/${jobId}/boost`, { duration })
		return response.data
	},

	// Get similar jobs
	getSimilarJobs: async (jobId: string, limit: number = 5) => {
		const response = await api.get(`/JobListing/${jobId}/similar?limit=${limit}`)
		return response.data
	},

	// Save/bookmark job
	saveJob: async (jobId: string) => {
		const response = await api.post(`/JobListing/${jobId}/save`)
		return response.data
	},

	// Get saved jobs
	getSavedJobs: async () => {
		const response = await api.get('/JobListing/saved')
		return response.data
	}
}

// Application management API - enhanced
export const applicationAPI = {
	// Submit application with documents
	submitApplication: async (jobId: string, applicationData: {
		coverLetter?: string
		customMessage?: string
		portfolioUrl?: string
		expectedSalary?: number
		availableStartDate?: string
		documents?: File[]
	}) => {
		const formData = new FormData()
		formData.append('jobId', jobId)
		
		Object.entries(applicationData).forEach(([key, value]) => {
			if (key === 'documents' && Array.isArray(value)) {
				value.forEach(file => formData.append('documents', file))
			} else if (value !== undefined) {
				formData.append(key, value.toString())
			}
		})

		const response = await api.post('/JobApplication/submit', formData, {
			headers: { 'Content-Type': 'multipart/form-data' }
		})
		return response.data
	},

	// Get application status
	getApplicationStatus: async (applicationId: string) => {
		const response = await api.get(`/JobApplication/${applicationId}/status`)
		return response.data
	},

	// Withdraw application
	withdrawApplication: async (applicationId: string) => {
		const response = await api.delete(`/JobApplication/${applicationId}`)
		return response.data
	},

	// Get application analytics
	getApplicationAnalytics: async (userId: string) => {
		const response = await api.get(`/JobApplication/analytics/user/${userId}`)
		return response.data
	}
}

// Team/Employer specific APIs
export const teamAPI = {
	// Get team dashboard data
	getDashboardData: async (employerId: string) => {
		const response = await api.get(`/team/${employerId}/dashboard`)
		return response.data
	},

	// Get candidates for jobs
	getCandidates: async (employerId: string, filters?: {
		jobId?: string
		status?: string
		sortBy?: string
		page?: number
		limit?: number
	}) => {
		const response = await api.get(`/team/${employerId}/candidates`, { params: filters })
		return response.data
	},

	// Update candidate status
	updateCandidateStatus: async (applicationId: string, status: string, notes?: string) => {
		const response = await api.put(`/team/candidate/${applicationId}/status`, { status, notes })
		return response.data
	},

	// Send message to candidate
	messageCcandidate: async (candidateId: string, message: string, subject?: string) => {
		const response = await api.post(`/team/candidate/${candidateId}/message`, { message, subject })
		return response.data
	},

	// Schedule interview
	scheduleInterview: async (applicationId: string, interviewData: {
		scheduledDate: string
		duration: number
		type: 'phone' | 'video' | 'in-person'
		location?: string
		notes?: string
	}) => {
		const response = await api.post(`/team/application/${applicationId}/interview`, interviewData)
		return response.data
	}
}

export default api 