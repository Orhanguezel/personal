// =============================================================
// FILE: src/integrations/shared/chat.ts
// Admin chat types
// =============================================================

export type ChatContextType = 'job' | 'request';

export type ChatThread = {
  id: string;
  context_type: ChatContextType | string;
  context_id: string;
  created_by_user_id: string | null;
  created_at: string;
  updated_at: string;
};

export type ChatThreadAdminItem = {
  thread: ChatThread;
  message_count?: number | string | null;
  last_message_at?: string | null;
};

export type ChatMessage = {
  id: string;
  thread_id: string;
  sender_user_id: string;
  client_id: string | null;
  text: string;
  created_at: string;
};

export type ChatAdminListParams = {
  context_type?: ChatContextType;
  context_id?: string;
  limit?: number;
  offset?: number;
};

export type ChatPostMessageBody = {
  text: string;
  client_id?: string;
};
