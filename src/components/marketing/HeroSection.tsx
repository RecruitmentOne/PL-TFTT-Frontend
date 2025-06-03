import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useBrand, useBrandColors } from '../../brand'
import { BrandedH1, BrandedP, BrandedSpan, BrandedSection } from '../brand'
import { useState, useEffect, useRef } from 'react'
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

	// Use main brand colors for general content
	const mainColors = {
		primary: colors.primary,
		secondary: colors.secondary,
		background: colors.background,
		surface: colors.surface,
		text: colors.text,
		border: colors.border,
		shadow: colors.shadow
	}

	const features = [
		{ icon: Brain, text: 'AI-Powered Matching', stat: 'Advanced' },
		{ icon: Shield, text: 'GDPR Compliant', stat: '100%' },
		{ icon: Globe, text: 'Global Network', stat: '50+' },
		{ icon: TrendingUp, text: 'Career Growth', stat: '+65%' }
	]

	const fullText = "Find Your Perfect Tech Career in Minute"

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
						backgroundColor: brandColors.talent.primary,
						boxShadow: `0 0 20px ${brandColors.talent.primary}50`
					}}></div>
				<div className="absolute top-40 right-20 w-4 h-4 rounded-full opacity-30 animate-bounce" 
					style={{ 
						backgroundColor: brandColors.teams.primary,
						boxShadow: `0 0 15px ${brandColors.teams.primary}40`
					}}></div>
				<div className="absolute bottom-40 left-20 w-2 h-2 rounded-full opacity-50 animate-pulse" 
					style={{ 
						backgroundColor: brandColors.teams.secondary,
						animationDelay: '1s',
						boxShadow: `0 0 10px ${brandColors.teams.secondary}60`
					}}></div>
				<div className="absolute bottom-20 right-40 w-3 h-3 rounded-full opacity-35 animate-bounce" 
					style={{ 
						backgroundColor: brandColors.talent.primary,
						animationDelay: '0.5s',
						boxShadow: `0 0 12px ${brandColors.talent.primary}50`
					}}></div>
				<div className="absolute top-1/2 left-1/4 w-1 h-1 rounded-full opacity-60 animate-ping" 
								style={{
						backgroundColor: brandColors.teams.primary,
						animationDelay: '2s'
					}}></div>
				<div className="absolute top-1/3 right-1/3 w-2 h-2 rounded-full opacity-40 animate-ping" 
								style={{
						backgroundColor: brandColors.teams.secondary,
						animationDelay: '1.5s'
					}}></div>
				{/* Additional team color elements */}
				<div className="absolute top-1/4 right-1/4 w-2 h-2 rounded-full opacity-45 animate-pulse" 
								style={{
						backgroundColor: brandColors.teams.primary,
						animationDelay: '0.8s',
						boxShadow: `0 0 8px ${brandColors.teams.primary}40`
					}}></div>
				<div className="absolute bottom-1/3 left-1/3 w-3 h-3 rounded-full opacity-35 animate-bounce" 
								style={{
						backgroundColor: brandColors.teams.tertiary,
						animationDelay: '1.2s',
						boxShadow: `0 0 14px ${brandColors.teams.tertiary}50`
					}}></div>
						</div>
						
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 lg:py-3 relative z-10" onClick={generateParticles}>
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
							
							<BrandedH1 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight mb-1 relative z-9">
								<span className="block">Find Your Perfect</span>
								<BrandedSpan 
									className="block bg-gradient-to-r bg-clip-text text-transparent relative"
									style={{
										backgroundImage: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary}, ${colors.primary})`,
										backgroundSize: '200% auto',
										animation: 'gradient 3s ease infinite'
									}}
								>
									Tech Career
									{/* Underline decoration */}
									<div className="absolute -bottom-2 left-0 h-1 rounded-full animate-pulse"
										style={{ 
											width: '60%',
											background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})`
										}}></div>
								</BrandedSpan>
								<span 
									className="block text-center lg:text-right bg-gradient-to-r bg-clip-text text-transparent"
									style={{
										backgroundImage: `linear-gradient(45deg, ${colors.text.primary}, ${colors.primary}90)`,
										marginRight: '2rem'
									}}
								>
									in Minutes 🚀
										</span>
							</BrandedH1>

							{/* Typewriter Effect Overlay */}
							{isTyping && (
								<div className="absolute top-0 left-0 w-full h-full pointer-events-none">
									<div className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight text-transparent bg-clip-text"
										style={{
											backgroundImage: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary}, ${colors.primary})`,
											backgroundSize: '200% auto',
											animation: 'gradient 3s ease infinite',
											WebkitBackgroundClip: 'text'
										}}>
										{typedText}
										<span className="animate-pulse text-white">|</span>
									</div>
								</div>
							)}
							
							{/* Creative description with highlight boxes */}
							<div className="relative">
								<BrandedP className="text-xs md:text-sm lg:text-base leading-relaxed relative z-10" style={{ color: colors.text.secondary }}>
									Connect EU professionals with German and Swiss tech opportunities through AI-powered matching, direct employer connections, and transparent credit-based pricing.
								</BrandedP>
								
								{/* Floating highlight cards with 3D effects */}
								<div className="flex flex-wrap gap-2 mt-2">
									{['AI Matching', 'Direct Contact', 'No Middleman'].map((text, index) => {
										// Alternate colors: AI Matching (blue), Direct Contact (orange), No Middleman (blue)
										const cardColor = index === 1 ? brandColors.teams.primary : brandColors.talent.primary
										const isTeamCard = index === 1
										return (
											<div key={index} 
												className="px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 hover:scale-110 cursor-pointer magnetic-element"
										style={{
													background: `linear-gradient(135deg, ${cardColor}20, ${cardColor}10)`,
													color: cardColor,
													border: `1px solid ${cardColor}30`,
													animationDelay: `${index * 0.2}s`,
													transform: `perspective(1000px) rotateX(${Math.sin(Date.now() * 0.001 + index) * 5}deg) rotateY(${Math.cos(Date.now() * 0.001 + index) * 5}deg)`
												}}
												onMouseEnter={(e) => {
													e.currentTarget.style.transform = 'perspective(1000px) rotateX(15deg) rotateY(10deg) scale(1.1)'
													e.currentTarget.style.boxShadow = `0 10px 30px ${cardColor}40`
												}}
												onMouseLeave={(e) => {
													e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)'
													e.currentTarget.style.boxShadow = 'none'
												}}>
												{text}
											</div>
										)
									})}
											</div>
										</div>
									</div>
									
						{/* Staggered Feature Cards */}
						<div className="grid grid-cols-2 gap-3 mt-4">
							{features.map((feature, index) => {
								const Icon = feature.icon
								const isActive = index === activeFeature
								const isEven = index % 2 === 0
								// Alternate between talent and team colors for features
								const featureColor = isEven ? brandColors.talent.primary : brandColors.teams.primary
								return (
									<div 
										key={index}
										className={`p-4 rounded-xl transition-all duration-500 group cursor-pointer ${
											isEven ? 'transform translate-y-0' : 'transform translate-y-4'
										} ${isActive ? 'scale-110 shadow-2xl' : 'hover:scale-105'}`}
										style={{
											background: isActive 
												? `linear-gradient(135deg, ${featureColor}20, ${featureColor}15)` 
												: `${colors.surface}`,
											borderLeft: isActive ? `4px solid ${featureColor}` : '4px solid transparent',
											boxShadow: isActive ? `0 10px 40px ${featureColor}30` : '0 2px 10px rgba(0,0,0,0.1)',
											animationDelay: `${index * 0.1}s`
										}}
									>
										<div className="flex items-center gap-3">
											<Icon 
												className={`w-6 h-6 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12`} 
												style={{ 
													color: isActive ? featureColor : colors.text.secondary,
													filter: isActive ? `drop-shadow(0 0 8px ${featureColor}50)` : 'none'
												}} 
											/>
											<div>
												<div className="text-lg font-bold" 
													style={{ 
														color: featureColor,
														textShadow: isActive ? `0 0 10px ${featureColor}30` : 'none'
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
						<div className="relative mt-4">
							{/* CTA Section Background with Border */}
							<div className="absolute inset-0 rounded-xl" 
								style={{ 
									background: `linear-gradient(135deg, ${colors.primary}08, ${colors.secondary}08)`,
									border: `2px solid ${colors.border}30`
								}}></div>
							<div className="relative p-6 rounded-xl backdrop-blur-sm">
								{/* CTA Section Header */}
								<div className="text-center mb-4">
									<h3 className="text-lg font-bold bg-gradient-to-r bg-clip-text text-transparent"
										style={{ 
											backgroundImage: `linear-gradient(45deg, ${colors.primary}, ${colors.secondary})`
										}}>
										Choose Your Path
									</h3>
									<p className="text-sm mt-1" style={{ color: colors.text.secondary }}>
										Join as talent or hire exceptional developers
									</p>
											</div>
								<div className="flex flex-col sm:flex-row gap-4">
									<div className="relative group flex-1">
										<Link
											to="/register/talent"
											className="w-full px-6 py-4 rounded-xl text-base font-semibold transition-all duration-300 shadow-lg hover:shadow-2xl flex items-center justify-center relative overflow-hidden magnetic-element"
											style={{
												background: `linear-gradient(135deg, ${brandColors.talent.primary}, ${brandColors.talent.primary}DD)`,
												color: colors.text.inverse,
												boxShadow: `0 4px 20px ${brandColors.talent.primary}40`,
												transform: `perspective(1000px) rotateX(${Math.sin(Date.now() * 0.002) * 2}deg) translateZ(${Math.cos(Date.now() * 0.002) * 5}px)`
											}}
											onMouseEnter={(e) => {
												e.currentTarget.style.transform = 'perspective(1000px) rotateX(10deg) translateY(-5px) scale(1.05)'
												e.currentTarget.style.boxShadow = `0 20px 60px ${brandColors.talent.primary}60`
											}}
											onMouseLeave={(e) => {
												e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) translateY(0) scale(1)'
												e.currentTarget.style.boxShadow = `0 4px 20px ${brandColors.talent.primary}40`
											}}
											onClick={generateParticles}
										>
											<Users className="w-5 h-5 mr-2 group-hover:animate-bounce" />
											Join as Talent
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
												background: `linear-gradient(135deg, ${brandColors.teams.primary}10, ${brandColors.teams.primary}05)`,
												borderColor: brandColors.teams.primary,
												color: brandColors.teams.primary,
												boxShadow: `0 4px 20px ${brandColors.teams.primary}30`,
												transform: `perspective(1000px) rotateX(${Math.sin(Date.now() * 0.002 + 1) * 2}deg) translateZ(${Math.cos(Date.now() * 0.002 + 1) * 5}px)`
											}}
											onMouseEnter={(e) => {
												e.currentTarget.style.background = `linear-gradient(135deg, ${brandColors.teams.primary}, ${brandColors.teams.primary}DD)`
												e.currentTarget.style.color = colors.text.inverse
												e.currentTarget.style.transform = 'perspective(1000px) rotateX(-5deg) translateY(-3px) scale(1.05)'
												e.currentTarget.style.boxShadow = `0 15px 50px ${brandColors.teams.primary}60`
											}}
											onMouseLeave={(e) => {
												e.currentTarget.style.background = `linear-gradient(135deg, ${brandColors.teams.primary}10, ${brandColors.teams.primary}05)`
												e.currentTarget.style.color = brandColors.teams.primary
												e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) translateY(0) scale(1)'
												e.currentTarget.style.boxShadow = `0 4px 20px ${brandColors.teams.primary}30`
											}}
											onClick={generateParticles}
										>
											<Zap className="w-5 h-5 mr-2 group-hover:animate-pulse" />
											Hire Top Talent
											{/* Enhanced Sparkle effect */}
											<div className="absolute top-1 right-1 w-2 h-2 rounded-full animate-ping"
												style={{ backgroundColor: brandColors.teams.secondary, animationDelay: '1s' }}></div>
											{/* Holographic glow */}
											<div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
												style={{ 
													background: `linear-gradient(45deg, ${brandColors.teams.primary}20, transparent, ${brandColors.teams.primary}20)`,
													filter: 'blur(1px)'
												}}></div>
										</Link>
									</div>
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
										background: `linear-gradient(135deg, ${mainColors.primary}10, transparent, ${mainColors.secondary}15)`
									}}></div>
							</div>

							{/* Enhanced Main Image Showcase */}
							<div 
								className="rounded-2xl shadow-2xl p-6 transform hover:scale-105 transition-all duration-500 relative z-10 backdrop-blur-sm border group"
										style={{
									background: `linear-gradient(135deg, ${colors.background}F0, ${colors.surface}E0)`,
									borderColor: `${colors.border}40`,
									boxShadow: `0 20px 60px ${mainColors.primary}20, 0 8px 25px rgba(0,0,0,0.1)`
								}}
							>
								{/* Floating corner decorations */}
								<div className="absolute -top-3 -left-3 w-6 h-6 rounded-full animate-pulse"
									style={{ background: `linear-gradient(135deg, ${mainColors.primary}, ${mainColors.secondary})` }}></div>
								<div className="absolute -top-2 -right-2 w-4 h-4 rounded-full animate-bounce"
									style={{ backgroundColor: mainColors.secondary, animationDelay: '0.5s' }}></div>

								{/* Enhanced Image Gallery Header */}
								<div className="flex items-center justify-between mb-6 p-6 rounded-xl relative overflow-hidden group" 
									style={{ 
										background: `linear-gradient(135deg, ${mainColors.primary}08, ${mainColors.primary}15)`
									}}>
									{/* Animated background pattern */}
									<div className="absolute inset-0 opacity-10" 
										style={{
											backgroundImage: `radial-gradient(circle at 20% 50%, ${mainColors.primary}30 0%, transparent 50%), radial-gradient(circle at 80% 20%, ${mainColors.primary}20 0%, transparent 50%)`,
											animation: 'backgroundMove 4s ease-in-out infinite'
										}}></div>
									
									<div className="flex items-center gap-4 relative z-10">
										<div className="w-14 h-14 rounded-xl flex items-center justify-center shadow-lg relative group" 
											style={{ 
												background: `linear-gradient(135deg, ${mainColors.primary}, ${mainColors.primary}CC)`,
												boxShadow: `0 6px 20px ${mainColors.primary}40`
											}}>
											<Globe className="w-7 h-7 text-white group-hover:rotate-12 transition-transform" />
											{/* Enhanced pulsing ring */}
											<div className="absolute inset-0 rounded-xl border-2 animate-ping"
												style={{ borderColor: `${mainColors.primary}60` }}></div>
											</div>
											<div>
											<h3 className="font-bold text-xl transition-colors duration-300 bg-gradient-to-r bg-clip-text text-transparent"
												style={{ backgroundImage: `linear-gradient(45deg, ${colors.primary}, ${colors.secondary})` }}>
												🇩🇪🇨🇭Tech Network
											</h3>
											<p className="text-base transition-colors duration-300" style={{ color: colors.text.secondary }}>
												Leading talent network in EU
												</p>
											</div>
										</div>
									
									<div className="flex items-center gap-3 px-4 py-3 rounded-full relative" 
										style={{ 
											background: `linear-gradient(135deg, ${mainColors.primary}20, ${mainColors.primary}10)`
										}}>
										<div className="w-3 h-3 rounded-full animate-pulse relative" 
											style={{ 
												backgroundColor: mainColors.primary,
												boxShadow: `0 0 12px ${mainColors.primary}60`
											}}>
											{/* Enhanced ripple effect */}
											<div className="absolute inset-0 rounded-full animate-ping"
												style={{ backgroundColor: mainColors.primary }}></div>
										</div>
										<span className="text-base font-medium" 
											style={{ color: mainColors.primary }}>Scecure</span>
									</div>
								</div>
								
								{/* Professional Tech Images Grid - 6 Images Showcasing Both Talent & Team Sides */}
								<div className="grid grid-cols-2 gap-4 mb-6">
									{/* Main featured image - Recruitment Platform Overview */}
									<div className="col-span-2 relative overflow-hidden rounded-xl group cursor-pointer magnetic-element"
										style={{
											height: '140px',
											background: `linear-gradient(135deg, ${mainColors.primary}08, ${mainColors.secondary}08)`
										}}
										onMouseEnter={(e) => {
											e.currentTarget.style.transform = 'perspective(1000px) rotateX(5deg) scale(1.02)'
											e.currentTarget.style.boxShadow = `0 15px 40px ${mainColors.primary}25`
										}}
										onMouseLeave={(e) => {
											e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) scale(1)'
											e.currentTarget.style.boxShadow = 'none'
										}}
									>
										<img
											src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=800&q=80"
											alt="Tech recruitment platform connecting talent with companies"
											className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
										/>
										<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
										<div className="absolute bottom-4 left-4 text-white">
											<div className="text-sm font-bold">AI Tech Recruitment</div>
											<div className="text-xs opacity-80">Talent ⟷ Teams Platform</div>
										</div>
										<div className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md"
											style={{ 
												background: `linear-gradient(135deg, ${mainColors.primary}80, ${mainColors.primary}60)`,
												color: 'white'
											}}>
											AI Matching
										</div>
									</div>

									{/* TALENT SIDE - Job Search */}
									<div className="relative overflow-hidden rounded-xl group cursor-pointer magnetic-element"
										style={{ height: '100px' }}
										onMouseEnter={(e) => {
											e.currentTarget.style.transform = 'perspective(800px) rotateY(10deg) scale(1.05)'
											e.currentTarget.style.boxShadow = `0 10px 30px ${brandColors.talent.primary}25`
										}}
										onMouseLeave={(e) => {
											e.currentTarget.style.transform = 'perspective(800px) rotateY(0deg) scale(1)'
											e.currentTarget.style.boxShadow = 'none'
										}}
									>
										<img
											src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80"
											alt="Tech talent searching and applying for jobs"
											className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
										/>
										<div className="absolute inset-0 bg-gradient-to-br from-blue-600/40 to-transparent"></div>
										<div className="absolute bottom-3 left-3 text-white">
											<div className="text-xs font-bold">👨‍💻 Talent Search</div>
											<div className="text-xs opacity-70">Find Jobs</div>
										</div>
										<div className="absolute top-2 right-2 w-4 h-4 rounded-full" 
											style={{ backgroundColor: brandColors.talent.primary }}></div>
									</div>

									{/* TEAM SIDE - Company Hiring */}
									<div className="relative overflow-hidden rounded-xl group cursor-pointer magnetic-element"
										style={{ height: '100px' }}
										onMouseEnter={(e) => {
											e.currentTarget.style.transform = 'perspective(800px) rotateY(-10deg) scale(1.05)'
											e.currentTarget.style.boxShadow = `0 10px 30px ${brandColors.teams.primary}25`
										}}
										onMouseLeave={(e) => {
											e.currentTarget.style.transform = 'perspective(800px) rotateY(0deg) scale(1)'
											e.currentTarget.style.boxShadow = 'none'
										}}
									>
										<img
											src="https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=600&q=80"
											alt="Companies conducting interviews and hiring process"
											className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
										/>
										<div className="absolute inset-0 bg-gradient-to-br from-orange-600/40 to-transparent"></div>
										<div className="absolute bottom-3 left-3 text-white">
											<div className="text-xs font-bold">🏢 Company Hiring</div>
											<div className="text-xs opacity-70">Find Best Talent</div>
										</div>
										<div className="absolute top-2 right-2 w-4 h-4 rounded-full" 
											style={{ backgroundColor: brandColors.teams.primary }}></div>
									</div>

									{/* TALENT SIDE - Career Growth */}
									<div className="relative overflow-hidden rounded-xl group cursor-pointer magnetic-element"
										style={{ height: '100px' }}
										onMouseEnter={(e) => {
											e.currentTarget.style.transform = 'perspective(800px) rotateX(10deg) scale(1.05)'
											e.currentTarget.style.boxShadow = `0 10px 30px ${brandColors.talent.primary}25`
										}}
										onMouseLeave={(e) => {
											e.currentTarget.style.transform = 'perspective(800px) rotateX(0deg) scale(1)'
											e.currentTarget.style.boxShadow = 'none'
										}}
									>
										<img
											src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80"
											alt="Professional career advancement and skill development"
											className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
										/>
										<div className="absolute inset-0 bg-gradient-to-br from-blue-600/40 to-transparent"></div>
										<div className="absolute bottom-2 left-2 text-white">
											<div className="text-xs font-bold">📈 Career Growth</div>
										</div>
										<div className="absolute top-2 right-2 w-4 h-4 rounded-full" 
											style={{ backgroundColor: brandColors.talent.primary }}></div>
									</div>

									{/* TEAM SIDE - Team Building */}
									<div className="relative overflow-hidden rounded-xl group cursor-pointer magnetic-element"
										style={{ height: '100px' }}
										onMouseEnter={(e) => {
											e.currentTarget.style.transform = 'perspective(800px) rotateX(10deg) scale(1.05)'
											e.currentTarget.style.boxShadow = `0 10px 30px ${brandColors.teams.primary}25`
										}}
										onMouseLeave={(e) => {
											e.currentTarget.style.transform = 'perspective(800px) rotateX(0deg) scale(1)'
											e.currentTarget.style.boxShadow = 'none'
										}}
									>
										<img
											src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80"
											alt="Building successful tech teams and collaboration"
											className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
										/>
										<div className="absolute inset-0 bg-gradient-to-br from-orange-600/40 to-transparent"></div>
										<div className="absolute bottom-2 left-2 text-white">
											<div className="text-xs font-bold">👥 Build Teams</div>
										</div>
										<div className="absolute top-2 right-2 w-4 h-4 rounded-full" 
											style={{ backgroundColor: brandColors.teams.primary }}></div>
									</div>

																	</div>

								{/* Enhanced Stats for DACH Tech Market */}
								<div className="grid grid-cols-3 gap-6 pt-6 border-t border-dashed" style={{ borderColor: `${colors.border}60` }}>
									{[
										{ value: '15K+', label: 'EU Tech Professionals', color: brandColors.talent.primary, icon: '👨‍💻', type: 'talent' },
										{ value: '1k+', label: 'German & Swiss Companies', color: brandColors.teams.primary, icon: '🏢', type: 'teams' },
										{ value: '€70k', label: 'Avg Salary', color: brandColors.teams.secondary, icon: '💰', type: 'general' }
									].map((stat, index) => (
										<div key={index} className="text-center p-4 rounded-lg group hover:scale-105 transition-all duration-300 cursor-pointer magnetic-element"
											style={{ 
												background: `${stat.color}05`,
												border: `1px solid ${stat.color}20`,
												transform: `perspective(500px) rotateX(${Math.sin(Date.now() * 0.002 + index) * 3}deg)`,
												boxShadow: `0 4px 15px ${stat.color}20`
											}}>
											<div className="text-2xl mb-2 group-hover:animate-bounce">{stat.icon}</div>
											<div className="text-3xl font-bold bg-gradient-to-r bg-clip-text text-transparent" 
												style={{ 
													backgroundImage: `linear-gradient(45deg, ${stat.color}, ${stat.color}CC)`,
													textShadow: `0 0 15px ${stat.color}30`
												}}>{stat.value}</div>
											<div className="text-sm font-medium mt-1" style={{ color: colors.text.secondary }}>{stat.label}</div>
										</div>
									))}
								</div>
							</div>

							{/* Advanced Floating Elements with Holographic Effects */}
							<div className="absolute -top-6 -right-6 w-20 h-20 rounded-full flex items-center justify-center shadow-2xl animate-bounce group cursor-pointer magnetic-element" 
								style={{ 
									background: `linear-gradient(135deg, ${mainColors.primary}, ${mainColors.primary}CC)`,
									boxShadow: `0 8px 25px ${mainColors.primary}40`,
									transform: `perspective(800px) rotateX(${Math.sin(Date.now() * 0.002) * 10}deg) rotateY(${Math.cos(Date.now() * 0.002) * 10}deg)`
								}}>
								<Code className="w-10 h-10 text-white group-hover:rotate-12 transition-transform" />
								{/* Holographic rings */}
								<div className="absolute inset-0 rounded-full border-2 border-dashed animate-spin border-white/30" style={{ animationDuration: '3s' }}></div>
								<div className="absolute inset-2 rounded-full border animate-ping border-white/20"></div>
								<div className="absolute -top-2 left-1/2 w-3 h-3 rounded-full bg-white animate-ping"></div>
						</div>
						
							<div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full flex items-center justify-center shadow-2xl group cursor-pointer magnetic-element" 
								style={{ 
									background: `linear-gradient(135deg, ${mainColors.secondary}, ${mainColors.secondary}CC)`,
									boxShadow: `0 6px 20px ${mainColors.secondary}40`,
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
									background: `linear-gradient(135deg, ${brandColors.teams.primary}60, ${brandColors.teams.secondary}60)`,
									animationDelay: '1s',
									boxShadow: `0 4px 12px ${brandColors.teams.primary}30`
								}}></div>
							<div className="absolute bottom-1/3 -right-3 w-4 h-4 rounded-full animate-float magnetic-element"
								style={{ 
									background: `linear-gradient(135deg, ${brandColors.talent.primary}60, ${brandColors.talent.secondary}60)`,
									animationDelay: '2s',
									boxShadow: `0 3px 10px ${brandColors.talent.primary}30`
								}}></div>
							
							{/* Additional micro-interactions */}
							<div className="absolute top-1/2 right-0 w-2 h-2 rounded-full animate-ping"
								style={{ 
									backgroundColor: brandColors.teams.primary,
									animationDelay: '3s'
								}}></div>
							<div className="absolute bottom-1/4 left-0 w-3 h-3 rounded-full animate-pulse"
								style={{ 
									backgroundColor: brandColors.teams.secondary,
									animationDelay: '2.5s'
								}}></div>
							{/* Extra team color elements */}
							<div className="absolute top-10 right-10 w-2 h-2 rounded-full animate-bounce"
								style={{ 
									backgroundColor: brandColors.teams.tertiary,
									animationDelay: '1.8s',
									boxShadow: `0 0 8px ${brandColors.teams.tertiary}40`
								}}></div>
							<div className="absolute bottom-10 left-10 w-4 h-4 rounded-full animate-pulse"
								style={{ 
									backgroundColor: brandColors.teams.primary,
									animationDelay: '2.2s',
									boxShadow: `0 0 12px ${brandColors.teams.primary}50`
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