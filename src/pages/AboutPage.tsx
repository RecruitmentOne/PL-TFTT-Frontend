import { useTranslation } from 'react-i18next'
import { useBrand, useBrandColors } from '../brand'
import { Link } from 'react-router-dom'
import {
	Globe,
	Users,
	CreditCard,
	Shield,
	ArrowRight,
	CheckCircle,
	TrendingUp,
	MapPin,
	Clock,
	DollarSign
} from 'lucide-react'

function AboutPage() {
	const { t } = useTranslation()
	const { isTeamsVariant } = useBrand()
	const colors = useBrandColors()

	const euCountries = [
		{ 
			name: 'Austria', 
			flag: '🇦🇹', 
			talent: '8K+',
			cities: ['Vienna', 'Graz', 'Salzburg'],
			image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80'
		},
		{ 
			name: 'Slovakia', 
			flag: '🇸🇰', 
			talent: '6K+',
			cities: ['Bratislava', 'Košice', 'Žilina'],
			image: 'https://images.unsplash.com/photo-1551269901-5c5e14c25df7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1469&q=80'
		},
		{ 
			name: 'Czech Republic', 
			flag: '🇨🇿', 
			talent: '12K+',
			cities: ['Prague', 'Brno', 'Ostrava'],
			image: 'https://images.unsplash.com/photo-1541849546-216549ae216d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80'
		},
		{ 
			name: 'Hungary', 
			flag: '🇭🇺', 
			talent: '9K+',
			cities: ['Budapest', 'Debrecen', 'Szeged'],
			image: 'https://images.unsplash.com/photo-1520986606214-8b456906c813?ixlib=rb-4.0.3&auto=format&fit=crop&w=1469&q=80'
		},
		{ 
			name: 'Bulgaria', 
			flag: '🇧🇬', 
			talent: '7K+',
			cities: ['Sofia', 'Plovdiv', 'Varna'],
			image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80'
		},
		{ 
			name: 'Poland', 
			flag: '🇵🇱', 
			talent: '15K+',
			cities: ['Warsaw', 'Krakow', 'Gdansk'],
			image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=1469&q=80'
		},
		{ 
			name: 'Romania', 
			flag: '🇷🇴', 
			talent: '11K+',
			cities: ['Bucharest', 'Cluj-Napoca', 'Timișoara'],
			image: 'https://images.unsplash.com/photo-1555445916-c4c8e0dcf7ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=1469&q=80'
		}
	]

	const targetMarkets = [
		{
			country: 'Germany',
			flag: '🇩🇪',
			jobs: '6.8K+',
			avgSalary: '€65-120K',
			cities: ['Berlin', 'Munich', 'Frankfurt', 'Stuttgart', 'Hamburg'],
			highlights: ['Direct work eligibility', 'EU freedom of movement', 'Immediate employment opportunities'],
			image: 'https://images.unsplash.com/photo-1546726747-421c6d69c929?ixlib=rb-4.0.3&auto=format&fit=crop&w=1325&q=80'
		},
		{
			country: 'Switzerland',
			flag: '🇨🇭',
			jobs: '4.2K+',
			avgSalary: '€85-180K',
			cities: ['Zurich', 'Basel', 'Geneva', 'Bern', 'Lausanne'],
			highlights: ['Premium salaries', 'EU bilateral agreements', 'Direct employer access'],
			image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80'
		}
	]

	return (
		<div 
			className="min-h-screen py-20"
			style={{ backgroundColor: colors.background }}
		>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Hero Section */}
				<div className="text-center mb-20 relative">
					{/* Background Image */}
					<div className="absolute inset-0 -z-10">
						<img
							src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2084&q=80"
							alt="European tech professionals collaborating"
							className="w-full h-full object-cover opacity-5 rounded-3xl"
						/>
					</div>
					
					{/* Floating badge */}
					<div 
						className="inline-flex items-center px-6 py-3 rounded-full text-sm font-bold mb-6"
						style={{
							background: `linear-gradient(135deg, ${colors.primary}20, ${colors.secondary}15)`,
							border: `2px solid ${colors.primary}30`,
							color: colors.primary
						}}
					>
						<Globe className="w-5 h-5 mr-2" />
						{t('about.badge', 'EU Freedom of Movement Platform')}
					</div>
					
					<h1 
						className="text-4xl sm:text-6xl font-bold mb-6 font-brand"
						style={{ color: colors.text.primary }}
					>
						<span className="bg-gradient-to-r bg-clip-text text-transparent"
							style={{
								backgroundImage: `linear-gradient(45deg, ${colors.primary}, ${colors.secondary})`
							}}>
							{t('about.hero.title', 'Connecting EU Tech Talent with German & Swiss Opportunities')}
						</span>
					</h1>
					<p 
						className="text-xl lg:text-2xl max-w-4xl mx-auto leading-relaxed"
						style={{ color: colors.text.secondary }}
					>
						{t('about.heroSubtitle', "We connect talented EU professionals with leading tech companies in Germany and Switzerland. Direct connections, AI-powered matching - streamlined recruitment without agencies.")}
					</p>
				</div>

				{/* Business Model Section */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
					<div>
						<h2 
							className="text-3xl lg:text-4xl font-bold mb-6 font-brand"
							style={{ color: colors.text.primary }}
						>
							{t('about.mission.title', 'Our EU-Focused Mission')}
						</h2>
						<p 
							className="text-lg mb-6"
							style={{ color: colors.text.secondary }}
						>
							{t('about.mission.description1', 'We leverage EU freedom of movement to connect talented developers, engineers, and data scientists from Austria, Slovakia, Czech Republic, Hungary, Bulgaria, Poland, and Romania with thriving tech companies in Germany and Switzerland.')}
						</p>
						<p 
							className="text-lg mb-8"
							style={{ color: colors.text.secondary }}
						>
							{t('about.mission.description2', 'Our credit-based platform eliminates recruitment agencies, enabling direct employer-candidate communication and transparent, scalable hiring costs.')}
						</p>
						
						{/* Key Advantages */}
						<div className="space-y-4 mb-8">
							{[
								{ icon: CheckCircle, text: 'Direct work eligibility - EU citizens can work immediately' },
								{ icon: CreditCard, text: 'Transparent pay-per-CV pricing (€4-12 per profile)' },
								{ icon: Users, text: 'Direct employer-candidate communication' },
								{ icon: Shield, text: 'Advanced AI matching technology with full GDPR compliance' }
							].map((advantage, index) => (
								<div key={index} className="flex items-center gap-3">
									<advantage.icon className="w-6 h-6 flex-shrink-0" style={{ color: colors.primary }} />
									<span style={{ color: colors.text.secondary }}>{advantage.text}</span>
								</div>
							))}
						</div>
						
						{/* Key Stats */}
						<div className="grid grid-cols-2 gap-6">
							<div 
								className="text-center p-4 rounded-lg"
								style={{ backgroundColor: `${colors.primary}10` }}
							>
								<div 
									className="text-2xl font-bold"
									style={{ color: colors.primary }}
								>
									68K+
								</div>
								<div 
									className="text-sm"
									style={{ color: colors.text.secondary }}
								>
									{t('about.stats.professionals', 'EU Tech Professionals')}
								</div>
							</div>
							<div 
								className="text-center p-4 rounded-lg"
								style={{ backgroundColor: `${colors.secondary}10` }}
							>
								<div 
									className="text-2xl font-bold"
									style={{ color: colors.secondary }}
								>
									11K+
								</div>
								<div 
									className="text-sm"
									style={{ color: colors.text.secondary }}
								>
									{t('about.stats.companies', 'DE & CH Jobs')}
								</div>
							</div>
						</div>
					</div>
					
					<div 
						className="rounded-2xl p-8 relative"
						style={{ 
							background: `linear-gradient(to bottom right, ${colors.surface}, ${colors.background})` 
						}}
					>
						{/* Mission Image */}
						<img
							src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
							alt="Modern European tech office"
							className="w-full h-64 object-cover rounded-xl mb-6"
						/>
						<div className="text-center">
							<div 
								className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
								style={{ backgroundColor: colors.primary }}
							>
								<svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
								</svg>
							</div>
							<h3 
								className="text-2xl font-bold mb-4 font-brand"
								style={{ color: colors.text.primary }}
							>
								{t('about.aiMatching.title', 'AI-Powered EU Talent Matching')}
							</h3>
							<p style={{ color: colors.text.secondary }}>
								{t('about.aiMatching.description', 'Our OpenAI-powered algorithms analyze technical skills, frameworks, and project experience to match EU professionals with German and Swiss opportunities.')}
							</p>
						</div>
					</div>
				</div>

				{/* EU Source Markets Section */}
				<div 
					className="mb-20 rounded-3xl p-8 lg:p-12"
					style={{ backgroundColor: colors.surface }}
				>
					<div className="text-center mb-12">
						<h2 
							className="text-3xl font-bold mb-4 font-brand"
							style={{ color: colors.text.primary }}
						>
							{t('about.euMarkets.title', 'EU Talent Source Markets')}
						</h2>
						<p 
							className="text-xl max-w-3xl mx-auto"
							style={{ color: colors.text.secondary }}
						>
							{t('about.euMarkets.subtitle', "EU citizens from these countries can work immediately in Germany and Switzerland - direct employment eligibility")}
						</p>
					</div>
					
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
						{euCountries.map((country, index) => (
							<div 
								key={index} 
								className="rounded-xl p-6 hover:shadow-lg transition-all duration-300 group"
								style={{ backgroundColor: colors.background }}
							>
								<img
									src={country.image}
									alt={`${country.name} tech scene`}
									className="w-full h-32 object-cover rounded-lg mb-4 group-hover:scale-105 transition-transform"
								/>
								<div className="text-center">
									<h3 
										className="text-xl font-semibold mb-2 font-brand"
										style={{ color: colors.text.primary }}
									>
										{country.name} {country.flag}
									</h3>
									<div 
										className="px-3 py-1 rounded-full text-sm font-bold mb-3 inline-block"
										style={{ 
											backgroundColor: `${colors.primary}15`,
											color: colors.primary 
										}}
									>
										{country.talent} Tech Professionals
									</div>
									<div className="space-y-1">
										{country.cities.map((city, idx) => (
											<div 
												key={idx} 
												className="text-xs flex items-center justify-center gap-1"
												style={{ color: colors.text.secondary }}
											>
												<MapPin className="w-3 h-3" />
												{city}
											</div>
										))}
									</div>
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Target Markets Section */}
				<div className="mb-20">
					<div className="text-center mb-12">
						<h2 
							className="text-3xl font-bold mb-4 font-brand"
							style={{ color: colors.text.primary }}
						>
							{t('about.targetMarkets.title', 'German & Swiss Tech Opportunities')}
						</h2>
						<p 
							className="text-xl max-w-3xl mx-auto"
							style={{ color: colors.text.secondary }}
						>
							{t('about.targetMarkets.subtitle', "Premium tech opportunities with immediate work eligibility for EU professionals")}
						</p>
					</div>

					<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
						{targetMarkets.map((market, index) => (
							<div 
								key={index}
								className="rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
								style={{ backgroundColor: colors.background }}
							>
								<div className="relative h-48">
									<img
										src={market.image}
										alt={`${market.country} tech market`}
										className="w-full h-full object-cover"
									/>
									<div className="absolute inset-0 bg-black bg-opacity-40"></div>
									<div className="absolute top-4 left-4">
										<div 
											className="px-4 py-2 rounded-full text-white font-bold"
											style={{ backgroundColor: `${colors.primary}90` }}
										>
											{market.country} {market.flag}
										</div>
									</div>
									<div className="absolute bottom-4 right-4 text-white text-right">
										<div className="text-2xl font-bold">{market.jobs}</div>
										<div className="text-sm">Tech Jobs Available</div>
									</div>
								</div>
								
								<div className="p-6">
									<div className="flex items-center justify-between mb-4">
										<div className="flex items-center gap-2">
											<DollarSign className="w-5 h-5" style={{ color: colors.secondary }} />
											<span className="font-bold" style={{ color: colors.text.primary }}>
												{market.avgSalary}
											</span>
										</div>
										<div className="flex items-center gap-2" style={{ color: colors.text.secondary }}>
											<TrendingUp className="w-4 h-4" />
											<span className="text-sm">Growing market</span>
										</div>
									</div>
									
									<div className="mb-4">
										<h4 
											className="font-semibold mb-2"
											style={{ color: colors.text.primary }}
										>
											Key Tech Cities:
										</h4>
										<div className="flex flex-wrap gap-2">
											{market.cities.map((city, idx) => (
												<span 
													key={idx}
													className="px-3 py-1 rounded-full text-sm"
													style={{ 
														backgroundColor: `${colors.secondary}15`,
														color: colors.secondary 
													}}
												>
													{city}
												</span>
											))}
										</div>
									</div>
									
									<div>
										<h4 
											className="font-semibold mb-2"
											style={{ color: colors.text.primary }}
										>
											EU Advantages:
										</h4>
										<div className="space-y-2">
											{market.highlights.map((highlight, idx) => (
												<div key={idx} className="flex items-center gap-2">
													<CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: colors.primary }} />
													<span className="text-sm" style={{ color: colors.text.secondary }}>
														{highlight}
													</span>
												</div>
											))}
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Platform Values Section */}
				<div className="mb-20">
					<h2 
						className="text-3xl font-bold text-center mb-12 font-brand"
						style={{ color: colors.text.primary }}
					>
						{t('about.values.title', 'Our Tech-First Values')}
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						<div 
							className="text-center p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow"
							style={{ backgroundColor: colors.background }}
						>
							<div className="relative mb-6">
								<img
									src="https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
									alt="Code quality and precision"
									className="w-full h-48 object-cover rounded-lg"
								/>
								<div 
									className="absolute inset-0 bg-opacity-90 rounded-lg flex items-center justify-center"
									style={{ backgroundColor: colors.primary }}
								>
									<CheckCircle className="w-16 h-16 text-white" />
								</div>
							</div>
							<h3 
								className="text-xl font-semibold mb-3 font-brand"
								style={{ color: colors.text.primary }}
							>
								{t('about.values.quality.title', 'Quality EU Matches')}
							</h3>
							<p style={{ color: colors.text.secondary }}>
								{t('about.values.quality.description', 'We prioritize precise tech matches between skilled EU developers and German/Swiss companies, ensuring meaningful connections with immediate work eligibility.')}
							</p>
						</div>
						
						<div 
							className="text-center p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow"
							style={{ backgroundColor: colors.background }}
						>
							<div className="relative mb-6">
								<img
									src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
									alt="Data privacy and security"
									className="w-full h-48 object-cover rounded-lg"
								/>
								<div 
									className="absolute inset-0 bg-opacity-90 rounded-lg flex items-center justify-center"
									style={{ backgroundColor: colors.secondary }}
								>
									<Shield className="w-16 h-16 text-white" />
								</div>
							</div>
							<h3 
								className="text-xl font-semibold mb-3 font-brand"
								style={{ color: colors.text.primary }}
							>
								{t('about.values.privacy.title', 'Transparent Pricing')}
							</h3>
							<p style={{ color: colors.text.secondary }}>
								{t('about.values.privacy.description', 'Our credit-based system (€4-12 per CV) offers transparent, scalable pricing. No hidden fees, no long-term contracts - just pay for qualified candidate access.')}
							</p>
						</div>
						
						<div 
							className="text-center p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow"
							style={{ backgroundColor: colors.background }}
						>
							<div className="relative mb-6">
								<img
									src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
									alt="AI innovation and technology"
									className="w-full h-48 object-cover rounded-lg"
								/>
								<div 
									className="absolute inset-0 bg-opacity-90 rounded-lg flex items-center justify-center"
									style={{ backgroundColor: colors.text.secondary }}
								>
									<svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
									</svg>
								</div>
							</div>
							<h3 
								className="text-xl font-semibold mb-3 font-brand"
								style={{ color: colors.text.primary }}
							>
								{t('about.values.innovation.title', 'Direct Communication')}
							</h3>
							<p style={{ color: colors.text.secondary }}>
								{t('about.values.innovation.description', 'We eliminate recruitment agency middlemen, enabling direct employer-candidate communication after mutual interest confirmation for faster, more efficient hiring.')}
							</p>
						</div>
					</div>
				</div>

				{/* Tech Stack & Platform Section */}
				<div className="mb-20 bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 lg:p-12 text-white">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
						<div>
							<h2 className="text-3xl font-bold mb-6">Built for European Tech Markets</h2>
							<p className="text-lg text-gray-300 mb-8">
								Our platform leverages cutting-edge AI technology and deep understanding of European employment regulations to create seamless tech recruitment experiences.
							</p>
							
							<div className="grid grid-cols-2 gap-6">
								<div>
									<h4 className="font-semibold text-white mb-3">AI Technology</h4>
									<div className="space-y-2">
										{['OpenAI GPT-4o', 'AI-Enhanced CV Parsing', 'Smart Matching', 'Tech Stack Analysis'].map((tech) => (
											<div key={tech} className="bg-blue-900/30 text-blue-200 px-3 py-1 rounded text-sm">
												{tech}
											</div>
										))}
									</div>
								</div>
								<div>
									<h4 className="font-semibold text-white mb-3">EU Compliance</h4>
									<div className="space-y-2">
										{['GDPR Compliant', 'EU Data Protection', 'Secure Infrastructure', 'Privacy by Design'].map((tech) => (
											<div key={tech} className="bg-green-900/30 text-green-200 px-3 py-1 rounded text-sm">
												{tech}
											</div>
										))}
									</div>
								</div>
							</div>
						</div>
						
						<div className="relative">
							<img
								src="https://images.unsplash.com/photo-1504639725590-34d0984388bd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1374&q=80"
								alt="Code and development workspace"
								className="rounded-xl shadow-2xl"
							/>
							{/* Code overlay effect */}
							<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-xl"></div>
							<div className="absolute bottom-6 left-6">
								<div className="text-lg font-semibold">68K+ EU Professionals</div>
								<div className="text-sm text-gray-300">Ready for German & Swiss opportunities</div>
							</div>
						</div>
					</div>
				</div>

				{/* CTA Section */}
				<div className="text-center">
					<div 
						className="rounded-3xl p-8 lg:p-12 relative overflow-hidden"
						style={{
							background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`
						}}
					>
						<div className="relative z-10">
							<h3 className="text-3xl lg:text-4xl font-bold mb-6 text-white">
								{t('about.cta.title', 'Ready to Connect EU Talent with German & Swiss Opportunities?')}
							</h3>
							<p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
								{t('about.cta.subtitle', 'Join thousands of EU tech professionals and German/Swiss companies using our AI-powered platform')}
							</p>
							
							<div className="flex flex-col sm:flex-row gap-6 justify-center">
								<Link
									to="/register/talent"
									className="group inline-flex items-center justify-center px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300"
									style={{
										backgroundColor: colors.text.inverse,
										color: colors.primary
									}}
								>
									<Users className="w-6 h-6 mr-3" />
									{t('about.cta.joinTalent', 'Join as EU Tech Professional')}
									<ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform" />
								</Link>
								
								<Link
									to="/register/team"
									className="group inline-flex items-center justify-center px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 border-2 border-white text-white hover:bg-white"
									style={{
										backgroundColor: 'transparent'
									}}
									onMouseEnter={(e) => {
										e.currentTarget.style.backgroundColor = colors.text.inverse
										e.currentTarget.style.color = colors.primary
									}}
									onMouseLeave={(e) => {
										e.currentTarget.style.backgroundColor = 'transparent'
										e.currentTarget.style.color = 'white'
									}}
								>
									<Globe className="w-6 h-6 mr-3" />
									{t('about.cta.hireTeam', 'Hire EU Tech Talent')}
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default AboutPage 