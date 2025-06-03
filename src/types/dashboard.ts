// Dashboard Types
export interface DashboardMetrics {
	teams: {
		totalActiveJobPostings: number
		totalTalentLikesReceived: number
		totalMutualMatches: number
		creditsRemaining: number
	}
	talents: {
		totalJobsLiked: number
		totalMutualMatches: number
		profileViewsByTeams: number
		profileCompletionProgress: number
	}
}

export interface Activity {
	id: string
	type: 'talent_liked_job' | 'team_liked_talent' | 'mutual_match' | 'profile_viewed' | 'credits_spent'
	timestamp: string
	title: string
	description: string
	relatedJobId?: string
	relatedTalentId?: string
	relatedTeamId?: string
	creditsAmount?: number
	metadata?: Record<string, any>
}

export interface Job {
	id: string
	title: string
	company: string
	description: string
	location: string
	salaryRange?: string
	employmentType: string
	postedDate: string
	closingDate: string
	status: 'active' | 'closed' | 'draft'
	likesCount: number
	requirements?: string[]
	benefits?: string[]
	employerId: string
	talentLikes?: TalentLike[]
}

export interface TalentLike {
	id: string
	talentId: string
	jobId: string
	talentName: string
	talentEmail: string
	profilePicture?: string
	currentJobTitle?: string
	experience?: number
	skills?: string[]
	likedAt: string
}

export interface Talent {
	id: string
	firstName: string
	lastName: string
	email: string
	profilePicture?: string
	currentJobTitle?: string
	experience?: number
	skills?: string[]
	location?: string
	bio?: string
	jobsLiked: string[]
	lastActivity: string
	profileCompletionScore: number
}

export interface Match {
	id: string
	jobId: string
	talentId: string
	teamId?: string
	jobTitle: string
	companyName: string
	talentName: string
	talentEmail?: string
	matchedAt: string
	creditsSpent?: number
	profileViewed?: boolean
	talentProfilePicture?: string
	talentCurrentRole?: string
	talentSkills?: string[]
	isNewMatch?: boolean
}

export interface Credit {
	id: string
	amount: number
	type: 'purchase' | 'spent' | 'refund'
	description: string
	relatedTalentId?: string
	relatedJobId?: string
	timestamp: string
}

export interface CreditBalance {
	current: number
	spent: number
	purchased: number
	lastPurchaseDate?: string
}

export interface Notification {
	id: string
	type: 'like' | 'match' | 'credit_spent' | 'profile_viewed'
	title: string
	message: string
	timestamp: string
	read: boolean
	relatedJobId?: string
	relatedTalentId?: string
	relatedTeamId?: string
	creditsAmount?: number
}

export interface DashboardUser {
	id: string
	email: string
	firstName: string
	lastName: string
	userType: 'talent' | 'team'
	profilePicture?: string
	companyName?: string
	subscriptionPlan?: SubscriptionPlan
	phone?: string
	location?: string
	bio?: string
	website?: string
	linkedin?: string
	currentJobTitle?: string
}

export interface SubscriptionPlan {
	id: string
	name: string
	creditsPerMonth: number
	price: number
	renewalDate: string
	status: 'active' | 'expired' | 'cancelled'
	features: string[]
}

export interface ChartDataPoint {
	date: string
	value: number
	label?: string
}

export interface DashboardStats {
	likesOverTime: ChartDataPoint[]
	matchesOverTime: ChartDataPoint[]
	creditsUsageOverTime?: ChartDataPoint[]
	profileViewsOverTime?: ChartDataPoint[]
}

export interface JobFilters {
	search: string
	location: string
	employmentType: string
	salaryRange: string
	datePosted: string
}

export interface TalentFilters {
	search: string
	skills: string[]
	experience: string
	location: string
	availability: string
}

export interface UserSettings {
	notifications: {
		email: {
			jobMatches: boolean
			newMessages: boolean
			profileViews: boolean
			weeklyDigest: boolean
			marketing: boolean
		}
		push: {
			jobMatches: boolean
			newMessages: boolean
			profileViews: boolean
			reminders: boolean
		}
	}
	privacy: {
		profileVisibility: 'public' | 'private' | 'limited'
		showEmail: boolean
		showPhone: boolean
		allowMessages: boolean
		allowJobAlerts: boolean
	}
	security: {
		twoFactorEnabled: boolean
		lastPasswordChange?: string
	}
	preferences: {
		theme: 'light' | 'dark' | 'system'
		language: string
		timezone: string
	}
}

// API Response interfaces
export interface DashboardResponse {
	metrics: DashboardMetrics
	recentActivity: Activity[]
	topMatches: Match[]
	stats: DashboardStats
	user: DashboardUser
}

export interface JobsResponse {
	jobs: Job[]
	totalCount: number
	currentPage: number
	totalPages: number
}

export interface TalentsResponse {
	talents: Talent[]
	totalCount: number
	currentPage: number
	totalPages: number
}

export interface MatchesResponse {
	matches: Match[]
	totalCount: number
	currentPage: number
	totalPages: number
}

export interface CreditsResponse {
	balance: CreditBalance
	transactions: Credit[]
	totalCount: number
	currentPage: number
	totalPages: number
}

export interface NotificationsResponse {
	notifications: Notification[]
	unreadCount: number
	totalCount: number
	currentPage: number
	totalPages: number
} 