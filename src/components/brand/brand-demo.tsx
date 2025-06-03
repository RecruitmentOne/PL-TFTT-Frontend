import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useBrand, useBrandColors } from '../../brand'
import { 
	PrimaryButton, 
	SecondaryButton, 
	OutlineButton, 
	GhostButton, 
	ButtonGroup 
} from './branded-button/branded-button'
import { 
	LanguageSwitcher, 
	CompactLanguageSwitcher,
	FullLanguageSwitcher 
} from './language-switcher/language-switcher'
import { 
	Dropdown, 
	SimpleDropdown, 
	MultiSelectDropdown, 
	SearchableDropdown 
} from '../ui/dropdown/dropdown'
import { Settings, Palette, Moon, Sun, Eye, EyeOff, Monitor, Globe } from 'lucide-react'

export function BrandDemo() {
	const { t } = useTranslation()
	const { currentVariant, switchVariant, isTeamsVariant } = useBrand()
	const colors = useBrandColors()

	// Dropdown demo state
	const [selectedCountry, setSelectedCountry] = useState<string | number>('')
	const [selectedSkills, setSelectedSkills] = useState<(string | number)[]>([])
	const [selectedRole, setSelectedRole] = useState<string | number>('')
	const [advancedSelection, setAdvancedSelection] = useState<string | number>('')

	// Theme demo state
	const [themeMode, setThemeMode] = useState<'light' | 'dark' | 'auto'>('light')
	const [colorScheme, setColorScheme] = useState<'default' | 'high-contrast' | 'colorblind-friendly'>('default')
	const [reducedMotion, setReducedMotion] = useState(false)

	// Sample data for dropdowns
	const countries = [
		{ value: 'de', label: 'Germany', description: 'Deutschland', icon: '🇩🇪', group: 'Primary Markets' },
		{ value: 'ch', label: 'Switzerland', description: 'Schweiz', icon: '🇨🇭', group: 'Primary Markets' },
		{ value: 'at', label: 'Austria', description: 'Österreich', icon: '🇦🇹', group: 'Secondary Markets' },
		{ value: 'pl', label: 'Poland', description: 'Polska', icon: '🇵🇱', group: 'Secondary Markets' },
		{ value: 'cz', label: 'Czech Republic', description: 'Česká republika', icon: '🇨🇿', group: 'Secondary Markets' },
	]

	const skills = [
		{ value: 'react', label: 'React' },
		{ value: 'typescript', label: 'TypeScript' },
		{ value: 'node', label: 'Node.js' },
		{ value: 'python', label: 'Python' },
		{ value: 'java', label: 'Java' },
		{ value: 'docker', label: 'Docker' },
		{ value: 'aws', label: 'AWS' },
		{ value: 'kubernetes', label: 'Kubernetes' },
	]

	const jobRoles = [
		{ value: 'frontend', label: 'Frontend Developer', description: 'React, Vue, Angular development' },
		{ value: 'backend', label: 'Backend Developer', description: 'API and server-side development' },
		{ value: 'fullstack', label: 'Full Stack Developer', description: 'End-to-end application development' },
		{ value: 'devops', label: 'DevOps Engineer', description: 'Infrastructure and deployment' },
		{ value: 'data', label: 'Data Scientist', description: 'Analytics and machine learning' },
	]

	const advancedOptions = [
		{ 
			value: 'option1', 
			label: 'Advanced Option 1', 
			description: 'This is a complex option with custom rendering',
			icon: <Settings className="h-4 w-4" />,
			group: 'Configuration'
		},
		{ 
			value: 'option2', 
			label: 'Advanced Option 2', 
			description: 'Another option with different styling',
			icon: <Palette className="h-4 w-4" />,
			group: 'Configuration'
		},
		{ 
			value: 'disabled', 
			label: 'Disabled Option', 
			description: 'This option is disabled',
			disabled: true,
			group: 'Status'
		},
	]

	const themeOptions = [
		{ value: 'light', label: 'Light Mode', icon: <Sun className="h-4 w-4" /> },
		{ value: 'dark', label: 'Dark Mode', icon: <Moon className="h-4 w-4" /> },
		{ value: 'auto', label: 'System', icon: <Monitor className="h-4 w-4" /> },
	]

	const colorSchemeOptions = [
		{ value: 'default', label: 'Default', description: 'Standard color palette' },
		{ value: 'high-contrast', label: 'High Contrast', description: 'Enhanced accessibility' },
		{ value: 'colorblind-friendly', label: 'Colorblind Friendly', description: 'Optimized for color vision' },
	]

	return (
		<div className="min-h-screen bg-brand-background p-6">
			<div className="max-w-6xl mx-auto space-y-8">
				{/* Header */}
				<div className="text-center">
					<h1 className="text-4xl font-bold font-brand text-brand-text-primary mb-4">
						{t('demo.title', 'TFTT Brand System Demo')}
					</h1>
					<p className="text-lg text-brand-text-secondary">
						{t('demo.subtitle', `Demonstrating ${currentVariant} variant with advanced theming`)}
					</p>
				</div>

				{/* Brand Variant Switcher */}
				<div className="card text-center">
					<h2 className="text-2xl font-semibold mb-6">Brand Variant Selection</h2>
					<div className="flex justify-center space-x-4">
						<button
							onClick={() => switchVariant('teams')}
							className={`px-6 py-3 rounded-lg font-semibold transition-all ${
								isTeamsVariant ? 'transform scale-105' : ''
							}`}
							style={{
								backgroundColor: isTeamsVariant ? colors.primary : colors.surface,
								color: isTeamsVariant ? colors.text.inverse : colors.text.primary,
								border: `2px solid ${isTeamsVariant ? colors.primary : colors.border}`
							}}
						>
							🏢 Teams Variant
						</button>
						<button
							onClick={() => switchVariant('talent')}
							className={`px-6 py-3 rounded-lg font-semibold transition-all ${
								!isTeamsVariant ? 'transform scale-105' : ''
							}`}
							style={{
								backgroundColor: !isTeamsVariant ? colors.primary : colors.surface,
								color: !isTeamsVariant ? colors.text.inverse : colors.text.primary,
								border: `2px solid ${!isTeamsVariant ? colors.primary : colors.border}`
							}}
						>
							👤 Talent Variant
						</button>
					</div>
				</div>

				{/* Advanced Theme Settings */}
				<div className="card space-y-6">
					<h2 className="text-2xl font-semibold">Advanced Theme Settings</h2>
					
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						{/* Theme Mode */}
						<div>
							<label className="block text-sm font-medium font-brand text-brand-text-primary mb-2">
								Theme Mode
							</label>
							<SimpleDropdown
								options={themeOptions}
								value={themeMode}
								onChange={(value) => setThemeMode(value as 'light' | 'dark' | 'auto')}
								placeholder="Select theme mode..."
							/>
						</div>

						{/* Color Scheme */}
						<div>
							<label className="block text-sm font-medium font-brand text-brand-text-primary mb-2">
								Color Scheme
							</label>
							<Dropdown
								options={colorSchemeOptions}
								value={colorScheme}
								onChange={(value) => setColorScheme(value as 'default' | 'high-contrast' | 'colorblind-friendly')}
								placeholder="Select color scheme..."
								size="md"
								variant="bordered"
							/>
						</div>

						{/* Accessibility */}
						<div>
							<label className="block text-sm font-medium font-brand text-brand-text-primary mb-2">
								Accessibility
							</label>
							<button
								onClick={() => setReducedMotion(!reducedMotion)}
								className="btn btn-outline w-full flex items-center justify-center"
								style={{
									borderColor: colors.border,
									color: reducedMotion ? colors.primary : colors.text.secondary
								}}
							>
								{reducedMotion ? <EyeOff className="h-4 w-4 mr-2" /> : <Eye className="h-4 w-4 mr-2" />}
								{reducedMotion ? 'Reduced Motion ON' : 'Reduced Motion OFF'}
							</button>
						</div>
					</div>
				</div>

				{/* Dropdown Components Showcase */}
				<div className="card space-y-6">
					<h2 className="text-2xl font-semibold">Advanced Dropdown Components</h2>
					
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						{/* Simple Dropdown */}
						<div>
							<h3 className="text-lg font-medium mb-3">Simple Dropdown</h3>
							<SimpleDropdown
								options={skills}
								value={selectedRole}
								onChange={(value) => {
									if (typeof value === 'string' || typeof value === 'number') {
										setSelectedRole(value)
									}
								}}
								placeholder="Select a skill..."
							/>
						</div>

						{/* Searchable Dropdown with Grouping */}
						<div>
							<h3 className="text-lg font-medium mb-3">Searchable with Groups</h3>
							<Dropdown
								options={countries}
								value={selectedCountry}
								onChange={(value) => {
									if (!Array.isArray(value)) {
										setSelectedCountry(value)
									}
								}}
								placeholder="Search countries..."
								searchable
								grouping
								clearable
								size="md"
								variant="filled"
							/>
						</div>

						{/* Multi-Select Dropdown */}
						<div>
							<h3 className="text-lg font-medium mb-3">Multi-Select</h3>
							<MultiSelectDropdown
								options={skills}
								value={selectedSkills}
								onChange={setSelectedSkills}
								placeholder="Select multiple skills..."
							/>
						</div>

						{/* Advanced Custom Dropdown */}
						<div>
							<h3 className="text-lg font-medium mb-3">Custom Rendered</h3>
							<Dropdown
								options={advancedOptions}
								value={advancedSelection}
								onChange={(value) => {
									if (!Array.isArray(value)) {
										setAdvancedSelection(value)
									}
								}}
								placeholder="Advanced options..."
								grouping
								variant="bordered"
								customRender={(option) => (
									<div className="flex items-center">
										{option.icon && <span className="mr-2">{option.icon}</span>}
										<div>
											<div className="font-medium">{option.label}</div>
											<div className="text-xs opacity-75">{option.description}</div>
										</div>
									</div>
								)}
							/>
						</div>

						{/* Large Searchable Dropdown */}
						<div className="md:col-span-2">
							<h3 className="text-lg font-medium mb-3">Large Searchable with Descriptions</h3>
							<SearchableDropdown
								options={jobRoles}
								value={selectedRole}
								onChange={(value) => {
									if (typeof value === 'string' || typeof value === 'number') {
										setSelectedRole(value)
									}
								}}
								placeholder="Search for job roles..."
								emptyMessage="No matching roles found"
								className="w-full"
							/>
						</div>
					</div>
				</div>

				{/* Button Components */}
				<div className="card space-y-6">
					<h2 className="text-2xl font-semibold">Button Components</h2>
					
					<div className="space-y-4">
						<div>
							<h3 className="text-lg font-medium mb-3">Primary & Secondary</h3>
							<ButtonGroup>
								<PrimaryButton>{t('common.save')}</PrimaryButton>
								<SecondaryButton>{t('common.cancel')}</SecondaryButton>
							</ButtonGroup>
						</div>

						<div>
							<h3 className="text-lg font-medium mb-3">Outline & Ghost</h3>
							<ButtonGroup>
								<OutlineButton>{t('common.edit')}</OutlineButton>
								<GhostButton>{t('common.delete')}</GhostButton>
							</ButtonGroup>
						</div>

						<div>
							<h3 className="text-lg font-medium mb-3">Sizes</h3>
							<ButtonGroup>
								<PrimaryButton size="xs">XS</PrimaryButton>
								<PrimaryButton size="sm">SM</PrimaryButton>
								<PrimaryButton size="md">MD</PrimaryButton>
								<PrimaryButton size="lg">LG</PrimaryButton>
								<PrimaryButton size="xl">XL</PrimaryButton>
							</ButtonGroup>
						</div>

						<div>
							<h3 className="text-lg font-medium mb-3">Loading State</h3>
							<PrimaryButton loading>{t('common.loading')}</PrimaryButton>
						</div>
					</div>
				</div>

				{/* Language Switcher Variants */}
				<div className="card space-y-6">
					<h2 className="text-2xl font-semibold">Language Switcher Variants</h2>
					
					<div className="space-y-4">
						<div>
							<h3 className="text-lg font-medium mb-3">Dropdown (Compact)</h3>
							<CompactLanguageSwitcher />
						</div>

						<div>
							<h3 className="text-lg font-medium mb-3">Dropdown (Full)</h3>
							<LanguageSwitcher variant="dropdown" showFlag={true} showLabel={true} />
						</div>

						<div>
							<h3 className="text-lg font-medium mb-3">Button Group</h3>
							<FullLanguageSwitcher />
						</div>
					</div>
				</div>

				{/* Form Elements */}
				<div className="card space-y-6">
					<h2 className="text-2xl font-semibold">Form Elements</h2>
					
					<div className="space-y-4">
						<div>
							<label className="block text-sm font-medium font-brand text-brand-text-primary mb-2">
								Sample Input
							</label>
							<input
								type="text"
								className="form-input"
								placeholder="Enter some text..."
							/>
						</div>

						<div>
							<label className="block text-sm font-medium font-brand text-brand-text-primary mb-2">
								Sample Textarea
							</label>
							<textarea
								className="form-input"
								rows={3}
								placeholder="Enter a longer message..."
							/>
						</div>
					</div>
				</div>

				{/* Color Palette */}
				<div className="card space-y-6">
					<h2 className="text-2xl font-semibold">Color Palette</h2>
					
					<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
						<div className="text-center">
							<div 
								className="w-16 h-16 rounded-lg mx-auto mb-2"
								style={{ backgroundColor: colors.primary }}
							/>
							<div className="text-sm font-medium">Primary</div>
							<div className="text-xs text-brand-text-secondary">{colors.primary}</div>
						</div>
						
						<div className="text-center">
							<div 
								className="w-16 h-16 rounded-lg mx-auto mb-2"
								style={{ backgroundColor: colors.secondary }}
							/>
							<div className="text-sm font-medium">Secondary</div>
							<div className="text-xs text-brand-text-secondary">{colors.secondary}</div>
						</div>
						
						<div className="text-center">
							<div 
								className="w-16 h-16 rounded-lg mx-auto mb-2 border"
								style={{ 
									backgroundColor: colors.surface,
									borderColor: colors.border
								}}
							/>
							<div className="text-sm font-medium">Surface</div>
							<div className="text-xs text-brand-text-secondary">{colors.surface}</div>
						</div>
						
						<div className="text-center">
							<div 
								className="w-16 h-16 rounded-lg mx-auto mb-2 border"
								style={{ 
									backgroundColor: colors.background,
									borderColor: colors.border
								}}
							/>
							<div className="text-sm font-medium">Background</div>
							<div className="text-xs text-brand-text-secondary">{colors.background}</div>
						</div>
					</div>
				</div>

				{/* Demo State Display */}
				<div className="card">
					<h3 className="text-lg font-semibold mb-4">Current Selections</h3>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
						<div>
							<strong>Brand Variant:</strong> {currentVariant}
						</div>
						<div>
							<strong>Theme Mode:</strong> {themeMode}
						</div>
						<div>
							<strong>Color Scheme:</strong> {colorScheme}
						</div>
						<div>
							<strong>Reduced Motion:</strong> {reducedMotion ? 'Enabled' : 'Disabled'}
						</div>
						<div>
							<strong>Selected Country:</strong> {selectedCountry || 'None'}
						</div>
						<div>
							<strong>Selected Skills:</strong> {selectedSkills.length > 0 ? selectedSkills.join(', ') : 'None'}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
} 