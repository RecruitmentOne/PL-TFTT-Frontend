import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../store/hooks'
import { 
	login, 
	logout, 
	registerTalent, 
	registerEmployer, 
	getCurrentUser,
	clearError 
} from '../store/slices/authSlice'
import type { LoginCredentials, TalentRegistrationData, EmployerRegistrationData } from '../types'

export function useAuth() {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const authState = useAppSelector((state) => state.auth)

	const loginUser = useCallback(async (credentials: LoginCredentials) => {
		try {
			const result = await dispatch(login(credentials)).unwrap()
			// Redirect based on user type
			if (result.user.userType === 'employer') {
				navigate('/team')
			} else {
				navigate('/talent')
			}
			return result
		} catch (error) {
			throw error
		}
	}, [dispatch, navigate])

	const registerTalentUser = useCallback(async (userData: TalentRegistrationData) => {
		try {
			const result = await dispatch(registerTalent(userData)).unwrap()
			// Show success message and redirect to login
			navigate('/login', { 
				state: { 
					message: 'Registration successful! Please check your email to verify your account.' 
				} 
			})
			return result
		} catch (error) {
			throw error
		}
	}, [dispatch, navigate])

	const registerEmployerUser = useCallback(async (userData: EmployerRegistrationData) => {
		try {
			const result = await dispatch(registerEmployer(userData)).unwrap()
			// Show success message and redirect to login
			navigate('/login', { 
				state: { 
					message: 'Registration successful! Please check your email to verify your account.' 
				} 
			})
			return result
		} catch (error) {
			throw error
		}
	}, [dispatch, navigate])

	const logoutUser = useCallback(async () => {
		try {
			await dispatch(logout()).unwrap()
			navigate('/login')
		} catch (error) {
			// Even if logout fails on server, redirect to login
			navigate('/login')
		}
	}, [dispatch, navigate])

	const refreshUser = useCallback(async () => {
		try {
			const result = await dispatch(getCurrentUser()).unwrap()
			return result
		} catch (error) {
			throw error
		}
	}, [dispatch])

	const clearAuthError = useCallback(() => {
		dispatch(clearError())
	}, [dispatch])

	return {
		// State
		user: authState.user,
		token: authState.token,
		isAuthenticated: authState.isAuthenticated,
		isLoading: authState.isLoading,
		error: authState.error,
		
		// Actions
		login: loginUser,
		logout: logoutUser,
		registerTalent: registerTalentUser,
		registerEmployer: registerEmployerUser,
		refreshUser,
		clearError: clearAuthError,
		
		// Computed values
		isTalent: authState.user?.userType === 'talent',
		isEmployer: authState.user?.userType === 'employer',
	}
} 