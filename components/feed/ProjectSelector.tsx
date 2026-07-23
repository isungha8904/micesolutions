/**
 * ProjectSelector - 기준 프로젝트 선택기
 * -------------------------------------------------------------
 * 홈 피드 상단에서 "어떤 프로젝트 기준으로 Fit 점수를 계산 중인지"를 보여주고,
 * 진행 중 프로젝트가 여러 개면 가로 칩으로 전환할 수 있게 한다. (PRD 7.3)
 * 프로젝트를 바꾸면 스토어의 selectedProjectId 가 바뀌어 모든 카드의 Fit 점수가 재계산된다.
 */
"use client";

import { useAppStore } from "@/lib/store";

// 참가자 유형을 한글 라벨로 변환
const audienceLabel: Record<string, string> = {
  domestic: "국내 참가자",
  international: "해외 참가자",
  mixed: "내·외국인 혼합",
};

export default function ProjectSelector() {
  const activeProjects = useAppStore((s) => s.activeProjects);
  const selectedProjectId = useAppStore((s) => s.selectedProjectId);
  const selectProject = useAppStore((s) => s.selectProject);

  const selected =
    activeProjects.find((p) => p.id === selectedProjectId) ?? activeProjects[0];

  return (
    <section className="px-4 py-3">
      {/* 현재 기준 안내 문구 */}
      <p className="mb-2 text-xs text-subtle">
        아래 상품들은{" "}
        <span className="font-bold text-ink">
          &lsquo;{selected?.name}&rsquo;
        </span>{" "}
        기준으로 적합도를 계산했어요.
      </p>

      {/* 프로젝트 전환 칩 (가로 스크롤) */}
      <div className="no-scrollbar flex gap-2 overflow-x-auto">
        {activeProjects.map((project) => {
          const active = project.id === selected?.id;
          return (
            <button
              key={project.id}
              onClick={() => selectProject(project.id)}
              className={[
                "shrink-0 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                active
                  ? "border-ink bg-ink text-white"
                  : "border-line bg-white text-subtle",
              ].join(" ")}
            >
              {project.name}
              <span className="ml-1 opacity-70">
                · {project.eventRegion} · {audienceLabel[project.audienceType]}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
