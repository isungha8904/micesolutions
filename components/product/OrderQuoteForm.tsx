/**
 * OrderQuoteForm - 발주 및 견적 요청 폼
 * -------------------------------------------------------------
 * 상품 상세 모달 하단의 발주 폼. (PRD 7.3)
 *  - 패키지 옵션(단품 vs 언컴패키지) 선택
 *  - 수량 입력(최소 발주 수량 이상)
 *  - 단일 배송지 입력 (다중 배송은 Phase 2 — 아래 주석 참고)
 *  - [비교견적서 자동생성] : 견적 요약을 즉석에서 만들어 보여줌(목)
 *  - [발주 및 견적 요청] : 스토어에 지출로 반영하고 완료 안내
 *
 * ※ Phase 2 보류: 참여자별 개별 다중 배송(엑셀 명단 업로드)은 이번 MVP 범위 밖.
 *   여기서는 '단일 배송지'만 구현한다. (PRD 7.0 / 7.3)
 */
"use client";

import { useState } from "react";
import type { Product, Project } from "@/lib/types";
import { useAppStore } from "@/lib/store";
import { formatWon } from "@/lib/format";
import Button from "@/components/ui/Button";

interface OrderQuoteFormProps {
  product: Product;
  project: Project;
  onDone: () => void; // 발주 완료 후 모달을 닫기 위한 콜백
}

type PackageOption = "single" | "turnkey";

export default function OrderQuoteForm({ product, project, onDone }: OrderQuoteFormProps) {
  const requestOrder = useAppStore((s) => s.requestOrder);

  // 폼 상태
  const [packageOption, setPackageOption] = useState<PackageOption>("single");
  const [quantity, setQuantity] = useState<number>(product.moq);
  const [address, setAddress] = useState<string>("");
  const [showQuote, setShowQuote] = useState<boolean>(false); // 견적서 노출 여부

  // 언컴패키지(턴키) 선택 시 개당 3,000원 브랜딩/포장 비용을 더한다(데모 규칙).
  const packageFeePerUnit = packageOption === "turnkey" ? 3000 : 0;
  const totalAmount = (product.price + packageFeePerUnit) * quantity;

  // 발주 처리: 스토어에 지출 반영 후 완료 안내
  const handleOrder = () => {
    const label = `${product.name} ${quantity}개${packageOption === "turnkey" ? " (언컴패키지)" : ""}`;
    requestOrder(project.id, label, totalAmount);
    alert(`발주·견적 요청이 접수되었습니다.\n\n${label}\n합계 ${formatWon(totalAmount)}\n\n(데모: 실제 결제/발송은 이뤄지지 않습니다.)`);
    onDone();
  };

  return (
    <div className="space-y-4">
      {/* 패키지 옵션 선택 */}
      <div>
        <p className="mb-1.5 text-sm font-bold">패키지 옵션</p>
        <div className="grid grid-cols-2 gap-2">
          <OptionButton
            active={packageOption === "single"}
            onClick={() => setPackageOption("single")}
            title="단품"
            desc="상품만 발주"
          />
          <OptionButton
            active={packageOption === "turnkey"}
            onClick={() => product.canPackage && setPackageOption("turnkey")}
            title="언컴패키지"
            desc={product.canPackage ? "브랜딩 박스 +개당 3,000원" : "이 상품은 불가"}
            disabled={!product.canPackage}
          />
        </div>
      </div>

      {/* 수량 입력 (최소 발주 수량 이상) */}
      <div>
        <label className="mb-1.5 block text-sm font-bold">
          수량 <span className="font-normal text-subtle">(최소 {product.moq}개)</span>
        </label>
        <input
          type="number"
          min={product.moq}
          value={quantity}
          onChange={(e) => setQuantity(Math.max(product.moq, Number(e.target.value) || product.moq))}
          className="w-full rounded-card border border-line px-3 py-2.5 text-sm"
        />
      </div>

      {/* 단일 배송지 입력 (다중 배송은 Phase 2 보류) */}
      <div>
        <label className="mb-1.5 block text-sm font-bold">배송지 (단일)</label>
        <input
          type="text"
          value={address}
          placeholder="예: 경주화백컨벤션센터 행사 사무국"
          onChange={(e) => setAddress(e.target.value)}
          className="w-full rounded-card border border-line px-3 py-2.5 text-sm"
        />
        <p className="mt-1 text-[11px] text-subtle">
          ※ 참여자별 개별 다중 배송은 추후(Phase 2) 지원 예정입니다.
        </p>
      </div>

      {/* 비교견적서 자동생성 (목) */}
      <Button variant="outline" fullWidth onClick={() => setShowQuote(true)}>
        📄 비교견적서 자동생성
      </Button>

      {showQuote && (
        // 자동 생성된 견적 요약 (데모)
        <div className="rounded-card border border-line p-3 text-sm">
          <p className="mb-2 font-bold">견적 요약</p>
          <Row label="상품" value={product.name} />
          <Row label="단가" value={formatWon(product.price)} />
          {packageFeePerUnit > 0 && (
            <Row label="언컴패키지" value={`+${formatWon(packageFeePerUnit)}/개`} />
          )}
          <Row label="수량" value={`${quantity}개`} />
          <div className="my-2 border-t border-line" />
          <Row label="합계(예상)" value={formatWon(totalAmount)} strong />
        </div>
      )}

      {/* 발주 및 견적 요청 */}
      <Button variant="accent" fullWidth onClick={handleOrder}>
        발주 및 견적 요청 · {formatWon(totalAmount)}
      </Button>
    </div>
  );
}

/** 패키지 옵션 버튼 (내부 전용 소형 컴포넌트) */
function OptionButton({
  active,
  onClick,
  title,
  desc,
  disabled = false,
}: {
  active: boolean;
  onClick: () => void;
  title: string;
  desc: string;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={[
        "rounded-card border p-3 text-left transition-colors",
        active ? "border-ink bg-ink text-white" : "border-line bg-white",
        disabled ? "opacity-40" : "",
      ].join(" ")}
    >
      <p className="text-sm font-bold">{title}</p>
      <p className={["text-[11px]", active ? "text-white/80" : "text-subtle"].join(" ")}>{desc}</p>
    </button>
  );
}

/** 견적 요약 한 줄 (내부 전용) */
function Row({ label, value, strong = false }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className="flex items-center justify-between py-0.5">
      <span className="text-subtle">{label}</span>
      <span className={strong ? "font-extrabold" : "font-medium"}>{value}</span>
    </div>
  );
}
