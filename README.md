# 🚀 FLUX Chat UI

<div align="center">

**基于 Cloudflare Pages 的 AI 聊天和图片生成应用**

[![Deploy to Cloudflare Pages](https://img.shields.io/badge/Deploy-Cloudflare%20Pages-orange?logo=cloudflare)](https://pages.cloudflare.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.3-61dafb?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178c6?logo=typescript)](https://www.typescriptlang.org/)

[在线演示](https://flux-chat-cf.pages.dev) | [快速开始](#-快速开始) | [部署指南](#-cloudflare-pages-部署配置)

</div>

---

## ✨ 功能特性

### 💬 AI 智能对话
- **多模型支持**: Grok-4-Fast, GPT, Claude 等主流 AI 模型
- **流式响应**: 实时显示 AI 回复,体验流畅
- **对话历史**: 自动保存聊天记录,刷新页面不丢失
- **一键清空**: 快速清除所有对话记录

### 🎨 FLUX 2 图片生成
- **最新 FLUX 2**: 支持 FLUX.2 Pro/Flex/Dev 全系列模型
- **多种尺寸**: 正方形、横向、竖向、宽屏等多种比例
- **高质量输出**: 支持最高 2048x2048 (4MP) 分辨率
- **生成历史**: 自动保存生成的图片,支持下载

### ⚙️ 智能配置
- **自动模型发现**: 连接 API 后自动获取所有可用模型
- **API 配置管理**: 支持保存多组 API 配置
- **本地存储**: 所有配置和数据保存在浏览器本地

### 🌍 性能优势
- **全球 CDN**: 基于 Cloudflare 全球节点加速
- **零冷启动**: Workers 边缘计算,响应速度极快
- **完全免费**: 无需服务器费用,永久免费部署

---

## 🛠️ 技术栈

| 技术 | 说明 |
|------|------|
| **前端框架** | React 18 + TypeScript + Vite |
| **状态管理** | Zustand (轻量级状态管理) |
| **UI 样式** | Tailwind CSS + Lucide Icons |
| **API 路由** | Cloudflare Pages Functions |
| **部署平台** | Cloudflare Pages |
| **API 服务** | Typli API (OpenAI 兼容) |

---

## 🚀 快速开始

### 方法一: 一键部署脚本 (推荐)

```bash
# 下载并运行一键部署脚本
curl -fsSL https://raw.githubusercontent.com/kinai9661/flux-chat-cf/main/deploy.sh | bash
```

脚本会自动:
- ✅ 检查环境依赖 (Node.js, npm, git)
- ✅ 克隆仓库到本地
- ✅ 安装所有依赖
- ✅ 构建生产版本
- ✅ 引导 Cloudflare 部署

### 方法二: 手动部署

```bash
# 1. 克隆仓库
git clone https://github.com/kinai9661/flux-chat-cf.git
cd flux-chat-cf

# 2. 安装依赖
npm install

# 3. 本地开发
npm run dev

# 4. 构建项目
npm run build

# 5. 部署到 Cloudflare Pages
npm run deploy
```

---

## 📦 Cloudflare Pages 部署配置

### 重要：正确的构建设置

在 Cloudflare Pages 项目设置中，请使用以下配置:

| 设置项 | 值 |
|----------|------|
| **框架预设** | `None` 或 `Vite` |
| **构建命令** | `npm run build` |
| **构建输出目录** | `dist` |
| **根目录** | `/` (默认) |

### ⚠️ 重要提示

**不要设置部署命令!** Cloudflare Pages 会在构建完成后自动部署。

如果你看到这个错误:
```
✗ [ERROR] It looks like you've run a Workers-specific command in a Pages project.
```

**解决方法:**
1. 进入 Cloudflare Dashboard
2. 选择你的 Pages 项目
3. **Settings** → **Builds & deployments**
4. 点击 **Configure build settings**
5. **删除** 或 **清空** "Deploy command" 字段
6. 保存设置

### 详细步骤

#### 1. 连接 GitHub 仓库

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 进入 **Pages** → **创建项目**
3. 选择 **连接到 Git**
4. 授权 GitHub 并选择 `kinai9661/flux-chat-cf` 仓库

#### 2. 配置构建设置

```yaml
项目名称: flux-chat-cf
生产分支: main
框架预设: None
构建命令: npm run build
构建输出目录: dist
```

**重要**: 不要填写 "部署命令" 字段！

#### 3. 环境变量(可选)

在 **Settings** → **Environment variables** 中添加:

| 变量名 | 值 |
|----------|-----|
| `NODE_VERSION` | `20` |

---

## 📖 使用说明

### 💬 开始聊天

1. 打开应用,默认进入聊天界面
2. 在底部输入框输入消息
3. 按回车键或点击"发送"按钮
4. AI 将以流式方式实时回复
5. 点击"垃圾桶"图标可清空对话

### 🎨 生成图片

1. 点击顶部"🎨 文生图"标签
2. 在提示词框中输入图片描述 (支持中英文)
   ```
   示例: 赛博朋克风格的东京街景,霓虹灯,雨夜,高清细节,8k
   ```
3. 选择图片尺寸 (默认 1024x1024)
4. 点击"✨ 生成图片"
5. 等待生成完成 (约 10-20 秒)
6. 鼠标悬停图片可下载

### ⚙️ 配置 API

默认使用 Typli API,你也可以配置自己的 API:

1. 点击右上角"⚙️"图标刷新模型列表
2. 修改 `wrangler.toml` 文件中的环境变量:

```toml
[vars]
DEFAULT_API_URL = "https://your-api-url.com"
DEFAULT_API_KEY = "your-api-key"
```

---

## 🎯 支持的模型

### 聊天模型
- ✅ xai/grok-4-fast (推荐)
- ✅ OpenAI GPT 系列
- ✅ Anthropic Claude 系列
- ✅ Meta LLaMA 系列
- ✅ 其他 OpenAI 兼容模型

### 图片生成模型
- ✅ FLUX.2 Pro (商用级,最高质量)
- ✅ FLUX.2 Flex (可调参数)
- ✅ FLUX.2 Dev (免费开源)
- ✅ FLUX.1 系列
- ✅ Stable Diffusion 系列

---

## 📁 项目结构

```
flux-chat-cf/
├── functions/              # Cloudflare Pages Functions
│   └── api/
│       ├── chat.ts        # 聊天 API
│       ├── image.ts       # 图片生成 API
│       └── models.ts      # 模型发现 API
├── src/
│   ├── components/        # React 组件
│   │   ├── ChatInterface.tsx
│   │   └── ImageGenerator.tsx
│   ├── lib/              # 工具库
│   │   ├── store.ts      # Zustand 状态管理
│   │   └── types.ts      # TypeScript 类型
│   ├── App.tsx           # 主应用组件
│   └── main.tsx          # 入口文件
├── public/               # 静态资源
├── .github/
│   └── workflows/
│       └── deploy.yml    # GitHub Actions 配置
├── wrangler.toml         # Cloudflare 配置
├── deploy.sh             # 一键部署脚本
└── README.md
```

---

## 🔧 开发指南

### 本地开发

```bash
# 启动开发服务器 (Vite)
npm run dev

# 在 Cloudflare Workers 环境中测试
npm run preview
```

### 构建部署

```bash
# 构建生产版本
npm run build

# 部署到 Cloudflare Pages
npm run deploy
```

### 添加新功能

1. Fork 本仓库
2. 创建功能分支: `git checkout -b feature/new-feature`
3. 提交更改: `git commit -m 'Add new feature'`
4. 推送分支: `git push origin feature/new-feature`
5. 创建 Pull Request

---

## ⚙️ 环境变量配置

在 `wrangler.toml` 中配置:

```toml
name = "flux-chat-cf"
compatibility_date = "2025-12-09"
pages_build_output_dir = "dist"

[vars]
DEFAULT_API_URL = "https://fluxes.zeabur.app"
DEFAULT_API_KEY = "1"
```

---

## 🎨 自定义主题

修改 `tailwind.config.js`:

```javascript
export default {
  theme: {
    extend: {
      colors: {
        primary: '#your-color',
      }
    }
  }
}
```

---

## 📊 性能对比

| 指标 | Cloudflare Pages | Vercel | Railway |
|------|-----------------|--------|---------|
| **全球节点** | 300+ | 70+ | 有限 |
| **冷启动时间** | ~0ms | ~300ms | ~500ms |
| **免费流量** | 无限 | 100GB/月 | 有限 |
| **免费请求** | 无限 | 100K/月 | 有限 |
| **价格** | $0 | $20/月起 | $5/月起 |

---

## 🐛 常见问题

### Q: 聊天流式响应中断怎么办?
A: 检查 API 连接是否稳定,或尝试刷新页面重新连接。

### Q: 图片生成失败?
A: 确认提示词符合规范,不包含敏感内容,或尝试更换模型。

### Q: 如何更换 API 提供商?
A: 修改 `wrangler.toml` 中的 `DEFAULT_API_URL` 和 `DEFAULT_API_KEY`。

### Q: 部署后无法访问?
A: 检查 Cloudflare Pages 项目设置,确保构建输出目录为 `dist`。

### Q: 一键部署脚本在 Windows 上无法运行?
A: 可使用 Git Bash 或 WSL,或选择手动部署方式。

### Q: Cloudflare Pages 部署失败?
A: 确保 **没有设置部署命令**,只需要设置构建命令 `npm run build` 和输出目录 `dist`。

---

## 📄 开源协议

本项目采用 [MIT License](LICENSE) 开源协议。

---

## 🙏 致谢

- [Cloudflare Pages](https://pages.cloudflare.com/) - 部署平台
- [React](https://reactjs.org/) - 前端框架
- [Tailwind CSS](https://tailwindcss.com/) - CSS 框架
- [Zustand](https://zustand-demo.pmnd.rs/) - 状态管理
- [Typli API](https://fluxes.zeabur.app) - API 服务
- [FLUX](https://blackforestlabs.ai/) - 图片生成模型

---

## 👤 作者

**[@kinai9661](https://github.com/kinai9661)**

如果这个项目对你有帮助,请给个 ⭐️ Star!

---

## 🔗 相关链接

- [在线演示](https://flux-chat-cf.pages.dev)
- [问题反馈](https://github.com/kinai9661/flux-chat-cf/issues)
- [Cloudflare 文档](https://developers.cloudflare.com/pages/)
- [FLUX 模型文档](https://blackforestlabs.ai/)

---

<div align="center">

**Made with ❤️ by kinai9661**

[![GitHub Stars](https://img.shields.io/github/stars/kinai9661/flux-chat-cf?style=social)](https://github.com/kinai9661/flux-chat-cf)
[![GitHub Forks](https://img.shields.io/github/forks/kinai9661/flux-chat-cf?style=social)](https://github.com/kinai9661/flux-chat-cf/fork)

</div>
