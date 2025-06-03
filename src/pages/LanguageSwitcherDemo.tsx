import React from 'react'
import { useTranslation } from 'react-i18next'
import { useBrand, useBrandColors } from '../brand'
import { 
	LanguageSwitcher, 
	CompactLanguageSwitcher, 
	FullLanguageSwitcher 
} from '../components/brand/language-switcher/language-switcher'
import { 
	EmiratesStyleSwitcher, 
	CompactEmiratesStyleSwitcher 
} from '../components/brand/language-switcher/emirates-style-switcher'

function LanguageSwitcherDemo() {
	const { t } = useTranslation()
	const { isTeamsVariant } = useBrand()
	const colors = useBrandColors()

	return (
		<div className="min-h-screen bg-brand-background">
			{/* Header */}
			<div className="bg-brand-surface border-b border-brand shadow-sm">
				<div className="max-w-4xl mx-auto px-4 py-6">
					<h1 className="text-3xl font-bold font-brand text-brand-text-primary">
						{t('demo.languageSwitcher.title', 'Language Switcher Comparison')}
					</h1>
					<p className="mt-2 text-brand-text-secondary">
						{t('demo.languageSwitcher.subtitle', 'Compare different language switcher styles and variants')}
					</p>
				</div>
			</div>

			<div className="max-w-4xl mx-auto px-4 py-8 space-y-12">
				{/* Emirates Style Switcher */}
				<section className="space-y-6">
					<h2 className="text-2xl font-bold text-brand-text-primary font-brand">
						Emirates Style Switcher 🛬
					</h2>
					<p className="text-brand-text-secondary">
						Inspired by Emirates website's clean and minimal country/region selector.
					</p>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						{/* Emirates Style - Regular */}
						<div className="card p-6">
							<h3 className="text-lg font-semibold text-brand-text-primary mb-4">
								Emirates Style - Regular
							</h3>
							<div className="flex justify-center">
								<EmiratesStyleSwitcher />
							</div>
							<p className="text-sm text-brand-text-secondary mt-4">
								Shows country code (US/DE) with rich dropdown containing country flags and descriptions.
							</p>
						</div>

						{/* Emirates Style - Compact */}
						<div className="card p-6">
							<h3 className="text-lg font-semibold text-brand-text-primary mb-4">
								Emirates Style - Compact
							</h3>
							<div className="flex justify-center">
								<CompactEmiratesStyleSwitcher />
							</div>
							<p className="text-sm text-brand-text-secondary mt-4">
								Perfect for navigation bars - minimal space usage with country code display.
							</p>
						</div>
					</div>
				</section>

				{/* Original Style Switchers */}
				<section className="space-y-6">
					<h2 className="text-2xl font-bold text-brand-text-primary font-brand">
						Original Style Switchers
					</h2>
					<p className="text-brand-text-secondary">
						The original language switcher variants with different display options.
					</p>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						{/* Dropdown with Label */}
						<div className="card p-6">
							<h3 className="text-lg font-semibold text-brand-text-primary mb-4">
								Dropdown with Label
							</h3>
							<div className="flex justify-center">
								<LanguageSwitcher 
									variant="dropdown" 
									showFlag={true} 
									showLabel={true} 
								/>
							</div>
							<p className="text-sm text-brand-text-secondary mt-4">
								Full dropdown with flag and language name.
							</p>
						</div>

						{/* Compact (Flag Only) */}
						<div className="card p-6">
							<h3 className="text-lg font-semibold text-brand-text-primary mb-4">
								Compact (Flag Only)
							</h3>
							<div className="flex justify-center">
								<CompactLanguageSwitcher />
							</div>
							<p className="text-sm text-brand-text-secondary mt-4">
								Flag-only display for minimal space usage.
							</p>
						</div>

						{/* Button Style */}
						<div className="card p-6">
							<h3 className="text-lg font-semibold text-brand-text-primary mb-4">
								Button Style
							</h3>
							<div className="flex justify-center">
								<FullLanguageSwitcher />
							</div>
							<p className="text-sm text-brand-text-secondary mt-4">
								Button-style switcher for settings pages.
							</p>
						</div>
					</div>
				</section>

				{/* Usage Examples */}
				<section className="space-y-6">
					<h2 className="text-2xl font-bold text-brand-text-primary font-brand">
						Usage Examples
					</h2>

					{/* Navigation Bar Example */}
					<div className="space-y-4">
						<h3 className="text-xl font-semibold text-brand-text-primary">
							Navigation Bar Usage
						</h3>
						
						{/* Emirates Style in Navbar */}
						<div 
							className="rounded-lg border p-4"
							style={{ backgroundColor: colors.surface, borderColor: colors.border }}
						>
							<div className="flex items-center justify-between">
								<div className="flex items-center space-x-4">
									<div 
										className="w-8 h-8 rounded-lg flex items-center justify-center"
										style={{ backgroundColor: colors.primary }}
									>
										<span className="text-white font-bold text-sm">
											{isTeamsVariant ? 'T' : 'F'}
										</span>
									</div>
									<span className="font-semibold text-brand-text-primary">
										Teams for the Talent
									</span>
								</div>
								
								<div className="flex items-center space-x-4">
									<nav className="hidden md:flex space-x-4">
										<a href="#" className="text-brand-text-primary hover:text-brand-primary">Home</a>
										<a href="#" className="text-brand-text-primary hover:text-brand-primary">About</a>
										<a href="#" className="text-brand-text-primary hover:text-brand-primary">Contact</a>
									</nav>
									<CompactEmiratesStyleSwitcher />
								</div>
							</div>
						</div>
						<p className="text-sm text-brand-text-secondary">
							Emirates style in a typical navigation bar - clean and minimal.
						</p>
					</div>

					{/* Settings Page Example */}
					<div className="space-y-4">
						<h3 className="text-xl font-semibold text-brand-text-primary">
							Settings Page Usage
						</h3>
						
						<div 
							className="rounded-lg border p-6"
							style={{ backgroundColor: colors.surface, borderColor: colors.border }}
						>
							<div className="space-y-4">
								<h4 className="font-semibold text-brand-text-primary">
									Language & Region Settings
								</h4>
								<div className="space-y-3">
									<div>
										<label className="block text-sm font-medium text-brand-text-primary mb-2">
											Choose Language
										</label>
										<FullLanguageSwitcher />
									</div>
								</div>
							</div>
						</div>
						<p className="text-sm text-brand-text-secondary">
							Button style works well in settings and preference pages.
						</p>
					</div>
				</section>

				{/* Technical Details */}
				<section className="space-y-4">
					<h2 className="text-2xl font-bold text-brand-text-primary font-brand">
						Technical Details
					</h2>
					
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div className="card p-6 space-y-3">
							<h3 className="font-semibold text-brand-text-primary">
								Emirates Style Features
							</h3>
							<ul className="text-sm text-brand-text-secondary space-y-1">
								<li>• Country code display (US, DE)</li>
								<li>• Rich dropdown with country info</li>
								<li>• Flag and language description</li>
								<li>• Click outside to close</li>
								<li>• Keyboard accessible</li>
								<li>• Brand color integration</li>
							</ul>
						</div>

						<div className="card p-6 space-y-3">
							<h3 className="font-semibold text-brand-text-primary">
								Original Style Features
							</h3>
							<ul className="text-sm text-brand-text-secondary space-y-1">
								<li>• Multiple display variants</li>
								<li>• Flag and label options</li>
								<li>• Button and dropdown modes</li>
								<li>• Size options (sm, md, lg)</li>
								<li>• Customizable styling</li>
								<li>• Full accessibility support</li>
							</ul>
						</div>
					</div>
				</section>
			</div>
		</div>
	)
}

export default LanguageSwitcherDemo 