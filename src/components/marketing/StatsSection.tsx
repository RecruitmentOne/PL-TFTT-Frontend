function StatsSection() {
	const stats = [
		{
			value: '50K+',
			label: 'EU Tech Professionals',
			description: 'Verified developers, engineers, and data scientists ready for German & Swiss opportunities',
			image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
			color: 'from-blue-500 to-blue-600'
		},
		{
			value: '60-80%',
			label: 'Cost Savings',
			description: 'Reduced recruitment costs vs traditional agencies with transparent pay-per-CV pricing',
			image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
			color: 'from-green-500 to-green-600'
		},
		{
			value: '90%+',
			label: 'AI Match Accuracy',
			description: 'Advanced machine learning algorithms for precise candidate-role matching',
			image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
			color: 'from-purple-500 to-purple-600'
		},
		{
			value: '60%',
			label: 'Faster Hiring',
			description: 'Accelerated recruitment process through direct employer-candidate connections',
			image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
			color: 'from-orange-500 to-orange-600'
		},
		{
			value: '€4-12',
			label: 'Per CV Access',
			description: 'Transparent, scalable pricing starting from €4 per qualified candidate profile',
			image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
			color: 'from-indigo-500 to-indigo-600'
		},
		{
			value: '100%',
			label: 'GDPR Compliant',
			description: 'Enterprise-grade security and full European data protection compliance',
			image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
			color: 'from-red-500 to-red-600'
		},
	]

	const techHubs = [
		{ city: 'Berlin', country: 'Germany', jobs: '4.2K+', talent: '15K+', flag: '🇩🇪' },
		{ city: 'Zurich', country: 'Switzerland', jobs: '2.8K+', talent: '8K+', flag: '🇨🇭' },
		{ city: 'Munich', country: 'Germany', jobs: '2.4K+', talent: '12K+', flag: '🇩🇪' },
		{ city: 'Basel', country: 'Switzerland', jobs: '1.5K+', talent: '6K+', flag: '🇨🇭' },
	]

	return (
		<section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Section Header */}
				<div className="text-center mb-16">
					<div className="inline-flex items-center bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
						<svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
						</svg>
						Platform Performance Metrics
					</div>
					<h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
						Measurable Results for European Tech Recruitment
					</h2>
					<p className="text-xl text-gray-600 max-w-3xl mx-auto">
						Our AI-powered platform delivers quantifiable results for tech companies and professionals across Germany, Switzerland, and the EU. See the metrics that drive our success.
					</p>
				</div>

				{/* Stats Grid */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
					{stats.map((stat, index) => (
						<div
							key={index}
							className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
						>
							{/* Background Image */}
							<div className="relative h-32 overflow-hidden">
								<img
									src={stat.image}
									alt={stat.label}
									className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
								/>
								<div className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-80`}></div>
								<div className="absolute inset-0 flex items-center justify-center">
									<div className="text-center text-white">
										<div className="text-3xl sm:text-4xl font-bold mb-1">
											{stat.value}
										</div>
										<div className="text-lg font-semibold">
											{stat.label}
										</div>
									</div>
								</div>
							</div>
							
							{/* Content */}
							<div className="p-6">
								<p className="text-gray-600 text-center">
									{stat.description}
								</p>
							</div>
						</div>
					))}
				</div>

				{/* European Tech Hubs */}
				<div className="bg-white rounded-3xl p-8 shadow-xl mb-16">
					<div className="text-center mb-8">
						<h3 className="text-2xl font-bold text-gray-900 mb-4">German & Swiss Tech Market Coverage</h3>
						<p className="text-gray-600">Active opportunities and talent pool across primary German and Swiss tech centers</p>
					</div>
					
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
						{techHubs.map((hub, index) => (
							<div key={index} className="text-center p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
								<div className="text-3xl mb-2">{hub.flag}</div>
								<h4 className="text-lg font-semibold text-gray-900 mb-1">{hub.city}</h4>
								<p className="text-sm text-gray-600 mb-3">{hub.country}</p>
								<div className="space-y-2">
									<div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
										{hub.jobs} Jobs
									</div>
									<div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
										{hub.talent} Talent
									</div>
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Tech Platform Features */}
				<div className="bg-white rounded-3xl p-8 shadow-xl">
					<div className="text-center mb-8">
						<h3 className="text-2xl font-bold text-gray-900 mb-4">
							Why Tech Professionals & Companies Choose Us
						</h3>
						<p className="text-gray-600">Advanced AI technology meets European tech expertise</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						<div className="text-center p-6">
							<div className="relative mb-6">
								<img
									src="https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
									alt="OpenAI CV Parsing"
									className="w-full h-32 object-cover rounded-xl"
								/>
								<div className="absolute inset-0 bg-blue-600 bg-opacity-90 rounded-xl flex items-center justify-center">
									<svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
									</svg>
								</div>
							</div>
							<h4 className="text-lg font-semibold text-gray-900 mb-2">OpenAI-Powered CV Parsing</h4>
							<p className="text-gray-600">Advanced AI extracts technical skills, programming languages, and project experience with cutting-edge technology</p>
						</div>
						
						<div className="text-center p-6">
							<div className="relative mb-6">
								<img
									src="https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
									alt="Tech Stack Matching"
									className="w-full h-32 object-cover rounded-xl"
								/>
								<div className="absolute inset-0 bg-green-600 bg-opacity-90 rounded-xl flex items-center justify-center">
									<svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
									</svg>
								</div>
							</div>
							<h4 className="text-lg font-semibold text-gray-900 mb-2">Smart Tech Stack Matching</h4>
							<p className="text-gray-600">Intelligent matching based on React, Python, Kubernetes, and other technologies for perfect role fit</p>
						</div>
						
						<div className="text-center p-6">
							<div className="relative mb-6">
								<img
									src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
									alt="GDPR Compliance"
									className="w-full h-32 object-cover rounded-xl"
								/>
								<div className="absolute inset-0 bg-purple-600 bg-opacity-90 rounded-xl flex items-center justify-center">
									<svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
									</svg>
								</div>
							</div>
							<h4 className="text-lg font-semibold text-gray-900 mb-2">Enterprise-Grade Security</h4>
							<p className="text-gray-600">Full GDPR compliance with enterprise security for technical data and professional information</p>
						</div>
					</div>
				</div>

				{/* Success Indicators */}
				<div className="mt-16">
					<div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 text-white">
						<div className="text-center mb-8">
							<h3 className="text-2xl font-bold mb-4">
								The European Tech Platform of Choice
							</h3>
							<p className="text-blue-100 max-w-2xl mx-auto">
								Join thousands of tech professionals and companies who trust our AI-powered platform for their European recruitment needs
							</p>
						</div>

						<div className="grid grid-cols-2 md:grid-cols-4 gap-6">
							<div className="text-center">
								<div className="text-3xl font-bold mb-1">Higher</div>
								<div className="text-blue-200 font-medium">Match Quality</div>
								<div className="text-blue-300 text-sm">vs traditional methods</div>
							</div>
							<div className="text-center">
								<div className="text-3xl font-bold mb-1">Faster</div>
								<div className="text-blue-200 font-medium">Tech Hiring</div>
								<div className="text-blue-300 text-sm">60% time reduction</div>
							</div>
							<div className="text-center">
								<div className="text-3xl font-bold mb-1">Lower</div>
								<div className="text-blue-200 font-medium">Cost per Hire</div>
								<div className="text-blue-300 text-sm">transparent pricing</div>
							</div>
							<div className="text-center">
								<div className="text-3xl font-bold mb-1">Better</div>
								<div className="text-blue-200 font-medium">User Experience</div>
								<div className="text-blue-300 text-sm">4.8/5 rating</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default StatsSection 