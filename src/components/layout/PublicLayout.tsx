import { Outlet } from 'react-router-dom'
import PublicHeader from './PublicHeader'
import PublicFooter from './PublicFooter'

function PublicLayout() {
	return (
		<div className="min-h-screen flex flex-col">
			<PublicHeader />
			<main className="flex-1">
				<Outlet />
			</main>
			<PublicFooter />
		</div>
	)
}

export default PublicLayout 