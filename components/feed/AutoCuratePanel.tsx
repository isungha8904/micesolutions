/**
 * AutoCuratePanel - 자동 큐레이션 패널
 * -------------------------------------------------------------
 * "자동 큐레이션" 주문 모드 UI. (PRD 3장 USP - 알아서 골라주는 구독)
 *  1) 카테고리(친환경/IT/프리미엄/로컬)와 수량을 미리 지정한다.
 *  2) [알아서 보내주기] → 해당 카테고리에서 무작위로 선정해 보여준다.
 *  3) 마음에 안 들면 [다시 뽑기], 좋으면 [이 구성으로 발송 요청] → 예산에 반영.
 * 무작위 선정은 사용자 클릭 시점에만 수행한다(하이드레이션 안전).
 */
"use client";

import { useState } from "react";
import Image from "next/image";
import type { Product } from "@/lib/types";
import { autoCurate, curateCategories, curateCounts } from "@/lib/curate";
import { useAppStore } from "@/lib/store";
import { formatWon } from "@/lib/format";
import Button from "@/components/ui/Button";

export default function AutoCuratePanel() {
  const requestOrder = useAppStore((s) => s.requestOrder);
  const selectedProject = useAppStore((s) => s.getSelectedProject());

  // 사용자가 미리 지정하는 값
  const [category, setCategory] = useState<string>(curateCategories[0]);
  const [count, setCount] = useState<number>(3);
  // 무작위 선정 결과 (null 이면 아직 안 뽑음)
  const [result, setResult] = useState<Product[] | null>(null);

  // 선정 결과 총액 (각 상품 최소 발주 수량 기준)
  const total = (result ?? []).reduce((sum, p) => sum + p.price * p.moq, 0);

  // 알아서 보내주기 / 다시 뽑기
  const handleCurate = () => {
    setResult(autoCurate(category, count));
  };

  // 발송 요청 → 선택 프로젝트 예산에 반영
  const handleSend = () => {
    if (!selectedProject || !result || result.length === 0) return;
    const label = `자동 큐레이션 · ${category} ${result.length}종`;
    requestOrder(selectedProject.id, label, total);
    alert(
      `자동 큐레이션 발송이 요청되었습니다.\n\n'${selectedProject.name}'\n${category} · ${result.length}종 · 합계 ${formatWon(total)}\n\n(데모: 실제 결제/발송은 이뤄지지 않습니다.)`
    );
    setResult(null);
  };

  return (
    <div className="space-y-5 px-4 py-3">
      <p className="rounded-card bg-thumb p-3 text-xs text-subtle">
        원하는 카테고리만 정해두면, GiftCue가 매번 그 안에서 <b className="text-ink">알아서 골라</b> 보내드려요.
        고민 없이 &lsquo;랜덤 선물&rsquo;처럼 받아보는 구독형 발송입니다.
      </p>

      {/* 카테고리 지정 */}
      <div>
        <p className="mb-1.5 text-sm font-bold">1. 카테고리 지정</p>
        <div className="flex flex-wrap gap-2">
          {curateCategories.map((cat) => {
            const active = category === cat;
            return (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={[
                  "rounded-full border px-3 py-1.5 text-xs font-bold transition-colors",
                  active ? "border-ink bg-ink text-white" : "border-line bg-white text-subtle",
                ].join(" ")}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* 수량 지정 */}
      <div>
        <p className="mb-1.5 text-sm font-bold">2. 보낼 종류 수</p>
        <div className="flex gap-2">
          {curateCounts.map((c) => {
            const active = count === c;
            return (
              <button
                key={c}
                onClick={() => setCount(c)}
                className={[
                  "rounded-card border px-4 py-2 text-sm font-bold transition-colors",
                  active ? "border-ink bg-ink text-white" : "border-line bg-white text-subtle",
                ].join(" ")}
              >
                {c}종
              </button>
            );
          })}
        </div>
      </div>

      {/* 실행 버튼 */}
      <Button variant="primary" fullWidth onClick={handleCurate}>
        🎲 {result ? "다시 뽑기" : "알아서 보내주기"}
      </Button>

      {/* 선정 결과 */}
      {result && (
        <div className="rounded-card border border-line p-3">
          {result.length === 0 ? (
            <p className="py-4 text-center text-sm text-subtle">
              &lsquo;{category}&rsquo; 카테고리에 해당하는 상품이 없어요.
            </p>
          ) : (
            <>
              <p className="mb-2 text-sm font-bold">
                이번에 골라진 {result.length}종{" "}
                <span className="font-normal text-subtle">({category})</span>
              </p>
              <ul className="space-y-2">
                {result.map((p) => (
                  <li key={p.id} className="flex items-center gap-3">
                    <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-card bg-thumb">
                      <Image src={p.image_url} alt={p.name} fill sizes="48px" className="object-cover" />
                    </div>
                    <span className="min-w-0 flex-1 truncate text-sm font-medium">{p.name}</span>
                    <span className="text-sm font-bold">{formatWon(p.price)}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-3 flex items-center justify-between border-t border-line pt-2">
                <span className="text-sm text-subtle">합계(최소수량 기준)</span>
                <span className="text-base font-extrabold">{formatWon(total)}</span>
              </div>

              <div className="mt-3">
                <Button variant="accent" fullWidth onClick={handleSend}>
                  이 구성으로 발송 요청
                </Button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
