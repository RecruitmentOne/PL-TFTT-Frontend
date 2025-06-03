import React, { useState, useEffect, useCallback } from 'react'
import { 
	Brain, Target, TrendingUp, Users, MapPin, Clock,
	Star, Zap, ChevronRight, Filter, RefreshCw,
	Lightbulb, Award, Building, Calendar, AlertCircle,
	CheckCircle, XCircle, BarChart3, Layers, ArrowUpRight
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppSelector } from '../../store/hooks'

interface MatchScore {
	overall: number
	skills: number
	location: number
	experience: number
	salary: number
	culture: number
}

interface MatchExplanation {
	category: string
	score: number
	reasons: string[]
	improvements: string[]
	weight: number
}

interface SmartMatch {
	id: string
	type: 'job' | 'talent'
	title: string
	company?: string
	candidate?: string
	location: string
	score: MatchScore
	explanation: MatchExplanation[]
	aiInsights: string[]
	estimatedResponse: string
	matchStrength: 'excellent' | 'very-good' | 'good' | 'fair'
	timestamp: string
	isNew: boolean
	isTrending: boolean
	metadata: {
		salary?: string
		experience?: string
		skills?: string[]
		remote?: boolean
		urgent?: boolean
	}
}

interface MatchFilters {
	minScore: number
	location: string[]
	skills: string[]
	experience: string[]
	matchType: 'all' | 'job' | 'talent'
	timeframe: '24h' | '7d' | '30d'
}

interface SmartMatchingEngineProps {
	className?: string
	userType: 'talent' | 'employer'
}

