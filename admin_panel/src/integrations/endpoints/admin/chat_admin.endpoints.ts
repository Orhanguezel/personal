// =============================================================
// FILE: src/integrations/endpoints/admin/chat_admin.endpoints.ts
// Admin chat threads + messages
// =============================================================

import { baseApi } from '@/integrations/baseApi';
import type {
  ChatAdminListParams,
  ChatMessage,
  ChatPostMessageBody,
  ChatThreadAdminItem,
} from '@/integrations/shared';

const BASE = '/admin/chat/threads';

const asItems = <T>(res: unknown): T[] => {
  if (Array.isArray(res)) return res as T[];
  if (res && typeof res === 'object') {
    const obj = res as Record<string, unknown>;
    for (const key of ['items', 'data', 'rows', 'result']) {
      if (Array.isArray(obj[key])) return obj[key] as T[];
    }
  }
  return [];
};

export const chatAdminApi = baseApi.injectEndpoints({
  endpoints: (b) => ({
    listChatThreadsAdmin: b.query<ChatThreadAdminItem[], ChatAdminListParams | void>({
      query: (params) => ({
        url: BASE,
        method: 'GET',
        params: {
          context_type: params?.context_type,
          context_id: params?.context_id || undefined,
          limit: params?.limit ?? 100,
          offset: params?.offset ?? 0,
        },
      }),
      transformResponse: (res: unknown): ChatThreadAdminItem[] => asItems<ChatThreadAdminItem>(res),
      providesTags: (result) =>
        result?.length
          ? [
              ...result.map((x) => ({ type: 'ChatThread' as const, id: x.thread.id })),
              { type: 'ChatThreads' as const, id: 'LIST' },
            ]
          : [{ type: 'ChatThreads' as const, id: 'LIST' }],
    }),

    listChatMessagesAdmin: b.query<ChatMessage[], { threadId: string; limit?: number }>({
      query: ({ threadId, limit }) => ({
        url: `${BASE}/${encodeURIComponent(threadId)}/messages`,
        method: 'GET',
        params: { limit: limit ?? 100 },
      }),
      transformResponse: (res: unknown): ChatMessage[] => asItems<ChatMessage>(res),
      providesTags: (_r, _e, arg) => [{ type: 'ChatMessages' as const, id: arg.threadId }],
    }),

    postChatMessageAdmin: b.mutation<
      { message: ChatMessage },
      { threadId: string; body: ChatPostMessageBody }
    >({
      query: ({ threadId, body }) => ({
        url: `${BASE}/${encodeURIComponent(threadId)}/messages`,
        method: 'POST',
        body,
      }),
      invalidatesTags: (_r, _e, arg) => [
        { type: 'ChatMessages' as const, id: arg.threadId },
        { type: 'ChatThread' as const, id: arg.threadId },
        { type: 'ChatThreads' as const, id: 'LIST' },
      ],
    }),
  }),
  overrideExisting: true,
});

export const {
  useListChatThreadsAdminQuery,
  useListChatMessagesAdminQuery,
  usePostChatMessageAdminMutation,
} = chatAdminApi;
