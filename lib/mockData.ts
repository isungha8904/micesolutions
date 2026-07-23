/**
 * 목(Mock) 데이터
 * -------------------------------------------------------------
 * 데모용이므로 백엔드 없이 이 파일의 초기값만 사용한다. (PRD 7.0 / 7.2)
 *
 * 상품 14개는 모두 국립박물관문화상품(museumshop.or.kr)의 실제 상품이며,
 * 상품명·가격·이미지를 실제 데이터에서 가져왔다. 이미지는 데모 중 끊김을 막기 위해
 * 전부 로컬(/public/products/*.jpg)에 저장해 두었다 → 외부 네트워크 의존성 0.
 *
 * 각 상품에는 "로컬 데이터(regionTag)"와 "한국 데이터(koreanCulturalTags,
 * isTraditionalCraft)"를 유물의 실제 문화/지역 배경에 근거해 명시적으로 부여했다.
 * → 이렇게 해야 로컬 핏 점수와 한국 핏 점수가 상품마다 뚜렷하게 갈린다.
 */
import type { Product, SpendingEntry, UserState } from "./types";

/** 상품 12개 - 4개 컨셉(친환경/IT/프리미엄/로컬)에 실제 뮤지엄샵 상품을 배치 */
export const products: Product[] = [
  {
    id: "prod-01",
    name: "반가사유상 미니어처 ver3 (국보 제83호)",
    price: 65000,
    moq: 20,
    tags: ["프리미엄", "리더십"],
    regionTag: "서울", // 국립중앙박물관(서울) 대표 소장품
    image_url: "/products/bangasayusang.jpg",
    isPremium: true, // VIP → 홈 피드에서 blur 처리
    canPackage: true,
    esgScore: 60,
    koreanCulturalTags: ["불교미술", "국보"],
    isTraditionalCraft: true,
  },
  {
    id: "prod-02",
    name: "금동대향로 미니어처 (브론즈)",
    price: 99000,
    moq: 10,
    tags: ["프리미엄"],
    regionTag: "공주", // 백제 금동대향로 → 공주·부여 백제 문화권
    image_url: "/products/baekje-incense-burner.jpg",
    isPremium: true,
    canPackage: true,
    esgScore: 55,
    koreanCulturalTags: ["백제문화", "금속공예"],
    isTraditionalCraft: true,
  },
  {
    id: "prod-03",
    name: "신라 금관 부채손수건 세트",
    price: 35000,
    moq: 30,
    tags: ["친환경", "프리미엄"],
    regionTag: "경주", // 신라 금관 → 경주
    image_url: "/products/silla-crown-handkerchief.jpg",
    isPremium: false,
    canPackage: true,
    esgScore: 85,
    koreanCulturalTags: ["신라", "전통문양"],
    isTraditionalCraft: false,
  },
  {
    id: "prod-04",
    name: "경주 다보탑·석가탑 조립 키트",
    price: 15500,
    moq: 50,
    // 경주 프로젝트(p2: 경주 + 테마[교육,프리미엄])와 지역·테마 2개가 모두 일치 → 로컬 핏 90점
    tags: ["교육", "프리미엄"],
    regionTag: "경주", // 불국사 다보탑 → 경주
    image_url: "/products/gyeongju-dabotap-kit.jpg",
    isPremium: false,
    canPackage: true,
    esgScore: 70,
    koreanCulturalTags: ["신라", "전통건축"],
    isTraditionalCraft: false,
  },
  {
    id: "prod-05",
    name: "단청 무선 블루투스 키보드",
    price: 145000,
    moq: 10,
    tags: ["IT", "프리미엄"],
    regionTag: "서울",
    image_url: "/products/dancheong-keyboard.jpg",
    isPremium: true,
    canPackage: false,
    esgScore: 40,
    koreanCulturalTags: ["단청", "전통문양"],
    isTraditionalCraft: false,
  },
  {
    id: "prod-06",
    name: "대동여지도 노트",
    price: 8000,
    moq: 40,
    tags: ["로컬", "교육"],
    regionTag: "서울", // 김정호 대동여지도(기록유산)
    image_url: "/products/daedongyeojido-note.jpg",
    isPremium: false,
    canPackage: true,
    esgScore: 65,
    koreanCulturalTags: ["고지도", "기록유산"],
    isTraditionalCraft: false,
  },
  {
    id: "prod-07",
    name: "취객선비 3인방 변색 잔세트",
    price: 26000,
    moq: 30,
    tags: ["프리미엄"],
    regionTag: "경주", // 신라 주령구(안압지)의 풍류·놀이 문화 계열
    image_url: "/products/chwigaek-cup.jpg",
    isPremium: false,
    canPackage: true,
    esgScore: 60,
    koreanCulturalTags: ["신라", "전통놀이"],
    isTraditionalCraft: false,
  },
  {
    id: "prod-08",
    name: "곤룡포 비치(다용도) 타월",
    price: 45000,
    moq: 20,
    tags: ["친환경"],
    regionTag: null, // 특정 지역 연고 없음(전국)
    image_url: "/products/gonryongpo-towel.jpg",
    isPremium: false,
    canPackage: true,
    esgScore: 92,
    koreanCulturalTags: [], // 한국 문화 요소 없음 → 한국 핏 최저 (대비용)
    isTraditionalCraft: false,
  },
  {
    id: "prod-09",
    name: "동자석 인형 키링",
    price: 22000,
    moq: 40,
    tags: ["로컬", "친환경"],
    regionTag: "제주", // 제주 동자석(무덤 석상) 문화
    image_url: "/products/jeju-dongjaseok.jpg",
    isPremium: false,
    canPackage: true,
    esgScore: 80,
    koreanCulturalTags: ["제주", "석상문화"],
    isTraditionalCraft: true, // 석공예 → 한국 핏 가산점
  },
  {
    id: "prod-10",
    name: "대동여지도 한지 편지지 세트",
    price: 5000,
    moq: 60,
    tags: ["친환경", "로컬"],
    regionTag: "서울",
    image_url: "/products/daedongyeojido-letter.jpg",
    isPremium: false,
    canPackage: true,
    esgScore: 88,
    // 한국 문화 요소 3개 + 전통 공예(한지) → 한국 핏 90점 (한국 핏 최고 대비용)
    koreanCulturalTags: ["한지", "고지도", "기록유산"],
    isTraditionalCraft: true,
  },
  {
    id: "prod-11",
    name: "곤룡포 메탈 스티커 세트",
    price: 18000,
    moq: 40,
    tags: ["로컬"],
    regionTag: null,
    image_url: "/products/gonryongpo-sticker.jpg",
    isPremium: false,
    canPackage: true,
    esgScore: 50,
    koreanCulturalTags: ["왕실문화", "전통문양"],
    isTraditionalCraft: false,
  },
  {
    id: "prod-12",
    name: "금동대향로 미니어처 (실버)",
    price: 99000,
    moq: 10,
    tags: ["프리미엄", "리더십"],
    regionTag: "공주",
    image_url: "/products/baekje-incense-burner-silver.jpg",
    isPremium: false, // 같은 향로지만 이 색상은 일반 노출(블러 없음)로 대비
    canPackage: true,
    esgScore: 55,
    koreanCulturalTags: ["백제문화", "금속공예"],
    isTraditionalCraft: true,
  },
  {
    id: "prod-13",
    name: "동백꽃 손수건",
    price: 12000,
    moq: 40,
    // 기본 프로젝트(p1: 부산 + 테마[친환경,프리미엄])와 지역·테마 2개가 모두 일치 → 로컬 핏 90점
    tags: ["친환경", "프리미엄"],
    regionTag: "부산", // 동백꽃은 부산의 시화(市花) — 동백섬·해운대 상징
    image_url: "/products/busan-camellia-handkerchief.jpg",
    isPremium: false,
    canPackage: true,
    esgScore: 86,
    koreanCulturalTags: ["꽃문양", "전통자수"],
    isTraditionalCraft: false,
  },
  {
    id: "prod-14",
    name: "분청사기 물고기 가제수건",
    price: 9000,
    moq: 50,
    tags: ["친환경", "프리미엄"],
    regionTag: "부산", // 해양도시 부산 — 물고기(어문) 모티프로 연결
    image_url: "/products/busan-buncheong-fish-towel.jpg",
    isPremium: false,
    canPackage: true,
    esgScore: 84,
    koreanCulturalTags: ["분청사기", "물고기문양"],
    isTraditionalCraft: false,
  },
];

