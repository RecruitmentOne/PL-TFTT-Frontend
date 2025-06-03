import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useTranslation } from 'react-i18next'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { login, clearError } from '../../store/slices/authSlice'
import { useBrand, useBrandColors } from '../../brand'
import { CompactEmiratesStyleSwitcher } from '../../components/brand/language-switcher/emirates-style-switcher'
import { PrimaryButton, SecondaryButton } from '../../components/brand/branded-button/branded-button'
import { BrandLogo } from '../../components/brand/brand-logo'
import { Eye, EyeOff, Building, Users, Target, Zap, Briefcase, Star, TrendingUp, Clock, ArrowRight, CheckCircle } from 'lucide-react'

const loginSchema = z.object({
	email: z.string().email('Please enter a valid email address'),
	password: z.string().min(6, 'Password must be at least 6 characters'),
})

type LoginFormData = z.infer<typeof loginSchema>

function LoginTeamPage() {
	const [showPassword, setShowPassword] = useState(false)
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const { t } = useTranslation()
	const { switchVariant } = useBrand()
	const colors = useBrandColors()
	const { isLoading, error, isAuthenticated, user } = useAppSelector((state) => state.auth)

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFormData>({
		resolver: zodResolver(loginSchema),
	})

	// Set teams brand variant
	useEffect(() => {
		switchVariant('teams')
	}, [switchVariant])

	useEffect(() => {
		const checkAndRedirect = async () => {
			if (isAuthenticated && user) {
				// For teams/employers, go directly to team dashboard
				navigate('/team')
			}
		}
		
		checkAndRedirect()
	}, [isAuthenticated, user, navigate])

	useEffect(() => {
		// Clear any previous errors when component mounts
		dispatch(clearError())
	}, [dispatch])

	const onSubmit = async (data: LoginFormData) => {
		try {
			// Convert team userType to employer for backend
			await dispatch(login({ ...data, userType: 'employer' })).unwrap()
		} catch (error) {
			// Error is handled by the reducer
		}
	}

	const teamBenefits = [
		{
			icon: Users,
			title: t('auth.benefits.teams.scoring', 'AI Candidate Scoring'),
			description: t('auth.benefits.teams.scoringDesc', 'Intelligent ranking and scoring of candidates for your roles'),
			highlight: t('auth.benefits.teams.scoring', 'AI-Powered')
		},
		{
			icon: Target,
			title: t('auth.benefits.teams.matching', 'Smart Matching Algorithm'),
			description: t('auth.benefits.teams.matchingDesc', 'Find perfect talent matches using AI-powered algorithms'),
			highlight: t('auth.benefits.teams.matching', 'Smart Matching')
		},
		{
			icon: Clock,
			title: t('auth.benefits.teams.hiring', 'Streamlined Hiring'),
			description: t('auth.benefits.teams.hiringDesc', 'Streamlined process with automated CV parsing and bulk operations'),
			highlight: t('common.timeSaver', 'Time Saver')
		},
		{
			icon: Briefcase,
			title: t('auth.benefits.teams.credits', 'Credit-Based System'),
			description: t('auth.benefits.teams.creditsDesc', 'Transparent pay-per-view pricing starting from $0.0006 per profile'),
			highlight: t('common.costEffective', 'Cost Effective')
		}
	]

	const teamStats = [
		{ number: '2,500+', label: t('auth.stats.teams.hiringTeams', 'Hiring Teams') },
		{ number: '98%', label: t('auth.stats.teams.clientSatisfaction', 'Client Satisfaction') },
		{ number: '60%', label: t('auth.stats.teams.fasterHiring', 'Faster Hiring') }
	]

	const successFeatures = [
		t('auth.enterprise.candidateScoring', 'Advanced AI candidate scoring'),
		t('auth.enterprise.bulkProcessing', 'Bulk CV processing'),
		t('auth.enterprise.analytics', 'Real-time analytics dashboard'),
		t('auth.enterprise.accountManagement', 'Dedicated account management'),
		t('auth.enterprise.integration', 'Custom integration options')
	]

	return (
		<div className="min-h-screen bg-brand-background">
			{/* Header */}
			<header className="bg-brand-surface border-b border-brand-border">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex items-center justify-between h-16">
						<BrandLogo 
							variant="full" 
							size="md" 
							onClick={() => navigate('/')} 
							className="cursor-pointer"
						/>
						<div className="flex items-center space-x-4">
							<CompactEmiratesStyleSwitcher />
							<span className="text-brand-text-secondary text-sm">
								{t('auth.login.newToTftt', 'New to TFTT?')}
							</span>
							<Link 
								to="/register/team"
								className="text-brand-primary hover:text-brand-secondary font-medium text-sm transition-colors"
							>
								{t('auth.register.team.title', 'Join as Team')}
							</Link>
						</div>
					</div>
				</div>
			</header>

			<div className="flex min-h-[calc(100vh-4rem)]">
				{/* Benefits Section */}
				<div 
					className="hidden lg:flex lg:w-1/2 p-12 flex-col justify-center relative overflow-hidden"
					style={{
						background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`
					}}
				>
					{/* Background Pattern */}
					<div className="absolute inset-0 opacity-10">
						<div className="absolute inset-0" style={{
							backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Cpath d='M0 0h80v80H0V0zm20 20v40h40V20H20zm20 35a15 15 0 1 1 0-30 15 15 0 0 1 0 30z' fill-opacity='0.1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
						}} />
					</div>

					<div className="max-w-md relative z-10">
						{/* Header with Brand Identity */}
						<div className="mb-8">
							<div className="flex items-center mb-6">
								<div 
									className="w-16 h-16 rounded-xl flex items-center justify-center mr-4 shadow-lg"
									style={{ backgroundColor: colors.text.inverse }}
								>
									<Building className="h-8 w-8" style={{ color: colors.primary }} />
								</div>
								<div>
									<h1 className="text-3xl font-bold font-brand text-white">
										{t('auth.login.team.welcome', 'Welcome Back, Team!')}
									</h1>
									<p className="text-white/90 text-lg">
										{t('auth.login.team.tagline', 'Build your dream team with AI')}
									</p>
								</div>
							</div>

							{/* Stats Row */}
							<div className="grid grid-cols-3 gap-4 mb-8">
								{teamStats.map((stat, index) => (
									<div key={index} className="text-center">
										<div className="text-2xl font-bold font-brand text-white">{stat.number}</div>
										<div className="text-white/80 text-sm">{stat.label}</div>
									</div>
								))}
							</div>
						</div>

						{/* Benefits List */}
						<div className="space-y-6">
							{teamBenefits.map((benefit, index) => {
								const Icon = benefit.icon
								return (
									<div key={index} className="flex items-start space-x-4 group">
										<div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-white/30 transition-colors">
											<Icon className="h-6 w-6 text-white" />
										</div>
										<div className="flex-1">
											<div className="flex items-center mb-1">
												<h3 className="text-lg font-semibold font-brand text-white mr-2">
													{benefit.title}
												</h3>
												<span className="text-xs bg-white/20 text-white px-2 py-1 rounded-full">
													{benefit.highlight}
												</span>
											</div>
											<p className="text-white/80 text-sm leading-relaxed">
												{benefit.description}
											</p>
										</div>
									</div>
								)
							})}
						</div>

						{/* Enterprise Features */}
						<div className="mt-8 p-6 bg-white/10 rounded-xl border border-white/20 backdrop-blur-sm">
							<div className="flex items-center mb-4">
								<Star className="h-5 w-5 text-white mr-2" />
								<span className="text-white font-semibold">{t('auth.enterprise.title', 'Enterprise Features')}</span>
							</div>
							<div className="space-y-2">
								{successFeatures.slice(0, 3).map((feature, index) => (
									<div key={index} className="flex items-center text-white/80 text-sm">
										<CheckCircle className="h-4 w-4 mr-2 text-white" />
										{feature}
									</div>
								))}
							</div>
							<div className="mt-3 text-white/70 text-xs">
								{t('auth.enterprise.moreFeatures', '+{count} more premium features', { count: successFeatures.length - 3 })}
							</div>
						</div>

						{/* Social Proof */}
						<div className="mt-6 p-6 bg-white/10 rounded-xl border border-white/20 backdrop-blur-sm">
							<div className="flex items-center mb-2">
								<TrendingUp className="h-5 w-5 text-white mr-2" />
								<span className="text-white font-semibold">{t('auth.socialProof.title', 'Trusted by Industry Leaders')}</span>
							</div>
							<p className="text-white/80 text-sm">
								{t('auth.socialProof.testimonial', 'TFTT reduced our hiring time by 60% and improved candidate quality significantly.')}
							</p>
							<div className="flex items-center mt-3">
								<div className="flex -space-x-2">
									{[1, 2, 3, 4].map((i) => (
										<div key={i} className="w-6 h-6 bg-white/30 rounded-full border-2 border-white" />
									))}
								</div>
								<span className="text-white/80 text-xs ml-3">
									{t('auth.socialProof.teamsCount', '+{count} successful teams', { count: 2500 })}
								</span>
							</div>
						</div>
					</div>
				</div>

				{/* Login Form Section */}
				<div className="flex-1 flex items-center justify-center p-8">
					<div className="w-full max-w-md">
						<div className="bg-brand-surface rounded-2xl shadow-xl border border-brand-border p-8">
							{/* Form Header */}
							<div className="text-center mb-8">
								<h2 className="text-2xl font-bold font-brand text-brand-text-primary mb-2">
									{t('auth.login.team.title', 'Access Your Team Dashboard')}
								</h2>
								<p className="text-brand-text-secondary">
									{t('auth.login.team.subtitle', 'Manage your hiring process and find top talent')}
								</p>
							</div>

							{/* Error Alert */}
							{error && (
								<div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
									<p className="text-red-700 text-sm">{error}</p>
								</div>
							)}

							{/* Login Form */}
							<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
								{/* Email Field */}
								<div>
									<label htmlFor="email" className="block text-sm font-medium text-brand-text-primary mb-2">
										{t('auth.login.email', 'Work Email Address')}
									</label>
									<input
										{...register('email')}
										type="email"
										id="email"
										className="w-full px-4 py-3 border border-brand-border rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent bg-brand-background text-brand-text-primary placeholder-brand-text-secondary transition-colors"
										placeholder={t('auth.login.emailPlaceholder', 'your.email@company.com')}
									/>
									{errors.email && (
										<p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
									)}
								</div>

								{/* Password Field */}
								<div>
									<label htmlFor="password" className="block text-sm font-medium text-brand-text-primary mb-2">
										{t('auth.login.password', 'Password')}
									</label>
									<div className="relative">
										<input
											{...register('password')}
											type={showPassword ? 'text' : 'password'}
											id="password"
											className="w-full px-4 py-3 pr-12 border border-brand-border rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent bg-brand-background text-brand-text-primary placeholder-brand-text-secondary transition-colors"
											placeholder={t('auth.login.passwordPlaceholder', 'Enter your password')}
										/>
										<button
											type="button"
											onClick={() => setShowPassword(!showPassword)}
											className="absolute inset-y-0 right-0 pr-3 flex items-center text-brand-text-secondary hover:text-brand-text-primary transition-colors"
										>
											{showPassword ? (
												<EyeOff className="h-5 w-5" />
											) : (
												<Eye className="h-5 w-5" />
											)}
										</button>
									</div>
									{errors.password && (
										<p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
									)}
								</div>

								{/* Remember Me & Forgot Password */}
								<div className="flex items-center justify-between">
									<label className="flex items-center">
										<input
											type="checkbox"
											className="h-4 w-4 text-brand-primary focus:ring-brand-primary border-brand-border rounded"
										/>
										<span className="ml-2 text-sm text-brand-text-secondary">
											{t('auth.login.rememberMe', 'Keep me signed in')}
										</span>
									</label>
									<Link
										to="/forgot-password"
										className="text-sm text-brand-primary hover:text-brand-secondary transition-colors"
									>
										{t('auth.login.forgotPassword', 'Forgot password?')}
									</Link>
								</div>

								{/* Submit Button */}
								<PrimaryButton
									type="submit"
									disabled={isLoading}
									className="w-full flex items-center justify-center py-3 text-base font-semibold"
								>
									{isLoading ? (
										<div className="flex items-center">
											<div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
											{t('auth.login.signingIn', 'Signing in...')}
										</div>
									) : (
										<div className="flex items-center">
											{t('auth.login.signIn', 'Access Dashboard')}
											<ArrowRight className="ml-2 h-4 w-4" />
										</div>
									)}
								</PrimaryButton>
							</form>

							{/* Divider 
							<div className="my-6">
								<div className="relative">
									<div className="absolute inset-0 flex items-center">
										<div className="w-full border-t border-brand-border" />
									</div>
									<div className="relative flex justify-center text-sm">
										<span className="px-2 bg-brand-surface text-brand-text-secondary">
											{t('auth.login.orContinueWith', 'Or sign in with')}
										</span>
									</div>
								</div>
							</div>

							{/* Social Login Buttons 
							<div className="space-y-3">
								<SecondaryButton className="w-full flex items-center justify-center py-3">
									<svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
										<path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
										<path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
										<path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
										<path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
									</svg>
									{t('auth.login.continueWithGoogle', 'Continue with Google Workspace')}
								</SecondaryButton>

								<SecondaryButton className="w-full flex items-center justify-center py-3">
									<svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
										<path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.219-5.175 1.219-5.175s-.31-.219-.31-.828c0-.219.219-.438.219-.657 0-.219-.219-.438-.219-.657 0-.828.828-1.094 1.094-1.094.219 0 .438.219.438.438 0 .219-.219.438-.219.657 0 .219.219.438.438.438.657 0 1.094-.438 1.094-1.094 0-.219-.219-.438-.219-.657 0-.219.219-.438.438-.438.657 0 1.094.438 1.094 1.094 0 .219-.219.438-.219.657 0 .219.219.438.438.438.657 0 1.094-.438 1.094-1.094 0-.219-.219-.438-.219-.657 0-.219.219-.438.438-.438.657 0 1.094.438 1.094 1.094z"/>
									</svg>
									{t('auth.login.continueWithMicrosoft', 'Continue with Microsoft')}
								</SecondaryButton>
							</div>

							{/* Enterprise Note */}
							<div className="mt-6 p-4 bg-brand-background/50 rounded-lg border border-brand-border">
								<div className="flex items-center text-brand-text-secondary text-sm">
									<Briefcase className="h-4 w-4 mr-2" />
									<span>{t('auth.enterprise.ssoNote', 'Enterprise SSO options available for teams of 50+')}</span>
								</div>
							</div>

							{/* Sign Up Link */}
							<div className="mt-6 text-center">
								<p className="text-brand-text-secondary text-sm">
									{t('auth.login.noAccount', "Don't have a team account?")}{' '}
									<Link
										to="/register/team"
										className="text-brand-primary hover:text-brand-secondary font-medium transition-colors"
									>
										{t('auth.login.signUpHere', 'Get started now')}
									</Link>
								</p>
							</div>

							{/* Talent Login Link */}
							<div className="mt-4 text-center">
								<p className="text-brand-text-secondary text-sm">
									{t('auth.login.lookingForJob', 'Looking for a job?')}{' '}
									<Link
										to="/login/talent"
										className="text-brand-primary hover:text-brand-secondary font-medium transition-colors"
									>
										{t('auth.login.talentLogin', 'Talent Login')}
									</Link>
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default LoginTeamPage 