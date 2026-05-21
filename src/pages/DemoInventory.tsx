import { useState } from 'react';
import { Search } from 'lucide-react';
import DemoShell from '../components/DemoShell';
import { inventory } from '../data/mockData';

function formatCurrency(n: number) {
  return new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', minimumFractionDigits: 0, maximumFractionDigits: 2 }).format(n);
}

const providerBadge: Record<string, string> = {
  aws: 'bg-orange-100 text-orange-700',
  azure: 'bg-blue-100 text-blue-700',
  gcp: 'bg-red-100 text-red-700',
};

export default function DemoInventory() {
  const [search, setSearch] = useState('');
  const [providerFilter, setProviderFilter] = useState('');

  const filtered = inventory.filter((r) =>
    (!providerFilter || r.provider === providerFilter) &&
    (!search || r.name.toLowerCase().includes(search.toLowerCase()) || r.id.toLowerCase().includes(search.toLowerCase()) || r.type.toLowerCase().includes(search.toLowerCase()))
  );

  const totalMonthlyCost = filtered.reduce((s, r) => s + r.monthly_cost, 0);

  return (
    <DemoShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Resource Inventory</h1>
          <p className="text-sm text-gray-500 mt-1">{inventory.length} resources across AWS, Azure, and GCP</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, ID, or type..."
              className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <select
            value={providerFilter}
            onChange={(e) => setProviderFilter(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white"
          >
            <option value="">All Providers</option>
            <option value="aws">AWS</option>
            <option value="azure">Azure</option>
            <option value="gcp">GCP</option>
          </select>
          <div className="flex items-center text-sm text-gray-500">
            {filtered.length} resources &middot; {formatCurrency(totalMonthlyCost)}/mo
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Name</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Type</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Provider</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Region</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Instance</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="text-right py-3 px-4 text-xs font-medium text-gray-500 uppercase">Cost/mo</th>
                  <th className="text-right py-3 px-4 text-xs font-medium text-gray-500 uppercase">CPU</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((resource) => (
                  <tr key={resource.id} className="hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-medium text-gray-900">{resource.name}</p>
                        <p className="text-xs text-gray-400 font-mono">{resource.id}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-600">{resource.type}</td>
                    <td className="py-3 px-4">
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${providerBadge[resource.provider] || 'bg-gray-100 text-gray-700'}`}>
                        {resource.provider.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-600 text-xs">{resource.region}</td>
                    <td className="py-3 px-4 font-mono text-xs text-gray-600">{resource.instance_type}</td>
                    <td className="py-3 px-4">
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                        resource.status === 'running' || resource.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {resource.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right font-semibold text-gray-900">{formatCurrency(resource.monthly_cost)}</td>
                    <td className="py-3 px-4 text-right">
                      {resource.cpu_avg > 0 ? (
                        <span className={`font-mono text-xs ${resource.cpu_avg < 10 ? 'text-red-600' : 'text-gray-600'}`}>
                          {resource.cpu_avg}%
                        </span>
                      ) : (
                        <span className="text-xs text-gray-400">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DemoShell>
  );
}
