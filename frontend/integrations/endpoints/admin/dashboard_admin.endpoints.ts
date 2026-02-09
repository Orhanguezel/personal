// =============================================================
// FILE: src/integrations/metahub/rtk/endpoints/admin/dashboard_admin.endpoints.ts
// =============================================================
import { baseApi } from '@/integrations/baseApi';
import type { ProductLite, UserLite } from '@/integrations/shared';
import { toCountQuery, coerceCount, toListQuery, coerceItems } from '@/integrations/shared';

// ---- API -----------------------------------------------------
export const dashboardAdminApi = baseApi.injectEndpoints({
  endpoints: (b) => ({
    // Counts
    countProducts: b.query<number, void>({
      query: () => toCountQuery('/admin/products/list'),
      transformResponse: (res, meta) => coerceCount(res, meta),
      providesTags: [{ type: 'Products', id: 'COUNT' }],
    }),
    countCategories: b.query<number, void>({
      query: () => toCountQuery('/admin/categories/list'),
      transformResponse: (res, meta) => coerceCount(res, meta),
      providesTags: [{ type: 'Categories', id: 'COUNT' }],
    }),
    countSubCategories: b.query<number, void>({
      query: () => toCountQuery('/admin/sub-categories/list'),
      transformResponse: (res, meta) => coerceCount(res, meta),
      providesTags: [{ type: 'SubCategories', id: 'COUNT' }],
    }),
    countUsers: b.query<number, void>({
      query: () => toCountQuery('/admin/users/list'),
      transformResponse: (res, meta) => coerceCount(res, meta),
      providesTags: [{ type: 'Users', id: 'COUNT' }],
    }),

    countPages: b.query<number, void>({
      query: () => toCountQuery('/admin/custom-pages/list'),
      transformResponse: (res, meta) => coerceCount(res, meta),
      providesTags: [{ type: 'Pages', id: 'COUNT' }],
    }),
    countServices: b.query<number, void>({
      query: () => toCountQuery('/admin/services/list'),
      transformResponse: (res, meta) => coerceCount(res, meta),
      providesTags: [{ type: 'Services', id: 'COUNT' }],
    }),
    countContacts: b.query<number, void>({
      query: () => toCountQuery('/admin/contacts/list'),
      transformResponse: (res, meta) => coerceCount(res, meta),
      providesTags: [{ type: 'Contacts', id: 'COUNT' }],
    }),
    countSliders: b.query<number, void>({
      query: () => toCountQuery('/admin/sliders/list'),
      transformResponse: (res, meta) => coerceCount(res, meta),
      providesTags: [{ type: 'Sliders', id: 'COUNT' }],
    }),
    countAccessories: b.query<number, void>({
      query: () => toCountQuery('/admin/accessories/list'),
      transformResponse: (res, meta) => coerceCount(res, meta),
      providesTags: [{ type: 'Accessories', id: 'COUNT' }],
    }),
    countCampaigns: b.query<number, void>({
      query: () => toCountQuery('/admin/campaigns/list'),
      transformResponse: (res, meta) => coerceCount(res, meta),
      providesTags: [{ type: 'Campaigns', id: 'COUNT' }],
    }),
    countAnnouncements: b.query<number, void>({
      query: () => toCountQuery('/admin/announcements/list'),
      transformResponse: (res, meta) => coerceCount(res, meta),
      providesTags: [{ type: 'Announcements', id: 'COUNT' }],
    }),
    countReviews: b.query<number, void>({
      query: () => toCountQuery('/admin/product-reviews/list'),
      transformResponse: (res, meta) => coerceCount(res, meta),
      providesTags: [{ type: 'Reviews', id: 'COUNT' }],
    }),

    // Latest lists (Dashboard tabloları)
    latestProducts: b.query<ProductLite[], number | void>({
      query: (limit = 10) => toListQuery('/admin/products/list', { limit }),
      transformResponse: (res) => coerceItems<ProductLite>(res),
      providesTags: (res) =>
        Array.isArray(res)
          ? [
              ...res.map((x) => ({ type: 'Products' as const, id: x.id })),
              { type: 'Products' as const, id: 'LATEST' },
            ]
          : [{ type: 'Products' as const, id: 'LATEST' }],
    }),

    latestUsers: b.query<UserLite[], number | void>({
      query: (limit = 10) => toListQuery('/admin/users/list', { limit }),
      transformResponse: (res) => coerceItems<UserLite>(res),
      providesTags: (res) =>
        Array.isArray(res)
          ? [
              ...res.map((x) => ({ type: 'Users' as const, id: x.id })),
              { type: 'Users' as const, id: 'LATEST' },
            ]
          : [{ type: 'Users' as const, id: 'LATEST' }],
    }),
  }),
  overrideExisting: true,
});

export const {
  // counts
  useCountProductsQuery,
  useCountCategoriesQuery,
  useCountSubCategoriesQuery,
  useCountUsersQuery,
  useCountPagesQuery,
  useCountServicesQuery,
  useCountContactsQuery,
  useCountSlidersQuery,
  useCountAccessoriesQuery,
  useCountCampaignsQuery,
  useCountAnnouncementsQuery,
  useCountReviewsQuery,
  // latest
  useLatestProductsQuery,
  useLatestUsersQuery,
} = dashboardAdminApi;