/**
 * 초기 사용자/세션 상태 (PRD 7.2 initialUserState)
 * - 데모 초기화 버튼이 이 값으로 전체 상태를 되돌린다.
 * - 기본 프로젝트(p1)는 지역 "부산" + 참가자 "mixed" 로 설정해,
 *   부산 상품(동백꽃 손수건 등)의 로컬 핏이 90점으로 튀고 한국 핏 배지도 노출되도록 했다.
 * - p2 는 지역 "경주" + "domestic"(국내 참가자만) → 경주 상품이 스타가 되고 한국 핏은 숨겨진다.
 *   두 프로젝트를 오가며 "같은 상품, 다른 프로젝트 → 다른 Fit 점수"를 보여줄 수 있다.
 */
export const initialUserState: UserState = {
  userName: "이수현",
  membership: "Pro",
  remainingTickets: 2,
  activeProjects: [
    {
      id: "p1",
      name: "2026 글로벌 리더십 서밋",
      totalBudget: 5000000,
      spentBudget: 1750000,
      eventRegion: "부산",
      eventThemeTags: ["친환경", "프리미엄"],
      audienceType: "mixed", // 내·외국인 혼합 → 한국 핏 노출
    },
    {
      id: "p2",
      name: "국내 우수사원 워크숍",
      totalBudget: 3000000,
      spentBudget: 800000,
      eventRegion: "경주",
      eventThemeTags: ["교육", "프리미엄"],
      audienceType: "domestic", // 국내 참가자만 → 한국 핏 숨김
    },
  ],
};

/** 초기 지출 내역 (예산 장부 데모용) - 실제 상품명 기반 */
export const initialSpending: SpendingEntry[] = [
  { id: "s1", projectId: "p1", label: "반가사유상 미니어처 20개", amount: 1300000, date: "2026-06-12" },
  { id: "s2", projectId: "p1", label: "언컴패키지 브랜딩 박스", amount: 450000, date: "2026-06-20" },
  { id: "s3", projectId: "p2", label: "곤룡포 비치타월 + 브랜딩", amount: 500000, date: "2026-07-01" },
  { id: "s4", projectId: "p2", label: "대동여지도 노트 300개", amount: 300000, date: "2026-07-10" },
];

/**
 * 프로젝트 생성 폼에서 사용할 선택지 목록
 * - regionOptions: 상품 regionTag 와 매칭되는 지역 셋 + 매칭 상품이 없는 지역(전주/통영)도
 *   포함해, "지역에 따라 로컬 핏이 달라진다"는 것을 데모에서 보여줄 수 있게 한다.
 * - themeOptions: 상품 tags 와 동일한 값 목록
 */
export const regionOptions = ["부산", "서울", "경주", "공주", "제주", "전주", "통영", "기타"];
export const themeOptions = ["리더십", "교육", "친환경", "IT", "프리미엄", "로컬"];
