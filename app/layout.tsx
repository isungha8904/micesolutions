/**
 * 루트 레이아웃
 * -------------------------------------------------------------
 * - 페이지 메타데이터(title/description/OG)를 설정한다. (PRD 8장)
 * - 모든 페이지를 모바일 우선 앱 셸(.app-shell) 안에 배치하고,
 *   하단 고정 탭 바(BottomNav)를 공통으로 렌더링한다.
 */
import type { Metadata, Viewport } from "next";
import "./globals.css";
import BottomNav from "@/components/layout/BottomNav";

export const metadata: Metadata = {
  title: "GiftCue 데모 · 기프큐",
  description:
    "MICE·기업 행사 기념품을 자동으로 큐레이션하는 구독 서비스. 지역/한국 핏 매칭 · 예산 장부 · ESG 리포트.",
  openGraph: {
    title: "GiftCue 데모 · 기프큐",
    description:
      "지역·한국 문화 적합도(Fit)로 행사 기념품을 큐레이션하는 B2B 구독 서비스 데모.",
    type: "website",
  },
};

// 모바일 뷰포트 고정 (핀치 줌 허용, 초기 배율 1)
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <div className="app-shell">
          {/* 각 페이지 본문 */}
          <main className="app-main">{children}</main>
          {/* 하단 공통 탭 바 (홈 / 예산 장부 / ESG) */}
          <BottomNav />
        </div>
      </body>
    </html>
  );
}
