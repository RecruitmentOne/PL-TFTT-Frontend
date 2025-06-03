import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { 
	LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
	XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
	RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
	ScatterChart, Scatter, ComposedChart
} from 'recharts'
import { 
	TrendingUp, TrendingDown, Eye, Users, Briefcase, MapPin, 
	Calendar, Filter, Download, RefreshCw, Target, Award,
	Globe, Zap, BarChart3, PieChart as PieChartIcon, Activity,
	Brain, Lightbulb, Star, Clock, Euro, ArrowUpRight, ArrowDownRight
} from 'lucide-react'
import { useAppSelector, useAppDispatch } from '../../store/hooks'
import { fetchTalentAnalytics } from '../../store/slices/analyticsSlice'
import { useWebSocketEvent } from './WebSocketProvider'
import { analyticsAPI } from '../../services/api'

interface AnalyticsFilter {
	timeRange: '7d' | '30d' | '90d'
	region: string[]
	skills: string[]
	jobTypes: string[]
	companies: string[]
}

interface PredictiveInsight {
	type: 'skill_demand' | 'salary_trend' | 'job_opportunity' | 'market_shift'
	title: string
	description: string
	confidence: number
	impact: 'high' | 'medium' | 'low'
	timeframe: string
	actionable: boolean
	recommendations: string[]
}

interface MarketPosition {
	skillRanking: number
	totalProfessionals: number
	demandScore: number
	competitiveIndex: number
	growthRate: number
	averageSalary: number
	regionComparison: Array<{
		region: string
		position: number
		opportunities: number
	}>
}

interface SkillDemandData {
	skill: string
	currentDemand: number
	projectedDemand: number
	growth: number
	avgSalary: number
	jobCount: number
	regions: Array<{
		name: string
		demand: number
		salary: number
	}>
}

const EUROPEAN_REGIONS = [
	'All Europe', 'Germany', 'Switzerland',
]

const CHART_COLORS = [
	'#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', 
	'#06B6D4', '#84CC16', '#F97316', '#EC4899', '#6366F1'
]

