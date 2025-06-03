import { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { createJob } from '../../../store/slices/jobSlice'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import DashboardLayoutWithSidebar from '../../../components/layout/DashboardLayoutWithSidebar'
import { Building, MapPin, DollarSign, Calendar, Briefcase, FileText } from 'lucide-react'
import { lookupAPI } from '../../../services/api'

const jobSchema = z.object({
	jobTitle: z.string().min(3, 'Job title must be at least 3 characters'),
	jobDescription: z.string().min(50, 'Job description must be at least 50 characters'),
	employerId: z.number().min(1, 'Please select an employer'),
	cityId: z.number().min(1, 'Please select a city'),
	salaryRange: z.string().optional(),
	closingDate: z.string().min(1, 'Closing date is required'),
	employmentTypeId: z.number().optional(),
	jobRoleId: z.number().optional(),
})

type JobFormData = z.infer<typeof jobSchema>

interface LookupOption {
	id: number
	name: string
}

function PostJobPage() {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const { user } = useAppSelector((state) => state.auth)
	const { isLoading, error } = useAppSelector((state) => state.jobs)
	const [submitSuccess, setSubmitSuccess] = useState(false)
	
	// Lookup data states
	const [cities, setCities] = useState<LookupOption[]>([])
	const [employmentTypes, setEmploymentTypes] = useState<LookupOption[]>([])
	const [jobRoles, setJobRoles] = useState<LookupOption[]>([])
	const [employers, setEmployers] = useState<LookupOption[]>([])
	const [loadingLookups, setLoadingLookups] = useState(true)

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		watch,
	} = useForm<JobFormData>({
		resolver: zodResolver(jobSchema),
		defaultValues: {
			employerId: 1, // This should come from user's employer profile
		}
	})

	// Watch form values to get names for submission
	const watchedValues = watch()

	useEffect(() => {
		loadLookupData()
	}, [])

	const loadLookupData = async () => {
		try {
			setLoadingLookups(true)
			const [citiesData, employmentTypesData, jobRolesData, employersData] = await Promise.all([
				lookupAPI.getCities(),
				lookupAPI.getEmploymentTypes(),
				lookupAPI.getJobRoles(),
				lookupAPI.getEmployers(),
			])
			
			setCities(citiesData || [])
			setEmploymentTypes(employmentTypesData || [])
			setJobRoles(jobRolesData || [])
			setEmployers(employersData || [])
		} catch (error) {
			console.error('Failed to load lookup data:', error)
		} finally {
			setLoadingLookups(false)
		}
	}

	const onSubmit = async (data: JobFormData) => {
		try {
			// Find the names for the selected IDs
			const selectedCity = cities.find(city => city.id === data.cityId)
			const selectedEmploymentType = employmentTypes.find(type => type.id === data.employmentTypeId)
			const selectedJobRole = jobRoles.find(role => role.id === data.jobRoleId)
			const selectedEmployer = employers.find(emp => emp.id === data.employerId)

			const jobData = {
				...data,
				postingDate: new Date().toISOString(),
				// Add the required name fields for backend validation
				cityName: selectedCity?.name || '',
				employmentTypeName: selectedEmploymentType?.name || '',
				jobRoleName: selectedJobRole?.name || '',
				employerName: selectedEmployer?.name || '',
			}
			
			await dispatch(createJob(jobData)).unwrap()
			setSubmitSuccess(true)
			reset()
			
			// Redirect to job management page after 2 seconds
			setTimeout(() => {
				navigate('/team/my-jobs')
			}, 2000)
		} catch (error) {
			console.error('Failed to create job:', error)
		}
	}

	if (submitSuccess) {
		return (
			<DashboardLayoutWithSidebar 
				title="Job Posted Successfully"
				subtitle="Your job listing has been created and is now live"
			>
				<div className="p-8">
					<div className="max-w-2xl mx-auto text-center">
						<div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
							<Briefcase className="w-8 h-8 text-green-600" />
						</div>
						<h2 className="text-2xl font-bold text-gray-900 mb-4">Job Posted Successfully!</h2>
						<p className="text-gray-600 mb-6">
							Your job listing has been created and is now live. You'll be redirected to manage your jobs shortly.
						</p>
						<div className="animate-spin w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full mx-auto"></div>
					</div>
				</div>
			</DashboardLayoutWithSidebar>
		)
	}

	return (
		<DashboardLayoutWithSidebar 
			title="Post a New Job"
			subtitle="Create a compelling job listing to attract the best talent"
		>
			<div className="p-8">
				<div className="max-w-4xl mx-auto">
					{/* Loading Message */}
					{loadingLookups && (
						<div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
							<p className="text-blue-700">Loading form data...</p>
						</div>
					)}

					{/* Error Message */}
					{error && (
						<div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
							<p className="text-red-700">{error}</p>
						</div>
					)}

					<form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
						{/* Basic Information */}
						<div className="bg-white rounded-lg border border-gray-200 p-6">
							<h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
								<Briefcase className="w-5 h-5" />
								Basic Information
							</h2>
							
							<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
								<div className="lg:col-span-2">
									<label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700 mb-2">
										Job Title *
									</label>
									<input
										type="text"
										id="jobTitle"
										{...register('jobTitle')}
										placeholder="e.g. Senior Software Engineer"
										className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
										disabled={loadingLookups}
									/>
									{errors.jobTitle && (
										<p className="mt-1 text-sm text-red-600">{errors.jobTitle.message}</p>
									)}
								</div>

								<div>
									<label htmlFor="employerId" className="block text-sm font-medium text-gray-700 mb-2">
										Employer *
									</label>
									<select
										id="employerId"
										{...register('employerId', { valueAsNumber: true })}
										className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
										disabled={loadingLookups}
									>
										<option value="">Select employer</option>
										{employers.map((employer) => (
											<option key={employer.id} value={employer.id}>
												{employer.name}
											</option>
										))}
									</select>
									{errors.employerId && (
										<p className="mt-1 text-sm text-red-600">{errors.employerId.message}</p>
									)}
								</div>

								<div>
									<label htmlFor="cityId" className="block text-sm font-medium text-gray-700 mb-2">
										Location *
									</label>
									<select
										id="cityId"
										{...register('cityId', { valueAsNumber: true })}
										className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
										disabled={loadingLookups}
									>
										<option value="">Select a city</option>
										{cities.map((city) => (
											<option key={city.id} value={city.id}>
												{city.name}
											</option>
										))}
									</select>
									{errors.cityId && (
										<p className="mt-1 text-sm text-red-600">{errors.cityId.message}</p>
									)}
								</div>

								<div>
									<label htmlFor="employmentTypeId" className="block text-sm font-medium text-gray-700 mb-2">
										Employment Type
									</label>
									<select
										id="employmentTypeId"
										{...register('employmentTypeId', { valueAsNumber: true })}
										className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
										disabled={loadingLookups}
									>
										<option value="">Select employment type</option>
										{employmentTypes.map((type) => (
											<option key={type.id} value={type.id}>
												{type.name}
											</option>
										))}
									</select>
								</div>

								<div>
									<label htmlFor="jobRoleId" className="block text-sm font-medium text-gray-700 mb-2">
										Job Role
									</label>
									<select
										id="jobRoleId"
										{...register('jobRoleId', { valueAsNumber: true })}
										className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
										disabled={loadingLookups}
									>
										<option value="">Select job role</option>
										{jobRoles.map((role) => (
											<option key={role.id} value={role.id}>
												{role.name}
											</option>
										))}
									</select>
								</div>

								<div>
									<label htmlFor="salaryRange" className="block text-sm font-medium text-gray-700 mb-2">
										Salary Range
									</label>
									<input
										type="text"
										id="salaryRange"
										{...register('salaryRange')}
										placeholder="e.g. $80,000 - $120,000"
										className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
										disabled={loadingLookups}
									/>
								</div>

								<div>
									<label htmlFor="closingDate" className="block text-sm font-medium text-gray-700 mb-2">
										Application Deadline *
									</label>
									<input
										type="date"
										id="closingDate"
										{...register('closingDate')}
										min={new Date().toISOString().split('T')[0]}
										className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
										disabled={loadingLookups}
									/>
									{errors.closingDate && (
										<p className="mt-1 text-sm text-red-600">{errors.closingDate.message}</p>
									)}
								</div>
							</div>
						</div>

						{/* Job Description */}
						<div className="bg-white rounded-lg border border-gray-200 p-6">
							<h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
								<FileText className="w-5 h-5" />
								Job Description
							</h2>
							
							<div>
								<label htmlFor="jobDescription" className="block text-sm font-medium text-gray-700 mb-2">
									Description *
								</label>
								<textarea
									id="jobDescription"
									{...register('jobDescription')}
									rows={10}
									placeholder="Describe the role, responsibilities, requirements, and what makes this opportunity exciting..."
									className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
									disabled={loadingLookups}
								/>
								{errors.jobDescription && (
									<p className="mt-1 text-sm text-red-600">{errors.jobDescription.message}</p>
								)}
								<p className="mt-1 text-sm text-gray-500">
									Minimum 50 characters. Be specific about requirements, responsibilities, and benefits.
								</p>
							</div>
						</div>

						{/* Preview */}
						<div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
							<h2 className="text-xl font-semibold text-gray-900 mb-6">Preview</h2>
							<div className="bg-white rounded-lg border border-gray-200 p-6">
								<h3 className="text-xl font-semibold text-gray-900 mb-2">
									Job Title Preview
								</h3>
								<div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
									<div className="flex items-center gap-1">
										<Building className="w-4 h-4" />
										<span>Your Company</span>
									</div>
									<div className="flex items-center gap-1">
										<MapPin className="w-4 h-4" />
										<span>Selected Location</span>
									</div>
									<div className="flex items-center gap-1">
										<Calendar className="w-4 h-4" />
										<span>Posted today</span>
									</div>
								</div>
								<p className="text-gray-700">
									Your job description will appear here...
								</p>
							</div>
						</div>

						{/* Submit Button */}
						<div className="flex justify-end space-x-4">
							<button
								type="button"
								onClick={() => navigate('/team')}
								className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
								disabled={loadingLookups}
							>
								Cancel
							</button>
							<button
								type="submit"
								disabled={isLoading || loadingLookups}
								className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
							>
								{isLoading ? (
									<>
										<div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
										Posting Job...
									</>
								) : loadingLookups ? (
									<>
										<div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
										Loading...
									</>
								) : (
									<>
										<Briefcase className="w-4 h-4" />
										Post Job
									</>
								)}
							</button>
						</div>
					</form>
				</div>
			</div>
		</DashboardLayoutWithSidebar>
	)
}

export default PostJobPage 