import React, { useState, useEffect, useCallback } from 'react'
import { 
	Target, Brain, Award, BookOpen, TrendingUp, Clock,
	CheckCircle, XCircle, AlertCircle, Star, Zap,
	Play, Pause, RotateCcw, ArrowRight, Users, Trophy,
	BarChart3, LineChart, PieChart, Activity, Lightbulb,
	Code, Database, Cloud, Shield, Smartphone, Globe
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
	RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
	ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid,
	Tooltip, LineChart as RechartsLineChart, Line, PieChart as RechartsPieChart, 
	Pie, Cell
} from 'recharts'

interface Skill {
	id: string
	name: string
	category: string
	currentLevel: number
	marketDemand: number
	salaryImpact: number
	lastAssessed: string
	trending: 'up' | 'down' | 'stable'
	icon: React.ReactNode
}

interface Assessment {
	id: string
	skillId: string
	type: 'quick' | 'comprehensive' | 'practical' | 'certified'
	title: string
	description: string
	duration: number // in minutes
	difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert'
	questions: number
	certification: boolean
	aiPowered: boolean
	passingScore: number
}

interface AssessmentResult {
	id: string
	assessmentId: string
	skillId: string
	score: number
	percentile: number
	completedAt: string
	timeSpent: number
	strengths: string[]
	weaknesses: string[]
	recommendations: string[]
	nextSteps: string[]
}

interface SkillGap {
	skill: string
	currentLevel: number
	requiredLevel: number
	marketAverage: number
	gap: number
	priority: 'critical' | 'high' | 'medium' | 'low'
	learningResources: Array<{
		type: 'course' | 'project' | 'certification' | 'practice'
		title: string
		provider: string
		duration: string
		cost: string
		difficulty: string
	}>
}

interface IntelligentSkillAssessmentProps {
	className?: string
}

