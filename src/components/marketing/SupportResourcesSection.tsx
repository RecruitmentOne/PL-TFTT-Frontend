function SupportResourcesSection() {
	const supportChannels = [
		{
			icon: (
				<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
				</svg>
			),
			title: '24/7 Help Center',
			description: 'Comprehensive knowledge base and FAQs available around the clock',
			availability: 'Available 24/7',
			color: 'blue'
		},
		{
			icon: (
				<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
				</svg>
			),
			title: 'Email Support',
			description: 'Detailed support for complex issues with expert assistance',
			availability: 'Response within 24 hours',
			color: 'green'
		},
		{
			icon: (
				<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
				</svg>
			),
			title: 'Video Tutorials',
			description: 'Step-by-step guides for platform features and best practices',
			availability: 'Updated weekly',
			color: 'purple'
		},
		{
			icon: (
				<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
				</svg>
			),
			title: 'Webinar Training',
			description: 'Regular training sessions for advanced features and strategies',
			availability: 'Weekly sessions',
			color: 'orange'
		}
	]

	const resources = [
		{
			icon: (
				<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253" />
				</svg>
			),
			title: 'Best Practices Guide',
			description: 'Tips for optimizing your platform experience and maximizing results'
		},
		{
			icon: (
				<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
				</svg>
			),
			title: 'Industry Reports',
			description: 'Market insights and hiring trend analysis for informed decisions'
		},
		{
			icon: (
				<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
				</svg>
			),
			title: 'Community Forum',
			description: 'Connect with other users, share experiences, and get peer support'
		},
		{
			icon: (
				<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
				</svg>
			),
			title: 'API Documentation',
			description: 'Comprehensive API docs for custom integrations and development'
		}
	]

	return (
		<section className="py-20 bg-white">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Section Header */}
				<div className="text-center mb-16">
					<h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
						Support & Resources
					</h2>
					<p className="text-xl text-gray-600 max-w-3xl mx-auto">
						Get the help you need to succeed with comprehensive support channels, training resources, and community connections.
					</p>
				</div>

				{/* Support Channels */}
				<div className="mb-16">
					<h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
						Multiple Ways to Get Help
					</h3>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
						{supportChannels.map((channel, index) => (
							<div key={index} className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow">
								<div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
									channel.color === 'blue' ? 'bg-blue-100' :
									channel.color === 'green' ? 'bg-green-100' :
									channel.color === 'purple' ? 'bg-purple-100' :
									'bg-orange-100'
								}`}>
									<div className={`${
										channel.color === 'blue' ? 'text-blue-600' :
										channel.color === 'green' ? 'text-green-600' :
										channel.color === 'purple' ? 'text-purple-600' :
										'text-orange-600'
									}`}>
										{channel.icon}
									</div>
								</div>
								<h4 className="text-lg font-semibold text-gray-900 mb-2">
									{channel.title}
								</h4>
								<p className="text-gray-600 mb-3 text-sm">
									{channel.description}
								</p>
								<div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
									channel.color === 'blue' ? 'bg-blue-100 text-blue-700' :
									channel.color === 'green' ? 'bg-green-100 text-green-700' :
									channel.color === 'purple' ? 'bg-purple-100 text-purple-700' :
									'bg-orange-100 text-orange-700'
								}`}>
									{channel.availability}
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Additional Resources */}
				<div className="mb-16">
					<h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
						Learning Resources
					</h3>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
						{resources.map((resource, index) => (
							<div key={index} className="bg-white border border-gray-200 rounded-xl p-6 hover:border-blue-300 hover:shadow-md transition-all">
								<div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
									<div className="text-gray-600">
										{resource.icon}
									</div>
								</div>
								<h4 className="text-lg font-semibold text-gray-900 mb-2">
									{resource.title}
								</h4>
								<p className="text-gray-600 text-sm">
									{resource.description}
								</p>
							</div>
						))}
					</div>
				</div>

				{/* Contact Section */}
				<div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
						<div>
							<h3 className="text-2xl font-bold mb-4">
								Need Personalized Support?
							</h3>
							<p className="text-lg mb-6 opacity-90">
								Our expert support team is here to help you succeed. Get personalized assistance tailored to your specific needs.
							</p>
							<div className="space-y-3">
								<div className="flex items-center gap-3">
									<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
									</svg>
									<span>Dedicated account managers for Enterprise plans</span>
								</div>
								<div className="flex items-center gap-3">
									<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
									</svg>
									<span>Custom onboarding and training sessions</span>
								</div>
								<div className="flex items-center gap-3">
									<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
									</svg>
									<span>Priority support and faster response times</span>
								</div>
							</div>
						</div>
						<div className="text-center lg:text-right">
							<div className="bg-white bg-opacity-10 rounded-2xl p-6 mb-6">
								<div className="text-3xl font-bold mb-2">99.5%</div>
								<div className="text-sm opacity-90">Customer Satisfaction Rate</div>
							</div>
							<div className="space-y-3">
								<button className="w-full bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold transition-colors">
									Contact Support
								</button>
								<button className="w-full border-2 border-white text-white hover:bg-white hover:text-blue-600 px-6 py-3 rounded-lg font-semibold transition-colors">
									Schedule Demo
								</button>
							</div>
						</div>
					</div>
				</div>

				{/* FAQ Preview */}
				<div className="mt-16 text-center">
					<h3 className="text-2xl font-bold text-gray-900 mb-4">
						Frequently Asked Questions
					</h3>
					<p className="text-gray-600 mb-6">
						Find quick answers to common questions in our comprehensive FAQ section
					</p>
					<button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
						Browse FAQs
					</button>
				</div>
			</div>
		</section>
	)
}

export default SupportResourcesSection 