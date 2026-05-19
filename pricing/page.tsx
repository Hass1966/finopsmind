import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { PricingSection } from '@/components/sections/PricingSection';

export default function PricingPage() {
  return (
    <>
      <Navigation />
      <main className="pt-24">
        <PricingSection />
        
        {/* FAQ Section */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-8">
              {[
                {
                  q: 'How does the 14-day free trial work?',
                  a: 'Sign up with your email, connect your cloud providers, and get full access to all Pro features for 14 days. No credit card required. After the trial, choose a plan or continue with the free Starter tier.'
                },
                {
                  q: 'What cloud providers do you support?',
                  a: 'We support AWS, Microsoft Azure, and Google Cloud Platform. All three providers are included in every plan.'
                },
                {
                  q: 'Is my data secure?',
                  a: 'Yes. We use AES-256-GCM encryption for credentials, TLS for data in transit, and follow industry best practices. We never store your actual cloud credentials — only read-only API tokens.'
                },
                {
                  q: 'Can I customize the detection rules?',
                  a: 'Absolutely. On the Pro plan, you can write custom YAML rules, override thresholds on any built-in rule, and disable rules that don\'t apply to your environment.'
                },
                {
                  q: 'How does auto-execution work?',
                  a: 'You set maximum savings and risk thresholds. Recommendations below those limits execute automatically via your chosen mode (AWS API, GitHub PR, or ServiceNow). High-risk changes always require approval.'
                },
                {
                  q: 'What happens if something breaks?',
                  a: 'Every change includes a rollback plan. We track the exact state before modification and can revert automatically. Plus, you control which environments are eligible for automation.'
                },
                {
                  q: 'Do you offer annual plans?',
                  a: 'Yes! Contact us for annual pricing with a discount. Enterprise customers typically prefer annual contracts with custom terms.'
                },
                {
                  q: 'Can I export my data?',
                  a: 'Yes. All reports and dashboards support CSV and JSON export. You own your data and can export it anytime.'
                }
              ].map((faq) => (
                <div key={faq.q} className="border-b border-gray-200 pb-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{faq.q}</h3>
                  <p className="text-gray-600">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
