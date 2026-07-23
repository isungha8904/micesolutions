/**
 * 비밀번호 게이트 화면 - "/gate"
 * -------------------------------------------------------------
 * 하드코딩 비밀번호(1234)를 입력받아 인증 쿠키를 설정하고 홈으로 보낸다. (PRD 7.1)
 * ※ 실제 인증이 아니라, 데모 링크를 아무나 열지 못하게 막는 간단한 게이트다.
 */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";

// 데모용 하드코딩 비밀번호
const DEMO_PASSWORD = "1234";

export default function GatePage() {
  const router = useRouter();
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);

  // 제출 처리: 비밀번호가 맞으면 쿠키 설정 후 홈으로 이동
  const handleSubmit = () => {
    if (value === DEMO_PASSWORD) {
      // 하루 동안 유효한 인증 쿠키 설정
      document.cookie = "gc_auth=ok; path=/; max-age=86400";
      router.push("/");
      router.refresh();
    } else {
      setError(true);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-8">
      {/* 워드마크 */}
      <p className="mb-1 text-2xl font-extrabold tracking-tight">GiftCue</p>
      <p className="mb-8 text-sm text-subtle">MICE 기념품 큐레이션 데모</p>

      {/* 비밀번호 입력 */}
      <input
        type="password"
        inputMode="numeric"
        value={value}
        placeholder="비밀번호 입력"
        onChange={(e) => {
          setValue(e.target.value);
          setError(false);
        }}
        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        className="w-full max-w-xs rounded-card border border-line px-4 py-3 text-center text-sm"
      />
      {error && <p className="mt-2 text-xs text-accent">비밀번호가 올바르지 않습니다. (힌트: 1234)</p>}

      <div className="mt-4 w-full max-w-xs">
        <Button variant="primary" fullWidth onClick={handleSubmit}>
          입장하기
        </Button>
      </div>
    </div>
  );
}
