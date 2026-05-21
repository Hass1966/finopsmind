import { Link } from 'react-router-dom';
import {
  Zap, BarChart3, Bot, Shield, Cpu, AlertTriangle, TrendingDown,
  GitPullRequest, Settings, Clock, FileCode, Layers, PoundSterling,
  Database, CheckCircle, ArrowRight, ChevronRight, Eye,
  FileText, Gauge, Target, Lock, Tag, MapPin, Leaf,
} from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';

// ── Mini dashboard mockup for hero ──
function HeroDashboardMockup() {
  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Main card */}
      <div className="bg-gray-900/90 rounded-2xl border border-gray-700/50 shadow-2xl p-5 backdrop-blur">
        {/* Top stats row */}
        <div className="grid grid-cols-4 gap-3 mb-4">
          {[
            { label: 'Total Cost', value: '£47,382', change: '-8.3%', color: 'text-blue-400' },
            { label: 'Anomalies', value: '3', change: '', color: 'text-amber-400' },
            { label: 'Savings', value: '£12,450', change: '', color: 'text-emerald-400' },
            { label: 'Budget', value: '73%', change: '', color: 'text-violet-400' },
          ].map((stat) => (
            <div key={stat.label} className="bg-gray-800/60 rounded-lg p-2.5">
              <p className="text-[10px] text-gray-500 mb-0.5">{stat.label}</p>
              <p className={`text-sm font-bold ${stat.color}`}>{stat.value}</p>
              {stat.change && (
                <span className="text-[10px] text-emerald-400">{stat.change}</span>
              )}
            </div>
          ))}
        </div>
        {/* Faux chart */}
        <div className="h-24 flex items-end gap-0.5 px-2">
          {[40, 45, 38, 52, 48, 55, 42, 60, 58, 45, 50, 44, 48, 52, 56, 42, 38, 44, 40, 36, 42, 38, 34, 38, 35, 32, 30, 34, 32, 28].map(
            (h, i) => (
              <div
                key={i}
                className="flex-1 rounded-t bg-gradient-to-t from-blue-600/60 to-blue-400/80 transition-all"
                style={{ height: `${h}%` }}
              />
            ),
          )}
        </div>
        <div className="flex justify-between text-[9px] text-gray-600 mt-1 px-2">
          <span>Apr 21</span>
          <span>May 21</span>
        </div>
      </div>

      {/* Floating anomaly card */}
      <div className="absolute -right-4 top-8 glass rounded-xl p-3 animate-float shadow-lg w-52">
        <div className="flex items-center gap-2 mb-1.5">
          <div className="w-5 h-5 bg-red-500/20 rounded-full flex items-center justify-center">
            <AlertTriangle className="w-3 h-3 text-red-400" />
          </div>
          <span className="text-[10px] font-semibold text-red-400">CRITICAL ANOMALY</span>
        </div>
        <p className="text-[11px] text-gray-300">EC2 spike +129% in eu-west-1</p>
        <p className="text-[10px] text-gray-500 mt-0.5">3 idle GPU instances detected</p>
      </div>

      {/* Floating savings card */}
      <div className="absolute -left-4 bottom-4 glass rounded-xl p-3 animate-float-delayed shadow-lg w-48">
        <div className="flex items-center gap-2 mb-1.5">
          <div className="w-5 h-5 bg-emerald-500/20 rounded-full flex items-center justify-center">
            <TrendingDown className="w-3 h-3 text-emerald-400" />
          </div>
          <span className="text-[10px] font-semibold text-emerald-400">AUTO-SAVED</span>
        </div>
        <p className="text-lg font-bold text-emerald-300">£2,720<span className="text-xs font-normal text-gray-500">/mo</span></p>
        <p className="text-[10px] text-gray-500">3 idle instances terminated</p>
      </div>
    </div>
  );
}

