import React, { useState, useEffect, useCallback } from 'react'
import { 
	Lightbulb, TrendingUp, Target, Award, BookOpen, 
	Zap, Brain, ChevronRight, Star, Calendar, Clock,
	MapPin, DollarSign, Users, Building, ArrowUp,
	CheckCircle, AlertCircle, Info, Rocket, Trophy,
	GraduationCap, Briefcase, Network, LineChart, XCircle
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
	LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, 
	Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar
} from 'recharts'

interface CareerInsight {
	id: string
	type: 'skill-gap' | 'market-opportunity' | 'salary-growth' | 'career-path' | 'networking'
	title: string
	description: string
	priority: 'high' | 'medium' | 'low'
	impact: string
	timeframe: string
	actionable: boolean
	confidence: number
	tags: string[]
}

interface SkillRecommendation {
	skill: string
	currentLevel: number
	targetLevel: number
	demandScore: number
	salaryImpact: number
	learningPath: string[]
	estimatedTime: string
	urgency: 'critical' | 'important' | 'beneficial'
	relatedJobs: string[]
}

interface CareerPath {
	id: string
	title: string
	currentRole: string
	targetRole: string
	timeline: string
	probability: number
	salaryIncrease: number
	requiredSkills: string[]
	milestones: Array<{
		title: string
		description: string
		timeframe: string
		completed: boolean
	}>
}

interface MarketTrend {
	category: string
	trend: 'rising' | 'stable' | 'declining'
	growth: number
	description: string
	relevance: number
}

interface AICareerAdvisoryProps {
	className?: string
}

