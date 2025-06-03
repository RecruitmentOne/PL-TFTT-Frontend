// User and Authentication Types
export interface User {
	id: string
	email: string
	firstName: string
	lastName: string
	userType: 'talent' | 'team'
	isEmailConfirmed?: boolean
	profilePicture?: string
}

export interface LoginCredentials {
	email: string
	password: string
	userType?: string
}

export interface TalentRegistrationData {
	fullName: string
	email: string
	phoneNumber: string
	password: string
	termsAccepted: boolean
}

export interface EmployerRegistrationData {
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
}

// Job and Career Types
export interface JobListing {
	id: string
	title: string
	description: string
	company: string
	location: string
	salaryRange?: string
	employmentType?: string
	postedDate: string
	closingDate: string
	requirements?: string[]
	benefits?: string[]
	employerId: string
}

export interface JobApplication {
	id: string
	jobId: string
	userId: string
	status: 'pending' | 'reviewed' | 'accepted' | 'rejected'
	appliedAt: string
	coverLetter?: string
	resumeUrl?: string
}

// Lookup/Reference Data Types
export interface LookupItem {
	id: number
	name: string
}

export interface Industry extends LookupItem {}
export interface Country extends LookupItem {}
export interface City extends LookupItem {
	countryId?: number
}
export interface CompanySize extends LookupItem {}
export interface CompanyType extends LookupItem {}
export interface EmploymentType extends LookupItem {}
export interface JobRole extends LookupItem {}

// API Response Types
export interface ApiResponse<T = any> {
	success: boolean
	data?: T
	message?: string
	errors?: string[]
}

export interface PaginatedResponse<T> {
	data: T[]
	currentPage: number
	totalPages: number
	totalItems: number
	hasNextPage: boolean
	hasPreviousPage: boolean
}

// Form Types
export interface ContactFormData {
	name: string
	email: string
	company?: string
	message: string
}

// Profile Types
export interface TalentProfile {
	id: string
	userId: string
	firstName: string
	lastName: string
	email: string
	phoneNumber?: string
	profilePicture?: string
	currentJobTitle?: string
	experience?: number
	skills?: string[]
	education?: string
	location?: string
	salaryExpectation?: number
	availabilityDate?: string
	bio?: string
}

export interface EmployerProfile {
	id: string
	userId: string
	companyName: string
	email: string
	industry?: string
	companySize?: string
	website?: string
	location?: string
	description?: string
	logo?: string
}

// Matching Types
export interface MatchScore {
	jobId: string
	talentId: string
	score: number
	reasons: string[]
	mismatchReasons?: string[]
}

// Error Types
export interface ValidationError {
	field: string
	message: string
}

export interface ApiError {
	message: string
	status: number
	validationErrors?: ValidationError[]
}

// CV Parsing and Profile Completion Types
export interface ExtractedWorkExperienceDto {
	jobTitle?: string
	company?: string
	duration?: string
	description?: string
	startDate?: string // Keep as string to match potential form input, convert later if needed
	endDate?: string
}

export interface ExtractedEducationDto {
	degree?: string
	institution?: string
	duration?: string
	graduationDate?: string // Keep as string
}

export interface ExtractedProfileDataDto {
	firstName?: string
	lastName?: string
	email?: string
	phoneNumber?: string
	address?: string
	nationality?: string
	currentJobTitle?: string
	currentEmployer?: string
	totalYearsExperience?: number
	topSkills?: string // Could be a comma-separated string or an array based on parser
	languagesSpoken?: string
	portfolioWebsite?: string
	preferredJobRoles?: string
	preferredLocations?: string
	expectedSalary?: number
	rawText?: string
	summary?: string
	workExperience?: ExtractedWorkExperienceDto[]
	education?: ExtractedEducationDto[]
}

export interface CvParsingResponseDto {
	success: boolean
	message: string
	extractedData?: ExtractedProfileDataDto
	errors?: string[]
} 