export default function AdvancedAnalyticsHub() {
	const [selectedView, setSelectedView] = useState<'overview' | 'skills' | 'market' | 'predictions' | 'comparison'>('overview')
	const [filters, setFilters] = useState<AnalyticsFilter>({
		timeRange: '30d',
		region: ['All Europe'],
		skills: [],
		jobTypes: [],
		companies: []
	})
	const [isLoading, setIsLoading] = useState(false)
	const [marketData, setMarketData] = useState<any>(null)
	const [skillsData, setSkillsData] = useState<SkillDemandData[]>([])
	const [predictiveInsights, setPredictiveInsights] = useState<PredictiveInsight[]>([])
	const [marketPosition, setMarketPosition] = useState<MarketPosition | null>(null)
	const [comparisonData, setComparisonData] = useState<any>(null)

	const dispatch = useAppDispatch()
	const { user } = useAppSelector(state => state.auth)
	const analyticsData = useAppSelector(state => state.analytics.talent.data)

	// Real-time data updates via WebSocket
	useWebSocketEvent('stats_update', useCallback((data: any) => {
		// Update real-time metrics
		if (data.type === 'market_update') {
			setMarketData((prev: any) => ({ ...prev, ...data.payload }))
		} else if (data.type === 'skill_demand_update') {
			setSkillsData(prev => 
				prev.map(skill => 
					skill.skill === data.skill 
						? { ...skill, currentDemand: data.demand, growth: data.growth }
						: skill
				)
			)
		}
	}, []))

	// Fetch comprehensive analytics data
	const fetchAnalyticsData = useCallback(async () => {
		if (!user?.id) return

		setIsLoading(true)
		try {
			const [analytics, market, skills] = await Promise.all([
				dispatch(fetchTalentAnalytics({ talentId: user.id, timeRange: filters.timeRange })),
				analyticsAPI.getMarketTrends(),
				analyticsAPI.getSkillDemand(filters.region[0] !== 'All Europe' ? filters.region[0] : undefined)
			])

			setMarketData(market.payload || market)
			setSkillsData(skills.payload || skills)

		} catch (error) {
			console.error('Failed to fetch analytics data:', error)
		} finally {
			setIsLoading(false)
		}
	}, [user?.id, filters.timeRange, filters.region, dispatch])

	useEffect(() => {
		fetchAnalyticsData()
	}, [fetchAnalyticsData])

	// Generate mock predictive insights for demo
	const generatePredictiveInsights = useMemo(() => {
		if (!analyticsData) return []

		return [
			{
				type: 'skill_demand' as const,
				title: 'Rising Demand for AI/ML Skills in Germany',
				description: 'Based on job posting trends, AI and Machine Learning skills are expected to see 45% growth in demand over the next 6 months in the German market.',
				confidence: 87,
				impact: 'high' as const,
				timeframe: '6 months',
				actionable: true,
				recommendations: [
					'Consider adding TensorFlow or PyTorch certification',
					'Focus on MLOps and deployment skills',
					'Highlight any existing ML projects in your portfolio'
				]
			},
			{
				type: 'salary_trend' as const,
				title: 'Salary Increase Opportunity',
				description: 'Professionals with your skill set in the Netherlands are seeing 12% salary increases this quarter.',
				confidence: 92,
				impact: 'medium' as const,
				timeframe: '3 months',
				actionable: true,
				recommendations: [
					'Update your salary expectations',
					'Research Netherlands-based opportunities',
					'Prepare for salary negotiations'
				]
			},
			{
				type: 'job_opportunity' as const,
				title: 'Remote Work Expansion',
				description: 'European companies are expanding remote work policies, increasing opportunities for cross-border employment by 28%.',
				confidence: 78,
				impact: 'high' as const,
				timeframe: '12 months',
				actionable: true,
				recommendations: [
					'Emphasize remote work experience',
					'Consider European timezone alignment',
					'Highlight cross-cultural communication skills'
				]
			}
		]
	}, [analyticsData])

	// Mock skills demand data
	const mockSkillsData = useMemo(() => [
		{
			skill: 'React/Next.js',
			currentDemand: 4200,
			projectedDemand: 5800,
			growth: 38,
			avgSalary: 75000,
			jobCount: 892,
			regions: [
				{ name: 'Germany', demand: 1200, salary: 78000 },
				{ name: 'Netherlands', demand: 950, salary: 82000 },
				{ name: 'France', demand: 800, salary: 68000 },
				{ name: 'UK', demand: 1250, salary: 85000 }
			]
		},
		{
			skill: 'TypeScript',
			currentDemand: 3800,
			projectedDemand: 5200,
			growth: 37,
			avgSalary: 72000,
			jobCount: 756,
			regions: [
				{ name: 'Germany', demand: 1100, salary: 75000 },
				{ name: 'Netherlands', demand: 850, salary: 79000 },
				{ name: 'France', demand: 720, salary: 65000 },
				{ name: 'UK', demand: 1130, salary: 82000 }
			]
		},
		{
			skill: 'Node.js',
			currentDemand: 3400,
			projectedDemand: 4600,
			growth: 35,
			avgSalary: 70000,
			jobCount: 678,
			regions: [
				{ name: 'Germany', demand: 980, salary: 72000 },
				{ name: 'Netherlands', demand: 780, salary: 76000 },
				{ name: 'France', demand: 640, salary: 62000 },
				{ name: 'UK', demand: 1000, salary: 79000 }
			]
		},
		{
			skill: 'Python',
			currentDemand: 4800,
			projectedDemand: 6500,
			growth: 35,
			avgSalary: 73000,
			jobCount: 1024,
			regions: [
				{ name: 'Germany', demand: 1400, salary: 76000 },
				{ name: 'Netherlands', demand: 1100, salary: 80000 },
				{ name: 'France', demand: 950, salary: 66000 },
				{ name: 'UK', demand: 1350, salary: 83000 }
			]
		}
	], [])

	// Mock market position data
	const mockMarketPosition = useMemo((): MarketPosition => ({
		skillRanking: 15,
		totalProfessionals: 2847,
		demandScore: 87,
		competitiveIndex: 3.2,
		growthRate: 24,
		averageSalary: 74500,
		regionComparison: [
			{ region: 'Germany', position: 12, opportunities: 186 },
			{ region: 'Netherlands', position: 8, opportunities: 142 },
			{ region: 'France', position: 18, opportunities: 97 },
			{ region: 'UK', position: 14, opportunities: 203 },
			{ region: 'Switzerland', position: 6, opportunities: 78 }
		]
	}), [])

	const handleFilterChange = (key: keyof AnalyticsFilter, value: any) => {
		setFilters(prev => ({ ...prev, [key]: value }))
	}

	const handleExportData = () => {
		const data = {
			analytics: analyticsData,
			market: marketData,
			skills: skillsData,
			insights: predictiveInsights,
			timestamp: new Date().toISOString()
		}
		
		const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
		const url = URL.createObjectURL(blob)
		const a = document.createElement('a')
		a.href = url
		a.download = `talent-analytics-${new Date().toISOString().split('T')[0]}.json`
		a.click()
		URL.revokeObjectURL(url)
	}

	const renderOverviewDashboard = () => (
		<div className="space-y-6">
			{/* Key Metrics */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
				<div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm text-gray-600">Profile Views</p>
							<p className="text-2xl font-bold text-gray-900">
								{analyticsData?.profileViews?.current || 0}
							</p>
							<p className="text-sm text-green-600 flex items-center mt-1">
								<TrendingUp className="w-4 h-4 mr-1" />
								+{analyticsData?.profileViews?.change || 0}% vs last month
							</p>
						</div>
						<Eye className="w-8 h-8 text-blue-500" />
					</div>
				</div>

				<div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm text-gray-600">Match Quality</p>
							<p className="text-2xl font-bold text-gray-900">
								{analyticsData?.matchQuality?.score || 0}%
							</p>
							<p className="text-sm text-blue-600 flex items-center mt-1">
								<Target className="w-4 h-4 mr-1" />
								{(analyticsData?.matchQuality?.change || 0) > 0 ? '+' : ''}{analyticsData?.matchQuality?.change || 0}% improvement
							</p>
						</div>
						<Target className="w-8 h-8 text-green-500" />
					</div>
				</div>

				<div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm text-gray-600">Market Demand</p>
							<p className="text-2xl font-bold text-gray-900">
								{mockMarketPosition.demandScore}%
							</p>
							<p className="text-sm text-purple-600 flex items-center mt-1">
								<Zap className="w-4 h-4 mr-1" />
								High demand skills
							</p>
						</div>
						<BarChart3 className="w-8 h-8 text-purple-500" />
					</div>
				</div>

				<div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm text-gray-600">Market Position</p>
							<p className="text-2xl font-bold text-gray-900">
								#{mockMarketPosition.skillRanking}
							</p>
							<p className="text-sm text-orange-600 flex items-center mt-1">
								<Award className="w-4 h-4 mr-1" />
								Top 5% in skills
							</p>
						</div>
						<Award className="w-8 h-8 text-orange-500" />
					</div>
				</div>
			</div>

			{/* Charts Grid */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				{/* Profile Views Trend */}
				<div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
					<h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Views Trend</h3>
					<ResponsiveContainer width="100%" height={300}>
						<AreaChart data={analyticsData?.profileViews?.chartData || []}>
							<CartesianGrid strokeDasharray="3 3" />
							<XAxis dataKey="date" />
							<YAxis />
							<Tooltip />
							<Area type="monotone" dataKey="views" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.3} />
						</AreaChart>
					</ResponsiveContainer>
				</div>

				{/* Skills Demand Radar */}
				<div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
					<h3 className="text-lg font-semibold text-gray-900 mb-4">Skills Demand Analysis</h3>
					<ResponsiveContainer width="100%" height={300}>
						<RadarChart data={mockSkillsData.slice(0, 6)}>
							<PolarGrid />
							<PolarAngleAxis dataKey="skill" />
							<PolarRadiusAxis domain={[0, 6000]} />
							<Radar name="Current Demand" dataKey="currentDemand" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.3} />
							<Radar name="Projected Demand" dataKey="projectedDemand" stroke="#10B981" fill="#10B981" fillOpacity={0.2} />
							<Legend />
						</RadarChart>
					</ResponsiveContainer>
				</div>
			</div>

			{/* European Market Opportunities */}
			<div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
				<h3 className="text-lg font-semibold text-gray-900 mb-4">European Market Opportunities</h3>
				<ResponsiveContainer width="100%" height={400}>
					<ComposedChart data={mockMarketPosition.regionComparison}>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="region" />
						<YAxis yAxisId="left" />
						<YAxis yAxisId="right" orientation="right" />
						<Tooltip />
						<Legend />
						<Bar yAxisId="left" dataKey="opportunities" fill="#3B82F6" name="Job Opportunities" />
						<Line yAxisId="right" type="monotone" dataKey="position" stroke="#EF4444" strokeWidth={2} name="Market Position" />
					</ComposedChart>
				</ResponsiveContainer>
			</div>
		</div>
	)

	const renderSkillsAnalysis = () => (
		<div className="space-y-6">
			<div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
				<h3 className="text-lg font-semibold text-gray-900 mb-4">Skills Demand & Salary Analysis</h3>
				<ResponsiveContainer width="100%" height={400}>
					<ScatterChart data={mockSkillsData}>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="currentDemand" name="Current Demand" />
						<YAxis dataKey="avgSalary" name="Average Salary" />
						<Tooltip cursor={{ strokeDasharray: '3 3' }} />
						<Scatter name="Skills" data={mockSkillsData} fill="#3B82F6" />
					</ScatterChart>
				</ResponsiveContainer>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				<div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
					<h3 className="text-lg font-semibold text-gray-900 mb-4">Growth Projections</h3>
					<ResponsiveContainer width="100%" height={300}>
						<BarChart data={mockSkillsData}>
							<CartesianGrid strokeDasharray="3 3" />
							<XAxis dataKey="skill" />
							<YAxis />
							<Tooltip />
							<Bar dataKey="growth" fill="#10B981" />
						</BarChart>
					</ResponsiveContainer>
				</div>

				<div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
					<h3 className="text-lg font-semibold text-gray-900 mb-4">Regional Salary Comparison</h3>
					<ResponsiveContainer width="100%" height={300}>
						<BarChart data={mockSkillsData[0]?.regions || []}>
							<CartesianGrid strokeDasharray="3 3" />
							<XAxis dataKey="name" />
							<YAxis />
							<Tooltip />
							<Bar dataKey="salary" fill="#F59E0B" />
						</BarChart>
					</ResponsiveContainer>
				</div>
			</div>
		</div>
	)

	const renderPredictiveInsights = () => (
		<div className="space-y-6">
			{generatePredictiveInsights.map((insight, index) => (
				<div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
					<div className="flex items-start justify-between mb-4">
						<div className="flex items-center space-x-3">
							<div className={`p-2 rounded-lg ${
								insight.impact === 'high' ? 'bg-red-100 text-red-600' :
								insight.impact === 'medium' ? 'bg-yellow-100 text-yellow-600' :
								'bg-green-100 text-green-600'
							}`}>
								{insight.type === 'skill_demand' ? <Brain className="w-5 h-5" /> :
								 insight.type === 'salary_trend' ? <Euro className="w-5 h-5" /> :
								 insight.type === 'job_opportunity' ? <Briefcase className="w-5 h-5" /> :
								 <Globe className="w-5 h-5" />}
							</div>
							<div>
								<h3 className="text-lg font-semibold text-gray-900">{insight.title}</h3>
								<div className="flex items-center space-x-4 text-sm text-gray-600">
									<span>Confidence: {insight.confidence}%</span>
									<span>Impact: {insight.impact}</span>
									<span>Timeframe: {insight.timeframe}</span>
								</div>
							</div>
						</div>
						<div className="flex items-center space-x-2">
							<div className={`px-2 py-1 rounded-full text-xs font-medium ${
								insight.impact === 'high' ? 'bg-red-100 text-red-800' :
								insight.impact === 'medium' ? 'bg-yellow-100 text-yellow-800' :
								'bg-green-100 text-green-800'
							}`}>
								{insight.impact.toUpperCase()} IMPACT
							</div>
						</div>
					</div>

					<p className="text-gray-700 mb-4">{insight.description}</p>

					{insight.actionable && (
						<div className="bg-blue-50 rounded-lg p-4">
							<h4 className="text-sm font-semibold text-blue-900 mb-2 flex items-center">
								<Lightbulb className="w-4 h-4 mr-2" />
								Recommended Actions
							</h4>
							<ul className="space-y-1">
								{insight.recommendations.map((rec, recIndex) => (
									<li key={recIndex} className="text-sm text-blue-800 flex items-start">
										<span className="inline-block w-1 h-1 bg-blue-600 rounded-full mt-2 mr-2 flex-shrink-0"></span>
										{rec}
									</li>
								))}
							</ul>
						</div>
					)}
				</div>
			))}
		</div>
	)

	return (
		<div className="max-w-7xl mx-auto p-6">
			{/* Header */}
			<div className="flex items-center justify-between mb-8">
				<div>
					<h1 className="text-3xl font-bold text-gray-900">Advanced Analytics Hub</h1>
					<p className="text-gray-600 mt-2">Deep insights into your talent profile and European market trends</p>
				</div>
				<div className="flex items-center space-x-4">
					<button
						onClick={fetchAnalyticsData}
						disabled={isLoading}
						className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
					>
						<RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
						Refresh
					</button>
					<button
						onClick={handleExportData}
						className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
					>
						<Download className="w-4 h-4 mr-2" />
						Export
					</button>
				</div>
			</div>

			{/* Navigation Tabs */}
			<div className="flex space-x-1 bg-gray-100 rounded-lg p-1 mb-8">
				{[
					{ key: 'overview', label: 'Overview', icon: BarChart3 },
					{ key: 'skills', label: 'Skills Analysis', icon: Target },
					{ key: 'market', label: 'Market Position', icon: Globe },
					{ key: 'predictions', label: 'Predictions', icon: Brain },
					{ key: 'comparison', label: 'Comparison', icon: Users }
				].map((tab) => {
					const Icon = tab.icon
					return (
						<button
							key={tab.key}
							onClick={() => setSelectedView(tab.key as any)}
							className={`flex items-center px-4 py-2 rounded-md transition-colors ${
								selectedView === tab.key
									? 'bg-white text-blue-600 shadow-sm'
									: 'text-gray-600 hover:text-gray-900'
							}`}
						>
							<Icon className="w-4 h-4 mr-2" />
							{tab.label}
						</button>
					)
				})}
			</div>

			{/* Filters */}
			<div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 mb-8">
				<div className="flex items-center space-x-6">
					<div className="flex items-center space-x-2">
						<Filter className="w-4 h-4 text-gray-500" />
						<span className="text-sm font-medium text-gray-700">Filters:</span>
					</div>
					
					<select
						value={filters.timeRange}
						onChange={(e) => handleFilterChange('timeRange', e.target.value)}
						className="px-3 py-1 border border-gray-300 rounded-md text-sm"
					>
						<option value="7d">Last 7 days</option>
						<option value="30d">Last 30 days</option>
						<option value="90d">Last 90 days</option>
					</select>

					<select
						value={filters.region[0]}
						onChange={(e) => handleFilterChange('region', [e.target.value])}
						className="px-3 py-1 border border-gray-300 rounded-md text-sm"
					>
						{EUROPEAN_REGIONS.map(region => (
							<option key={region} value={region}>{region}</option>
						))}
					</select>
				</div>
			</div>

			{/* Content based on selected view */}
			{selectedView === 'overview' && renderOverviewDashboard()}
			{selectedView === 'skills' && renderSkillsAnalysis()}
			{selectedView === 'predictions' && renderPredictiveInsights()}
			{selectedView === 'market' && renderOverviewDashboard()}
			{selectedView === 'comparison' && renderSkillsAnalysis()}
		</div>
	)
} 