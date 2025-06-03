import React, { useState, useEffect, useRef } from 'react'
import { Search, Plus, Check, X } from 'lucide-react'
import LoadingSpinner from '@/components/shared/LoadingSpinner'

interface LookupOption {
	id: number
	name: string
	code?: string
	description?: string
}

interface LookupFieldModalProps {
	isOpen: boolean
	onClose: () => void
	onSelect: (option: LookupOption | null) => void
	title: string
	searchPlaceholder: string
	extractedValue?: string
	lookupType: 'city' | 'country' | 'salutation' | 'visibilityStatus' | 'industry' | 'jobRole'
	allowCreate?: boolean
	parentId?: number // For dependent lookups like cities (need countryId)
	parentOption?: LookupOption // For dependent lookups like cities (need country name)
}

export function LookupFieldModal({
	isOpen,
	onClose,
	onSelect,
	title,
	searchPlaceholder,
	extractedValue,
	lookupType,
	allowCreate = true,
	parentId,
	parentOption
}: LookupFieldModalProps) {
	const [searchTerm, setSearchTerm] = useState(extractedValue || '')
	const [options, setOptions] = useState<LookupOption[]>([])
	const [loading, setLoading] = useState(false)
	const [showCreateForm, setShowCreateForm] = useState(false)
	const [newItemName, setNewItemName] = useState('')
	const [newItemCode, setNewItemCode] = useState('')
	const [newItemPostalCode, setNewItemPostalCode] = useState('')
	const [creating, setCreating] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const debounceRef = useRef<NodeJS.Timeout | null>(null)

	// API endpoints for different lookup types
	const getApiEndpoint = (type: string, search?: string, parentId?: number) => {
		const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5255/api'
		const params = new URLSearchParams()
		
		if (search) params.append('search', search)
		
		const queryString = params.toString() ? `?${params.toString()}` : ''
		
		switch (type) {
			case 'city':
				// For cities, if parentId (countryId) is provided, use the country-specific endpoint
				if (parentId) {
					return `${baseUrl}/Cities/active/country/${parentId}`
				}
				return `${baseUrl}/Cities/active${queryString}`
			case 'country':
				return `${baseUrl}/Countries${queryString}`
			case 'salutation':
				return `${baseUrl}/Salutations${queryString}`
			case 'visibilityStatus':
				return `${baseUrl}/VisibilityStatus${queryString}`
			case 'industry':
				return `${baseUrl}/Industries${queryString}`
			case 'jobRole':
				return `${baseUrl}/JobRoles${queryString}`
			default:
				return `${baseUrl}/Lookup/${type}${queryString}`
		}
	}

	const searchOptions = async (term: string) => {
		setLoading(true)
		setError(null)
		try {
			const token = localStorage.getItem('token')
			if (!token) {
				throw new Error('Authentication token not found. Please log in again.')
			}
			
			// For cities, we don't pass search term to server since it doesn't support search
			const searchTerm = (lookupType === 'city') ? '' : term
			const response = await fetch(getApiEndpoint(lookupType, searchTerm, parentId), {
				headers: {
					'Authorization': `Bearer ${token}`,
					'Content-Type': 'application/json'
				}
			})

			if (response.ok) {
				const data = await response.json()
				// Map different response formats to common structure
				let mappedOptions = data.map((item: any) => ({
					id: item.cityId || item.countryId || item.salutationId || item.statusId || item.id,
					name: item.cityName || item.countryName || item.salutationName || item.statusName || item.name || item.typeName,
					code: item.countryCode || item.code || item.languageCode,
					description: item.description || item.roleDescription || item.industryDescription || item.state
				}))

				// For cities, filter client-side since the API doesn't support search
				if (lookupType === 'city' && term) {
					mappedOptions = mappedOptions.filter((option: LookupOption) =>
						option.name.toLowerCase().includes(term.toLowerCase())
					)
				}

				setOptions(mappedOptions)
			} else {
				const errorMessage = response.status === 404 
					? `No ${lookupType}s found in the database`
					: response.status === 401 
					? 'Authentication failed. Please log in again.'
					: response.status === 403
					? 'You do not have permission to access this data'
					: `Server error (${response.status}): ${response.statusText}`
				
				setError(errorMessage)
				setOptions([])
			}
		} catch (error) {
			const errorMessage = error instanceof Error 
				? error.message 
				: 'Network error. Please check your internet connection and try again.'
			setError(errorMessage)
			setOptions([])
		} finally {
			setLoading(false)
		}
	}

	const createNewOption = async () => {
		if (!newItemName.trim()) {
			setError('Please enter a name for the new entry')
			return
		}
		
		// Validate country code format if provided
		if (lookupType === 'country' && newItemCode && !/^[A-Z]{2,3}$/.test(newItemCode.trim().toUpperCase())) {
			setError('Country code must be 2-3 uppercase letters (e.g., US, UK, USA)')
			return
		}
		
		// Validate postal code format if provided for cities
		if (lookupType === 'city' && newItemPostalCode && newItemPostalCode.trim().length < 3) {
			setError('Postal code must be at least 3 characters long')
			return
		}

		setCreating(true)
		setError(null)
		try {
			const token = localStorage.getItem('token')
			if (!token) {
				throw new Error('Authentication token not found. Please log in again.')
			}
			
			let payload: any = {}

			// Create proper DTOs based on lookup type
			switch (lookupType) {
				case 'city':
					if (!parentId) {
						setError('Please select a country before creating a city')
						return
					}
					// Use the parent option (selected country) to get the country name
					const countryName = parentOption ? parentOption.name : 'Unknown Country'
					
					payload = {
						cityName: newItemName.trim(),
						countryId: parentId,
						countryName: countryName,
						state: '',
						postalCode: newItemPostalCode.trim() || '00000', // Use provided postal code or default
						isActive: true
					}
					break
				case 'country':
					payload = {
						countryName: newItemName.trim(),
						countryCode: newItemCode ? newItemCode.trim().toUpperCase() : newItemName.trim().substring(0, 2).toUpperCase(),
						isActive: true
					}
					break
				case 'salutation':
					payload = {
						salutationName: newItemName.trim()
					}
					break
				case 'visibilityStatus':
					payload = {
						statusName: newItemName.trim()
					}
					break
				default:
					payload = {
						name: newItemName.trim()
					}
			}

			const response = await fetch(getApiEndpoint(lookupType), {
				method: 'POST',
				headers: {
					'Authorization': `Bearer ${token}`,
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(payload)
			})

			if (response.ok) {
				const newOption = await response.json()
				// Map response to common structure
				const mappedOption = {
					id: newOption.cityId || newOption.countryId || newOption.salutationId || newOption.statusId || newOption.id,
					name: newOption.cityName || newOption.countryName || newOption.salutationName || newOption.statusName || newOption.name,
					code: newOption.countryCode || newOption.code,
					description: newOption.description
				}
				onSelect(mappedOption)
				onClose()
			} else {
				let errorMessage: string
				try {
					const errorData = await response.json()
					errorMessage = errorData.message || errorData.error || `Failed to create ${lookupType}`
				} catch {
					errorMessage = response.status === 409 
						? `${newItemName} already exists in the database`
						: response.status === 400
						? `Invalid data provided for ${lookupType}`
						: `Failed to create ${lookupType}. Server error: ${response.status}`
				}
				setError(errorMessage)
			}
		} catch (error) {
			const errorMessage = error instanceof Error 
				? error.message 
				: `Failed to create ${lookupType}. Please try again.`
			setError(errorMessage)
		} finally {
			setCreating(false)
		}
	}

	const resetForm = () => {
		setSearchTerm('')
		setNewItemName('')
		setNewItemCode('')
		setNewItemPostalCode('')
		setShowCreateForm(false)
		setOptions([])
		setError(null)
	}

	const handleClose = () => {
		resetForm()
		onClose()
	}

	useEffect(() => {
		if (isOpen) {
			searchOptions(searchTerm)
		}
	}, [isOpen, searchTerm, lookupType, parentId])

	useEffect(() => {
		if (extractedValue) {
			setSearchTerm(extractedValue)
		}
	}, [extractedValue])

	const handleSearch = (value: string) => {
		setSearchTerm(value)
		
		// Clear existing timeout
		if (debounceRef.current) {
			clearTimeout(debounceRef.current)
		}
		
		// Set new timeout
		debounceRef.current = setTimeout(() => {
			searchOptions(value)
		}, 300)
	}

	// Cleanup timeout on unmount
	useEffect(() => {
		return () => {
			if (debounceRef.current) {
				clearTimeout(debounceRef.current)
			}
		}
	}, [])

	if (!isOpen) return null

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
			<div className="bg-white rounded-lg max-w-md w-full mx-4 max-h-[80vh] flex flex-col">
				{/* Header */}
				<div className="p-6 border-b border-gray-200">
					<div className="flex items-center justify-between">
						<h2 className="text-lg font-semibold flex items-center gap-2">
							<Search className="h-5 w-5" />
							{title}
						</h2>
						<button
							onClick={handleClose}
							className="p-2 hover:bg-gray-100 rounded-full"
						>
							<X className="h-4 w-4" />
						</button>
					</div>
				</div>

				{/* Content */}
				<div className="p-6 flex-1 overflow-hidden">
					<div className="space-y-4 h-full flex flex-col">
						{/* Extracted Value Display */}
						{extractedValue && (
							<div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
								<label className="text-sm font-medium text-blue-700">
									Extracted from CV:
								</label>
								<p className="text-sm text-blue-600 mt-1">{extractedValue}</p>
							</div>
						)}

						{/* Error Display */}
						{error && (
							<div className="p-3 bg-red-50 rounded-lg border border-red-200">
								<div className="flex items-start gap-2">
									<X className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
									<div className="flex-1">
										<p className="text-sm font-medium text-red-700">Error</p>
										<p className="text-sm text-red-600 mt-1">{error}</p>
									</div>
									<button
										onClick={() => setError(null)}
										className="text-red-400 hover:text-red-600"
									>
										<X className="h-4 w-4" />
									</button>
								</div>
								{(error.includes('Authentication') || error.includes('Network')) && (
									<button
										onClick={() => searchOptions(searchTerm)}
										className="mt-2 text-sm text-red-600 hover:text-red-800 underline"
									>
										Try Again
									</button>
								)}
							</div>
						)}

						{/* Search Input */}
						<div className="relative">
							<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
							<input
								type="text"
								placeholder={searchPlaceholder}
								value={searchTerm}
								onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSearch(e.target.value)}
								className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
							/>
						</div>

						{/* Loading State */}
						{loading && (
							<div className="flex justify-center py-4">
								<LoadingSpinner />
							</div>
						)}

						{/* Options List */}
						{!loading && !showCreateForm && (
							<div className="flex-1 overflow-y-auto space-y-1">
								{options.length > 0 ? (
									options.map((option) => (
										<button
											key={option.id}
											onClick={() => {
												onSelect(option)
												onClose()
											}}
											className="w-full text-left p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors"
										>
											<div className="font-medium">{option.name}</div>
											{option.code && (
												<div className="text-sm text-gray-500">{option.code}</div>
											)}
											{option.description && (
												<div className="text-sm text-gray-600 mt-1">{option.description}</div>
											)}
										</button>
									))
								) : !error ? (
									<div className="text-center py-6 text-gray-500">
										<Search className="h-8 w-8 mx-auto mb-2 text-gray-300" />
										<p className="text-lg font-medium mb-2">No matching {lookupType}s found</p>
										<p className="text-sm mb-4">
											We couldn't find "{searchTerm}" in our database.
										</p>
										{allowCreate ? (
											<div className="text-sm space-y-2">
												<p className="text-blue-600 font-medium">What you can do:</p>
												<ul className="text-left space-y-1 max-w-xs mx-auto">
													<li>• Try a different search term</li>
													<li>• Create a new {lookupType} entry below</li>
													<li>• Skip this step to use default values</li>
												</ul>
											</div>
										) : (
											<p className="text-sm text-gray-600">
												Try a different search term or contact support to add "{searchTerm}" to the system.
											</p>
										)}
									</div>
								) : null}
							</div>
						)}

						{/* Create New Form */}
						{showCreateForm && (
							<div className="space-y-3 p-4 bg-gray-50 rounded-lg">
								<label className="text-sm font-medium block">
									Create New {lookupType.charAt(0).toUpperCase() + lookupType.slice(1)}
								</label>
								<input
									type="text"
									placeholder={`Enter ${lookupType} name`}
									value={newItemName}
									onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewItemName(e.target.value)}
									className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
								/>
								{(lookupType === 'country') && (
									<input
										type="text"
										placeholder="Country code (e.g., US, UK)"
										value={newItemCode}
										onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewItemCode(e.target.value)}
										maxLength={3}
										className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
									/>
								)}
								{(lookupType === 'city') && (
									<input
										type="text"
										placeholder="Postal code (e.g., 10001, SW1A 1AA)"
										value={newItemPostalCode}
										onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewItemPostalCode(e.target.value)}
										className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
									/>
								)}
								<div className="flex gap-2">
									<button
										onClick={createNewOption}
										disabled={!newItemName.trim() || creating}
										className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
									>
										{creating ? (
											<LoadingSpinner />
										) : (
											<>
												<Check className="h-4 w-4 mr-2" />
												Create
											</>
										)}
									</button>
									<button
										onClick={() => setShowCreateForm(false)}
										className="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 flex items-center justify-center"
									>
										<X className="h-4 w-4 mr-2" />
										Cancel
									</button>
								</div>
							</div>
						)}
					</div>
				</div>

				{/* Footer */}
				{!showCreateForm && (
					<div className="p-6 border-t border-gray-200">
						<div className="flex gap-2">
							{allowCreate && (
								<button
									onClick={() => setShowCreateForm(true)}
									className="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 flex items-center justify-center"
								>
									<Plus className="h-4 w-4 mr-2" />
									Create New
								</button>
							)}
							<button
								onClick={() => {
									onSelect(null)
									onClose()
								}}
								className="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300"
							>
								Skip
							</button>
							<button
								onClick={handleClose}
								className="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300"
							>
								Cancel
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
	)
} 