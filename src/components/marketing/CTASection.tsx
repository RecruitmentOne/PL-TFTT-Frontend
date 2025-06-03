import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { 
	BrandedH2, 
	BrandedH3, 
	BrandedP, 
	BrandedSpan,
	CTASection as BrandedCTASection 
} from '../brand'
import { useBrand, useBrandColors } from '../../brand'

function CTASection() {
	const { t } = useTranslation()
	const { isTeamsVariant } = useBrand()
	const colors = useBrandColors()

	return (
		<BrandedCTASection className="relative overflow-hidden">
			{/* Background Image */}
			<div className="absolute inset-0">
				<img
					src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2084&q=80"
					alt="European Tech Team"
					className="w-full h-full object-cover"
				/>
				<div 
					className="absolute inset-0"
					style={{
						background: `linear-gradient(to right, ${colors.primary}E6, ${colors.secondary}E6)`
					}}
				></div>
			</div>

			<div className="relative">
				<div className="text-center">
					<div 
						className="inline-flex items-center backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-6"
						style={{
							backgroundColor: `${colors.text.inverse}20`,
							color: colors.text.inverse,
							fontFamily: 'var(--brand-font-primary)'
						}}
					>
						<svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
						</svg>
						{t('cta.badge', 'Join Europe\'s Leading Tech Platform')}
					</div>
					
					<BrandedH2 className="mb-6" variant="inverse">
						{t('cta.title.ready', 'Ready to Transform Your')}
						<span 
							className="block"
							style={{
								background: `linear-gradient(to right, ${colors.text.inverse}CC, ${colors.text.inverse}80)`,
								WebkitBackgroundClip: 'text',
								WebkitTextFillColor: 'transparent',
								backgroundClip: 'text'
							}}
						>
							{t('cta.title.journey', 'European Tech Journey?')}
						</span>
					</BrandedH2>
					
					<BrandedP 
						className="text-xl mb-8 max-w-3xl mx-auto" 
						variant="inverse"
						style={{ color: `${colors.text.inverse}CC` }}
					>
						{t('cta.description', 'Join 50,000+ tech professionals and 5,000+ companies across Germany, Switzerland, and the EU. Experience AI-powered recruitment that actually works.')}
					</BrandedP>
					
					{/* CTA Buttons */}
					<div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
						<Link
							to="/register/talent"
							className="group px-8 py-4 rounded-xl text-lg font-semibold transition-all shadow-lg hover:shadow-xl inline-flex items-center justify-center"
							style={{
								backgroundColor: colors.text.inverse,
								color: colors.primary,
								fontFamily: 'var(--brand-font-primary)'
							}}
							onMouseEnter={(e) => {
								e.currentTarget.style.transform = 'translateY(-2px)'
								e.currentTarget.style.backgroundColor = `${colors.text.inverse}F0`
							}}
							onMouseLeave={(e) => {
								e.currentTarget.style.transform = 'translateY(0)'
								e.currentTarget.style.backgroundColor = colors.text.inverse
							}}
						>
							<svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
							</svg>
							{t('cta.buttons.joinTalent', 'Join as Tech Talent')}
							<svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
							</svg>
						</Link>
						<Link
							to="/register/team"
							className="group border-2 px-8 py-4 rounded-xl text-lg font-semibold transition-all inline-flex items-center justify-center"
							style={{
								borderColor: colors.text.inverse,
								color: colors.text.inverse,
								backgroundColor: 'transparent',
								fontFamily: 'var(--brand-font-primary)'
							}}
							onMouseEnter={(e) => {
								e.currentTarget.style.backgroundColor = colors.text.inverse
								e.currentTarget.style.color = colors.primary
								e.currentTarget.style.transform = 'translateY(-2px)'
							}}
							onMouseLeave={(e) => {
								e.currentTarget.style.backgroundColor = 'transparent'
								e.currentTarget.style.color = colors.text.inverse
								e.currentTarget.style.transform = 'translateY(0)'
							}}
						>
							<svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 515.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
							</svg>
							{t('cta.buttons.hireTeam', 'Hire Tech Talent')}
							<svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
							</svg>
						</Link>
					</div>

					{/* Feature Highlights */}
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center mb-12">
						<div 
							className="backdrop-blur-sm rounded-2xl p-6 transition-colors"
							style={{ backgroundColor: `${colors.text.inverse}20` }}
							onMouseEnter={(e) => {
								e.currentTarget.style.backgroundColor = `${colors.text.inverse}30`
							}}
							onMouseLeave={(e) => {
								e.currentTarget.style.backgroundColor = `${colors.text.inverse}20`
							}}
						>
							<div 
								className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
								style={{
									background: `linear-gradient(to right, ${colors.primary}, ${colors.secondary})`
								}}
							>
								<svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
								</svg>
							</div>
							<BrandedH3 className="mb-3" variant="inverse">
								{t('cta.features.ai.title', 'OpenAI-Powered')}
							</BrandedH3>
							<BrandedP variant="inverse" style={{ color: `${colors.text.inverse}CC` }}>
								{t('cta.features.ai.description', 'Advanced AI extracts tech skills and matches you with perfect opportunities instantly')}
							</BrandedP>
						</div>
						
						<div 
							className="backdrop-blur-sm rounded-2xl p-6 transition-colors"
							style={{ backgroundColor: `${colors.text.inverse}20` }}
							onMouseEnter={(e) => {
								e.currentTarget.style.backgroundColor = `${colors.text.inverse}30`
							}}
							onMouseLeave={(e) => {
								e.currentTarget.style.backgroundColor = `${colors.text.inverse}20`
							}}
						>
							<div 
								className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
								style={{
									background: `linear-gradient(to right, ${colors.secondary}, ${colors.primary})`
								}}
							>
								<svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
								</svg>
							</div>
							<BrandedH3 className="mb-3" variant="inverse">
								{t('cta.features.pricing.title', '€0.0006 Per View')}
							</BrandedH3>
							<BrandedP variant="inverse" style={{ color: `${colors.text.inverse}CC` }}>
								{t('cta.features.pricing.description', 'Transparent pay-per-view pricing. No subscriptions, no hidden fees for tech recruitment')}
							</BrandedP>
						</div>
						
						<div 
							className="backdrop-blur-sm rounded-2xl p-6 transition-colors"
							style={{ backgroundColor: `${colors.text.inverse}20` }}
							onMouseEnter={(e) => {
								e.currentTarget.style.backgroundColor = `${colors.text.inverse}30`
							}}
							onMouseLeave={(e) => {
								e.currentTarget.style.backgroundColor = `${colors.text.inverse}20`
							}}
						>
							<div 
								className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
								style={{
									background: `linear-gradient(to right, ${colors.primary}, ${colors.secondary})`
								}}
							>
								<svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
								</svg>
							</div>
							<BrandedH3 className="mb-3" variant="inverse">
								{t('cta.features.gdpr.title', 'GDPR Compliant')}
							</BrandedH3>
							<BrandedP variant="inverse" style={{ color: `${colors.text.inverse}CC` }}>
								{t('cta.features.gdpr.description', 'Full European data protection compliance with enterprise-grade security')}
							</BrandedP>
						</div>
					</div>

					{/* European Tech Hubs */}
					<div 
						className="backdrop-blur-sm rounded-2xl p-8 mb-12"
						style={{ backgroundColor: `${colors.text.inverse}20` }}
					>
						<BrandedH3 className="mb-6" variant="inverse">
							{t('cta.hubs.title', 'Active Across European Tech Hubs')}
						</BrandedH3>
						<div className="grid grid-cols-2 md:grid-cols-4 gap-6">
							{[
								{ flag: '🇩🇪', city: 'Berlin', count: '15K+ Developers' },
								{ flag: '🇨🇭', city: 'Zurich', count: '8K+ Engineers' },
								{ flag: '🇳🇱', city: 'Amsterdam', count: '12K+ Tech Pros' },
								{ flag: '🇦🇹', city: 'Vienna', count: '6K+ Specialists' }
							].map((hub, index) => (
								<div key={index} className="text-center">
									<div className="text-2xl mb-2">{hub.flag}</div>
									<BrandedSpan className="font-semibold block" variant="inverse">
										{hub.city}
									</BrandedSpan>
									<BrandedSpan 
										className="text-sm" 
										variant="inverse" 
										style={{ color: `${colors.text.inverse}CC` }}
									>
										{hub.count}
									</BrandedSpan>
								</div>
							))}
						</div>
					</div>

					{/* Trust Indicators */}
					<div 
						className="pt-8 border-t"
						style={{ borderColor: `${colors.text.inverse}30` }}
					>
						<BrandedP 
							className="mb-6 text-lg" 
							variant="inverse"
							style={{ color: `${colors.text.inverse}CC` }}
						>
							{t('cta.trust.title', 'Trusted by leading European tech companies')}
						</BrandedP>
						<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
							{[
								{ type: 'Fintech', category: 'Startups' },
								{ type: 'SaaS', category: 'Scale-ups' },
								{ type: 'E-commerce', category: 'Enterprises' },
								{ type: 'AI/ML', category: 'Agencies' }
							].map((company, index) => (
								<div 
									key={index}
									className="backdrop-blur-sm rounded-xl p-4 text-center"
									style={{ backgroundColor: `${colors.text.inverse}20` }}
								>
									<BrandedSpan className="font-semibold text-sm block" variant="inverse">
										{company.type}
									</BrandedSpan>
									<BrandedSpan 
										className="text-xs" 
										variant="inverse"
										style={{ color: `${colors.text.inverse}CC` }}
									>
										{company.category}
									</BrandedSpan>
								</div>
							))}
						</div>

						{/* Final CTA */}
						<BrandedP 
							className="mb-4" 
							variant="inverse"
							style={{ color: `${colors.text.inverse}CC` }}
						>
							<BrandedSpan className="font-semibold" variant="inverse">
								{t('cta.stats.accuracy', 'AI-enhanced matching')}
							</BrandedSpan> • 
							<BrandedSpan className="font-semibold" variant="inverse">
								{t('cta.stats.speed', 'streamlined hiring')}
							</BrandedSpan> • 
							<BrandedSpan className="font-semibold" variant="inverse">
								{t('cta.stats.compliance', ' 100% GDPR compliant')}
							</BrandedSpan>
						</BrandedP>
						<Link
							to="/contact"
							className="inline-flex items-center transition-colors"
							style={{ 
								color: `${colors.text.inverse}CC`,
								fontFamily: 'var(--brand-font-primary)'
							}}
							onMouseEnter={(e) => {
								e.currentTarget.style.color = colors.text.inverse
							}}
							onMouseLeave={(e) => {
								e.currentTarget.style.color = `${colors.text.inverse}CC`
							}}
						>
							{t('cta.contact', 'Need help getting started? Contact our European tech team')}
							<svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
							</svg>
						</Link>
					</div>
				</div>
			</div>
		</BrandedCTASection>
	)
}

export default CTASection 