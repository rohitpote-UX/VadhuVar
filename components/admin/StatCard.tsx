interface StatCardProps {
  label: string;
  value: number;
  deltaText?: string;
  deltaType?: "positive" | "neutral" | "highlight";
}

export function StatCard({
  label,
  value,
  deltaText,
  deltaType = "neutral",
}: StatCardProps) {
  const deltaStyles = {
    positive: "text-[var(--success)]",
    neutral: "text-[var(--ink-muted)]",
    highlight: "text-[var(--accent)] font-medium",
  };

  return (
    <div className="bg-[var(--surface)] border border-[var(--line)] rounded-[var(--radius-card)] p-5 sm:p-6 shadow-xs flex flex-col justify-between">
      <span className="text-xs uppercase tracking-wider text-[var(--ink-muted)] font-medium">
        {label}
      </span>

      <div className="mt-2 mb-1 flex items-baseline justify-between">
        <span className="font-serif text-3xl sm:text-4xl text-[var(--ink)] tabular-nums font-normal">
          {value}
        </span>
      </div>

      {deltaText && (
        <span className={`text-xs mt-1 ${deltaStyles[deltaType]}`}>
          {deltaText}
        </span>
      )}
    </div>
  );
}
