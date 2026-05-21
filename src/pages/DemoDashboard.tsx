import {
  DollarSign, AlertTriangle, PiggyBank, Gauge,
  TrendingUp, TrendingDown, ArrowRight, Cpu,
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip,
  ResponsiveContainer, PieChart, Pie, Cell, Legend,
  BarChart, Bar, LineChart, Line,
} from 'recharts';
import DemoShell from '../components/DemoShell';
import { costSummary, costTrend, anomalies, recSummary, aiCosts } from '../data/mockData';

// ── Helpers ──
function formatCurrency(n: number, currency = 'GBP') {
  return new Intl.NumberFormat('en-GB', { style: 'currency', currency, minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(n);
}

function formatDateShort(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}

function severityColor(severity: string) {
  switch (severity) {
    case 'critical': return 'bg-red-100 text-red-800 border-red-200';
    case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
    case 'medium': return 'bg-amber-100 text-amber-800 border-amber-200';
    case 'low': return 'bg-blue-100 text-blue-800 border-blue-200';
    default: return 'bg-gray-100 text-gray-800 border-gray-200';
  }
}

// ── Chart tooltip ──
function CostTooltip({ active, payload, label }: { active?: boolean; payload?: { value: number }[]; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white px-3 py-2 rounded-lg shadow-lg border border-gray-200 text-sm">
      <p className="text-gray-500 mb-0.5">{label}</p>
      <p className="font-semibold text-gray-900">{formatCurrency(payload[0].value)}</p>
    </div>
  );
}

// ── Stat card ──
function StatCard({ icon: Icon, iconBg, iconColor, label, value, change, changeLabel }: {
  icon: React.ElementType; iconBg: string; iconColor: string;
  label: string; value: string; change?: number; changeLabel?: string;
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3 mb-3">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${iconBg}`}>
          <Icon className={`w-5 h-5 ${iconColor}`} />
        </div>
        <span className="text-sm font-medium text-gray-500">{label}</span>
      </div>
      <p className="text-2xl font-bold text-gray-900 mb-1">{value}</p>
      {change !== undefined && (
        <div className="flex items-center gap-1.5">
          <span className={`inline-flex items-center gap-0.5 text-xs font-semibold px-2 py-0.5 rounded-full ${
            change > 0 ? 'bg-red-50 text-red-700' : change < 0 ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-50 text-gray-600'
          }`}>
            {change > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            {change > 0 ? '+' : ''}{change}%
          </span>
          {changeLabel && <span className="text-xs text-gray-400">{changeLabel}</span>}
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════
//  DEMO DASHBOARD
// ═══════════════════════════════════════════════════
export default function DemoDashboard() {
  const trendData = costTrend.map((item) => ({
    date: formatDateShort(item.date),
    amount: item.amount,
  }));

  const providerData = costSummary.by_provider.map((p) => ({
    name: p.name,
    value: p.amount,
    color: p.color,
  }));

  const serviceData = costSummary.by_service.slice(0, 8);

  const activeAnomalyCount = anomalies.filter((a) => a.status === 'active').length;

  const aiTrendData = aiCosts.trend.map((p) => ({
    d: formatDateShort(p.date),
    v: Math.round(p.amount),
  }));

  return (
    <DemoShell>
      <div className="space-y-6">
        {/* Page title */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">Multi-cloud cost overview — demo data</p>
        </div>

        {/* ── Stats row ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            icon={DollarSign}
            iconBg="bg-blue-50"
            iconColor="text-blue-600"
            label="Total Cost"
            value={formatCurrency(costSummary.total_cost)}
            change={costSummary.change_pct}
            changeLabel="vs last period"
          />
          <StatCard
            icon={AlertTriangle}
            iconBg="bg-amber-50"
            iconColor="text-amber-600"
            label="Active Anomalies"
            value={String(activeAnomalyCount)}
          />
          <StatCard
            icon={PiggyBank}
            iconBg="bg-emerald-50"
            iconColor="text-emerald-600"
            label="Potential Savings"
            value={formatCurrency(recSummary.total_savings)}
          />
          <StatCard
            icon={Gauge}
            iconBg="bg-violet-50"
            iconColor="text-violet-600"
            label="Budget Utilization"
            value="73%"
          />
        </div>

        {/* ── AI Costs card ── */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center">
                <Cpu className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">AI / GPU Spend</span>
                <p className="text-xl font-bold text-gray-900">
                  {formatCurrency(aiCosts.total_ai_spend)}
                  <span className="ml-2 text-xs font-normal text-gray-400">
                    ({aiCosts.ai_share_pct.toFixed(1)}% of total)
                  </span>
                </p>
              </div>
            </div>
            <div className="w-32 h-10">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={aiTrendData}>
                  <Line type="monotone" dataKey="v" stroke="#7C3AED" strokeWidth={1.5} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {aiCosts.by_service.map((s) => (
              <span key={s.name} className="inline-flex items-center gap-1 text-xs bg-purple-50 text-purple-700 px-2 py-0.5 rounded-full">
                {s.name}
                <span className="text-purple-400">{formatCurrency(s.amount)}</span>
              </span>
            ))}
          </div>
        </div>

        {/* ── Charts row ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cost Trend */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-gray-900">Cost Trend</h2>
              <span className="text-xs text-gray-400">Daily</span>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={trendData} margin={{ top: 4, right: 4, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="costGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.2} />
                    <stop offset="100%" stopColor="#3B82F6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false}
                  tickFormatter={(v: number) => `£${(v / 1000).toFixed(1)}k`} />
                <RechartsTooltip content={<CostTooltip />} />
                <Area
                  type="monotone" dataKey="amount" stroke="#3B82F6" strokeWidth={2}
                  fill="url(#costGradient)" dot={false}
                  activeDot={{ r: 4, strokeWidth: 2, stroke: '#fff' }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Cost by Provider */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
            <h2 className="text-sm font-semibold text-gray-900 mb-4">Cost by Provider</h2>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={providerData} cx="50%" cy="45%"
                  innerRadius={55} outerRadius={85}
                  paddingAngle={3} dataKey="value" strokeWidth={0}
                >
                  {providerData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Legend
                  verticalAlign="bottom" iconType="circle" iconSize={8}
                  formatter={(value: string) => <span className="text-xs text-gray-600">{value}</span>}
                />
                <RechartsTooltip
                  formatter={(value) => [formatCurrency(Number(value)), 'Cost']}
                  contentStyle={{ borderRadius: '0.5rem', border: '1px solid #E2E8F0', fontSize: '0.75rem' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ── Bottom row: Services + Anomalies ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Services */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
            <h2 className="text-sm font-semibold text-gray-900 mb-4">Top Services by Cost</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={serviceData} layout="vertical" margin={{ top: 0, right: 20, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" horizontal={false} />
                <XAxis
                  type="number" tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false}
                  tickFormatter={(v: number) => `£${(v / 1000).toFixed(0)}k`}
                />
                <YAxis
                  type="category" dataKey="name" tick={{ fontSize: 11, fill: '#64748B' }}
                  axisLine={false} tickLine={false} width={120}
                />
                <RechartsTooltip
                  formatter={(value) => [formatCurrency(Number(value)), 'Cost']}
                  contentStyle={{ borderRadius: '0.5rem', border: '1px solid #E2E8F0', fontSize: '0.75rem' }}
                />
                <Bar dataKey="amount" fill="#3B82F6" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Recent Anomalies */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-gray-900">Recent Anomalies</h2>
              <span className="inline-flex items-center gap-1 text-xs font-medium text-blue-600">
                View all <ArrowRight className="w-3 h-3" />
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left py-2 pr-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Date</th>
                    <th className="text-left py-2 pr-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Service</th>
                    <th className="text-left py-2 pr-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Severity</th>
                    <th className="text-right py-2 text-xs font-medium text-gray-400 uppercase tracking-wider">Deviation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {anomalies.map((anomaly) => (
                    <tr key={anomaly.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="py-2.5 pr-3 text-gray-600 whitespace-nowrap">
                        {formatDateShort(anomaly.detected_at)}
                      </td>
                      <td className="py-2.5 pr-3 text-gray-900 font-medium whitespace-nowrap">
                        {anomaly.service}
                      </td>
                      <td className="py-2.5 pr-3">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold border ${severityColor(anomaly.severity)}`}>
                          {anomaly.severity}
                        </span>
                      </td>
                      <td className="py-2.5 text-right font-mono text-gray-900 whitespace-nowrap">
                        {formatCurrency(anomaly.actual_amount)}
                        <span className="text-gray-400 font-normal ml-1">
                          (+{anomaly.deviation_pct}%)
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </DemoShell>
  );
}
