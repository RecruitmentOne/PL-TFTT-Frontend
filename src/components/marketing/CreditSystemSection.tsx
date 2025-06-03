function CreditSystemSection() {
	const plans = [
		{
			name: 'Starter',
			description: 'Perfect for small companies with occasional hiring needs',
			credits: '50',
			price: '€199',
			period: '/month',
			features: [
				'50 CV & contact accesses per month',
				'Basic candidate search',
				'Email support',
				'Standard analytics',
				'Direct candidate communication'
			],
			recommended: false,
			color: 'blue'
		},
		{
			name: 'Professional',
			description: 'Ideal for growing companies with regular recruitment',
			credits: '200',
			price: '€599',
			period: '/month',
			features: [
				'200 CV & contact accesses per month',
				'Advanced AI-powered search',
				'Priority support',
				'Advanced analytics & insights',
				'Bulk operations',
				'Custom employer branding'
			],
			recommended: true,
			color: 'green'
		},
		{
			name: 'Enterprise',
			description: 'Comprehensive solution for large organizations',
			credits: 'Unlimited',
			price: '€1499',
			period: '/month',
			features: [
				'Unlimited CV & contact accesses',
				'AI-powered candidate recommendations',
				'Dedicated account manager',
				'Custom analytics dashboard',
				'API access for integrations',
				'White-label options'
			],
			recommended: false,
			color: 'purple'
		}
	]

	const benefits = [
		{
			icon: (
				<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
				</svg>
			),
			title: 'Pay for CV Access',
			description: 'Only pay when accessing full CV and contact details of qualified EU candidates'
		},
		{
			icon: (
				<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a3 3 0 01-3-3V4a3 3 0 013-3h4a3 3 0 013 3v4z" />
				</svg>
			),
			title: 'Direct Communication',
			description: 'Connect directly with candidates after mutual interest - no recruitment agency fees'
		},
		{
			icon: (
				<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
				</svg>
			),
			title: 'AI-Powered Matching',
			description: 'Advanced algorithms match candidates to your requirements with intelligent technology'
		},
		{
			icon: (
				<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
				</svg>
			),
			title: 'Cost-Effective',
			description: 'Transparent pricing starting at €4 per CV access - save up to 80% vs recruitment agencies'
		}
	]

	return (
		<section className="py-20 bg-white">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Section Header */}
				<div className="text-center mb-16">
					<h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
						Transparent Credit System for Hiring EU Talent
					</h2>
					<p className="text-xl text-gray-600 max-w-3xl mx-auto">
						Pay only for CV and contact details you access. Connect directly with skilled EU professionals through AI-powered matching and transparent pricing.
					</p>
				</div>

				{/* How It Works */}
				<div className="mb-16">
					<h3 className="text-2xl font-bold text-gray-900 text-center mb-8">How the Credit System Works</h3>
					<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
						{benefits.map((benefit, index) => (
							<div key={index} className="text-center">
								<div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
									<div className="text-blue-600">
										{benefit.icon}
									</div>
								</div>
								<h4 className="text-lg font-semibold text-gray-900 mb-2">
									{benefit.title}
								</h4>
								<p className="text-gray-600">
									{benefit.description}
								</p>
							</div>
						))}
					</div>
				</div>

				{/* Pricing Plans */}
				<div className="mb-16">
					<h3 className="text-2xl font-bold text-gray-900 text-center mb-8">Choose Your Plan</h3>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						{plans.map((plan, index) => (
							<div
								key={index}
								className={`relative bg-white rounded-2xl shadow-lg border-2 ${
									plan.recommended 
										? 'border-green-500 transform scale-105' 
										: 'border-gray-200'
								} transition-all duration-300 hover:shadow-xl`}
							>
								{plan.recommended && (
									<div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
										<span className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
											Recommended
										</span>
									</div>
								)}
								
								<div className="p-8">
									<div className="text-center mb-8">
										<h4 className="text-2xl font-bold text-gray-900 mb-2">
											{plan.name}
										</h4>
										<p className="text-gray-600 mb-4">
											{plan.description}
										</p>
										<div className="flex items-center justify-center mb-4">
											<span className="text-4xl font-bold text-gray-900">
												{plan.price}
											</span>
											<span className="text-gray-600 ml-1">
												{plan.period}
											</span>
										</div>
										<div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
											plan.color === 'blue' ? 'bg-blue-100 text-blue-700' :
											plan.color === 'green' ? 'bg-green-100 text-green-700' :
											'bg-purple-100 text-purple-700'
										}`}>
											{plan.credits} Credits
										</div>
									</div>

									<ul className="space-y-3 mb-8">
										{plan.features.map((feature, featureIndex) => (
											<li key={featureIndex} className="flex items-center">
												<svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
													<path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
												</svg>
												<span className="text-gray-600">
													{feature}
												</span>
											</li>
										))}
									</ul>

									<button
										className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
											plan.recommended
												? 'bg-green-600 hover:bg-green-700 text-white'
												: 'bg-gray-900 hover:bg-gray-800 text-white'
										}`}
									>
										Get Started
									</button>
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Additional Benefits */}
				<div className="bg-gray-50 rounded-2xl p-8">
					<div className="text-center mb-8">
						<h3 className="text-2xl font-bold text-gray-900 mb-4">
							Why Choose Our Credit System?
						</h3>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
						<div className="text-center">
							<div className="text-3xl font-bold text-blue-600 mb-2">AI-Enhanced</div>
							<div className="text-sm text-gray-600">AI Matching Accuracy</div>
						</div>
						<div className="text-center">
							<div className="text-3xl font-bold text-green-600 mb-2">€4</div>
							<div className="text-sm text-gray-600">Average Cost Per CV Access</div>
						</div>
						<div className="text-center">
							<div className="text-3xl font-bold text-purple-600 mb-2">60%</div>
							<div className="text-sm text-gray-600">Faster Hiring Process</div>
						</div>
						<div className="text-center">
							<div className="text-3xl font-bold text-orange-600 mb-2">100%</div>
							<div className="text-sm text-gray-600">GDPR Compliant</div>
						</div>
					</div>

					<div className="text-center mt-8">
						<p className="text-gray-600 mb-4">
							Need a custom plan for your organization?
						</p>
						<button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
							Contact Sales
						</button>
					</div>
				</div>
			</div>
		</section>
	)
}

export default CreditSystemSection 