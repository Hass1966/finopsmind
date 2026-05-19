import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-600 to-primary-700 flex items-center justify-center">
                <span className="text-white font-bold text-sm">F</span>
              </div>
              <span className="font-bold text-lg text-gray-900">
                FinOps<span className="text-primary-600">Mind</span>
              </span>
            </div>
            <p className="text-sm text-gray-600">
              AI-powered cloud cost intelligence for AWS, Azure, and GCP.
            </p>
          </div>

          {/* Product */}
          <div>
            <h5 className="font-semibold text-gray-900 mb-3">Product</h5>
            <div className="space-y-2">
              <Link href="/features" className="block text-sm text-gray-600 hover:text-gray-900">
                Features
              </Link>
              <Link href="/pricing" className="block text-sm text-gray-600 hover:text-gray-900">
                Pricing
              </Link>
              <Link href="/demo" className="block text-sm text-gray-600 hover:text-gray-900">
                Interactive Demo
              </Link>
            </div>
          </div>

          {/* Company */}
          <div>
            <h5 className="font-semibold text-gray-900 mb-3">Company</h5>
            <div className="space-y-2">
              <Link href="/about" className="block text-sm text-gray-600 hover:text-gray-900">
                About
              </Link>
              <Link href="/privacy" className="block text-sm text-gray-600 hover:text-gray-900">
                Privacy Policy
              </Link>
              <a href="mailto:hello@finopsmind.cloud" className="block text-sm text-gray-600 hover:text-gray-900">
                Contact
              </a>
            </div>
          </div>

          {/* Resources */}
          <div>
            <h5 className="font-semibold text-gray-900 mb-3">Resources</h5>
            <div className="space-y-2">
              <a href="mailto:hello@finopsmind.cloud?subject=Enterprise Enquiry" className="block text-sm text-gray-600 hover:text-gray-900">
                Enterprise Enquiry
              </a>
              <a href="https://docs.finopsmind.cloud" className="block text-sm text-gray-600 hover:text-gray-900" target="_blank" rel="noopener noreferrer">
                Documentation
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-600">
            © {new Date().getFullYear()} FinOpsMind. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-sm text-gray-600 hover:text-gray-900">
              Privacy
            </Link>
            <Link href="/about" className="text-sm text-gray-600 hover:text-gray-900">
              About
            </Link>
            <a href="mailto:hello@finopsmind.cloud" className="text-sm text-gray-600 hover:text-gray-900">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
