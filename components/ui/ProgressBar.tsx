/**
 * ProgressBar - 진행률 막대 프리미티브
 * -------------------------------------------------------------
 * 예산 사용률 등을 0~100% 막대로 표시한다.
 * value 가 80 이상이면 경고색(레드)으로 바뀌어 예산 초과 위험을 알린다.
 */
interface ProgressBarProps {
  value: number; // 0~100
  className?: string;
}

export default function ProgressBar({ value, className = "" }: ProgressBarProps) {
  // 0~100 범위로 보정
  const pct = Math.max(0, Math.min(100, value));
  // 80% 이상이면 예산 경고색
  const barColor = pct >= 80 ? "bg-accent" : "bg-ink";

  return (
    <div className={["h-2 w-full overflow-hidden rounded-full bg-line", className].join(" ")}>
      <div
        className={["h-full rounded-full transition-all", barColor].join(" ")}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
