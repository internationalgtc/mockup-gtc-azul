export interface ChatMessage {
  id: string;
  type: 'bot' | 'user';
  content: string;
  timestamp: Date;
  options?: ChatOption[];
}

export interface ChatOption {
  id: string;
  icon: string;
  label: string;
  action: string;
}

export interface ConversationFlow {
  [key: string]: {
    message: string;
    options?: ChatOption[];
  };
}
