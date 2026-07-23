/**
 * Fit(핏) 점수 계산 - 결정론적 공식 (PRD 7.2.1)
 * -------------------------------------------------------------
 * 핵심 개념: Fit 점수는 상품에 고정된 값이 아니라
 *   "상품 속성 × 사용자가 프로젝트 생성 시 입력한 값" 의 조합으로 계산된다.
 * → 같은 상품이라도 프로젝트(지역/테마/참가자)가 바뀌면 점수가 달라진다.
 *
 * 실제 추천/ML 알고리즘이 아니라 데모용 결정론적 공식이며,
 * 홈 카드와 상품 상세 모달 양쪽에서 재사용한다.
 */
import type { Product, Project } from "./types";

/**
 * 로컬 핏 점수 (0~100)
 * - 기본 10점
 * - 상품 지역(regionTag)이 프로젝트 지역(eventRegion)과 같으면 +50점
 * - 상품 태그(tags)와 프로젝트 테마(eventThemeTags) 교집합 1개당 +15점 (최대 +40)
 * - 합계는 100점 상한
 *
 * 예) 지역 일치 + 테마 2개 일치 = 10 + 50 + 30 = 90점
 */
export function getLocalFitScore(product: Product, project: Project): number {
  let score = 10; // 기본 점수

  // 지역 일치 가산점
  if (product.regionTag !== null && product.regionTag === project.eventRegion) {
    score += 50;
  }

  // 테마 태그 교집합 개수 × 15 (최대 40)
  const themeMatches = product.tags.filter((tag) =>
    project.eventThemeTags.includes(tag)
  ).length;
  score += Math.min(themeMatches * 15, 40);

  return Math.min(score, 100); // 100점 상한
}

/**
 * 한국 핏 점수 (0~100)
 * - 기본 10점
 * - koreanCulturalTags 1개당 +20점 (최대 +60)
 * - isTraditionalCraft 가 true 이면 +20점
 * - 합계는 100점 상한
 */
export function getKoreanFitScore(product: Product, project: Project): number {
  let score = 10; // 기본 점수

  // 한국 문화 태그 개수 × 20 (최대 60)
  score += Math.min(product.koreanCulturalTags.length * 20, 60);

  // 전통 공예 가산점
  if (product.isTraditionalCraft) {
    score += 20;
  }

  return Math.min(score, 100); // 100점 상한
}

/**
 * 한국 핏 배지/차트 노출 여부
 * - 참가자가 국내(domestic)뿐이면 외국인이 없어 의미가 없으므로 숨긴다.
 * - international / mixed 일 때만 노출한다. (PRD 7.2.1 노출 규칙)
 */
export function shouldShowKoreanFit(project: Project): boolean {
  return project.audienceType !== "domestic";
}

/**
 * 종합 핏 점수 - 목록 정렬 기준
 * -------------------------------------------------------------
 * 홈 피드를 "가장 잘 맞는 상품"부터 보여주기 위한 정렬용 종합 점수.
 * - 로컬 핏 + (한국 핏 노출 대상일 때만) 한국 핏 을 더한다.
 * - 국내(domestic) 프로젝트에서는 한국 핏이 의미 없으므로 로컬 핏만 반영한다.
 * → 참가자 구성에 따라 정렬 결과가 자연스럽게 달라진다.
 */
export function getCombinedFitScore(product: Product, project: Project): number {
  const local = getLocalFitScore(product, project);
  const korean = shouldShowKoreanFit(project) ? getKoreanFitScore(product, project) : 0;
  return local + korean;
}

/**
 * 로컬 핏 점수 근거를 한 줄 설명으로 만들어 반환한다. (스토리텔링용)
 * - "왜 이 점수인가"를 사용자 입력 기준으로 풀어서 보여준다.
 */
export function getLocalFitReason(product: Product, project: Project): string {
  const reasons: string[] = [];

  if (product.regionTag !== null && product.regionTag === project.eventRegion) {
    reasons.push(`행사 지역(${project.eventRegion}) 일치`);
  }

  const matchedThemes = product.tags.filter((tag) =>
    project.eventThemeTags.includes(tag)
  );
  if (matchedThemes.length > 0) {
    reasons.push(`테마 키워드 ${matchedThemes.length}개 일치(${matchedThemes.join(", ")})`);
  }

  if (reasons.length === 0) {
    return "행사 지역·테마와 직접 일치하는 요소가 없습니다.";
  }
  return reasons.join(" + ");
}

/**
 * 한국 핏 점수 근거를 한 줄 설명으로 만들어 반환한다. (스토리텔링용)
 */
export function getKoreanFitReason(product: Product): string {
  const reasons: string[] = [];

  if (product.koreanCulturalTags.length > 0) {
    reasons.push(`한국 문화 요소 ${product.koreanCulturalTags.length}개(${product.koreanCulturalTags.join(", ")})`);
  }
  if (product.isTraditionalCraft) {
    reasons.push("전통 공예 제작");
  }

  if (reasons.length === 0) {
    return "한국적 문화 요소가 담겨 있지 않습니다.";
  }
  return reasons.join(" + ");
}
