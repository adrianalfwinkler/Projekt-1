import { Lightbulb, TrendingUp, Map, DollarSign, FileText, Zap, ArrowRight } from "lucide-react";
import Link from "next/link";

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-3">What you get</p>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">
            Not just ideas.<br />
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">A complete business blueprint.</span>
          </h2>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            IdeaForge AI gives you everything you need to go from curious to launched.
          </p>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">

          {/* Card 1 — Wide (spans 4) */}
          <div className="md:col-span-4 group relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-7 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all hover:shadow-xl hover:shadow-indigo-500/5">
            <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-indigo-100 dark:from-indigo-950/50 to-transparent rounded-bl-full opacity-60 group-hover:opacity-100 transition-opacity" />
            <div className="w-11 h-11 rounded-xl bg-indigo-100 dark:bg-indigo-950 flex items-center justify-center mb-4">
              <Lightbulb className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">10 Personalized Business Ideas</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed max-w-sm">
              Not generic advice. AI matches thousands of business models against your exact skills, interests, time, and budget — then ranks the top 10 for you.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {["Matches your skills", "Budget-aware", "Trend-scored", "Ranked by fit"].map(tag => (
                <span key={tag} className="text-xs px-3 py-1 rounded-full border border-indigo-100 dark:border-indigo-900 bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Card 2 — Narrow (spans 2) */}
          <div className="md:col-span-2 group relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-950/40 dark:to-indigo-950/40 p-7 hover:border-purple-300 dark:hover:border-purple-700 transition-all hover:shadow-xl hover:shadow-purple-500/5">
            <div className="w-11 h-11 rounded-xl bg-purple-100 dark:bg-purple-950 flex items-center justify-center mb-4">
              <TrendingUp className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Market Analysis</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
              Real market sizing, competition level, and your competitive advantages — no fluff.
            </p>
          </div>

          {/* Card 3 — Narrow (spans 2) */}
          <div className="md:col-span-2 group relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-7 hover:border-blue-300 dark:hover:border-blue-700 transition-all hover:shadow-xl hover:shadow-blue-500/5">
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-blue-50 dark:from-blue-950/40 to-transparent rounded-tl-full" />
            <div className="w-11 h-11 rounded-xl bg-blue-100 dark:bg-blue-950 flex items-center justify-center mb-4">
              <Map className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">7-Day Action Plan</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
              Day-by-day tasks from idea to first customer, broken into achievable steps.
            </p>
          </div>

          {/* Card 4 — Wide (spans 4) */}
          <div className="md:col-span-4 group relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-7 hover:border-green-300 dark:hover:border-green-700 transition-all hover:shadow-xl hover:shadow-green-500/5">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-teal-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex items-start gap-5">
              <div className="w-11 h-11 rounded-xl bg-green-100 dark:bg-green-950 flex items-center justify-center shrink-0">
                <DollarSign className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Revenue Roadmap to Month 12</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                  Clear milestones at months 1, 3, 6, and 12 with realistic income expectations and the key actions needed to hit each stage.
                </p>
              </div>
              <div className="hidden sm:grid grid-cols-4 gap-2 shrink-0">
                {["M1", "M3", "M6", "M12"].map((m, i) => (
                  <div key={m} className="text-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold mb-1 ${i === 3 ? 'bg-green-500 text-white' : 'bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-300'}`}>{m}</div>
                    <div className="text-[10px] text-gray-400">→</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Card 5 (spans 3) */}
          <div className="md:col-span-3 group rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-7 hover:border-orange-300 dark:hover:border-orange-700 transition-all hover:shadow-xl hover:shadow-orange-500/5">
            <div className="w-11 h-11 rounded-xl bg-orange-100 dark:bg-orange-950 flex items-center justify-center mb-4">
              <FileText className="w-5 h-5 text-orange-600 dark:text-orange-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Professional PDF Export</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
              Download your full analysis as a polished PDF — perfect for sharing with co-founders, investors, or keeping as a personal reference.
            </p>
          </div>

          {/* Card 6 (spans 3) */}
          <div className="md:col-span-3 group relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 bg-gradient-to-br from-indigo-600 to-purple-700 p-7 hover:shadow-xl hover:shadow-indigo-500/20 transition-all">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:24px_24px]" />
            <div className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center mb-4">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">60-Second Generation</h3>
            <p className="text-indigo-100 text-sm leading-relaxed mb-5">
              Answer 7 questions. Get a complete business analysis with market data, monetization plan, and action steps — all in under a minute.
            </p>
            <Link href="/signup" className="inline-flex items-center gap-1.5 text-sm font-semibold text-white hover:gap-3 transition-all">
              Try it free <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
