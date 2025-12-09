import { useState, useEffect } from 'react';
import { useStore } from './lib/store';
import ChatInterface from './components/ChatInterface';
import ImageGenerator from './components/ImageGenerator';
import { MessageSquare, Image as ImageIcon, Settings, Sparkles } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'chat' | 'image'>('chat');
  const { getActiveConfig, selectedChatModel, selectedImageModel, updateConfig } = useStore();

  const config = getActiveConfig();

  useEffect(() => {
    if (config && config.models.length === 0) {
      discoverModels();
    }
  }, []);

  const discoverModels = async () => {
    if (!config) return;

    try {
      const response = await fetch('/api/models', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          baseURL: config.baseURL,
          apiKey: config.apiKey
        })
      });

      const { models } = await response.json();
      updateConfig(config.id, { models });
      console.log('发现模型:', models.length);
    } catch (error) {
      console.error('模型发现失败:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container max-w-5xl mx-auto p-4">
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Sparkles className="text-purple-500" size={28} />
              <div>
                <h1 className="text-2xl font-bold">FLUX Chat UI</h1>
                <p className="text-sm text-gray-500">
                  {config?.name} • {activeTab === 'chat' ? selectedChatModel : selectedImageModel}
                </p>
              </div>
            </div>
            <button
              onClick={discoverModels}
              className="bg-gray-100 p-2 rounded-lg hover:bg-gray-200"
              title="刷新模型列表"
            >
              <Settings size={24} />
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('chat')}
              className={`flex-1 flex items-center justify-center gap-2 p-4 font-semibold ${
                activeTab === 'chat'
                  ? 'text-blue-500 border-b-2 border-blue-500'
                  : 'text-gray-500'
              }`}
            >
              <MessageSquare size={20} />
              聊天
            </button>
            <button
              onClick={() => setActiveTab('image')}
              className={`flex-1 flex items-center justify-center gap-2 p-4 font-semibold ${
                activeTab === 'image'
                  ? 'text-purple-500 border-b-2 border-purple-500'
                  : 'text-gray-500'
              }`}
            >
              <ImageIcon size={20} />
              文生图
            </button>
          </div>

          <div className="p-6">
            {activeTab === 'chat' ? <ChatInterface /> : <ImageGenerator />}
          </div>
        </div>

        <div className="text-center text-sm text-gray-500">
          Powered by Cloudflare Pages • Typli API • FLUX 2
        </div>
      </div>
    </div>
  );
}