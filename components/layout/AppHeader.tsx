/**
 * AppHeader - 각 탭 상단 헤더
 * -------------------------------------------------------------
 * 좌측에 페이지 제목, 우측에 데모 초기화 버튼을 둔다.
 * showMembership 이 true 이면(홈 탭) 사용자명·멤버십·잔여 티켓 수를 함께 노출한다. (PRD 7.3)
 */
"use client";

import { useAppStore } from "@/lib/store";
import Badge from "@/components/ui/Badge";
import DemoResetButton from "./DemoResetButton";

interface AppHeaderProps {
  title: string;
  showMembership?: boolean;
}

export default function AppHeader({ title, showMembership = false }: AppHeaderProps) {
  // 스토어에서 사용자/멤버십/티켓 정보 구독
  const userName = useAppStore((s) => s.userName);
  const membership = useAppStore((s) => s.membership);
  const remainingTickets = useAppStore((s) => s.remainingTickets);

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-canvas/95 px-4 pb-3 pt-4 backdrop-blur">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-extrabold tracking-tight">{title}</h1>
        <DemoResetButton />
      </div>

      {showMembership && (
        // 멤버십 + 잔여 티켓 스트립
        <div className="mt-2 flex items-center gap-2 text-sm">
          <span className="font-bold">{userName}님</span>
          <Badge tone="dark">{membership}</Badge>
          <span className="ml-auto text-subtle">
            보유 샘플 티켓{" "}
            <span className="font-bold text-accent">🎫 {remainingTickets}장</span>
          </span>
        </div>
      )}
    </header>
  );
}
