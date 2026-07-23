/**
 * 포맷 유틸리티
 * -------------------------------------------------------------
 * 금액/퍼센트 표기를 앱 전역에서 일관되게 처리한다.
 */

/** 숫자를 "1,300,000원" 형태로 변환 */
export function formatWon(value: number): string {
  return `${value.toLocaleString("ko-KR")}원`;
}

/** 숫자를 "1.3백만" 대신 간단히 "130만원" 형태(만 단위)로 변환 (장부 요약용) */
export function formatWonShort(value: number): string {
  if (value >= 10000) {
    const man = Math.round(value / 10000);
    return `${man.toLocaleString("ko-KR")}만원`;
  }
  return formatWon(value);
}

/** 0~100 정수 퍼센트 표기 ("90%") */
export function formatPercent(value: number): string {
  return `${Math.round(value)}%`;
}
