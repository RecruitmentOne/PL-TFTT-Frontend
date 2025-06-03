import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { userAPI, profileAPI } from '../../services/api'
import { ExtractedProfileDataDto } from '../../types'

export interface UserProfile {
	id: string
	firstName: string
	lastName: string
	email: string
	phone?: string
	location?: string
	bio?: string
	skills: string[]
	experience: any[]
	education: any[]
	profilePicture?: string
	isProfileComplete: boolean
	userType: 'talent' | 'employer'
}

export interface UserState {
	profile: UserProfile | null
	isLoading: boolean
	error: string | null
	profileCompletionScore: number
	hasCompletedOnboarding: boolean
}

const initialState: UserState = {
	profile: null,
	isLoading: false,
	error: null,
	profileCompletionScore: 0,
	hasCompletedOnboarding: false,
}

// Async thunks
export const getUserProfile = createAsyncThunk(
	'user/getUserProfile',
	async (_, { rejectWithValue, getState }) => {
		try {
			const response = await userAPI.getProfile()
			const { profile: backendProfileData, isComplete, userId } = response
			
			const authState = (getState() as any).auth
			const authUser = authState.user

			if (!backendProfileData) {
				return {
					id: authUser?.id || '0',
					firstName: authUser?.name?.split(' ')[0] || '',
					lastName: authUser?.name?.split(' ').slice(1).join(' ') || '',
					email: authUser?.email || '',
					phone: '',
					location: '',
					bio: '',
					skills: [],
					experience: [],
					education: [],
					profilePicture: authUser?.profilePicture || '',
					isProfileComplete: false,
					userType: (authUser?.userType || 'talent') as 'talent' | 'employer',
				}
			}
			
			// Transform backend TalentProfileDto (from /ProfileCompletion/status) to frontend UserProfile
			// The 'profile' object from backend /ProfileCompletion/status contains TalentProfileDto,
			// TalentProfessionalBackgroundDto, TalentJobPreferenceDto nested.
			const talentProfile = backendProfileData.talentProfileDto
			const professionalBackground = backendProfileData.talentProfessionalBackgroundDto
			const jobPreferences = backendProfileData.talentJobPreferenceDto

			return {
				id: userId?.toString() || authUser?.id || '0',
				firstName: talentProfile?.firstName || authUser?.name?.split(' ')[0] || '',
				lastName: talentProfile?.lastName || authUser?.name?.split(' ').slice(1).join(' ') || '',
				email: talentProfile?.email || authUser?.email || '',
				phone: talentProfile?.phoneNumber || '',
				location: talentProfile?.address || (talentProfile?.cityName && talentProfile?.countryName ? `${talentProfile.cityName}, ${talentProfile.countryName}` : ''),
				bio: professionalBackground?.summary || '',
				skills: professionalBackground?.skills ? professionalBackground.skills.split(', ').map((s: string) => s.trim()).filter((s: string) => s) : [],
				// Experience and Education might need separate fetching or be part of a more detailed profile object later
				// For now, assume they might be part of the professionalBackground or need to be mapped from it if available
				experience: professionalBackground?.workExperiences || [], 
				education: professionalBackground?.educations || [], 
				profilePicture: talentProfile?.profilePictureUrl || authUser?.profilePicture || '',
				isProfileComplete: isComplete || false,
				userType: (authUser?.userType || 'talent') as 'talent' | 'employer',
			}
		} catch (error: any) {
			console.error('getUserProfile error:', error)
			return rejectWithValue(error.response?.data?.message || 'Failed to get profile')
		}
	}
)

export const updateUserProfile = createAsyncThunk(
	'user/updateUserProfile',
	async (profileData: Partial<UserProfile>, { rejectWithValue }) => {
		try {
			const response = await userAPI.updateProfile(profileData)
			return response.profile
		} catch (error: any) {
			return rejectWithValue(error.response?.data?.message || 'Failed to update profile')
		}
	}
)

export const updateProfileFromCv = createAsyncThunk(
	'user/updateProfileFromCv',
	async (extractedData: ExtractedProfileDataDto, { rejectWithValue, dispatch }) => {
		try {
			const response = await profileAPI.updateProfileFromExtracted(extractedData)
			if (response.success) {
				// After successfully updating backend, re-fetch the user profile
				// to get the most up-to-date and consolidated profile data.
				await dispatch(getUserProfile())
				return response
			} else {
				return rejectWithValue(response.message || 'Failed to update profile from CV')
			}
		} catch (error: any) {
			return rejectWithValue(error.response?.data?.message || 'Failed to update profile from CV')
		}
	}
)

export const uploadProfilePicture = createAsyncThunk(
	'user/uploadProfilePicture',
	async (file: File, { rejectWithValue }) => {
		try {
			const response = await userAPI.uploadProfilePicture(file)
			return response
		} catch (error: any) {
			return rejectWithValue(error.response?.data?.message || 'Failed to upload picture')
		}
	}
)

