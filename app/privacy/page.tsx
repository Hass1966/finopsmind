import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';

export default function PrivacyPage() {
  return (
    <>
      <Navigation />
      <main className="pt-24 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
          <p className="text-sm text-gray-600 mb-12">Last updated: May 2026</p>
          
          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Introduction</h2>
              <p className="text-gray-700">
                FinOpsMind ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our cloud cost optimization platform.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Information We Collect</h2>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Cloud Infrastructure Data</h3>
              <p className="text-gray-700 mb-4">
                To provide our services, we access and analyze:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Cloud resource configurations and metadata</li>
                <li>Cost and usage data from AWS, Azure, and GCP</li>
                <li>Resource metrics (CPU, memory, network, storage utilization)</li>
                <li>CloudTrail and audit logs for analysis</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-2 mt-6">Account Information</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Email address</li>
                <li>Company name</li>
                <li>Cloud provider credentials (encrypted at rest)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">How We Use Your Information</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Analyze cloud costs and identify optimization opportunities</li>
                <li>Provide AI-powered recommendations</li>
                <li>Execute automated remediations with your authorization</li>
                <li>Generate forecasts and budget alerts</li>
                <li>Send notifications about anomalies and savings opportunities</li>
                <li>Improve our algorithms and detection rules</li>
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Data Security</h2>
              <p className="text-gray-700 mb-4">
                We implement industry-standard security measures:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>AES-256-GCM encryption for sensitive credentials</li>
                <li>TLS encryption for data in transit</li>
                <li>JWT-based authentication</li>
                <li>Regular security audits and penetration testing</li>
                <li>Access controls and audit logging</li>
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Data Retention</h2>
              <p className="text-gray-700">
                We retain your data for as long as your account is active or as needed to provide services. Cost data is typically retained for 90 days for analysis purposes. You can request deletion of your data at any time.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Third-Party Services</h2>
              <p className="text-gray-700 mb-4">
                We integrate with:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>AWS, Azure, and GCP APIs for infrastructure access</li>
                <li>GitHub for Terraform automation</li>
                <li>ServiceNow for ticketing</li>
                <li>Slack for notifications</li>
                <li>Anthropic Claude API for AI analysis</li>
              </ul>
              <p className="text-gray-700 mt-4">
                Each integration is subject to the respective provider's privacy policy.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Rights</h2>
              <p className="text-gray-700 mb-4">
                You have the right to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Access your personal data</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Export your data</li>
                <li>Opt out of marketing communications</li>
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">GDPR Compliance</h2>
              <p className="text-gray-700">
                For European users, we comply with GDPR requirements including data processing agreements, the right to be forgotten, and data portability.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Changes to This Policy</h2>
              <p className="text-gray-700">
                We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Contact Us</h2>
              <p className="text-gray-700">
                If you have questions about this Privacy Policy, please contact us at:
              </p>
              <p className="text-gray-700 mt-4">
                <a href="mailto:privacy@finopsmind.cloud" className="text-primary-600 hover:text-primary-700 font-medium">
                  privacy@finopsmind.cloud
                </a>
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
