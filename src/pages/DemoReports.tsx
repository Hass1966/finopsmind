import { TrendingDown, Leaf, Download, FileText } from 'lucide-react';
import DemoShell from '../components/DemoShell';
import { executiveSummary } from '../data/mockData';

function formatCurrency(n: number) {
  return new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', minimumFractionDigits: 0 }).format(n);
}

export default function DemoReports() {
  const r = executiveSummary;

  return (
    <DemoShell>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
            <p className="text-sm text-gray-500 mt-1">Executive summary, carbon footprint, and cost comparison</p>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50">
              <Download className="w-4 h-4" /> CSV
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50">
              <FileText className="w-4 h-4" /> JSON
            </button>
          </div>
        </div>

        {/* Executive Summary */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-1">Executive Summary</h2>
          <p className="text-sm text-gray-500 mb-6">{r.period}</p>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-blue-50 rounded-xl p-4">
              <p className="text-xs text-gray-500 mb-1">Total Cost</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(r.total_cost)}</p>
              <span className="text-xs font-semibold text-emerald-600">{r.change_pct}% vs last period</span>
            </div>
            <div className="bg-emerald-50 rounded-xl p-4">
              <p className="text-xs text-gray-500 mb-1">Savings Realised</p>
              <p className="text-2xl font-bold text-emerald-600">{formatCurrency(r.savings_realised)}</p>
              <span className="text-xs text-gray-500">{formatCurrency(r.savings_pending)} pending</span>
            </div>
            <div className="bg-amber-50 rounded-xl p-4">
              <p className="text-xs text-gray-500 mb-1">Anomalies</p>
              <p className="text-2xl font-bold text-gray-900">{r.anomalies_detected}</p>
              <span className="text-xs text-emerald-600">{r.anomalies_resolved} resolved</span>
            </div>
            <div className="bg-violet-50 rounded-xl p-4">
              <p className="text-xs text-gray-500 mb-1">Recommendations</p>
              <p className="text-2xl font-bold text-gray-900">{r.recommendations_generated}</p>
              <span className="text-xs text-emerald-600">{r.recommendations_implemented} implemented</span>
            </div>
          </div>

          {/* Top savings */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Top Savings Actions</h3>
            <div className="space-y-2">
              {r.top_savings.map((s, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-gray-50">
                  <div className="flex items-center gap-2">
                    <TrendingDown className="w-4 h-4 text-emerald-500" />
                    <span className="text-sm text-gray-700">{s.action}</span>
                  </div>
                  <span className="text-sm font-bold text-emerald-600">{formatCurrency(s.savings)}/mo</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Carbon Footprint */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <div className="flex items-center gap-2 mb-4">
            <Leaf className="w-5 h-5 text-emerald-600" />
            <h2 className="text-lg font-semibold text-gray-900">Carbon Footprint</h2>
          </div>
          <div className="grid grid-cols-3 gap-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-gray-900">{r.carbon_footprint.total_tco2e}</p>
              <p className="text-sm text-gray-500">tCO2e</p>
              <span className="text-xs font-semibold text-emerald-600">{r.carbon_footprint.change_pct}% vs last period</span>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-gray-900">{r.carbon_footprint.energy_kwh.toLocaleString()}</p>
              <p className="text-sm text-gray-500">kWh energy</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-emerald-600">A</p>
              <p className="text-sm text-gray-500">Efficiency Rating</p>
              <span className="text-xs text-gray-400">EU region advantage</span>
            </div>
          </div>
        </div>

        {/* Period comparison */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Period-over-Period Comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-2 text-xs font-medium text-gray-500 uppercase">Metric</th>
                  <th className="text-right py-2 text-xs font-medium text-gray-500 uppercase">Last Period</th>
                  <th className="text-right py-2 text-xs font-medium text-gray-500 uppercase">This Period</th>
                  <th className="text-right py-2 text-xs font-medium text-gray-500 uppercase">Change</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[
                  { metric: 'Total Cost', last: r.previous_cost, current: r.total_cost, format: 'currency' },
                  { metric: 'Anomalies Detected', last: 7, current: r.anomalies_detected, format: 'number' },
                  { metric: 'Recommendations', last: 28, current: r.recommendations_generated, format: 'number' },
                  { metric: 'Carbon (tCO2e)', last: 2.73, current: r.carbon_footprint.total_tco2e, format: 'decimal' },
                ].map((row) => {
                  const change = ((row.current - row.last) / row.last) * 100;
                  const fmtVal = (v: number) => row.format === 'currency' ? formatCurrency(v) : row.format === 'decimal' ? v.toFixed(2) : String(v);
                  return (
                    <tr key={row.metric}>
                      <td className="py-3 font-medium text-gray-900">{row.metric}</td>
                      <td className="py-3 text-right text-gray-600">{fmtVal(row.last)}</td>
                      <td className="py-3 text-right font-semibold text-gray-900">{fmtVal(row.current)}</td>
                      <td className="py-3 text-right">
                        <span className={`text-xs font-semibold ${change < 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                          {change > 0 ? '+' : ''}{change.toFixed(1)}%
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DemoShell>
  );
}