export default function IntelligentSkillAssessment({ className = '' }: IntelligentSkillAssessmentProps) {
	const [skills, setSkills] = useState<Skill[]>([])
	const [assessments, setAssessments] = useState<Assessment[]>([])
	const [results, setResults] = useState<AssessmentResult[]>([])
	const [skillGaps, setSkillGaps] = useState<SkillGap[]>([])
	const [isLoading, setIsLoading] = useState(true)
	const [activeTab, setActiveTab] = useState<'overview' | 'assess' | 'gaps' | 'progress'>('overview')
	const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null)
	const [currentAssessment, setCurrentAssessment] = useState<Assessment | null>(null)
	const [assessmentInProgress, setAssessmentInProgress] = useState(false)

	// Mock data for demonstration
	useEffect(() => {
		const mockSkills: Skill[] = [
			{
				id: '1',
				name: 'React.js',
				category: 'Frontend Development',
				currentLevel: 85,
				marketDemand: 95,
				salaryImpact: 22,
				lastAssessed: '2024-01-15',
				trending: 'up',
				icon: <Code className="w-5 h-5" />
			},
			{
				id: '2',
				name: 'TypeScript',
				category: 'Programming Languages',
				currentLevel: 78,
				marketDemand: 88,
				salaryImpact: 18,
				lastAssessed: '2024-01-10',
				trending: 'up',
				icon: <Code className="w-5 h-5" />
			},
			{
				id: '3',
				name: 'Node.js',
				category: 'Backend Development',
				currentLevel: 65,
				marketDemand: 82,
				salaryImpact: 20,
				lastAssessed: '2023-12-20',
				trending: 'stable',
				icon: <Globe className="w-5 h-5" />
			},
			{
				id: '4',
				name: 'AWS Cloud Services',
				category: 'Cloud Computing',
				currentLevel: 45,
				marketDemand: 92,
				salaryImpact: 35,
				lastAssessed: '2023-11-15',
				trending: 'up',
				icon: <Cloud className="w-5 h-5" />
			},
			{
				id: '5',
				name: 'PostgreSQL',
				category: 'Databases',
				currentLevel: 70,
				marketDemand: 75,
				salaryImpact: 15,
				lastAssessed: '2024-01-05',
				trending: 'stable',
				icon: <Database className="w-5 h-5" />
			},
			{
				id: '6',
				name: 'Docker',
				category: 'DevOps',
				currentLevel: 55,
				marketDemand: 85,
				salaryImpact: 25,
				lastAssessed: '2023-12-01',
				trending: 'up',
				icon: <Shield className="w-5 h-5" />
			}
		]

		const mockAssessments: Assessment[] = [
			{
				id: '1',
				skillId: '1',
				type: 'comprehensive',
				title: 'React.js Advanced Assessment',
				description: 'Comprehensive evaluation covering hooks, performance optimization, and advanced patterns',
				duration: 45,
				difficulty: 'advanced',
				questions: 25,
				certification: true,
				aiPowered: true,
				passingScore: 80
			},
			{
				id: '2',
				skillId: '4',
				type: 'practical',
				title: 'AWS Solutions Architect Practice',
				description: 'Hands-on assessment with real AWS scenarios and infrastructure design',
				duration: 90,
				difficulty: 'expert',
				questions: 15,
				certification: true,
				aiPowered: true,
				passingScore: 75
			},
			{
				id: '3',
				skillId: '2',
				type: 'quick',
				title: 'TypeScript Quick Check',
				description: 'Fast assessment of TypeScript fundamentals and type system',
				duration: 20,
				difficulty: 'intermediate',
				questions: 15,
				certification: false,
				aiPowered: false,
				passingScore: 70
			}
		]

		const mockSkillGaps: SkillGap[] = [
			{
				skill: 'AWS Cloud Services',
				currentLevel: 45,
				requiredLevel: 80,
				marketAverage: 65,
				gap: 35,
				priority: 'critical',
				learningResources: [
					{
						type: 'certification',
						title: 'AWS Solutions Architect Associate',
						provider: 'Amazon Web Services',
						duration: '3-6 months',
						cost: '$150',
						difficulty: 'Intermediate'
					},
					{
						type: 'course',
						title: 'AWS Cloud Practitioner Essentials',
						provider: 'AWS Training',
						duration: '6 hours',
						cost: 'Free',
						difficulty: 'Beginner'
					}
				]
			},
			{
				skill: 'System Design',
				currentLevel: 40,
				requiredLevel: 75,
				marketAverage: 58,
				gap: 35,
				priority: 'high',
				learningResources: [
					{
						type: 'course',
						title: 'System Design Interview Prep',
						provider: 'Tech Interview Pro',
						duration: '8 weeks',
						cost: '$299',
						difficulty: 'Advanced'
					},
					{
						type: 'project',
						title: 'Build a Scalable Chat Application',
						provider: 'Self-guided',
						duration: '2-4 weeks',
						cost: 'Free',
						difficulty: 'Intermediate'
					}
				]
			}
		]

		setTimeout(() => {
			setSkills(mockSkills)
			setAssessments(mockAssessments)
			setSkillGaps(mockSkillGaps)
			setIsLoading(false)
		}, 1500)
	}, [])

	const getSkillLevelColor = (level: number) => {
		if (level >= 80) return 'text-green-600 bg-green-50'
		if (level >= 60) return 'text-blue-600 bg-blue-50'
		if (level >= 40) return 'text-orange-600 bg-orange-50'
		return 'text-red-600 bg-red-50'
	}

	const getTrendingIcon = (trend: string) => {
		switch (trend) {
			case 'up': return <TrendingUp className="w-4 h-4 text-green-600" />
			case 'down': return <TrendingUp className="w-4 h-4 text-red-600 rotate-180" />
			case 'stable': return <Target className="w-4 h-4 text-blue-600" />
			default: return <Target className="w-4 h-4 text-gray-600" />
		}
	}

	const getPriorityColor = (priority: string) => {
		switch (priority) {
			case 'critical': return 'bg-red-100 text-red-800 border-red-200'
			case 'high': return 'bg-orange-100 text-orange-800 border-orange-200'
			case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
			case 'low': return 'bg-blue-100 text-blue-800 border-blue-200'
			default: return 'bg-gray-100 text-gray-800 border-gray-200'
		}
	}

	const startAssessment = (assessment: Assessment) => {
		setCurrentAssessment(assessment)
		setAssessmentInProgress(true)
	}

	const renderSkillCard = (skill: Skill) => (
		<motion.div
			key={skill.id}
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 cursor-pointer"
			onClick={() => setSelectedSkill(skill)}
		>
			<div className="flex items-center justify-between mb-4">
				<div className="flex items-center gap-3">
					<div className="p-2 bg-blue-100 rounded-lg">
						{skill.icon}
					</div>
					<div>
						<h3 className="font-semibold text-gray-900">{skill.name}</h3>
						<p className="text-sm text-gray-600">{skill.category}</p>
					</div>
				</div>
				<div className="text-right">
					<div className={`text-2xl font-bold ${getSkillLevelColor(skill.currentLevel)}`}>
						{skill.currentLevel}%
					</div>
					{getTrendingIcon(skill.trending)}
				</div>
			</div>

			<div className="space-y-3">
				<div>
					<div className="flex justify-between text-sm text-gray-600 mb-1">
						<span>Current Level</span>
						<span>{skill.currentLevel}%</span>
					</div>
					<div className="w-full bg-gray-200 rounded-full h-2">
						<div 
							className={`h-2 rounded-full transition-all duration-300 ${
								skill.currentLevel >= 80 ? 'bg-green-500' :
								skill.currentLevel >= 60 ? 'bg-blue-500' :
								skill.currentLevel >= 40 ? 'bg-orange-500' : 'bg-red-500'
							}`}
							style={{ width: `${skill.currentLevel}%` }}
						/>
					</div>
				</div>

				<div className="grid grid-cols-2 gap-4 text-center">
					<div>
						<div className="text-lg font-bold text-purple-600">{skill.marketDemand}</div>
						<div className="text-xs text-gray-600">Market Demand</div>
					</div>
					<div>
						<div className="text-lg font-bold text-green-600">+{skill.salaryImpact}%</div>
						<div className="text-xs text-gray-600">Salary Impact</div>
					</div>
				</div>

				<div className="text-xs text-gray-500">
					Last assessed: {new Date(skill.lastAssessed).toLocaleDateString()}
				</div>
			</div>
		</motion.div>
	)

	const renderAssessmentCard = (assessment: Assessment) => {
		const skill = skills.find(s => s.id === assessment.skillId)
		
		return (
			<motion.div
				key={assessment.id}
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300"
			>
				<div className="flex items-center justify-between mb-4">
					<div className="flex items-center gap-3">
						{assessment.aiPowered && (
							<div className="p-1 bg-purple-100 rounded">
								<Brain className="w-4 h-4 text-purple-600" />
							</div>
						)}
						{assessment.certification && (
							<div className="p-1 bg-yellow-100 rounded">
								<Award className="w-4 h-4 text-yellow-600" />
							</div>
						)}
					</div>
					<span className={`px-2 py-1 text-xs rounded-full ${
						assessment.difficulty === 'expert' ? 'bg-red-100 text-red-800' :
						assessment.difficulty === 'advanced' ? 'bg-orange-100 text-orange-800' :
						assessment.difficulty === 'intermediate' ? 'bg-blue-100 text-blue-800' :
						'bg-green-100 text-green-800'
					}`}>
						{assessment.difficulty}
					</span>
				</div>

				<h3 className="text-lg font-semibold text-gray-900 mb-2">{assessment.title}</h3>
				<p className="text-gray-600 mb-4">{assessment.description}</p>

				<div className="grid grid-cols-3 gap-4 mb-4 text-center">
					<div>
						<div className="text-lg font-bold text-blue-600">{assessment.duration}m</div>
						<div className="text-xs text-gray-600">Duration</div>
					</div>
					<div>
						<div className="text-lg font-bold text-purple-600">{assessment.questions}</div>
						<div className="text-xs text-gray-600">Questions</div>
					</div>
					<div>
						<div className="text-lg font-bold text-green-600">{assessment.passingScore}%</div>
						<div className="text-xs text-gray-600">Pass Score</div>
					</div>
				</div>

				{skill && (
					<div className="bg-gray-50 rounded-lg p-3 mb-4">
						<div className="text-sm font-medium text-gray-900 mb-1">Skill: {skill.name}</div>
						<div className="text-sm text-gray-600">Current Level: {skill.currentLevel}%</div>
					</div>
				)}

				<button 
					onClick={() => startAssessment(assessment)}
					className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
				>
					<Play className="w-4 h-4" />
					Start Assessment
				</button>
			</motion.div>
		)
	}

	const renderSkillGapCard = (gap: SkillGap) => (
		<motion.div
			key={gap.skill}
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			className="bg-white rounded-xl border border-gray-200 p-6"
		>
			<div className="flex items-center justify-between mb-4">
				<h3 className="text-lg font-semibold text-gray-900">{gap.skill}</h3>
				<span className={`px-3 py-1 text-xs rounded-full border ${getPriorityColor(gap.priority)}`}>
					{gap.priority} priority
				</span>
			</div>

			<div className="space-y-4 mb-6">
				<div>
					<div className="flex justify-between text-sm text-gray-600 mb-1">
						<span>Current Level</span>
						<span>{gap.currentLevel}%</span>
					</div>
					<div className="w-full bg-gray-200 rounded-full h-2">
						<div 
							className="bg-blue-500 h-2 rounded-full"
							style={{ width: `${gap.currentLevel}%` }}
						/>
					</div>
				</div>

				<div>
					<div className="flex justify-between text-sm text-gray-600 mb-1">
						<span>Required Level</span>
						<span>{gap.requiredLevel}%</span>
					</div>
					<div className="w-full bg-gray-200 rounded-full h-2">
						<div 
							className="bg-green-500 h-2 rounded-full"
							style={{ width: `${gap.requiredLevel}%` }}
						/>
					</div>
				</div>

				<div>
					<div className="flex justify-between text-sm text-gray-600 mb-1">
						<span>Market Average</span>
						<span>{gap.marketAverage}%</span>
					</div>
					<div className="w-full bg-gray-200 rounded-full h-2">
						<div 
							className="bg-orange-500 h-2 rounded-full"
							style={{ width: `${gap.marketAverage}%` }}
						/>
					</div>
				</div>
			</div>

			<div className="mb-4">
				<h4 className="text-sm font-medium text-gray-900 mb-2">Learning Resources</h4>
				<div className="space-y-2">
					{gap.learningResources.slice(0, 2).map((resource, index) => (
						<div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
							<div>
								<div className="text-sm font-medium text-gray-900">{resource.title}</div>
								<div className="text-xs text-gray-600">{resource.provider} • {resource.duration}</div>
							</div>
							<div className="text-right">
								<div className="text-sm font-medium text-gray-900">{resource.cost}</div>
								<div className="text-xs text-gray-600">{resource.difficulty}</div>
							</div>
						</div>
					))}
				</div>
			</div>

			<button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2 px-4 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300">
				Create Learning Plan
			</button>
		</motion.div>
	)

	// Radar chart data for skills overview
	const radarData = skills.map(skill => ({
		skill: skill.name,
		current: skill.currentLevel,
		market: skill.marketDemand,
		salary: skill.salaryImpact * 3 // Scale for visualization
	}))

	return (
		<div className={`space-y-6 ${className}`}>
			{/* Header */}
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
						<Target className="w-8 h-8 text-blue-600" />
						Intelligent Skill Assessment
					</h1>
					<p className="text-gray-600 mt-1">
						AI-powered skill evaluation and personalized learning recommendations
					</p>
				</div>
				
				<div className="text-right">
					<div className="text-sm text-gray-600">Assessment Score</div>
					<div className="text-2xl font-bold text-blue-600">
						{Math.round(skills.reduce((acc, skill) => acc + skill.currentLevel, 0) / skills.length)}%
					</div>
				</div>
			</div>

			{/* Quick Stats */}
			<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
				<div className="bg-white rounded-xl border border-gray-200 p-4">
					<div className="flex items-center gap-3">
						<div className="p-2 bg-blue-100 rounded-lg">
							<Target className="w-5 h-5 text-blue-600" />
						</div>
						<div>
							<div className="text-2xl font-bold text-gray-900">{skills.length}</div>
							<div className="text-sm text-gray-600">Skills Tracked</div>
						</div>
					</div>
				</div>
				<div className="bg-white rounded-xl border border-gray-200 p-4">
					<div className="flex items-center gap-3">
						<div className="p-2 bg-green-100 rounded-lg">
							<CheckCircle className="w-5 h-5 text-green-600" />
						</div>
						<div>
							<div className="text-2xl font-bold text-gray-900">{skills.filter(s => s.currentLevel >= 70).length}</div>
							<div className="text-sm text-gray-600">Proficient Skills</div>
						</div>
					</div>
				</div>
				<div className="bg-white rounded-xl border border-gray-200 p-4">
					<div className="flex items-center gap-3">
						<div className="p-2 bg-orange-100 rounded-lg">
							<AlertCircle className="w-5 h-5 text-orange-600" />
						</div>
						<div>
							<div className="text-2xl font-bold text-gray-900">{skillGaps.length}</div>
							<div className="text-sm text-gray-600">Skill Gaps</div>
						</div>
					</div>
				</div>
				<div className="bg-white rounded-xl border border-gray-200 p-4">
					<div className="flex items-center gap-3">
						<div className="p-2 bg-purple-100 rounded-lg">
							<Trophy className="w-5 h-5 text-purple-600" />
						</div>
						<div>
							<div className="text-2xl font-bold text-gray-900">{assessments.filter(a => a.certification).length}</div>
							<div className="text-sm text-gray-600">Certifications Available</div>
						</div>
					</div>
				</div>
			</div>

			{/* Tabs */}
			<div className="border-b border-gray-200">
				<nav className="flex space-x-8">
					{[
						{ id: 'overview', label: 'Skills Overview', icon: BarChart3 },
						{ id: 'assess', label: 'Take Assessment', icon: Brain },
						{ id: 'gaps', label: 'Skill Gaps', icon: AlertCircle },
						{ id: 'progress', label: 'Progress Tracking', icon: LineChart }
					].map(tab => (
						<button
							key={tab.id}
							onClick={() => setActiveTab(tab.id as any)}
							className={`flex items-center gap-2 py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
								activeTab === tab.id
									? 'border-blue-500 text-blue-600'
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
				{activeTab === 'overview' && (
					<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
						{/* Skills Radar Chart */}
						<div className="lg:col-span-1">
							<div className="bg-white rounded-xl border border-gray-200 p-6">
								<h3 className="text-lg font-semibold text-gray-900 mb-4">Skills Radar</h3>
								<div className="h-64">
									<ResponsiveContainer width="100%" height="100%">
										<RadarChart data={radarData}>
											<PolarGrid />
											<PolarAngleAxis dataKey="skill" tick={{ fontSize: 10 }} />
											<PolarRadiusAxis domain={[0, 100]} tick={false} />
											<Radar
												name="Current Level"
												dataKey="current"
												stroke="#3B82F6"
												fill="#3B82F6"
												fillOpacity={0.3}
											/>
											<Radar
												name="Market Demand"
												dataKey="market"
												stroke="#10B981"
												fill="transparent"
												strokeWidth={2}
											/>
										</RadarChart>
									</ResponsiveContainer>
								</div>
							</div>
						</div>

						{/* Skills Grid */}
						<div className="lg:col-span-2">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								{isLoading ? (
									Array(6).fill(0).map((_, i) => (
										<div key={i} className="animate-pulse bg-gray-100 rounded-xl h-48" />
									))
								) : (
									skills.map(skill => renderSkillCard(skill))
								)}
							</div>
						</div>
					</div>
				)}

				{activeTab === 'assess' && (
					<div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
						{isLoading ? (
							Array(6).fill(0).map((_, i) => (
								<div key={i} className="animate-pulse bg-gray-100 rounded-xl h-64" />
							))
						) : (
							assessments.map(assessment => renderAssessmentCard(assessment))
						)}
					</div>
				)}

				{activeTab === 'gaps' && (
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
						{isLoading ? (
							Array(4).fill(0).map((_, i) => (
								<div key={i} className="animate-pulse bg-gray-100 rounded-xl h-64" />
							))
						) : (
							skillGaps.map(gap => renderSkillGapCard(gap))
						)}
					</div>
				)}

				{activeTab === 'progress' && (
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
						<div className="bg-white rounded-xl border border-gray-200 p-6">
							<h3 className="text-lg font-semibold text-gray-900 mb-4">Skill Progress Over Time</h3>
							<div className="h-64">
								<ResponsiveContainer width="100%" height="100%">
									<RechartsLineChart data={[
										{ month: 'Jan', react: 75, typescript: 70, nodejs: 55 },
										{ month: 'Feb', react: 78, typescript: 72, nodejs: 58 },
										{ month: 'Mar', react: 82, typescript: 75, nodejs: 62 },
										{ month: 'Apr', react: 85, typescript: 78, nodejs: 65 }
									]}>
										<CartesianGrid strokeDasharray="3 3" />
										<XAxis dataKey="month" />
										<YAxis />
										<Tooltip />
										<Line type="monotone" dataKey="react" stroke="#3B82F6" strokeWidth={2} />
										<Line type="monotone" dataKey="typescript" stroke="#10B981" strokeWidth={2} />
										<Line type="monotone" dataKey="nodejs" stroke="#F59E0B" strokeWidth={2} />
									</RechartsLineChart>
								</ResponsiveContainer>
							</div>
						</div>

						<div className="bg-white rounded-xl border border-gray-200 p-6">
							<h3 className="text-lg font-semibold text-gray-900 mb-4">Assessment History</h3>
							<div className="space-y-4">
								{[
									{ skill: 'React.js', score: 85, date: '2024-01-15', trend: 'up' },
									{ skill: 'TypeScript', score: 78, date: '2024-01-10', trend: 'up' },
									{ skill: 'Node.js', score: 65, date: '2023-12-20', trend: 'stable' }
								].map((result, index) => (
									<div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
										<div>
											<div className="font-medium text-gray-900">{result.skill}</div>
											<div className="text-sm text-gray-600">{result.date}</div>
										</div>
										<div className="flex items-center gap-2">
											<div className="text-lg font-bold text-blue-600">{result.score}%</div>
											{getTrendingIcon(result.trend)}
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				)}
			</div>

			{/* Assessment Modal */}
			<AnimatePresence>
				{assessmentInProgress && currentAssessment && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
					>
						<motion.div
							initial={{ scale: 0.9, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							exit={{ scale: 0.9, opacity: 0 }}
							className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
						>
							<div className="flex items-center justify-between mb-6">
								<h2 className="text-xl font-bold text-gray-900">{currentAssessment.title}</h2>
								<button
									onClick={() => {
										setAssessmentInProgress(false)
										setCurrentAssessment(null)
									}}
									className="text-gray-400 hover:text-gray-600"
								>
									<XCircle className="w-6 h-6" />
								</button>
							</div>

							<div className="text-center py-12">
								<Brain className="w-16 h-16 text-blue-600 mx-auto mb-4" />
								<h3 className="text-lg font-semibold text-gray-900 mb-2">Assessment Starting...</h3>
								<p className="text-gray-600 mb-6">
									This assessment will take approximately {currentAssessment.duration} minutes to complete.
								</p>
								<button 
									onClick={() => {
										// In a real app, this would navigate to the assessment
										setAssessmentInProgress(false)
										setCurrentAssessment(null)
									}}
									className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors"
								>
									Begin Assessment
								</button>
							</div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	)
} 