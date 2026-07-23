/**
 * 전역 상태 스토어 (Zustand)
 * -------------------------------------------------------------
 * 백엔드 없이 클라이언트 상태만으로 데모를 구동한다. (PRD 8장)
 * - 티켓 차감, 프로젝트 추가/선택, 발주(예산 차감), 데모 초기화
 * - 장바구니("직접 담기" 주문 모드) 담기/수정/삭제/결제
 * - 새로고침 없이 [데모 초기화] 버튼만으로 초기 상태로 되돌릴 수 있어,
 *   한 자리에서 데모를 반복 시연할 수 있다. (PRD 7.3 데모 초기화 버튼)
 */
import { create } from "zustand";
import type { AudienceType, CartItem, Project, SpendingEntry, UserState } from "./types";
import { initialSpending, initialUserState, products } from "./mockData";

/** 새 프로젝트 생성 폼에서 넘어오는 입력값 */
export interface NewProjectInput {
  name: string;
  totalBudget: number;
  eventRegion: string;
  eventThemeTags: string[];
  audienceType: AudienceType;
}

interface AppState extends UserState {
  spending: SpendingEntry[]; // 지출 내역
  selectedProjectId: string; // 홈 피드에서 Fit 계산 기준이 되는 선택 프로젝트
  cart: CartItem[]; // 장바구니

  /** 현재 선택된 프로젝트 객체를 반환 (없으면 첫 번째) */
  getSelectedProject: () => Project | undefined;

  /** 샘플 티켓 1장 차감. 남은 티켓이 없으면 false 반환. */
  useTicket: () => boolean;

  /** 홈 피드 기준 프로젝트 변경 */
  selectProject: (projectId: string) => void;

  /** 새 프로젝트 추가 (예산 장부의 [+ 새 프로젝트] 폼) */
  addProject: (input: NewProjectInput) => void;

  /** 발주 요청: 선택 프로젝트의 사용 예산을 늘리고 지출 내역에 추가 */
  requestOrder: (projectId: string, label: string, amount: number) => void;

  /** 장바구니에 담기 (이미 있으면 수량 합산) */
  addToCart: (productId: string, quantity: number) => void;

  /** 장바구니 항목 수량 변경 */
  setCartQty: (productId: string, quantity: number) => void;

  /** 장바구니에서 제거 */
  removeFromCart: (productId: string) => void;

  /** 장바구니 비우기 */
  clearCart: () => void;

  /**
   * 장바구니 결제: 합계를 선택 프로젝트 지출로 반영하고 장바구니를 비운다.
   * 결제 결과(품목 수/총액)를 반환하며, 비어 있으면 null.
   */
  checkoutCart: (projectId: string) => { count: number; totalQty: number; total: number } | null;

  /** 전체 상태를 초기값으로 되돌림 (데모 초기화) */
  resetDemo: () => void;
}

/** 초기 상태를 매번 새 객체로 복제해 반환 (얕은 참조 공유 방지) */
function buildInitialState() {
  return {
    userName: initialUserState.userName,
    membership: initialUserState.membership,
    remainingTickets: initialUserState.remainingTickets,
    // 배열/객체는 깊은 복사해서 초기화 시 원본이 오염되지 않게 한다.
    activeProjects: initialUserState.activeProjects.map((p) => ({ ...p })),
    spending: initialSpending.map((s) => ({ ...s })),
    selectedProjectId: initialUserState.activeProjects[0]?.id ?? "",
    cart: [] as CartItem[],
  };
}

export const useAppStore = create<AppState>((set, get) => ({
  ...buildInitialState(),

  getSelectedProject: () => {
    const { activeProjects, selectedProjectId } = get();
    return (
      activeProjects.find((p) => p.id === selectedProjectId) ?? activeProjects[0]
    );
  },

  useTicket: () => {
    const { remainingTickets } = get();
    if (remainingTickets <= 0) return false; // 티켓 소진 시 차감 불가
    set({ remainingTickets: remainingTickets - 1 });
    return true;
  },

  selectProject: (projectId) => set({ selectedProjectId: projectId }),

  addProject: (input) => {
    // 고유 id 생성 (데모용 단순 방식)
    const newId = `p-${Date.now()}`;
    const newProject: Project = {
      id: newId,
      name: input.name,
      totalBudget: input.totalBudget,
      spentBudget: 0,
      eventRegion: input.eventRegion,
      eventThemeTags: input.eventThemeTags,
      audienceType: input.audienceType,
    };
    set((state) => ({
      activeProjects: [...state.activeProjects, newProject],
      selectedProjectId: newId, // 새로 만든 프로젝트를 바로 기준으로 선택
    }));
  },

  requestOrder: (projectId, label, amount) => {
    set((state) => ({
      // 해당 프로젝트의 사용 예산 증가
      activeProjects: state.activeProjects.map((p) =>
        p.id === projectId
          ? { ...p, spentBudget: p.spentBudget + amount }
          : p
      ),
      // 지출 내역에 새 항목 추가
      spending: [
        {
          id: `s-${Date.now()}`,
          projectId,
          label,
          amount,
          date: new Date().toISOString().slice(0, 10),
        },
        ...state.spending,
      ],
    }));
  },

  addToCart: (productId, quantity) => {
    set((state) => {
      const existing = state.cart.find((c) => c.productId === productId);
      if (existing) {
        // 이미 담긴 상품이면 수량을 합산한다.
        return {
          cart: state.cart.map((c) =>
            c.productId === productId ? { ...c, quantity: c.quantity + quantity } : c
          ),
        };
      }
      return { cart: [...state.cart, { productId, quantity }] };
    });
  },

  setCartQty: (productId, quantity) => {
    set((state) => ({
      cart: state.cart.map((c) =>
        c.productId === productId ? { ...c, quantity: Math.max(1, quantity) } : c
      ),
    }));
  },

  removeFromCart: (productId) => {
    set((state) => ({ cart: state.cart.filter((c) => c.productId !== productId) }));
  },

  clearCart: () => set({ cart: [] }),

  checkoutCart: (projectId) => {
    const { cart } = get();
    if (cart.length === 0) return null;

    // 장바구니 합계 계산 (상품 단가 × 수량)
    let total = 0;
    let totalQty = 0;
    cart.forEach((item) => {
      const product = products.find((p) => p.id === item.productId);
      if (product) {
        total += product.price * item.quantity;
        totalQty += item.quantity;
      }
    });

    // 하나의 지출 항목으로 예산에 반영
    const label = `장바구니 주문 ${cart.length}종 ${totalQty}개`;
    get().requestOrder(projectId, label, total);
    set({ cart: [] }); // 결제 후 장바구니 비우기

    return { count: cart.length, totalQty, total };
  },

  resetDemo: () => set(buildInitialState()),
}));
