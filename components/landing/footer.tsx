import Link from "next/link";
import { Zap } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative border-t border-gray-100 dark:border-gray-900 pt-14 pb-8 px-4">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2 mb-4 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">IdeaForge AI</span>
            </Link>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed max-w-xs">
              Find your perfect business idea in 60 seconds. Powered by Claude AI.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4 text-sm">Product</h4>
            <ul className="space-y-3">
              {[["Features", "#features"], ["Pricing", "/pricing"], ["Dashboard", "/dashboard"], ["Sign up", "/signup"]].map(([label, href]) => (
                <li key={label}>
                  <Link href={href} className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4 text-sm">Company</h4>
            <ul className="space-y-3">
              {[["About", "/about"], ["Blog", "/blog"], ["Contact", "/contact"], ["Changelog", "/changelog"]].map(([label, href]) => (
                <li key={label}>
                  <Link href={href} className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4 text-sm">Legal</h4>
            <ul className="space-y-3">
              {[["Privacy Policy", "/privacy"], ["Terms of Service", "/terms"], ["Cookie Policy", "/cookies"]].map(([label, href]) => (
                <li key={label}>
                  <Link href={href} className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-100 dark:border-gray-900 pt-8 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-gray-400 dark:text-gray-500">
            © {new Date().getFullYear()} IdeaForge AI. All rights reserved.
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500">
            Built for entrepreneurs · Powered by{" "}
            <span className="text-indigo-600 dark:text-indigo-400 font-medium">Claude AI</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
