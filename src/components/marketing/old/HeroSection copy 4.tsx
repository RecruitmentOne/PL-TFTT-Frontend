import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useBrand, useBrandColors } from '../../../brand'
import { BrandedH1, BrandedP, BrandedSpan, BrandedSection } from '../../brand'
import { useState, useEffect } from 'react'
import { 
	ArrowRight, 
	Users, 
	TrendingUp, 
	Shield,
	Brain,
	Zap,
	Globe,
	Play,
	CheckCircle,
	Star,
	Award,
	Building,
	Code,
	Sparkles,
	Trophy
} from 'lucide-react'

interface Particle {
	id: number
	x: number
	y: number
	angle: number
	speed: number
}

function HeroSection() {
	const { t } = useTranslation()
	const { isTeamsVariant } = useBrand()
	const colors = useBrandColors()
	
	const [isVideoPlaying, setIsVideoPlaying] = useState(false)
	const [activeFeature, setActiveFeature] = useState(0)
	const [activeTab, setActiveTab] = useState('talent')
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
	const [isTyping, setIsTyping] = useState(false)
	const [typedText, setTypedText] = useState('')
	const [currentParticles, setCurrentParticles] = useState<Particle[]>([])

	// Define brand-specific color schemes
	const brandColors = {
		teams: {
			primary: '#F47E22',      // Orange (Teams Primary)
			secondary: '#FACAA5',    // Light Orange (Teams Secondary)
			tertiary: '#FF6B35',     // Accent Orange
			success: '#10B981',
			warning: '#F59E0B',
			error: '#EF4444',
			info: '#3B82F6'
		},
		talent: {
			primary: '#478CCA',      // Blue (Talent Primary)
			secondary: '#22C2EA',    // Cyan (Talent Secondary)
			tertiary: '#5B9BD5',     // Accent Blue
			success: '#10B981',
			warning: '#F59E0B',
			error: '#EF4444',
			info: '#3B82F6'
		}
	}

	// Use appropriate colors based on active tab
	const activeColors = {
		primary: activeTab === 'teams' ? brandColors.teams.primary : brandColors.talent.primary,
		secondary: activeTab === 'teams' ? brandColors.teams.secondary : brandColors.talent.secondary,
		tertiary: activeTab === 'teams' ? brandColors.teams.tertiary : brandColors.talent.tertiary,
		success: activeTab === 'teams' ? brandColors.teams.success : brandColors.talent.success,
		warning: activeTab === 'teams' ? brandColors.teams.warning : brandColors.talent.warning,
		error: activeTab === 'teams' ? brandColors.teams.error : brandColors.talent.error,
		info: activeTab === 'teams' ? brandColors.teams.info : brandColors.talent.info,
		// Keep other colors from the main theme
		background: colors.background,
		surface: colors.surface,
		text: colors.text,
		border: colors.border,
		shadow: colors.shadow
	}

	const features = [
		{ icon: Brain, text: 'AI-Powered Matching', stat: '95%' },
		{ icon: Shield, text: 'GDPR Compliant', stat: '100%' },
		{ icon: Globe, text: 'Global Network', stat: '50+' },
		{ icon: TrendingUp, text: 'Career Growth', stat: '+65%' }
	]

	const fullText = "Find Your Perfect Tech Career in Minutes"

	// Mouse tracking for magnetic effects
	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			setMousePosition({ x: e.clientX, y: e.clientY })
		}
		window.addEventListener('mousemove', handleMouseMove)
		return () => window.removeEventListener('mousemove', handleMouseMove)
	}, [])

	// Typewriter effect
	useEffect(() => {
		if (!isTyping) {
			setIsTyping(true)
			let currentIndex = 0
			const interval = setInterval(() => {
				if (currentIndex <= fullText.length) {
					setTypedText(fullText.slice(0, currentIndex))
					currentIndex++
				} else {
					clearInterval(interval)
					setTimeout(() => {
						setIsTyping(false)
						setTypedText('')
					}, 3000)
				}
			}, 100)
			return () => clearInterval(interval)
		}
	}, [isTyping])

	// Restart typewriter effect
	useEffect(() => {
		const typewriterInterval = setInterval(() => {
			if (!isTyping) {
				setIsTyping(true)
			}
		}, 8000)
		return () => clearInterval(typewriterInterval)
	}, [isTyping])

	// Particle generation on click
	const generateParticles = (e: React.MouseEvent) => {
		const rect = e.currentTarget.getBoundingClientRect()
		const x = e.clientX - rect.left
		const y = e.clientY - rect.top
		
		const newParticles: Particle[] = Array.from({ length: 8 }, (_, i) => ({
			id: Date.now() + i,
			x,
			y,
			angle: (i * 45) * (Math.PI / 180),
			speed: Math.random() * 100 + 50
		}))
		
		setCurrentParticles(prev => [...prev, ...newParticles])
		
		setTimeout(() => {
			setCurrentParticles(prev => prev.filter(p => !newParticles.includes(p)))
		}, 1000)
	}

	useEffect(() => {
		const interval = setInterval(() => {
			setActiveFeature((prev) => (prev + 1) % features.length)
		}, 3000)
		return () => clearInterval(interval)
	}, [])

	useEffect(() => {
		const tabInterval = setInterval(() => {
			setActiveTab((prev) => prev === 'talent' ? 'teams' : 'talent')
		}, 8000)
		return () => clearInterval(tabInterval)
	}, [])

	return (
		<BrandedSection className="relative overflow-hidden">
			{/* Enhanced Gradient Background */}
			<div 
				className="absolute inset-0"
				style={{
					background: `
						linear-gradient(135deg, ${colors.primary}20 0%, ${colors.secondary}15 25%, ${colors.background} 50%, ${colors.primary}10 75%, ${colors.secondary}25 100%),
						radial-gradient(circle at 30% 20%, ${colors.primary}30 0%, transparent 50%),
						radial-gradient(circle at 70% 80%, ${colors.secondary}25 0%, transparent 50%),
						radial-gradient(circle at 20% 60%, ${colors.primary}15 0%, transparent 40%),
						radial-gradient(circle at 80% 40%, ${colors.secondary}20 0%, transparent 40%)
					`
				}}
			/>

			{/* Interactive Particle System */}
			<div className="absolute inset-0 pointer-events-none">
				{currentParticles.map((particle) => (
					<div
						key={particle.id}
						className="absolute w-2 h-2 rounded-full animate-ping opacity-60"
						style={{
							left: particle.x,
							top: particle.y,
							backgroundColor: colors.primary,
							transform: `translate(${Math.cos(particle.angle) * particle.speed}px, ${Math.sin(particle.angle) * particle.speed}px)`,
							transition: 'transform 1s ease-out',
							boxShadow: `0 0 10px ${colors.primary}80`
						}}
					/>
				))}
			</div>

			{/* Morphing Background Shapes */}
			<div className="absolute inset-0 overflow-hidden">
				<svg className="absolute top-0 left-0 w-full h-full opacity-10" viewBox="0 0 1000 1000">
					<defs>
						<radialGradient id="morphGradient1">
							<stop offset="0%" stopColor={colors.primary} stopOpacity="0.3" />
							<stop offset="100%" stopColor={colors.secondary} stopOpacity="0.1" />
						</radialGradient>
						<radialGradient id="morphGradient2">
							<stop offset="0%" stopColor={colors.secondary} stopOpacity="0.3" />
							<stop offset="100%" stopColor={colors.primary} stopOpacity="0.1" />
						</radialGradient>
					</defs>
					<circle 
						cx="200" 
						cy="300" 
						r="150" 
						fill="url(#morphGradient1)"
						className="animate-pulse"
						style={{ 
							animation: 'morphBlob1 8s ease-in-out infinite',
							transformOrigin: 'center'
						}}
					/>
					<ellipse 
						cx="800" 
						cy="600" 
						rx="100" 
						ry="200" 
						fill="url(#morphGradient2)"
						style={{ 
							animation: 'morphBlob2 6s ease-in-out infinite reverse',
							transformOrigin: 'center'
						}}
					/>
					<polygon
						points="600,200 700,100 800,200 700,300"
						fill="url(#morphGradient1)"
						style={{ 
							animation: 'morphPolygon 10s ease-in-out infinite',
							transformOrigin: 'center'
						}}
					/>
				</svg>
			</div>

			{/* Enhanced Animated Background Elements */}
			<div className="absolute inset-0">
				<div className="absolute top-20 left-10 w-3 h-3 rounded-full opacity-40 animate-pulse" 
					style={{ 
						backgroundColor: colors.primary,
						boxShadow: `0 0 20px ${colors.primary}50`
					}}></div>
				<div className="absolute top-40 right-20 w-4 h-4 rounded-full opacity-30 animate-bounce" 
					style={{ 
						backgroundColor: colors.secondary,
						boxShadow: `0 0 15px ${colors.secondary}40`
					}}></div>
				<div className="absolute bottom-40 left-20 w-2 h-2 rounded-full opacity-50 animate-pulse" 
					style={{ 
						backgroundColor: colors.primary,
						animationDelay: '1s',
						boxShadow: `0 0 10px ${colors.primary}60`
					}}></div>
				<div className="absolute bottom-20 right-40 w-3 h-3 rounded-full opacity-35 animate-bounce" 
					style={{ 
						backgroundColor: colors.secondary,
						animationDelay: '0.5s',
						boxShadow: `0 0 12px ${colors.secondary}50`
					}}></div>
				<div className="absolute top-1/2 left-1/4 w-1 h-1 rounded-full opacity-60 animate-ping" 
					style={{ 
						backgroundColor: colors.primary,
						animationDelay: '2s'
					}}></div>
				<div className="absolute top-1/3 right-1/3 w-2 h-2 rounded-full opacity-40 animate-ping" 
					style={{ 
						backgroundColor: colors.secondary,
						animationDelay: '1.5s'
					}}></div>
			</div>
			
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-6 relative z-10" onClick={generateParticles}>
				{/* Creative Asymmetrical Layout */}
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
					{/* Left Content - Takes 7 columns */}
					<div className="lg:col-span-7 text-center lg:text-left space-y-4 relative">
						{/* Floating Badge with Animation */}
						<div className="relative">
							<div 
								className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 backdrop-blur-sm relative z-10 group magnetic-element" 
								style={{ 
									background: `linear-gradient(135deg, ${colors.primary}15, ${colors.secondary}10)`,
									borderColor: `${colors.primary}40`,
									color: colors.primary,
									boxShadow: `0 8px 32px ${colors.primary}20`,
									transform: `translate(${(mousePosition.x - window.innerWidth/2) * 0.01}px, ${(mousePosition.y - window.innerHeight/2) * 0.01}px)`
								}}>
								<Star className="w-4 h-4 fill-current animate-spin" style={{ animationDuration: '3s' }} />
								<span className="text-sm font-semibold">AI-Powered Tech Recruitment Platform</span>
								<div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: colors.secondary }}></div>
							</div>
							{/* Floating decorative elements around badge */}
							<div className="absolute -top-2 -right-2 w-4 h-4 rounded-full opacity-60 animate-ping" 
								style={{ backgroundColor: colors.secondary, animationDelay: '0.5s' }}></div>
							<div className="absolute -bottom-1 -left-1 w-3 h-3 rounded-full opacity-40 animate-pulse" 
								style={{ backgroundColor: colors.primary, animationDelay: '1s' }}></div>
						</div>

						{/* Split Headline with Creative Typography and Typewriter Effect */}
						<div className="relative">
							{/* Background text effect */}
							<div className="absolute -top-8 left-0 text-8xl lg:text-9xl font-black opacity-5 pointer-events-none select-none"
								style={{ color: colors.primary }}>
								TECH
							</div>
							
							<BrandedH1 className="text-4xl lg:text-6xl font-bold leading-tight mb-4 relative z-10">
								<span className="block">Find Your</span>
								<BrandedSpan 
									className="block bg-gradient-to-r bg-clip-text text-transparent relative"
									style={{
										backgroundImage: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary}, ${colors.primary})`,
										backgroundSize: '200% auto',
										animation: 'gradient 3s ease infinite'
									}}
								>
									Perfect Tech Career
									{/* Underline decoration */}
									<div className="absolute -bottom-2 left-0 h-1 rounded-full animate-pulse"
										style={{ 
											width: '60%',
											background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})`
										}}></div>
								</BrandedSpan>
								<span 
									className="block text-right bg-gradient-to-r bg-clip-text text-transparent"
									style={{
										backgroundImage: `linear-gradient(45deg, ${colors.text.primary}, ${colors.primary}80)`
									}}
								>
									in Minutes ⚡
								</span>
							</BrandedH1>

							{/* Typewriter Effect Overlay */}
							{isTyping && (
								<div className="absolute top-0 left-0 w-full h-full pointer-events-none">
									<div className="text-4xl lg:text-6xl font-bold leading-tight text-transparent bg-clip-text"
										style={{
											backgroundImage: `linear-gradient(45deg, ${colors.primary}, ${colors.secondary})`,
											WebkitBackgroundClip: 'text'
										}}>
										{typedText}
										<span className="animate-pulse">|</span>
									</div>
								</div>
							)}
							
							{/* Creative description with highlight boxes */}
							<div className="relative">
								<BrandedP className="text-lg lg:text-xl leading-relaxed relative z-10" style={{ color: colors.text.secondary }}>
									Join thousands of developers, engineers, and data scientists who discovered their dream jobs 
									through our AI-powered platform.
								</BrandedP>
								
								{/* Floating highlight cards with 3D effects */}
								<div className="flex flex-wrap gap-3 mt-4">
									{['Upload CV', 'AI Matching', 'Get Hired'].map((text, index) => (
										<div key={index} 
											className="px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 hover:scale-110 cursor-pointer magnetic-element"
											style={{
												background: `linear-gradient(135deg, ${index % 2 === 0 ? colors.primary : colors.secondary}20, ${index % 2 === 0 ? colors.primary : colors.secondary}10)`,
												color: index % 2 === 0 ? colors.primary : colors.secondary,
												border: `1px solid ${index % 2 === 0 ? colors.primary : colors.secondary}30`,
												animationDelay: `${index * 0.2}s`,
												transform: `perspective(1000px) rotateX(${Math.sin(Date.now() * 0.001 + index) * 5}deg) rotateY(${Math.cos(Date.now() * 0.001 + index) * 5}deg)`
											}}
											onMouseEnter={(e) => {
												e.currentTarget.style.transform = 'perspective(1000px) rotateX(15deg) rotateY(10deg) scale(1.1)'
												e.currentTarget.style.boxShadow = `0 10px 30px ${index % 2 === 0 ? colors.primary : colors.secondary}40`
											}}
											onMouseLeave={(e) => {
												e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)'
												e.currentTarget.style.boxShadow = 'none'
											}}>
											{text}
										</div>
									))}
								</div>
							</div>
						</div>

						{/* Staggered Feature Cards */}
						<div className="grid grid-cols-2 gap-4 mt-8">
							{features.map((feature, index) => {
								const Icon = feature.icon
								const isActive = index === activeFeature
								const isEven = index % 2 === 0
								return (
									<div 
										key={index}
										className={`p-4 rounded-xl transition-all duration-500 group cursor-pointer ${
											isEven ? 'transform translate-y-0' : 'transform translate-y-4'
										} ${isActive ? 'scale-110 shadow-2xl' : 'hover:scale-105'}`}
										style={{
											background: isActive 
												? `linear-gradient(135deg, ${colors.primary}20, ${colors.secondary}15)` 
												: `${colors.surface}`,
											borderLeft: isActive ? `4px solid ${colors.primary}` : '4px solid transparent',
											boxShadow: isActive ? `0 10px 40px ${colors.primary}30` : '0 2px 10px rgba(0,0,0,0.1)',
											animationDelay: `${index * 0.1}s`
										}}
									>
										<div className="flex items-center gap-3">
											<Icon 
												className={`w-6 h-6 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12`} 
												style={{ 
													color: isActive ? colors.primary : colors.text.secondary,
													filter: isActive ? `drop-shadow(0 0 8px ${colors.primary}50)` : 'none'
												}} 
											/>
											<div>
												<div className="text-lg font-bold" 
													style={{ 
														color: colors.primary,
														textShadow: isActive ? `0 0 10px ${colors.primary}30` : 'none'
													}}>
													{feature.stat}
												</div>
												<div className="text-xs font-medium" style={{ color: colors.text.secondary }}>
													{feature.text}
												</div>
											</div>
										</div>
									</div>
								)
							})}
						</div>
						
						{/* Creative CTA Section */}
						<div className="flex flex-col sm:flex-row gap-4 mt-8">
							<div className="relative group flex-1">
								<Link
									to="/register/talent"
									className="w-full px-6 py-4 rounded-xl text-base font-semibold transition-all duration-300 shadow-lg hover:shadow-2xl flex items-center justify-center relative overflow-hidden magnetic-element"
									style={{
										background: `linear-gradient(135deg, ${colors.primary}, ${colors.primary}DD)`,
										color: colors.text.inverse,
										boxShadow: `0 4px 20px ${colors.primary}40`,
										transform: `perspective(1000px) rotateX(${Math.sin(Date.now() * 0.002) * 2}deg) translateZ(${Math.cos(Date.now() * 0.002) * 5}px)`
									}}
									onMouseEnter={(e) => {
										e.currentTarget.style.transform = 'perspective(1000px) rotateX(10deg) translateY(-5px) scale(1.05)'
										e.currentTarget.style.boxShadow = `0 20px 60px ${colors.primary}60`
									}}
									onMouseLeave={(e) => {
										e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) translateY(0) scale(1)'
										e.currentTarget.style.boxShadow = `0 4px 20px ${colors.primary}40`
									}}
									onClick={generateParticles}
								>
									<Users className="w-5 h-5 mr-2 group-hover:animate-bounce" />
									Upload CV & Get Matched
									<ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
									{/* Enhanced Ripple effect */}
									<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
									{/* Holographic border */}
									<div className="absolute inset-0 rounded-xl border-2 border-white/20 group-hover:border-white/40 transition-colors duration-300"></div>
								</Link>
								{/* Floating success indicator with 3D effect */}
								<div className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white transform group-hover:scale-125 transition-transform magnetic-element"
									style={{ 
										backgroundColor: colors.success,
										boxShadow: `0 4px 15px ${colors.success}50`,
										transform: 'perspective(500px) rotateX(45deg)'
									}}>
									✓
								</div>
							</div>
							
							<div className="relative group flex-1">
								<Link
									to="/register/team"
									className="w-full px-6 py-4 rounded-xl text-base font-semibold transition-all duration-300 flex items-center justify-center border-2 relative overflow-hidden backdrop-blur-sm magnetic-element"
									style={{
										background: `linear-gradient(135deg, ${colors.secondary}10, ${colors.secondary}05)`,
										borderColor: colors.secondary,
										color: colors.secondary,
										boxShadow: `0 4px 20px ${colors.secondary}30`,
										transform: `perspective(1000px) rotateX(${Math.sin(Date.now() * 0.002 + 1) * 2}deg) translateZ(${Math.cos(Date.now() * 0.002 + 1) * 5}px)`
									}}
									onMouseEnter={(e) => {
										e.currentTarget.style.background = `linear-gradient(135deg, ${colors.secondary}, ${colors.secondary}DD)`
										e.currentTarget.style.color = colors.text.inverse
										e.currentTarget.style.transform = 'perspective(1000px) rotateX(-5deg) translateY(-3px) scale(1.05)'
										e.currentTarget.style.boxShadow = `0 15px 50px ${colors.secondary}60`
									}}
									onMouseLeave={(e) => {
										e.currentTarget.style.background = `linear-gradient(135deg, ${colors.secondary}10, ${colors.secondary}05)`
										e.currentTarget.style.color = colors.secondary
										e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) translateY(0) scale(1)'
										e.currentTarget.style.boxShadow = `0 4px 20px ${colors.secondary}30`
									}}
									onClick={generateParticles}
								>
									<Zap className="w-5 h-5 mr-2 group-hover:animate-pulse" />
									Find Top Talent
									{/* Enhanced Sparkle effect */}
									<div className="absolute top-1 right-1 w-2 h-2 rounded-full animate-ping"
										style={{ backgroundColor: colors.secondary, animationDelay: '1s' }}></div>
									{/* Holographic glow */}
									<div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
										style={{ 
											background: `linear-gradient(45deg, ${colors.secondary}20, transparent, ${colors.secondary}20)`,
											filter: 'blur(1px)'
										}}></div>
								</Link>
							</div>
						</div>
						
						{/* Redesigned Trust Indicators */}
						<div className="relative mt-8">
							<div className="absolute inset-0 rounded-xl opacity-50" 
								style={{ background: `linear-gradient(135deg, ${colors.primary}05, ${colors.secondary}05)` }}></div>
							<div className="relative p-4 rounded-xl border border-dashed" 
								style={{ borderColor: `${colors.border}60` }}>
								<div className="text-center mb-3">
									<span className="text-sm font-semibold" style={{ color: colors.text.secondary }}>
										Trusted by Industry Leaders
									</span>
								</div>
								<div className="flex justify-center items-center gap-6">
									{[
										{ text: '75K+ Developers', icon: '👨‍💻' },
										{ text: '5K+ Companies', icon: '🏢' },
										{ text: '95% Success Rate', icon: '🎯' }
									].map((item, index) => (
										<div key={index} className="flex flex-col items-center gap-1 group cursor-pointer">
											<div className="text-2xl group-hover:scale-125 transition-transform">{item.icon}</div>
											<span className="text-xs font-medium text-center" style={{ color: colors.text.secondary }}>
												{item.text}
											</span>
										</div>
									))}
								</div>
							</div>
						</div>
					</div>

					{/* Right Image Showcase - Takes 5 columns */}
					<div className="lg:col-span-5 relative">
						{/* Floating image gallery with tilt effect */}
						<div className="relative transform lg:rotate-2 hover:rotate-0 transition-transform duration-500">
							{/* Enhanced Background Image */}
							<div className="absolute inset-0 rounded-2xl overflow-hidden transform rotate-1">
								<img
									src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80"
									alt="Modern tech workspace with monitors and code"
									className="w-full h-full object-cover opacity-20"
								/>
								<div className="absolute inset-0" 
									style={{
										background: `linear-gradient(135deg, ${activeColors.primary}10, transparent, ${activeColors.secondary}15)`
									}}></div>
							</div>

							{/* Enhanced Main Image Showcase */}
							<div 
								className="rounded-2xl shadow-2xl p-6 transform hover:scale-105 transition-all duration-500 relative z-10 backdrop-blur-sm border group"
								style={{ 
									background: `linear-gradient(135deg, ${colors.background}F0, ${colors.surface}E0)`,
									borderColor: `${colors.border}40`,
									boxShadow: `0 20px 60px ${activeColors.primary}20, 0 8px 25px rgba(0,0,0,0.1)`
								}}
							>
								{/* Floating corner decorations */}
								<div className="absolute -top-3 -left-3 w-6 h-6 rounded-full animate-pulse"
									style={{ background: `linear-gradient(135deg, ${activeColors.primary}, ${activeColors.secondary})` }}></div>
								<div className="absolute -top-2 -right-2 w-4 h-4 rounded-full animate-bounce"
									style={{ backgroundColor: activeColors.secondary, animationDelay: '0.5s' }}></div>

								{/* Enhanced Image Gallery Header */}
								<div className="flex items-center justify-between mb-6 p-4 rounded-xl relative overflow-hidden group" 
									style={{ 
										background: `linear-gradient(135deg, ${activeColors.primary}08, ${activeColors.primary}15)`
									}}>
									{/* Animated background pattern */}
									<div className="absolute inset-0 opacity-10" 
										style={{
											backgroundImage: `radial-gradient(circle at 20% 50%, ${activeColors.primary}30 0%, transparent 50%), radial-gradient(circle at 80% 20%, ${activeColors.primary}20 0%, transparent 50%)`,
											animation: 'backgroundMove 4s ease-in-out infinite'
										}}></div>
									
									<div className="flex items-center gap-3 relative z-10">
										<div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg relative group" 
											style={{ 
												background: `linear-gradient(135deg, ${activeColors.primary}, ${activeColors.primary}CC)`,
												boxShadow: `0 4px 15px ${activeColors.primary}40`
											}}>
											<Globe className="w-6 h-6 text-white group-hover:rotate-12 transition-transform" />
											{/* Pulsing ring */}
											<div className="absolute inset-0 rounded-xl border-2 animate-ping"
												style={{ borderColor: `${activeColors.primary}60` }}></div>
										</div>
										<div>
											<h3 className="font-bold text-lg transition-colors duration-300" style={{ color: colors.text.primary }}>
												🌍 European Tech Hub
											</h3>
											<p className="text-sm transition-colors duration-300" style={{ color: colors.text.secondary }}>
												Connect with talent across major tech cities
											</p>
										</div>
									</div>
									
									<div className="flex items-center gap-2 px-3 py-2 rounded-full relative" 
										style={{ 
											background: `linear-gradient(135deg, ${activeColors.primary}20, ${activeColors.primary}10)`
										}}>
										<div className="w-2 h-2 rounded-full animate-pulse relative" 
											style={{ 
												backgroundColor: activeColors.primary,
												boxShadow: `0 0 8px ${activeColors.primary}60`
											}}>
											{/* Ripple effect */}
											<div className="absolute inset-0 rounded-full animate-ping"
												style={{ backgroundColor: activeColors.primary }}></div>
										</div>
										<span className="text-sm font-medium" 
											style={{ color: activeColors.primary }}>Live Network</span>
									</div>
								</div>

								{/* Professional Tech Images Grid */}
								<div className="grid grid-cols-2 gap-4 mb-6">
									{/* Main featured image */}
									<div className="col-span-2 relative overflow-hidden rounded-xl group cursor-pointer magnetic-element"
										style={{
											height: '240px',
											background: `linear-gradient(135deg, ${activeColors.primary}08, ${activeColors.secondary}08)`
										}}
										onMouseEnter={(e) => {
											e.currentTarget.style.transform = 'perspective(1000px) rotateX(5deg) scale(1.02)'
											e.currentTarget.style.boxShadow = `0 15px 40px ${activeColors.primary}25`
										}}
										onMouseLeave={(e) => {
											e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) scale(1)'
											e.currentTarget.style.boxShadow = 'none'
										}}
									>
										<img
											src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
											alt="Team of developers collaborating in modern office"
											className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
										/>
										<div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
										<div className="absolute bottom-4 left-4 text-white">
											<div className="text-sm font-bold">Team Collaboration</div>
											<div className="text-xs opacity-80">Modern Development Teams</div>
										</div>
										{/* Floating badge */}
										<div className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md"
											style={{ 
												background: `linear-gradient(135deg, ${activeColors.primary}80, ${activeColors.primary}60)`,
												color: 'white'
											}}>
											Featured
										</div>
									</div>

									{/* Berlin Tech Hub */}
									<div className="relative overflow-hidden rounded-xl group cursor-pointer magnetic-element"
										style={{ height: '140px' }}
										onMouseEnter={(e) => {
											e.currentTarget.style.transform = 'perspective(800px) rotateY(10deg) scale(1.05)'
											e.currentTarget.style.boxShadow = `0 10px 30px ${activeColors.secondary}25`
										}}
										onMouseLeave={(e) => {
											e.currentTarget.style.transform = 'perspective(800px) rotateY(0deg) scale(1)'
											e.currentTarget.style.boxShadow = 'none'
										}}
									>
										<img
											src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=600&q=80"
											alt="Berlin startup office and tech workspace"
											className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
										/>
										<div className="absolute inset-0 bg-gradient-to-br from-black/40 to-transparent"></div>
										<div className="absolute bottom-3 left-3 text-white">
											<div className="text-xs font-bold">🇩🇪 Berlin</div>
											<div className="text-xs opacity-70">Tech Hub</div>
										</div>
										{/* Trending indicator */}
										<div className="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center animate-pulse"
											style={{ backgroundColor: colors.success }}>
											<span className="text-xs">🔥</span>
										</div>
									</div>

									{/* Zurich Tech Scene */}
									<div className="relative overflow-hidden rounded-xl group cursor-pointer magnetic-element"
										style={{ height: '140px' }}
										onMouseEnter={(e) => {
											e.currentTarget.style.transform = 'perspective(800px) rotateY(-10deg) scale(1.05)'
											e.currentTarget.style.boxShadow = `0 10px 30px ${activeColors.primary}25`
										}}
										onMouseLeave={(e) => {
											e.currentTarget.style.transform = 'perspective(800px) rotateY(0deg) scale(1)'
											e.currentTarget.style.boxShadow = 'none'
										}}
									>
										<img
											src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80"
											alt="Swiss tech company modern workspace"
											className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
										/>
										<div className="absolute inset-0 bg-gradient-to-br from-black/40 to-transparent"></div>
										<div className="absolute bottom-3 left-3 text-white">
											<div className="text-xs font-bold">🇨🇭 Zurich</div>
											<div className="text-xs opacity-70">Tech Hub</div>
										</div>
										{/* Success indicator */}
										<div className="absolute top-2 right-2 text-yellow-400 animate-bounce">
											<span className="text-sm">⭐</span>
										</div>
									</div>

									{/* Amsterdam Tech */}
									<div className="relative overflow-hidden rounded-xl group cursor-pointer magnetic-element"
										style={{ height: '120px' }}
										onMouseEnter={(e) => {
											e.currentTarget.style.transform = 'perspective(800px) rotateX(10deg) scale(1.05)'
											e.currentTarget.style.boxShadow = `0 10px 30px ${activeColors.secondary}25`
										}}
										onMouseLeave={(e) => {
											e.currentTarget.style.transform = 'perspective(800px) rotateX(0deg) scale(1)'
											e.currentTarget.style.boxShadow = 'none'
										}}
									>
										<img
											src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80"
											alt="Amsterdam startup and innovation workspace"
											className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
										/>
										<div className="absolute inset-0 bg-gradient-to-br from-black/40 to-transparent"></div>
										<div className="absolute bottom-2 left-2 text-white">
											<div className="text-xs font-bold">🇳🇱 Amsterdam</div>
										</div>
									</div>

									{/* Munich Innovation */}
									<div className="relative overflow-hidden rounded-xl group cursor-pointer magnetic-element"
										style={{ height: '120px' }}
										onMouseEnter={(e) => {
											e.currentTarget.style.transform = 'perspective(800px) rotateX(-10deg) scale(1.05)'
											e.currentTarget.style.boxShadow = `0 10px 30px ${activeColors.primary}25`
										}}
										onMouseLeave={(e) => {
											e.currentTarget.style.transform = 'perspective(800px) rotateX(0deg) scale(1)'
											e.currentTarget.style.boxShadow = 'none'
										}}
									>
										<img
											src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=600&q=80"
											alt="Munich tech innovation center"
											className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
										/>
										<div className="absolute inset-0 bg-gradient-to-br from-black/40 to-transparent"></div>
										<div className="absolute bottom-2 left-2 text-white">
											<div className="text-xs font-bold">🇩🇪 Munich</div>
										</div>
									</div>
								</div>

								{/* Enhanced Stats for European Tech Market */}
								<div className="grid grid-cols-3 gap-4 pt-4 border-t border-dashed" style={{ borderColor: `${colors.border}60` }}>
									{[
										{ value: '50K+', label: 'Tech Professionals', color: activeColors.primary, icon: '👨‍💻' },
										{ value: '5K+', label: 'Companies', color: activeColors.secondary, icon: '🏢' },
										{ value: '€85k', label: 'Avg Salary', color: activeColors.primary, icon: '💰' }
									].map((stat, index) => (
										<div key={index} className="text-center p-3 rounded-lg group hover:scale-105 transition-all duration-300 cursor-pointer magnetic-element"
											style={{ 
												background: `${stat.color}05`,
												border: `1px solid ${stat.color}20`,
												transform: `perspective(500px) rotateX(${Math.sin(Date.now() * 0.002 + index) * 3}deg)`
											}}>
											<div className="text-lg mb-1 group-hover:animate-bounce">{stat.icon}</div>
											<div className="text-2xl font-bold" 
												style={{ 
													color: stat.color,
													textShadow: `0 0 10px ${stat.color}30`
												}}>{stat.value}</div>
											<div className="text-xs font-medium" style={{ color: colors.text.secondary }}>{stat.label}</div>
										</div>
									))}
								</div>
							</div>

							{/* Enhanced Floating Elements with Holographic Effects */}
							<div className="absolute -top-6 -right-6 w-20 h-20 rounded-full flex items-center justify-center shadow-2xl animate-bounce group cursor-pointer magnetic-element" 
								style={{ 
									background: `linear-gradient(135deg, ${activeColors.primary}, ${activeColors.primary}CC)`,
									boxShadow: `0 8px 25px ${activeColors.primary}40`,
									transform: `perspective(800px) rotateX(${Math.sin(Date.now() * 0.002) * 10}deg) rotateY(${Math.cos(Date.now() * 0.002) * 10}deg)`
								}}>
								<Code className="w-10 h-10 text-white group-hover:rotate-12 transition-transform" />
								{/* Holographic rings */}
								<div className="absolute inset-0 rounded-full border-2 border-dashed animate-spin border-white/30" style={{ animationDuration: '3s' }}></div>
								<div className="absolute inset-2 rounded-full border border-white/20 animate-ping"></div>
								<div className="absolute -top-2 left-1/2 w-3 h-3 rounded-full bg-white animate-ping"></div>
							</div>
						
							<div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full flex items-center justify-center shadow-2xl group cursor-pointer magnetic-element" 
								style={{ 
									background: `linear-gradient(135deg, ${activeColors.secondary}, ${activeColors.secondary}CC)`,
									boxShadow: `0 6px 20px ${activeColors.secondary}40`,
									transform: `perspective(600px) rotateX(${Math.cos(Date.now() * 0.002) * 8}deg)`
								}}>
								<Users className="w-8 h-8 text-white group-hover:scale-110 transition-transform" />
								{/* Multi-layer pulsing rings */}
								<div className="absolute inset-0 rounded-full border-2 animate-pulse border-white/40"></div>
								<div className="absolute inset-1 rounded-full border animate-ping border-white/20"></div>
							</div>

							{/* Advanced floating decorative elements */}
							<div className="absolute top-1/4 -left-2 w-6 h-6 rounded-full animate-float magnetic-element"
								style={{ 
									background: `linear-gradient(135deg, ${activeColors.primary}60, ${activeColors.secondary}60)`,
									animationDelay: '1s',
									boxShadow: `0 4px 12px ${activeColors.primary}30`
								}}></div>
							<div className="absolute bottom-1/3 -right-3 w-4 h-4 rounded-full animate-float magnetic-element"
								style={{ 
									background: `linear-gradient(135deg, ${activeColors.secondary}60, ${activeColors.primary}60)`,
									animationDelay: '2s',
									boxShadow: `0 3px 10px ${activeColors.secondary}30`
								}}></div>
							
							{/* Additional micro-interactions */}
							<div className="absolute top-1/2 right-0 w-2 h-2 rounded-full animate-ping"
								style={{ 
									backgroundColor: activeColors.primary,
									animationDelay: '3s'
								}}></div>
							<div className="absolute bottom-1/4 left-0 w-3 h-3 rounded-full animate-pulse"
								style={{ 
									backgroundColor: activeColors.secondary,
									animationDelay: '2.5s'
								}}></div>
						</div>
					</div>
				</div>
			</div>

			{/* Advanced Custom Animations & Magnetic Effects */}
			<style dangerouslySetInnerHTML={{
				__html: `
					@keyframes gradient {
						0%, 100% { background-position: 0% 50%; }
						50% { background-position: 100% 50%; }
					}
					@keyframes backgroundMove {
						0%, 100% { transform: translateX(0) translateY(0); }
						50% { transform: translateX(10px) translateY(-5px); }
					}
					@keyframes animate-float {
						0%, 100% { transform: translateY(0px); }
						50% { transform: translateY(-10px); }
					}
					@keyframes morphBlob1 {
						0%, 100% { transform: scale(1) rotate(0deg); }
						33% { transform: scale(1.1) rotate(120deg); }
						66% { transform: scale(0.9) rotate(240deg); }
					}
					@keyframes morphBlob2 {
						0%, 100% { transform: scale(1) skewX(0deg); }
						50% { transform: scale(1.2) skewX(15deg); }
					}
					@keyframes morphPolygon {
						0%, 100% { transform: rotate(0deg) scale(1); }
						25% { transform: rotate(90deg) scale(1.1); }
						50% { transform: rotate(180deg) scale(0.9); }
						75% { transform: rotate(270deg) scale(1.05); }
					}
					@keyframes scanLine {
						0% { transform: translateX(-100%); }
						100% { transform: translateX(100%); }
					}
					@keyframes flowLine {
						0% { stroke-dashoffset: 100; opacity: 0.3; }
						50% { stroke-dashoffset: 0; opacity: 0.8; }
						100% { stroke-dashoffset: -100; opacity: 0.3; }
					}
					.animate-float {
						animation: animate-float 3s ease-in-out infinite;
					}
					.magnetic-element {
						transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
					}
					.magnetic-element:hover {
						transform: scale(1.05) !important;
					}
				`
			}} />
		</BrandedSection>
	)
}

export default HeroSection