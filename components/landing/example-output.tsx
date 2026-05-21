import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, TrendingUp, Calendar, DollarSign, Clock, ArrowRight, Star, Zap } from "lucide-react";
import Link from "next/link";

const actionPlan = [
  { day: 1, task: "Research top Notion templates on Gumroad. Identify 3 gaps in the market." },
  { day: 2, task: "Choose your niche: freelancers, startups, or personal productivity." },
  { day: 3, task: "Design your first template. Focus on one clear use case." },
  { day: 4, task: "Create mockup screenshots and write a compelling sales description." },
  { day: 5, task: "Set up Gumroad account. Publish first template at €9." },
  { day: 6, task: "Share on Twitter, Reddit r/Notion, and relevant Discord servers." },
  { day: 7, task: "Collect feedback. Iterate. Plan your second template." },
];

export function ExampleOutput() {
  return (
    <section id="example" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-3">Real example</p>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">
            Here&apos;s what your analysis looks like
          </h2>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            A real output for a designer with 2h/day and a €1,000 budget. This is what you&apos;ll receive in under 60 seconds.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Top recommendation — 3 cols */}
          <div className="lg:col-span-3 rounded-2xl border-2 border-indigo-200 dark:border-indigo-800 bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-indigo-950/60 dark:via-gray-950 dark:to-purple-950/60 p-6">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
              <span className="inline-flex items-center gap-1.5 bg-indigo-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                <Star className="w-3 h-3 fill-white" /> Top Recommendation
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-purple-700 dark:text-purple-300 bg-purple-100 dark:bg-purple-950 px-3 py-1.5 rounded-full">
                🔥 Trend Score: 92 / 100
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Notion Template Business</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-5 leading-relaxed">
              Create and sell premium Notion templates for freelancers and entrepreneurs. Your design skills perfectly position you to build beautiful, functional templates in a €45M+ and growing marketplace.
            </p>
            <div className="bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900 rounded-xl p-4 mb-5 text-sm text-indigo-700 dark:text-indigo-300 leading-relaxed">
              <strong>Why it fits you:</strong> You already have design skills. Templates have zero ongoing costs, are infinitely scalable, and can be started this week with your €200 minimum budget.
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { icon: DollarSign, label: "Startup Cost", value: "€200–€500" },
                { icon: TrendingUp, label: "Revenue Potential", value: "€2k–€8k/mo" },
                { icon: Clock, label: "First Revenue", value: "2–3 weeks" },
                { icon: Zap, label: "Difficulty", value: "2 / 5 Easy" },
              ].map((item) => (
                <div key={item.label} className="bg-white dark:bg-gray-900 rounded-xl p-3 border border-gray-100 dark:border-gray-800">
                  <item.icon className="w-4 h-4 text-indigo-500 mb-1.5" />
                  <p className="text-[10px] text-gray-400 dark:text-gray-500 mb-0.5">{item.label}</p>
                  <p className="font-semibold text-gray-900 dark:text-white text-xs">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 7-day plan — 2 cols */}
          <div className="lg:col-span-2 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
            <h3 className="text-base font-bold text-gray-900 dark:text-white mb-5 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-indigo-600" />
              Your 7-Day Launch Plan
            </h3>
            <div className="space-y-3">
              {actionPlan.map((item) => (
                <div key={item.day} className="flex gap-3 items-start group">
                  <div className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                    {item.day}
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">{item.task}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Other ideas strip */}
        <div className="mt-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 p-6">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">Other ideas in your analysis</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { name: "AI Micro-SaaS", score: 88 },
              { name: "Creator Newsletter", score: 79 },
              { name: "Online Coaching", score: 75 },
              { name: "Figma Templates", score: 72 },
              { name: "UX Audit Service", score: 69 },
              { name: "Digital Course", score: 66 },
            ].map((idea) => (
              <div key={idea.name} className="bg-white dark:bg-gray-900 rounded-xl p-3 border border-gray-100 dark:border-gray-800 text-center">
                <p className="text-xs font-semibold text-gray-800 dark:text-gray-200 mb-1 leading-tight">{idea.name}</p>
                <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-semibold">Score: {idea.score}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 text-center">
          <Button variant="gradient" size="lg" asChild className="shadow-lg shadow-indigo-500/20">
            <Link href="/signup" className="gap-2">
              Get Your Analysis Free <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
          <p className="text-sm text-gray-400 mt-3">No credit card required · Ready in 60 seconds</p>
        </div>
      </div>
    </section>
  );
}
