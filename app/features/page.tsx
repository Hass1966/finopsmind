import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { 
  Cloud, 
  Bot, 
  Zap, 
  Shield, 
  TrendingUp, 
  Code,
  Activity,
  Settings,
  Database,
  GitBranch,
  Bell
} from 'lucide-react';

const featureCategories = [
  {
    title: 'Cost Visibility',
    icon: TrendingUp,
    features: [
      {
        name: 'Multi-Cloud Dashboard',
        description: 'Unified view across AWS, Azure, and GCP with real-time cost tracking and provider breakdowns.'
      },
      {
        name: 'Cost Trends',
        description: '30-day historical analysis with month-over-month comparisons and variance detection.'
      },
      {
        name: 'Service Breakdown',
        description: 'Drill down by service, region, tag, or account to understand exactly where money goes.'
      },
      {
        name: 'AI/GPU Tracking',
        description: 'Dedicated tracking for high-cost AI workloads and GPU instances.'
      }
    ]
  },
  {
    title: 'Optimization',
    icon: Zap,
    features: [
      {
        name: '56+ Detection Rules',
        description: 'Comprehensive coverage: idle EC2, oversized RDS, unused EBS, old-gen instances, Graviton candidates, Lambda memory, NAT gateway analysis, and more.'
      },
      {
        name: 'Custom YAML Rules',
        description: 'Write your own detection rules with 60+ resource fields, custom operators, and savings formulas.'
      },
      {
        name: 'Terraform Generation',
        description: 'Automatic Terraform code generation for every recommendation with full rollback capability.'
      },
      {
        name: 'Confidence Scoring',
        description: 'ML-based confidence scores (0-100) for every recommendation based on pattern analysis.'
      }
    ]
  },
  {
    title: 'Automation',
    icon: Settings,
    features: [
      {
        name: 'Auto-Execution Engine',
        description: 'Configure risk/savings thresholds and let FinOpsMind execute low-risk optimizations automatically.'
      },
      {
        name: '3 Execution Modes',
        description: 'AWS API direct, GitHub PR (Terraform), or ServiceNow ticket — choose what fits your workflow.'
      },
      {
        name: 'Approval Workflows',
        description: 'High-risk changes require approval via Slack with full context and reasoning.'
      },
      {
        name: 'Daily Limits',
        description: 'Set maximum daily executions to control the pace of changes.'
      }
    ]
  },
  {
    title: 'AI Intelligence',
    icon: Bot,
    features: [
      {
        name: '4 Specialist Agents',
        description: 'Cost Analyst, Security Agent, Architecture Agent, and License Agent — each with domain expertise.'
      },
      {
        name: 'Streaming Analysis',
        description: 'Real-time streaming with visible tool calls, reasoning traces, and confidence scores.'
      },
      {
        name: 'Multi-Turn Conversations',
        description: 'Ask follow-up questions and the agent remembers context from previous turns.'
      },
      {
        name: 'RAG Learning',
        description: 'Qdrant vector DB stores past decisions so agents learn from your approval patterns.'
      }
    ]
  },
  {
    title: 'Governance',
    icon: Shield,
    features: [
      {
        name: 'Policy Engine',
        description: 'Define cost limits, tagging requirements, region restrictions, and resource type governance.'
      },
      {
        name: 'Threshold Overrides',
        description: 'Customize any built-in rule threshold to match your organization\'s standards.'
      },
      {
        name: 'Environment Protection',
        description: 'Exclude production or critical environments from automated changes.'
      },
      {
        name: 'Audit Trail',
        description: 'Full history of every recommendation, approval, execution, and rollback.'
      }
    ]
  },
  {
    title: 'Reporting',
    icon: Database,
    features: [
      {
        name: 'Executive Summaries',
        description: 'One-page KPI reports: total cost, MoM change, savings realized, budget utilization.'
      },
      {
        name: 'Carbon Footprint',
        description: 'CO2 emissions tracking by region and service with energy consumption breakdown.'
      },
      {
        name: 'Cost Comparison',
        description: 'Period-over-period analysis with trend visualization and variance explanations.'
      },
      {
        name: 'CSV/JSON Export',
        description: 'Export any view or report for further analysis in your BI tools.'
      }
    ]
  }
];

export default function FeaturesPage() {
  return (
    <>
      <Navigation />
      <main className="pt-24 pb-20">
        {/* Hero */}
        <section className="bg-gradient-to-br from-primary-50 to-purple-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Comprehensive cloud cost optimization
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Every feature you need to understand, optimize, and automate your multi-cloud spending — from detailed visibility to intelligent execution.
            </p>
          </div>
        </section>

        {/* Feature Categories */}
        {featureCategories.map((category, idx) => (
          <section key={category.title} className={idx % 2 === 0 ? 'bg-white py-20' : 'bg-gray-50 py-20'}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center gap-4 mb-12">
                <div className="w-14 h-14 rounded-xl bg-primary-100 flex items-center justify-center">
                  <category.icon className="text-primary-600" size={28} />
                </div>
                <h2 className="text-4xl font-bold text-gray-900">{category.title}</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                {category.features.map((feature) => (
                  <div key={feature.name} className="bg-white border border-gray-200 rounded-xl p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.name}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))}

        {/* Integrations */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Connects to your entire stack
              </h2>
              <p className="text-xl text-gray-600">
                Native integrations with the tools you already use
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { name: 'AWS', desc: 'EC2, RDS, S3, Lambda, ECS, EKS, CloudWatch' },
                { name: 'Azure', desc: 'VMs, Managed Disks, Advisor, Cost Management' },
                { name: 'GCP', desc: 'Compute Engine, BigQuery, Cloud Billing' },
                { name: 'GitHub', desc: 'Terraform PR automation' },
                { name: 'ServiceNow', desc: 'Automated incident creation' },
                { name: 'Slack', desc: 'Real-time alerts and approvals' },
                { name: 'Qdrant', desc: 'Vector search for RAG learning' },
                { name: 'Claude AI', desc: 'Anthropic Claude for analysis' },
              ].map((integration) => (
                <div key={integration.name} className="text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-xl mx-auto mb-3 flex items-center justify-center">
                    <span className="text-2xl font-bold text-gray-400">{integration.name.charAt(0)}</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">{integration.name}</h3>
                  <p className="text-xs text-gray-600">{integration.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-br from-primary-600 to-purple-700 text-white text-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold mb-6">
              Ready to optimize your cloud costs?
            </h2>
            <p className="text-xl text-primary-100 mb-8">
              Start your 14-day free trial today. No credit card required.
            </p>
            <a
              href="/#signup"
              className="inline-block px-8 py-4 bg-white text-primary-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Start Free Trial
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