// ── Feature card ──
function FeatureCard({ icon: Icon, iconBg, title, description }: {
  icon: React.ElementType; iconBg: string; title: string; description: string;
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg hover:border-gray-300 transition-all group">
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${iconBg}`}>
        <Icon className="w-5 h-5 text-white" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary-700 transition-colors">{title}</h3>
      <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
}

// ── Agent card ──
function AgentCard({ icon: Icon, name, color, description, features }: {
  icon: React.ElementType; name: string; color: string; description: string; features: string[];
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all">
      <div className="flex items-center gap-3 mb-3">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${color}`}>
          <Icon className="w-5 h-5" />
        </div>
        <h3 className="font-semibold text-gray-900">{name}</h3>
      </div>
      <p className="text-sm text-gray-600 mb-3">{description}</p>
      <ul className="space-y-1.5">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-xs text-gray-500">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
            {f}
          </li>
        ))}
      </ul>
    </div>
  );
}

// ── Pricing card ──
function PricingCard({ name, price, period, description, features, highlighted }: {
  name: string; price: string; period: string; description: string; features: string[]; highlighted?: boolean;
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
        {name === 'Enterprise' ? 'Contact Sales' : 'Start Free Trial'}
      </button>
    </div>
  );
}

// ── Stat counter ──
function StatBadge({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <p className="text-3xl md:text-4xl font-bold text-white">{value}</p>
      <p className="text-sm text-indigo-200 mt-1">{label}</p>
    </div>
  );
}

