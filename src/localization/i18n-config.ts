import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import Backend from 'i18next-http-backend'

// Supported languages configuration
export const SUPPORTED_LANGUAGES = {
	en: {
		code: 'en-US',
		name: 'English',
		displayName: 'English (United States)',
		flag: '🇺🇸'
	},
	de: {
		code: 'de-DE',
		name: 'German', 
		displayName: 'Deutsch (Deutschland)',
		flag: '🇩🇪'
	}
} as const

export type SupportedLanguageKey = keyof typeof SUPPORTED_LANGUAGES

// Default fallback translations for offline scenarios
const fallbackResources = {
	en: {
		translation: {
			// Navigation
			'nav.home': 'Home',
			'nav.about': 'About',
			'nav.forTalent': 'For Talent',
			'nav.forTeams': 'For Teams',
			'nav.contact': 'Contact',
			'nav.jobs': 'Jobs',
			'nav.profile': 'Profile',
			'nav.dashboard': 'Dashboard',
			'nav.settings': 'Settings',
			'nav.logout': 'Logout',
			'nav.login': 'Login',
			'nav.register': 'Register',
			'nav.openMenu': 'Open main menu',
			
			// Common platform
			'common.platformName': 'Teams for the Talent',
			'common.save': 'Save',
			'common.cancel': 'Cancel',
			'common.delete': 'Delete',
			'common.edit': 'Edit',
			'common.loading': 'Loading...',
			'common.error': 'An error occurred',
			'common.success': 'Success',
			'common.confirm': 'Confirm',
			'common.back': 'Back',
			'common.next': 'Next',
			'common.previous': 'Previous',
			'common.search': 'Search',
			'common.filter': 'Filter',
			'common.clear': 'Clear',
			'common.submit': 'Submit',
			'common.timeSaver': 'Time Saver',
			'common.costEffective': 'Cost Effective',
			
			// Authentication
			'auth.joinAsTalent': 'I am Talent',
			'auth.joinAsTeam': 'Join as Team',
			'auth.loginAsTalent': 'Login as Talent',
			'auth.loginAsTeam': 'Login as Team',
			'auth.login.title': 'Login to your account',
			'auth.login.email': 'Email address',
			'auth.login.password': 'Password',
			'auth.login.submit': 'Sign in',
			'auth.login.forgotPassword': 'Forgot your password?',
			'auth.login.noAccount': "Don't have an account?",
			'auth.login.signUp': 'Sign up',
			'auth.login.welcomeBack': 'Welcome back',
			'auth.login.signInToContinue': 'Sign in to continue to your account',
			
			// Team Login specific content
			'auth.login.team.title': 'Access Your Team Dashboard',
			'auth.login.team.subtitle': 'Manage your hiring process and find top talent',
			'auth.login.team.welcome': 'Welcome Back, Team!',
			'auth.login.team.tagline': 'Build your dream team with AI',
			'auth.login.newToTftt': 'New to TFTT?',
			'auth.login.emailPlaceholder': 'your.email@company.com',
			'auth.login.passwordPlaceholder': 'Enter your password',
			'auth.login.rememberMe': 'Keep me signed in',
			'auth.login.signingIn': 'Signing in...',
			'auth.login.signIn': 'Access Dashboard',
			'auth.login.orContinueWith': 'Or sign in with',
			'auth.login.continueWithGoogle': 'Continue with Google Workspace',
			'auth.login.continueWithMicrosoft': 'Continue with Microsoft',
			'auth.login.signUpHere': 'Get started now',
			'auth.login.lookingForJob': 'Looking for a job?',
			'auth.login.talentLogin': 'Talent Login',
			
			// Team benefits and features
			'auth.benefits.teams.scoring': 'AI Candidate Scoring',
			'auth.benefits.teams.scoringDesc': 'Intelligent ranking and scoring of candidates for your roles',
			'auth.benefits.teams.matching': 'Smart Matching Algorithm',
			'auth.benefits.teams.matchingDesc': 'Find perfect talent matches using AI-powered algorithms',
			'auth.benefits.teams.hiring': 'Streamlined Hiring',
			'auth.benefits.teams.hiringDesc': 'Streamlined process with automated CV parsing and bulk operations',
			'auth.benefits.teams.credits': 'Credit-Based System',
			'auth.benefits.teams.creditsDesc': 'Transparent pay-per-view pricing starting from $0.0006 per profile',
			
			// Team stats
			'auth.stats.teams.hiringTeams': 'Hiring Teams',
			'auth.stats.teams.clientSatisfaction': 'Client Satisfaction',
			'auth.stats.teams.fasterHiring': 'Faster Hiring',
			
			// Enterprise features
			'auth.enterprise.title': 'Enterprise Features',
			'auth.enterprise.candidateScoring': 'Advanced AI candidate scoring',
			'auth.enterprise.bulkProcessing': 'Bulk CV processing',
			'auth.enterprise.analytics': 'Real-time analytics dashboard',
			'auth.enterprise.accountManagement': 'Dedicated account management',
			'auth.enterprise.integration': 'Custom integration options',
			'auth.enterprise.moreFeatures': '+{count} more premium features',
			
			// Social proof
			'auth.socialProof.title': 'Trusted by Industry Leaders',
			'auth.socialProof.testimonial': 'TFTT reduced our hiring time by 60% and improved candidate quality significantly.',
			'auth.socialProof.teamsCount': '+{count} successful teams',
			
			// Enterprise SSO note
			'auth.enterprise.ssoNote': 'Enterprise SSO options available for teams of 50+',
			
			// Brand variants
			'brand.teams': 'Teams',
			'brand.talent': 'Talent',
			'brand.switchTo': 'Switch to {{variant}}',
			
			// Language switcher
			'language.current': 'Current language',
			'language.switch': 'Switch language',
			'language.en': 'English',
			'language.de': 'German',
			'language.note': 'Choose your preferred language and region for the best experience',
			
			// About page
			'about.hero.title': 'About TFT Platform',
			'about.hero.description': "We're revolutionizing tech talent matching in Europe with AI-powered technology that connects skilled developers, engineers, and data scientists with leading companies in Germany, Switzerland, and across the EU.",
			'about.mission.title': 'Our Mission',
			'about.mission.description1': 'To bridge the tech talent gap in Europe by connecting exceptional developers, engineers, and data scientists with innovative companies using cutting-edge AI technology and deep understanding of European tech markets.',
			'about.mission.description2': 'We believe every skilled tech professional deserves access to exciting opportunities in Germany and Switzerland, and every tech company deserves to find the perfect candidate efficiently and cost-effectively.',
			'about.stats.professionals': 'Tech Professionals',
			'about.stats.companies': 'Tech Companies',
			'about.aiMatching.title': 'AI-Powered Tech Matching',
			'about.aiMatching.description': 'Our OpenAI-powered algorithms analyze technical skills, frameworks, and project experience to ensure perfect matches.',
			'about.european.title': 'European Tech Excellence',
			'about.european.subtitle': "Specialized in connecting tech talent across Europe's leading innovation hubs",
			'about.location.jobs': 'Jobs Available',
			'about.location.premium': 'Premium Positions',
			'about.location.source': 'Talent Source',
			'about.location.talent': 'EU Talent Pool',
			'about.values.title': 'Our Tech-First Values',
			'about.values.quality.title': 'Quality Over Quantity',
			'about.values.quality.description': 'We prioritize precise tech matches over volume, ensuring meaningful connections between skilled developers and innovative companies.',
			'about.values.privacy.title': 'Privacy & Security',
			'auth.register.title': 'Create your account',
			'auth.register.firstName': 'First name',
			'auth.register.lastName': 'Last name',
			'auth.register.email': 'Email address',
			'auth.register.password': 'Password',
			'auth.register.confirmPassword': 'Confirm password',
			'auth.register.submit': 'Create account',
			'auth.register.hasAccount': 'Already have an account?',
			'auth.register.signIn': 'Sign in',
			'auth.register.alreadyHaveAccount': 'Already have an account?',
			'auth.register.recruitingTeam': 'Recruiting for a team?',
			'auth.register.teamLogin': 'Team Login',
			'auth.register.talentLogin': 'Talent Login',
			'auth.register.lookingToHire': 'Looking to hire talent?',
			'auth.register.lookingForJob': 'Looking for a job?',
			'auth.register.joinAsTeam': 'Join as Team',
			'auth.register.joinAsTalent': 'Join as Talent',
			'auth.register.welcome': 'Welcome to Teams for the Talent',
			'auth.register.createAccount': 'Create your account to get started',
			
			// Talent page
			'talent.hero.title.launch': 'Launch Your',
			'talent.hero.title.techCareer': 'Tech Career',
			'talent.hero.title.inEurope': 'in Europe',
			'talent.hero.description': 'Connect with leading tech companies in Germany, Switzerland, and across the EU. Our AI matches your skills with opportunities in Berlin, Zurich, Amsterdam, and beyond.',
			'talent.hero.cta': 'Start Your Tech Journey',
			'talent.stats.jobs': 'Tech Jobs Posted',
			'talent.stats.accuracy': 'Match Accuracy',
			'talent.roles.title': 'Built for Tech Professionals',
			'talent.roles.description': "Whether you're a Frontend Developer in Berlin, DevOps Engineer in Zurich, or Data Scientist in Amsterdam, we connect you with the right opportunities.",
			'talent.roles.frontend.title': 'Frontend Development',
			'talent.roles.backend.title': 'Backend Development',
			'talent.roles.devops.title': 'DevOps & Cloud',
			'talent.roles.data.title': 'Data & AI',
			'talent.features.title': 'Why Tech Professionals Choose TFT Platform',
			'talent.features.ai.title': 'AI-Powered CV Analysis',
			'talent.features.ai.description': 'Upload your CV and our OpenAI-powered system extracts skills, experience, and achievements with advanced technology.',
			'talent.features.ai.badge': 'AI-Enhanced',
			'talent.features.matching.title': 'Smart Tech Matching',
			'talent.features.matching.description': 'Get matched with tech roles that align with your programming languages, frameworks, and career goals in Germany & Switzerland.',
			'talent.features.matching.badge': 'Tech-Focused',
			'talent.features.analytics.title': 'Career Growth Analytics',
			'talent.features.analytics.description': 'Track your profile performance, skill demand in European markets, and receive personalized career advice.',
			'talent.features.analytics.badge': 'Data-Driven',
			
			// Teams page
			'teams.hero.title.hire': 'Hire Top',
			'teams.hero.title.techTalent': 'Tech Talent',
			'teams.hero.title.inEurope': 'in Europe',
			'teams.hero.description': 'Find skilled developers, engineers, and data scientists from Germany, Switzerland, and the EU. AI-powered matching delivers quality candidates through streamlined processes.',
			'teams.hero.cta': 'Start Hiring Tech Talent',
			'teams.stats.professionals': 'Tech Professionals',
			'teams.stats.faster': 'Faster Hiring',
			'teams.roles.title': 'Hire for Every Tech Role',
			'teams.roles.description': 'From junior developers to senior architects, find the right tech talent for your team in Berlin, Zurich, Amsterdam, and beyond.',
			'teams.roles.frontend.title': 'Frontend Engineers',
			'teams.roles.backend.title': 'Backend Engineers',
			'teams.roles.devops.title': 'DevOps Engineers',
			'teams.roles.data.title': 'Data Scientists',
			'teams.features.title': 'Why Tech Companies Choose TFT Platform',
			'teams.features.screening.title': 'AI-Powered Screening',
			'teams.features.screening.description': 'AI-enhanced matching delivers quality candidates through streamlined processes.',
			'teams.features.screening.badge': 'Streamlined Hiring',
			'teams.features.matching.title': 'AI-Powered Candidate Matching',
			'teams.features.matching.description': 'Advanced algorithms match candidates to your requirements with intelligent scoring',
			'teams.features.matching.badge': 'Smart Matching',
			'teams.features.cost.title': 'Cost-Effective Hiring',
			'teams.features.cost.description': 'Pay only €0.0006 per profile view. No upfront fees, no subscription costs. Scale your recruitment budget efficiently.',
			'teams.features.cost.badge': 'Pay Per View',
			
			// Contact page
			'contact.hero.title': 'Contact Our European Tech Team',
			'contact.hero.description': 'Have questions about our tech talent platform? Need help with hiring in Germany or Switzerland? Our European team is here to help you succeed.',
			'contact.form.title': 'Send us a message',
			'contact.form.response': 'We typically respond within 24 hours',
			'contact.form.userType': 'I am a',
			'contact.form.options.talent': 'Tech Professional looking for opportunities',
			'contact.form.options.team': 'Company looking to hire tech talent',
			'contact.form.options.investor': 'Investor or partner',
			'contact.form.options.other': 'Other',
			'contact.form.name': 'Full Name',
			'contact.form.namePlaceholder': 'Your full name',
			'contact.form.email': 'Email Address',
			'contact.form.emailPlaceholder': 'your.email@example.com',
			'contact.form.subject': 'Subject',
			'contact.form.subjectPlaceholder': 'e.g., Tech hiring in Berlin, Platform questions',
			'contact.form.message': 'Message',
			'contact.form.messagePlaceholder': 'Tell us about your tech hiring needs, questions about our platform, or how we can help...',
			'contact.form.submit': 'Send Message',
			'contact.form.success': 'Thank you for your message! We will get back to you within 24 hours.',
			'contact.info.title': 'Get in touch with our team',
			'contact.info.description': 'Our European tech team is distributed across major tech hubs and is ready to help you navigate the tech talent landscape in Germany, Switzerland, and beyond.',
			'contact.methods.email.title': 'Email Support',
			'contact.methods.email.description': 'For tech questions and enterprise inquiries',
			'contact.methods.phone.title': 'Phone Support',
			'contact.methods.phone.hours': 'Mon-Fri 9am-6pm CET'
		}
	},
	de: {
		translation: {
			// Navigation
			'nav.home': 'Startseite',
			'nav.about': 'Über uns',
			'nav.forTalent': 'Für Talente',
			'nav.forTeams': 'Für Teams',
			'nav.contact': 'Kontakt',
			'nav.jobs': 'Jobs',
			'nav.profile': 'Profil',
			'nav.dashboard': 'Dashboard',
			'nav.settings': 'Einstellungen',
			'nav.logout': 'Abmelden',
			'nav.login': 'Anmelden',
			'nav.register': 'Registrieren',
			'nav.openMenu': 'Hauptmenü öffnen',
			
			// Common platform
			'common.platformName': 'Teams for the Talent',
			'common.save': 'Speichern',
			'common.cancel': 'Abbrechen',
			'common.delete': 'Löschen',
			'common.edit': 'Bearbeiten',
			'common.loading': 'Wird geladen...',
			'common.error': 'Ein Fehler ist aufgetreten',
			'common.success': 'Erfolgreich',
			'common.confirm': 'Bestätigen',
			'common.back': 'Zurück',
			'common.next': 'Weiter',
			'common.previous': 'Vorherige',
			'common.search': 'Suchen',
			'common.filter': 'Filter',
			'common.clear': 'Löschen',
			'common.submit': 'Senden',
			'common.timeSaver': 'Zeitsparer',
			'common.costEffective': 'Kostengünstig',
			
			// Authentication
			'auth.joinAsTalent': 'Als Talent beitreten',
			'auth.joinAsTeam': 'Als Team beitreten',
			'auth.loginAsTalent': 'Login as Talent',
			'auth.loginAsTeam': 'Login as Team',
			'auth.login.title': 'Bei Ihrem Konto anmelden',
			'auth.login.email': 'E-Mail-Adresse',
			'auth.login.password': 'Passwort',
			'auth.login.submit': 'Anmelden',
			'auth.login.forgotPassword': 'Passwort vergessen?',
			'auth.login.noAccount': 'Noch kein Konto?',
			'auth.login.signUp': 'Registrieren',
			'auth.login.welcomeBack': 'Willkommen zurück',
			'auth.login.signInToContinue': 'Melden Sie sich an, um fortzufahren',
			
			// Team Login specific content
			'auth.login.team.title': 'Access Your Team Dashboard',
			'auth.login.team.subtitle': 'Manage your hiring process and find top talent',
			'auth.login.team.welcome': 'Welcome Back, Team!',
			'auth.login.team.tagline': 'Build your dream team with AI',
			'auth.login.newToTftt': 'New to TFTT?',
			'auth.login.emailPlaceholder': 'ihre.email@beispiel.com',
			'auth.login.passwordPlaceholder': 'Enter your password',
			'auth.login.rememberMe': 'Keep me signed in',
			'auth.login.signingIn': 'Signing in...',
			'auth.login.signIn': 'Access Dashboard',
			'auth.login.orContinueWith': 'Or sign in with',
			'auth.login.continueWithGoogle': 'Continue with Google Workspace',
			'auth.login.continueWithMicrosoft': 'Continue with Microsoft',
			'auth.login.signUpHere': 'Get started now',
			'auth.login.lookingForJob': 'Auf der Suche nach einem Job?',
			'auth.login.talentLogin': 'Talent Login',
			
			// Team benefits and features
			'auth.benefits.teams.scoring': 'AI Candidate Scoring',
			'auth.benefits.teams.scoringDesc': 'Intelligent ranking and scoring of candidates for your roles',
			'auth.benefits.teams.matching': 'Smart Matching Algorithm',
			'auth.benefits.teams.matchingDesc': 'Find perfect talent matches using AI-powered algorithms',
			'auth.benefits.teams.hiring': 'Streamlined Hiring',
			'auth.benefits.teams.hiringDesc': 'Streamlined process with automated CV parsing and bulk operations',
			'auth.benefits.teams.credits': 'Credit-Based System',
			'auth.benefits.teams.creditsDesc': 'Transparent pay-per-view pricing starting from $0.0006 per profile',
			
			// Team stats
			'auth.stats.teams.hiringTeams': 'Hiring Teams',
			'auth.stats.teams.clientSatisfaction': 'Client Satisfaction',
			'auth.stats.teams.fasterHiring': 'Faster Hiring',
			
			// Enterprise features
			'auth.enterprise.title': 'Enterprise Features',
			'auth.enterprise.candidateScoring': 'Advanced AI candidate scoring',
			'auth.enterprise.bulkProcessing': 'Bulk CV processing',
			'auth.enterprise.analytics': 'Real-time analytics dashboard',
			'auth.enterprise.accountManagement': 'Dedicated account management',
			'auth.enterprise.integration': 'Custom integration options',
			'auth.enterprise.moreFeatures': '+{count} more premium features',
			
			// Social proof
			'auth.socialProof.title': 'Trusted by Industry Leaders',
			'auth.socialProof.testimonial': 'TFTT reduced our hiring time by 60% and improved candidate quality significantly.',
			'auth.socialProof.teamsCount': '+{count} successful teams',
			
			// Enterprise SSO note
			'auth.enterprise.ssoNote': 'Enterprise SSO options available for teams of 50+',
			
			// Brand variants
			'brand.teams': 'Teams',
			'brand.talent': 'Talent',
			'brand.switchTo': 'Zu {{variant}} wechseln',
			
			// Language switcher
			'language.current': 'Aktuelle Sprache',
			'language.switch': 'Sprache wechseln',
			'language.en': 'Englisch',
			'language.de': 'Deutsch',
			'language.note': 'Wählen Sie Ihre bevorzugte Sprache und Region für die beste Erfahrung',
			
			// About page
			'about.hero.title': 'Über die TFT Plattform',
			'about.hero.description': 'Wir revolutionieren das Tech-Talent-Matching in Europa mit KI-gestützter Technologie, die qualifizierte Entwickler, Ingenieure und Datenwissenschaftler mit führenden Unternehmen in Deutschland, der Schweiz und der gesamten EU verbindet.',
			'about.mission.title': 'Unsere Mission',
			'about.mission.description1': 'Die Tech-Talent-Lücke in Europa zu schließen, indem wir außergewöhnliche Entwickler, Ingenieure und Datenwissenschaftler mit innovativen Unternehmen verbinden, unter Verwendung modernster KI-Technologie und tiefem Verständnis der europäischen Tech-Märkte.',
			'about.mission.description2': 'Wir glauben, dass jeder qualifizierte Tech-Profi Zugang zu spannenden Möglichkeiten in Deutschland und der Schweiz verdient, und jedes Tech-Unternehmen verdient es, den perfekten Kandidaten effizient und kostengünstig zu finden.',
			'about.stats.professionals': 'Tech-Profis',
			'about.stats.companies': 'Tech-Unternehmen',
			'about.aiMatching.title': 'KI-gestütztes Tech-Matching',
			'about.aiMatching.description': 'Unsere OpenAI-gestützten Algorithmen analysieren technische Fähigkeiten, Frameworks und Projekterfahrung, um perfekte Matches zu gewährleisten.',
			
			// Talent page
			'talent.hero.title.launch': 'Starten Sie Ihre',
			'talent.hero.title.techCareer': 'Tech-Karriere',
			'talent.hero.title.inEurope': 'in Europa',
			'talent.hero.description': 'Verbinden Sie sich mit führenden Tech-Unternehmen in Deutschland, der Schweiz und der gesamten EU. Unsere KI matcht Ihre Fähigkeiten mit Möglichkeiten in Berlin, Zürich, Amsterdam und darüber hinaus.',
			'talent.hero.cta': 'Starten Sie Ihre Tech-Reise',
			
			// Teams page
			'teams.hero.title.hire': 'Stellen Sie Top',
			'teams.hero.title.techTalent': 'Tech-Talente',
			'teams.hero.title.inEurope': 'in Europa ein',
			'teams.hero.description': 'Finden Sie qualifizierte Entwickler, Ingenieure und Datenwissenschaftler aus Deutschland, der Schweiz und der EU. KI-gestütztes Matching liefert Qualitätskandidaten durch optimierte Prozesse.',
			'teams.hero.cta': 'Beginnen Sie mit der Einstellung von Tech-Talenten',
			
			// Contact page
			'contact.hero.title': 'Kontaktieren Sie unser europäisches Tech-Team',
			'contact.hero.description': 'Haben Sie Fragen zu unserer Tech-Talent-Plattform? Benötigen Sie Hilfe bei der Einstellung in Deutschland oder der Schweiz? Unser europäisches Team hilft Ihnen gerne zum Erfolg.',
			'contact.form.title': 'Senden Sie uns eine Nachricht',
			'contact.form.response': 'Wir antworten normalerweise innerhalb von 24 Stunden',
			'contact.form.userType': 'Ich bin ein',
			'contact.form.options.talent': 'Tech-Profi auf der Suche nach Möglichkeiten',
			'contact.form.options.team': 'Unternehmen, das Tech-Talente einstellen möchte',
			'contact.form.options.investor': 'Investor oder Partner',
			'contact.form.options.other': 'Andere',
			'contact.form.name': 'Vollständiger Name',
			'contact.form.namePlaceholder': 'Ihr vollständiger Name',
			'contact.form.email': 'E-Mail-Adresse',
			'contact.form.emailPlaceholder': 'ihre.email@beispiel.com',
			'contact.form.subject': 'Betreff',
			'contact.form.subjectPlaceholder': 'z.B. Tech-Einstellung in Berlin, Plattform-Fragen',
			'contact.form.message': 'Nachricht',
			'contact.form.messagePlaceholder': 'Erzählen Sie uns von Ihren Tech-Einstellungsbedürfnissen, Fragen zu unserer Plattform oder wie wir helfen können...',
			'contact.form.submit': 'Nachricht senden',
			'contact.form.success': 'Vielen Dank für Ihre Nachricht! Wir werden uns innerhalb von 24 Stunden bei Ihnen melden.',
			'contact.info.title': 'Kontaktieren Sie unser Team',
			'contact.info.description': 'Unser europäisches Tech-Team ist über wichtige Tech-Hubs verteilt und bereit, Ihnen bei der Navigation in der Tech-Talent-Landschaft in Deutschland, der Schweiz und darüber hinaus zu helfen.',
			'contact.methods.email.title': 'E-Mail-Support',
			'contact.methods.email.description': 'Für Tech-Fragen und Unternehmensanfragen',
			'contact.methods.phone.title': 'Telefon-Support',
			'contact.methods.phone.hours': 'Mo-Fr 9-18 Uhr MEZ',
			'auth.register.title': 'Konto erstellen',
			'auth.register.firstName': 'Vorname',
			'auth.register.lastName': 'Nachname',
			'auth.register.email': 'E-Mail-Adresse',
			'auth.register.password': 'Passwort',
			'auth.register.confirmPassword': 'Passwort bestätigen',
			'auth.register.submit': 'Konto erstellen',
			'auth.register.hasAccount': 'Bereits ein Konto?',
			'auth.register.signIn': 'Anmelden',
			'auth.register.alreadyHaveAccount': 'Bereits ein Konto?',
			'auth.register.recruitingTeam': 'Rekrutierung für ein Team?',
			'auth.register.teamLogin': 'Team-Login',
			'auth.register.talentLogin': 'Talent-Login',
			'auth.register.lookingToHire': 'Talente einstellen möchten?',
			'auth.register.lookingForJob': 'Auf der Suche nach einem Job?',
			'auth.register.joinAsTeam': 'Als Team beitreten',
			'auth.register.joinAsTalent': 'Als Talent beitreten',
			'auth.register.welcome': 'Willkommen bei Teams for the Talent',
			'auth.register.createAccount': 'Erstellen Sie Ihr Konto, um zu beginnen'
		}
	}
}

