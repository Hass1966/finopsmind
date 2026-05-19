'use client';

import { motion } from 'framer-motion';
import { EmailSignup } from '../EmailSignup';

export function CTASection() {
  return (
    <section id="signup" className="py-20 bg-gradient-to-br from-primary-600 to-purple-700">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Stop wasting cloud budget.
            <br />
            Start saving today.
          </h2>
          <p className="text-xl text-primary-100 mb-12">
            Join teams already saving 30%+ on their cloud costs with AI-powered optimization.
          </p>

          <div className="max-w-md mx-auto bg-white rounded-xl p-8 shadow-2xl">
            <EmailSignup source="footer_cta" inline={true} />
            <p className="text-sm text-gray-500 mt-4">
              No credit card required. 14-day free trial.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
