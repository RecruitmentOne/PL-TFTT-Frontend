import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useTranslation } from 'react-i18next'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { registerEmployer, clearError } from '../../store/slices/authSlice'
import { lookupAPI } from '../../services/api'
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
import { Eye, EyeOff, Building, CheckCircle, Users, Target, Zap, Briefcase, Award, Euro, Clock, Shield } from 'lucide-react'

const registerTeamSchema = z.object({
	companyName: z.string().min(2, 'Company name must be at least 2 characters'),
	email: z.string().email('Please enter a valid email address'),
	phoneNumber: z.string().min(10, 'Phone number must be at least 10 characters'),
	password: z.string()
		.min(6, 'Password must be at least 6 characters')
		.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one uppercase letter, one lowercase letter, and one number'),
	confirmPassword: z.string(),
	industryId: z.number().min(1, 'Please select an industry'),
	countryId: z.number().min(1, 'Please select a country'),
	cityId: z.number().min(1, 'Please select a city'),
	website: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
	companyAddress: z.string().optional(),
	streetAddress: z.string().optional(),
	companySizeId: z.number().optional(),
	companyTypeId: z.number().optional(),
}).refine((data) => data.password === data.confirmPassword, {
	message: "Passwords don't match",
	path: ["confirmPassword"],
})

type RegisterTeamFormData = z.infer<typeof registerTeamSchema>

interface LookupItem {
	id: number
	name: string
}

