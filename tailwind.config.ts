import type { Config } from "tailwindcss";

/**
 * Tailwind 설정 - KREAM 디자인 토큰
 * -------------------------------------------------------------
 * KREAM 앱 특유의 "미니멀·에디토리얼" 룩을 재현하기 위한 색/폰트 토큰을 정의한다.
 * - 배경은 화이트, 본문은 진한 회색(near-black), 보조 텍스트는 중간 회색.
 * - 포인트 컬러(accent)는 KREAM 구매 버튼의 레드 계열 1개만 절제해서 사용한다.
 * - 폰트는 Pretendard 를 우선으로, 없으면 시스템 산세리프로 폴백.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // KREAM 톤 팔레트
        ink: "#222222", // 본문 기본 텍스트 (near-black)
        subtle: "#6B6B6B", // 보조 텍스트 (회색)
        line: "#EBEBEB", // 경계선
        canvas: "#FFFFFF", // 페이지 배경 (화이트)
        thumb: "#F4F4F4", // 상품 이미지 배경 (연회색)
        accent: {
          DEFAULT: "#EF6253", // 포인트 컬러 (KREAM 구매 레드 계열)
          dark: "#D94C3D",
        },
        good: "#41B979", // ESG/긍정 지표용 그린 (KREAM 판매 그린 계열)
      },
      fontFamily: {
        // Pretendard 우선, 시스템 폰트 폴백
        sans: [
          "Pretendard",
          "-apple-system",
          "BlinkMacSystemFont",
          "system-ui",
          "Roboto",
          "'Helvetica Neue'",
          "'Segoe UI'",
          "'Apple SD Gothic Neo'",
          "'Noto Sans KR'",
          "sans-serif",
        ],
      },
      borderRadius: {
        card: "12px", // 카드/버튼 라운드 (KREAM 소형 라운드)
      },
      maxWidth: {
        app: "430px", // 모바일 우선 앱 최대 폭
      },
    },
  },
  plugins: [],
};

export default config;
