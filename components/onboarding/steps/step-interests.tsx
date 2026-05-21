"use client";

const INTERESTS = [
  { value: "technology", label: "Technology", emoji: "💻" },
  { value: "design", label: "Design & Creative", emoji: "🎨" },
  { value: "marketing", label: "Marketing", emoji: "📣" },
  { value: "education", label: "Education", emoji: "📚" },
  { value: "health", label: "Health & Fitness", emoji: "🏃" },
  { value: "finance", label: "Finance", emoji: "💰" },
  { value: "food", label: "Food & Cooking", emoji: "🍳" },
  { value: "travel", label: "Travel", emoji: "✈️" },
  { value: "gaming", label: "Gaming", emoji: "🎮" },
  { value: "sustainability", label: "Sustainability", emoji: "🌱" },
  { value: "ecommerce", label: "E-commerce", emoji: "🛍️" },
  { value: "content", label: "Content Creation", emoji: "📸" },
  { value: "real-estate", label: "Real Estate", emoji: "🏠" },
  { value: "social-impact", label: "Social Impact", emoji: "🤝" },
  { value: "ai", label: "AI & Automation", emoji: "🤖" },
];

interface Props {
  value: string[];
  onChange: (value: string[]) => void;
}

export function StepInterests({ value, onChange }: Props) {
  function toggle(item: string) {
    if (value.includes(item)) {
      onChange(value.filter((v) => v !== item));
    } else if (value.length < 5) {
      onChange([...value, item]);
    }
  }

  return (
    <div>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Select up to 5 interests</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {INTERESTS.map((item) => {
          const selected = value.includes(item.value);
          return (
            <button
              key={item.value}
              type="button"
              onClick={() => toggle(item.value)}
              className={`flex items-center gap-2 p-3 rounded-xl border text-sm font-medium transition-all ${
                selected
                  ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300"
                  : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 text-gray-700 dark:text-gray-300"
              }`}
            >
              <span>{item.emoji}</span>
              <span className="truncate">{item.label}</span>
            </button>
          );
        })}
      </div>
      {value.length > 0 && (
        <p className="mt-4 text-xs text-indigo-600 dark:text-indigo-400 font-medium">
          {value.length}/5 selected
        </p>
      )}
    </div>
  );
}
