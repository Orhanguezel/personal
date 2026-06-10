// =============================================================
// FILE: src/integrations/shared/support.ts
// =============================================================

export type SupportTicketView = {
  id: string;
  user_id: string;
  subject: string;
  message: string;
  status: 'open' | 'in_progress' | 'waiting_response' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category?: string | null;
  user_display_name?: string | null;
  user_email?: string | null;
  created_at: string;
  updated_at: string;
};

export type TicketReplyView = {
  id: string;
  ticket_id: string;
  user_id: string | null;
  message: string;
  is_admin: boolean;
  created_at: string;
};

export type SupportTicketStatus = SupportTicketView['status'];
export type SupportTicketPriority = SupportTicketView['priority'];

export type SupportAdminListParams = {
  q?: string;
  status?: SupportTicketStatus;
  priority?: SupportTicketPriority;
  limit?: number;
  offset?: number;
  sort?: 'created_at' | 'updated_at';
  order?: 'asc' | 'desc';
};

export type SupportTicketUpdateBody = Partial<{
  subject: string;
  message: string;
  status: SupportTicketStatus;
  priority: SupportTicketPriority;
}>;

export type SupportReplyCreateBody = {
  ticket_id: string;
  user_id?: string | null;
  message: string;
};
