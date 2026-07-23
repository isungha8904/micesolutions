/**
 * SortFilter - 상품 정렬 필터
 * -------------------------------------------------------------
 * 홈 피드(직접 담기 모드)의 상품 정렬 기준을 고르는 세그먼트 필터.
 *  - combined: 로컬 핏 + 한국 핏 통합 점수 (기본)
 *  - local   : 로컬 핏만
 *  - korean  : 한국 핏만
 * 참가자가 국내(domestic)뿐인 프로젝트에서는 한국 핏이 의미 없으므로
 * '한국 핏' 옵션을 비활성화한다. (showKorean=false)
 */
"use client";

// 정렬 기준 타입 (다른 컴포넌트에서도 import 해 사용)
export type SortMode = "combined" | "local" | "korean";

interface SortOption {
  value: SortMode;
  label: string;
}

const options: SortOption[] = [
  { value: "combined", label: "통합" },
  { value: "local", label: "로컬 핏" },
  { value: "korean", label: "한국 핏" },
];

interface SortFilterProps {
  mode: SortMode;
  onChange: (mode: SortMode) => void;
  showKorean: boolean; // false 면 '한국 핏' 옵션 비활성화
}

export default function SortFilter({ mode, onChange, showKorean }: SortFilterProps) {
  return (
    <div className="flex items-center gap-2 px-4 py-2">
      <span className="text-xs font-medium text-subtle">정렬</span>
      <div className="inline-flex rounded-full border border-line bg-white p-0.5">
        {options.map((opt) => {
          const disabled = opt.value === "korean" && !showKorean;
          const active = mode === opt.value;
          return (
            <button
              key={opt.value}
              onClick={() => !disabled && onChange(opt.value)}
              disabled={disabled}
              className={[
                "rounded-full px-3 py-1 text-xs font-bold transition-colors",
                active ? "bg-ink text-white" : "text-subtle",
                disabled ? "cursor-not-allowed opacity-30" : "",
              ].join(" ")}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
