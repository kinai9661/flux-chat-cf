# 🚀 FLUX Chat UI

<div align="center">

**AI Chat & Image Generation App powered by Cloudflare Pages**

[![Deploy to Cloudflare Pages](https://img.shields.io/badge/Deploy-Cloudflare%20Pages-orange?logo=cloudflare)](https://pages.cloudflare.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.3-61dafb?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178c6?logo=typescript)](https://www.typescriptlang.org/)

[🇨🇳 中文](./README.md) | [Live Demo](https://flux-chat-ui.pages.dev) | [Quick Start](#-quick-start)

</div>

---

## ✨ Features

### 💬 AI Intelligent Conversation
- **Multi-Model Support**: Grok-4-Fast, GPT, Claude, and other mainstream AI models
- **Streaming Response**: Real-time AI response display for smooth experience
- **Chat History**: Auto-save conversation records, persist after page refresh
- **One-Click Clear**: Quickly clear all conversation records

### 🎨 FLUX 2 Image Generation
- **Latest FLUX 2**: Support full FLUX.2 Pro/Flex/Dev series models
- **Multiple Sizes**: Square, landscape, portrait, widescreen, and more
- **High-Quality Output**: Support up to 2048x2048 (4MP) resolution
- **Generation History**: Auto-save generated images with download support

### ⚙️ Smart Configuration
- **Auto Model Discovery**: Automatically fetch all available models after API connection
- **API Configuration Management**: Support saving multiple API configurations
- **Local Storage**: All configs and data saved in browser local storage

### 🌍 Performance Advantages
- **Global CDN**: Powered by Cloudflare's global edge network
- **Zero Cold Start**: Workers edge computing for ultra-fast response
- **Completely Free**: No server costs, permanent free deployment

---

## 🛠️ Tech Stack

| Technology | Description |
|------------|-------------|
| **Frontend Framework** | React 18 + TypeScript + Vite |
| **State Management** | Zustand (lightweight state management) |
| **UI Styling** | Tailwind CSS + Lucide Icons |
| **API Routes** | Cloudflare Pages Functions |
| **Deployment Platform** | Cloudflare Pages |
| **API Service** | Typli API (OpenAI Compatible) |

---

## 🚀 Quick Start

### Method 1: One-Click Deploy (Recommended)

```bash
# Download and run one-click deployment script
curl -fsSL https://raw.githubusercontent.com/kinai9661/flux-chat-cf/main/deploy.sh | bash
```

The script will automatically:
- ✅ Check environment dependencies (Node.js, npm, git)
- ✅ Clone repository to local
- ✅ Install all dependencies
- ✅ Build production version
- ✅ Guide Cloudflare deployment

### Method 2: Manual Deployment

```bash
# 1. Clone repository
git clone https://github.com/kinai9661/flux-chat-cf.git
cd flux-chat-cf

# 2. Install dependencies
npm install

# 3. Local development
npm run dev

# 4. Build project
npm run build

# 5. Deploy to Cloudflare Pages
npm run deploy
```

---

## 📦 Deploy to Cloudflare Pages

### Prerequisites
- Node.js 18+
- npm or yarn
- Cloudflare account (free)

### Detailed Steps

#### 1. Get Cloudflare API Token

1. Login to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Go to "My Profile" → "API Tokens"
3. Click "Create Token" → Select "Edit Cloudflare Workers" template
4. Save the generated API Token

#### 2. Local Deployment

```bash
# Login to Cloudflare
npx wrangler login

# Deploy project
npm run deploy

# Or use wrangler directly
npx wrangler pages deploy dist --project-name=flux-chat-ui
```

#### 3. GitHub Actions Auto Deployment

1. Fork this repository
2. Add Secrets in repository settings:
   - `CLOUDFLARE_API_TOKEN`: Your Cloudflare API Token
   - `CLOUDFLARE_ACCOUNT_ID`: Your Cloudflare Account ID
3. Push code to `main` branch to auto-deploy

---

## 📖 Usage Guide

### 💬 Start Chatting

1. Open app, default to chat interface
2. Type message in bottom input box
3. Press Enter or click "Send" button
4. AI will respond in real-time streaming
5. Click "Trash" icon to clear conversation

### 🎨 Generate Images

1. Click "🎨 Text-to-Image" tab at top
2. Enter image description in prompt box (supports English/Chinese)
   ```
   Example: Cyberpunk Tokyo street scene, neon lights, rainy night, highly detailed, 8k
   ```
3. Select image size (default 1024x1024)
4. Click "✨ Generate Image"
5. Wait for generation (~10-20 seconds)
6. Hover over image to download

### ⚙️ Configure API

Default uses Typli API, you can also configure your own API:

1. Click "⚙️" icon at top right to refresh model list
2. Modify environment variables in `wrangler.toml`:

```toml
[vars]
DEFAULT_API_URL = "https://your-api-url.com"
DEFAULT_API_KEY = "your-api-key"
```

---

## 🎯 Supported Models

### Chat Models
- ✅ xai/grok-4-fast (Recommended)
- ✅ OpenAI GPT series
- ✅ Anthropic Claude series
- ✅ Meta LLaMA series
- ✅ Other OpenAI-compatible models

### Image Generation Models
- ✅ FLUX.2 Pro (Commercial-grade, highest quality)
- ✅ FLUX.2 Flex (Adjustable parameters)
- ✅ FLUX.2 Dev (Free open-source)
- ✅ FLUX.1 series
- ✅ Stable Diffusion series

---

## 📁 Project Structure

```
flux-chat-cf/
├── functions/              # Cloudflare Pages Functions
│   └── api/
│       ├── chat.ts        # Chat API
│       ├── image.ts       # Image Generation API
│       └── models.ts      # Model Discovery API
├── src/
│   ├── components/        # React Components
│   │   ├── ChatInterface.tsx
│   │   └── ImageGenerator.tsx
│   ├── lib/              # Utilities
│   │   ├── store.ts      # Zustand State Management
│   │   └── types.ts      # TypeScript Types
│   ├── App.tsx           # Main App Component
│   └── main.tsx          # Entry File
├── public/               # Static Assets
├── .github/
│   └── workflows/
│       └── deploy.yml    # GitHub Actions Config
├── wrangler.toml         # Cloudflare Config
├── .env.example          # Environment Variables Example
├── deploy.sh             # One-Click Deploy Script
└── README.md
```

---

## 🔧 Development Guide

### Local Development

```bash
# Start development server (Vite)
npm run dev

# Test in Cloudflare Workers environment
npm run preview
```

### Build & Deploy

```bash
# Build production version
npm run build

# Deploy to Cloudflare Pages
npm run deploy
```

### Environment Variables

Copy `.env.example` to `.env.local` and configure:

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
DEFAULT_API_URL=https://your-api-url.com
DEFAULT_API_KEY=your-api-key
DEFAULT_CHAT_MODEL=xai/grok-4-fast
DEFAULT_IMAGE_MODEL=black-forest-labs/FLUX.2-dev
```

---

## ⚙️ Environment Variables Configuration

### Local Development

1. Copy `.env.example` to `.env.local`
2. Modify configuration values
3. Run `npm run dev`

### Production Environment (Cloudflare Pages)

1. Login to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Go to Pages → Your Project → Settings → Environment variables
3. Add required environment variables:
   - `DEFAULT_API_URL`
   - `DEFAULT_API_KEY`
   - `DEFAULT_CHAT_MODEL` (optional)
   - `DEFAULT_IMAGE_MODEL` (optional)
4. Redeploy project

### GitHub Actions

1. Go to GitHub Repository Settings → Secrets and variables → Actions
2. Add secrets:
   - `CLOUDFLARE_API_TOKEN`
   - `CLOUDFLARE_ACCOUNT_ID`
3. Push code to auto-trigger deployment

---

## 📊 Performance Comparison

| Metric | Cloudflare Pages | Vercel | Railway |
|--------|-----------------|--------|---------|
| **Global Nodes** | 300+ | 70+ | Limited |
| **Cold Start Time** | ~0ms | ~300ms | ~500ms |
| **Free Traffic** | Unlimited | 100GB/month | Limited |
| **Free Requests** | Unlimited | 100K/month | Limited |
| **Price** | $0 | $20/month+ | $5/month+ |

---

## 🐛 FAQ

### Q: Chat streaming response interrupted?
A: Check API connection stability, or try refreshing the page to reconnect.

### Q: Image generation failed?
A: Ensure prompt is appropriate and doesn't contain sensitive content, or try changing models.

### Q: How to change API provider?
A: Modify `DEFAULT_API_URL` and `DEFAULT_API_KEY` in `wrangler.toml` or environment variables.

### Q: Can't access after deployment?
A: Check Cloudflare Pages project settings, ensure build output directory is `dist`.

### Q: One-click deploy script doesn't work on Windows?
A: Use Git Bash or WSL, or choose manual deployment method.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 🙏 Acknowledgments

- [Cloudflare Pages](https://pages.cloudflare.com/) - Deployment Platform
- [React](https://reactjs.org/) - Frontend Framework
- [Tailwind CSS](https://tailwindcss.com/) - CSS Framework
- [Zustand](https://zustand-demo.pmnd.rs/) - State Management
- [Typli API](https://fluxes.zeabur.app) - API Service
- [FLUX](https://blackforestlabs.ai/) - Image Generation Models

---

## 👤 Author

**[@kinai9661](https://github.com/kinai9661)**

If this project helps you, please give it a ⭐️ Star!

---

## 🔗 Links

- [Live Demo](https://flux-chat-ui.pages.dev)
- [Issue Tracker](https://github.com/kinai9661/flux-chat-cf/issues)
- [Cloudflare Documentation](https://developers.cloudflare.com/pages/)
- [FLUX Models Documentation](https://blackforestlabs.ai/)
- [🇨🇳 Chinese Documentation](./README.md)

---

<div align="center">

**Made with ❤️ by kinai9661**

[![GitHub Stars](https://img.shields.io/github/stars/kinai9661/flux-chat-cf?style=social)](https://github.com/kinai9661/flux-chat-cf)
[![GitHub Forks](https://img.shields.io/github/forks/kinai9661/flux-chat-cf?style=social)](https://github.com/kinai9661/flux-chat-cf/fork)

</div>
