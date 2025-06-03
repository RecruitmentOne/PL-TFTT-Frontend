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
	Database,
	Cloud,
	Monitor,
	Smartphone,
	Layers,
	BarChart3,
	Lock,
	Timer,
	MapPin
} from 'lucide-react'

function HomePage() {
	const { t } = useTranslation()
	const { switchVariant } = useBrand()
	const colors = useBrandColors()
	const [activeStep, setActiveStep] = useState(0)
	const [countUpValues, setCountUpValues] = useState({ users: 0, accuracy: 0, companies: 0, salary: 0 })

	useEffect(() => {
		switchVariant('talent')
	}, [switchVariant])

	// Auto-animate steps
	useEffect(() => {
		const interval = setInterval(() => {
			setActiveStep((prev) => (prev + 1) % 3)
		}, 3000)
		return () => clearInterval(interval)
	}, [])

	// Count up animation for stats
	useEffect(() => {
		const targets = { users: 50, accuracy: 95, companies: 25, salary: 85 }
		const duration = 2000
		const steps = 60
		const stepTime = duration / steps

		let currentStep = 0
		const interval = setInterval(() => {
			if (currentStep <= steps) {
				const progress = currentStep / steps
				setCountUpValues({
					users: Math.floor(targets.users * progress),
					accuracy: Math.floor(targets.accuracy * progress),
					companies: Math.floor(targets.companies * progress),
					salary: Math.floor(targets.salary * progress)
				})
				currentStep++
			} else {
				clearInterval(interval)
			}
		}, stepTime)

		return () => clearInterval(interval)
	}, [])

	const processSteps = [
		{
			id: 1,
			title: 'Upload & Analyze',
			description: 'AI parses your CV instantly',
			icon: Upload,
			color: 'blue',
			progress: 100
		},
		{
			id: 2,
			title: 'Smart Matching',
			description: 'Find perfect job matches',
			icon: Target,
			color: 'purple',
			progress: 75
		},
		{
			id: 3,
			title: 'Connect & Apply',
			description: 'Direct contact with companies',
			icon: MessageCircle,
			color: 'green',
			progress: 50
		}
	]

	const features = [
		{
			icon: Brain,
			title: 'AI-Powered Matching',
			description: 'Advanced algorithms analyze your skills',
			stat: '90% accuracy',
			color: 'bg-blue-500'
		},
		{
			icon: Shield,
			title: 'GDPR Compliant',
			description: 'Your data is secure and protected',
			stat: '100% secure',
			color: 'bg-green-500'
		},
		{
			icon: Globe,
			title: 'Germany & Switzerland Network',
			description: 'Access to top tech companies in DACH region',
			stat: '2.5K+ companies',
			color: 'bg-purple-500'
		},
		{
			icon: TrendingUp,
			title: 'Career Growth',
			description: 'Track your professional development',
			stat: '+60% salary',
			color: 'bg-orange-500'
		}
	]

	const techStack = [
		{ name: 'React', level: 95, color: '#61DAFB' },
		{ name: 'Python', level: 88, color: '#3776AB' },
		{ name: 'Node.js', level: 82, color: '#339933' },
		{ name: 'AWS', level: 90, color: '#FF9900' },
		{ name: 'Docker', level: 78, color: '#2496ED' },
		{ name: 'TypeScript', level: 85, color: '#3178C6' }
	]

	const testimonials = [
		{
			name: 'Sarah M.',
			role: 'React Developer',
			location: 'Berlin',
			flag: '🇩🇪',
			quote: 'Found my dream job in 2 weeks',
			increase: '+45%',
			image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face'
		},
		{
			name: 'Marco S.',
			role: 'DevOps Engineer', 
			location: 'Zurich',
			flag: '🇨🇭',
			quote: 'Seamless relocation process',
			increase: '+90%',
			image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
		},
		{
			name: 'Anna K.',
			role: 'Data Scientist',
			location: 'Munich',
			flag: '🇩🇪',
			quote: 'Perfect skill matching',
			increase: '+60%',
			image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face'
		}
	]

	return (
		<div className="min-h-screen">
			{/* Hero Section - Modern & Dynamic */}
			<BrandedSection className="relative py-24 overflow-hidden" 
				style={{ 
					background: `radial-gradient(ellipse at top, ${colors.primary}15 0%, ${colors.background} 50%), 
								linear-gradient(135deg, ${colors.background} 0%, ${colors.secondary}08 100%)`
				}}>
				{/* Dynamic Background Elements */}
				<div className="absolute inset-0 overflow-hidden">
					{/* Animated Gradient Orbs */}
					<div className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-20 animate-pulse blur-3xl" 
						 style={{ 
							 background: `conic-gradient(from 0deg, ${colors.primary}, ${colors.secondary}, ${colors.warning}, ${colors.primary})`,
							 animation: 'spin 20s linear infinite'
						 }}></div>
					<div className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full opacity-15 animate-pulse blur-3xl" 
						 style={{ 
							 background: `conic-gradient(from 180deg, ${colors.secondary}, ${colors.success}, ${colors.primary}, ${colors.secondary})`,
							 animation: 'spin 25s linear infinite reverse'
						 }}></div>
					
					{/* Floating Tech Icons */}
					<div className="absolute top-20 left-10 w-16 h-16 rounded-2xl flex items-center justify-center opacity-30 animate-bounce"
						 style={{ 
							 background: `linear-gradient(45deg, ${colors.primary}40, ${colors.secondary}40)`,
							 animationDelay: '0s',
							 animationDuration: '3s'
						 }}>
						<Code className="w-8 h-8 text-white" />
					</div>
					<div className="absolute top-40 right-20 w-14 h-14 rounded-xl flex items-center justify-center opacity-25 animate-bounce"
						 style={{ 
							 background: `linear-gradient(45deg, ${colors.secondary}40, ${colors.warning}40)`,
							 animationDelay: '1s',
							 animationDuration: '4s'
						 }}>
						<Brain className="w-7 h-7 text-white" />
					</div>
					<div className="absolute bottom-40 left-20 w-12 h-12 rounded-lg flex items-center justify-center opacity-20 animate-bounce"
						 style={{ 
							 background: `linear-gradient(45deg, ${colors.success}40, ${colors.primary}40)`,
							 animationDelay: '2s',
							 animationDuration: '5s'
						 }}>
						<Zap className="w-6 h-6 text-white" />
					</div>
					
					{/* Geometric Patterns */}
					<div className="absolute top-1/3 left-1/4 w-24 h-24 opacity-5 animate-pulse">
						<div className="w-full h-full border-4 border-current transform rotate-45" 
							 style={{ borderColor: colors.primary }}></div>
					</div>
					<div className="absolute bottom-1/3 right-1/3 w-20 h-20 opacity-5 animate-pulse"
						 style={{ 
							 background: `conic-gradient(${colors.secondary}, transparent, ${colors.secondary})`,
							 borderRadius: '50%'
						 }}></div>
				</div>

				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
					{/* Main Hero Content */}
					<div className="text-center mb-20">
						{/* Premium Badge with Glow */}
						<div className="inline-flex items-center px-8 py-4 rounded-full mb-10 border-2 relative overflow-hidden group"
							 style={{ 
								 borderColor: colors.primary, 
								 background: `linear-gradient(135deg, ${colors.surface}f0, ${colors.primary}10)`,
								 boxShadow: `0 0 0 1px ${colors.primary}20, 0 8px 32px ${colors.primary}15`
							 }}>
							{/* Glow effect */}
							<div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
								 style={{ 
									 background: `linear-gradient(135deg, ${colors.primary}20, ${colors.secondary}20)`,
									 filter: 'blur(8px)'
								 }}></div>
							<Bot className="w-6 h-6 mr-3 animate-pulse relative z-10" style={{ color: colors.primary }} />
							<BrandedSpan className="text-lg font-bold relative z-10" style={{ color: colors.primary }}>
								AI-Powered CV Parsing + Smart Job Matching for European Tech Market
							</BrandedSpan>
							<Sparkles className="w-5 h-5 ml-3 animate-pulse relative z-10" style={{ color: colors.secondary }} />
						</div>

						{/* Stunning Headline with Animated Effects */}
						<BrandedH1 className="text-4xl lg:text-8xl font-black mb-10 leading-tight max-w-6xl mx-auto relative">
							<div className="relative inline-block">
								<BrandedSpan className="relative z-10" style={{ color: colors.text.primary }}>
									Upload Your CV,
								</BrandedSpan>
								{/* Subtle underline animation */}
								<div className="absolute bottom-0 left-0 w-full h-2 opacity-30 animate-pulse"
									 style={{ background: `linear-gradient(90deg, transparent, ${colors.primary}40, transparent)` }}></div>
							</div>
							<br />
							<div className="relative inline-block group">
								<BrandedSpan 
									className="relative z-10 transition-all duration-300"
									style={{ 
										background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary}, ${colors.warning})`,
										backgroundSize: '200% 200%',
										WebkitBackgroundClip: 'text',
										WebkitTextFillColor: 'transparent',
										backgroundClip: 'text',
										animation: 'gradient-shift 3s ease-in-out infinite'
									}}
								>Find Tech Jobs</BrandedSpan>
								{/* Animated glow behind text */}
								<div className="absolute inset-0 opacity-0 group-hover:opacity-50 transition-opacity duration-500 blur-xl"
									 style={{ 
										 background: `linear-gradient(135deg, ${colors.primary}30, ${colors.secondary}30)`
									 }}></div>
							</div>
							<br />
							<BrandedSpan className="relative z-10" style={{ color: colors.text.primary }}>
								in Germany & Switzerland
							</BrandedSpan>
						</BrandedH1>

						{/* Enhanced Process Description */}
						<BrandedP className="text-2xl lg:text-3xl mb-14 max-w-5xl mx-auto leading-relaxed font-medium" 
							style={{ color: colors.text.secondary }}>
							Our <BrandedSpan className="font-black relative inline-block" style={{ color: colors.primary }}>
								OpenAI-powered system
								<div className="absolute bottom-0 left-0 w-full h-1 opacity-50"
									 style={{ background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})` }}></div>
							</BrandedSpan> analyzes your CV, 
							extracts your skills, and matches you with <BrandedSpan className="font-black relative inline-block" style={{ color: colors.secondary }}>
								perfect tech roles
								<div className="absolute bottom-0 left-0 w-full h-1 opacity-50"
									 style={{ background: `linear-gradient(90deg, ${colors.secondary}, ${colors.warning})` }}></div>
							</BrandedSpan> from 
							leading companies in Germany and Switzerland.
						</BrandedP>

						{/* Premium Action Buttons */}
						<div className="flex flex-col lg:flex-row gap-8 justify-center mb-20">
							<Link
								to="/register/talent"
								className="group px-12 py-6 rounded-2xl font-black text-2xl transition-all duration-500 flex items-center justify-center shadow-2xl relative overflow-hidden"
								style={{ 
									background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
									color: colors.text.inverse,
									boxShadow: `0 20px 40px ${colors.primary}30`
								}}
								onMouseEnter={(e) => {
									e.currentTarget.style.transform = 'translateY(-6px) scale(1.05)'
									e.currentTarget.style.boxShadow = `0 30px 60px ${colors.primary}40`
								}}
								onMouseLeave={(e) => {
									e.currentTarget.style.transform = 'translateY(0) scale(1)'
									e.currentTarget.style.boxShadow = `0 20px 40px ${colors.primary}30`
								}}
							>
								{/* Animated shine effect */}
								<div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
									 style={{ 
										 background: 'linear-gradient(45deg, transparent, rgba(255,255,255,0.2), transparent)',
										 animation: 'shine 1.5s ease-in-out'
									 }}></div>
								<Upload className="w-7 h-7 mr-4 relative z-10" />
								<span className="relative z-10">Upload CV & Find Jobs</span>
								<ArrowRight className="w-7 h-7 ml-4 group-hover:translate-x-3 transition-transform duration-300 relative z-10" />
							</Link>
							
							<Link
								to="/register/team"
								className="group px-12 py-6 rounded-2xl font-black text-2xl transition-all duration-500 flex items-center justify-center border-3 relative overflow-hidden"
								style={{ 
									borderColor: colors.primary, 
									color: colors.primary,
									background: `linear-gradient(135deg, ${colors.surface}f0, ${colors.primary}05)`,
									boxShadow: `0 20px 40px ${colors.primary}15`
								}}
								onMouseEnter={(e) => {
									e.currentTarget.style.background = `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`
									e.currentTarget.style.color = colors.text.inverse
									e.currentTarget.style.transform = 'translateY(-6px) scale(1.05)'
									e.currentTarget.style.boxShadow = `0 30px 60px ${colors.primary}30`
								}}
								onMouseLeave={(e) => {
									e.currentTarget.style.background = `linear-gradient(135deg, ${colors.surface}f0, ${colors.primary}05)`
									e.currentTarget.style.color = colors.primary
									e.currentTarget.style.transform = 'translateY(0) scale(1)'
									e.currentTarget.style.boxShadow = `0 20px 40px ${colors.primary}15`
								}}
							>
								{/* Animated border glow */}
								<div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
									 style={{ 
										 background: `linear-gradient(135deg, ${colors.primary}30, ${colors.secondary}30)`,
										 filter: 'blur(10px)',
										 zIndex: -1
									 }}></div>
								<Search className="w-7 h-7 mr-4 relative z-10" />
								<span className="relative z-10">Find AI-Matched Talent</span>
								<ChevronRight className="w-7 h-7 ml-4 group-hover:translate-x-3 transition-transform duration-300 relative z-10" />
							</Link>
						</div>
					</div>

					{/* Modern Process Cards with Hover Effects */}
					<div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-20">
						{/* Step 1: CV Upload & Analysis */}
						<BrandedCard className="group relative overflow-hidden rounded-3xl p-8 text-center hover:shadow-2xl transition-all duration-700 hover:-translate-y-4"
							style={{ 
								background: `linear-gradient(145deg, ${colors.surface}, ${colors.primary}05)`,
								border: `2px solid ${colors.primary}20`,
								boxShadow: `0 20px 40px ${colors.primary}10`
							}}>
							{/* Animated background on hover */}
							<div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
								 style={{ 
									 background: `linear-gradient(145deg, ${colors.primary}05, ${colors.secondary}05)`,
									 borderRadius: 'inherit'
								 }}></div>
							
							<div className="relative mb-8">
								<img
									src="https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=400&h=250&fit=crop&crop=center"
									alt="AI analyzing CV document with highlighted skills"
									className="w-full h-56 object-cover rounded-2xl shadow-lg group-hover:scale-105 transition-transform duration-700"
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-2xl"></div>
								
								{/* Floating icon with glow */}
								<div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500"
									 style={{ 
										 background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
										 boxShadow: `0 10px 30px ${colors.primary}40`
									 }}>
									<Upload className="w-8 h-8 text-white" />
								</div>
								
								{/* Accuracy badge */}
								<div className="absolute bottom-4 right-4 px-4 py-2 rounded-full text-sm font-bold text-white group-hover:scale-105 transition-transform duration-300"
									 style={{ 
										 background: 'linear-gradient(135deg, rgba(0,0,0,0.8), rgba(0,0,0,0.6))',
										 backdropFilter: 'blur(10px)'
									 }}>
									<Zap className="w-4 h-4 inline mr-2" />
									90% Accuracy
								</div>
							</div>
							
							<BrandedH3 className="text-2xl font-black mb-4 relative z-10"
								style={{ 
									background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
									WebkitBackgroundClip: 'text',
									WebkitTextFillColor: 'transparent',
									backgroundClip: 'text'
								}}>1. AI CV Analysis</BrandedH3>
							<BrandedP className="text-lg relative z-10" style={{ color: colors.text.secondary }}>
								Upload your CV and our OpenAI technology instantly extracts skills, experience, and achievements
							</BrandedP>
						</BrandedCard>

						{/* Step 2: Smart Matching */}
						<BrandedCard className="group relative overflow-hidden rounded-3xl p-8 text-center hover:shadow-2xl transition-all duration-700 hover:-translate-y-4"
							style={{ 
								background: `linear-gradient(145deg, ${colors.surface}, ${colors.secondary}05)`,
								border: `2px solid ${colors.secondary}20`,
								boxShadow: `0 20px 40px ${colors.secondary}10`
							}}>
							<div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
								 style={{ 
									 background: `linear-gradient(145deg, ${colors.secondary}05, ${colors.warning}05)`,
									 borderRadius: 'inherit'
								 }}></div>
							
							<div className="relative mb-8">
								<img
									src="https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=250&fit=crop&crop=center"
									alt="AI matching dashboard showing job recommendations"
									className="w-full h-56 object-cover rounded-2xl shadow-lg group-hover:scale-105 transition-transform duration-700"
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-2xl"></div>
								
								<div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500"
									 style={{ 
										 background: `linear-gradient(135deg, ${colors.secondary}, ${colors.warning})`,
										 boxShadow: `0 10px 30px ${colors.secondary}40`
									 }}>
									<Brain className="w-8 h-8 text-white" />
								</div>
								
								<div className="absolute top-4 right-4 flex items-center space-x-2 px-3 py-2 rounded-full text-sm font-bold text-white group-hover:scale-105 transition-transform duration-300"
									 style={{ 
										 background: 'linear-gradient(135deg, rgba(0,0,0,0.8), rgba(0,0,0,0.6))',
										 backdropFilter: 'blur(10px)'
									 }}>
									<div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
									<span>Live Matching</span>
								</div>
							</div>
							
							<BrandedH3 className="text-2xl font-black mb-4 relative z-10"
								style={{ 
									background: `linear-gradient(135deg, ${colors.secondary}, ${colors.warning})`,
									WebkitBackgroundClip: 'text',
									WebkitTextFillColor: 'transparent',
									backgroundClip: 'text'
								}}>2. Smart Job Matching</BrandedH3>
							<BrandedP className="text-lg relative z-10" style={{ color: colors.text.secondary }}>
								AI algorithms match your profile with perfect tech roles from companies in Germany & Switzerland
							</BrandedP>
						</BrandedCard>

						{/* Step 3: Connect & Apply */}
						<BrandedCard className="group relative overflow-hidden rounded-3xl p-8 text-center hover:shadow-2xl transition-all duration-700 hover:-translate-y-4"
							style={{ 
								background: `linear-gradient(145deg, ${colors.surface}, ${colors.success}05)`,
								border: `2px solid ${colors.success}20`,
								boxShadow: `0 20px 40px ${colors.success}10`
							}}>
							<div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
								 style={{ 
									 background: `linear-gradient(145deg, ${colors.success}05, ${colors.primary}05)`,
									 borderRadius: 'inherit'
								 }}></div>
							
							<div className="relative mb-8">
								<img
									src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&h=250&fit=crop&crop=center"
									alt="Professional connecting with European tech companies"
									className="w-full h-56 object-cover rounded-2xl shadow-lg group-hover:scale-105 transition-transform duration-700"
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-2xl"></div>
								
								<div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500"
									 style={{ 
										 background: `linear-gradient(135deg, ${colors.success}, ${colors.primary})`,
										 boxShadow: `0 10px 30px ${colors.success}40`
									 }}>
									<MessageCircle className="w-8 h-8 text-white" />
								</div>
								
								<div className="absolute bottom-4 left-4 flex items-center space-x-2 px-3 py-2 rounded-full text-sm font-bold text-white group-hover:scale-105 transition-transform duration-300"
									 style={{ 
										 background: 'linear-gradient(135deg, rgba(0,0,0,0.8), rgba(0,0,0,0.6))',
										 backdropFilter: 'blur(10px)'
									 }}>
									<span className="text-lg">🇩🇪</span>
									<span className="text-lg">🇨🇭</span>
									<span>2.5K+ Companies</span>
								</div>
							</div>
							
							<BrandedH3 className="text-2xl font-black mb-4 relative z-10"
								style={{ 
									background: `linear-gradient(135deg, ${colors.success}, ${colors.primary})`,
									WebkitBackgroundClip: 'text',
									WebkitTextFillColor: 'transparent',
									backgroundClip: 'text'
								}}>3. Connect & Apply</BrandedH3>
							<BrandedP className="text-lg relative z-10" style={{ color: colors.text.secondary }}>
								Direct communication with hiring managers and immediate application to your matched positions
							</BrandedP>
						</BrandedCard>
					</div>

					{/* Animated Success Metrics */}
					<div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
						{[
							{ value: countUpValues.users, suffix: 'K+', label: 'CVs Analyzed', color: colors.primary, gradient: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})` },
							{ value: countUpValues.accuracy, suffix: '%', label: 'Match Accuracy', color: colors.success, gradient: `linear-gradient(135deg, ${colors.success}, ${colors.warning})` },
							{ value: countUpValues.companies, suffix: 'K+', label: 'Job Matches Made', color: colors.secondary, gradient: `linear-gradient(135deg, ${colors.secondary}, ${colors.primary})` },
							{ value: countUpValues.salary, suffix: '%', label: 'Avg Salary Increase', color: colors.warning, gradient: `linear-gradient(135deg, ${colors.warning}, ${colors.success})` }
						].map((metric, index) => (
							<div key={index} className="group text-center p-8 rounded-3xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl relative overflow-hidden"
								 style={{ 
									 background: `linear-gradient(145deg, ${colors.surface}, ${metric.color}08)`,
									 border: `2px solid ${metric.color}20`,
									 boxShadow: `0 15px 35px ${metric.color}10`
								 }}>
								{/* Animated glow on hover */}
								<div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"
									 style={{ 
										 background: `radial-gradient(circle at center, ${metric.color}10, transparent)`,
										 filter: 'blur(20px)'
									 }}></div>
								
								<div className="text-5xl lg:text-6xl font-black mb-3 relative z-10 group-hover:scale-110 transition-transform duration-300" 
									 style={{ 
										 background: metric.gradient,
										 WebkitBackgroundClip: 'text',
										 WebkitTextFillColor: 'transparent',
										 backgroundClip: 'text'
									 }}>
									{metric.value}{metric.suffix}
								</div>
								<BrandedSpan className="text-base font-bold relative z-10" style={{ color: metric.color }}>
									{metric.label}
								</BrandedSpan>
							</div>
						))}
					</div>

					{/* Premium Market Cards */}
					<div className="flex flex-wrap justify-center gap-10">
						{[
							{ 
								name: 'Germany', 
								flag: '🇩🇪', 
								jobs: '15K+ Active Jobs', 
								cities: ['Berlin', 'Munich', 'Hamburg', 'Frankfurt'], 
								gradient: `linear-gradient(135deg, #ff6b6b, #ee5a24)`,
								growth: '+25% YoY',
								shadow: '#ff6b6b'
							},
							{ 
								name: 'Switzerland', 
								flag: '🇨🇭', 
								jobs: '8K+ Active Jobs', 
								cities: ['Zurich', 'Geneva', 'Basel', 'Bern'], 
								gradient: `linear-gradient(135deg, #74b9ff, #0984e3)`,
								growth: '+30% YoY',
								shadow: '#74b9ff'
							}
						].map((market) => (
							<BrandedCard key={market.name} className="group flex-1 min-w-[320px] max-w-[450px] hover:-translate-y-6 transition-all duration-700 hover:shadow-2xl relative overflow-hidden rounded-3xl p-10 text-center"
								style={{
									background: `linear-gradient(145deg, ${colors.surface}, ${colors.primary}05)`,
									border: `2px solid ${colors.primary}20`,
									boxShadow: `0 20px 40px ${market.shadow}15`
								}}>
								{/* Animated gradient overlay */}
								<div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700 rounded-3xl"
									 style={{ background: market.gradient }}></div>
								
								<div className="relative z-10">
									<div className="text-8xl mb-6 group-hover:scale-110 transition-transform duration-500 filter drop-shadow-lg">
										{market.flag}
									</div>
									<BrandedH3 className="text-3xl font-black mb-4 group-hover:scale-105 transition-transform duration-300"
										style={{ 
											background: market.gradient,
											WebkitBackgroundClip: 'text',
											WebkitTextFillColor: 'transparent',
											backgroundClip: 'text'
										}}>
										{market.name}
									</BrandedH3>
									<BrandedP className="font-black text-xl mb-6" style={{ color: colors.primary }}>
										{market.jobs}
									</BrandedP>
									<div className="flex flex-wrap justify-center gap-3 mb-6">
										{market.cities.map(city => (
											<BrandedSpan key={city} className="px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 hover:scale-105"
												style={{ 
													background: `${colors.primary}15`,
													color: colors.primary,
													border: `1px solid ${colors.primary}30`
												}}>
												{city}
											</BrandedSpan>
										))}
									</div>
									<BrandedSpan className="text-lg font-black" style={{ color: colors.success }}>
										{market.growth} Tech Job Growth
									</BrandedSpan>
								</div>
							</BrandedCard>
						))}
					</div>
				</div>
			</BrandedSection>

			{/* Interactive Process Flow - Colorful */}
			<BrandedSection className="py-20" 
				style={{ 
					background: `linear-gradient(135deg, ${colors.surface} 0%, ${colors.primary}05 50%, ${colors.secondary}05 100%)`
				}}>
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-16">
						<BrandedH2 className="text-4xl font-bold mb-4"
							style={{ 
								background: `linear-gradient(45deg, ${colors.primary}, ${colors.secondary})`,
								WebkitBackgroundClip: 'text',
								WebkitTextFillColor: 'transparent',
								backgroundClip: 'text'
							}}>How It Works</BrandedH2>
						<BrandedP className="text-xl max-w-2xl mx-auto" style={{ color: colors.text.secondary }}>
							Get matched with your perfect tech role in Germany and Switzerland in just 3 simple steps
						</BrandedP>
					</div>

					<div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
						{processSteps.map((step, index) => {
							const Icon = step.icon
							const isActive = activeStep === index
							const gradientMap = {
								blue: `linear-gradient(45deg, #3498db, #2980b9)`,
								purple: `linear-gradient(45deg, #9b59b6, #8e44ad)`, 
								green: `linear-gradient(45deg, #2ecc71, #27ae60)`
							}
							
							return (
								<BrandedCard 
									key={step.id}
									variant="elevated"
									padding="xl"
									className={`text-center transition-all duration-500 cursor-pointer ${
										isActive ? 'scale-105 shadow-xl' : 'hover:scale-102'
									}`}
									style={{
										background: isActive 
											? `linear-gradient(45deg, ${colors.surface}, ${colors.primary}10)` 
											: colors.surface,
										border: isActive ? `2px solid ${colors.primary}` : 'none'
									}}
									onClick={() => setActiveStep(index)}
								>
									<div className="relative mb-6">
										<div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto shadow-lg ${
											isActive ? 'animate-pulse' : ''
										}`}
											style={{ 
												background: gradientMap[step.color as keyof typeof gradientMap]
											}}>
											<Icon className="w-10 h-10 text-white" />
										</div>
										<div className="absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg"
											 style={{ background: `linear-gradient(45deg, ${colors.primary}, ${colors.secondary})` }}>
											{step.id}
										</div>
									</div>
									
									<BrandedH3 className="text-xl font-bold mb-3"
										style={isActive ? { 
											background: `linear-gradient(45deg, ${colors.primary}, ${colors.secondary})`,
											WebkitBackgroundClip: 'text',
											WebkitTextFillColor: 'transparent',
											backgroundClip: 'text'
										} : {}}>{step.title}</BrandedH3>
									<BrandedP className="mb-4" style={{ color: colors.text.secondary }}>
										{step.description}
									</BrandedP>
									
									{/* Colorful Progress Bar */}
									<div className="w-full h-3 rounded-full" 
										 style={{ background: `linear-gradient(45deg, ${colors.border}, ${colors.primary}20)` }}>
										<div 
											className="h-full rounded-full transition-all duration-1000 shadow-sm"
											style={{ 
												background: `linear-gradient(45deg, ${colors.primary}, ${colors.secondary})`,
												width: isActive ? `${step.progress}%` : '0%'
											}}
										></div>
									</div>
								</BrandedCard>
							)
						})}
					</div>

					{/* Colorful Process Connection Line */}
					<div className="hidden lg:block relative">
						<div className="absolute top-1/2 left-1/4 right-1/4 h-1 -translate-y-1/2 rounded-full"
							 style={{ background: `linear-gradient(45deg, ${colors.border}, ${colors.primary}20)` }}>
							<div 
								className="h-full transition-all duration-2000 rounded-full shadow-sm"
								style={{ 
									background: `linear-gradient(45deg, ${colors.primary}, ${colors.secondary})`,
									width: `${(activeStep + 1) * 33.33}%`
								}}
							></div>
						</div>
					</div>
				</div>
			</BrandedSection>

			{/* Features Grid - Colorful & Dynamic */}
			<BrandedSection className="py-20" 
				style={{ 
					background: `linear-gradient(135deg, ${colors.background} 0%, ${colors.secondary}05 50%, ${colors.primary}05 100%)`
				}}>
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-16">
						<BrandedH2 className="text-4xl font-bold mb-4"
							style={{ 
								background: `linear-gradient(45deg, ${colors.primary}, ${colors.secondary})`,
								WebkitBackgroundClip: 'text',
								WebkitTextFillColor: 'transparent',
								backgroundClip: 'text'
							}}>Why Choose Our Platform</BrandedH2>
						<BrandedP className="text-xl max-w-2xl mx-auto" style={{ color: colors.text.secondary }}>
							Built for modern tech professionals with cutting-edge AI technology
						</BrandedP>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
						{features.map((feature, index) => {
							const Icon = feature.icon
							const featureGradients = [
								`linear-gradient(45deg, #3498db, #2980b9)`, // Blue
								`linear-gradient(45deg, #2ecc71, #27ae60)`, // Green
								`linear-gradient(45deg, #9b59b6, #8e44ad)`, // Purple
								`linear-gradient(45deg, #f39c12, #e67e22)`  // Orange
							]
							return (
								<BrandedCard 
									key={index}
									variant="outlined"
									padding="xl"
									className="text-center group hover:shadow-2xl transition-all duration-300 hover:scale-105 relative overflow-hidden"
									style={{
										background: `linear-gradient(45deg, ${colors.surface}, ${colors.primary}05)`,
										border: `2px solid transparent`,
										backgroundClip: 'padding-box'
									}}
								>
									{/* Colorful background glow */}
									<div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-lg"
										 style={{ background: featureGradients[index] }}></div>
									
									<div className="relative z-10">
										<div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg"
											 style={{ background: featureGradients[index] }}>
											<Icon className="w-8 h-8 text-white" />
										</div>
										
										<BrandedH3 className="text-lg font-bold mb-3 group-hover:text-opacity-90 transition-all duration-300"
											style={{
												background: `linear-gradient(45deg, ${colors.text.primary}, ${colors.primary})`,
												WebkitBackgroundClip: 'text',
												WebkitTextFillColor: 'transparent',
												backgroundClip: 'text'
											}}>{feature.title}</BrandedH3>
										<BrandedP className="text-sm mb-4" style={{ color: colors.text.secondary }}>
											{feature.description}
										</BrandedP>
										
										<div className="px-4 py-2 rounded-full text-xs font-bold shadow-sm"
											 style={{ 
												 background: `linear-gradient(45deg, ${colors.primary}15, ${colors.secondary}15)`,
												 color: colors.primary,
												 border: `1px solid ${colors.primary}30`
											 }}>
											{feature.stat}
										</div>
									</div>
								</BrandedCard>
							)
						})}
					</div>
				</div>
			</BrandedSection>

			{/* Tech Stack Visualization */}
			<BrandedSection className="py-20" style={{ backgroundColor: colors.surface }}>
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
						<div>
							<BrandedH2 className="text-4xl font-bold mb-6">
								Popular Tech Stacks
							</BrandedH2>
							<BrandedP className="text-xl mb-8" style={{ color: colors.text.secondary }}>
								We understand your technical skills and match them with the right opportunities 
								across European tech companies.
							</BrandedP>
							
							<div className="space-y-6">
								{techStack.map((tech, index) => (
									<div key={index} className="flex items-center space-x-4">
										<div className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold"
											 style={{ backgroundColor: tech.color }}>
											{tech.name.slice(0, 2).toUpperCase()}
										</div>
										<div className="flex-1">
											<div className="flex justify-between items-center mb-1">
												<BrandedSpan className="font-medium">{tech.name}</BrandedSpan>
												<BrandedSpan className="text-sm" style={{ color: colors.text.secondary }}>
													{tech.level}%
												</BrandedSpan>
											</div>
											<div className="w-full h-2 rounded-full" style={{ backgroundColor: colors.border }}>
												<div 
													className="h-full rounded-full transition-all duration-1000"
													style={{ 
														backgroundColor: tech.color,
														width: `${tech.level}%`
													}}
												></div>
											</div>
										</div>
									</div>
								))}
							</div>
						</div>

						<div className="relative">
							<BrandedCard variant="elevated" padding="xl" className="text-center">
								<div className="mb-6">
									<div className="relative mb-4">
										<img
											src="https://images.unsplash.com/photo-1551650975-87deedd944c3?w=500&h=300&fit=crop&crop=center"
											alt="Platform dashboard showing job matches"
											className="w-full h-48 object-cover rounded-lg"
										/>
										<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-lg"></div>
										<div className="absolute top-4 left-4 flex items-center space-x-2">
											<div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
											<BrandedSpan className="text-white text-sm font-medium">Live Matching</BrandedSpan>
										</div>
									</div>
									<BrandedH3 className="text-xl font-bold mb-2">AI Job Matching</BrandedH3>
									<BrandedP style={{ color: colors.text.secondary }}>
										Real-time matching based on your tech stack
									</BrandedP>
								</div>
								
								<div className="space-y-3">
									{['React Developer - Berlin', 'Python Engineer - Zurich', 'DevOps - Amsterdam'].map((job, index) => (
										<div key={index} className="flex items-center justify-between p-3 rounded-lg"
											 style={{ backgroundColor: colors.surface }}>
											<BrandedSpan className="text-sm font-medium">{job}</BrandedSpan>
											<div className="flex items-center space-x-1">
												<Star className="w-4 h-4" style={{ color: colors.warning }} />
												<BrandedSpan className="text-xs font-bold" style={{ color: colors.warning }}>
													{95 - index * 3}%
												</BrandedSpan>
											</div>
										</div>
									))}
								</div>
							</BrandedCard>
						</div>
					</div>
				</div>
			</BrandedSection>

			{/* Success Stories - Colorful Cards */}
			<BrandedSection className="py-20" 
				style={{ 
					background: `linear-gradient(135deg, ${colors.background} 0%, ${colors.primary}08 50%, ${colors.secondary}08 100%)`
				}}>
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-16">
						<BrandedH2 className="text-4xl font-bold mb-4"
							style={{ 
								background: `linear-gradient(45deg, ${colors.primary}, ${colors.secondary})`,
								WebkitBackgroundClip: 'text',
								WebkitTextFillColor: 'transparent',
								backgroundClip: 'text'
							}}>Success Stories</BrandedH2>
						<BrandedP className="text-xl max-w-2xl mx-auto" style={{ color: colors.text.secondary }}>
							Join thousands of tech professionals who found their dream jobs
						</BrandedP>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						{testimonials.map((testimonial, index) => {
							const cardGradients = [
								`linear-gradient(45deg, #ff6b6b15, #ee5a2420)`, // Red gradient for Germany
								`linear-gradient(45deg, #74b9ff15, #0984e320)`, // Blue gradient for Switzerland  
								`linear-gradient(45deg, #a29bfe15, #6c5ce720)`  // Purple gradient for Munich
							]
							return (
								<BrandedCard 
									key={index}
									variant="elevated"
									padding="xl"
									className="text-center group hover:scale-105 transition-all duration-300 relative overflow-hidden"
									style={{
										background: `linear-gradient(45deg, ${colors.surface}, ${colors.primary}05)`,
										border: `2px solid ${colors.border}`
									}}
								>
									{/* Colorful background glow on hover */}
									<div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"
										 style={{ background: cardGradients[index] }}></div>
									
									<div className="relative z-10">
										<div className="relative mb-4">
											<img
												src={testimonial.image}
												alt={testimonial.name}
												className="w-16 h-16 rounded-full mx-auto object-cover shadow-lg border-4"
												style={{ borderColor: `${colors.primary}30` }}
											/>
											<div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center shadow-lg"
												 style={{ background: `linear-gradient(45deg, ${colors.success}, ${colors.warning})` }}>
												<span className="text-xs">{testimonial.flag}</span>
											</div>
										</div>
										
										<BrandedH3 className="font-bold mb-1 flex items-center justify-center"
											style={{
												background: `linear-gradient(45deg, ${colors.text.primary}, ${colors.primary})`,
												WebkitBackgroundClip: 'text',
												WebkitTextFillColor: 'transparent',
												backgroundClip: 'text'
											}}>
											{testimonial.name}
										</BrandedH3>
										<BrandedP className="text-sm mb-1 font-medium" style={{ color: colors.secondary }}>
											{testimonial.role}
										</BrandedP>
										<BrandedP className="text-xs mb-4 flex items-center justify-center" style={{ color: colors.text.secondary }}>
											<MapPin className="w-3 h-3 mr-1" />
											{testimonial.location}
										</BrandedP>
										
										<BrandedP className="italic mb-4 text-sm" style={{ color: colors.text.secondary }}>
											"{testimonial.quote}"
										</BrandedP>
										
										<div className="px-4 py-2 rounded-full text-sm font-bold shadow-lg"
											 style={{ 
												 background: `linear-gradient(45deg, ${colors.success}20, ${colors.warning}20)`,
												 color: colors.success,
												 border: `2px solid ${colors.success}30`
											 }}>
											{testimonial.increase} salary
										</div>
									</div>
								</BrandedCard>
							)
						})}
					</div>
				</div>
			</BrandedSection>

			{/* Final CTA - Clean & Focused */}
			<BrandedSection className="py-20" style={{ backgroundColor: colors.primary }}>
				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
					<BrandedH2 className="text-4xl font-bold text-white mb-6">
						Ready to Start Your Tech Journey in Germany & Switzerland?
					</BrandedH2>
					<BrandedP className="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
						Join 50,000+ tech professionals who found their perfect match in Germany and Switzerland
					</BrandedP>
					
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<Link
							to="/register/talent"
							className="px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center bg-white hover:bg-gray-50"
							style={{ color: colors.primary }}
							onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-3px)'}
							onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
						>
							<Briefcase className="w-5 h-5 mr-2" />
							Get Started Free
							<ArrowRight className="w-5 h-5 ml-2" />
						</Link>
						
						<Link
							to="/about"
							className="px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center border-2 border-white text-white hover:bg-white"
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
				</div>
			</BrandedSection>

			{/* CSS Animations */}
			<style dangerouslySetInnerHTML={{
				__html: `
					@keyframes gradient-shift {
						0%, 100% { background-position: 0% 50%; }
						50% { background-position: 100% 50%; }
					}
					@keyframes shine {
						0% { transform: translateX(-100%); }
						100% { transform: translateX(100%); }
					}
				`
			}} />
		</div>
	)
}

export default HomePage 