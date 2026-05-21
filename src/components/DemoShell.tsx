import { type ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Bot, Lightbulb, SlidersHorizontal, Settings,
  AlertTriangle, TrendingUp, Database, Tag, Shield, BarChart3, DollarSign,
  Wrench,
} from 'lucide-react';

const sidebarLinks = [
  { to: '/demo/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/demo/agent', icon: Bot, label: 'AI Agent' },
  { to: '/demo/recommendations', icon: Lightbulb, label: 'Recommendations' },
  { to: '/demo/remediations', icon: Wrench, label: 'Remediations' },
  { to: '/demo/anomalies', icon: AlertTriangle, label: 'Anomalies' },
  { to: '/demo/forecasts', icon: TrendingUp, label: 'Forecasts' },
  { to: '/demo/budgets', icon: DollarSign, label: 'Budgets' },
  { to: '/demo/rules', icon: SlidersHorizontal, label: 'Dynamic Rules' },
  { to: '/demo/inventory', icon: Database, label: 'Inventory' },
  { to: '/demo/allocations', icon: Tag, label: 'Allocations' },
  { to: '/demo/policies', icon: Shield, label: 'Policies' },
  { to: '/demo/reports', icon: BarChart3, label: 'Reports' },
  { to: '/demo/settings', icon: Settings, label: 'Settings' },
];

export default function DemoShell({ children }: { children: ReactNode }) {
  const location = useLocation();

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      {/* Sidebar */}
      <aside className="w-56 bg-gray-50 border-r border-gray-200 shrink-0 hidden lg:block">
        <div className="p-4">
          <div className="flex items-center gap-2 px-3 py-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Demo Mode</span>
          </div>
          <nav className="space-y-0.5">
            {sidebarLinks.map((link) => {
              const active = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors ${
                    active
                      ? 'bg-primary-50 text-primary-700 font-medium'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <link.icon className="w-4 h-4" />
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 bg-gray-100 p-6 overflow-auto">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
