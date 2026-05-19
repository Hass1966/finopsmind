'use client';

import { motion } from 'framer-motion';
import { ArrowRight, PlayCircle } from 'lucide-react';
import Link from 'next/link';

export function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-purple-50 -z-10" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 text-primary-700 text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-primary-600 rounded-full animate-pulse" />
              Now supporting AWS, Azure & GCP
            </div>

            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              AI-Powered Cloud Cost{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-purple-600">
                Intelligence
              </span>
            </h1>

            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              FinOpsMind analyses your AWS, Azure, and GCP infrastructure in real-time — 
              finding waste, predicting costs, and auto-remediating issues before they drain your budget.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link
                href="/#signup"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-colors"
              >
                Start Free Trial
                <ArrowRight size={20} />
              </Link>
              <Link
                href="/demo"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-semibold rounded-lg transition-colors"
              >
                <PlayCircle size={20} />
                Try Live Demo
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8">
              <div>
                <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-700">
                  56+
                </div>
                <div className="text-sm text-gray-600 mt-1">Detection Rules</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-700">
                  4
                </div>
                <div className="text-sm text-gray-600 mt-1">AI Agents</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-700">
                  3
                </div>
                <div className="text-sm text-gray-600 mt-1">Execution Modes</div>
              </div>
            </div>
          </motion.div>

          {/* Dashboard Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-6">
              {/* Dashboard Header */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
                <h3 className="font-semibold text-gray-900">Cost Overview</h3>
                <span className="text-sm text-gray-500">Last 30 days</span>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm text-gray-600 mb-1">Total Cost</div>
                  <div className="text-2xl font-bold text-gray-900">£47,382</div>
                  <div className="text-sm text-success-600 mt-1">↓ 8.3% vs last month</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm text-gray-600 mb-1">Savings Found</div>
                  <div className="text-2xl font-bold text-primary-600">£12,450</div>
                  <div className="text-sm text-gray-500 mt-1">Potential monthly</div>
                </div>
              </div>

              {/* Simplified Chart */}
              <div className="h-32 bg-gradient-to-t from-primary-50 to-transparent rounded-lg flex items-end gap-2 px-4 pb-4">
                {[40, 55, 45, 60, 50, 65, 48, 70, 55, 62, 50].map((height, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-primary-600 rounded-t"
                    style={{ height: `${height}%` }}
                  />
                ))}
              </div>

              {/* Provider Badge */}
              <div className="mt-4 flex gap-2">
                <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full">
                  AWS: 62%
                </span>
                <span className="px-3 py-1 bg-purple-50 text-purple-700 text-xs font-medium rounded-full">
                  Azure: 28%
                </span>
                <span className="px-3 py-1 bg-warning-50 text-warning-700 text-xs font-medium rounded-full">
                  GCP: 10%
                </span>
              </div>
            </div>

            {/* Floating Alert */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="absolute -right-4 top-12 bg-white rounded-lg shadow-lg border border-warning-200 p-4 max-w-xs"
            >
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-warning-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-warning-700 text-sm">⚡</span>
                </div>
                <div>
                  <div className="font-medium text-gray-900 text-sm mb-1">
                    Anomaly Detected
                  </div>
                  <div className="text-xs text-gray-600">
                    EC2 costs spiked 40% in eu-west-1
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
