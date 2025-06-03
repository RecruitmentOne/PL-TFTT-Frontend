import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { 
	BrandedH3, 
	BrandedP, 
	BrandedSpan,
	BrandedSection 
} from '../brand'
import { useBrand, useBrandColors } from '../../brand'
import { BrandLogo } from '../brand/brand-logo'

function PublicFooter() {
	const { t } = useTranslation()
	const { isTeamsVariant } = useBrand()
	const colors = useBrandColors()
	const currentYear = new Date().getFullYear()

	const footerLinks = {
		company: [
			{ name: t('footer.company.about', 'About Us'), href: '/about' },
			{ name: t('footer.company.contact', 'Contact'), href: '/contact' },
			{ name: t('footer.company.careers', 'Careers'), href: '#' },
			{ name: t('footer.company.blog', 'Blog'), href: '#' },
		],
		platform: [
			{ name: t('footer.platform.talent', 'For Talent'), href: '/talent' },
			{ name: t('footer.platform.teams', 'For Teams'), href: '/teams' },
			{ name: t('footer.platform.howItWorks', 'How It Works'), href: '#' },
			{ name: t('footer.platform.pricing', 'Pricing'), href: '#' },
		],
		support: [
			{ name: t('footer.support.helpCenter', 'Help Center'), href: '#' },
			{ name: t('footer.support.documentation', 'Documentation'), href: '#' },
			{ name: t('footer.support.api', 'API'), href: '#' },
			{ name: t('footer.support.status', 'Status'), href: '#' },
		],
		legal: [
			{ name: t('footer.legal.privacy', 'Privacy Policy'), href: '/privacy' },
			{ name: t('footer.legal.terms', 'Terms of Service'), href: '/terms' },
			{ name: t('footer.legal.cookies', 'Cookie Policy'), href: '#' },
			{ name: t('footer.legal.gdpr', 'GDPR Compliance'), href: '#' },
		],
	}

	const socialLinks = [
		{
			name: 'LinkedIn',
			href: '#',
			icon: (
				<svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
					<path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
				</svg>
			)
		},
		{
			name: 'Twitter',
			href: '#',
			icon: (
				<svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
					<path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
				</svg>
			)
		},
		{
			name: 'GitHub',
			href: '#',
			icon: (
				<svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
					<path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
				</svg>
			)
		},
		{
			name: 'YouTube',
			href: '#',
			icon: (
				<svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
					<path fillRule="evenodd" d="M18.403 3.408C17.58 3.119 16.045 3 10 3s-7.58.119-8.403.408C.727 3.756 0 4.683 0 5.75v8.5c0 1.067.727 1.994 1.597 2.342C2.42 16.881 3.955 17 10 17s7.58-.119 8.403-.408c.87-.348 1.597-1.275 1.597-2.342v-8.5c0-1.067-.727-1.994-1.597-2.342zM8 12.5V7.5l5 2.5-5 2.5z" clipRule="evenodd" />
				</svg>
			)
		}
	]

	return (
		<footer 
			style={{ backgroundColor: colors.text.primary }}
			className="relative overflow-hidden"
		>
			{/* Background Pattern */}
			<div className="absolute inset-0 opacity-5">
				<div 
					className="w-full h-full"
					style={{
						backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='${colors.text.inverse.slice(1)}' fill-opacity='0.1'%3E%3Ccircle cx='7' cy='7' r='7'/%3E%3Ccircle cx='53' cy='7' r='7'/%3E%3Ccircle cx='7' cy='53' r='7'/%3E%3Ccircle cx='53' cy='53' r='7'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
						backgroundSize: '60px 60px'
					}}
				></div>
			</div>

			<div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
					{/* Company Info */}
					<div className="lg:col-span-1">
						<div className="flex items-center mb-6">
							<BrandLogo variant="icon" size="md" />
							<BrandedSpan 
								className="ml-3 text-xl font-bold"
								variant="inverse"
								style={{ color: colors.text.inverse }}
							>
								{t('common.platformName', 'TFTT Platform')}
							</BrandedSpan>
						</div>
						
						<BrandedP 
							className="mb-6"
							variant="inverse"
							style={{ color: `${colors.text.inverse}CC` }}
						>
							{t('footer.description', 'AI-powered tech talent platform connecting skilled professionals with leading European companies across Germany, Switzerland, and the EU.')}
						</BrandedP>
						
						{/* Tech Features */}
						<div className="space-y-2 mb-6">
							<div className="flex items-center">
								<svg className="w-4 h-4 mr-2" fill="none" stroke={colors.secondary} viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
								</svg>
								<BrandedSpan 
									className="text-sm"
									variant="inverse"
									style={{ color: `${colors.text.inverse}B3` }}
								>
									{t('footer.features.aiPowered', 'OpenAI-Powered CV Parsing')}
								</BrandedSpan>
							</div>
							<div className="flex items-center">
								<svg className="w-4 h-4 mr-2" fill="none" stroke={colors.secondary} viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
								</svg>
								<BrandedSpan 
									className="text-sm"
									variant="inverse"
									style={{ color: `${colors.text.inverse}B3` }}
								>
									{t('footer.features.gdpr', 'GDPR Compliant')}
								</BrandedSpan>
							</div>
							<div className="flex items-center">
								<svg className="w-4 h-4 mr-2" fill="none" stroke={colors.secondary} viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
								</svg>
								<BrandedSpan 
									className="text-sm"
									variant="inverse"
									style={{ color: `${colors.text.inverse}B3` }}
								>
									{t('footer.features.payPerView', '€0.0006 Per View')}
								</BrandedSpan>
							</div>
						</div>
						
						{/* Social Media */}
						<div className="flex space-x-4">
							{socialLinks.map((social) => (
								<a
									key={social.name}
									href={social.href}
									className="transition-colors duration-200"
									style={{ color: `${colors.text.inverse}80` }}
									onMouseEnter={(e) => {
										e.currentTarget.style.color = colors.secondary
									}}
									onMouseLeave={(e) => {
										e.currentTarget.style.color = `${colors.text.inverse}80`
									}}
									aria-label={`Follow us on ${social.name}`}
								>
									{social.icon}
								</a>
							))}
						</div>
					</div>

					{/* Company Links */}
					<div>
						<BrandedH3 
							className="mb-6"
							variant="inverse"
							style={{ color: colors.text.inverse }}
						>
							{t('footer.sections.company', 'Company')}
						</BrandedH3>
						<ul className="space-y-3">
							{footerLinks.company.map((link) => (
								<li key={link.name}>
									<Link
										to={link.href}
										className="text-sm transition-colors duration-200"
										style={{ color: `${colors.text.inverse}CC` }}
										onMouseEnter={(e) => {
											e.currentTarget.style.color = colors.secondary
										}}
										onMouseLeave={(e) => {
											e.currentTarget.style.color = `${colors.text.inverse}CC`
										}}
									>
										{link.name}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Platform Links */}
					<div>
						<BrandedH3 
							className="mb-6"
							variant="inverse"
							style={{ color: colors.text.inverse }}
						>
							{t('footer.sections.platform', 'Platform')}
						</BrandedH3>
						<ul className="space-y-3">
							{footerLinks.platform.map((link) => (
								<li key={link.name}>
									<Link
										to={link.href}
										className="text-sm transition-colors duration-200"
										style={{ color: `${colors.text.inverse}CC` }}
										onMouseEnter={(e) => {
											e.currentTarget.style.color = colors.secondary
										}}
										onMouseLeave={(e) => {
											e.currentTarget.style.color = `${colors.text.inverse}CC`
										}}
									>
										{link.name}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Support Links */}
					<div>
						<BrandedH3 
							className="mb-6"
							variant="inverse"
							style={{ color: colors.text.inverse }}
						>
							{t('footer.sections.support', 'Support')}
						</BrandedH3>
						<ul className="space-y-3">
							{footerLinks.support.map((link) => (
								<li key={link.name}>
									<a
										href={link.href}
										className="text-sm transition-colors duration-200"
										style={{ color: `${colors.text.inverse}CC` }}
										onMouseEnter={(e) => {
											e.currentTarget.style.color = colors.secondary
										}}
										onMouseLeave={(e) => {
											e.currentTarget.style.color = `${colors.text.inverse}CC`
										}}
									>
										{link.name}
									</a>
								</li>
							))}
						</ul>
					</div>

					{/* Legal Links */}
					<div>
						<BrandedH3 
							className="mb-6"
							variant="inverse"
							style={{ color: colors.text.inverse }}
						>
							{t('footer.sections.legal', 'Legal')}
						</BrandedH3>
						<ul className="space-y-3">
							{footerLinks.legal.map((link) => (
								<li key={link.name}>
									<Link
										to={link.href}
										className="text-sm transition-colors duration-200"
										style={{ color: `${colors.text.inverse}CC` }}
										onMouseEnter={(e) => {
											e.currentTarget.style.color = colors.secondary
										}}
										onMouseLeave={(e) => {
											e.currentTarget.style.color = `${colors.text.inverse}CC`
										}}
									>
										{link.name}
									</Link>
								</li>
							))}
						</ul>
					</div>
				</div>

				{/* European Markets Badge */}
				<div 
					className="mt-12 pt-8 border-t"
					style={{ borderColor: `${colors.text.inverse}20` }}
				>
					<div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
						<div className="flex flex-wrap items-center gap-4">
							<div 
								className="flex items-center px-3 py-1 rounded-full"
								style={{ backgroundColor: `${colors.secondary}20` }}
							>
								<span className="text-sm mr-2">🇩🇪</span>
								<BrandedSpan 
									className="text-sm font-medium"
									style={{ color: colors.secondary }}
								>
									{t('footer.markets.germany', 'Germany')}
								</BrandedSpan>
							</div>
							<div 
								className="flex items-center px-3 py-1 rounded-full"
								style={{ backgroundColor: `${colors.primary}20` }}
							>
								<span className="text-sm mr-2">🇨🇭</span>
								<BrandedSpan 
									className="text-sm font-medium"
									style={{ color: colors.primary }}
								>
									{t('footer.markets.switzerland', 'Switzerland')}
								</BrandedSpan>
							</div>
							<div 
								className="flex items-center px-3 py-1 rounded-full"
								style={{ backgroundColor: `${colors.text.inverse}20` }}
							>
								<span className="text-sm mr-2">🇪🇺</span>
								<BrandedSpan 
									className="text-sm font-medium"
									style={{ color: colors.text.inverse }}
								>
									{t('footer.markets.eu', 'EU Markets')}
								</BrandedSpan>
							</div>
						</div>
						
						<div className="text-center lg:text-right">
							<BrandedP 
								className="text-sm"
								variant="inverse"
								style={{ color: `${colors.text.inverse}80` }}
							>
								© {currentYear} {t('common.platformName', 'TFTT Platform')}. {t('footer.copyright', 'All rights reserved.')}<br />
								{t('footer.madeWith', 'Made with')} <span style={{ color: colors.secondary }}>❤️</span> {t('footer.forTech', 'for European tech talent')}
							</BrandedP>
						</div>
					</div>
				</div>
			</div>
		</footer>
	)
}

export default PublicFooter 