// ═══════════════════════════════════════════════════
//  LANDING PAGE
// ═══════════════════════════════════════════════════
export default function LandingPage() {
  return (
    <div>
      {/* ── HERO ── */}
      <section className="hero-gradient relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-28 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/10 text-indigo-200 text-sm mb-6">
              <Zap className="w-4 h-4" />
              Powered by Claude AI &mdash; Built in Rust
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight mb-6">
              AI-Powered Cloud Cost<br />
              <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">
                Intelligence
              </span>
            </h1>
            <p className="max-w-2xl mx-auto text-lg text-indigo-200 leading-relaxed mb-10">
              FinOpsMind analyses your AWS, Azure, and GCP infrastructure in real-time &mdash; finding waste,
              predicting costs, and auto-remediating issues before they drain your budget.
            </p>
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

          <HeroDashboardMockup />
        </div>

        {/* Stats bar */}
        <div className="relative z-10 border-t border-white/10 bg-white/5 backdrop-blur-sm">
          <div className="max-w-5xl mx-auto px-4 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
            <StatBadge value="56+" label="Detection Rules" />
            <StatBadge value="3" label="Cloud Providers" />
            <StatBadge value="4" label="AI Specialist Agents" />
            <StatBadge value="60+" label="API Endpoints" />
          </div>
        </div>
      </section>

      {/* ── PROBLEM STATEMENT ── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">The Cloud Cost Problem</h2>
              <p className="text-gray-600 max-w-xl mx-auto">Every organisation faces the same challenges at scale.</p>
            </div>
          </AnimatedSection>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: TrendingDown,
                color: 'bg-red-100 text-red-600',
                title: 'Wasted Cloud Spend',
                stat: '32%',
                desc: 'The average company wastes 32% of its cloud budget on idle, oversized, or forgotten resources.',
              },
              {
                icon: Clock,
                color: 'bg-amber-100 text-amber-600',
                title: "Manual Optimisation Doesn't Scale",
                stat: '15+ hrs',
                desc: 'Engineers spend 15+ hours per week on cost reviews that could be automated.',
              },
              {
                icon: Eye,
                color: 'bg-blue-100 text-blue-600',
                title: 'No Visibility Across Clouds',
                stat: '3x',
                desc: 'Multi-cloud environments create blind spots that single-provider tools miss.',
              },
            ].map((item) => (
              <AnimatedSection key={item.title}>
                <div className="bg-white rounded-xl border border-gray-200 p-6 text-center hover:shadow-md transition-shadow h-full">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 ${item.color}`}>
                    <item.icon className="w-6 h-6" />
                  </div>
                  <p className="text-3xl font-bold text-gray-900 mb-2">{item.stat}</p>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURE HIGHLIGHTS ── */}
      <section id="features" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-14">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Everything You Need for Cloud FinOps</h2>
              <p className="text-gray-600 max-w-xl mx-auto">
                From detection to remediation — one platform for multi-cloud cost intelligence.
              </p>
            </div>
          </AnimatedSection>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatedSection>
              <FeatureCard
                icon={BarChart3}
                iconBg="bg-blue-600"
                title="Multi-Cloud Dashboard"
                description="Unified view of AWS, Azure, and GCP costs with trend charts, provider breakdowns, and AI/GPU spend tracking."
              />
            </AnimatedSection>
            <AnimatedSection>
              <FeatureCard
                icon={Bot}
                iconBg="bg-violet-600"
                title="AI Agent Analysis"
                description="Natural language queries processed by specialist AI agents with streaming reasoning traces and confidence scores."
              />
            </AnimatedSection>
            <AnimatedSection>
              <FeatureCard
                icon={Shield}
                iconBg="bg-emerald-600"
                title="56+ Detection Rules"
                description="Built-in rules for idle EC2, oversized RDS, unused EBS, Graviton migration, Lambda memory, NAT gateway, and more."
              />
            </AnimatedSection>
            <AnimatedSection>
              <FeatureCard
                icon={Zap}
                iconBg="bg-amber-500"
                title="Automated Remediations"
                description="3-mode execution engine: direct AWS API actions, Terraform GitHub PRs, or ServiceNow incident tickets."
              />
            </AnimatedSection>
            <AnimatedSection>
              <FeatureCard
                icon={AlertTriangle}
                iconBg="bg-red-500"
                title="Anomaly Detection"
                description="Statistical anomaly detection with LLM root cause analysis, severity classification, and real-time alerts."
              />
            </AnimatedSection>
            <AnimatedSection>
              <FeatureCard
                icon={Gauge}
                iconBg="bg-indigo-600"
                title="Forecasting & Budgets"
                description="30-day cost forecasts with confidence bounds, budget tracking with utilisation alerts, and annual projections."
              />
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── AUTO-EXECUTION ENGINE ── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-semibold mb-4">
                  <Zap className="w-3.5 h-3.5" /> AUTO-EXECUTION ENGINE
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Set It and Forget It &mdash; Configurable Auto-Execution
                </h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Define approval ceilings per organisation. Recommendations below your risk and savings
                  thresholds execute automatically &mdash; via AWS API, GitHub PR, or ServiceNow ticket.
                </p>
                <ul className="space-y-3">
                  {[
                    'Configurable max savings threshold (default £500)',
                    'Configurable max risk score (0-100 scale)',
                    'Category allow-lists (idle resources, rightsizing, etc.)',
                    'Environment exclusions (protect production)',
                    'Daily execution limits',
                    '3 execution modes: AWS API, GitHub PR, ServiceNow',
                    'Full audit trail and rollback capability',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Settings mockup */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-xl p-6">
                <div className="flex items-center gap-2 mb-5">
                  <Settings className="w-5 h-5 text-gray-400" />
                  <span className="font-semibold text-gray-900">Auto-Execution Configuration</span>
                </div>
                <div className="space-y-4">
                  {/* Toggle */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Enable Auto-Execution</span>
                    <div className="w-10 h-6 bg-amber-500 rounded-full relative">
                      <div className="absolute right-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow" />
                    </div>
                  </div>
                  {/* Savings slider */}
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Max Savings Threshold</span>
                      <span className="font-mono font-semibold text-gray-900">£500</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-primary-500 rounded-full" style={{ width: '50%' }} />
                    </div>
                  </div>
                  {/* Risk slider */}
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Max Risk Score</span>
                      <span className="font-mono font-semibold text-gray-900">40 / 100</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-500 rounded-full" style={{ width: '40%' }} />
                    </div>
                  </div>
                  {/* Categories */}
                  <div>
                    <span className="text-sm text-gray-600 block mb-2">Allowed Categories</span>
                    <div className="flex flex-wrap gap-2">
                      {['Idle Resources', 'Rightsizing', 'Unused EBS', 'Unused EIP'].map((c) => (
                        <span key={c} className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-medium">
                          <CheckCircle className="w-3 h-3" /> {c}
                        </span>
                      ))}
                    </div>
                  </div>
                  {/* Execution mode */}
                  <div>
                    <span className="text-sm text-gray-600 block mb-2">Execution Mode</span>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { label: 'AWS API', icon: Cpu, active: true },
                        { label: 'GitHub PR', icon: GitPullRequest, active: false },
                        { label: 'ServiceNow', icon: FileText, active: false },
                      ].map((m) => (
                        <div
                          key={m.label}
                          className={`flex flex-col items-center gap-1 py-2.5 rounded-lg border text-xs font-medium ${
                            m.active
                              ? 'border-primary-300 bg-primary-50 text-primary-700'
                              : 'border-gray-200 text-gray-500'
                          }`}
                        >
                          <m.icon className="w-4 h-4" />
                          {m.label}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── AI AGENTS ── */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-100 text-violet-700 text-xs font-semibold mb-4">
                <Bot className="w-3.5 h-3.5" /> SPECIALIST AI AGENTS
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                AI Agents That Think Like Your Best Engineers
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Each agent has access to pattern-aware tools that see actual resource data &mdash; CPU utilisation,
                network traffic, storage patterns &mdash; not just recommendation summaries.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <AnimatedSection>
              <AgentCard
                icon={PoundSterling}
                name="Cost Analyst"
                color="bg-emerald-100 text-emerald-700"
                description="Analyses spending patterns, identifies waste, and recommends rightsizing with savings estimates."
                features={['Spend pattern analysis', 'Rightsizing recommendations', 'GBP savings estimates']}
              />
            </AnimatedSection>
            <AnimatedSection>
              <AgentCard
                icon={Shield}
                name="Security Agent"
                color="bg-rose-100 text-rose-700"
                description="Reviews public access, encryption gaps, and compliance risks across your infrastructure."
                features={['Public access detection', 'Encryption audit', 'Compliance scanning']}
              />
            </AnimatedSection>
            <AnimatedSection>
              <AgentCard
                icon={Layers}
                name="Architecture Agent"
                color="bg-violet-100 text-violet-700"
                description="Evaluates multi-AZ deployments, service coupling, and modernisation opportunities."
                features={['Multi-AZ analysis', 'Service coupling review', 'Modernisation paths']}
              />
            </AnimatedSection>
            <AnimatedSection>
              <AgentCard
                icon={FileText}
                name="License Agent"
                color="bg-sky-100 text-sky-700"
                description="Detects Windows-to-Linux migration savings, BYOL opportunities, and licence optimisation."
                features={['Windows → Linux savings', 'BYOL opportunities', 'SQL licence analysis']}
              />
            </AnimatedSection>
          </div>

          <AnimatedSection>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { icon: Database, text: 'Multi-turn conversations with memory — ask follow-up questions' },
                { icon: Zap, text: 'Parallel tool execution with real-time SSE streaming progress' },
                { icon: Target, text: 'RAG-powered learning from past decisions stored in Qdrant' },
              ].map((f) => (
                <div key={f.text} className="flex items-start gap-3 bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <f.icon className="w-5 h-5 text-primary-600 mt-0.5 shrink-0" />
                  <span className="text-sm text-gray-700">{f.text}</span>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── RULES ENGINE ── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-14">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Rules, Your Thresholds</h2>
              <p className="text-gray-600 max-w-xl mx-auto">
                56 built-in detection rules plus unlimited custom YAML rules — all with overridable thresholds.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid lg:grid-cols-2 gap-8">
            <AnimatedSection>
              <div className="bg-white rounded-xl border border-gray-200 p-6 h-full">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary-600" /> 56 Built-In Rules
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    'Idle EC2 (CPU < 5%)',
                    'Oversized RDS',
                    'Unattached EBS Volumes',
                    'Old EBS Snapshots',
                    'Graviton Migration',
                    'Lambda Memory Tuning',
                    'NAT Gateway Optimisation',
                    'Reserved Instance Gaps',
                    'Savings Plan Coverage',
                    'Cross-Region Replication',
                    'Idle Load Balancers',
                    'EKS Node Rightsizing',
                  ].map((rule) => (
                    <div key={rule} className="flex items-center gap-2 text-xs text-gray-600 py-1.5">
                      <ChevronRight className="w-3 h-3 text-gray-400" />
                      {rule}
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-400 mt-3">+ 44 more rules across AWS, Azure, and GCP</p>
              </div>
            </AnimatedSection>

            <AnimatedSection>
              <div className="bg-white rounded-xl border border-gray-200 p-6 h-full">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <FileCode className="w-5 h-5 text-amber-600" /> Custom YAML Rules
                </h3>
                <pre className="bg-gray-900 text-gray-300 rounded-lg p-4 text-xs font-mono leading-relaxed overflow-x-auto">
{`# Detect idle GPU instances costing >£500/mo
name: Idle GPU Instances
cloud_provider: aws
resource_type: EC2 Instance
severity: high

conditions:
  - field: instance_type
    operator: starts_with
    value: "p3"
  - field: cpu_pattern
    operator: equals
    value: "idle"
  - field: monthly_cost_estimate
    operator: greater_than
    value: "500"

savings_formula: monthly_cost * 0.65`}
                </pre>
                <p className="text-xs text-gray-500 mt-3">
                  15 operators &middot; 60+ resource fields &middot; test against live data before activating
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── GOVERNANCE ── */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-14">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Governance That Doesn't Slow You Down</h2>
            </div>
          </AnimatedSection>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Lock, title: 'Cost Limit Policies', desc: 'Audit or enforce cost ceilings per service, account, or tag group.' },
              { icon: Tag, title: 'Tagging Compliance', desc: 'Enforce required tags and detect untagged resources automatically.' },
              { icon: MapPin, title: 'Region Restrictions', desc: 'Prevent resource deployment outside approved regions.' },
              { icon: Gauge, title: 'Resource Type Governance', desc: 'Control which instance types and services teams can provision.' },
              { icon: Eye, title: 'Policy Violation Tracking', desc: 'Real-time violation detection with severity-based alerting.' },
              { icon: CheckCircle, title: 'Auto-Approval Rules', desc: 'Automatically approve low-risk remediations based on configurable thresholds.' },
            ].map((item) => (
              <AnimatedSection key={item.title}>
                <div className="flex items-start gap-4 p-5 rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all">
                  <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
                    <item.icon className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── REPORTING ── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Executive Reports in Seconds</h2>
                <ul className="space-y-3">
                  {[
                    { icon: BarChart3, text: 'Executive summary with KPIs — total cost, MoM change, savings realised' },
                    { icon: Leaf, text: 'Carbon footprint reporting — CO2 emissions, energy consumption, regional breakdown' },
                    { icon: TrendingDown, text: 'Period-over-period cost comparison' },
                    { icon: FileText, text: 'CSV and JSON export' },
                    { icon: Tag, text: 'Cost allocation by tags with untagged resource detection' },
                  ].map((item) => (
                    <li key={item.text} className="flex items-start gap-3 text-sm text-gray-700">
                      <item.icon className="w-5 h-5 text-primary-600 mt-0.5 shrink-0" />
                      {item.text}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Executive Summary — May 2026</h3>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  {[
                    { label: 'Total Cost', value: '£47,382', change: '-8.3%', positive: true },
                    { label: 'Savings Realised', value: '£12,450', change: '+34%', positive: true },
                    { label: 'Active Anomalies', value: '3', change: '-2', positive: true },
                    { label: 'Carbon Footprint', value: '2.4 tCO2e', change: '-12%', positive: true },
                  ].map((kpi) => (
                    <div key={kpi.label} className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs text-gray-500 mb-1">{kpi.label}</p>
                      <p className="text-lg font-bold text-gray-900">{kpi.value}</p>
                      <span className="text-xs text-emerald-600 font-medium">{kpi.change}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── INTEGRATIONS ── */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-14">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Connects to Your Entire Stack</h2>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'AWS', desc: 'EC2, RDS, S3, Lambda, ECS, EKS, CloudWatch, Cost Explorer', color: 'bg-orange-50 border-orange-200' },
              { name: 'Azure', desc: 'VMs, Managed Disks, Advisor, Cost Management', color: 'bg-blue-50 border-blue-200' },
              { name: 'GCP', desc: 'Compute, BigQuery, Cloud Billing', color: 'bg-red-50 border-red-200' },
              { name: 'GitHub', desc: 'Terraform PR automation', color: 'bg-gray-50 border-gray-200' },
              { name: 'ServiceNow', desc: 'Automated incident tickets', color: 'bg-green-50 border-green-200' },
              { name: 'Slack', desc: 'Real-time alerts & approvals', color: 'bg-purple-50 border-purple-200' },
              { name: 'Qdrant', desc: 'Vector search for AI learning', color: 'bg-indigo-50 border-indigo-200' },
              { name: 'Terraform', desc: 'HCL code generation', color: 'bg-violet-50 border-violet-200' },
            ].map((integration) => (
              <AnimatedSection key={integration.name}>
                <div className={`rounded-xl border p-4 text-center hover:shadow-md transition-all ${integration.color}`}>
                  <p className="font-bold text-gray-900 mb-1">{integration.name}</p>
                  <p className="text-xs text-gray-600">{integration.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── TECH STACK ── */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold mb-2">Built for Performance</h2>
              <p className="text-gray-400 text-sm">Enterprise-grade architecture from the ground up.</p>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {[
              { label: 'Backend', value: 'Rust (Axum)', sub: 'High-performance async' },
              { label: 'Frontend', value: 'React 19', sub: 'TypeScript + Tailwind' },
              { label: 'Database', value: 'PostgreSQL 16', sub: '11 migrations' },
              { label: 'AI Engine', value: 'Claude API', sub: 'Anthropic' },
              { label: 'Vector DB', value: 'Qdrant', sub: 'RAG learning' },
              { label: 'Cache', value: 'Redis', sub: 'Sessions + memory' },
              { label: 'Auth', value: 'JWT + OAuth2', sub: 'AES-256-GCM encryption' },
              { label: 'Jobs', value: '8 Schedulers', sub: 'Configurable intervals' },
            ].map((item) => (
              <div key={item.label} className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
                <p className="text-xs text-gray-500 mb-1">{item.label}</p>
                <p className="font-semibold text-white">{item.value}</p>
                <p className="text-xs text-gray-500 mt-0.5">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-14">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h2>
              <p className="text-gray-600">Start free. Scale as you grow.</p>
            </div>
          </AnimatedSection>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <AnimatedSection>
              <PricingCard
                name="Starter"
                price="Free"
                period=""
                description="For teams getting started with cloud cost visibility."
                features={[
                  'Up to $10k monthly cloud spend',
                  '5 built-in detection rules',
                  'Basic dashboard & cost trends',
                  'Single cloud provider',
                  'Email alerts',
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
                features={[
                  'Unlimited cloud spend',
                  'All 56 rules + custom YAML rules',
                  '4 AI specialist agents',
                  'Auto-execution engine',
                  'Multi-cloud (AWS, Azure, GCP)',
                  'Slack + GitHub + ServiceNow',
                  'Anomaly detection + forecasting',
                  'Conversation memory & RAG',
                ]}
              />
            </AnimatedSection>
            <AnimatedSection>
              <PricingCard
                name="Enterprise"
                price="Custom"
                period=""
                description="For organisations with complex multi-cloud estates."
                features={[
                  'Everything in Pro',
                  'SSO / SAML integration',
                  'Dedicated support & SLA',
                  'Custom integrations',
                  'On-premise deployment option',
                  'Advanced audit & compliance',
                ]}
              />
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-20 hero-gradient">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Stop Wasting Cloud Budget.<br />Start Saving Today.
          </h2>
          <p className="text-indigo-200 mb-8">No credit card required. 14-day free trial.</p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <input
              type="email"
              placeholder="you@company.com"
              className="px-5 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-indigo-300 text-sm w-72 focus:outline-none focus:ring-2 focus:ring-white/30"
            />
            <button className="px-6 py-3 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition-colors text-sm">
              Start Free Trial
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
