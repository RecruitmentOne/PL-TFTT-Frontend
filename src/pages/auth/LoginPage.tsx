import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

function LoginPage() {
	const navigate = useNavigate()
	const location = useLocation()

	useEffect(() => {
		// Get the previous route the user was trying to access
		const from = location.state?.from?.pathname || ''
		
		// Determine which login page to redirect to based on the route
		if (from.startsWith('/team') || from.includes('team')) {
			navigate('/login/team', { state: location.state, replace: true })
		} else if (from.startsWith('/talent') || from.includes('talent')) {
			navigate('/login/talent', { state: location.state, replace: true })
		} else {
			// Default to talent login for general cases
			navigate('/login/talent', { state: location.state, replace: true })
		}
	}, [navigate, location])

	// Show loading while redirecting
	return (
		<div className="min-h-screen flex items-center justify-center">
			<div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
		</div>
	)
}

export default LoginPage 