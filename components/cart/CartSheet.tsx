/**
 * CartSheet - 장바구니 상세/결제 시트
 * -------------------------------------------------------------
 * "직접 담기" 주문 모드의 장바구니 내용을 보여주고, 수량 조정·삭제·주문을 처리한다.
 * 주문 시 선택된 프로젝트의 예산에 합계가 반영되고 지출 내역에 기록된다.
 */
"use client";

import Image from "next/image";
import { products } from "@/lib/mockData";
import { useAppStore } from "@/lib/store";
import { formatWon } from "@/lib/format";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";

interface CartSheetProps {
  open: boolean;
  onClose: () => void;
}

export default function CartSheet({ open, onClose }: CartSheetProps) {
  const cart = useAppStore((s) => s.cart);
  const setCartQty = useAppStore((s) => s.setCartQty);
  const removeFromCart = useAppStore((s) => s.removeFromCart);
  const clearCart = useAppStore((s) => s.clearCart);
  const checkoutCart = useAppStore((s) => s.checkoutCart);
  const selectedProject = useAppStore((s) => s.getSelectedProject());

  // 장바구니 총액 계산
  const total = cart.reduce((sum, item) => {
    const product = products.find((p) => p.id === item.productId);
    return sum + (product ? product.price * item.quantity : 0);
  }, 0);

  // 주문 처리: 선택 프로젝트 예산에 반영하고 시트 닫기
  const handleCheckout = () => {
    if (!selectedProject) return;
    const result = checkoutCart(selectedProject.id);
    if (result) {
      alert(
        `주문이 접수되었습니다.\n\n'${selectedProject.name}'\n${result.count}종 ${result.totalQty}개 · 합계 ${formatWon(result.total)}\n\n(데모: 실제 결제/발송은 이뤄지지 않습니다.)`
      );
      onClose();
    }
  };

  return (
    <Modal open={open} onClose={onClose} title={`장바구니 (${cart.length})`}>
      {cart.length === 0 ? (
        <p className="py-8 text-center text-sm text-subtle">장바구니가 비어 있어요.</p>
      ) : (
        <>
          {/* 담긴 상품 목록 */}
          <ul className="mb-4 divide-y divide-line">
            {cart.map((item) => {
              const product = products.find((p) => p.id === item.productId);
              if (!product) return null;
              return (
                <li key={item.productId} className="flex items-center gap-3 py-3">
                  {/* 썸네일 */}
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-card bg-thumb">
                    <Image src={product.image_url} alt={product.name} fill sizes="56px" className="object-cover" />
                  </div>

                  {/* 이름 + 라인 합계 */}
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold">{product.name}</p>
                    <p className="text-xs text-subtle">{formatWon(product.price)} / 개</p>
                    <p className="text-sm font-extrabold">{formatWon(product.price * item.quantity)}</p>
                  </div>

                  {/* 수량 스텝퍼 + 삭제 */}
                  <div className="flex flex-col items-end gap-1">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setCartQty(item.productId, item.quantity - 10)}
                        className="h-6 w-6 rounded-full border border-line text-sm"
                      >
                        −
                      </button>
                      <span className="w-10 text-center text-sm font-bold">{item.quantity}</span>
                      <button
                        onClick={() => setCartQty(item.productId, item.quantity + 10)}
                        className="h-6 w-6 rounded-full border border-line text-sm"
                      >
                        ＋
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.productId)}
                      className="text-[11px] text-subtle hover:text-accent"
                    >
                      삭제
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>

          {/* 합계 */}
          <div className="mb-4 flex items-center justify-between border-t border-line pt-3">
            <span className="text-sm text-subtle">합계</span>
            <span className="text-lg font-extrabold">{formatWon(total)}</span>
          </div>
          {selectedProject && (
            <p className="mb-3 text-[11px] text-subtle">
              &lsquo;{selectedProject.name}&rsquo; 예산에서 차감됩니다.
            </p>
          )}

          {/* 액션 버튼 */}
          <div className="flex gap-2">
            <Button variant="outline" onClick={clearCart} className="shrink-0">
              비우기
            </Button>
            <Button variant="accent" fullWidth onClick={handleCheckout}>
              {formatWon(total)} 주문하기
            </Button>
          </div>
        </>
      )}
    </Modal>
  );
}
