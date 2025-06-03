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
	Building,
	CreditCard,
	Zap,
	Shield,
	Filter,
	Gauge,
	Search,
	Rocket
} from 'lucide-react'

function TeamsPage() {
	const { t } = useTranslation()
	const { switchVariant } = useBrand()
	const colors = useBrandColors()

	// Set brand variant to teams when page loads
	React.useEffect(() => {
		switchVariant('teams')
	}, [switchVariant])

	const techRoles = [
		{
			title: t('teams.roles.frontend.title', 'Frontend Engineers'),
			image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
			skills: ['React', 'Vue.js', 'Angular', 'TypeScript'],
			available: '8K+ EU Available',
			avgSalary: '€60-85k DE/CH',
			icon: Code,
			seniorityLevels: ['Junior', 'Mid', 'Senior', 'Lead']
		},
		{
			title: t('teams.roles.backend.title', 'Backend Engineers'),
			image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
			skills: ['Node.js', 'Python', 'Java', 'Go'],
			available: '10K+ EU Available',
			avgSalary: '€70-95k DE/CH',
			icon: Database,
			seniorityLevels: ['Junior', 'Mid', 'Senior', 'Principal']
		},
		{
			title: t('teams.roles.devops.title', 'DevOps Engineers'),
			image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=1425&q=80',
			skills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD'],
			available: '5K+ EU Available',
			avgSalary: '€75-105k DE/CH',
			icon: Cloud,
			seniorityLevels: ['Mid', 'Senior', 'Principal', 'Staff']
		},
		{
			title: t('teams.roles.data.title', 'Data Scientists'),
			image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1415&q=80',
			skills: ['Python', 'R', 'TensorFlow', 'SQL'],
			available: '4K+ EU Available',
			avgSalary: '€80-115k DE/CH',
			icon: BarChart3,
			seniorityLevels: ['Junior', 'Mid', 'Senior', 'Lead']
		}
	]

	const features = [
		{
			icon: Zap,
			title: t('teams.features.ai.title', 'AI-Powered Candidate Scoring'),
			description: t('teams.features.ai.description', 'Advanced algorithms match EU candidates to your requirements with intelligent matching and detailed reasoning for each recommendation'),
			metric: 'Smart Matching'
		},
		{
			icon: CreditCard,
			title: t('teams.features.credits.title', 'Pay-Per-CV Access'),
			description: t('teams.features.credits.description', 'Pay only when accessing candidate CVs and contact details. Significant savings vs recruitment agencies with transparent pricing'),
			metric: 'Cost Effective'
		},
		{
			icon: Shield,
			title: t('teams.features.verification.title', 'Premium EU Talent Pool'),
			description: t('teams.features.verification.description', 'Access skilled professionals earning €60k-130k+ with verified skills and experience. Quality candidates ready for immediate hire'),
			metric: 'Premium Talent'
		},
		{
			icon: Rocket,
			title: t('teams.features.speed.title', 'Streamlined Hiring'),
			description: t('teams.features.speed.description', 'Direct communication with EU candidates eliminates recruitment agency delays'),
			metric: 'Direct Process'
		}
	]

	const hiringProcess = [
		{
			step: 1,
			title: t('teams.process.search.title', 'AI-Powered Talent Search'),
			description: t('teams.process.search.description', 'Use advanced AI search to find qualified EU professionals with intelligent matching based on your specific requirements'),
			icon: Search
		},
		{
			step: 2,
			title: t('teams.process.match.title', 'Smart Candidate Scoring'),
			description: t('teams.process.match.description', 'Get intelligent candidate rankings with detailed reasoning, skill assessments, and salary expectations for informed decisions'),
			icon: Target
		},
		{
			step: 3,
			title: t('teams.process.access.title', 'Pay for CV Access'),
			description: t('teams.process.access.description', 'Use credits to access detailed profiles, CVs, and direct contact information. Only pay for candidates you actually review'),
			icon: CreditCard
		},
		{
			step: 4,
			title: t('teams.process.hire.title', 'Hire Direct & Fast'),
			description: t('teams.process.hire.description', 'Communicate directly with candidates and hire through streamlined processes with no agency fees'),
			icon: Users
		}
	]

	const markets = [
		{ country: 'Germany', flag: '🇩🇪', talent: '25K+', growth: '+28%', hubs: ['Berlin', 'Munich', 'Frankfurt'] },
		{ country: 'Switzerland', flag: '🇨🇭', talent: '8K+', growth: '+35%', hubs: ['Zurich', 'Basel', 'Geneva'] },
		{ country: 'Poland', flag: '🇵🇱', talent: '12K+', growth: '+24%', hubs: ['Warsaw', 'Krakow', 'Gdansk'] },
		{ country: 'Czech Republic', flag: '🇨🇿', talent: '8K+', growth: '+22%', hubs: ['Prague', 'Brno', 'Ostrava'] },
		{ country: 'Romania', flag: '🇷🇴', talent: '9K+', growth: '+26%', hubs: ['Bucharest', 'Cluj', 'Timisoara'] },
		{ country: 'Austria', flag: '🇦🇹', talent: '5K+', growth: '+30%', hubs: ['Vienna', 'Graz', 'Salzburg'] }
	]

	return (
		<div className="min-h-screen">
			{/* Hero Section */}
			<HeroSection>
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
					<div>
						<BrandedH1 className="mb-6">
							{t('teams.hero.title.hire', 'Hire EU')} 
							<span style={{ color: colors.primary }}> {t('teams.hero.title.techTalent', 'Tech Talent')}</span>
							{' '}{t('teams.hero.title.forGermanySwitzerland', 'for Germany & Switzerland')}
						</BrandedH1>
						
						<BrandedP size="lg" className="mb-8 max-w-2xl">
							{t('teams.hero.description', 'Access skilled EU developers, engineers, and data scientists through AI-powered matching. Save 60-80% vs recruitment agencies with transparent pay-per-CV pricing and direct candidate communication.')}
						</BrandedP>
						
						{/* Target Markets */}
						<div className="flex flex-wrap gap-3 mb-8">
							{markets.slice(0, 6).map((market) => (
								<span 
									key={market.country} 
									className="px-3 py-1 rounded-full text-sm font-medium"
									style={{
										backgroundColor: `${colors.secondary}15`,
										color: colors.secondary
									}}
								>
									{market.flag} {market.country}
								</span>
							))}
						</div>
						
						<div className="flex flex-col sm:flex-row gap-4">
							<Link to="/register/team">
								<BrandedButton 
									variant="primary" 
									className="px-8 py-4 text-lg w-full"
								>
									{t('teams.hero.cta', 'Start Hiring Tech Talent')}
									<Users className="w-5 h-5 ml-2" />
								</BrandedButton>
							</Link>
							<Link to="/login/team">
								<BrandedButton 
									variant="secondary" 
									className="px-8 py-4 text-lg w-full"
								>
									{t('teams.hero.login', 'Team Sign In')}
								</BrandedButton>
							</Link>
						</div>
					</div>
					
					{/* Hero Image */}
					<div className="relative">
						<img
							src="https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&auto=format&fit=crop&w=1374&q=80"
							alt="Tech team collaboration in European office"
							className="rounded-2xl shadow-2xl"
						/>
						{/* Floating Stats */}
						<BrandedCard variant="elevated" className="absolute -bottom-6 -left-6 p-4">
							<div className="text-2xl font-bold" style={{ color: colors.primary }}>
								50K+
							</div>
							<BrandedP variant="muted" size="sm">
								{t('teams.stats.professionals', 'Tech Professionals')}
							</BrandedP>
						</BrandedCard>
						<BrandedCard variant="elevated" className="absolute -top-6 -right-6 p-4">
							<div className="text-2xl font-bold" style={{ color: colors.secondary }}>
								60%
							</div>
							<BrandedP variant="muted" size="sm">
								{t('teams.stats.faster', 'Faster Hiring')}
							</BrandedP>
						</BrandedCard>
					</div>
				</div>
			</HeroSection>

			{/* Tech Roles Section */}
			<FeatureSection>
				<div className="text-center mb-16">
					<BrandedH2 className="mb-4">
						{t('teams.roles.title', 'Hire EU Talent for Every Tech Role')}
					</BrandedH2>
					<BrandedP size="lg" className="max-w-3xl mx-auto">
						{t('teams.roles.description', 'From junior developers to senior architects, find EU professionals ready to work in Berlin, Munich, Zurich, and other German/Swiss tech hubs.')}
					</BrandedP>
				</div>
				
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
					{techRoles.map((role, index) => (
						<BrandedCard key={index} variant="elevated" className="p-6 hover:scale-105 transition-transform">
							<div className="w-12 h-12 rounded-lg mb-4 flex items-center justify-center"
								 style={{ backgroundColor: colors.primary + '20' }}>
								<role.icon className="w-6 h-6" style={{ color: colors.primary }} />
							</div>
							
							<BrandedH3 className="mb-3">
								{role.title}
							</BrandedH3>
							
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
							
							<div className="space-y-2">
								<div className="flex items-center justify-between">
									<span className="text-sm" style={{ color: colors.text.secondary }}>
										{t('teams.roles.available', 'Available')}
									</span>
									<span className="font-semibold" style={{ color: colors.primary }}>
										{role.available}
									</span>
								</div>
								<div className="flex items-center justify-between">
									<span className="text-sm" style={{ color: colors.text.secondary }}>
										{t('teams.roles.avgSalary', 'Avg Salary')}
									</span>
									<span className="font-semibold" style={{ color: colors.success }}>
										{role.avgSalary}
									</span>
								</div>
							</div>
						</BrandedCard>
					))}
				</div>
			</FeatureSection>

			{/* Features Section */}
			<BrandedSection variant="surface">
				<div className="text-center mb-16">
					<BrandedH2 className="mb-4">
						{t('teams.features.title', 'Why German & Swiss Teams Choose TFTT')}
					</BrandedH2>
					<BrandedP size="lg" className="max-w-3xl mx-auto">
						{t('teams.features.description', 'Credit-based access to EU professionals ensures quality connections while eliminating recruitment agency fees')}
					</BrandedP>
				</div>
				
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					{features.map((feature, index) => (
						<BrandedCard key={index} variant="elevated" className="p-8">
							<div className="flex items-start space-x-4">
								<div className="w-12 h-12 rounded-lg flex items-center justify-center"
									 style={{ backgroundColor: colors.primary + '20' }}>
									<feature.icon className="w-6 h-6" style={{ color: colors.primary }} />
								</div>
								<div className="flex-1">
									<div className="flex items-center justify-between mb-3">
										<BrandedH3>{feature.title}</BrandedH3>
										<span className="text-sm font-semibold px-2 py-1 rounded"
											  style={{ 
												  backgroundColor: colors.success + '20',
												  color: colors.success 
											  }}>
											{feature.metric}
										</span>
									</div>
									<BrandedP variant="secondary">{feature.description}</BrandedP>
								</div>
							</div>
						</BrandedCard>
					))}
				</div>
			</BrandedSection>

			{/* Hiring Process Section */}
			<FeatureSection>
				<div className="text-center mb-16">
					<BrandedH2 className="mb-4">
						{t('teams.process.title', 'Simple Credit-Based Hiring Process')}
					</BrandedH2>
					<BrandedP size="lg" className="max-w-3xl mx-auto">
						{t('teams.process.description', 'From talent search to direct contact - pay only for the CVs and contacts you actually need')}
					</BrandedP>
				</div>
				
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
					{hiringProcess.map((process, index) => (
						<BrandedCard key={index} variant="elevated" className="p-6 text-center">
							<div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
								 style={{ backgroundColor: colors.primary }}>
								<process.icon className="w-8 h-8 text-white" />
							</div>
							<div className="text-sm font-semibold mb-2" 
								 style={{ color: colors.primary }}>
								{t('teams.process.step', 'STEP')} {process.step}
							</div>
							<BrandedH3 className="mb-3">{process.title}</BrandedH3>
							<BrandedP variant="secondary" size="sm">{process.description}</BrandedP>
						</BrandedCard>
					))}
				</div>
			</FeatureSection>

			{/* European Markets Section */}
			<BrandedSection variant="surface">
				<div className="text-center mb-16">
					<BrandedH2 className="mb-4">
						{t('teams.markets.title', 'Access EU Tech Talent Ready for Germany & Switzerland')}
					</BrandedH2>
					<BrandedP size="lg" className="max-w-3xl mx-auto">
						{t('teams.markets.description', 'Access skilled EU professionals through AI-powered matching and transparent pricing. Save 60-80% vs recruitment agencies with direct candidate communication.')}
					</BrandedP>
				</div>
				
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{markets.map((market, index) => (
						<BrandedCard key={index} variant="elevated" className="p-6 hover:scale-105 transition-transform">
							<div className="flex items-center justify-between mb-4">
								<div className="flex items-center space-x-3">
									<span className="text-2xl">{market.flag}</span>
									<BrandedH3>{market.country}</BrandedH3>
								</div>
								<span className="text-sm font-semibold px-2 py-1 rounded"
									  style={{ 
										  backgroundColor: colors.success + '20',
										  color: colors.success 
									  }}>
									{market.growth}
								</span>
							</div>
							<div className="space-y-3">
								<div className="flex items-center justify-between">
									<span className="text-sm" style={{ color: colors.text.secondary }}>
										{t('teams.markets.talent', 'Available Talent')}
									</span>
									<span className="font-semibold" style={{ color: colors.primary }}>
										{market.talent}
									</span>
								</div>
								<div>
									<span className="text-sm" style={{ color: colors.text.secondary }}>
										{t('teams.markets.hubs', 'Tech Hubs')}
									</span>
									<div className="flex flex-wrap gap-1 mt-1">
										{market.hubs.map((hub) => (
											<span 
												key={hub}
												className="text-xs px-2 py-1 rounded"
												style={{ 
													backgroundColor: colors.surface,
													color: colors.text.primary 
												}}
											>
												{hub}
											</span>
										))}
									</div>
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
						{t('teams.cta.title', 'Ready to Hire EU Tech Talent?')}
					</BrandedH2>
					<BrandedP size="lg" className="mb-8 max-w-2xl mx-auto" style={{ color: colors.text.secondary }}>
						{t('teams.cta.description', 'Join German and Swiss companies hiring top EU talent through direct connections. Start building your team today.')}
					</BrandedP>
					
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<Link to="/register/team">
							<BrandedButton 
								variant="primary" 
								className="px-8 py-4 text-lg"
							>
								{t('teams.cta.register', 'Start Hiring Now')}
								<ArrowRight className="w-5 h-5 ml-2" />
							</BrandedButton>
						</Link>
						<Link to="/brand-showcase">
							<BrandedButton 
								variant="outline" 
								className="px-8 py-4 text-lg"
							>
								{t('teams.cta.learn', 'View Talent Pool')}
							</BrandedButton>
						</Link>
					</div>
					
					<div className="flex items-center justify-center mt-8 space-x-8">
						<div className="flex items-center space-x-2">
							<CheckCircle className="w-5 h-5" style={{ color: colors.success }} />
							<span style={{ color: colors.text.secondary }}>{t('teams.cta.euReady', 'EU work-ready talent')}</span>
						</div>
						<div className="flex items-center space-x-2">
							<CheckCircle className="w-5 h-5" style={{ color: colors.success }} />
							<span style={{ color: colors.text.secondary }}>{t('teams.cta.payPerAccess', 'Pay per CV access')}</span>
						</div>
						<div className="flex items-center space-x-2">
							<CheckCircle className="w-5 h-5" style={{ color: colors.success }} />
							<span style={{ color: colors.text.secondary }}>{t('teams.cta.directContact', 'Direct communication')}</span>
						</div>
					</div>
				</div>
			</BrandedSection>
		</div>
	)
}

export default TeamsPage 