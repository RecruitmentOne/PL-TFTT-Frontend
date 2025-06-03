import { ReactNode, useEffect } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../../store/hooks'
import { getCurrentUser } from '../../store/slices/authSlice'
import { checkProfileCompletion } from '../../store/slices/userSlice'

interface ProtectedRouteProps {
	children: ReactNode
	requiredUserType?: 'talent' | 'employer'
}

function ProtectedRoute({ children, requiredUserType }: ProtectedRouteProps) {
	const dispatch = useAppDispatch()
	const location = useLocation()
	const { isAuthenticated, user, token, isLoading } = useAppSelector((state) => state.auth)
	const { hasCompletedOnboarding } = useAppSelector((state) => state.user)

	useEffect(() => {
		// If we have a token but no user info, try to get current user
		if (token && !user && !isLoading) {
			dispatch(getCurrentUser())
		}

		// Check onboarding status for authenticated talent users
		if (isAuthenticated && user?.userType === 'talent' && !hasCompletedOnboarding) {
			dispatch(checkProfileCompletion())
		}
	}, [dispatch, token, user, isLoading, isAuthenticated, user?.userType, hasCompletedOnboarding])

	// Show loading while checking authentication
	if (isLoading) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
			</div>
		)
	}

	// If not authenticated, redirect to login
	if (!isAuthenticated || !user) {
		return <Navigate to="/login" state={{ from: location }} replace />
	}

	// If user type is required and doesn't match, redirect to unauthorized page
	if (requiredUserType && user.userType !== requiredUserType) {
		return <Navigate to="/unauthorized" replace />
	}

	// Redirect talents to onboarding if they haven't completed it
	// (except if they're already on the onboarding page)
	if (
		user?.userType === 'talent' && 
		!hasCompletedOnboarding && 
		location.pathname !== '/onboarding'
	) {
		return <Navigate to="/onboarding" replace />
	}

	return <>{children}</>
}

export default ProtectedRoute 