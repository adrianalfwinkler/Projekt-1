interface Props { difficulty: number; }

export function DifficultyBar({ difficulty }: Props) {
  const labels = ["", "Very Easy", "Easy", "Medium", "Hard", "Expert"];
  const colors = ["", "text-green-600", "text-green-500", "text-yellow-500", "text-orange-500", "text-red-500"];
  return (
    <span className={`text-xs px-2 py-1 rounded-full bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 ${colors[difficulty] || "text-gray-500"}`}>
      🎯 {labels[difficulty] || `${difficulty}/5`}
    </span>
  );
}
