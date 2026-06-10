// =============================================================
// FILE: src/integrations/endpoints/admin/products_admin.endpoints.ts
// Admin Products (Site Packages) RTK Endpoints
// =============================================================

import { baseApi } from '@/integrations/baseApi';
import type {
  ApiProductAdmin,
  ProductDto,
  ProductListResult,
  ProductListAdminQueryParams,
  ProductCreatePayload,
  ProductUpdatePayload,
} from '@/integrations/shared/products.types';
import { normalizeProduct } from '@/integrations/shared/products.types';

export const productsAdminApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    listProductsAdmin: build.query<ProductListResult, ProductListAdminQueryParams | void>({
      query: (params) => ({
        url: '/admin/products',
        method: 'GET',
        params: params ?? {},
        credentials: 'include',
      }),
      transformResponse: (response: ApiProductAdmin[], meta) => {
        const items = Array.isArray(response) ? response.map(normalizeProduct) : [];
        const totalHeader = meta?.response?.headers.get('x-total-count');
        const totalFromHeader = totalHeader ? Number(totalHeader) : Number.NaN;
        const total = Number.isFinite(totalFromHeader) ? totalFromHeader : items.length;
        return { items, total };
      },
      providesTags: (result) =>
        result?.items
          ? [
              ...result.items.map(({ id }) => ({ type: 'Product' as const, id })),
              { type: 'Product' as const, id: 'LIST' },
            ]
          : [{ type: 'Product' as const, id: 'LIST' }],
    }),

    getProductAdmin: build.query<
      ProductDto,
      { id: string; locale?: string; default_locale?: string }
    >({
      query: ({ id, locale, default_locale }) => ({
        url: `/admin/products/${encodeURIComponent(id)}`,
        method: 'GET',
        credentials: 'include',
        params: { ...(locale ? { locale } : {}), ...(default_locale ? { default_locale } : {}) },
      }),
      transformResponse: (resp: ApiProductAdmin) => normalizeProduct(resp),
      providesTags: (_result, _error, { id }) => [{ type: 'Product', id }],
    }),

    getProductBySlugAdmin: build.query<
      ProductDto,
      { slug: string; locale?: string; default_locale?: string }
    >({
      query: ({ slug, locale, default_locale }) => ({
        url: `/admin/products/by-slug/${encodeURIComponent(slug)}`,
        method: 'GET',
        credentials: 'include',
        params: { ...(locale ? { locale } : {}), ...(default_locale ? { default_locale } : {}) },
      }),
      transformResponse: (resp: ApiProductAdmin) => normalizeProduct(resp),
      providesTags: (result) => (result ? [{ type: 'Product', id: result.id }] : []),
    }),

    createProductAdmin: build.mutation<ProductDto, ProductCreatePayload>({
      query: (body) => ({
        url: '/admin/products',
        method: 'POST',
        body,
        credentials: 'include',
      }),
      transformResponse: (resp: ApiProductAdmin) => normalizeProduct(resp),
      invalidatesTags: [{ type: 'Product', id: 'LIST' }],
    }),

    updateProductAdmin: build.mutation<ProductDto, { id: string; patch: ProductUpdatePayload }>({
      query: ({ id, patch }) => ({
        url: `/admin/products/${encodeURIComponent(id)}`,
        method: 'PATCH',
        body: patch,
        credentials: 'include',
      }),
      transformResponse: (resp: ApiProductAdmin) => normalizeProduct(resp),
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'Product', id },
        { type: 'Product', id: 'LIST' },
      ],
    }),

    deleteProductAdmin: build.mutation<void, { id: string }>({
      query: ({ id }) => ({
        url: `/admin/products/${encodeURIComponent(id)}`,
        method: 'DELETE',
        credentials: 'include',
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'Product', id },
        { type: 'Product', id: 'LIST' },
      ],
    }),

    reorderProductsAdmin: build.mutation<void, { items: { id: string; display_order: number }[] }>({
      query: (body) => ({
        url: '/admin/products/reorder',
        method: 'POST',
        body,
        credentials: 'include',
      }),
      invalidatesTags: [{ type: 'Product', id: 'LIST' }],
    }),
  }),
  overrideExisting: false,
});

export const {
  useListProductsAdminQuery,
  useGetProductAdminQuery,
  useGetProductBySlugAdminQuery,
  useCreateProductAdminMutation,
  useUpdateProductAdminMutation,
  useDeleteProductAdminMutation,
  useReorderProductsAdminMutation,
} = productsAdminApi;
