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
	BrandedSection,
	BrandedH4
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
			title: 'AI-Powered Analysis',
			description: 'Our advanced AI understands your unique skills and potential',
			icon: Brain,
			color: 'blue',
			progress: 100
		},
		{
			id: 2,
			title: 'Intelligent Matching',
			description: 'Get matched with opportunities that align with your expertise and goals',
			icon: Target,
			color: 'purple',
			progress: 75
		},
		{
			id: 3,
			title: 'Career Growth',
			description: 'Access insights and opportunities for continuous professional development',
			icon: TrendingUp,
			color: 'green',
			progress: 50
		}
	]

	const features = [
		{
			icon: Brain,
			title: 'AI-Powered Matching',
			description: 'Advanced algorithms analyze skills and experience for perfect matches',
			stat: '90% accuracy',
			color: 'bg-blue-500'
		},
		{
			icon: Shield,
			title: 'Secure & Private',
			description: 'Enterprise-grade security and GDPR compliance',
			stat: '100% secure',
			color: 'bg-green-500'
		},
		{
			icon: Globe,
			title: 'Global Network',
			description: 'Access to opportunities across leading tech hubs',
			stat: '2.5K+ companies',
			color: 'bg-purple-500'
		},
		{
			icon: TrendingUp,
			title: 'Career Growth',
			description: 'Data-driven insights for professional development',
			stat: '+60% growth',
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
			role: 'Senior React Developer',
			quote: 'The AI matching was incredibly accurate. Found my ideal role in just 2 weeks.',
			increase: '+45%',
			image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face'
		},
		{
			name: 'Marco S.',
			role: 'Lead DevOps Engineer', 
			quote: 'Seamless process from application to offer. The platform understood my expertise perfectly.',
			increase: '+90%',
			image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
		},
		{
			name: 'Anna K.',
			role: 'Data Science Manager',
			quote: 'The career insights helped me negotiate a much better package.',
			increase: '+60%',
			image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face'
		}
	]

	return (
		<div className="min-h-screen">
			{/* Hero Section - Clean & Professional */}
			<BrandedSection className="relative py-20 overflow-hidden" 
				style={{ 
					background: `linear-gradient(135deg, ${colors.background} 0%, ${colors.primary}05 100%)`
				}}>
				{/* Hero Background Image - New, Vibrant, Tech-Focused */}
				<div className="absolute inset-0 z-0">
					<img
						src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1500&q=80"
						alt="Young, diverse tech professionals collaborating in a modern workspace"
						className="w-full h-full object-cover opacity-30"
					/>
					<div className="absolute inset-0 bg-gradient-to-r from-blue-900/60 via-transparent to-purple-900/60"></div>
				</div>

				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center py-32">
					{/* Main Headline - More Prominent & Stylish */}
					<BrandedH1 className="text-5xl md:text-7xl font-extrabold mb-8 leading-tight tracking-tight" style={{
						background: 'linear-gradient(90deg, #2563eb 0%, #a21caf 100%)',
						WebkitBackgroundClip: 'text',
						WebkitTextFillColor: 'transparent',
						backgroundClip: 'text',
					}}>
						Accelerate Your Tech Career<br />
						with AI-Powered Matching
					</BrandedH1>

					{/* Subtitle - Larger, Bolder, More Impactful */}
					<BrandedP className="text-2xl md:text-3xl font-semibold mb-10 max-w-2xl mx-auto" style={{
						color: '#fff',
						textShadow: '0 2px 16px rgba(30, 41, 59, 0.5)',
					}}>
						Join a thriving ecosystem of innovative tech professionals and leading companies.<br />
						<strong>Upload your CV</strong> or <strong>post a job</strong> and let our AI match you with perfect opportunities.
					</BrandedP>

					{/* CTA Buttons */}
					<div className="flex flex-col sm:flex-row gap-4">
						<Link
							to="/register/talent"
							className="px-8 py-4 rounded-lg font-semibold text-white transition-all duration-200 hover:shadow-lg"
							style={{ backgroundColor: colors.primary }}
							onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
							onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
						>
							Upload CV & Find Jobs
						</Link>
						<Link
							to="/register/team"
							className="px-8 py-4 rounded-lg font-semibold transition-all duration-200 border-2 hover:shadow-lg"
							style={{ 
								borderColor: colors.primary,
								color: colors.primary
							}}
							onMouseEnter={(e) => {
								e.currentTarget.style.backgroundColor = colors.primary
								e.currentTarget.style.color = 'white'
							}}
							onMouseLeave={(e) => {
								e.currentTarget.style.backgroundColor = 'transparent'
								e.currentTarget.style.color = colors.primary
							}}
						>
							Find Tech Talent
						</Link>
					</div>

					{/* Quick Stats */}
					<div className="flex items-center gap-8 mt-12">
						<div>
							<div className="text-2xl font-bold" style={{ color: colors.primary }}>50K+</div>
							<div className="text-sm" style={{ color: colors.text.secondary }}>CVs Analyzed</div>
						</div>
						<div>
							<div className="text-2xl font-bold" style={{ color: colors.secondary }}>95%</div>
							<div className="text-sm" style={{ color: colors.text.secondary }}>Match Accuracy</div>
						</div>
						<div>
							<div className="text-2xl font-bold" style={{ color: colors.success }}>2.5K+</div>
							<div className="text-sm" style={{ color: colors.text.secondary }}>Companies</div>
						</div>
					</div>
				</div>
			</BrandedSection>

			{/* Services Section - Modern Tech Talent Focus */}
			<BrandedSection className="py-20" style={{ backgroundColor: colors.background }}>
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-16">
						<div className="text-sm font-semibold mb-4" style={{ color: colors.primary }}>
							OUR SERVICES
						</div>
						<BrandedH2 className="text-3xl lg:text-4xl font-bold mb-6">
							AI-Driven Careers for Young Tech Talent & Teams
						</BrandedH2>
						<BrandedP className="text-xl max-w-3xl mx-auto" style={{ color: colors.text.secondary }}>
							Discover how our platform accelerates your journey—whether you're a rising developer or a company building the future.
						</BrandedP>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-10">
						{/* Service 1: For Young Talent */}
						<BrandedCard className="p-8 text-center rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 group bg-white">
							<div className="flex flex-col items-center mb-6">
								<div className="w-16 h-16 rounded-full flex items-center justify-center mb-4 bg-blue-100">
									<Upload className="w-8 h-8 text-blue-600" />
								</div>
								<img src='https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=400&q=80' alt='Young developer coding' className='w-full h-40 object-cover rounded-xl mb-4' />
							</div>
							<BrandedH3 className="text-xl font-bold mb-2">Launch Your Tech Career</BrandedH3>
							<BrandedP className="mb-4 text-gray-600">Upload your CV and let our AI match you with internships, junior roles, and fast-growing startups across Europe.</BrandedP>
							<div className="flex items-center justify-center gap-2 mt-2">
								<div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">1</div>
								<span className="font-medium text-blue-700">Upload</span>
								<div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">2</div>
								<span className="font-medium text-blue-700">AI Match</span>
								<div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">3</div>
								<span className="font-medium text-blue-700">Connect</span>
							</div>
						</BrandedCard>

						{/* Service 2: For Innovative Teams */}
						<BrandedCard className="p-8 text-center rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 group bg-white">
							<div className="flex flex-col items-center mb-6">
								<div className="w-16 h-16 rounded-full flex items-center justify-center mb-4 bg-green-100">
									<Users className="w-8 h-8 text-green-600" />
								</div>
								<img src='https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80' alt='Young tech team collaborating' className='w-full h-40 object-cover rounded-xl mb-4' />
							</div>
							<BrandedH3 className="text-xl font-bold mb-2">Build Your Dream Team</BrandedH3>
							<BrandedP className="mb-4 text-gray-600">Post a job and let our AI recommend the best young tech talent for your company's next big project.</BrandedP>
							<div className="flex items-center justify-center gap-2 mt-2">
								<div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center font-bold">1</div>
								<span className="font-medium text-green-700">Post</span>
								<div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center font-bold">2</div>
								<span className="font-medium text-green-700">AI Screen</span>
								<div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center font-bold">3</div>
								<span className="font-medium text-green-700">Hire</span>
							</div>
						</BrandedCard>

						{/* Service 3: AI-Powered Insights */}
						<BrandedCard className="p-8 text-center rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 group bg-white">
							<div className="flex flex-col items-center mb-6">
								<div className="w-16 h-16 rounded-full flex items-center justify-center mb-4 bg-purple-100">
									<Brain className="w-8 h-8 text-purple-600" />
								</div>
								<img src='https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80' alt='Young people at hackathon' className='w-full h-40 object-cover rounded-xl mb-4' />
							</div>
							<BrandedH3 className="text-xl font-bold mb-2">AI-Powered Career & Hiring Insights</BrandedH3>
							<BrandedP className="mb-4 text-gray-600">Get real-time analytics and recommendations to boost your career or build your team smarter and faster.</BrandedP>
							<div className="flex items-center justify-center gap-2 mt-2">
								<div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold">1</div>
								<span className="font-medium text-purple-700">Analyze</span>
								<div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold">2</div>
								<span className="font-medium text-purple-700">Recommend</span>
								<div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold">3</div>
								<span className="font-medium text-purple-700">Grow</span>
							</div>
						</BrandedCard>
					</div>
				</div>
			</BrandedSection>

			{/* European Markets Section */}
			<BrandedSection className="py-20" style={{ backgroundColor: colors.surface }}>
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
						{/* Image */}
						<div className="relative">
							<img
								src="https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
								alt="European tech professional"
								className="w-full h-[400px] object-cover rounded-2xl shadow-xl"
							/>
						</div>

						{/* Content */}
						<div>
							<div className="text-sm font-semibold mb-4" style={{ color: colors.primary }}>
								EUROPEAN MARKETS
							</div>
							<BrandedH2 className="text-3xl lg:text-4xl font-bold mb-6">
								Helping The{' '}
								<BrandedSpan style={{ color: colors.primary }}>Talents</BrandedSpan>{' '}
								To Become The Next Big Thing In The Industry
							</BrandedH2>
							<BrandedP className="text-lg mb-8" style={{ color: colors.text.secondary }}>
								Access opportunities across Germany, Switzerland, and the EU's leading tech hubs. 
								Our platform connects you with innovative companies looking for your exact skill set.
							</BrandedP>

							{/* Market Features */}
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div className="flex items-start space-x-3">
									<div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
										 style={{ backgroundColor: colors.success }}>
										<CheckCircle className="w-5 h-5 text-white" />
									</div>
									<div>
										<BrandedH3 className="font-semibold mb-1" style={{ color: colors.text.primary }}>
											Trusted Experts & Companies
										</BrandedH3>
										<BrandedP className="text-sm" style={{ color: colors.text.secondary }}>
											2.5K+ verified tech companies across Germany and Switzerland
										</BrandedP>
									</div>
								</div>

								<div className="flex items-start space-x-3">
									<div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
										 style={{ backgroundColor: colors.warning }}>
										<TrendingUp className="w-5 h-5 text-white" />
									</div>
									<div>
										<BrandedH3 className="font-semibold mb-1" style={{ color: colors.text.primary }}>
											Growth Trajectory
										</BrandedH3>
										<BrandedP className="text-sm" style={{ color: colors.text.secondary }}>
											85% average salary increase for matched professionals
										</BrandedP>
									</div>
								</div>
							</div>

							<Link
								to="/about"
								className="inline-flex items-center px-6 py-3 mt-8 rounded-lg font-semibold transition-all duration-200 border-2"
								style={{ 
									borderColor: colors.primary,
									color: colors.primary
								}}
							>
								Read our Story
								<ArrowRight className="w-5 h-5 ml-2" />
							</Link>
						</div>
					</div>
				</div>
			</BrandedSection>

			{/* Features Section */}
			<BrandedSection className="py-20" style={{ backgroundColor: colors.background }}>
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					{/* Section Header */}
					<div className="text-center mb-16">
						<div className="text-sm font-semibold mb-4" style={{ color: colors.primary }}>
							WHY CHOOSE US
						</div>
						<BrandedH2 className="text-3xl lg:text-4xl font-bold mb-4">
							Smart, Secure, and Seamless Hiring
						</BrandedH2>
						<BrandedP className="text-xl max-w-3xl mx-auto" style={{ color: colors.text.secondary }}>
							Experience the future of tech recruitment with our AI-powered platform designed for 
							the European market.
						</BrandedP>
					</div>

					{/* Features Grid */}
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
						{[
							{
								icon: Brain,
								title: 'AI-Powered Matching',
								description: 'Our intelligent algorithms analyze technical skills for precise job matches.',
								color: colors.primary
							},
							{
								icon: Shield,
								title: 'Secure & GDPR Compliant',
								description: 'Your data is protected with enterprise-grade security across EU markets.',
								color: colors.secondary
							},
							{
								icon: Timer,
								title: 'Reduced Process Time',
								description: 'Cut hiring time from weeks to days with automated screening and matching.',
								color: colors.success
							},
							{
								icon: Lock,
								title: 'End-to-End Control',
								description: 'Complete transparency and control over your hiring and job search process.',
								color: colors.warning
							}
						].map((feature, index) => {
							const Icon = feature.icon
							return (
								<BrandedCard key={index} className="p-6 text-center hover:shadow-lg transition-all duration-300"
									style={{ backgroundColor: colors.surface }}>
									<div className="w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4"
										 style={{ backgroundColor: `${feature.color}15` }}>
										<Icon className="w-8 h-8" style={{ color: feature.color }} />
									</div>
									<BrandedH3 className="font-bold mb-3" style={{ color: colors.text.primary }}>
										{feature.title}
									</BrandedH3>
									<BrandedP className="text-sm" style={{ color: colors.text.secondary }}>
										{feature.description}
									</BrandedP>
								</BrandedCard>
							)
						})}
					</div>
				</div>
			</BrandedSection>

			{/* Testimonials Section */}
			<BrandedSection className="py-20" style={{ backgroundColor: colors.surface }}>
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-16">
						<div className="text-sm font-semibold mb-4" style={{ color: colors.primary }}>
							TESTIMONIALS
						</div>
						<BrandedH2 className="text-3xl lg:text-4xl font-bold mb-4">
							What People say about us?
						</BrandedH2>
						<BrandedP className="text-xl max-w-3xl mx-auto" style={{ color: colors.text.secondary }}>
							Discover how we've helped thousands of tech professionals and companies 
							across Europe achieve their goals.
						</BrandedP>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						{testimonials.map((testimonial, index) => (
							<BrandedCard key={index} className="p-8 hover:shadow-lg transition-all duration-300"
								style={{ backgroundColor: colors.background }}>
								<div className="flex items-center space-x-1 mb-4">
									{[...Array(5)].map((_, i) => (
										<Star key={i} className="w-5 h-5 fill-current" style={{ color: colors.warning }} />
									))}
								</div>
								<BrandedP className="text-lg mb-6 italic" style={{ color: colors.text.secondary }}>
									"{testimonial.quote}"
								</BrandedP>
								<div className="flex items-center space-x-4">
									<img
										src={testimonial.image}
										alt={testimonial.name}
										className="w-12 h-12 rounded-full object-cover"
									/>
									<div>
										<BrandedSpan className="font-semibold" style={{ color: colors.text.primary }}>
											{testimonial.name}
										</BrandedSpan>
										<BrandedP className="text-sm" style={{ color: colors.text.secondary }}>
											{testimonial.role}
										</BrandedP>
									</div>
								</div>
							</BrandedCard>
						))}
					</div>
				</div>
			</BrandedSection>

			{/* Final CTA Section */}
			<BrandedSection className="py-20" style={{ backgroundColor: colors.primary }}>
				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
					<BrandedH2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
						Ready to Transform Your Tech Career in Europe?
					</BrandedH2>
					<BrandedP className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
						Join thousands of professionals who found their perfect match in Germany and Switzerland
					</BrandedP>
					
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<Link
							to="/register/talent"
							className="px-8 py-4 rounded-lg font-semibold transition-all duration-200 bg-white hover:bg-gray-50"
							style={{ color: colors.primary }}
						>
							Get Started Free
						</Link>
						<Link
							to="/contact"
							className="px-8 py-4 rounded-lg font-semibold transition-all duration-200 border-2 border-white text-white hover:bg-white"
							onMouseEnter={(e) => e.currentTarget.style.color = colors.primary}
							onMouseLeave={(e) => e.currentTarget.style.color = 'white'}
						>
							Contact Us
						</Link>
					</div>
				</div>
			</BrandedSection>
		</div>
	)
}

export default HomePage 