import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { jobAPI, employerAPI, matchingAPI } from '../../services/api'

export interface Job {
	jobId: number
	employerId: number
	employerName: string
	jobTitle: string
	jobDescription: string
	cityId: number
	cityName: string
	salaryRange: string
	postingDate: string
	closingDate: string
	employmentTypeId?: number
	employmentTypeName?: string
	jobRoleId?: number
	jobRoleName?: string
	isRecommended?: boolean
	matchScore?: number
}

export interface JobApplication {
	applicationId: number
	jobId: number
	userId: number
	applicationDate: string
	applicationStatusId: number
}

export interface JobState {
	jobs: Job[]
	recommendedJobs: Job[]
	myApplications: JobApplication[]
	myJobs: Job[]
	selectedJob: Job | null
	isLoading: boolean
	isLoadingRecommendations: boolean
	error: string | null
	totalJobs: number
	currentPage: number
	searchQuery: string
	filters: {
		location?: string
		employmentType?: string
		salaryRange?: string
		jobRole?: string
	}
}

const initialState: JobState = {
	jobs: [],
	recommendedJobs: [],
	myApplications: [],
	myJobs: [],
	selectedJob: null,
	isLoading: false,
	isLoadingRecommendations: false,
	error: null,
	totalJobs: 0,
	currentPage: 1,
	searchQuery: '',
	filters: {},
}

// Async thunks
export const fetchJobs = createAsyncThunk(
	'jobs/fetchJobs',
	async (params: { page?: number; limit?: number; search?: string, filters?: JobState['filters'] } = {}, { rejectWithValue }) => {
		try {
			const queryParams = { ...params, ...params.filters }
			delete queryParams.filters
			const response = await jobAPI.getJobs(queryParams)
			return response
		} catch (error: any) {
			return rejectWithValue(error.response?.data?.message || 'Failed to fetch jobs')
		}
	}
)

export const fetchRecommendedJobs = createAsyncThunk(
	'jobs/fetchRecommendedJobs',
	async (talentUserId: string, { rejectWithValue }) => {
		try {
			const response = await matchingAPI.getRecommendedJobs(talentUserId, { count: 10, includeDetails: true })
			return response.map((job: any) => ({ ...job, isRecommended: true })) as Job[]
		} catch (error: any) {
			return rejectWithValue(error.response?.data?.message || 'Failed to fetch recommended jobs')
		}
	}
)

export const fetchJobById = createAsyncThunk(
	'jobs/fetchJobById',
	async (jobId: string, { rejectWithValue }) => {
		try {
			const response = await jobAPI.getJobById(jobId)
			return response
		} catch (error: any) {
			return rejectWithValue(error.response?.data?.message || 'Failed to fetch job')
		}
	}
)

export const applyToJob = createAsyncThunk(
	'jobs/applyToJob',
	async ({ jobId, applicationData }: { jobId: string; applicationData: any }, { rejectWithValue }) => {
		try {
			const response = await jobAPI.applyToJob(jobId, applicationData)
			return response
		} catch (error: any) {
			return rejectWithValue(error.response?.data?.message || 'Failed to apply to job')
		}
	}
)

export const fetchMyApplications = createAsyncThunk(
	'jobs/fetchMyApplications',
	async (userId: string, { rejectWithValue }) => {
		try {
			const response = await jobAPI.getMyApplications(userId)
			return response
		} catch (error: any) {
			return rejectWithValue(error.response?.data?.message || 'Failed to fetch applications')
		}
	}
)

export const createJob = createAsyncThunk(
	'jobs/createJob',
	async (jobData: any, { rejectWithValue }) => {
		try {
			const response = await employerAPI.createJob(jobData)
			return response
		} catch (error: any) {
			return rejectWithValue(error.response?.data?.message || 'Failed to create job')
		}
	}
)

export const fetchMyJobs = createAsyncThunk(
	'jobs/fetchMyJobs',
	async (employerId: string, { rejectWithValue }) => {
		try {
			const response = await employerAPI.getMyJobs(employerId)
			return response
		} catch (error: any) {
			return rejectWithValue(error.response?.data?.message || 'Failed to fetch my jobs')
		}
	}
)

export const updateJob = createAsyncThunk(
	'jobs/updateJob',
	async ({ jobId, jobData }: { jobId: string; jobData: any }, { rejectWithValue }) => {
		try {
			const response = await employerAPI.updateJob(jobId, jobData)
			return response
		} catch (error: any) {
			return rejectWithValue(error.response?.data?.message || 'Failed to update job')
		}
	}
)

export const deleteJob = createAsyncThunk(
	'jobs/deleteJob',
	async (jobId: string, { rejectWithValue }) => {
		try {
			await employerAPI.deleteJob(jobId)
			return jobId
		} catch (error: any) {
			return rejectWithValue(error.response?.data?.message || 'Failed to delete job')
		}
	}
)

