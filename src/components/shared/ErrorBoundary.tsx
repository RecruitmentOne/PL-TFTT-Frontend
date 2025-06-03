import React, { Component, ErrorInfo, ReactNode } from 'react'
import { AlertTriangle, RefreshCw } from 'lucide-react'

interface Props {
	children: ReactNode
	fallback?: ReactNode
}

interface State {
	hasError: boolean
	error?: Error
}

class ErrorBoundary extends Component<Props, State> {
	constructor(props: Props) {
		super(props)
		this.state = { hasError: false }
	}

	static getDerivedStateFromError(error: Error): State {
		return { hasError: true, error }
	}

	componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		console.error('Error boundary caught an error:', error, errorInfo)
		
		// Here you could log to an external error reporting service
		// For example: Sentry.captureException(error, { extra: errorInfo })
	}

	handleReset = () => {
		this.setState({ hasError: false, error: undefined })
	}

	render() {
		if (this.state.hasError) {
			if (this.props.fallback) {
				return this.props.fallback
			}

			return (
				<div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
					<div className="sm:mx-auto sm:w-full sm:max-w-md">
						<div className="mx-auto flex justify-center">
							<AlertTriangle className="h-16 w-16 text-red-500" />
						</div>
						<h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
							Something went wrong
						</h2>
						<p className="mt-2 text-center text-sm text-gray-600">
							We apologize for the inconvenience. Please try refreshing the page.
						</p>
					</div>

					<div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
						<div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
							<div className="space-y-6">
								{process.env.NODE_ENV === 'development' && this.state.error && (
									<div className="bg-red-50 border border-red-200 rounded-md p-4">
										<h3 className="text-sm font-medium text-red-800 mb-2">Error Details:</h3>
										<pre className="text-xs text-red-700 overflow-auto max-h-32">
											{this.state.error.stack}
										</pre>
									</div>
								)}

								<div className="flex flex-col space-y-4">
									<button
										onClick={this.handleReset}
										className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
									>
										<RefreshCw className="h-4 w-4 mr-2" />
										Try Again
									</button>
									
									<button
										onClick={() => window.location.reload()}
										className="w-full flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
									>
										Refresh Page
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			)
		}

		return this.props.children
	}
}

export default ErrorBoundary 