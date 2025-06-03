import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useTranslation } from 'react-i18next'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { login, clearError } from '../../store/slices/authSlice'
import { checkProfileCompletion } from '../../store/slices/userSlice'
import { useBrand, useBrandColors } from '../../brand'
import { CompactLanguageSwitcher } from '../../components/brand/language-switcher/language-switcher'
import { PrimaryButton, SecondaryButton } from '../../components/brand/branded-button/branded-button'
import { BrandLogo } from '../../components/brand/brand-logo'
import { Eye, EyeOff, User, Star, Zap, Target, Shield, TrendingUp, Award, Users, ArrowRight } from 'lucide-react'

const loginSchema = z.object({
	email: z.string().email('Please enter a valid email address'),
	password: z.string().min(6, 'Password must be at least 6 characters'),
})

type LoginFormData = z.infer<typeof loginSchema>

function LoginTalentPage() {
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

	// Set talent brand variant
	useEffect(() => {
		switchVariant('talent')
	}, [switchVariant])

	useEffect(() => {
		const checkAndRedirect = async () => {
			if (isAuthenticated && user) {
				try {
					// Check profile completion for talents
					const result = await dispatch(checkProfileCompletion()).unwrap()
					
					// If profile is incomplete or onboarding not completed, redirect to onboarding
					if (!result.isComplete || !result.hasCompletedOnboarding) {
						navigate('/onboarding')
					} else {
						navigate('/talent')
					}
				} catch (error) {
					console.error('Profile completion check failed:', error)
					navigate('/talent')
				}
			}
		}
		
		checkAndRedirect()
	}, [isAuthenticated, user, navigate, dispatch])

	useEffect(() => {
		// Clear any previous errors when component mounts
		dispatch(clearError())
	}, [dispatch])

	const onSubmit = async (data: LoginFormData) => {
		try {
			await dispatch(login({ ...data, userType: 'talent' })).unwrap()
		} catch (error) {
			// Error is handled by the reducer
		}
	}

	const talentBenefits = [
		{
			icon: Target,
			title: t('auth.benefits.talent.cvParsing', 'OpenAI CV Parsing'),
			description: t('auth.benefits.talent.cvParsingDesc', 'Advanced AI technology for intelligent profile analysis'),
			highlight: 'AI-Powered'
		},
		{
			icon: Zap,
			title: t('auth.benefits.talent.matching', 'Smart Job Matching'),
			description: t('auth.benefits.talent.matchingDesc', 'AI-powered job recommendations tailored to your unique skills'),
			highlight: 'Intelligent'
		},
		{
			icon: TrendingUp,
			title: t('auth.benefits.talent.analytics', 'Career Analytics'),
			description: t('auth.benefits.talent.analyticsDesc', 'Track profile performance and market insights'),
			highlight: 'Growth Focused'
		},
		{
			icon: Shield,
			title: t('auth.benefits.talent.gdpr', 'GDPR Compliant'),
			description: t('auth.benefits.talent.gdprDesc', 'Complete data privacy protection with full user control'),
			highlight: 'Privacy First'
		}
	]

	const talentStats = [
		{ number: 'AI-Powered', label: 'Technology' },
		{ number: 'EU-Ready', label: 'Work Eligibility' },
		{ number: 'Direct', label: 'Communication' }
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
							<CompactLanguageSwitcher />
							<span className="text-brand-text-secondary text-sm">
								{t('auth.login.newToTftt', 'New to TFTT?')}
							</span>
							<Link 
								to="/register/talent"
								className="text-brand-primary hover:text-brand-secondary font-medium text-sm transition-colors"
							>
								{t('auth.register.talent.title', 'Join as Talent')}
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
							backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
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
									<User className="h-8 w-8" style={{ color: colors.primary }} />
								</div>
								<div>
									<h1 className="text-3xl font-bold font-brand text-white">
										{t('auth.login.talent.welcome', 'Welcome Back, Talent!')}
									</h1>
									<p className="text-white/90 text-lg">
										{t('auth.login.talent.tagline', 'Your next opportunity awaits')}
									</p>
								</div>
							</div>

							{/* Stats Row */}
							<div className="grid grid-cols-3 gap-4 mb-8">
								{talentStats.map((stat, index) => (
									<div key={index} className="text-center">
										<div className="text-2xl font-bold font-brand text-white">{stat.number}</div>
										<div className="text-white/80 text-sm">{stat.label}</div>
									</div>
								))}
							</div>
						</div>

						{/* Benefits List */}
						<div className="space-y-6">
							{talentBenefits.map((benefit, index) => {
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

						{/* Platform Features */}
						<div className="mt-8 p-6 bg-white/10 rounded-xl border border-white/20 backdrop-blur-sm">
							<div className="flex items-center mb-2">
								<Award className="h-5 w-5 text-white mr-2" />
								<span className="text-white font-semibold">Advanced Technology Platform</span>
							</div>
							<p className="text-white/80 text-sm">
								"Innovative AI-powered matching connecting EU talent with premium German & Swiss opportunities."
							</p>
							<div className="flex items-center mt-3">
								<div className="flex space-x-2">
									<div className="w-8 h-6 bg-white/30 rounded flex items-center justify-center text-xs text-white font-bold">AI</div>
									<div className="w-8 h-6 bg-white/30 rounded flex items-center justify-center text-xs text-white font-bold">EU</div>
									<div className="w-8 h-6 bg-white/30 rounded flex items-center justify-center text-xs text-white font-bold">DE</div>
									<div className="w-8 h-6 bg-white/30 rounded flex items-center justify-center text-xs text-white font-bold">CH</div>
								</div>
								<span className="text-white/80 text-xs ml-3">OpenAI-powered platform</span>
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
									{t('auth.login.talent.title', 'Sign In to Your Account')}
								</h2>
								<p className="text-brand-text-secondary">
									{t('auth.login.talent.subtitle', 'Access your talent dashboard and opportunities')}
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
										{t('auth.login.email', 'Email Address')}
									</label>
									<input
										{...register('email')}
										type="email"
										id="email"
										className="w-full px-4 py-3 border border-brand-border rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent bg-brand-background text-brand-text-primary placeholder-brand-text-secondary transition-colors"
										placeholder={t('auth.login.emailPlaceholder', 'Enter your email')}
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
											{t('auth.login.rememberMe', 'Remember me')}
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
											{t('auth.login.signIn', 'Sign In')}
											<ArrowRight className="ml-2 h-4 w-4" />
										</div>
									)}
								</PrimaryButton>
							</form>

							{/* Divider */}
							<div className="my-6">
								<div className="relative">
									<div className="absolute inset-0 flex items-center">
										<div className="w-full border-t border-brand-border" />
									</div>
									<div className="relative flex justify-center text-sm">
										<span className="px-2 bg-brand-surface text-brand-text-secondary">
											{t('auth.login.orContinueWith', 'Or continue with')}
										</span>
									</div>
								</div>
							</div>

							{/* Social Login Buttons */}
							<div className="space-y-3">
								<SecondaryButton className="w-full flex items-center justify-center py-3">
								<svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
  <path d="M2.75 0C1.23 0 0 1.23 0 2.75v18.5C0 22.77 1.23 24 2.75 24h18.5c1.52 0 2.75-1.23 2.75-2.75V2.75C24 1.23 22.77 0 21.25 0H2.75zM7.51 20.72H4.26V9.02h3.25v11.7zm-1.63-13.41c-1.06 0-1.94-.88-1.94-1.94s.88-1.94 1.94-1.94 1.94.88 1.94 1.94-.88 1.94-1.94 1.94zM19.74 20.72h-3.25v-5.73c0-1.36-.49-2.29-1.71-2.29-.94 0-1.49.63-1.74 1.24-.09.23-.12.55-.12.87v6.9h-3.25v-11.7h3.25v1.61c.43-.66 1.2-1.61 2.94-1.61 2.15 0 3.75 1.42 3.75 4.45v6.24h-.01z"/>
</svg>



									{t('auth.login.continueWithLinkedin', 'Continue with LinkedIn')}
								</SecondaryButton>

								{/*<SecondaryButton className="w-full flex items-center justify-center py-3">
									<svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
										<path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
									</svg>
									{t('auth.login.continueWithTwitter', 'Continue with Twitter')}
								</SecondaryButton>*/}
							</div>

							{/* Sign Up Link */}
							<div className="mt-6 text-center">
								<p className="text-brand-text-secondary text-sm">
									{t('auth.login.noAccount', "Don't have an account?")}{' '}
									<Link
										to="/register/talent"
										className="text-brand-primary hover:text-brand-secondary font-medium transition-colors"
									>
										{t('auth.login.signUpHere', 'Sign up here')}
									</Link>
								</p>
							</div>

							{/* Team Login Link */}
							<div className="mt-4 text-center">
								<p className="text-brand-text-secondary text-sm">
									{t('auth.login.recruitingTeam', 'Recruiting for a team?')}{' '}
									<Link
										to="/login/team"
										className="text-brand-primary hover:text-brand-secondary font-medium transition-colors"
									>
										{t('auth.login.teamLogin', 'Team Login')}
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

export default LoginTalentPage 