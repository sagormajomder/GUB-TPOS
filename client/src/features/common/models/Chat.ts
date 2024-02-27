export interface ChatMessage {
  user: string;
  group: string;
  content: string;
  document?: string;
  timestamp?: Date;
}

export interface Chat {
  group: string;
  messages: ChatMessage[]
}