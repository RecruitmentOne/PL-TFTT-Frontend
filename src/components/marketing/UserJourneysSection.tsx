function UserJourneysSection() {
	const talentSteps = [
		{
			step: '1',
			title: 'Create Tech Profile',
			description: 'Sign up and verify your account with GitHub/LinkedIn integration',
			icon: (
				<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
				</svg>
			),
			image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80'
		},
		{
			step: '2',
			title: 'AI CV Parsing',
			description: 'Upload CV for OpenAI-powered extraction of tech skills, frameworks, and experience',
			icon: (
				<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
				</svg>
			),
			image: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80'
		},
		{
			step: '3',
			title: 'Smart Tech Matching',
			description: 'Get AI-powered job recommendations based on your programming languages and tech stack',
			icon: (
				<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
				</svg>
			),
			image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80'
		},
		{
			step: '4',
			title: 'Connect with European Tech Companies',
			description: 'Match with leading tech companies in Germany, Switzerland, and across the EU',
			icon: (
				<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
				</svg>
			),
			image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2084&q=80'
		},
		{
			step: '5',
			title: 'Career Analytics & Growth',
			description: 'Track profile performance, salary insights, and European tech market trends',
			icon: (
				<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
				</svg>
			),
			image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80'
		}
	]

	const employerSteps = [
		{
			step: '1',
			title: 'Register Tech Company',
			description: 'Set up company profile with tech stack, team size, and European office locations',
			icon: (
				<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
				</svg>
			),
			image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80'
		},
		{
			step: '2',
			title: 'Choose Pay-Per-View Plan',
			description: 'Flexible €0.0006 per profile pricing with volume discounts for tech recruitment',
			icon: (
				<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
				</svg>
			),
			image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80'
		},
		{
			step: '3',
			title: 'Post Tech Jobs & Search',
			description: 'Create developer job postings and search for React, Python, DevOps talent across EU',
			icon: (
				<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
				</svg>
			),
			image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80'
		},
		{
			step: '4',
			title: 'AI-Powered Tech Screening',
			description: 'Intelligent candidate ranking based on technical skills, GitHub activity, and project experience',
			icon: (
				<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
				</svg>
			),
			image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80'
		},
		{
			step: '5',
			title: 'Hire European Tech Talent',
			description: 'Connect with developers and complete GDPR-compliant hiring process',
			icon: (
				<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
				</svg>
			),
			image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
		}
	]

	return (
		<section className="py-20 bg-white">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Section Header */}
				<div className="text-center mb-16">
					<div className="inline-flex items-center bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
						<svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
						</svg>
						European Tech Recruitment Made Simple
					</div>
					<h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
						How Our Tech Platform Works
					</h2>
					<p className="text-xl text-gray-600 max-w-3xl mx-auto">
						AI-powered journeys designed for tech professionals and companies across Germany, Switzerland, and the EU. 
						From CV parsing to perfect matches in 5 simple steps.
					</p>
				</div>

				{/* User Journeys */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
					{/* Talent Journey */}
					<div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl p-8 shadow-xl">
						<div className="text-center mb-8">
							<div className="w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
								<svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
								</svg>
							</div>
							<h3 className="text-2xl font-bold text-gray-900 mb-2">For Tech Professionals</h3>
							<p className="text-blue-700 font-medium">Your AI-powered European career journey</p>
						</div>

						<div className="space-y-6">
							{talentSteps.map((step, index) => (
								<div key={index} className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
									<div className="flex items-start gap-4">
										<div className="flex-shrink-0">
											<div className="w-12 h-12 bg-blue-600 text-white rounded-xl flex items-center justify-center font-bold text-lg shadow-md">
												{step.step}
											</div>
										</div>
										<div className="flex-1">
											<div className="flex items-center gap-3 mb-2">
												<div className="text-blue-600">
													{step.icon}
												</div>
												<h4 className="text-lg font-semibold text-gray-900">
													{step.title}
												</h4>
											</div>
											<p className="text-gray-600 mb-3">
												{step.description}
											</p>
											<div className="w-full h-24 rounded-lg overflow-hidden">
												<img
													src={step.image}
													alt={step.title}
													className="w-full h-full object-cover"
												/>
											</div>
										</div>
									</div>
								</div>
							))}
						</div>

						<div className="mt-8 text-center">
							<a
								href="/register/talent"
								className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition-colors shadow-lg hover:shadow-xl"
							>
								<svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
								</svg>
								Start Your Tech Career
								<svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
								</svg>
							</a>
						</div>
					</div>

					{/* Employer Journey */}
					<div className="bg-gradient-to-br from-green-50 to-green-100 rounded-3xl p-8 shadow-xl">
						<div className="text-center mb-8">
							<div className="w-20 h-20 bg-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
								<svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
								</svg>
							</div>
							<h3 className="text-2xl font-bold text-gray-900 mb-2">For Tech Companies</h3>
							<p className="text-green-700 font-medium">Smart European tech hiring with AI</p>
						</div>

						<div className="space-y-6">
							{employerSteps.map((step, index) => (
								<div key={index} className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
									<div className="flex items-start gap-4">
										<div className="flex-shrink-0">
											<div className="w-12 h-12 bg-green-600 text-white rounded-xl flex items-center justify-center font-bold text-lg shadow-md">
												{step.step}
											</div>
										</div>
										<div className="flex-1">
											<div className="flex items-center gap-3 mb-2">
												<div className="text-green-600">
													{step.icon}
												</div>
												<h4 className="text-lg font-semibold text-gray-900">
													{step.title}
												</h4>
											</div>
											<p className="text-gray-600 mb-3">
												{step.description}
											</p>
											<div className="w-full h-24 rounded-lg overflow-hidden">
												<img
													src={step.image}
													alt={step.title}
													className="w-full h-full object-cover"
												/>
											</div>
										</div>
									</div>
								</div>
							))}
						</div>

						<div className="mt-8 text-center">
							<a
								href="/register/team"
								className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-semibold transition-colors shadow-lg hover:shadow-xl"
							>
								<svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
								</svg>
								Start Hiring Tech Talent
								<svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
								</svg>
							</a>
						</div>
					</div>
				</div>

				{/* Tech Platform Benefits */}
				<div className="mt-20">
					<div className="bg-gradient-to-r from-gray-900 to-blue-900 rounded-3xl p-8 lg:p-12 text-white">
						<div className="text-center mb-12">
							<h3 className="text-2xl lg:text-3xl font-bold mb-4">Why Choose Our European Tech Platform?</h3>
							<p className="text-blue-200 max-w-2xl mx-auto">
								Built specifically for the European tech ecosystem with AI-powered precision and GDPR compliance
							</p>
						</div>
						
						<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
							<div className="text-center">
								<div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
									<img
										src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
										alt="AI Technology"
										className="w-8 h-8 rounded-lg object-cover"
									/>
								</div>
								<h4 className="text-xl font-semibold mb-2">AI-Enhanced Technology</h4>
								<p className="text-blue-200 text-sm">OpenAI-powered CV parsing and tech stack matching</p>
							</div>
							<div className="text-center">
								<div className="w-16 h-16 bg-green-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
									<img
										src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
										alt="Fast Hiring"
										className="w-8 h-8 rounded-lg object-cover"
									/>
								</div>
								<h4 className="text-xl font-semibold mb-2">Streamlined Hiring</h4>
								<p className="text-green-200 text-sm">Streamlined tech recruitment process</p>
							</div>
							<div className="text-center">
								<div className="w-16 h-16 bg-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
									<img
										src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
										alt="GDPR Compliance"
										className="w-8 h-8 rounded-lg object-cover"
									/>
								</div>
								<h4 className="text-xl font-semibold mb-2">100% GDPR Compliant</h4>
								<p className="text-purple-200 text-sm">Full European data protection compliance</p>
							</div>
							<div className="text-center">
								<div className="w-16 h-16 bg-yellow-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
									<img
										src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
										alt="Cost Effective"
										className="w-8 h-8 rounded-lg object-cover"
									/>
								</div>
								<h4 className="text-xl font-semibold mb-2">€0.0006 Per View</h4>
								<p className="text-yellow-200 text-sm">Transparent pay-per-view pricing model</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default UserJourneysSection 