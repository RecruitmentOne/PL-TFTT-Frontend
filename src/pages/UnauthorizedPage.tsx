import { Link } from 'react-router-dom'
import { ShieldX, ArrowLeft } from 'lucide-react'
import { useBrandColors } from '../brand'
import { BrandLogo } from '../components/brand/brand-logo'
import { 
	BrandedH1, 
	BrandedH2, 
	BrandedP 
} from '../components/brand'

function UnauthorizedPage() {
	const colors = useBrandColors()

	return (
		<div 
			className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8"
			style={{ backgroundColor: colors.background }}
		>
			<div className="sm:mx-auto sm:w-full sm:max-w-md">
				{/* TFTT Logo */}
				<div className="mx-auto flex justify-center mb-6">
					<BrandLogo variant="icon" size="lg" />
				</div>
				
				<div className="mx-auto flex justify-center">
					<ShieldX className="h-16 w-16 text-red-500" />
				</div>
				<BrandedH2 className="mt-6 text-center text-3xl font-bold tracking-tight">
					Access Denied
				</BrandedH2>
				<BrandedP className="mt-2 text-center text-sm" style={{ color: colors.text.secondary }}>
					You don't have permission to access this page on the TFTT Platform.
				</BrandedP>
			</div>

			<div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
				<div 
					className="py-8 px-4 shadow sm:rounded-lg sm:px-10"
					style={{ backgroundColor: colors.surface }}
				>
					<div className="space-y-6">
						<div className="text-center">
							<BrandedH2 className="text-lg font-medium mb-4">
								What you can do:
							</BrandedH2>
							<ul className="text-sm space-y-2" style={{ color: colors.text.secondary }}>
								<li>• Check if you're logged in with the correct account</li>
								<li>• Contact support if you believe this is an error</li>
								<li>• Go back to the previous page</li>
							</ul>
						</div>

						<div className="flex flex-col space-y-4">
							<Link
								to="/dashboard"
								className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium transition-colors"
								style={{
									backgroundColor: colors.primary,
									color: colors.text.inverse
								}}
								onMouseEnter={(e) => {
									e.currentTarget.style.backgroundColor = colors.secondary
								}}
								onMouseLeave={(e) => {
									e.currentTarget.style.backgroundColor = colors.primary
								}}
							>
								Go to Dashboard
							</Link>
							
							<button
								onClick={() => window.history.back()}
								className="w-full flex justify-center items-center py-2 px-4 border rounded-md shadow-sm text-sm font-medium transition-colors"
								style={{
									backgroundColor: colors.background,
									color: colors.text.primary,
									borderColor: colors.border
								}}
								onMouseEnter={(e) => {
									e.currentTarget.style.backgroundColor = colors.surface
								}}
								onMouseLeave={(e) => {
									e.currentTarget.style.backgroundColor = colors.background
								}}
							>
								<ArrowLeft className="h-4 w-4 mr-2" />
								Go Back
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default UnauthorizedPage 