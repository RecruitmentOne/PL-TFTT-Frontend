import { Link } from 'react-router-dom'

function TechHubsSection() {
	return (
		<section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center mb-16">
					<h2 className="text-3xl font-bold text-gray-900 mb-4">
						Premium Tech Opportunities: Germany & Switzerland
					</h2>
					<p className="text-xl text-gray-600 max-w-3xl mx-auto">
						Connect with top-tier tech companies in German and Swiss markets through AI-powered matching. 
						Access premium opportunities with transparent pricing and direct employer connections.
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
					{[
						{
							city: 'Berlin',
							country: 'Germany',
							flag: '🇩🇪',
							image: 'https://images.unsplash.com/photo-1546726747-421c6d69c929?ixlib=rb-4.0.3&auto=format&fit=crop&w=1325&q=80',
							jobs: '4.2K+ Jobs',
							companies: '1.5K+ Companies',
							specialties: ['Startups', 'E-commerce', 'Mobility'],
							avgSalary: '€65-85k',
							talent: 'Premium Market'
						},
						{
							city: 'Munich',
							country: 'Germany',
							flag: '🇩🇪',
							image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
							jobs: '2.4K+ Jobs',
							companies: '900+ Companies',
							specialties: ['Enterprise', 'Automotive', 'AI'],
							avgSalary: '€70-90k',
							talent: 'Tech Hub'
						},
						{
							city: 'Zurich',
							country: 'Switzerland',
							flag: '🇨🇭',
							image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
							jobs: '2.8K+ Jobs',
							companies: '800+ Companies',
							specialties: ['Fintech', 'AI/ML', 'Crypto'],
							avgSalary: '€90-130k',
							talent: 'Premium Market'
						},
						{
							city: 'Basel',
							country: 'Switzerland',
							flag: '🇨🇭',
							image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
							jobs: '1.5K+ Jobs',
							companies: '400+ Companies',
							specialties: ['Pharma Tech', 'Research', 'BioTech'],
							avgSalary: '€85-115k',
							talent: 'Specialized Hub'
						}
					].map((hub, index) => (
						<div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
							<div className="relative h-48">
								<img
									src={hub.image}
									alt={`${hub.city} tech scene`}
									className="w-full h-full object-cover"
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
								<div className="absolute bottom-4 left-4 text-white">
									<h3 className="text-xl font-bold">{hub.city} {hub.flag}</h3>
									<p className="text-sm opacity-90">{hub.country}</p>
								</div>
								<div className="absolute top-4 right-4 bg-white/90 text-gray-800 px-2 py-1 rounded-full text-xs font-medium">
									{hub.talent}
								</div>
							</div>
							
							<div className="p-6">
								<div className="grid grid-cols-2 gap-4 mb-4">
									<div>
										<div className="text-lg font-bold text-blue-600">{hub.jobs}</div>
										<div className="text-xs text-gray-600">Open Positions</div>
									</div>
									<div>
										<div className="text-lg font-bold text-green-600">{hub.companies}</div>
										<div className="text-xs text-gray-600">Tech Companies</div>
									</div>
								</div>
								
								<div className="mb-4">
									<div className="text-sm font-medium text-gray-900 mb-2">Specialties</div>
									<div className="flex flex-wrap gap-1">
										{hub.specialties.map((specialty, idx) => (
											<span key={idx} className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
												{specialty}
											</span>
										))}
									</div>
								</div>
								
								<div className="border-t pt-4">
									<div className="flex justify-between items-center">
										<div>
											<div className="text-sm font-medium text-gray-900">Avg. Salary</div>
											<div className="text-sm text-gray-600">{hub.avgSalary}</div>
										</div>
										<Link
											to="/jobs"
											className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
										>
											View Jobs
										</Link>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>

				{/* EU Talent Source Countries */}
				<div className="bg-white rounded-2xl p-8 shadow-lg">
					<h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
						EU Talent Pool - Ready for German & Swiss Markets
					</h3>
					<div className="grid grid-cols-2 md:grid-cols-6 gap-6">
						{[
							{ city: 'Warsaw', country: 'Poland', talent: '12K+', flag: '🇵🇱' },
							{ city: 'Prague', country: 'Czech Republic', talent: '8K+', flag: '🇨🇿' },
							{ city: 'Bucharest', country: 'Romania', talent: '9K+', flag: '🇷🇴' },
							{ city: 'Vienna', country: 'Austria', talent: '5K+', flag: '🇦🇹' },
							{ city: 'Bratislava', country: 'Slovakia', talent: '4K+', flag: '🇸🇰' },
							{ city: 'Sofia', country: 'Bulgaria', talent: '6K+', flag: '🇧🇬' }
						].map((source, index) => (
							<div key={index} className="text-center p-4 rounded-lg hover:bg-gray-50 transition-colors">
								<div className="text-2xl mb-2">{source.flag}</div>
								<div className="font-semibold text-gray-900">{source.city}</div>
								<div className="text-sm text-gray-600">{source.country}</div>
								<div className="text-sm text-green-600 font-medium">{source.talent} talent</div>
							</div>
						))}
					</div>
				</div>

				{/* CTA Section */}
				<div className="text-center mt-12">
					<div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
						<h3 className="text-2xl font-bold mb-4">Ready to Connect EU Talent with Premium German & Swiss Opportunities?</h3>
						<p className="text-lg text-blue-100 mb-6 max-w-2xl mx-auto">
							Join the AI-powered platform connecting skilled EU professionals with top German and Swiss tech companies through transparent, cost-effective hiring.
						</p>
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<Link
								to="/register/talent"
								className="bg-white text-blue-600 hover:bg-gray-50 px-8 py-3 rounded-lg font-semibold transition-colors"
							>
								Find Premium Tech Jobs
							</Link>
							<Link
								to="/register/team"
								className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 rounded-lg font-semibold transition-colors"
							>
								Hire Top EU Talent
							</Link>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default TechHubsSection 