/**
 * OrderModeSwitch - 주문 방식 전환 세그먼트
 * -------------------------------------------------------------
 * 홈 피드 상단에서 두 가지 주문 방식을 고른다.
 *  - cart: 직접 담기 (원하는 상품을 장바구니에 담아 주문)
 *  - auto: 자동 큐레이션 (미리 지정한 카테고리에서 알아서 골라 발송)
 */
"use client";

export type OrderMode = "cart" | "auto";

interface Option {
  value: OrderMode;
  label: string;
  desc: string;
}

const options: Option[] = [
  { value: "cart", label: "🛒 직접 담기", desc: "골라서 장바구니 주문" },
  { value: "auto", label: "🎲 자동 큐레이션", desc: "알아서 골라 발송" },
];

interface OrderModeSwitchProps {
  mode: OrderMode;
  onChange: (mode: OrderMode) => void;
}

export default function OrderModeSwitch({ mode, onChange }: OrderModeSwitchProps) {
  return (
    <div className="grid grid-cols-2 gap-2 px-4 py-3">
      {options.map((opt) => {
        const active = mode === opt.value;
        return (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className={[
              "rounded-card border p-3 text-center transition-colors",
              active ? "border-ink bg-ink text-white" : "border-line bg-white",
            ].join(" ")}
          >
            <p className="text-sm font-bold">{opt.label}</p>
            <p className={["mt-0.5 text-[11px]", active ? "text-white/75" : "text-subtle"].join(" ")}>
              {opt.desc}
            </p>
          </button>
        );
      })}
    </div>
  );
}
