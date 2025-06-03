import { useState, useEffect, useRef } from 'react'
import { useAppSelector, useAppDispatch } from '../../../store/hooks'
import { updateUserProfile, uploadProfilePicture, getUserProfile, updateProfileFromCv } from '../../../store/slices/userSlice'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import DashboardLayoutWithSidebar from '../../../components/layout/DashboardLayoutWithSidebar'
import {
	User,
	MapPin,
	Edit3,
	Save,
	X,
	Plus,
	Camera,
	Briefcase,
	GraduationCap,
	Award,
	UploadCloud,
} from 'lucide-react'
import FileUpload from '../../../components/shared/FileUpload'
import { ExtractedProfileDataDto } from '../../../types'

// Validation schemas
const personalInfoSchema = z.object({
	firstName: z.string().min(1, 'First name is required'),
	lastName: z.string().min(1, 'Last name is required'),
	email: z.string().email('Invalid email address'),
	phone: z.string().optional(),
	location: z.string().optional(),
	bio: z.string().optional(),
})

const experienceSchema = z.object({
	id: z.string().optional(),
	title: z.string().min(1, 'Job title is required'),
	company: z.string().min(1, 'Company is required'),
	location: z.string().optional(),
	startDate: z.string().min(1, 'Start date is required'),
	endDate: z.string().optional(),
	current: z.boolean().optional(),
	description: z.string().optional(),
})

const educationSchema = z.object({
	id: z.string().optional(),
	degree: z.string().min(1, 'Degree is required'),
	institution: z.string().min(1, 'Institution is required'),
	location: z.string().optional(),
	startDate: z.string().min(1, 'Start date is required'),
	endDate: z.string().optional(),
	current: z.boolean().optional(),
	gpa: z.string().optional(),
})

type PersonalInfoFormData = z.infer<typeof personalInfoSchema>
type ExperienceFormData = z.infer<typeof experienceSchema>
type EducationFormData = z.infer<typeof educationSchema>

