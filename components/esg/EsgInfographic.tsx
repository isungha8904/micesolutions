/**
 * EsgInfographic - ESG 성과 인포그래픽
 * -------------------------------------------------------------
 * 상품들의 esgScore(더미 값)를 활용해 플라스틱/탄소 절감 성과를 시각화한다. (PRD 7.3 / 3장)
 *  - 상단: 요약 스탯 타일 3개
 *  - 하단: 친환경 상위 상품의 ESG 점수 가로 막대 차트 (Recharts)
 * ※ 실제 절감량 계산 로직은 없다. esgScore 를 그대로/가공해 보여주는 데모용 지표다. (PRD 7.0)
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
import { products } from "@/lib/mockData";

export default function EsgInfographic() {
  // 친환경 상품(ESG 70점 이상) 집계
  const ecoProducts = products.filter((p) => p.esgScore >= 70);
  const totalEsg = products.reduce((sum, p) => sum + p.esgScore, 0);
  const avgEsg = Math.round(totalEsg / products.length);

  // 데모용 절감 지표(결정론적 더미 환산)
  const carbonSaved = Math.round(totalEsg * 1.4); // 예상 탄소 절감(kg)
  const plasticSaved = ecoProducts.length * 320; // 예상 플라스틱 절감(개)

  // 차트 데이터: ESG 상위 6개 상품
  const chartData = [...products]
    .sort((a, b) => b.esgScore - a.esgScore)
    .slice(0, 6)
    .map((p) => ({ name: p.name.length > 10 ? p.name.slice(0, 10) + "…" : p.name, value: p.esgScore }));

  return (
    <div className="space-y-5 px-4 py-3">
      {/* 요약 스탯 타일 3개 */}
      <div className="grid grid-cols-3 gap-2">
        <StatTile label="예상 탄소 절감" value={`${carbonSaved}kg`} />
        <StatTile label="플라스틱 절감" value={`${plasticSaved.toLocaleString("ko-KR")}개`} />
        <StatTile label="평균 ESG 점수" value={`${avgEsg}점`} />
      </div>

      {/* 안내 문구 */}
      <p className="rounded-card bg-thumb p-3 text-xs text-subtle">
        친환경 상품({ecoProducts.length}종)을 선택하면 위와 같은 탄소·플라스틱 절감 효과가
        예상됩니다. 대기업 협력사 ESG 평가 대응용 리포트로 활용하세요.
      </p>

      {/* ESG 상위 상품 가로 막대 차트 */}
      <div>
        <p className="mb-2 text-sm font-bold">상품별 ESG 기여 점수 TOP 6</p>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              layout="vertical"
              margin={{ top: 0, right: 30, left: 0, bottom: 0 }}
            >
              <XAxis type="number" domain={[0, 100]} hide />
              <YAxis
                type="category"
                dataKey="name"
                width={78}
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: "#222222" }}
              />
              <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={20}>
                <LabelList
                  dataKey="value"
                  position="right"
                  formatter={(v: number) => `${v}`}
                  style={{ fontSize: 11, fontWeight: 800, fill: "#222222" }}
                />
                {/* 80점 이상은 진한 그린, 그 아래는 연한 그린 */}
                {chartData.map((entry, idx) => (
                  <Cell key={idx} fill={entry.value >= 80 ? "#41B979" : "#A6DEC1"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

/** 요약 스탯 타일 (내부 전용 소형 컴포넌트) */
function StatTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-card border border-line bg-white p-3 text-center">
      <p className="text-lg font-extrabold text-good">{value}</p>
      <p className="mt-0.5 text-[11px] text-subtle">{label}</p>
    </div>
  );
}
