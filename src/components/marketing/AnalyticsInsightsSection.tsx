function AnalyticsInsightsSection() {
	const talentAnalytics = [
		{
			icon: (
				<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
				</svg>
			),
			title: 'Profile Performance',
			description: 'Track profile views, likes, and employer interest metrics in real-time'
		},
		{
			icon: (
				<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
				</svg>
			),
			title: 'Market Demand',
			description: 'Get insights into skill demand, salary trends, and industry opportunities'
		},
		{
			icon: (
				<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
				</svg>
			),
			title: 'Career Progression',
			description: 'Monitor your professional growth and career development over time'
		},
		{
			icon: (
				<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
				</svg>
			),
			title: 'Match Quality Feedback',
			description: 'Receive feedback on matching algorithm effectiveness and recommendations'
		}
	]

	const employerAnalytics = [
		{
			icon: (
				<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
				</svg>
			),
			title: 'Hiring Metrics',
			description: 'Track time-to-hire, cost-per-hire, and success rates across positions'
		},
		{
			icon: (
				<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
				</svg>
			),
			title: 'Talent Pool Insights',
			description: 'Analyze market availability, competition, and talent distribution'
		},
		{
			icon: (
				<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
				</svg>
			),
			title: 'Credit Utilization',
			description: 'Optimize credit usage and track ROI on recruitment investments'
		},
		{
			icon: (
				<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
				</svg>
			),
			title: 'Team Performance',
			description: 'Monitor hiring team efficiency and collaboration metrics'
		}
	]

	const insights = [
		{
			metric: '3x',
			label: 'Faster Decision Making',
			description: 'With AI-powered insights and analytics'
		},
		{
			metric: '85%',
			label: 'Improved ROI',
			description: 'Better hiring decisions and cost optimization'
		},
		{
			metric: '50%',
			label: 'Better Match Quality',
			description: 'Data-driven matching improvements'
		},
		{
			metric: '24/7',
			label: 'Real-Time Monitoring',
			description: 'Continuous analytics and insights'
		}
	]

	return (
		<section className="py-20 bg-gradient-to-br from-purple-50 to-blue-50">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Section Header */}
				<div className="text-center mb-16">
					<h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
						Analytics & Insights
					</h2>
					<p className="text-xl text-gray-600 max-w-3xl mx-auto">
						Make data-driven decisions with comprehensive analytics and AI-powered insights for both talent and employers.
					</p>
				</div>

				{/* Analytics for Both User Types */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
					{/* Talent Analytics */}
					<div className="bg-white rounded-2xl p-8 shadow-lg">
						<div className="text-center mb-8">
							<div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
								<svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
								</svg>
							</div>
							<h3 className="text-2xl font-bold text-gray-900 mb-2">For Talent</h3>
							<p className="text-gray-600">Understand your market position and optimize your career</p>
						</div>

						<div className="space-y-6">
							{talentAnalytics.map((item, index) => (
								<div key={index} className="flex items-start gap-4">
									<div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
										<div className="text-blue-600">
											{item.icon}
										</div>
									</div>
									<div className="flex-1">
										<h4 className="text-lg font-semibold text-gray-900 mb-1">
											{item.title}
										</h4>
										<p className="text-gray-600">
											{item.description}
										</p>
									</div>
								</div>
							))}
						</div>

						<div className="mt-8 p-4 bg-blue-50 rounded-lg">
							<div className="flex items-center gap-3">
								<svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
								</svg>
								<span className="text-sm font-medium text-blue-900">
									Get personalized insights to accelerate your career growth
								</span>
							</div>
						</div>
					</div>

					{/* Employer Analytics */}
					<div className="bg-white rounded-2xl p-8 shadow-lg">
						<div className="text-center mb-8">
							<div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
								<svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
								</svg>
							</div>
							<h3 className="text-2xl font-bold text-gray-900 mb-2">For Employers</h3>
							<p className="text-gray-600">Optimize your hiring process and team performance</p>
						</div>

						<div className="space-y-6">
							{employerAnalytics.map((item, index) => (
								<div key={index} className="flex items-start gap-4">
									<div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
										<div className="text-green-600">
											{item.icon}
										</div>
									</div>
									<div className="flex-1">
										<h4 className="text-lg font-semibold text-gray-900 mb-1">
											{item.title}
										</h4>
										<p className="text-gray-600">
											{item.description}
										</p>
									</div>
								</div>
							))}
						</div>

						<div className="mt-8 p-4 bg-green-50 rounded-lg">
							<div className="flex items-center gap-3">
								<svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
								</svg>
								<span className="text-sm font-medium text-green-900">
									Make data-driven hiring decisions with comprehensive analytics
								</span>
							</div>
						</div>
					</div>
				</div>

				{/* Key Insights Metrics */}
				<div className="bg-white rounded-2xl p-8 shadow-lg">
					<div className="text-center mb-8">
						<h3 className="text-2xl font-bold text-gray-900 mb-4">
							AI-Powered Insights Impact
						</h3>
						<p className="text-gray-600">
							See how our analytics help users make better decisions and achieve better outcomes
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
						{insights.map((insight, index) => (
							<div key={index} className="text-center">
								<div className="text-4xl font-bold text-purple-600 mb-2">
									{insight.metric}
								</div>
								<div className="text-lg font-semibold text-gray-900 mb-1">
									{insight.label}
								</div>
								<div className="text-sm text-gray-600">
									{insight.description}
								</div>
							</div>
						))}
					</div>
				</div>

				{/* CTA */}
				<div className="text-center mt-16">
					<div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white">
						<h3 className="text-2xl font-bold mb-4">
							Ready to unlock the power of analytics?
						</h3>
						<p className="text-lg mb-6 opacity-90">
							Start making data-driven decisions today with our comprehensive analytics platform.
						</p>
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<button className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors">
								Start Free Trial
							</button>
							<button className="border-2 border-white text-white hover:bg-white hover:text-purple-600 px-8 py-3 rounded-lg font-semibold transition-colors">
								View Demo
							</button>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default AnalyticsInsightsSection 