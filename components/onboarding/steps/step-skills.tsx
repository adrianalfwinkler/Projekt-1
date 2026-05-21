"use client";

const SKILLS = [
  { value: "coding", label: "Coding / Dev", emoji: "🖥️" },
  { value: "design", label: "UI/UX Design", emoji: "🎨" },
  { value: "writing", label: "Writing", emoji: "✍️" },
  { value: "marketing", label: "Digital Marketing", emoji: "📣" },
  { value: "sales", label: "Sales", emoji: "🤝" },
  { value: "video", label: "Video Editing", emoji: "🎬" },
  { value: "seo", label: "SEO", emoji: "🔍" },
  { value: "finance", label: "Finance / Accounting", emoji: "📊" },
  { value: "teaching", label: "Teaching", emoji: "👩‍🏫" },
  { value: "photography", label: "Photography", emoji: "📷" },
  { value: "social-media", label: "Social Media", emoji: "📱" },
  { value: "project-management", label: "Project Mgmt", emoji: "📋" },
];

interface Props {
  value: string[];
  onChange: (value: string[]) => void;
}

export function StepSkills({ value, onChange }: Props) {
  function toggle(item: string) {
    if (value.includes(item)) {
      onChange(value.filter((v) => v !== item));
    } else if (value.length < 4) {
      onChange([...value, item]);
    }
  }

  return (
    <div>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Select up to 4 skills</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {SKILLS.map((item) => {
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
          {value.length}/4 selected
        </p>
      )}
    </div>
  );
}
