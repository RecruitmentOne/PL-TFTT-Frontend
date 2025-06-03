import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useBrand, useBrandColors } from '../../brand'
import { 
	BrandedH1, 
	BrandedH2, 
	BrandedH3, 
	BrandedP, 
	BrandedSpan,
	BrandedCard,
	BrandedSection 
} from '../../components/brand'
import { 
	ArrowRight, 
	CheckCircle, 
	Star, 
	Zap, 
	Users, 
	TrendingUp, 
	MapPin, 
	Code, 
	Building, 
	Briefcase,
	Target,
	Award,
	Shield,
	Globe,
	Bot,
	Brain,
	Sparkles,
	Play,
	ChevronRight,
	Upload,
	Search,
	MessageCircle
} from 'lucide-react'

function HomePage() {
	const { t } = useTranslation()
	const { switchVariant } = useBrand()
	const colors = useBrandColors()
	const [activeTestimonial, setActiveTestimonial] = useState(0)
	const [activeFeature, setActiveFeature] = useState(0)

	useEffect(() => {
		// Default to talent variant for homepage
		switchVariant('talent')
	}, [switchVariant])

	const testimonials = [
		{
			name: 'Sarah Chen',
			role: 'Senior React Developer',
			company: 'Berlin Tech Startup',
			companyLogo: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=60&h=60&fit=crop',
			image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=120&h=120&fit=crop&crop=face',
			quote: 'Found my dream job in Berlin within 2 weeks. The AI matching was incredible!',
			flag: '🇩🇪',
			salary: '+45% salary increase',
			background: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
		},
		{
			name: 'Marco Silva',
			role: 'DevOps Engineer',
			company: 'Zurich Fintech',
			companyLogo: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=60&h=60&fit=crop',
			image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=face',
			quote: 'The platform made relocating to Switzerland seamless. 90% salary increase!',
			flag: '🇨🇭',
			salary: '+90% salary increase',
			background: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
		},
		{
			name: 'Anna Kowalski',
			role: 'Data Scientist',
			company: 'Amsterdam Scale-up',
			companyLogo: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=60&h=60&fit=crop',
			image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&h=120&fit=crop&crop=face',
			quote: 'The AI perfectly matched my Python & ML skills with the right opportunities.',
			flag: '🇳🇱',
			salary: '+60% salary increase',
			background: 'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
		}
	]

	const techStats = [
		{ 
			number: '50K+', 
			label: 'Tech Professionals', 
			icon: Users,
			image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=300&h=200&fit=crop'
		},
		{ 
			number: '95%', 
			label: 'Match Accuracy', 
			icon: Target,
			image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop'
		},
		{ 
			number: '2.5K+', 
			label: 'Companies', 
			icon: Building,
			image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=300&h=200&fit=crop'
		},
		{ 
			number: '€85K', 
			label: 'Avg Salary', 
			icon: TrendingUp,
			image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=300&h=200&fit=crop'
		}
	]

	const features = [
		{
			icon: Bot,
			title: 'OpenAI CV Parsing',
			description: 'AI extracts skills from your CV with 90%+ accuracy',
			color: 'primary',
			image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop',
			demo: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=500&h=300&fit=crop'
		},
		{
			icon: Brain,
			title: 'Smart Matching',
			description: 'GPT-powered job recommendations tailored to you',
			color: 'secondary',
			image: 'https://images.unsplash.com/photo-1559028006-448665bd7c7f?w=400&h=250&fit=crop',
			demo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop'
		},
		{
			icon: Shield,
			title: 'GDPR Compliant',
			description: 'Your data is secure and privacy-protected',
			color: 'success',
			image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=250&fit=crop',
			demo: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=500&h=300&fit=crop'
		},
		{
			icon: Globe,
			title: 'European Focus',
			description: 'Specialized in German & Swiss tech markets',
			color: 'primary',
			image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=400&h=250&fit=crop',
			demo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500&h=300&fit=crop'
		}
	]

	const howItWorks = [
		{
			step: '01',
			title: 'Upload Your CV',
			description: 'Our AI analyzes your technical skills and experience',
			icon: Upload,
			image: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=350&h=250&fit=crop',
			mockup: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=400&h=300&fit=crop'
		},
		{
			step: '02',
			title: 'Get Matched',
			description: 'Receive personalized job recommendations',
			icon: Search,
			image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=350&h=250&fit=crop',
			mockup: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop'
		},
		{
			step: '03',
			title: 'Land Your Job',
			description: 'Connect with top European tech companies',
			icon: MessageCircle,
			image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=350&h=250&fit=crop',
			mockup: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=300&fit=crop'
		}
	]

	const companyLogos = [
		{ name: 'Berlin Startup', logo: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=120&h=60&fit=crop' },
		{ name: 'Zurich Bank', logo: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=120&h=60&fit=crop' },
		{ name: 'Amsterdam AI', logo: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=120&h=60&fit=crop' },
		{ name: 'Vienna Tech', logo: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=120&h=60&fit=crop' },
		{ name: 'Munich Scale-up', logo: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=120&h=60&fit=crop' },
		{ name: 'Frankfurt Fintech', logo: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=120&h=60&fit=crop' }
	]

	const techStack = [
		{ name: 'React', icon: '⚛️', color: '#61DAFB' },
		{ name: 'Python', icon: '🐍', color: '#3776AB' },
		{ name: 'Node.js', icon: '🟢', color: '#339933' },
		{ name: 'TypeScript', icon: '📘', color: '#3178C6' },
		{ name: 'AWS', icon: '☁️', color: '#FF9900' },
		{ name: 'Docker', icon: '🐳', color: '#2496ED' },
		{ name: 'Vue.js', icon: '💚', color: '#4FC08D' },
		{ name: 'Go', icon: '🔷', color: '#00ADD8' }
	]

	useEffect(() => {
		const interval = setInterval(() => {
			setActiveTestimonial((prev) => (prev + 1) % testimonials.length)
		}, 5000)
		return () => clearInterval(interval)
	}, [testimonials.length])

	useEffect(() => {
		const interval = setInterval(() => {
			setActiveFeature((prev) => (prev + 1) % features.length)
		}, 3000)
		return () => clearInterval(interval)
	}, [features.length])

	return (
		<div className="min-h-screen">
			{/* Hero Section */}
			<BrandedSection 
				className="relative overflow-hidden py-20 lg:py-32"
				style={{
					background: `linear-gradient(135deg, ${colors.background} 0%, ${colors.surface} 50%, ${colors.background} 100%)`
				}}
			>
				{/* Hero Background Images */}
				<div className="absolute inset-0 opacity-5">
					<img
						src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2084&q=80"
						alt="European tech professionals"
						className="w-full h-full object-cover"
					/>
				</div>

				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
						{/* Content */}
						<div>
							<div className="flex items-center mb-6">
								<div 
									className="px-4 py-2 rounded-full flex items-center space-x-2"
									style={{ backgroundColor: `${colors.primary}15` }}
								>
									<Sparkles className="w-4 h-4" style={{ color: colors.primary }} />
									<BrandedSpan className="text-sm font-medium" style={{ color: colors.primary }}>
										AI-Powered Tech Recruitment
									</BrandedSpan>
								</div>
							</div>

							<BrandedH1 className="mb-6 leading-tight">
								Find Your Next <BrandedSpan style={{ color: colors.primary }}>Tech Role</BrandedSpan> in Europe
							</BrandedH1>

							<BrandedP className="text-xl mb-8 leading-relaxed" style={{ color: colors.text.secondary }}>
								Connect with leading tech companies in Germany, Switzerland, and across the EU. 
								Our AI matches your skills with opportunities in Berlin, Zurich, Amsterdam, and beyond.
							</BrandedP>

							{/* Trust Indicators */}
							<div className="flex flex-wrap gap-3 mb-8">
								<div className="flex items-center space-x-2">
									<CheckCircle className="w-5 h-5" style={{ color: colors.success }} />
									<BrandedSpan className="text-sm font-medium">90% Match Accuracy</BrandedSpan>
								</div>
								<div className="flex items-center space-x-2">
									<CheckCircle className="w-5 h-5" style={{ color: colors.success }} />
									<BrandedSpan className="text-sm font-medium">GDPR Compliant</BrandedSpan>
								</div>
								<div className="flex items-center space-x-2">
									<CheckCircle className="w-5 h-5" style={{ color: colors.success }} />
									<BrandedSpan className="text-sm font-medium">€0.0006/profile</BrandedSpan>
								</div>
							</div>

							{/* CTA Buttons */}
							<div className="flex flex-col sm:flex-row gap-4 mb-8">
								<Link
									to="/register/talent"
									className="group px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl"
									style={{ backgroundColor: colors.primary, color: colors.text.inverse }}
								>
									<Users className="w-5 h-5 mr-2" />
									Find Tech Jobs
									<ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
								</Link>
								<Link
									to="/register/team"
									className="group px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 flex items-center justify-center border-2"
									style={{ 
										borderColor: colors.secondary, 
										color: colors.secondary,
										backgroundColor: 'transparent'
									}}
								>
									<Building className="w-5 h-5 mr-2" />
									Hire Talent
									<ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
								</Link>
							</div>

							{/* European Markets with flags */}
							<div className="flex flex-wrap gap-2">
								{[
									{ country: '🇩🇪 Germany', image: 'https://images.unsplash.com/photo-1546726747-421c6d69c929?w=30&h=20&fit=crop' },
									{ country: '🇨🇭 Switzerland', image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=30&h=20&fit=crop' },
									{ country: '🇳🇱 Netherlands', image: 'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=30&h=20&fit=crop' },
									{ country: '🇦🇹 Austria', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=30&h=20&fit=crop' }
								].map((market) => (
									<BrandedSpan 
										key={market.country}
										className="px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-2"
										style={{ backgroundColor: `${colors.secondary}10`, color: colors.secondary }}
									>
										<span>{market.country}</span>
									</BrandedSpan>
								))}
							</div>
						</div>

						{/* Hero Visual - Platform Preview */}
						<div className="relative">
							{/* Main Dashboard Mockup */}
							<div 
								className="rounded-2xl shadow-2xl overflow-hidden transform hover:scale-105 transition-transform duration-300"
								style={{ backgroundColor: colors.background }}
							>
								<img
									src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
									alt="Platform dashboard preview"
									className="w-full h-80 object-cover"
								/>
								<div className="p-6">
									<div className="flex items-center justify-between mb-4">
										<BrandedH3>Live Tech Matches</BrandedH3>
										<div className="flex items-center space-x-1">
											<div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
											<BrandedSpan className="text-sm">Live</BrandedSpan>
										</div>
									</div>

									<div className="space-y-3">
										{[
											{ role: 'Senior React Developer', company: 'Berlin Startup', match: 94, logo: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=40&h=40&fit=crop' },
											{ role: 'DevOps Engineer', company: 'Zurich Bank', match: 89, logo: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=40&h=40&fit=crop' },
											{ role: 'Data Scientist', company: 'Amsterdam AI', match: 92, logo: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=40&h=40&fit=crop' }
										].map((job, index) => (
											<div 
												key={index}
												className="p-3 rounded-lg border flex items-center space-x-3"
												style={{ borderColor: colors.border, backgroundColor: colors.surface }}
											>
												<img src={job.logo} alt="Company" className="w-10 h-10 rounded-lg object-cover" />
												<div className="flex-1">
													<BrandedP className="font-semibold text-sm">{job.role}</BrandedP>
													<BrandedP className="text-xs" style={{ color: colors.text.secondary }}>
														{job.company}
													</BrandedP>
												</div>
												<div className="flex items-center space-x-1">
													<Star className="w-4 h-4" style={{ color: '#F59E0B' }} />
													<BrandedSpan className="font-semibold text-sm" style={{ color: '#F59E0B' }}>
														{job.match}%
													</BrandedSpan>
												</div>
											</div>
										))}
									</div>
								</div>
							</div>

							{/* Floating Elements */}
							<div className="absolute -top-4 -right-4 w-20 h-20 rounded-xl shadow-lg overflow-hidden">
								<img
									src="https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=80&h=80&fit=crop"
									alt="Tech visual"
									className="w-full h-full object-cover"
								/>
							</div>
							<div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-xl shadow-lg overflow-hidden">
								<img
									src="https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=64&h=64&fit=crop"
									alt="AI visual"
									className="w-full h-full object-cover"
								/>
							</div>
						</div>
					</div>
				</div>
			</BrandedSection>

			{/* Company Logos Section */}
			<BrandedSection className="py-12" style={{ backgroundColor: colors.surface }}>
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-8">
						<BrandedP style={{ color: colors.text.secondary }}>
							Trusted by leading European tech companies
						</BrandedP>
					</div>
					<div className="grid grid-cols-3 md:grid-cols-6 gap-8 items-center opacity-60">
						{companyLogos.map((company, index) => (
							<div key={index} className="text-center grayscale hover:grayscale-0 transition-all">
								<img
									src={company.logo}
									alt={company.name}
									className="h-12 mx-auto object-contain"
								/>
							</div>
						))}
					</div>
				</div>
			</BrandedSection>

			{/* Stats Section with Images */}
			<BrandedSection className="py-20" style={{ backgroundColor: colors.background }}>
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
						{techStats.map((stat, index) => {
							const Icon = stat.icon
							return (
								<div key={index} className="text-center group">
									<div className="relative mb-6 overflow-hidden rounded-xl">
										<img
											src={stat.image}
											alt={stat.label}
											className="w-full h-32 object-cover group-hover:scale-110 transition-transform duration-300"
										/>
										<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
										<div 
											className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full flex items-center justify-center"
											style={{ backgroundColor: colors.primary }}
										>
											<Icon className="w-6 h-6 text-white" />
										</div>
									</div>
									<BrandedH3 className="text-3xl font-bold mb-2">{stat.number}</BrandedH3>
									<BrandedP style={{ color: colors.text.secondary }}>{stat.label}</BrandedP>
								</div>
							)
						})}
					</div>
				</div>
			</BrandedSection>

			{/* Features Section with Interactive Demo */}
			<BrandedSection className="py-20" style={{ backgroundColor: colors.surface }}>
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-16">
						<BrandedH2 className="mb-4">Why Choose Our Platform?</BrandedH2>
						<BrandedP className="text-xl max-w-3xl mx-auto" style={{ color: colors.text.secondary }}>
							Advanced AI technology meets European tech expertise to create the perfect hiring experience.
						</BrandedP>
					</div>

					<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
						{/* Feature Cards */}
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							{features.map((feature, index) => {
								const Icon = feature.icon
								const featureColor = feature.color === 'primary' ? colors.primary : 
												  feature.color === 'secondary' ? colors.secondary : '#10B981'
								return (
									<BrandedCard 
										key={index} 
										variant="elevated" 
										padding="lg"
										className={`cursor-pointer group transition-all duration-300 ${index === activeFeature ? 'ring-2' : ''}`}
										onClick={() => setActiveFeature(index)}
									>
										<div className="relative overflow-hidden rounded-lg mb-4">
											<img
												src={feature.image}
												alt={feature.title}
												className="w-full h-32 object-cover group-hover:scale-110 transition-transform duration-300"
											/>
											<div 
												className="absolute top-4 right-4 w-10 h-10 rounded-lg flex items-center justify-center"
												style={{ backgroundColor: `${featureColor}15` }}
											>
												<Icon className="w-5 h-5" style={{ color: featureColor }} />
											</div>
										</div>
										<BrandedH3 className="mb-3">{feature.title}</BrandedH3>
										<BrandedP style={{ color: colors.text.secondary }}>
											{feature.description}
										</BrandedP>
									</BrandedCard>
								)
							})}
						</div>

						{/* Interactive Demo */}
						<div className="relative">
							<div 
								className="rounded-2xl overflow-hidden shadow-2xl"
								style={{ backgroundColor: colors.background }}
							>
								<img
									src={features[activeFeature].demo}
									alt="Feature demo"
									className="w-full h-80 object-cover"
								/>
								<div className="p-6">
									<BrandedH3 className="mb-2">{features[activeFeature].title} Demo</BrandedH3>
									<BrandedP style={{ color: colors.text.secondary }}>
										See how {features[activeFeature].title.toLowerCase()} works in real-time
									</BrandedP>
								</div>
							</div>
						</div>
					</div>
				</div>
			</BrandedSection>

			{/* How It Works with Process Images */}
			<BrandedSection className="py-20" style={{ backgroundColor: colors.background }}>
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-16">
						<BrandedH2 className="mb-4">How It Works</BrandedH2>
						<BrandedP className="text-xl max-w-3xl mx-auto" style={{ color: colors.text.secondary }}>
							Get started in minutes and find your perfect tech role in Europe.
						</BrandedP>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						{howItWorks.map((step, index) => {
							const Icon = step.icon
							return (
								<div key={index} className="relative text-center group">
									{index < howItWorks.length - 1 && (
										<div 
											className="hidden md:block absolute top-20 left-1/2 w-full h-0.5 z-0"
											style={{ backgroundColor: `${colors.primary}30` }}
										></div>
									)}
									
									<div className="relative z-10">
										{/* Step Image */}
										<div className="relative overflow-hidden rounded-2xl mb-6">
											<img
												src={step.image}
												alt={step.title}
												className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
											/>
											<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
											<div 
												className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-16 h-16 rounded-full flex items-center justify-center relative"
												style={{ backgroundColor: colors.primary }}
											>
												<Icon className="w-8 h-8 text-white" />
												<div 
													className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
													style={{ backgroundColor: colors.secondary, color: colors.text.inverse }}
												>
													{step.step}
												</div>
											</div>
										</div>

										{/* Step Content */}
										<BrandedH3 className="mb-3">{step.title}</BrandedH3>
										<BrandedP className="mb-4" style={{ color: colors.text.secondary }}>
											{step.description}
										</BrandedP>

										{/* Mockup Preview */}
										<div className="mt-4">
											<img
												src={step.mockup}
												alt={`${step.title} preview`}
												className="w-full h-32 object-cover rounded-lg opacity-80 hover:opacity-100 transition-opacity"
											/>
										</div>
									</div>
								</div>
							)
						})}
					</div>
				</div>
			</BrandedSection>

			{/* Tech Stack Showcase */}
			<BrandedSection className="py-16" style={{ backgroundColor: colors.surface }}>
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-12">
						<BrandedH2 className="mb-4">Popular Tech Stacks We Match</BrandedH2>
						<BrandedP style={{ color: colors.text.secondary }}>
							From frontend frameworks to cloud platforms - we understand your tech stack
						</BrandedP>
					</div>
					<div className="grid grid-cols-4 md:grid-cols-8 gap-6">
						{techStack.map((tech, index) => (
							<div 
								key={index} 
								className="text-center p-4 rounded-xl hover:scale-110 transition-transform duration-300"
								style={{ backgroundColor: colors.background }}
							>
								<div 
									className="w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-2 text-2xl"
									style={{ backgroundColor: `${tech.color}15` }}
								>
									{tech.icon}
								</div>
								<BrandedP className="text-xs font-medium">{tech.name}</BrandedP>
							</div>
						))}
					</div>
				</div>
			</BrandedSection>

			{/* Enhanced Testimonials with Background Images */}
			<BrandedSection className="py-20" style={{ backgroundColor: colors.background }}>
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-16">
						<BrandedH2 className="mb-4">Success Stories</BrandedH2>
						<BrandedP className="text-xl max-w-3xl mx-auto" style={{ color: colors.text.secondary }}>
							Real stories from tech professionals who found their dream jobs in Europe.
						</BrandedP>
					</div>

					<div className="relative">
						<BrandedCard 
							variant="elevated" 
							padding="none"
							className="max-w-5xl mx-auto overflow-hidden"
						>
							{/* Background Image */}
							<div className="relative h-80">
								<img
									src={testimonials[activeTestimonial].background}
									alt="Success story background"
									className="w-full h-full object-cover"
								/>
								<div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30"></div>
								
								<div className="absolute inset-0 flex items-center">
									<div className="max-w-4xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
										<div className="text-white">
											<BrandedP className="text-2xl italic mb-6 leading-relaxed">
												"{testimonials[activeTestimonial].quote}"
											</BrandedP>
											<div className="flex items-center space-x-4">
												<img
													src={testimonials[activeTestimonial].image}
													alt={testimonials[activeTestimonial].name}
													className="w-16 h-16 rounded-full object-cover border-4 border-white"
												/>
												<div>
													<BrandedH3 className="text-white mb-1">
														{testimonials[activeTestimonial].name} {testimonials[activeTestimonial].flag}
													</BrandedH3>
													<BrandedP className="text-white/80 mb-1">
														{testimonials[activeTestimonial].role}
													</BrandedP>
													<div className="flex items-center space-x-3">
														<img
															src={testimonials[activeTestimonial].companyLogo}
															alt="Company"
															className="w-6 h-6 rounded object-cover"
														/>
														<BrandedSpan className="text-white/70 text-sm">
															{testimonials[activeTestimonial].company}
														</BrandedSpan>
													</div>
												</div>
											</div>
										</div>
										<div className="text-center lg:text-right">
											<div 
												className="inline-block px-6 py-3 rounded-xl text-white font-bold text-lg"
												style={{ backgroundColor: colors.primary }}
											>
												{testimonials[activeTestimonial].salary}
											</div>
										</div>
									</div>
								</div>
							</div>
						</BrandedCard>

						{/* Testimonial Indicators */}
						<div className="flex justify-center space-x-2 mt-8">
							{testimonials.map((_, index) => (
								<button
									key={index}
									onClick={() => setActiveTestimonial(index)}
									className="w-4 h-4 rounded-full transition-all duration-300"
									style={{ 
										backgroundColor: index === activeTestimonial ? colors.primary : colors.border 
									}}
								/>
							))}
						</div>
					</div>
				</div>
			</BrandedSection>

			{/* CTA Section with Background Video/Image */}
			<BrandedSection 
				className="py-20 relative"
				style={{
					background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`
				}}
			>
				<div className="absolute inset-0 opacity-20">
					<img
						src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
						alt="European tech team"
						className="w-full h-full object-cover"
					/>
				</div>

				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
					<BrandedH2 className="text-white mb-6">
						Ready to Launch Your European Tech Career?
					</BrandedH2>
					<BrandedP className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
						Join 50,000+ tech professionals who found their perfect match in Germany, Switzerland, and across the EU.
					</BrandedP>
					
					<div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
						<Link
							to="/register/talent"
							className="group bg-white hover:bg-gray-50 px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 flex items-center justify-center shadow-lg"
							style={{ color: colors.primary }}
						>
							<Briefcase className="w-5 h-5 mr-2" />
							Get Started Free
							<ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
						</Link>
						<Link
							to="/about"
							className="group border-2 border-white text-white hover:bg-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 flex items-center justify-center"
							onMouseEnter={(e) => {
								e.currentTarget.style.color = colors.primary
							}}
							onMouseLeave={(e) => {
								e.currentTarget.style.color = 'white'
							}}
						>
							<Play className="w-5 h-5 mr-2" />
							Watch Demo
						</Link>
					</div>

					{/* Final Stats Grid with Icons */}
					<div className="grid grid-cols-2 md:grid-cols-4 gap-6 opacity-90">
						<div className="text-center text-white">
							<div className="text-3xl mb-2">🚀</div>
							<div className="text-2xl font-bold">2 weeks</div>
							<div className="text-sm opacity-80">Avg time to hire</div>
						</div>
						<div className="text-center text-white">
							<div className="text-3xl mb-2">💰</div>
							<div className="text-2xl font-bold">60%</div>
							<div className="text-sm opacity-80">Avg salary increase</div>
						</div>
						<div className="text-center text-white">
							<div className="text-3xl mb-2">🎯</div>
							<div className="text-2xl font-bold">95%</div>
							<div className="text-sm opacity-80">Match accuracy</div>
						</div>
						<div className="text-center text-white">
							<div className="text-3xl mb-2">⭐</div>
							<div className="text-2xl font-bold">4.9/5</div>
							<div className="text-sm opacity-80">User satisfaction</div>
						</div>
					</div>
				</div>
			</BrandedSection>

			{/* Add floating animation keyframes */}
			<style>{`
				@keyframes float {
					0%, 100% { transform: translateY(0px); }
					50% { transform: translateY(-10px); }
				}
			`}</style>
		</div>
	)
}

export default HomePage 