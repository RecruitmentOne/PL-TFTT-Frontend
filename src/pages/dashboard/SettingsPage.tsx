import { useState } from 'react'
import { useAppSelector, useAppDispatch } from '../../store/hooks'
import { logout } from '../../store/slices/authSlice'
import { useNavigate } from 'react-router-dom'
import DashboardLayoutWithSidebar from '../../components/layout/DashboardLayoutWithSidebar'
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
} from 'lucide-react'

function SettingsPage() {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const { user } = useAppSelector((state) => state.auth)
	
	const [activeTab, setActiveTab] = useState('account')
	const [notifications, setNotifications] = useState({
		email: {
			jobMatches: true,
			applications: true,
			messages: true,
			newsletter: false,
		},
		push: {
			jobMatches: true,
			applications: false,
			messages: true,
		},
	})
	
	const [privacy, setPrivacy] = useState({
		profileVisibility: 'public',
		showEmail: false,
		showPhone: false,
		allowMessages: true,
		allowJobAlerts: true,
	})
	
	const [theme, setTheme] = useState('system')
	const [language, setLanguage] = useState('en')

	const handleLogout = async () => {
		try {
			await dispatch(logout()).unwrap()
			navigate('/login')
		} catch (error) {
			console.error('Logout failed:', error)
		}
	}

	const handleDeleteAccount = () => {
		if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
			// TODO: Implement account deletion
			console.log('Account deletion requested')
		}
	}

	const tabs = [
		{ id: 'account', name: 'Account', icon: User },
		{ id: 'notifications', name: 'Notifications', icon: Bell },
		{ id: 'privacy', name: 'Privacy', icon: Eye },
		{ id: 'security', name: 'Security', icon: Shield },
	]

	return (
		<DashboardLayoutWithSidebar 
			title="Settings"
			subtitle="Manage your account preferences and security settings"
		>
		<div className="p-6 lg:p-8 max-w-4xl mx-auto">
			{/* Tabs */}
			<div className="bg-white rounded-lg shadow-sm border border-gray-200">
				<div className="border-b border-gray-200">
					<nav className="flex space-x-8 px-6">
						{tabs.map((tab) => {
							const Icon = tab.icon
							return (
								<button
									key={tab.id}
									onClick={() => setActiveTab(tab.id)}
									className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 transition-colors ${
										activeTab === tab.id
											? 'border-blue-600 text-blue-600'
											: 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
									}`}
								>
									<Icon className="h-5 w-5" />
									<span>{tab.name}</span>
								</button>
							)
						})}
					</nav>
				</div>

				{/* Tab Content */}
				<div className="p-6">
					{/* Account Tab */}
					{activeTab === 'account' && (
						<div className="space-y-6">
							<div>
								<h3 className="text-lg font-semibold text-gray-900 mb-4">Account Information</h3>
								<div className="bg-gray-50 rounded-lg p-4 space-y-3">
									<div className="flex items-center justify-between">
										<div>
											<p className="font-medium text-gray-900">Name</p>
											<p className="text-gray-600">{user?.firstName} {user?.lastName}</p>
										</div>
									</div>
									<div className="flex items-center justify-between">
										<div>
											<p className="font-medium text-gray-900">Email</p>
											<p className="text-gray-600">{user?.email}</p>
										</div>
									</div>
									<div className="flex items-center justify-between">
										<div>
											<p className="font-medium text-gray-900">Account Type</p>
											<p className="text-gray-600 capitalize">{user?.userType}</p>
										</div>
									</div>
								</div>
							</div>

							<div>
								<h3 className="text-lg font-semibold text-gray-900 mb-4">Preferences</h3>
								<div className="space-y-4">
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-2">
											Theme
										</label>
										<div className="flex space-x-3">
											{[
												{ value: 'light', label: 'Light', icon: Sun },
												{ value: 'dark', label: 'Dark', icon: Moon },
												{ value: 'system', label: 'System', icon: Monitor },
											].map((option) => {
												const Icon = option.icon
												return (
													<button
														key={option.value}
														onClick={() => setTheme(option.value)}
														className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors ${
															theme === option.value
																? 'border-blue-600 bg-blue-50 text-blue-600'
																: 'border-gray-300 hover:bg-gray-50'
														}`}
													>
														<Icon className="h-4 w-4" />
														<span className="text-sm">{option.label}</span>
													</button>
												)
											})}
										</div>
									</div>

									<div>
										<label className="block text-sm font-medium text-gray-700 mb-2">
											Language
										</label>
										<select
											value={language}
											onChange={(e) => setLanguage(e.target.value)}
											className="w-full max-w-xs px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
										>
											<option value="en">English</option>
											<option value="es">Español</option>
											<option value="fr">Français</option>
											<option value="de">Deutsch</option>
										</select>
									</div>
								</div>
							</div>
						</div>
					)}

					{/* Notifications Tab */}
					{activeTab === 'notifications' && (
						<div className="space-y-6">
							<div>
								<h3 className="text-lg font-semibold text-gray-900 mb-4">Email Notifications</h3>
								<div className="space-y-4">
									{Object.entries(notifications.email).map(([key, value]) => (
										<div key={key} className="flex items-center justify-between">
											<div>
												<p className="font-medium text-gray-900 capitalize">
													{key.replace(/([A-Z])/g, ' $1').trim()}
												</p>
												<p className="text-sm text-gray-600">
													{key === 'jobMatches' && 'Get notified when new jobs match your profile'}
													{key === 'applications' && 'Updates on your job applications'}
													{key === 'messages' && 'New messages from employers'}
													{key === 'newsletter' && 'Weekly newsletter with job market insights'}
												</p>
											</div>
											<button
												onClick={() => setNotifications(prev => ({
													...prev,
													email: { ...prev.email, [key]: !value }
												}))}
												className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
													value ? 'bg-blue-600' : 'bg-gray-200'
												}`}
											>
												<span
													className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
														value ? 'translate-x-6' : 'translate-x-1'
													}`}
												/>
											</button>
										</div>
									))}
								</div>
							</div>

							<div>
								<h3 className="text-lg font-semibold text-gray-900 mb-4">Push Notifications</h3>
								<div className="space-y-4">
									{Object.entries(notifications.push).map(([key, value]) => (
										<div key={key} className="flex items-center justify-between">
											<div>
												<p className="font-medium text-gray-900 capitalize">
													{key.replace(/([A-Z])/g, ' $1').trim()}
												</p>
												<p className="text-sm text-gray-600">
													{key === 'jobMatches' && 'Instant notifications for new job matches'}
													{key === 'applications' && 'Real-time application status updates'}
													{key === 'messages' && 'Immediate alerts for new messages'}
												</p>
											</div>
											<button
												onClick={() => setNotifications(prev => ({
													...prev,
													push: { ...prev.push, [key]: !value }
												}))}
												className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
													value ? 'bg-blue-600' : 'bg-gray-200'
												}`}
											>
												<span
													className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
														value ? 'translate-x-6' : 'translate-x-1'
													}`}
												/>
											</button>
										</div>
									))}
								</div>
							</div>
						</div>
					)}

					{/* Privacy Tab */}
					{activeTab === 'privacy' && (
						<div className="space-y-6">
							<div>
								<h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Visibility</h3>
								<div className="space-y-3">
									{[
										{ value: 'public', label: 'Public', description: 'Your profile is visible to all employers' },
										{ value: 'private', label: 'Private', description: 'Only you can see your profile' },
										{ value: 'limited', label: 'Limited', description: 'Only employers you apply to can see your profile' },
									].map((option) => (
										<label key={option.value} className="flex items-start space-x-3 cursor-pointer">
											<input
												type="radio"
												name="profileVisibility"
												value={option.value}
												checked={privacy.profileVisibility === option.value}
												onChange={(e) => setPrivacy(prev => ({ ...prev, profileVisibility: e.target.value }))}
												className="mt-1 h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
											/>
											<div>
												<p className="font-medium text-gray-900">{option.label}</p>
												<p className="text-sm text-gray-600">{option.description}</p>
											</div>
										</label>
									))}
								</div>
							</div>

							<div>
								<h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
								<div className="space-y-4">
									<div className="flex items-center justify-between">
										<div>
											<p className="font-medium text-gray-900">Show Email Address</p>
											<p className="text-sm text-gray-600">Allow employers to see your email</p>
										</div>
										<button
											onClick={() => setPrivacy(prev => ({ ...prev, showEmail: !prev.showEmail }))}
											className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
												privacy.showEmail ? 'bg-blue-600' : 'bg-gray-200'
											}`}
										>
											<span
												className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
													privacy.showEmail ? 'translate-x-6' : 'translate-x-1'
												}`}
											/>
										</button>
									</div>

									<div className="flex items-center justify-between">
										<div>
											<p className="font-medium text-gray-900">Show Phone Number</p>
											<p className="text-sm text-gray-600">Allow employers to see your phone</p>
										</div>
										<button
											onClick={() => setPrivacy(prev => ({ ...prev, showPhone: !prev.showPhone }))}
											className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
												privacy.showPhone ? 'bg-blue-600' : 'bg-gray-200'
											}`}
										>
											<span
												className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
													privacy.showPhone ? 'translate-x-6' : 'translate-x-1'
												}`}
											/>
										</button>
									</div>
								</div>
							</div>
						</div>
					)}

					{/* Security Tab */}
					{activeTab === 'security' && (
						<div className="space-y-6">
							<div>
								<h3 className="text-lg font-semibold text-gray-900 mb-4">Password & Security</h3>
								<div className="space-y-4">
									<button className="w-full text-left p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
										<div className="flex items-center justify-between">
											<div className="flex items-center space-x-3">
												<Lock className="h-5 w-5 text-gray-400" />
												<div>
													<p className="font-medium text-gray-900">Change Password</p>
													<p className="text-sm text-gray-600">Update your account password</p>
												</div>
											</div>
											<span className="text-gray-400">→</span>
										</div>
									</button>

									<button className="w-full text-left p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
										<div className="flex items-center justify-between">
											<div className="flex items-center space-x-3">
												<Shield className="h-5 w-5 text-gray-400" />
												<div>
													<p className="font-medium text-gray-900">Two-Factor Authentication</p>
													<p className="text-sm text-gray-600">Add an extra layer of security</p>
												</div>
											</div>
											<span className="text-gray-400">→</span>
										</div>
									</button>
								</div>
							</div>

							<div>
								<h3 className="text-lg font-semibold text-gray-900 mb-4">Account Actions</h3>
								<div className="space-y-4">
									<button
										onClick={handleLogout}
										className="w-full text-left p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
									>
										<div className="flex items-center space-x-3">
											<LogOut className="h-5 w-5 text-gray-400" />
											<div>
												<p className="font-medium text-gray-900">Sign Out</p>
												<p className="text-sm text-gray-600">Sign out of your account</p>
											</div>
										</div>
									</button>

									<button
										onClick={handleDeleteAccount}
										className="w-full text-left p-4 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
									>
										<div className="flex items-center space-x-3">
											<Trash2 className="h-5 w-5 text-red-500" />
											<div>
												<p className="font-medium text-red-900">Delete Account</p>
												<p className="text-sm text-red-600">Permanently delete your account and all data</p>
											</div>
										</div>
									</button>
								</div>
							</div>
						</div>
					)}

					{/* Save Button */}
					<div className="flex justify-end pt-6 border-t border-gray-200">
						<button className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors">
							<Save className="h-4 w-4" />
							<span>Save Changes</span>
						</button>
					</div>
				</div>
			</div>
		</div>
		</DashboardLayoutWithSidebar>
	)
}

export default SettingsPage 