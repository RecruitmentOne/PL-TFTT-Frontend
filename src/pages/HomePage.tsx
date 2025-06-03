import HeroSection from '../components/marketing/HeroSection'
import FeaturesSection from '../components/marketing/FeaturesSection'
import StatsSection from '../components/marketing/StatsSection'
import CreditSystemSection from '../components/marketing/CreditSystemSection'
import TestimonialsSection from '../components/marketing/TestimonialsSection'
import CTASection from '../components/marketing/CTASection'

function HomePage() {
	return (
		<div className="min-h-screen">
			<HeroSection />
			<FeaturesSection />
			<StatsSection />
			<CreditSystemSection />
			{/* <TestimonialsSection /> */}
			<CTASection />
		</div>
	)
}

export default HomePage 