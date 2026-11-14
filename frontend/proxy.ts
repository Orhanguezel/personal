// =============================================================
// FILE: proxy.ts (Next.js 16+ — middleware yerine)
// — İlk path segmenti gerçek dil kodu değilse (örn. /destek, /support)
//   yanlışlıkla [locale] olarak eşleşmesin diye /{fallbackLocale}/... yönlendirir.
// — public/ui/*.json, assets, api, cv vb. dokunulmaz.
// =============================================================

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import {BASE_URL} from '@/integrations/apiBase';
import {routeFromSegment,localizePath} from '@/i18n/routes';
import { FALLBACK_LOCALE, SUPPORTED_LOCALES } from '@/i18n/config';

const LOCALE_SET = new Set<string>(SUPPORTED_LOCALES);

/** Bu önekler “locale” değil; olduğu gibi bırakılır */
const RESERVED_FIRST_SEGMENTS = new Set([
  '_next',
  'api',
  '__content',
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

export async function proxy(request: NextRequest) {
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
    if(process.env.NEXT_PUBLIC_SHARED_CONTENT==='1'){
      const route=routeFromSegment(first,segments[1])||segments[1];
      const kind=({work:'projects',services:'services',products:'products',blog:'blog'}as Record<string,string>)[route];
      const host=request.headers.get('host')||'';const target=first==='tr'?'https://gzlteknoloji.com':'https://www.guezelwebdesign.com';
      if(kind&&segments[2]){
        const preview=request.cookies.get('content_preview')?.value;if(preview){const r=await fetch(`${BASE_URL}/content/preview`,{cache:'no-store',headers:{'x-content-preview':preview}});if(r.ok){const p=await r.json();if(p.kind===kind&&p.locale===first&&p.data.slug===decodeURIComponent(segments[2])){const out=NextResponse.next();out.headers.set('X-Robots-Tag','noindex, nofollow');out.headers.set('Cache-Control','private, no-store');return out;}}}

        try{const r=await fetch(`${BASE_URL}/content/resolve?${new URLSearchParams({kind,locale:first,slug:decodeURIComponent(segments[2])})}`,{cache:'no-store',signal:AbortSignal.timeout(5000)});
          if(r.status===404)return new NextResponse('İçerik bulunamadı',{status:404,headers:{'Cache-Control':'no-store','X-Robots-Tag':'noindex'}});
          if(!r.ok)throw Error('content_unavailable');const entry=await r.json();
          const canonical=new URL(entry.canonical);if(canonical.host!==host||canonical.pathname!==pathname)return NextResponse.redirect(canonical,301);
          const response=NextResponse.next();response.headers.set('x-content-revision',String(entry.revision));response.headers.set('Cache-Control','private, no-store');return response;
        }catch{return new NextResponse('İçerik geçici olarak kullanılamıyor',{status:503,headers:{'Cache-Control':'no-store','Retry-After':'30'}});}
      }
      if((kind||segments.length===1)&&new URL(target).host!==host)return NextResponse.redirect(new URL('/'+first+(route?localizePath(first,'/'+route):'')+request.nextUrl.search,target),301);
    }
    return NextResponse.next();
  }

  const envDefault = process.env.NEXT_PUBLIC_DEFAULT_LOCALE?.trim().toLowerCase().split('-')[0];
  const prefix =
    envDefault && LOCALE_SET.has(envDefault) ? envDefault : FALLBACK_LOCALE;

  // Yonlendirme hedefi ISTEGIN KENDI HOST'undan kurulur.
  //
  // `NextResponse.redirect(request.nextUrl.clone())` kullanilamaz: Next host'u
  // istek basligindan degil kendi origin'inden aliyor ve nginx
  // "Host: gzlteknoloji.com" gonderse bile Location
  // "http://localhost:3120/tr/contact" cikiyordu — /contact'a tiklayan
  // ZIYARETCI localhost'a gidiyordu (2026-08-09, hero'daki "Teklif alin"
  // butonunda goruldu; iki deployment'i da etkiliyordu).
  //
  // Goreli Location da olmuyor: middleware yanitindaki Location'i Next
  // ayristirdigi icin "ERR_INVALID_URL" ile 500 veriyor. Bu yuzden mutlak URL
  // uretiliyor, ancak host/proto istekten okunuyor.
  const search = request.nextUrl.search || '';
  const fwdHost = request.headers.get('x-forwarded-host')?.trim();
  const host = fwdHost || request.headers.get('host')?.trim() || '';
  const proto =
    request.headers.get('x-forwarded-proto')?.trim() ||
    (host.startsWith('localhost') || host.startsWith('127.0.0.1') ? 'http' : 'https');

  const base = host
    ? `${proto}://${host}`
    : process.env.NEXT_PUBLIC_SITE_URL?.trim() || request.nextUrl.origin;

  return NextResponse.redirect(new URL(`/${prefix}${pathname}${search}`, base));
}

export const config = {
  // `uploads` HARIC TUTULMALI: bu yol backend'in medya dosyalarina proxy'lenir
  // (next.config.mjs -> rewrites). Middleware onu da locale yonlendirmesine
  // sokunca /uploads/... -> /tr/uploads/... 307 donuyor, Next resim optimizer'i
  // gorsel yerine yonlendirme aliyor ve 400 uretiyordu; sitedeki logo, urun,
  // blog ve fiyat gorselleri bu yuzden kiriktI (2026-08-09).
  matcher: ['/((?!_next/static|_next/image|uploads|favicon.ico).*)'],
};
