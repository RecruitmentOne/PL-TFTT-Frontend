import { useState } from 'react'
import { useAppDispatch } from '../../store/hooks'
import { markOnboardingCompleted } from '../../store/slices/userSlice'
import { 
	User, 
	ArrowLeft, 
	CheckCircle, 
	AlertTriangle,
	Plus,
	X,
	Briefcase,
	GraduationCap,
	Star,
	MapPin,
	Mail,
	Phone
} from 'lucide-react'
import { profileAPI } from '../../services/api'

interface ManualOptionProps {
	onComplete: () => void
	onBack: () => void
	onSkipWithReminder: () => void
}

interface FormData {
	firstName: string
	lastName: string
	email: string
	phone: string
	location: string
	bio: string
	skills: string[]
	experience: Array<{
		title: string
		company: string
		startDate: string
		endDate: string
		current: boolean
		description: string
	}>
	education: Array<{
		degree: string
		institution: string
		startDate: string
		endDate: string
		current: boolean
	}>
}

function ManualOption({ onComplete, onBack, onSkipWithReminder }: ManualOptionProps) {
	const dispatch = useAppDispatch()
	const [step, setStep] = useState<'personal' | 'experience' | 'education' | 'skills' | 'review' | 'saving'>('personal')
	const [formData, setFormData] = useState<FormData>({
		firstName: '',
		lastName: '',
		email: '',
		phone: '',
		location: '',
		bio: '',
		skills: [],
		experience: [],
		education: []
	})
	const [currentSkill, setCurrentSkill] = useState('')
	const [error, setError] = useState<string | null>(null)
	const [showCVReminder, setShowCVReminder] = useState(false)

	const handleInputChange = (field: keyof FormData, value: any) => {
		setFormData(prev => ({
			...prev,
			[field]: value
		}))
	}

	const addSkill = () => {
		if (currentSkill.trim() && !formData.skills.includes(currentSkill.trim())) {
			setFormData(prev => ({
				...prev,
				skills: [...prev.skills, currentSkill.trim()]
			}))
			setCurrentSkill('')
		}
	}

	const removeSkill = (skillToRemove: string) => {
		setFormData(prev => ({
			...prev,
			skills: prev.skills.filter(skill => skill !== skillToRemove)
		}))
	}

	const addExperience = () => {
		setFormData(prev => ({
			...prev,
			experience: [...prev.experience, {
				title: '',
				company: '',
				startDate: '',
				endDate: '',
				current: false,
				description: ''
			}]
		}))
	}

	const updateExperience = (index: number, field: string, value: any) => {
		setFormData(prev => ({
			...prev,
			experience: prev.experience.map((exp, i) => 
				i === index ? { ...exp, [field]: value } : exp
			)
		}))
	}

	const removeExperience = (index: number) => {
		setFormData(prev => ({
			...prev,
			experience: prev.experience.filter((_, i) => i !== index)
		}))
	}

	const addEducation = () => {
		setFormData(prev => ({
			...prev,
			education: [...prev.education, {
				degree: '',
				institution: '',
				startDate: '',
				endDate: '',
				current: false
			}]
		}))
	}

	const updateEducation = (index: number, field: string, value: any) => {
		setFormData(prev => ({
			...prev,
			education: prev.education.map((edu, i) => 
				i === index ? { ...edu, [field]: value } : edu
			)
		}))
	}

	const removeEducation = (index: number) => {
		setFormData(prev => ({
			...prev,
			education: prev.education.filter((_, i) => i !== index)
		}))
	}

	const handleNext = () => {
		const steps = ['personal', 'experience', 'education', 'skills', 'review']
		const currentIndex = steps.indexOf(step)
		if (currentIndex < steps.length - 1) {
			setStep(steps[currentIndex + 1] as any)
		}
	}

	const handlePrevious = () => {
		const steps = ['personal', 'experience', 'education', 'skills', 'review']
		const currentIndex = steps.indexOf(step)
		if (currentIndex > 0) {
			setStep(steps[currentIndex - 1] as any)
		}
	}

	const handleSaveProfile = async () => {
		setStep('saving')
		try {
			await profileAPI.updateProfile(formData)
			// Show CV reminder since manual profile doesn't include CV
			setShowCVReminder(true)
		} catch (error) {
			console.error('Failed to save profile:', error)
			setError('Failed to save profile. Please try again.')
			setStep('review')
		}
	}

	const handleSkipCV = async () => {
		setShowCVReminder(false)
		
		try {
			// Mark onboarding as completed even if CV is skipped
			await dispatch(markOnboardingCompleted()).unwrap()
			console.log('Onboarding marked as completed successfully')
		} catch (error) {
			console.error('Failed to mark onboarding as completed:', error)
			// Continue even if marking onboarding fails
		}
		
		onComplete()
	}

	const getProgressPercentage = () => {
		const steps = ['personal', 'experience', 'education', 'skills', 'review']
		const currentIndex = steps.indexOf(step)
		return ((currentIndex + 1) / steps.length) * 100
	}

	const PersonalStep = () => (
		<div className="max-w-2xl mx-auto">
			<h3 className="text-2xl font-bold text-gray-900 mb-6">Personal Information</h3>
			<div className="space-y-4">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							First Name *
						</label>
						<input
							type="text"
							value={formData.firstName}
							onChange={(e) => handleInputChange('firstName', e.target.value)}
							className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							required
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							Last Name *
						</label>
						<input
							type="text"
							value={formData.lastName}
							onChange={(e) => handleInputChange('lastName', e.target.value)}
							className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							required
						/>
					</div>
				</div>
				
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-1">
						Email *
					</label>
					<input
						type="email"
						value={formData.email}
						onChange={(e) => handleInputChange('email', e.target.value)}
						className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
						required
					/>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							Phone
						</label>
						<input
							type="tel"
							value={formData.phone}
							onChange={(e) => handleInputChange('phone', e.target.value)}
							className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							Location
						</label>
						<input
							type="text"
							value={formData.location}
							onChange={(e) => handleInputChange('location', e.target.value)}
							className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							placeholder="City, Country"
						/>
					</div>
				</div>

				<div>
					<label className="block text-sm font-medium text-gray-700 mb-1">
						Professional Bio
					</label>
					<textarea
						value={formData.bio}
						onChange={(e) => handleInputChange('bio', e.target.value)}
						rows={4}
						className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
						placeholder="Tell us about your professional background and career goals..."
					/>
				</div>
			</div>
		</div>
	)

	const ExperienceStep = () => (
		<div className="max-w-2xl mx-auto">
			<div className="flex justify-between items-center mb-6">
				<h3 className="text-2xl font-bold text-gray-900">Work Experience</h3>
				<button
					onClick={addExperience}
					className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center"
				>
					<Plus className="w-4 h-4 mr-2" />
					Add Experience
				</button>
			</div>

			{formData.experience.length === 0 ? (
				<div className="text-center py-8 bg-gray-50 rounded-lg">
					<Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
					<p className="text-gray-600">No work experience added yet</p>
					<button
						onClick={addExperience}
						className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
					>
						Add your first experience
					</button>
				</div>
			) : (
				<div className="space-y-6">
					{formData.experience.map((exp, index) => (
						<div key={index} className="bg-white border border-gray-200 rounded-lg p-6">
							<div className="flex justify-between items-start mb-4">
								<h4 className="font-semibold text-gray-900">Experience #{index + 1}</h4>
								<button
									onClick={() => removeExperience(index)}
									className="text-red-600 hover:text-red-700"
								>
									<X className="w-4 h-4" />
								</button>
							</div>
							
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1">
										Job Title *
									</label>
									<input
										type="text"
										value={exp.title}
										onChange={(e) => updateExperience(index, 'title', e.target.value)}
										className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
									/>
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1">
										Company *
									</label>
									<input
										type="text"
										value={exp.company}
										onChange={(e) => updateExperience(index, 'company', e.target.value)}
										className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
									/>
								</div>
							</div>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1">
										Start Date
									</label>
									<input
										type="month"
										value={exp.startDate}
										onChange={(e) => updateExperience(index, 'startDate', e.target.value)}
										className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
									/>
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1">
										End Date
									</label>
									<input
										type="month"
										value={exp.endDate}
										onChange={(e) => updateExperience(index, 'endDate', e.target.value)}
										disabled={exp.current}
										className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
									/>
								</div>
							</div>

							<div className="mb-4">
								<label className="flex items-center">
									<input
										type="checkbox"
										checked={exp.current}
										onChange={(e) => updateExperience(index, 'current', e.target.checked)}
										className="mr-2"
									/>
									<span className="text-sm text-gray-700">I currently work here</span>
								</label>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">
									Description
								</label>
								<textarea
									value={exp.description}
									onChange={(e) => updateExperience(index, 'description', e.target.value)}
									rows={3}
									className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
									placeholder="Describe your role and achievements..."
								/>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	)

	const SkillsStep = () => (
		<div className="max-w-2xl mx-auto">
			<h3 className="text-2xl font-bold text-gray-900 mb-6">Skills</h3>
			
			<div className="mb-6">
				<label className="block text-sm font-medium text-gray-700 mb-2">
					Add Skills
				</label>
				<div className="flex gap-2">
					<input
						type="text"
						value={currentSkill}
						onChange={(e) => setCurrentSkill(e.target.value)}
						onKeyPress={(e) => e.key === 'Enter' && addSkill()}
						className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
						placeholder="Type a skill and press Enter"
					/>
					<button
						onClick={addSkill}
						className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
					>
						<Plus className="w-4 h-4" />
					</button>
				</div>
			</div>

			{formData.skills.length > 0 ? (
				<div>
					<h4 className="font-medium text-gray-900 mb-3">Your Skills ({formData.skills.length})</h4>
					<div className="flex flex-wrap gap-2">
						{formData.skills.map((skill, index) => (
							<span
								key={index}
								className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium flex items-center"
							>
								{skill}
								<button
									onClick={() => removeSkill(skill)}
									className="ml-2 text-blue-600 hover:text-blue-800"
								>
									<X className="w-3 h-3" />
								</button>
							</span>
						))}
					</div>
				</div>
			) : (
				<div className="text-center py-8 bg-gray-50 rounded-lg">
					<Star className="w-12 h-12 text-gray-400 mx-auto mb-4" />
					<p className="text-gray-600">No skills added yet</p>
					<p className="text-sm text-gray-500">Add skills that showcase your expertise</p>
				</div>
			)}
		</div>
	)

	const ReviewStep = () => (
		<div className="max-w-2xl mx-auto">
			<h3 className="text-2xl font-bold text-gray-900 mb-6">Review Your Profile</h3>
			
			{error && (
				<div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6">
					{error}
				</div>
			)}

			<div className="space-y-6">
				{/* Personal Info Summary */}
				<div className="bg-white border border-gray-200 rounded-lg p-6">
					<h4 className="font-semibold text-gray-900 mb-3">Personal Information</h4>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
						<div><strong>Name:</strong> {formData.firstName} {formData.lastName}</div>
						<div><strong>Email:</strong> {formData.email}</div>
						<div><strong>Phone:</strong> {formData.phone || 'Not provided'}</div>
						<div><strong>Location:</strong> {formData.location || 'Not provided'}</div>
					</div>
					{formData.bio && (
						<div className="mt-3">
							<strong>Bio:</strong>
							<p className="text-gray-600 mt-1">{formData.bio}</p>
						</div>
					)}
				</div>

				{/* Skills Summary */}
				<div className="bg-white border border-gray-200 rounded-lg p-6">
					<h4 className="font-semibold text-gray-900 mb-3">
						Skills ({formData.skills.length})
					</h4>
					{formData.skills.length > 0 ? (
						<div className="flex flex-wrap gap-2">
							{formData.skills.map((skill, index) => (
								<span key={index} className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm">
									{skill}
								</span>
							))}
						</div>
					) : (
						<p className="text-gray-500 italic">No skills added</p>
					)}
				</div>

				{/* Experience Summary */}
				<div className="bg-white border border-gray-200 rounded-lg p-6">
					<h4 className="font-semibold text-gray-900 mb-3">
						Experience ({formData.experience.length} positions)
					</h4>
					{formData.experience.length > 0 ? (
						<div className="space-y-3">
							{formData.experience.map((exp, index) => (
								<div key={index} className="border-l-4 border-blue-500 pl-4">
									<h5 className="font-medium">{exp.title}</h5>
									<p className="text-gray-600">{exp.company}</p>
									<p className="text-sm text-gray-500">
										{exp.startDate} - {exp.current ? 'Present' : exp.endDate}
									</p>
								</div>
							))}
						</div>
					) : (
						<p className="text-gray-500 italic">No experience added</p>
					)}
				</div>
			</div>

			{/* CV Reminder */}
			<div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-6">
				<div className="flex items-start">
					<AlertTriangle className="w-5 h-5 text-yellow-600 mr-3 mt-0.5" />
					<div>
						<h4 className="font-medium text-yellow-800">CV Required for Job Applications</h4>
						<p className="text-yellow-700 text-sm mt-1">
							While your profile looks great, you'll need to upload your CV to apply for jobs and be contacted by employers.
						</p>
					</div>
				</div>
			</div>
		</div>
	)

	const SavingStep = () => (
		<div className="max-w-2xl mx-auto text-center">
			<div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
				<CheckCircle className="w-10 h-10 text-blue-600 animate-pulse" />
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
			{/* Progress Bar */}
			<div className="max-w-2xl mx-auto">
				<div className="bg-gray-200 rounded-full h-2">
					<div 
						className="bg-blue-600 h-2 rounded-full transition-all duration-300"
						style={{ width: `${getProgressPercentage()}%` }}
					/>
				</div>
				<p className="text-sm text-gray-600 mt-2 text-center">
					Step {['personal', 'experience', 'education', 'skills', 'review'].indexOf(step) + 1} of 5
				</p>
			</div>

			{/* Step Content */}
			{step === 'personal' && <PersonalStep />}
			{step === 'experience' && <ExperienceStep />}
			{step === 'skills' && <SkillsStep />}
			{step === 'review' && <ReviewStep />}
			{step === 'saving' && <SavingStep />}

			{/* Navigation */}
			{step !== 'saving' && (
				<div className="max-w-2xl mx-auto flex justify-between">
					<button
						onClick={step === 'personal' ? onBack : handlePrevious}
						className="flex items-center px-6 py-3 text-gray-600 hover:text-gray-800"
					>
						<ArrowLeft className="w-5 h-5 mr-2" />
						{step === 'personal' ? 'Back to Options' : 'Previous'}
					</button>
					
					{step === 'review' ? (
						<button
							onClick={handleSaveProfile}
							className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 flex items-center"
						>
							Save Profile
							<CheckCircle className="w-5 h-5 ml-2" />
						</button>
					) : (
						<button
							onClick={handleNext}
							className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700"
						>
							Next
						</button>
					)}
				</div>
			)}

			{/* CV Reminder Modal */}
			{showCVReminder && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
					<div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
						<div className="text-center">
							<AlertTriangle className="w-16 h-16 text-orange-500 mx-auto mb-4" />
							<h3 className="text-xl font-bold text-gray-900 mb-4">
								Don't Forget Your CV!
							</h3>
							<p className="text-gray-600 mb-6">
								Your profile is saved, but you'll need to upload your CV to apply for jobs. You can do this later from your dashboard.
							</p>
							<div className="space-y-3">
								<button
									onClick={() => {
										setShowCVReminder(false)
										onSkipWithReminder()
									}}
									className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700"
								>
									Upload CV Now
								</button>
								<button
									onClick={handleSkipCV}
									className="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-200"
								>
									Skip for Now (Reminder Later)
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

export default ManualOption 