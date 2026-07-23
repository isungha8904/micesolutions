/**
 * NewProjectForm - 새 프로젝트 생성 폼
 * -------------------------------------------------------------
 * 예산 장부의 [+ 새 프로젝트] 버튼 → 바텀시트 폼. (PRD 7.3 / 7.2.1)
 * 프로젝트명·총예산과 함께 Fit 계산의 "기준값" 3가지를 입력받는다.
 *  - eventRegion   : 행사 지역 (로컬 핏 기준)
 *  - eventThemeTags: 행사 테마 키워드 (로컬 핏 테마 매칭 기준)
 *  - audienceType  : 참가자 유형 (한국 핏 노출 기준)
 * 생성 시 스토어에 추가되고, 자동으로 홈 피드의 기준 프로젝트로 선택된다.
 */
"use client";

import { useState } from "react";
import type { AudienceType } from "@/lib/types";
import { useAppStore } from "@/lib/store";
import { regionOptions, themeOptions } from "@/lib/mockData";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";

// 참가자 유형 선택지 (라벨/값)
const audienceChoices: { value: AudienceType; label: string }[] = [
  { value: "domestic", label: "국내만" },
  { value: "international", label: "해외 포함" },
  { value: "mixed", label: "혼합" },
];

export default function NewProjectForm() {
  const addProject = useAppStore((s) => s.addProject);

  // 모달 열림 상태
  const [open, setOpen] = useState(false);
  // 폼 상태
  const [name, setName] = useState("");
  const [totalBudget, setTotalBudget] = useState<number>(3000000);
  const [eventRegion, setEventRegion] = useState<string>(regionOptions[0]);
  const [eventThemeTags, setEventThemeTags] = useState<string[]>([]);
  const [audienceType, setAudienceType] = useState<AudienceType>("mixed");

  // 테마 태그 토글 (다중 선택)
  const toggleTheme = (tag: string) => {
    setEventThemeTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  // 폼 초기화
  const resetForm = () => {
    setName("");
    setTotalBudget(3000000);
    setEventRegion(regionOptions[0]);
    setEventThemeTags([]);
    setAudienceType("mixed");
  };

  // 제출 처리
  const handleSubmit = () => {
    if (!name.trim()) {
      alert("프로젝트명을 입력해 주세요.");
      return;
    }
    addProject({ name: name.trim(), totalBudget, eventRegion, eventThemeTags, audienceType });
    resetForm();
    setOpen(false);
  };

  return (
    <>
      {/* 트리거 버튼 */}
      <Button variant="outline" fullWidth onClick={() => setOpen(true)}>
        + 새 프로젝트
      </Button>

      {/* 생성 폼 모달 */}
      <Modal open={open} onClose={() => setOpen(false)} title="새 프로젝트">
        <div className="space-y-4">
          {/* 프로젝트명 */}
          <div>
            <label className="mb-1.5 block text-sm font-bold">프로젝트명</label>
            <input
              type="text"
              value={name}
              placeholder="예: 2026 아시아 파트너 컨퍼런스"
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-card border border-line px-3 py-2.5 text-sm"
            />
          </div>

          {/* 총예산 */}
          <div>
            <label className="mb-1.5 block text-sm font-bold">총예산(원)</label>
            <input
              type="number"
              min={0}
              step={100000}
              value={totalBudget}
              onChange={(e) => setTotalBudget(Number(e.target.value) || 0)}
              className="w-full rounded-card border border-line px-3 py-2.5 text-sm"
            />
          </div>

          {/* 행사 지역 (로컬 핏 기준) */}
          <div>
            <label className="mb-1.5 block text-sm font-bold">
              행사 지역 <span className="font-normal text-subtle">· 로컬 핏 기준</span>
            </label>
            <select
              value={eventRegion}
              onChange={(e) => setEventRegion(e.target.value)}
              className="w-full rounded-card border border-line bg-white px-3 py-2.5 text-sm"
            >
              {regionOptions.map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>
          </div>

          {/* 테마 키워드 (로컬 핏 테마 매칭) */}
          <div>
            <label className="mb-1.5 block text-sm font-bold">
              테마 키워드 <span className="font-normal text-subtle">· 다중 선택</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {themeOptions.map((tag) => {
                const active = eventThemeTags.includes(tag);
                return (
                  <button
                    key={tag}
                    onClick={() => toggleTheme(tag)}
                    className={[
                      "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                      active ? "border-ink bg-ink text-white" : "border-line bg-white text-subtle",
                    ].join(" ")}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 참가자 유형 (한국 핏 노출 기준) */}
          <div>
            <label className="mb-1.5 block text-sm font-bold">
              참가자 유형 <span className="font-normal text-subtle">· 한국 핏 노출 기준</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {audienceChoices.map((choice) => {
                const active = audienceType === choice.value;
                return (
                  <button
                    key={choice.value}
                    onClick={() => setAudienceType(choice.value)}
                    className={[
                      "rounded-card border px-2 py-2 text-xs font-bold transition-colors",
                      active ? "border-ink bg-ink text-white" : "border-line bg-white text-subtle",
                    ].join(" ")}
                  >
                    {choice.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 생성 버튼 */}
          <Button variant="accent" fullWidth onClick={handleSubmit}>
            프로젝트 만들고 이 기준으로 보기
          </Button>
        </div>
      </Modal>
    </>
  );
}
