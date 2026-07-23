/**
 * ProductGrid - 상품 2열 그리드
 * -------------------------------------------------------------
 * 홈 피드의 상품 목록을 2열 그리드로 렌더링한다. (PRD 7.3)
 * - 현재 선택된 프로젝트를 기준으로 각 카드의 Fit 점수를 계산한다.
 * - 카드를 탭하면 상세 모달(ProductDetailModal)을 연다.
 */
"use client";

import { useState } from "react";
import type { Product } from "@/lib/types";
import { products } from "@/lib/mockData";
import { useAppStore } from "@/lib/store";
import ProductCard from "./ProductCard";
import ProductDetailModal from "@/components/product/ProductDetailModal";

export default function ProductGrid() {
  // Fit 계산 기준이 되는 선택 프로젝트
  const selectedProject = useAppStore((s) => s.getSelectedProject());
  // 상세 모달에 띄울 상품 (null 이면 닫힘)
  const [openProduct, setOpenProduct] = useState<Product | null>(null);

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
        {products.map((product) => (
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
