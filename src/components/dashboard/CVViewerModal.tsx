import { useState, useEffect } from 'react'
import { 
	X, 
	FileText, 
	Download, 
	Eye,
	CreditCard,
	AlertTriangle,
	CheckCircle,
	User,
	Mail,
	Phone,
	MapPin,
	Calendar,
	Briefcase,
	Star
} from 'lucide-react'
import { creditAPI, profileAPI } from '../../services/api'

interface CVViewerModalProps {
	isOpen: boolean
	onClose: () => void
	talentId: string
	talentName: string
	hasMutualInterest: boolean
}

interface TalentProfile {
	firstName: string
	lastName: string
	email: string
	phone: string
	location: string
	bio: string
	experience: Array<{
		title: string
		company: string
		startDate: string
		endDate?: string
		current: boolean
		description: string
	}>
	skills: string[]
	cvUrl?: string
	profilePicture?: string
}

function CVViewerModal({ isOpen, onClose, talentId, talentName, hasMutualInterest }: CVViewerModalProps) {
	const [step, setStep] = useState<'confirm' | 'loading' | 'viewing' | 'error'>('confirm')
	const [talentProfile, setTalentProfile] = useState<TalentProfile | null>(null)
	const [creditCost, setCreditCost] = useState(1)
	const [error, setError] = useState<string | null>(null)
	const [canViewProfile, setCanViewProfile] = useState(false)

	useEffect(() => {
		if (isOpen && hasMutualInterest) {
			checkViewingEligibility()
		}
	}, [isOpen, hasMutualInterest, talentId])

	const checkViewingEligibility = async () => {
		try {
			const response = await creditAPI.canView(talentId)
			setCanViewProfile(response.canView)
			setCreditCost(response.creditCost || 1)
		} catch (error) {
			console.error('Failed to check viewing eligibility:', error)
			setError('Unable to check viewing permissions')
		}
	}

	const handleViewProfile = async () => {
		if (!canViewProfile) {
			setError('Insufficient credits or viewing not allowed')
			return
		}

		setStep('loading')
		try {
			// Log the view and deduct credits
			await creditAPI.logView(talentId)
			
			// Fetch the full profile - Note: This should use a different endpoint for viewing other users' profiles
			// For now, we'll simulate the response or use a different API endpoint
			const profile = await profileAPI.getProfile()
			setTalentProfile(profile)
			setStep('viewing')
		} catch (error) {
			console.error('Failed to view profile:', error)
			setError('Failed to load profile. Credits may have been deducted.')
			setStep('error')
		}
	}

	const handleClose = () => {
		setStep('confirm')
		setTalentProfile(null)
		setError(null)
		onClose()
	}

	if (!isOpen) return null

	if (!hasMutualInterest) {
		return (
			<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
				<div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
					<div className="text-center">
						<AlertTriangle className="w-16 h-16 text-orange-500 mx-auto mb-4" />
						<h3 className="text-xl font-bold text-gray-900 mb-4">
							Mutual Interest Required
						</h3>
						<p className="text-gray-600 mb-6">
							You can only view CV and contact details after both you and the talent have expressed mutual interest.
						</p>
						<button
							onClick={handleClose}
							className="w-full bg-gray-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-700"
						>
							Got It
						</button>
					</div>
				</div>
			</div>
		)
	}

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
			<div className="bg-white rounded-lg max-w-4xl w-full mx-4 max-h-screen overflow-y-auto">
				{/* Header */}
				<div className="flex items-center justify-between p-6 border-b border-gray-200">
					<div className="flex items-center">
						<FileText className="w-6 h-6 text-blue-600 mr-3" />
						<h2 className="text-xl font-bold text-gray-900">
							{step === 'viewing' ? `${talentName}'s Profile & CV` : 'View Profile & CV'}
						</h2>
					</div>
					<button
						onClick={handleClose}
						className="text-gray-400 hover:text-gray-600"
					>
						<X className="w-6 h-6" />
					</button>
				</div>

				{/* Content */}
				<div className="p-6">
					{step === 'confirm' && (
						<div className="text-center">
							<div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
								<CreditCard className="w-8 h-8 text-blue-600" />
							</div>
							<h3 className="text-2xl font-bold text-gray-900 mb-4">
								View {talentName}'s Full Profile
							</h3>
							<p className="text-lg text-gray-600 mb-6">
								Access complete CV, contact details, and professional background
							</p>

							{/* What You'll Get */}
							<div className="bg-blue-50 rounded-lg p-6 mb-6 text-left">
								<h4 className="font-semibold text-blue-900 mb-4">What you'll get:</h4>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
									{[
										'Complete CV document',
										'Direct contact information',
										'Full work experience details',
										'Complete skills list',
										'Education background',
										'Professional bio'
									].map((item, index) => (
										<div key={index} className="flex items-center">
											<CheckCircle className="w-5 h-5 text-blue-600 mr-2 flex-shrink-0" />
											<span className="text-blue-800">{item}</span>
										</div>
									))}
								</div>
							</div>

							{/* Credit Information */}
							<div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
								<div className="flex items-center justify-center">
									<CreditCard className="w-5 h-5 text-orange-600 mr-2" />
									<span className="text-orange-800">
										This will cost <strong>{creditCost} credit{creditCost !== 1 ? 's' : ''}</strong>
									</span>
								</div>
							</div>

							{error && (
								<div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6">
									{error}
								</div>
							)}

							{/* Actions */}
							<div className="flex gap-4 justify-center">
								<button
									onClick={handleClose}
									className="px-6 py-3 text-gray-600 hover:text-gray-800"
								>
									Cancel
								</button>
								<button
									onClick={handleViewProfile}
									disabled={!canViewProfile}
									className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center"
								>
									<Eye className="w-5 h-5 mr-2" />
									View Profile ({creditCost} credit{creditCost !== 1 ? 's' : ''})
								</button>
							</div>
						</div>
					)}

					{step === 'loading' && (
						<div className="text-center py-12">
							<div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
								<FileText className="w-6 h-6 text-blue-600" />
							</div>
							<h3 className="text-xl font-bold text-gray-900 mb-2">Loading Profile...</h3>
							<p className="text-gray-600">Processing credit deduction and fetching profile data</p>
						</div>
					)}

					{step === 'viewing' && talentProfile && (
						<div className="space-y-8">
							{/* Profile Header */}
							<div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6">
								<div className="flex items-start gap-6">
									<div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
										{talentProfile.firstName[0]}{talentProfile.lastName[0]}
									</div>
									<div className="flex-1">
										<h3 className="text-2xl font-bold text-gray-900 mb-2">
											{talentProfile.firstName} {talentProfile.lastName}
										</h3>
										<p className="text-gray-600 mb-4">{talentProfile.bio}</p>
										
										{/* Contact Information */}
										<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
											<div className="flex items-center">
												<Mail className="w-4 h-4 text-blue-600 mr-2" />
												<a href={`mailto:${talentProfile.email}`} className="text-blue-600 hover:underline">
													{talentProfile.email}
												</a>
											</div>
											{talentProfile.phone && (
												<div className="flex items-center">
													<Phone className="w-4 h-4 text-blue-600 mr-2" />
													<a href={`tel:${talentProfile.phone}`} className="text-blue-600 hover:underline">
														{talentProfile.phone}
													</a>
												</div>
											)}
											{talentProfile.location && (
												<div className="flex items-center">
													<MapPin className="w-4 h-4 text-blue-600 mr-2" />
													<span className="text-gray-700">{talentProfile.location}</span>
												</div>
											)}
										</div>
									</div>
								</div>
							</div>

							{/* Skills */}
							<div className="bg-white border border-gray-200 rounded-lg p-6">
								<h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
									<Star className="w-5 h-5 text-purple-600 mr-2" />
									Skills ({talentProfile.skills.length})
								</h4>
								<div className="flex flex-wrap gap-2">
									{talentProfile.skills.map((skill, index) => (
										<span
											key={index}
											className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium"
										>
											{skill}
										</span>
									))}
								</div>
							</div>

							{/* Experience */}
							<div className="bg-white border border-gray-200 rounded-lg p-6">
								<h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
									<Briefcase className="w-5 h-5 text-green-600 mr-2" />
									Work Experience ({talentProfile.experience.length} positions)
								</h4>
								<div className="space-y-6">
									{talentProfile.experience.map((exp, index) => (
										<div key={index} className="border-l-4 border-green-500 pl-6">
											<h5 className="text-lg font-semibold text-gray-900">{exp.title}</h5>
											<p className="text-green-600 font-medium">{exp.company}</p>
											<p className="text-sm text-gray-500 mb-3">
												{exp.startDate} - {exp.current ? 'Present' : exp.endDate}
											</p>
											{exp.description && (
												<p className="text-gray-700 leading-relaxed">{exp.description}</p>
											)}
										</div>
									))}
								</div>
							</div>

							{/* CV Download */}
							{talentProfile.cvUrl && (
								<div className="bg-gray-50 rounded-lg p-6 text-center">
									<FileText className="w-12 h-12 text-gray-600 mx-auto mb-4" />
									<h4 className="text-lg font-semibold text-gray-900 mb-2">CV Document</h4>
									<p className="text-gray-600 mb-4">Download the complete CV document</p>
									<a
										href={talentProfile.cvUrl}
										target="_blank"
										rel="noopener noreferrer"
										className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 inline-flex items-center"
									>
										<Download className="w-5 h-5 mr-2" />
										Download CV
									</a>
								</div>
							)}

							{/* Action Buttons */}
							<div className="flex justify-center pt-6">
								<button
									onClick={handleClose}
									className="bg-gray-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-700"
								>
									Close
								</button>
							</div>
						</div>
					)}

					{step === 'error' && (
						<div className="text-center py-12">
							<AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
							<h3 className="text-xl font-bold text-gray-900 mb-4">Failed to Load Profile</h3>
							<p className="text-gray-600 mb-6">{error}</p>
							<div className="flex gap-4 justify-center">
								<button
									onClick={handleClose}
									className="px-6 py-3 text-gray-600 hover:text-gray-800"
								>
									Close
								</button>
								<button
									onClick={() => setStep('confirm')}
									className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700"
								>
									Try Again
								</button>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

export default CVViewerModal 