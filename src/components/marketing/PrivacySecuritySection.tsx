function PrivacySecuritySection() {
	const securityFeatures = [
		{
			icon: (
				<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5 4a9 9 0 11-18 0 9 9 0 0118 0z" />
				</svg>
			),
			title: 'GDPR Compliance',
			description: 'Full compliance with European data protection regulations and global privacy standards.'
		},
		{
			icon: (
				<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
				</svg>
			),
			title: 'Data Encryption',
			description: 'All sensitive data encrypted in transit and at rest with enterprise-grade security protocols.'
		},
		{
			icon: (
				<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
				</svg>
			),
			title: 'Access Controls',
			description: 'Granular permissions and access management with role-based security controls.'
		},
		{
			icon: (
				<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
				</svg>
			),
			title: 'Audit Trails',
			description: 'Complete logging of all system activities for transparency and compliance tracking.'
		},
		{
			icon: (
				<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
				</svg>
			),
			title: 'Right to be Forgotten',
			description: 'Users can request complete data deletion, ensuring full control over personal information.'
		},
		{
			icon: (
				<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
				</svg>
			),
			title: 'Profile Visibility',
			description: 'Control who can see your profile information with granular privacy settings.'
		}
	]

	const privacyControls = [
		{
			title: 'Profile Visibility',
			description: 'Control who can see your profile information'
		},
		{
			title: 'Contact Preferences',
			description: 'Manage how and when you can be contacted'
		},
		{
			title: 'Data Sharing',
			description: 'Explicit consent for data sharing with third parties'
		},
		{
			title: 'Activity Tracking',
			description: 'Transparency in how your data is used and accessed'
		}
	]

	return (
		<section className="py-20 bg-gray-900 text-white">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Section Header */}
				<div className="text-center mb-16">
					<h2 className="text-3xl sm:text-4xl font-bold mb-4">
						Privacy & Security First
					</h2>
					<p className="text-xl text-gray-300 max-w-3xl mx-auto">
						Your data security and privacy are our top priority. We implement enterprise-grade security measures and give you complete control over your information.
					</p>
				</div>

				{/* Security Features Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
					{securityFeatures.map((feature, index) => (
						<div key={index} className="bg-gray-800 rounded-xl p-6 hover:bg-gray-700 transition-colors">
							<div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
								<div className="text-white">
									{feature.icon}
								</div>
							</div>
							<h3 className="text-lg font-semibold mb-3">
								{feature.title}
							</h3>
							<p className="text-gray-300">
								{feature.description}
							</p>
						</div>
					))}
				</div>

				{/* Privacy Controls */}
				<div className="bg-gray-800 rounded-2xl p-8 mb-16">
					<div className="text-center mb-8">
						<h3 className="text-2xl font-bold mb-4">
							You Control Your Data
						</h3>
						<p className="text-gray-300">
							Comprehensive privacy controls put you in charge of your personal information
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
						{privacyControls.map((control, index) => (
							<div key={index} className="text-center">
								<div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
									<svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
									</svg>
								</div>
								<h4 className="text-lg font-semibold mb-2">
									{control.title}
								</h4>
								<p className="text-gray-300 text-sm">
									{control.description}
								</p>
							</div>
						))}
					</div>
				</div>

				{/* Compliance Badges */}
				<div className="bg-gradient-to-r from-blue-900 to-purple-900 rounded-2xl p-8">
					<div className="text-center mb-8">
						<h3 className="text-2xl font-bold mb-4">
							Certified & Compliant
						</h3>
						<p className="text-gray-300">
							We meet the highest standards for data protection and security
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						<div className="text-center">
							<div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
								<span className="text-2xl font-bold text-blue-600">GDPR</span>
							</div>
							<h4 className="text-lg font-semibold mb-2">GDPR Compliant</h4>
							<p className="text-gray-300 text-sm">
								Full compliance with European data protection regulations
							</p>
						</div>
						<div className="text-center">
							<div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
								<svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
								</svg>
							</div>
							<h4 className="text-lg font-semibold mb-2">Enterprise Security</h4>
							<p className="text-gray-300 text-sm">
								Bank-level encryption and security protocols
							</p>
						</div>
						<div className="text-center">
							<div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
								<svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 8h6m-6 4h6" />
								</svg>
							</div>
							<h4 className="text-lg font-semibold mb-2">Audit Ready</h4>
							<p className="text-gray-300 text-sm">
								Complete audit trails and compliance reporting
							</p>
						</div>
					</div>

					<div className="text-center mt-8">
						<p className="text-gray-300 mb-4">
							Want to learn more about our security practices?
						</p>
						<button className="bg-white text-gray-900 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold transition-colors">
							View Security Documentation
						</button>
					</div>
				</div>
			</div>
		</section>
	)
}

export default PrivacySecuritySection 