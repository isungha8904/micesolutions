# GiftCue (기프큐) — MICE 기념품 큐레이션 데모

MICE·기업 행사 담당자를 위한 **기념품 구독 큐레이션** B2B SaaS의 프론트엔드 데모입니다.
백엔드 없이 목(mock) 데이터 + 클라이언트 상태만으로 동작하며, 상품/가격/이미지는
국립박물관문화상품([museumshop.or.kr](https://www.museumshop.or.kr))의 실제 데이터를 로컬에 저장해 사용합니다.

## 핵심 기능
- **로컬 핏 / 한국 핏 점수**: 담당자가 입력한 행사 지역·테마·참가자 유형에 따라 상품 적합도를 실시간 계산 (KREAM 스타일 UI)
- **예산 장부**: 프로젝트별 예산 프로그레스 + 지출 내역 + 새 프로젝트 생성
- **ESG 대시보드**: 플라스틱/탄소 절감 인포그래픽 (Recharts)
- **샘플 티켓 / 발주·견적**: 티켓 차감·발주를 목으로 시뮬레이션
- **데모 초기화 버튼**: 새로고침 없이 초기 상태로 복원

## 로컬 실행
```bash
npm install
npm run dev
```
브라우저에서 http://localhost:3000 접속 → 잠금 화면에서 비밀번호 **`1234`** 입력.

## 빌드
```bash
npm run build && npm start
```

## Vercel 배포
1. 이 디렉터리를 GitHub 리포지토리로 푸시합니다.
2. [Vercel](https://vercel.com)에서 해당 리포를 Import → 별도 설정 없이 **Deploy** (환경변수 불필요).
3. 배포된 URL 접속 후 비밀번호 `1234` 로 입장.

## 기술 스택
Next.js(App Router) · TypeScript · Tailwind CSS · Zustand · Recharts

## 폴더 구조 (요약)
- `app/` — 페이지(홈/예산장부/ESG) + 비밀번호 게이트 + 레이아웃
- `components/` — 기능별로 분리된 컴포넌트 (layout / feed / product / ledger / esg / ui). 모든 파일에 한국어 설명 주석 포함
- `lib/` — 목데이터(`mockData.ts`), Fit 점수 계산(`scoring.ts`), 전역 상태(`store.ts`), 타입/포맷 유틸
- `public/products/` — 뮤지엄샵 상품 이미지(로컬 저장, 외부 네트워크 의존성 없음)

> 이번 MVP는 데모용이라 실제 백엔드/결제/인증/ESG 계산은 구현하지 않았습니다.
> 참여자별 개별 다중 배송 등은 Phase 2 확장 항목입니다. (PRD 참고)
