import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { authAPI } from '../../services/api'

export interface User {
	id: string
	email: string
	firstName: string
	lastName: string
	userType: 'talent' | 'employer'
	isEmailConfirmed?: boolean
	profilePicture?: string
}

export interface AuthState {
	user: User | null
	token: string | null
	refreshToken: string | null
	isAuthenticated: boolean
	isLoading: boolean
	error: string | null
}

const token = localStorage.getItem('token')

const initialState: AuthState = {
	user: null,
	token: token,
	refreshToken: localStorage.getItem('refreshToken'),
	isAuthenticated: !!token,
	isLoading: false,
	error: null,
}

// Async thunks for API calls
export const login = createAsyncThunk(
	'auth/login',
	async (credentials: { email: string; password: string; userType?: string }, { rejectWithValue }) => {
		try {
			const response = await authAPI.login(credentials)
			console.log('Login response:', response)
			
			// Transform backend response to match frontend expectations
			const transformedResponse = {
				token: response.accessToken,
				refreshToken: response.refreshToken,
				user: {
					id: response.userId?.toString() || '0',
					email: response.email || '',
					firstName: response.name?.split(' ')[0] || '',
					lastName: response.name?.split(' ').slice(1).join(' ') || '',
					userType: (response.userType === 'employer' ? 'employer' : 'talent') as 'talent' | 'employer',
					isEmailConfirmed: true, // Assume confirmed if they can login
				}
			}
			
			localStorage.setItem('token', transformedResponse.token)
			localStorage.setItem('refreshToken', transformedResponse.refreshToken)
			
			return transformedResponse
		} catch (error: any) {
			console.error('Login error:', error)
			return rejectWithValue(error.response?.data?.message || 'Login failed')
		}
	}
)

export const registerTalent = createAsyncThunk(
	'auth/registerTalent',
	async (userData: {
		fullName: string
		email: string
		phoneNumber: string
		password: string
		termsAccepted: boolean
	}, { rejectWithValue }) => {
		try {
			const response = await authAPI.registerTalent(userData)
			return response
		} catch (error: any) {
			return rejectWithValue(error.response?.data?.message || 'Registration failed')
		}
	}
)

export const registerEmployer = createAsyncThunk(
	'auth/registerEmployer',
	async (userData: {
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
	}, { rejectWithValue }) => {
		try {
			const response = await authAPI.registerEmployer(userData)
			return response
		} catch (error: any) {
			return rejectWithValue(error.response?.data?.message || 'Registration failed')
		}
	}
)

export const logout = createAsyncThunk(
	'auth/logout',
	async () => {
		try {
			await authAPI.logout()
			localStorage.removeItem('token')
			localStorage.removeItem('refreshToken')
		} catch (error: any) {
			// Even if logout fails on server, clear local storage
			localStorage.removeItem('token')
			localStorage.removeItem('refreshToken')
		}
	}
)

export const getCurrentUser = createAsyncThunk(
	'auth/getCurrentUser',
	async (_, { rejectWithValue }) => {
		try {
			const response = await authAPI.getCurrentUser()
			console.log('getCurrentUser response:', response)
			
			// Transform backend response to match frontend User interface
			return {
				id: response.userId?.toString() || '0',
				email: response.email || '',
				firstName: response.name?.split(' ')[0] || '',
				lastName: response.name?.split(' ').slice(1).join(' ') || '',
				userType: (response.userType === 'employer' ? 'employer' : 'talent') as 'talent' | 'employer',
				isEmailConfirmed: true, // Assume confirmed if they can login
			}
		} catch (error: any) {
			console.error('getCurrentUser error:', error)
			return rejectWithValue(error.response?.data?.message || 'Failed to get user')
		}
	}
)

export const changePassword = createAsyncThunk(
	'auth/changePassword',
	async ({ currentPassword, newPassword }: { currentPassword: string; newPassword: string }, { rejectWithValue }) => {
		try {
			const response = await authAPI.changePassword(currentPassword, newPassword)
			return response
		} catch (error: any) {
			return rejectWithValue(error.response?.data?.message || 'Failed to change password')
		}
	}
)

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		clearError: (state) => {
			state.error = null
		},
		setCredentials: (state, action: PayloadAction<{ user: User; token: string; refreshToken: string }>) => {
			state.user = action.payload.user
			state.token = action.payload.token
			state.refreshToken = action.payload.refreshToken
			state.isAuthenticated = true
		},
	},
	extraReducers: (builder) => {
		builder
			// Login
			.addCase(login.pending, (state) => {
				state.isLoading = true
				state.error = null
			})
			.addCase(login.fulfilled, (state, action) => {
				state.isLoading = false
				state.user = action.payload.user
				state.token = action.payload.token
				state.refreshToken = action.payload.refreshToken
				state.isAuthenticated = true
				state.error = null
			})
			.addCase(login.rejected, (state, action) => {
				state.isLoading = false
				state.error = action.payload as string
				state.isAuthenticated = false
			})
			// Register Talent
			.addCase(registerTalent.pending, (state) => {
				state.isLoading = true
				state.error = null
			})
			.addCase(registerTalent.fulfilled, (state) => {
				state.isLoading = false
				state.error = null
			})
			.addCase(registerTalent.rejected, (state, action) => {
				state.isLoading = false
				state.error = action.payload as string
			})
			// Register Employer
			.addCase(registerEmployer.pending, (state) => {
				state.isLoading = true
				state.error = null
			})
			.addCase(registerEmployer.fulfilled, (state) => {
				state.isLoading = false
				state.error = null
			})
			.addCase(registerEmployer.rejected, (state, action) => {
				state.isLoading = false
				state.error = action.payload as string
			})
			// Logout
			.addCase(logout.fulfilled, (state) => {
				state.user = null
				state.token = null
				state.refreshToken = null
				state.isAuthenticated = false
				state.error = null
			})
			// Get Current User
			.addCase(getCurrentUser.pending, (state) => {
				state.isLoading = true
			})
			.addCase(getCurrentUser.fulfilled, (state, action) => {
				state.isLoading = false
				state.user = action.payload
				state.error = null
			})
			.addCase(getCurrentUser.rejected, (state, action) => {
				state.isLoading = false
				state.error = action.payload as string
				// Clear authentication state when token validation fails
				state.user = null
				state.token = null
				state.refreshToken = null
				state.isAuthenticated = false
				// Clear localStorage
				localStorage.removeItem('token')
				localStorage.removeItem('refreshToken')
			})
			// Change Password
			.addCase(changePassword.pending, (state) => {
				state.isLoading = true
				state.error = null
			})
			.addCase(changePassword.fulfilled, (state) => {
				state.isLoading = false
				state.error = null
			})
			.addCase(changePassword.rejected, (state, action) => {
				state.isLoading = false
				state.error = action.payload as string
			})
	},
})

export const { clearError, setCredentials } = authSlice.actions
export default authSlice.reducer 