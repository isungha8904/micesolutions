/**
 * 자동 큐레이션 로직
 * -------------------------------------------------------------
 * "자동 큐레이션" 주문 모드용. 사용자가 미리 지정한 카테고리에서
 * 상품을 무작위로 골라 "알아서 보내주는" 기능의 선정 로직이다. (PRD 3장 USP)
 *
 * ※ 실제 추천/ML 이 아니라 데모용 무작위 선정이다. Math.random 을 쓰므로
 *   렌더링 중이 아니라 반드시 사용자 액션(버튼 클릭) 시점에만 호출한다
 *   (SSR/CSR 하이드레이션 불일치 방지).
 */
import type { Product } from "./types";
import { products } from "./mockData";

/** 자동 큐레이션에서 고를 수 있는 카테고리 (상품 tags 와 동일 체계) */
export const curateCategories = ["친환경", "IT", "프리미엄", "로컬"];

/** 자동 큐레이션 선택 가능 수량 옵션 */
export const curateCounts = [2, 3, 5];

/** Fisher-Yates 셔플 (원본 배열 보존) */
function shuffle<T>(input: T[]): T[] {
  const arr = [...input];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * 지정 카테고리에서 무작위로 count 개 상품을 선정한다.
 * - 해당 카테고리(tags 포함) 상품 풀에서 무작위 추출.
 * - 풀이 count 보다 적으면 있는 만큼만 반환.
 */
export function autoCurate(category: string, count: number): Product[] {
  const pool = products.filter((p) => p.tags.includes(category));
  return shuffle(pool).slice(0, count);
}
