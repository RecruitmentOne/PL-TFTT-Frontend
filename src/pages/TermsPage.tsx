import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useBrand, useBrandColors } from '../brand'
import { 
	BrandedH1, 
	BrandedH2, 
	BrandedH3, 
	BrandedP, 
	BrandedSpan,
	BrandedCard,
	BrandedSection 
} from '../components/brand'
import { 
	Shield, 
	Eye, 
	Lock, 
	FileText, 
	Globe, 
	Mail,
	Calendar,
	AlertCircle,
	CheckCircle2
} from 'lucide-react'

function TermsPage() {
	const { t } = useTranslation()
	const { switchVariant } = useBrand()
	const colors = useBrandColors()

	// Set neutral brand variant for legal pages
	useEffect(() => {
		switchVariant('teams') // Default to teams variant for legal pages
	}, [switchVariant])

	const lastUpdated = new Date('2024-01-15').toLocaleDateString()

	const sections = [
		{
			id: 'overview',
			title: t('terms.sections.overview.title', 'Service Overview'),
			icon: Globe,
			content: [
				t('terms.sections.overview.platform', 'TFTT (Teams for the Talent) is a European tech talent platform connecting skilled developers, engineers, and data scientists with technology companies across Germany, Switzerland, Netherlands, and Austria.'),
				t('terms.sections.overview.services', 'Our services include AI-powered talent matching, profile optimization, job recommendations, and recruitment tools designed specifically for the European tech market.'),
				t('terms.sections.overview.users', 'By using our platform, you agree to these terms whether you are a tech professional seeking opportunities or a company looking to hire talent.')
			]
		},
		{
			id: 'eligibility',
			title: t('terms.sections.eligibility.title', 'User Eligibility'),
			icon: CheckCircle2,
			content: [
				t('terms.sections.eligibility.age', 'You must be at least 18 years old and legally able to enter into contracts in your jurisdiction.'),
				t('terms.sections.eligibility.professionals', 'Tech professionals must have genuine technical skills and experience in software development, engineering, or data science.'),
				t('terms.sections.eligibility.companies', 'Companies must be legitimate businesses with actual tech job openings and valid European business registration.'),
				t('terms.sections.eligibility.compliance', 'All users must comply with applicable employment laws in Germany, Switzerland, and the European Union.')
			]
		},
		{
			id: 'privacy',
			title: t('terms.sections.privacy.title', 'Privacy & Data Protection'),
			icon: Shield,
			content: [
				t('terms.sections.privacy.gdpr', 'We are fully compliant with the European General Data Protection Regulation (GDPR) and Swiss Federal Data Protection Act.'),
				t('terms.sections.privacy.collection', 'We collect professional information including technical skills, work experience, education, and career preferences to provide our matching services.'),
				t('terms.sections.privacy.processing', 'Your data is processed using AI algorithms to match you with relevant opportunities or candidates within the European tech ecosystem.'),
				t('terms.sections.privacy.retention', 'We retain your data only as long as necessary to provide our services or as required by European law.'),
				t('terms.sections.privacy.rights', 'You have the right to access, rectify, delete, or port your personal data as guaranteed under GDPR Article 15-20.')
			]
		},
		{
			id: 'ai',
			title: t('terms.sections.ai.title', 'AI-Powered Matching'),
			icon: Eye,
			content: [
				t('terms.sections.ai.technology', 'Our platform uses OpenAI and proprietary algorithms to analyze technical skills, project experience, and career preferences.'),
				t('terms.sections.ai.accuracy', 'While we strive for accurate matching, AI recommendations are suggestions and should not be the sole basis for hiring or career decisions.'),
				t('terms.sections.ai.bias', 'We actively work to prevent algorithmic bias and ensure fair representation across all demographics in the European tech community.'),
				t('terms.sections.ai.transparency', 'You can request information about how AI decisions affecting you are made, in compliance with GDPR Article 22.')
			]
		},
		{
			id: 'payments',
			title: t('terms.sections.payments.title', 'Payments & Credits'),
			icon: FileText,
			content: [
				t('terms.sections.payments.model', 'Companies pay per profile access using our credit system. Tech professionals use our platform free of charge.'),
				t('terms.sections.payments.pricing', 'Credit prices are displayed in Euros and may vary based on market conditions and service levels.'),
				t('terms.sections.payments.refunds', 'Refunds are provided in accordance with European consumer protection laws and our specific refund policy.'),
				t('terms.sections.payments.currency', 'All transactions are processed in Euros (EUR) unless otherwise specified.')
			]
		},
		{
			id: 'intellectual-property',
			title: t('terms.sections.ip.title', 'Intellectual Property'),
			icon: Lock,
			content: [
				t('terms.sections.ip.platform', 'The TFTT platform, including all software, designs, and algorithms, is owned by us and protected by European and international copyright laws.'),
				t('terms.sections.ip.user-content', 'You retain ownership of your professional information but grant us license to use it for matching and platform improvement purposes.'),
				t('terms.sections.ip.restrictions', 'You may not reverse engineer, copy, or create derivative works of our platform or algorithms.'),
				t('terms.sections.ip.feedback', 'Any feedback or suggestions you provide may be used by us without obligation or compensation.')
			]
		},
		{
			id: 'prohibited',
			title: t('terms.sections.prohibited.title', 'Prohibited Activities'),
			icon: AlertCircle,
			content: [
				t('terms.sections.prohibited.false', 'Providing false information about technical skills, work experience, or company details.'),
				t('terms.sections.prohibited.spam', 'Sending spam, unsolicited messages, or engaging in harassment of other users.'),
				t('terms.sections.prohibited.scraping', 'Automated data collection, scraping, or unauthorized access to our platform or user data.'),
				t('terms.sections.prohibited.discrimination', 'Discriminatory practices in hiring or job applications based on protected characteristics under European law.'),
				t('terms.sections.prohibited.circumvention', 'Attempting to circumvent our credit system or payment mechanisms.')
			]
		},
		{
			id: 'liability',
			title: t('terms.sections.liability.title', 'Limitation of Liability'),
			icon: Shield,
			content: [
				t('terms.sections.liability.platform', 'We provide our platform "as is" and make no warranties about job placement success or hiring outcomes.'),
				t('terms.sections.liability.third-party', 'We are not liable for actions of companies or candidates you interact with through our platform.'),
				t('terms.sections.liability.damages', 'Our liability is limited to the amount you have paid us in the 12 months preceding any claim.'),
				t('terms.sections.liability.eu-law', 'Nothing in these terms limits liability for death, personal injury, or fraud as required by European consumer protection laws.')
			]
		},
		{
			id: 'termination',
			title: t('terms.sections.termination.title', 'Account Termination'),
			icon: Lock,
			content: [
				t('terms.sections.termination.voluntary', 'You may terminate your account at any time by contacting our support team or using account settings.'),
				t('terms.sections.termination.violations', 'We may terminate accounts for violations of these terms or suspicious activity.'),
				t('terms.sections.termination.data', 'Upon termination, we will delete your personal data within 30 days unless retention is required by law.'),
				t('terms.sections.termination.credits', 'Unused credits may be refunded proportionally in accordance with European consumer protection regulations.')
			]
		}
	]

	const contactInfo = {
		email: 'legal@tfttplatform.eu',
		address: 'TFTT Platform, Tech Quarter, Berlin, Germany',
		dpo: 'dpo@tfttplatform.eu'
	}

	return (
		<div 
			className="min-h-screen py-20"
			style={{ backgroundColor: colors.background }}
		>
			<BrandedSection className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Header */}
				<div className="text-center mb-16">
					<div className="flex justify-center mb-6">
						<div 
							className="w-16 h-16 rounded-full flex items-center justify-center"
							style={{ backgroundColor: `${colors.primary}15` }}
						>
							<FileText className="w-8 h-8" style={{ color: colors.primary }} />
						</div>
					</div>
					
					<BrandedH1 className="text-4xl sm:text-5xl font-bold mb-6">
						{t('terms.title', 'Terms of Service & Privacy Policy')}
					</BrandedH1>
					
					<BrandedP className="text-lg max-w-2xl mx-auto mb-6" style={{ color: colors.text.secondary }}>
						{t('terms.subtitle', 'European tech talent platform terms, privacy policy, and GDPR compliance information')}
					</BrandedP>

					<div className="flex items-center justify-center space-x-4 text-sm" style={{ color: colors.text.secondary }}>
						<div className="flex items-center">
							<Calendar className="w-4 h-4 mr-2" />
							<BrandedSpan>
								{t('terms.lastUpdated', 'Last updated')}: {lastUpdated}
							</BrandedSpan>
						</div>
						<div className="hidden sm:block w-px h-4" style={{ backgroundColor: colors.border }}></div>
						<div className="flex items-center">
							<Globe className="w-4 h-4 mr-2" />
							<BrandedSpan>
								{t('terms.jurisdiction', 'EU/Swiss Law')}
							</BrandedSpan>
						</div>
					</div>
				</div>

				{/* GDPR Compliance Notice */}
				<BrandedCard variant="outlined" padding="lg" className="mb-12">
					<div className="flex items-start space-x-4">
						<Shield className="w-6 h-6 mt-1" style={{ color: colors.secondary }} />
						<div>
							<BrandedH3 className="font-semibold mb-2">
								{t('terms.gdpr.title', 'GDPR Compliance & Your Rights')}
							</BrandedH3>
							<BrandedP style={{ color: colors.text.secondary }}>
								{t('terms.gdpr.description', 'As a European tech platform, we fully comply with GDPR. You have the right to access, rectify, delete, and port your data. Contact our Data Protection Officer at dpo@tfttplatform.eu for any privacy-related requests.')}
							</BrandedP>
						</div>
					</div>
				</BrandedCard>

				{/* Terms Sections */}
				<div className="space-y-12">
					{sections.map((section, index) => {
						const Icon = section.icon
						return (
							<BrandedCard key={section.id} variant="elevated" padding="lg">
								<div className="flex items-start space-x-4">
									<div 
										className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
										style={{ 
											backgroundColor: `${colors.primary}15`,
											color: colors.primary 
										}}
									>
										<Icon className="w-6 h-6" />
									</div>
									<div className="flex-1">
										<BrandedH2 className="text-xl font-bold mb-4">
											{index + 1}. {section.title}
										</BrandedH2>
										<div className="space-y-4">
											{section.content.map((paragraph, pIndex) => (
												<BrandedP key={pIndex} style={{ color: colors.text.secondary }}>
													{paragraph}
												</BrandedP>
											))}
										</div>
									</div>
								</div>
							</BrandedCard>
						)
					})}
				</div>

				{/* Contact Information */}
				<div className="mt-16">
					<BrandedCard variant="outlined" padding="lg">
						<div className="text-center">
							<BrandedH2 className="text-xl font-bold mb-6">
								{t('terms.contact.title', 'Legal Contact Information')}
							</BrandedH2>
							
							<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
								<div>
									<div className="flex justify-center mb-3">
										<Mail className="w-6 h-6" style={{ color: colors.primary }} />
									</div>
									<BrandedH3 className="font-semibold mb-2">
										{t('terms.contact.legal', 'Legal Inquiries')}
									</BrandedH3>
									<BrandedP className="text-sm" style={{ color: colors.text.secondary }}>
										{contactInfo.email}
									</BrandedP>
								</div>

								<div>
									<div className="flex justify-center mb-3">
										<Shield className="w-6 h-6" style={{ color: colors.secondary }} />
									</div>
									<BrandedH3 className="font-semibold mb-2">
										{t('terms.contact.dpo', 'Data Protection Officer')}
									</BrandedH3>
									<BrandedP className="text-sm" style={{ color: colors.text.secondary }}>
										{contactInfo.dpo}
									</BrandedP>
								</div>

								<div>
									<div className="flex justify-center mb-3">
										<Globe className="w-6 h-6" style={{ color: colors.primary }} />
									</div>
									<BrandedH3 className="font-semibold mb-2">
										{t('terms.contact.address', 'Legal Address')}
									</BrandedH3>
									<BrandedP className="text-sm" style={{ color: colors.text.secondary }}>
										{contactInfo.address}
									</BrandedP>
								</div>
							</div>
						</div>
					</BrandedCard>
				</div>

				{/* European Market Notice */}
				<div className="mt-12 text-center">
					<div className="flex justify-center items-center space-x-6 opacity-60">
						<div className="flex items-center space-x-2">
							<Globe className="w-5 h-5" style={{ color: colors.text.secondary }} />
							<BrandedSpan className="text-sm" style={{ color: colors.text.secondary }}>
								{t('terms.market.serving', 'Serving European Tech Market')} 🇩🇪 🇨🇭 🇳🇱 🇦🇹
							</BrandedSpan>
						</div>
						<div className="hidden sm:block w-px h-6" style={{ backgroundColor: colors.border }}></div>
						<BrandedSpan className="text-sm" style={{ color: colors.text.secondary }}>
							{t('terms.market.compliance', 'GDPR & EU Law Compliant')}
						</BrandedSpan>
					</div>
				</div>
			</BrandedSection>
		</div>
	)
}

export default TermsPage 