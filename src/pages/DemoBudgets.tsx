import { DollarSign, AlertTriangle, CheckCircle } from 'lucide-react';
import DemoShell from '../components/DemoShell';
import { budgets } from '../data/mockData';

function formatCurrency(n: number) {
  return new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', minimumFractionDigits: 0 }).format(n);
}

export default function DemoBudgets() {
  return (
    <DemoShell>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Budgets</h1>
            <p className="text-sm text-gray-500 mt-1">Budget tracking with utilisation alerts</p>
          </div>
          <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 text-sm font-medium">
            + Create Budget
          </button>
        </div>

        <div className="grid gap-4">
          {budgets.map((budget) => {
            const utilization = (budget.current_spend / budget.amount) * 100;
            const isWarning = utilization >= budget.alert_threshold;
            const isCritical = utilization >= 95;
            const barColor = isCritical ? 'bg-red-500' : isWarning ? 'bg-amber-500' : 'bg-emerald-500';
            const StatusIcon = isCritical ? AlertTriangle : isWarning ? AlertTriangle : CheckCircle;
            const statusColor = isCritical ? 'text-red-600' : isWarning ? 'text-amber-600' : 'text-emerald-600';

            return (
              <div key={budget.id} className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      isCritical ? 'bg-red-50' : isWarning ? 'bg-amber-50' : 'bg-emerald-50'
                    }`}>
                      <DollarSign className={`w-5 h-5 ${statusColor}`} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{budget.name}</h3>
                      <p className="text-xs text-gray-500">
                        {budget.provider === 'all' ? 'All Providers' : budget.provider.toUpperCase()} &middot; {budget.period}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <StatusIcon className={`w-4 h-4 ${statusColor}`} />
                    <span className={`text-xs font-semibold ${statusColor}`}>
                      {isCritical ? 'Critical' : isWarning ? 'Warning' : 'On Track'}
                    </span>
                  </div>
                </div>

                <div className="flex items-end justify-between mb-2">
                  <span className="text-sm text-gray-600">
                    {formatCurrency(budget.current_spend)} <span className="text-gray-400">of</span> {formatCurrency(budget.amount)}
                  </span>
                  <span className={`text-lg font-bold ${statusColor}`}>{utilization.toFixed(0)}%</span>
                </div>

                {/* Progress bar */}
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${barColor}`}
                    style={{ width: `${Math.min(utilization, 100)}%` }}
                  />
                </div>

                <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                  <span>Alert at {budget.alert_threshold}%</span>
                  <span>{formatCurrency(budget.amount - budget.current_spend)} remaining</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </DemoShell>
  );
}
