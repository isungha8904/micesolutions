/**
 * Badge - 작은 라벨/배지 프리미티브
 * -------------------------------------------------------------
 * 상품 카드의 Fit 점수, 프리미엄 표시 등에 쓰는 알약 형태 라벨.
 * tone 으로 색을 고른다.
 */
import type { ReactNode } from "react";

type Tone = "neutral" | "accent" | "good" | "dark";

interface BadgeProps {
  tone?: Tone;
  children: ReactNode;
  className?: string;
}

// tone → 배경/글자색 매핑
const toneClass: Record<Tone, string> = {
  neutral: "bg-thumb text-ink",
  accent: "bg-accent text-white",
  good: "bg-good text-white",
  dark: "bg-ink text-white",
};

export default function Badge({ tone = "neutral", children, className = "" }: BadgeProps) {
  return (
    <span
      className={[
        "inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-[11px] font-bold leading-none",
        toneClass[tone],
        className,
      ].join(" ")}
    >
      {children}
    </span>
  );
}
