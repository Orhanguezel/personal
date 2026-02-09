// =============================================================
// FILE: src/integrations/endpoints/site_settings.endpoints.ts (PUBLIC)
// FINAL — includes META endpoints (app-locales + default-locale)
// - No helpers inside; everything from types barrel
// =============================================================

import { baseApi } from '@/integrations/baseApi';

import type { SiteSetting, AppLocaleMeta } from '@/integrations/shared';

import {
  buildPublicSiteSettingsListParams,
  normalizePublicSiteSetting,
  normalizePublicSiteSettingItem,
  normalizeSiteSettingKey,
  resolveSiteSettingKeyArg,
  type PublicSiteSettingGetArg,
  type PublicSiteSettingsListArg,
  normalizeAppLocalesPublic,
  normalizeDefaultLocalePublic,
} from '@/integrations/shared';

const PUBLIC_BASE = '/site_settings';

const extendedApi = baseApi.enhanceEndpoints({
  addTagTypes: ['SiteSettings'] as const,
});

export const siteSettingsApi = extendedApi.injectEndpoints({
  endpoints: (b) => ({
    /** GET /site_settings */
    listSiteSettings: b.query<SiteSetting[], PublicSiteSettingsListArg>({
      query: (arg) => {
        const params = buildPublicSiteSettingsListParams(arg);
        return params ? { url: PUBLIC_BASE, params } : { url: PUBLIC_BASE };
      },
      transformResponse: (res: unknown): SiteSetting[] => {
        const arr = Array.isArray(res)
          ? (res as Array<{ key: string; value: unknown; updated_at?: string }>)
          : [];
        return arr.map(normalizePublicSiteSettingItem);
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map((s) => ({ type: 'SiteSettings' as const, id: s.key })),
              { type: 'SiteSettings' as const, id: 'LIST' },
            ]
          : [{ type: 'SiteSettings' as const, id: 'LIST' }],
      keepUnusedDataFor: 60,
    }),

    /** GET /site_settings/:key */
    getSiteSettingByKey: b.query<SiteSetting | null, PublicSiteSettingGetArg>({
      query: (arg) => {
        const a = resolveSiteSettingKeyArg(arg);
        const key = normalizeSiteSettingKey(a.key);

        return {
          url: `${PUBLIC_BASE}/${encodeURIComponent(key)}`,
          params: {
            ...(a.locale ? { locale: a.locale } : {}),
            ...(a.default_locale ? { default_locale: a.default_locale } : {}),
          },
        };
      },
      transformResponse: (res: unknown): SiteSetting | null => normalizePublicSiteSetting(res),
      providesTags: (_r, _e, arg) => {
        const k = normalizeSiteSettingKey(resolveSiteSettingKeyArg(arg).key);
        return [{ type: 'SiteSettings', id: k }];
      },
      keepUnusedDataFor: 60,
    }),

    // =========================================================
    // META — DYNAMIC LOCALES
    // =========================================================

    /** GET /site_settings/app-locales */
    getAppLocalesPublic: b.query<AppLocaleMeta[], void>({
      query: () => ({ url: `${PUBLIC_BASE}/app-locales` }),
      transformResponse: (res: unknown): AppLocaleMeta[] => normalizeAppLocalesPublic(res),
      providesTags: () => [{ type: 'SiteSettings', id: 'META_APP_LOCALES' }],
      keepUnusedDataFor: 60,
    }),

    /** GET /site_settings/default-locale */
    getDefaultLocalePublic: b.query<string, void>({
      query: () => ({ url: `${PUBLIC_BASE}/default-locale` }),
      transformResponse: (res: unknown): string => normalizeDefaultLocalePublic(res),
      providesTags: () => [{ type: 'SiteSettings', id: 'META_DEFAULT_LOCALE' }],
      keepUnusedDataFor: 60,
    }),
  }),
  overrideExisting: true,
});

export const {
  useListSiteSettingsQuery,
  useGetSiteSettingByKeyQuery,
  useGetAppLocalesPublicQuery,
  useGetDefaultLocalePublicQuery,
} = siteSettingsApi;
