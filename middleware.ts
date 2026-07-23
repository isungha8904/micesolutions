/**
 * 미들웨어 - 비밀번호 게이트
 * -------------------------------------------------------------
 * 앱 전체를 하드코딩 비밀번호(1234) 잠금 화면 뒤에 둔다. (PRD 7.1 / 7.0)
 * - 인증 쿠키(gc_auth=ok)가 없으면 /gate 로 보낸다.
 * - /gate 및 정적 리소스(_next, 이미지 등)는 통과시킨다.
 * ※ 실제 인증/회원가입은 구현하지 않는 데모용 게이트다.
 */
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 게이트 페이지 자체는 항상 통과 (무한 리다이렉트 방지)
  if (pathname.startsWith("/gate")) {
    return NextResponse.next();
  }

  // 인증 쿠키 확인
  const authed = request.cookies.get("gc_auth")?.value === "ok";
  if (!authed) {
    // 미인증 → 게이트로 리다이렉트
    const url = request.nextUrl.clone();
    url.pathname = "/gate";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

/**
 * 미들웨어 적용 범위
 * - 정적 파일/이미지(_next, products, favicon 등)는 제외해 게이트 없이 로드되게 한다.
 */
export const config = {
  matcher: ["/((?!_next/static|_next/image|products|favicon.ico).*)"],
};
