import { useState, useRef, DragEvent, ChangeEvent } from 'react'
import { Upload, X, FileText, CheckCircle, AlertCircle, Eye, Download } from 'lucide-react'
import LoadingSpinner from './LoadingSpinner'
import { profileAPI } from '../../services/api' // Import the profileAPI

interface FileInfo {
	file: File
	id: string
	name: string
	size: number
	type: string
	progress: number
	status: 'uploading' | 'success' | 'error' | 'processing'
	error?: string
	parsedData?: any
	previewUrl?: string
}

interface FileUploadProps {
	accept?: string
	multiple?: boolean
	maxSize?: number // in MB
	maxFiles?: number
	onFileUpload?: (files: FileInfo[]) => void
	onFileRemove?: (fileId: string) => void
	onParseComplete?: (fileId: string, parsedData: any) => void
	className?: string
	disabled?: boolean
	description?: string
	enableParsing?: boolean // For CV parsing
}

function FileUpload({
	accept = '.pdf,.doc,.docx',
	multiple = false,
	maxSize = 10, // 10MB default
	maxFiles = 5,
	onFileUpload,
	onFileRemove,
	onParseComplete,
	className = '',
	disabled = false,
	description = 'Drag and drop your CV here for AI-powered parsing with advanced accuracy, or click to browse',
	enableParsing = false,
}: FileUploadProps) {
	const [files, setFiles] = useState<FileInfo[]>([])
	const [isDragOver, setIsDragOver] = useState(false)
	const fileInputRef = useRef<HTMLInputElement>(null)

	const generateFileId = () => Math.random().toString(36).substr(2, 9)

	const validateFile = (file: File): string | null => {
		// Check file size
		if (file.size > maxSize * 1024 * 1024) {
			return `File size exceeds ${maxSize}MB limit`
		}

		// Check file type
		if (accept && !accept.includes(file.type) && !accept.includes(`.${file.name.split('.').pop()}`)) {
			return `File type not supported. Accepted types: ${accept}`
		}

		return null
	}

	const uploadFile = async (file: File): Promise<FileInfo> => {
		const fileId = generateFileId()
		const fileInfo: FileInfo = {
			file,
			id: fileId,
			name: file.name,
			size: file.size,
			type: file.type,
			progress: 0,
			status: 'uploading',
		}

		// Simulate file upload progress
		const uploadPromise = new Promise<FileInfo>((resolve, reject) => {
			const interval = setInterval(() => {
				fileInfo.progress += Math.random() * 30
				if (fileInfo.progress >= 100) {
					fileInfo.progress = 100
					fileInfo.status = 'success'
					clearInterval(interval)
					
					// If parsing is enabled and it's a CV file, parse it
					if (enableParsing && (file.type === 'application/pdf' || file.name.endsWith('.pdf') || file.name.endsWith('.doc') || file.name.endsWith('.docx'))) {
						parseCV(fileInfo)
					}
					
					resolve(fileInfo)
				}
				setFiles(prev => prev.map(f => f.id === fileId ? { ...f, progress: fileInfo.progress, status: fileInfo.status } : f))
			}, 100)

			// Simulate potential upload error (5% chance)
			setTimeout(() => {
				if (Math.random() < 0.05) {
					clearInterval(interval)
					fileInfo.status = 'error'
					fileInfo.error = 'Upload failed. Please try again.'
					setFiles(prev => prev.map(f => f.id === fileId ? fileInfo : f))
					reject(new Error(fileInfo.error))
				}
			}, 500)
		})

		return uploadPromise
	}

	const parseCV = async (fileInfo: FileInfo) => {
		if (!enableParsing) {
			// If parsing is not enabled, or not a CV, mark as success without parsing
			fileInfo.status = 'success'
			setFiles(prev => prev.map(f => f.id === fileInfo.id ? { ...f, status: 'success'} : f))
			return
		}

		try {
			fileInfo.status = 'processing'
			setFiles(prev => prev.map(f => f.id === fileInfo.id ? { ...f, status: 'processing' } : f))

			// Call the actual backend API for CV parsing
			const response = await profileAPI.parseCvWithAi(fileInfo.file)

			if (response.success && response.extractedData) {
				fileInfo.parsedData = response.extractedData
				fileInfo.status = 'success'
				setFiles(prev => prev.map(f => f.id === fileInfo.id ? { ...f, status: 'success', parsedData: response.extractedData } : f))
				
				if (onParseComplete) {
					onParseComplete(fileInfo.id, response.extractedData)
				}
			} else {
				throw new Error(response.message || 'CV parsing failed')
			}
		} catch (error: any) {
			console.error('Error parsing CV:', error)
			fileInfo.status = 'error'
			fileInfo.error = error.response?.data?.message || error.message || 'Failed to parse CV. Please try again.'
			setFiles(prev => prev.map(f => f.id === fileInfo.id ? { ...f, status: 'error', error: fileInfo.error } : f))
		}
	}

	const handleFileSelect = async (selectedFiles: File[]) => {
		if (disabled) return

		// Check max files limit
		if (!multiple && selectedFiles.length > 1) {
			selectedFiles = [selectedFiles[0]]
		}

		if (files.length + selectedFiles.length > maxFiles) {
			alert(`Maximum ${maxFiles} files allowed`)
			return
		}

		const validFiles: File[] = []
		const errors: string[] = []

		selectedFiles.forEach(file => {
			const error = validateFile(file)
			if (error) {
				errors.push(`${file.name}: ${error}`)
			} else {
				validFiles.push(file)
			}
		})

		if (errors.length > 0) {
			alert(errors.join('\n'))
		}

		if (validFiles.length === 0) return

		// Create file info objects and start upload
		const newFiles: FileInfo[] = validFiles.map(file => ({
			file,
			id: generateFileId(),
			name: file.name,
			size: file.size,
			type: file.type,
			progress: 0,
			status: 'uploading' as const,
		}))

		setFiles(prev => [...prev, ...newFiles])

		// Upload files
		try {
			const uploadPromises = validFiles.map(uploadFile)
			const uploadedFiles = await Promise.allSettled(uploadPromises)
			
			if (onFileUpload) {
				const successfulFiles = uploadedFiles
					.filter((result): result is PromiseFulfilledResult<FileInfo> => result.status === 'fulfilled')
					.map(result => result.value)
				onFileUpload(successfulFiles)
			}
		} catch (error) {
			console.error('Upload error:', error)
		}
	}

	const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
		e.preventDefault()
		if (!disabled) {
			setIsDragOver(true)
		}
	}

	const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
		e.preventDefault()
		setIsDragOver(false)
	}

	const handleDrop = (e: DragEvent<HTMLDivElement>) => {
		e.preventDefault()
		setIsDragOver(false)
		
		if (disabled) return

		const droppedFiles = Array.from(e.dataTransfer.files)
		handleFileSelect(droppedFiles)
	}

	const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			const selectedFiles = Array.from(e.target.files)
			handleFileSelect(selectedFiles)
		}
	}

	const removeFile = (fileId: string) => {
		setFiles(prev => prev.filter(f => f.id !== fileId))
		if (onFileRemove) {
			onFileRemove(fileId)
		}
	}

	const formatFileSize = (bytes: number): string => {
		if (bytes === 0) return '0 Bytes'
		const k = 1024
		const sizes = ['Bytes', 'KB', 'MB', 'GB']
		const i = Math.floor(Math.log(bytes) / Math.log(k))
		return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
	}

	const getStatusIcon = (status: FileInfo['status']) => {
		switch (status) {
			case 'uploading':
			case 'processing':
				return <LoadingSpinner size="sm" />
			case 'success':
				return <CheckCircle className="h-5 w-5 text-green-500" />
			case 'error':
				return <AlertCircle className="h-5 w-5 text-red-500" />
			default:
				return null
		}
	}

	const getStatusColor = (status: FileInfo['status']) => {
		switch (status) {
			case 'uploading':
			case 'processing':
				return 'border-blue-200 bg-blue-50'
			case 'success':
				return 'border-green-200 bg-green-50'
			case 'error':
				return 'border-red-200 bg-red-50'
			default:
				return 'border-gray-200 bg-white'
		}
	}

	return (
		<div className={`space-y-4 ${className}`}>
			{/* Drop Zone */}
			<div
				onDragOver={handleDragOver}
				onDragLeave={handleDragLeave}
				onDrop={handleDrop}
				onClick={() => !disabled && fileInputRef.current?.click()}
				className={`relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all ${
					disabled
						? 'border-gray-200 bg-gray-50 cursor-not-allowed'
						: isDragOver
						? 'border-blue-400 bg-blue-50'
						: 'border-gray-300 hover:border-gray-400'
				}`}
			>
				<input
					ref={fileInputRef}
					type="file"
					accept={accept}
					multiple={multiple}
					onChange={handleFileInputChange}
					className="hidden"
					disabled={disabled}
				/>

				<div className="flex flex-col items-center space-y-4">
					<div className={`w-12 h-12 rounded-full flex items-center justify-center ${
						disabled ? 'bg-gray-200' : 'bg-blue-100'
					}`}>
						<Upload className={`h-6 w-6 ${disabled ? 'text-gray-400' : 'text-blue-600'}`} />
					</div>
					
					<div>
						<p className={`text-lg font-medium ${disabled ? 'text-gray-400' : 'text-gray-900'}`}>
							{description}
						</p>
						<p className={`text-sm mt-1 ${disabled ? 'text-gray-400' : 'text-gray-500'}`}>
							Supported formats: {accept}
						</p>
						<p className={`text-xs mt-1 ${disabled ? 'text-gray-400' : 'text-gray-400'}`}>
							Max size: {maxSize}MB • Max files: {maxFiles}
						</p>
					</div>
				</div>
			</div>

			{/* File List */}
			{files.length > 0 && (
				<div className="space-y-3">
					<h4 className="text-sm font-medium text-gray-900">
						Uploaded Files ({files.length})
					</h4>
					
					{files.map((fileInfo) => (
						<div
							key={fileInfo.id}
							className={`border rounded-lg p-4 ${getStatusColor(fileInfo.status)}`}
						>
							<div className="flex items-center justify-between">
								<div className="flex items-center space-x-3 flex-1 min-w-0">
									<FileText className="h-8 w-8 text-gray-400 flex-shrink-0" />
									
									<div className="flex-1 min-w-0">
										<p className="text-sm font-medium text-gray-900 truncate">
											{fileInfo.name}
										</p>
										<p className="text-xs text-gray-500">
											{formatFileSize(fileInfo.size)}
										</p>
										
										{/* Progress Bar */}
										{(fileInfo.status === 'uploading' || fileInfo.status === 'processing') && (
											<div className="mt-2">
												<div className="flex items-center justify-between text-xs text-gray-500 mb-1">
													<span>
														{fileInfo.status === 'processing' ? 'Parsing CV...' : 'Uploading...'}
													</span>
													<span>{Math.round(fileInfo.progress)}%</span>
												</div>
												<div className="w-full bg-gray-200 rounded-full h-2">
													<div
														className="bg-blue-600 h-2 rounded-full transition-all duration-300"
														style={{ width: `${fileInfo.progress}%` }}
													/>
												</div>
											</div>
										)}
										
										{/* Error Message */}
										{fileInfo.status === 'error' && fileInfo.error && (
											<p className="text-xs text-red-600 mt-1">{fileInfo.error}</p>
										)}
										
										{/* Parsed Data Preview */}
										{enableParsing && fileInfo.parsedData && (
											<div className="mt-2 p-2 bg-green-50 rounded border border-green-200">
												<p className="text-xs text-green-700 font-medium">CV Parsed Successfully</p>
												<p className="text-xs text-green-600">
													Found: {fileInfo.parsedData.skills?.length || 0} skills, 
													{fileInfo.parsedData.experience?.length || 0} experience entries
												</p>
											</div>
										)}
									</div>
								</div>
								
								<div className="flex items-center space-x-2 ml-4">
									{getStatusIcon(fileInfo.status)}
									
									{/* Action Buttons */}
									{fileInfo.status === 'success' && (
										<div className="flex items-center space-x-1">
											{fileInfo.parsedData && (
												<button className="p-1 text-blue-600 hover:text-blue-700">
													<Eye className="h-4 w-4" />
												</button>
											)}
											<button className="p-1 text-gray-600 hover:text-gray-700">
												<Download className="h-4 w-4" />
											</button>
										</div>
									)}
									
									<button
										onClick={(e) => {
											e.stopPropagation()
											removeFile(fileInfo.id)
										}}
										className="p-1 text-gray-600 hover:text-red-600 transition-colors"
									>
										<X className="h-4 w-4" />
									</button>
								</div>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	)
}

export default FileUpload 