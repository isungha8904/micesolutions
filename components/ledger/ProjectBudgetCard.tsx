/**
 * ProjectBudgetCard - 프로젝트 예산 카드
 * -------------------------------------------------------------
 * 예산 장부 탭에서 프로젝트별 총예산 대비 사용액을 프로그레스 바로 보여준다. (PRD 7.3)
 * 상품 자동 발주가 자기 예산을 대체하는 '실시간 예산 차감'을 시각화하는 역할.
 */
import type { Project } from "@/lib/types";
import { formatWon, formatPercent } from "@/lib/format";
import ProgressBar from "@/components/ui/ProgressBar";
import Badge from "@/components/ui/Badge";

// 참가자 유형 한글 라벨
const audienceLabel: Record<string, string> = {
  domestic: "국내",
  international: "해외",
  mixed: "혼합",
};

interface ProjectBudgetCardProps {
  project: Project;
}

export default function ProjectBudgetCard({ project }: ProjectBudgetCardProps) {
  // 예산 사용률(%) 계산
  const usedPct = project.totalBudget > 0 ? (project.spentBudget / project.totalBudget) * 100 : 0;
  const remaining = project.totalBudget - project.spentBudget;

  return (
    <div className="rounded-card border border-line bg-white p-4">
      {/* 제목 + 지역/참가자 태그 */}
      <div className="mb-2 flex items-start justify-between gap-2">
        <p className="font-bold leading-snug">{project.name}</p>
        <div className="flex shrink-0 gap-1">
          <Badge tone="neutral">{project.eventRegion}</Badge>
          <Badge tone="neutral">{audienceLabel[project.audienceType]}</Badge>
        </div>
      </div>

      {/* 사용액 / 총예산 */}
      <div className="mb-1.5 flex items-baseline justify-between text-sm">
        <span className="font-extrabold">{formatWon(project.spentBudget)}</span>
        <span className="text-subtle">/ {formatWon(project.totalBudget)}</span>
      </div>

      {/* 진행률 막대 */}
      <ProgressBar value={usedPct} />

      {/* 사용률 + 잔여 */}
      <div className="mt-1.5 flex items-center justify-between text-[11px] text-subtle">
        <span>사용률 {formatPercent(usedPct)}</span>
        <span>잔여 {formatWon(remaining)}</span>
      </div>
    </div>
  );
}
