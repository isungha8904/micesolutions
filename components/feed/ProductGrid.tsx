/**
 * ProductGrid - 상품 2열 그리드
 * -------------------------------------------------------------
 * 홈 피드의 상품 목록을 2열 그리드로 렌더링한다. (PRD 7.3)
 * - 현재 선택된 프로젝트를 기준으로 각 카드의 Fit 점수를 계산한다.
 * - 기본 정렬: 종합 핏 점수(로컬 핏 + 한국 핏) 내림차순 → 가장 잘 맞는 상품이 맨 위.
 *   프로젝트를 바꾸면 정렬도 자동으로 다시 계산된다.
 * - 카드를 탭하면 상세 모달(ProductDetailModal)을 연다.
 */
"use client";

import { useMemo, useState } from "react";
import type { Product, Project } from "@/lib/types";
import { products } from "@/lib/mockData";
import {
  getCombinedFitScore,
  getLocalFitScore,
  getKoreanFitScore,
} from "@/lib/scoring";
import { useAppStore } from "@/lib/store";
import type { SortMode } from "./SortFilter";
import ProductCard from "./ProductCard";
import ProductDetailModal from "@/components/product/ProductDetailModal";

interface ProductGridProps {
  sortMode: SortMode; // 정렬 기준 (통합/로컬/한국)
}

// 정렬 기준별로 상품의 정렬 점수를 반환한다.
function getSortValue(product: Product, project: Project, sortMode: SortMode): number {
  switch (sortMode) {
    case "local":
      return getLocalFitScore(product, project);
    case "korean":
      return getKoreanFitScore(product, project);
    case "combined":
    default:
      return getCombinedFitScore(product, project);
  }
}

export default function ProductGrid({ sortMode }: ProductGridProps) {
  // Fit 계산 기준이 되는 선택 프로젝트
  const selectedProject = useAppStore((s) => s.getSelectedProject());
  // 상세 모달에 띄울 상품 (null 이면 닫힘)
  const [openProduct, setOpenProduct] = useState<Product | null>(null);

  // 선택 프로젝트 + 정렬 기준으로 점수 내림차순 정렬.
  // 동점이면 상품 id 순으로 안정 정렬해 순서가 흔들리지 않게 한다.
  const sortedProducts = useMemo(() => {
    if (!selectedProject) return products;
    return [...products].sort((a, b) => {
      const diff =
        getSortValue(b, selectedProject, sortMode) - getSortValue(a, selectedProject, sortMode);
      return diff !== 0 ? diff : a.id.localeCompare(b.id);
    });
  }, [selectedProject, sortMode]);

  // 방어: 프로젝트가 하나도 없으면 안내
  if (!selectedProject) {
    return (
      <p className="px-4 py-10 text-center text-sm text-subtle">
        먼저 예산 장부에서 프로젝트를 만들어 주세요.
      </p>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-x-3 gap-y-5 px-4 py-3">
        {sortedProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            project={selectedProject}
            onOpen={setOpenProduct}
          />
        ))}
      </div>

      {/* 상세 모달 (선택된 상품이 있을 때만 실질 렌더) */}
      <ProductDetailModal
        product={openProduct}
        project={selectedProject}
        onClose={() => setOpenProduct(null)}
      />
    </>
  );
}
