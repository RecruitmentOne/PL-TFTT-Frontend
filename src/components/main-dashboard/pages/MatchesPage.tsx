import React, { useState, useEffect } from 'react'
import { 
	Heart, 
	User, 
	Users,
	MapPin, 
	Briefcase,
	Calendar,
	Building,
	Star,
	Eye,
	MessageCircle,
	Mail,
	Phone,
	ExternalLink,
	Award,
	CreditCard,
	Filter,
	Search,
	ChevronDown
} from 'lucide-react'
import { useBrandColors } from '../../../brand'
import { Match, DashboardUser } from '../../../types/dashboard'
import { dashboardAPI } from '../../../services/dashboardAPI'

interface MatchesPageProps {
	user: DashboardUser
}

interface MatchCardProps {
	match: Match
	userType: 'team' | 'talent'
	onViewDetails: () => void
	onContact: () => void
}

interface MatchFiltersProps {
	onFiltersChange: (filters: any) => void
}

function MatchCard({ match, userType, onViewDetails, onContact }: MatchCardProps) {
	const colors = useBrandColors()
	const [hoveredAction, setHoveredAction] = useState<string | null>(null)

	return (
		<div 
			className="p-6 rounded-xl border shadow-sm transition-transform duration-200 hover:scale-105"
			style={{ 
				backgroundColor: colors.surface,
				borderColor: colors.border
			}}
		>
			<div className="flex items-start space-x-4">
				{/* Profile Picture */}
				<div 
					className="w-16 h-16 rounded-full flex items-center justify-center text-white text-xl font-semibold flex-shrink-0"
					style={{ 
						backgroundColor: colors.primary,
						backgroundImage: match.talentProfilePicture ? `url(${match.talentProfilePicture})` : undefined,
						backgroundSize: 'cover',
						backgroundPosition: 'center'
					}}
				>
					{!match.talentProfilePicture && (
						userType === 'team' ? (
							<User className="w-8 h-8" />
						) : (
							<Building className="w-8 h-8" />
						)
					)}
				</div>

				{/* Match Info */}
				<div className="flex-1 min-w-0">
					<div className="flex items-start justify-between mb-2">
						<div>
							<h3 
								className="text-lg font-semibold"
								style={{ color: colors.text.primary }}
							>
								{userType === 'team' ? match.talentName : match.companyName}
							</h3>
							<p 
								className="text-sm"
								style={{ color: colors.text.secondary }}
							>
								{match.jobTitle}
							</p>
						</div>
						<div className="flex items-center space-x-1">
							<Award className="w-4 h-4" style={{ color: colors.success }} />
							<span 
								className="text-xs font-medium px-2 py-1 rounded-full"
								style={{ 
									backgroundColor: colors.success + '20',
									color: colors.success
								}}
							>
								Mutual Likes
							</span>
						</div>
					</div>

					{/* Additional Info */}
					<div className="flex items-center space-x-4 text-sm mb-3">
						<div className="flex items-center space-x-1">
							<Calendar className="w-4 h-4" style={{ color: colors.text.tertiary }} />
							<span style={{ color: colors.text.tertiary }}>
								Matched {new Date(match.matchedAt).toLocaleDateString()}
							</span>
						</div>
						{userType === 'team' && (
							<div className="flex items-center space-x-1">
								<CreditCard className="w-4 h-4" style={{ color: colors.warning }} />
								<span style={{ color: colors.text.tertiary }}>
									{match.creditsSpent} credits spent
								</span>
							</div>
						)}
						{!match.profileViewed && userType === 'team' && (
							<span 
								className="px-2 py-1 text-xs rounded-full"
								style={{ 
									backgroundColor: colors.info + '20',
									color: colors.info
								}}
							>
								New
							</span>
						)}
					</div>

					{/* Skills (for talent profiles) */}
					{match.talentSkills && match.talentSkills.length > 0 && (
						<div className="flex flex-wrap gap-2 mb-4">
							{match.talentSkills.slice(0, 3).map((skill, index) => (
								<span 
									key={index}
									className="px-2 py-1 text-xs rounded-full"
									style={{ 
										backgroundColor: colors.surfaceVariant,
										color: colors.text.secondary
									}}
								>
									{skill}
								</span>
							))}
							{match.talentSkills.length > 3 && (
								<span 
									className="px-2 py-1 text-xs rounded-full"
									style={{ 
										backgroundColor: colors.surfaceVariant,
										color: colors.text.secondary
									}}
								>
									+{match.talentSkills.length - 3} more
								</span>
							)}
						</div>
					)}

					{/* Current Role (for talents) */}
					{match.talentCurrentRole && userType === 'team' && (
						<div className="flex items-center space-x-1 mb-4">
							<Briefcase className="w-4 h-4" style={{ color: colors.text.secondary }} />
							<span 
								className="text-sm"
								style={{ color: colors.text.secondary }}
							>
								{match.talentCurrentRole}
							</span>
						</div>
					)}

					{/* Actions */}
					<div className="flex items-center space-x-3">
						<button
							onClick={onViewDetails}
							className="flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-opacity duration-200 hover:opacity-90"
							style={{ 
								backgroundColor: colors.primary,
								color: colors.text.inverse
							}}
						>
							<Eye className="w-4 h-4" />
							<span>View Details</span>
						</button>
						
						<button
							onClick={onContact}
							className="flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-opacity duration-200 hover:opacity-80"
							style={{ 
								backgroundColor: colors.success,
								color: colors.text.inverse
							}}
						>
							<MessageCircle className="w-4 h-4" />
							<span>Contact</span>
						</button>

						<button
							className="p-2 rounded-lg transition-colors duration-200"
							style={{ 
								color: colors.text.secondary,
								backgroundColor: hoveredAction === 'email' ? colors.hover : 'transparent'
							}}
							onMouseEnter={() => setHoveredAction('email')}
							onMouseLeave={() => setHoveredAction(null)}
						>
							<Mail className="w-4 h-4" />
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

function MatchFilters({ onFiltersChange }: MatchFiltersProps) {
	const colors = useBrandColors()
	const [showFilters, setShowFilters] = useState(false)
	const [filters, setFilters] = useState({
		search: '',
		dateRange: '',
		status: ''
	})

	const handleFilterChange = (newFilters: any) => {
		setFilters(newFilters)
		onFiltersChange(newFilters)
	}

	return (
		<div 
			className="p-4 rounded-lg border mb-6"
			style={{ 
				backgroundColor: colors.surface,
				borderColor: colors.border
			}}
		>
			<div className="flex items-center space-x-4 mb-4">
				<div className="flex-1 relative">
					<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" 
						style={{ color: colors.text.secondary }} />
					<input
						type="text"
						placeholder="Search matches..."
						value={filters.search}
						onChange={(e) => handleFilterChange({ ...filters, search: e.target.value })}
						className="w-full pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:border-current"
						style={{ 
							borderColor: colors.border,
							backgroundColor: colors.background,
							color: colors.text.primary
						}}
					/>
				</div>
				<button
					onClick={() => setShowFilters(!showFilters)}
					className="flex items-center space-x-2 px-4 py-2 rounded-lg border font-medium transition-colors duration-200"
					style={{ 
						borderColor: colors.border,
						backgroundColor: showFilters ? colors.primary : colors.background,
						color: showFilters ? colors.text.inverse : colors.text.primary
					}}
				>
					<Filter className="w-4 h-4" />
					<span>Filters</span>
					<ChevronDown className={`w-4 h-4 transition-transform duration-200 ${showFilters ? 'rotate-180' : ''}`} />
				</button>
			</div>

			{showFilters && (
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					<div>
						<label 
							className="block text-sm font-medium mb-1"
							style={{ color: colors.text.secondary }}
						>
							Date Range
						</label>
						<select
							value={filters.dateRange}
							onChange={(e) => handleFilterChange({ ...filters, dateRange: e.target.value })}
							className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2"
							style={{ 
								borderColor: colors.border,
								backgroundColor: colors.background,
								color: colors.text.primary
							}}
						>
							<option value="">All time</option>
							<option value="today">Today</option>
							<option value="week">This week</option>
							<option value="month">This month</option>
							<option value="quarter">This quarter</option>
						</select>
					</div>
					<div>
						<label 
							className="block text-sm font-medium mb-1"
							style={{ color: colors.text.secondary }}
						>
							Status
						</label>
						<select
							value={filters.status}
							onChange={(e) => handleFilterChange({ ...filters, status: e.target.value })}
							className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2"
							style={{ 
								borderColor: colors.border,
								backgroundColor: colors.background,
								color: colors.text.primary
							}}
						>
							<option value="">All matches</option>
							<option value="new">New matches</option>
							<option value="contacted">Contacted</option>
							<option value="viewed">Profile viewed</option>
						</select>
					</div>
				</div>
			)}
		</div>
	)
}

export function MatchesPage({ user }: MatchesPageProps) {
	const [matches, setMatches] = useState<Match[]>([])
	const [loading, setLoading] = useState(true)
	const [filters, setFilters] = useState({})
	const colors = useBrandColors()

	const isTeam = user.userType === 'team'

	useEffect(() => {
		const fetchMatches = async () => {
			try {
				setLoading(true)
				const response = await dashboardAPI.getMatches()
				setMatches(response.matches)
			} catch (error) {
				console.error('Failed to fetch matches:', error)
				// Mock data for demo
				setMatches([
					{
						id: '1',
						jobId: 'job1',
						talentId: 'talent1',
						teamId: 'team1',
						jobTitle: 'Frontend Developer',
						companyName: 'TechCorp Inc.',
						talentName: 'Sarah Johnson',
						talentEmail: 'sarah.johnson@email.com',
						matchedAt: new Date().toISOString(),
						creditsSpent: 5,
						profileViewed: false,
						talentCurrentRole: 'Senior React Developer',
						talentSkills: ['React', 'TypeScript', 'Next.js', 'CSS', 'JavaScript']
					},
					{
						id: '2',
						jobId: 'job2',
						talentId: 'talent2',
						teamId: 'team1',
						jobTitle: 'Backend Engineer',
						companyName: 'StartupXYZ',
						talentName: 'Michael Chen',
						talentEmail: 'michael.chen@email.com',
						matchedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
						creditsSpent: 5,
						profileViewed: true,
						talentCurrentRole: 'Full Stack Engineer',
						talentSkills: ['Node.js', 'Python', 'PostgreSQL', 'Docker', 'AWS']
					},
					{
						id: '3',
						jobId: 'job3',
						talentId: 'talent3',
						teamId: 'team1',
						jobTitle: 'UI/UX Designer',
						companyName: 'Design Studio',
						talentName: 'Emily Rodriguez',
						talentEmail: 'emily.rodriguez@email.com',
						matchedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
						creditsSpent: 5,
						profileViewed: true,
						talentCurrentRole: 'Senior UX Designer',
						talentSkills: ['Figma', 'Adobe XD', 'Prototyping', 'User Research']
					}
				])
			} finally {
				setLoading(false)
			}
		}

		fetchMatches()
	}, [filters])

	const handleViewDetails = (matchId: string) => {
		console.log('Viewing match details:', matchId)
		// In a real app, this would navigate to a detailed match view
	}

	const handleContact = (match: Match) => {
		console.log('Contacting:', match.talentEmail)
		// In a real app, this would open a contact modal or redirect to email
	}

	if (loading) {
		return (
			<div className="flex items-center justify-center h-64">
				<div 
					className="w-8 h-8 border-4 border-t-transparent rounded-full animate-spin"
					style={{ borderColor: colors.primary }}
				/>
			</div>
		)
	}

	return (
		<div className="space-y-6">
			{/* Header */}
			<div className="flex items-center justify-between">
				<div>
					<h1 
						className="text-2xl font-bold"
						style={{ color: colors.text.primary }}
					>
						Your Matches
					</h1>
					<p 
						className="text-sm mt-1"
						style={{ color: colors.text.secondary }}
					>
						{matches.length} mutual likes found
					</p>
				</div>

				{/* Match Stats */}
				<div className="flex items-center space-x-4">
					<div 
						className="text-center px-4 py-2 rounded-lg border"
						style={{ 
							backgroundColor: colors.surfaceVariant,
							borderColor: colors.border
						}}
					>
						<div 
							className="text-lg font-bold"
							style={{ color: colors.text.primary }}
						>
							{matches.length}
						</div>
						<div 
							className="text-xs"
							style={{ color: colors.text.secondary }}
						>
							Total Matches
						</div>
					</div>
					{isTeam && (
						<div 
							className="text-center px-4 py-2 rounded-lg border"
							style={{ 
								backgroundColor: colors.surfaceVariant,
								borderColor: colors.border
							}}
						>
							<div 
								className="text-lg font-bold"
								style={{ color: colors.text.primary }}
							>
								{matches.filter(m => !m.profileViewed).length}
							</div>
							<div 
								className="text-xs"
								style={{ color: colors.text.secondary }}
							>
								New Matches
							</div>
						</div>
					)}
				</div>
			</div>

			{/* Filters */}
			<MatchFilters onFiltersChange={setFilters} />

			{/* Matches Grid */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				{matches.map((match) => (
					<MatchCard
						key={match.id}
						match={match}
						userType={user.userType}
						onViewDetails={() => handleViewDetails(match.id)}
						onContact={() => handleContact(match)}
					/>
				))}
			</div>

			{matches.length === 0 && (
				<div className="text-center py-12">
					<Heart 
						className="w-16 h-16 mx-auto mb-4"
						style={{ color: colors.text.tertiary }}
					/>
					<h3 
						className="text-lg font-medium mb-2"
						style={{ color: colors.text.primary }}
					>
						No matches yet
					</h3>
					<p 
						className="text-sm"
						style={{ color: colors.text.secondary }}
					>
						{isTeam ? 
							'Start liking talents to create matches' :
							'Keep liking jobs to find your perfect match'
						}
					</p>
				</div>
			)}
		</div>
	)
} 