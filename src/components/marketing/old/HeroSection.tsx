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
			{/* Modern Gradient Background */}
			<div 
				className="absolute inset-0"
				style={{
					background: `
						linear-gradient(135deg, ${colors.primary}15 0%, ${colors.secondary}10 25%, ${colors.background} 50%, ${colors.primary}05 75%, ${colors.secondary}15 100%),
						radial-gradient(circle at 20% 20%, ${colors.primary}20 0%, transparent 50%),
						radial-gradient(circle at 80% 80%, ${colors.secondary}20 0%, transparent 50%)
					`
				}}
			/>

			{/* Animated Background Elements */}
			<div className="absolute inset-0">
				<div className="absolute top-20 left-10 w-2 h-2 rounded-full opacity-30 animate-pulse" style={{ backgroundColor: colors.primary }}></div>
				<div className="absolute top-40 right-20 w-3 h-3 rounded-full opacity-20 animate-bounce" style={{ backgroundColor: colors.secondary }}></div>
				<div className="absolute bottom-40 left-20 w-4 h-4 rounded-full opacity-25 animate-pulse" style={{ backgroundColor: colors.primary }}></div>
				<div className="absolute bottom-20 right-40 w-2 h-2 rounded-full opacity-30 animate-bounce" style={{ backgroundColor: colors.secondary }}></div>
			</div>
			
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-6 relative z-10">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
					{/* Content */}
					<div className="text-center lg:text-left space-y-4">
						{/* Badge */}
						<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border" 
							style={{ 
								backgroundColor: `${colors.primary}10`,
								borderColor: `${colors.primary}30`,
								color: colors.primary
							}}>
							<Star className="w-4 h-4 fill-current" />
							<span className="text-sm font-medium">AI-Powered Tech Recruitment Platform</span>
						</div>

						{/* Main Headline */}
						<div>
							<BrandedH1 className="text-4xl lg:text-6xl font-bold leading-tight mb-4">
								Find Your Perfect
								<BrandedSpan 
									className="block bg-gradient-to-r bg-clip-text text-transparent"
									style={{
										backgroundImage: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})`
									}}
								>
									Tech Career
								</BrandedSpan>
								in Minutes
							</BrandedH1>
							<BrandedP className="text-lg lg:text-xl leading-relaxed" style={{ color: colors.text.secondary }}>
								Join thousands of developers, engineers, and data scientists who discovered their dream jobs 
								through our AI-powered platform. <strong>Upload your CV</strong> and get matched with opportunities 
								that align perfectly with your skills and career goals.
							</BrandedP>
						</div>

						{/* Professional Image */}
						<div className="relative rounded-2xl overflow-hidden shadow-lg">
							<img
								src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
								alt="Diverse tech team collaborating on projects"
								className="w-full h-48 object-cover"
							/>
							<div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60"></div>
							<div className="absolute bottom-4 left-4 text-white">
								<p className="text-sm font-medium">Join 75K+ Tech Professionals</p>
								<p className="text-xs opacity-90">Building the future of technology</p>
							</div>
						</div>

						{/* Key Features Showcase */}
						<div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
							{features.map((feature, index) => {
								const Icon = feature.icon
								const isActive = index === activeFeature
								return (
									<div 
										key={index}
										className={`p-3 rounded-xl transition-all duration-500 ${isActive ? 'scale-105 shadow-lg' : ''}`}
										style={{
											backgroundColor: isActive ? `${colors.primary}15` : colors.surface,
											borderLeft: isActive ? `4px solid ${colors.primary}` : '4px solid transparent'
										}}
									>
										<Icon 
											className={`w-6 h-6 mb-2 transition-colors duration-300`} 
											style={{ 
												color: isActive ? colors.primary : colors.text.secondary 
											}} 
										/>
										<div className="text-xl font-bold" style={{ color: colors.primary }}>
											{feature.stat}
										</div>
										<div className="text-xs font-medium" style={{ color: colors.text.secondary }}>
											{feature.text}
										</div>
									</div>
								)
							})}
						</div>
						
						{/* CTA Buttons */}
						<div className="flex flex-col sm:flex-row gap-4">
							<Link
								to="/register/talent"
								className="group px-6 py-3 rounded-xl text-base font-semibold transition-all duration-300 shadow-lg hover:shadow-2xl flex items-center justify-center relative overflow-hidden"
								style={{
									backgroundColor: colors.primary,
									color: colors.text.inverse
								}}
								onMouseEnter={(e) => {
									e.currentTarget.style.transform = 'translateY(-2px)'
								}}
								onMouseLeave={(e) => {
									e.currentTarget.style.transform = 'translateY(0)'
								}}
							>
								<Users className="w-5 h-5 mr-2" />
								Upload CV & Get Matched
								<ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
								<div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
							</Link>
							<Link
								to="/register/team"
								className="group px-6 py-3 rounded-xl text-base font-semibold transition-all duration-300 flex items-center justify-center border-2 relative overflow-hidden"
								style={{
									borderColor: colors.secondary,
									color: colors.secondary,
									backgroundColor: 'transparent'
								}}
								onMouseEnter={(e) => {
									e.currentTarget.style.backgroundColor = colors.secondary
									e.currentTarget.style.color = colors.text.inverse
									e.currentTarget.style.transform = 'translateY(-2px)'
								}}
								onMouseLeave={(e) => {
									e.currentTarget.style.backgroundColor = 'transparent'
									e.currentTarget.style.color = colors.secondary
									e.currentTarget.style.transform = 'translateY(0)'
								}}
							>
								<Zap className="w-5 h-5 mr-2" />
								Find Top Talent
							</Link>
						</div>
						
						{/* Trust Indicators */}
						<div className="flex flex-wrap items-center gap-4 pt-6 border-t" style={{ borderColor: colors.border }}>
							<div className="flex items-center gap-2">
								<CheckCircle className="w-4 h-4" style={{ color: colors.secondary }} />
								<span className="text-sm font-medium" style={{ color: colors.text.secondary }}>
									75K+ Tech Professionals
								</span>
							</div>
							<div className="flex items-center gap-2">
								<CheckCircle className="w-4 h-4" style={{ color: colors.secondary }} />
								<span className="text-sm font-medium" style={{ color: colors.text.secondary }}>
									5K+ Partner Companies
								</span>
							</div>
							<div className="flex items-center gap-2">
								<CheckCircle className="w-4 h-4" style={{ color: colors.secondary }} />
								<span className="text-sm font-medium" style={{ color: colors.text.secondary }}>
									95% Satisfaction Rate
								</span>
							</div>
						</div>
					</div>

					{/* Hero Visual */}
					<div className="relative">
						{/* Background Image */}
						<div className="absolute inset-0 rounded-2xl overflow-hidden">
							<img
								src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80"
								alt="Modern tech workspace with monitors and code"
								className="w-full h-full object-cover opacity-10"
							/>
						</div>

						{/* Main Dashboard Card */}
						<div 
							className="rounded-2xl shadow-2xl p-6 transform hover:scale-105 transition-all duration-500 relative z-10"
							style={{ backgroundColor: colors.background }}
						>
							{/* Dashboard Tabs */}
							<div className="flex items-center gap-2 mb-6">
								<button
									onClick={() => setActiveTab('talent')}
									className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
										activeTab === 'talent' ? 'shadow-md' : ''
									}`}
									style={{
										backgroundColor: activeTab === 'talent' ? colors.primary : colors.surface,
										color: activeTab === 'talent' ? 'white' : colors.text.secondary
									}}
								>
									For Talent
								</button>
								<button
									onClick={() => setActiveTab('teams')}
									className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
										activeTab === 'teams' ? 'shadow-md' : ''
									}`}
									style={{
										backgroundColor: activeTab === 'teams' ? colors.secondary : colors.surface,
										color: activeTab === 'teams' ? 'white' : colors.text.secondary
									}}
								>
									For Teams
								</button>
							</div>

							{/* Dashboard Header */}
							<div className="flex items-center justify-between mb-6">
								<div className="flex items-center gap-3">
									<div className="w-10 h-10 rounded-lg flex items-center justify-center" 
										style={{ backgroundColor: activeTab === 'talent' ? colors.primary : colors.secondary }}>
										<Brain className="w-6 h-6 text-white" />
									</div>
									<div>
										<h3 className="font-bold" style={{ color: colors.text.primary }}>
											{activeTab === 'talent' ? 'AI Career Dashboard' : 'Talent Acquisition Dashboard'}
										</h3>
										<p className="text-sm" style={{ color: colors.text.secondary }}>
											{activeTab === 'talent' ? 'Real-time job matching' : 'Smart talent sourcing'}
										</p>
									</div>
								</div>
								<div className="flex items-center gap-2">
									<div className="w-2 h-2 rounded-full animate-pulse" 
										style={{ backgroundColor: activeTab === 'talent' ? colors.primary : colors.secondary }}></div>
									<span className="text-sm font-medium" 
										style={{ color: activeTab === 'talent' ? colors.primary : colors.secondary }}>Live</span>
								</div>
							</div>

							{/* Dashboard Content */}
							{activeTab === 'talent' ? (
								<>
									{/* Job Matches for Talent */}
									<div className="space-y-4 mb-6">
										{[
											{ 
												role: 'Senior React Developer', 
												company: 'TechCorp Berlin', 
												salary: '€75-95k', 
												match: '98%', 
												tech: 'React',
												color: colors.primary
											},
											{ 
												role: 'DevOps Engineer', 
												company: 'ScaleUp Zurich', 
												salary: '€85-110k', 
												match: '94%', 
												tech: 'K8s',
												color: colors.secondary
											},
											{ 
												role: 'ML Engineer', 
												company: 'AI Startup Munich', 
												salary: '€80-100k', 
												match: '91%', 
												tech: 'Python',
												color: colors.primary
											}
										].map((job, index) => (
											<div 
												key={index}
												className="flex items-center justify-between p-4 rounded-xl border-l-4 hover:shadow-md transition-shadow"
												style={{
													backgroundColor: `${job.color}08`,
													borderLeftColor: job.color
												}}
											>
												<div className="flex items-center gap-3">
													<div 
														className="w-10 h-10 rounded-lg flex items-center justify-center text-xs font-bold text-white"
														style={{ backgroundColor: job.color }}
													>
														{job.tech}
													</div>
													<div>
														<p className="font-semibold" style={{ color: colors.text.primary }}>{job.role}</p>
														<p className="text-sm" style={{ color: colors.text.secondary }}>{job.company} • {job.salary}</p>
													</div>
												</div>
												<div className="text-right">
													<div className="text-lg font-bold" style={{ color: job.color }}>{job.match}</div>
													<div className="text-xs" style={{ color: colors.text.secondary }}>Match</div>
												</div>
											</div>
										))}
									</div>

									{/* Stats for Talent */}
									<div className="grid grid-cols-3 gap-4 pt-4 border-t" style={{ borderColor: colors.border }}>
										<div className="text-center">
											<div className="text-2xl font-bold" style={{ color: colors.primary }}>25K+</div>
											<div className="text-xs" style={{ color: colors.text.secondary }}>Active Jobs</div>
										</div>
										<div className="text-center">
											<div className="text-2xl font-bold" style={{ color: colors.secondary }}>8.5K+</div>
											<div className="text-xs" style={{ color: colors.text.secondary }}>Companies</div>
										</div>
										<div className="text-center">
											<div className="text-2xl font-bold" style={{ color: colors.primary }}>€85k</div>
											<div className="text-xs" style={{ color: colors.text.secondary }}>Avg Salary</div>
										</div>
									</div>
								</>
							) : (
								<>
									{/* Candidate Matches for Teams */}
									<div className="space-y-4 mb-6">
										{[
											{ 
												name: 'Sarah M.', 
												role: 'Senior React Developer', 
												experience: '5+ years', 
												match: '97%', 
												tech: 'React',
												color: colors.secondary,
												status: 'Available'
											},
											{ 
												name: 'Marcus K.', 
												role: 'DevOps Engineer', 
												experience: '4+ years', 
												match: '95%', 
												tech: 'AWS',
												color: colors.primary,
												status: 'Open to offers'
											},
											{ 
												name: 'Anna L.', 
												role: 'Data Scientist', 
												experience: '6+ years', 
												match: '93%', 
												tech: 'ML',
												color: colors.secondary,
												status: 'Available'
											}
										].map((candidate, index) => (
											<div 
												key={index}
												className="flex items-center justify-between p-4 rounded-xl border-l-4 hover:shadow-md transition-shadow"
												style={{
													backgroundColor: `${candidate.color}08`,
													borderLeftColor: candidate.color
												}}
											>
												<div className="flex items-center gap-3">
													<div 
														className="w-10 h-10 rounded-lg flex items-center justify-center text-xs font-bold text-white"
														style={{ backgroundColor: candidate.color }}
													>
														{candidate.tech}
													</div>
													<div>
														<p className="font-semibold" style={{ color: colors.text.primary }}>{candidate.name}</p>
														<p className="text-sm" style={{ color: colors.text.secondary }}>{candidate.role} • {candidate.experience}</p>
														<span className="text-xs px-2 py-1 rounded-full" 
															style={{ 
																backgroundColor: `${colors.success}20`, 
																color: colors.success 
															}}>
															{candidate.status}
														</span>
													</div>
												</div>
												<div className="text-right">
													<div className="text-lg font-bold" style={{ color: candidate.color }}>{candidate.match}</div>
													<div className="text-xs" style={{ color: colors.text.secondary }}>Match</div>
												</div>
											</div>
										))}
									</div>

									{/* Stats for Teams */}
									<div className="grid grid-cols-3 gap-4 pt-4 border-t" style={{ borderColor: colors.border }}>
										<div className="text-center">
											<div className="text-2xl font-bold" style={{ color: colors.secondary }}>75K+</div>
											<div className="text-xs" style={{ color: colors.text.secondary }}>Candidates</div>
										</div>
										<div className="text-center">
											<div className="text-2xl font-bold" style={{ color: colors.primary }}>3.2K+</div>
											<div className="text-xs" style={{ color: colors.text.secondary }}>Available</div>
										</div>
										<div className="text-center">
											<div className="text-2xl font-bold" style={{ color: colors.secondary }}>48h</div>
											<div className="text-xs" style={{ color: colors.text.secondary }}>Avg Response</div>
										</div>
									</div>
								</>
							)}
						</div>

						{/* Floating Elements */}
						<div className="absolute -top-4 -right-4 w-16 h-16 rounded-full flex items-center justify-center shadow-lg animate-bounce" 
							style={{ backgroundColor: activeTab === 'talent' ? colors.secondary : colors.primary }}>
							<Award className="w-8 h-8 text-white" />
						</div>
						
						<div className="absolute -bottom-3 -left-3 w-12 h-12 rounded-full flex items-center justify-center shadow-lg" 
							style={{ backgroundColor: activeTab === 'talent' ? colors.primary : colors.secondary }}>
							<TrendingUp className="w-6 h-6 text-white" />
						</div>
					</div>
				</div>
			</div>
		</BrandedSection>
	)
}

export default HeroSection 