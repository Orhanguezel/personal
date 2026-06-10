// =============================================================
// FILE: src/integrations/endpoints/admin/support_admin.endpoints.ts
// Admin support tickets + replies
// =============================================================

import { baseApi } from '@/integrations/baseApi';
import type {
  SupportAdminListParams,
  SupportReplyCreateBody,
  SupportTicketUpdateBody,
  SupportTicketView,
  TicketReplyView,
} from '@/integrations/shared';

const TICKETS_BASE = '/admin/support_tickets';
const REPLIES_BASE = '/admin/ticket_replies';

const asArray = <T>(res: unknown): T[] => {
  if (Array.isArray(res)) return res as T[];
  if (res && typeof res === 'object') {
    const obj = res as Record<string, unknown>;
    for (const key of ['data', 'items', 'rows', 'result']) {
      if (Array.isArray(obj[key])) return obj[key] as T[];
    }
  }
  return [];
};

export const supportAdminApi = baseApi.injectEndpoints({
  endpoints: (b) => ({
    listSupportTicketsAdmin: b.query<SupportTicketView[], SupportAdminListParams | void>({
      query: (params) => ({
        url: TICKETS_BASE,
        method: 'GET',
        params: params
          ? {
              q: params.q || undefined,
              status: params.status,
              priority: params.priority,
              limit: params.limit ?? 100,
              offset: params.offset ?? 0,
              sort: params.sort ?? 'created_at',
              order: params.order ?? 'desc',
            }
          : { limit: 100, offset: 0, sort: 'created_at', order: 'desc' },
      }),
      transformResponse: (res: unknown): SupportTicketView[] => asArray<SupportTicketView>(res),
      providesTags: (result) =>
        result?.length
          ? [
              ...result.map((x) => ({ type: 'SupportTicket' as const, id: x.id })),
              { type: 'SupportTickets' as const, id: 'LIST' },
            ]
          : [{ type: 'SupportTickets' as const, id: 'LIST' }],
    }),

    getSupportTicketAdmin: b.query<SupportTicketView, { id: string }>({
      query: ({ id }) => ({ url: `${TICKETS_BASE}/${encodeURIComponent(id)}`, method: 'GET' }),
      providesTags: (_r, _e, arg) => [{ type: 'SupportTicket' as const, id: arg.id }],
    }),

    updateSupportTicketAdmin: b.mutation<
      SupportTicketView,
      { id: string; body: SupportTicketUpdateBody }
    >({
      query: ({ id, body }) => ({
        url: `${TICKETS_BASE}/${encodeURIComponent(id)}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: (_r, _e, arg) => [
        { type: 'SupportTicket' as const, id: arg.id },
        { type: 'SupportTickets' as const, id: 'LIST' },
      ],
    }),

    toggleSupportTicketAdmin: b.mutation<
      SupportTicketView,
      { id: string; action: 'close' | 'reopen' }
    >({
      query: ({ id, action }) => ({
        url: `${TICKETS_BASE}/${encodeURIComponent(id)}/${action}`,
        method: 'POST',
      }),
      invalidatesTags: (_r, _e, arg) => [
        { type: 'SupportTicket' as const, id: arg.id },
        { type: 'SupportTickets' as const, id: 'LIST' },
      ],
    }),

    deleteSupportTicketAdmin: b.mutation<{ ok: true }, string>({
      query: (id) => ({ url: `${TICKETS_BASE}/${encodeURIComponent(id)}`, method: 'DELETE' }),
      transformResponse: () => ({ ok: true as const }),
      invalidatesTags: (_r, _e, id) => [
        { type: 'SupportTicket' as const, id },
        { type: 'SupportTickets' as const, id: 'LIST' },
      ],
    }),

    listTicketRepliesAdmin: b.query<TicketReplyView[], { ticketId: string }>({
      query: ({ ticketId }) => ({
        url: `${REPLIES_BASE}/by-ticket/${encodeURIComponent(ticketId)}`,
        method: 'GET',
      }),
      transformResponse: (res: unknown): TicketReplyView[] => asArray<TicketReplyView>(res),
      providesTags: (_r, _e, arg) => [{ type: 'TicketReplies' as const, id: arg.ticketId }],
    }),

    createTicketReplyAdmin: b.mutation<TicketReplyView, SupportReplyCreateBody>({
      query: (body) => ({ url: REPLIES_BASE, method: 'POST', body }),
      invalidatesTags: (_r, _e, arg) => [
        { type: 'TicketReplies' as const, id: arg.ticket_id },
        { type: 'SupportTicket' as const, id: arg.ticket_id },
        { type: 'SupportTickets' as const, id: 'LIST' },
      ],
    }),

    deleteTicketReplyAdmin: b.mutation<{ ok: true }, { id: string; ticketId: string }>({
      query: ({ id }) => ({ url: `${REPLIES_BASE}/${encodeURIComponent(id)}`, method: 'DELETE' }),
      transformResponse: () => ({ ok: true as const }),
      invalidatesTags: (_r, _e, arg) => [{ type: 'TicketReplies' as const, id: arg.ticketId }],
    }),
  }),
  overrideExisting: true,
});

export const {
  useListSupportTicketsAdminQuery,
  useGetSupportTicketAdminQuery,
  useUpdateSupportTicketAdminMutation,
  useToggleSupportTicketAdminMutation,
  useDeleteSupportTicketAdminMutation,
  useListTicketRepliesAdminQuery,
  useCreateTicketReplyAdminMutation,
  useDeleteTicketReplyAdminMutation,
} = supportAdminApi;
