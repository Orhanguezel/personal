// =============================================================
// FILE: proxy.ts (Next.js 16+ — middleware yerine)
// — İlk path segmenti gerçek dil kodu değilse (örn. /destek, /support)
//   yanlışlıkla [locale] olarak eşleşmesin diye /{fallbackLocale}/... yönlendirir.
// — public/ui/*.json, assets, api, cv vb. dokunulmaz.
// =============================================================

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { FALLBACK_LOCALE, SUPPORTED_LOCALES } from '@/i18n/config';

const LOCALE_SET = new Set<string>(SUPPORTED_LOCALES);

/** Bu önekler “locale” değil; olduğu gibi bırakılır */
const RESERVED_FIRST_SEGMENTS = new Set([
  '_next',
  'api',
  'assets',
  'ui',
  'cv',
  'favicon.ico',
  'robots.txt',
  'sitemap.xml',
  'llms.txt',
]);

function hasStaticFileName(segment: string): boolean {
  return /\.[a-z0-9]{2,12}$/i.test(segment);
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length === 0) {
    return NextResponse.next();
  }

  const first = segments[0];

  if (RESERVED_FIRST_SEGMENTS.has(first) || hasStaticFileName(first)) {
    return NextResponse.next();
  }

  if (first.startsWith('.')) {
    return NextResponse.next();
  }

  if (LOCALE_SET.has(first)) {
    return NextResponse.next();
  }

  const envDefault = process.env.NEXT_PUBLIC_DEFAULT_LOCALE?.trim().toLowerCase().split('-')[0];
  const prefix =
    envDefault && LOCALE_SET.has(envDefault) ? envDefault : FALLBACK_LOCALE;

  const url = request.nextUrl.clone();
  url.pathname = `/${prefix}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
