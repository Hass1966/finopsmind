import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';

export default function AboutPage() {
  return (
    <>
      <Navigation />
      <main className="pt-24 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">About FinOpsMind</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-600 mb-8">
              FinOpsMind is an AI-powered cloud cost intelligence platform that helps organizations optimize their AWS, Azure, and GCP spending through automated analysis and remediation.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Our Mission</h2>
            <p className="text-gray-700 mb-6">
              Cloud infrastructure has become the backbone of modern business, but managing costs across multiple providers remains a significant challenge. FinOpsMind was built to solve this problem by combining deep cloud expertise with artificial intelligence to deliver actionable insights and automated optimizations.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">What We Do</h2>
            <p className="text-gray-700 mb-4">
              FinOpsMind provides:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
              <li><strong>Multi-cloud visibility:</strong> Unified dashboards across AWS, Azure, and GCP</li>
              <li><strong>AI-powered analysis:</strong> Specialist agents that understand your infrastructure</li>
              <li><strong>Automated remediation:</strong> Execute optimizations via API, GitHub, or ServiceNow</li>
              <li><strong>56+ detection rules:</strong> Comprehensive coverage of waste patterns</li>
              <li><strong>Forecasting & budgets:</strong> Predict costs and track against targets</li>
            </ul>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Why FinOpsMind</h2>
            <p className="text-gray-700 mb-4">
              Unlike traditional FinOps tools that simply report costs, FinOpsMind:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
              <li>Understands context through AI agents with access to actual resource metrics</li>
              <li>Learns from past decisions using vector-based RAG</li>
              <li>Executes remediations automatically within configurable risk thresholds</li>
              <li>Works across all three major cloud providers</li>
              <li>Provides streaming, real-time analysis with full reasoning transparency</li>
            </ul>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Built on Enterprise Standards</h2>
            <p className="text-gray-700 mb-4">
              FinOpsMind is built with Rust for performance, PostgreSQL for reliability, and integrates with your existing tools:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
              <li>Native AWS SDK integration across 18 services</li>
              <li>Azure and GCP REST API support</li>
              <li>GitHub for Terraform automation</li>
              <li>ServiceNow for ITSM workflows</li>
              <li>Slack for real-time alerting</li>
              <li>Qdrant for AI-powered pattern learning</li>
            </ul>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Get in Touch</h2>
            <p className="text-gray-700 mb-6">
              We're here to help you optimize your cloud costs. Whether you're a small team just getting started or an enterprise managing millions in cloud spend, we'd love to hear from you.
            </p>
            <p className="text-gray-700">
              Email us at <a href="mailto:hello@finopsmind.cloud" className="text-primary-600 hover:text-primary-700 font-medium">hello@finopsmind.cloud</a>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
