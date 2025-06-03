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
	Award
} from 'lucide-react'

function HeroSection() {
	const { t } = useTranslation()
	const { isTeamsVariant } = useBrand()
	const colors = useBrandColors()
	const [isVideoPlaying, setIsVideoPlaying] = useState(false)
	const [activeFeature, setActiveFeature] = useState(0)
	const [activeTab, setActiveTab] = useState('talent')

	const features = [
		{ icon: Brain, text: 'AI-Powered Matching', stat: '95%' },
		{ icon: Shield, text: 'GDPR Compliant', stat: '100%' },
		{ icon: Globe, text: 'Global Network', stat: '50+' },
		{ icon: TrendingUp, text: 'Career Growth', stat: '+65%' }
	]

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
			
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-6 relative z-10">
				{/* Creative Asymmetrical Layout */}
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
					{/* Left Content - Takes 7 columns */}
					<div className="lg:col-span-7 text-center lg:text-left space-y-4 relative">
						{/* Floating Badge with Animation */}
						<div className="relative">
							<div className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 backdrop-blur-sm relative z-10 group" 
								style={{ 
									background: `linear-gradient(135deg, ${colors.primary}15, ${colors.secondary}10)`,
									borderColor: `${colors.primary}40`,
									color: colors.primary,
									boxShadow: `0 8px 32px ${colors.primary}20`
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

						{/* Split Headline with Creative Typography */}
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
							
							{/* Creative description with highlight boxes */}
							<div className="relative">
								<BrandedP className="text-lg lg:text-xl leading-relaxed relative z-10" style={{ color: colors.text.secondary }}>
									Join thousands of developers, engineers, and data scientists who discovered their dream jobs 
									through our AI-powered platform.
								</BrandedP>
								
								{/* Floating highlight cards */}
								<div className="flex flex-wrap gap-3 mt-4">
									{['Upload CV', 'AI Matching', 'Get Hired'].map((text, index) => (
										<div key={index} 
											className="px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 hover:scale-110 cursor-pointer"
											style={{
												background: `linear-gradient(135deg, ${index % 2 === 0 ? colors.primary : colors.secondary}20, ${index % 2 === 0 ? colors.primary : colors.secondary}10)`,
												color: index % 2 === 0 ? colors.primary : colors.secondary,
												border: `1px solid ${index % 2 === 0 ? colors.primary : colors.secondary}30`,
												animationDelay: `${index * 0.2}s`
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
									className="w-full px-6 py-4 rounded-xl text-base font-semibold transition-all duration-300 shadow-lg hover:shadow-2xl flex items-center justify-center relative overflow-hidden"
									style={{
										background: `linear-gradient(135deg, ${colors.primary}, ${colors.primary}DD)`,
										color: colors.text.inverse,
										boxShadow: `0 4px 20px ${colors.primary}40`
									}}
									onMouseEnter={(e) => {
										e.currentTarget.style.transform = 'translateY(-3px) rotateX(10deg)'
										e.currentTarget.style.boxShadow = `0 12px 40px ${colors.primary}50`
									}}
									onMouseLeave={(e) => {
										e.currentTarget.style.transform = 'translateY(0) rotateX(0deg)'
										e.currentTarget.style.boxShadow = `0 4px 20px ${colors.primary}40`
									}}
								>
									<Users className="w-5 h-5 mr-2 group-hover:animate-bounce" />
									Upload CV & Get Matched
									<ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
									{/* Ripple effect */}
									<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
								</Link>
								{/* Floating success indicator */}
								<div className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white transform group-hover:scale-125 transition-transform"
									style={{ backgroundColor: colors.success }}>
									✓
								</div>
							</div>
							
							<div className="relative group flex-1">
								<Link
									to="/register/team"
									className="w-full px-6 py-4 rounded-xl text-base font-semibold transition-all duration-300 flex items-center justify-center border-2 relative overflow-hidden backdrop-blur-sm"
									style={{
										background: `linear-gradient(135deg, ${colors.secondary}10, ${colors.secondary}05)`,
										borderColor: colors.secondary,
										color: colors.secondary,
										boxShadow: `0 4px 20px ${colors.secondary}30`
									}}
									onMouseEnter={(e) => {
										e.currentTarget.style.background = `linear-gradient(135deg, ${colors.secondary}, ${colors.secondary}DD)`
										e.currentTarget.style.color = colors.text.inverse
										e.currentTarget.style.transform = 'translateY(-2px) rotateX(-5deg)'
										e.currentTarget.style.boxShadow = `0 8px 30px ${colors.secondary}50`
									}}
									onMouseLeave={(e) => {
										e.currentTarget.style.background = `linear-gradient(135deg, ${colors.secondary}10, ${colors.secondary}05)`
										e.currentTarget.style.color = colors.secondary
										e.currentTarget.style.transform = 'translateY(0) rotateX(0deg)'
										e.currentTarget.style.boxShadow = `0 4px 20px ${colors.secondary}30`
									}}
								>
									<Zap className="w-5 h-5 mr-2 group-hover:animate-pulse" />
									Find Top Talent
									{/* Sparkle effect */}
									<div className="absolute top-1 right-1 w-2 h-2 rounded-full animate-ping"
										style={{ backgroundColor: colors.secondary, animationDelay: '1s' }}></div>
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

					{/* Right Dashboard - Takes 5 columns */}
					<div className="lg:col-span-5 relative">
						{/* Floating dashboard with tilt effect */}
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
										background: `linear-gradient(135deg, ${colors.primary}10, transparent, ${colors.secondary}15)`
									}}></div>
							</div>

							{/* Enhanced Main Dashboard Card */}
							<div 
								className="rounded-2xl shadow-2xl p-6 transform hover:scale-105 transition-all duration-500 relative z-10 backdrop-blur-sm border group"
								style={{ 
									background: `linear-gradient(135deg, ${colors.background}F0, ${colors.surface}E0)`,
									borderColor: `${colors.border}40`,
									boxShadow: `0 20px 60px ${colors.primary}20, 0 8px 25px rgba(0,0,0,0.1)`
								}}
							>
								{/* Floating corner decorations */}
								<div className="absolute -top-3 -left-3 w-6 h-6 rounded-full animate-pulse"
									style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})` }}></div>
								<div className="absolute -top-2 -right-2 w-4 h-4 rounded-full animate-bounce"
									style={{ backgroundColor: colors.secondary, animationDelay: '0.5s' }}></div>

								{/* Enhanced Dashboard Tabs with Creative Design */}
								<div className="flex items-center gap-2 mb-6 relative">
									{/* Tab indicator background */}
									<div className="absolute inset-0 rounded-lg opacity-20" 
										style={{ background: `linear-gradient(135deg, ${colors.primary}10, ${colors.secondary}10)` }}></div>
									
									<button
										onClick={() => setActiveTab('talent')}
										className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 relative overflow-hidden group ${
											activeTab === 'talent' ? 'shadow-lg transform scale-105' : ''
										}`}
										style={{
											background: activeTab === 'talent' 
												? `linear-gradient(135deg, ${colors.primary}, ${colors.primary}CC)` 
												: `${colors.surface}80`,
											color: activeTab === 'talent' ? 'white' : colors.text.secondary,
											boxShadow: activeTab === 'talent' ? `0 4px 15px ${colors.primary}40` : 'none'
										}}
									>
										<span className="relative z-10 flex items-center gap-2">
											👨‍💼 For Talent
										</span>
										{activeTab === 'talent' && (
											<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
										)}
										{/* Floating notification dot */}
										<div className="absolute -top-1 -right-1 w-3 h-3 rounded-full animate-ping"
											style={{ backgroundColor: colors.success, opacity: activeTab === 'talent' ? 1 : 0 }}></div>
									</button>
									
									<button
										onClick={() => setActiveTab('teams')}
										className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 relative overflow-hidden group ${
											activeTab === 'teams' ? 'shadow-lg transform scale-105' : ''
										}`}
										style={{
											background: activeTab === 'teams' 
												? `linear-gradient(135deg, ${colors.secondary}, ${colors.secondary}CC)` 
												: `${colors.surface}80`,
											color: activeTab === 'teams' ? 'white' : colors.text.secondary,
											boxShadow: activeTab === 'teams' ? `0 4px 15px ${colors.secondary}40` : 'none'
										}}
									>
										<span className="relative z-10 flex items-center gap-2">
											🏢 For Teams
										</span>
										{activeTab === 'teams' && (
											<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
										)}
										{/* Floating notification dot */}
										<div className="absolute -top-1 -right-1 w-3 h-3 rounded-full animate-ping"
											style={{ backgroundColor: colors.success, opacity: activeTab === 'teams' ? 1 : 0 }}></div>
									</button>
								</div>

								{/* Enhanced Dashboard Header with Morphing Design */}
								<div className="flex items-center justify-between mb-6 p-4 rounded-xl relative overflow-hidden group" 
									style={{ 
										background: `linear-gradient(135deg, ${activeTab === 'talent' ? colors.primary : colors.secondary}08, ${activeTab === 'talent' ? colors.primary : colors.secondary}15)`
									}}>
									{/* Animated background pattern */}
									<div className="absolute inset-0 opacity-10" 
										style={{
											backgroundImage: `radial-gradient(circle at 20% 50%, ${activeTab === 'talent' ? colors.primary : colors.secondary}30 0%, transparent 50%), radial-gradient(circle at 80% 20%, ${activeTab === 'talent' ? colors.primary : colors.secondary}20 0%, transparent 50%)`,
											animation: 'backgroundMove 4s ease-in-out infinite'
										}}></div>
									
									<div className="flex items-center gap-3 relative z-10">
										<div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg relative group" 
											style={{ 
												background: `linear-gradient(135deg, ${activeTab === 'talent' ? colors.primary : colors.secondary}, ${activeTab === 'talent' ? colors.primary : colors.secondary}CC)`,
												boxShadow: `0 4px 15px ${activeTab === 'talent' ? colors.primary : colors.secondary}40`
											}}>
											<Brain className="w-6 h-6 text-white group-hover:rotate-12 transition-transform" />
											{/* Pulsing ring */}
											<div className="absolute inset-0 rounded-xl border-2 animate-ping"
												style={{ borderColor: `${activeTab === 'talent' ? colors.primary : colors.secondary}60` }}></div>
										</div>
										<div>
											<h3 className="font-bold text-lg transition-colors duration-300" style={{ color: colors.text.primary }}>
												{activeTab === 'talent' ? '🎯 AI Career Dashboard' : '🔍 Talent Acquisition Hub'}
											</h3>
											<p className="text-sm transition-colors duration-300" style={{ color: colors.text.secondary }}>
												{activeTab === 'talent' ? 'Real-time job matching & insights' : 'Smart talent sourcing & analytics'}
											</p>
										</div>
									</div>
									
									<div className="flex items-center gap-2 px-3 py-2 rounded-full relative" 
										style={{ 
											background: `linear-gradient(135deg, ${activeTab === 'talent' ? colors.primary : colors.secondary}20, ${activeTab === 'talent' ? colors.primary : colors.secondary}10)`
										}}>
										<div className="w-2 h-2 rounded-full animate-pulse relative" 
											style={{ 
												backgroundColor: activeTab === 'talent' ? colors.primary : colors.secondary,
												boxShadow: `0 0 8px ${activeTab === 'talent' ? colors.primary : colors.secondary}60`
											}}>
											{/* Ripple effect */}
											<div className="absolute inset-0 rounded-full animate-ping"
												style={{ backgroundColor: activeTab === 'talent' ? colors.primary : colors.secondary }}></div>
										</div>
										<span className="text-sm font-medium" 
											style={{ color: activeTab === 'talent' ? colors.primary : colors.secondary }}>Live Updates</span>
									</div>
								</div>

								{/* Dashboard Content with Creative Transitions */}
								<div className="relative overflow-hidden">
									{activeTab === 'talent' ? (
										<div className="space-y-4 mb-6 animate-in slide-in-from-left duration-500">
											{/* Enhanced Job Matches for Talent */}
											{[
												{ 
													role: 'Senior React Developer', 
													company: 'TechCorp Berlin', 
													salary: '€75-95k', 
													match: '98%', 
													tech: 'React',
													color: colors.primary,
													trending: true
												},
												{ 
													role: 'DevOps Engineer', 
													company: 'ScaleUp Zurich', 
													salary: '€85-110k', 
													match: '94%', 
													tech: 'K8s',
													color: colors.secondary,
													trending: false
												},
												{ 
													role: 'ML Engineer', 
													company: 'AI Startup Munich', 
													salary: '€80-100k', 
													match: '91%', 
													tech: 'Python',
													color: colors.primary,
													trending: true
												}
											].map((job, index) => (
												<div 
													key={index}
													className="flex items-center justify-between p-4 rounded-xl border-l-4 hover:shadow-lg transition-all duration-300 group cursor-pointer relative overflow-hidden"
													style={{
														background: `linear-gradient(135deg, ${job.color}08, ${job.color}03)`,
														borderLeftColor: job.color,
														boxShadow: `0 2px 10px ${job.color}15`,
														animationDelay: `${index * 0.1}s`
													}}
													onMouseEnter={(e) => {
														e.currentTarget.style.transform = 'translateX(8px) scale(1.02)'
														e.currentTarget.style.boxShadow = `0 8px 25px ${job.color}25`
													}}
													onMouseLeave={(e) => {
														e.currentTarget.style.transform = 'translateX(0) scale(1)'
														e.currentTarget.style.boxShadow = `0 2px 10px ${job.color}15`
													}}
												>
													{/* Trending indicator */}
													{job.trending && (
														<div className="absolute top-2 right-2 w-2 h-2 rounded-full animate-pulse"
															style={{ backgroundColor: colors.success }}></div>
													)}
													
													<div className="flex items-center gap-3">
														<div 
															className="w-12 h-12 rounded-xl flex items-center justify-center text-xs font-bold text-white shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-transform relative"
															style={{ 
																background: `linear-gradient(135deg, ${job.color}, ${job.color}CC)`,
																boxShadow: `0 4px 15px ${job.color}40`
															}}
														>
															{job.tech}
															{/* Shine effect */}
															<div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 group-hover:animate-pulse"></div>
														</div>
														<div>
															<p className="font-semibold flex items-center gap-2" style={{ color: colors.text.primary }}>
																{job.role}
																{job.trending && <span className="text-xs">🔥</span>}
															</p>
															<p className="text-sm" style={{ color: colors.text.secondary }}>{job.company} • {job.salary}</p>
														</div>
													</div>
													<div className="text-right">
														<div className="text-xl font-bold group-hover:scale-110 transition-transform" 
															style={{ 
																color: job.color,
																textShadow: `0 0 10px ${job.color}30`
															}}>{job.match}</div>
														<div className="text-xs" style={{ color: colors.text.secondary }}>Match</div>
													</div>
												</div>
											))}

											{/* Enhanced Stats for Talent */}
											<div className="grid grid-cols-3 gap-4 pt-4 border-t border-dashed" style={{ borderColor: `${colors.border}60` }}>
												{[
													{ value: '25K+', label: 'Active Jobs', color: colors.primary, icon: '💼' },
													{ value: '8.5K+', label: 'Companies', color: colors.secondary, icon: '🏢' },
													{ value: '€85k', label: 'Avg Salary', color: colors.primary, icon: '💰' }
												].map((stat, index) => (
													<div key={index} className="text-center p-3 rounded-lg group hover:scale-105 transition-all duration-300 cursor-pointer"
														style={{ 
															background: `${stat.color}05`,
															border: `1px solid ${stat.color}20`
														}}>
														<div className="text-lg mb-1">{stat.icon}</div>
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
									) : (
										<div className="space-y-4 mb-6 animate-in slide-in-from-right duration-500">
											{/* Enhanced Candidate Matches for Teams */}
											{[
												{ 
													name: 'Sarah M.', 
													role: 'Senior React Developer', 
													experience: '5+ years', 
													match: '97%', 
													tech: 'React',
													color: colors.secondary,
													status: 'Available',
													rating: 5
												},
												{ 
													name: 'Marcus K.', 
													role: 'DevOps Engineer', 
													experience: '4+ years', 
													match: '95%', 
													tech: 'AWS',
													color: colors.primary,
													status: 'Open to offers',
													rating: 4
												},
												{ 
													name: 'Anna L.', 
													role: 'Data Scientist', 
													experience: '6+ years', 
													match: '93%', 
													tech: 'ML',
													color: colors.secondary,
													status: 'Available',
													rating: 5
												}
											].map((candidate, index) => (
												<div 
													key={index}
													className="flex items-center justify-between p-4 rounded-xl border-l-4 hover:shadow-lg transition-all duration-300 group cursor-pointer relative overflow-hidden"
													style={{
														background: `linear-gradient(135deg, ${candidate.color}08, ${candidate.color}03)`,
														borderLeftColor: candidate.color,
														boxShadow: `0 2px 10px ${candidate.color}15`,
														animationDelay: `${index * 0.1}s`
													}}
													onMouseEnter={(e) => {
														e.currentTarget.style.transform = 'translateX(8px) scale(1.02)'
														e.currentTarget.style.boxShadow = `0 8px 25px ${candidate.color}25`
													}}
													onMouseLeave={(e) => {
														e.currentTarget.style.transform = 'translateX(0) scale(1)'
														e.currentTarget.style.boxShadow = `0 2px 10px ${candidate.color}15`
													}}
												>
													<div className="flex items-center gap-3">
														<div 
															className="w-12 h-12 rounded-xl flex items-center justify-center text-xs font-bold text-white shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-transform relative"
															style={{ 
																background: `linear-gradient(135deg, ${candidate.color}, ${candidate.color}CC)`,
																boxShadow: `0 4px 15px ${candidate.color}40`
															}}
														>
															{candidate.tech}
															{/* Star rating overlay */}
															<div className="absolute -top-1 -right-1 text-yellow-400 text-xs">
																{'⭐'.repeat(candidate.rating)}
															</div>
														</div>
														<div>
															<p className="font-semibold flex items-center gap-2" style={{ color: colors.text.primary }}>
																{candidate.name}
																<span className="text-xs">👤</span>
															</p>
															<p className="text-sm" style={{ color: colors.text.secondary }}>{candidate.role} • {candidate.experience}</p>
															<span className="text-xs px-3 py-1 rounded-full font-medium" 
																style={{ 
																	background: `linear-gradient(135deg, ${colors.success}20, ${colors.success}10)`, 
																	color: colors.success,
																	boxShadow: `0 2px 8px ${colors.success}20`
																}}>
																✅ {candidate.status}
															</span>
														</div>
													</div>
													<div className="text-right">
														<div className="text-xl font-bold group-hover:scale-110 transition-transform" 
															style={{ 
																color: candidate.color,
																textShadow: `0 0 10px ${candidate.color}30`
															}}>{candidate.match}</div>
														<div className="text-xs" style={{ color: colors.text.secondary }}>Match</div>
													</div>
												</div>
											))}

											{/* Enhanced Stats for Teams */}
											<div className="grid grid-cols-3 gap-4 pt-4 border-t border-dashed" style={{ borderColor: `${colors.border}60` }}>
												{[
													{ value: '75K+', label: 'Candidates', color: colors.secondary, icon: '👥' },
													{ value: '3.2K+', label: 'Available', color: colors.primary, icon: '✅' },
													{ value: '48h', label: 'Avg Response', color: colors.secondary, icon: '⚡' }
												].map((stat, index) => (
													<div key={index} className="text-center p-3 rounded-lg group hover:scale-105 transition-all duration-300 cursor-pointer"
														style={{ 
															background: `${stat.color}05`,
															border: `1px solid ${stat.color}20`
														}}>
														<div className="text-lg mb-1">{stat.icon}</div>
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
									)}
								</div>
							</div>

							{/* Enhanced Floating Elements with More Creativity */}
							<div className="absolute -top-6 -right-6 w-20 h-20 rounded-full flex items-center justify-center shadow-2xl animate-bounce group cursor-pointer" 
								style={{ 
									background: `linear-gradient(135deg, ${activeTab === 'talent' ? colors.secondary : colors.primary}, ${activeTab === 'talent' ? colors.secondary : colors.primary}CC)`,
									boxShadow: `0 8px 25px ${activeTab === 'talent' ? colors.secondary : colors.primary}40`
								}}>
								<Award className="w-10 h-10 text-white group-hover:rotate-12 transition-transform" />
								{/* Orbiting elements */}
								<div className="absolute inset-0 rounded-full border-2 border-dashed animate-spin border-white/30" style={{ animationDuration: '3s' }}></div>
								<div className="absolute -top-2 left-1/2 w-3 h-3 rounded-full bg-white animate-ping"></div>
							</div>
							
							<div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full flex items-center justify-center shadow-2xl group cursor-pointer" 
								style={{ 
									background: `linear-gradient(135deg, ${activeTab === 'talent' ? colors.primary : colors.secondary}, ${activeTab === 'talent' ? colors.primary : colors.secondary}CC)`,
									boxShadow: `0 6px 20px ${activeTab === 'talent' ? colors.primary : colors.secondary}40`
								}}>
								<TrendingUp className="w-8 h-8 text-white group-hover:scale-110 transition-transform" />
								{/* Pulsing ring */}
								<div className="absolute inset-0 rounded-full border-2 animate-pulse border-white/40"></div>
							</div>

							{/* Additional floating decorative elements */}
							<div className="absolute top-1/4 -left-2 w-6 h-6 rounded-full animate-float"
								style={{ 
									background: `linear-gradient(135deg, ${colors.primary}60, ${colors.secondary}60)`,
									animationDelay: '1s'
								}}></div>
							<div className="absolute bottom-1/3 -right-3 w-4 h-4 rounded-full animate-float"
								style={{ 
									background: `linear-gradient(135deg, ${colors.secondary}60, ${colors.primary}60)`,
									animationDelay: '2s'
								}}></div>
						</div>
					</div>
				</div>
			</div>

			{/* Custom Animations */}
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
					.animate-float {
						animation: animate-float 3s ease-in-out infinite;
					}
				`
			}} />
		</BrandedSection>
	)
}

export default HeroSection 