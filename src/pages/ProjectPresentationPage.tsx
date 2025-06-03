import { useTranslation } from 'react-i18next'
import { useBrand, useBrandColors } from '../brand'
import { useState, useEffect } from 'react'
import {
	Globe,
	Users,
	CreditCard,
	Shield,
	ArrowRight,
	ArrowLeft,
	CheckCircle,
	TrendingUp,
	MapPin,
	Clock,
	DollarSign,
	Zap,
	Brain,
	Target,
	Star,
	Award,
	Rocket,
	Code,
	Database,
	Cloud,
	FileText,
	MessageCircle,
	Play,
	Pause,
	RotateCcw,
	Maximize,
	ChevronLeft,
	ChevronRight,
	Circle,
	Dot,
	Building,
	Euro,
	Search,
	Briefcase,
	UserCheck,
	BarChart3,
	Smartphone,
	Lock,
	Sparkles
} from 'lucide-react'

interface Slide {
	id: number
	title: string
	subtitle?: string
	content: JSX.Element
	backgroundStyle?: string
}

function ProjectPresentationPage() {
	const { t } = useTranslation()
	const { isTeamsVariant } = useBrand()
	const colors = useBrandColors()
	const [currentSlide, setCurrentSlide] = useState(0)
	const [isFullscreen, setIsFullscreen] = useState(false)
	const [isAutoPlay, setIsAutoPlay] = useState(false)

	useEffect(() => {
		let interval: NodeJS.Timeout
		if (isAutoPlay) {
			interval = setInterval(() => {
				setCurrentSlide((prev) => (prev + 1) % slides.length)
			}, 8000) // 8 seconds per slide
		}
		return () => clearInterval(interval)
	}, [isAutoPlay])

	const slides: Slide[] = [
		// Slide 1: Title & Introduction
		{
			id: 1,
			title: 'Teams for the Talent (TFTT)',
			subtitle: 'AI-Powered EU Talent Matching Platform',
			content: (
				<div className="space-y-12 max-w-6xl mx-auto text-center">
					<div 
						className="w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-8"
						style={{ 
							background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
							boxShadow: `0 30px 80px ${colors.primary}40`
						}}
					>
						<Rocket className="w-16 h-16 text-white" />
					</div>
					
					<div 
						className="text-2xl max-w-4xl mx-auto leading-relaxed"
						style={{ color: colors.text.secondary }}
					>
						Connecting <span className="font-bold text-blue-600">68K+ EU tech professionals</span> with <span className="font-bold text-orange-600">German & Swiss opportunities</span>. 
						Direct talent connections with AI-powered matching - no agency fees, no complications.
					</div>

					<div className="grid grid-cols-2 md:grid-cols-4 gap-6">
						{[
							{ metric: '68K+', label: 'EU Professionals', icon: Users, color: '#478CCA' },
							{ metric: '11K+', label: 'Job Opportunities', icon: Target, color: '#F47E22' },
							{ metric: 'AI-Powered', label: 'Technology Platform', icon: Brain, color: '#478CCA' },
							{ metric: '€4-12', label: 'Cost per CV', icon: CreditCard, color: '#F47E22' }
						].map((stat, index) => (
							<div 
								key={index}
								className="text-center p-6 rounded-xl shadow-lg"
								style={{
									background: `linear-gradient(135deg, ${stat.color}15, ${stat.color}08)`,
									border: `3px solid ${stat.color}30`
								}}
							>
								<stat.icon className="w-8 h-8 mx-auto mb-3" style={{ color: stat.color }} />
								<div 
									className="text-2xl font-bold mb-1"
									style={{ color: colors.text.primary }}
								>
									{stat.metric}
								</div>
								<div 
									className="text-sm font-medium"
									style={{ color: colors.text.secondary }}
								>
									{stat.label}
								</div>
							</div>
						))}
					</div>

					<div 
						className="text-lg font-medium"
						style={{ color: colors.text.secondary }}
					>
						🚀 Revolutionary AI-powered recruitment platform leveraging EU freedom of movement
					</div>
				</div>
			),
			backgroundStyle: `linear-gradient(135deg, ${colors.background} 0%, ${colors.surface} 100%)`
		},

		// Slide 2: Problem Statement
		{
			id: 2,
			title: 'The Current Recruitment Crisis',
			subtitle: 'Traditional hiring is broken and expensive',
			content: (
				<div className="space-y-10 max-w-6xl mx-auto">
					<div className="text-center">
						<div 
							className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
							style={{ backgroundColor: '#dc262620' }}
						>
							<TrendingUp className="w-10 h-10 text-red-600" />
						</div>
						<div 
							className="text-xl mb-8"
							style={{ color: colors.text.secondary }}
						>
							The traditional recruitment industry is plagued by high costs, slow processes, and complex barriers
						</div>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						{[
							{
								title: 'Expensive Agency Fees',
								problems: [
									'€9K-€45K per hire (15-30% of salary)',
									'Hidden costs and markup fees',
									'No guarantee of successful placement'
								],
								icon: Euro,
								color: '#dc2626'
							},
							{
								title: 'Slow Hiring Process',
								problems: [
									'3-6 months average hiring time',
									'Multiple interview rounds',
									'Bureaucratic delays'
								],
								icon: Clock,
								color: '#ea580c'
							},
							{
								title: 'Complex Authorization',
								problems: [
									'Lengthy work permit processes',
									'Visa documentation requirements',
									'Legal compliance complexity'
								],
								icon: FileText,
								color: '#ca8a04'
							},
							{
								title: 'Limited Direct Access',
								problems: [
									'Agency middlemen required',
									'No direct talent communication',
									'Filtered candidate information'
								],
								icon: Shield,
								color: '#dc2626'
							}
						].map((issue, index) => (
							<div 
								key={index}
								className="p-6 rounded-xl"
								style={{
									background: `linear-gradient(135deg, ${issue.color}10, ${issue.color}05)`,
									border: `2px solid ${issue.color}30`
								}}
							>
								<div className="flex items-center mb-4">
									<div 
										className="w-10 h-10 rounded-full flex items-center justify-center mr-4"
										style={{ backgroundColor: `${issue.color}20` }}
									>
										<issue.icon className="w-5 h-5" style={{ color: issue.color }} />
									</div>
									<h3 
										className="text-lg font-bold"
										style={{ color: colors.text.primary }}
									>
										{issue.title}
									</h3>
								</div>
								<div className="space-y-2">
									{issue.problems.map((problem, idx) => (
										<div key={idx} className="flex items-center gap-2">
											<div 
												className="w-2 h-2 rounded-full"
												style={{ backgroundColor: issue.color }}
											/>
											<span 
												className="text-sm"
												style={{ color: colors.text.secondary }}
											>
												{problem}
											</span>
										</div>
									))}
								</div>
							</div>
						))}
					</div>

					<div 
						className="text-center p-6 rounded-xl"
						style={{
							background: `linear-gradient(135deg, #dc262615, #ea580c10)`,
							border: `2px solid #dc262630`
						}}
					>
						<h3 
							className="text-xl font-bold mb-2"
							style={{ color: colors.text.primary }}
						>
							💡 The Solution: TFTT Platform
						</h3>
						<p 
							className="text-lg"
							style={{ color: colors.text.secondary }}
						>
							Eliminate middlemen, reduce costs significantly, and leverage EU freedom of movement for direct hiring
						</p>
					</div>
				</div>
			)
		},

		// Slide 3: EU Talent Journey
		{
			id: 3,
			title: 'EU Talent Journey',
			subtitle: '100% Free Process for Tech Professionals',
			content: (
				<div className="space-y-10 max-w-6xl mx-auto">
					<div className="text-center">
						<div 
							className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
							style={{ backgroundColor: '#478CCA20' }}
						>
							<Users className="w-10 h-10 text-blue-600" />
						</div>
						<div 
							className="text-xl"
							style={{ color: colors.text.secondary }}
						>
							Simple 5-step process for EU tech professionals to find German & Swiss opportunities
						</div>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-5 gap-4">
						{[
							{ 
								step: '1', 
								title: 'Registration', 
								description: 'Quick signup with EU citizenship verification',
								icon: UserCheck, 
								color: '#478CCA' 
							},
							{ 
								step: '2', 
								title: 'CV Upload', 
								description: 'AI-powered parsing and skill extraction',
								icon: FileText, 
								color: '#22C2EA' 
							},
							{ 
								step: '3', 
								title: 'AI Matching', 
								description: 'OpenAI GPT-4o analyzes and scores compatibility',
								icon: Brain, 
								color: '#478CCA' 
							},
							{ 
								step: '4', 
								title: 'Employer Interest', 
								description: 'Direct contact from verified German/Swiss companies',
								icon: MessageCircle, 
								color: '#22C2EA' 
							},
							{ 
								step: '5', 
								title: 'Employment', 
								description: 'Direct hiring with EU work authorization',
								icon: Award, 
								color: '#478CCA' 
							}
						].map((step, index) => (
							<div key={index} className="text-center relative">
								<div 
									className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 relative z-10"
									style={{ 
										backgroundColor: step.color,
										boxShadow: `0 10px 30px ${step.color}40`
									}}
								>
									<step.icon className="w-8 h-8 text-white" />
								</div>
								<div 
									className="absolute top-8 left-1/2 w-full h-0.5 z-0"
									style={{ 
										backgroundColor: index < 4 ? '#e5e7eb' : 'transparent',
										transform: 'translateX(25%)',
										width: index < 4 ? '100%' : '0'
									}}
								/>
								<div 
									className="font-bold text-lg mb-2"
									style={{ color: colors.text.primary }}
								>
									{step.title}
								</div>
								<div 
									className="text-sm leading-relaxed"
									style={{ color: colors.text.secondary }}
								>
									{step.description}
								</div>
								<div 
									className="absolute -top-2 -left-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white"
									style={{ backgroundColor: step.color }}
								>
									{step.step}
								</div>
							</div>
						))}
					</div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
						{[
							{ title: 'No Fees', description: 'Completely free for all EU talent', icon: Euro },
							{ title: 'Direct Access', description: 'Skip recruitment agencies entirely', icon: Target },
							{ title: 'EU Rights', description: 'Leverage freedom of movement', icon: Globe }
						].map((benefit, index) => (
							<div 
								key={index}
								className="text-center p-6 rounded-xl"
								style={{
									background: `linear-gradient(135deg, #478CCA15, #22C2EA08)`,
									border: `2px solid #478CCA30`
								}}
							>
								<benefit.icon className="w-8 h-8 mx-auto mb-3 text-blue-600" />
								<h3 
									className="font-bold mb-2"
									style={{ color: colors.text.primary }}
								>
									{benefit.title}
								</h3>
								<p 
									className="text-sm"
									style={{ color: colors.text.secondary }}
								>
									{benefit.description}
								</p>
							</div>
						))}
					</div>
				</div>
			)
		},

		// Slide 4: Employer Hiring Process
		{
			id: 4,
			title: 'Employer Hiring Process',
			subtitle: 'Credit-based system with transparent pricing',
			content: (
				<div className="space-y-10 max-w-6xl mx-auto">
					<div className="text-center">
						<div 
							className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
							style={{ backgroundColor: '#F47E2220' }}
						>
							<Building className="w-10 h-10 text-orange-600" />
						</div>
						<div 
							className="text-xl"
							style={{ color: colors.text.secondary }}
						>
							Streamlined 4-step hiring process for German & Swiss companies
						</div>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
						{[
							{ 
								step: '1',
								title: 'Company Setup', 
								description: 'Business verification for German/Swiss companies',
								details: ['Company registration check', 'Legal entity verification', 'Authorized recruiter access'],
								icon: Shield, 
								color: '#F47E22' 
							},
							{ 
								step: '2',
								title: 'Credit Purchase', 
								description: 'Transparent pay-per-view pricing model',
								details: ['€4-12 per CV view', 'Bulk discount tiers', 'No subscription fees'],
								icon: CreditCard, 
								color: '#FACAA5' 
							},
							{ 
								step: '3',
								title: 'AI-Powered Search', 
								description: 'Smart candidate discovery and ranking',
								details: ['Advanced matching algorithms', 'Multi-criteria analysis', 'Detailed scoring reasoning'],
								icon: Search, 
								color: '#F47E22' 
							},
							{ 
								step: '4',
								title: 'Direct Hiring', 
								description: 'Instant contact with qualified candidates',
								details: ['Direct communication', 'No agency intermediary', 'EU work authorization'],
								icon: CheckCircle, 
								color: '#FACAA5' 
							}
						].map((step, index) => (
							<div 
								key={index}
								className="p-6 rounded-xl relative"
								style={{
									background: `linear-gradient(135deg, ${step.color}15, ${step.color}08)`,
									border: `3px solid ${step.color}40`
								}}
							>
								<div className="text-center mb-4">
									<div 
										className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3"
										style={{ backgroundColor: step.color }}
									>
										<step.icon className="w-6 h-6 text-white" />
									</div>
									<h3 
										className="font-bold text-lg mb-2"
										style={{ color: colors.text.primary }}
									>
										{step.title}
									</h3>
									<p 
										className="text-sm mb-4"
										style={{ color: colors.text.secondary }}
									>
										{step.description}
									</p>
								</div>
								<div className="space-y-2">
									{step.details.map((detail, idx) => (
										<div key={idx} className="flex items-center gap-2">
											<CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0" />
											<span 
												className="text-xs"
												style={{ color: colors.text.secondary }}
											>
												{detail}
											</span>
										</div>
									))}
								</div>
								<div 
									className="absolute -top-3 -left-3 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white"
									style={{ backgroundColor: step.color }}
								>
									{step.step}
								</div>
							</div>
						))}
					</div>

					<div 
						className="text-center p-8 rounded-xl"
						style={{
							background: `linear-gradient(135deg, #F47E2215, #FACAA510)`,
							border: `2px solid #F47E2240`
						}}
					>
						<h3 
							className="text-2xl font-bold mb-4"
							style={{ color: colors.text.primary }}
						>
							💰 Cost Comparison
						</h3>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
							<div>
								<h4 
									className="text-lg font-semibold mb-3"
									style={{ color: '#dc2626' }}
								>
									❌ Traditional Agencies
								</h4>
								<div className="space-y-2">
									<div>€9,000 - €45,000 per hire</div>
									<div>15-30% of annual salary</div>
									<div>3-6 months process</div>
								</div>
							</div>
							<div>
								<h4 
									className="text-lg font-semibold mb-3"
									style={{ color: '#16a34a' }}
								>
									✅ TFTT Platform
								</h4>
								<div className="space-y-2">
									<div>€4 - €12 per CV view</div>
									<div>80-95% cost reduction</div>
									<div>2-4 weeks process</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			)
		},

		// Slide 5: Technology Stack
		{
			id: 5,
			title: 'Technology Architecture',
			subtitle: 'Modern, scalable, and AI-powered infrastructure',
			content: (
				<div className="space-y-10 max-w-6xl mx-auto">
					<div className="text-center">
						<div 
							className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
							style={{ backgroundColor: '#8b5cf620' }}
						>
							<Code className="w-10 h-10 text-purple-600" />
						</div>
						<div 
							className="text-xl"
							style={{ color: colors.text.secondary }}
						>
							Enterprise-grade technology stack built for scale and security
						</div>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
						{[
							{ 
								category: 'Frontend', 
								icon: Smartphone, 
								techs: ['React 18', 'TypeScript', 'Tailwind CSS', 'Vite'],
								description: 'Modern, responsive UI with PWA capabilities',
								color: '#3b82f6' 
							},
							{ 
								category: 'Backend', 
								icon: Database, 
								techs: ['ASP.NET Core 8.0', '.NET 9.0', 'Entity Framework', 'MySQL'],
								description: 'Robust server architecture with ORM',
								color: '#059669' 
							},
							{ 
								category: 'AI & Processing', 
								icon: Brain, 
								techs: ['OpenAI GPT-4o-mini', 'C# ML algorithms', 'iTextSharp', 'DocumentFormat'],
								description: 'Advanced AI matching with document processing',
								color: '#7c3aed' 
							},
							{ 
								category: 'Infrastructure', 
								icon: Cloud, 
								techs: ['Microsoft Azure', 'App Service', 'Azure DevOps', 'Application Insights'],
								description: 'Scalable cloud infrastructure with monitoring',
								color: '#dc2626' 
							}
						].map((stack, index) => (
							<div 
								key={index}
								className="p-6 rounded-xl"
								style={{
									background: `linear-gradient(135deg, ${stack.color}15, ${stack.color}08)`,
									border: `2px solid ${stack.color}30`
								}}
							>
								<div className="text-center mb-4">
									<div 
										className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3"
										style={{ backgroundColor: stack.color }}
									>
										<stack.icon className="w-6 h-6 text-white" />
									</div>
									<h3 
										className="font-bold text-lg mb-2"
										style={{ color: colors.text.primary }}
									>
										{stack.category}
									</h3>
									<p 
										className="text-sm mb-4"
										style={{ color: colors.text.secondary }}
									>
										{stack.description}
									</p>
								</div>
								<div className="space-y-2">
									{stack.techs.map((tech, idx) => (
										<div 
											key={idx}
											className="text-xs px-3 py-2 rounded-lg text-center font-medium"
											style={{ 
												backgroundColor: `${stack.color}20`,
												color: colors.text.primary
											}}
										>
											{tech}
										</div>
									))}
								</div>
							</div>
						))}
					</div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						{[
							{
								title: 'Security & Compliance',
								features: ['GDPR Compliant', 'JWT Authentication', 'Data Encryption', 'EU Data Residency'],
								icon: Lock,
								color: '#16a34a'
							},
							{
								title: 'Performance Features',
								features: ['PWA Support', 'Real-time Updates', 'Caching Strategy', 'Mobile Optimized'],
								icon: Zap,
								color: '#f59e0b'
							},
							{
								title: 'AI Capabilities',
								features: ['CV Parsing', 'Skill Extraction', 'Match Scoring', 'Ranking Algorithms'],
								icon: Sparkles,
								color: '#8b5cf6'
							}
						].map((feature, index) => (
							<div 
								key={index}
								className="p-6 rounded-xl"
								style={{
									background: `linear-gradient(135deg, ${feature.color}15, ${feature.color}08)`,
									border: `2px solid ${feature.color}30`
								}}
							>
								<div className="flex items-center mb-4">
									<div 
										className="w-10 h-10 rounded-full flex items-center justify-center mr-3"
										style={{ backgroundColor: feature.color }}
									>
										<feature.icon className="w-5 h-5 text-white" />
									</div>
									<h3 
										className="font-bold"
										style={{ color: colors.text.primary }}
									>
										{feature.title}
									</h3>
								</div>
								<div className="space-y-2">
									{feature.features.map((item, idx) => (
										<div key={idx} className="flex items-center gap-2">
											<CheckCircle className="w-3 h-3 text-green-500" />
											<span 
												className="text-sm"
												style={{ color: colors.text.secondary }}
											>
												{item}
											</span>
										</div>
									))}
								</div>
							</div>
						))}
					</div>
				</div>
			)
		},

		// Slide 6: Market Impact & Results
		{
			id: 6,
			title: 'Market Impact & Results',
			subtitle: 'Revolutionizing EU tech recruitment',
			content: (
				<div className="space-y-10 max-w-6xl mx-auto">
					<div className="text-center">
						<div 
							className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
							style={{ backgroundColor: '#16a34a20' }}
						>
							<BarChart3 className="w-10 h-10 text-green-600" />
						</div>
						<div 
							className="text-xl"
							style={{ color: colors.text.secondary }}
						>
							Measurable impact on the European tech recruitment landscape
						</div>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						{/* Cost Savings Visualization */}
						<div className="text-center">
							<div 
								className="w-48 h-48 rounded-full flex items-center justify-center mx-auto mb-6"
								style={{ 
									background: `conic-gradient(#16a34a 0% 85%, #e5e7eb 85% 100%)`,
									position: 'relative'
								}}
							>
								<div 
									className="w-40 h-40 rounded-full flex flex-col items-center justify-center"
									style={{ backgroundColor: colors.background }}
								>
									<div 
										className="text-3xl font-bold"
										style={{ color: '#16a34a' }}
									>
										85%
									</div>
									<div 
										className="text-lg font-medium"
										style={{ color: colors.text.primary }}
									>
										Cost Reduction
									</div>
									<div 
										className="text-sm"
										style={{ color: colors.text.secondary }}
									>
										vs Traditional Agencies
									</div>
								</div>
							</div>
							<div className="grid grid-cols-2 gap-4">
								{[
									{ metric: '€75-150K', label: 'Average Salary Range' },
									{ metric: '2-4 weeks', label: 'Average Time to Hire' }
								].map((stat, index) => (
									<div key={index} className="text-center">
										<div 
											className="text-xl font-bold"
											style={{ color: colors.primary }}
										>
											{stat.metric}
										</div>
										<div 
											className="text-sm"
											style={{ color: colors.text.secondary }}
										>
											{stat.label}
										</div>
									</div>
								))}
							</div>
						</div>

						{/* Platform Statistics */}
						<div className="space-y-4">
							{[
								{ title: 'Active EU Professionals', value: 'Growing Pool', growth: 'Expanding monthly', color: '#3b82f6' },
								{ title: 'German/Swiss Companies', value: '2,500+', growth: '+40% quarterly', color: '#f59e0b' },
								{ title: 'Successful Placements', value: '1,200+', growth: '+60% yearly', color: '#16a34a' },
								{ title: 'AI Technology', value: 'Advanced', growth: 'Improving', color: '#8b5cf6' }
							].map((stat, index) => (
								<div 
									key={index}
									className="p-4 rounded-xl flex items-center justify-between"
									style={{
										background: `linear-gradient(135deg, ${stat.color}15, ${stat.color}08)`,
										border: `2px solid ${stat.color}30`
									}}
								>
									<div>
										<h4 
											className="font-semibold"
											style={{ color: colors.text.primary }}
										>
											{stat.title}
										</h4>
										<p 
											className="text-sm"
											style={{ color: colors.text.secondary }}
										>
											{stat.growth}
										</p>
									</div>
									<div 
										className="text-2xl font-bold"
										style={{ color: stat.color }}
									>
										{stat.value}
									</div>
								</div>
							))}
						</div>
					</div>

					{/* Key Benefits Summary */}
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						{[
							{
								title: 'For EU Talent',
								benefits: ['100% Free Platform', 'Direct Company Access', 'No Agency Fees', 'EU Work Rights'],
								icon: Users,
								color: '#478CCA'
							},
							{
								title: 'For Employers',
								benefits: ['Cost-Effective', 'AI-Powered Matching', 'Direct Hiring', 'Verified EU Talent'],
								icon: Building,
								color: '#F47E22'
							},
							{
								title: 'For the Market',
								benefits: ['Disrupted Agency Model', 'Transparent Pricing', 'Faster Hiring', 'EU Integration'],
								icon: Globe,
								color: '#16a34a'
							}
						].map((segment, index) => (
							<div 
								key={index}
								className="p-6 rounded-xl text-center"
								style={{
									background: `linear-gradient(135deg, ${segment.color}15, ${segment.color}08)`,
									border: `2px solid ${segment.color}30`
								}}
							>
								<div 
									className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
									style={{ backgroundColor: segment.color }}
								>
									<segment.icon className="w-6 h-6 text-white" />
								</div>
								<h3 
									className="font-bold text-lg mb-4"
									style={{ color: colors.text.primary }}
								>
									{segment.title}
								</h3>
								<div className="space-y-2">
									{segment.benefits.map((benefit, idx) => (
										<div key={idx} className="flex items-center gap-2">
											<CheckCircle className="w-4 h-4 text-green-500" />
											<span 
												className="text-sm"
												style={{ color: colors.text.secondary }}
											>
												{benefit}
											</span>
										</div>
									))}
								</div>
							</div>
						))}
					</div>
				</div>
			)
		}
	]

	const nextSlide = () => {
		setCurrentSlide((prev) => (prev + 1) % slides.length)
	}

	const prevSlide = () => {
		setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
	}

	const goToSlide = (index: number) => {
		setCurrentSlide(index)
	}

	const currentSlideData = slides[currentSlide]

	return (
		<div 
			className={`min-h-screen ${isFullscreen ? 'fixed inset-0 z-50' : ''}`}
			style={{ backgroundColor: colors.background }}
		>
			{/* Presentation Container */}
			<div className="flex flex-col h-screen">
				{/* Header Controls */}
				{!isFullscreen && (
					<div 
						className="flex items-center justify-between p-4 border-b"
						style={{ 
							backgroundColor: colors.surface,
							borderColor: colors.border 
						}}
					>
						<div className="flex items-center gap-4">
							<h1 
								className="text-xl font-bold"
								style={{ color: colors.text.primary }}
							>
								TFTT Platform Presentation
							</h1>
							<div 
								className="text-sm px-3 py-1 rounded-full"
								style={{
									backgroundColor: `${colors.primary}20`,
									color: colors.primary
								}}
							>
								Slide {currentSlide + 1} of {slides.length}
							</div>
						</div>
						<div className="flex items-center gap-2">
							<button
								onClick={() => setIsAutoPlay(!isAutoPlay)}
								className="p-2 rounded-lg border transition-colors"
								style={{
									borderColor: colors.border,
									color: isAutoPlay ? colors.primary : colors.text.secondary
								}}
								title={isAutoPlay ? 'Pause Auto-play' : 'Start Auto-play'}
							>
								{isAutoPlay ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
							</button>
							<button
								onClick={() => setCurrentSlide(0)}
								className="p-2 rounded-lg border transition-colors"
								style={{
									borderColor: colors.border,
									color: colors.text.secondary
								}}
								title="Reset to first slide"
							>
								<RotateCcw className="w-4 h-4" />
							</button>
							<button
								onClick={() => setIsFullscreen(!isFullscreen)}
								className="p-2 rounded-lg border transition-colors"
								style={{
									borderColor: colors.border,
									color: colors.text.secondary
								}}
								title="Toggle Fullscreen"
							>
								<Maximize className="w-4 h-4" />
							</button>
						</div>
					</div>
				)}

				{/* Main Slide Content */}
				<div 
					className="flex-1 relative overflow-auto"
					style={{
						background: currentSlideData.backgroundStyle || colors.background
					}}
				>
					<div className="h-full flex flex-col min-h-0">
						{/* Slide Header */}
						<div className="text-center py-6 px-8 flex-shrink-0">
							<h1 
								className="text-3xl lg:text-4xl font-bold mb-3 font-brand"
								style={{ color: colors.text.primary }}
							>
								{currentSlideData.title}
							</h1>
							{currentSlideData.subtitle && (
								<p 
									className="text-lg lg:text-xl"
									style={{ color: colors.text.secondary }}
								>
									{currentSlideData.subtitle}
								</p>
							)}
						</div>

						{/* Slide Content - Scrollable */}
						<div className="flex-1 overflow-auto px-4 pb-8">
							<div className="max-w-6xl mx-auto">
								{currentSlideData.content}
							</div>
						</div>
					</div>

					{/* Navigation Arrows */}
					{slides.length > 1 && (
						<>
							<button
								onClick={prevSlide}
								className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full transition-all duration-300 hover:scale-110"
								style={{
									backgroundColor: `${colors.primary}90`,
									color: 'white'
								}}
								title="Previous slide"
							>
								<ChevronLeft className="w-6 h-6" />
							</button>
							<button
								onClick={nextSlide}
								className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full transition-all duration-300 hover:scale-110"
								style={{
									backgroundColor: `${colors.primary}90`,
									color: 'white'
								}}
								title="Next slide"
							>
								<ChevronRight className="w-6 h-6" />
							</button>
						</>
					)}
				</div>

				{/* Bottom Navigation */}
				<div 
					className="flex items-center justify-between p-4 border-t"
					style={{ 
						backgroundColor: colors.surface,
						borderColor: colors.border 
					}}
				>
					{/* Slide Indicators */}
					<div className="flex items-center gap-2">
						{slides.map((_, index) => (
							<button
								key={index}
								onClick={() => goToSlide(index)}
								className="transition-all duration-300"
								title={`Go to slide ${index + 1}`}
							>
								{index === currentSlide ? (
									<Dot 
										className="w-4 h-4" 
										style={{ color: colors.primary }} 
									/>
								) : (
									<Circle 
										className="w-3 h-3" 
										style={{ color: colors.text.secondary }} 
									/>
								)}
							</button>
						))}
					</div>

					{/* Navigation Buttons */}
					<div className="flex items-center gap-4">
						<button
							onClick={prevSlide}
							disabled={currentSlide === 0}
							className="flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors disabled:opacity-50"
							style={{
								borderColor: colors.border,
								color: colors.text.secondary
							}}
						>
							<ArrowLeft className="w-4 h-4" />
							Previous
						</button>
						<div 
							className="px-4 py-2 rounded-lg font-medium"
							style={{
								backgroundColor: `${colors.primary}20`,
								color: colors.primary
							}}
						>
							{currentSlide + 1} / {slides.length}
						</div>
						<button
							onClick={nextSlide}
							disabled={currentSlide === slides.length - 1}
							className="flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors disabled:opacity-50"
							style={{
								borderColor: colors.border,
								color: colors.text.secondary
							}}
						>
							Next
							<ArrowRight className="w-4 h-4" />
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ProjectPresentationPage 