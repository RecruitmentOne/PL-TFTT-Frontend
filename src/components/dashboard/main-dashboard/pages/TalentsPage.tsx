import React, { useState, useEffect } from 'react'
import { 
	Search, 
	Filter, 
	Heart, 
	User, 
	Users,
	MapPin, 
	Briefcase,
	Star,
	Eye,
	ChevronDown,
	Calendar,
	Award,
	CreditCard
} from 'lucide-react'
import { useBrandColors } from '../../../brand'
import { Talent, TalentFilters, DashboardUser } from '../../../types/dashboard'
import { dashboardAPI } from '../../../services/dashboardAPI'

interface TalentsPageProps {
	user: DashboardUser
}

interface TalentCardProps {
	talent: Talent
	onLike: () => void
	onViewProfile: () => void
	isLiked?: boolean
}

interface FilterBarProps {
	filters: TalentFilters
	onFiltersChange: (filters: TalentFilters) => void
}

function TalentCard({ talent, onLike, onViewProfile, isLiked }: TalentCardProps) {
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
						backgroundImage: talent.profilePicture ? `url(${talent.profilePicture})` : undefined,
						backgroundSize: 'cover',
						backgroundPosition: 'center'
					}}
				>
					{!talent.profilePicture && (
						<User className="w-8 h-8" />
					)}
				</div>

				{/* Profile Info */}
				<div className="flex-1 min-w-0">
					<h3 
						className="text-lg font-semibold mb-1"
						style={{ color: colors.text.primary }}
					>
						{talent.firstName} {talent.lastName}
					</h3>
					
					{talent.currentJobTitle && (
						<div className="flex items-center space-x-1 mb-2">
							<Briefcase className="w-4 h-4" style={{ color: colors.text.secondary }} />
							<span 
								className="text-sm"
								style={{ color: colors.text.secondary }}
							>
								{talent.currentJobTitle}
							</span>
						</div>
					)}

					<div className="flex items-center space-x-4 text-sm mb-3">
						{talent.experience && (
							<div className="flex items-center space-x-1">
								<Calendar className="w-4 h-4" style={{ color: colors.text.tertiary }} />
								<span style={{ color: colors.text.tertiary }}>
									{talent.experience} years exp.
								</span>
							</div>
						)}
						{talent.location && (
							<div className="flex items-center space-x-1">
								<MapPin className="w-4 h-4" style={{ color: colors.text.tertiary }} />
								<span style={{ color: colors.text.tertiary }}>{talent.location}</span>
							</div>
						)}
						<div className="flex items-center space-x-1">
							<Star className="w-4 h-4" style={{ color: colors.warning }} />
							<span style={{ color: colors.text.tertiary }}>
								{talent.profileCompletionScore}% complete
							</span>
						</div>
					</div>

					{/* Skills */}
					{talent.skills && talent.skills.length > 0 && (
						<div className="flex flex-wrap gap-2 mb-3">
							{talent.skills.slice(0, 4).map((skill, index) => (
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
							{talent.skills.length > 4 && (
								<span 
									className="px-2 py-1 text-xs rounded-full"
									style={{ 
										backgroundColor: colors.surfaceVariant,
										color: colors.text.secondary
									}}
								>
									+{talent.skills.length - 4} more
								</span>
							)}
						</div>
					)}

					{/* Bio */}
					{talent.bio && (
						<p 
							className="text-sm mb-4"
							style={{ color: colors.text.secondary }}
						>
							{talent.bio.length > 120 ? 
								`${talent.bio.substring(0, 120)}...` : 
								talent.bio
							}
						</p>
					)}

					{/* Actions */}
					<div className="flex items-center space-x-3">
						<button
							onClick={onLike}
							className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
								isLiked ? 'scale-105' : 'hover:scale-105'
							}`}
							style={{ 
								backgroundColor: isLiked ? colors.error : colors.primary,
								color: colors.text.inverse
							}}
						>
							<Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
							<span>{isLiked ? 'Liked' : 'Like'}</span>
						</button>
						
						<button
							onClick={onViewProfile}
							className="flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-opacity duration-200 hover:opacity-80"
							style={{ 
								backgroundColor: colors.border,
								color: colors.text.primary
							}}
						>
							<Eye className="w-4 h-4" />
							<span>View Profile</span>
							<CreditCard className="w-3 h-3" />
						</button>
					</div>

					{/* Last Activity */}
					<div className="mt-3 pt-3 border-t" style={{ borderColor: colors.border }}>
						<p 
							className="text-xs"
							style={{ color: colors.text.tertiary }}
						>
							Last active: {new Date(talent.lastActivity).toLocaleDateString()}
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}

function FilterBar({ filters, onFiltersChange }: FilterBarProps) {
	const colors = useBrandColors()
	const [showFilters, setShowFilters] = useState(false)

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
						placeholder="Search talents by name, skills, or location..."
						value={filters.search}
						onChange={(e) => onFiltersChange({ ...filters, search: e.target.value })}
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
				<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
					<div>
						<label 
							className="block text-sm font-medium mb-1"
							style={{ color: colors.text.secondary }}
						>
							Location
						</label>
						<input
							type="text"
							placeholder="Any location"
							value={filters.location}
							onChange={(e) => onFiltersChange({ ...filters, location: e.target.value })}
							className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2"
							style={{ 
								borderColor: colors.border,
								backgroundColor: colors.background,
								color: colors.text.primary
							}}
						/>
					</div>
					<div>
						<label 
							className="block text-sm font-medium mb-1"
							style={{ color: colors.text.secondary }}
						>
							Experience
						</label>
						<select
							value={filters.experience}
							onChange={(e) => onFiltersChange({ ...filters, experience: e.target.value })}
							className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2"
							style={{ 
								borderColor: colors.border,
								backgroundColor: colors.background,
								color: colors.text.primary
							}}
						>
							<option value="">Any experience</option>
							<option value="0-2">0-2 years</option>
							<option value="3-5">3-5 years</option>
							<option value="6-10">6-10 years</option>
							<option value="10+">10+ years</option>
						</select>
					</div>
					<div>
						<label 
							className="block text-sm font-medium mb-1"
							style={{ color: colors.text.secondary }}
						>
							Availability
						</label>
						<select
							value={filters.availability}
							onChange={(e) => onFiltersChange({ ...filters, availability: e.target.value })}
							className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2"
							style={{ 
								borderColor: colors.border,
								backgroundColor: colors.background,
								color: colors.text.primary
							}}
						>
							<option value="">Any availability</option>
							<option value="immediate">Immediate</option>
							<option value="2-weeks">Within 2 weeks</option>
							<option value="1-month">Within 1 month</option>
							<option value="3-months">Within 3 months</option>
						</select>
					</div>
					<div>
						<label 
							className="block text-sm font-medium mb-1"
							style={{ color: colors.text.secondary }}
						>
							Skills
						</label>
						<input
							type="text"
							placeholder="e.g. React, Python"
							value={filters.skills.join(', ')}
							onChange={(e) => onFiltersChange({ 
								...filters, 
								skills: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
							})}
							className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2"
							style={{ 
								borderColor: colors.border,
								backgroundColor: colors.background,
								color: colors.text.primary
							}}
						/>
					</div>
				</div>
			)}
		</div>
	)
}

export function TalentsPage({ user }: TalentsPageProps) {
	const [talents, setTalents] = useState<Talent[]>([])
	const [loading, setLoading] = useState(true)
	const [filters, setFilters] = useState<TalentFilters>({
		search: '',
		skills: [],
		experience: '',
		location: '',
		availability: ''
	})
	const [likedTalents, setLikedTalents] = useState<Set<string>>(new Set())
	const colors = useBrandColors()

	useEffect(() => {
		const fetchTalents = async () => {
			try {
				setLoading(true)
				const response = await dashboardAPI.getTalents({ filters })
				setTalents(response.talents)
			} catch (error) {
				console.error('Failed to fetch talents:', error)
				// Mock data for demo
				setTalents([
					{
						id: '1',
						firstName: 'Sarah',
						lastName: 'Johnson',
						email: 'sarah.johnson@email.com',
						currentJobTitle: 'Senior Frontend Developer',
						experience: 5,
						skills: ['React', 'TypeScript', 'Next.js', 'CSS', 'JavaScript'],
						location: 'San Francisco, CA',
						bio: 'Passionate frontend developer with 5 years of experience building scalable web applications. Love working with modern JavaScript frameworks and creating beautiful user experiences.',
						jobsLiked: ['job1', 'job2'],
						lastActivity: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
						profileCompletionScore: 95
					},
					{
						id: '2',
						firstName: 'Michael',
						lastName: 'Chen',
						email: 'michael.chen@email.com',
						currentJobTitle: 'Full Stack Engineer',
						experience: 3,
						skills: ['Node.js', 'Python', 'PostgreSQL', 'Docker', 'AWS'],
						location: 'New York, NY',
						bio: 'Full-stack engineer with expertise in backend systems and cloud infrastructure. Experienced in building high-performance applications.',
						jobsLiked: ['job3'],
						lastActivity: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
						profileCompletionScore: 88
					},
					{
						id: '3',
						firstName: 'Emily',
						lastName: 'Rodriguez',
						email: 'emily.rodriguez@email.com',
						currentJobTitle: 'UI/UX Designer',
						experience: 4,
						skills: ['Figma', 'Adobe XD', 'Prototyping', 'User Research', 'HTML/CSS'],
						location: 'Austin, TX',
						bio: 'Creative UI/UX designer focused on user-centered design. Experienced in conducting user research and creating intuitive interfaces.',
						jobsLiked: ['job2', 'job4'],
						lastActivity: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
						profileCompletionScore: 92
					}
				])
			} finally {
				setLoading(false)
			}
		}

		fetchTalents()
	}, [filters])

	const handleLikeTalent = async (talentId: string) => {
		try {
			await dashboardAPI.likeTalent(talentId)
			setLikedTalents(prev => new Set([...prev, talentId]))
		} catch (error) {
			console.error('Failed to like talent:', error)
		}
	}

	const handleViewProfile = async (talentId: string) => {
		try {
			await dashboardAPI.viewTalentProfile(talentId)
			// In a real app, this would navigate to a detailed profile view
			console.log('Viewing profile for talent:', talentId)
		} catch (error) {
			console.error('Failed to view profile:', error)
		}
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
						Browse Talents
					</h1>
					<p 
						className="text-sm mt-1"
						style={{ color: colors.text.secondary }}
					>
						{talents.length} talented professionals available
					</p>
				</div>

				{/* Credits remaining indicator */}
				{user.subscriptionPlan && (
					<div 
						className="flex items-center space-x-2 px-4 py-2 rounded-lg border"
						style={{ 
							backgroundColor: colors.surfaceVariant,
							borderColor: colors.border
						}}
					>
						<CreditCard className="w-4 h-4" style={{ color: colors.warning }} />
						<span 
							className="text-sm font-medium"
							style={{ color: colors.text.primary }}
						>
							Credits: {user.subscriptionPlan.creditsPerMonth || 0}
						</span>
					</div>
				)}
			</div>

			{/* Filters */}
			<FilterBar filters={filters} onFiltersChange={setFilters} />

			{/* Talents Grid */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				{talents.map((talent) => (
					<TalentCard
						key={talent.id}
						talent={talent}
						isLiked={likedTalents.has(talent.id)}
						onLike={() => handleLikeTalent(talent.id)}
						onViewProfile={() => handleViewProfile(talent.id)}
					/>
				))}
			</div>

			{talents.length === 0 && (
				<div className="text-center py-12">
					<Users 
						className="w-16 h-16 mx-auto mb-4"
						style={{ color: colors.text.tertiary }}
					/>
					<h3 
						className="text-lg font-medium mb-2"
						style={{ color: colors.text.primary }}
					>
						No talents found
					</h3>
					<p 
						className="text-sm"
						style={{ color: colors.text.secondary }}
					>
						Try adjusting your filters to see more results
					</p>
				</div>
			)}
		</div>
	)
} 