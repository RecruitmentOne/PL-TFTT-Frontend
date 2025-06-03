import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useBrand, useBrandColors } from '../brand'
import {
	Mail,
	Phone,
	MapPin,
	Clock,
	Globe,
	CreditCard,
	Users,
	Shield,
	MessageCircle,
	ArrowRight,
	CheckCircle,
	DollarSign
} from 'lucide-react'

function ContactPage() {
	const { t } = useTranslation()
	const { isTeamsVariant } = useBrand()
	const colors = useBrandColors()
	
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		subject: '',
		message: '',
		userType: 'talent' // talent or team
	})

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value
		})
	}

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		// TODO: Implement form submission
		console.log('Form submitted:', formData)
		alert(t('contact.form.success', 'Thank you for your message! We will get back to you within 24 hours.'))
		setFormData({ name: '', email: '', subject: '', message: '', userType: 'talent' })
	}

	const contactInfo = [
		{
			icon: Mail,
			title: 'Email Support',
			details: 'support@tftt.eu',
			description: 'For platform questions and technical support',
			color: colors.primary
		},
		{
			icon: Globe,
			title: 'EU Business Hours',
			details: 'Mon-Fri, 9:00-18:00 CET',
			description: 'Covering Germany, Switzerland & EU markets',
			color: colors.secondary
		},
		{
			icon: MapPin,
			title: 'European Operations',
			details: 'Germany & Switzerland Focus',
			description: 'Serving EU professionals and DACH companies',
			color: colors.primary
		}
	]

	const faqs = [
		{
			question: 'How does the credit system work for hiring companies?',
			answer: 'Companies purchase credits (€4-12 per CV) to access qualified candidate profiles. Credits are only charged when you access a candidate\'s full CV and contact details after mutual interest confirmation.',
			category: 'pricing'
		},
		{
			question: 'Can EU citizens work immediately in Germany and Switzerland?',
			answer: 'Yes! EU citizens from Austria, Slovakia, Czech Republic, Hungary, Bulgaria, Poland, and Romania can work immediately in Germany and Switzerland without visa requirements thanks to EU freedom of movement.',
			category: 'eligibility'
		},
		{
			question: 'How accurate is your AI CV parsing and matching?',
			answer: 'Our OpenAI-powered system provides advanced accuracy in extracting technical skills, programming languages, and experience levels from CVs. Our matching algorithm is optimized for tech roles and European markets.',
			category: 'technology'
		},
		{
			question: 'What happens after mutual interest is confirmed?',
			answer: 'Once both the employer and candidate express mutual interest, we facilitate direct communication. Companies can then access full CV details and contact information using credits.',
			category: 'process'
		},
		{
			question: 'Is the platform GDPR compliant?',
			answer: 'Yes, we maintain full GDPR compliance with enterprise-grade security infrastructure, encrypted communications, and comprehensive audit trails for all recruitment activities.',
			category: 'compliance'
		}
	]

	return (
		<div 
			className="min-h-screen py-20"
			style={{ backgroundColor: colors.background }}
		>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Hero Section */}
				<div className="text-center mb-16 relative">
					{/* Background Image */}
					<div className="absolute inset-0 -z-10">
						<img
							src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80"
							alt="Modern European tech office"
							className="w-full h-full object-cover opacity-5 rounded-3xl"
						/>
					</div>

					{/* Floating badge */}
					<div 
						className="inline-flex items-center px-6 py-3 rounded-full text-sm font-bold mb-6"
						style={{
							background: `linear-gradient(135deg, ${colors.primary}20, ${colors.secondary}15)`,
							border: `2px solid ${colors.primary}30`,
							color: colors.primary
						}}
					>
						<MessageCircle className="w-5 h-5 mr-2" />
						{t('contact.badge', 'EU Tech Support Team')}
					</div>

					<h1 
						className="text-4xl sm:text-6xl font-bold mb-6 font-brand"
						style={{ color: colors.text.primary }}
					>
						<span className="bg-gradient-to-r bg-clip-text text-transparent"
							style={{
								backgroundImage: `linear-gradient(45deg, ${colors.primary}, ${colors.secondary})`
							}}>
							{t('contact.hero.title', 'Contact Our European Tech Team')}
						</span>
					</h1>
					<p 
						className="text-xl lg:text-2xl max-w-4xl mx-auto leading-relaxed"
						style={{ color: colors.text.secondary }}
					>
						{t('contact.hero.description', 'Ready to access EU tech talent or find your next opportunity? EU professionals can work immediately in Germany and Switzerland with direct employment eligibility thanks to EU freedom of movement.')}
					</p>
				</div>

				{/* Quick Contact Info */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
					{contactInfo.map((info, index) => (
						<div 
							key={index}
							className="text-center p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
							style={{ backgroundColor: colors.surface }}
						>
							<div 
								className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
								style={{ backgroundColor: `${info.color}15` }}
							>
								<info.icon className="w-8 h-8" style={{ color: info.color }} />
							</div>
							<h3 
								className="text-lg font-semibold mb-2"
								style={{ color: colors.text.primary }}
							>
								{info.title}
							</h3>
							<p 
								className="font-medium mb-2"
								style={{ color: info.color }}
							>
								{info.details}
							</p>
							<p 
								className="text-sm"
								style={{ color: colors.text.secondary }}
							>
								{info.description}
							</p>
						</div>
					))}
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
					{/* Contact Form */}
					<div 
						className="rounded-2xl shadow-lg p-8"
						style={{ backgroundColor: colors.surface }}
					>
						<div className="flex items-center mb-6">
							<div 
								className="w-16 h-16 rounded-full flex items-center justify-center mr-4"
								style={{ backgroundColor: `${colors.primary}15` }}
							>
								<Mail className="w-8 h-8" style={{ color: colors.primary }} />
							</div>
							<div>
								<h2 
									className="text-2xl font-bold font-brand"
									style={{ color: colors.text.primary }}
								>
									{t('contact.form.title', 'Send us a message')}
								</h2>
								<p style={{ color: colors.text.secondary }}>
									{t('contact.form.response', 'We typically respond within 24 hours')}
								</p>
							</div>
						</div>
						
						<form onSubmit={handleSubmit} className="space-y-6">
							<div>
								<label 
									htmlFor="userType" 
									className="block text-sm font-medium mb-2"
									style={{ color: colors.text.primary }}
								>
									{t('contact.form.userType', 'I am a')} *
								</label>
								<select
									id="userType"
									name="userType"
									value={formData.userType}
									onChange={handleChange}
									required
									className="form-input w-full px-4 py-3 rounded-lg border"
									style={{
										backgroundColor: colors.background,
										borderColor: colors.border,
										color: colors.text.primary
									}}
								>
									<option value="talent">
										{t('contact.form.options.talent', 'EU Tech Professional looking for German/Swiss opportunities')}
									</option>
									<option value="team">
										{t('contact.form.options.team', 'Company looking to hire EU tech talent')}
									</option>
									<option value="investor">
										{t('contact.form.options.investor', 'Investor or partner')}
									</option>
									<option value="media">
										{t('contact.form.options.media', 'Media or press inquiry')}
									</option>
									<option value="other">
										{t('contact.form.options.other', 'Other')}
									</option>
								</select>
							</div>

							<div>
								<label 
									htmlFor="name" 
									className="block text-sm font-medium mb-2"
									style={{ color: colors.text.primary }}
								>
									{t('contact.form.name', 'Full Name')} *
								</label>
								<input
									type="text"
									id="name"
									name="name"
									value={formData.name}
									onChange={handleChange}
									required
									className="form-input w-full px-4 py-3 rounded-lg border"
									style={{
										backgroundColor: colors.background,
										borderColor: colors.border,
										color: colors.text.primary
									}}
									placeholder={t('contact.form.namePlaceholder', 'Your full name')}
								/>
							</div>
							
							<div>
								<label 
									htmlFor="email" 
									className="block text-sm font-medium mb-2"
									style={{ color: colors.text.primary }}
								>
									{t('contact.form.email', 'Email Address')} *
								</label>
								<input
									type="email"
									id="email"
									name="email"
									value={formData.email}
									onChange={handleChange}
									required
									className="form-input w-full px-4 py-3 rounded-lg border"
									style={{
										backgroundColor: colors.background,
										borderColor: colors.border,
										color: colors.text.primary
									}}
									placeholder={t('contact.form.emailPlaceholder', 'your.email@example.com')}
								/>
							</div>
							
							<div>
								<label 
									htmlFor="subject" 
									className="block text-sm font-medium mb-2"
									style={{ color: colors.text.primary }}
								>
									{t('contact.form.subject', 'Subject')} *
								</label>
								<input
									type="text"
									id="subject"
									name="subject"
									value={formData.subject}
									onChange={handleChange}
									required
									className="form-input w-full px-4 py-3 rounded-lg border"
									style={{
										backgroundColor: colors.background,
										borderColor: colors.border,
										color: colors.text.primary
									}}
									placeholder={t('contact.form.subjectPlaceholder', 'e.g., Credit system questions, EU hiring support')}
								/>
							</div>
							
							<div>
								<label 
									htmlFor="message" 
									className="block text-sm font-medium mb-2"
									style={{ color: colors.text.primary }}
								>
									{t('contact.form.message', 'Message')} *
								</label>
								<textarea
									id="message"
									name="message"
									value={formData.message}
									onChange={handleChange}
									required
									rows={6}
									className="form-input w-full px-4 py-3 rounded-lg border resize-none"
									style={{
										backgroundColor: colors.background,
										borderColor: colors.border,
										color: colors.text.primary
									}}
									placeholder={t('contact.form.messagePlaceholder', 'Tell us how we can help with your EU tech recruitment needs...')}
								></textarea>
							</div>
							
							<button
								type="submit"
								className="w-full px-6 py-4 rounded-lg font-bold text-lg transition-all duration-300 flex items-center justify-center group"
								style={{
									backgroundColor: colors.primary,
									color: colors.text.inverse
								}}
							>
								<MessageCircle className="w-6 h-6 mr-3" />
								{t('contact.form.submit', 'Send Message')}
								<ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform" />
							</button>
						</form>
					</div>

					{/* Platform Information & FAQ */}
					<div className="space-y-8">
						{/* EU Platform Benefits */}
						<div 
							className="rounded-2xl p-8"
							style={{ backgroundColor: colors.surface }}
						>
							<h3 
								className="text-2xl font-bold mb-6 font-brand"
								style={{ color: colors.text.primary }}
							>
								{t('contact.platform.title', 'Why Choose Our EU Tech Platform?')}
							</h3>
							
							<div className="space-y-4">
								{[
									{
										icon: Globe,
										title: 'EU Freedom of Movement',
										description: 'Connect with 68K+ EU professionals who can work immediately in Germany & Switzerland'
									},
									{
										icon: CreditCard,
										title: 'Transparent Credit System',
										description: 'Pay only €4-12 per qualified CV - no hidden fees or long-term contracts'
									},
									{
										icon: Users,
										title: 'Direct Communication',
										description: 'No recruitment agency middlemen - direct employer-candidate connections'
									},
									{
										icon: Shield,
										title: 'AI-Powered Matching',
										description: 'Advanced technology with OpenAI integration and full GDPR compliance'
									}
								].map((benefit, index) => (
									<div key={index} className="flex items-start gap-4">
										<div 
											className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
											style={{ backgroundColor: `${colors.primary}15` }}
										>
											<benefit.icon className="w-5 h-5" style={{ color: colors.primary }} />
										</div>
										<div>
											<h4 
												className="font-semibold mb-1"
												style={{ color: colors.text.primary }}
											>
												{benefit.title}
											</h4>
											<p 
												className="text-sm"
												style={{ color: colors.text.secondary }}
											>
												{benefit.description}
											</p>
										</div>
									</div>
								))}
							</div>
						</div>

						{/* Market Coverage */}
						<div 
							className="rounded-2xl p-8"
							style={{ 
								background: `linear-gradient(135deg, ${colors.primary}10, ${colors.secondary}05)`,
								border: `1px solid ${colors.border}`
							}}
						>
							<h3 
								className="text-xl font-bold mb-4 font-brand"
								style={{ color: colors.text.primary }}
							>
								{t('contact.coverage.title', 'Our European Market Coverage')}
							</h3>
							
							<div className="grid grid-cols-2 gap-4 text-center">
								<div>
									<div 
										className="text-2xl font-bold"
										style={{ color: colors.primary }}
									>
										🇩🇪 🇨🇭
									</div>
									<div 
										className="text-lg font-semibold"
										style={{ color: colors.text.primary }}
									>
										Target Markets
									</div>
									<p 
										className="text-sm"
										style={{ color: colors.text.secondary }}
									>
										Germany & Switzerland
									</p>
								</div>
								<div>
									<div 
										className="text-2xl font-bold"
										style={{ color: colors.secondary }}
									>
										🇦🇹🇸🇰🇨🇿🇭🇺🇧🇬🇵🇱🇷🇴
									</div>
									<div 
										className="text-lg font-semibold"
										style={{ color: colors.text.primary }}
									>
										Talent Sources
									</div>
									<p 
										className="text-sm"
										style={{ color: colors.text.secondary }}
									>
										EU Countries
									</p>
								</div>
							</div>
						</div>

						{/* Quick FAQs */}
						<div 
							className="rounded-2xl p-8"
							style={{ backgroundColor: colors.surface }}
						>
							<h3 
								className="text-xl font-bold mb-6 font-brand"
								style={{ color: colors.text.primary }}
							>
								{t('contact.faq.title', 'Frequently Asked Questions')}
							</h3>
							
							<div className="space-y-4">
								{faqs.slice(0, 3).map((faq, index) => (
									<details key={index} className="group">
										<summary 
											className="cursor-pointer list-none flex items-center justify-between p-3 rounded-lg transition-colors"
											style={{ backgroundColor: `${colors.primary}05` }}
										>
											<span 
												className="font-medium"
												style={{ color: colors.text.primary }}
											>
												{faq.question}
											</span>
											<ArrowRight className="w-4 h-4 group-open:rotate-90 transition-transform" style={{ color: colors.primary }} />
										</summary>
										<div className="p-3 pt-2">
											<p 
												className="text-sm leading-relaxed"
												style={{ color: colors.text.secondary }}
											>
												{faq.answer}
											</p>
										</div>
									</details>
								))}
							</div>
							
							<div className="mt-6 pt-6 border-t" style={{ borderColor: colors.border }}>
								<p 
									className="text-sm text-center"
									style={{ color: colors.text.secondary }}
								>
									{t('contact.faq.more', 'Need more detailed information? Send us a message above!')}
								</p>
							</div>
						</div>
					</div>
				</div>

				{/* Bottom CTA */}
				<div className="mt-16 text-center">
					<div 
						className="rounded-3xl p-8 lg:p-12 relative overflow-hidden"
						style={{
							background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`
						}}
					>
						<div className="relative z-10">
							<h3 className="text-3xl lg:text-4xl font-bold mb-6 text-white">
								{t('contact.cta.title', 'Ready to Transform Your EU Tech Recruitment?')}
							</h3>
							<p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
								{t('contact.cta.subtitle', 'Join the revolution connecting EU talent with German & Swiss opportunities')}
							</p>
							
							<div className="flex flex-col sm:flex-row gap-6 justify-center">
								<a
									href="#contact-form"
									className="group inline-flex items-center justify-center px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300"
									style={{
										backgroundColor: colors.text.inverse,
										color: colors.primary
									}}
									onClick={(e) => {
										e.preventDefault()
										document.querySelector('form')?.scrollIntoView({ behavior: 'smooth' })
									}}
								>
									<MessageCircle className="w-6 h-6 mr-3" />
									{t('contact.cta.message', 'Send Message')}
									<ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform" />
								</a>
								
								<a
									href="mailto:support@tftt.eu"
									className="group inline-flex items-center justify-center px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 border-2 border-white text-white hover:bg-white"
									style={{
										backgroundColor: 'transparent'
									}}
									onMouseEnter={(e) => {
										e.currentTarget.style.backgroundColor = colors.text.inverse
										e.currentTarget.style.color = colors.primary
									}}
									onMouseLeave={(e) => {
										e.currentTarget.style.backgroundColor = 'transparent'
										e.currentTarget.style.color = 'white'
									}}
								>
									<Mail className="w-6 h-6 mr-3" />
									{t('contact.cta.email', 'Email Direct')}
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ContactPage 