import { useState } from 'react';
import { Settings, Zap, CheckCircle, GitPullRequest, FileText, Cpu } from 'lucide-react';
import DemoShell from '../components/DemoShell';
import { autoExecConfig } from '../data/mockData';

const CATEGORY_LABELS: Record<string, string> = {
  idle_resource: 'Idle Resources',
  rightsizing: 'Rightsizing',
  unused_resource: 'Unused Resource',
  old_generation: 'Old Generation',
  unused_ebs: 'Unused EBS',
  unused_eip: 'Unused EIP',
  idle_rds: 'Idle RDS',
  idle_elb: 'Idle ELB',
};

const ALL_CATEGORIES = Object.keys(CATEGORY_LABELS);

export default function DemoSettings() {
  const [config, setConfig] = useState(autoExecConfig);

  return (
    <DemoShell>
      <div className="max-w-3xl space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-sm text-gray-500 mt-1">Organisation configuration and auto-execution engine</p>
        </div>

        {/* General settings */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <div className="flex items-center gap-2 mb-5">
            <Settings className="w-5 h-5 text-gray-400" />
            <h2 className="font-semibold text-gray-900">General Settings</h2>
          </div>
          <div className="grid gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Default Currency</label>
              <select className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white" defaultValue="GBP">
                <option value="GBP">GBP - British Pound</option>
                <option value="USD">USD - US Dollar</option>
                <option value="EUR">EUR - Euro</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Timezone</label>
              <select className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white" defaultValue="Europe/London">
                <option value="Europe/London">Europe/London</option>
                <option value="US/Eastern">US/Eastern</option>
                <option value="US/Pacific">US/Pacific</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Data Retention</label>
              <select className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white" defaultValue="365">
                <option value="90">90 days</option>
                <option value="180">6 months</option>
                <option value="365">1 year</option>
                <option value="730">2 years</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-700">Email Alerts</p>
                <p className="text-xs text-gray-500">Receive alerts for anomalies and budget breaches</p>
              </div>
              <div className="w-10 h-6 bg-primary-500 rounded-full relative cursor-pointer">
                <div className="absolute right-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Slack Webhook URL</label>
              <input type="text" placeholder="https://hooks.slack.com/services/..." defaultValue="https://hooks.slack.com/services/T02.../B04.../xxxx"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm font-mono" />
            </div>
          </div>
        </div>

        {/* Auto-execution engine */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <div className="flex items-center gap-2 mb-5">
            <Zap className="w-5 h-5 text-amber-500" />
            <h2 className="font-semibold text-gray-900">Auto-Execution Engine</h2>
          </div>

          <div className="space-y-5">
            {/* Enable toggle */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-700">Enable Auto-Execution</p>
                <p className="text-xs text-gray-500">Automatically execute recommendations below thresholds</p>
              </div>
              <button
                onClick={() => setConfig({ ...config, enabled: !config.enabled })}
                className={`w-10 h-6 rounded-full relative transition-colors ${config.enabled ? 'bg-amber-500' : 'bg-gray-300'}`}
              >
                <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${config.enabled ? 'right-0.5' : 'left-0.5'}`} />
              </button>
            </div>

            {/* Max savings slider */}
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Max Savings Threshold</span>
                <span className="font-mono font-semibold text-gray-900">£{config.max_savings_gbp}</span>
              </div>
              <input
                type="range" min="100" max="2000" step="100"
                value={config.max_savings_gbp}
                onChange={(e) => setConfig({ ...config, max_savings_gbp: Number(e.target.value) })}
                className="w-full accent-primary-600"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>£100</span><span>£2,000</span>
              </div>
            </div>

            {/* Max risk score */}
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Max Risk Score</span>
                <span className="font-mono font-semibold text-gray-900">{config.max_risk_score} / 100</span>
              </div>
              <input
                type="range" min="10" max="80" step="5"
                value={config.max_risk_score}
                onChange={(e) => setConfig({ ...config, max_risk_score: Number(e.target.value) })}
                className="w-full accent-amber-500"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>10 (strict)</span><span>80 (permissive)</span>
              </div>
            </div>

            {/* Allowed categories */}
            <div>
              <span className="text-sm font-medium text-gray-700 block mb-2">Allowed Categories</span>
              <div className="flex flex-wrap gap-2">
                {ALL_CATEGORIES.map((cat) => {
                  const active = config.allowed_categories.includes(cat);
                  return (
                    <button
                      key={cat}
                      onClick={() => setConfig({
                        ...config,
                        allowed_categories: active
                          ? config.allowed_categories.filter((c) => c !== cat)
                          : [...config.allowed_categories, cat],
                      })}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                        active ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-gray-50 text-gray-500 border border-gray-200'
                      }`}
                    >
                      {active && <CheckCircle className="w-3 h-3" />}
                      {CATEGORY_LABELS[cat] || cat}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Execution mode */}
            <div>
              <span className="text-sm font-medium text-gray-700 block mb-2">Execution Mode</span>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: 'aws_api', label: 'AWS API', icon: Cpu, desc: 'Direct SDK calls' },
                  { value: 'github_pr', label: 'GitHub PR', icon: GitPullRequest, desc: 'Terraform PRs' },
                  { value: 'servicenow', label: 'ServiceNow', icon: FileText, desc: 'Incident tickets' },
                ].map((mode) => (
                  <button
                    key={mode.value}
                    onClick={() => setConfig({ ...config, execution_mode: mode.value })}
                    className={`flex flex-col items-center gap-1.5 py-3 rounded-xl border transition-colors ${
                      config.execution_mode === mode.value
                        ? 'border-primary-300 bg-primary-50 text-primary-700'
                        : 'border-gray-200 text-gray-500 hover:border-gray-300'
                    }`}
                  >
                    <mode.icon className="w-5 h-5" />
                    <span className="text-xs font-medium">{mode.label}</span>
                    <span className="text-[10px] text-gray-400">{mode.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Daily limit */}
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Daily Execution Limit</span>
                <span className="font-mono font-semibold text-gray-900">{config.daily_execution_limit}</span>
              </div>
              <input
                type="range" min="1" max="50" step="1"
                value={config.daily_execution_limit}
                onChange={(e) => setConfig({ ...config, daily_execution_limit: Number(e.target.value) })}
                className="w-full accent-primary-600"
              />
            </div>

            {/* Excluded environments */}
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Excluded Environments</label>
              <div className="flex flex-wrap gap-2">
                {config.excluded_environments.map((env) => (
                  <span key={env} className="inline-flex items-center gap-1 px-2.5 py-1 bg-red-50 text-red-700 rounded-full text-xs font-medium border border-red-200">
                    {env} &times;
                  </span>
                ))}
              </div>
            </div>

            {/* MFA toggle */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <div>
                <p className="text-sm font-medium text-gray-700">Require MFA for Production</p>
                <p className="text-xs text-gray-500">Additional authentication for production changes</p>
              </div>
              <div className={`w-10 h-6 rounded-full relative ${config.require_mfa_for_production ? 'bg-primary-500' : 'bg-gray-300'}`}>
                <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow ${config.require_mfa_for_production ? 'right-0.5' : 'left-0.5'}`} />
              </div>
            </div>
          </div>
        </div>

        {/* Save button */}
        <div className="flex justify-end">
          <button className="px-6 py-2.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700 text-sm font-medium">
            Save Settings
          </button>
        </div>
      </div>
    </DemoShell>
  );
}
