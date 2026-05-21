import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  CheckCircle, X, ArrowRight, Eye, ChevronDown, ChevronUp,
} from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';

function PricingCard({ name, price, period, description, features, highlighted, cta }: {
  name: string; price: string; period: string; description: string;
  features: string[]; highlighted?: boolean; cta: string;
}) {
  return (
    <div className={`rounded-2xl border p-8 flex flex-col ${
      highlighted
        ? 'border-primary-300 bg-primary-50/50 shadow-lg ring-1 ring-primary-200 relative'
        : 'border-gray-200 bg-white hover:shadow-md'
    } transition-all`}>
      {highlighted && (
        <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary-600 text-white text-xs font-semibold rounded-full">
          Most Popular
        </span>
      )}
      <h3 className="text-xl font-bold text-gray-900">{name}</h3>
      <div className="mt-4 mb-2">
        <span className="text-4xl font-bold text-gray-900">{price}</span>
        {period && <span className="text-gray-500 text-sm ml-1">{period}</span>}
      </div>
      <p className="text-sm text-gray-600 mb-6">{description}</p>
      <ul className="space-y-3 flex-1">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm text-gray-700">
            <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
            {f}
          </li>
        ))}
      </ul>
      <button className={`mt-8 w-full py-3 rounded-lg font-medium text-sm transition-colors ${
        highlighted
          ? 'bg-primary-600 text-white hover:bg-primary-700'
          : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
      }`}>
        {cta}
      </button>
    </div>
  );
}

const comparisonFeatures = [
  { category: 'Cloud Providers', features: [
    { name: 'AWS support', starter: true, pro: true, enterprise: true },
    { name: 'Azure support', starter: false, pro: true, enterprise: true },
    { name: 'GCP support', starter: false, pro: true, enterprise: true },
  ]},
  { category: 'Cost Analysis', features: [
    { name: 'Cost dashboard', starter: true, pro: true, enterprise: true },
    { name: 'Cost trends & comparisons', starter: true, pro: true, enterprise: true },
    { name: 'Cost allocation by tags', starter: false, pro: true, enterprise: true },
    { name: 'Resource inventory', starter: true, pro: true, enterprise: true },
  ]},
  { category: 'Detection & Rules', features: [
    { name: 'Built-in detection rules', starter: '5 rules', pro: 'All 56', enterprise: 'All 56' },
    { name: 'Custom YAML rules', starter: false, pro: true, enterprise: true },
    { name: 'Threshold overrides', starter: false, pro: true, enterprise: true },
  ]},
  { category: 'AI & Automation', features: [
    { name: 'AI specialist agents', starter: false, pro: '4 agents', enterprise: '4 agents' },
    { name: 'Natural language queries', starter: false, pro: true, enterprise: true },
    { name: 'Conversation memory', starter: false, pro: true, enterprise: true },
    { name: 'RAG learning (Qdrant)', starter: false, pro: true, enterprise: true },
    { name: 'Auto-execution engine', starter: false, pro: true, enterprise: true },
  ]},
  { category: 'Monitoring & Alerts', features: [
    { name: 'Anomaly detection', starter: false, pro: true, enterprise: true },
    { name: 'Cost forecasting', starter: false, pro: true, enterprise: true },
    { name: 'Budget tracking', starter: '1 budget', pro: 'Unlimited', enterprise: 'Unlimited' },
    { name: 'Email alerts', starter: true, pro: true, enterprise: true },
    { name: 'Slack alerts', starter: false, pro: true, enterprise: true },
  ]},
  { category: 'Governance', features: [
    { name: 'Cost limit policies', starter: false, pro: true, enterprise: true },
    { name: 'Tagging compliance', starter: false, pro: true, enterprise: true },
    { name: 'Region restrictions', starter: false, pro: true, enterprise: true },
  ]},
  { category: 'Reporting', features: [
    { name: 'Executive reports', starter: false, pro: true, enterprise: true },
    { name: 'Carbon footprint reports', starter: false, pro: true, enterprise: true },
    { name: 'CSV / JSON export', starter: true, pro: true, enterprise: true },
  ]},
  { category: 'Integrations', features: [
    { name: 'GitHub (Terraform PRs)', starter: false, pro: true, enterprise: true },
    { name: 'ServiceNow tickets', starter: false, pro: true, enterprise: true },
  ]},
  { category: 'Enterprise', features: [
    { name: 'SSO / SAML', starter: false, pro: false, enterprise: true },
    { name: 'Dedicated support & SLA', starter: false, pro: false, enterprise: true },
    { name: 'Custom integrations', starter: false, pro: false, enterprise: true },
    { name: 'On-premise deployment', starter: false, pro: false, enterprise: true },
    { name: 'Advanced audit & compliance', starter: false, pro: false, enterprise: true },
  ]},
];

