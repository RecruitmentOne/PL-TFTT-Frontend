import { useState, useEffect, useCallback, useRef } from 'react'
import { MessageCircle, Send, Phone, Video, MoreVertical, X, Minimize2, Maximize2, Paperclip, Smile, User, Clock, Check, CheckCheck, UserCheck, AlertCircle } from 'lucide-react'
import { useRealTime } from '../../hooks/useRealTime'
import { useAppSelector } from '../../store/hooks'
import api from '../../services/api'

interface Message {
	id: string
	senderId: string
	senderName: string
	senderType: 'talent' | 'recruiter'
	content: string
	timestamp: string
	type: 'text' | 'file' | 'system'
	status: 'sending' | 'sent' | 'delivered' | 'read'
	attachments?: Array<{
		name: string
		url: string
		type: string
		size: number
	}>
}

interface Conversation {
	id: string
	participantId: string
	participantName: string
	participantType: 'talent' | 'recruiter'
	participantCompany?: string
	participantTitle?: string
	lastMessage?: Message
	unreadCount: number
	isOnline: boolean
	isTyping: boolean
	lastSeen?: string
}

interface LiveChatWidgetProps {
	className?: string
	position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'
	initialConversationId?: string
}

function LiveChatWidget({ 
	className = '', 
	position = 'bottom-right',
	initialConversationId
}: LiveChatWidgetProps) {
	const [isOpen, setIsOpen] = useState(false)
	const [isMinimized, setIsMinimized] = useState(false)
	const [conversations, setConversations] = useState<Conversation[]>([])
	const [activeConversation, setActiveConversation] = useState<Conversation | null>(null)
	const [messages, setMessages] = useState<Message[]>([])
	const [newMessage, setNewMessage] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const [isTyping, setIsTyping] = useState(false)
	const [error, setError] = useState<string | null>(null)

	const messagesEndRef = useRef<HTMLDivElement>(null)
	const inputRef = useRef<HTMLInputElement>(null)
	const typingTimeoutRef = useRef<NodeJS.Timeout>()

	const { user } = useAppSelector(state => state.auth)
	const { isConnected } = useAppSelector(state => state.realtime)

	// Initialize real-time connection
	const { sendMessage } = useRealTime({
		enabled: true,
		userId: user?.id,
		userType: 'talent',
		autoReconnect: true
	})

	// Get position classes
	const getPositionClasses = () => {
		switch (position) {
			case 'bottom-right':
				return 'bottom-4 right-4'
			case 'bottom-left':
				return 'bottom-4 left-4'
			case 'top-right':
				return 'top-4 right-4'
			case 'top-left':
				return 'top-4 left-4'
			default:
				return 'bottom-4 right-4'
		}
	}

	// Fetch conversations
	const fetchConversations = useCallback(async () => {
		if (!user?.id) return

		try {
			setError(null)
			const response = await api.get(`/conversations/${user.id}`)
			
			if (response.data?.conversations) {
				const transformedConversations: Conversation[] = response.data.conversations.map((conv: any) => ({
					id: conv.id,
					participantId: conv.participantId,
					participantName: conv.participantName,
					participantType: conv.participantType,
					participantCompany: conv.participantCompany,
					participantTitle: conv.participantTitle,
					lastMessage: conv.lastMessage,
					unreadCount: conv.unreadCount || 0,
					isOnline: conv.isOnline || false,
					isTyping: conv.isTyping || false,
					lastSeen: conv.lastSeen
				}))
				
				setConversations(transformedConversations)

				// Set initial conversation if provided
				if (initialConversationId) {
					const initialConv = transformedConversations.find(c => c.id === initialConversationId)
					if (initialConv) {
						setActiveConversation(initialConv)
						setIsOpen(true)
					}
				}
			}
		} catch (err) {
			console.error('Error fetching conversations:', err)
			setError('Failed to load conversations')
		}
	}, [user?.id, initialConversationId])

	// Fetch messages for active conversation
	const fetchMessages = useCallback(async (conversationId: string) => {
		if (!conversationId) return

		try {
			setIsLoading(true)
			setError(null)
			
			const response = await api.get(`/conversations/${conversationId}/messages`)
			
			if (response.data?.messages) {
				const transformedMessages: Message[] = response.data.messages.map((msg: any) => ({
					id: msg.id,
					senderId: msg.senderId,
					senderName: msg.senderName,
					senderType: msg.senderType,
					content: msg.content,
					timestamp: msg.timestamp,
					type: msg.type || 'text',
					status: msg.status || 'delivered',
					attachments: msg.attachments
				}))
				
				setMessages(transformedMessages)
				
				// Mark messages as read
				await api.put(`/conversations/${conversationId}/mark-read`)
			}
		} catch (err) {
			console.error('Error fetching messages:', err)
			setError('Failed to load messages')
		} finally {
			setIsLoading(false)
		}
	}, [])

	// Send message
	const handleSendMessage = useCallback(async () => {
		if (!newMessage.trim() || !activeConversation || !user?.id) return

		const tempMessage: Message = {
			id: `temp_${Date.now()}`,
			senderId: user.id,
			senderName: user.firstName || 'You',
			senderType: 'talent',
			content: newMessage.trim(),
			timestamp: new Date().toISOString(),
			type: 'text',
			status: 'sending'
		}

		setMessages(prev => [...prev, tempMessage])
		setNewMessage('')

		try {
			// Send via WebSocket if connected
			if (isConnected && sendMessage) {
				sendMessage({
					type: 'message',
					conversationId: activeConversation.id,
					content: newMessage.trim(),
					recipientId: activeConversation.participantId
				})
			}

			// Also send via API for reliability
			const response = await api.post(`/conversations/${activeConversation.id}/messages`, {
				content: newMessage.trim(),
				type: 'text'
			})

			if (response.data?.message) {
				setMessages(prev => 
					prev.map(msg => 
						msg.id === tempMessage.id 
							? { ...response.data.message, status: 'sent' }
							: msg
					)
				)
			}
		} catch (err) {
			console.error('Error sending message:', err)
			// Mark message as failed
			setMessages(prev => 
				prev.map(msg => 
					msg.id === tempMessage.id 
						? { ...msg, status: 'sending', content: `${msg.content} (Failed to send)` }
						: msg
				)
			)
		}
	}, [newMessage, activeConversation, user, isConnected, sendMessage])

	// Handle typing indicator
	const handleTyping = useCallback(() => {
		if (!activeConversation || !isConnected || !sendMessage) return

		if (!isTyping) {
			setIsTyping(true)
			sendMessage({
				type: 'typing_start',
				conversationId: activeConversation.id,
				recipientId: activeConversation.participantId
			})
		}

		// Clear existing timeout
		if (typingTimeoutRef.current) {
			clearTimeout(typingTimeoutRef.current)
		}

		// Set new timeout to stop typing
		typingTimeoutRef.current = setTimeout(() => {
			setIsTyping(false)
			sendMessage({
				type: 'typing_stop',
				conversationId: activeConversation.id,
				recipientId: activeConversation.participantId
			})
		}, 2000)
	}, [activeConversation, isConnected, sendMessage, isTyping])

	// Auto-scroll to bottom
	useEffect(() => {
		if (messagesEndRef.current) {
			messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
		}
	}, [messages])

	// Fetch initial data
	useEffect(() => {
		fetchConversations()
	}, [fetchConversations])

	// Fetch messages when active conversation changes
	useEffect(() => {
		if (activeConversation) {
			fetchMessages(activeConversation.id)
		}
	}, [activeConversation, fetchMessages])

	// Subscribe to real-time updates
	useEffect(() => {
		if (isConnected && sendMessage && user?.id) {
			sendMessage({
				type: 'subscribe',
				channel: 'conversations',
				userId: user.id
			})
		}
	}, [isConnected, sendMessage, user?.id])

	const formatTime = (timestamp: string) => {
		const date = new Date(timestamp)
		return date.toLocaleTimeString('en-US', { 
			hour: '2-digit', 
			minute: '2-digit',
			hour12: false 
		})
	}

	const getStatusIcon = (status: string) => {
		switch (status) {
			case 'sending':
				return <Clock className="w-3 h-3 text-gray-400" />
			case 'sent':
				return <Check className="w-3 h-3 text-gray-400" />
			case 'delivered':
				return <CheckCheck className="w-3 h-3 text-gray-400" />
			case 'read':
				return <CheckCheck className="w-3 h-3 text-blue-500" />
			default:
				return null
		}
	}

	const totalUnreadCount = conversations.reduce((sum, conv) => sum + conv.unreadCount, 0)

	if (!isOpen) {
		return (
			<div className={`fixed z-50 ${getPositionClasses()} ${className}`}>
				<button
					onClick={() => setIsOpen(true)}
					className="relative group bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg transition-all duration-200 hover:scale-110"
				>
					<MessageCircle className="w-6 h-6" />
					{totalUnreadCount > 0 && (
						<div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
							{totalUnreadCount > 99 ? '99+' : totalUnreadCount}
						</div>
					)}
					<div className="absolute inset-0 bg-blue-400 rounded-full animate-ping opacity-20" />
				</button>
			</div>
		)
	}

	return (
		<div className={`fixed z-50 ${getPositionClasses()} ${className}`}>
			<div className={`bg-white dark:bg-gray-800 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 transition-all duration-300 ${
				isMinimized ? 'w-80 h-16' : 'w-80 h-96'
			}`}>
				{/* Header */}
				<div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-blue-50 dark:bg-blue-900/20 rounded-t-lg">
					<div className="flex items-center space-x-3">
						<div className="relative">
							<MessageCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
							{isConnected && (
								<div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800" />
							)}
						</div>
						<div>
							<h3 className="font-medium text-gray-900 dark:text-white">
								{activeConversation ? activeConversation.participantName : 'Messages'}
							</h3>
							{activeConversation && (
								<p className="text-xs text-gray-600 dark:text-gray-400">
									{activeConversation.isOnline ? 'Online' : 
									 activeConversation.lastSeen ? `Last seen ${new Date(activeConversation.lastSeen).toLocaleDateString()}` : 
									 'Offline'}
								</p>
							)}
						</div>
					</div>
					<div className="flex items-center space-x-2">
						{activeConversation && (
							<>
								<button className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
									<Phone className="w-4 h-4 text-gray-600 dark:text-gray-400" />
								</button>
								<button className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
									<Video className="w-4 h-4 text-gray-600 dark:text-gray-400" />
								</button>
							</>
						)}
						<button 
							onClick={() => setIsMinimized(!isMinimized)}
							className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
						>
							{isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
						</button>
						<button 
							onClick={() => setIsOpen(false)}
							className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
						>
							<X className="w-4 h-4" />
						</button>
					</div>
				</div>

				{!isMinimized && (
					<div className="flex flex-col h-80">
						{/* Conversations or Messages */}
						{!activeConversation ? (
							// Conversations list
							<div className="flex-1 overflow-y-auto">
								{conversations.length === 0 ? (
									<div className="p-6 text-center">
										<MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
										<p className="text-gray-600 dark:text-gray-400">No conversations yet</p>
									</div>
								) : (
									<div className="p-2 space-y-1">
										{conversations.map((conversation) => (
											<button
												key={conversation.id}
												onClick={() => setActiveConversation(conversation)}
												className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left"
											>
												<div className="relative">
													<div className="w-10 h-10 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center">
														<User className="w-5 h-5 text-gray-600 dark:text-gray-400" />
													</div>
													{conversation.isOnline && (
														<div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800" />
													)}
												</div>
												<div className="flex-1 min-w-0">
													<div className="flex items-center justify-between">
														<p className="font-medium text-gray-900 dark:text-white truncate">
															{conversation.participantName}
														</p>
														{conversation.unreadCount > 0 && (
															<div className="bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
																{conversation.unreadCount}
															</div>
														)}
													</div>
													<p className="text-sm text-gray-600 dark:text-gray-400 truncate">
														{conversation.lastMessage?.content || 'Start a conversation'}
													</p>
												</div>
											</button>
										))}
									</div>
								)}
							</div>
						) : (
							// Messages view
							<>
								{/* Messages */}
								<div className="flex-1 overflow-y-auto p-3 space-y-3">
									{isLoading ? (
										<div className="flex items-center justify-center py-8">
											<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
										</div>
									) : error ? (
										<div className="text-center py-8">
											<AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-2" />
											<p className="text-red-600 dark:text-red-400">{error}</p>
										</div>
									) : messages.length === 0 ? (
										<div className="text-center py-8">
											<MessageCircle className="w-8 h-8 text-gray-400 mx-auto mb-2" />
											<p className="text-gray-600 dark:text-gray-400">No messages yet</p>
										</div>
									) : (
										messages.map((message) => (
											<div
												key={message.id}
												className={`flex ${message.senderId === user?.id ? 'justify-end' : 'justify-start'}`}
											>
												<div className={`max-w-xs lg:max-w-md px-3 py-2 rounded-lg ${
													message.senderId === user?.id
														? 'bg-blue-600 text-white'
														: 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
												}`}>
													<p className="text-sm">{message.content}</p>
													<div className={`flex items-center justify-between mt-1 ${
														message.senderId === user?.id ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'
													}`}>
														<span className="text-xs">{formatTime(message.timestamp)}</span>
														{message.senderId === user?.id && (
															<div className="ml-2">
																{getStatusIcon(message.status)}
															</div>
														)}
													</div>
												</div>
											</div>
										))
									)}
									{activeConversation.isTyping && (
										<div className="flex justify-start">
											<div className="bg-gray-100 dark:bg-gray-700 rounded-lg px-3 py-2">
												<div className="flex space-x-1">
													<div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
													<div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
													<div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
												</div>
											</div>
										</div>
									)}
									<div ref={messagesEndRef} />
								</div>

								{/* Message input */}
								<div className="p-3 border-t border-gray-200 dark:border-gray-700">
									<div className="flex items-center space-x-2">
										<button className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
											<Paperclip className="w-4 h-4 text-gray-600 dark:text-gray-400" />
										</button>
										<input
											ref={inputRef}
											type="text"
											value={newMessage}
											onChange={(e) => {
												setNewMessage(e.target.value)
												handleTyping()
											}}
											onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
											placeholder="Type a message..."
											className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
										/>
										<button className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
											<Smile className="w-4 h-4 text-gray-600 dark:text-gray-400" />
										</button>
										<button 
											onClick={handleSendMessage}
											disabled={!newMessage.trim()}
											className="p-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
										>
											<Send className="w-4 h-4" />
										</button>
									</div>
								</div>

								{/* Back button */}
								<button
									onClick={() => setActiveConversation(null)}
									className="absolute top-4 left-4 p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
								>
									<X className="w-4 h-4" />
								</button>
							</>
						)}
					</div>
				)}
			</div>
		</div>
	)
}

export default LiveChatWidget 