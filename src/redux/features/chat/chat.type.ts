export interface TConversation {
  id: string;
  user: string;
  title: string;
  conversation_history_summary: string | null;
  last_message_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface TPaginatedConversationsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: TConversation[];
}

export interface TChatMessage {
  id: string;
  conversation: string;
  role: 'user' | 'assistant';
  content: string;
  created_at: string;
}

export interface TPaginatedMessagesResponse {
  next: string | null;
  previous: string | null;
  results: TChatMessage[];
}

export type TWsMessageType =
  | 'chat.message'
  | 'chat.status'
  | 'chat.token'
  | 'chat.completed'
  | 'chat.error';

export interface TWsSendPayload {
  type: 'chat.message';
  conversation_id?: string;
  user_query: string;
}

export type TWsReceiveMessage =
  | { type: 'chat.status'; status?: string; message?: string }
  | { type: 'chat.token'; conversation_id: string; message_id: string; content: string }
  | { type: 'chat.completed'; conversation_id: string; message_id: string }
  | { type: 'chat.error'; error?: string; detail?: string; message?: string };
