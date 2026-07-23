/**
 * 공통 타입 정의
 * -------------------------------------------------------------
 * 앱 전역에서 사용하는 데이터 타입을 한 곳에 모아 둔다.
 * PRD 7.2 / 7.2.1 의 스키마를 그대로 반영한다.
 */

/** 참가자 구성 유형 - 한국 핏 점수 노출 여부를 결정한다. */
export type AudienceType = "domestic" | "international" | "mixed";

/**
 * 상품(기념품) 타입
 * - regionTag: 상품의 지역 연고(로컬 핏 계산용). 전국 상품이면 null.
 * - koreanCulturalTags: 상품이 담은 한국 문화 요소(한국 핏 계산용).
 * - isTraditionalCraft: 전통 공예/장인 제작 여부(한국 핏 가산점).
 */
export interface Product {
  id: string;
  name: string; // 상품명
  price: number; // 단가(원)
  moq: number; // 최소 발주 수량
  tags: string[]; // 카테고리/테마 태그 (로컬 핏 테마 매칭에 사용)
  regionTag: string | null; // 지역 연고 (로컬 핏)
  image_url: string; // 이미지 경로 (/products/xxx.jpg 또는 Unsplash 폴백)
  isPremium: boolean; // VIP(Pro 전용) 상품 여부 → 홈 피드에서 blur 처리
  canPackage: boolean; // 턴키 언컴패키지 가능 여부
  esgScore: number; // 친환경 절감 기여 수치
  koreanCulturalTags: string[]; // 한국 문화 요소 (한국 핏)
  isTraditionalCraft: boolean; // 전통 공예 여부 (한국 핏 가산점)
}

/**
 * 프로젝트(행사) 타입
 * - 아래 3개 필드(eventRegion / eventThemeTags / audienceType)가
 *   Fit 점수 계산의 "사용자 입력 기준값"이다. (PRD 7.2.1)
 */
export interface Project {
  id: string;
  name: string; // 프로젝트명
  totalBudget: number; // 총 예산(원)
  spentBudget: number; // 사용 예산(원)
  eventRegion: string; // 행사 지역 (로컬 핏 기준)
  eventThemeTags: string[]; // 행사 테마 키워드 (로컬 핏 테마 매칭 기준)
  audienceType: AudienceType; // 참가자 유형 (한국 핏 노출 기준)
}

/** 사용자 + 세션 상태 타입 */
export interface UserState {
  userName: string; // 사용자명
  membership: "Basic" | "Pro"; // 멤버십 등급
  remainingTickets: number; // 잔여 샘플 티켓 수
  activeProjects: Project[]; // 진행 중 프로젝트 목록
}

/** 지출 내역 1건 (예산 장부용) */
export interface SpendingEntry {
  id: string;
  projectId: string; // 어떤 프로젝트의 지출인지
  label: string; // 지출 항목명
  amount: number; // 금액(원)
  date: string; // 지출일 (YYYY-MM-DD)
}
