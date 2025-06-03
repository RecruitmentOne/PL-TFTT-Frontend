import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useState, useEffect, useRef } from 'react'
import { 
	BrandedH2, 
	BrandedH3, 
	BrandedP, 
	BrandedSpan,
	FeatureCard, 
	FeatureSection,
	BrandedButton 
} from '../brand'
import { useBrand, useBrandColors } from '../../brand'
import {
	Brain,
	Zap,
	BarChart3,
	DollarSign,
	Shield,
	Users,
	Code,
	Layers,
	Sparkles,
	ArrowRight,
	TrendingUp,
	Globe,
	Cpu,
	Database,
	Cloud,
	Terminal,
	GitBranch,
	Lock
} from 'lucide-react'

interface FloatingElement {
	id: number
	x: number
	y: number
	size: number
	speed: number
	direction: number
}

function FeaturesSection() {
	const { t } = useTranslation()
	const { isTeamsVariant } = useBrand()
	const colors = useBrandColors()
	const sectionRef = useRef<HTMLDivElement>(null)
	
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
	const [activeCard, setActiveCard] = useState<number | null>(null)
	const [scrollY, setScrollY] = useState(0)
	const [floatingElements, setFloatingElements] = useState<FloatingElement[]>([])
	const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set())

	// Initialize floating elements
	useEffect(() => {
		const elements: FloatingElement[] = Array.from({ length: 15 }, (_, i) => ({
			id: i,
			x: Math.random() * window.innerWidth,
			y: Math.random() * window.innerHeight,
			size: Math.random() * 8 + 4,
			speed: Math.random() * 0.5 + 0.1,
			direction: Math.random() * Math.PI * 2
		}))
		setFloatingElements(elements)
	}, [])

	// Mouse tracking for magnetic effects
	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			setMousePosition({ x: e.clientX, y: e.clientY })
		}
		window.addEventListener('mousemove', handleMouseMove)
		return () => window.removeEventListener('mousemove', handleMouseMove)
	}, [])

	// Scroll tracking for parallax
	useEffect(() => {
		const handleScroll = () => setScrollY(window.scrollY)
		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	// Intersection observer for card animations
	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						const index = parseInt(entry.target.getAttribute('data-index') || '0')
						setVisibleCards(prev => new Set([...prev, index]))
					}
				})
			},
			{ threshold: 0.1 }
		)

		const cards = document.querySelectorAll('[data-index]')
		cards.forEach(card => observer.observe(card))

		return () => observer.disconnect()
	}, [])

	const features = [
		{
			icon: Brain,
			title: t('features.aiParsing.title', 'AI-Powered CV Analysis'),
			description: t('features.aiParsing.description', 'AI extracts skills, programming languages, experience levels, and project details from CVs with advanced technology. Supports all major file formats and automatically identifies programming languages, frameworks, and tools.'),
			badge: t('features.aiParsing.badge', 'AI-POWERED'),
			image: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
			stats: t('features.aiParsing.stats', 'AI-Enhanced'),
			color: colors.primary,
			gradient: 'from-blue-500 to-purple-600'
		},
		{
			icon: DollarSign,
			title: t('features.pricing.title', 'Transparent Cost Savings'),
			description: t('features.pricing.description', 'Save 60-80% vs traditional recruitment agencies with transparent pay-per-CV pricing. No hidden fees, no long-term contracts. Scale your hiring budget efficiently with volume discounts.'),
			badge: t('features.pricing.badge', 'COST-EFFECTIVE'),
			image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
			stats: t('features.pricing.stats', '60-80% savings'),
			color: colors.secondary,
			gradient: 'from-green-500 to-teal-600'
		},
		{
			icon: Zap,
			title: t('features.techMatching.title', 'Intelligent Matching Engine'),
			description: t('features.techMatching.description', 'Machine learning algorithms match candidates to job requirements based on technical skills, experience levels, and career progression. Optimized for modern tech stacks including React, Python, Kubernetes, and cloud technologies.'),
			badge: t('features.techMatching.badge', 'SMART MATCHING'),
			image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
			stats: t('features.techMatching.stats', 'Smart Algorithms'),
			color: colors.primary,
			gradient: 'from-orange-500 to-red-600'
		},
		{
			icon: Users,
			title: t('features.directCommunication.title', 'Direct Employer Access'),
			description: t('features.directCommunication.description', 'Eliminate recruitment agency middlemen with direct communication between employers and candidates. Mutual interest confirmation ensures quality connections and faster hiring processes.'),
			badge: t('features.directCommunication.badge', 'NO MIDDLEMAN'),
			image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
			stats: t('features.directCommunication.stats', 'streamlined hiring'),
			color: colors.secondary,
			gradient: 'from-teal-500 to-blue-600'
		},
		{
			icon: BarChart3,
			title: t('features.analytics.title', 'Market Intelligence'),
			description: t('features.analytics.description', 'Real-time salary benchmarks, skill demand analytics, and hiring trends across German and Swiss tech markets. Make data-driven hiring decisions with comprehensive market insights.'),
			badge: t('features.analytics.badge', 'DATA-DRIVEN'),
			image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
			stats: t('features.analytics.stats', 'Live market data'),
			color: colors.primary,
			gradient: 'from-purple-500 to-indigo-600'
		},
		{
			icon: Shield,
			title: t('features.gdpr.title', 'Enterprise Security'),
			description: t('features.gdpr.description', 'Full GDPR compliance with enterprise-grade security infrastructure. Secure data handling, encrypted communications, and comprehensive audit trails for all recruitment activities.'),
			badge: t('features.gdpr.badge', 'GDPR COMPLIANT'),
			image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
			stats: t('features.gdpr.stats', '100% compliant'),
			color: colors.secondary,
			gradient: 'from-indigo-500 to-purple-600'
		}
	]

	const techStacks = [
		{ name: 'React', color: colors.secondary, icon: Code, trending: true },
		{ name: 'Python', color: colors.primary, icon: Terminal, trending: true },
		{ name: 'Node.js', color: colors.secondary, icon: Layers, trending: false },
		{ name: 'Kubernetes', color: colors.primary, icon: Cloud, trending: true },
		{ name: 'AWS', color: colors.secondary, icon: Database, trending: false },
		{ name: 'Docker', color: colors.primary, icon: Cpu, trending: true },
		{ name: 'TypeScript', color: colors.secondary, icon: GitBranch, trending: true },
		{ name: 'Go', color: colors.primary, icon: Lock, trending: false }
	]

	const getBadgeStyle = (badge: string, featureColor: string) => {
		const baseStyle = {
			padding: '0.5rem 1rem',
			fontSize: '0.75rem',
			fontWeight: '700',
			borderRadius: '9999px',
			textTransform: 'uppercase' as const,
			background: `linear-gradient(135deg, ${featureColor}25, ${featureColor}15)`,
			border: `1px solid ${featureColor}40`,
			backdropFilter: 'blur(10px)',
			boxShadow: `0 4px 15px ${featureColor}20`
		}

		return { ...baseStyle, color: featureColor }
	}

	return (
		<FeatureSection id="features" className="relative overflow-hidden">
			{/* Enhanced Background with Morphing Shapes */}
			<div className="absolute inset-0">
				{/* Gradient background */}
				<div 
					className="absolute inset-0"
					style={{
						background: `
							radial-gradient(circle at 20% 80%, ${colors.primary}15 0%, transparent 50%),
							radial-gradient(circle at 80% 20%, ${colors.secondary}15 0%, transparent 50%),
							radial-gradient(circle at 40% 40%, ${colors.primary}08 0%, transparent 50%),
							linear-gradient(135deg, ${colors.background} 0%, ${colors.surface}50 50%, ${colors.background} 100%)
						`
					}}
				/>
				
				{/* Animated SVG Background */}
				<svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 1000 1000">
					<defs>
						<radialGradient id="featureGradient1">
							<stop offset="0%" stopColor={colors.primary} stopOpacity="0.4" />
							<stop offset="100%" stopColor={colors.secondary} stopOpacity="0.1" />
						</radialGradient>
						<radialGradient id="featureGradient2">
							<stop offset="0%" stopColor={colors.secondary} stopOpacity="0.4" />
							<stop offset="100%" stopColor={colors.primary} stopOpacity="0.1" />
						</radialGradient>
					</defs>
					
					{/* Morphing shapes */}
					<circle 
						cx="150" 
						cy="200" 
						r="80" 
						fill="url(#featureGradient1)"
						style={{ 
							animation: 'morphFloat 12s ease-in-out infinite',
							transformOrigin: 'center'
						}}
					/>
					<ellipse 
						cx="850" 
						cy="300" 
						rx="60" 
						ry="120" 
						fill="url(#featureGradient2)"
						style={{
							animation: 'morphFloat 8s ease-in-out infinite reverse',
							transformOrigin: 'center'
						}}
					/>
					<polygon
						points="700,600 800,500 900,600 800,700"
						fill="url(#featureGradient1)"
						style={{
							animation: 'morphRotate 15s linear infinite',
							transformOrigin: 'center'
						}}
					/>
					<path
						d="M100,800 Q200,700 300,800 T500,800"
						stroke={colors.primary}
						strokeWidth="2"
						fill="none"
						opacity="0.3"
						style={{
							animation: 'pathFloat 10s ease-in-out infinite'
						}}
					/>
				</svg>
				
				{/* Floating particles */}
				{floatingElements.map((element) => (
					<div
						key={element.id}
						className="absolute rounded-full opacity-20 animate-pulse"
						style={{
							left: element.x + Math.sin(Date.now() * 0.001 + element.id) * 50,
							top: element.y + Math.cos(Date.now() * 0.001 + element.id) * 30,
							width: element.size,
							height: element.size,
							backgroundColor: element.id % 2 === 0 ? colors.primary : colors.secondary,
							animationDelay: `${element.id * 0.2}s`,
							filter: `blur(${element.size * 0.1}px)`,
							boxShadow: `0 0 ${element.size * 2}px ${element.id % 2 === 0 ? colors.primary : colors.secondary}40`
						}}
					/>
				))}
			</div>

			{/* Enhanced Section Header with Creative Typography */}
			<div className="relative z-10 text-center mb-20">
				{/* Floating badge with magnetic effect */}
				<div 
					className="inline-flex items-center px-6 py-3 rounded-full text-sm font-bold mb-6 relative group magnetic-element"
					style={{
						background: `linear-gradient(135deg, ${colors.primary}20, ${colors.secondary}15)`,
						border: `2px solid ${colors.primary}30`,
						color: colors.primary,
						backdropFilter: 'blur(10px)',
						boxShadow: `0 8px 25px ${colors.primary}20`,
						transform: `translate(${(mousePosition.x - window.innerWidth/2) * 0.02}px, ${(mousePosition.y - window.innerHeight/2) * 0.02}px)`
					}}
				>
					<Sparkles className="w-5 h-5 mr-2 animate-spin" style={{ animationDuration: '3s' }} />
					{t('features.badge', 'AI-Powered Tech Platform')}
					<div className="absolute inset-0 rounded-full border-2 border-dashed animate-spin opacity-30"
						style={{ borderColor: colors.primary, animationDuration: '4s' }}></div>
					{/* Orbiting particles */}
					<div className="absolute -top-2 -right-2 w-3 h-3 rounded-full animate-ping"
						style={{ backgroundColor: colors.secondary, animationDelay: '0.5s' }}></div>
					<div className="absolute -bottom-1 -left-1 w-2 h-2 rounded-full animate-pulse"
						style={{ backgroundColor: colors.primary, animationDelay: '1s' }}></div>
				</div>
				
				{/* Enhanced heading with gradient animation */}
				<BrandedH2 className="mb-6 relative">
					<span className="block text-5xl lg:text-6xl font-black bg-gradient-to-r bg-clip-text text-transparent relative z-10"
						style={{
							backgroundImage: `linear-gradient(45deg, ${colors.primary}, ${colors.secondary}, ${colors.primary})`,
							backgroundSize: '200% auto',
							animation: 'gradientShift 4s ease-in-out infinite'
						}}>
						{t('features.title', 'Built for European Tech Recruitment')}
					</span>
					{/* Background text effect */}
					<div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-4 text-8xl lg:text-9xl font-black opacity-5 pointer-events-none select-none whitespace-nowrap z-0"
						style={{ color: colors.primary }}>
						FEATURES
					</div>
				</BrandedH2>
				
				<BrandedP className="text-xl lg:text-2xl max-w-4xl mx-auto leading-relaxed" style={{ color: colors.text.secondary }}>
					{t('features.subtitle', 'Advanced AI technology meets European tech talent. OpenAI-powered CV parsing, intelligent tech stack matching, and real-time analytics for Germany, Switzerland, and EU markets.')}
				</BrandedP>
				
				{/* Floating decorative elements */}
				<div className="absolute -top-10 left-1/4 w-6 h-6 rounded-full animate-float"
					style={{ 
						background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
						animationDelay: '1s',
						boxShadow: `0 4px 15px ${colors.primary}30`
					}}></div>
				<div className="absolute -top-5 right-1/3 w-4 h-4 rounded-full animate-float"
					style={{ 
						background: `linear-gradient(135deg, ${colors.secondary}, ${colors.primary})`,
						animationDelay: '2s',
						boxShadow: `0 3px 12px ${colors.secondary}30`
					}}></div>
			</div>

			{/* Enhanced 3D Interactive Features Grid */}
			<div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
				{features.map((feature, index) => {
					const IconComponent = feature.icon
					const isVisible = visibleCards.has(index)
					
					return (
						<div
							key={index}
							data-index={index}
							className={`group relative magnetic-element transition-all duration-700 ${
								isVisible ? 'animate-in slide-in-from-bottom-4' : 'opacity-0 translate-y-8'
							}`}
							style={{ animationDelay: `${index * 0.15}s` }}
							onMouseEnter={() => setActiveCard(index)}
							onMouseLeave={() => setActiveCard(null)}
						>
							{/* 3D Card Container with Perspective */}
							<div 
								className="relative overflow-hidden rounded-2xl transition-all duration-500 cursor-pointer"
								style={{
									background: `linear-gradient(135deg, ${feature.color}08, ${feature.color}03)`,
									border: `1px solid ${feature.color}20`,
									boxShadow: activeCard === index 
										? `0 25px 50px ${feature.color}30, 0 0 0 1px ${feature.color}40` 
										: `0 10px 25px ${feature.color}15`,
									transform: activeCard === index 
										? 'perspective(1000px) rotateX(5deg) rotateY(5deg) scale(1.05) translateZ(50px)' 
										: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1) translateZ(0px)',
									transformStyle: 'preserve-3d'
								}}
							>
								{/* Holographic scan effect */}
								<div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
									style={{
										background: `linear-gradient(45deg, transparent 30%, ${feature.color}20 50%, transparent 70%)`,
										animation: activeCard === index ? 'scanLine 2s ease-in-out infinite' : 'none'
									}}></div>

								{/* Enhanced Feature Image with Parallax */}
								<div className="relative h-52 overflow-hidden">
									<img
										src={feature.image}
										alt={feature.title}
										className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
										style={{
											transform: activeCard === index ? 'scale(1.1) translateZ(20px)' : 'scale(1) translateZ(0px)',
											filter: activeCard === index ? 'brightness(1.1) contrast(1.1)' : 'brightness(1) contrast(1)'
										}}
									/>
									
									{/* Gradient overlay */}
									<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
									
									{/* Floating particles overlay */}
									<div className="absolute inset-0 pointer-events-none">
										{activeCard === index && (
											<div className="absolute top-4 right-4 w-3 h-3 rounded-full animate-ping"
												style={{ 
													backgroundColor: feature.color,
													animationDelay: '0.5s'
												}}></div>
										)}
									</div>
									
									{/* Enhanced badge */}
									<div className="absolute top-4 left-4">
										<span 
											className="backdrop-blur-md"
											style={getBadgeStyle(feature.badge, feature.color)}
										>
											{feature.badge}
										</span>
									</div>
									
									{/* 3D Icon */}
									<div 
										className="absolute bottom-4 left-4 w-14 h-14 backdrop-blur-md rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-all duration-300"
										style={{ 
											background: `linear-gradient(135deg, ${feature.color}80, ${feature.color}60)`,
											boxShadow: `0 8px 25px ${feature.color}40`,
											transform: activeCard === index ? 'perspective(500px) rotateX(15deg) translateZ(30px)' : 'perspective(500px) rotateX(0deg) translateZ(0px)'
										}}
									>
										<IconComponent className="w-7 h-7 group-hover:rotate-12 transition-transform" />
										{/* Orbiting ring */}
										<div className="absolute inset-0 rounded-xl border-2 border-dashed animate-spin border-white/30" style={{ animationDuration: '4s' }}></div>
									</div>
									
									{/* Enhanced stats */}
									<div className="absolute bottom-4 right-4">
										<BrandedSpan 
											className="backdrop-blur-md px-3 py-2 rounded-lg text-sm font-bold flex items-center gap-2"
											style={{ 
												background: `linear-gradient(135deg, ${colors.background}90, ${colors.background}70)`, 
												color: feature.color,
												boxShadow: `0 4px 15px ${feature.color}20`,
												border: `1px solid ${feature.color}30`
											}}
										>
											<TrendingUp className="w-4 h-4" />
											{feature.stats}
										</BrandedSpan>
									</div>
								</div>
								
								{/* Enhanced Feature Content */}
								<div className="p-6 relative z-10">
									<BrandedH3 
										className="mb-3 text-xl font-bold transition-all duration-300"
										style={{ 
											color: activeCard === index ? feature.color : colors.text.primary,
											textShadow: activeCard === index ? `0 0 20px ${feature.color}30` : 'none'
										}}
									>
										{feature.title}
									</BrandedH3>
									<BrandedP 
										className="leading-relaxed"
										style={{ color: colors.text.secondary }}
									>
										{feature.description}
									</BrandedP>
									
									{/* Interactive hover elements */}
									<div className={`mt-4 flex items-center gap-2 transition-all duration-300 ${
										activeCard === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
									}`}>
										<div className="flex-1 h-1 rounded-full overflow-hidden" style={{ backgroundColor: `${feature.color}20` }}>
											<div 
												className="h-full rounded-full transition-all duration-1000"
												style={{ 
													backgroundColor: feature.color,
													width: activeCard === index ? '100%' : '0%'
												}}
											></div>
										</div>
										<ArrowRight 
											className="w-5 h-5 transition-transform group-hover:translate-x-1" 
											style={{ color: feature.color }}
										/>
									</div>
								</div>
								
								{/* 3D border effect */}
								<div className="absolute inset-0 rounded-2xl border-2 border-dashed opacity-0 group-hover:opacity-30 transition-opacity duration-300"
									style={{ borderColor: feature.color }}></div>
							</div>
							
							{/* Floating decorative elements */}
							<div className="absolute -top-2 -right-2 w-5 h-5 rounded-full animate-ping"
								style={{ 
									backgroundColor: feature.color,
									opacity: activeCard === index ? 1 : 0,
									animationDelay: '0.5s'
								}}></div>
							<div className="absolute -bottom-1 -left-1 w-3 h-3 rounded-full animate-pulse"
								style={{ 
									backgroundColor: feature.color,
									opacity: activeCard === index ? 0.6 : 0,
									animationDelay: '1s'
								}}></div>
						</div>
					)
				})}
			</div>

			{/* Enhanced Animated Tech Stack Showcase */}
			<div className="relative z-10 mb-20">
				<div 
					className="rounded-3xl p-8 lg:p-12 shadow-2xl relative overflow-hidden"
					style={{ 
						background: `linear-gradient(135deg, ${colors.surface}F0, ${colors.background}E0)`,
						border: `1px solid ${colors.border}30`,
						backdropFilter: 'blur(20px)'
					}}
				>
					{/* Animated background pattern */}
					<div className="absolute inset-0 opacity-5" 
						style={{
							backgroundImage: `radial-gradient(circle at 25% 25%, ${colors.primary}40 0%, transparent 50%), radial-gradient(circle at 75% 75%, ${colors.secondary}40 0%, transparent 50%)`,
							animation: 'backgroundMove 8s ease-in-out infinite'
						}}></div>
					
					{/* Floating decorative elements */}
					<div className="absolute top-6 right-6 w-4 h-4 rounded-full animate-pulse"
						style={{ backgroundColor: colors.primary, animationDelay: '1s' }}></div>
					<div className="absolute bottom-6 left-6 w-3 h-3 rounded-full animate-bounce"
						style={{ backgroundColor: colors.secondary, animationDelay: '2s' }}></div>
					
					<div className="relative z-10 text-center mb-10">
						<BrandedH3 className="mb-4 text-3xl lg:text-4xl font-bold">
							<span className="bg-gradient-to-r bg-clip-text text-transparent"
								style={{
									backgroundImage: `linear-gradient(45deg, ${colors.primary}, ${colors.secondary})`
								}}>
								{t('features.techStacks.title', 'Supported Tech Stacks')}
							</span>
						</BrandedH3>
						<BrandedP className="text-lg" style={{ color: colors.text.secondary }}>
							{t('features.techStacks.subtitle', 'Our AI understands and matches across all major technologies')}
						</BrandedP>
					</div>
					
					{/* Enhanced Tech Stack Grid with 3D Effects */}
					<div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 relative z-10">
						{techStacks.map((tech, index) => {
							const TechIcon = tech.icon
							return (
								<div 
									key={index} 
									className="group relative overflow-hidden rounded-xl transition-all duration-500 cursor-pointer magnetic-element"
									style={{
										background: `linear-gradient(135deg, ${tech.color}15, ${tech.color}08)`,
										border: `1px solid ${tech.color}30`,
										padding: '1rem',
										boxShadow: `0 4px 15px ${tech.color}10`,
										transform: `perspective(800px) rotateX(${Math.sin(Date.now() * 0.001 + index) * 3}deg)`,
										animationDelay: `${index * 0.1}s`
									}}
									onMouseEnter={(e) => {
										e.currentTarget.style.transform = 'perspective(800px) rotateX(10deg) rotateY(5deg) scale(1.05) translateZ(20px)'
										e.currentTarget.style.boxShadow = `0 15px 40px ${tech.color}25`
									}}
									onMouseLeave={(e) => {
										e.currentTarget.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale(1) translateZ(0px)'
										e.currentTarget.style.boxShadow = `0 4px 15px ${tech.color}10`
									}}
								>
									{/* Trending indicator */}
									{tech.trending && (
										<div className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs animate-pulse"
											style={{ 
												background: `linear-gradient(135deg, ${colors.success}, ${colors.success}CC)`,
												color: 'white',
												boxShadow: `0 4px 15px ${colors.success}40`
											}}>
											🔥
										</div>
									)}
									
									{/* Holographic scan effect */}
									<div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"
										style={{
											background: `linear-gradient(45deg, transparent 30%, ${tech.color}30 50%, transparent 70%)`,
											animation: 'scanLine 3s ease-in-out infinite'
										}}></div>
									
									{/* Icon and content */}
									<div className="relative z-10 text-center">
										<div className="mb-3 flex justify-center">
											<div 
												className="w-12 h-12 rounded-lg flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-300"
												style={{ 
													background: `linear-gradient(135deg, ${tech.color}40, ${tech.color}60)`,
													boxShadow: `0 4px 15px ${tech.color}30`
												}}
											>
												<TechIcon className="w-6 h-6 text-white" />
											</div>
										</div>
										<div 
											className="font-bold text-sm group-hover:text-shadow transition-all duration-300"
											style={{ 
												color: tech.color,
												textShadow: `0 0 10px ${tech.color}50`
											}}
										>
											{tech.name}
										</div>
									</div>
									
									{/* Orbiting particles */}
									<div className="absolute inset-0 pointer-events-none">
										<div className="absolute top-2 right-2 w-1 h-1 rounded-full animate-ping opacity-60"
											style={{ backgroundColor: tech.color, animationDelay: '0.5s' }}></div>
										<div className="absolute bottom-2 left-2 w-1 h-1 rounded-full animate-pulse opacity-40"
											style={{ backgroundColor: tech.color, animationDelay: '1s' }}></div>
									</div>
								</div>
							)
						})}
					</div>
					
					{/* Floating tech particles */}
					<div className="absolute inset-0 overflow-hidden pointer-events-none">
						{Array.from({ length: 8 }).map((_, i) => (
							<div
								key={i}
								className="absolute w-2 h-2 rounded-full opacity-30 animate-float"
								style={{
									left: `${20 + (i * 10)}%`,
									top: `${30 + (i % 3) * 20}%`,
									backgroundColor: i % 2 === 0 ? colors.primary : colors.secondary,
									animationDelay: `${i * 0.5}s`,
									animationDuration: `${3 + (i % 2)}s`
								}}
							/>
						))}
					</div>
				</div>
			</div>

			{/* Enhanced Bottom CTA with 3D Effects */}
			<div className="relative z-10">
				<div 
					className="rounded-3xl p-8 lg:p-12 text-center relative overflow-hidden"
					style={{
						background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
						boxShadow: `0 25px 50px ${colors.primary}30`
					}}
				>
					{/* Animated background elements */}
					<div className="absolute inset-0 overflow-hidden">
						{/* Floating orbs */}
						{Array.from({ length: 6 }).map((_, i) => (
							<div
								key={i}
								className="absolute rounded-full opacity-20 animate-float"
								style={{
									width: `${60 + (i * 20)}px`,
									height: `${60 + (i * 20)}px`,
									left: `${10 + (i * 15)}%`,
									top: `${20 + (i % 2) * 40}%`,
									background: `radial-gradient(circle, ${colors.text.inverse}40, transparent)`,
									animationDelay: `${i * 0.8}s`,
									animationDuration: `${4 + (i % 2)}s`
								}}
							/>
						))}
						
						{/* Scan lines */}
						<div className="absolute inset-0 opacity-10" 
							style={{
								background: `repeating-linear-gradient(90deg, transparent, transparent 2px, ${colors.text.inverse} 2px, ${colors.text.inverse} 4px)`,
								animation: 'scanLine 4s linear infinite'
							}}></div>
					</div>
					
					<div className="relative z-10">
						<BrandedH3 className="mb-6 text-4xl lg:text-5xl font-black" variant="inverse">
							<span className="bg-gradient-to-r bg-clip-text"
								style={{
									backgroundImage: `linear-gradient(45deg, ${colors.text.inverse}, ${colors.text.inverse}CC, ${colors.text.inverse})`,
									backgroundSize: '200% auto',
									animation: 'gradientShift 3s ease-in-out infinite'
								}}>
								{t('features.cta.title', 'Ready to Transform Your Tech Recruitment?')}
							</span>
						</BrandedH3>
						<BrandedP 
							className="mb-8 max-w-3xl mx-auto text-lg lg:text-xl leading-relaxed" 
							variant="inverse"
							style={{ color: `${colors.text.inverse}90` }}
						>
							{t('features.cta.subtitle', 'Join 5,000+ European tech companies and 50,000+ developers using our AI-powered platform')}
						</BrandedP>
						
						{/* Enhanced CTA Buttons */}
						<div className="flex flex-col sm:flex-row gap-6 justify-center">
							<Link
								to="/register/talent"
								className="group inline-flex items-center justify-center px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 relative overflow-hidden magnetic-element"
								style={{
									backgroundColor: colors.text.inverse,
									color: colors.primary,
									boxShadow: `0 10px 25px ${colors.text.inverse}30`,
									transform: 'perspective(1000px) rotateX(0deg) translateZ(0px)'
								}}
								onMouseEnter={(e) => {
									e.currentTarget.style.transform = 'perspective(1000px) rotateX(-10deg) translateY(-5px) scale(1.05) translateZ(20px)'
									e.currentTarget.style.boxShadow = `0 20px 40px ${colors.text.inverse}40`
								}}
								onMouseLeave={(e) => {
									e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) translateY(0) scale(1) translateZ(0px)'
									e.currentTarget.style.boxShadow = `0 10px 25px ${colors.text.inverse}30`
								}}
							>
								<Users className="w-6 h-6 mr-3 group-hover:animate-bounce" />
								{t('features.cta.joinTalent', 'Join as Tech Talent')}
								<ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform" />
								{/* Holographic border */}
								<div className="absolute inset-0 rounded-xl border-2 border-white/20 group-hover:border-white/40 transition-colors duration-300"></div>
								{/* Ripple effect */}
								<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
							</Link>
							
							<Link
								to="/register/team"
								className="group inline-flex items-center justify-center px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 border-2 relative overflow-hidden backdrop-blur-sm magnetic-element"
								style={{
									borderColor: colors.text.inverse,
									color: colors.text.inverse,
									backgroundColor: 'transparent',
									boxShadow: `0 10px 25px ${colors.text.inverse}20`,
									transform: 'perspective(1000px) rotateX(0deg) translateZ(0px)'
								}}
								onMouseEnter={(e) => {
									e.currentTarget.style.backgroundColor = colors.text.inverse
									e.currentTarget.style.color = colors.primary
									e.currentTarget.style.transform = 'perspective(1000px) rotateX(10deg) translateY(-3px) scale(1.05) translateZ(20px)'
									e.currentTarget.style.boxShadow = `0 15px 35px ${colors.text.inverse}30`
								}}
								onMouseLeave={(e) => {
									e.currentTarget.style.backgroundColor = 'transparent'
									e.currentTarget.style.color = colors.text.inverse
									e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) translateY(0) scale(1) translateZ(0px)'
									e.currentTarget.style.boxShadow = `0 10px 25px ${colors.text.inverse}20`
								}}
							>
								<Globe className="w-6 h-6 mr-3 group-hover:animate-pulse" />
								{t('features.cta.hireTeam', 'Hire Tech Talent')}
								{/* Floating particles */}
								<div className="absolute top-1 right-1 w-2 h-2 rounded-full animate-ping"
									style={{ backgroundColor: colors.text.inverse, animationDelay: '1s' }}></div>
								{/* Holographic glow */}
								<div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
									style={{ 
										background: `linear-gradient(45deg, ${colors.text.inverse}20, transparent, ${colors.text.inverse}20)`,
										filter: 'blur(1px)'
									}}></div>
							</Link>
						</div>
					</div>
				</div>
			</div>

			{/* Enhanced Custom Animations */}
			<style dangerouslySetInnerHTML={{
				__html: `
					@keyframes gradientShift {
						0%, 100% { background-position: 0% 50%; }
						50% { background-position: 100% 50%; }
					}
					@keyframes morphFloat {
						0%, 100% { transform: scale(1) rotate(0deg); }
						33% { transform: scale(1.1) rotate(120deg); }
						66% { transform: scale(0.9) rotate(240deg); }
					}
					@keyframes morphRotate {
						0%, 100% { transform: rotate(0deg) scale(1); }
						25% { transform: rotate(90deg) scale(1.1); }
						50% { transform: rotate(180deg) scale(0.9); }
						75% { transform: rotate(270deg) scale(1.05); }
					}
					@keyframes pathFloat {
						0%, 100% { d: path('M100,800 Q200,700 300,800 T500,800'); }
						50% { d: path('M100,820 Q200,680 300,820 T500,820'); }
					}
					@keyframes scanLine {
						0% { transform: translateX(-100%); }
						100% { transform: translateX(100%); }
					}
					@keyframes backgroundMove {
						0%, 100% { transform: translateX(0) translateY(0); }
						50% { transform: translateX(20px) translateY(-10px); }
					}
					@keyframes animate-float {
						0%, 100% { transform: translateY(0px); }
						50% { transform: translateY(-15px); }
					}
					.animate-float {
						animation: animate-float 3s ease-in-out infinite;
					}
					.magnetic-element {
						transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
					}
					.magnetic-element:hover {
						transform: scale(1.02) !important;
					}
				`
			}} />
		</FeatureSection>
	)
}

export default FeaturesSection 