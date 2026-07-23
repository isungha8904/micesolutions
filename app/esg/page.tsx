/**
 * ESG 대시보드 탭 - "/esg"
 * -------------------------------------------------------------
 * 상품 esgScore(더미) 기반 플라스틱/탄소 절감 인포그래픽. (PRD 7.3 / 3장)
 * 조합만 담당하고, 실제 시각화는 클라이언트 컴포넌트 EsgInfographic 이 처리한다.
 */
import AppHeader from "@/components/layout/AppHeader";
import EsgInfographic from "@/components/esg/EsgInfographic";

export default function EsgPage() {
  return (
    <>
      <AppHeader title="ESG 대시보드" />
      <EsgInfographic />
    </>
  );
}
