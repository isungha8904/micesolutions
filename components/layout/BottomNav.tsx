/**
 * BottomNav - 하단 고정 탭 바
 * -------------------------------------------------------------
 * KREAM 스타일의 하단 내비게이션. 3개 탭으로 구성한다.
 *  - 홈(피드) / 예산 장부 / ESG 대시보드
 * 현재 경로(usePathname)에 따라 활성 탭을 검정, 비활성은 회색으로 표시한다.
 */
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

// 탭 정의 (경로 / 라벨 / 아이콘)
interface Tab {
  href: string;
  label: string;
  icon: ReactNode;
}

// 심플한 라인 아이콘 (KREAM 톤)
const tabs: Tab[] = [
  {
    href: "/",
    label: "홈",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M3 10.5 12 3l9 7.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M5 9.5V21h14V9.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    href: "/ledger",
    label: "예산 장부",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="4" y="3" width="16" height="18" rx="2" />
        <path d="M8 7h8M8 11h8M8 15h5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    href: "/esg",
    label: "ESG",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 21c5-2 8-6 8-11V5l-8-2-8 2v5c0 5 3 9 8 11Z" strokeLinejoin="round" />
        <path d="M9.5 12.5l1.8 1.8 3.5-3.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function BottomNav() {
  const pathname = usePathname();

  // 비밀번호 게이트 화면(/gate)에서는 하단 탭을 숨긴다.
  if (pathname === "/gate") return null;

  return (
    <nav className="fixed bottom-0 left-1/2 z-40 w-full max-w-app -translate-x-1/2 border-t border-line bg-canvas">
      <ul className="flex">
        {tabs.map((tab) => {
          // "/" 는 정확히 일치할 때만, 그 외는 접두어 일치로 활성 판단
          const active =
            tab.href === "/" ? pathname === "/" : pathname.startsWith(tab.href);
          return (
            <li key={tab.href} className="flex-1">
              <Link
                href={tab.href}
                className={[
                  "flex flex-col items-center gap-1 py-2.5 text-[11px] font-medium",
                  active ? "text-ink" : "text-subtle",
                ].join(" ")}
              >
                {tab.icon}
                {tab.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
