import axios, { AxiosInstance } from 'axios'
import {
	DashboardResponse,
	JobsResponse,
	TalentsResponse,
	MatchesResponse,
	CreditsResponse,
	NotificationsResponse,
	Job,
	JobFilters,
	TalentFilters
} from '../types/dashboard'

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
					localStorage.removeItem('token')
					localStorage.removeItem('refreshToken')
					return Promise.reject(refreshError)
				}
			} else {
				localStorage.removeItem('token')
				localStorage.removeItem('refreshToken')
			}
		}
		
		return Promise.reject(error)
	}
)

// Dashboard API endpoints
export const dashboardAPI = {
	// Dashboard Overview
	getDashboardData: async (): Promise<DashboardResponse> => {
		const response = await api.get('/dashboard/overview')
		return response.data
	},

	// Jobs endpoints
	getJobs: async (params?: {
		page?: number
		limit?: number
		filters?: Partial<JobFilters>
	}): Promise<JobsResponse> => {
		const response = await api.get('/dashboard/jobs', { params })
		return response.data
	},

	createJob: async (jobData: Partial<Job>): Promise<Job> => {
		const response = await api.post('/dashboard/jobs', jobData)
		return response.data
	},

	updateJob: async (jobId: string, jobData: Partial<Job>): Promise<Job> => {
		const response = await api.put(`/dashboard/jobs/${jobId}`, jobData)
		return response.data
	},

	deleteJob: async (jobId: string): Promise<void> => {
		await api.delete(`/dashboard/jobs/${jobId}`)
	},

	getJobLikes: async (jobId: string): Promise<any[]> => {
		const response = await api.get(`/dashboard/jobs/${jobId}/likes`)
		return response.data
	},

	// Talent endpoints (for teams)
	getTalents: async (params?: {
		page?: number
		limit?: number
		filters?: Partial<TalentFilters>
	}): Promise<TalentsResponse> => {
		const response = await api.get('/dashboard/talents', { params })
		return response.data
	},

	likeTalent: async (talentId: string): Promise<void> => {
		await api.post(`/dashboard/talents/${talentId}/like`)
	},

	viewTalentProfile: async (talentId: string): Promise<any> => {
		const response = await api.post(`/dashboard/talents/${talentId}/view`)
		return response.data
	},

	// Talent job interactions (for talents)
	likeJob: async (jobId: string): Promise<void> => {
		await api.post(`/dashboard/jobs/${jobId}/like`)
	},

	dislikeJob: async (jobId: string): Promise<void> => {
		await api.post(`/dashboard/jobs/${jobId}/dislike`)
	},

	// Matches endpoints
	getMatches: async (params?: {
		page?: number
		limit?: number
	}): Promise<MatchesResponse> => {
		const response = await api.get('/dashboard/matches', { params })
		return response.data
	},

	getMatchDetails: async (matchId: string): Promise<any> => {
		const response = await api.get(`/dashboard/matches/${matchId}`)
		return response.data
	},

	// Credits endpoints (for teams only)
	getCredits: async (params?: {
		page?: number
		limit?: number
	}): Promise<CreditsResponse> => {
		const response = await api.get('/dashboard/credits', { params })
		return response.data
	},

	purchaseCredits: async (amount: number, paymentData: any): Promise<any> => {
		const response = await api.post('/dashboard/credits/purchase', {
			amount,
			...paymentData
		})
		return response.data
	},

	// Notifications endpoints
	getNotifications: async (params?: {
		page?: number
		limit?: number
		unreadOnly?: boolean
	}): Promise<NotificationsResponse> => {
		const response = await api.get('/dashboard/notifications', { params })
		return response.data
	},

	markNotificationRead: async (notificationId: string): Promise<void> => {
		await api.put(`/dashboard/notifications/${notificationId}/read`)
	},

	markAllNotificationsRead: async (): Promise<void> => {
		await api.put('/dashboard/notifications/read-all')
	},

	deleteNotification: async (notificationId: string): Promise<void> => {
		await api.delete(`/dashboard/notifications/${notificationId}`)
	},

	// Settings endpoints
	updateSettings: async (settings: any): Promise<any> => {
		const response = await api.put('/dashboard/settings', settings)
		return response.data
	},

	getSettings: async (): Promise<any> => {
		const response = await api.get('/dashboard/settings')
		return response.data
	},

	// Profile endpoints
	getProfile: async (): Promise<any> => {
		const response = await api.get('/dashboard/profile')
		return response.data
	},

	updateProfile: async (profileData: any): Promise<any> => {
		const response = await api.put('/dashboard/profile', profileData)
		return response.data
	},

	changePassword: async (passwordData: { currentPassword: string, newPassword: string, confirmPassword: string }): Promise<any> => {
		const response = await api.put('/dashboard/profile/password', passwordData)
		return response.data
	},

	uploadProfilePicture: async (file: File): Promise<string> => {
		const formData = new FormData()
		formData.append('file', file)
		
		const response = await api.post('/dashboard/profile/picture', formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		})
		return response.data.url
	},

	// Analytics endpoints
	getAnalytics: async (period: 'week' | 'month' | 'quarter' | 'year' = 'month'): Promise<any> => {
		const response = await api.get(`/dashboard/analytics?period=${period}`)
		return response.data
	},

	// Subscription endpoints
	getSubscription: async (): Promise<any> => {
		const response = await api.get('/dashboard/subscription')
		return response.data
	},

	updateSubscription: async (planId: string): Promise<any> => {
		const response = await api.post('/dashboard/subscription/update', { planId })
		return response.data
	},

	cancelSubscription: async (): Promise<any> => {
		const response = await api.post('/dashboard/subscription/cancel')
		return response.data
	}
}

export default dashboardAPI 