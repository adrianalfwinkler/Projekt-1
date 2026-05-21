"use client";

const OPTIONS = [
  { value: "saas", label: "SaaS / Software", desc: "Recurring subscription revenue", emoji: "💻" },
  { value: "freelance", label: "Freelance / Services", desc: "Sell your skills directly", emoji: "🎯" },
  { value: "content", label: "Content / Creator", desc: "YouTube, newsletter, courses", emoji: "📸" },
  { value: "ecommerce", label: "E-commerce / Products", desc: "Physical or digital products", emoji: "🛍️" },
  { value: "agency", label: "Agency / Consulting", desc: "Help businesses grow", emoji: "📊" },
  { value: "marketplace", label: "Marketplace / Platform", desc: "Connect buyers and sellers", emoji: "🤝" },
];

interface Props { value: string; onChange: (v: string) => void; }

export function StepModel({ value, onChange }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {OPTIONS.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={`flex items-start gap-3 p-4 rounded-xl border text-left transition-all ${
            value === opt.value
              ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-950"
              : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
          }`}
        >
          <span className="text-xl mt-0.5">{opt.emoji}</span>
          <div>
            <p className={`font-medium text-sm ${value === opt.value ? "text-indigo-700 dark:text-indigo-300" : "text-gray-900 dark:text-white"}`}>{opt.label}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{opt.desc}</p>
          </div>
        </button>
      ))}
    </div>
  );
}
