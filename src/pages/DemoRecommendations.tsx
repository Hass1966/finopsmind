import { useState } from 'react';
import { ChevronDown, Copy, Check, CheckCircle, XCircle, Clock } from 'lucide-react';
import DemoShell from '../components/DemoShell';
import { recommendations, recSummary } from '../data/mockData';

function formatCurrency(n: number) {
  return new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', minimumFractionDigits: 0, maximumFractionDigits: 2 }).format(n);
}

const typeColors: Record<string, string> = {
  idle_resource: 'bg-red-100 text-red-700',
  rightsizing: 'bg-blue-100 text-blue-700',
  unused_resource: 'bg-gray-100 text-gray-700',
  graviton_migration: 'bg-violet-100 text-violet-700',
  storage_optimization: 'bg-amber-100 text-amber-700',
  reserved_instance: 'bg-emerald-100 text-emerald-700',
};

const statusIcons: Record<string, typeof CheckCircle> = {
  pending: Clock,
  accepted: CheckCircle,
  implemented: CheckCircle,
  dismissed: XCircle,
};

export default function DemoRecommendations() {
  const [filter, setFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const filtered = recommendations.filter((r) =>
    (!filter || r.type === filter) && (!statusFilter || r.status === statusFilter)
  );

  const totalSavings = filtered.reduce((s, r) => s + r.estimated_savings, 0);

  return (
    <DemoShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Recommendations</h1>
          <p className="text-sm text-gray-500 mt-1">56+ detection rules across AWS, Azure, and GCP</p>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Total', value: recSummary.total_count, color: 'text-gray-900' },
            { label: 'Pending', value: recSummary.by_status.pending, color: 'text-amber-600' },
            { label: 'Accepted', value: recSummary.by_status.accepted, color: 'text-blue-600' },
            { label: 'Implemented', value: recSummary.by_status.implemented, color: 'text-emerald-600' },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-xl border border-gray-200 p-4 text-center">
              <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-xs text-gray-500">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 items-center">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="">All Types</option>
            <option value="idle_resource">Idle Resource</option>
            <option value="rightsizing">Rightsizing</option>
            <option value="unused_resource">Unused Resource</option>
            <option value="graviton_migration">Graviton Migration</option>
            <option value="storage_optimization">Storage</option>
            <option value="reserved_instance">Reserved Instance</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="accepted">Accepted</option>
            <option value="implemented">Implemented</option>
          </select>
          <div className="ml-auto text-sm text-gray-500">
            Showing {filtered.length} recommendations &middot; <span className="font-semibold text-emerald-600">{formatCurrency(totalSavings)}/mo</span> potential savings
          </div>
        </div>

        {/* Recommendations list */}
        <div className="space-y-3">
          {filtered.map((rec) => {
            const expanded = expandedId === rec.id;
            const StatusIcon = statusIcons[rec.status] || Clock;
            return (
              <div key={rec.id} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <button
                  onClick={() => setExpandedId(expanded ? null : rec.id)}
                  className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors text-left"
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                    rec.status === 'implemented' ? 'bg-emerald-50' : rec.status === 'accepted' ? 'bg-blue-50' : 'bg-amber-50'
                  }`}>
                    <StatusIcon className={`w-5 h-5 ${
                      rec.status === 'implemented' ? 'text-emerald-600' : rec.status === 'accepted' ? 'text-blue-600' : 'text-amber-600'
                    }`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-sm font-semibold text-gray-900 truncate">{rec.title}</span>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${typeColors[rec.type] || 'bg-gray-100 text-gray-700'}`}>
                        {rec.type.replace(/_/g, ' ')}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 truncate">
                      {rec.resource_name} &middot; {rec.provider.toUpperCase()} &middot; Risk: {rec.risk_score}/100
                    </p>
                  </div>
                  <span className="text-sm font-bold text-emerald-600 shrink-0">{formatCurrency(rec.estimated_savings)}/mo</span>
                  <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${expanded ? 'rotate-180' : ''}`} />
                </button>
                {expanded && (
                  <div className="border-t border-gray-100 px-4 pb-4 pt-3 space-y-3">
                    <p className="text-sm text-gray-700">{rec.description}</p>
                    <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                      <span>Resource: <code className="bg-gray-100 px-1.5 py-0.5 rounded font-mono">{rec.resource_id}</code></span>
                      <span>Rule: <code className="bg-gray-100 px-1.5 py-0.5 rounded font-mono">{rec.rule_id}</code></span>
                      <span>Risk Score: <span className={`font-semibold ${rec.risk_score > 30 ? 'text-amber-600' : 'text-emerald-600'}`}>{rec.risk_score}/100</span></span>
                    </div>
                    {rec.terraform && (
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-medium text-gray-500">Terraform</span>
                          <button
                            onClick={() => { navigator.clipboard.writeText(rec.terraform!); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
                            className="text-xs text-primary-600 hover:text-primary-800 flex items-center gap-1"
                          >
                            {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                            {copied ? 'Copied' : 'Copy'}
                          </button>
                        </div>
                        <pre className="bg-gray-900 text-green-400 rounded-lg p-3 text-xs overflow-x-auto font-mono">{rec.terraform}</pre>
                      </div>
                    )}
                    <div className="flex gap-2">
                      <button className="px-3 py-1.5 text-xs font-medium bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">Accept</button>
                      <button className="px-3 py-1.5 text-xs font-medium bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">Dismiss</button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </DemoShell>
  );
}
