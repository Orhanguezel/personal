// src/plugins/i18n-locale.ts
import type { FastifyPluginCallback } from "fastify";
import { fallbackChain, resolveLocaleFromHeaders } from "@/core/i18n";

export const i18nLocalePlugin: FastifyPluginCallback = (app, _opts, done) => {
  app.addHook("onRequest", async (req) => {
    const { locale } = resolveLocaleFromHeaders(req.headers as any);
    (req as any).locale = locale;
    (req as any).localeFallbacks = fallbackChain(locale);
  });
  done();
};
