/**
 * SpendingList - 지출 내역 리스트
 * -------------------------------------------------------------
 * 예산 장부 탭에서 최근 지출 내역을 최신순으로 보여준다. (PRD 7.3)
 * 발주(OrderQuoteForm)로 추가된 지출이 이 목록 상단에 실시간 반영된다.
 */
import type { SpendingEntry } from "@/lib/types";
import { formatWon } from "@/lib/format";

interface SpendingListProps {
  entries: SpendingEntry[];
}

export default function SpendingList({ entries }: SpendingListProps) {
  if (entries.length === 0) {
    return <p className="py-6 text-center text-sm text-subtle">아직 지출 내역이 없어요.</p>;
  }

  return (
    <ul className="divide-y divide-line">
      {entries.map((entry) => (
        <li key={entry.id} className="flex items-center justify-between py-3">
          <div>
            <p className="text-sm font-medium">{entry.label}</p>
            <p className="text-[11px] text-subtle">{entry.date}</p>
          </div>
          <span className="text-sm font-bold">{formatWon(entry.amount)}</span>
        </li>
      ))}
    </ul>
  );
}
