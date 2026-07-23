/**
 * CartBar - 하단 고정 장바구니 요약 바
 * -------------------------------------------------------------
 * 장바구니에 상품이 있을 때만 하단 탭 바 위에 떠서 품목 수/총액을 보여주고,
 * 탭하면 장바구니 시트(CartSheet)를 연다. (직접 담기 주문 모드)
 */
"use client";

import { useState } from "react";
import { products } from "@/lib/mockData";
import { useAppStore } from "@/lib/store";
import { formatWon } from "@/lib/format";
import CartSheet from "./CartSheet";

export default function CartBar() {
  const cart = useAppStore((s) => s.cart);
  const [open, setOpen] = useState(false);

  // 장바구니가 비어 있으면 바를 표시하지 않는다.
  if (cart.length === 0) return null;

  // 총 수량 / 총액 계산
  const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
  const total = cart.reduce((sum, item) => {
    const product = products.find((p) => p.id === item.productId);
    return sum + (product ? product.price * item.quantity : 0);
  }, 0);

  return (
    <>
      {/* 하단 탭 바(약 60px) 위에 고정 */}
      <div className="fixed bottom-[68px] left-1/2 z-40 w-full max-w-app -translate-x-1/2 px-4">
        <button
          onClick={() => setOpen(true)}
          className="flex w-full items-center justify-between rounded-card bg-accent px-4 py-3 text-white shadow-lg"
        >
          <span className="text-sm font-bold">
            🛒 장바구니 {cart.length}종 · {totalQty}개
          </span>
          <span className="text-sm font-extrabold">{formatWon(total)} 주문 ›</span>
        </button>
      </div>

      {/* 장바구니 상세/결제 시트 */}
      <CartSheet open={open} onClose={() => setOpen(false)} />
    </>
  );
}