function RegisterTeamPage() {
	const [showPassword, setShowPassword] = useState(false)
	const [showConfirmPassword, setShowConfirmPassword] = useState(false)
	const [industries, setIndustries] = useState<LookupItem[]>([])
	const [countries, setCountries] = useState<LookupItem[]>([])
	const [cities, setCities] = useState<LookupItem[]>([])
	const [companySizes, setCompanySizes] = useState<LookupItem[]>([])
	const [companyTypes, setCompanyTypes] = useState<LookupItem[]>([])
	const [selectedCountryId, setSelectedCountryId] = useState<number | null>(null)
	const [loadingLookups, setLoadingLookups] = useState(true)

	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const { t } = useTranslation()
	const { switchVariant } = useBrand()
	const colors = useBrandColors()
	const { isLoading, error, isAuthenticated } = useAppSelector((state) => state.auth)

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<RegisterTeamFormData>({
		resolver: zodResolver(registerTeamSchema),
	})

	const watchCountryId = watch('countryId')

	// Set brand variant to teams
	useEffect(() => {
		switchVariant('teams')
	}, [switchVariant])

	useEffect(() => {
		if (isAuthenticated) {
			navigate('/team')
		}
	}, [isAuthenticated, navigate])

	useEffect(() => {
		// Clear any previous errors when component mounts
		dispatch(clearError())
		
		// Load initial lookup data
		loadLookupData()
	}, [dispatch])

	useEffect(() => {
		// Load cities when country changes
		if (watchCountryId && watchCountryId !== selectedCountryId) {
			setSelectedCountryId(watchCountryId)
			loadCities(watchCountryId)
		}
	}, [watchCountryId, selectedCountryId])

	const loadLookupData = async () => {
		try {
			const [industriesRes, countriesRes, sizesRes, typesRes] = await Promise.all([
				lookupAPI.getIndustries(),
				lookupAPI.getCountries(),
				lookupAPI.getCompanySizes(),
				lookupAPI.getCompanyTypes()
			])
			
			setIndustries(industriesRes)
			setCountries(countriesRes)
			setCompanySizes(sizesRes)
			setCompanyTypes(typesRes)
		} catch (error) {
			console.error('Failed to load lookup data:', error)
		} finally {
			setLoadingLookups(false)
		}
	}

	const loadCities = async (countryId: number) => {
		try {
			const citiesRes = await lookupAPI.getCitiesByCountry(countryId)
			setCities(citiesRes)
		} catch (error) {
			console.error('Failed to load cities:', error)
		}
	}

	const onSubmit = async (data: RegisterTeamFormData) => {
		try {
			const { confirmPassword, ...registrationData } = data
			// Convert null values to undefined for API compatibility
			const cleanedData = {
				...registrationData,
				companySizeId: registrationData.companySizeId || undefined,
				companyTypeId: registrationData.companyTypeId || undefined
			}
			await dispatch(registerEmployer(cleanedData)).unwrap()
			// Navigate to success page or show success message
			navigate('/login/team', { 
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
			icon: Users,
			title: t('auth.benefits.teams.aiScoring', 'AI Candidate Scoring'),
			description: t('auth.benefits.teams.aiScoringDesc', 'Intelligent ranking with multi-criteria analysis and detailed reasoning for faster hiring decisions'),
			stat: t('auth.benefits.teams.aiScoringStat', 'AI-Enhanced')
		},
		{
			icon: Target,
			title: t('auth.benefits.teams.smartMatching', 'Smart Tech Matching'),
			description: t('auth.benefits.teams.smartMatchingDesc', 'Find perfect tech talent using OpenAI-powered algorithms that match skills, experience, and culture fit'),
			stat: t('auth.benefits.teams.smartMatchingStat', 'AI-powered')
		},
		{
			icon: Zap,
			title: t('auth.benefits.teams.fasterHiring', 'Streamlined Hiring'),
			description: t('auth.benefits.teams.fasterHiringDesc', 'Streamlined process with automated CV parsing, bulk operations, and smart candidate filtering'),
			stat: t('auth.benefits.teams.fasterHiringStat', 'streamlined')
		},
		{
			icon: Euro,
			title: t('auth.benefits.teams.creditSystem', 'Transparent Pricing'),
			description: t('auth.benefits.teams.creditSystemDesc', 'Pay-per-view model starting from €0.0005 per profile with bulk discounts and no hidden fees'),
			stat: t('auth.benefits.teams.creditSystemStat', '€0.0005/profile')
		}
	]

	const stats = [
		{ number: '2,500+', label: t('auth.stats.teams.companies', 'EU Companies') },
		{ number: 'AI-Powered', label: t('auth.stats.teams.match', 'Technology') },
		{ number: '€0.0005', label: t('auth.stats.teams.cost', 'Cost Per Profile') },
		{ number: '100%', label: t('auth.stats.teams.gdpr', 'GDPR Compliant') }
	]

	const techRoles = ['Frontend Developer', 'Backend Engineer', 'DevOps Engineer', 'Data Scientist', 'Product Manager', 'UI/UX Designer']

	if (loadingLookups) {
		return (
			<div 
				className="min-h-screen flex items-center justify-center"
				style={{ backgroundColor: colors.surface }}
			>
				<div className="text-center">
					<div 
						className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto"
						style={{ borderColor: colors.primary }}
					></div>
					<BrandedP className="mt-4">
						{t('auth.register.loadingForm', 'Loading registration form...')}
					</BrandedP>
				</div>
			</div>
		)
	}

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
								to="/login/team"
								className="text-brand-primary hover:text-brand-secondary font-medium text-sm transition-colors"
							>
								{t('auth.loginAsTeam', 'Login as Team')}
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
								backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='white' fill-opacity='0.1'%3E%3Cpath d='M20 20h20v20H20zM60 20h20v20H60zM20 60h20v20H20zM60 60h20v20H60z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
								backgroundSize: '80px 80px'
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
								<Building className="h-6 w-6" style={{ color: colors.primary }} />
							</div>
							<div>
								<BrandedH2 variant="inverse">
									{t('auth.register.teams.title', 'Join as Team')}
								</BrandedH2>
								<BrandedP variant="inverse" style={{ color: `${colors.text.inverse}CC` }}>
									{t('auth.register.teams.subtitle', 'Build your dream tech team with AI-powered hiring')}
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

						{/* Popular Roles */}
						<div className="mb-8">
							<BrandedH3 variant="inverse" className="text-sm mb-3">
								{t('auth.register.teams.popularRoles', 'Popular Tech Roles')}
							</BrandedH3>
							<div className="flex flex-wrap gap-2">
								{techRoles.map((role, index) => (
									<BrandedSpan
										key={index}
										className="px-3 py-1 text-xs rounded-full"
										style={{
											backgroundColor: `${colors.text.inverse}15`,
											color: colors.text.inverse,
											border: `1px solid ${colors.text.inverse}30`
										}}
									>
										{role}
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
								{t('auth.register.teams.platformStats', 'Platform Statistics')}
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
				<div className="w-full lg:w-3/5 flex items-center justify-center p-12 overflow-y-auto">
					<div className="max-w-2xl w-full space-y-8">
						{/* Header */}
						<div className="text-center">
							<div className="flex justify-center mb-6">
								<BrandLogo variant="icon" size="lg" />
							</div>
							<BrandedH1 className="mb-4">
								{t('auth.register.teams.formTitle', 'Join as Team')}
							</BrandedH1>
							<BrandedP className="text-lg mb-4">
								{t('auth.register.teams.formSubtitle', 'Find the perfect tech talent with AI-powered matching across Europe')}
							</BrandedP>
							<div className="text-center">
								<Link
									to="/register"
									className="text-sm font-medium transition-colors"
									style={{ color: colors.primary }}
									onMouseEnter={(e) => {
										e.currentTarget.style.color = colors.secondary
									}}
									onMouseLeave={(e) => {
										e.currentTarget.style.color = colors.primary
									}}
								>
									← {t('auth.register.backToOptions', 'Back to registration options')}
								</Link>
							</div>
						</div>

						<form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
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
								<Building className="h-6 w-6 mr-2" style={{ color: colors.primary }} />
								<BrandedSpan 
									className="font-medium"
									style={{ color: colors.primary }}
								>
									{t('auth.register.teams.registering', 'Registering as Team/Company')}
								</BrandedSpan>
							</div>

							{/* Form Grid */}
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								{/* Company Name */}
								<div className="md:col-span-2">
									<label 
										htmlFor="companyName" 
										className="block text-sm font-medium mb-2"
										style={{ color: colors.text.primary }}
									>
										{t('auth.register.companyName', 'Company Name')} *
									</label>
									<input
										{...register('companyName')}
										type="text"
										autoComplete="organization"
										className={`w-full px-3 py-3 rounded-md border transition-colors ${
											errors.companyName ? 'border-red-300' : ''
										}`}
										style={{
											borderColor: errors.companyName ? '#FCA5A5' : colors.border,
											backgroundColor: colors.background,
											color: colors.text.primary
										}}
										onFocus={(e) => {
											if (!errors.companyName) {
												e.target.style.borderColor = colors.primary
												e.target.style.boxShadow = `0 0 0 3px ${colors.primary}20`
											}
										}}
										onBlur={(e) => {
											if (!errors.companyName) {
												e.target.style.borderColor = colors.border
												e.target.style.boxShadow = 'none'
											}
										}}
										placeholder={t('auth.register.companyNamePlaceholder', 'Enter your company name')}
									/>
									{errors.companyName && (
										<BrandedP className="mt-1 text-sm text-red-600">
											{errors.companyName.message}
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
										{t('auth.register.businessEmail', 'Business Email')} *
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
										placeholder={t('auth.register.businessEmailPlaceholder', 'Enter your business email')}
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

								{/* Industry */}
								<div>
									<label 
										htmlFor="industryId" 
										className="block text-sm font-medium mb-2"
										style={{ color: colors.text.primary }}
									>
										{t('auth.register.industry', 'Industry')} *
									</label>
									<select
										{...register('industryId', { valueAsNumber: true })}
										className={`w-full px-3 py-3 rounded-md border transition-colors ${
											errors.industryId ? 'border-red-300' : ''
										}`}
										style={{
											borderColor: errors.industryId ? '#FCA5A5' : colors.border,
											backgroundColor: colors.background,
											color: colors.text.primary
										}}
										onFocus={(e) => {
											if (!errors.industryId) {
												e.target.style.borderColor = colors.primary
												e.target.style.boxShadow = `0 0 0 3px ${colors.primary}20`
											}
										}}
										onBlur={(e) => {
											if (!errors.industryId) {
												e.target.style.borderColor = colors.border
												e.target.style.boxShadow = 'none'
											}
										}}
									>
										<option value="">{t('auth.register.selectIndustry', 'Select Industry')}</option>
										{industries.map((industry) => (
											<option key={industry.id} value={industry.id}>
												{industry.name}
											</option>
										))}
									</select>
									{errors.industryId && (
										<BrandedP className="mt-1 text-sm text-red-600">
											{errors.industryId.message}
										</BrandedP>
									)}
								</div>

								{/* Country */}
								<div>
									<label 
										htmlFor="countryId" 
										className="block text-sm font-medium mb-2"
										style={{ color: colors.text.primary }}
									>
										{t('auth.register.country', 'Country')} *
									</label>
									<select
										{...register('countryId', { valueAsNumber: true })}
										className={`w-full px-3 py-3 rounded-md border transition-colors ${
											errors.countryId ? 'border-red-300' : ''
										}`}
										style={{
											borderColor: errors.countryId ? '#FCA5A5' : colors.border,
											backgroundColor: colors.background,
											color: colors.text.primary
										}}
										onFocus={(e) => {
											if (!errors.countryId) {
												e.target.style.borderColor = colors.primary
												e.target.style.boxShadow = `0 0 0 3px ${colors.primary}20`
											}
										}}
										onBlur={(e) => {
											if (!errors.countryId) {
												e.target.style.borderColor = colors.border
												e.target.style.boxShadow = 'none'
											}
										}}
									>
										<option value="">{t('auth.register.selectCountry', 'Select Country')}</option>
										{countries.map((country) => (
											<option key={country.id} value={country.id}>
												{country.name}
											</option>
										))}
									</select>
									{errors.countryId && (
										<BrandedP className="mt-1 text-sm text-red-600">
											{errors.countryId.message}
										</BrandedP>
									)}
								</div>

								{/* City */}
								<div>
									<label 
										htmlFor="cityId" 
										className="block text-sm font-medium mb-2"
										style={{ color: colors.text.primary }}
									>
										{t('auth.register.city', 'City')} *
									</label>
									<select
										{...register('cityId', { valueAsNumber: true })}
										className={`w-full px-3 py-3 rounded-md border transition-colors ${
											errors.cityId ? 'border-red-300' : ''
										}`}
										style={{
											borderColor: errors.cityId ? '#FCA5A5' : colors.border,
											backgroundColor: colors.background,
											color: colors.text.primary
										}}
										disabled={!watchCountryId}
										onFocus={(e) => {
											if (!errors.cityId) {
												e.target.style.borderColor = colors.primary
												e.target.style.boxShadow = `0 0 0 3px ${colors.primary}20`
											}
										}}
										onBlur={(e) => {
											if (!errors.cityId) {
												e.target.style.borderColor = colors.border
												e.target.style.boxShadow = 'none'
											}
										}}
									>
										<option value="">
											{watchCountryId 
												? t('auth.register.selectCity', 'Select City') 
												: t('auth.register.selectCountryFirst', 'Select country first')
											}
										</option>
										{cities.map((city) => (
											<option key={city.id} value={city.id}>
												{city.name}
											</option>
										))}
									</select>
									{errors.cityId && (
										<BrandedP className="mt-1 text-sm text-red-600">
											{errors.cityId.message}
										</BrandedP>
									)}
								</div>

								{/* Website */}
								<div>
									<label 
										htmlFor="website" 
										className="block text-sm font-medium mb-2"
										style={{ color: colors.text.primary }}
									>
										{t('auth.register.website', 'Company Website')}
									</label>
									<input
										{...register('website')}
										type="url"
										autoComplete="url"
										className={`w-full px-3 py-3 rounded-md border transition-colors ${
											errors.website ? 'border-red-300' : ''
										}`}
										style={{
											borderColor: errors.website ? '#FCA5A5' : colors.border,
											backgroundColor: colors.background,
											color: colors.text.primary
										}}
										onFocus={(e) => {
											if (!errors.website) {
												e.target.style.borderColor = colors.primary
												e.target.style.boxShadow = `0 0 0 3px ${colors.primary}20`
											}
										}}
										onBlur={(e) => {
											if (!errors.website) {
												e.target.style.borderColor = colors.border
												e.target.style.boxShadow = 'none'
											}
										}}
										placeholder={t('auth.register.websitePlaceholder', 'https://yourcompany.com')}
									/>
									{errors.website && (
										<BrandedP className="mt-1 text-sm text-red-600">
											{errors.website.message}
										</BrandedP>
									)}
								</div>

								{/* Company Size */}
								<div>
									<label 
										htmlFor="companySizeId" 
										className="block text-sm font-medium mb-2"
										style={{ color: colors.text.primary }}
									>
										{t('auth.register.companySize', 'Company Size')}
									</label>
									<select
										{...register('companySizeId', { valueAsNumber: true })}
										className="w-full px-3 py-3 rounded-md border transition-colors"
										style={{
											borderColor: colors.border,
											backgroundColor: colors.background,
											color: colors.text.primary
										}}
										onFocus={(e) => {
											e.target.style.borderColor = colors.primary
											e.target.style.boxShadow = `0 0 0 3px ${colors.primary}20`
										}}
										onBlur={(e) => {
											e.target.style.borderColor = colors.border
											e.target.style.boxShadow = 'none'
										}}
									>
										<option value="">{t('auth.register.selectSize', 'Select Size (Optional)')}</option>
										{companySizes.map((size) => (
											<option key={size.id} value={size.id}>
												{size.name}
											</option>
										))}
									</select>
								</div>

								{/* Company Type */}
								<div>
									<label 
										htmlFor="companyTypeId" 
										className="block text-sm font-medium mb-2"
										style={{ color: colors.text.primary }}
									>
										{t('auth.register.companyType', 'Company Type')}
									</label>
									<select
										{...register('companyTypeId', { valueAsNumber: true })}
										className="w-full px-3 py-3 rounded-md border transition-colors"
										style={{
											borderColor: colors.border,
											backgroundColor: colors.background,
											color: colors.text.primary
										}}
										onFocus={(e) => {
											e.target.style.borderColor = colors.primary
											e.target.style.boxShadow = `0 0 0 3px ${colors.primary}20`
										}}
										onBlur={(e) => {
											e.target.style.borderColor = colors.border
											e.target.style.boxShadow = 'none'
										}}
									>
										<option value="">{t('auth.register.selectType', 'Select Type (Optional)')}</option>
										{companyTypes.map((type) => (
											<option key={type.id} value={type.id}>
												{type.name}
											</option>
										))}
									</select>
								</div>

								{/* Company Address */}
								<div className="md:col-span-2">
									<label 
										htmlFor="companyAddress" 
										className="block text-sm font-medium mb-2"
										style={{ color: colors.text.primary }}
									>
										{t('auth.register.companyAddress', 'Company Address')}
									</label>
									<input
										{...register('companyAddress')}
										type="text"
										autoComplete="street-address"
										className="w-full px-3 py-3 rounded-md border transition-colors"
										style={{
											borderColor: colors.border,
											backgroundColor: colors.background,
											color: colors.text.primary
										}}
										onFocus={(e) => {
											e.target.style.borderColor = colors.primary
											e.target.style.boxShadow = `0 0 0 3px ${colors.primary}20`
										}}
										onBlur={(e) => {
											e.target.style.borderColor = colors.border
											e.target.style.boxShadow = 'none'
										}}
										placeholder={t('auth.register.companyAddressPlaceholder', 'Enter your company address (optional)')}
									/>
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
											{t('auth.register.teams.submit', 'Create Team Account')}
										</div>
									)}
								</button>
							</div>

							{/* Footer Links */}
							<div className="text-center space-y-3">
								<BrandedP className="text-sm">
									{t('auth.register.hasAccount', 'Already have an account?')}{' '}
									<Link
										to="/login/team"
										className="font-medium transition-colors"
										style={{ color: colors.primary }}
										onMouseEnter={(e) => {
											e.currentTarget.style.color = colors.secondary
										}}
										onMouseLeave={(e) => {
											e.currentTarget.style.color = colors.primary
										}}
									>
										{t('auth.loginAsTeam', 'Login as Team')}
									</Link>
								</BrandedP>
								<BrandedP className="text-xs">
									{t('auth.register.lookingForJob', 'Looking for a job?')}{' '}
									<Link
										to="/register/talent"
										className="transition-colors"
										style={{ color: colors.secondary }}
										onMouseEnter={(e) => {
											e.currentTarget.style.color = colors.primary
										}}
										onMouseLeave={(e) => {
											e.currentTarget.style.color = colors.secondary
										}}
									>
										{t('auth.register.joinAsTalent', 'Join as Talent')}
									</Link>
								</BrandedP>
								<BrandedP className="text-xs">
									{t('auth.register.lookingForJob', 'Looking for a job?')}{' '}
									<Link
										to="/login/talent"
										className="transition-colors"
										style={{ color: colors.primary }}
										onMouseEnter={(e) => {
											e.currentTarget.style.color = colors.secondary
										}}
										onMouseLeave={(e) => {
											e.currentTarget.style.color = colors.primary
										}}
									>
										{t('auth.register.talentLogin', 'Talent Login')}
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

export default RegisterTeamPage 