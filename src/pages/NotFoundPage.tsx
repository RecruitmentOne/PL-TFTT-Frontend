import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useBrand, useBrandColors } from '../brand'
import { BrandLogo } from '../components/brand/brand-logo'
import { 
	BrandedH1, 
	BrandedH2, 
	BrandedP, 
	BrandedSpan,
	BrandedCard,
	BrandedSection 
} from '../components/brand'
import { 
	Home, 
	Search, 
	ArrowLeft, 
	Compass, 
	Users, 
	Briefcase,
	Sparkles,
	Code,
	Globe
} from 'lucide-react'

function NotFoundPage() {
	const { t } = useTranslation()
	const navigate = useNavigate()
	const { isTeamsVariant, switchVariant } = useBrand()
	const colors = useBrandColors()

	// Detect user type from URL or localStorage to set appropriate brand variant
	useEffect(() => {
		const currentPath = window.location.pathname
		const userType = localStorage.getItem('userType')
		
		if (currentPath.includes('/team') || currentPath.includes('/employer') || userType === 'team') {
			switchVariant('teams')
		} else if (currentPath.includes('/talent') || currentPath.includes('/developer') || userType === 'talent') {
			switchVariant('talent')
		} else {
			// Default to teams variant for 404 pages
			switchVariant('teams')
		}
	}, [switchVariant])

	const suggestions = [
		{
			icon: Home,
			title: t('404.suggestions.home.title', 'Go to Homepage'),
			description: t('404.suggestions.home.description', 'Return to our main page'),
			link: '/',
			color: 'primary'
		},
		{
			icon: isTeamsVariant ? Briefcase : Code,
			title: isTeamsVariant 
				? t('404.suggestions.teams.title', 'Browse Job Opportunities') 
				: t('404.suggestions.talent.title', 'Find Tech Jobs'),
			description: isTeamsVariant 
				? t('404.suggestions.teams.description', 'Discover top tech companies') 
				: t('404.suggestions.talent.description', 'Explore exciting tech roles'),
			link: isTeamsVariant ? '/teams' : '/talent',
			color: 'secondary'
		},
		{
			icon: Users,
			title: t('404.suggestions.register.title', 'Join Our Platform'),
			description: t('404.suggestions.register.description', 'Start your tech journey today'),
			link: '/register',
			color: 'primary'
		},
		{
			icon: Search,
			title: t('404.suggestions.search.title', 'Search Our Platform'),
			description: t('404.suggestions.search.description', 'Find what you\'re looking for'),
			link: '/search',
			color: 'secondary'
		}
	]

	const techQuotes = [
		{
			text: t('404.quotes.innovation', '"Innovation is the currency of the future."'),
			author: t('404.quotes.techLeader', 'European Tech Leader')
		},
		{
			text: t('404.quotes.opportunity', '"Every challenge is an opportunity to code a better solution."'),
			author: t('404.quotes.developer', 'Berlin Developer')
		},
		{
			text: t('404.quotes.connection', '"The best tech talent connects when opportunity meets preparation."'),
			author: t('404.quotes.recruiter', 'Zurich Tech Recruiter')
		}
	]

	const randomQuote = techQuotes[Math.floor(Math.random() * techQuotes.length)]

	return (
		<div 
			className="min-h-screen flex items-center justify-center py-20 relative overflow-hidden"
			style={{ backgroundColor: colors.background }}
		>
			{/* Background Pattern */}
			<div className="absolute inset-0 opacity-5">
				<div 
					className="w-full h-full"
					style={{
						backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='${colors.primary.slice(1)}' fill-opacity='0.1'%3E%3Ccircle cx='7' cy='7' r='7'/%3E%3Ccircle cx='53' cy='7' r='7'/%3E%3Ccircle cx='7' cy='53' r='7'/%3E%3Ccircle cx='53' cy='53' r='7'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
						backgroundSize: '60px 60px'
					}}
				></div>
			</div>

			<BrandedSection className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
				{/* TFTT Logo */}
				<div className="mb-8">
					<BrandLogo variant="icon" size="xl" />
				</div>

				{/* 404 Display */}
				<div className="mb-8">
					<div className="flex justify-center mb-6">
						<div 
							className="w-24 h-24 rounded-full flex items-center justify-center"
							style={{ backgroundColor: `${colors.primary}15` }}
						>
							<Compass className="w-12 h-12" style={{ color: colors.primary }} />
						</div>
					</div>
					
					<BrandedH1 
						className="text-6xl sm:text-8xl font-bold mb-4"
						style={{ 
							background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
							WebkitBackgroundClip: 'text',
							WebkitTextFillColor: 'transparent',
							backgroundClip: 'text'
						}}
					>
						404
					</BrandedH1>
					
					<BrandedH2 className="text-2xl sm:text-3xl font-bold mb-4">
						{t('404.title', 'Page Not Found in the Tech Universe')}
					</BrandedH2>
					
					<BrandedP className="text-lg max-w-2xl mx-auto mb-8" style={{ color: colors.text.secondary }}>
						{t('404.description', 'Looks like this page took a detour through the European tech scene and got lost. Let\'s get you back on track to finding amazing tech opportunities!')}
					</BrandedP>
				</div>

				{/* Quick Actions */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
					{suggestions.map((suggestion, index) => {
						const Icon = suggestion.icon
						const suggestionColor = suggestion.color === 'primary' ? colors.primary : colors.secondary
						
						return (
							<Link key={index} to={suggestion.link}>
								<div 
									className="transition-all duration-200 hover:scale-105 cursor-pointer"
									onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => {
										e.currentTarget.style.borderColor = suggestionColor
									}}
									onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => {
										e.currentTarget.style.borderColor = colors.border
									}}
								>
									<BrandedCard 
										variant="elevated" 
										padding="lg"
										className="h-full"
									>
										<div className="text-center">
											<div 
												className="w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4"
												style={{ 
													backgroundColor: `${suggestionColor}15`,
													color: suggestionColor 
												}}
											>
												<Icon className="w-6 h-6" />
											</div>
											<BrandedH2 className="text-lg font-semibold mb-2">
												{suggestion.title}
											</BrandedH2>
											<BrandedP className="text-sm" style={{ color: colors.text.secondary }}>
												{suggestion.description}
											</BrandedP>
										</div>
									</BrandedCard>
								</div>
							</Link>
						)
					})}
				</div>

				{/* Inspirational Quote */}
				<BrandedCard 
					variant="outlined" 
					padding="lg"
					className="max-w-2xl mx-auto mb-12"
				>
					<div className="text-center">
						<Sparkles className="w-8 h-8 mx-auto mb-4" style={{ color: colors.secondary }} />
						<BrandedP className="text-lg italic mb-4" style={{ color: colors.text.primary }}>
							{randomQuote.text}
						</BrandedP>
						<BrandedSpan className="text-sm font-medium" style={{ color: colors.text.secondary }}>
							— {randomQuote.author}
						</BrandedSpan>
					</div>
				</BrandedCard>

				{/* Navigation Actions */}
				<div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
					<button
						onClick={() => navigate(-1)}
						className="flex items-center px-6 py-3 rounded-lg font-medium transition-colors border"
						style={{
							borderColor: colors.border,
							color: colors.text.primary
						}}
						onMouseEnter={(e) => {
							e.currentTarget.style.backgroundColor = colors.surface
							e.currentTarget.style.borderColor = colors.primary
						}}
						onMouseLeave={(e) => {
							e.currentTarget.style.backgroundColor = 'transparent'
							e.currentTarget.style.borderColor = colors.border
						}}
					>
						<ArrowLeft className="w-5 h-5 mr-2" />
						{t('404.actions.goBack', 'Go Back')}
					</button>
					
					<Link
						to="/"
						className="flex items-center px-6 py-3 rounded-lg font-medium transition-colors"
						style={{
							backgroundColor: colors.primary,
							color: colors.text.inverse
						}}
						onMouseEnter={(e) => {
							e.currentTarget.style.backgroundColor = colors.secondary
						}}
						onMouseLeave={(e) => {
							e.currentTarget.style.backgroundColor = colors.primary
						}}
					>
						<Home className="w-5 h-5 mr-2" />
						{t('404.actions.homepage', 'Return Home')}
					</Link>
				</div>

				{/* European Tech Market Info */}
				<div className="mt-16">
					<div className="flex justify-center items-center space-x-6 opacity-60">
						<div className="flex items-center space-x-2">
							<Globe className="w-5 h-5" style={{ color: colors.text.secondary }} />
							<BrandedSpan className="text-sm" style={{ color: colors.text.secondary }}>
								{t('404.market.serving', 'Serving')} 🇩🇪 🇨🇭 🇳🇱 🇦🇹
							</BrandedSpan>
						</div>
						<div className="hidden sm:block w-px h-6" style={{ backgroundColor: colors.border }}></div>
						<BrandedSpan className="text-sm" style={{ color: colors.text.secondary }}>
							{t('404.market.stats', '50K+ Tech Professionals • 2.5K+ Companies')}
						</BrandedSpan>
					</div>
				</div>
			</BrandedSection>
		</div>
	)
}

export default NotFoundPage 