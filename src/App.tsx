import { Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { useEffect } from 'react'
import { store } from './store'
import { useAppDispatch, useAppSelector } from './store/hooks'
import { getCurrentUser } from './store/slices/authSlice'
import { checkProfileCompletion } from './store/slices/userSlice'
import ErrorBoundary from './components/shared/ErrorBoundary'
import PublicLayout from './components/layout/PublicLayout'
import ProtectedRoute from './components/auth/ProtectedRoute'

// Brand System & Localization
import { BrandProvider } from './brand'
import './localization/i18n-config'
import { BrandDemo } from './components/brand/brand-demo'
import { BrandShowcase } from './components/brand/brand-showcase'
import LanguageSwitcherDemo from './pages/LanguageSwitcherDemo'

// Pages
import HomePage from './pages/HomePage'
import HomePageOld from './pages/old/HomePage'
import HomePageOld2 from './pages/old/HomePage copy 2'
import HomePageOld3 from './pages/old/HomePage copy 3'
import HomePageOld4 from './pages/old/HomePage copy 4'
import HomePageOld5 from './pages/old/HomePage copy 5'

import AboutPage from './pages/AboutPage'
import ProjectPresentationPage from './pages/ProjectPresentationPage'
import TalentPage from './pages/TalentPage'
import TeamsPage from './pages/TeamsPage'
import ContactPage from './pages/ContactPage'
import PrivacyPage from './pages/PrivacyPage'
import TermsPage from './pages/TermsPage'

import LoginPage from './pages/auth/LoginPage'
import LoginTalentPage from './pages/auth/LoginTalentPage'
import LoginTeamPage from './pages/auth/LoginTeamPage'
import RegisterTalentPage from './pages/auth/RegisterTalentPage'
import RegisterTeamPage from './pages/auth/RegisterTeamPage'
import UnauthorizedPage from './pages/UnauthorizedPage'
import ProfileOnboardingPage from './pages/onboarding/ProfileOnboardingPage'

// Test Pages
import TestAnalyticsPage from './pages/TestAnalyticsPage'

// Main Dashboard Demo
import MainDashboardDemo from './pages/demo/MainDashboardDemo'

// Team Dashboard Pages
import TeamDashboard from './pages/dashboard/team-dashboard/TeamDashboard'
import PostJobPage from './pages/dashboard/team-dashboard/PostJobPage'
import MyJobsPage from './pages/dashboard/team-dashboard/MyJobsPage'
import CreditsPage from './pages/dashboard/team-dashboard/CreditsPage'
import CandidatesPage from './pages/dashboard/team-dashboard/CandidatesPage'
import AnalyticsPage from './pages/dashboard/team-dashboard/AnalyticsPage'

// Talent Dashboard Pages
import TalentDashboard from './pages/dashboard/talent-dashboard/TalentDashboard'
import ProfilePage from './pages/dashboard/talent-dashboard/ProfilePage'
import JobsPage from './pages/dashboard/talent-dashboard/JobsPage'
import ApplicationsPage from './pages/dashboard/talent-dashboard/ApplicationsPage'

// Shared Pages
import JobDetailPage from './pages/dashboard/JobDetailPage'
import SettingsPage from './pages/dashboard/SettingsPage'
import DashboardLayoutWithSidebar from './components/layout/DashboardLayoutWithSidebar'
import { Users, CreditCard, BarChart3, MessageSquare, Heart, Sparkles } from 'lucide-react'

function AppContent() {
	const dispatch = useAppDispatch()
	const { token, user, isLoading, isAuthenticated } = useAppSelector((state) => state.auth)

	useEffect(() => {
		// Check if localStorage token exists but Redux state doesn't match
		const storedToken = localStorage.getItem('token')
		
		// If no stored token but Redux thinks we're authenticated, clear state
		if (!storedToken && isAuthenticated) {
			console.log('No stored token found, clearing authentication state')
			localStorage.removeItem('token')
			localStorage.removeItem('refreshToken')
			return
		}
		
		// If we have a token but no user, get the current user
		if (token && !user && !isLoading) {
			dispatch(getCurrentUser())
		}
		
		// Initialize onboarding status for talent users
		if (token && user && user.userType === 'talent') {
			dispatch(checkProfileCompletion())
		}
	}, [dispatch, token, user, isLoading, isAuthenticated])

	// Determine initial brand variant based on user type
	// Default to 'teams' variant, only switch to 'talent' if user is logged in as talent
	const initialBrandVariant = (user?.userType === 'talent') ? 'talent' : 'teams'

	return (
		<BrandProvider initialVariant={initialBrandVariant}>
			<div className="min-h-screen bg-brand-background">
				<Routes>
					{/* Brand Demo Route */}
					<Route path="/brand-demo" element={<BrandDemo />} />
					{/* Brand Showcase Route */}
					<Route path="/brand-showcase" element={<BrandShowcase />} />
					{/* Language Switcher Demo Route */}
					<Route path="/language-demo" element={<LanguageSwitcherDemo />} />

					{/* Public Routes */}
					<Route path="/" element={<PublicLayout />}>
						<Route index element={<HomePage />} />
						<Route path="about" element={<AboutPage />} />
						<Route path="project-presentation" element={<ProjectPresentationPage />} />
						<Route path="for-talent" element={<TalentPage />} />
						<Route path="teams" element={<TeamsPage />} />
						<Route path="contact" element={<ContactPage />} />
						<Route path="privacy" element={<PrivacyPage />} />
						<Route path="terms" element={<TermsPage />} />
					</Route>

					{/* Auth Routes */}
				
					<Route path="/login" element={<LoginPage />} />
					<Route path="/login/talent" element={<LoginTalentPage />} />
					<Route path="/login/team" element={<LoginTeamPage />} />
					<Route path="/register/talent" element={<RegisterTalentPage />} />
					<Route path="/register/team" element={<RegisterTeamPage />} />
					<Route path="/unauthorized" element={<UnauthorizedPage />} />

					{/* Profile Onboarding Route */}
					<Route 
						path="/onboarding" 
						element={
							<ProtectedRoute>
								<ProfileOnboardingPage />
							</ProtectedRoute>
						} 
					/>

					{/* Team Dashboard Routes */}
					<Route path="/team">
						<Route 
							index 
							element={
								<ProtectedRoute>
									<TeamDashboard />
								</ProtectedRoute>
							} 
						/>
						<Route 
							path="post-job" 
							element={
								<ProtectedRoute>
									<PostJobPage />
								</ProtectedRoute>
							} 
						/>
						<Route 
							path="my-jobs" 
							element={
								<ProtectedRoute>
									<MyJobsPage />
								</ProtectedRoute>
							} 
						/>
						<Route 
							path="candidates" 
							element={
								<ProtectedRoute>
									<CandidatesPage />
								</ProtectedRoute>
							} 
						/>
						<Route 
							path="credits" 
							element={
								<ProtectedRoute>
									<CreditsPage />
								</ProtectedRoute>
							} 
						/>
						<Route 
							path="analytics" 
							element={
								<ProtectedRoute>
									<AnalyticsPage />
								</ProtectedRoute>
							} 
						/>
						<Route 
							path="settings" 
							element={
								<ProtectedRoute>
									<SettingsPage />
								</ProtectedRoute>
							} 
						/>
					</Route>

					{/* Talent Dashboard Routes */}
					<Route path="/talent">
						<Route 
							index 
							element={
								<ProtectedRoute>
									<TalentDashboard />
								</ProtectedRoute>
							} 
						/>
						<Route 
							path="profile" 
							element={
								<ProtectedRoute>
									<ProfilePage />
								</ProtectedRoute>
							} 
						/>
						<Route 
							path="jobs" 
							element={
								<ProtectedRoute>
									<JobsPage />
								</ProtectedRoute>
							} 
						/>
						<Route 
							path="jobs/:jobId" 
							element={
								<ProtectedRoute>
									<JobDetailPage />
								</ProtectedRoute>
							} 
						/>
						<Route 
							path="applications" 
							element={
								<ProtectedRoute>
									<ApplicationsPage />
								</ProtectedRoute>
							} 
						/>
						<Route 
							path="matches" 
							element={
								<ProtectedRoute>
									<DashboardLayoutWithSidebar 
										title="Job Matches"
										subtitle="Discover perfect job matches based on your profile"
									>
										<div className="p-8">
											<div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
												<div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
													<Heart className="w-8 h-8 text-pink-600" />
												</div>
												<h2 className="text-2xl font-bold text-gray-900 mb-4">Job Matches</h2>
												<p className="text-gray-600 mb-6">
													Find your perfect job matches based on your skills, experience, and preferences.
												</p>
												<div className="text-sm text-gray-500">
													Coming Soon - This feature is currently under development
												</div>
											</div>
										</div>
									</DashboardLayoutWithSidebar>
								</ProtectedRoute>
							} 
						/>
						<Route 
							path="recommendations" 
							element={
								<ProtectedRoute>
									<DashboardLayoutWithSidebar 
										title="AI Recommendations"
										subtitle="Personalized job recommendations powered by AI"
									>
										<div className="p-8">
											<div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
												<div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
													<Sparkles className="w-8 h-8 text-purple-600" />
												</div>
												<h2 className="text-2xl font-bold text-gray-900 mb-4">AI Recommendations</h2>
												<p className="text-gray-600 mb-6">
													Get personalized job recommendations based on your profile, skills, and career goals.
												</p>
												<div className="text-sm text-gray-500">
													Coming Soon - This feature is currently under development
												</div>
											</div>
										</div>
									</DashboardLayoutWithSidebar>
								</ProtectedRoute>
							} 
						/>
						<Route 
							path="settings" 
							element={
								<ProtectedRoute>
									<SettingsPage />
								</ProtectedRoute>
							} 
						/>
					</Route>

					{/* Legacy Dashboard Routes - Redirect to appropriate dashboard */}
					<Route 
						path="/dashboard" 
						element={
							<ProtectedRoute>
								<div className="min-h-screen flex items-center justify-center">
									<div className="text-center">
										<h1 className="text-2xl font-bold text-gray-900 mb-4">Dashboard Moved</h1>
										<p className="text-gray-600 mb-6">Please use /team or /talent for your dashboard</p>
									</div>
								</div>
							</ProtectedRoute>
						} 
					/>

					{/* Test Pages */}
					<Route path="/test-analytics" element={<TestAnalyticsPage />} />
					
					{/* Main Dashboard Demo - Public Route */}
					<Route path="/dashboard-demo" element={<MainDashboardDemo />} />
					
					{/* Main Dashboard Demo - Protected Route */}
					<Route path="/main-dashboard-demo" element={
						<ProtectedRoute>
							<MainDashboardDemo />
						</ProtectedRoute>
					} />

					{/* Catch all route */}
					<Route path="*" element={<div className="min-h-screen flex items-center justify-center"><div className="text-center"><h1 className="text-4xl font-bold text-gray-900 mb-4">404 - Page Not Found</h1><p className="text-gray-600">The page you're looking for doesn't exist.</p></div></div>} />
				</Routes>
			</div>
		</BrandProvider>
	)
}

function App() {
	return (
		<Provider store={store}>
			<ErrorBoundary>
				<AppContent />
			</ErrorBoundary>
		</Provider>
	)
}

export default App 