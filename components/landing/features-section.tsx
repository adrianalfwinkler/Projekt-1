import { Lightbulb, TrendingUp, Map, DollarSign, FileText, Zap } from "lucide-react";

const features = [
  {
    icon: Lightbulb,
    title: "10 Personalized Ideas",
    description: "AI generates 10 business ideas tailored to your exact skills, interests, and constraints — not generic suggestions.",
    color: "indigo",
  },
  {
    icon: TrendingUp,
    title: "Market Analysis",
    description: "Get a real assessment of market size, competition level, and your unique competitive advantages.",
    color: "purple",
  },
  {
    icon: Map,
    title: "7-Day Action Plan",
    description: "Day-by-day tasks to get from zero to your first customer, broken down into achievable steps.",
    color: "blue",
  },
  {
    icon: DollarSign,
    title: "Revenue Roadmap",
    description: "Clear milestones for month 1, 3, 6, and 12 — so you know exactly what success looks like.",
    color: "green",
  },
  {
    icon: FileText,
    title: "PDF Export",
    description: "Download your full business analysis as a professional PDF to share with co-founders or investors.",
    color: "orange",
  },
  {
    icon: Zap,
    title: "60-Second Generation",
    description: "Answer 7 quick questions and receive a complete business analysis in under a minute.",
    color: "yellow",
  },
];

const colorMap: Record<string, string> = {
  indigo: "bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400",
  purple: "bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-400",
  blue: "bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400",
  green: "bg-green-100 dark:bg-green-950 text-green-600 dark:text-green-400",
  orange: "bg-orange-100 dark:bg-orange-950 text-orange-600 dark:text-orange-400",
  yellow: "bg-yellow-100 dark:bg-yellow-950 text-yellow-600 dark:text-yellow-400",
};

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-3">Features</p>
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Everything you need to start your business
          </h2>
          <p className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            IdeaForge AI doesn&apos;t just give you ideas — it gives you a complete blueprint to build a real business.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all hover:shadow-lg hover:shadow-indigo-500/5 group"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${colorMap[feature.color]}`}>
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
