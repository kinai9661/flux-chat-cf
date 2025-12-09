import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { APIConfig, ChatMessage, GeneratedImage } from './types';

interface AppState {
  configs: APIConfig[];
  activeConfigId: string | null;
  chatMessages: ChatMessage[];
  selectedChatModel: string;
  selectedImageModel: string;
  generatedImages: GeneratedImage[];

  addConfig: (config: APIConfig) => void;
  updateConfig: (id: string, updates: Partial<APIConfig>) => void;
  setActiveConfig: (id: string) => void;
  getActiveConfig: () => APIConfig | null;
  addChatMessage: (message: ChatMessage) => void;
  clearChat: () => void;
  setSelectedChatModel: (model: string) => void;
  setSelectedImageModel: (model: string) => void;
  addGeneratedImage: (image: GeneratedImage) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      configs: [
        {
          id: 'typli-default',
          name: 'Typli API (Zeabur)',
          baseURL: 'https://fluxes.zeabur.app',
          apiKey: '1',
          isActive: true,
          models: []
        }
      ],
      activeConfigId: 'typli-default',
      chatMessages: [],
      selectedChatModel: 'xai/grok-4-fast',
      selectedImageModel: 'black-forest-labs/FLUX.2-dev',
      generatedImages: [],

      addConfig: (config) => set((state) => ({
        configs: [...state.configs, config]
      })),

      updateConfig: (id, updates) => set((state) => ({
        configs: state.configs.map(c => 
          c.id === id ? { ...c, ...updates } : c
        )
      })),

      setActiveConfig: (id) => set((state) => ({
        activeConfigId: id,
        configs: state.configs.map(c => ({
          ...c,
          isActive: c.id === id
        }))
      })),

      getActiveConfig: () => {
        const state = get();
        return state.configs.find(c => c.id === state.activeConfigId) || null;
      },

      addChatMessage: (message) => set((state) => ({
        chatMessages: [...state.chatMessages, message]
      })),

      clearChat: () => set({ chatMessages: [] }),

      setSelectedChatModel: (model) => set({ selectedChatModel: model }),

      setSelectedImageModel: (model) => set({ selectedImageModel: model }),

      addGeneratedImage: (image) => set((state) => ({
        generatedImages: [image, ...state.generatedImages]
      }))
    }),
    {
      name: 'flux-chat-storage'
    }
  )
);