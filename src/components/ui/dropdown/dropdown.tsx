import React, { useState, useRef, useEffect, ReactNode, ReactElement, CSSProperties } from 'react'
import { ChevronDown, Check, X } from 'lucide-react'
import { useBrand, useBrandColors } from '../../../brand'

export interface DropdownOption {
	value: string | number
	label: string
	description?: string
	icon?: ReactNode
	disabled?: boolean
	group?: string
}

export interface DropdownProps {
	// Core props
	options: DropdownOption[]
	value?: string | number | (string | number)[]
	onChange: (value: string | number | (string | number)[]) => void
	placeholder?: string
	disabled?: boolean
	loading?: boolean
	clearable?: boolean
	searchable?: boolean
	multiple?: boolean
	
	// Appearance
	size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
	variant?: 'default' | 'bordered' | 'filled' | 'underlined'
	fullWidth?: boolean
	error?: boolean
	
	// Advanced features
	maxHeight?: string
	closeOnSelect?: boolean
	grouping?: boolean
	customRender?: (option: DropdownOption) => ReactElement
	emptyMessage?: string
	loadingMessage?: string
	
	// Events
	onOpen?: () => void
	onClose?: () => void
	onSearch?: (searchTerm: string) => void
	
	// Styling
	className?: string
	dropdownClassName?: string
	optionClassName?: string
}

