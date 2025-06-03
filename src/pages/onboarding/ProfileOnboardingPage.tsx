import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../../store/hooks'
import { getUserProfile, markOnboardingCompleted, checkProfileCompletion } from '../../store/slices/userSlice'
import { 
	Upload, 
	User, 
	Linkedin, 
	CheckCircle, 
	ArrowRight, 
	FileText,
	Zap,
	Target,
	Clock,
	AlertTriangle,
	Star,
	Eye
} from 'lucide-react'
import CVUploadOption from '../../components/onboarding/CVUploadOption'
import LinkedInOption from '../../components/onboarding/LinkedInOption'
import ManualOption from '../../components/onboarding/ManualOption'
import { profileAPI } from '../../services/api'
import { useBrand, useBrandColors } from '../../brand'
import { BrandLogo } from '../../components/brand/brand-logo'
import { BrandedH1, BrandedH2, BrandedH3, BrandedP } from '../../components/brand/branded-typography'
import { BrandedCard } from '../../components/brand/branded-card'
import { BrandedButton } from '../../components/brand/branded-button/branded-button'

interface ProfileStatus {
	isComplete: boolean
	hasCV: boolean
	completionPercentage: number
	missingFields: string[]
}

function ProfileOnboardingPage() {
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const { user } = useAppSelector((state) => state.auth)
	const { profile, hasCompletedOnboarding } = useAppSelector((state) => state.user)
	const { currentVariant } = useBrand()
	const colors = useBrandColors()
	
	const [selectedOption, setSelectedOption] = useState<'cv' | 'linkedin' | 'manual' | null>(null)
	const [profileStatus, setProfileStatus] = useState<ProfileStatus>({
		isComplete: false,
		hasCV: false,
		completionPercentage: 0,
		missingFields: []
	})
	const [currentStep, setCurrentStep] = useState(1)
	const [showCVReminder, setShowCVReminder] = useState(false)

	useEffect(() => {
		console.log('ProfileOnboardingPage - useEffect triggered')
		console.log('Current user:', user)
		console.log('User type:', user?.userType)
		
		if (!user || user.userType !== 'talent') {
			console.log('User not authenticated or not talent type, navigating to /talent')
			navigate('/talent')
			return
		}

		// Check profile status
		checkProfileStatus()
	}, [user, navigate])

	const checkProfileStatus = async () => {
		try {
			console.log('Checking profile status...')
			const status = await profileAPI.getProfile()
			console.log('Profile status response:', status)
			
			const newProfileStatus = {
				isComplete: status.isProfileComplete || false,
				hasCV: status.hasCvUploaded || false,
				completionPercentage: status.completionPercentage || 0,
				missingFields: status.missingFields || []
			}
			
			console.log('Setting profile status:', newProfileStatus)
			console.log('Redux hasCompletedOnboarding:', hasCompletedOnboarding)
			console.log('Backend hasCompletedOnboarding:', status.hasCompletedOnboarding)
			setProfileStatus(newProfileStatus)
		} catch (error) {
			console.error('Failed to check profile status:', error)
		}
	}

	const handleOptionSelect = (option: 'cv' | 'linkedin' | 'manual') => {
		setSelectedOption(option)
		setCurrentStep(2)
	}

	const handleSkipWithReminder = () => {
		if (selectedOption !== 'cv') {
			setShowCVReminder(true)
		}
	}

	const handleCompleteOnboarding = async () => {
		try {
			console.log('=== Starting onboarding completion process ===')
			
			// Step 1: Mark onboarding as complete in both localStorage and backend
			console.log('Step 1: Marking onboarding as completed...')
			await dispatch(markOnboardingCompleted()).unwrap()
			console.log('✅ Onboarding marked as completed successfully')
			
			// Step 2: Re-check profile status to get updated backend state
			console.log('Step 2: Re-checking profile status...')
			await checkProfileStatus()
			
			// Step 3: Check the updated Redux state to ensure consistency
			console.log('Step 3: Checking Redux state...')
			await dispatch(checkProfileCompletion()).unwrap()
			console.log('✅ Profile completion status refreshed')
			
			// Small delay to ensure all state updates are complete
			setTimeout(() => {
				console.log('=== Navigating to dashboard ===')
				navigate('/talent')
			}, 500)
		} catch (error) {
			console.error('Failed to complete onboarding process:', error)
			// Even if some steps fail, still try to navigate
			console.log('⚠️ Error occurred, but still navigating to dashboard')
			navigate('/talent')
		}
	}

	const steps = [
		{ number: 1, title: 'Choose Method', description: 'Select how to complete your profile' },
		{ number: 2, title: 'Complete Profile', description: 'Fill in your professional information' },
		{ number: 3, title: 'Review & Finish', description: 'Review and publish your profile' }
	]

	const options = [
		{
			id: 'cv',
			title: 'Upload CV/Resume',
			description: 'AI-powered extraction with advanced technology',
			icon: Upload,
			color: colors.primary,
			benefits: [
				'AI-Enhanced accuracy with OpenAI parsing',
				'Instant profile completion',
				'Professional summary generation',
				'Automatic skill extraction'
			],
			badge: 'RECOMMENDED',
			badgeColor: 'bg-green-100 text-green-700'
		},
		{
			id: 'linkedin',
			title: 'Import from LinkedIn',
			description: 'Import your professional data instantly',
			icon: Linkedin,
			color: colors.secondary,
			benefits: [
				'One-click profile import',
				'Professional network sync',
				'Experience auto-fill',
				'Skills validation'
			],
			badge: 'COMING SOON',
			badgeColor: 'bg-orange-100 text-orange-700',
			disabled: true
		},
		{
			id: 'manual',
			title: 'Manual Entry',
			description: 'Fill your profile step by step',
			icon: User,
			color: colors.text.secondary,
			benefits: [
				'Complete control over data',
				'Custom profile sections',
				'Detailed customization',
				'Privacy focused'
			],
			badge: 'CV REQUIRED LATER',
			badgeColor: 'bg-yellow-100 text-yellow-700'
		}
	]

	if (profileStatus.isComplete && hasCompletedOnboarding) {
		console.log('Showing Profile Complete screen - both conditions met')
		console.log('profileStatus.isComplete:', profileStatus.isComplete)
		console.log('hasCompletedOnboarding:', hasCompletedOnboarding)
		
		return (
			<div 
				className="min-h-screen flex items-center justify-center"
				style={{ 
					background: `linear-gradient(135deg, ${colors.surface} 0%, ${colors.background} 100%)`
				}}
			>
				<BrandedCard variant="elevated" className="max-w-md w-full p-8 text-center mx-4">
					<CheckCircle className="w-16 h-16 mx-auto mb-6" style={{ color: colors.success }} />
					<BrandedH2 className="mb-4">Profile Complete!</BrandedH2>
					<BrandedP className="mb-6">
						Your profile is ready. You can now start exploring job opportunities.
					</BrandedP>
					<BrandedButton
						variant="primary"
						onClick={() => {
							console.log('Go to Dashboard button clicked')
							console.log('Current user:', user)
							console.log('Profile status:', profileStatus)
							console.log('hasCompletedOnboarding:', hasCompletedOnboarding)
							navigate('/talent')
						}}
						className="w-full"
					>
						Go to Dashboard
					</BrandedButton>
				</BrandedCard>
			</div>
		)
	}

	return (
		<div 
			className="min-h-screen"
			style={{ 
				background: `linear-gradient(135deg, ${colors.surface} 0%, ${colors.background} 100%)`
			}}
		>
			<div className="container mx-auto px-4 py-8">
				{/* Header */}
				<div className="text-center mb-12">
					<div className="flex justify-center mb-6">
						<BrandLogo variant="icon" size="xl" />
					</div>
					<BrandedH1 className="mb-4">
						Complete Your Profile
					</BrandedH1>
					<BrandedP size="lg" className="max-w-2xl mx-auto">
						Choose how you'd like to build your professional profile. Each method is designed to showcase your skills and experience effectively.
					</BrandedP>
				</div>

				{/* Progress Indicator */}
				<div className="max-w-3xl mx-auto mb-12">
					<div className="flex items-center justify-between">
						{steps.map((step, index) => (
							<div key={step.number} className="flex items-center">
								<div 
									className={`relative flex items-center justify-center w-12 h-12 rounded-full border-2`}
									style={{
										backgroundColor: currentStep >= step.number ? colors.primary : colors.surface,
										borderColor: currentStep >= step.number ? colors.primary : colors.border,
										color: currentStep >= step.number ? colors.text.inverse : colors.text.secondary
									}}
								>
									{currentStep > step.number ? (
										<CheckCircle className="w-6 h-6" />
									) : (
										<span className="font-semibold">{step.number}</span>
									)}
								</div>
								<div className="ml-4 text-left">
									<h3 
										className="font-semibold"
										style={{
											color: currentStep >= step.number ? colors.primary : colors.text.secondary
										}}
									>
										{step.title}
									</h3>
									<p className="text-sm" style={{ color: colors.text.secondary }}>
										{step.description}
									</p>
								</div>
								{index < steps.length - 1 && (
									<div 
										className="flex-1 h-0.5 mx-8"
										style={{
											backgroundColor: currentStep > step.number ? colors.primary : colors.border
										}}
									/>
								)}
							</div>
						))}
					</div>
				</div>

				{/* Content */}
				{currentStep === 1 && (
					<div className="max-w-6xl mx-auto">
						<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
							{options.map((option) => (
								<BrandedCard
									key={option.id}
									variant="elevated"
									className={`relative p-8 transition-all duration-300 ${
										option.disabled 
											? 'opacity-75 cursor-not-allowed'
											: 'cursor-pointer hover:scale-105'
									}`}
									onClick={() => !option.disabled && handleOptionSelect(option.id as any)}
									style={{
										borderColor: option.disabled ? colors.border : colors.primary + '20'
									}}
								>
									{/* Badge */}
									<div className="absolute top-4 right-4">
										<span className={`px-3 py-1 text-xs font-semibold rounded-full ${option.badgeColor}`}>
											{option.badge}
										</span>
									</div>

									{/* Icon */}
									<div 
										className="w-16 h-16 rounded-xl flex items-center justify-center mb-6"
										style={{ backgroundColor: option.color }}
									>
										<option.icon className="w-8 h-8 text-white" />
									</div>

									{/* Content */}
									<BrandedH3 className="mb-3">
										{option.title}
									</BrandedH3>
									<BrandedP className="mb-6">
										{option.description}
									</BrandedP>

									{/* Benefits */}
									<div className="space-y-3">
										{option.benefits.map((benefit, index) => (
											<div key={index} className="flex items-center">
												<CheckCircle 
													className="w-5 h-5 mr-3 flex-shrink-0" 
													style={{ color: colors.success }}
												/>
												<span className="text-sm" style={{ color: colors.text.primary }}>
													{benefit}
												</span>
											</div>
										))}
									</div>

									{/* Action */}
									<div className="mt-8">
										{option.disabled ? (
											<BrandedButton
												variant="ghost"
												disabled
												className="w-full"
											>
												Coming Soon
											</BrandedButton>
										) : (
											<BrandedButton
												variant="primary"
												className="w-full"
												style={{ backgroundColor: option.color }}
											>
												Choose This Method
												<ArrowRight className="w-5 h-5 ml-2" />
											</BrandedButton>
										)}
									</div>
								</BrandedCard>
							))}
						</div>

						{/* Why Profile Completion Matters */}
						<BrandedCard variant="elevated" className="mt-16 p-8">
							<BrandedH3 className="mb-6 text-center">
								Why Complete Your Profile?
							</BrandedH3>
							<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
								<div className="text-center">
									<div 
										className="w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4"
										style={{ backgroundColor: colors.primary + '20' }}
									>
										<Target className="w-6 h-6" style={{ color: colors.primary }} />
									</div>
									<h4 className="font-semibold mb-2" style={{ color: colors.text.primary }}>
										Better Matches
									</h4>
									<BrandedP size="sm">
										Complete profiles get 5x more relevant job matches
									</BrandedP>
								</div>
								<div className="text-center">
									<div 
										className="w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4"
										style={{ backgroundColor: colors.success + '20' }}
									>
										<Eye className="w-6 h-6" style={{ color: colors.success }} />
									</div>
									<h4 className="font-semibold mb-2" style={{ color: colors.text.primary }}>
										Higher Visibility
									</h4>
									<BrandedP size="sm">
										Employers are 3x more likely to view complete profiles
									</BrandedP>
								</div>
								<div className="text-center">
									<div 
										className="w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4"
										style={{ backgroundColor: colors.secondary + '20' }}
									>
										<Star className="w-6 h-6" style={{ color: colors.secondary }} />
									</div>
									<h4 className="font-semibold mb-2" style={{ color: colors.text.primary }}>
										Premium Features
									</h4>
									<BrandedP size="sm">
										Access AI analytics and career insights
									</BrandedP>
								</div>
							</div>
						</BrandedCard>
					</div>
				)}

				{/* Step 2: Option-specific components */}
				{currentStep === 2 && selectedOption === 'cv' && (
					<CVUploadOption 
						onComplete={handleCompleteOnboarding}
						onBack={() => setCurrentStep(1)}
					/>
				)}

				{currentStep === 2 && selectedOption === 'linkedin' && (
					<LinkedInOption 
						onComplete={handleCompleteOnboarding}
						onBack={() => setCurrentStep(1)}
					/>
				)}

				{currentStep === 2 && selectedOption === 'manual' && (
					<ManualOption 
						onComplete={handleCompleteOnboarding}
						onBack={() => setCurrentStep(1)}
						onSkipWithReminder={handleSkipWithReminder}
					/>
				)}

				{/* CV Reminder Modal */}
				{showCVReminder && (
					<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
						<BrandedCard variant="elevated" className="max-w-md w-full mx-4 p-8">
							<div className="text-center">
								<AlertTriangle 
									className="w-16 h-16 mx-auto mb-4" 
									style={{ color: colors.warning }}
								/>
								<BrandedH3 className="mb-4">
									CV Required for Job Applications
								</BrandedH3>
								<BrandedP className="mb-6">
									While you can complete your profile manually, you'll need to upload your CV to apply for jobs and get hired by employers.
								</BrandedP>
								<div className="space-y-3">
									<BrandedButton
										variant="primary"
										onClick={() => {
											setShowCVReminder(false)
											setSelectedOption('cv')
										}}
										className="w-full"
									>
										Upload CV Now
									</BrandedButton>
									<BrandedButton
										variant="secondary"
										onClick={() => {
											setShowCVReminder(false)
											handleCompleteOnboarding()
										}}
										className="w-full"
									>
										Continue Anyway (CV Required Later)
									</BrandedButton>
								</div>
							</div>
						</BrandedCard>
					</div>
				)}
			</div>
		</div>
	)
}

export default ProfileOnboardingPage 