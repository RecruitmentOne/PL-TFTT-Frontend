import { useState } from 'react'
import { useBrand, useBrandColors } from '../../brand'
import { BrandLogo } from './brand-logo'
import { PrimaryButton, SecondaryButton, OutlineButton, GhostButton, BrandedButton } from './branded-button/branded-button'
import { BrandedH1, BrandedH2, BrandedH3, BrandedH4, BrandedP, BrandedSpan } from './branded-typography'
import { BrandedCard } from './branded-card'
import { User, Building, Star, Target, Zap, Clock, Users, TrendingUp, Award, CheckCircle, ArrowRight, Sparkles, Shield } from 'lucide-react'

export function BrandShowcase() {
	const { currentVariant, switchVariant, isDarkMode } = useBrand()
	const colors = useBrandColors()
	const [selectedSection, setSelectedSection] = useState<'logos' | 'typography' | 'buttons' | 'cards' | 'layout'>('logos')

	const sections = [
		{ id: 'logos', label: 'Logos & Branding', icon: Star },
		{ id: 'typography', label: 'Typography', icon: Target },
		{ id: 'buttons', label: 'Buttons', icon: Zap },
		{ id: 'cards', label: 'Cards & Components', icon: Users },
		{ id: 'layout', label: 'Layout Examples', icon: TrendingUp }
	] as const

	const talentFeatures = [
		{ icon: Target, title: 'AI CV Parsing', description: 'Advanced accuracy in extracting your professional profile' },
		{ icon: Zap, title: 'Smart Matching', description: 'AI-powered job recommendations tailored to your skills' },
		{ icon: Shield, title: 'Privacy First', description: 'Complete data privacy protection with full user control' }
	]

	const teamFeatures = [
		{ icon: Users, title: 'AI Candidate Scoring', description: 'Intelligent ranking and scoring of candidates' },
		{ icon: Clock, title: 'Streamlined Hiring', description: 'Streamlined process with automated operations' },
		{ icon: TrendingUp, title: 'Real-time Analytics', description: 'Comprehensive insights into your hiring process' }
	]

	const currentFeatures = currentVariant === 'talent' ? talentFeatures : teamFeatures

	return (
		<div className="min-h-screen bg-brand-background">
			{/* Header */}
			<header className="bg-brand-surface border-b border-brand-border">
				<div className="max-w-7xl mx-auto px-4 py-6">
					<div className="flex items-center justify-between">
						<div className="flex items-center space-x-4">
							<BrandLogo variant="full" size="lg" />
							<div>
								<BrandedH2 variant="primary">Brand Guide Showcase</BrandedH2>
								<BrandedP>Complete TFTT brand implementation demo</BrandedP>
							</div>
						</div>
						<div className="flex items-center space-x-4">
							<div className="flex bg-brand-background rounded-lg p-1">
								<button
									onClick={() => switchVariant('talent')}
									className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
										currentVariant === 'talent'
											? 'bg-brand-primary text-white'
											: 'text-brand-text-secondary hover:text-brand-text-primary'
									}`}
								>
									Talent Brand
								</button>
								<button
									onClick={() => switchVariant('teams')}
									className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
										currentVariant === 'teams'
											? 'bg-brand-primary text-white'
											: 'text-brand-text-secondary hover:text-brand-text-primary'
									}`}
								>
									Teams Brand
								</button>
							</div>
						</div>
					</div>
				</div>
			</header>

			<div className="max-w-7xl mx-auto px-4 py-8">
				<div className="flex space-x-8">
					{/* Sidebar Navigation */}
					<div className="w-64 flex-shrink-0">
						<nav className="space-y-2">
							{sections.map((section) => {
								const Icon = section.icon
								return (
									<button
										key={section.id}
										onClick={() => setSelectedSection(section.id)}
										className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${
											selectedSection === section.id
												? 'bg-brand-primary text-white'
												: 'text-brand-text-primary hover:bg-brand-surface'
										}`}
									>
										<Icon className="h-5 w-5 mr-3" />
										{section.label}
									</button>
								)
							})}
						</nav>
					</div>

					{/* Content Area */}
					<div className="flex-1">
						{selectedSection === 'logos' && (
							<div className="space-y-8">
								<div>
									<BrandedH2 className="mb-4">Logo Variants</BrandedH2>
									<div className="grid grid-cols-2 gap-6">
										{/* Full Logo Examples */}
										<BrandedCard padding="lg" className="space-y-4">
											<BrandedH3>Full Logo Variants</BrandedH3>
											<div className="space-y-4">
												{['xs', 'sm', 'md', 'lg', 'xl'].map(size => (
													<div key={size} className="flex items-center space-x-4">
														<BrandedSpan className="w-8 text-sm">{size.toUpperCase()}</BrandedSpan>
														<BrandLogo variant="full" size={size as any} />
													</div>
												))}
											</div>
										</BrandedCard>

										{/* Icon Logo Examples */}
										<BrandedCard padding="lg" className="space-y-4">
											<BrandedH3>Icon Variants</BrandedH3>
											<div className="space-y-4">
												{['xs', 'sm', 'md', 'lg', 'xl'].map(size => (
													<div key={size} className="flex items-center space-x-4">
														<BrandedSpan className="w-8 text-sm">{size.toUpperCase()}</BrandedSpan>
														<BrandLogo variant="icon" size={size as any} />
													</div>
												))}
											</div>
										</BrandedCard>
									</div>
								</div>

								{/* Brand Colors */}
								<div>
									<BrandedH2 className="mb-4">Brand Colors</BrandedH2>
									<div className="grid grid-cols-4 gap-4">
										<BrandedCard padding="md" className="text-center">
											<div 
												className="w-full h-16 rounded-lg mb-3"
												style={{ backgroundColor: colors.primary }}
											/>
											<BrandedSpan className="font-medium">Primary</BrandedSpan>
											<BrandedSpan className="text-xs text-brand-text-secondary block">{colors.primary}</BrandedSpan>
										</BrandedCard>
										<BrandedCard padding="md" className="text-center">
											<div 
												className="w-full h-16 rounded-lg mb-3"
												style={{ backgroundColor: colors.secondary }}
											/>
											<BrandedSpan className="font-medium">Secondary</BrandedSpan>
											<BrandedSpan className="text-xs text-brand-text-secondary block">{colors.secondary}</BrandedSpan>
										</BrandedCard>
										<BrandedCard padding="md" className="text-center">
											<div 
												className="w-full h-16 rounded-lg mb-3"
												style={{ backgroundColor: colors.surface }}
											/>
											<BrandedSpan className="font-medium">Surface</BrandedSpan>
											<BrandedSpan className="text-xs text-brand-text-secondary block">{colors.surface}</BrandedSpan>
										</BrandedCard>
										<BrandedCard padding="md" className="text-center">
											<div 
												className="w-full h-16 rounded-lg mb-3"
												style={{ backgroundColor: colors.background }}
											/>
											<BrandedSpan className="font-medium">Background</BrandedSpan>
											<BrandedSpan className="text-xs text-brand-text-secondary block">{colors.background}</BrandedSpan>
										</BrandedCard>
									</div>
								</div>
							</div>
						)}

						{selectedSection === 'typography' && (
							<div className="space-y-8">
								<div>
									<BrandedH2 className="mb-4">Typography Scale</BrandedH2>
									<BrandedCard padding="lg" className="space-y-6">
										<BrandedH1 variant="primary">Heading 1 - Brand Display</BrandedH1>
										<BrandedH2 variant="primary">Heading 2 - Section Headers</BrandedH2>
										<BrandedH3 variant="primary">Heading 3 - Subsection Headers</BrandedH3>
										<BrandedH4 variant="primary">Heading 4 - Component Headers</BrandedH4>
										<BrandedP variant="primary">
											Primary paragraph text - This is the main body text used throughout the application. 
											It's designed to be highly readable and accessible across all devices and screen sizes.
										</BrandedP>
										<BrandedP variant="secondary">
											Secondary paragraph text - Used for supporting information, captions, and less critical content.
										</BrandedP>
										<BrandedSpan variant="muted">Small text and captions</BrandedSpan>
									</BrandedCard>
								</div>

								<div>
									<BrandedH2 className="mb-4">Text Variants</BrandedH2>
									<div className="grid grid-cols-2 gap-6">
										<BrandedCard padding="lg" variant="primary" className="space-y-4">
											<BrandedH3 variant="inverse">Inverse Text (On Primary)</BrandedH3>
											<BrandedP variant="inverse">
												This text appears on primary colored backgrounds and maintains high contrast for readability.
											</BrandedP>
										</BrandedCard>
										<BrandedCard padding="lg" variant="surface" className="space-y-4">
											<BrandedH3 variant="accent">Accent Text</BrandedH3>
											<BrandedP variant="primary">
												Accent text uses the brand primary color to highlight important information and create visual hierarchy.
											</BrandedP>
										</BrandedCard>
									</div>
								</div>
							</div>
						)}

						{selectedSection === 'buttons' && (
							<div className="space-y-8">
								<div>
									<BrandedH2 className="mb-4">Button Variants</BrandedH2>
									<div className="grid grid-cols-2 gap-6">
										{/* Primary Buttons */}
										<BrandedCard padding="lg" className="space-y-4">
											<BrandedH3>Primary Buttons</BrandedH3>
											<div className="space-y-3">
												{(['xs', 'sm', 'md', 'lg', 'xl'] as const).map(size => (
													<PrimaryButton key={size} size={size}>
														Primary {size.toUpperCase()}
													</PrimaryButton>
												))}
											</div>
										</BrandedCard>

										{/* Secondary Buttons */}
										<BrandedCard padding="lg" className="space-y-4">
											<BrandedH3>Secondary Buttons</BrandedH3>
											<div className="space-y-3">
												{(['xs', 'sm', 'md', 'lg', 'xl'] as const).map(size => (
													<SecondaryButton key={size} size={size}>
														Secondary {size.toUpperCase()}
													</SecondaryButton>
												))}
											</div>
										</BrandedCard>
									</div>
								</div>

								<div>
									<BrandedH2 className="mb-4">Button States & Variations</BrandedH2>
									<div className="grid grid-cols-3 gap-6">
										<BrandedCard padding="lg" className="space-y-4">
											<BrandedH3>Outline Buttons</BrandedH3>
											<div className="space-y-3">
												<OutlineButton size="sm">Small Outline</OutlineButton>
												<OutlineButton size="md">Medium Outline</OutlineButton>
												<OutlineButton size="lg">Large Outline</OutlineButton>
											</div>
										</BrandedCard>

										<BrandedCard padding="lg" className="space-y-4">
											<BrandedH3>Ghost Buttons</BrandedH3>
											<div className="space-y-3">
												<GhostButton size="sm">Small Ghost</GhostButton>
												<GhostButton size="md">Medium Ghost</GhostButton>
												<GhostButton size="lg">Large Ghost</GhostButton>
											</div>
										</BrandedCard>

										<BrandedCard padding="lg" className="space-y-4">
											<BrandedH3>With Icons</BrandedH3>
											<div className="space-y-3">
												<PrimaryButton 
													size="md" 
													leftIcon={<User className="h-4 w-4" />}
												>
													With Left Icon
												</PrimaryButton>
												<SecondaryButton 
													size="md" 
													rightIcon={<ArrowRight className="h-4 w-4" />}
												>
													With Right Icon
												</SecondaryButton>
												<OutlineButton 
													size="md" 
													loading={true}
												>
													Loading State
												</OutlineButton>
											</div>
										</BrandedCard>
									</div>
								</div>
							</div>
						)}

						{selectedSection === 'cards' && (
							<div className="space-y-8">
								<div>
									<BrandedH2 className="mb-4">Card Variants</BrandedH2>
									<div className="grid grid-cols-2 gap-6">
										{/* Default Cards */}
										<BrandedCard variant="default" padding="lg" className="space-y-3">
											<BrandedH3>Default Card</BrandedH3>
											<BrandedP>
												This is a default card with standard styling, perfect for general content display.
											</BrandedP>
											<PrimaryButton size="sm">Action Button</PrimaryButton>
										</BrandedCard>

										{/* Elevated Cards */}
										<BrandedCard variant="elevated" padding="lg" className="space-y-3">
											<BrandedH3>Elevated Card</BrandedH3>
											<BrandedP>
												Elevated cards have enhanced shadows and appear to float above the background.
											</BrandedP>
											<SecondaryButton size="sm">Secondary Action</SecondaryButton>
										</BrandedCard>

										{/* Outlined Cards */}
										<BrandedCard variant="outlined" padding="lg" className="space-y-3">
											<BrandedH3>Outlined Card</BrandedH3>
											<BrandedP>
												Outlined cards feature prominent borders and work well for content that needs definition.
											</BrandedP>
											<OutlineButton size="sm">Outline Action</OutlineButton>
										</BrandedCard>

										{/* Primary Cards */}
										<BrandedCard variant="primary" padding="lg" className="space-y-3">
											<BrandedH3 variant="inverse">Primary Card</BrandedH3>
											<BrandedP variant="inverse">
												Primary cards use the brand color as background and are perfect for highlighting key content.
											</BrandedP>
											<BrandedButton variant="outline" size="sm" style={{ borderColor: 'white', color: 'white' }}>
												Inverse Action
											</BrandedButton>
										</BrandedCard>
									</div>
								</div>

								<div>
									<BrandedH2 className="mb-4">Feature Cards</BrandedH2>
									<div className="grid grid-cols-3 gap-4">
										{currentFeatures.map((feature, index) => {
											const Icon = feature.icon
											return (
												<BrandedCard key={index} variant="elevated" padding="lg" interactive className="space-y-4">
													<div className="flex items-center space-x-3">
														<div 
															className="w-12 h-12 rounded-lg flex items-center justify-center"
															style={{ backgroundColor: `${colors.primary}20` }}
														>
															<Icon className="h-6 w-6" style={{ color: colors.primary }} />
														</div>
														<div>
															<BrandedH4 variant="primary">{feature.title}</BrandedH4>
														</div>
													</div>
													<BrandedP>{feature.description}</BrandedP>
													<div className="flex items-center text-sm" style={{ color: colors.primary }}>
														<CheckCircle className="h-4 w-4 mr-2" />
														<BrandedSpan variant="accent">Available Now</BrandedSpan>
													</div>
												</BrandedCard>
											)
										})}
									</div>
								</div>
							</div>
						)}

						{selectedSection === 'layout' && (
							<div className="space-y-8">
								<div>
									<BrandedH2 className="mb-4">Login Page Layout Example</BrandedH2>
									<BrandedCard variant="elevated" padding="xl" className="space-y-6">
										<div className="flex items-center justify-between">
											<BrandLogo variant="full" size="md" />
											<div className="flex items-center space-x-4">
												<BrandedSpan variant="secondary">New to TFTT?</BrandedSpan>
												<OutlineButton size="sm">
													{currentVariant === 'talent' ? 'Join as Talent' : 'Join as Team'}
												</OutlineButton>
											</div>
										</div>
										
										<div className="grid grid-cols-2 gap-8">
											{/* Benefits Section */}
											<div 
												className="p-8 rounded-xl relative overflow-hidden"
												style={{
													background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`
												}}
											>
												<div className="relative z-10">
													<div className="flex items-center mb-6">
														<div 
															className="w-12 h-12 rounded-xl flex items-center justify-center mr-4"
															style={{ backgroundColor: colors.text.inverse }}
														>
															{currentVariant === 'talent' ? (
																<User className="h-6 w-6" style={{ color: colors.primary }} />
															) : (
																<Building className="h-6 w-6" style={{ color: colors.primary }} />
															)}
														</div>
														<div>
															<BrandedH3 variant="inverse">
																{currentVariant === 'talent' ? 'Welcome Back, Talent!' : 'Welcome Back, Team!'}
															</BrandedH3>
															<BrandedP variant="inverse" className="text-white/90">
																{currentVariant === 'talent' ? 'Your next opportunity awaits' : 'Build your dream team with AI'}
															</BrandedP>
														</div>
													</div>
													
													<div className="space-y-4">
														{currentFeatures.slice(0, 2).map((feature, index) => {
															const Icon = feature.icon
															return (
																<div key={index} className="flex items-start space-x-3">
																	<div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
																		<Icon className="h-4 w-4 text-white" />
																	</div>
																	<div>
																		<BrandedSpan variant="inverse" className="font-semibold">
																			{feature.title}
																		</BrandedSpan>
																		<BrandedP variant="inverse" className="text-sm text-white/80">
																			{feature.description}
																		</BrandedP>
																	</div>
																</div>
															)
														})}
													</div>
												</div>
											</div>

											{/* Form Section */}
											<div className="space-y-6">
												<div className="text-center">
													<BrandedH3 variant="primary">
														{currentVariant === 'talent' ? 'Sign In to Your Account' : 'Access Your Team Dashboard'}
													</BrandedH3>
													<BrandedP>
														{currentVariant === 'talent' 
															? 'Access your talent dashboard and opportunities'
															: 'Manage your hiring process and find top talent'
														}
													</BrandedP>
												</div>

												<div className="space-y-4">
													<div>
														<label className="block text-sm font-medium text-brand-text-primary mb-2">
															Email Address
														</label>
														<input
															type="email"
															className="w-full px-4 py-3 border border-brand-border rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent bg-brand-background text-brand-text-primary"
															placeholder="Enter your email"
														/>
													</div>
													<div>
														<label className="block text-sm font-medium text-brand-text-primary mb-2">
															Password
														</label>
														<input
															type="password"
															className="w-full px-4 py-3 border border-brand-border rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent bg-brand-background text-brand-text-primary"
															placeholder="Enter your password"
														/>
													</div>
													<PrimaryButton fullWidth className="py-3">
														{currentVariant === 'talent' ? 'Sign In' : 'Access Dashboard'}
													</PrimaryButton>
												</div>
											</div>
										</div>
									</BrandedCard>
								</div>

								<div>
									<BrandedH2 className="mb-4">Dashboard Layout Example</BrandedH2>
									<BrandedCard variant="elevated" padding="lg" className="space-y-4">
										{/* Header */}
										<div className="flex items-center justify-between pb-4 border-b border-brand-border">
											<div className="flex items-center space-x-4">
												<BrandLogo variant="icon" size="md" />
												<div>
													<BrandedH3 variant="primary">
														{currentVariant === 'talent' ? 'Talent Dashboard' : 'Team Dashboard'}
													</BrandedH3>
													<BrandedSpan variant="secondary">
														{currentVariant === 'talent' ? 'Manage your profile and applications' : 'Manage your hiring process'}
													</BrandedSpan>
												</div>
											</div>
											<div className="flex items-center space-x-3">
												<OutlineButton size="sm">Settings</OutlineButton>
												<PrimaryButton size="sm" rightIcon={<ArrowRight className="h-4 w-4" />}>
													{currentVariant === 'talent' ? 'Find Jobs' : 'Post Job'}
												</PrimaryButton>
											</div>
										</div>

										{/* Stats Grid */}
										<div className="grid grid-cols-4 gap-4">
											{[
												{ label: currentVariant === 'talent' ? 'Profile Views' : 'Active Jobs', value: '127' },
												{ label: currentVariant === 'talent' ? 'Applications' : 'Candidates', value: '23' },
												{ label: currentVariant === 'talent' ? 'Interviews' : 'Interviews', value: '8' },
												{ label: currentVariant === 'talent' ? 'Match Score' : 'Hired', value: currentVariant === 'talent' ? '92%' : '12' }
											].map((stat, index) => (
												<BrandedCard key={index} variant="surface" padding="md" className="text-center">
													<BrandedH3 variant="primary">{stat.value}</BrandedH3>
													<BrandedSpan variant="secondary" className="text-sm">{stat.label}</BrandedSpan>
												</BrandedCard>
											))}
										</div>
									</BrandedCard>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	)
} 