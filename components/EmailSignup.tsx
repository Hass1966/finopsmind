'use client';

import { useForm, ValidationError } from '@formspree/react';
import { Mail, CheckCircle } from 'lucide-react';

interface EmailSignupProps {
  tier?: string;
  source: string;
  inline?: boolean;
}

export function EmailSignup({ tier, source, inline = false }: EmailSignupProps) {
  const [state, handleSubmit] = useForm("xnjrjqvk");

  if (state.succeeded) {
    return (
      <div className={`flex items-center gap-2 ${inline ? 'justify-center' : ''} text-success-600`}>
        <CheckCircle size={20} />
        <p className="font-medium">Thanks for joining! Check your email for next steps.</p>
      </div>
    );
  }

  if (inline) {
    return (
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md">
        <input
          id="email"
          type="email"
          name="email"
          required
          placeholder="your@email.com"
          className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:outline-none"
          disabled={state.submitting}
        />
        <input type="hidden" name="tier" value={tier || ''} />
        <input type="hidden" name="source" value={source} />
        <ValidationError prefix="Email" field="email" errors={state.errors} />
        <button
          type="submit"
          disabled={state.submitting}
          className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
        >
          {state.submitting ? 'Submitting...' : 'Start Free Trial'}
        </button>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          Email Address
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            id="email"
            type="email"
            name="email"
            required
            placeholder="your@email.com"
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:outline-none"
            disabled={state.submitting}
          />
        </div>
        <ValidationError prefix="Email" field="email" errors={state.errors} />
      </div>

      <div>
        <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
          Company Name (Optional)
        </label>
        <input
          id="company"
          type="text"
          name="company"
          placeholder="Acme Corp"
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:outline-none"
          disabled={state.submitting}
        />
        <ValidationError prefix="Company" field="company" errors={state.errors} />
      </div>

      <input type="hidden" name="tier" value={tier || ''} />
      <input type="hidden" name="source" value={source} />

      <button
        type="submit"
        disabled={state.submitting}
        className="w-full px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {state.submitting ? 'Submitting...' : 'Start Free Trial'}
      </button>

      <p className="text-xs text-gray-500 text-center">
        No credit card required. 14-day free trial.
      </p>
    </form>
  );
}
