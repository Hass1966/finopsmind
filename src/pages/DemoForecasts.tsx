import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import { TrendingUp, Download } from 'lucide-react';
import DemoShell from '../components/DemoShell';
import { forecastData } from '../data/mockData';

function formatCurrency(n: number) {
  return `£${n.toLocaleString('en-GB')}`;
}

function formatDateShort(s: string) {
  return new Date(s).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}

function ForecastTooltip({ active, payload, label }: { active?: boolean; payload?: { name: string; value: number; color: string }[]; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white px-3 py-2 rounded-lg shadow-lg border border-gray-200 text-xs">
      <p className="text-gray-500 mb-1">{label}</p>
      {payload.map((p) => (
        <p key={p.name} className="font-semibold" style={{ color: p.color }}>
          {p.name}: {formatCurrency(p.value)}
        </p>
      ))}
    </div>
  );
}

export default function DemoForecasts() {
  const chartData = forecastData.map((d) => ({
    date: formatDateShort(d.date),
    predicted: d.predicted,
    upper_bound: d.upper_bound,
    lower_bound: d.lower_bound,
  }));

  const totalPredicted = forecastData.reduce((s, d) => s + d.predicted, 0);
  const avgDaily = Math.round(totalPredicted / forecastData.length);

  return (
    <DemoShell>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Forecasts</h1>
            <p className="text-sm text-gray-500 mt-1">30-day cost predictions with confidence bounds</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50">
            <Download className="w-4 h-4" /> Export CSV
          </button>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-sm font-medium text-gray-500">30-Day Forecast</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalPredicted)}</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-emerald-600" />
              </div>
              <span className="text-sm font-medium text-gray-500">Avg Daily Cost</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{formatCurrency(avgDaily)}</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-violet-50 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-violet-600" />
              </div>
              <span className="text-sm font-medium text-gray-500">Annual Projection</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalPredicted * 12)}</p>
          </div>
        </div>

        {/* Forecast chart */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
          <h2 className="text-sm font-semibold text-gray-900 mb-4">30-Day Cost Forecast</h2>
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={chartData} margin={{ top: 4, right: 4, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="forecastGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.15} />
                  <stop offset="100%" stopColor="#3B82F6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="boundsGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#94A3B8" stopOpacity={0.1} />
                  <stop offset="100%" stopColor="#94A3B8" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
              <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false}
                tickFormatter={(v: number) => `£${(v / 1000).toFixed(1)}k`} />
              <Tooltip content={<ForecastTooltip />} />
              <Area type="monotone" dataKey="upper_bound" stroke="#CBD5E1" strokeWidth={1} strokeDasharray="4 4" fill="url(#boundsGradient)" name="Upper Bound" />
              <Area type="monotone" dataKey="lower_bound" stroke="#CBD5E1" strokeWidth={1} strokeDasharray="4 4" fill="none" name="Lower Bound" />
              <Area type="monotone" dataKey="predicted" stroke="#3B82F6" strokeWidth={2} fill="url(#forecastGradient)" dot={false} name="Predicted" />
            </AreaChart>
          </ResponsiveContainer>
          <div className="flex items-center justify-center gap-6 mt-3 text-xs text-gray-500">
            <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-blue-500 rounded" /> Predicted</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-gray-300 rounded border-dashed" /> Confidence Bounds</span>
          </div>
        </div>
      </div>
    </DemoShell>
  );
}
