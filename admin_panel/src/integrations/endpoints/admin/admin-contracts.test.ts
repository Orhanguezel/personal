import { afterEach, describe, expect, test } from 'bun:test';
import { configureStore } from '@reduxjs/toolkit';
import { baseApi } from '../../baseApi';
import { siteSettingsAdminApi } from './site_settings_admin.endpoints';
import { faqsAdminApi } from './faqs_admin.endpoints';
import { reviewsAdminApi } from './reviews_admin.endpoints';
import { customPagesAdminApi } from './custom_pages_admin.endpoints';
import { projectsAdminApi } from './projects_admin.endpoints';
import { footerSectionsAdminApi } from './footer_sections_admin.endpoints';
import { resumeAdminApi } from './resume.admin.endpoints';

const originalFetch = globalThis.fetch;
const stores: ReturnType<typeof makeStore>[] = [];
function makeStore() {
  return configureStore({ reducer: { [baseApi.reducerPath]: baseApi.reducer }, middleware: (gdm) => gdm().concat(baseApi.middleware) });
}
afterEach(() => {
  globalThis.fetch = originalFetch;
  for (const store of stores.splice(0)) store.dispatch(baseApi.util.resetApiState());
});
function harness() {
  const calls: Request[] = [];
  globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
    const req = input instanceof Request ? input : new Request(input, init);
    calls.push(req.clone());
    const path = new URL(req.url).pathname;
    const detail = { id: 'record-1', slug: 'record', title: 'Başlık', content: '{"html":"içerik"}', locale: 'de', locale_resolved: 'de' };
    const isList = /\/(faqs|reviews)$/.test(path);
    return new Response(JSON.stringify(isList ? [detail] : req.method === 'PUT' ? { ok: true } : detail), { headers: { 'Content-Type': 'application/json' } });
  }) as typeof fetch;
  const store = makeStore(); stores.push(store);
  return { store, calls };
}

describe('admin request contracts', () => {
  test('site-setting list, update and delete retain the selected locale', async () => {
    const { store, calls } = harness();
    await store.dispatch(siteSettingsAdminApi.endpoints.listSiteSettingsAdmin.initiate({ locale: 'tr', keys: ['ui_admin'] }, { subscribe: false })).unwrap();
    await store.dispatch(siteSettingsAdminApi.endpoints.updateSiteSettingAdmin.initiate({ key: 'ui_admin', value: false, locale: 'tr' })).unwrap();
    await store.dispatch(siteSettingsAdminApi.endpoints.deleteSiteSettingAdmin.initiate({ key: 'ui_admin', locale: '*' })).unwrap();
    expect(new URL(calls[0].url).searchParams.get('locale')).toBe('tr');
    const update = calls.find((r) => r.method === 'PUT')!;
    expect(new URL(update.url).searchParams.get('locale')).toBe('tr');
    expect(await update.json()).toEqual({ value: false });
    const del = calls.find((r) => r.method === 'DELETE')!;
    expect(new URL(del.url).pathname.endsWith('/site_settings/ui_admin')).toBe(true);
    expect(new URL(del.url).searchParams.get('locale')).toBe('*');
  });

  test('FAQ and review mutations refresh subscribed list and detail data', async () => {
    for (const [api, list, get, update, patch] of [
      [faqsAdminApi, 'listFaqsAdmin', 'getFaqAdmin', 'updateFaqAdmin', { is_active: false }],
      [reviewsAdminApi, 'listReviewsAdmin', 'getReviewAdmin', 'updateReviewAdmin', { is_approved: false }],
    ] as const) {
      const { store, calls } = harness(); const endpoints = api.endpoints as any;
      await store.dispatch(endpoints[list].initiate({ locale: 'de' })).unwrap();
      await store.dispatch(endpoints[get].initiate({ id: 'record-1', locale: 'de' })).unwrap();
      await store.dispatch(endpoints[update].initiate({ id: 'record-1', patch })).unwrap();
      await new Promise((resolve) => setTimeout(resolve, 30));
      expect(calls.filter((r) => r.method === 'GET')).toHaveLength(4);
    }
  });

  test('slug detail subscriptions refresh after updating their record ID', async () => {
    for (const [api, get, update, arg, mutation] of [
      [projectsAdminApi, 'getProjectBySlugAdmin', 'updateProjectAdmin', 'record', { id: 'record-1', patch: { is_published: false } }],
      [customPagesAdminApi, 'getCustomPageBySlugAdmin', 'updateCustomPageAdmin', { slug: 'record' }, { id: 'record-1', patch: { title: 'Yeni başlık' } }],
      [footerSectionsAdminApi, 'getFooterSectionBySlugAdmin', 'updateFooterSectionAdmin', 'record', { id: 'record-1', data: { title: 'Yeni başlık' } }],
      [resumeAdminApi, 'getResumeBySlugAdmin', 'updateResumeAdmin', { slug: 'record' }, { id: 'record-1', body: { title: 'Yeni başlık' } }],
    ] as const) {
      const { store, calls } = harness(); const endpoints = api.endpoints as any;
      await store.dispatch(endpoints[get].initiate(arg)).unwrap();
      await store.dispatch(endpoints[update].initiate(mutation)).unwrap();
      await new Promise((resolve) => setTimeout(resolve, 30));
      expect(calls.filter((r) => r.method === 'GET')).toHaveLength(2);
    }
  });
});

test('parallel unauthorized queries share one token refresh', async () => {
  let refreshCount = 0;
  const attempts = new Map<string, number>();
  globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
    const req = input instanceof Request ? input : new Request(input, init);
    if (req.url.includes('/auth/token/refresh')) {
      refreshCount++;
      await new Promise((resolve) => setTimeout(resolve, 20));
      return Response.json({ access_token: 'mock-access' });
    }
    const count = (attempts.get(req.url) || 0) + 1;
    attempts.set(req.url, count);
    return count === 1 ? Response.json({ error: 'expired' }, { status: 401 }) : Response.json([]);
  }) as typeof fetch;
  const store = makeStore(); stores.push(store);
  const results = await Promise.all([
    store.dispatch(faqsAdminApi.endpoints.listFaqsAdmin.initiate({ locale: 'tr' })).unwrap(),
    store.dispatch(faqsAdminApi.endpoints.listFaqsAdmin.initiate({ locale: 'de' })).unwrap(),
  ]);
  expect(results).toEqual([[], []]);
  expect(refreshCount).toBe(1);
});
