import React, { useState, useEffect } from 'react'
import { CheckCircle, AlertCircle, MapPin, Globe, User, Eye } from 'lucide-react'
import { LookupFieldModal } from './LookupFieldModal'
import LoadingSpinner from '@/components/shared/LoadingSpinner'

interface LookupOption {
	id: number
	name: string
	code?: string
}

interface ValidationItem {
	field: string
	extractedValue: string
	lookupType: 'city' | 'country' | 'salutation' | 'visibilityStatus'
	isValid: boolean
	selectedOption?: LookupOption | null
	icon: React.ReactNode
	title: string
	dependsOn?: string // For city depending on country
}

interface CVDataValidationModalProps {
	isOpen: boolean
	onClose: () => void
	onComplete: (validatedData: any) => void
	extractedData: any
}

export function CVDataValidationModal({
	isOpen,
	onClose,
	onComplete,
	extractedData
}: CVDataValidationModalProps) {
	const [validationItems, setValidationItems] = useState<ValidationItem[]>([])
	const [currentLookupModal, setCurrentLookupModal] = useState<{
		isOpen: boolean
		item?: ValidationItem
	}>({ isOpen: false })
	const [loading, setLoading] = useState(false)
	const [validating, setValidating] = useState(false)

	// Initialize validation items based on extracted data
	useEffect(() => {
		if (isOpen && extractedData) {
			const items: ValidationItem[] = []

			// Check if we need country validation (either explicit country data or city data that requires country)
			const needsCountryValidation = extractedData.nationality || extractedData.country || 
				extractedData.city || extractedData.address

			// Country validation
			if (needsCountryValidation) {
				items.push({
					field: 'country',
					extractedValue: extractedData.nationality || extractedData.country || 'United States', // Default fallback
					lookupType: 'country',
					isValid: false,
					icon: <Globe className="h-5 w-5" />,
					title: 'Country/Nationality'
				})
			}

			// City validation (depends on country)
			if (extractedData.city || extractedData.address) {
				items.push({
					field: 'city',
					extractedValue: extractedData.city || extractedData.address?.split(',')[0] || '',
					lookupType: 'city',
					isValid: false,
					icon: <MapPin className="h-5 w-5" />,
					title: 'City/Location',
					dependsOn: 'country'
				})
			}

			// Salutation validation (if we can infer from name/gender)
			if (extractedData.firstName) {
				const inferredSalutation = inferSalutation(extractedData.firstName)
				if (inferredSalutation) {
					items.push({
						field: 'salutation',
						extractedValue: inferredSalutation,
						lookupType: 'salutation',
						isValid: false,
						icon: <User className="h-5 w-5" />,
						title: 'Salutation'
					})
				}
			}

			// Visibility status (default to active)
			items.push({
				field: 'visibilityStatus',
				extractedValue: 'Active',
				lookupType: 'visibilityStatus',
				isValid: false,
				icon: <Eye className="h-5 w-5" />,
				title: 'Profile Visibility'
			})

			setValidationItems(items)
			validateAllItems(items)
		}
	}, [isOpen, extractedData])

	const inferSalutation = (firstName: string): string => {
		const name = firstName.toLowerCase()
		// Simple gender inference - could be enhanced
		const maleNames = ['john', 'michael', 'david', 'james', 'robert', 'william', 'richard', 'thomas', 'charles', 'daniel', 'matthew', 'anthony', 'mark', 'donald', 'steven', 'paul', 'andrew', 'joshua', 'kenneth', 'kevin']
		const femaleNames = ['mary', 'patricia', 'jennifer', 'linda', 'elizabeth', 'barbara', 'susan', 'jessica', 'sarah', 'karen', 'nancy', 'lisa', 'betty', 'helen', 'sandra', 'donna', 'carol', 'ruth', 'sharon', 'michelle']
		
		if (maleNames.some(n => name.includes(n))) return 'Mr.'
		if (femaleNames.some(n => name.includes(n))) return 'Ms.'
		return 'Mr.' // Default
	}

	const validateAllItems = async (items: ValidationItem[]) => {
		setValidating(true)
		const updatedItems = [...items]

		for (let i = 0; i < updatedItems.length; i++) {
			const item = updatedItems[i]
			const isValid = await validateSingleItem(item)
			updatedItems[i] = { ...item, isValid }
		}

		setValidationItems(updatedItems)
		setValidating(false)
	}

	const validateSingleItem = async (item: ValidationItem): Promise<boolean> => {
		try {
			const token = localStorage.getItem('token')
			const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5255/api'
			
			let endpoint = ''
			switch (item.lookupType) {
				case 'country':
					endpoint = `${baseUrl}/Countries?search=${encodeURIComponent(item.extractedValue)}`
					break
				case 'city':
					endpoint = `${baseUrl}/Cities?search=${encodeURIComponent(item.extractedValue)}`
					break
				case 'salutation':
					endpoint = `${baseUrl}/Salutations?search=${encodeURIComponent(item.extractedValue)}`
					break
				case 'visibilityStatus':
					endpoint = `${baseUrl}/VisibilityStatus?search=${encodeURIComponent(item.extractedValue)}`
					break
			}

			const response = await fetch(endpoint, {
				headers: {
					'Authorization': `Bearer ${token}`,
					'Content-Type': 'application/json'
				}
			})

			if (response.ok) {
				const data = await response.json()
				// Check if we have an exact match
				const exactMatch = data.find((option: any) => 
					(option.name || option.countryName || option.cityName || option.salutationName || option.statusName)
						?.toLowerCase() === item.extractedValue.toLowerCase()
				)
				return !!exactMatch
			}
		} catch (error) {
			console.error('Error validating item:', error)
		}
		return false
	}

	const handleItemClick = (item: ValidationItem) => {
		// Check if this item depends on another that hasn't been validated
		if (item.dependsOn) {
			const dependentItem = validationItems.find(vi => vi.field === item.dependsOn)
			
			if (!dependentItem) {
				alert(`Required dependency "${item.dependsOn}" not found. Please contact support.`)
				return
			}
			
			if (!dependentItem.selectedOption && !dependentItem.isValid) {
				const dependencyName = dependentItem.title || item.dependsOn
				alert(`Please select a ${dependencyName} first before selecting ${item.title}`)
				return
			}
		}

		setCurrentLookupModal({ isOpen: true, item })
	}

	const handleLookupSelect = (option: LookupOption | null) => {
		if (currentLookupModal.item) {
			const updatedItems = validationItems.map(item => 
				item.field === currentLookupModal.item?.field
					? { ...item, selectedOption: option, isValid: !!option }
					: item
			)
			setValidationItems(updatedItems)
		}
		setCurrentLookupModal({ isOpen: false })
	}

	const handleComplete = () => {
		setLoading(true)
		
		// Build validated data object
		const validatedData = { ...extractedData }
		
		// Set default values for required fields that might be missing
		if (!validatedData.address) validatedData.address = ''
		if (!validatedData.streetAddress) validatedData.streetAddress = validatedData.address || ''
		if (!validatedData.phoneNumber) validatedData.phoneNumber = ''
		if (!validatedData.email) validatedData.email = ''
		if (!validatedData.nationality) validatedData.nationality = ''
		if (!validatedData.dateOfBirth) validatedData.dateOfBirth = '1990-01-01'
		
		validationItems.forEach(item => {
			if (item.selectedOption) {
				switch (item.field) {
					case 'country':
						validatedData.countryId = item.selectedOption.id
						validatedData.countryName = item.selectedOption.name
						validatedData.nationality = item.selectedOption.name
						break
					case 'city':
						validatedData.cityId = item.selectedOption.id
						validatedData.cityName = item.selectedOption.name
						break
					case 'salutation':
						validatedData.salutationId = item.selectedOption.id
						validatedData.salutationName = item.selectedOption.name
						break
					case 'visibilityStatus':
						validatedData.visibilityStatusId = item.selectedOption.id
						validatedData.visibilityStatusName = item.selectedOption.name
						break
				}
			}
		})

		// Ensure all required IDs have default values if not set
		if (!validatedData.countryId) {
			validatedData.countryId = 1
			validatedData.countryName = 'Default Country'
		}
		if (!validatedData.cityId) {
			validatedData.cityId = 1
			validatedData.cityName = 'Default City'
		}
		if (!validatedData.salutationId) {
			validatedData.salutationId = 1
			validatedData.salutationName = 'Mr.'
		}
		if (!validatedData.visibilityStatusId) {
			validatedData.visibilityStatusId = 1
			validatedData.visibilityStatusName = 'Active'
		}

		setTimeout(() => {
			setLoading(false)
			onComplete(validatedData)
		}, 1000)
	}

	const allItemsValidated = validationItems.every(item => item.isValid || item.selectedOption)
	const hasValidationItems = validationItems.length > 0

	if (!isOpen) return null

	return (
		<>
			<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
				<div className="bg-white rounded-lg max-w-lg w-full mx-4 max-h-[80vh] flex flex-col">
					{/* Header */}
					<div className="p-6 border-b border-gray-200">
						<h2 className="text-xl font-semibold text-gray-900">
							Validate Profile Information
						</h2>
						<p className="text-sm text-gray-600 mt-1">
							Please verify and complete the following information extracted from your CV
						</p>
					</div>

					{/* Content */}
					<div className="p-6 flex-1 overflow-hidden">
						{validating && (
							<div className="flex items-center justify-center py-8">
								<LoadingSpinner />
								<span className="ml-2 text-gray-600">Validating data...</span>
							</div>
						)}

						{!validating && hasValidationItems && (
							<div className="space-y-3">
								{validationItems.map((item, index) => (
									<div
										key={item.field}
										onClick={() => handleItemClick(item)}
										className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
											item.isValid || item.selectedOption
												? 'border-green-200 bg-green-50'
												: 'border-orange-200 bg-orange-50 hover:border-orange-300'
										}`}
									>
										<div className="flex items-center justify-between">
											<div className="flex items-center gap-3">
												{item.icon}
												<div>
													<h3 className="font-medium text-gray-900">
														{item.title}
													</h3>
													<p className="text-sm text-gray-600">
														{item.selectedOption?.name || item.extractedValue}
													</p>
												</div>
											</div>
											<div>
												{(item.isValid || item.selectedOption) ? (
													<CheckCircle className="h-5 w-5 text-green-600" />
												) : (
													<AlertCircle className="h-5 w-5 text-orange-600" />
												)}
											</div>
										</div>
									</div>
								))}
							</div>
						)}

						{!validating && !hasValidationItems && (
							<div className="text-center py-8 text-gray-500">
								<CheckCircle className="h-12 w-12 mx-auto mb-3 text-green-500" />
								<p>All profile information looks good!</p>
							</div>
						)}
					</div>

					{/* Footer */}
					<div className="p-6 border-t border-gray-200">
						<div className="flex gap-3">
							<button
								onClick={onClose}
								className="flex-1 px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
							>
								Cancel
							</button>
							<button
								onClick={handleComplete}
								disabled={!allItemsValidated || loading}
								className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
							>
								{loading ? (
									<LoadingSpinner />
								) : (
									'Complete Profile'
								)}
							</button>
						</div>
					</div>
				</div>
			</div>

			{/* Lookup Modal */}
			{currentLookupModal.isOpen && currentLookupModal.item && (
				<LookupFieldModal
					isOpen={currentLookupModal.isOpen}
					onClose={() => setCurrentLookupModal({ isOpen: false })}
					onSelect={handleLookupSelect}
					title={`Select ${currentLookupModal.item.title}`}
					searchPlaceholder={`Search for ${currentLookupModal.item.title.toLowerCase()}...`}
					extractedValue={currentLookupModal.item.extractedValue}
					lookupType={currentLookupModal.item.lookupType}
					parentId={
						currentLookupModal.item.field === 'city' 
							? validationItems.find(vi => vi.field === 'country')?.selectedOption?.id
							: undefined
					}
					parentOption={
						currentLookupModal.item.field === 'city' 
							? validationItems.find(vi => vi.field === 'country')?.selectedOption || undefined
							: undefined
					}
				/>
			)}
		</>
	)
} 