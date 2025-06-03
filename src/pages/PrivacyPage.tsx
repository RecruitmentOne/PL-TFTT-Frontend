function PrivacyPage() {
	return (
		<div className="min-h-screen py-20">
			<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center mb-16">
					<h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
						Privacy Policy
					</h1>
					<p className="text-xl text-gray-600">
						Last updated: {new Date().toLocaleDateString()}
					</p>
					<p className="text-sm text-gray-500 mt-2">
						For tech professionals across Germany, Switzerland, and the EU
					</p>
				</div>

				<div className="prose prose-lg max-w-none">
					<div className="bg-blue-50 border-l-4 border-blue-400 p-6 mb-8">
						<p className="text-blue-800">
							<strong>Your privacy is paramount in tech recruitment.</strong> This Privacy Policy explains how TFT Platform collects, uses, and protects your technical and personal information when you use our AI-powered tech talent matching platform across European markets.
						</p>
					</div>

					<section className="mb-8">
						<h2 className="text-2xl font-bold text-gray-900 mb-4">1. Information We Collect</h2>
						<div className="space-y-4">
							<div>
								<h3 className="text-lg font-semibold text-gray-900 mb-2">Technical Professional Information</h3>
								<ul className="list-disc list-inside text-gray-600 space-y-1">
									<li>Name, email address, and contact information</li>
									<li>Professional technical background and software development experience</li>
									<li>Programming languages, frameworks, and technical skills (React, Python, Kubernetes, etc.)</li>
									<li>CV/Resume content, GitHub profiles, and technical portfolios</li>
									<li>Job preferences, salary expectations (in EUR), and European location preferences</li>
									<li>Technical certifications and coding bootcamp completions</li>
									<li>Open source contributions and technical project experience</li>
								</ul>
							</div>
							<div>
								<h3 className="text-lg font-semibold text-gray-900 mb-2">AI Processing and Technical Matching Data</h3>
								<ul className="list-disc list-inside text-gray-600 space-y-1">
									<li>OpenAI-powered CV parsing results and extracted technical skills</li>
									<li>Tech stack compatibility scores and framework experience levels</li>
									<li>Job matching algorithms results for German and Swiss tech markets</li>
									<li>Technical interview performance data and coding assessment results</li>
									<li>Platform usage patterns specific to tech job searches</li>
									<li>Communication with tech companies and European employers</li>
								</ul>
							</div>
						</div>
					</section>

					<section className="mb-8">
						<h2 className="text-2xl font-bold text-gray-900 mb-4">2. How We Use Your Technical Information</h2>
						<ul className="list-disc list-inside text-gray-600 space-y-2">
							<li>Provide AI-powered tech talent matching between developers and European tech companies</li>
							<li>Parse and analyze CV content using OpenAI for technical skill extraction</li>
							<li>Match technical professionals with relevant software engineering opportunities in Germany and Switzerland</li>
							<li>Improve our machine learning algorithms for better tech stack compatibility assessment</li>
							<li>Provide insights on European tech market trends and salary benchmarks in EUR</li>
							<li>Communicate about relevant developer opportunities, tech events, and platform updates</li>
							<li>Ensure platform security and prevent fraudulent tech recruitment activities</li>
							<li>Comply with GDPR and European data protection regulations</li>
						</ul>
					</section>

					<section className="mb-8">
						<h2 className="text-2xl font-bold text-gray-900 mb-4">3. Data Sharing with European Tech Companies</h2>
						<div className="space-y-4">
							<p className="text-gray-600">
								We do not sell your technical information. We may share your professional data in the following circumstances:
							</p>
							<ul className="list-disc list-inside text-gray-600 space-y-2">
								<li><strong>With Tech Employers:</strong> When you express interest in a software engineering role or a German/Swiss tech company shows interest in your technical profile</li>
								<li><strong>European Service Providers:</strong> With GDPR-compliant third-party services that help us operate our tech platform (AWS Europe, GitHub integration, etc.)</li>
								<li><strong>Legal Requirements:</strong> When required by European law or to protect our rights and platform security</li>
								<li><strong>Business Transfers:</strong> In connection with mergers, acquisitions, or asset sales within the European tech ecosystem</li>
								<li><strong>Technical Screening:</strong> With authorized tech companies for coding assessments and technical interview processes</li>
							</ul>
						</div>
					</section>

					<section className="mb-8">
						<h2 className="text-2xl font-bold text-gray-900 mb-4">4. Technical Data Security</h2>
						<div className="space-y-4">
							<p className="text-gray-600">
								We implement enterprise-grade security measures to protect your technical and personal information:
							</p>
							<ul className="list-disc list-inside text-gray-600 space-y-2">
								<li>End-to-end encryption of technical data in transit and at rest</li>
								<li>Regular penetration testing and security audits by European cybersecurity firms</li>
								<li>Multi-factor authentication and role-based access controls</li>
								<li>Secure data centers in Germany and Switzerland with ISO 27001 certification</li>
								<li>Comprehensive employee training on GDPR compliance and tech data protection</li>
								<li>Secure API integrations with GitHub, LinkedIn, and other professional platforms</li>
								<li>Regular backups stored in encrypted European data centers</li>
							</ul>
						</div>
					</section>

					<section className="mb-8">
						<h2 className="text-2xl font-bold text-gray-900 mb-4">5. Your Rights Under GDPR (European Tech Professionals)</h2>
						<div className="space-y-4">
							<p className="text-gray-600">
								As a tech professional in the EU, Germany, or Switzerland, you have comprehensive rights under GDPR:
							</p>
							<ul className="list-disc list-inside text-gray-600 space-y-2">
								<li><strong>Access:</strong> Request access to all your technical profile data and AI processing results</li>
								<li><strong>Rectification:</strong> Correct inaccurate technical skills, experience, or personal data</li>
								<li><strong>Erasure:</strong> Request complete deletion of your tech profile and all associated data</li>
								<li><strong>Portability:</strong> Receive your technical data in JSON/CSV format for transfer to other platforms</li>
								<li><strong>Restriction:</strong> Limit how we process your technical information</li>
								<li><strong>Objection:</strong> Object to AI-powered profiling and automated tech matching decisions</li>
								<li><strong>Withdraw Consent:</strong> Withdraw consent for CV parsing, AI matching, and European job alerts</li>
								<li><strong>Human Review:</strong> Request human review of AI-driven technical assessments and match scores</li>
							</ul>
							<div className="bg-green-50 p-4 rounded-lg mt-4">
								<p className="text-green-800 text-sm">
									<strong>Tech Professional Rights:</strong> Contact our European data protection team at <span className="font-mono">privacy@tftplatform.eu</span> to exercise any of these rights.
								</p>
							</div>
						</div>
					</section>

					<section className="mb-8">
						<h2 className="text-2xl font-bold text-gray-900 mb-4">6. Cookies and Tech Platform Tracking</h2>
						<div className="space-y-4">
							<p className="text-gray-600">
								We use cookies and similar technologies to enhance your tech job search experience:
							</p>
							<ul className="list-disc list-inside text-gray-600 space-y-2">
								<li>Remember your preferred programming languages and tech stack preferences</li>
								<li>Analyze usage patterns for German and Swiss tech job searches</li>
								<li>Provide personalized tech content and European market insights</li>
								<li>Ensure platform security during tech recruitment processes</li>
								<li>Track performance of AI matching algorithms for continuous improvement</li>
								<li>Integrate with GitHub, LinkedIn, and other professional development platforms</li>
							</ul>
							<p className="text-gray-600">
								You can control cookie settings through your browser preferences or our cookie management dashboard.
							</p>
						</div>
					</section>

					<section className="mb-8">
						<h2 className="text-2xl font-bold text-gray-900 mb-4">7. Data Retention for Tech Professionals</h2>
						<p className="text-gray-600">
							We retain your technical professional information for as long as necessary to provide our tech recruitment services and comply with European legal obligations. Specific retention periods:
						</p>
						<ul className="list-disc list-inside text-gray-600 space-y-2 mt-4">
							<li><strong>Active Profiles:</strong> Retained while your tech profile is active and job searching</li>
							<li><strong>Application History:</strong> 3 years after last tech job application</li>
							<li><strong>CV and Technical Documents:</strong> 2 years after account deletion</li>
							<li><strong>AI Processing Results:</strong> 1 year for algorithm improvement purposes</li>
							<li><strong>European Compliance:</strong> As required by German and Swiss employment law</li>
						</ul>
					</section>

					<section className="mb-8">
						<h2 className="text-2xl font-bold text-gray-900 mb-4">8. Contact Our European Data Protection Team</h2>
						<div className="space-y-4">
							<p className="text-gray-600">
								For questions about this Privacy Policy, tech data handling, or to exercise your GDPR rights:
							</p>
							<div className="bg-gray-50 p-6 rounded-lg">
								<p className="text-gray-600">
									<strong>European Privacy Team:</strong> privacy@tftplatform.eu<br />
									<strong>Tech Support:</strong> tech-privacy@tftplatform.eu<br />
									<strong>Berlin Office:</strong> Alexanderplatz 7, 10178 Berlin, Germany<br />
									<strong>Zurich Office:</strong> Bahnhofstrasse 45, 8001 Zurich, Switzerland<br />
									<strong>Data Protection Officer:</strong> dpo@tftplatform.eu<br />
									<strong>GDPR Compliance Hotline:</strong> +49 30 1234 5678 (Germany) / +41 44 123 45 67 (Switzerland)
								</p>
							</div>
						</div>
					</section>

					<section className="mb-8">
						<h2 className="text-2xl font-bold text-gray-900 mb-4">9. Changes to This Tech Privacy Policy</h2>
						<p className="text-gray-600">
							We may update this Privacy Policy to reflect changes in our tech platform, European regulations, or AI processing capabilities. We will notify all tech professionals by email and through platform notifications of any material changes. Continued use of our tech recruitment platform constitutes acceptance of the updated policy.
						</p>
					</section>

					<div className="bg-blue-50 border-l-4 border-blue-400 p-6 mt-8">
						<p className="text-blue-800 text-sm">
							<strong>Questions about AI Processing?</strong> Our tech team is available to explain how our OpenAI-powered algorithms process your technical data and create job matches. Contact us at <span className="font-mono">ai-transparency@tftplatform.eu</span>
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default PrivacyPage 