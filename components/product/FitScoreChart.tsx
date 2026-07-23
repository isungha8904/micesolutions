/**
 * FitScoreChart - 로컬/한국 핏 비교 차트
 * -------------------------------------------------------------
 * 로컬 핏과 한국 핏 점수를 Recharts 막대 차트로 나란히 비교한다. (PRD 7.3, 7.1)
 * - 참가자가 국내(domestic)뿐이면 한국 핏 막대는 표시하지 않는다.
 * - 직접 SVG 를 그리지 않고 Recharts 로 통일(PRD 지정).
 */
"use client";

import {
  Bar,
  BarChart,
  Cell,
  LabelList,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

interface FitScoreChartProps {
  localFit: number;
  koreanFit: number;
  showKorean: boolean; // 한국 핏 막대 노출 여부
}

export default function FitScoreChart({ localFit, koreanFit, showKorean }: FitScoreChartProps) {
  // 차트 데이터 구성 (한국 핏은 노출 대상일 때만 포함)
  const data = [
    { name: "로컬 핏", value: localFit },
    ...(showKorean ? [{ name: "한국 핏", value: koreanFit }] : []),
  ];

  return (
    <div className="h-40 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: "#222222", fontWeight: 700 }}
          />
          <YAxis domain={[0, 100]} hide />
          <Bar dataKey="value" radius={[6, 6, 0, 0]} barSize={54}>
            {/* 막대 위에 점수 라벨 표시 */}
            <LabelList
              dataKey="value"
              position="top"
              formatter={(v: number) => `${v}%`}
              style={{ fontSize: 12, fontWeight: 800, fill: "#222222" }}
            />
            {/* 70점 이상이면 포인트 색, 아니면 회색 */}
            {data.map((entry, idx) => (
              <Cell key={idx} fill={entry.value >= 70 ? "#EF6253" : "#D9D9D9"} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