function CellValue({ value }: { value: boolean | string }) {
  if (typeof value === 'string') {
    return <span className="text-sm font-medium text-gray-900">{value}</span>;
  }
  return value
    ? <CheckCircle className="w-4 h-4 text-emerald-500 mx-auto" />
    : <X className="w-4 h-4 text-gray-300 mx-auto" />;
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-200">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left"
      >
        <span className="font-medium text-gray-900">{question}</span>
        {open ? <ChevronUp className="w-4 h-4 text-gray-400 shrink-0" /> : <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />}
      </button>
      {open && (
        <p className="pb-5 text-sm text-gray-600 leading-relaxed">{answer}</p>
      )}
    </div>
  );
}

export default function PricingPage() {
  return (
    <div>
      {/* Hero */}
      <section className="hero-gradient relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 relative z-10 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight tracking-tight mb-6">
            Simple, Transparent<br />
            <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">
              Pricing
            </span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-indigo-200 leading-relaxed">
            Start free with a single cloud provider. Upgrade to Pro for the full multi-cloud platform
            with AI agents and automated remediations. No hidden fees.
          </p>
        </div>
      </section>

      {/* Pricing cards */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <AnimatedSection>
              <PricingCard
                name="Starter"
                price="Free"
                period=""
                description="For teams getting started with cloud cost visibility."
                cta="Start Free"
                features={[
                  'Up to $10k monthly cloud spend',
                  '5 built-in detection rules',
                  'Basic dashboard & cost trends',
                  'Single cloud provider (AWS)',
                  'Resource inventory',
                  'Email alerts',
                  'CSV export',
                  '1 budget tracker',
                ]}
              />
            </AnimatedSection>
            <AnimatedSection>
              <PricingCard
                name="Pro"
                price="£499"
                period="/month"
                description="Full FinOps platform for growing teams."
                highlighted
                cta="Start Free Trial"
                features={[
                  'Unlimited cloud spend',
                  'All 56 rules + custom YAML rules',
                  '4 AI specialist agents',
                  'Auto-execution engine',
                  'Multi-cloud (AWS, Azure, GCP)',
                  'Anomaly detection + forecasting',
                  'Slack + GitHub + ServiceNow',
                  'Conversation memory & RAG',
                  'Governance & policies',
                  'Executive & carbon reports',
                  'Unlimited budgets',
                ]}
              />
            </AnimatedSection>
            <AnimatedSection>
              <PricingCard
                name="Enterprise"
                price="Custom"
                period=""
                description="For organisations with complex multi-cloud estates."
                cta="Contact Sales"
                features={[
                  'Everything in Pro',
                  'SSO / SAML integration',
                  'Dedicated support & SLA',
                  'Custom integrations',
                  'On-premise deployment option',
                  'Advanced audit & compliance',
                  'Custom AI agent training',
                  'Priority feature requests',
                ]}
              />
            </AnimatedSection>
          </div>

          <AnimatedSection>
            <p className="text-center text-sm text-gray-500 mt-8">
              All plans include a 14-day free trial. No credit card required.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Feature comparison table */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-14">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Compare Plans</h2>
              <p className="text-gray-600">See exactly what's included in each plan.</p>
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900 w-1/2">Feature</th>
                      <th className="text-center py-4 px-4 text-sm font-semibold text-gray-900">Starter</th>
                      <th className="text-center py-4 px-4 text-sm font-semibold text-primary-700 bg-primary-50/50">Pro</th>
                      <th className="text-center py-4 px-4 text-sm font-semibold text-gray-900">Enterprise</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonFeatures.map((group) => (
                      <>
                        <tr key={group.category} className="bg-gray-50/50">
                          <td colSpan={4} className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                            {group.category}
                          </td>
                        </tr>
                        {group.features.map((feature) => (
                          <tr key={feature.name} className="border-t border-gray-100">
                            <td className="py-3 px-6 text-sm text-gray-700">{feature.name}</td>
                            <td className="py-3 px-4 text-center"><CellValue value={feature.starter} /></td>
                            <td className="py-3 px-4 text-center bg-primary-50/20"><CellValue value={feature.pro} /></td>
                            <td className="py-3 px-4 text-center"><CellValue value={feature.enterprise} /></td>
                          </tr>
                        ))}
                      </>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-14">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <div>
              <FaqItem
                question="How does the 14-day free trial work?"
                answer="Sign up with your email and connect your cloud account. You get full access to Pro features for 14 days — no credit card required. If you don't upgrade, you'll automatically move to the Starter plan."
              />
              <FaqItem
                question="What cloud providers do you support?"
                answer="FinOpsMind supports AWS, Azure, and GCP. The Starter plan includes a single provider (AWS), while Pro and Enterprise plans include all three. We integrate with Cost Explorer, CloudWatch, Azure Cost Management, Azure Advisor, GCP Billing, and more."
              />
              <FaqItem
                question="How does the auto-execution engine work?"
                answer="You configure approval ceilings: maximum savings amount, maximum risk score, and allowed categories. Recommendations that fall within your guardrails execute automatically via your preferred channel — direct AWS API calls, Terraform GitHub PRs, or ServiceNow tickets. Everything above your thresholds requires manual approval."
              />
              <FaqItem
                question="Is my cloud data secure?"
                answer="Yes. All data is encrypted at rest with AES-256-GCM. We use JWT + OAuth2 for authentication with role-based access control. API keys and credentials are never stored in plaintext. Every action is logged in a complete audit trail."
              />
              <FaqItem
                question="What are the AI specialist agents?"
                answer="FinOpsMind includes 4 AI agents powered by Claude: Cost Analyst (spending patterns and rightsizing), Security Agent (public access and encryption), Architecture Agent (multi-AZ and modernisation), and License Agent (Windows-to-Linux and BYOL). Each agent has access to pattern-aware tools that analyse actual resource utilisation data."
              />
              <FaqItem
                question="Can I write custom detection rules?"
                answer="Yes. Pro and Enterprise plans include all 56 built-in rules plus the ability to write unlimited custom rules in YAML. Rules support 15 condition operators, 60+ resource fields, and custom savings formulas. You can test rules against live data before activating them."
              />
              <FaqItem
                question="How do you calculate savings estimates?"
                answer="Each detection rule includes a savings formula based on the resource type and recommended action. For example, terminating an idle EC2 instance saves 100% of its cost, while rightsizing typically saves 40-65%. All estimates are based on actual resource costs from your cloud billing data."
              />
              <FaqItem
                question="Can I deploy on-premise?"
                answer="On-premise deployment is available on the Enterprise plan. FinOpsMind is a Rust binary with PostgreSQL, Redis, and Qdrant dependencies — it runs anywhere you can host containers. Contact our sales team for deployment options."
              />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 hero-gradient">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Start Saving Today
          </h2>
          <p className="text-indigo-200 mb-8">No credit card required. 14-day free trial with full Pro access.</p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <button className="px-6 py-3 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition-colors text-sm flex items-center gap-2">
              Start Free Trial <ArrowRight className="w-4 h-4" />
            </button>
            <Link
              to="/demo/dashboard"
              className="px-6 py-3 bg-white/10 text-white font-medium rounded-lg border border-white/20 hover:bg-white/20 transition-colors text-sm flex items-center gap-2"
            >
              <Eye className="w-4 h-4" /> Explore Live Demo
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
