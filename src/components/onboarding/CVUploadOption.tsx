import { useState } from 'react'
import { useAppDispatch } from '../../store/hooks'
import { markOnboardingCompleted } from '../../store/slices/userSlice'
import { 
	Upload, 
	FileText, 
	CheckCircle, 
	ArrowLeft, 
	Zap, 
	Eye,
	AlertCircle,
	RefreshCw,
	Star,
	Download
} from 'lucide-react'
import { profileAPI } from '../../services/api'
import FileUpload from '../shared/FileUpload'
import { CVDataValidationModal } from './CVDataValidationModal'
import { useBrand, useBrandColors } from '../../brand'
import { BrandedH1, BrandedH2, BrandedH3, BrandedP } from '../brand/branded-typography'
import { BrandedCard } from '../brand/branded-card'
import { BrandedButton } from '../brand/branded-button/branded-button'

interface CVUploadOptionProps {
	onComplete: () => void
	onBack: () => void
}

interface ParsedData {
	firstName?: string
	lastName?: string
	email?: string
	phoneNumber?: string
	address?: string
	nationality?: string
	currentJobTitle?: string
	currentEmployer?: string
	totalYearsExperience?: number
	topSkills?: string
	languagesSpoken?: string
	portfolioWebsite?: string
	summary?: string
	workExperience?: Array<{
		jobTitle: string
		company: string
		duration?: string
		description: string
		startDate?: string
		endDate?: string
	}>
	education?: Array<{
		degree: string
		institution: string
		duration?: string
		graduationDate?: string
	}>
}

