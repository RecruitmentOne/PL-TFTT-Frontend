import { Star } from 'lucide-react'

function TestimonialsSection() {
	return (
		<section className="py-20 bg-white">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center mb-16">
					<h2 className="text-3xl font-bold text-gray-900 mb-4">
						Success Stories from European Tech Community
					</h2>
					<p className="text-xl text-gray-600 max-w-3xl mx-auto">
						Hear from tech professionals and companies who found their perfect match 
						through our AI-powered platform across Germany, Switzerland, and the EU.
					</p>
				</div>

				{/* Talent Success Stories */}
				<div className="mb-20">
					<h3 className="text-2xl font-semibold text-gray-900 text-center mb-12">
						Tech Professionals Finding Dream Jobs
					</h3>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						{[
							{
								name: 'Sarah Mueller',
								role: 'Senior React Developer',
								company: 'Berlin FinTech Startup',
								location: 'Berlin, Germany',
								flag: '🇩🇪',
								image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80',
								quote: 'The AI matching was incredible - I found my dream React position in Berlin within 2 weeks. The CV parsing understood my full-stack experience perfectly.',
								rating: 5,
								achievement: 'Salary increase: +35%',
								techStack: ['React', 'TypeScript', 'Node.js']
							},
							{
								name: 'Marco Rossi',
								role: 'DevOps Engineer',
								company: 'Zurich Banking Tech',
								location: 'Zurich, Switzerland',
								flag: '🇨🇭',
								image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80',
								quote: 'Moved from Italy to Switzerland seamlessly. The platform helped me navigate work permits and connected me with the perfect DevOps role.',
								rating: 5,
								achievement: 'International move success',
								techStack: ['Kubernetes', 'AWS', 'Docker']
							},
							{
								name: 'Anna Kowalski',
								role: 'Data Scientist',
								company: 'Amsterdam AI Lab',
								location: 'Amsterdam, Netherlands',
								flag: '🇳🇱',
								image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
								quote: 'The career insights helped me understand the Dutch AI market. Found an amazing machine learning role with equity package.',
								rating: 5,
								achievement: 'Equity package included',
								techStack: ['Python', 'TensorFlow', 'MLOps']
							}
						].map((testimonial, index) => (
							<div key={index} className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow">
								<div className="flex items-center mb-6">
									<img
										src={testimonial.image}
										alt={testimonial.name}
										className="w-16 h-16 rounded-full object-cover mr-4"
									/>
									<div>
										<h4 className="font-semibold text-gray-900 flex items-center">
											{testimonial.name} {testimonial.flag}
										</h4>
										<p className="text-blue-600 text-sm font-medium">{testimonial.role}</p>
										<p className="text-gray-500 text-sm">{testimonial.company}</p>
										<p className="text-gray-400 text-xs">{testimonial.location}</p>
									</div>
								</div>
								
								<div className="flex items-center mb-4">
									{[...Array(testimonial.rating)].map((_, i) => (
										<Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
									))}
								</div>
								
								<p className="text-gray-700 italic mb-6">"{testimonial.quote}"</p>
								
								<div className="border-t pt-4">
									<div className="flex items-center justify-between mb-3">
										<span className="text-sm font-medium text-green-600">{testimonial.achievement}</span>
									</div>
									<div className="flex flex-wrap gap-1">
										{testimonial.techStack.map((tech, idx) => (
											<span key={idx} className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
												{tech}
											</span>
										))}
									</div>
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Company Success Stories */}
				<div className="mb-16">
					<h3 className="text-2xl font-semibold text-gray-900 text-center mb-12">
						Companies Building Amazing Tech Teams
					</h3>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{[
							{
								company: 'TechStart Berlin',
								type: 'Startup (50 employees)',
								location: 'Berlin, Germany',
								flag: '🇩🇪',
								image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&auto=format&fit=crop&w=1374&q=80',
								quote: 'Hired 12 developers in 3 months using AI screening. The quality of candidates was exceptional - most hires are still with us after 1 year.',
								metric: 'Quality retention',
								hiringTime: '65% faster hiring',
								contact: 'Lisa Schmidt, CTO'
							},
							{
								company: 'SwissFinTech AG',
								type: 'Scale-up (200 employees)',
								location: 'Zurich, Switzerland',
								flag: '🇨🇭',
								image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
								quote: 'Found our head of blockchain engineering through the platform. The AI matching understood our complex technical requirements perfectly.',
								metric: 'C-level hire success',
								hiringTime: '50% cost reduction',
								contact: 'Thomas Weber, CEO'
							},
							{
								company: 'Amsterdam AI Labs',
								type: 'Research Lab (80 employees)',
								location: 'Amsterdam, Netherlands',
								flag: '🇳🇱',
								image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
								quote: 'Built our entire ML ops team through the platform. The technical depth of candidate profiles exceeded our expectations.',
								metric: 'Full team hired',
								hiringTime: '40% faster delivery',
								contact: 'Dr. Eva van Berg, Research Director'
							}
						].map((story, index) => (
							<div key={index} className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8 border border-blue-100">
								<img
									src={story.image}
									alt={`${story.company} team`}
									className="w-full h-48 object-cover rounded-lg mb-6"
								/>
								
								<div className="mb-4">
									<h4 className="font-bold text-gray-900 flex items-center mb-1">
										{story.company} {story.flag}
									</h4>
									<p className="text-blue-600 text-sm font-medium">{story.type}</p>
									<p className="text-gray-500 text-sm">{story.location}</p>
								</div>
								
								<p className="text-gray-700 italic mb-6">"{story.quote}"</p>
								
								<div className="space-y-2 mb-4">
									<div className="flex items-center justify-between bg-white rounded-lg p-3">
										<span className="text-sm text-gray-600">Success Metric</span>
										<span className="text-sm font-semibold text-green-600">{story.metric}</span>
									</div>
									<div className="flex items-center justify-between bg-white rounded-lg p-3">
										<span className="text-sm text-gray-600">Improvement</span>
										<span className="text-sm font-semibold text-blue-600">{story.hiringTime}</span>
									</div>
								</div>
								
								<div className="text-xs text-gray-500 border-t pt-3">
									— {story.contact}
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Stats Section */}
				<div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center">
					<h3 className="text-2xl font-bold mb-6">Join the European Tech Success Story</h3>
					<div className="grid grid-cols-2 md:grid-cols-4 gap-8">
						<div>
							<div className="text-3xl font-bold mb-2">50K+</div>
							<div className="text-blue-100 text-sm">Tech Professionals Matched</div>
						</div>
						<div>
							<div className="text-3xl font-bold mb-2">5K+</div>
							<div className="text-blue-100 text-sm">Companies Hiring</div>
						</div>
						<div>
							<div className="text-3xl font-bold mb-2">95%</div>
							<div className="text-blue-100 text-sm">Match Satisfaction</div>
						</div>
						<div>
							<div className="text-3xl font-bold mb-2">60%</div>
							<div className="text-blue-100 text-sm">Faster Hiring</div>
						</div>
					</div>
				</div>

				{/* European Tech Community */}
				<div className="mt-16 text-center">
					<h3 className="text-xl font-semibold text-gray-900 mb-8">
						Trusted by Leading European Tech Companies
					</h3>
					<div className="grid grid-cols-3 md:grid-cols-6 gap-8 items-center opacity-60">
						{[
							{ name: 'Berlin Tech Hub', bg: 'bg-blue-100' },
							{ name: 'Zurich Fintech', bg: 'bg-green-100' },
							{ name: 'Amsterdam AI', bg: 'bg-purple-100' },
							{ name: 'Vienna Scale-ups', bg: 'bg-yellow-100' },
							{ name: 'Munich Innovation', bg: 'bg-red-100' },
							{ name: 'Stockholm Digital', bg: 'bg-indigo-100' }
						].map((company, index) => (
							<div key={index} className={`${company.bg} rounded-lg p-4 h-16 flex items-center justify-center`}>
								<span className="text-xs font-medium text-gray-600">{company.name}</span>
							</div>
						))}
					</div>
					<p className="text-sm text-gray-500 mt-4">
						And hundreds more across Germany, Switzerland, Netherlands, Austria, and beyond
					</p>
				</div>
			</div>
		</section>
	)
}

export default TestimonialsSection 