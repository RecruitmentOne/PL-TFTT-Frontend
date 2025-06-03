import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useTranslation } from 'react-i18next'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { registerTalent, clearError } from '../../store/slices/authSlice'
import { useBrand, useBrandColors } from '../../brand'
import { CompactLanguageSwitcher } from '../../components/brand/language-switcher/language-switcher'
import { PrimaryButton } from '../../components/brand/branded-button/branded-button'
import { BrandLogo } from '../../components/brand/brand-logo'
import { 
	BrandedH1, 
	BrandedH2, 
	BrandedH3, 
	BrandedP, 
	BrandedSpan 
} from '../../components/brand/branded-typography'
import { Eye, EyeOff, User, CheckCircle, Target, Zap, Star, TrendingUp, Award, Sparkles } from 'lucide-react'

const registerTalentSchema = z.object({
	fullName: z.string().min(2, 'Full name must be at least 2 characters'),
	email: z.string().email('Please enter a valid email address'),
	phoneNumber: z.string().min(10, 'Phone number must be at least 10 characters'),
	password: z.string()
		.min(6, 'Password must be at least 6 characters')
		.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one uppercase letter, one lowercase letter, and one number'),
	confirmPassword: z.string(),
	termsAccepted: z.boolean().refine(val => val === true, {
		message: 'You must accept the terms and conditions'
	}),
}).refine((data) => data.password === data.confirmPassword, {
	message: "Passwords don't match",
	path: ["confirmPassword"],
})

type RegisterTalentFormData = z.infer<typeof registerTalentSchema>

