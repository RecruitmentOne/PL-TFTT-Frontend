import React, { useState } from 'react'
import { useBrandColors } from '../../brand'
import DashboardSidebar from './DashboardSidebar'
import DashboardTopBar from './DashboardTopBar'

interface DashboardLayoutWithSidebarProps {
	children: React.ReactNode
	title?: string
	subtitle?: string
}

function DashboardLayoutWithSidebar({ children, title, subtitle }: DashboardLayoutWithSidebarProps) {
	const [sidebarOpen, setSidebarOpen] = useState(false)
	const colors = useBrandColors()

	return (
		<div 
			className="min-h-screen"
			style={{ backgroundColor: colors.surface }}
		>
			{/* Sidebar */}
			<DashboardSidebar 
				isOpen={sidebarOpen} 
				onClose={() => setSidebarOpen(false)} 
			/>

			{/* Main Content */}
			<div className="lg:pl-72">
				{/* Top Bar */}
				<DashboardTopBar 
					onMenuClick={() => setSidebarOpen(true)}
					title={title}
					subtitle={subtitle}
				/>

				{/* Page Content */}
				<main style={{ backgroundColor: colors.surface }}>
					{children}
				</main>
			</div>
		</div>
	)
}

export default DashboardLayoutWithSidebar 