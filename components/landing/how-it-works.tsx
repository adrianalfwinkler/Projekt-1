const steps = [
  {
    number: "01",
    title: "Answer 7 quick questions",
    description: "Tell us about your interests, skills, available time, budget, and income goals. Takes less than 2 minutes.",
    emoji: "📝",
  },
  {
    number: "02",
    title: "AI analyzes your profile",
    description: "Our Claude-powered AI processes your answers and evaluates thousands of business opportunities against your profile.",
    emoji: "🤖",
  },
  {
    number: "03",
    title: "Get your personalized report",
    description: "Receive 10 ranked business ideas, market analysis, monetization strategies, and a 7-day action plan.",
    emoji: "🚀",
  },
  {
    number: "04",
    title: "Take action with confidence",
    description: "Follow your step-by-step plan, download the PDF, and start building your business today.",
    emoji: "💪",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-4 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-3">How it works</p>
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            From idea to action plan in 60 seconds
          </h2>
          <p className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            No business experience needed. Just answer a few questions and let AI do the heavy lifting.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <div key={step.number} className="relative">
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-gradient-to-r from-indigo-300 to-transparent dark:from-indigo-800 -translate-y-1/2 z-0" />
              )}
              <div className="relative z-10 text-center p-6">
                <div className="text-4xl mb-4">{step.emoji}</div>
                <div className="text-5xl font-bold text-indigo-100 dark:text-indigo-900 mb-2 select-none">{step.number}</div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{step.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
