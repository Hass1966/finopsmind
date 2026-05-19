'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import Link from 'next/link';

const tiers = [
  {
    name: 'Starter',
    price: 'Free',
    description: 'Perfect for small teams getting started',
    features: [
      'Up to $10k monthly cloud spend',
      '5 built-in detection rules',
      'Basic dashboard',
      'Email notifications',
      'Community support',
    ],
    cta: 'Start Free',
    href: '/#signup',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '$499',
    period: '/month',
    description: 'For teams serious about optimization',
    features: [
      'Unlimited cloud spend',
      'All 56+ detection rules',
      'Custom YAML rules',
      '4 AI specialist agents',
      'Auto-execution engine',
      'Slack integration',
      'GitHub/ServiceNow integration',
      'Priority support',
    ],
    cta: 'Start Trial',
    href: '/#signup',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For large organizations',
    features: [
      'Everything in Pro',
      'SSO/SAML authentication',
      'Dedicated support',
      'Custom integrations',
      'SLA guarantee',
      'On-premise deployment',
      'Training & onboarding',
    ],
    cta: 'Contact Sales',
    href: 'mailto:hello@finopsmind.cloud?subject=Enterprise Enquiry',
    highlighted: false,
  },
];

export function PricingSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-xl text-gray-600">
            Start free, scale as you grow
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`bg-white rounded-2xl p-8 ${
                tier.highlighted
                  ? 'ring-2 ring-primary-600 shadow-xl scale-105'
                  : 'border border-gray-200'
              }`}
            >
              {tier.highlighted && (
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 bg-primary-600 text-white text-xs font-semibold rounded-full">
                    Most Popular
                  </span>
                </div>
              )}

              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {tier.name}
              </h3>
              <div className="mb-4">
                <span className="text-4xl font-bold text-gray-900">
                  {tier.price}
                </span>
                {tier.period && (
                  <span className="text-gray-600">{tier.period}</span>
                )}
              </div>
              <p className="text-gray-600 mb-6">{tier.description}</p>

              <Link
                href={tier.href}
                className={`block text-center px-6 py-3 rounded-lg font-semibold mb-6 transition-colors ${
                  tier.highlighted
                    ? 'bg-primary-600 hover:bg-primary-700 text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                }`}
              >
                {tier.cta}
              </Link>

              <ul className="space-y-3">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="text-success-600 flex-shrink-0 mt-0.5" size={20} />
                    <span className="text-gray-700 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