export function Dropdown({
	options,
	value,
	onChange,
	placeholder = 'Select an option...',
	disabled = false,
	loading = false,
	clearable = false,
	searchable = false,
	multiple = false,
	size = 'md',
	variant = 'default',
	fullWidth = false,
	error = false,
	maxHeight = '200px',
	closeOnSelect = true,
	grouping = false,
	customRender,
	emptyMessage = 'No options available',
	loadingMessage = 'Loading...',
	onOpen,
	onClose,
	onSearch,
	className = '',
	dropdownClassName = '',
	optionClassName = ''
}: DropdownProps) {
	const [isOpen, setIsOpen] = useState(false)
	const [searchTerm, setSearchTerm] = useState('')
	const [focusedIndex, setFocusedIndex] = useState(-1)
	
	const dropdownRef = useRef<HTMLDivElement>(null)
	const searchInputRef = useRef<HTMLInputElement>(null)
	const optionsRef = useRef<HTMLDivElement>(null)
	
	const colors = useBrandColors()
	const { theme } = useBrand()

	// Size configurations
	const sizeConfig = {
		xs: { 
			padding: 'px-2 py-1', 
			text: 'text-xs', 
			icon: 'h-3 w-3',
			gap: 'gap-1',
			optionPadding: 'px-2 py-1'
		},
		sm: { 
			padding: 'px-3 py-1.5', 
			text: 'text-sm', 
			icon: 'h-4 w-4',
			gap: 'gap-2',
			optionPadding: 'px-3 py-1.5'
		},
		md: { 
			padding: 'px-3 py-2', 
			text: 'text-base', 
			icon: 'h-4 w-4',
			gap: 'gap-2',
			optionPadding: 'px-3 py-2'
		},
		lg: { 
			padding: 'px-4 py-2.5', 
			text: 'text-lg', 
			icon: 'h-5 w-5',
			gap: 'gap-3',
			optionPadding: 'px-4 py-2.5'
		},
		xl: { 
			padding: 'px-4 py-3', 
			text: 'text-xl', 
			icon: 'h-6 w-6',
			gap: 'gap-3',
			optionPadding: 'px-4 py-3'
		}
	}

	const config = sizeConfig[size]

	// Variant styles
	const getVariantStyles = (): CSSProperties & Record<string, any> => {
		const baseStyles = {
			borderRadius: theme.borderRadius.md,
			fontFamily: theme.typography.fontFamily.primary
		}

		switch (variant) {
			case 'bordered':
				return {
					...baseStyles,
					backgroundColor: colors.background,
					borderColor: error ? '#EF4444' : colors.border,
					borderWidth: '2px',
					color: colors.text.primary,
					'--tw-ring-color': colors.primary
				} as CSSProperties & Record<string, any>
			case 'filled':
				return {
					...baseStyles,
					backgroundColor: colors.surface,
					borderColor: 'transparent',
					borderWidth: '2px',
					color: colors.text.primary,
					'--tw-ring-color': colors.primary
				} as CSSProperties & Record<string, any>
			case 'underlined':
				return {
					...baseStyles,
					backgroundColor: 'transparent',
					borderColor: 'transparent',
					borderBottomColor: error ? '#EF4444' : colors.border,
					borderWidth: '0 0 2px 0',
					borderRadius: '0',
					color: colors.text.primary,
					'--tw-ring-color': colors.primary
				} as CSSProperties & Record<string, any>
			default:
				return {
					...baseStyles,
					backgroundColor: colors.background,
					borderColor: error ? '#EF4444' : colors.border,
					borderWidth: '1px',
					color: colors.text.primary,
					'--tw-ring-color': colors.primary
				} as CSSProperties & Record<string, any>
		}
	}

	// Filter options based on search
	const filteredOptions = searchable && searchTerm
		? options.filter(option => 
			option.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
			option.description?.toLowerCase().includes(searchTerm.toLowerCase())
		)
		: options

	// Group options if grouping is enabled
	const groupedOptions = grouping 
		? filteredOptions.reduce((groups, option) => {
			const group = option.group || 'Other'
			if (!groups[group]) groups[group] = []
			groups[group].push(option)
			return groups
		}, {} as Record<string, DropdownOption[]>)
		: { 'All': filteredOptions }

	// Get display value
	const getDisplayValue = () => {
		if (multiple && Array.isArray(value)) {
			if (value.length === 0) return placeholder
			if (value.length === 1) {
				const option = options.find(opt => opt.value === value[0])
				return option?.label || placeholder
			}
			return `${value.length} selected`
		} else {
			const option = options.find(opt => opt.value === value)
			return option?.label || placeholder
		}
	}

	// Handle option selection
	const handleSelect = (optionValue: string | number) => {
		if (multiple) {
			const currentValue = Array.isArray(value) ? value : []
			const newValue = currentValue.includes(optionValue)
				? currentValue.filter(v => v !== optionValue)
				: [...currentValue, optionValue]
			onChange(newValue)
		} else {
			onChange(optionValue)
			if (closeOnSelect) {
				setIsOpen(false)
			}
		}
	}

	// Handle clear
	const handleClear = (e: React.MouseEvent) => {
		e.stopPropagation()
		onChange(multiple ? [] : '')
	}

	// Handle dropdown toggle
	const handleToggle = () => {
		if (disabled) return
		
		const newIsOpen = !isOpen
		setIsOpen(newIsOpen)
		
		if (newIsOpen) {
			onOpen?.()
			if (searchable) {
				setTimeout(() => searchInputRef.current?.focus(), 100)
			}
		} else {
			onClose?.()
			setSearchTerm('')
			setFocusedIndex(-1)
		}
	}

	// Handle search
	const handleSearch = (term: string) => {
		setSearchTerm(term)
		onSearch?.(term)
		setFocusedIndex(-1)
	}

	// Keyboard navigation
	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (!isOpen) {
			if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
				e.preventDefault()
				handleToggle()
			}
			return
		}

		switch (e.key) {
			case 'Escape':
				e.preventDefault()
				setIsOpen(false)
				break
			case 'ArrowDown':
				e.preventDefault()
				setFocusedIndex(prev => 
					prev < filteredOptions.length - 1 ? prev + 1 : 0
				)
				break
			case 'ArrowUp':
				e.preventDefault()
				setFocusedIndex(prev => 
					prev > 0 ? prev - 1 : filteredOptions.length - 1
				)
				break
			case 'Enter':
				e.preventDefault()
				if (focusedIndex >= 0 && filteredOptions[focusedIndex]) {
					handleSelect(filteredOptions[focusedIndex].value)
				}
				break
		}
	}

	// Close dropdown when clicking outside
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
				setIsOpen(false)
			}
		}

		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside)
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [isOpen])

	// Scroll focused option into view
	useEffect(() => {
		if (focusedIndex >= 0 && optionsRef.current) {
			const focusedElement = optionsRef.current.children[focusedIndex] as HTMLElement
			if (focusedElement) {
				focusedElement.scrollIntoView({ block: 'nearest' })
			}
		}
	}, [focusedIndex])

	const variantStyles = getVariantStyles()
	const hasValue = multiple 
		? Array.isArray(value) && value.length > 0
		: value !== undefined && value !== ''

	return (
		<div 
			ref={dropdownRef}
			className={`relative ${fullWidth ? 'w-full' : 'inline-block'} ${className}`}
		>
			{/* Trigger */}
			<button
				type="button"
				onClick={handleToggle}
				onKeyDown={handleKeyDown}
				disabled={disabled}
				className={`
					${config.padding} ${config.text} ${config.gap}
					flex items-center justify-between
					transition-all duration-200
					focus:outline-none focus:ring-2 focus:ring-offset-2
					disabled:opacity-50 disabled:cursor-not-allowed
					${fullWidth ? 'w-full' : 'min-w-40'}
					${isOpen ? 'ring-2 ring-offset-2' : ''}
				`}
				style={{
					...variantStyles,
					color: hasValue ? colors.text.primary : colors.text.secondary
				}}
			>
				<div className={`flex items-center ${config.gap} flex-1 min-w-0`}>
					<span className="truncate">
						{getDisplayValue()}
					</span>
				</div>
				
				<div className="flex items-center gap-1">
					{/* Clear button */}
					{clearable && hasValue && !disabled && (
						<button
							onClick={handleClear}
							className={`${config.icon} transition-colors hover:scale-110`}
							style={{ color: colors.text.secondary }}
						>
							<X />
						</button>
					)}
					
					{/* Dropdown arrow */}
					<ChevronDown 
						className={`${config.icon} transition-transform duration-200 ${
							isOpen ? 'rotate-180' : ''
						}`}
						style={{ color: colors.text.secondary }}
					/>
				</div>
			</button>

			{/* Dropdown Menu */}
			{isOpen && (
				<>
					{/* Backdrop for mobile */}
					<div className="fixed inset-0 z-10 md:hidden" onClick={() => setIsOpen(false)} />
					
					{/* Dropdown Content */}
					<div
						className={`
							absolute z-20 mt-1 w-full rounded-md shadow-lg
							${dropdownClassName}
						`}
						style={{
							backgroundColor: colors.background,
							border: `1px solid ${colors.border}`,
							boxShadow: theme.shadows.lg,
							maxHeight: maxHeight
						}}
					>
						{/* Search Input */}
						{searchable && (
							<div className="p-2 border-b" style={{ borderColor: colors.border }}>
								<input
									ref={searchInputRef}
									type="text"
									value={searchTerm}
									onChange={(e) => handleSearch(e.target.value)}
									placeholder="Search..."
									className={`
										w-full px-3 py-1.5 text-sm rounded border
										focus:outline-none focus:ring-2 focus:ring-offset-1
									`}
									style={{
										backgroundColor: colors.surface,
										borderColor: colors.border,
										color: colors.text.primary,
										'--tw-ring-color': colors.primary
									} as CSSProperties & Record<string, any>}
								/>
							</div>
						)}

						{/* Options */}
						<div 
							ref={optionsRef}
							className="py-1 overflow-y-auto"
							style={{ maxHeight: searchable ? 'calc(100% - 60px)' : '100%' }}
						>
							{loading ? (
								<div className={`${config.optionPadding} text-center`}>
									<span style={{ color: colors.text.secondary }}>{loadingMessage}</span>
								</div>
							) : Object.keys(groupedOptions).length === 0 || filteredOptions.length === 0 ? (
								<div className={`${config.optionPadding} text-center`}>
									<span style={{ color: colors.text.secondary }}>{emptyMessage}</span>
								</div>
							) : (
								Object.entries(groupedOptions).map(([groupName, groupOptions]) => (
									<div key={groupName}>
										{/* Group Header */}
										{grouping && groupName !== 'All' && (
											<div 
												className="px-3 py-1 text-xs font-semibold uppercase tracking-wider"
												style={{ 
													color: colors.text.secondary,
													backgroundColor: colors.surface 
												}}
											>
												{groupName}
											</div>
										)}
										
										{/* Options */}
										{groupOptions.map((option, index) => {
											const isSelected = multiple 
												? Array.isArray(value) && value.includes(option.value)
												: value === option.value
											const isFocused = filteredOptions.indexOf(option) === focusedIndex
											
											return (
												<button
													key={option.value}
													onClick={() => !option.disabled && handleSelect(option.value)}
													disabled={option.disabled}
													className={`
														${config.optionPadding} ${config.text}
														w-full text-left flex items-center justify-between
														transition-colors duration-150
														disabled:opacity-50 disabled:cursor-not-allowed
														${optionClassName}
													`}
													style={{
														backgroundColor: isFocused 
															? colors.surface 
															: isSelected 
															? `${colors.primary}10`
															: 'transparent',
														color: isSelected 
															? colors.primary 
															: colors.text.primary
													}}
													onMouseEnter={() => setFocusedIndex(filteredOptions.indexOf(option))}
												>
													<div className={`flex items-center ${config.gap} flex-1 min-w-0`}>
														{/* Icon */}
														{option.icon && (
															<span className={config.icon}>
																{option.icon}
															</span>
														)}
														
														{/* Content */}
														<div className="flex-1 min-w-0">
															{customRender ? (
																customRender(option)
															) : (
																<>
																	<div className="truncate">{option.label}</div>
																	{option.description && (
																		<div 
																			className="text-xs truncate"
																			style={{ color: colors.text.secondary }}
																		>
																			{option.description}
																		</div>
																	)}
																</>
															)}
														</div>
													</div>
													
													{/* Selection indicator */}
													{isSelected && (
														<Check className={config.icon} style={{ color: colors.primary }} />
													)}
												</button>
											)
										})}
									</div>
								))
							)}
						</div>
					</div>
				</>
			)}
		</div>
	)
}

