import { Link } from 'react-router-dom';
import {
  Server, Database, Cpu, Globe, Shield, Zap, Bot, Clock, ArrowRight,
  Eye, CheckCircle, ArrowDown, GitBranch, RefreshCw, Lock, Activity,
} from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';

function TechCard({ icon: Icon, label, value, sub, color }: {
  icon: React.ElementType; label: string; value: string; sub: string; color: string;
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-all">
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${color}`}>
        <Icon className="w-5 h-5" />
      </div>
      <p className="text-xs text-gray-500 mb-0.5">{label}</p>
      <p className="font-semibold text-gray-900">{value}</p>
      <p className="text-xs text-gray-500 mt-0.5">{sub}</p>
    </div>
  );
}

function ArchLayer({ title, color, items }: {
  title: string; color: string; items: { name: string; detail: string }[];
}) {
  return (
    <div className={`rounded-xl border-2 p-5 ${color}`}>
      <h3 className="font-semibold text-sm mb-3">{title}</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {items.map((item) => (
          <div key={item.name} className="bg-white/80 rounded-lg p-2.5 border border-white">
            <p className="text-xs font-semibold text-gray-900">{item.name}</p>
            <p className="text-[10px] text-gray-500">{item.detail}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ArchitecturePage() {
  return (
    <div>
      {/* Hero */}
      <section className="hero-gradient relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 relative z-10 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight tracking-tight mb-6">
            Built for Performance,<br />
            <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">
              Designed for Scale
            </span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-indigo-200 leading-relaxed mb-8">
            A Rust-native backend with async everywhere, PostgreSQL for persistence, Redis for caching,
            Qdrant for AI memory, and Claude for intelligence — all deployed behind a 60+ endpoint REST API.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link
              to="/demo/dashboard"
              className="px-6 py-3 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition-colors text-sm flex items-center gap-2"
            >
              <Eye className="w-4 h-4" /> Explore Live Demo
            </Link>
            <Link
              to="/features"
              className="px-6 py-3 bg-white/10 text-white font-medium rounded-lg border border-white/20 hover:bg-white/20 transition-colors text-sm"
            >
              View Features
            </Link>
          </div>
        </div>
      </section>

      {/* Tech stack cards */}
      <section className="py-16 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <TechCard icon={Server} label="Backend" value="Rust (Axum)" sub="High-performance async runtime" color="bg-orange-50 text-orange-600" />
              <TechCard icon={Globe} label="Frontend" value="React 19 + TS" sub="Tailwind CSS + Recharts" color="bg-blue-50 text-blue-600" />
              <TechCard icon={Database} label="Database" value="PostgreSQL 16" sub="11 schema migrations" color="bg-indigo-50 text-indigo-600" />
              <TechCard icon={Bot} label="AI Engine" value="Claude API" sub="Anthropic tool use" color="bg-violet-50 text-violet-600" />
              <TechCard icon={Cpu} label="Vector DB" value="Qdrant" sub="RAG learning + similarity" color="bg-emerald-50 text-emerald-600" />
              <TechCard icon={Zap} label="Cache" value="Redis" sub="Sessions, memory, rate limits" color="bg-red-50 text-red-600" />
              <TechCard icon={Lock} label="Auth" value="JWT + OAuth2" sub="AES-256-GCM encryption" color="bg-gray-100 text-gray-600" />
              <TechCard icon={Clock} label="Jobs" value="8 Schedulers" sub="Configurable intervals" color="bg-amber-50 text-amber-600" />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Architecture layers */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-14">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">System Architecture</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                A layered architecture separating API, business logic, AI orchestration, and data access
                — each layer independently testable and deployable.
              </p>
            </div>
          </AnimatedSection>

          <div className="space-y-4 max-w-5xl mx-auto">
            <AnimatedSection>
              <ArchLayer
                title="Client Layer"
                color="border-blue-200 bg-blue-50/50"
                items={[
                  { name: 'React SPA', detail: 'TypeScript + Tailwind' },
                  { name: 'REST API Client', detail: 'Fetch + auth headers' },
                  { name: 'SSE Consumer', detail: 'Agent streaming UI' },
                ]}
              />
            </AnimatedSection>

            <AnimatedSection>
              <div className="flex justify-center">
                <ArrowDown className="w-5 h-5 text-gray-300" />
              </div>
            </AnimatedSection>

            <AnimatedSection>
              <ArchLayer
                title="API Gateway — Axum (Rust)"
                color="border-orange-200 bg-orange-50/50"
                items={[
                  { name: '60+ REST Endpoints', detail: 'Typed extractors' },
                  { name: 'JWT Auth Middleware', detail: 'Role-based access' },
                  { name: 'Rate Limiting', detail: 'Redis-backed per-org' },
                  { name: 'SSE Streaming', detail: 'Agent reasoning traces' },
                  { name: 'CORS + Security', detail: 'Helmet-style headers' },
                  { name: 'Request Validation', detail: 'Serde + custom rules' },
                ]}
              />
            </AnimatedSection>

            <AnimatedSection>
              <div className="flex justify-center">
                <ArrowDown className="w-5 h-5 text-gray-300" />
              </div>
            </AnimatedSection>

            <AnimatedSection>
              <ArchLayer
                title="Business Logic Layer"
                color="border-violet-200 bg-violet-50/50"
                items={[
                  { name: 'Detection Engine', detail: '56 rules + custom YAML' },
                  { name: 'Anomaly Detection', detail: 'Stats + LLM analysis' },
                  { name: 'Forecasting', detail: 'Moving avg + confidence' },
                  { name: 'Auto-Execution', detail: '3-mode engine' },
                  { name: 'Policy Engine', detail: 'Governance + compliance' },
                  { name: 'Report Generator', detail: 'Exec + carbon reports' },
                ]}
              />
            </AnimatedSection>

            <AnimatedSection>
              <div className="flex justify-center">
                <ArrowDown className="w-5 h-5 text-gray-300" />
              </div>
            </AnimatedSection>

            <AnimatedSection>
              <ArchLayer
                title="AI Orchestration Layer"
                color="border-emerald-200 bg-emerald-50/50"
                items={[
                  { name: 'Query Router', detail: 'Intent classification' },
                  { name: '4 Specialist Agents', detail: 'Cost, Security, Arch, License' },
                  { name: 'Tool Registry', detail: '12 pattern-aware tools' },
                  { name: 'Conversation Memory', detail: 'Redis + PostgreSQL' },
                  { name: 'RAG Pipeline', detail: 'Qdrant similarity search' },
                  { name: 'Claude API Client', detail: 'Streaming tool use' },
                ]}
              />
            </AnimatedSection>

            <AnimatedSection>
              <div className="flex justify-center">
                <ArrowDown className="w-5 h-5 text-gray-300" />
              </div>
            </AnimatedSection>

            <AnimatedSection>
              <ArchLayer
                title="Data & Integration Layer"
                color="border-gray-300 bg-gray-50"
                items={[
                  { name: 'PostgreSQL 16', detail: '11 migrations, typed queries' },
                  { name: 'Redis', detail: 'Cache + sessions + memory' },
                  { name: 'Qdrant', detail: 'Vector embeddings' },
                  { name: 'AWS APIs', detail: 'Cost Explorer, CloudWatch' },
                  { name: 'Azure APIs', detail: 'Cost Mgmt, Advisor' },
                  { name: 'GCP APIs', detail: 'Billing, Compute' },
                ]}
              />
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Data flow */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-14">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">How Data Flows</h2>
              <p className="text-gray-600 max-w-xl mx-auto">
                From cloud provider APIs to actionable insights — every step is automated.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: '1',
                icon: RefreshCw,
                title: 'Ingest',
                description: 'Scheduled jobs poll AWS, Azure, and GCP APIs for cost data, resource metadata, and utilisation metrics.',
                color: 'bg-blue-600',
              },
              {
                step: '2',
                icon: Activity,
                title: 'Analyse',
                description: 'Detection rules evaluate every resource. Anomaly detection flags statistical outliers. Forecasting projects 30-day costs.',
                color: 'bg-violet-600',
              },
              {
                step: '3',
                icon: Bot,
                title: 'Reason',
                description: 'AI agents perform deep analysis using pattern-aware tools. LLM root cause analysis explains anomalies. RAG enriches with history.',
                color: 'bg-emerald-600',
              },
              {
                step: '4',
                icon: Zap,
                title: 'Act',
                description: 'Recommendations auto-execute within configured guardrails via AWS API, Terraform PRs, or ServiceNow tickets.',
                color: 'bg-amber-500',
              },
            ].map((item) => (
              <AnimatedSection key={item.step}>
                <div className="bg-white rounded-xl border border-gray-200 p-6 h-full relative">
                  <div className="absolute -top-3 -left-2 w-7 h-7 rounded-full bg-gray-900 text-white text-xs font-bold flex items-center justify-center">
                    {item.step}
                  </div>
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${item.color}`}>
                    <item.icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Scheduler system */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-semibold mb-4">
                  <Clock className="w-3.5 h-3.5" /> BACKGROUND JOBS
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  8 Automated Schedulers
                </h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Background jobs run at configurable intervals to keep your data fresh and your rules enforced.
                  Every scheduler is independently configurable and can be paused per organisation.
                </p>
                <ul className="space-y-3">
                  {[
                    'Cost data sync from all cloud providers',
                    'Resource metadata and utilisation refresh',
                    'Detection rule evaluation across all resources',
                    'Anomaly detection with statistical analysis',
                    'Forecast model retraining and projection',
                    'Policy compliance checks',
                    'Auto-execution queue processing',
                    'Stale data cleanup and archival',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white rounded-2xl border border-gray-200 shadow-xl p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="w-5 h-5 text-gray-400" />
                  <span className="font-semibold text-gray-900 text-sm">Scheduler Status</span>
                </div>
                <div className="space-y-2">
                  {[
                    { name: 'Cost Sync', interval: '6h', last: '2m ago', status: 'healthy' },
                    { name: 'Resource Refresh', interval: '4h', last: '45m ago', status: 'healthy' },
                    { name: 'Rule Evaluation', interval: '2h', last: '18m ago', status: 'healthy' },
                    { name: 'Anomaly Detection', interval: '1h', last: '5m ago', status: 'healthy' },
                    { name: 'Forecast Update', interval: '12h', last: '3h ago', status: 'healthy' },
                    { name: 'Policy Check', interval: '2h', last: '1h ago', status: 'healthy' },
                    { name: 'Auto-Execute Queue', interval: '30m', last: '12m ago', status: 'healthy' },
                    { name: 'Data Cleanup', interval: '24h', last: '8h ago', status: 'healthy' },
                  ].map((job) => (
                    <div key={job.name} className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-500" />
                        <span className="text-sm text-gray-900 font-medium">{job.name}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-gray-400">every {job.interval}</span>
                        <span className="text-xs text-gray-500">{job.last}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* API overview */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-14">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">60+ REST API Endpoints</h2>
              <p className="text-gray-600 max-w-xl mx-auto">
                A comprehensive API covering every aspect of cloud cost management.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {[
              { group: 'Authentication', count: 4, endpoints: ['POST /auth/login', 'POST /auth/register', 'POST /auth/refresh', 'GET /auth/me'] },
              { group: 'Dashboard', count: 5, endpoints: ['GET /dashboard/summary', 'GET /dashboard/trends', 'GET /dashboard/by-provider', 'GET /dashboard/by-service', 'GET /dashboard/top-accounts'] },
              { group: 'Recommendations', count: 6, endpoints: ['GET /recommendations', 'GET /recommendations/:id', 'POST /recommendations/:id/execute', 'POST /recommendations/:id/dismiss', 'GET /recommendations/summary', 'GET /recommendations/categories'] },
              { group: 'AI Agent', count: 5, endpoints: ['POST /agent/query', 'GET /agent/stream/:id', 'GET /agent/conversations', 'GET /agent/conversations/:id', 'DELETE /agent/conversations/:id'] },
              { group: 'Anomalies', count: 4, endpoints: ['GET /anomalies', 'GET /anomalies/:id', 'POST /anomalies/:id/acknowledge', 'GET /anomalies/timeline'] },
              { group: 'Rules & Policies', count: 8, endpoints: ['GET /rules', 'POST /rules', 'PUT /rules/:id', 'GET /rules/overrides', 'GET /policies', 'POST /policies', 'GET /policies/violations', 'POST /policies/:id/toggle'] },
              { group: 'Forecasts & Budgets', count: 5, endpoints: ['GET /forecasts', 'GET /forecasts/by-service', 'GET /budgets', 'POST /budgets', 'GET /budgets/:id/status'] },
              { group: 'Resources', count: 6, endpoints: ['GET /inventory', 'GET /inventory/:id', 'GET /allocations', 'GET /allocations/by-tag', 'GET /allocations/untagged', 'POST /allocations/assign'] },
              { group: 'Settings & Admin', count: 7, endpoints: ['GET /settings/auto-execution', 'PUT /settings/auto-execution', 'GET /settings/notifications', 'GET /reports/executive', 'GET /reports/carbon', 'POST /reports/export', 'GET /health'] },
            ].map((group) => (
              <AnimatedSection key={group.group}>
                <div className="bg-white rounded-xl border border-gray-200 p-4 h-full">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-900 text-sm">{group.group}</h3>
                    <span className="text-xs text-gray-400">{group.count} endpoints</span>
                  </div>
                  <div className="space-y-1">
                    {group.endpoints.map((ep) => (
                      <div key={ep} className="text-[11px] font-mono text-gray-500 py-0.5">
                        <span className={`font-semibold ${
                          ep.startsWith('GET') ? 'text-emerald-600' :
                          ep.startsWith('POST') ? 'text-blue-600' :
                          ep.startsWith('PUT') ? 'text-amber-600' :
                          ep.startsWith('DELETE') ? 'text-red-600' : 'text-gray-600'
                        }`}>
                          {ep.split(' ')[0]}
                        </span>{' '}
                        {ep.split(' ').slice(1).join(' ')}
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Security */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-14">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Security First</h2>
              <p className="text-gray-600 max-w-xl mx-auto">
                Enterprise-grade security built into every layer.
              </p>
            </div>
          </AnimatedSection>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Lock, title: 'JWT + OAuth2', desc: 'Token-based authentication with refresh rotation and role-based access control.' },
              { icon: Shield, title: 'AES-256-GCM', desc: 'All sensitive data encrypted at rest. API keys and credentials never stored in plaintext.' },
              { icon: GitBranch, title: 'Audit Trail', desc: 'Every action logged with user, timestamp, and before/after state for compliance.' },
              { icon: Activity, title: 'Rate Limiting', desc: 'Redis-backed per-org rate limiting to prevent abuse and ensure fair usage.' },
            ].map((item) => (
              <AnimatedSection key={item.title}>
                <div className="bg-white rounded-xl border border-gray-200 p-6 text-center hover:shadow-md transition-all h-full">
                  <div className="w-12 h-12 rounded-xl bg-gray-900 flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 hero-gradient">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            See the Architecture in Action
          </h2>
          <p className="text-indigo-200 mb-8">Explore the interactive demo to see how all the pieces fit together.</p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link
              to="/demo/dashboard"
              className="px-6 py-3 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition-colors text-sm flex items-center gap-2"
            >
              <Eye className="w-4 h-4" /> Explore Live Demo
            </Link>
            <Link
              to="/features"
              className="px-6 py-3 bg-white/10 text-white font-medium rounded-lg border border-white/20 hover:bg-white/20 transition-colors text-sm flex items-center gap-2"
            >
              View Features <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
