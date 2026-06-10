// =============================================================
// FILE: frontend/app/page.tsx
// FINAL — Redirect / -> /{defaultLocale} (DB-backed, fallback)
// - Uses server helper (no duplicated logic)
// =============================================================

import { redirect } from 'next/navigation';
import { getDefaultLocaleServer } from '@/i18n/defaultLocale.server';

export default async function RootRedirect() {
  const locale = await getDefaultLocaleServer();
  redirect(`/${locale}`);
}
