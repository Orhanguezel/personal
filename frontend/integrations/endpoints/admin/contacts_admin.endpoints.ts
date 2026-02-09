// ---------------------------------------------------------------------
// FILE: src/integrations/metahub/rtk/endpoints/admin/contacts_admin.endpoints.ts
// ---------------------------------------------------------------------
import { baseApi } from '@/integrations/baseApi';
import type { ContactView, ContactListParams, ContactUpdateInput } from '@/integrations/shared';
import { toAdminContactQuery } from '@/integrations/shared';

const ADMIN_BASE = '/admin/contacts';

export const contactsAdminApi = baseApi.injectEndpoints({
  endpoints: (b) => ({
    // GET /admin/contacts
    listContactsAdmin: b.query<ContactView[], ContactListParams | void>({
      query: (p) =>
        p
          ? { url: `${ADMIN_BASE}`, params: toAdminContactQuery(p) as Record<string, any> }
          : { url: `${ADMIN_BASE}` },
      providesTags: (res) =>
        res?.length
          ? [
              { type: 'Contacts' as const, id: 'LIST' },
              ...res.map((r) => ({ type: 'Contacts' as const, id: r.id })),
            ]
          : [{ type: 'Contacts' as const, id: 'LIST' }],
    }),

    // GET /admin/contacts/:id
    getContactAdmin: b.query<ContactView, string>({
      query: (id) => ({ url: `${ADMIN_BASE}/${id}` }),
      providesTags: (_res, _e, id) => [{ type: 'Contacts' as const, id }],
    }),

    // PATCH /admin/contacts/:id
    updateContactAdmin: b.mutation<ContactView, { id: string; patch: ContactUpdateInput }>({
      query: ({ id, patch }) => ({
        url: `${ADMIN_BASE}/${id}`,
        method: 'PATCH',
        body: patch,
      }),
      invalidatesTags: (res) =>
        res?.id
          ? [
              { type: 'Contacts' as const, id: res.id },
              { type: 'Contacts' as const, id: 'LIST' },
            ]
          : [{ type: 'Contacts' as const, id: 'LIST' }],
    }),

    // DELETE /admin/contacts/:id
    removeContactAdmin: b.mutation<{ ok: boolean }, string>({
      query: (id) => ({
        url: `${ADMIN_BASE}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_res, _e, id) => [
        { type: 'Contacts' as const, id },
        { type: 'Contacts' as const, id: 'LIST' },
      ],
    }),
  }),
  overrideExisting: true,
});

export const {
  useListContactsAdminQuery,
  useGetContactAdminQuery,
  useUpdateContactAdminMutation,
  useRemoveContactAdminMutation,
} = contactsAdminApi;
