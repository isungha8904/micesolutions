/**
 * Next.js 설정 파일
 * -------------------------------------------------------------
 * 상품 이미지는 전부 /public/products 에 로컬 저장되어 있어(뮤지엄샵에서 다운로드)
 * 외부 이미지 도메인 설정이 필요 없다 → 데모 중 네트워크로 인한 이미지 깨짐 없음.
 * 데모 목적이므로 별도 환경변수 없이 기본 설정만으로 동작한다.
 */
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = nextConfig;
