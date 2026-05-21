import { Badge } from "@/components/ui/badge";
import { CheckCircle, TrendingUp, Calendar, DollarSign } from "lucide-react";

export function ExampleOutput() {
  return (
    <section className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-3">Example Output</p>
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Here&apos;s what your analysis looks like
          </h2>
          <p className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            A real example for a designer with 2 hours/day and a €1,000 budget.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Top recommendation */}
          <div className="rounded-2xl border border-indigo-200 dark:border-indigo-800 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/50 dark:to-purple-950/50 p-6">
            <div className="flex items-center justify-between mb-4">
              <Badge variant="default" className="bg-indigo-600">⭐ Top Recommendation</Badge>
              <Badge variant="purple" className="bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300">🔥 Trend Score: 92</Badge>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Notion Template Business</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 leading-relaxed">
              Create and sell premium Notion templates for freelancers, teams, and entrepreneurs. Your design skills perfectly position you to build beautiful, functional templates in a growing marketplace.
            </p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: DollarSign, label: "Startup Cost", value: "€200–€500" },
                { icon: TrendingUp, label: "Income Potential", value: "€2k–€8k/mo" },
                { icon: Calendar, label: "First Revenue", value: "2–3 weeks" },
                { icon: TrendingUp, label: "Difficulty", value: "2/5 (Easy)" },
              ].map((item) => (
                <div key={item.label} className="bg-white dark:bg-gray-900 rounded-xl p-3 border border-gray-100 dark:border-gray-800">
                  <p className="text-xs text-gray-500 dark:text-gray-400">{item.label}</p>
                  <p className="font-semibold text-gray-900 dark:text-white text-sm mt-0.5">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 7-day plan */}
          <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-indigo-600" />
              Your 7-Day Action Plan
            </h3>
            <div className="space-y-3">
              {[
                { day: 1, task: "Research top 10 Notion templates on Gumroad. Identify gaps." },
                { day: 2, task: "Choose your niche: freelancers, startups, or productivity." },
                { day: 3, task: "Design your first template — focus on one core use case." },
                { day: 4, task: "Create mockup screenshots and write a compelling description." },
                { day: 5, task: "Set up Gumroad account and publish your first template (€9)." },
                { day: 6, task: "Share on Twitter, Reddit r/Notion, and ProductHunt." },
                { day: 7, task: "Collect feedback, iterate, and plan your second template." },
              ].map((item) => (
                <div key={item.day} className="flex gap-3 items-start">
                  <div className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {item.day}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{item.task}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
