// =============================================================
// FILE: frontend/app/page.tsx
// FINAL — Redirect / -> /{defaultLocale} (DB-backed, fallback)
// - Uses server helper (no duplicated logic)
// =============================================================

import { redirect } from 'next/navigation';
import { getDefaultLocaleServer } from '@/i18n/defaultLocale.server';

// ÖNBELLEĞE ALINMAZ — bilerek.
// Bu sayfa varsayılan dili DB'den okuyup yönlendirir. Prerender/ISR ile
// önbelleğe alındığında, API'ye erişilemeyen tek bir an bile "Location
// başlığı olmayan 307" üretiyor ve bu bozuk yanıt önbellekte KALICI hale
// geliyordu (x-nextjs-cache: HIT) — uygulama düzeldikten sonra bile site
// kökü açılmıyordu. 2026-08-08'de hem guezelwebdesign.com hem de
// gzlteknoloji.com bu yüzden koptu.
// Yönlendirme her istekte yeniden çözülür: geçici hata geçici kalır.
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function RootRedirect() {
  const locale = await getDefaultLocaleServer();
  redirect(`/${locale}`);
}
