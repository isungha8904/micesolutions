/**
 * 홈(피드) 탭 - "/"
 * -------------------------------------------------------------
 * 상단 헤더(멤버십·티켓) + 기준 프로젝트 선택기 + 상품 2열 그리드로 구성. (PRD 7.3)
 * 하위 컴포넌트들이 클라이언트 상태(스토어)를 사용하므로, 이 페이지는 조합만 담당한다.
 */
import AppHeader from "@/components/layout/AppHeader";
import ProjectSelector from "@/components/feed/ProjectSelector";
import FeedView from "@/components/feed/FeedView";

export default function HomePage() {
  return (
    <>
      <AppHeader title="GiftCue" showMembership />
      <ProjectSelector />
      {/* 주문 방식(직접 담기/자동 큐레이션) + 정렬 필터 + 상품 목록 */}
      <FeedView />
    </>
  );
}
