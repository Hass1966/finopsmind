import { CheckCircle, AlertTriangle, XCircle } from 'lucide-react';
import DemoShell from '../components/DemoShell';
import { policies } from '../data/mockData';

const typeLabels: Record<string, string> = {
  cost_limit: 'Cost Limit',
  tagging: 'Tagging',
  region_restriction: 'Region Restriction',
  resource_type: 'Resource Type',
  security: 'Security',
};

export default function DemoPolicies() {
  const compliant = policies.filter((p) => p.status === 'compliant').length;
  const violated = policies.filter((p) => p.status === 'violated').length;

  return (
    <DemoShell>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Policies</h1>
            <p className="text-sm text-gray-500 mt-1">Governance policy enforcement and violation tracking</p>
          </div>
          <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 text-sm font-medium">
            + Create Policy
          </button>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
            <p className="text-2xl font-bold text-gray-900">{policies.length}</p>
            <p className="text-xs text-gray-500">Total Policies</p>
          </div>
          <div className="bg-emerald-50 rounded-xl border border-gray-200 p-4 text-center">
            <p className="text-2xl font-bold text-emerald-600">{compliant}</p>
            <p className="text-xs text-gray-500">Compliant</p>
          </div>
          <div className="bg-red-50 rounded-xl border border-gray-200 p-4 text-center">
            <p className="text-2xl font-bold text-red-600">{violated}</p>
            <p className="text-xs text-gray-500">Violated</p>
          </div>
        </div>

        {/* Policy cards */}
        <div className="space-y-3">
          {policies.map((policy) => {
            const isCompliant = policy.status === 'compliant';
            return (
              <div key={policy.id} className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isCompliant ? 'bg-emerald-50' : 'bg-red-50'}`}>
                      {isCompliant ? <CheckCircle className="w-5 h-5 text-emerald-600" /> : <XCircle className="w-5 h-5 text-red-600" />}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{policy.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                          {typeLabels[policy.type] || policy.type}
                        </span>
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                          policy.mode === 'enforce' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                        }`}>
                          {policy.mode}
                        </span>
                      </div>
                    </div>
                  </div>
                  <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${
                    isCompliant ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {isCompliant ? <CheckCircle className="w-3.5 h-3.5" /> : <AlertTriangle className="w-3.5 h-3.5" />}
                    {isCompliant ? 'Compliant' : `${policy.violations} violations`}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm mt-3 pt-3 border-t border-gray-100">
                  <div>
                    <p className="text-xs text-gray-500">Target</p>
                    <p className="text-gray-700">{policy.target}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Threshold</p>
                    <p className="text-gray-700 font-mono text-xs">{policy.threshold}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </DemoShell>
  );
}
