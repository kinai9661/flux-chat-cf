import { useState } from 'react';
import { useStore } from '../lib/store';
import { Download, Loader2 } from 'lucide-react';

export default function ImageGenerator() {
  const [prompt, setPrompt] = useState('');
  const [size, setSize] = useState('1024x1024');
  const [loading, setLoading] = useState(false);

  const {
    selectedImageModel,
    generatedImages,
    addGeneratedImage,
    getActiveConfig
  } = useStore();

  const handleGenerate = async () => {
    if (!prompt.trim() || loading) return;

    const config = getActiveConfig();
    if (!config) {
      alert('请先配置 API');
      return;
    }

    setLoading(true);
    try {
      const [width, height] = size.split('x').map(Number);

      const response = await fetch('/api/image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          model: selectedImageModel,
          width,
          height,
          baseURL: config.baseURL,
          apiKey: config.apiKey
        })
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      if (data.images && data.images.length > 0) {
        data.images.forEach((url: string) => {
          addGeneratedImage({
            url,
            prompt,
            timestamp: Date.now()
          });
        });
      }
    } catch (error: any) {
      alert('生成失败: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="block font-semibold mb-2">提示词</label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="描述你想生成的图片... 例如: A cyberpunk city at sunset, neon lights, highly detailed, 8k"
            className="w-full p-3 border rounded-lg min-h-[120px] focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold mb-2">尺寸</label>
            <select
              value={size}
              onChange={(e) => setSize(e.target.value)}
              className="w-full p-2 border rounded-lg"
            >
              <option value="1024x1024">正方形 (1024×1024)</option>
              <option value="1024x768">横向 (1024×768)</option>
              <option value="768x1024">竖向 (768×1024)</option>
              <option value="1536x1024">宽屏 (1536×1024)</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold mb-2">当前模型</label>
            <div className="p-2 bg-gray-100 rounded-lg text-sm truncate" title={selectedImageModel}>
              {selectedImageModel}
            </div>
          </div>
        </div>

        <button
          onClick={handleGenerate}
          disabled={loading || !prompt.trim()}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white p-3 rounded-lg font-semibold hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" size={20} />
              生成中...
            </>
          ) : (
            '✨ 生成图片'
          )}
        </button>
      </div>

      {generatedImages.length > 0 && (
        <div>
          <h3 className="font-semibold mb-3">生成历史</h3>
          <div className="grid grid-cols-2 gap-4">
            {generatedImages.slice(0, 6).map((img, idx) => (
              <div key={idx} className="relative group border rounded-lg overflow-hidden">
                <img
                  src={img.url}
                  alt={img.prompt}
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <a
                    href={img.url}
                    download={`flux-${img.timestamp}.png`}
                    className="bg-white text-black px-3 py-2 rounded-lg flex items-center gap-2"
                  >
                    <Download size={16} />
                    下载
                  </a>
                </div>
                <div className="p-2 bg-white">
                  <p className="text-xs text-gray-600 truncate">{img.prompt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}