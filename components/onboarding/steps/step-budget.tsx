"use client";

const OPTIONS = [
  { value: "0-100", label: "€0 – €100", desc: "Bootstrap from zero", emoji: "🌱" },
  { value: "100-500", label: "€100 – €500", desc: "Small starter budget", emoji: "💵" },
  { value: "500-2000", label: "€500 – €2,000", desc: "Solid launch budget", emoji: "💰" },
  { value: "2000-10000", label: "€2,000 – €10,000", desc: "Serious investment", emoji: "📈" },
  { value: "10000+", label: "€10,000+", desc: "Full startup funding", emoji: "🏦" },
];

interface Props { value: string; onChange: (v: string) => void; }

export function StepBudget({ value, onChange }: Props) {
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
