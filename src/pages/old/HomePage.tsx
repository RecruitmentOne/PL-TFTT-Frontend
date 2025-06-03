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
	ChevronRight
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
			image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
			quote: 'Found my dream job in Berlin within 2 weeks. The AI matching was incredible!',
			flag: '🇩🇪'
		},
		{
			name: 'Marco Silva',
			role: 'DevOps Engineer',
			company: 'Zurich Fintech',
			image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
			quote: 'The platform made relocating to Switzerland seamless. 90% salary increase!',
			flag: '🇨🇭'
		},
		{
			name: 'Anna Kowalski',
			role: 'Data Scientist',
			company: 'Amsterdam Scale-up',
			image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
			quote: 'The AI perfectly matched my Python & ML skills with the right opportunities.',
			flag: '🇳🇱'
		}
	]

	const techStats = [
		{ number: '50K+', label: 'Tech Professionals', icon: Users },
		{ number: '95%', label: 'Match Accuracy', icon: Target },
		{ number: '2.5K+', label: 'Companies', icon: Building },
		{ number: '€85K', label: 'Avg Salary', icon: TrendingUp }
	]

	const features = [
		{
			icon: Bot,
			title: 'OpenAI CV Parsing',
			description: 'AI extracts skills from your CV with 90%+ accuracy',
			color: 'primary'
		},
		{
			icon: Brain,
			title: 'Smart Matching',
			description: 'GPT-powered job recommendations tailored to you',
			color: 'secondary'
		},
		{
			icon: Shield,
			title: 'GDPR Compliant',
			description: 'Your data is secure and privacy-protected',
			color: 'success'
		},
		{
			icon: Globe,
			title: 'European Focus',
			description: 'Specialized in German & Swiss tech markets',
			color: 'primary'
		}
	]

	const howItWorks = [
		{
			step: '01',
			title: 'Upload Your CV',
			description: 'Our AI analyzes your technical skills and experience',
			icon: Code
		},
		{
			step: '02',
			title: 'Get Matched',
			description: 'Receive personalized job recommendations',
			icon: Target
		},
		{
			step: '03',
			title: 'Land Your Job',
			description: 'Connect with top European tech companies',
			icon: Award
		}
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
				style={{
					background: `linear-gradient(135deg, ${colors.background} 0%, ${colors.surface} 50%, ${colors.background} 100%)`
				}}
			>
				{/* Animated Background */}
				<div className="absolute inset-0 opacity-[0.03]">
					<div 
						className="absolute inset-0"
						style={{
							backgroundImage: `radial-gradient(circle at 50% 50%, ${colors.primary} 1px, transparent 1px)`,
							backgroundSize: '50px 50px',
							animation: 'float 20s infinite linear'
						}}
					></div>
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

							{/* European Markets */}
							<div className="flex flex-wrap gap-2">
								{['🇩🇪 Germany', '🇨🇭 Switzerland', '🇳🇱 Netherlands', '🇦🇹 Austria'].map((market) => (
									<BrandedSpan 
										key={market}
										className="px-3 py-1 rounded-full text-sm font-medium"
										style={{ backgroundColor: `${colors.secondary}10`, color: colors.secondary }}
									>
										{market}
									</BrandedSpan>
								))}
							</div>
						</div>

						{/* Hero Visual */}
						<div className="relative">
							<div 
								className="rounded-2xl p-8 shadow-2xl transform hover:scale-105 transition-transform duration-300"
								style={{ backgroundColor: colors.background }}
							>
								<div className="flex items-center justify-between mb-6">
									<BrandedH3>Live Tech Matches</BrandedH3>
									<div className="flex items-center space-x-1">
										<div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
										<BrandedSpan className="text-sm">Live</BrandedSpan>
									</div>
								</div>

								<div className="space-y-4">
									{[
										{ role: 'Senior React Developer', company: 'Berlin Startup', match: 94 },
										{ role: 'DevOps Engineer', company: 'Zurich Bank', match: 89 },
										{ role: 'Data Scientist', company: 'Amsterdam AI', match: 92 }
									].map((job, index) => (
										<div 
											key={index}
											className="p-4 rounded-lg border"
											style={{ borderColor: colors.border, backgroundColor: colors.surface }}
										>
											<div className="flex items-center justify-between">
												<div>
													<BrandedP className="font-semibold">{job.role}</BrandedP>
													<BrandedP className="text-sm" style={{ color: colors.text.secondary }}>
														{job.company}
													</BrandedP>
												</div>
												<div className="flex items-center space-x-2">
													<Star className="w-4 h-4" style={{ color: '#F59E0B' }} />
													<BrandedSpan className="font-semibold" style={{ color: '#F59E0B' }}>
														{job.match}%
													</BrandedSpan>
												</div>
											</div>
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>
			</BrandedSection>

			{/* Stats Section */}
			<BrandedSection className="py-16" style={{ backgroundColor: colors.surface }}>
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
						{techStats.map((stat, index) => {
							const Icon = stat.icon
							return (
								<div key={index} className="text-center">
									<div 
										className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
										style={{ backgroundColor: `${colors.primary}15` }}
									>
										<Icon className="w-8 h-8" style={{ color: colors.primary }} />
									</div>
									<BrandedH3 className="text-3xl font-bold mb-2">{stat.number}</BrandedH3>
									<BrandedP style={{ color: colors.text.secondary }}>{stat.label}</BrandedP>
								</div>
							)
						})}
					</div>
				</div>
			</BrandedSection>

			{/* Features Section */}
			<BrandedSection className="py-20" style={{ backgroundColor: colors.background }}>
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
							const featureColor = feature.color === 'primary' ? colors.primary : 
											  feature.color === 'secondary' ? colors.secondary : '#10B981'
							return (
								<BrandedCard 
									key={index} 
									variant="elevated" 
									padding="lg"
									className="text-center group hover:scale-105 transition-transform duration-300"
								>
									<div 
										className="w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6"
										style={{ backgroundColor: `${featureColor}15` }}
									>
										<Icon className="w-8 h-8" style={{ color: featureColor }} />
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
			<BrandedSection className="py-20" style={{ backgroundColor: colors.surface }}>
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
								<div key={index} className="relative text-center">
									{index < howItWorks.length - 1 && (
										<div 
											className="hidden md:block absolute top-16 left-1/2 w-full h-0.5"
											style={{ backgroundColor: `${colors.primary}30` }}
										></div>
									)}
									
									<div className="relative">
										<div 
											className="w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-6 relative z-10"
											style={{ backgroundColor: colors.primary }}
										>
											<Icon className="w-12 h-12 text-white" />
											<div 
												className="absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
												style={{ backgroundColor: colors.secondary, color: colors.text.inverse }}
											>
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
								className="w-20 h-20 rounded-full mx-auto mb-6 object-cover"
							/>
							<BrandedP className="text-xl italic mb-6 leading-relaxed">
								"{testimonials[activeTestimonial].quote}"
							</BrandedP>
							<BrandedH3 className="mb-1">
								{testimonials[activeTestimonial].name} {testimonials[activeTestimonial].flag}
							</BrandedH3>
							<BrandedP style={{ color: colors.text.secondary }}>
								{testimonials[activeTestimonial].role} at {testimonials[activeTestimonial].company}
							</BrandedP>
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
				className="py-20 relative"
				style={{
					background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`
				}}
			>
				<div className="absolute inset-0 opacity-10">
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
					
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
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
							Learn More
						</Link>
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