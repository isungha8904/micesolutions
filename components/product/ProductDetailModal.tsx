/**
 * ProductDetailModal - 상품 상세 모달
 * -------------------------------------------------------------
 * 상품 카드를 탭하면 열리는 바텀시트 상세. (PRD 7.3)
 *  - 대표 이미지 / 상품명 / 가격 / 태그
 *  - [🎫 티켓 사용해 샘플 받기] : 잔여 티켓 차감 시뮬레이션
 *  - 스토리텔링(왜 이 점수인가) + 로컬/한국 핏 비교 차트
 *  - 발주 및 견적 요청 폼(OrderQuoteForm)
 */
"use client";

import { useState } from "react";
import Image from "next/image";
import type { Product, Project } from "@/lib/types";
import { useAppStore } from "@/lib/store";
import {
  getLocalFitScore,
  getKoreanFitScore,
  getLocalFitReason,
  shouldShowKoreanFit,
} from "@/lib/scoring";
import { formatWon } from "@/lib/format";
import Modal from "@/components/ui/Modal";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import FitScoreChart from "./FitScoreChart";
import StoryTelling from "./StoryTelling";
import OrderQuoteForm from "./OrderQuoteForm";

interface ProductDetailModalProps {
  product: Product | null; // null 이면 모달 닫힘
  project: Project;
  onClose: () => void;
}

export default function ProductDetailModal({ product, project, onClose }: ProductDetailModalProps) {
  const remainingTickets = useAppStore((s) => s.remainingTickets);
  const useTicket = useAppStore((s) => s.useTicket);

  // 티켓 사용 결과 안내 메시지 (모달 내 인라인 피드백)
  const [ticketMsg, setTicketMsg] = useState<string>("");

  // product 가 없으면 렌더링하지 않음
  if (!product) return null;

  // Fit 점수 계산
  const localFit = getLocalFitScore(product, project);
  const koreanFit = getKoreanFitScore(product, project);
  const showKorean = shouldShowKoreanFit(project);

  // 티켓 사용 처리
  const handleUseTicket = () => {
    const ok = useTicket();
    if (ok) {
      setTicketMsg("샘플 신청이 완료되었어요! (데모)");
    } else {
      setTicketMsg("보유한 샘플 티켓을 모두 사용했어요.");
    }
  };

  return (
    <Modal open={!!product} onClose={onClose} title={product.name}>
      {/* 대표 이미지 */}
      <div className="relative mb-3 aspect-square w-full overflow-hidden rounded-card bg-thumb">
        <Image src={product.image_url} alt={product.name} fill sizes="430px" className="object-cover" />
        {product.isPremium && (
          <span className="absolute left-2 top-2">
            <Badge tone="dark">Pro 전용 VIP 상품</Badge>
          </span>
        )}
      </div>

      {/* 가격 + 태그 */}
      <div className="mb-3">
        <p className="text-xl font-extrabold">{formatWon(product.price)}</p>
        <p className="text-xs text-subtle">최소 발주 {product.moq}개</p>
        <div className="mt-2 flex flex-wrap gap-1">
          {product.tags.map((tag) => (
            <Badge key={tag} tone="neutral">
              #{tag}
            </Badge>
          ))}
        </div>
      </div>

      {/* 티켓 사용 버튼 + 결과 안내 */}
      <div className="mb-4">
        <Button
          variant="primary"
          fullWidth
          onClick={handleUseTicket}
          disabled={remainingTickets <= 0}
        >
          🎫 티켓 사용해 샘플 받기 (잔여 {remainingTickets}장)
        </Button>
        {ticketMsg && <p className="mt-2 text-center text-xs font-medium text-accent">{ticketMsg}</p>}
      </div>

      {/* 스토리텔링 (왜 이 점수인가) */}
      <div className="mb-4">
        <StoryTelling product={product} project={project} />
      </div>

      {/* 로컬/한국 핏 비교 차트 */}
      <div className="mb-2">
        <p className="mb-1 text-sm font-bold">지역·한국 적합도(Fit)</p>
        <FitScoreChart localFit={localFit} koreanFit={koreanFit} showKorean={showKorean} />
        {/* 계산 근거 한 줄 요약 */}
        <p className="mt-1 text-center text-[11px] text-subtle">
          {getLocalFitReason(product, project)}
        </p>
      </div>

      <div className="my-4 border-t border-line" />

      {/* 발주 및 견적 요청 폼 */}
      <h3 className="mb-3 text-base font-bold">발주 및 견적 요청</h3>
      <OrderQuoteForm product={product} project={project} onDone={onClose} />
    </Modal>
  );
}
