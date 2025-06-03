import { useState } from 'react'
import { 
	AlertTriangle, 
	Upload, 
	X, 
	FileText,
	CheckCircle 
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface CVReminderBannerProps {
	show: boolean
	onDismiss: () => void
}

function CVReminderBanner({ show, onDismiss }: CVReminderBannerProps) {
	const navigate = useNavigate()
	const [isDismissed, setIsDismissed] = useState(false)

	if (!show || isDismissed) {
		return null
	}

	const handleDismiss = () => {
		setIsDismissed(true)
		// Store dismissal for session
		sessionStorage.setItem('cvReminderDismissed', 'true')
		onDismiss()
	}

	const handleUploadCV = () => {
		navigate('/onboarding')
	}

	return (
		<div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-lg p-6 mb-8 relative">
			{/* Dismiss Button */}
			<button
				onClick={handleDismiss}
				className="absolute top-4 right-4 text-orange-400 hover:text-orange-600 transition-colors"
			>
				<X className="w-5 h-5" />
			</button>

			<div className="flex items-start">
				{/* Icon */}
				<div className="flex-shrink-0 mr-4">
					<div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
						<AlertTriangle className="w-6 h-6 text-orange-600" />
					</div>
				</div>

				{/* Content */}
				<div className="flex-1">
					<h3 className="text-lg font-semibold text-orange-900 mb-2">
						CV Required for Job Applications
					</h3>
					<p className="text-orange-700 mb-4">
						Your profile looks great, but you need to upload your CV to apply for jobs and be contacted by employers. 
						Don't miss out on opportunities!
					</p>

					{/* Benefits */}
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
						<div className="flex items-center">
							<CheckCircle className="w-5 h-5 text-orange-600 mr-2 flex-shrink-0" />
							<span className="text-sm text-orange-700">Apply for jobs instantly</span>
						</div>
						<div className="flex items-center">
							<CheckCircle className="w-5 h-5 text-orange-600 mr-2 flex-shrink-0" />
							<span className="text-sm text-orange-700">Get contacted by employers</span>
						</div>
						<div className="flex items-center">
							<CheckCircle className="w-5 h-5 text-orange-600 mr-2 flex-shrink-0" />
							<span className="text-sm text-orange-700">AI-powered matching</span>
						</div>
					</div>

					{/* Actions */}
					<div className="flex flex-col sm:flex-row gap-3">
						<button
							onClick={handleUploadCV}
							className="bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors flex items-center justify-center"
						>
							<Upload className="w-5 h-5 mr-2" />
							Upload CV Now
						</button>
						<button
							onClick={handleDismiss}
							className="bg-white text-orange-700 px-6 py-3 rounded-lg font-semibold border border-orange-300 hover:bg-orange-50 transition-colors"
						>
							Remind Me Later
						</button>
					</div>
				</div>
			</div>

			{/* Progress Indicator */}
			<div className="mt-6 pt-4 border-t border-orange-200">
				<div className="flex items-center justify-between text-sm text-orange-600">
					<span>Profile completion progress:</span>
					<span className="font-medium">Almost there! Just add your CV</span>
				</div>
				<div className="mt-2 w-full bg-orange-200 rounded-full h-2">
					<div className="bg-orange-500 h-2 rounded-full" style={{ width: '85%' }} />
				</div>
			</div>
		</div>
	)
}

export default CVReminderBanner 