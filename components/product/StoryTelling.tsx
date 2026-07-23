/**
 * StoryTelling - "왜 이 점수인가" 스토리텔링 영역
 * -------------------------------------------------------------
 * 상품 상세 모달에서, 이 상품이 현재 프로젝트의 지역/한국 적합도와
 * 왜 잘 맞는지를 사용자 입력 기준으로 한 줄씩 설명한다. (PRD 7.3, 7.2.1)
 * 점수 계산 근거를 사람이 읽는 문장으로 풀어 주는 역할.
 */
import type { Product, Project } from "@/lib/types";
import {
  getLocalFitReason,
  getKoreanFitReason,
  shouldShowKoreanFit,
} from "@/lib/scoring";

interface StoryTellingProps {
  product: Product;
  project: Project;
}

export default function StoryTelling({ product, project }: StoryTellingProps) {
  const showKorean = shouldShowKoreanFit(project);

  return (
    <div className="rounded-card bg-thumb p-3 text-sm">
      <p className="mb-1 font-bold">이 상품이 잘 맞는 이유</p>
      {/* 로컬 핏 근거 */}
      <p className="text-ink">
        <span className="mr-1">📍</span>
        {getLocalFitReason(product, project)}
      </p>
      {/* 한국 핏 근거 (해외/혼합 참가자일 때만) */}
      {showKorean && (
        <p className="mt-1 text-ink">
          <span className="mr-1">🇰🇷</span>
          {getKoreanFitReason(product)}
        </p>
      )}
    </div>
  );
}
