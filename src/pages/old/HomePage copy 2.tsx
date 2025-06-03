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
	Database
} from 'lucide-react'

function HomePage() {
	const { t } = useTranslation()
	const { switchVariant } = useBrand()
	const colors = useBrandColors()
	const [activeTestimonial, setActiveTestimonial] = useState(0)

	useEffect(() => {
		// Default to talent variant for homepage
		switchVariant('talent')
	}, [switchVariant])

	const testimonials = [
		{
			name: 'Sarah Chen',
			role: 'Senior React Developer',
			company: 'Berlin Tech Startup',
			image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=120&h=120&fit=crop&crop=face',
			quote: 'Found my dream job in Berlin within 2 weeks. The AI matching was incredible!',
			flag: '🇩🇪',
			salary: '+45% salary increase'
		},
		{
			name: 'Marco Silva',
			role: 'DevOps Engineer',
			company: 'Zurich Fintech',
			image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=face',
			quote: 'The platform made relocating to Switzerland seamless. 90% salary increase!',
			flag: '🇨🇭',
			salary: '+90% salary increase'
		},
		{
			name: 'Anna Kowalski',
			role: 'Data Scientist',
			company: 'Amsterdam Scale-up',
			image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&h=120&fit=crop&crop=face',
			quote: 'The AI perfectly matched my Python & ML skills with the right opportunities.',
			flag: '🇳🇱',
			salary: '+60% salary increase'
		}
	]

	const techStats = [
		{ 
			number: '50K+', 
			label: 'Tech Professionals', 
			icon: Users,
			gradient: 'from-blue-500 to-blue-600'
		},
		{ 
			number: '95%', 
			label: 'Match Accuracy', 
			icon: Target,
			gradient: 'from-green-500 to-green-600'
		},
		{ 
			number: '2.5K+', 
			label: 'Companies', 
			icon: Building,
			gradient: 'from-purple-500 to-purple-600'
		},
		{ 
			number: '€85K', 
			label: 'Avg Salary', 
			icon: TrendingUp,
			gradient: 'from-orange-500 to-orange-600'
		}
	]

	const features = [
		{
			icon: Bot,
			title: 'AI-Powered CV Analysis',
			description: 'OpenAI technology extracts skills from your CV with 90%+ accuracy',
			image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop',
			gradient: 'from-blue-500 to-indigo-600'
		},
		{
			icon: Brain,
			title: 'Smart Job Matching',
			description: 'GPT-powered recommendations tailored to your skills and preferences',
			image: 'https://images.unsplash.com/photo-1559028006-448665bd7c7f?w=400&h=250&fit=crop',
			gradient: 'from-purple-500 to-pink-600'
		},
		{
			icon: Shield,
			title: 'GDPR Compliant',
			description: 'Enterprise-grade security with full European data protection',
			image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=250&fit=crop',
			gradient: 'from-green-500 to-teal-600'
		},
		{
			icon: Globe,
			title: 'European Network',
			description: 'Specialized access to German, Swiss, and EU tech markets',
			image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=400&h=250&fit=crop',
			gradient: 'from-orange-500 to-red-600'
		}
	]

	const howItWorks = [
		{
			step: '01',
			title: 'Upload Your CV',
			description: 'Our AI analyzes your technical skills and experience in seconds',
			icon: Upload,
			color: 'blue'
		},
		{
			step: '02',
			title: 'Get AI Matches',
			description: 'Receive personalized job recommendations from European companies',
			icon: Search,
			color: 'purple'
		},
		{
			step: '03',
			title: 'Connect & Apply',
			description: 'Direct communication with hiring managers and tech teams',
			icon: MessageCircle,
			color: 'green'
		}
	]

	const techStack = [
		{ name: 'React', icon: '⚛️', color: 'bg-blue-100 text-blue-600' },
		{ name: 'Python', icon: '🐍', color: 'bg-yellow-100 text-yellow-600' },
		{ name: 'Node.js', icon: '🟢', color: 'bg-green-100 text-green-600' },
		{ name: 'TypeScript', icon: '📘', color: 'bg-blue-100 text-blue-700' },
		{ name: 'AWS', icon: '☁️', color: 'bg-orange-100 text-orange-600' },
		{ name: 'Docker', icon: '🐳', color: 'bg-cyan-100 text-cyan-600' },
		{ name: 'Vue.js', icon: '💚', color: 'bg-emerald-100 text-emerald-600' },
		{ name: 'Go', icon: '🔷', color: 'bg-sky-100 text-sky-600' }
	]

	const companyLogos = [
		'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=120&h=60&fit=crop',
		'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=120&h=60&fit=crop',
		'https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=120&h=60&fit=crop',
		'https://images.unsplash.com/photo-1633409361618-c73427e4e206?w=120&h=60&fit=crop',
		'https://images.unsplash.com/photo-1614027164847-1b28cfe1df60?w=120&h=60&fit=crop',
		'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=120&h=60&fit=crop'
	]

	useEffect(() => {
		const interval = setInterval(() => {
			setActiveTestimonial((prev) => (prev + 1) % testimonials.length)
		}, 5000)
		return () => clearInterval(interval)
	}, [testimonials.length])

	return (
		<div className="min-h-screen">
			{/* Hero Section */}
			<BrandedSection 
				className="relative overflow-hidden py-20 lg:py-32"
				style={{ backgroundColor: colors.background }}
			>
				{/* Background Pattern */}
				<div className="absolute inset-0 opacity-5">
					<div className="absolute inset-0" style={{
						backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23${colors.primary.slice(1)}' fill-opacity='0.1'%3E%3Ccircle cx='7' cy='7' r='7'/%3E%3Ccircle cx='53' cy='7' r='7'/%3E%3Ccircle cx='7' cy='53' r='7'/%3E%3Ccircle cx='53' cy='53' r='7'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
						backgroundSize: '60px 60px'
					}}></div>
				</div>

				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
						{/* Content */}
						<div>
							<BrandedCard variant="outlined" padding="sm" className="inline-block mb-6">
								<div className="flex items-center space-x-2">
									<Sparkles className="w-4 h-4" style={{ color: colors.primary }} />
									<BrandedSpan className="text-sm font-medium" style={{ color: colors.primary }}>
										AI-Powered European Tech Recruitment
									</BrandedSpan>
								</div>
							</BrandedCard>

							<BrandedH1 className="mb-6 leading-tight">
								Find Your Next <br />
								<BrandedSpan style={{ color: colors.primary }}>Tech Role</BrandedSpan> in Europe
							</BrandedH1>

							<BrandedP className="text-xl mb-8 leading-relaxed" style={{ color: colors.text.secondary }}>
								Connect with leading tech companies in Germany, Switzerland, and across the EU. 
								Our AI matches your skills with opportunities in Berlin, Zurich, Amsterdam, and beyond.
							</BrandedP>

							{/* Trust Indicators */}
							<div className="grid grid-cols-3 gap-4 mb-8">
								<div className="text-center">
									<CheckCircle className="w-6 h-6 mx-auto mb-2" style={{ color: colors.success }} />
									<BrandedSpan className="text-sm font-medium">90% Accuracy</BrandedSpan>
								</div>
								<div className="text-center">
									<Shield className="w-6 h-6 mx-auto mb-2" style={{ color: colors.success }} />
									<BrandedSpan className="text-sm font-medium">GDPR Compliant</BrandedSpan>
								</div>
								<div className="text-center">
									<Star className="w-6 h-6 mx-auto mb-2" style={{ color: colors.success }} />
									<BrandedSpan className="text-sm font-medium">4.9/5 Rating</BrandedSpan>
								</div>
							</div>

							{/* CTA Buttons */}
							<div className="flex flex-col sm:flex-row gap-4 mb-8">
								<Link
									to="/register/talent"
									className="px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl"
									style={{ backgroundColor: colors.primary, color: colors.text.inverse }}
									onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
									onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
								>
									<Users className="w-5 h-5 mr-2" />
									Find Tech Jobs
									<ArrowRight className="w-5 h-5 ml-2" />
								</Link>
								<Link
									to="/register/team"
									className="px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 flex items-center justify-center border-2"
									style={{ 
										borderColor: colors.border, 
										color: colors.text.primary,
										backgroundColor: colors.surface
									}}
									onMouseEnter={(e) => {
										e.currentTarget.style.borderColor = colors.primary
										e.currentTarget.style.color = colors.primary
									}}
									onMouseLeave={(e) => {
										e.currentTarget.style.borderColor = colors.border
										e.currentTarget.style.color = colors.text.primary
									}}
								>
									<Building className="w-5 h-5 mr-2" />
									Hire Talent
									<ChevronRight className="w-5 h-5 ml-2" />
								</Link>
							</div>

							{/* European Markets */}
							<div className="flex flex-wrap gap-2">
								{['🇩🇪 Germany', '🇨🇭 Switzerland', '🇳🇱 Netherlands', '🇦🇹 Austria'].map((market) => (
									<BrandedCard key={market} variant="outlined" padding="sm">
										<BrandedSpan className="text-sm font-medium">{market}</BrandedSpan>
									</BrandedCard>
								))}
							</div>
						</div>

						{/* Hero Visual */}
						<div className="relative">
							<BrandedCard 
								variant="elevated" 
								padding="lg"
								className="transform hover:scale-105 transition-transform duration-300"
							>
								<div className="flex items-center justify-between mb-6">
									<BrandedH3>Live Tech Matches</BrandedH3>
									<div className="flex items-center space-x-2">
										<div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
										<BrandedSpan className="text-sm" style={{ color: colors.success }}>Live</BrandedSpan>
									</div>
								</div>

								<div className="space-y-4">
									{[
										{ role: 'Senior React Developer', company: 'Berlin Startup', match: 94, tech: 'React' },
										{ role: 'DevOps Engineer', company: 'Zurich Bank', match: 89, tech: 'AWS' },
										{ role: 'Data Scientist', company: 'Amsterdam AI', match: 92, tech: 'Python' }
									].map((job, index) => (
										<BrandedCard 
											key={index}
											variant="outlined" 
											padding="md"
											className="hover:shadow-md transition-shadow"
										>
											<div className="flex items-center justify-between">
												<div className="flex-1">
													<BrandedP className="font-semibold">{job.role}</BrandedP>
													<BrandedP className="text-sm" style={{ color: colors.text.secondary }}>
														{job.company}
													</BrandedP>
												</div>
												<div className="flex items-center space-x-3">
													<BrandedCard variant="outlined" padding="sm">
														<BrandedSpan className="text-xs font-medium" style={{ color: colors.primary }}>
															{job.tech}
														</BrandedSpan>
													</BrandedCard>
													<div className="flex items-center space-x-1">
														<Star className="w-4 h-4" style={{ color: colors.warning }} />
														<BrandedSpan className="font-semibold" style={{ color: colors.warning }}>
															{job.match}%
														</BrandedSpan>
													</div>
												</div>
											</div>
										</BrandedCard>
									))}
								</div>
							</BrandedCard>

							{/* Floating Tech Icons */}
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
				</div>
			</BrandedSection>

			{/* Company Logos Section */}
			<BrandedSection className="py-16" style={{ backgroundColor: colors.surface }}>
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-12">
						<BrandedP style={{ color: colors.text.secondary }}>
							Trusted by leading European tech companies
						</BrandedP>
					</div>
					<div className="grid grid-cols-3 md:grid-cols-6 gap-8 items-center">
						{companyLogos.map((logo, index) => (
							<div key={index} className="text-center opacity-60 hover:opacity-100 transition-opacity">
								<img
									src={logo}
									alt={`Company ${index + 1}`}
									className="h-12 mx-auto object-contain filter grayscale hover:grayscale-0 transition-all"
								/>
							</div>
						))}
					</div>
				</div>
			</BrandedSection>

			{/* Stats Section */}
			<BrandedSection className="py-20" style={{ backgroundColor: colors.background }}>
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
						{techStats.map((stat, index) => {
							const Icon = stat.icon
							return (
								<BrandedCard 
									key={index} 
									variant="elevated" 
									padding="lg"
									className="text-center group hover:scale-105 transition-transform duration-300"
								>
									<div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-gradient-to-br ${stat.gradient}`}>
										<Icon className="w-8 h-8 text-white" />
									</div>
									<BrandedH3 className="text-3xl font-bold mb-2">{stat.number}</BrandedH3>
									<BrandedP style={{ color: colors.text.secondary }}>{stat.label}</BrandedP>
								</BrandedCard>
							)
						})}
					</div>
				</div>
			</BrandedSection>

			{/* Features Section */}
			<BrandedSection className="py-20" style={{ backgroundColor: colors.surface }}>
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-16">
						<BrandedH2 className="mb-4">Why Choose Our Platform?</BrandedH2>
						<BrandedP className="text-xl max-w-3xl mx-auto" style={{ color: colors.text.secondary }}>
							Advanced AI technology meets European tech expertise to create the perfect hiring experience.
						</BrandedP>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
						{features.map((feature, index) => {
							const Icon = feature.icon
							return (
								<BrandedCard 
									key={index} 
									variant="elevated" 
									padding="lg"
									className="group hover:scale-105 transition-all duration-300"
								>
									<div className="relative overflow-hidden rounded-lg mb-6">
										<img
											src={feature.image}
											alt={feature.title}
											className="w-full h-32 object-cover group-hover:scale-110 transition-transform duration-300"
										/>
										<div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-80`}></div>
										<div className="absolute top-4 right-4 w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-lg">
											<Icon className="w-5 h-5" style={{ color: colors.primary }} />
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
				</div>
			</BrandedSection>

			{/* How It Works */}
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
							const colorClasses: { [key: string]: string } = {
								blue: 'bg-blue-500 text-blue-100',
								purple: 'bg-purple-500 text-purple-100',
								green: 'bg-green-500 text-green-100'
							}
							
							return (
								<div key={index} className="relative text-center">
									{index < howItWorks.length - 1 && (
										<div className="hidden md:block absolute top-16 left-1/2 w-full h-0.5 bg-gradient-to-r from-gray-300 to-gray-200"></div>
									)}
									
									<div className="relative z-10">
										<div className={`w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-6 ${colorClasses[step.color]} shadow-lg`}>
											<Icon className="w-12 h-12" />
											<div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg"
												 style={{ color: colors.primary }}>
												{step.step}
											</div>
										</div>
										<BrandedH3 className="mb-3">{step.title}</BrandedH3>
										<BrandedP style={{ color: colors.text.secondary }}>
											{step.description}
										</BrandedP>
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
							<BrandedCard 
								key={index} 
								variant="outlined"
								padding="md"
								className="text-center hover:scale-110 transition-transform duration-300"
							>
								<div className={`w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-2 text-2xl ${tech.color}`}>
									{tech.icon}
								</div>
								<BrandedP className="text-xs font-medium">{tech.name}</BrandedP>
							</BrandedCard>
						))}
					</div>
				</div>
			</BrandedSection>

			{/* Testimonials */}
			<BrandedSection className="py-20" style={{ backgroundColor: colors.background }}>
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-16">
						<BrandedH2 className="mb-4">Success Stories</BrandedH2>
						<BrandedP className="text-xl max-w-3xl mx-auto" style={{ color: colors.text.secondary }}>
							Real stories from tech professionals who found their dream jobs in Europe.
						</BrandedP>
					</div>

					<BrandedCard 
						variant="elevated" 
						padding="xl"
						className="max-w-4xl mx-auto"
					>
						<div className="text-center">
							<img
								src={testimonials[activeTestimonial].image}
								alt={testimonials[activeTestimonial].name}
								className="w-20 h-20 rounded-full mx-auto mb-6 object-cover shadow-lg"
							/>
							<BrandedP className="text-xl italic mb-6 leading-relaxed">
								"{testimonials[activeTestimonial].quote}"
							</BrandedP>
							<div className="flex items-center justify-center space-x-4 mb-4">
								<div>
									<BrandedH3 className="mb-1">
										{testimonials[activeTestimonial].name} {testimonials[activeTestimonial].flag}
									</BrandedH3>
									<BrandedP style={{ color: colors.text.secondary }}>
										{testimonials[activeTestimonial].role} at {testimonials[activeTestimonial].company}
									</BrandedP>
								</div>
							</div>
							<BrandedCard variant="outlined" padding="sm" className="inline-block">
								<BrandedSpan className="font-semibold" style={{ color: colors.success }}>
									{testimonials[activeTestimonial].salary}
								</BrandedSpan>
							</BrandedCard>
						</div>

						{/* Testimonial Indicators */}
						<div className="flex justify-center space-x-2 mt-8">
							{testimonials.map((_, index) => (
								<button
									key={index}
									onClick={() => setActiveTestimonial(index)}
									className="w-3 h-3 rounded-full transition-colors"
									style={{ 
										backgroundColor: index === activeTestimonial ? colors.primary : colors.border 
									}}
								/>
							))}
						</div>
					</BrandedCard>
				</div>
			</BrandedSection>

			{/* CTA Section */}
			<BrandedSection 
				className="py-20"
				style={{ backgroundColor: colors.primary }}
			>
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
					<BrandedH2 className="text-white mb-6">
						Ready to Launch Your European Tech Career?
					</BrandedH2>
					<BrandedP className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
						Join 50,000+ tech professionals who found their perfect match in Germany, Switzerland, and across the EU.
					</BrandedP>
					
					<div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
						<Link
							to="/register/talent"
							className="bg-white hover:bg-gray-50 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 flex items-center justify-center shadow-lg"
							style={{ color: colors.primary }}
							onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
							onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
						>
							<Briefcase className="w-5 h-5 mr-2" />
							Get Started Free
							<ArrowRight className="w-5 h-5 ml-2" />
						</Link>
						<Link
							to="/about"
							className="border-2 border-white text-white hover:bg-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 flex items-center justify-center"
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

					{/* Final Stats */}
					<div className="grid grid-cols-2 md:grid-cols-4 gap-6 opacity-90">
						<div className="text-center text-white">
							<div className="text-2xl font-bold">2 weeks</div>
							<div className="text-sm opacity-80">Avg time to hire</div>
						</div>
						<div className="text-center text-white">
							<div className="text-2xl font-bold">60%</div>
							<div className="text-sm opacity-80">Avg salary increase</div>
						</div>
						<div className="text-center text-white">
							<div className="text-2xl font-bold">95%</div>
							<div className="text-sm opacity-80">Match accuracy</div>
						</div>
						<div className="text-center text-white">
							<div className="text-2xl font-bold">4.9/5</div>
							<div className="text-sm opacity-80">User satisfaction</div>
						</div>
					</div>
				</div>
			</BrandedSection>
		</div>
	)
}

export default HomePage 