function RegisterTalentPage() {
	const [showPassword, setShowPassword] = useState(false)
	const [showConfirmPassword, setShowConfirmPassword] = useState(false)
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const { t } = useTranslation()
	const { switchVariant } = useBrand()
	const colors = useBrandColors()
	const { isLoading, error, isAuthenticated } = useAppSelector((state) => state.auth)

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<RegisterTalentFormData>({
		resolver: zodResolver(registerTalentSchema),
	})

	// Set brand variant to talent
	useEffect(() => {
		switchVariant('talent')
	}, [switchVariant])

	useEffect(() => {
		if (isAuthenticated) {
			navigate('/talent')
		}
	}, [isAuthenticated, navigate])

	useEffect(() => {
		// Clear any previous errors when component mounts
		dispatch(clearError())
	}, [dispatch])

	const onSubmit = async (data: RegisterTalentFormData) => {
		try {
			const { confirmPassword, ...registrationData } = data
			await dispatch(registerTalent(registrationData)).unwrap()
			// Navigate to success page or show success message
			navigate('/login/talent', { 
				state: { 
					message: t('auth.register.success', 'Registration successful! Please check your email to verify your account.')
				}
			})
		} catch (error) {
			// Error is handled by the reducer
		}
	}

	const benefits = [
		{
			icon: Target,
			title: t('auth.benefits.talent.cvParsing', 'OpenAI CV Parsing'),
			description: t('auth.benefits.talent.cvParsingDesc', 'Advanced accuracy in extracting technical skills, frameworks, and project experience from your CV'),
			stat: t('auth.benefits.talent.cvParsingStat', 'AI-Enhanced')
		},
		{
			icon: Zap,
			title: t('auth.benefits.talent.matching', 'Intelligent Tech Matching'),
			description: t('auth.benefits.talent.matchingDesc', 'AI-powered job recommendations based on your tech stack, experience, and career goals'),
			stat: t('auth.benefits.talent.matchingStat', 'AI-powered')
		},
		{
			icon: Star,
			title: t('auth.benefits.talent.analytics', 'European Market Insights'),
			description: t('auth.benefits.talent.analyticsDesc', 'Real-time salary data and tech demand across Germany, Switzerland, and EU markets'),
			stat: t('auth.benefits.talent.analyticsStat', 'Live data')
		},
		{
			icon: TrendingUp,
			title: t('auth.benefits.talent.career', 'Career Progression'),
			description: t('auth.benefits.talent.careerDesc', 'Track your professional growth with comprehensive analytics and skill recommendations'),
			stat: t('auth.benefits.talent.careerStat', 'Growth tracking')
		}
	]

	const stats = [
		{ number: '50K+', label: t('auth.stats.talent.users', 'Tech Professionals') },
		{ number: 'AI-Powered', label: t('auth.stats.talent.match', 'Technology') },
		{ number: '€70K+', label: t('auth.stats.talent.salary', 'Avg. EU Salary') },
		{ number: '100%', label: t('auth.stats.talent.gdpr', 'GDPR Compliant') }
	]

	const techStacks = ['React', 'Python', 'Node.js', 'TypeScript', 'AWS', 'Docker', 'Kubernetes', 'Go']

	return (
		<div 
			className="min-h-screen"
			style={{ backgroundColor: colors.background }}
		>
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
								{t('auth.register.alreadyHaveAccount', 'Already have an account?')}
							</span>
							<Link 
								to="/login/talent"
								className="text-brand-primary hover:text-brand-secondary font-medium text-sm transition-colors"
							>
								{t('auth.register.signIn', 'Sign In')}
							</Link>
						</div>
					</div>
				</div>
			</header>

			<div className="flex">
				{/* Benefits Section */}
				<div 
					className="hidden lg:flex lg:w-2/5 p-12 flex-col justify-center relative overflow-hidden"
					style={{
						background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`
					}}
				>
					{/* Background Tech Pattern */}
					<div className="absolute inset-0 opacity-10">
						<div 
							className="w-full h-full"
							style={{
								backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='white' fill-opacity='0.1'%3E%3Ccircle cx='7' cy='7' r='7'/%3E%3Ccircle cx='53' cy='7' r='7'/%3E%3Ccircle cx='7' cy='53' r='7'/%3E%3Ccircle cx='53' cy='53' r='7'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
								backgroundSize: '60px 60px'
							}}
						></div>
					</div>

					<div className="max-w-md relative">
						{/* Header with Brand Logo */}
						<div className="flex items-center mb-8">
							<div 
								className="w-12 h-12 rounded-lg flex items-center justify-center mr-4"
								style={{ backgroundColor: colors.text.inverse }}
							>
								<User className="h-6 w-6" style={{ color: colors.primary }} />
							</div>
							<div>
								<BrandedH2 variant="inverse">
									{t('auth.register.talent.title', 'Join as Tech Talent')}
								</BrandedH2>
								<BrandedP variant="inverse" style={{ color: `${colors.text.inverse}CC` }}>
									{t('auth.register.talent.subtitle', 'Accelerate your European tech career with AI')}
								</BrandedP>
							</div>
						</div>

						{/* Benefits List */}
						<div className="space-y-6 mb-8">
							{benefits.map((benefit, index) => {
								const Icon = benefit.icon
								return (
									<div key={index} className="flex items-start space-x-4">
										<div 
											className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
											style={{ backgroundColor: `${colors.text.inverse}20` }}
										>
											<Icon className="h-5 w-5 text-white" />
										</div>
										<div>
											<div className="flex items-center space-x-2 mb-1">
												<BrandedH3 variant="inverse" className="text-base">
													{benefit.title}
												</BrandedH3>
												<BrandedSpan 
													className="text-xs px-2 py-1 rounded-full"
													style={{
														backgroundColor: `${colors.text.inverse}20`,
														color: colors.text.inverse
													}}
												>
													{benefit.stat}
												</BrandedSpan>
											</div>
											<BrandedP 
												variant="inverse" 
												className="text-sm"
												style={{ color: `${colors.text.inverse}CC` }}
											>
												{benefit.description}
											</BrandedP>
										</div>
									</div>
								)
							})}
						</div>

						{/* Tech Stack Tags */}
						<div className="mb-8">
							<BrandedH3 variant="inverse" className="text-sm mb-3">
								{t('auth.register.talent.techStacks', 'Popular Tech Stacks')}
							</BrandedH3>
							<div className="flex flex-wrap gap-2">
								{techStacks.map((tech, index) => (
									<BrandedSpan
										key={index}
										className="px-3 py-1 text-xs rounded-full"
										style={{
											backgroundColor: `${colors.text.inverse}15`,
											color: colors.text.inverse,
											border: `1px solid ${colors.text.inverse}30`
										}}
									>
										{tech}
									</BrandedSpan>
								))}
							</div>
						</div>

						{/* Stats */}
						<div 
							className="rounded-lg p-6"
							style={{
								backgroundColor: `${colors.text.inverse}10`,
								border: `1px solid ${colors.text.inverse}20`
							}}
						>
							<BrandedH3 variant="inverse" className="mb-4 flex items-center text-sm">
								<Award className="h-5 w-5 mr-2" />
								{t('auth.register.talent.platformStats', 'Platform Statistics')}
							</BrandedH3>
							<div className="grid grid-cols-2 gap-4">
								{stats.map((stat, index) => (
									<div key={index} className="text-center">
										<BrandedSpan 
											className="text-2xl font-bold block"
											variant="inverse"
										>
											{stat.number}
										</BrandedSpan>
										<BrandedSpan 
											className="text-xs"
											variant="inverse"
											style={{ color: `${colors.text.inverse}CC` }}
										>
											{stat.label}
										</BrandedSpan>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>

				{/* Registration Form Section */}
				<div className="w-full lg:w-3/5 flex items-center justify-center p-12">
					<div className="max-w-md w-full space-y-8">
						{/* Header */}
						<div className="text-center">
							<div className="flex justify-center mb-6">
								<BrandLogo variant="icon" size="lg" />
							</div>
							<BrandedH1 className="mb-4">
								{t('auth.register.talent.formTitle', 'Join as Tech Talent')}
							</BrandedH1>
							<BrandedP className="text-lg">
								{t('auth.register.talent.formSubtitle', 'Find your dream tech job with AI-powered matching across Germany, Switzerland & EU')}
							</BrandedP>
						</div>

						<form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
							{error && (
								<div 
									className="px-4 py-3 rounded-md border"
									style={{
										backgroundColor: '#FEF2F2',
										borderColor: '#FECACA',
										color: '#DC2626'
									}}
								>
									{error}
								</div>
							)}

							{/* User Type Indicator */}
							<div 
								className="flex items-center justify-center p-4 rounded-lg border"
								style={{
									backgroundColor: `${colors.primary}15`,
									borderColor: `${colors.primary}30`
								}}
							>
								<User className="h-6 w-6 mr-2" style={{ color: colors.primary }} />
								<BrandedSpan 
									className="font-medium"
									style={{ color: colors.primary }}
								>
									{t('auth.register.talent.registering', 'Registering as Tech Talent')}
								</BrandedSpan>
							</div>

							{/* Full Name */}
							<div>
								<label 
									htmlFor="fullName" 
									className="block text-sm font-medium mb-2"
									style={{ color: colors.text.primary }}
								>
									{t('auth.register.fullName', 'Full Name')} *
								</label>
								<input
									{...register('fullName')}
									type="text"
									autoComplete="name"
									className={`w-full px-3 py-3 rounded-md border transition-colors ${
										errors.fullName ? 'border-red-300' : ''
									}`}
									style={{
										borderColor: errors.fullName ? '#FCA5A5' : colors.border,
										backgroundColor: colors.background,
										color: colors.text.primary
									}}
									onFocus={(e) => {
										if (!errors.fullName) {
											e.target.style.borderColor = colors.primary
											e.target.style.boxShadow = `0 0 0 3px ${colors.primary}20`
										}
									}}
									onBlur={(e) => {
										if (!errors.fullName) {
											e.target.style.borderColor = colors.border
											e.target.style.boxShadow = 'none'
										}
									}}
									placeholder={t('auth.register.fullNamePlaceholder', 'Enter your full name')}
								/>
								{errors.fullName && (
									<BrandedP className="mt-1 text-sm text-red-600">
										{errors.fullName.message}
									</BrandedP>
								)}
							</div>

							{/* Email */}
							<div>
								<label 
									htmlFor="email" 
									className="block text-sm font-medium mb-2"
									style={{ color: colors.text.primary }}
								>
									{t('auth.register.email', 'Email Address')} *
								</label>
								<input
									{...register('email')}
									type="email"
									autoComplete="email"
									className={`w-full px-3 py-3 rounded-md border transition-colors ${
										errors.email ? 'border-red-300' : ''
									}`}
									style={{
										borderColor: errors.email ? '#FCA5A5' : colors.border,
										backgroundColor: colors.background,
										color: colors.text.primary
									}}
									onFocus={(e) => {
										if (!errors.email) {
											e.target.style.borderColor = colors.primary
											e.target.style.boxShadow = `0 0 0 3px ${colors.primary}20`
										}
									}}
									onBlur={(e) => {
										if (!errors.email) {
											e.target.style.borderColor = colors.border
											e.target.style.boxShadow = 'none'
										}
									}}
									placeholder={t('auth.register.emailPlaceholder', 'Enter your email')}
								/>
								{errors.email && (
									<BrandedP className="mt-1 text-sm text-red-600">
										{errors.email.message}
									</BrandedP>
								)}
							</div>

							{/* Phone Number */}
							<div>
								<label 
									htmlFor="phoneNumber" 
									className="block text-sm font-medium mb-2"
									style={{ color: colors.text.primary }}
								>
									{t('auth.register.phone', 'Phone Number')} *
								</label>
								<input
									{...register('phoneNumber')}
									type="tel"
									autoComplete="tel"
									className={`w-full px-3 py-3 rounded-md border transition-colors ${
										errors.phoneNumber ? 'border-red-300' : ''
									}`}
									style={{
										borderColor: errors.phoneNumber ? '#FCA5A5' : colors.border,
										backgroundColor: colors.background,
										color: colors.text.primary
									}}
									onFocus={(e) => {
										if (!errors.phoneNumber) {
											e.target.style.borderColor = colors.primary
											e.target.style.boxShadow = `0 0 0 3px ${colors.primary}20`
										}
									}}
									onBlur={(e) => {
										if (!errors.phoneNumber) {
											e.target.style.borderColor = colors.border
											e.target.style.boxShadow = 'none'
										}
									}}
									placeholder={t('auth.register.phonePlaceholder', 'Enter your phone number')}
								/>
								{errors.phoneNumber && (
									<BrandedP className="mt-1 text-sm text-red-600">
										{errors.phoneNumber.message}
									</BrandedP>
								)}
							</div>

							{/* Password */}
							<div>
								<label 
									htmlFor="password" 
									className="block text-sm font-medium mb-2"
									style={{ color: colors.text.primary }}
								>
									{t('auth.register.password', 'Password')} *
								</label>
								<div className="relative">
									<input
										{...register('password')}
										type={showPassword ? 'text' : 'password'}
										autoComplete="new-password"
										className={`w-full px-3 py-3 pr-10 rounded-md border transition-colors ${
											errors.password ? 'border-red-300' : ''
										}`}
										style={{
											borderColor: errors.password ? '#FCA5A5' : colors.border,
											backgroundColor: colors.background,
											color: colors.text.primary
										}}
										onFocus={(e) => {
											if (!errors.password) {
												e.target.style.borderColor = colors.primary
												e.target.style.boxShadow = `0 0 0 3px ${colors.primary}20`
											}
										}}
										onBlur={(e) => {
											if (!errors.password) {
												e.target.style.borderColor = colors.border
												e.target.style.boxShadow = 'none'
											}
										}}
										placeholder={t('auth.register.passwordPlaceholder', 'Create a secure password')}
									/>
									<button
										type="button"
										className="absolute inset-y-0 right-0 pr-3 flex items-center"
										onClick={() => setShowPassword(!showPassword)}
									>
										{showPassword ? (
											<EyeOff className="h-5 w-5" style={{ color: colors.text.secondary }} />
										) : (
											<Eye className="h-5 w-5" style={{ color: colors.text.secondary }} />
										)}
									</button>
								</div>
								{errors.password && (
									<BrandedP className="mt-1 text-sm text-red-600">
										{errors.password.message}
									</BrandedP>
								)}
							</div>

							{/* Confirm Password */}
							<div>
								<label 
									htmlFor="confirmPassword" 
									className="block text-sm font-medium mb-2"
									style={{ color: colors.text.primary }}
								>
									{t('auth.register.confirmPassword', 'Confirm Password')} *
								</label>
								<div className="relative">
									<input
										{...register('confirmPassword')}
										type={showConfirmPassword ? 'text' : 'password'}
										autoComplete="new-password"
										className={`w-full px-3 py-3 pr-10 rounded-md border transition-colors ${
											errors.confirmPassword ? 'border-red-300' : ''
										}`}
										style={{
											borderColor: errors.confirmPassword ? '#FCA5A5' : colors.border,
											backgroundColor: colors.background,
											color: colors.text.primary
										}}
										onFocus={(e) => {
											if (!errors.confirmPassword) {
												e.target.style.borderColor = colors.primary
												e.target.style.boxShadow = `0 0 0 3px ${colors.primary}20`
											}
										}}
										onBlur={(e) => {
											if (!errors.confirmPassword) {
												e.target.style.borderColor = colors.border
												e.target.style.boxShadow = 'none'
											}
										}}
										placeholder={t('auth.register.confirmPasswordPlaceholder', 'Confirm your password')}
									/>
									<button
										type="button"
										className="absolute inset-y-0 right-0 pr-3 flex items-center"
										onClick={() => setShowConfirmPassword(!showConfirmPassword)}
									>
										{showConfirmPassword ? (
											<EyeOff className="h-5 w-5" style={{ color: colors.text.secondary }} />
										) : (
											<Eye className="h-5 w-5" style={{ color: colors.text.secondary }} />
										)}
									</button>
								</div>
								{errors.confirmPassword && (
									<BrandedP className="mt-1 text-sm text-red-600">
										{errors.confirmPassword.message}
									</BrandedP>
								)}
							</div>

							{/* Terms and Conditions */}
							<div className="flex items-start">
								<div className="flex items-center h-5">
									<input
										{...register('termsAccepted')}
										type="checkbox"
										className="w-4 h-4 rounded border-2 transition-colors"
										style={{
											borderColor: colors.border,
											accentColor: colors.primary
										}}
									/>
								</div>
								<div className="ml-3 text-sm">
									<label htmlFor="termsAccepted" style={{ color: colors.text.secondary }}>
										{t('auth.register.agreeToTerms', 'I agree to the')}{' '}
										<Link 
											to="/terms" 
											className="font-medium transition-colors"
											style={{ color: colors.secondary }}
											onMouseEnter={(e) => {
												e.currentTarget.style.color = colors.primary
											}}
											onMouseLeave={(e) => {
												e.currentTarget.style.color = colors.secondary
											}}
										>
											{t('auth.register.terms', 'Terms of Service')}
										</Link>{' '}
										{t('auth.register.and', 'and')}{' '}
										<Link 
											to="/privacy" 
											className="font-medium transition-colors"
											style={{ color: colors.secondary }}
											onMouseEnter={(e) => {
												e.currentTarget.style.color = colors.primary
											}}
											onMouseLeave={(e) => {
												e.currentTarget.style.color = colors.secondary
											}}
										>
											{t('auth.register.privacy', 'Privacy Policy')}
										</Link>
									</label>
									{errors.termsAccepted && (
										<BrandedP className="mt-1 text-sm text-red-600">
											{errors.termsAccepted.message}
										</BrandedP>
									)}
								</div>
							</div>

							{/* Submit Button */}
							<div>
								<button
									type="submit"
									disabled={isLoading}
									className="w-full flex justify-center py-3 px-4 rounded-md text-sm font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
									style={{
										backgroundColor: colors.primary,
										color: colors.text.inverse,
										border: `1px solid ${colors.primary}`
									}}
									onMouseEnter={(e) => {
										if (!isLoading) {
											e.currentTarget.style.backgroundColor = colors.secondary
											e.currentTarget.style.borderColor = colors.secondary
										}
									}}
									onMouseLeave={(e) => {
										if (!isLoading) {
											e.currentTarget.style.backgroundColor = colors.primary
											e.currentTarget.style.borderColor = colors.primary
										}
									}}
								>
									{isLoading ? (
										<div className="flex items-center">
											<div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
											{t('auth.register.creating', 'Creating account...')}
										</div>
									) : (
										<div className="flex items-center">
											<CheckCircle className="h-5 w-5 mr-2" />
											{t('auth.register.talent.submit', 'Create Talent Account')}
										</div>
									)}
								</button>
							</div>

							{/* Footer Links */}
							<div className="text-center space-y-3">
								<BrandedP className="text-sm">
									{t('auth.register.hasAccount', 'Already have an account?')}{' '}
									<Link
										to="/login/talent"
										className="font-medium transition-colors"
										style={{ color: colors.primary }}
										onMouseEnter={(e) => {
											e.currentTarget.style.color = colors.secondary
										}}
										onMouseLeave={(e) => {
											e.currentTarget.style.color = colors.primary
										}}
									>
										{t('auth.register.signIn', 'Sign in here')}
									</Link>
								</BrandedP>
								<BrandedP className="text-xs">
									{t('auth.register.lookingToHire', 'Looking to hire talent?')}{' '}
									<Link
										to="/register/team"
										className="transition-colors"
										style={{ color: colors.secondary }}
										onMouseEnter={(e) => {
											e.currentTarget.style.color = colors.primary
										}}
										onMouseLeave={(e) => {
											e.currentTarget.style.color = colors.secondary
										}}
									>
										{t('auth.register.joinAsTeam', 'Join as Team')}
									</Link>
								</BrandedP>
								<BrandedP className="text-xs">
									{t('auth.register.recruitingTeam', 'Recruiting for a team?')}{' '}
									<Link
										to="/login/team"
										className="transition-colors"
										style={{ color: colors.primary }}
										onMouseEnter={(e) => {
											e.currentTarget.style.color = colors.secondary
										}}
										onMouseLeave={(e) => {
											e.currentTarget.style.color = colors.primary
										}}
									>
										{t('auth.register.teamLogin', 'Team Login')}
									</Link>
								</BrandedP>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	)
}

export default RegisterTalentPage 