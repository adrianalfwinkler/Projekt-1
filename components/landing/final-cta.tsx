import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export function FinalCta() {
  return (
    <section className="py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="relative overflow-hidden rounded-3xl bg-gray-950 dark:bg-gray-900 border border-gray-800 p-12 sm:p-16 text-center">
          {/* Background orbs */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
          {/* Grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

          <div className="relative">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-800 bg-indigo-950/80 text-indigo-300 text-sm font-medium mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              Free to start. No credit card.
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-5 tracking-tight leading-tight">
              Your business idea is<br />
              <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">
                waiting to be found.
              </span>
            </h2>
            <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
              Join 2,400+ entrepreneurs who used IdeaForge AI to discover their perfect business idea and take their first step toward building it.
            </p>
            <Button
              size="xl"
              className="bg-white text-gray-900 hover:bg-gray-100 shadow-2xl shadow-white/10 gap-2 group font-semibold"
              asChild
            >
              <Link href="/signup">
                Start for Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <p className="text-gray-500 text-sm mt-4">7-day money-back guarantee on paid plans.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
