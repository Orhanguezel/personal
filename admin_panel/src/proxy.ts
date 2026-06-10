import { NextResponse, type NextRequest } from 'next/server';

const ADMIN_PREFIX = '/admin';
const LOGIN_PATH = '/auth/login';
const TOKEN_COOKIE_NAMES = ['mh_access_token', 'access_token', 'accessToken'];

function hasAuthCookie(req: NextRequest): boolean {
  return TOKEN_COOKIE_NAMES.some((name) => {
    const value = req.cookies.get(name)?.value;
    return typeof value === 'string' && value.trim().length > 0;
  });
}

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (!pathname.startsWith(ADMIN_PREFIX)) {
    return NextResponse.next();
  }

  if (hasAuthCookie(req)) {
    return NextResponse.next();
  }

  const url = req.nextUrl.clone();
  url.pathname = LOGIN_PATH;
  url.searchParams.set('next', pathname);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/admin/:path*'],
};
