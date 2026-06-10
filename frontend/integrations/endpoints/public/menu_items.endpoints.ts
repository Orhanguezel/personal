// =============================================================
// FILE: src/integrations/endpoints/menu_items.endpoints.ts
// konigsmassage – Public Menu Items RTK endpoints
// =============================================================

import { baseApi } from '@/integrations/baseApi';
import type {
  PublicMenuItemDto,
  PublicMenuItemListQueryParams,
  MenuItemListResponse,
  MetaWithHeaders,
} from '@/integrations/shared';
import { parseTotalFromMeta } from '@/integrations/shared';

const BASE = '/menu_items';

export const menuItemsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // LIST – GET /menu_items
    listMenuItems: build.query<
      MenuItemListResponse<PublicMenuItemDto>,
      PublicMenuItemListQueryParams | void
    >({
      query: (params?: PublicMenuItemListQueryParams) => ({
        url: `${BASE}`,
        method: 'GET',
        params,
      }),
      transformResponse: (data: PublicMenuItemDto[], meta?: MetaWithHeaders) => {
        const total = parseTotalFromMeta(data?.length ?? 0, meta);
        return {
          items: data ?? [],
          total,
        };
      },
      providesTags: (result) =>
        result?.items
          ? [
              { type: 'MenuItemPublic' as const, id: 'LIST' },
              ...result.items.map((m) => ({
                type: 'MenuItemPublic' as const,
                id: m.id,
              })),
            ]
          : [{ type: 'MenuItemPublic' as const, id: 'LIST' }],
    }),

    // GET by id – GET /menu_items/:id
    // locale destekli: arg.id + arg.locale
    getMenuItem: build.query<PublicMenuItemDto, { id: string; locale?: string }>({
      query: ({ id, locale }) => ({
        url: `${BASE}/${encodeURIComponent(id)}`,
        method: 'GET',
        params: locale ? { locale } : undefined,
      }),
      providesTags: (_r, _e, arg) => [{ type: 'MenuItemPublic' as const, id: arg.id }],
    }),
  }),
  overrideExisting: false,
});

export const { useListMenuItemsQuery, useGetMenuItemQuery } = menuItemsApi;
