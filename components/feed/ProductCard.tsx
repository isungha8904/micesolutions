/**
 * ProductCard - 상품 카드 (홈 피드)
 * -------------------------------------------------------------
 * KREAM 카드 구조(정사각 이미지 + 굵은 상품명 + 굵은 가격)를 차용하고,
 * GiftCue 고유의 Fit 배지를 이미지 좌상단에 오버레이한다. (PRD 7.3)
 *  - localFitScore: 항상 노출
 *  - koreanFitScore: 참가자가 international/mixed 일 때만 노출 (shouldShowKoreanFit)
 *  - isPremium(VIP) 상품은 이미지를 blur 처리하고 'Pro 전용' 배지를 띄운다.
 * 카드 클릭 시 부모(onOpen)로 상품을 전달해 상세 모달을 연다.
 */
"use client";

import Image from "next/image";
import type { Product, Project } from "@/lib/types";
import { getLocalFitScore, getKoreanFitScore, shouldShowKoreanFit } from "@/lib/scoring";
import { formatWon } from "@/lib/format";
import Badge from "@/components/ui/Badge";
import FitScoreBadge from "@/components/product/FitScoreBadge";

interface ProductCardProps {
  product: Product;
  project: Project; // Fit 계산 기준이 되는 선택 프로젝트
  onOpen: (product: Product) => void;
}

export default function ProductCard({ product, project, onOpen }: ProductCardProps) {
  // 사용자 입력(프로젝트) × 상품 속성으로 Fit 점수 계산
  const localFit = getLocalFitScore(product, project);
  const koreanFit = getKoreanFitScore(product, project);
  const showKorean = shouldShowKoreanFit(project);

  return (
    <button onClick={() => onOpen(product)} className="group text-left">
      {/* 정사각 이미지 영역 (연회색 배경) */}
      <div className="relative aspect-square w-full overflow-hidden rounded-card bg-thumb">
        <Image
          src={product.image_url}
          alt={product.name}
          fill
          sizes="(max-width: 430px) 45vw, 200px"
          className={[
            "object-cover transition-transform group-active:scale-95",
            product.isPremium ? "blur-md" : "",
          ].join(" ")}
        />

        {/* 좌상단 Fit 배지 오버레이 */}
        <div className="absolute left-1.5 top-1.5 flex flex-col items-start gap-1">
          <FitScoreBadge icon="📍" label={`${project.eventRegion} 로컬 핏`} score={localFit} />
          {showKorean && <FitScoreBadge icon="🇰🇷" label="한국 핏" score={koreanFit} />}
        </div>

        {/* 프리미엄(VIP) 잠금 오버레이 */}
        {product.isPremium && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 bg-white/30">
            <span className="text-lg">🔒</span>
            <Badge tone="dark">Pro 전용 · 탭하여 미리보기</Badge>
          </div>
        )}
      </div>

      {/* 상품명 */}
      <p className="mt-2 line-clamp-2 text-sm font-bold leading-snug">{product.name}</p>
      {/* 가격 */}
      <p className="mt-0.5 text-sm font-extrabold">{formatWon(product.price)}</p>
      {/* 최소 발주 수량 */}
      <p className="text-[11px] text-subtle">최소 {product.moq}개부터</p>
    </button>
  );
}
