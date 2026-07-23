/**
 * 예산 장부 탭 - "/ledger"
 * -------------------------------------------------------------
 * 프로젝트별 예산 프로그레스 + 최근 지출 내역 + [+ 새 프로젝트] 폼. (PRD 7.3)
 * 스토어(activeProjects/spending)를 구독하므로 클라이언트 컴포넌트로 둔다.
 */
"use client";

import { useAppStore } from "@/lib/store";
import AppHeader from "@/components/layout/AppHeader";
import ProjectBudgetCard from "@/components/ledger/ProjectBudgetCard";
import SpendingList from "@/components/ledger/SpendingList";
import NewProjectForm from "@/components/ledger/NewProjectForm";

export default function LedgerPage() {
  const activeProjects = useAppStore((s) => s.activeProjects);
  const spending = useAppStore((s) => s.spending);

  return (
    <>
      <AppHeader title="예산 장부" />

      <div className="space-y-6 px-4 py-4">
        {/* 프로젝트별 예산 카드 목록 */}
        <section className="space-y-3">
          {activeProjects.map((project) => (
            <ProjectBudgetCard key={project.id} project={project} />
          ))}
          {/* 새 프로젝트 생성 (지역/테마/참가자 입력 → Fit 기준값) */}
          <NewProjectForm />
        </section>

        {/* 최근 지출 내역 */}
        <section>
          <h2 className="mb-1 text-sm font-bold">최근 지출 내역</h2>
          <SpendingList entries={spending} />
        </section>
      </div>
    </>
  );
}