const jobSlice = createSlice({
	name: 'jobs',
	initialState,
	reducers: {
		clearJobError: (state) => {
			state.error = null
		},
		setSearchQuery: (state, action: PayloadAction<string>) => {
			state.searchQuery = action.payload
		},
		setFilters: (state, action: PayloadAction<Partial<JobState['filters']>>) => {
			state.filters = { ...state.filters, ...action.payload }
		},
		clearFilters: (state) => {
			state.filters = {}
			state.searchQuery = ''
		},
		setSelectedJob: (state, action: PayloadAction<Job | null>) => {
			state.selectedJob = action.payload
		},
	},
	extraReducers: (builder) => {
		builder
			// Fetch Jobs
			.addCase(fetchJobs.pending, (state) => {
				state.isLoading = true
				state.error = null
			})
			.addCase(fetchJobs.fulfilled, (state, action) => {
				state.isLoading = false
				const payloadJobs = Array.isArray(action.payload?.data) ? action.payload.data : (Array.isArray(action.payload) ? action.payload : [])
				state.jobs = payloadJobs
				state.totalJobs = action.payload?.totalCount || payloadJobs.length
				state.currentPage = action.payload?.pageNumber || 1
				state.error = null
			})
			.addCase(fetchJobs.rejected, (state, action) => {
				state.isLoading = false
				state.error = action.payload as string
			})
			// Fetch Recommended Jobs
			.addCase(fetchRecommendedJobs.pending, (state) => {
				state.isLoadingRecommendations = true
				state.error = null
			})
			.addCase(fetchRecommendedJobs.fulfilled, (state, action: PayloadAction<Job[]>) => {
				state.isLoadingRecommendations = false
				state.recommendedJobs = action.payload
			})
			.addCase(fetchRecommendedJobs.rejected, (state, action) => {
				state.isLoadingRecommendations = false
				state.error = (state.error ? state.error + '; ' : '') + (action.payload as string)
			})
			// Fetch Job By ID
			.addCase(fetchJobById.pending, (state) => {
				state.isLoading = true
				state.error = null
			})
			.addCase(fetchJobById.fulfilled, (state, action: PayloadAction<Job>) => {
				state.isLoading = false
				state.selectedJob = action.payload
				state.error = null
			})
			.addCase(fetchJobById.rejected, (state, action) => {
				state.isLoading = false
				state.error = action.payload as string
			})
			// Apply to Job
			.addCase(applyToJob.pending, (state) => {
				state.isLoading = true
				state.error = null
			})
			.addCase(applyToJob.fulfilled, (state, action) => {
				state.isLoading = false
				state.myApplications.push(action.payload)
				state.error = null
			})
			.addCase(applyToJob.rejected, (state, action) => {
				state.isLoading = false
				state.error = action.payload as string
			})
			// Fetch My Applications
			.addCase(fetchMyApplications.pending, (state) => {
				state.isLoading = true
				state.error = null
			})
			.addCase(fetchMyApplications.fulfilled, (state, action: PayloadAction<JobApplication[]>) => {
				state.isLoading = false
				state.myApplications = action.payload
				state.error = null
			})
			.addCase(fetchMyApplications.rejected, (state, action) => {
				state.isLoading = false
				state.error = action.payload as string
			})
			// Create Job
			.addCase(createJob.pending, (state) => {
				state.isLoading = true
				state.error = null
			})
			.addCase(createJob.fulfilled, (state, action: PayloadAction<Job>) => {
				state.isLoading = false
				state.myJobs.unshift(action.payload)
				state.error = null
			})
			.addCase(createJob.rejected, (state, action) => {
				state.isLoading = false
				state.error = action.payload as string
			})
			// Fetch My Jobs
			.addCase(fetchMyJobs.pending, (state) => {
				state.isLoading = true
				state.error = null
			})
			.addCase(fetchMyJobs.fulfilled, (state, action: PayloadAction<Job[]>) => {
				state.isLoading = false
				state.myJobs = action.payload
				state.error = null
			})
			.addCase(fetchMyJobs.rejected, (state, action) => {
				state.isLoading = false
				state.error = action.payload as string
			})
			// Update Job
			.addCase(updateJob.pending, (state) => {
				state.isLoading = true
				state.error = null
			})
			.addCase(updateJob.fulfilled, (state, action: PayloadAction<Job>) => {
				state.isLoading = false
				const index = state.myJobs.findIndex(job => job.jobId === action.payload.jobId)
				if (index !== -1) {
					state.myJobs[index] = action.payload
				}
				const jobIndex = state.jobs.findIndex(job => job.jobId === action.payload.jobId)
				if (jobIndex !== -1) {
					state.jobs[jobIndex] = action.payload
				}
				if (state.selectedJob?.jobId === action.payload.jobId) {
					state.selectedJob = action.payload
				}
				state.error = null
			})
			.addCase(updateJob.rejected, (state, action) => {
				state.isLoading = false
				state.error = action.payload as string
			})
			// Delete Job
			.addCase(deleteJob.pending, (state) => {
				state.isLoading = true
				state.error = null
			})
			.addCase(deleteJob.fulfilled, (state, action: PayloadAction<string>) => {
				state.isLoading = false
				state.myJobs = state.myJobs.filter(job => job.jobId.toString() !== action.payload)
				state.jobs = state.jobs.filter(job => job.jobId.toString() !== action.payload)
				state.error = null
			})
			.addCase(deleteJob.rejected, (state, action) => {
				state.isLoading = false
				state.error = action.payload as string
			})
	},
})

export const { 
	clearJobError, 
	setSearchQuery, 
	setFilters, 
	clearFilters, 
	setSelectedJob 
} = jobSlice.actions

export default jobSlice.reducer 