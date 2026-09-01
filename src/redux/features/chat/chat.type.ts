export interface TConversation {
  id: string;
  user: string;
  title: string;
  conversation_history_summary: string | null;
  last_message_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface TChatMessage {
  id: string;
  conversation: string;
  role: 'user' | 'assistant';
  content: string;
  created_at: string;
}
