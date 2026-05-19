'use client';

import { motion } from 'framer-motion';
import { 
  Cloud, 
  Bot, 
  Zap, 
  Shield, 
  TrendingUp, 
  Code,
  Activity,
  Settings
} from 'lucide-react';

const features = [
  {
    icon: Cloud,
    title: 'Multi-Cloud Dashboard',
    description: 'Unified view of AWS, Azure, and GCP costs with trend charts, provider breakdowns, and AI/GPU spend tracking.',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
  },
  {
    icon: Bot,
    title: 'AI Agent Analysis',
    description: 'Natural language queries processed by specialist AI agents with streaming reasoning traces and multi-turn conversations.',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
  },
  {
    icon: Settings,
    title: '56+ Detection Rules',
    description: 'Built-in rules for idle EC2, oversized RDS, unused EBS, old generation instances, Graviton migration, and more.',
    color: 'text-primary-600',
    bgColor: 'bg-primary-50',
  },
  {
    icon: Zap,
    title: 'Automated Remediations',
    description: '3-mode execution: direct AWS API actions, Terraform GitHub PRs, or ServiceNow tickets with configurable thresholds.',
    color: 'text-warning-600',
    bgColor: 'bg-warning-50',
  },
  {
    icon: Activity,
    title: 'Anomaly Detection',
    description: 'Statistical anomaly detection with LLM root cause analysis, severity classification, and Slack/email alerts.',
    color: 'text-red-600',
    bgColor: 'bg-red-50',
  },
  {
    icon: TrendingUp,
    title: 'Forecasting & Budgets',
    description: '30-day cost forecasts with confidence bounds, budget tracking with utilization alerts, and annual projections.',
    color: 'text-success-600',
    bgColor: 'bg-success-50',
  },
];

export function FeaturesGrid() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Everything you need to optimize cloud costs
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From real-time monitoring to automated execution, FinOpsMind gives you complete control over your multi-cloud spend.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow"
            >
              <div className={`w-12 h-12 ${feature.bgColor} rounded-lg flex items-center justify-center mb-4`}>
                <feature.icon className={feature.color} size={24} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
