// ===================================================================
// FILE: src/integrations/endpoints/public/newsletter_public.endpoints.ts
// FINAL — Newsletter Public RTK (Single Language)
// Backend:
// - POST /newsletter/subscribe
// - POST /newsletter/unsubscribe
// ===================================================================

import { baseApi } from '@/integrations/baseApi';
import type {
  NewsletterPublicSubscribeBody,
  NewsletterPublicUnsubscribeBody,
  NewsletterPublicSubscriber,
  NewsletterUnsubscribeResp,
} from '@/integrations/shared';
import {
  normalizeNewsletterPublicSubscriber,
  toNewsletterSubscribeBody,
  toNewsletterUnsubscribeBody,
} from '@/integrations/shared';

const BASE = '/newsletter';

export const newsletterPublicApi = baseApi.injectEndpoints({
  endpoints: (b) => ({
    subscribeNewsletter: b.mutation<NewsletterPublicSubscriber, NewsletterPublicSubscribeBody>({
      query: (body) => ({
        url: `${BASE}/subscribe`,
        method: 'POST',
        body: toNewsletterSubscribeBody(body),
      }),
      transformResponse: (res: unknown): NewsletterPublicSubscriber =>
        normalizeNewsletterPublicSubscriber(res),
      invalidatesTags: [{ type: 'Newsletter' as const, id: 'ME' }],
    }),

    unsubscribeNewsletter: b.mutation<NewsletterUnsubscribeResp, NewsletterPublicUnsubscribeBody>({
      query: (body) => ({
        url: `${BASE}/unsubscribe`,
        method: 'POST',
        body: toNewsletterUnsubscribeBody(body),
      }),
      transformResponse: (res: unknown): NewsletterUnsubscribeResp => {
        const r = (res ?? {}) as any;
        // backend returns { ok: true }
        if (r && (r.ok === true || r.ok === 1 || r.ok === '1')) return { ok: true as const };
        return { ok: true as const }; // enumeration-safe; treat as ok
      },
      invalidatesTags: [{ type: 'Newsletter' as const, id: 'ME' }],
    }),
  }),
  overrideExisting: true,
});

export const { useSubscribeNewsletterMutation, useUnsubscribeNewsletterMutation } =
  newsletterPublicApi;
