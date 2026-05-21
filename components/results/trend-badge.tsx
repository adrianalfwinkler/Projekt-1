interface Props { score: number; }

export function TrendBadge({ score }: Props) {
  const color = score >= 80 ? "bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300 border-orange-200 dark:border-orange-800"
    : score >= 60 ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800"
    : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 border-gray-200 dark:border-gray-700";
  const emoji = score >= 80 ? "🔥" : score >= 60 ? "📈" : "📊";
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border ${color}`}>
      {emoji} Trend Score: {score}
    </span>
  );
}