export default function SmartMatchingEngine({ className = '', userType }: SmartMatchingEngineProps) {
	const [matches, setMatches] = useState<SmartMatch[]>([])
	const [selectedMatch, setSelectedMatch] = useState<SmartMatch | null>(null)
	const [filters, setFilters] = useState<MatchFilters>({
		minScore: 70,
		location: [],
		skills: [],
		experience: [],
		matchType: 'all',
		timeframe: '7d'
	})
	const [isLoading, setIsLoading] = useState(true)
	const [isAnalyzing, setIsAnalyzing] = useState(false)
	const [activeTab, setActiveTab] = useState<'matches' | 'insights' | 'trends'>('matches')

	const { user } = useAppSelector(state => state.auth)

	// Mock data for demonstration
	useEffect(() => {
		const mockMatches: SmartMatch[] = [
			{
				id: '1',
				type: userType === 'talent' ? 'job' : 'talent',
				title: userType === 'talent' ? 'Senior Frontend Developer' : 'Sarah Thompson',
				company: userType === 'talent' ? 'TechVision GmbH' : undefined,
				candidate: userType === 'employer' ? 'Sarah Thompson' : undefined,
				location: 'Berlin, Germany',
				score: {
					overall: 94,
					skills: 96,
					location: 98,
					experience: 92,
					salary: 89,
					culture: 95
				},
				explanation: [
					{
						category: 'Technical Skills',
						score: 96,
						reasons: [
							'Perfect match for React, TypeScript, and Node.js',
							'Advanced experience with modern frontend frameworks',
							'Strong background in responsive design'
						],
						improvements: ['Consider learning Vue.js for broader opportunities'],
						weight: 0.35
					},
					{
						category: 'Experience Level',
						score: 92,
						reasons: [
							'5+ years matches the requirement perfectly',
							'Previous fintech experience is highly relevant',
							'Leadership experience aligns with senior role'
						],
						improvements: ['AWS certification would strengthen profile'],
						weight: 0.25
					}
				],
				aiInsights: [
					'This match shows exceptional technical alignment with 96% skill compatibility',
					'Location preference is perfectly matched with Berlin-based role',
					'Salary expectations align within 5% of the offered range',
					'Company culture score indicates high likelihood of long-term success'
				],
				estimatedResponse: '2-3 days',
				matchStrength: 'excellent',
				timestamp: new Date().toISOString(),
				isNew: true,
				isTrending: false,
				metadata: {
					salary: '€75,000 - €95,000',
					experience: '5+ years',
					skills: ['React', 'TypeScript', 'Node.js', 'GraphQL'],
					remote: true,
					urgent: false
				}
			},
			{
				id: '2',
				type: userType === 'talent' ? 'job' : 'talent',
				title: userType === 'talent' ? 'Full Stack Engineer' : 'Marcus Weber',
				company: userType === 'talent' ? 'InnovateLab' : undefined,
				candidate: userType === 'employer' ? 'Marcus Weber' : undefined,
				location: 'Amsterdam, Netherlands',
				score: {
					overall: 87,
					skills: 89,
					location: 85,
					experience: 88,
					salary: 92,
					culture: 84
				},
				explanation: [
					{
						category: 'Technical Skills',
						score: 89,
						reasons: [
							'Strong full-stack capabilities',
							'Experience with microservices architecture',
							'Proficient in cloud technologies'
						],
						improvements: [
							'Docker expertise would be beneficial',
							'Consider learning Kubernetes'
						],
						weight: 0.35
					}
				],
				aiInsights: [
					'Strong technical foundation with room for cloud technology growth',
					'Salary expectations exceed offer by 8% - negotiation opportunity',
					'Cultural fit analysis shows 84% compatibility',
					'Remote work preference aligns with company policy'
				],
				estimatedResponse: '1-2 weeks',
				matchStrength: 'very-good',
				timestamp: new Date(Date.now() - 3600000).toISOString(),
				isNew: false,
				isTrending: true,
				metadata: {
					salary: '€65,000 - €80,000',
					experience: '3-5 years',
					skills: ['JavaScript', 'Python', 'AWS', 'MongoDB'],
					remote: false,
					urgent: true
				}
			}
		]

		setTimeout(() => {
			setMatches(mockMatches)
			setIsLoading(false)
		}, 1500)
	}, [userType])

	const runAIAnalysis = useCallback(async () => {
		setIsAnalyzing(true)
		// Simulate AI analysis
		await new Promise(resolve => setTimeout(resolve, 2000))
		setIsAnalyzing(false)
	}, [])

	const getScoreColor = (score: number) => {
		if (score >= 90) return 'text-green-600 bg-green-50'
		if (score >= 80) return 'text-blue-600 bg-blue-50'
		if (score >= 70) return 'text-orange-600 bg-orange-50'
		return 'text-red-600 bg-red-50'
	}

	const getMatchStrengthBadge = (strength: string) => {
		const badges = {
			'excellent': 'bg-green-100 text-green-800 border-green-200',
			'very-good': 'bg-blue-100 text-blue-800 border-blue-200',
			'good': 'bg-orange-100 text-orange-800 border-orange-200',
			'fair': 'bg-gray-100 text-gray-800 border-gray-200'
		}
		return badges[strength as keyof typeof badges] || badges.fair
	}

	const renderMatchCard = (match: SmartMatch) => (
		<motion.div
			key={match.id}
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			className="bg-white rounded-xl border border-gray-200 hover:border-blue-300 transition-all duration-300 hover:shadow-lg cursor-pointer"
			onClick={() => setSelectedMatch(match)}
		>
			<div className="p-6">
				{/* Header */}
				<div className="flex items-start justify-between mb-4">
					<div className="flex-1">
						<div className="flex items-center gap-2 mb-2">
							<h3 className="text-lg font-semibold text-gray-900">{match.title}</h3>
							{match.isNew && (
								<span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
									New
								</span>
							)}
							{match.isTrending && (
								<span className="px-2 py-1 text-xs bg-orange-100 text-orange-800 rounded-full flex items-center gap-1">
									<TrendingUp className="w-3 h-3" />
									Trending
								</span>
							)}
						</div>
						<div className="flex items-center gap-4 text-sm text-gray-600">
							{match.company && (
								<div className="flex items-center gap-1">
									<Building className="w-4 h-4" />
									{match.company}
								</div>
							)}
							<div className="flex items-center gap-1">
								<MapPin className="w-4 h-4" />
								{match.location}
							</div>
							{match.metadata.remote && (
								<span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded">
									Remote
								</span>
							)}
						</div>
					</div>
					<div className="text-right">
						<div className={`text-2xl font-bold ${getScoreColor(match.score.overall)}`}>
							{match.score.overall}%
						</div>
						<div className={`px-3 py-1 text-xs rounded-full border ${getMatchStrengthBadge(match.matchStrength)}`}>
							{match.matchStrength.replace('-', ' ')}
						</div>
					</div>
				</div>

				{/* Score breakdown */}
				<div className="grid grid-cols-3 gap-4 mb-4">
					<div className="text-center">
						<div className={`text-lg font-semibold ${getScoreColor(match.score.skills)}`}>
							{match.score.skills}%
						</div>
						<div className="text-xs text-gray-600">Skills</div>
					</div>
					<div className="text-center">
						<div className={`text-lg font-semibold ${getScoreColor(match.score.experience)}`}>
							{match.score.experience}%
						</div>
						<div className="text-xs text-gray-600">Experience</div>
					</div>
					<div className="text-center">
						<div className={`text-lg font-semibold ${getScoreColor(match.score.location)}`}>
							{match.score.location}%
						</div>
						<div className="text-xs text-gray-600">Location</div>
					</div>
				</div>

				{/* AI Insights preview */}
				<div className="bg-blue-50 rounded-lg p-3 mb-4">
					<div className="flex items-center gap-2 mb-2">
						<Brain className="w-4 h-4 text-blue-600" />
						<span className="text-sm font-medium text-blue-900">AI Insight</span>
					</div>
					<p className="text-sm text-blue-800">
						{match.aiInsights[0]}
					</p>
				</div>

				{/* Metadata */}
				<div className="flex items-center justify-between text-sm text-gray-600">
					<div className="flex items-center gap-4">
						{match.metadata.salary && (
							<span>{match.metadata.salary}</span>
						)}
						{match.metadata.urgent && (
							<span className="flex items-center gap-1 text-red-600">
								<AlertCircle className="w-4 h-4" />
								Urgent
							</span>
						)}
					</div>
					<div className="flex items-center gap-1">
						<Clock className="w-4 h-4" />
						Response: {match.estimatedResponse}
					</div>
				</div>
			</div>
		</motion.div>
	)

	const renderMatchDetails = (match: SmartMatch) => (
		<motion.div
			initial={{ opacity: 0, x: 20 }}
			animate={{ opacity: 1, x: 0 }}
			className="bg-white rounded-xl border border-gray-200 h-full overflow-hidden"
		>
			{/* Header */}
			<div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6">
				<div className="flex items-center justify-between mb-4">
					<h2 className="text-xl font-semibold">{match.title}</h2>
					<button
						onClick={() => setSelectedMatch(null)}
						className="text-white/80 hover:text-white"
					>
						<XCircle className="w-6 h-6" />
					</button>
				</div>
				<div className="flex items-center gap-4 text-white/90">
					{match.company && (
						<div className="flex items-center gap-1">
							<Building className="w-4 h-4" />
							{match.company}
						</div>
					)}
					<div className="flex items-center gap-1">
						<MapPin className="w-4 h-4" />
						{match.location}
					</div>
				</div>
			</div>

			<div className="p-6 space-y-6 overflow-y-auto">
				{/* Overall Score */}
				<div className="text-center">
					<div className="text-4xl font-bold text-blue-600 mb-2">
						{match.score.overall}%
					</div>
					<div className={`inline-block px-4 py-2 rounded-full border ${getMatchStrengthBadge(match.matchStrength)}`}>
						{match.matchStrength.replace('-', ' ')} Match
					</div>
				</div>

				{/* Detailed Score Breakdown */}
				<div className="space-y-4">
					<h3 className="text-lg font-semibold text-gray-900">Score Breakdown</h3>
					{Object.entries(match.score).filter(([key]) => key !== 'overall').map(([category, score]) => (
						<div key={category} className="space-y-2">
							<div className="flex justify-between items-center">
								<span className="text-sm font-medium text-gray-700 capitalize">
									{category}
								</span>
								<span className={`text-sm font-semibold ${getScoreColor(score)}`}>
									{score}%
								</span>
							</div>
							<div className="w-full bg-gray-200 rounded-full h-2">
								<div 
									className={`h-2 rounded-full transition-all duration-300 ${
										score >= 90 ? 'bg-green-500' :
										score >= 80 ? 'bg-blue-500' :
										score >= 70 ? 'bg-orange-500' : 'bg-red-500'
									}`}
									style={{ width: `${score}%` }}
								/>
							</div>
						</div>
					))}
				</div>

				{/* Explanations */}
				<div className="space-y-4">
					<h3 className="text-lg font-semibold text-gray-900">Detailed Analysis</h3>
					{match.explanation.map((exp, index) => (
						<div key={index} className="border border-gray-200 rounded-lg p-4">
							<div className="flex justify-between items-center mb-3">
								<h4 className="font-medium text-gray-900">{exp.category}</h4>
								<div className={`px-2 py-1 rounded text-sm font-medium ${getScoreColor(exp.score)}`}>
									{exp.score}%
								</div>
							</div>
							
							<div className="space-y-3">
								<div>
									<h5 className="text-sm font-medium text-green-700 mb-1">Strengths</h5>
									<ul className="space-y-1">
										{exp.reasons.map((reason, i) => (
											<li key={i} className="text-sm text-gray-600 flex items-start gap-2">
												<CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
												{reason}
											</li>
										))}
									</ul>
								</div>
								
								{exp.improvements.length > 0 && (
									<div>
										<h5 className="text-sm font-medium text-orange-700 mb-1">Improvements</h5>
										<ul className="space-y-1">
											{exp.improvements.map((improvement, i) => (
												<li key={i} className="text-sm text-gray-600 flex items-start gap-2">
													<Lightbulb className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
													{improvement}
												</li>
											))}
										</ul>
									</div>
								)}
							</div>
						</div>
					))}
				</div>

				{/* AI Insights */}
				<div className="space-y-4">
					<h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
						<Brain className="w-5 h-5 text-blue-600" />
						AI Insights
					</h3>
					<div className="space-y-3">
						{match.aiInsights.map((insight, index) => (
							<div key={index} className="bg-blue-50 border border-blue-200 rounded-lg p-3">
								<p className="text-sm text-blue-800">{insight}</p>
							</div>
						))}
					</div>
				</div>

				{/* Actions */}
				<div className="flex gap-3 pt-4 border-t border-gray-200">
					<button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
						{userType === 'talent' ? 'Apply Now' : 'Contact Candidate'}
						<ArrowUpRight className="w-4 h-4" />
					</button>
					<button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
						Save
					</button>
				</div>
			</div>
		</motion.div>
	)

	return (
		<div className={`space-y-6 ${className}`}>
			{/* Header */}
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
						<Brain className="w-8 h-8 text-blue-600" />
						Smart Matching Engine
					</h1>
					<p className="text-gray-600 mt-1">
						AI-powered {userType === 'talent' ? 'job' : 'talent'} matching with detailed compatibility analysis
					</p>
				</div>
				
				<div className="flex items-center gap-3">
					<button
						onClick={runAIAnalysis}
						disabled={isAnalyzing}
						className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
					>
						<RefreshCw className={`w-4 h-4 ${isAnalyzing ? 'animate-spin' : ''}`} />
						{isAnalyzing ? 'Analyzing...' : 'Re-analyze'}
					</button>
					<button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
						<Filter className="w-4 h-4" />
						Filters
					</button>
				</div>
			</div>

			{/* Tabs */}
			<div className="border-b border-gray-200">
				<nav className="flex space-x-8">
					{[
						{ id: 'matches', label: 'Smart Matches', icon: Target },
						{ id: 'insights', label: 'AI Insights', icon: Brain },
						{ id: 'trends', label: 'Market Trends', icon: BarChart3 }
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
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-[600px]">
				{/* Matches List */}
				<div className="space-y-4">
					<div className="flex items-center justify-between">
						<h2 className="text-lg font-semibold text-gray-900">
							Top Matches ({matches.length})
						</h2>
						<div className="text-sm text-gray-600">
							Updated {new Date().toLocaleTimeString()}
						</div>
					</div>
					
					{isLoading ? (
						<div className="space-y-4">
							{[1, 2, 3].map(i => (
								<div key={i} className="animate-pulse bg-gray-100 rounded-xl h-48" />
							))}
						</div>
					) : (
						<div className="space-y-4 max-h-[700px] overflow-y-auto">
							<AnimatePresence>
								{matches.map(match => renderMatchCard(match))}
							</AnimatePresence>
						</div>
					)}
				</div>

				{/* Match Details */}
				<div>
					{selectedMatch ? (
						renderMatchDetails(selectedMatch)
					) : (
						<div className="bg-gray-50 rounded-xl border-2 border-dashed border-gray-300 h-full flex items-center justify-center">
							<div className="text-center">
								<Target className="w-12 h-12 text-gray-400 mx-auto mb-4" />
								<h3 className="text-lg font-medium text-gray-900 mb-2">
									Select a Match
								</h3>
								<p className="text-gray-600">
									Click on any match to see detailed AI analysis and compatibility breakdown
								</p>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	)
} 