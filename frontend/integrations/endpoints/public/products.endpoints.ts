// src/integrations/endpoints/public/products.endpoints.ts

import { baseApi } from '@/integrations/baseApi';
import type {
  ProductDto,
  ProductListQueryParams,
} from '@/integrations/shared/products.types';
import { normalizeProduct } from '@/integrations/shared/products.types';

export const productsPublicApi = baseApi.injectEndpoints({
  endpoints: (b) => ({
    listProductsPublic: b.query<ProductDto[], ProductListQueryParams | void>({
      query: (params) => {
        const q: Record<string, any> = {};
        if (params) {
          if (params.locale) q.locale = params.locale;
          if (params.default_locale) q.default_locale = params.default_locale;
          if (params.limit) q.limit = params.limit;
          if (params.offset) q.offset = params.offset;
          if (params.order) q.order = params.order;
          if (params.q) q.q = params.q;
          if (params.product_type) q.product_type = params.product_type;
          if (params.category) q.category = params.category;
          if (params.is_featured !== undefined) q.is_featured = params.is_featured;
        }
        return { url: '/products', params: q };
      },
      transformResponse: (resp: unknown) => {
        const arr = Array.isArray(resp) ? resp : [];
        return arr.map(normalizeProduct);
      },
      providesTags: () => [{ type: 'Products' as const, id: 'LIST' }],
    }),

    getProductBySlugPublic: b.query<ProductDto, { slug: string; locale?: string }>({
      query: ({ slug, locale }) => ({
        url: `/products/by-slug/${encodeURIComponent(slug)}`,
        params: locale ? { locale, default_locale: locale } : undefined,
      }),
      transformResponse: (resp: unknown) => normalizeProduct(resp),
      providesTags: (_res, _e, arg) => [{ type: 'Products' as const, id: `slug:${arg.slug}` }],
    }),

    getProductByIdPublic: b.query<ProductDto, { id: string; locale?: string }>({
      query: ({ id, locale }) => ({
        url: `/products/${id}`,
        params: locale ? { locale, default_locale: locale } : undefined,
      }),
      transformResponse: (resp: unknown) => normalizeProduct(resp),
      providesTags: (_res, _e, arg) => [{ type: 'Products' as const, id: arg.id }],
    }),
  }),
  overrideExisting: true,
});

export const {
  useListProductsPublicQuery,
  useGetProductBySlugPublicQuery,
  useGetProductByIdPublicQuery,
} = productsPublicApi;