function CVUploadOption({ onComplete, onBack }: CVUploadOptionProps) {
	const dispatch = useAppDispatch()
	const [step, setStep] = useState<'upload' | 'parsing' | 'review' | 'saving'>('upload')
	const [uploadedFile, setUploadedFile] = useState<File | null>(null)
	const [parsedData, setParsedData] = useState<ParsedData | null>(null)
	const [editedData, setEditedData] = useState<ParsedData | null>(null)
	const [error, setError] = useState<string | null>(null)
	const [showValidationModal, setShowValidationModal] = useState(false)
	const [saving, setSaving] = useState(false)
	const [success, setSuccess] = useState(false)
	const [processingStep, setProcessingStep] = useState(0)
	const [currentProcessingMessage, setCurrentProcessingMessage] = useState('')
	const [processingSteps, setProcessingSteps] = useState([
		{ step: 'File Upload Complete', completed: false, inProgress: false },
		{ step: 'Text Extraction', completed: false, inProgress: false },
		{ step: 'AI Analysis with OpenAI', completed: false, inProgress: false },
		{ step: 'Skill Recognition', completed: false, inProgress: false },
		{ step: 'Experience Parsing', completed: false, inProgress: false },
		{ step: 'Profile Generation', completed: false, inProgress: false },
		{ step: 'Quality Validation', completed: false, inProgress: false }
	])

	const handleFileUpload = async (file: File) => {
		setUploadedFile(file)
		setStep('parsing')
		setError(null)
		setProcessingStep(0)

		// Reset processing steps
		const resetSteps = processingSteps.map(step => ({ 
			...step, 
			completed: false, 
			inProgress: false 
		}))
		setProcessingSteps(resetSteps)

		try {
			console.log('Starting CV parsing for file:', file.name, 'Size:', file.size, 'Type:', file.type)
			
			// Simulate realistic processing steps with timing
			await simulateProcessingSteps()
			
			const response = await profileAPI.parseCvWithAi(file)
			
			console.log('CV parsing response:', response)
			
			if (response.success && response.extractedData) {
				console.log('Extracted data:', response.extractedData)
				console.log('Work experience count:', response.extractedData.workExperience?.length || 0)
				console.log('Education count:', response.extractedData.education?.length || 0)
				console.log('Skills:', response.extractedData.topSkills)
				
				// Complete final step with celebration
				setCurrentProcessingMessage('🎉 Analysis complete! Preparing your profile...')
				await updateProcessingStep(6, true)
				
				setParsedData(response.extractedData)
				setEditedData(response.extractedData)
				
				// Celebration delay with success message
				setTimeout(() => {
					setCurrentProcessingMessage('✨ Profile ready for review!')
				}, 500)
				
				// Transition to review with a satisfying delay
				setTimeout(() => {
					setStep('review')
				}, 1500)
			} else {
				console.error('CV parsing failed:', response)
				throw new Error(response.message || 'CV parsing failed. Please check the backend logs for more details.')
			}
		} catch (error) {
			console.error('CV parsing error:', error)
			
			// More detailed error handling
			if (error instanceof Error) {
				if (error.message.includes('401')) {
					setError('Authentication failed. Please log in again.')
				} else if (error.message.includes('400')) {
					setError('Invalid CV file or bad request. Please try a different file format.')
				} else if (error.message.includes('500')) {
					setError('Server error during CV parsing. Please check if OpenAI is properly configured and try again.')
				} else {
					setError(`CV parsing failed: ${error.message}`)
				}
			} else {
				setError('An unexpected error occurred during CV parsing. Please try again.')
			}
			
			setStep('upload')
		}
	}

	const simulateProcessingSteps = async () => {
		const stepTimings = [
			{ delay: 500, message: 'File uploaded successfully ✅' },
			{ delay: 1200, message: 'Extracting text from document... 📄' },
			{ delay: 2500, message: 'Analyzing content with OpenAI GPT-4o-mini... 🤖' },
			{ delay: 1800, message: 'Identifying skills and technologies... 🔍' },
			{ delay: 1500, message: 'Processing work experience... 💼' },
			{ delay: 1200, message: 'Generating professional profile... ✨' }
		]

		for (let i = 0; i < stepTimings.length; i++) {
			setCurrentProcessingMessage(stepTimings[i].message)
			await new Promise(resolve => setTimeout(resolve, stepTimings[i].delay))
			await updateProcessingStep(i, true)
		}
		
		setCurrentProcessingMessage('Analysis complete! 🎉')
	}

	const updateProcessingStep = async (stepIndex: number, completed: boolean) => {
		setProcessingSteps(prev => prev.map((step, index) => {
			if (index === stepIndex) {
				return { ...step, completed, inProgress: !completed }
			} else if (index === stepIndex + 1 && completed) {
				return { ...step, inProgress: true }
			} else if (index < stepIndex) {
				return { ...step, completed: true, inProgress: false }
			}
			return step
		}))
		
		if (completed) {
			setProcessingStep(stepIndex + 1)
		}
	}

	const handleDataEdit = (field: string, value: any) => {
		if (editedData) {
			setEditedData({
				...editedData,
				[field]: value
			})
		}
	}

	const handleSaveProfile = async () => {
		if (!editedData) return

		// Instead of directly saving, open validation modal
		setShowValidationModal(true)
	}

	const handleValidationComplete = async (validatedData: any) => {
		setSaving(true)
		setStep('saving')
		try {
			console.log('Saving validated profile data:', validatedData)
			const response = await profileAPI.updateProfileFromExtracted(validatedData)
			
			if (response.success) {
				setSuccess(true)
				setShowValidationModal(false)
				
				try {
					// Mark onboarding as completed
					await dispatch(markOnboardingCompleted()).unwrap()
					console.log('Onboarding marked as completed successfully')
				} catch (error) {
					console.error('Failed to mark onboarding as completed:', error)
					// Continue even if marking onboarding fails
				}
				
				setTimeout(() => {
					onComplete()
				}, 2000)
			} else {
				console.error('Save profile failed:', response)
				setError(`Failed to save profile: ${response.message || 'Unknown error'}`)
				if (response.errors && response.errors.length > 0) {
					console.error('Save errors:', response.errors)
					setError(`Failed to save profile: ${response.errors.join(', ')}`)
				}
				setShowValidationModal(false)
				setStep('review')
			}
		} catch (error) {
			console.error('Error saving profile:', error)
			if (error instanceof Error) {
				setError(`Failed to save profile: ${error.message}`)
			} else {
				setError('Failed to save profile. Please try again.')
			}
			setShowValidationModal(false)
			setStep('review')
		} finally {
			setSaving(false)
		}
	}

	const ParsingStep = () => {
		const colors = useBrandColors()
		
		return (
			<div className="max-w-2xl mx-auto text-center">
				<div className="mb-8">
					<div 
						className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse"
						style={{ backgroundColor: colors.primary + '20' }}
					>
						<RefreshCw 
							className="w-10 h-10 animate-spin" 
							style={{ color: colors.primary }}
						/>
					</div>
					<BrandedH2 className="mb-4">
						AI Processing Your CV
					</BrandedH2>
					<BrandedP size="lg" className="mb-6">
						Our OpenAI-powered system is extracting your professional information with advanced accuracy...
					</BrandedP>
					
					{/* Current Processing Message */}
					{currentProcessingMessage && (
						<div className="mb-6 p-4 rounded-lg relative overflow-hidden" style={{ backgroundColor: colors.primary + '10' }}>
							<BrandedP className="font-medium animate-pulse relative z-10" style={{ color: colors.primary }}>
								{currentProcessingMessage}
							</BrandedP>
							{/* Add sparkle effect when complete */}
							{currentProcessingMessage.includes('🎉') && (
								<div className="absolute inset-0 opacity-20">
									<div className="animate-ping absolute top-2 left-4 w-2 h-2 bg-yellow-400 rounded-full" />
									<div className="animate-ping absolute top-4 right-6 w-1 h-1 bg-blue-400 rounded-full" style={{ animationDelay: '0.5s' }} />
									<div className="animate-ping absolute bottom-3 left-8 w-1.5 h-1.5 bg-green-400 rounded-full" style={{ animationDelay: '1s' }} />
									<div className="animate-ping absolute bottom-2 right-4 w-1 h-1 bg-purple-400 rounded-full" style={{ animationDelay: '1.5s' }} />
								</div>
							)}
						</div>
					)}
					
					{/* Processing Steps */}
					<BrandedCard variant="elevated" className="p-6">
						<div className="space-y-4">
							{processingSteps.map((item, index) => (
								<div key={index} className="flex items-center transition-all duration-300">
									<div className="relative mr-4">
										{item.inProgress ? (
											<div 
												className="w-4 h-4 rounded-full border-2 border-t-transparent animate-spin"
												style={{ borderColor: colors.primary }}
											/>
										) : (
											<div 
												className={`w-4 h-4 rounded-full transition-all duration-300 ${
													item.completed ? 'scale-110' : ''
												}`}
												style={{
													backgroundColor: item.completed ? colors.success : colors.border
												}}
											/>
										)}
									</div>
									<span 
										className={`flex-1 text-left transition-all duration-300 ${
											item.completed ? 'font-medium' : ''
										}`}
										style={{
											color: item.completed ? colors.success : 
												   item.inProgress ? colors.primary : 
												   colors.text.secondary
										}}
									>
										{item.step}
										{item.completed && <CheckCircle className="w-4 h-4 inline ml-2 animate-bounce" />}
										{item.inProgress && <span className="ml-2 text-sm animate-pulse">(Processing...)</span>}
									</span>
								</div>
							))}
						</div>
						
						{/* Progress Bar */}
						<div className="mt-6">
							<div className="flex justify-between text-sm mb-2">
								<span style={{ color: colors.text.secondary }}>Processing Progress</span>
								<span style={{ color: colors.primary }} className="font-semibold">
									{Math.round((processingStep / processingSteps.length) * 100)}%
								</span>
							</div>
							<div 
								className="w-full bg-gray-200 rounded-full h-2 overflow-hidden"
								style={{ backgroundColor: colors.surface }}
							>
								<div 
									className="h-2 rounded-full transition-all duration-700 ease-out relative"
									style={{ 
										backgroundColor: colors.primary,
										width: `${(processingStep / processingSteps.length) * 100}%`
									}}
								>
									<div className="absolute inset-0 bg-white opacity-30 animate-pulse" />
								</div>
							</div>
						</div>

						{/* AI Processing Info */}
						<div className="mt-6 p-4 rounded-lg border" style={{ 
							backgroundColor: colors.surface,
							borderColor: colors.primary + '20'
						}}>
							<BrandedP size="sm" className="text-center">
								🤖 <strong>AI-Powered Analysis</strong><br/>
								Using GPT-4o-mini for intelligent data extraction<br/>
								<span style={{ color: colors.text.secondary }}>
									Typically 8-12 seconds for comprehensive analysis
								</span>
							</BrandedP>
						</div>
					</BrandedCard>
				</div>
			</div>
		)
	}

	const ReviewStep = () => {
		const colors = useBrandColors()
		
		return (
			<div className="max-w-6xl mx-auto">
				{/* AI Processing Success Banner */}
				<BrandedCard variant="elevated" className="mb-8 p-6 border-l-4" style={{ borderLeftColor: colors.success }}>
					<div className="flex items-start justify-between">
						<div className="flex items-start space-x-4">
							<div 
								className="w-12 h-12 rounded-full flex items-center justify-center"
								style={{ backgroundColor: colors.success + '20' }}
							>
								<CheckCircle className="w-6 h-6" style={{ color: colors.success }} />
							</div>
							<div className="flex-1">
								<BrandedH3 className="mb-2" style={{ color: colors.success }}>
									✨ AI Analysis Complete!
								</BrandedH3>
								<BrandedP className="mb-3">
									Your CV has been successfully analyzed using <strong>OpenAI GPT-4o-mini</strong> with advanced accuracy.
								</BrandedP>
								<div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
									<div className="flex items-center">
										<Star className="w-4 h-4 mr-2" style={{ color: colors.warning }} />
										<span style={{ color: colors.text.secondary }}>
											<strong>7 Processing Steps</strong> Completed
										</span>
									</div>
									<div className="flex items-center">
										<Zap className="w-4 h-4 mr-2" style={{ color: colors.primary }} />
										<span style={{ color: colors.text.secondary }}>
											<strong>90%+ Accuracy</strong> Achieved
										</span>
									</div>
									<div className="flex items-center">
										<Eye className="w-4 h-4 mr-2" style={{ color: colors.secondary }} />
										<span style={{ color: colors.text.secondary }}>
											<strong>Professional Quality</strong> Extracted
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</BrandedCard>

				<div className="text-center mb-8">
					<div 
						className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
						style={{ backgroundColor: colors.success + '20' }}
					>
						<CheckCircle className="w-8 h-8" style={{ color: colors.success }} />
					</div>
					<BrandedH2 className="mb-4">
						Review & Edit Your Profile
					</BrandedH2>
					<BrandedP size="lg">
						Our AI has extracted your information with advanced accuracy. Review and edit as needed before publishing.
					</BrandedP>
				</div>

				{error && (
					<BrandedCard variant="surface" className="border-l-4 p-4 mb-6" style={{ borderLeftColor: colors.error }}>
						<div className="flex items-center">
							<AlertCircle className="w-5 h-5 mr-3" style={{ color: colors.error }} />
							<span style={{ color: colors.error }}>{error}</span>
						</div>
					</BrandedCard>
				)}

				<div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
					{/* Personal Information */}
					<BrandedCard variant="elevated" className="p-6">
						<BrandedH3 className="mb-4 flex items-center">
							<Zap className="w-5 h-5 mr-2" style={{ color: colors.primary }} />
							Personal Information
						</BrandedH3>
						<div className="space-y-4">
							<div className="grid grid-cols-2 gap-4">
								<div>
									<label className="block text-sm font-medium mb-1" style={{ color: colors.text.primary }}>
										First Name
									</label>
									<input
										type="text"
										value={editedData?.firstName || ''}
										onChange={(e) => handleDataEdit('firstName', e.target.value)}
										className="w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2"
										style={{
											borderColor: colors.border,
											border: `1px solid ${colors.border}`,
											backgroundColor: colors.surface,
											color: colors.text.primary
										}}
										onFocus={(e) => e.target.style.borderColor = colors.primary}
										onBlur={(e) => e.target.style.borderColor = colors.border}
										placeholder="Enter first name"
									/>
								</div>
								<div>
									<label className="block text-sm font-medium mb-1" style={{ color: colors.text.primary }}>
										Last Name
									</label>
									<input
										type="text"
										value={editedData?.lastName || ''}
										onChange={(e) => handleDataEdit('lastName', e.target.value)}
										className="w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2"
										style={{
											borderColor: colors.border,
											border: `1px solid ${colors.border}`,
											backgroundColor: colors.surface,
											color: colors.text.primary
										}}
										onFocus={(e) => e.target.style.borderColor = colors.primary}
										onBlur={(e) => e.target.style.borderColor = colors.border}
										placeholder="Enter last name"
									/>
								</div>
							</div>
							<div>
								<label className="block text-sm font-medium mb-1" style={{ color: colors.text.primary }}>
									Email Address
								</label>
								<input
									type="email"
									value={editedData?.email || ''}
									onChange={(e) => handleDataEdit('email', e.target.value)}
									className="w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2"
									style={{
										borderColor: colors.border,
										border: `1px solid ${colors.border}`,
										backgroundColor: colors.surface,
										color: colors.text.primary
									}}
									onFocus={(e) => e.target.style.borderColor = colors.primary}
									onBlur={(e) => e.target.style.borderColor = colors.border}
									placeholder="your.email@example.com"
								/>
							</div>
							<div>
								<label className="block text-sm font-medium mb-1" style={{ color: colors.text.primary }}>
									Phone Number
								</label>
								<input
									type="tel"
									value={editedData?.phoneNumber || ''}
									onChange={(e) => handleDataEdit('phoneNumber', e.target.value)}
									className="w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2"
									style={{
										borderColor: colors.border,
										border: `1px solid ${colors.border}`,
										backgroundColor: colors.surface,
										color: colors.text.primary
									}}
									onFocus={(e) => e.target.style.borderColor = colors.primary}
									onBlur={(e) => e.target.style.borderColor = colors.border}
									placeholder="+1 (555) 123-4567"
								/>
							</div>
							<div>
								<label className="block text-sm font-medium mb-1" style={{ color: colors.text.primary }}>
									Address
								</label>
								<input
									type="text"
									value={editedData?.address || ''}
									onChange={(e) => handleDataEdit('address', e.target.value)}
									className="w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2"
									style={{
										borderColor: colors.border,
										border: `1px solid ${colors.border}`,
										backgroundColor: colors.surface,
										color: colors.text.primary
									}}
									onFocus={(e) => e.target.style.borderColor = colors.primary}
									onBlur={(e) => e.target.style.borderColor = colors.border}
									placeholder="City, State/Province, Country"
								/>
							</div>
							<div>
								<label className="block text-sm font-medium mb-1" style={{ color: colors.text.primary }}>
									Nationality
								</label>
								<input
									type="text"
									value={editedData?.nationality || ''}
									onChange={(e) => handleDataEdit('nationality', e.target.value)}
									className="w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2"
									style={{
										borderColor: colors.border,
										border: `1px solid ${colors.border}`,
										backgroundColor: colors.surface,
										color: colors.text.primary
									}}
									onFocus={(e) => e.target.style.borderColor = colors.primary}
									onBlur={(e) => e.target.style.borderColor = colors.border}
									placeholder="Your nationality"
								/>
							</div>
						</div>
					</BrandedCard>

					{/* Professional Information */}
					<BrandedCard variant="elevated" className="p-6">
						<BrandedH3 className="mb-4 flex items-center">
							<Star className="w-5 h-5 mr-2" style={{ color: colors.secondary }} />
							Professional Information
						</BrandedH3>
						<div className="space-y-4">
							<div>
								<label className="block text-sm font-medium mb-1" style={{ color: colors.text.primary }}>
									Current Job Title
								</label>
								<input
									type="text"
									value={editedData?.currentJobTitle || ''}
									onChange={(e) => handleDataEdit('currentJobTitle', e.target.value)}
									className="w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2"
									style={{
										borderColor: colors.border,
										border: `1px solid ${colors.border}`,
										backgroundColor: colors.surface,
										color: colors.text.primary
									}}
									onFocus={(e) => e.target.style.borderColor = colors.primary}
									onBlur={(e) => e.target.style.borderColor = colors.border}
									placeholder="Senior Software Engineer"
								/>
							</div>
							<div>
								<label className="block text-sm font-medium mb-1" style={{ color: colors.text.primary }}>
									Current Employer
								</label>
								<input
									type="text"
									value={editedData?.currentEmployer || ''}
									onChange={(e) => handleDataEdit('currentEmployer', e.target.value)}
									className="w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2"
									style={{
										borderColor: colors.border,
										border: `1px solid ${colors.border}`,
										backgroundColor: colors.surface,
										color: colors.text.primary
									}}
									onFocus={(e) => e.target.style.borderColor = colors.primary}
									onBlur={(e) => e.target.style.borderColor = colors.border}
									placeholder="Company Name"
								/>
							</div>
							<div>
								<label className="block text-sm font-medium mb-1" style={{ color: colors.text.primary }}>
									Total Years of Experience
								</label>
								<input
									type="number"
									value={editedData?.totalYearsExperience || 0}
									onChange={(e) => handleDataEdit('totalYearsExperience', parseInt(e.target.value) || 0)}
									className="w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2"
									style={{
										borderColor: colors.border,
										border: `1px solid ${colors.border}`,
										backgroundColor: colors.surface,
										color: colors.text.primary
									}}
									onFocus={(e) => e.target.style.borderColor = colors.primary}
									onBlur={(e) => e.target.style.borderColor = colors.border}
									placeholder="5"
								/>
							</div>
							<div>
								<label className="block text-sm font-medium mb-1" style={{ color: colors.text.primary }}>
									Languages Spoken
								</label>
								<input
									type="text"
									value={editedData?.languagesSpoken || ''}
									onChange={(e) => handleDataEdit('languagesSpoken', e.target.value)}
									className="w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2"
									style={{
										borderColor: colors.border,
										border: `1px solid ${colors.border}`,
										backgroundColor: colors.surface,
										color: colors.text.primary
									}}
									onFocus={(e) => e.target.style.borderColor = colors.primary}
									onBlur={(e) => e.target.style.borderColor = colors.border}
									placeholder="English, Spanish, French"
								/>
							</div>
							<div>
								<label className="block text-sm font-medium mb-1" style={{ color: colors.text.primary }}>
									Portfolio Website
								</label>
								<input
									type="url"
									value={editedData?.portfolioWebsite || ''}
									onChange={(e) => handleDataEdit('portfolioWebsite', e.target.value)}
									className="w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2"
									style={{
										borderColor: colors.border,
										border: `1px solid ${colors.border}`,
										backgroundColor: colors.surface,
										color: colors.text.primary
									}}
									onFocus={(e) => e.target.style.borderColor = colors.primary}
									onBlur={(e) => e.target.style.borderColor = colors.border}
									placeholder="https://yourportfolio.com"
								/>
							</div>
						</div>
					</BrandedCard>

					{/* Skills Section */}
					<BrandedCard variant="elevated" className="p-6">
						<BrandedH3 className="mb-4 flex items-center">
							<Star className="w-5 h-5 mr-2" style={{ color: colors.secondary }} />
							Top Skills
						</BrandedH3>
						<div>
							<label className="block text-sm font-medium mb-1" style={{ color: colors.text.primary }}>
								Technical Skills & Competencies
							</label>
							<textarea
								value={editedData?.topSkills || ''}
								onChange={(e) => handleDataEdit('topSkills', e.target.value)}
								rows={4}
								className="w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2"
								style={{
									borderColor: colors.border,
									border: `1px solid ${colors.border}`,
									backgroundColor: colors.surface,
									color: colors.text.primary
								}}
								onFocus={(e) => e.target.style.borderColor = colors.primary}
								onBlur={(e) => e.target.style.borderColor = colors.border}
								placeholder="JavaScript, React, Node.js, Python, AWS, Docker..."
							/>
							<p className="text-sm text-gray-500 mt-1">
								List your technical skills, programming languages, frameworks, and tools
							</p>
						</div>
					</BrandedCard>

					{/* Professional Summary */}
					<BrandedCard variant="elevated" className="p-6">
						<BrandedH3 className="mb-4 flex items-center">
							<Eye className="w-5 h-5 mr-2" style={{ color: colors.secondary }} />
							Professional Summary
						</BrandedH3>
						<div>
							<label className="block text-sm font-medium mb-1" style={{ color: colors.text.primary }}>
								AI-Generated Summary
							</label>
							<textarea
								value={editedData?.summary || ''}
								onChange={(e) => handleDataEdit('summary', e.target.value)}
								rows={4}
								className="w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2"
								style={{
									borderColor: colors.border,
									border: `1px solid ${colors.border}`,
									backgroundColor: colors.surface,
									color: colors.text.primary
								}}
								onFocus={(e) => e.target.style.borderColor = colors.primary}
								onBlur={(e) => e.target.style.borderColor = colors.border}
								placeholder="AI will generate a compelling professional summary based on your experience..."
							/>
							<p className="text-sm text-gray-500 mt-1">
								This summary will be visible to potential employers
							</p>
						</div>
					</BrandedCard>
				</div>

				{/* Work Experience Section */}
				<div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
					<h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
						<Star className="w-5 h-5 text-blue-600 mr-2" />
						Work Experience ({editedData?.workExperience?.length || 0} positions extracted)
					</h3>
					
					{editedData?.workExperience && editedData.workExperience.length > 0 ? (
						<div className="space-y-6">
							{editedData.workExperience.map((exp, index) => (
								<div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
									<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
										<div>
											<label className="block text-sm font-medium text-gray-700 mb-1">
												Job Title
											</label>
											<input
												type="text"
												value={exp.jobTitle || ''}
												onChange={(e) => {
													const updated = [...(editedData.workExperience || [])]
													updated[index] = { ...updated[index], jobTitle: e.target.value }
													handleDataEdit('workExperience', updated)
												}}
												className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
												placeholder="Software Engineer"
											/>
										</div>
										<div>
											<label className="block text-sm font-medium text-gray-700 mb-1">
												Company
											</label>
											<input
												type="text"
												value={exp.company || ''}
												onChange={(e) => {
													const updated = [...(editedData.workExperience || [])]
													updated[index] = { ...updated[index], company: e.target.value }
													handleDataEdit('workExperience', updated)
												}}
												className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
												placeholder="Company Name"
											/>
										</div>
									</div>
									<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
										<div>
											<label className="block text-sm font-medium text-gray-700 mb-1">
												Duration
											</label>
											<input
												type="text"
												value={exp.duration || ''}
												onChange={(e) => {
													const updated = [...(editedData.workExperience || [])]
													updated[index] = { ...updated[index], duration: e.target.value }
													handleDataEdit('workExperience', updated)
												}}
												className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
												placeholder="2020 - Present"
											/>
										</div>
										<div>
											<label className="block text-sm font-medium text-gray-700 mb-1">
												Start Date
											</label>
											<input
												type="text"
												value={exp.startDate || ''}
												onChange={(e) => {
													const updated = [...(editedData.workExperience || [])]
													updated[index] = { ...updated[index], startDate: e.target.value }
													handleDataEdit('workExperience', updated)
												}}
												className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
												placeholder="January 2020"
											/>
										</div>
										<div>
											<label className="block text-sm font-medium text-gray-700 mb-1">
												End Date
											</label>
											<input
												type="text"
												value={exp.endDate || ''}
												onChange={(e) => {
													const updated = [...(editedData.workExperience || [])]
													updated[index] = { ...updated[index], endDate: e.target.value }
													handleDataEdit('workExperience', updated)
												}}
												className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
												placeholder="Present"
											/>
										</div>
									</div>
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-1">
											Job Description
										</label>
										<textarea
											value={exp.description || ''}
											onChange={(e) => {
												const updated = [...(editedData.workExperience || [])]
												updated[index] = { ...updated[index], description: e.target.value }
												handleDataEdit('workExperience', updated)
											}}
											rows={3}
											className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
											placeholder="Describe your responsibilities and achievements..."
										/>
									</div>
								</div>
							))}
						</div>
					) : (
						<div className="text-center py-8 text-gray-500">
							<FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
							<p className="text-lg">No work experience extracted</p>
							<p className="text-sm">AI will attempt to extract work history from your CV</p>
						</div>
					)}
				</div>

				{/* Education Section */}
				<div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
					<h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
						<Star className="w-5 h-5 text-green-600 mr-2" />
						Education ({editedData?.education?.length || 0} entries extracted)
					</h3>
					
					{editedData?.education && editedData.education.length > 0 ? (
						<div className="space-y-6">
							{editedData.education.map((edu, index) => (
								<div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
									<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
										<div>
											<label className="block text-sm font-medium text-gray-700 mb-1">
												Degree
											</label>
											<input
												type="text"
												value={edu.degree || ''}
												onChange={(e) => {
													const updated = [...(editedData.education || [])]
													updated[index] = { ...updated[index], degree: e.target.value }
													handleDataEdit('education', updated)
												}}
												className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
												placeholder="Bachelor of Science in Computer Science"
											/>
										</div>
										<div>
											<label className="block text-sm font-medium text-gray-700 mb-1">
												Institution
											</label>
											<input
												type="text"
												value={edu.institution || ''}
												onChange={(e) => {
													const updated = [...(editedData.education || [])]
													updated[index] = { ...updated[index], institution: e.target.value }
													handleDataEdit('education', updated)
												}}
												className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
												placeholder="University Name"
											/>
										</div>
									</div>
									<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
										<div>
											<label className="block text-sm font-medium text-gray-700 mb-1">
												Duration
											</label>
											<input
												type="text"
												value={edu.duration || ''}
												onChange={(e) => {
													const updated = [...(editedData.education || [])]
													updated[index] = { ...updated[index], duration: e.target.value }
													handleDataEdit('education', updated)
												}}
												className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
												placeholder="2016 - 2020"
											/>
										</div>
										<div>
											<label className="block text-sm font-medium text-gray-700 mb-1">
												Graduation Date
											</label>
											<input
												type="text"
												value={edu.graduationDate || ''}
												onChange={(e) => {
													const updated = [...(editedData.education || [])]
													updated[index] = { ...updated[index], graduationDate: e.target.value }
													handleDataEdit('education', updated)
												}}
												className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
												placeholder="May 2020"
											/>
										</div>
									</div>
								</div>
							))}
						</div>
					) : (
						<div className="text-center py-8 text-gray-500">
							<FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
							<p className="text-lg">No education data extracted</p>
							<p className="text-sm">AI will attempt to extract educational background from your CV</p>
						</div>
					)}
				</div>

				{/* Extracted Raw Data (for debugging) */}
				{parsedData && (
					<div className="mt-8 bg-gray-50 rounded-lg p-6 border border-gray-200">
						<details className="cursor-pointer">
							<summary className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
								<Eye className="w-5 h-5 text-gray-600 mr-2" />
								View Raw Extracted Data (Debug Information)
							</summary>
							<div className="mt-4 bg-white rounded p-4 border border-gray-300">
								<pre className="text-sm text-gray-700 overflow-auto max-h-60">
									{JSON.stringify(parsedData, null, 2)}
								</pre>
							</div>
						</details>
					</div>
				)}

				{/* Action Buttons */}
				<div className="mt-8 flex justify-between">
					<button
						onClick={onBack}
						className="flex items-center px-6 py-3 text-gray-600 hover:text-gray-800"
					>
						<ArrowLeft className="w-5 h-5 mr-2" />
						Back to Options
					</button>
					<button
						onClick={handleSaveProfile}
						className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 flex items-center"
					>
						Save & Complete Profile
						<CheckCircle className="w-5 h-5 ml-2" />
					</button>
				</div>
			</div>
		)
	}

	const SavingStep = () => (
		<div className="max-w-2xl mx-auto text-center">
			<div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
				<RefreshCw className="w-10 h-10 text-green-600 animate-spin" />
			</div>
			<h2 className="text-3xl font-bold text-gray-900 mb-4">
				Saving Your Profile
			</h2>
			<p className="text-lg text-gray-600">
				We're creating your professional profile...
			</p>
		</div>
	)

	return (
		<div className="space-y-8">
			{step === 'upload' && (
				<div className="max-w-2xl mx-auto">
					<div className="text-center mb-8">
						<div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
							<Upload className="w-8 h-8 text-blue-600" />
						</div>
						<h2 className="text-3xl font-bold text-gray-900 mb-4">
							Upload Your CV/Resume
						</h2>
						<p className="text-lg text-gray-600">
							Our AI will extract your professional information with advanced accuracy
						</p>
					</div>

					{error && (
						<div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6 flex items-center">
							<AlertCircle className="w-5 h-5 mr-2" />
							{error}
						</div>
					)}

					<FileUpload
						accept=".pdf,.doc,.docx,.txt"
						maxSize={10}
						enableParsing={true}
						onFileUpload={(files) => {
							if (files.length > 0) {
								handleFileUpload(files[0].file)
							}
						}}
						description="Drag and drop your CV here for AI-powered parsing with advanced accuracy, or click to browse"
						className="mb-8"
					/>

					{/* Supported Formats */}
					<div className="bg-gray-50 rounded-lg p-6">
						<h3 className="font-semibold text-gray-900 mb-3">Supported Formats</h3>
						<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
							{[
								{ ext: 'PDF', desc: 'Adobe PDF' },
								{ ext: 'DOC', desc: 'Word Document' },
								{ ext: 'DOCX', desc: 'Word Document' },
								{ ext: 'TXT', desc: 'Plain Text' }
							].map((format) => (
								<div key={format.ext} className="flex items-center">
									<FileText className="w-5 h-5 text-blue-600 mr-2" />
									<div>
										<p className="font-medium text-gray-900">{format.ext}</p>
										<p className="text-sm text-gray-500">{format.desc}</p>
									</div>
								</div>
							))}
						</div>
					</div>

					<div className="mt-8 flex justify-center">
						<button
							onClick={onBack}
							className="flex items-center px-6 py-3 text-gray-600 hover:text-gray-800"
						>
							<ArrowLeft className="w-5 h-5 mr-2" />
							Back to Options
						</button>
					</div>
				</div>
			)}

			{step === 'parsing' && <ParsingStep />}
			{step === 'review' && <ReviewStep />}
			{step === 'saving' && <SavingStep />}

			{/* Validation Modal */}
			<CVDataValidationModal
				isOpen={showValidationModal}
				onClose={() => setShowValidationModal(false)}
				onComplete={handleValidationComplete}
				extractedData={editedData}
			/>
		</div>
	)
}

export default CVUploadOption 