import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { HeroSection } from '@/components/sections/HeroSection';
import { FeaturesGrid } from '@/components/sections/FeaturesGrid';
import { PricingSection } from '@/components/sections/PricingSection';
import { CTASection } from '@/components/sections/CTASection';

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <HeroSection />
        <FeaturesGrid />
        
        {/* Problem Statement */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                The cloud cost challenge
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-5xl font-bold text-primary-600 mb-4">32%</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Wasted Cloud Spend
                </h3>
                <p className="text-gray-600">
                  The average company wastes 32% of its cloud budget on idle, oversized, or forgotten resources.
                </p>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-primary-600 mb-4">15+</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Hours Per Week
                </h3>
                <p className="text-gray-600">
                  Engineers spend 15+ hours per week on cost reviews that could be automated.
                </p>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-primary-600 mb-4">3</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Cloud Providers
                </h3>
                <p className="text-gray-600">
                  Multi-cloud environments create blind spots that single-provider tools miss.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Auto-Execution Highlight */}
        <section className="py-20 bg-gradient-to-br from-warning-50 to-primary-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                  Set it and forget it — configurable auto-execution
                </h2>
                <p className="text-xl text-gray-600 mb-8">
                  Define approval ceilings per organization. Recommendations below your risk and savings thresholds execute automatically.
                </p>
                <ul className="space-y-4">
                  {[
                    'Configurable max savings threshold (default £500)',
                    'Configurable max risk score (0-100 scale)',
                    'Category allow-lists (idle, rightsizing, etc.)',
                    'Environment exclusions (protect production)',
                    '3 execution modes: AWS API, GitHub PR, ServiceNow',
                    'Full audit trail and rollback capability'
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="text-success-600 mt-1">✓</span>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
                <div className="font-semibold text-gray-900 mb-4">Auto-Execution Settings</div>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-600 block mb-2">Max Savings Threshold</label>
                    <div className="flex items-center gap-4">
                      <div className="flex-1 h-2 bg-gray-200 rounded-full">
                        <div className="h-2 bg-primary-600 rounded-full" style={{width: '50%'}}></div>
                      </div>
                      <span className="font-mono text-sm text-gray-900">£500</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 block mb-2">Max Risk Score</label>
                    <div className="flex items-center gap-4">
                      <div className="flex-1 h-2 bg-gray-200 rounded-full">
                        <div className="h-2 bg-warning-600 rounded-full" style={{width: '40%'}}></div>
                      </div>
                      <span className="font-mono text-sm text-gray-900">40/100</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 block mb-2">Execution Mode</label>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full border-2 border-primary-600 bg-primary-600"></div>
                        <span className="text-sm text-gray-900">AWS API (Direct)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full border-2 border-gray-300"></div>
                        <span className="text-sm text-gray-600">GitHub PR (Terraform)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full border-2 border-gray-300"></div>
                        <span className="text-sm text-gray-600">ServiceNow Ticket</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* AI Agents Deep Dive */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Specialist AI agents that think like your best engineers
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Each agent has access to pattern-aware tools that see actual resource data — not just recommendation summaries.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  name: 'Cost Analyst',
                  description: 'Analyzes spending patterns, identifies waste, recommends rightsizing with GBP savings estimates.',
                  emoji: '💰'
                },
                {
                  name: 'Security Agent',
                  description: 'Reviews public access, encryption gaps, and compliance risks across your infrastructure.',
                  emoji: '🔒'
                },
                {
                  name: 'Architecture Agent',
                  description: 'Evaluates multi-AZ deployments, service coupling, and modernization opportunities.',
                  emoji: '🏗️'
                },
                {
                  name: 'License Agent',
                  description: 'Detects Windows-to-Linux migration savings, BYOL opportunities, and license optimization.',
                  emoji: '📜'
                }
              ].map((agent) => (
                <div key={agent.name} className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow">
                  <div className="text-4xl mb-4">{agent.emoji}</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{agent.name}</h3>
                  <p className="text-gray-600 text-sm">{agent.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <PricingSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
