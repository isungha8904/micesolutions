/**
 * DemoResetButton - 데모 초기화 버튼
 * -------------------------------------------------------------
 * 클릭 시 스토어를 initialUserState 로 되돌린다. (PRD 7.3)
 * 티켓/예산/프로젝트/지출을 원래대로 복원하므로, 새로고침이나 재배포 없이
 * 같은 자리에서 데모를 여러 번 반복 시연할 수 있다.
 */
"use client";

import { useAppStore } from "@/lib/store";

export default function DemoResetButton() {
  const resetDemo = useAppStore((s) => s.resetDemo);

  return (
    <button
      onClick={() => resetDemo()}
      className="inline-flex items-center gap-1 rounded-full border border-line bg-white px-3 py-1.5 text-xs font-medium text-subtle hover:text-ink"
    >
      ↺ 데모 초기화
    </button>
  );
}
