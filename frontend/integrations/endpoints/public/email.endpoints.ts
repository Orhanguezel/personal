// =============================================================
// FILE: src/integrations/metahub/rtk/endpoints/email.endpoints.ts
// =============================================================
import { baseApi } from '@/integrations/baseApi';
import type { EmailView, BoolLike } from '@/integrations/shared';
import { toView } from '@/integrations/shared';

export const emailTemplatesApi = baseApi.injectEndpoints({
  endpoints: (b) => ({
    // NOT: backend endpoint’in /email olduğuna göre burada böyle bırakıyorum
    listEmailTemplates: b.query<EmailView[], { locale?: string; is_active?: BoolLike } | void>({
      query: () => ({ url: '/email' }),
      transformResponse: (res: unknown): EmailView[] =>
        Array.isArray(res) ? (res as unknown[]).map(toView) : [],
      providesTags: (result) =>
        result
          ? [
              ...result.map((t) => ({
                type: 'EmailTemplate' as const,
                id: t.id,
              })),
              { type: 'EmailTemplate' as const, id: 'LIST' },
            ]
          : [{ type: 'EmailTemplate' as const, id: 'LIST' }],
    }),

    getEmailTemplateByKey: b.query<EmailView, { key: string; locale?: string }>({
      query: ({ key, locale }) => ({
        url: `/email/by-key/${key}`,
        params: { locale },
      }),
      transformResponse: (res: unknown): EmailView => toView(res),
      providesTags: (_r, _e, { key }) => [{ type: 'EmailTemplate', id: `KEY_${key}` }],
    }),
  }),
  overrideExisting: true,
});

export const { useListEmailTemplatesQuery, useGetEmailTemplateByKeyQuery } = emailTemplatesApi;