export default function AICareerAdvisory({ className = '' }: AICareerAdvisoryProps) {
	const [insights, setInsights] = useState<CareerInsight[]>([])
	const [skillRecommendations, setSkillRecommendations] = useState<SkillRecommendation[]>([])
	const [careerPaths, setCareerPaths] = useState<CareerPath[]>([])
	const [marketTrends, setMarketTrends] = useState<MarketTrend[]>([])
	const [isLoading, setIsLoading] = useState(true)
	const [activeTab, setActiveTab] = useState<'insights' | 'skills' | 'paths' | 'trends'>('insights')
	const [selectedPath, setSelectedPath] = useState<CareerPath | null>(null)

	// Mock data for demonstration
	useEffect(() => {
		const mockInsights: CareerInsight[] = [
			{
				id: '1',
				type: 'skill-gap',
				title: 'Critical Skill Gap: Cloud Architecture',
				description: 'Based on your profile and target roles, cloud architecture skills (AWS/Azure) are crucial for advancing to Senior Developer positions in the Berlin market.',
				priority: 'high',
				impact: '+€15,000 salary potential',
				timeframe: '3-6 months to proficiency',
				actionable: true,
				confidence: 92,
				tags: ['AWS', 'Azure', 'Cloud Computing', 'Architecture']
			},
			{
				id: '2',
				type: 'market-opportunity',
				title: 'Emerging Opportunity: React Native Development',
				description: 'The Berlin market shows 340% increase in React Native job postings. Your React background positions you perfectly for this transition.',
				priority: 'medium',
				impact: '+25% more job opportunities',
				timeframe: '2-4 months learning curve',
				actionable: true,
				confidence: 87,
				tags: ['React Native', 'Mobile Development', 'Cross-platform']
			},
			{
				id: '3',
				type: 'career-path',
				title: 'Leadership Track Opportunity',
				description: 'Your technical skills and 5+ years experience qualify you for Team Lead roles. Consider developing leadership and project management skills.',
				priority: 'medium',
				impact: '+€20,000-30,000 salary increase',
				timeframe: '6-12 months preparation',
				actionable: true,
				confidence: 84,
				tags: ['Leadership', 'Team Management', 'Career Advancement']
			}
		]

		const mockSkillRecommendations: SkillRecommendation[] = [
			{
				skill: 'AWS Cloud Services',
				currentLevel: 30,
				targetLevel: 80,
				demandScore: 95,
				salaryImpact: 18,
				learningPath: [
					'AWS Cloud Practitioner Certification',
					'Solutions Architect Associate',
					'Hands-on Projects with EC2, S3, Lambda',
					'Infrastructure as Code (Terraform/CloudFormation)'
				],
				estimatedTime: '4-6 months',
				urgency: 'critical',
				relatedJobs: ['Cloud Developer', 'DevOps Engineer', 'Solutions Architect']
			},
			{
				skill: 'TypeScript Advanced Patterns',
				currentLevel: 70,
				targetLevel: 90,
				demandScore: 88,
				salaryImpact: 12,
				learningPath: [
					'Advanced Type System Features',
					'Design Patterns in TypeScript',
					'Performance Optimization',
					'Large-scale Application Architecture'
				],
				estimatedTime: '2-3 months',
				urgency: 'important',
				relatedJobs: ['Senior Frontend Developer', 'Full Stack Developer', 'Tech Lead']
			},
			{
				skill: 'System Design',
				currentLevel: 40,
				targetLevel: 75,
				demandScore: 92,
				salaryImpact: 22,
				learningPath: [
					'Scalability Fundamentals',
					'Database Design Patterns',
					'Microservices Architecture',
					'Load Balancing & Caching Strategies'
				],
				estimatedTime: '3-5 months',
				urgency: 'critical',
				relatedJobs: ['Senior Developer', 'Solutions Architect', 'Principal Engineer']
			}
		]

		const mockCareerPaths: CareerPath[] = [
			{
				id: '1',
				title: 'Senior Frontend Developer Track',
				currentRole: 'Frontend Developer',
				targetRole: 'Senior Frontend Developer',
				timeline: '8-12 months',
				probability: 87,
				salaryIncrease: 25,
				requiredSkills: ['Advanced TypeScript', 'System Design', 'Team Mentoring'],
				milestones: [
					{
						title: 'Master Advanced TypeScript',
						description: 'Complete advanced TypeScript patterns and architecture course',
						timeframe: '2 months',
						completed: false
					},
					{
						title: 'Lead a Project',
						description: 'Take ownership of a significant frontend project',
						timeframe: '3-4 months',
						completed: false
					},
					{
						title: 'Mentor Junior Developers',
						description: 'Start mentoring 1-2 junior developers',
						timeframe: '6 months',
						completed: false
					}
				]
			},
			{
				id: '2',
				title: 'Full Stack Developer Transition',
				currentRole: 'Frontend Developer',
				targetRole: 'Full Stack Developer',
				timeline: '6-10 months',
				probability: 78,
				salaryIncrease: 30,
				requiredSkills: ['Node.js', 'Database Design', 'API Development', 'DevOps Basics'],
				milestones: [
					{
						title: 'Backend Fundamentals',
						description: 'Master Node.js, Express, and RESTful API development',
						timeframe: '3 months',
						completed: false
					},
					{
						title: 'Database Expertise',
						description: 'Learn SQL, NoSQL, and database design principles',
						timeframe: '2 months',
						completed: false
					},
					{
						title: 'Full Stack Project',
						description: 'Build and deploy a complete full-stack application',
						timeframe: '2-3 months',
						completed: false
					}
				]
			}
		]

		const mockMarketTrends: MarketTrend[] = [
			{
				category: 'AI/Machine Learning Integration',
				trend: 'rising',
				growth: 145,
				description: 'AI integration in frontend development is rapidly growing with tools like GitHub Copilot and AI-powered testing.',
				relevance: 78
			},
			{
				category: 'Edge Computing',
				trend: 'rising',
				growth: 120,
				description: 'Edge computing solutions are becoming mainstream, creating opportunities for developers with distributed systems knowledge.',
				relevance: 65
			},
			{
				category: 'Serverless Architecture',
				trend: 'stable',
				growth: 25,
				description: 'Serverless continues to be a stable technology choice with steady adoption in enterprise environments.',
				relevance: 82
			}
		]

		setTimeout(() => {
			setInsights(mockInsights)
			setSkillRecommendations(mockSkillRecommendations)
			setCareerPaths(mockCareerPaths)
			setMarketTrends(mockMarketTrends)
			setIsLoading(false)
		}, 1500)
	}, [])

	const getPriorityColor = (priority: string) => {
		switch (priority) {
			case 'high': return 'bg-red-100 text-red-800 border-red-200'
			case 'medium': return 'bg-orange-100 text-orange-800 border-orange-200'
			case 'low': return 'bg-blue-100 text-blue-800 border-blue-200'
			default: return 'bg-gray-100 text-gray-800 border-gray-200'
		}
	}

	const getUrgencyColor = (urgency: string) => {
		switch (urgency) {
			case 'critical': return 'bg-red-500'
			case 'important': return 'bg-orange-500'
			case 'beneficial': return 'bg-blue-500'
			default: return 'bg-gray-500'
		}
	}

	const getTrendIcon = (trend: string) => {
		switch (trend) {
			case 'rising': return <TrendingUp className="w-4 h-4 text-green-600" />
			case 'stable': return <Target className="w-4 h-4 text-blue-600" />
			case 'declining': return <TrendingUp className="w-4 h-4 text-red-600 rotate-180" />
			default: return <Target className="w-4 h-4 text-gray-600" />
		}
	}

	const renderInsightCard = (insight: CareerInsight) => (
		<motion.div
			key={insight.id}
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300"
		>
			<div className="flex items-start justify-between mb-4">
				<div className="flex items-center gap-3">
					{insight.type === 'skill-gap' && <BookOpen className="w-6 h-6 text-blue-600" />}
					{insight.type === 'market-opportunity' && <TrendingUp className="w-6 h-6 text-green-600" />}
					{insight.type === 'career-path' && <Rocket className="w-6 h-6 text-purple-600" />}
					{insight.type === 'salary-growth' && <DollarSign className="w-6 h-6 text-yellow-600" />}
					{insight.type === 'networking' && <Network className="w-6 h-6 text-indigo-600" />}
					
					<div>
						<h3 className="text-lg font-semibold text-gray-900">{insight.title}</h3>
						<div className="flex items-center gap-2 mt-1">
							<span className={`px-2 py-1 text-xs rounded-full border ${getPriorityColor(insight.priority)}`}>
								{insight.priority} priority
							</span>
							<span className="text-sm text-gray-600">
								{insight.confidence}% confidence
							</span>
						</div>
					</div>
				</div>
			</div>

			<p className="text-gray-700 mb-4">{insight.description}</p>

			<div className="grid grid-cols-2 gap-4 mb-4">
				<div className="bg-green-50 rounded-lg p-3">
					<div className="text-sm font-medium text-green-800">Impact</div>
					<div className="text-green-900">{insight.impact}</div>
				</div>
				<div className="bg-blue-50 rounded-lg p-3">
					<div className="text-sm font-medium text-blue-800">Timeframe</div>
					<div className="text-blue-900">{insight.timeframe}</div>
				</div>
			</div>

			<div className="flex flex-wrap gap-2 mb-4">
				{insight.tags.map(tag => (
					<span key={tag} className="px-2 py-1 bg-gray-100 text-gray-700 text-sm rounded">
						{tag}
					</span>
				))}
			</div>

			{insight.actionable && (
				<button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
					<Zap className="w-4 h-4" />
					Take Action
				</button>
			)}
		</motion.div>
	)

	const renderSkillCard = (skill: SkillRecommendation) => (
		<motion.div
			key={skill.skill}
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			className="bg-white rounded-xl border border-gray-200 p-6"
		>
			<div className="flex items-center justify-between mb-4">
				<h3 className="text-lg font-semibold text-gray-900">{skill.skill}</h3>
				<div className={`w-3 h-3 rounded-full ${getUrgencyColor(skill.urgency)}`} />
			</div>

			{/* Current vs Target Level */}
			<div className="mb-4">
				<div className="flex justify-between text-sm text-gray-600 mb-1">
					<span>Current Level</span>
					<span>{skill.currentLevel}%</span>
				</div>
				<div className="w-full bg-gray-200 rounded-full h-2 mb-2">
					<div 
						className="bg-blue-500 h-2 rounded-full transition-all duration-300"
						style={{ width: `${skill.currentLevel}%` }}
					/>
				</div>
				<div className="flex justify-between text-sm text-gray-600 mb-1">
					<span>Target Level</span>
					<span>{skill.targetLevel}%</span>
				</div>
				<div className="w-full bg-gray-200 rounded-full h-2">
					<div 
						className="bg-green-500 h-2 rounded-full transition-all duration-300"
						style={{ width: `${skill.targetLevel}%` }}
					/>
				</div>
			</div>

			{/* Metrics */}
			<div className="grid grid-cols-3 gap-4 mb-4 text-center">
				<div>
					<div className="text-lg font-bold text-purple-600">{skill.demandScore}</div>
					<div className="text-xs text-gray-600">Market Demand</div>
				</div>
				<div>
					<div className="text-lg font-bold text-green-600">+{skill.salaryImpact}%</div>
					<div className="text-xs text-gray-600">Salary Impact</div>
				</div>
				<div>
					<div className="text-lg font-bold text-blue-600">{skill.estimatedTime}</div>
					<div className="text-xs text-gray-600">Learning Time</div>
				</div>
			</div>

			{/* Learning Path */}
			<div className="mb-4">
				<h4 className="text-sm font-medium text-gray-900 mb-2">Learning Path</h4>
				<div className="space-y-2">
					{skill.learningPath.map((step, index) => (
						<div key={index} className="flex items-center gap-2 text-sm text-gray-700">
							<div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-medium">
								{index + 1}
							</div>
							{step}
						</div>
					))}
				</div>
			</div>

			{/* Related Jobs */}
			<div className="mb-4">
				<h4 className="text-sm font-medium text-gray-900 mb-2">Unlocks These Roles</h4>
				<div className="flex flex-wrap gap-2">
					{skill.relatedJobs.map(job => (
						<span key={job} className="px-2 py-1 bg-purple-100 text-purple-700 text-sm rounded">
							{job}
						</span>
					))}
				</div>
			</div>

			<button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300">
				Start Learning Path
			</button>
		</motion.div>
	)

	const renderCareerPathCard = (path: CareerPath) => (
		<motion.div
			key={path.id}
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			className="bg-white rounded-xl border border-gray-200 p-6 cursor-pointer hover:shadow-lg transition-all duration-300"
			onClick={() => setSelectedPath(path)}
		>
			<div className="flex items-center justify-between mb-4">
				<h3 className="text-lg font-semibold text-gray-900">{path.title}</h3>
				<div className="text-right">
					<div className="text-2xl font-bold text-green-600">{path.probability}%</div>
					<div className="text-sm text-gray-600">Success Rate</div>
				</div>
			</div>

			<div className="mb-4">
				<div className="flex items-center gap-2 text-gray-600 mb-2">
					<Briefcase className="w-4 h-4" />
					<span className="text-sm">{path.currentRole} → {path.targetRole}</span>
				</div>
				<div className="flex items-center gap-4 text-sm text-gray-600">
					<div className="flex items-center gap-1">
						<Clock className="w-4 h-4" />
						{path.timeline}
					</div>
					<div className="flex items-center gap-1">
						<TrendingUp className="w-4 h-4" />
						+{path.salaryIncrease}% salary
					</div>
				</div>
			</div>

			<div className="mb-4">
				<h4 className="text-sm font-medium text-gray-900 mb-2">Required Skills</h4>
				<div className="flex flex-wrap gap-2">
					{path.requiredSkills.map(skill => (
						<span key={skill} className="px-2 py-1 bg-blue-100 text-blue-700 text-sm rounded">
							{skill}
						</span>
					))}
				</div>
			</div>

			<div className="flex items-center justify-between">
				<span className="text-sm text-gray-600">
					{path.milestones.filter(m => m.completed).length}/{path.milestones.length} milestones completed
				</span>
				<ChevronRight className="w-5 h-5 text-gray-400" />
			</div>
		</motion.div>
	)

	return (
		<div className={`space-y-6 ${className}`}>
			{/* Header */}
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
						<Brain className="w-8 h-8 text-purple-600" />
						AI Career Advisory
					</h1>
					<p className="text-gray-600 mt-1">
						Personalized career insights and recommendations powered by artificial intelligence
					</p>
				</div>
				
				<div className="text-right">
					<div className="text-sm text-gray-600">Last Analysis</div>
					<div className="text-sm font-medium text-gray-900">
						{new Date().toLocaleDateString()}
					</div>
				</div>
			</div>

			{/* Tabs */}
			<div className="border-b border-gray-200">
				<nav className="flex space-x-8">
					{[
						{ id: 'insights', label: 'Career Insights', icon: Lightbulb },
						{ id: 'skills', label: 'Skill Recommendations', icon: BookOpen },
						{ id: 'paths', label: 'Career Paths', icon: Rocket },
						{ id: 'trends', label: 'Market Trends', icon: LineChart }
					].map(tab => (
						<button
							key={tab.id}
							onClick={() => setActiveTab(tab.id as any)}
							className={`flex items-center gap-2 py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
								activeTab === tab.id
									? 'border-purple-500 text-purple-600'
									: 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
							}`}
						>
							<tab.icon className="w-4 h-4" />
							{tab.label}
						</button>
					))}
				</nav>
			</div>

			{/* Content */}
			<div className="min-h-[600px]">
				{activeTab === 'insights' && (
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
						{isLoading ? (
							Array(4).fill(0).map((_, i) => (
								<div key={i} className="animate-pulse bg-gray-100 rounded-xl h-64" />
							))
						) : (
							insights.map(insight => renderInsightCard(insight))
						)}
					</div>
				)}

				{activeTab === 'skills' && (
					<div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
						{isLoading ? (
							Array(6).fill(0).map((_, i) => (
								<div key={i} className="animate-pulse bg-gray-100 rounded-xl h-96" />
							))
						) : (
							skillRecommendations.map(skill => renderSkillCard(skill))
						)}
					</div>
				)}

				{activeTab === 'paths' && (
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
						{isLoading ? (
							Array(4).fill(0).map((_, i) => (
								<div key={i} className="animate-pulse bg-gray-100 rounded-xl h-64" />
							))
						) : (
							careerPaths.map(path => renderCareerPathCard(path))
						)}
					</div>
				)}

				{activeTab === 'trends' && (
					<div className="space-y-6">
						{isLoading ? (
							<div className="animate-pulse bg-gray-100 rounded-xl h-96" />
						) : (
							<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
								{marketTrends.map(trend => (
									<div key={trend.category} className="bg-white rounded-xl border border-gray-200 p-6">
										<div className="flex items-center justify-between mb-4">
											<h3 className="text-lg font-semibold text-gray-900">{trend.category}</h3>
											<div className="flex items-center gap-2">
												{getTrendIcon(trend.trend)}
												<span className={`text-sm font-medium ${
													trend.trend === 'rising' ? 'text-green-600' :
													trend.trend === 'stable' ? 'text-blue-600' : 'text-red-600'
												}`}>
													{trend.trend === 'rising' ? '+' : ''}{trend.growth}%
												</span>
											</div>
										</div>
										<p className="text-gray-700 mb-4">{trend.description}</p>
										<div className="flex items-center justify-between">
											<span className="text-sm text-gray-600">Relevance to your profile</span>
											<div className="flex items-center gap-2">
												<div className="w-16 bg-gray-200 rounded-full h-2">
													<div 
														className="bg-purple-500 h-2 rounded-full"
														style={{ width: `${trend.relevance}%` }}
													/>
												</div>
												<span className="text-sm font-medium text-gray-900">{trend.relevance}%</span>
											</div>
										</div>
									</div>
								))}
							</div>
						)}
					</div>
				)}
			</div>

			{/* Career Path Detail Modal */}
			<AnimatePresence>
				{selectedPath && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
						onClick={() => setSelectedPath(null)}
					>
						<motion.div
							initial={{ scale: 0.9, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							exit={{ scale: 0.9, opacity: 0 }}
							className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
							onClick={e => e.stopPropagation()}
						>
							<div className="flex items-center justify-between mb-6">
								<h2 className="text-xl font-bold text-gray-900">{selectedPath.title}</h2>
								<button
									onClick={() => setSelectedPath(null)}
									className="text-gray-400 hover:text-gray-600"
								>
									<XCircle className="w-6 h-6" />
								</button>
							</div>

							<div className="space-y-6">
								{/* Path Overview */}
								<div className="grid grid-cols-2 gap-4">
									<div className="bg-blue-50 rounded-lg p-4">
										<div className="text-sm font-medium text-blue-800">Success Probability</div>
										<div className="text-2xl font-bold text-blue-900">{selectedPath.probability}%</div>
									</div>
									<div className="bg-green-50 rounded-lg p-4">
										<div className="text-sm font-medium text-green-800">Salary Increase</div>
										<div className="text-2xl font-bold text-green-900">+{selectedPath.salaryIncrease}%</div>
									</div>
								</div>

								{/* Milestones */}
								<div>
									<h3 className="text-lg font-semibold text-gray-900 mb-4">Career Milestones</h3>
									<div className="space-y-4">
										{selectedPath.milestones.map((milestone, index) => (
											<div key={index} className="flex items-start gap-3">
												<div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
													milestone.completed ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'
												}`}>
													{milestone.completed ? <CheckCircle className="w-4 h-4" /> : index + 1}
												</div>
												<div className="flex-1">
													<h4 className="font-medium text-gray-900">{milestone.title}</h4>
													<p className="text-sm text-gray-600 mt-1">{milestone.description}</p>
													<div className="text-xs text-gray-500 mt-1">
														Timeframe: {milestone.timeframe}
													</div>
												</div>
											</div>
										))}
									</div>
								</div>

								{/* Action Button */}
								<button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-4 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300">
									Start This Career Path
								</button>
							</div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	)
} 