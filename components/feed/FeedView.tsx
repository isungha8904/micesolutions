/**
 * FeedView - 홈 피드 상호작용 래퍼
 * -------------------------------------------------------------
 * 주문 방식(직접 담기 / 자동 큐레이션)과 정렬 기준(통합/로컬/한국) 상태를 관리하고,
 * 선택에 따라 상품 그리드 + 장바구니 바 또는 자동 큐레이션 패널을 렌더링한다.
 */
"use client";

import { useEffect, useState } from "react";
import { useAppStore } from "@/lib/store";
import { shouldShowKoreanFit } from "@/lib/scoring";
import OrderModeSwitch, { type OrderMode } from "./OrderModeSwitch";
import SortFilter, { type SortMode } from "./SortFilter";
import ProductGrid from "./ProductGrid";
import AutoCuratePanel from "./AutoCuratePanel";
import CartBar from "@/components/cart/CartBar";

export default function FeedView() {
  // Fit 계산 기준 프로젝트 → 한국 핏 노출 여부 판단
  const selectedProject = useAppStore((s) => s.getSelectedProject());
  const showKorean = selectedProject ? shouldShowKoreanFit(selectedProject) : false;

  const [orderMode, setOrderMode] = useState<OrderMode>("cart");
  const [sortMode, setSortMode] = useState<SortMode>("combined");

  // 국내 전용 프로젝트로 바뀌면 '한국 핏' 정렬은 의미가 없으므로 통합으로 되돌린다.
  useEffect(() => {
    if (!showKorean && sortMode === "korean") setSortMode("combined");
  }, [showKorean, sortMode]);

  return (
    <>
      {/* 주문 방식 선택 */}
      <OrderModeSwitch mode={orderMode} onChange={setOrderMode} />

      {orderMode === "cart" ? (
        // 직접 담기: 정렬 필터 + 상품 그리드 + 하단 장바구니 바
        <>
          <SortFilter mode={sortMode} onChange={setSortMode} showKorean={showKorean} />
          <ProductGrid sortMode={sortMode} />
          <CartBar />
        </>
      ) : (
        // 자동 큐레이션: 카테고리 지정 후 알아서 발송
        <AutoCuratePanel />
      )}
    </>
  );
}