// Additional dropdown variants for common use cases
export function SimpleDropdown({ 
	options, 
	value, 
	onChange, 
	placeholder = "Select...",
	className = "" 
}: {
	options: Array<{ value: string | number; label: string }>
	value?: string | number
	onChange: (value: string | number) => void
	placeholder?: string
	className?: string
}) {
	const handleChange = (newValue: string | number | (string | number)[]) => {
		if (!Array.isArray(newValue)) {
			onChange(newValue)
		}
	}

	return (
		<Dropdown
			options={options}
			value={value}
			onChange={handleChange}
			placeholder={placeholder}
			className={className}
		/>
	)
}

export function MultiSelectDropdown({
	options,
	value = [],
	onChange,
	placeholder = "Select options...",
	className = ""
}: {
	options: Array<{ value: string | number; label: string }>
	value?: (string | number)[]
	onChange: (value: (string | number)[]) => void
	placeholder?: string
	className?: string
}) {
	const handleChange = (newValue: string | number | (string | number)[]) => {
		if (Array.isArray(newValue)) {
			onChange(newValue)
		}
	}

	return (
		<Dropdown
			options={options}
			value={value}
			onChange={handleChange}
			placeholder={placeholder}
			multiple
			clearable
			className={className}
		/>
	)
}

export function SearchableDropdown({
	options,
	value,
	onChange,
	placeholder = "Search and select...",
	emptyMessage = "No results found",
	className = ""
}: {
	options: Array<{ value: string | number; label: string; description?: string }>
	value?: string | number
	onChange: (value: string | number) => void
	placeholder?: string
	emptyMessage?: string
	className?: string
}) {
	const handleChange = (newValue: string | number | (string | number)[]) => {
		if (!Array.isArray(newValue)) {
			onChange(newValue)
		}
	}

	return (
		<Dropdown
			options={options}
			value={value}
			onChange={handleChange}
			placeholder={placeholder}
			searchable
			clearable
			emptyMessage={emptyMessage}
			className={className}
		/>
	)
} 