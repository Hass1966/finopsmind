import { CheckCircle, XCircle, Clock, Zap, GitPullRequest, FileText } from 'lucide-react';
import DemoShell from '../components/DemoShell';
import { remediations } from '../data/mockData';

function formatCurrency(n: number) {
  return new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', minimumFractionDigits: 0, maximumFractionDigits: 2 }).format(n);
}

function formatDate(s: string) {
  return new Date(s).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
}

const statusConfig: Record<string, { icon: typeof CheckCircle; label: string; bg: string; text: string }> = {
  pending_approval: { icon: Clock, label: 'Pending Approval', bg: 'bg-amber-100', text: 'text-amber-800' },
  approved: { icon: CheckCircle, label: 'Approved', bg: 'bg-blue-100', text: 'text-blue-800' },
  executed: { icon: Zap, label: 'Executed', bg: 'bg-emerald-100', text: 'text-emerald-800' },
  rejected: { icon: XCircle, label: 'Rejected', bg: 'bg-red-100', text: 'text-red-800' },
};

const modeIcons: Record<string, typeof Zap> = {
  aws_api: Zap,
  github_pr: GitPullRequest,
  servicenow: FileText,
};

export default function DemoRemediations() {
  const counts = {
    pending: remediations.filter((r) => r.status === 'pending_approval').length,
    approved: remediations.filter((r) => r.status === 'approved').length,
    executed: remediations.filter((r) => r.status === 'executed').length,
    rejected: remediations.filter((r) => r.status === 'rejected').length,
  };

  return (
    <DemoShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Remediations</h1>
          <p className="text-sm text-gray-500 mt-1">Approval workflow and execution tracking</p>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Pending', value: counts.pending, color: 'text-amber-600', bg: 'bg-amber-50' },
            { label: 'Approved', value: counts.approved, color: 'text-blue-600', bg: 'bg-blue-50' },
            { label: 'Executed', value: counts.executed, color: 'text-emerald-600', bg: 'bg-emerald-50' },
            { label: 'Rejected', value: counts.rejected, color: 'text-red-600', bg: 'bg-red-50' },
          ].map((s) => (
            <div key={s.label} className={`${s.bg} rounded-xl border border-gray-200 p-4 text-center`}>
              <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-xs text-gray-500">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Remediation cards */}
        <div className="space-y-4">
          {remediations.map((rem) => {
            const sc = statusConfig[rem.status] || statusConfig.pending_approval;
            const ModeIcon = modeIcons[rem.execution_mode] || Zap;
            return (
              <div key={rem.id} className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${sc.bg}`}>
                      <sc.icon className={`w-5 h-5 ${sc.text}`} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{rem.title}</h3>
                      <p className="text-xs text-gray-500 mt-0.5">
                        Requested by {rem.requested_by} &middot; {formatDate(rem.created_at)}
                      </p>
                    </div>
                  </div>
                  <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${sc.bg} ${sc.text}`}>
                    <sc.icon className="w-3.5 h-3.5" /> {sc.label}
                  </span>
                </div>

                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-1.5">
                    <span className="text-gray-500">Savings:</span>
                    <span className="font-semibold text-emerald-600">{formatCurrency(rem.estimated_savings)}/mo</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-gray-500">Risk:</span>
                    <span className={`font-semibold ${rem.risk_score > 30 ? 'text-amber-600' : 'text-emerald-600'}`}>{rem.risk_score}/100</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <ModeIcon className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">{rem.execution_mode.replace(/_/g, ' ')}</span>
                  </div>
                  {rem.terraform && (
                    <span className="inline-flex items-center gap-1 text-xs bg-violet-50 text-violet-700 px-2 py-0.5 rounded-full">
                      <FileText className="w-3 h-3" /> Terraform
                    </span>
                  )}
                </div>

                {/* Status-specific info */}
                {'approved_by' in rem && rem.approved_by && (
                  <p className="text-xs text-gray-500 mt-3 pt-3 border-t border-gray-100">
                    Approved by {rem.approved_by as string} on {formatDate(rem.approved_at as string)}
                  </p>
                )}
                {'rejected_by' in rem && rem.rejected_by && (
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <p className="text-xs text-gray-500">Rejected by {rem.rejected_by as string}</p>
                    <p className="text-xs text-red-600 mt-0.5">Reason: {rem.rejected_reason as string}</p>
                  </div>
                )}
                {'executed_at' in rem && rem.executed_at && (
                  <p className="text-xs text-gray-500 mt-3 pt-3 border-t border-gray-100">
                    Executed on {formatDate(rem.executed_at as string)}
                  </p>
                )}

                {/* Action buttons for pending */}
                {rem.status === 'pending_approval' && (
                  <div className="flex gap-2 mt-4 pt-3 border-t border-gray-100">
                    <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 text-sm font-medium flex items-center gap-1">
                      <CheckCircle className="w-4 h-4" /> Approve
                    </button>
                    <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm font-medium flex items-center gap-1">
                      <XCircle className="w-4 h-4" /> Reject
                    </button>
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
