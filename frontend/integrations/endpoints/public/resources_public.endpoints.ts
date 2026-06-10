import { baseApi } from '@/integrations/baseApi';

export type PublicResource = {
  id: string;
  type: string;
  title: string;
  label: string;
  capacity: number;
  external_ref_id: string | null;
};

export type PublicResourcesQuery = {
  type?: string;
};

function normalizeResource(raw: unknown): PublicResource {
  const r = (raw ?? {}) as Record<string, unknown>;
  const title = String(r.title ?? r.label ?? '').trim();

  return {
    id: String(r.id ?? '').trim(),
    type: String(r.type ?? 'other').trim() || 'other',
    title,
    label: String(r.label ?? title).trim() || title,
    capacity: Number.isFinite(Number(r.capacity)) ? Number(r.capacity) : 1,
    external_ref_id: typeof r.external_ref_id === 'string' ? r.external_ref_id : null,
  };
}

export const resourcesPublicApi = baseApi.injectEndpoints({
  endpoints: (b) => ({
    listResourcesPublic: b.query<PublicResource[], PublicResourcesQuery | void>({
      query: (params) => ({
        url: '/resources',
        method: 'GET',
        params: params ?? undefined,
      }),
      transformResponse: (res: unknown): PublicResource[] =>
        Array.isArray(res) ? res.map(normalizeResource).filter((item) => item.id && item.title) : [],
    }),
  }),
  overrideExisting: true,
});

export const { useListResourcesPublicQuery } = resourcesPublicApi;