function ProfilePage() {
	const dispatch = useAppDispatch()
	const { profile, isLoading } = useAppSelector((state) => state.user)
	const { user: authUser } = useAppSelector((state) => state.auth)
	const fileInputRef = useRef<HTMLInputElement>(null)
	
	const [activeTab, setActiveTab] = useState('personal')
	const [editingPersonal, setEditingPersonal] = useState(false)
	const [editingExperience, setEditingExperience] = useState<string | null>(null)
	const [editingEducation, setEditingEducation] = useState<string | null>(null)
	const [newSkill, setNewSkill] = useState('')
	const [showAddExperience, setShowAddExperience] = useState(false)
	const [showAddEducation, setShowAddEducation] = useState(false)
	const [parsedCvData, setParsedCvData] = useState<ExtractedProfileDataDto | null>(null)
	const [showCvPreview, setShowCvPreview] = useState(false)

	// Forms
	const personalForm = useForm<PersonalInfoFormData>({
		resolver: zodResolver(personalInfoSchema),
		defaultValues: {
			firstName: '',
			lastName: '',
			email: '',
			phone: '',
			location: '',
			bio: '',
		},
	})

	const experienceForm = useForm<ExperienceFormData>({
		resolver: zodResolver(experienceSchema),
		defaultValues: {
			title: '',
			company: '',
			location: '',
			startDate: '',
			endDate: '',
			current: false,
			description: '',
		},
	})

	const educationForm = useForm<EducationFormData>({
		resolver: zodResolver(educationSchema),
		defaultValues: {
			degree: '',
			institution: '',
			location: '',
			startDate: '',
			endDate: '',
			current: false,
			gpa: '',
		},
	})

	useEffect(() => {
		if (!profile && authUser?.id) {
			dispatch(getUserProfile())
		}
	}, [dispatch, profile, authUser?.id])

	useEffect(() => {
		if (profile) {
			personalForm.reset({
				firstName: profile.firstName || '',
				lastName: profile.lastName || '',
				email: profile.email || '',
				phone: profile.phone || '',
				location: profile.location || '',
				bio: profile.bio || '',
			})
		}
	}, [profile, personalForm])

	const handleCvParseComplete = (fileId: string, data: ExtractedProfileDataDto) => {
		console.log('CV Parsed Data:', data)
		setParsedCvData(data)
		setShowCvPreview(true)
		alert('CV parsed successfully! Review the extracted information.')
	}

	const handleConfirmCvData = async () => {
		if (!parsedCvData || !authUser?.id) {
			alert('No CV data to confirm or user not found.')
			return
		}

		try {
			setShowCvPreview(false)
			await dispatch(updateProfileFromCv(parsedCvData)).unwrap()
			alert('Profile successfully updated from CV! The page will refresh with new data.')
			setParsedCvData(null)
		} catch (error: any) {
			console.error('Failed to update profile from CV:', error)
			alert(`Error updating profile from CV: ${error.message || 'Unknown error'}`)
			setShowCvPreview(true)
		}
	}

	const handlePersonalInfoSave = async (data: PersonalInfoFormData) => {
		try {
			await dispatch(updateUserProfile(data)).unwrap()
			setEditingPersonal(false)
		} catch (error) {
			console.error('Failed to update profile:', error)
		}
	}

	const handleProfilePictureUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0]
		if (file) {
			try {
				await dispatch(uploadProfilePicture(file)).unwrap()
			} catch (error) {
				console.error('Failed to upload profile picture:', error)
			}
		}
	}

	const handleAddSkill = () => {
		if (newSkill.trim() && profile) {
			const updatedSkills = [...(profile.skills || []), newSkill.trim()]
			dispatch(updateUserProfile({ skills: updatedSkills }))
			setNewSkill('')
		}
	}

	const handleRemoveSkill = (skillToRemove: string) => {
		if (profile) {
			const updatedSkills = profile.skills.filter((skill: string) => skill !== skillToRemove)
			dispatch(updateUserProfile({ skills: updatedSkills }))
		}
	}

	const handleExperienceSave = async (data: ExperienceFormData) => {
		if (!profile) return
		
		try {
			const updatedExperience = editingExperience 
				? profile.experience.map(exp => 
					exp.id === editingExperience ? { ...data, id: editingExperience } : exp
				)
				: [...profile.experience, { ...data, id: Date.now().toString() }]
			
			await dispatch(updateUserProfile({ experience: updatedExperience })).unwrap()
			setEditingExperience(null)
			setShowAddExperience(false)
			experienceForm.reset()
		} catch (error) {
			console.error('Failed to save experience:', error)
		}
	}

	const handleEducationSave = async (data: EducationFormData) => {
		if (!profile) return
		
		try {
			const updatedEducation = editingEducation 
				? profile.education.map(edu => 
					edu.id === editingEducation ? { ...data, id: editingEducation } : edu
				)
				: [...profile.education, { ...data, id: Date.now().toString() }]
			
			await dispatch(updateUserProfile({ education: updatedEducation })).unwrap()
			setEditingEducation(null)
			setShowAddEducation(false)
			educationForm.reset()
		} catch (error) {
			console.error('Failed to save education:', error)
		}
	}

	const tabs = [
		{ id: 'personal', name: 'Personal Info', icon: User },
		{ id: 'experience', name: 'Experience', icon: Briefcase },
		{ id: 'education', name: 'Education', icon: GraduationCap },
		{ id: 'skills', name: 'Skills', icon: Award },
	]

	if (isLoading) {
		return (
			<div className="p-6 lg:p-8">
				<div className="animate-pulse">
					<div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
					<div className="space-y-4">
						{[...Array(6)].map((_, i) => (
							<div key={i} className="h-16 bg-gray-200 rounded-lg"></div>
						))}
					</div>
				</div>
			</div>
		)
	}

	const renderCvPreview = () => {
		if (!parsedCvData) return null
		return (
			<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
				<div className="bg-white p-6 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
					<h2 className="text-2xl font-semibold mb-4">Review Extracted CV Data</h2>
					<div className="space-y-3 mb-6 text-sm">
						<p><strong>Name:</strong> {parsedCvData.firstName} {parsedCvData.lastName}</p>
						<p><strong>Email:</strong> {parsedCvData.email}</p>
						<p><strong>Phone:</strong> {parsedCvData.phoneNumber}</p>
						<p><strong>Address:</strong> {parsedCvData.address}</p>
						<p><strong>Current Job:</strong> {parsedCvData.currentJobTitle} at {parsedCvData.currentEmployer}</p>
						<p><strong>Experience:</strong> {parsedCvData.totalYearsExperience} years</p>
						<p><strong>Skills:</strong> {parsedCvData.topSkills}</p>
						{parsedCvData.summary && 
							<p><strong>Summary:</strong><br/>
								{parsedCvData.summary.split('\n').map((line: string, i: number) => <span key={i}>{line}<br/></span>)}
							</p>
						}
						{parsedCvData.workExperience && parsedCvData.workExperience.length > 0 && (
							<div>
								<h4 className="font-semibold mt-2 mb-1">Work Experience:</h4>
								{parsedCvData.workExperience.map((exp, index) => (
									<div key={`exp-${index}`} className="pl-2 border-l-2 border-gray-200 mb-1">
										<p><strong>{exp.jobTitle}</strong> at {exp.company} ({exp.duration})</p>
										{exp.description && <p className="text-xs text-gray-600">{exp.description}</p>}
									</div>
								))}
							</div>
						)}
						{parsedCvData.education && parsedCvData.education.length > 0 && (
							<div>
								<h4 className="font-semibold mt-2 mb-1">Education:</h4>
								{parsedCvData.education.map((edu, index) => (
									<div key={`edu-${index}`} className="pl-2 border-l-2 border-gray-200 mb-1">
										<p><strong>{edu.degree}</strong> from {edu.institution} ({edu.duration || edu.graduationDate})</p>
									</div>
								))}
							</div>
						)}
					</div>
					<div className="flex justify-end space-x-3">
						<button onClick={() => { setShowCvPreview(false); setParsedCvData(null); }} className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50">Cancel</button>
						<button onClick={handleConfirmCvData} className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700">Confirm and Pre-fill Profile</button>
					</div>
				</div>
			</div>
		)
	}

	return (
		<DashboardLayoutWithSidebar 
			title="Profile"
			subtitle="Manage your personal information and professional details"
		>
			<div className="p-6 lg:p-8 max-w-4xl mx-auto">
				{/* Profile Picture Section */}
				<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
					<div className="flex items-center space-x-6">
						<div className="relative">
							<div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
								{profile?.profilePicture ? (
									<img 
										src={profile.profilePicture} 
										alt="Profile" 
										className="w-full h-full object-cover"
									/>
								) : (
									<User className="h-12 w-12 text-gray-400" />
								)}
							</div>
							<button
								onClick={() => fileInputRef.current?.click()}
								className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
							>
								<Camera className="h-4 w-4" />
							</button>
							<input
								ref={fileInputRef}
								type="file"
								accept="image/*"
								onChange={handleProfilePictureUpload}
								className="hidden"
							/>
						</div>
						<div>
							<h2 className="text-xl font-semibold text-gray-900">
								{profile?.firstName} {profile?.lastName}
							</h2>
							<p className="text-gray-600">{profile?.email}</p>
							{profile?.location && (
								<div className="flex items-center text-gray-500 mt-1">
									<MapPin className="h-4 w-4 mr-1" />
									{profile.location}
								</div>
							)}
						</div>
					</div>
				</div>

				{/* Tabs */}
				<div className="bg-white rounded-lg shadow-sm border border-gray-200">
					<div className="border-b border-gray-200">
						<nav className="flex space-x-8 px-6">
							{tabs.map((tab) => {
								const Icon = tab.icon
								return (
									<button
										key={tab.id}
										onClick={() => setActiveTab(tab.id)}
										className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 transition-colors ${
											activeTab === tab.id
												? 'border-blue-600 text-blue-600'
												: 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
										}`}
									>
										<Icon className="h-5 w-5" />
										<span>{tab.name}</span>
									</button>
								)
							})}
						</nav>
					</div>
				</div>

				{/* Tab Content */}
				<div className="p-6">
					{/* Personal Info Tab */}
					{activeTab === 'personal' && (
						<div className="space-y-6">
							<div className="flex items-center justify-between">
								<h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
								{!editingPersonal ? (
									<button
										onClick={() => setEditingPersonal(true)}
										className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
									>
										<Edit3 className="h-4 w-4" />
										<span>Edit</span>
									</button>
								) : (
									<div className="flex items-center space-x-2">
										<button
											onClick={() => {
												setEditingPersonal(false)
												personalForm.reset()
											}}
											className="flex items-center space-x-2 text-gray-600 hover:text-gray-700"
										>
											<X className="h-4 w-4" />
											<span>Cancel</span>
										</button>
									</div>
								)}
							</div>

							<form onSubmit={personalForm.handleSubmit(handlePersonalInfoSave)} className="space-y-4">
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-1">
											First Name
										</label>
										<input
											{...personalForm.register('firstName')}
											disabled={!editingPersonal}
											className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
										/>
										{personalForm.formState.errors.firstName && (
											<p className="mt-1 text-sm text-red-600">
												{personalForm.formState.errors.firstName.message}
											</p>
										)}
									</div>
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-1">
											Last Name
										</label>
										<input
											{...personalForm.register('lastName')}
											disabled={!editingPersonal}
											className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
										/>
										{personalForm.formState.errors.lastName && (
											<p className="mt-1 text-sm text-red-600">
												{personalForm.formState.errors.lastName.message}
											</p>
										)}
									</div>
								</div>

								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1">
										Email
									</label>
									<input
										{...personalForm.register('email')}
										disabled={!editingPersonal}
										type="email"
										className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
									/>
									{personalForm.formState.errors.email && (
										<p className="mt-1 text-sm text-red-600">
											{personalForm.formState.errors.email.message}
										</p>
									)}
								</div>

								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-1">
											Phone
										</label>
										<input
											{...personalForm.register('phone')}
											disabled={!editingPersonal}
											type="tel"
											className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
										/>
									</div>
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-1">
											Location
										</label>
										<input
											{...personalForm.register('location')}
											disabled={!editingPersonal}
											className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
										/>
									</div>
								</div>

								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1">
										Bio
									</label>
									<textarea
										{...personalForm.register('bio')}
										disabled={!editingPersonal}
										rows={4}
										className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
										placeholder="Tell us about yourself..."
									/>
								</div>

								{editingPersonal && (
									<div className="flex justify-end">
										<button
											type="submit"
											disabled={isLoading}
											className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
										>
											<Save className="h-4 w-4" />
											<span>Save Changes</span>
										</button>
									</div>
								)}
							</form>
						</div>
					)}

					{/* Skills Tab */}
					{activeTab === 'skills' && (
						<div className="space-y-6">
							<div className="flex items-center justify-between">
								<h3 className="text-lg font-semibold text-gray-900">Skills</h3>
								<div className="flex items-center space-x-2">
									<input
										type="text"
										value={newSkill}
										onChange={(e) => setNewSkill(e.target.value)}
										placeholder="Add a skill"
										className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
										onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
									/>
									<button
										onClick={handleAddSkill}
										className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
									>
										<Plus className="h-4 w-4" />
										<span>Add</span>
									</button>
								</div>
							</div>

							<div className="flex flex-wrap gap-2">
								{profile?.skills?.map((skill, index) => (
									<div
										key={index}
										className="flex items-center space-x-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full border border-blue-200"
									>
										<span className="text-sm font-medium">{skill}</span>
										<button
											onClick={() => handleRemoveSkill(skill)}
											className="text-blue-500 hover:text-blue-700"
										>
											<X className="h-3 w-3" />
										</button>
									</div>
								))}
							</div>

							{(!profile?.skills || profile.skills.length === 0) && (
								<div className="text-center py-12 text-gray-500">
									<Award className="h-12 w-12 mx-auto mb-4 text-gray-300" />
									<p>No skills added yet</p>
									<p className="text-sm">Add your skills to showcase your expertise</p>
								</div>
							)}
						</div>
					)}

					{/* Experience Tab */}
					{activeTab === 'experience' && (
						<div className="space-y-6">
							<div className="flex items-center justify-between">
								<h3 className="text-lg font-semibold text-gray-900">Work Experience</h3>
								<button
									onClick={() => setShowAddExperience(true)}
									className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
								>
									<Plus className="h-4 w-4" />
									<span>Add Experience</span>
								</button>
							</div>

							{/* Experience List */}
							<div className="space-y-4">
								{profile?.experience?.map((exp: any) => (
									<div key={exp.id} className="border border-gray-200 rounded-lg p-4">
										<div className="flex items-start justify-between">
											<div className="flex-1">
												<h4 className="text-lg font-medium text-gray-900">{exp.title}</h4>
												<p className="text-blue-600 font-medium">{exp.company}</p>
												{exp.location && (
													<p className="text-gray-500 text-sm">{exp.location}</p>
												)}
												<p className="text-gray-500 text-sm">
													{exp.startDate} - {exp.current ? 'Present' : exp.endDate}
												</p>
												{exp.description && (
													<p className="text-gray-700 mt-2">{exp.description}</p>
												)}
											</div>
											<div className="flex items-center space-x-2">
												<button
													onClick={() => setEditingExperience(exp.id)}
													className="text-gray-400 hover:text-gray-600"
												>
													<Edit3 className="h-4 w-4" />
												</button>
											</div>
										</div>
									</div>
								))}
							</div>

							{(!profile?.experience || profile.experience.length === 0) && !showAddExperience && (
								<div className="text-center py-12 text-gray-500">
									<Briefcase className="h-12 w-12 mx-auto mb-4 text-gray-300" />
									<p>No work experience added yet</p>
									<p className="text-sm">Add your work experience to showcase your career journey</p>
								</div>
							)}
						</div>
					)}

					{/* Education Tab */}
					{activeTab === 'education' && (
						<div className="space-y-6">
							<div className="flex items-center justify-between">
								<h3 className="text-lg font-semibold text-gray-900">Education</h3>
								<button
									onClick={() => setShowAddEducation(true)}
									className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
								>
									<Plus className="h-4 w-4" />
									<span>Add Education</span>
								</button>
							</div>

							{/* Education List */}
							<div className="space-y-4">
								{profile?.education?.map((edu: any) => (
									<div key={edu.id} className="border border-gray-200 rounded-lg p-4">
										<div className="flex items-start justify-between">
											<div className="flex-1">
												<h4 className="text-lg font-medium text-gray-900">{edu.degree}</h4>
												<p className="text-blue-600 font-medium">{edu.institution}</p>
												{edu.location && (
													<p className="text-gray-500 text-sm">{edu.location}</p>
												)}
												<p className="text-gray-500 text-sm">
													{edu.startDate} - {edu.current ? 'Present' : edu.endDate}
												</p>
												{edu.gpa && (
													<p className="text-gray-700 mt-2">GPA: {edu.gpa}</p>
												)}
											</div>
											<div className="flex items-center space-x-2">
												<button
													onClick={() => setEditingEducation(edu.id)}
													className="text-gray-400 hover:text-gray-600"
												>
													<Edit3 className="h-4 w-4" />
												</button>
											</div>
										</div>
									</div>
								))}
							</div>

							{(!profile?.education || profile.education.length === 0) && !showAddEducation && (
								<div className="text-center py-12 text-gray-500">
									<GraduationCap className="h-12 w-12 mx-auto mb-4 text-gray-300" />
									<p>No education added yet</p>
									<p className="text-sm">Add your educational background</p>
								</div>
							)}
						</div>
					)}
				</div>

				{showCvPreview && renderCvPreview()}
			</div>
		</DashboardLayoutWithSidebar>
	)
}

export default ProfilePage 