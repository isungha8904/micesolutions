/**
 * FitScoreBadge - Fit 점수 배지 (프레젠테이션 전용)
 * -------------------------------------------------------------
 * "📍경주 로컬 핏 90%" / "🇰🇷 한국 핏 82%" 형태의 배지를 그린다.
 * 점수 계산은 lib/scoring.ts 에서 하고, 이 컴포넌트는 표시만 담당한다.
 * 점수 구간에 따라 색을 달리해(높음=강조) 한눈에 적합도를 읽게 한다.
 */
import Badge from "@/components/ui/Badge";
import { formatPercent } from "@/lib/format";

interface FitScoreBadgeProps {
  icon: string; // 앞에 붙는 이모지 (📍 / 🇰🇷)
  label: string; // 예: "경주 로컬 핏"
  score: number; // 0~100
}

export default function FitScoreBadge({ icon, label, score }: FitScoreBadgeProps) {
  // 점수 70 이상이면 포인트 색, 그 이하는 중립 회색으로 표시
  const tone = score >= 70 ? "accent" : "neutral";

  return (
    <Badge tone={tone}>
      {icon} {label} {formatPercent(score)}
    </Badge>
  );
}
