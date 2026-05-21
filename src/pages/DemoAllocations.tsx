import { useState } from 'react';
import { Tag, AlertTriangle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import DemoShell from '../components/DemoShell';
import { allocations } from '../data/mockData';

function formatCurrency(n: number) {
  return new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', minimumFractionDigits: 0 }).format(n);
}

export default function DemoAllocations() {
  const [view, setView] = useState<'team' | 'environment'>('team');
  const data = view === 'team' ? allocations.by_team : allocations.by_environment;

  return (
    <DemoShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Cost Allocations</h1>
          <p className="text-sm text-gray-500 mt-1">Cost breakdown by tags with untagged resource detection</p>
        </div>

        {/* View toggle */}
        <div className="flex gap-1 bg-gray-100 rounded-lg p-1 w-fit">
          <button onClick={() => setView('team')} className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${view === 'team' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'}`}>
            By Team
          </button>
          <button onClick={() => setView('environment')} className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${view === 'environment' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'}`}>
            By Environment
          </button>
        </div>

        {/* Untagged warning */}
        {allocations.untagged_resources > 0 && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-amber-900">{allocations.untagged_resources} untagged resources detected</p>
              <p className="text-sm text-amber-700 mt-0.5">
                {allocations.untagged_resources} of {allocations.total_resources} resources are missing required tags, accounting for {formatCurrency(data.find((d) => d.name === 'Untagged')?.cost || 0)} in unallocated costs.
              </p>
            </div>
          </div>
        )}

        {/* Chart */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
          <h2 className="text-sm font-semibold text-gray-900 mb-4">Cost by {view === 'team' ? 'Team' : 'Environment'}</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data} layout="vertical" margin={{ top: 0, right: 20, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false}
                tickFormatter={(v: number) => `£${(v / 1000).toFixed(0)}k`} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 12, fill: '#64748B' }} axisLine={false} tickLine={false} width={100} />
              <Tooltip formatter={(value) => [formatCurrency(Number(value)), 'Cost']}
                contentStyle={{ borderRadius: '0.5rem', border: '1px solid #E2E8F0', fontSize: '0.75rem' }} />
              <Bar dataKey="cost" fill="#3B82F6" radius={[0, 4, 4, 0]} barSize={24} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">{view === 'team' ? 'Team' : 'Environment'}</th>
                <th className="text-right py-3 px-4 text-xs font-medium text-gray-500 uppercase">Cost</th>
                <th className="text-right py-3 px-4 text-xs font-medium text-gray-500 uppercase">Share</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Allocation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {data.map((item) => (
                <tr key={item.name} className={`hover:bg-gray-50 ${item.name === 'Untagged' ? 'bg-amber-50/50' : ''}`}>
                  <td className="py-3 px-4 font-medium text-gray-900 flex items-center gap-2">
                    {item.name === 'Untagged' && <Tag className="w-4 h-4 text-amber-500" />}
                    {item.name}
                  </td>
                  <td className="py-3 px-4 text-right font-semibold text-gray-900">{formatCurrency(item.cost)}</td>
                  <td className="py-3 px-4 text-right text-gray-600">{item.percentage}%</td>
                  <td className="py-3 px-4">
                    <div className="h-2 bg-gray-100 rounded-full w-32">
                      <div className={`h-full rounded-full ${item.name === 'Untagged' ? 'bg-amber-400' : 'bg-primary-500'}`}
                        style={{ width: `${item.percentage}%` }} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DemoShell>
  );
}
