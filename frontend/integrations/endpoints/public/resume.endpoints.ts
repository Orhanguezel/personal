// -------------------------------------------------------------
// FILE: frontend/src/integrations/endpoints/resume.endpoints.ts
// FINAL — Public resume endpoints
// - base: /resume
// - Supports default_locale fallback via toPublicQuery
// - FIX: wrapper tolerant (transformResponse)
// - FIX: reduce "empty cache stuck" with refetch + keepUnusedDataFor
// -------------------------------------------------------------
import { baseApi } from '@/integrations/baseApi';
import type {
  ResumeGroupedResponse,
  ResumeMerged,
  ResumeListParams,
  GetResumeEntryParams,
  GetResumeBySlugParams,
} from '@/integrations/shared';
import { toPublicQuery } from '@/integrations/shared';

const BASE = '/resume';

function unwrap<T>(raw: any): T {
  return (raw?.data ?? raw?.result ?? raw?.payload ?? raw) as T;
}

export const resumeApi = baseApi.injectEndpoints({
  endpoints: (b) => ({
    getResume: b.query<ResumeGroupedResponse, ResumeListParams | void>({
      query: (p) => ({ url: BASE, params: toPublicQuery(p) }),
      transformResponse: (raw: any) => unwrap<ResumeGroupedResponse>(raw),
      // ✅ cache stuck riskini düşürür
      keepUnusedDataFor: 5,
      providesTags: () => [{ type: 'Resume' as const, id: 'PUBLIC' }],
    }),

    getResumeEntry: b.query<ResumeMerged, GetResumeEntryParams>({
      query: ({ id, locale, default_locale }) => ({
        url: `${BASE}/${id}`,
        params: { ...(locale ? { locale } : {}), ...(default_locale ? { default_locale } : {}) },
      }),
      transformResponse: (raw: any) => unwrap<ResumeMerged>(raw),
      keepUnusedDataFor: 5,
      providesTags: (_res, _e, arg) => [{ type: 'Resume' as const, id: arg.id }],
    }),

    getResumeEntryBySlug: b.query<ResumeMerged, GetResumeBySlugParams>({
      query: ({ slug, locale, default_locale }) => ({
        url: `${BASE}/by-slug/${slug}`,
        params: { ...(locale ? { locale } : {}), ...(default_locale ? { default_locale } : {}) },
      }),
      transformResponse: (raw: any) => unwrap<ResumeMerged>(raw),
      keepUnusedDataFor: 5,
      providesTags: (_res, _e, arg) => [{ type: 'Resume' as const, id: `slug:${arg.slug}` }],
    }),
  }),
  overrideExisting: true,
});

export const { useGetResumeQuery, useGetResumeEntryQuery, useGetResumeEntryBySlugQuery } =
  resumeApi;
