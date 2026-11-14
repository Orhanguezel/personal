// src/common/middleware/locale.ts

import type { FastifyReply, FastifyRequest } from "fastify";
import {
  resolveLocaleFromHeaders,
  fallbackChain,
  ensureLocalesLoadedFromSettings,
  type Locale,
  isSupported,
  normalizeLocale,
} from "@/core/i18n";

export async function localeMiddleware(
  req: FastifyRequest,
  _reply: FastifyReply,
) {
  // 🔄 Her istekte (veya 60sn cache süresi dolduysa) siteSettings.app_locales'i kontrol et
  await ensureLocalesLoadedFromSettings();

  const { locale } = resolveLocaleFromHeaders(
    req.headers as Record<string, unknown>,
  );

  const requested=normalizeLocale(typeof (req.query as any)?.locale==='string'?(req.query as any).locale:undefined);
  const selected=requested&&isSupported(requested)?requested:locale;
  (req as any).locale = selected as Locale;
  (req as any).localeFallbacks = fallbackChain(selected as Locale);

  // İstersen debug log:
  // req.log?.debug?.({ locale, fallbacks: (req as any).localeFallbacks }, "locale_resolved");
}
