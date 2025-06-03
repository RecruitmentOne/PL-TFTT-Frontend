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
	MessageCircle,
	Cpu,
	Database,
	Cloud,
	Monitor,
	Smartphone,
	Layers,
	BarChart3,
	Lock,
	Timer,
	MapPin
} from 'lucide-react'

function HomePage() {
	const { t } = useTranslation()
	const { switchVariant } = useBrand()
	const colors = useBrandColors()
	const [activeStep, setActiveStep] = useState(0)
	const [countUpValues, setCountUpValues] = useState({ users: 0, accuracy: 0, companies: 0, salary: 0 })

	useEffect(() => {
		switchVariant('talent')
	}, [switchVariant])

	// Auto-animate steps
	useEffect(() => {
		const interval = setInterval(() => {
			setActiveStep((prev) => (prev + 1) % 3)
		}, 3000)
		return () => clearInterval(interval)
	}, [])

	// Count up animation for stats
	useEffect(() => {
		const targets = { users: 50, accuracy: 95, companies: 25, salary: 85 }
		const duration = 2000
		const steps = 60
		const stepTime = duration / steps

		let currentStep = 0
		const interval = setInterval(() => {
			if (currentStep <= steps) {
				const progress = currentStep / steps
				setCountUpValues({
					users: Math.floor(targets.users * progress),
					accuracy: Math.floor(targets.accuracy * progress),
					companies: Math.floor(targets.companies * progress),
					salary: Math.floor(targets.salary * progress)
				})
				currentStep++
			} else {
				clearInterval(interval)
			}
		}, stepTime)

		return () => clearInterval(interval)
	}, [])

	const processSteps = [
		{
			id: 1,
			title: 'Upload & Analyze',
			description: 'AI parses your CV instantly',
			icon: Upload,
			color: 'blue',
			progress: 100
		},
		{
			id: 2,
			title: 'Smart Matching',
			description: 'Find perfect job matches',
			icon: Target,
			color: 'purple',
			progress: 75
		},
		{
			id: 3,
			title: 'Connect & Apply',
			description: 'Direct contact with companies',
			icon: MessageCircle,
			color: 'green',
			progress: 50
		}
	]

	const features = [
		{
			icon: Brain,
			title: 'AI-Powered Matching',
			description: 'Advanced algorithms analyze your skills',
			stat: '90% accuracy',
			color: 'bg-blue-500'
		},
		{
			icon: Shield,
			title: 'GDPR Compliant',
			description: 'Your data is secure and protected',
			stat: '100% secure',
			color: 'bg-green-500'
		},
		{
			icon: Globe,
			title: 'Germany & Switzerland Network',
			description: 'Access to top tech companies in DACH region',
			stat: '2.5K+ companies',
			color: 'bg-purple-500'
		},
		{
			icon: TrendingUp,
			title: 'Career Growth',
			description: 'Track your professional development',
			stat: '+60% salary',
			color: 'bg-orange-500'
		}
	]

	const techStack = [
		{ name: 'React', level: 95, color: '#61DAFB' },
		{ name: 'Python', level: 88, color: '#3776AB' },
		{ name: 'Node.js', level: 82, color: '#339933' },
		{ name: 'AWS', level: 90, color: '#FF9900' },
		{ name: 'Docker', level: 78, color: '#2496ED' },
		{ name: 'TypeScript', level: 85, color: '#3178C6' }
	]

	const testimonials = [
		{
			name: 'Sarah M.',
			role: 'React Developer',
			location: 'Berlin',
			flag: '🇩🇪',
			quote: 'Found my dream job in 2 weeks',
			increase: '+45%',
			image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face'
		},
		{
			name: 'Marco S.',
			role: 'DevOps Engineer', 
			location: 'Zurich',
			flag: '🇨🇭',
			quote: 'Seamless relocation process',
			increase: '+90%',
			image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
		},
		{
			name: 'Anna K.',
			role: 'Data Scientist',
			location: 'Munich',
			flag: '🇩🇪',
			quote: 'Perfect skill matching',
			increase: '+60%',
			image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face'
		}
	]

	return (
		<div className="min-h-screen">
			{/* Hero Section - Clean & Elegant */}
			<BrandedSection className="relative py-20 overflow-hidden" style={{ backgroundColor: colors.background }}>
				{/* Subtle Background Elements */}
				<div className="absolute inset-0 overflow-hidden">
					<div className="absolute top-20 right-20 w-32 h-32 rounded-full opacity-5" 
						 style={{ backgroundColor: colors.primary }}></div>
					<div className="absolute bottom-20 left-16 w-20 h-20 rounded-lg rotate-45 opacity-5" 
						 style={{ backgroundColor: colors.secondary }}></div>
				</div>

				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
						{/* Content Side */}
						<div>
							{/* Badge */}
							<div className="inline-flex items-center px-4 py-2 rounded-full mb-6 border"
								 style={{ borderColor: colors.border, backgroundColor: colors.surface }}>
								<Sparkles className="w-4 h-4 mr-2" style={{ color: colors.primary }} />
								<BrandedSpan className="text-sm font-medium" style={{ color: colors.primary }}>
									AI-Powered Tech Recruitment • Germany & Switzerland
								</BrandedSpan>
							</div>

							{/* Main Headline */}
							<BrandedH1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
								Find Your 
								<BrandedSpan style={{ color: colors.primary }}> Dream Tech Job </BrandedSpan>
								in Germany & Switzerland
							</BrandedH1>

							<BrandedP className="text-xl mb-8 leading-relaxed" style={{ color: colors.text.secondary }}>
								Connect with leading tech companies in Germany and Switzerland through AI-powered matching.
							</BrandedP>

							{/* CTA Buttons */}
							<div className="flex flex-col sm:flex-row gap-4 mb-8">
								<Link
									to="/register/talent"
									className="group px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center shadow-lg"
									style={{ backgroundColor: colors.primary, color: colors.text.inverse }}
									onMouseEnter={(e) => {
										e.currentTarget.style.transform = 'translateY(-3px)'
										e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)'
									}}
									onMouseLeave={(e) => {
										e.currentTarget.style.transform = 'translateY(0)'
										e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)'
									}}
								>
									<Users className="w-5 h-5 mr-2" />
									Start Your Journey
									<ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
								</Link>
								
								<Link
									to="/register/team"
									className="group px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center border-2"
									style={{ 
										borderColor: colors.primary, 
										color: colors.primary,
										backgroundColor: colors.surface
									}}
									onMouseEnter={(e) => {
										e.currentTarget.style.backgroundColor = colors.primary
										e.currentTarget.style.color = colors.text.inverse
										e.currentTarget.style.transform = 'translateY(-3px)'
									}}
									onMouseLeave={(e) => {
										e.currentTarget.style.backgroundColor = colors.surface
										e.currentTarget.style.color = colors.primary
										e.currentTarget.style.transform = 'translateY(0)'
									}}
								>
									<Building className="w-5 h-5 mr-2" />
									Hire Talent
									<ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
								</Link>
							</div>

							{/* Simple Stats */}
							<div className="grid grid-cols-2 gap-6">
								<div>
									<div className="text-3xl font-bold mb-1" style={{ color: colors.primary }}>
										{countUpValues.users}K+
									</div>
									<BrandedSpan className="text-sm" style={{ color: colors.text.secondary }}>
										Tech Professionals
									</BrandedSpan>
								</div>
								<div>
									<div className="text-3xl font-bold mb-1" style={{ color: colors.success }}>
										{countUpValues.accuracy}%
									</div>
									<BrandedSpan className="text-sm" style={{ color: colors.text.secondary }}>
										Match Accuracy
									</BrandedSpan>
								</div>
							</div>
						</div>

						{/* Image Side */}
						<div className="relative">
							<div className="relative rounded-2xl overflow-hidden shadow-2xl">
								<img
									src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop&crop=center"
									alt="European tech professionals collaborating in modern office"
									className="w-full h-80 object-cover"
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
							</div>
							
							{/* Clean floating tech icons */}
							<div className="absolute -top-4 -right-4 w-16 h-16 rounded-xl shadow-lg flex items-center justify-center"
								 style={{ backgroundColor: colors.primary }}>
								<Cpu className="w-8 h-8 text-white" />
							</div>
							<div className="absolute -bottom-4 -left-4 w-12 h-12 rounded-xl shadow-lg flex items-center justify-center"
								 style={{ backgroundColor: colors.secondary }}>
								<Database className="w-6 h-6 text-white" />
							</div>
						</div>
					</div>

					{/* German & Swiss Markets */}
					<div className="flex flex-wrap justify-center gap-4 mt-16">
						{[
							{ name: 'Germany', flag: '🇩🇪', jobs: '15K+ Jobs', cities: 'Berlin, Munich, Hamburg' },
							{ name: 'Switzerland', flag: '🇨🇭', jobs: '8K+ Jobs', cities: 'Zurich, Geneva, Basel' }
						].map((market) => (
							<div key={market.name} className="flex items-center space-x-3 px-6 py-3 rounded-full border"
								 style={{ borderColor: colors.border, backgroundColor: colors.surface }}>
								<span className="text-2xl">{market.flag}</span>
								<div className="text-left">
									<BrandedSpan className="font-semibold">{market.name}</BrandedSpan>
									<BrandedP className="text-xs" style={{ color: colors.text.secondary }}>
										{market.jobs} • {market.cities}
									</BrandedP>
								</div>
							</div>
						))}
					</div>
				</div>
			</BrandedSection>

			{/* Interactive Process Flow */}
			<BrandedSection className="py-20" style={{ backgroundColor: colors.surface }}>
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-16">
						<BrandedH2 className="text-4xl font-bold mb-4">How It Works</BrandedH2>
						<BrandedP className="text-xl max-w-2xl mx-auto" style={{ color: colors.text.secondary }}>
							Get matched with your perfect tech role in Germany and Switzerland in just 3 simple steps
						</BrandedP>
					</div>

					<div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
						{processSteps.map((step, index) => {
							const Icon = step.icon
							const isActive = activeStep === index
							const colorMap: { [key in 'blue' | 'purple' | 'green']: string } = {
								blue: 'bg-blue-500',
								purple: 'bg-purple-500', 
								green: 'bg-green-500'
							}
							
							return (
								<BrandedCard 
									key={step.id}
									variant="elevated"
									padding="xl"
									className={`text-center transition-all duration-500 cursor-pointer ${
										isActive ? 'scale-105 shadow-xl' : 'hover:scale-102'
									}`}
									onClick={() => setActiveStep(index)}
								>
									<div className="relative mb-6">
										<div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto ${colorMap[step.color as keyof typeof colorMap]} ${
											isActive ? 'animate-pulse' : ''
										}`}>
											<Icon className="w-10 h-10 text-white" />
										</div>
										<div className="absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
											 style={{ backgroundColor: colors.primary }}>
											{step.id}
										</div>
									</div>
									
									<BrandedH3 className="text-xl font-bold mb-3">{step.title}</BrandedH3>
									<BrandedP className="mb-4" style={{ color: colors.text.secondary }}>
										{step.description}
									</BrandedP>
									
									{/* Progress Bar */}
									<div className="w-full h-2 rounded-full" style={{ backgroundColor: colors.border }}>
										<div 
											className="h-full rounded-full transition-all duration-1000"
											style={{ 
												backgroundColor: colors.primary,
												width: isActive ? `${step.progress}%` : '0%'
											}}
										></div>
									</div>
								</BrandedCard>
							)
						})}
					</div>

					{/* Process Connection Line */}
					<div className="hidden lg:block relative">
						<div className="absolute top-1/2 left-1/4 right-1/4 h-0.5 -translate-y-1/2"
							 style={{ backgroundColor: colors.border }}>
							<div 
								className="h-full transition-all duration-2000 rounded-full"
								style={{ 
									backgroundColor: colors.primary,
									width: `${(activeStep + 1) * 33.33}%`
								}}
							></div>
						</div>
					</div>
				</div>
			</BrandedSection>

			{/* Features Grid - Minimal & Clean */}
			<BrandedSection className="py-20" style={{ backgroundColor: colors.background }}>
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-16">
						<BrandedH2 className="text-4xl font-bold mb-4">Why Choose Our Platform</BrandedH2>
						<BrandedP className="text-xl max-w-2xl mx-auto" style={{ color: colors.text.secondary }}>
							Built for modern tech professionals with cutting-edge AI technology
						</BrandedP>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
						{features.map((feature, index) => {
							const Icon = feature.icon
							return (
								<BrandedCard 
									key={index}
									variant="outlined"
									padding="xl"
									className="text-center group hover:shadow-lg transition-all duration-300"
								>
									<div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 ${feature.color} group-hover:scale-110 transition-transform duration-300`}>
										<Icon className="w-8 h-8 text-white" />
									</div>
									
									<BrandedH3 className="text-lg font-bold mb-3">{feature.title}</BrandedH3>
									<BrandedP className="text-sm mb-4" style={{ color: colors.text.secondary }}>
										{feature.description}
									</BrandedP>
									
									<div className="px-3 py-1 rounded-full text-xs font-bold"
										 style={{ backgroundColor: `${colors.primary}15`, color: colors.primary }}>
										{feature.stat}
									</div>
								</BrandedCard>
							)
						})}
					</div>
				</div>
			</BrandedSection>

			{/* Tech Stack Visualization */}
			<BrandedSection className="py-20" style={{ backgroundColor: colors.surface }}>
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
						<div>
							<BrandedH2 className="text-4xl font-bold mb-6">
								Popular Tech Stacks
							</BrandedH2>
							<BrandedP className="text-xl mb-8" style={{ color: colors.text.secondary }}>
								We understand your technical skills and match them with the right opportunities 
								across European tech companies.
							</BrandedP>
							
							<div className="space-y-6">
								{techStack.map((tech, index) => (
									<div key={index} className="flex items-center space-x-4">
										<div className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold"
											 style={{ backgroundColor: tech.color }}>
											{tech.name.slice(0, 2).toUpperCase()}
										</div>
										<div className="flex-1">
											<div className="flex justify-between items-center mb-1">
												<BrandedSpan className="font-medium">{tech.name}</BrandedSpan>
												<BrandedSpan className="text-sm" style={{ color: colors.text.secondary }}>
													{tech.level}%
												</BrandedSpan>
											</div>
											<div className="w-full h-2 rounded-full" style={{ backgroundColor: colors.border }}>
												<div 
													className="h-full rounded-full transition-all duration-1000"
													style={{ 
														backgroundColor: tech.color,
														width: `${tech.level}%`
													}}
												></div>
											</div>
										</div>
									</div>
								))}
							</div>
						</div>

						<div className="relative">
							<BrandedCard variant="elevated" padding="xl" className="text-center">
								<div className="mb-6">
									<div className="relative mb-4">
										<img
											src="https://images.unsplash.com/photo-1551650975-87deedd944c3?w=500&h=300&fit=crop&crop=center"
											alt="Platform dashboard showing job matches"
											className="w-full h-48 object-cover rounded-lg"
										/>
										<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-lg"></div>
										<div className="absolute top-4 left-4 flex items-center space-x-2">
											<div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
											<BrandedSpan className="text-white text-sm font-medium">Live Matching</BrandedSpan>
										</div>
									</div>
									<BrandedH3 className="text-xl font-bold mb-2">AI Job Matching</BrandedH3>
									<BrandedP style={{ color: colors.text.secondary }}>
										Real-time matching based on your tech stack
									</BrandedP>
								</div>
								
								<div className="space-y-3">
									{['React Developer - Berlin', 'Python Engineer - Zurich', 'DevOps - Amsterdam'].map((job, index) => (
										<div key={index} className="flex items-center justify-between p-3 rounded-lg"
											 style={{ backgroundColor: colors.surface }}>
											<BrandedSpan className="text-sm font-medium">{job}</BrandedSpan>
											<div className="flex items-center space-x-1">
												<Star className="w-4 h-4" style={{ color: colors.warning }} />
												<BrandedSpan className="text-xs font-bold" style={{ color: colors.warning }}>
													{95 - index * 3}%
												</BrandedSpan>
											</div>
										</div>
									))}
								</div>
							</BrandedCard>
						</div>
					</div>
				</div>
			</BrandedSection>

			{/* Success Stories - Minimal Cards */}
			<BrandedSection className="py-20" style={{ backgroundColor: colors.background }}>
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-16">
						<BrandedH2 className="text-4xl font-bold mb-4">Success Stories</BrandedH2>
						<BrandedP className="text-xl max-w-2xl mx-auto" style={{ color: colors.text.secondary }}>
							Join thousands of tech professionals who found their dream jobs
						</BrandedP>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						{testimonials.map((testimonial, index) => (
							<BrandedCard 
								key={index}
								variant="elevated"
								padding="xl"
								className="text-center group hover:scale-105 transition-all duration-300"
							>
								<img
									src={testimonial.image}
									alt={testimonial.name}
									className="w-16 h-16 rounded-full mx-auto mb-4 object-cover shadow-lg"
								/>
								
								<BrandedH3 className="font-bold mb-1 flex items-center justify-center">
									{testimonial.name} 
									<span className="ml-2 text-lg">{testimonial.flag}</span>
								</BrandedH3>
								<BrandedP className="text-sm mb-1" style={{ color: colors.text.secondary }}>
									{testimonial.role}
								</BrandedP>
								<BrandedP className="text-xs mb-4 flex items-center justify-center" style={{ color: colors.text.secondary }}>
									<MapPin className="w-3 h-3 mr-1" />
									{testimonial.location}
								</BrandedP>
								
								<BrandedP className="italic mb-4 text-sm">"{testimonial.quote}"</BrandedP>
								
								<div className="px-4 py-2 rounded-full text-sm font-bold"
									 style={{ backgroundColor: `${colors.success}15`, color: colors.success }}>
									{testimonial.increase} salary
								</div>
							</BrandedCard>
						))}
					</div>
				</div>
			</BrandedSection>

			{/* Final CTA - Clean & Focused */}
			<BrandedSection className="py-20" style={{ backgroundColor: colors.primary }}>
				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
					<BrandedH2 className="text-4xl font-bold text-white mb-6">
						Ready to Start Your Tech Journey in Germany & Switzerland?
					</BrandedH2>
					<BrandedP className="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
						Join 50,000+ tech professionals who found their perfect match in Germany and Switzerland
					</BrandedP>
					
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<Link
							to="/register/talent"
							className="px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center bg-white hover:bg-gray-50"
							style={{ color: colors.primary }}
							onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-3px)'}
							onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
						>
							<Briefcase className="w-5 h-5 mr-2" />
							Get Started Free
							<ArrowRight className="w-5 h-5 ml-2" />
						</Link>
						
						<Link
							to="/about"
							className="px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center border-2 border-white text-white hover:bg-white"
							onMouseEnter={(e) => {
								e.currentTarget.style.backgroundColor = 'white'
								e.currentTarget.style.color = colors.primary
							}}
							onMouseLeave={(e) => {
								e.currentTarget.style.backgroundColor = 'transparent'
								e.currentTarget.style.color = 'white'
							}}
						>
							<Play className="w-5 h-5 mr-2" />
							Watch Demo
						</Link>
					</div>
				</div>
			</BrandedSection>
		</div>
	)
}

export default HomePage 