// Check profile completion status for onboarding
export const checkProfileCompletion = createAsyncThunk(
	'user/checkProfileCompletion',
	async (_, { rejectWithValue }) => {
		try {
			const response = await profileAPI.getProfile()
			return {
				isComplete: response.isProfileComplete || response.isComplete || false,
				completionPercentage: response.completionPercentage || 0,
				hasCompletedOnboarding: response.hasCompletedOnboarding || false
			}
		} catch (error: any) {
			console.error('checkProfileCompletion error:', error)
			return rejectWithValue(error.response?.data?.message || 'Failed to check profile completion')
		}
	}
)

// Mark onboarding as completed (both locally and on server)
export const markOnboardingCompleted = createAsyncThunk(
	'user/markOnboardingCompleted',
	async (_, { rejectWithValue }) => {
		try {
			// Call backend API to mark onboarding as completed
			const response = await profileAPI.markOnboardingCompleted()
			
			// Also store in localStorage for immediate access
			localStorage.setItem('onboardingCompleted', 'true')
			
			return response
		} catch (error: any) {
			console.error('markOnboardingCompleted error:', error)
			// Fallback to localStorage if API fails
			localStorage.setItem('onboardingCompleted', 'true')
			return rejectWithValue(error.response?.data?.message || 'Failed to mark onboarding as completed')
		}
	}
)

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		clearUserError: (state) => {
			state.error = null
		},
		setProfile: (state, action: PayloadAction<UserProfile>) => {
			state.profile = action.payload
		},
	},
	extraReducers: (builder) => {
		builder
			// Get Profile
			.addCase(getUserProfile.pending, (state) => {
				state.isLoading = true
				state.error = null
			})
			.addCase(getUserProfile.fulfilled, (state, action: PayloadAction<UserProfile>) => {
				state.isLoading = false
				state.profile = action.payload
				state.error = null
			})
			.addCase(getUserProfile.rejected, (state, action) => {
				state.isLoading = false
				state.error = action.payload as string
			})
			// Update Profile (manual or general)
			.addCase(updateUserProfile.pending, (state) => {
				state.isLoading = true
				state.error = null
			})
			.addCase(updateUserProfile.fulfilled, (state, action: PayloadAction<UserProfile>) => {
				state.isLoading = false
				state.profile = action.payload
				state.error = null
			})
			.addCase(updateUserProfile.rejected, (state, action) => {
				state.isLoading = false
				state.error = action.payload as string
			})
			// Update Profile from CV
			.addCase(updateProfileFromCv.pending, (state) => {
				state.isLoading = true
				state.error = null
			})
			.addCase(updateProfileFromCv.fulfilled, (state, action) => {
				state.isLoading = false
				console.log('Profile update from CV successful:', action.payload)
			})
			.addCase(updateProfileFromCv.rejected, (state, action) => {
				state.isLoading = false
				state.error = action.payload as string
			})
			// Upload Profile Picture
			.addCase(uploadProfilePicture.pending, (state) => {
				state.isLoading = true
				state.error = null
			})
			.addCase(uploadProfilePicture.fulfilled, (state, action) => {
				state.isLoading = false
				if (state.profile) {
					state.profile.profilePicture = action.payload.profilePictureUrl
				}
				state.error = null
			})
			.addCase(uploadProfilePicture.rejected, (state, action) => {
				state.isLoading = false
				state.error = action.payload as string
			})
			// Check Profile Completion
			.addCase(checkProfileCompletion.pending, (state) => {
				state.isLoading = true
				state.error = null
			})
			.addCase(checkProfileCompletion.fulfilled, (state, action) => {
				state.isLoading = false
				state.profileCompletionScore = action.payload.completionPercentage
				state.hasCompletedOnboarding = action.payload.hasCompletedOnboarding
				if (state.profile) {
					state.profile.isProfileComplete = action.payload.isComplete
				}
			})
			.addCase(checkProfileCompletion.rejected, (state, action) => {
				state.isLoading = false
				state.error = action.payload as string
			})
			// Mark Onboarding Completed
			.addCase(markOnboardingCompleted.pending, (state) => {
				// Optimistically update the state
				state.hasCompletedOnboarding = true
			})
			.addCase(markOnboardingCompleted.fulfilled, (state, action) => {
				state.hasCompletedOnboarding = true
				state.error = null
			})
			.addCase(markOnboardingCompleted.rejected, (state, action) => {
				// Keep the optimistic update even if API call fails
				state.hasCompletedOnboarding = true
				state.error = action.payload as string
			})
	},
})

export const { clearUserError, setProfile } = userSlice.actions
export default userSlice.reducer 