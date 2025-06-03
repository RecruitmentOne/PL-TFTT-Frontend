import React, { useState, useEffect } from 'react'
import { 
	User, 
	Bell, 
	Shield, 
	Eye, 
	Lock, 
	Trash2, 
	Save, 
	LogOut, 
	Moon, 
	Sun, 
	Monitor,
	CreditCard,
	Building,
	MapPin,
	Phone,
	Mail,
	Globe,
	Camera,
	Check,
	X,
	Settings as SettingsIcon,
	Briefcase
} from 'lucide-react'
import { useBrandColors } from '../../../brand'
import { DashboardUser, UserSettings } from '../../../types/dashboard'
import { dashboardAPI } from '../../../services/dashboardAPI'

interface SettingsPageProps {
	user: DashboardUser
	onUserUpdate?: (user: DashboardUser) => void
}

interface SettingsTabProps {
	id: string
	name: string
	icon: React.ReactNode
	isActive: boolean
	onClick: () => void
}

interface NotificationSettingsProps {
	settings: any
	onUpdate: (settings: any) => void
}

interface AccountSettingsProps {
	user: DashboardUser
	onUpdate: (data: any) => void
}

interface SecuritySettingsProps {
	onUpdate: (data: any) => void
}

function SettingsTab({ id, name, icon, isActive, onClick }: SettingsTabProps) {
	const colors = useBrandColors()
	const [isHovered, setIsHovered] = useState(false)

	return (
		<button
			onClick={onClick}
			className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg text-left transition-all duration-200 ${
				isActive ? 'shadow-sm' : ''
			}`}
			style={{
				backgroundColor: isActive ? colors.primary : (isHovered ? colors.hover : 'transparent'),
				color: isActive ? colors.text.inverse : colors.text.primary
			}}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<span className={isActive ? 'text-white' : ''}>
				{icon}
			</span>
			<span className="font-medium">{name}</span>
		</button>
	)
}

function AccountSettings({ user, onUpdate }: AccountSettingsProps) {
	const colors = useBrandColors()
	const [formData, setFormData] = useState({
		firstName: user.firstName,
		lastName: user.lastName,
		email: user.email,
		phone: user.phone || '',
		location: user.location || '',
		bio: user.bio || '',
		companyName: user.companyName || '',
		website: user.website || '',
		linkedin: user.linkedin || '',
		currentJobTitle: user.currentJobTitle || ''
	})
	const [isEditing, setIsEditing] = useState(false)
	const [saving, setSaving] = useState(false)

	const handleSave = async () => {
		try {
			setSaving(true)
			await dashboardAPI.updateProfile(formData)
			onUpdate(formData)
			setIsEditing(false)
		} catch (error) {
			console.error('Failed to update profile:', error)
		} finally {
			setSaving(false)
		}
	}

	const isTeam = user.userType === 'team'

	return (
		<div className="space-y-6">
			{/* Profile Picture */}
			<div className="flex items-center space-x-6">
				<div 
					className="w-20 h-20 rounded-full flex items-center justify-center text-white text-2xl font-semibold"
					style={{ 
						backgroundColor: colors.primary,
						backgroundImage: user.profilePicture ? `url(${user.profilePicture})` : undefined,
						backgroundSize: 'cover',
						backgroundPosition: 'center'
					}}
				>
					{!user.profilePicture && (
						<User className="w-10 h-10" />
					)}
				</div>
				<div>
					<button
						className="flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-opacity duration-200 hover:opacity-90"
						style={{ 
							backgroundColor: colors.primary,
							color: colors.text.inverse
						}}
					>
						<Camera className="w-4 h-4" />
						<span>Change Photo</span>
					</button>
					<p 
						className="text-sm mt-2"
						style={{ color: colors.text.secondary }}
					>
						JPG, GIF or PNG. Max size 2MB.
					</p>
				</div>
			</div>

			{/* Basic Information */}
			<div 
				className="p-6 rounded-xl border"
				style={{ 
					backgroundColor: colors.surface,
					borderColor: colors.border
				}}
			>
				<div className="flex items-center justify-between mb-6">
					<h3 
						className="text-lg font-semibold"
						style={{ color: colors.text.primary }}
					>
						Basic Information
					</h3>
					{!isEditing ? (
						<button
							onClick={() => setIsEditing(true)}
							className="px-4 py-2 rounded-lg font-medium transition-opacity duration-200 hover:opacity-80"
							style={{ 
								backgroundColor: colors.border,
								color: colors.text.primary
							}}
						>
							Edit
						</button>
					) : (
						<div className="flex space-x-2">
							<button
								onClick={() => setIsEditing(false)}
								className="p-2 rounded-lg transition-colors duration-200"
								style={{ 
									color: colors.error,
									backgroundColor: colors.error + '20'
								}}
							>
								<X className="w-4 h-4" />
							</button>
							<button
								onClick={handleSave}
								disabled={saving}
								className="p-2 rounded-lg transition-colors duration-200"
								style={{ 
									color: colors.success,
									backgroundColor: colors.success + '20'
								}}
							>
								{saving ? (
									<div 
										className="w-4 h-4 border-2 border-t-transparent rounded-full animate-spin"
										style={{ borderColor: colors.success }}
									/>
								) : (
									<Check className="w-4 h-4" />
								)}
							</button>
						</div>
					)}
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<div>
						<label 
							className="block text-sm font-medium mb-2"
							style={{ color: colors.text.secondary }}
						>
							First Name
						</label>
						{isEditing ? (
							<input
								type="text"
								value={formData.firstName}
								onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
								className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2"
								style={{ 
									borderColor: colors.border,
									backgroundColor: colors.background,
									color: colors.text.primary
								}}
							/>
						) : (
							<p 
								className="py-2"
								style={{ color: colors.text.primary }}
							>
								{formData.firstName}
							</p>
						)}
					</div>

					<div>
						<label 
							className="block text-sm font-medium mb-2"
							style={{ color: colors.text.secondary }}
						>
							Last Name
						</label>
						{isEditing ? (
							<input
								type="text"
								value={formData.lastName}
								onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
								className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2"
								style={{ 
									borderColor: colors.border,
									backgroundColor: colors.background,
									color: colors.text.primary
								}}
							/>
						) : (
							<p 
								className="py-2"
								style={{ color: colors.text.primary }}
							>
								{formData.lastName}
							</p>
						)}
					</div>

					<div>
						<label 
							className="block text-sm font-medium mb-2"
							style={{ color: colors.text.secondary }}
						>
							Email
						</label>
						<div className="flex items-center space-x-2">
							<Mail className="w-4 h-4" style={{ color: colors.text.tertiary }} />
							{isEditing ? (
								<input
									type="email"
									value={formData.email}
									onChange={(e) => setFormData({ ...formData, email: e.target.value })}
									className="flex-1 px-3 py-2 rounded-lg border focus:outline-none focus:ring-2"
									style={{ 
										borderColor: colors.border,
										backgroundColor: colors.background,
										color: colors.text.primary
									}}
								/>
							) : (
								<p 
									className="py-2 flex-1"
									style={{ color: colors.text.primary }}
								>
									{formData.email}
								</p>
							)}
						</div>
					</div>

					<div>
						<label 
							className="block text-sm font-medium mb-2"
							style={{ color: colors.text.secondary }}
						>
							Phone
						</label>
						<div className="flex items-center space-x-2">
							<Phone className="w-4 h-4" style={{ color: colors.text.tertiary }} />
							{isEditing ? (
								<input
									type="tel"
									value={formData.phone}
									onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
									className="flex-1 px-3 py-2 rounded-lg border focus:outline-none focus:ring-2"
									style={{ 
										borderColor: colors.border,
										backgroundColor: colors.background,
										color: colors.text.primary
									}}
								/>
							) : (
								<p 
									className="py-2 flex-1"
									style={{ color: colors.text.primary }}
								>
									{formData.phone || 'Not provided'}
								</p>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

function NotificationSettings({ settings, onUpdate }: NotificationSettingsProps) {
	const colors = useBrandColors()
	const [notificationSettings, setNotificationSettings] = useState({
		emailNotifications: {
			jobMatches: true,
			newMessages: true,
			profileViews: false,
			weeklyDigest: true,
			marketing: false
		},
		pushNotifications: {
			jobMatches: true,
			newMessages: true,
			profileViews: false,
			reminders: true
		}
	})

	return (
		<div className="space-y-6">
			<div 
				className="p-6 rounded-xl border"
				style={{ 
					backgroundColor: colors.surface,
					borderColor: colors.border
				}}
			>
				<h3 
					className="text-lg font-semibold mb-4"
					style={{ color: colors.text.primary }}
				>
					Notification Settings
				</h3>
				<p 
					className="text-sm"
					style={{ color: colors.text.secondary }}
				>
					Notification settings will be available soon...
				</p>
			</div>
		</div>
	)
}

function SecuritySettings({ onUpdate }: SecuritySettingsProps) {
	const colors = useBrandColors()
	const [passwordData, setPasswordData] = useState({
		currentPassword: '',
		newPassword: '',
		confirmPassword: ''
	})

	return (
		<div className="space-y-6">
			<div 
				className="p-6 rounded-xl border"
				style={{ 
					backgroundColor: colors.surface,
					borderColor: colors.border
				}}
			>
				<h3 
					className="text-lg font-semibold mb-4"
					style={{ color: colors.text.primary }}
				>
					Security Settings
				</h3>
				<p 
					className="text-sm"
					style={{ color: colors.text.secondary }}
				>
					Security settings will be available soon...
				</p>
			</div>
		</div>
	)
}

export function SettingsPage({ user, onUserUpdate }: SettingsPageProps) {
	const [activeTab, setActiveTab] = useState('account')
	const colors = useBrandColors()

	const tabs = [
		{ id: 'account', name: 'Account', icon: <User className="w-5 h-5" /> },
		{ id: 'notifications', name: 'Notifications', icon: <Bell className="w-5 h-5" /> },
		{ id: 'privacy', name: 'Privacy', icon: <Eye className="w-5 h-5" /> },
		{ id: 'security', name: 'Security', icon: <Shield className="w-5 h-5" /> }
	]

	return (
		<div className="space-y-6">
			{/* Header */}
			<div>
				<h1 
					className="text-2xl font-bold"
					style={{ color: colors.text.primary }}
				>
					Settings
				</h1>
				<p 
					className="text-sm mt-1"
					style={{ color: colors.text.secondary }}
				>
					Manage your account preferences and security settings
				</p>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
				{/* Sidebar Navigation */}
				<div 
					className="lg:col-span-1 p-6 rounded-xl border h-fit"
					style={{ 
						backgroundColor: colors.surface,
						borderColor: colors.border
					}}
				>
					<div className="space-y-2">
						{tabs.map((tab) => (
							<SettingsTab
								key={tab.id}
								id={tab.id}
								name={tab.name}
								icon={tab.icon}
								isActive={activeTab === tab.id}
								onClick={() => setActiveTab(tab.id)}
							/>
						))}
					</div>
				</div>

				{/* Content */}
				<div className="lg:col-span-3">
					{activeTab === 'account' && (
						<AccountSettings 
							user={user} 
							onUpdate={(data) => {
								if (onUserUpdate) {
									onUserUpdate({ ...user, ...data })
								}
							}} 
						/>
					)}
					{activeTab === 'notifications' && (
						<NotificationSettings 
							settings={{}} 
							onUpdate={() => {}} 
						/>
					)}
					{activeTab === 'privacy' && (
						<div 
							className="p-6 rounded-xl border"
							style={{ 
								backgroundColor: colors.surface,
								borderColor: colors.border
							}}
						>
							<h3 
								className="text-lg font-semibold mb-4"
								style={{ color: colors.text.primary }}
							>
								Privacy Settings
							</h3>
							<p 
								className="text-sm"
								style={{ color: colors.text.secondary }}
							>
								Privacy settings coming soon...
							</p>
						</div>
					)}
					{activeTab === 'security' && (
						<SecuritySettings onUpdate={() => {}} />
					)}
				</div>
			</div>
		</div>
	)
} 