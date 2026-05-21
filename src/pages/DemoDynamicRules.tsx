import { useState } from 'react';
import { SlidersHorizontal, Play, ChevronDown, ChevronRight } from 'lucide-react';
import DemoShell from '../components/DemoShell';
import { dynamicRules, builtinRulesPreview } from '../data/mockData';

function formatDate(s: string) {
  return new Date(s).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

export default function DemoDynamicRules() {
  const [tab, setTab] = useState<'custom' | 'builtin'>('custom');
  const [expandedRule, setExpandedRule] = useState<string | null>('dr-001');

  return (
    <DemoShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dynamic Rules</h1>
          <p className="text-sm text-gray-500 mt-1">Custom YAML rules + built-in threshold overrides</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-gray-100 rounded-lg p-1 w-fit">
          <button
            onClick={() => setTab('custom')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              tab === 'custom' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Custom Rules ({dynamicRules.length})
          </button>
          <button
            onClick={() => setTab('builtin')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              tab === 'builtin' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Built-in Rules ({builtinRulesPreview.length})
          </button>
        </div>

        {tab === 'custom' ? (
          <div className="space-y-4">
            <div className="flex justify-end">
              <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 text-sm font-medium">
                + New Rule
              </button>
            </div>
            {dynamicRules.map((rule) => {
              const expanded = expandedRule === rule.id;
              return (
                <div key={rule.id} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                  <button
                    onClick={() => setExpandedRule(expanded ? null : rule.id)}
                    className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors text-left"
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${rule.enabled ? 'bg-emerald-50' : 'bg-gray-100'}`}>
                      <SlidersHorizontal className={`w-5 h-5 ${rule.enabled ? 'text-emerald-600' : 'text-gray-400'}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-sm font-semibold text-gray-900">{rule.name}</span>
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                          rule.enabled ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-500'
                        }`}>
                          {rule.enabled ? 'Enabled' : 'Disabled'}
                        </span>
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                          rule.severity === 'high' ? 'bg-red-100 text-red-700' :
                          rule.severity === 'medium' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'
                        }`}>
                          {rule.severity}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 truncate">
                        {rule.cloud_provider.toUpperCase()} &middot; {rule.resource_type} &middot; {rule.match_count} matches &middot; v{rule.version}
                      </p>
                    </div>
                    {expanded ? <ChevronDown className="w-4 h-4 text-gray-400" /> : <ChevronRight className="w-4 h-4 text-gray-400" />}
                  </button>
                  {expanded && (
                    <div className="border-t border-gray-100 px-4 pb-4 pt-3 space-y-4">
                      {rule.description && (
                        <p className="text-sm text-gray-600">{rule.description}</p>
                      )}

                      {/* YAML conditions */}
                      <div>
                        <span className="text-xs font-medium text-gray-500 block mb-1">Conditions (YAML)</span>
                        <pre className="bg-gray-900 text-gray-300 rounded-lg p-3 text-xs font-mono overflow-x-auto">{rule.conditions_yaml}</pre>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-xs text-gray-500">Recommendation Type</p>
                          <p className="font-medium text-gray-900">{rule.recommendation_type.replace(/_/g, ' ')}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Savings Formula</p>
                          <code className="text-xs bg-gray-100 px-2 py-1 rounded font-mono">{rule.estimated_savings_formula || 'N/A'}</code>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Last Evaluated</p>
                          <p className="font-medium text-gray-900">{rule.last_evaluated_at ? formatDate(rule.last_evaluated_at) : 'Never'}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Created</p>
                          <p className="font-medium text-gray-900">{formatDate(rule.created_at)}</p>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button className="px-3 py-1.5 text-xs font-medium bg-primary-600 text-white rounded-lg hover:bg-primary-700 flex items-center gap-1">
                          <Play className="w-3 h-3" /> Test Rule
                        </button>
                        <button className="px-3 py-1.5 text-xs font-medium bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">Edit</button>
                        <button className="px-3 py-1.5 text-xs font-medium bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
                          {rule.enabled ? 'Disable' : 'Enable'}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Rule</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Provider</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Category</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Default Threshold</th>
                  <th className="text-center py-3 px-4 text-xs font-medium text-gray-500 uppercase">Override</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {builtinRulesPreview.map((rule) => (
                  <tr key={rule.id} className="hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium text-gray-900">{rule.name}</td>
                    <td className="py-3 px-4">
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                        rule.provider === 'aws' ? 'bg-orange-100 text-orange-700' :
                        rule.provider === 'azure' ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {rule.provider.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-600">{rule.category}</td>
                    <td className="py-3 px-4 font-mono text-xs text-gray-600">{rule.threshold}</td>
                    <td className="py-3 px-4 text-center">
                      <button className="text-xs text-primary-600 hover:text-primary-800 font-medium">Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </DemoShell>
  );
}
