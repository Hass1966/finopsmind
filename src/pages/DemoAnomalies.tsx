import { useState } from 'react';
import { AlertTriangle, ChevronDown } from 'lucide-react';
import DemoShell from '../components/DemoShell';
import { anomalies } from '../data/mockData';

function formatCurrency(n: number) {
  return new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', minimumFractionDigits: 0 }).format(n);
}

function formatDate(s: string) {
  return new Date(s).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

const severityConfig: Record<string, { bg: string; text: string; border: string }> = {
  critical: { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-200' },
  high: { bg: 'bg-orange-100', text: 'text-orange-800', border: 'border-orange-200' },
  medium: { bg: 'bg-amber-100', text: 'text-amber-800', border: 'border-amber-200' },
  low: { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-200' },
};

const statusConfig: Record<string, { bg: string; text: string; label: string }> = {
  active: { bg: 'bg-red-50', text: 'text-red-700', label: 'Active' },
  acknowledged: { bg: 'bg-amber-50', text: 'text-amber-700', label: 'Acknowledged' },
  resolved: { bg: 'bg-emerald-50', text: 'text-emerald-700', label: 'Resolved' },
};

export default function DemoAnomalies() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [filterSeverity, setFilterSeverity] = useState('');

  const filtered = anomalies.filter((a) => !filterSeverity || a.severity === filterSeverity);

  return (
    <DemoShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Anomalies</h1>
          <p className="text-sm text-gray-500 mt-1">Statistical anomaly detection with LLM root cause analysis</p>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Critical', value: anomalies.filter((a) => a.severity === 'critical').length, color: 'text-red-600', bg: 'bg-red-50' },
            { label: 'High', value: anomalies.filter((a) => a.severity === 'high').length, color: 'text-orange-600', bg: 'bg-orange-50' },
            { label: 'Medium', value: anomalies.filter((a) => a.severity === 'medium').length, color: 'text-amber-600', bg: 'bg-amber-50' },
            { label: 'Resolved', value: anomalies.filter((a) => a.status === 'resolved').length, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          ].map((s) => (
            <div key={s.label} className={`${s.bg} rounded-xl border border-gray-200 p-4 text-center`}>
              <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-xs text-gray-500">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Filter */}
        <div className="flex gap-3">
          <select
            value={filterSeverity}
            onChange={(e) => setFilterSeverity(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white"
          >
            <option value="">All Severities</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

        {/* Anomaly cards */}
        <div className="space-y-3">
          {filtered.map((anomaly) => {
            const expanded = expandedId === anomaly.id;
            const sev = severityConfig[anomaly.severity] || severityConfig.low;
            const stat = statusConfig[anomaly.status] || statusConfig.active;
            return (
              <div key={anomaly.id} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <button
                  onClick={() => setExpandedId(expanded ? null : anomaly.id)}
                  className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors text-left"
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${sev.bg}`}>
                    <AlertTriangle className={`w-5 h-5 ${sev.text}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                      <span className="text-sm font-semibold text-gray-900">{anomaly.service}</span>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${sev.bg} ${sev.text} ${sev.border}`}>
                        {anomaly.severity}
                      </span>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${stat.bg} ${stat.text}`}>
                        {stat.label}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 truncate">{anomaly.description}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-bold text-gray-900">{formatCurrency(anomaly.actual_amount)}</p>
                    <p className="text-xs text-red-600">+{anomaly.deviation_pct}%</p>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${expanded ? 'rotate-180' : ''}`} />
                </button>
                {expanded && (
                  <div className="border-t border-gray-100 px-4 pb-4 pt-3 space-y-3">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500 text-xs">Expected Amount</p>
                        <p className="font-semibold text-gray-900">{formatCurrency(anomaly.expected_amount)}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-xs">Actual Amount</p>
                        <p className="font-semibold text-red-600">{formatCurrency(anomaly.actual_amount)}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-xs">Detected</p>
                        <p className="font-semibold text-gray-900">{formatDate(anomaly.detected_at)}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-xs">Provider</p>
                        <p className="font-semibold text-gray-900">{anomaly.provider.toUpperCase()}</p>
                      </div>
                    </div>
                    <div className="bg-amber-50 border border-amber-100 rounded-lg p-3">
                      <p className="text-xs font-semibold text-amber-700 mb-1">Root Cause (LLM Analysis)</p>
                      <p className="text-sm text-gray-700">{anomaly.root_cause}</p>
                    </div>
                    {anomaly.status === 'active' && (
                      <div className="flex gap-2">
                        <button className="px-3 py-1.5 text-xs font-medium bg-amber-100 text-amber-800 rounded-lg hover:bg-amber-200">Acknowledge</button>
                        <button className="px-3 py-1.5 text-xs font-medium bg-emerald-100 text-emerald-800 rounded-lg hover:bg-emerald-200">Resolve</button>
                      </div>
                    )}
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
