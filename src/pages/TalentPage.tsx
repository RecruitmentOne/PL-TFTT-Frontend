import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useBrand, useBrandColors } from '../brand'
import { BrandLogo } from '../components/brand/brand-logo'
import { BrandedH1, BrandedH2, BrandedH3, BrandedP } from '../components/brand/branded-typography'
import { BrandedCard } from '../components/brand/branded-card'
import { BrandedButton } from '../components/brand/branded-button/branded-button'
import { BrandedSection, HeroSection, FeatureSection } from '../components/brand/branded-section'
import { 
	Star, 
	TrendingUp, 
	MapPin, 
	Clock, 
	Users, 
	Award, 
	Target, 
	Sparkles,
	ArrowRight,
	CheckCircle,
	Globe,
	Briefcase,
	DollarSign,
	Code,
	Database,
	Cloud,
	BarChart3,
	Zap,
	Shield,
	UserCheck,
	Rocket
} from 'lucide-react'

function TalentPage() {
	const { t } = useTranslation()
	const { switchVariant } = useBrand()
	const colors = useBrandColors()

	// Set brand variant to talent when page loads
	React.useEffect(() => {
		switchVariant('talent')
	}, [switchVariant])

	const techRoles = [
		{
			title: t('talent.roles.frontend.title', 'Frontend Development'),
			image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1471&q=80',
			skills: ['React', 'Vue.js', 'TypeScript', 'Angular'],
			jobs: '2.3K+ Jobs',
			icon: Code,
			avgSalary: '€65-85K',
			description: 'Build responsive web applications for European startups and enterprises'
		},
		{
			title: t('talent.roles.backend.title', 'Backend Development'),
			image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1632&q=80',
			skills: ['Node.js', 'Python', 'Java', 'Go'],
			jobs: '3.1K+ Jobs',
			icon: Database,
			avgSalary: '€70-95K',
			description: 'Design scalable backend systems for European fintech and e-commerce'
		},
		{
			title: t('talent.roles.devops.title', 'DevOps & Cloud'),
			image: 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?ixlib=rb-4.0.3&auto=format&fit=crop&w=1469&q=80',
			skills: ['AWS', 'Docker', 'Kubernetes', 'Terraform'],
			jobs: '1.8K+ Jobs',
			icon: Cloud,
			avgSalary: '€75-105K',
			description: 'Optimize infrastructure for high-growth European tech companies'
		},
		{
			title: t('talent.roles.data.title', 'Data & AI'),
			image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
			skills: ['Python', 'TensorFlow', 'SQL', 'R'],
			jobs: '1.5K+ Jobs',
			icon: BarChart3,
			avgSalary: '€80-115K',
			description: 'Drive AI innovation in European research and technology sectors'
		}
	]

	const benefits = [
		{
			icon: Zap,
			title: t('talent.benefits.ai.title', 'AI-Powered Job Matching'),
			description: t('talent.benefits.ai.description', 'Advanced algorithms for matching your skills with relevant opportunities. Our AI understands your career goals and connects you with quality roles'),
			highlight: 'Smart Matching'
		},
		{
			icon: TrendingUp,
			title: t('talent.benefits.direct.title', 'Direct Employer Contact'),
			description: t('talent.benefits.direct.description', 'Connect directly with employers who pay to access your CV. Mutual interest ensures quality connections and serious opportunities'),
			highlight: 'Quality Connections'
		},
		{
			icon: DollarSign,
			title: t('talent.benefits.premium.title', 'Premium Salary Opportunities'),
			description: t('talent.benefits.premium.description', 'Access €60k-130k+ tech roles in German and Swiss markets. Join thousands earning premium salaries in top companies'),
			highlight: '€60-130k+ Salaries'
		},
		{
			icon: Award,
			title: t('talent.benefits.verified.title', 'Verified Profile System'),
			description: t('talent.benefits.verified.description', 'Professional CV parsing, skill verification, and portfolio showcase powered by AI to attract serious employers'),
			highlight: 'AI-Enhanced Profiles'
		}
	]

	const cities = [
		{ name: 'Berlin', country: 'Germany', jobs: '4.2K+', flag: '🇩🇪', avgSalary: '€72K', companies: 'Tech Companies, Startups, Scale-ups' },
		{ name: 'Munich', country: 'Germany', jobs: '2.4K+', flag: '🇩🇪', avgSalary: '€70K', companies: 'Automotive, Tech, Engineering' },
		{ name: 'Zurich', country: 'Switzerland', jobs: '2.8K+', flag: '🇨🇭', avgSalary: '€95K', companies: 'Tech Companies, Startups, Banks' },
		{ name: 'Basel', country: 'Switzerland', jobs: '1.5K+', flag: '🇨🇭', avgSalary: '€88K', companies: 'Pharma, Tech, Finance' },
		{ name: 'Frankfurt', country: 'Germany', jobs: '1.9K+', flag: '🇩🇪', avgSalary: '€75K', companies: 'Finance, Tech, Consulting' },
		{ name: 'Stuttgart', country: 'Germany', jobs: '1.7K+', flag: '🇩🇪', avgSalary: '€68K', companies: 'Automotive, Engineering, Tech' }
	]

	const successStories = [
		{
			name: 'Petra Novák',
			role: 'Senior React Developer',
			company: 'Fintech Startup Berlin',
			image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=987&q=80',
			quote: 'Found my dream job in Berlin within 2 weeks through direct employer contact. The AI matching was incredibly accurate!',
			previousLocation: 'Prague, Czech Republic',
			salary: '€78K + equity',
			flag: '🇨🇿 → 🇩🇪'
		},
		{
			name: 'Andrei Popescu',
			role: 'DevOps Engineer',
			company: 'Scale-up Zurich',
			image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
			quote: 'Moving from Bucharest to Zurich was seamless. Direct employer contact made all the difference!',
			previousLocation: 'Bucharest, Romania',
			salary: '€92K + benefits',
			flag: '🇷🇴 → 🇨🇭'
		},
		{
			name: 'Katarzyna Kowalski',
			role: 'Data Scientist',
			company: 'AI Research Munich',
			image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
			quote: 'From Warsaw to Munich in 3 weeks! The mutual interest system works perfectly.',
			previousLocation: 'Warsaw, Poland',
			salary: '€85K + research budget',
			flag: '🇵🇱 → 🇩🇪'
		}
	]

	const registrationSteps = [
		{
			step: 1,
			title: t('talent.process.profile.title', 'Create Your Profile'),
			description: t('talent.process.profile.description', 'Upload your CV and let our AI intelligently extract your skills, experience, and achievements'),
			icon: UserCheck,
			duration: '1 minutes',
			features: ['AI CV parsing', 'Skill extraction', 'GitHub integration']
		},
		{
			step: 2,
			title: t('talent.process.verify.title', 'Verify Your Skills'),
			description: t('talent.process.verify.description', 'Complete skill assessments and link your portfolio to showcase your expertise to European employers'),
			icon: Shield,
			duration: '15 minutes',
			features: ['Skill assessments', 'Portfolio showcase', 'Code samples']
		},
		{
			step: 3,
			title: t('talent.process.match.title', 'Get AI-Matched'),
			description: t('talent.process.match.description', 'Our AI analyzes thousands of opportunities and matches you with roles that fit your skills and career goals'),
			icon: Zap,
			duration: 'Instant',
			features: ['AI matching', 'Role recommendations', 'Salary insights']
		},
		{
			step: 4,
			title: t('talent.process.connect.title', 'Connect & Get Hired'),
			description: t('talent.process.connect.description', 'Communicate directly with interested employers and secure your position in Germany or Switzerland'),
			icon: Rocket,
			duration: '2-4 weeks',
			features: ['Direct contact', 'Mutual interest', 'No middleman']
		}
	]

	const platformBenefits = [
		{
			icon: Zap,
			title: t('talent.platform.speed.title', '10x Faster Job Search'),
			description: t('talent.platform.speed.description', 'Skip endless applications. AI matches you with relevant opportunities and employers pay to contact you directly'),
			metric: '10x Faster',
			color: colors.primary
		},
		{
			icon: DollarSign,
			title: t('talent.platform.salary.title', 'Premium Salary Opportunities'),
			description: t('talent.platform.salary.description', 'Access €60k-130k+ tech roles in German and Swiss markets with leading tech companies'),
			metric: '€60-130k+',
			color: colors.secondary
		},
		{
			icon: Shield,
			title: t('talent.platform.verified.title', 'Verified Employer Network'),
			description: t('talent.platform.verified.description', 'All employers pay credits to access your CV, ensuring serious interest and quality opportunities from real companies'),
			metric: 'Credit-Based Quality',
			color: colors.success
		},
		{
			icon: TrendingUp,
			title: t('talent.platform.direct.title', 'Direct Communication'),
			description: t('talent.platform.direct.description', 'No recruitment agencies. Communicate directly with hiring managers after mutual interest confirmation - save time and get hired faster'),
			metric: 'No Middleman',
			color: colors.primary
		}
	]

	return (
		<div className="min-h-screen">
			{/* Hero Section */}
			<HeroSection>
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
					<div>
						<BrandedH1 className="mb-6">
							{t('talent.hero.title.launch', 'Launch Your')} 
							<span style={{ color: colors.primary }}> {t('talent.hero.title.techCareer', 'Tech Career')}</span>
							{' '}{t('talent.hero.title.inGermanySwitzerland', 'in Germany & Switzerland')}
						</BrandedH1>
						
						<BrandedP size="lg" className="mb-8 max-w-2xl">
							{t('talent.hero.description', 'Connect with premium tech opportunities in Germany and Switzerland through AI-powered matching and direct employer connections. Join thousands of professionals earning €60k-130k+ in top German and Swiss companies.')}
						</BrandedP>
						
						{/* Tech Hubs */}
						<div className="flex flex-wrap gap-3 mb-8">
							{cities.slice(0, 6).map((city) => (
								<span 
									key={city.name} 
									className="px-3 py-1 rounded-full text-sm font-medium"
									style={{
										backgroundColor: `${colors.primary}15`,
										color: colors.primary
									}}
								>
									{city.flag} {city.name}
								</span>
							))}
						</div>
						
						<div className="flex flex-col sm:flex-row gap-4">
							<Link to="/register/talent">
								<BrandedButton 
									variant="primary" 
									className="px-8 py-4 text-lg w-full"
								>
									{t('talent.hero.cta', 'Start Your Tech Journey')}
									<Rocket className="w-5 h-5 ml-2" />
								</BrandedButton>
							</Link>
							<Link to="/login/talent">
								<BrandedButton 
									variant="secondary" 
									className="px-8 py-4 text-lg w-full"
								>
									{t('talent.hero.login', 'Sign In')}
								</BrandedButton>
							</Link>
						</div>
					</div>
					
					{/* Hero Image */}
					<div className="relative">
						<img
							src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1484&q=80"
							alt="Diverse tech team collaborating in modern European office"
							className="rounded-2xl shadow-2xl"
						/>
						{/* Floating Stats */}
						<BrandedCard variant="elevated" className="absolute -bottom-6 -left-6 p-4">
							<div className="text-2xl font-bold" style={{ color: colors.primary }}>
								AI-Powered
							</div>
							<BrandedP variant="muted" size="sm">
								{t('talent.stats.technology', 'Technology')}
							</BrandedP>
						</BrandedCard>
						<BrandedCard variant="elevated" className="absolute -top-6 -right-6 p-4">
							<div className="text-2xl font-bold" style={{ color: colors.secondary }}>
								EU-Ready
							</div>
							<BrandedP variant="muted" size="sm">
								{t('talent.stats.eligibility', 'Work Eligibility')}
							</BrandedP>
						</BrandedCard>
					</div>
				</div>
			</HeroSection>

			{/* Tech Roles Section */}
			<FeatureSection>
				<div className="text-center mb-16">
					<BrandedH2 className="mb-4">
						{t('talent.roles.title', 'Your Next Role Awaits in Europe')}
					</BrandedH2>
					<BrandedP size="lg" className="max-w-3xl mx-auto">
						{t('talent.roles.description', "From innovative startups in Berlin to fintech leaders in Zurich, discover your perfect role in Germany and Switzerland's thriving tech ecosystem.")}
					</BrandedP>
				</div>
				
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					{techRoles.map((role, index) => (
						<BrandedCard key={index} variant="elevated" className="p-6 hover:scale-105 transition-transform">
							<div className="flex items-start space-x-4">
								<img
									src={role.image}
									alt={role.title}
									className="w-20 h-20 object-cover rounded-lg"
								/>
								<div className="flex-1">
									<div className="flex items-center space-x-3 mb-3">
										<div className="w-10 h-10 rounded-lg flex items-center justify-center"
											 style={{ backgroundColor: colors.primary + '20' }}>
											<role.icon className="w-5 h-5" style={{ color: colors.primary }} />
										</div>
										<BrandedH3>{role.title}</BrandedH3>
									</div>
									
									<BrandedP variant="secondary" size="sm" className="mb-4">
										{role.description}
									</BrandedP>
									
									<div className="flex flex-wrap gap-2 mb-4">
										{role.skills.map((skill) => (
											<span 
												key={skill} 
												className="px-2 py-1 rounded text-xs font-medium"
												style={{
													backgroundColor: colors.surface,
													color: colors.text.primary,
													border: `1px solid ${colors.border}`
												}}
											>
												{skill}
											</span>
										))}
									</div>
									
									<div className="flex items-center justify-between">
										<div>
											<span className="font-semibold" style={{ color: colors.primary }}>
												{role.jobs}
											</span>
											<span className="text-sm ml-1" style={{ color: colors.text.secondary }}>
												available
											</span>
										</div>
										<div>
											<span className="font-semibold" style={{ color: colors.success }}>
												{role.avgSalary}
											</span>
											<span className="text-sm ml-1" style={{ color: colors.text.secondary }}>
												avg
											</span>
										</div>
									</div>
								</div>
							</div>
						</BrandedCard>
					))}
				</div>
			</FeatureSection>

			{/* How It Works Section */}
			<BrandedSection variant="surface">
				<div className="text-center mb-16">
					<BrandedH2 className="mb-4">
						{t('talent.process.title', 'How TFTT Works for You')}
					</BrandedH2>
					<BrandedP size="lg" className="max-w-3xl mx-auto">
						{t('talent.process.description', 'From profile creation to landing your dream job in Germany or Switzerland - here\'s how we connect you directly with employers')}
					</BrandedP>
				</div>
				
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
					{registrationSteps.map((step, index) => (
						<BrandedCard key={index} variant="elevated" className="p-6 text-center relative">
							{/* Step Number */}
							<div className="absolute -top-4 -right-4 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
								 style={{ backgroundColor: colors.primary }}>
								{step.step}
							</div>
							
							<div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
								 style={{ backgroundColor: colors.primary + '20' }}>
								<step.icon className="w-8 h-8" style={{ color: colors.primary }} />
							</div>
							
							<BrandedH3 className="mb-3">{step.title}</BrandedH3>
							<BrandedP variant="secondary" size="sm" className="mb-4">{step.description}</BrandedP>
							
							<div className="space-y-2">
								<div className="flex items-center justify-center space-x-2 mb-3">
									<Clock className="w-4 h-4" style={{ color: colors.secondary }} />
									<span className="text-sm font-medium" style={{ color: colors.secondary }}>
										{step.duration}
									</span>
								</div>
								
								<div className="space-y-1">
									{step.features.map((feature, idx) => (
										<div key={idx} className="flex items-center justify-center space-x-2">
											<CheckCircle className="w-3 h-3" style={{ color: colors.success }} />
											<span className="text-xs" style={{ color: colors.text.secondary }}>
												{feature}
											</span>
										</div>
									))}
								</div>
							</div>
						</BrandedCard>
					))}
				</div>
				
				<div className="text-center mt-12">
					<Link to="/register/talent">
						<BrandedButton variant="primary" className="px-8 py-4 text-lg">
							{t('talent.process.cta', 'Start Your Registration')}
							<ArrowRight className="w-5 h-5 ml-2" />
						</BrandedButton>
					</Link>
				</div>
			</BrandedSection>

			{/* Platform Benefits Section */}
			<FeatureSection>
				<div className="text-center mb-16">
					<BrandedH2 className="mb-4">
						{t('talent.platform.title', 'Why 50,000+ Developers Choose TFTT')}
					</BrandedH2>
					<BrandedP size="lg" className="max-w-3xl mx-auto">
						{t('talent.platform.description', 'Experience the most advanced talent platform designed specifically for EU professionals targeting premium German and Swiss tech companies')}
					</BrandedP>
				</div>
				
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					{platformBenefits.map((benefit, index) => (
						<BrandedCard key={index} variant="elevated" className="p-8">
							<div className="flex items-start space-x-4">
								<div className="w-12 h-12 rounded-lg flex items-center justify-center"
									 style={{ backgroundColor: benefit.color + '20' }}>
									<benefit.icon className="w-6 h-6" style={{ color: benefit.color }} />
								</div>
								<div className="flex-1">
									<div className="flex items-center justify-between mb-3">
										<BrandedH3>{benefit.title}</BrandedH3>
										<span className="text-sm font-semibold px-3 py-1 rounded-full"
											  style={{ 
												  backgroundColor: benefit.color + '20',
												  color: benefit.color 
											  }}>
											{benefit.metric}
										</span>
									</div>
									<BrandedP variant="secondary">{benefit.description}</BrandedP>
								</div>
							</div>
						</BrandedCard>
					))}
				</div>
			</FeatureSection>

			{/* Benefits Section */}
			<BrandedSection variant="surface">
				<div className="text-center mb-16">
					<BrandedH2 className="mb-4">
						{t('talent.benefits.title', 'Your European Tech Journey, Fully Supported')}
					</BrandedH2>
					<BrandedP size="lg" className="max-w-3xl mx-auto">
						{t('talent.benefits.description', 'From direct employer connections to premium opportunities, we support every step of your German-Swiss tech career journey')}
					</BrandedP>
				</div>
				
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					{benefits.map((benefit, index) => (
						<BrandedCard key={index} variant="elevated" className="p-8">
							<div className="flex items-start space-x-4">
								<div className="w-12 h-12 rounded-lg flex items-center justify-center"
									 style={{ backgroundColor: colors.primary + '20' }}>
									<benefit.icon className="w-6 h-6" style={{ color: colors.primary }} />
								</div>
								<div className="flex-1">
									<div className="flex items-center justify-between mb-3">
										<BrandedH3>{benefit.title}</BrandedH3>
										<span className="text-sm font-semibold px-2 py-1 rounded"
											  style={{ 
												  backgroundColor: colors.primary + '20',
												  color: colors.primary 
											  }}>
											{benefit.highlight}
										</span>
									</div>
									<BrandedP variant="secondary">{benefit.description}</BrandedP>
								</div>
							</div>
						</BrandedCard>
					))}
				</div>
			</BrandedSection>

			{/* Success Stories Section */}
			<BrandedSection variant="surface">
				<div className="text-center mb-16">
					<BrandedH2 className="mb-4">
						{t('talent.success.title', 'Success Stories from Global Talent')}
					</BrandedH2>
					<BrandedP size="lg" className="max-w-3xl mx-auto">
						{t('talent.success.description', 'Real stories from EU professionals who built their German and Swiss careers through direct employer connections on TFTT')}
					</BrandedP>
				</div>
				
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{successStories.map((story, index) => (
						<BrandedCard key={index} variant="elevated" className="p-6">
							<div className="text-center mb-4">
								<img
									src={story.image}
									alt={story.name}
									className="w-16 h-16 rounded-full object-cover mx-auto mb-4"
								/>
								<BrandedH3 className="mb-1">{story.name}</BrandedH3>
								<BrandedP variant="muted" size="sm" className="mb-1">{story.role}</BrandedP>
								<BrandedP variant="muted" size="sm">{story.company}</BrandedP>
								<div className="text-lg mb-2">{story.flag}</div>
							</div>
							
							<BrandedP variant="secondary" className="italic mb-4 text-center">
								"{story.quote}"
							</BrandedP>
							
							<div className="space-y-2 pt-4 border-t" style={{ borderColor: colors.border }}>
								<div className="flex justify-between">
									<span className="text-sm" style={{ color: colors.text.secondary }}>From:</span>
									<span className="text-sm font-medium" style={{ color: colors.text.primary }}>
										{story.previousLocation}
									</span>
								</div>
								<div className="flex justify-between">
									<span className="text-sm" style={{ color: colors.text.secondary }}>Salary:</span>
									<span className="text-sm font-semibold" style={{ color: colors.success }}>
										{story.salary}
									</span>
								</div>
							</div>
						</BrandedCard>
					))}
				</div>
			</BrandedSection>

			{/* CTA Section */}
			<BrandedSection variant="gradient">
				<div className="text-center">
					<BrandedH2 className="mb-6" style={{ color: colors.text.primary }}>
						{t('talent.cta.title', 'Ready to Start Your German-Swiss Tech Adventure?')}
					</BrandedH2>
					<BrandedP size="lg" className="mb-8 max-w-2xl mx-auto" style={{ color: colors.text.secondary }}>
						{t('talent.cta.description', 'Join thousands of EU professionals who transformed their careers in Germany and Switzerland. Your premium tech opportunity is just a click away.')}
					</BrandedP>
					
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<Link to="/register/talent">
							<BrandedButton 
								variant="primary" 
								className="px-8 py-4 text-lg"
							>
								{t('talent.cta.register', 'Create Free Profile')}
								<ArrowRight className="w-5 h-5 ml-2" />
							</BrandedButton>
						</Link>
						<Link to="/brand-showcase">
							<BrandedButton 
								variant="outline" 
								className="px-8 py-4 text-lg"
							>
								{t('talent.cta.learn', 'Explore Opportunities')}
							</BrandedButton>
						</Link>
					</div>
					
					<div className="flex items-center justify-center mt-8 space-x-8">
						<div className="flex items-center space-x-2">
							<CheckCircle className="w-5 h-5" style={{ color: colors.success }} />
							<span style={{ color: colors.text.secondary }}>{t('talent.cta.euCitizens', 'EU citizens welcome')}</span>
						</div>
						<div className="flex items-center space-x-2">
							<CheckCircle className="w-5 h-5" style={{ color: colors.success }} />
							<span style={{ color: colors.text.secondary }}>{t('talent.cta.directContact', 'Direct employer contact')}</span>
						</div>
						<div className="flex items-center space-x-2">
							<CheckCircle className="w-5 h-5" style={{ color: colors.success }} />
							<span style={{ color: colors.text.secondary }}>{t('talent.cta.premiumMarkets', 'Premium DE/CH markets')}</span>
						</div>
					</div>
				</div>
			</BrandedSection>
		</div>
	)
}

export default TalentPage 