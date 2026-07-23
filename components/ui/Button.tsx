/**
 * Button - 공통 버튼 프리미티브
 * -------------------------------------------------------------
 * KREAM 톤의 버튼. variant 로 색/형태를 고른다.
 *  - primary: 검정 채움 (기본 강조 액션)
 *  - accent : 포인트 레드 채움 (발주/티켓 사용 등 핵심 CTA)
 *  - outline: 외곽선만 (보조 액션)
 * 역할: 여러 화면에서 재사용되는 버튼 스타일을 한 곳에서 관리.
 */
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "accent" | "outline";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  fullWidth?: boolean;
  children: ReactNode;
}

// variant → Tailwind 클래스 매핑
const variantClass: Record<Variant, string> = {
  primary: "bg-ink text-white hover:bg-black disabled:bg-subtle",
  accent: "bg-accent text-white hover:bg-accent-dark disabled:bg-accent/40",
  outline: "border border-line text-ink bg-white hover:bg-thumb disabled:text-subtle",
};

export default function Button({
  variant = "primary",
  fullWidth = false,
  className = "",
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={[
        "inline-flex items-center justify-center gap-1.5 rounded-card px-4 py-3 text-sm font-bold transition-colors disabled:cursor-not-allowed",
        variantClass[variant],
        fullWidth ? "w-full" : "",
        className,
      ].join(" ")}
      {...rest}
    >
      {children}
    </button>
  );
}
