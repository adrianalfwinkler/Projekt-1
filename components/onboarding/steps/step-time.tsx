"use client";

const OPTIONS = [
  { value: "1", label: "1 hour/day", desc: "Side project pace", emoji: "⏰" },
  { value: "2-3", label: "2–3 hours/day", desc: "Serious side hustle", emoji: "⚡" },
  { value: "4-6", label: "4–6 hours/day", desc: "Part-time startup", emoji: "🔥" },
  { value: "8+", label: "8+ hours/day", desc: "Full commitment", emoji: "🚀" },
];

interface Props { value: string; onChange: (v: string) => void; }

export function StepTime({ value, onChange }: Props) {
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