// Initialize i18next
i18n
	.use(Backend)
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		// Fallback language
		fallbackLng: 'en',
		
		// Debug mode (disable in production)
		debug: import.meta.env.DEV,
		
		// Language detection configuration
		detection: {
			// Order of language detection methods
			order: ['querystring', 'localStorage', 'navigator', 'htmlTag'],
			
			// Query string parameter name
			lookupQuerystring: 'lng',
			
			// Local storage key
			lookupLocalStorage: 'tftt-language',
			
			// Cache language selection
			caches: ['localStorage'],
			
			// Exclude certain domains from language detection
			excludeCacheFor: ['cimode']
		},
		
		// Interpolation configuration
		interpolation: {
			escapeValue: false // React already escapes values
		},
		
		// Backend configuration for loading translations
		backend: {
			// Load from local fallback resources first, then try backend
			loadPath: (lngs: string[], namespaces: string[]) => {
				// Use fallback resources if backend is not available
				return '/locales/{{lng}}/{{ns}}.json'
			},
			
			// Custom load function to integrate with backend API
			customLoad: async (url: string, options: any, callback: Function) => {
				try {
					// Extract language code from URL
					const urlParts = url.split('/')
					const lng = urlParts[urlParts.indexOf('locales') + 1]
					
					// Map i18next language codes to backend culture codes
					const cultureCode = lng === 'en' ? 'en-US' : lng === 'de' ? 'de-DE' : lng
					
					// Try to load from backend API first
					const response = await fetch(`/api/localization/cultures`, {
						headers: {
							'Accept-Language': cultureCode,
							'Content-Type': 'application/json'
						}
					})
					
					if (response.ok) {
						// If backend is available, use it for dynamic translations
						callback(null, { status: 200, data: {} })
					} else {
						// Fallback to local resources
						callback(null, { 
							status: 200, 
							data: fallbackResources[lng as keyof typeof fallbackResources]?.translation || {}
						})
					}
				} catch (error) {
					// Use fallback resources if backend is not available
					const lng = url.includes('de') ? 'de' : 'en'
					callback(null, { 
						status: 200, 
						data: fallbackResources[lng as keyof typeof fallbackResources]?.translation || {}
					})
				}
			}
		},
		
		// Resource configuration
		resources: fallbackResources,
		
		// Supported languages
		supportedLngs: Object.keys(SUPPORTED_LANGUAGES),
		
		// Namespace configuration
		ns: ['translation'],
		defaultNS: 'translation',
		
		// React configuration
		react: {
			// Wait for translations to be loaded before rendering
			useSuspense: false
		}
	})

export default i18n 