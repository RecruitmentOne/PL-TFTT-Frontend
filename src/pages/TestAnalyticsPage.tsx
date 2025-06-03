import React, { useState, useEffect } from 'react'
import { analyticsAPI, realtimeAPI } from '../services/api'
import { useAppSelector } from '../store/hooks'

interface TestResult {
	endpoint: string
	status: 'pending' | 'success' | 'error'
	data?: any
	error?: string
	responseTime?: number
}

function TestAnalyticsPage() {
	const [testResults, setTestResults] = useState<TestResult[]>([])
	const [isRunning, setIsRunning] = useState(false)
	const { user } = useAppSelector((state) => state.auth)

	const endpoints = [
		{
			name: 'Analytics - Market Trends',
			test: () => analyticsAPI.getMarketTrends()
		},
		{
			name: 'Analytics - Skill Demand',
			test: () => analyticsAPI.getSkillDemand('Berlin')
		},
		{
			name: 'Analytics - Dashboard Stats',
			test: () => analyticsAPI.getDashboardStats(user?.id || '1', 'talent')
		},
		{
			name: 'Real-time - Notifications',
			test: () => realtimeAPI.getNotifications(user?.id || '1', 5)
		},
		{
			name: 'Real-time - Stats',
			test: () => realtimeAPI.getRealTimeStats(user?.id || '1', 'talent')
		},
		{
			name: 'Real-time - Activity Feed',
			test: () => realtimeAPI.getActivityFeed(user?.id || '1', 5)
		},
		{
			name: 'Real-time - Live Matches',
			test: () => realtimeAPI.getLiveMatches(user?.id || '1', 'talent')
		},
		{
			name: 'Analytics - Log Profile View',
			test: () => analyticsAPI.logProfileView('1', user?.id, 'talent')
		}
	]

	const runTests = async () => {
		setIsRunning(true)
		setTestResults([])

		for (const endpoint of endpoints) {
			const startTime = Date.now()
			
			setTestResults(prev => [...prev, {
				endpoint: endpoint.name,
				status: 'pending'
			}])

			try {
				const result = await endpoint.test()
				const responseTime = Date.now() - startTime

				setTestResults(prev => prev.map(test => 
					test.endpoint === endpoint.name
						? {
							...test,
							status: 'success',
							data: result,
							responseTime
						}
						: test
				))
			} catch (error: any) {
				const responseTime = Date.now() - startTime

				setTestResults(prev => prev.map(test => 
					test.endpoint === endpoint.name
						? {
							...test,
							status: 'error',
							error: error.message || 'Unknown error',
							responseTime
						}
						: test
				))
			}

			// Small delay between tests
			await new Promise(resolve => setTimeout(resolve, 500))
		}

		setIsRunning(false)
	}

	const runIndividualTest = async (endpoint: typeof endpoints[0]) => {
		const startTime = Date.now()
		
		setTestResults(prev => {
			const filtered = prev.filter(test => test.endpoint !== endpoint.name)
			return [...filtered, {
				endpoint: endpoint.name,
				status: 'pending'
			}]
		})

		try {
			const result = await endpoint.test()
			const responseTime = Date.now() - startTime

			setTestResults(prev => prev.map(test => 
				test.endpoint === endpoint.name
					? {
						...test,
						status: 'success',
						data: result,
						responseTime
					}
					: test
			))
		} catch (error: any) {
			const responseTime = Date.now() - startTime

			setTestResults(prev => prev.map(test => 
				test.endpoint === endpoint.name
					? {
						...test,
						status: 'error',
						error: error.message || 'Unknown error',
						responseTime
					}
					: test
			))
		}
	}

	const getStatusColor = (status: TestResult['status']) => {
		switch (status) {
			case 'pending': return 'text-yellow-600 bg-yellow-50'
			case 'success': return 'text-green-600 bg-green-50'
			case 'error': return 'text-red-600 bg-red-50'
			default: return 'text-gray-600 bg-gray-50'
		}
	}

	const getStatusIcon = (status: TestResult['status']) => {
		switch (status) {
			case 'pending': return '⏳'
			case 'success': return '✅'
			case 'error': return '❌'
			default: return '⚪'
		}
	}

	return (
		<div className="min-h-screen bg-gray-50 py-8">
			<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="bg-white shadow rounded-lg">
					<div className="px-6 py-4 border-b border-gray-200">
						<h1 className="text-2xl font-bold text-gray-900">
							Analytics & Real-Time API Test Dashboard
						</h1>
						<p className="mt-2 text-gray-600">
							Test the integration between frontend and new backend APIs
						</p>
					</div>

					<div className="p-6">
						{/* Test Controls */}
						<div className="mb-8">
							<div className="flex flex-wrap gap-4">
								<button
									onClick={runTests}
									disabled={isRunning}
									className={`px-6 py-2 rounded-md font-medium ${
										isRunning
											? 'bg-gray-400 text-white cursor-not-allowed'
											: 'bg-blue-600 text-white hover:bg-blue-700'
									}`}
								>
									{isRunning ? 'Running Tests...' : 'Run All Tests'}
								</button>

								<button
									onClick={() => setTestResults([])}
									className="px-6 py-2 rounded-md font-medium bg-gray-600 text-white hover:bg-gray-700"
								>
									Clear Results
								</button>
							</div>

							{user && (
								<div className="mt-4 p-4 bg-blue-50 rounded-md">
									<p className="text-blue-800">
										<strong>Current User:</strong> {user.email} ({user.userType})
									</p>
									<p className="text-blue-600 text-sm">
										Tests will use your user ID: {user.id}
									</p>
								</div>
							)}

							{!user && (
								<div className="mt-4 p-4 bg-yellow-50 rounded-md">
									<p className="text-yellow-800">
										⚠️ Not logged in. Some tests may require authentication.
									</p>
								</div>
							)}
						</div>

						{/* Individual Test Buttons */}
						<div className="mb-8">
							<h3 className="text-lg font-medium text-gray-900 mb-4">Individual Tests</h3>
							<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
								{endpoints.map((endpoint) => (
									<button
										key={endpoint.name}
										onClick={() => runIndividualTest(endpoint)}
										disabled={isRunning}
										className="px-4 py-2 text-sm rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700 disabled:opacity-50"
									>
										{endpoint.name}
									</button>
								))}
							</div>
						</div>

						{/* Test Results */}
						<div>
							<h3 className="text-lg font-medium text-gray-900 mb-4">Test Results</h3>
							
							{testResults.length === 0 ? (
								<p className="text-gray-500 text-center py-8">
									No tests run yet. Click "Run All Tests" to start.
								</p>
							) : (
								<div className="space-y-4">
									{testResults.map((result, index) => (
										<div key={index} className="border border-gray-200 rounded-lg">
											<div className="p-4">
												<div className="flex items-center justify-between">
													<div className="flex items-center space-x-3">
														<span className="text-lg">{getStatusIcon(result.status)}</span>
														<h4 className="font-medium text-gray-900">
															{result.endpoint}
														</h4>
														<span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(result.status)}`}>
															{result.status.toUpperCase()}
														</span>
													</div>
													{result.responseTime && (
														<span className="text-sm text-gray-500">
															{result.responseTime}ms
														</span>
													)}
												</div>

												{result.error && (
													<div className="mt-3 p-3 bg-red-50 rounded-md">
														<p className="text-red-800 text-sm font-medium">Error:</p>
														<p className="text-red-700 text-sm">{result.error}</p>
													</div>
												)}

												{result.data && (
													<details className="mt-3">
														<summary className="cursor-pointer text-sm text-blue-600 hover:text-blue-800">
															View Response Data
														</summary>
														<div className="mt-2 p-3 bg-gray-50 rounded-md">
															<pre className="text-xs text-gray-700 overflow-auto max-h-64">
																{JSON.stringify(result.data, null, 2)}
															</pre>
														</div>
													</details>
												)}
											</div>
										</div>
									))}
								</div>
							)}
						</div>

						{/* Summary */}
						{testResults.length > 0 && (
							<div className="mt-8 p-4 bg-gray-50 rounded-lg">
								<h4 className="font-medium text-gray-900 mb-2">Test Summary</h4>
								<div className="grid grid-cols-3 gap-4 text-center">
									<div>
										<p className="text-2xl font-bold text-green-600">
											{testResults.filter(r => r.status === 'success').length}
										</p>
										<p className="text-sm text-gray-600">Passed</p>
									</div>
									<div>
										<p className="text-2xl font-bold text-red-600">
											{testResults.filter(r => r.status === 'error').length}
										</p>
										<p className="text-sm text-gray-600">Failed</p>
									</div>
									<div>
										<p className="text-2xl font-bold text-yellow-600">
											{testResults.filter(r => r.status === 'pending').length}
										</p>
										<p className="text-sm text-gray-600">Pending</p>
									</div>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}

export default TestAnalyticsPage 