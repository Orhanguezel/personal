import { baseApi } from '@/integrations/baseApi';
import type {
  LinkedInStatus,
  SocialPost,
  SocialPostListParams,
  SocialPostPatch,
} from '@/integrations/shared/social';

const BASE = '/admin/social-posts';

export const socialAdminApi = baseApi.injectEndpoints({
  endpoints: (b) => ({
    listSocialPostsAdmin: b.query<SocialPost[], SocialPostListParams | void>({
      query: (params) => ({ url: BASE, params: params ?? undefined }),
      providesTags: () => [{ type: 'SocialPosts' as const, id: 'LIST' }],
    }),

    updateSocialPostAdmin: b.mutation<SocialPost, { id: string; patch: SocialPostPatch }>({
      query: ({ id, patch }) => ({
        url: `${BASE}/${encodeURIComponent(id)}`,
        method: 'PATCH',
        body: patch,
      }),
      invalidatesTags: (_res, _error, { id }) => [
        { type: 'SocialPosts' as const, id },
        { type: 'SocialPosts' as const, id: 'LIST' },
      ],
    }),

    approveSocialPostAdmin: b.mutation<SocialPost, { id: string; scheduled_at?: string | null }>({
      query: ({ id, scheduled_at }) => ({
        url: `${BASE}/${encodeURIComponent(id)}/approve`,
        method: 'POST',
        body: { scheduled_at: scheduled_at ?? null },
      }),
      invalidatesTags: (_res, _error, { id }) => [
        { type: 'SocialPosts' as const, id },
        { type: 'SocialPosts' as const, id: 'LIST' },
      ],
    }),

    cancelSocialPostAdmin: b.mutation<SocialPost, string>({
      query: (id) => ({
        url: `${BASE}/${encodeURIComponent(id)}/cancel`,
        method: 'POST',
      }),
      invalidatesTags: (_res, _error, id) => [
        { type: 'SocialPosts' as const, id },
        { type: 'SocialPosts' as const, id: 'LIST' },
      ],
    }),

    deleteSocialPostAdmin: b.mutation<void, string>({
      query: (id) => ({
        url: `${BASE}/${encodeURIComponent(id)}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_res, _error, id) => [
        { type: 'SocialPosts' as const, id },
        { type: 'SocialPosts' as const, id: 'LIST' },
      ],
    }),

    getLinkedInStatusAdmin: b.query<LinkedInStatus, void>({
      query: () => ({ url: '/admin/linkedin/status' }),
      providesTags: () => [{ type: 'SocialPosts' as const, id: 'LINKEDIN_STATUS' }],
    }),
  }),
  overrideExisting: true,
});

export const {
  useListSocialPostsAdminQuery,
  useUpdateSocialPostAdminMutation,
  useApproveSocialPostAdminMutation,
  useCancelSocialPostAdminMutation,
  useDeleteSocialPostAdminMutation,
  useGetLinkedInStatusAdminQuery,
} = socialAdminApi;
