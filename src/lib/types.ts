export interface APIConfig {
  id: string;
  name: string;
  baseURL: string;
  apiKey: string;
  isActive: boolean;
  models: Model[];
}

export interface Model {
  id: string;
  type: 'chat' | 'image';
  capabilities: string[];
  name: string;
  owned_by: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export interface GeneratedImage {
  url: string;
  prompt: string;
  timestamp: number;
}