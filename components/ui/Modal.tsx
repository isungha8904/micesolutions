/**
 * Modal - 바텀시트형 모달 프리미티브
 * -------------------------------------------------------------
 * 모바일 우선 UI 라서, 화면 하단에서 올라오는 바텀시트 형태로 구현했다.
 * - 뒤 배경(dim) 클릭 시 닫힌다.
 * - 최대 폭은 앱 셸과 동일(430px)하게 가운데 정렬.
 * 역할: 상품 상세, 새 프로젝트 폼 등 여러 곳에서 재사용.
 */
"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

export default function Modal({ open, onClose, title, children }: ModalProps) {
  // 모달이 열려 있는 동안 배경 스크롤을 잠근다.
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    // 화면 전체를 덮는 반투명 배경 (클릭 시 닫힘)
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/40"
      onClick={onClose}
    >
      {/* 바텀시트 본문 (배경 클릭 이벤트 전파 차단) */}
      <div
        className="max-h-[90vh] w-full max-w-app overflow-y-auto rounded-t-2xl bg-canvas p-5 pb-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 드래그 핸들 모양 표시 */}
        <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-line" />
        {title && (
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-bold">{title}</h2>
            <button
              onClick={onClose}
              aria-label="닫기"
              className="text-subtle hover:text-ink"
            >
              ✕
            </button>
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
