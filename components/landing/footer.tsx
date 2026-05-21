import Link from "next/link";
import { Zap } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-gray-900 dark:text-white">IdeaForge AI</span>
            </Link>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Find your perfect business idea in 60 seconds with AI.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-3 text-sm">Product</h4>
            <ul className="space-y-2">
              {[["Features", "#features"], ["Pricing", "/pricing"], ["Dashboard", "/dashboard"]].map(([label, href]) => (
                <li key={label}><Link href={href} className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-3 text-sm">Company</h4>
            <ul className="space-y-2">
              {[["About", "/about"], ["Blog", "/blog"], ["Contact", "/contact"]].map(([label, href]) => (
                <li key={label}><Link href={href} className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-3 text-sm">Legal</h4>
            <ul className="space-y-2">
              {[["Privacy Policy", "/privacy"], ["Terms of Service", "/terms"], ["Cookie Policy", "/cookies"]].map(([label, href]) => (
                <li key={label}><Link href={href} className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-200 dark:border-gray-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} IdeaForge AI. All rights reserved.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Made with ❤️ for entrepreneurs
          </p>
        </div>
      </div>
    </footer>
  );
}
