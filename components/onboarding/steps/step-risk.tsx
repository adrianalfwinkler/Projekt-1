"use client";

const OPTIONS = [
  {
    value: "low",
    label: "Low Risk",
    desc: "I want proven business models with predictable outcomes and minimal financial risk.",
    emoji: "🛡️",
  },
  {
    value: "medium",
    label: "Medium Risk",
    desc: "I'm comfortable with some uncertainty if the potential reward justifies it.",
    emoji: "⚖️",
  },
  {
    value: "high",
    label: "High Risk",
    desc: "I'm willing to take big bets for the chance at outsized returns.",
    emoji: "🚀",
  },
];

interface Props { value: string; onChange: (v: string) => void; }

export function StepRisk({ value, onChange }: Props) {
  return (
    <div className="space-y-3">
      {OPTIONS.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={`w-full flex items-start gap-4 p-5 rounded-xl border text-left transition-all ${
            value === opt.value
              ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-950"
              : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
          }`}
        >
          <span className="text-3xl">{opt.emoji}</span>
          <div>
            <p className={`font-semibold text-base ${value === opt.value ? "text-indigo-700 dark:text-indigo-300" : "text-gray-900 dark:text-white"}`}>{opt.label}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">{opt.desc}</p>
          </div>
          {value === opt.value && <div className="ml-auto shrink-0 w-5 h-5 rounded-full bg-indigo-600 flex items-center justify-center"><div className="w-2 h-2 rounded-full bg-white" /></div>}
        </button>
      ))}
    </div>
  );
}
