import { Link } from 'react-router-dom';
import { Zap } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold text-white">FinOpsMind</span>
            </div>
            <p className="text-sm leading-relaxed">
              AI-powered cloud cost intelligence for AWS, Azure, and GCP.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Product</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/features" className="hover:text-white transition-colors">Features</Link></li>
              <li><Link to="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
              <li><Link to="/architecture" className="hover:text-white transition-colors">Architecture</Link></li>
              <li><Link to="/demo/dashboard" className="hover:text-white transition-colors">Live Demo</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Platform</h4>
            <ul className="space-y-2 text-sm">
              <li><span>AWS Integration</span></li>
              <li><span>Azure Integration</span></li>
              <li><span>GCP Integration</span></li>
              <li><span>API Reference</span></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><span>About</span></li>
              <li><span>Blog</span></li>
              <li><span>Contact</span></li>
              <li><span>Privacy Policy</span></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-10 pt-8 text-sm text-center">
          &copy; {new Date().getFullYear()} FinOpsMind. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
