"use client";

const OPTIONS = [
  { value: "500-1000", label: "€500 – €1,000/mo", desc: "Side income", emoji: "🌿" },
  { value: "1000-3000", label: "€1,000 – €3,000/mo", desc: "Replace a part-time job", emoji: "💼" },
  { value: "3000-5000", label: "€3,000 – €5,000/mo", desc: "Full-time income", emoji: "🎯" },
  { value: "5000-10000", label: "€5,000 – €10,000/mo", desc: "High earner", emoji: "🔥" },
  { value: "10000+", label: "€10,000+/mo", desc: "Scale to six figures", emoji: "🚀" },
];

interface Props { value: string; onChange: (v: string) => void; }

export function StepIncome({ value, onChange }: Props) {
  return (
    <div className="space-y-3">
      {OPTIONS.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={`w-full flex items-center gap-4 p-4 rounded-xl border text-left transition-all ${
            value === opt.value
              ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-950"
              : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
          }`}
        >
          <span className="text-2xl">{opt.emoji}</span>
          <div>
            <p className={`font-medium text-sm ${value === opt.value ? "text-indigo-700 dark:text-indigo-300" : "text-gray-900 dark:text-white"}`}>{opt.label}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{opt.desc}</p>
          </div>
          {value === opt.value && <div className="ml-auto w-4 h-4 rounded-full bg-indigo-600 flex items-center justify-center"><div className="w-1.5 h-1.5 rounded-full bg-white" /></div>}
        </button>
      ))}
    </div>
  );
}
