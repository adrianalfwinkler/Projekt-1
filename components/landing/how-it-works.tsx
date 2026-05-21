import { ClipboardList, Cpu, BarChart2, Rocket } from "lucide-react";

const steps = [
  {
    icon: ClipboardList,
    number: "01",
    title: "Answer 7 quick questions",
    description: "Tell us your interests, skills, time, budget, and income goals. Takes less than 2 minutes. No business experience needed.",
    color: "indigo",
  },
  {
    icon: Cpu,
    number: "02",
    title: "AI analyzes your profile",
    description: "Claude AI processes your answers and evaluates thousands of business models against your specific constraints and strengths.",
    color: "purple",
  },
  {
    icon: BarChart2,
    number: "03",
    title: "Receive your full report",
    description: "Get 10 ranked ideas, market analysis, monetization strategies, a 7-day plan, and a 12-month roadmap — all in one place.",
    color: "blue",
  },
  {
    icon: Rocket,
    number: "04",
    title: "Launch with confidence",
    description: "Follow your personalized plan, download the PDF, and take your first concrete step toward building a real business.",
    color: "green",
  },
];

const iconColors: Record<string, { bg: string; icon: string; num: string }> = {
  indigo: { bg: "bg-indigo-100 dark:bg-indigo-950", icon: "text-indigo-600 dark:text-indigo-400", num: "text-indigo-200 dark:text-indigo-900" },
  purple: { bg: "bg-purple-100 dark:bg-purple-950", icon: "text-purple-600 dark:text-purple-400", num: "text-purple-200 dark:text-purple-900" },
  blue: { bg: "bg-blue-100 dark:bg-blue-950", icon: "text-blue-600 dark:text-blue-400", num: "text-blue-200 dark:text-blue-900" },
  green: { bg: "bg-green-100 dark:bg-green-950", icon: "text-green-600 dark:text-green-400", num: "text-green-200 dark:text-green-900" },
};

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-4 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-3">How it works</p>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">
            From zero to action plan<br />in 60 seconds
          </h2>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
            No business experience required. Just honest answers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Connector line (desktop) */}
          <div className="hidden lg:block absolute top-14 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-indigo-300 via-purple-300 to-green-300 dark:from-indigo-800 dark:via-purple-800 dark:to-green-800" />

          {steps.map((step) => {
            const c = iconColors[step.color];
            return (
              <div key={step.number} className="relative group">
                <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 h-full hover:border-indigo-200 dark:hover:border-indigo-800 hover:shadow-lg hover:shadow-indigo-500/5 transition-all">
                  {/* Step number bg (decorative) */}
                  <div className="flex items-center justify-between mb-4">
                    <div className={`relative w-12 h-12 rounded-xl ${c.bg} flex items-center justify-center z-10`}>
                      <step.icon className={`w-5 h-5 ${c.icon}`} />
                    </div>
                    <span className={`text-5xl font-black ${c.num} select-none leading-none`}>{step.number}</span>
                  </div>
                  <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2 leading-tight">{step.title}</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
