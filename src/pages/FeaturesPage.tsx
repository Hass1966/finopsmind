import { Link } from 'react-router-dom';
import {
  BarChart3, Bot, Shield, Zap, AlertTriangle, Gauge, Cpu, GitPullRequest,
  FileText, Eye, CheckCircle, ArrowRight, ChevronRight, Settings,
  PoundSterling, Lock, Tag, MapPin,
  Globe, FileCode, Server, Activity,
} from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';

function FeatureSection({
  badge, badgeColor, title, description, features, children, reversed,
}: {
  badge: string; badgeColor: string; title: string; description: string;
  features: string[]; children: React.ReactNode; reversed?: boolean;
}) {
  return (
    <div className={`grid lg:grid-cols-2 gap-12 items-center ${reversed ? 'direction-rtl' : ''}`}>
      <div className={reversed ? 'lg:order-2' : ''}>
        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-4 ${badgeColor}`}>
          {badge}
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">{title}</h2>
        <p className="text-gray-600 mb-6 leading-relaxed">{description}</p>
        <ul className="space-y-3">
          {features.map((f) => (
            <li key={f} className="flex items-start gap-2.5 text-sm text-gray-700">
              <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
              {f}
            </li>
          ))}
        </ul>
      </div>
      <div className={reversed ? 'lg:order-1' : ''}>{children}</div>
    </div>
  );
}

function MiniStat({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="bg-gray-50 rounded-lg p-3">
      <p className="text-xs text-gray-500 mb-1">{label}</p>
      <p className={`text-lg font-bold ${color}`}>{value}</p>
    </div>
  );
}

export default function FeaturesPage() {
  return (
    <div>
      {/* Hero */}
      <section className="hero-gradient relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 relative z-10 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight tracking-tight mb-6">
            Every Feature You Need for<br />
            <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">
              Cloud Cost Intelligence
            </span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-indigo-200 leading-relaxed mb-8">
            From real-time dashboards and AI-powered analysis to automated remediations and governance
            — FinOpsMind is a complete FinOps platform built in Rust.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link
              to="/demo/dashboard"
              className="px-6 py-3 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition-colors text-sm flex items-center gap-2"
            >
              <Eye className="w-4 h-4" /> Explore Live Demo
            </Link>
            <Link
              to="/pricing"
              className="px-6 py-3 bg-white/10 text-white font-medium rounded-lg border border-white/20 hover:bg-white/20 transition-colors text-sm"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>

      {/* Quick feature grid */}
      <section className="py-16 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {[
              { icon: BarChart3, label: 'Dashboard', color: 'text-blue-600 bg-blue-50' },
              { icon: Bot, label: 'AI Agents', color: 'text-violet-600 bg-violet-50' },
              { icon: Shield, label: '56+ Rules', color: 'text-emerald-600 bg-emerald-50' },
              { icon: Zap, label: 'Auto-Execute', color: 'text-amber-600 bg-amber-50' },
              { icon: AlertTriangle, label: 'Anomalies', color: 'text-red-600 bg-red-50' },
              { icon: Gauge, label: 'Forecasting', color: 'text-indigo-600 bg-indigo-50' },
              { icon: Lock, label: 'Governance', color: 'text-gray-600 bg-gray-100' },
              { icon: FileText, label: 'Reports', color: 'text-sky-600 bg-sky-50' },
            ].map((item) => (
              <div key={item.label} className={`flex flex-col items-center gap-2 py-3 px-2 rounded-xl ${item.color} text-center`}>
                <item.icon className="w-5 h-5" />
                <span className="text-xs font-medium">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 1. MULTI-CLOUD DASHBOARD ── */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <FeatureSection
              badge="MULTI-CLOUD DASHBOARD"
              badgeColor="bg-blue-100 text-blue-700"
              title="Unified Cost Visibility Across All Clouds"
              description="See your entire cloud estate in a single pane of glass. Real-time cost breakdowns across AWS, Azure, and GCP with trend analysis, provider comparisons, and AI/GPU spend tracking."
              features={[
                'Real-time cost aggregation across AWS, Azure, and GCP',
                'Daily and monthly cost trends with period-over-period comparison',
                'Cost breakdown by provider, service, region, and account',
                'AI/GPU workload cost tracking and optimisation',
                'Top spending services and accounts identification',
                'Interactive charts powered by Recharts',
              ]}
            >
              <div className="bg-white rounded-2xl border border-gray-200 shadow-xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-semibold text-gray-900 text-sm">Cost Overview</span>
                  <span className="text-xs text-gray-400">Last 30 days</span>
                </div>
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <MiniStat label="AWS" value="£28,450" color="text-orange-600" />
                  <MiniStat label="Azure" value="£12,320" color="text-blue-600" />
                  <MiniStat label="GCP" value="£6,612" color="text-red-600" />
                </div>
                <div className="h-32 flex items-end gap-0.5">
                  {[35, 38, 42, 40, 45, 48, 52, 50, 55, 48, 44, 46, 50, 53, 48, 45, 42, 40, 38, 42, 40, 38, 36, 34, 38, 36, 34, 32, 30, 32].map(
                    (h, i) => (
                      <div key={i} className="flex-1 rounded-t transition-all" style={{ height: `${h}%` }}>
                        <div className="w-full h-full rounded-t bg-gradient-to-t from-blue-500/60 to-blue-400/80" />
                      </div>
                    ),
                  )}
                </div>
                <div className="flex justify-between text-[9px] text-gray-400 mt-1 px-1">
                  <span>Apr 21</span><span>May 21</span>
                </div>
              </div>
            </FeatureSection>
          </AnimatedSection>
        </div>
      </section>

      {/* ── 2. AI AGENT ANALYSIS ── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <FeatureSection
              badge="AI AGENT ANALYSIS"
              badgeColor="bg-violet-100 text-violet-700"
              title="Ask Questions, Get Answers — Powered by Specialist Agents"
              description="Natural language queries are routed to the right specialist agent. Each agent has access to pattern-aware tools that see actual resource data — CPU utilisation, network traffic, storage patterns — not just summaries."
              features={[
                '4 specialist agents: Cost Analyst, Security, Architecture, License',
                'Intelligent query routing based on intent classification',
                'Real-time SSE streaming with reasoning traces',
                'Parallel tool execution for complex analyses',
                'Multi-turn conversations with persistent memory',
                'RAG-powered learning from past decisions via Qdrant',
                'Confidence scores and source citations',
              ]}
              reversed
            >
              <div className="bg-white rounded-2xl border border-gray-200 shadow-xl p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Bot className="w-5 h-5 text-violet-600" />
                  <span className="font-semibold text-gray-900 text-sm">Agent Analysis</span>
                </div>
                {/* Mock chat */}
                <div className="space-y-3">
                  <div className="bg-gray-50 rounded-lg p-3 text-sm text-gray-700">
                    Which EC2 instances are wasting the most money?
                  </div>
                  <div className="bg-violet-50 rounded-lg p-3 text-sm text-gray-700 border border-violet-100">
                    <div className="flex items-center gap-2 mb-2">
                      <PoundSterling className="w-3.5 h-3.5 text-violet-600" />
                      <span className="text-xs font-semibold text-violet-600">Cost Analyst</span>
                      <span className="text-[10px] px-1.5 py-0.5 bg-emerald-100 text-emerald-700 rounded-full">95% confidence</span>
                    </div>
                    <p className="text-xs leading-relaxed">
                      I found <strong>3 idle GPU instances</strong> in eu-west-1 costing £2,720/mo total.
                      All p3.2xlarge with &lt;2% CPU over 14 days. Recommended action: terminate or downsize to t3.medium.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {['Cost', 'Security', 'Architecture', 'License'].map((agent) => (
                      <span key={agent} className="text-[10px] px-2 py-1 bg-gray-100 rounded-full text-gray-500 font-medium">
                        {agent}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </FeatureSection>
          </AnimatedSection>
        </div>
      </section>

      {/* ── 3. DETECTION RULES ── */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <FeatureSection
              badge="56+ DETECTION RULES"
              badgeColor="bg-emerald-100 text-emerald-700"
              title="Built-In Rules + Custom YAML — Your Thresholds, Your Way"
              description="Start with 56 curated rules for common waste patterns across AWS, Azure, and GCP. Override thresholds to match your environment, or write unlimited custom rules in YAML."
              features={[
                '56 built-in rules: idle EC2, oversized RDS, unused EBS, old snapshots, and more',
                '15 condition operators (equals, greater_than, starts_with, regex, etc.)',
                '60+ resource fields available for rule conditions',
                'Overridable thresholds per organisation — tune rules to your workloads',
                'Custom YAML rules with live-data testing before activation',
                'Severity classification: critical, high, medium, low',
                'Savings estimation formulas per rule',
              ]}
            >
              <div className="bg-white rounded-2xl border border-gray-200 shadow-xl overflow-hidden">
                <div className="bg-gray-900 p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <FileCode className="w-4 h-4 text-gray-400" />
                    <span className="text-xs text-gray-400 font-mono">custom-rule.yaml</span>
                  </div>
                  <pre className="text-xs font-mono text-gray-300 leading-relaxed">
{`name: Idle GPU Instances
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
                </div>
                <div className="p-4 border-t border-gray-100">
                  <p className="text-xs text-gray-500 mb-3">Sample built-in rules</p>
                  <div className="grid grid-cols-2 gap-1.5">
                    {[
                      'Idle EC2 (CPU < 5%)', 'Oversized RDS', 'Unattached EBS', 'Old Snapshots (90d+)',
                      'Graviton Migration', 'Lambda Memory', 'NAT Gateway', 'Idle Load Balancers',
                    ].map((rule) => (
                      <div key={rule} className="flex items-center gap-1.5 text-[11px] text-gray-600">
                        <ChevronRight className="w-3 h-3 text-gray-300" /> {rule}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </FeatureSection>
          </AnimatedSection>
        </div>
      </section>

      {/* ── 4. AUTO-EXECUTION ENGINE ── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <FeatureSection
              badge="AUTO-EXECUTION ENGINE"
              badgeColor="bg-amber-100 text-amber-700"
              title="Automated Remediations with Configurable Guardrails"
              description="Define approval ceilings per organisation. Low-risk recommendations execute automatically via your preferred channel — AWS API, Terraform GitHub PRs, or ServiceNow tickets."
              features={[
                '3 execution modes: direct AWS API, GitHub PR (Terraform), ServiceNow ticket',
                'Configurable max savings threshold (e.g. auto-approve under £500)',
                'Risk score ceiling (0-100 scale) for automatic approval',
                'Category allow-lists: idle resources, rightsizing, unused volumes, etc.',
                'Environment exclusions to protect production workloads',
                'Daily execution limits to control blast radius',
                'Full audit trail with rollback capability',
              ]}
              reversed
            >
              <div className="bg-white rounded-2xl border border-gray-200 shadow-xl p-5">
                <div className="flex items-center gap-2 mb-5">
                  <Settings className="w-5 h-5 text-gray-400" />
                  <span className="font-semibold text-gray-900 text-sm">Auto-Execution Config</span>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Enable Auto-Execution</span>
                    <div className="w-10 h-6 bg-amber-500 rounded-full relative">
                      <div className="absolute right-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Max Savings</span>
                      <span className="font-mono font-semibold text-gray-900">£500</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-primary-500 rounded-full" style={{ width: '50%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Max Risk</span>
                      <span className="font-mono font-semibold text-gray-900">40 / 100</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-500 rounded-full" style={{ width: '40%' }} />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { label: 'AWS API', icon: Cpu, active: true },
                      { label: 'GitHub PR', icon: GitPullRequest, active: false },
                      { label: 'ServiceNow', icon: FileText, active: false },
                    ].map((m) => (
                      <div key={m.label} className={`flex flex-col items-center gap-1 py-2 rounded-lg border text-xs font-medium ${
                        m.active ? 'border-primary-300 bg-primary-50 text-primary-700' : 'border-gray-200 text-gray-500'
                      }`}>
                        <m.icon className="w-4 h-4" /> {m.label}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </FeatureSection>
          </AnimatedSection>
        </div>
      </section>

      {/* ── 5. ANOMALY DETECTION ── */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <FeatureSection
              badge="ANOMALY DETECTION"
              badgeColor="bg-red-100 text-red-700"
              title="Catch Cost Spikes Before They Become Expensive"
              description="Statistical anomaly detection runs continuously across all services and regions. When a spike occurs, LLM-powered root cause analysis explains exactly what happened and what to do."
              features={[
                'Statistical detection using standard deviation and moving averages',
                'LLM-powered root cause analysis for every anomaly',
                'Severity classification: critical, high, medium, low',
                'Service-level and region-level granularity',
                'Real-time Slack and email alerts',
                'Historical anomaly timeline for pattern recognition',
                'One-click remediation from anomaly detail view',
              ]}
            >
              <div className="bg-white rounded-2xl border border-gray-200 shadow-xl p-5 space-y-3">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                  <span className="font-semibold text-gray-900 text-sm">Active Anomalies</span>
                </div>
                {[
                  { service: 'EC2', region: 'eu-west-1', change: '+129%', severity: 'Critical', color: 'bg-red-50 border-red-200 text-red-700' },
                  { service: 'RDS', region: 'us-east-1', change: '+67%', severity: 'High', color: 'bg-amber-50 border-amber-200 text-amber-700' },
                  { service: 'S3', region: 'ap-south-1', change: '+34%', severity: 'Medium', color: 'bg-yellow-50 border-yellow-200 text-yellow-700' },
                ].map((a) => (
                  <div key={a.service} className={`rounded-lg border p-3 ${a.color}`}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-semibold">{a.service} &middot; {a.region}</span>
                      <span className="text-xs font-bold">{a.change}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs opacity-70">Cost spike detected</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/60 font-medium">{a.severity}</span>
                    </div>
                  </div>
                ))}
              </div>
            </FeatureSection>
          </AnimatedSection>
        </div>
      </section>

      {/* ── 6. FORECASTING & BUDGETS ── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <FeatureSection
              badge="FORECASTING & BUDGETS"
              badgeColor="bg-indigo-100 text-indigo-700"
              title="Predict Costs and Stay Within Budget"
              description="30-day cost forecasts with confidence bounds help you plan ahead. Budget tracking with utilisation alerts ensures teams stay accountable and surprises don't happen."
              features={[
                '30-day rolling cost forecasts per service and account',
                'Confidence intervals (P10, P50, P90) for range estimation',
                'Annual projection extrapolation',
                'Budget creation with configurable alert thresholds (70%, 85%, 95%)',
                'Per-team and per-service budget tracking',
                'Automatic alerts when budgets approach or exceed limits',
                'Forecast vs. budget comparison view',
              ]}
              reversed
            >
              <div className="bg-white rounded-2xl border border-gray-200 shadow-xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-semibold text-gray-900 text-sm">30-Day Forecast</span>
                  <span className="text-xs text-emerald-600 font-medium">On track</span>
                </div>
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <MiniStat label="Projected" value="£51,200" color="text-gray-900" />
                  <MiniStat label="Budget" value="£55,000" color="text-indigo-600" />
                  <MiniStat label="Utilisation" value="93%" color="text-amber-600" />
                </div>
                <div className="space-y-2">
                  {[
                    { team: 'Platform', used: 78, budget: '£18,000' },
                    { team: 'Data Eng', used: 92, budget: '£22,000' },
                    { team: 'ML/AI', used: 65, budget: '£15,000' },
                  ].map((t) => (
                    <div key={t.team}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-600">{t.team}</span>
                        <span className="text-gray-500">{t.used}% of {t.budget}</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${t.used > 90 ? 'bg-amber-500' : 'bg-primary-500'}`}
                          style={{ width: `${t.used}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FeatureSection>
          </AnimatedSection>
        </div>
      </section>

      {/* ── 7. GOVERNANCE & POLICIES ── */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-semibold mb-4">
                <Lock className="w-3.5 h-3.5" /> GOVERNANCE & POLICIES
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Governance That Doesn't Slow You Down</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Enforce cost limits, tagging standards, region restrictions, and resource type controls across your
                entire cloud estate — with real-time violation tracking and auto-approval rules.
              </p>
            </div>
          </AnimatedSection>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: PoundSterling, title: 'Cost Limit Policies', desc: 'Audit or enforce cost ceilings per service, account, or tag group. Violations trigger alerts or block provisioning.', color: 'bg-emerald-50 text-emerald-600' },
              { icon: Tag, title: 'Tagging Compliance', desc: 'Enforce required tags (team, environment, cost-centre) and detect untagged resources automatically.', color: 'bg-blue-50 text-blue-600' },
              { icon: MapPin, title: 'Region Restrictions', desc: 'Prevent resource deployment outside approved regions. Data sovereignty and cost control in one policy.', color: 'bg-violet-50 text-violet-600' },
              { icon: Server, title: 'Resource Type Governance', desc: 'Control which instance types and services teams can provision. Block expensive GPU instances outside ML teams.', color: 'bg-amber-50 text-amber-600' },
              { icon: Activity, title: 'Violation Tracking', desc: 'Real-time violation detection with severity-based alerting. Full audit log of every policy check.', color: 'bg-red-50 text-red-600' },
              { icon: CheckCircle, title: 'Auto-Approval Rules', desc: 'Automatically approve low-risk remediations based on configurable savings and risk thresholds.', color: 'bg-gray-50 text-gray-600' },
            ].map((item) => (
              <AnimatedSection key={item.title}>
                <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all h-full">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${item.color}`}>
                    <item.icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. REPORTING & ALLOCATIONS ── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <FeatureSection
              badge="REPORTING & ALLOCATIONS"
              badgeColor="bg-sky-100 text-sky-700"
              title="Executive Reports and Cost Allocation in Seconds"
              description="Generate board-ready reports with KPIs, carbon footprint data, and cost allocation breakdowns. Export to CSV or JSON for your finance team."
              features={[
                'Executive summary with KPIs: total cost, MoM change, savings realised',
                'Carbon footprint reporting: CO2 emissions, energy consumption, regional breakdown',
                'Cost allocation by tags, teams, projects, and environments',
                'Untagged resource detection and allocation suggestions',
                'Period-over-period cost comparison',
                'CSV and JSON export for finance and audit',
                'Scheduled report delivery via email',
              ]}
              reversed
            >
              <div className="bg-white rounded-2xl border border-gray-200 shadow-xl p-5">
                <h3 className="font-semibold text-gray-900 text-sm mb-4">Executive Summary — May 2026</h3>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <MiniStat label="Total Cost" value="£47,382" color="text-gray-900" />
                  <MiniStat label="Savings" value="£12,450" color="text-emerald-600" />
                  <MiniStat label="Anomalies" value="3" color="text-amber-600" />
                  <MiniStat label="Carbon" value="2.4 tCO2e" color="text-green-600" />
                </div>
                <div className="space-y-2">
                  <p className="text-xs text-gray-500 font-medium">Cost by Team</p>
                  {[
                    { team: 'Platform', pct: 38, color: 'bg-blue-500' },
                    { team: 'Data Engineering', pct: 28, color: 'bg-violet-500' },
                    { team: 'ML/AI', pct: 22, color: 'bg-amber-500' },
                    { team: 'Other', pct: 12, color: 'bg-gray-400' },
                  ].map((t) => (
                    <div key={t.team} className="flex items-center gap-3">
                      <span className="text-xs text-gray-600 w-28">{t.team}</span>
                      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${t.color}`} style={{ width: `${t.pct}%` }} />
                      </div>
                      <span className="text-xs text-gray-500 w-8">{t.pct}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </FeatureSection>
          </AnimatedSection>
        </div>
      </section>

      {/* ── 9. INTEGRATIONS ── */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-semibold mb-4">
                <Globe className="w-3.5 h-3.5" /> INTEGRATIONS
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Connects to Your Entire Stack</h2>
              <p className="text-gray-600 max-w-xl mx-auto">
                First-class integrations with the tools your team already uses.
              </p>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'AWS', desc: 'EC2, RDS, S3, Lambda, ECS, EKS, CloudWatch, Cost Explorer', color: 'bg-orange-50 border-orange-200' },
              { name: 'Azure', desc: 'VMs, Managed Disks, Advisor, Cost Management API', color: 'bg-blue-50 border-blue-200' },
              { name: 'GCP', desc: 'Compute Engine, BigQuery, Cloud Billing API', color: 'bg-red-50 border-red-200' },
              { name: 'GitHub', desc: 'Terraform PR automation for IaC remediations', color: 'bg-gray-50 border-gray-200' },
              { name: 'ServiceNow', desc: 'Automated incident and change request tickets', color: 'bg-green-50 border-green-200' },
              { name: 'Slack', desc: 'Real-time alerts, approvals, and daily digests', color: 'bg-purple-50 border-purple-200' },
              { name: 'Qdrant', desc: 'Vector search for RAG-powered AI learning', color: 'bg-indigo-50 border-indigo-200' },
              { name: 'Terraform', desc: 'HCL code generation for infrastructure changes', color: 'bg-violet-50 border-violet-200' },
            ].map((integration) => (
              <AnimatedSection key={integration.name}>
                <div className={`rounded-xl border p-5 text-center hover:shadow-md transition-all ${integration.color} h-full`}>
                  <p className="font-bold text-gray-900 mb-1">{integration.name}</p>
                  <p className="text-xs text-gray-600 leading-relaxed">{integration.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 hero-gradient">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to See It in Action?
          </h2>
          <p className="text-indigo-200 mb-8">Explore the interactive demo or start your free trial today.</p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link
              to="/demo/dashboard"
              className="px-6 py-3 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition-colors text-sm flex items-center gap-2"
            >
              <Eye className="w-4 h-4" /> Explore Live Demo
            </Link>
            <Link
              to="/pricing"
              className="px-6 py-3 bg-white/10 text-white font-medium rounded-lg border border-white/20 hover:bg-white/20 transition-colors text-sm flex items-center gap-2"
            >
              View Pricing <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
