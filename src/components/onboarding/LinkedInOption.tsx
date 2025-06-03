import { 
	Linkedin, 
	ArrowLeft, 
	Calendar,
	Star,
	CheckCircle,
	Clock
} from 'lucide-react'

interface LinkedInOptionProps {
	onComplete: () => void
	onBack: () => void
}

function LinkedInOption({ onComplete, onBack }: LinkedInOptionProps) {
	return (
		<div className="max-w-2xl mx-auto text-center">
			<div className="text-center mb-8">
				<div className="w-16 h-16 bg-blue-700 rounded-full flex items-center justify-center mx-auto mb-6">
					<Linkedin className="w-8 h-8 text-white" />
				</div>
				<h2 className="text-3xl font-bold text-gray-900 mb-4">
					LinkedIn Integration
				</h2>
				<p className="text-lg text-gray-600">
					Import your professional data directly from LinkedIn
				</p>
			</div>

			{/* Coming Soon Badge */}
			<div className="bg-orange-50 border border-orange-200 rounded-lg p-8 mb-8">
				<div className="flex items-center justify-center mb-4">
					<Clock className="w-12 h-12 text-orange-600" />
				</div>
				<h3 className="text-xl font-bold text-orange-800 mb-3">
					Coming Soon!
				</h3>
				<p className="text-orange-700 mb-6">
					We're working on integrating with LinkedIn's API to provide seamless profile importing. This feature will be available soon!
				</p>
				
				{/* Expected Features */}
				<div className="bg-white rounded-lg p-6 border border-orange-200">
					<h4 className="font-semibold text-gray-900 mb-4">What to Expect:</h4>
					<div className="space-y-3 text-left">
						{[
							'One-click profile import from LinkedIn',
							'Automatic experience and education sync',
							'Skills validation and verification',
							'Professional network integration',
							'Real-time profile updates'
						].map((feature, index) => (
							<div key={index} className="flex items-center">
								<Star className="w-5 h-5 text-orange-500 mr-3 flex-shrink-0" />
								<span className="text-gray-700">{feature}</span>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* Timeline */}
			<div className="bg-blue-50 rounded-lg p-6 mb-8">
				<h3 className="font-semibold text-blue-900 mb-4 flex items-center">
					<Calendar className="w-5 h-5 mr-2" />
					Development Timeline
				</h3>
				<div className="space-y-3">
					<div className="flex items-center">
						<div className="w-3 h-3 bg-blue-600 rounded-full mr-4" />
						<span className="text-blue-800">Q1 2024: LinkedIn API Integration</span>
					</div>
					<div className="flex items-center">
						<div className="w-3 h-3 bg-blue-400 rounded-full mr-4" />
						<span className="text-blue-700">Q2 2024: Advanced Profile Sync</span>
					</div>
					<div className="flex items-center">
						<div className="w-3 h-3 bg-blue-300 rounded-full mr-4" />
						<span className="text-blue-600">Q3 2024: Network Integration</span>
					</div>
				</div>
			</div>

			{/* Alternative Options */}
			<div className="bg-gray-50 rounded-lg p-6 mb-8">
				<h3 className="font-semibold text-gray-900 mb-4">
					For Now, Consider These Options:
				</h3>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div className="bg-white rounded-lg p-4 border border-gray-200">
						<h4 className="font-medium text-gray-900 mb-2">Upload CV/Resume</h4>
						<p className="text-sm text-gray-600 mb-3">
							AI-powered parsing with advanced accuracy
						</p>
						<button
							onClick={onBack}
							className="text-blue-600 hover:text-blue-700 text-sm font-medium"
						>
							Choose CV Upload →
						</button>
					</div>
					<div className="bg-white rounded-lg p-4 border border-gray-200">
						<h4 className="font-medium text-gray-900 mb-2">Manual Entry</h4>
						<p className="text-sm text-gray-600 mb-3">
							Fill your profile step by step
						</p>
						<button
							onClick={onBack}
							className="text-blue-600 hover:text-blue-700 text-sm font-medium"
						>
							Choose Manual Entry →
						</button>
					</div>
				</div>
			</div>

			{/* Notification Signup */}
			<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
				<h3 className="font-semibold text-gray-900 mb-4">
					Get Notified When Available
				</h3>
				<p className="text-gray-600 mb-4">
					We'll let you know as soon as LinkedIn integration is ready!
				</p>
				<div className="flex gap-4">
					<input
						type="email"
						placeholder="Enter your email"
						className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
					<button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 flex items-center">
						<CheckCircle className="w-4 h-4 mr-2" />
						Notify Me
					</button>
				</div>
			</div>

			{/* Action Buttons */}
			<div className="flex justify-center">
				<button
					onClick={onBack}
					className="flex items-center px-6 py-3 text-gray-600 hover:text-gray-800"
				>
					<ArrowLeft className="w-5 h-5 mr-2" />
					Back to Options
				</button>
			</div>
		</div>
	)
}

export default LinkedInOption 