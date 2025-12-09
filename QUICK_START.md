# 🚀 FLUX Chat UI - 快速开始指南

## 目录
- [一键部署](#一键部署)
- [手动部署](#手动部署)
- [本地开发](#本地开发)
- [常见问题](#常见问题)

---

## 一键部署

### ✨ 最快速的方式

```bash
curl -fsSL https://raw.githubusercontent.com/kinai9661/flux-chat-cf/main/deploy.sh | bash
```

这个脚本会:
1. ✅ 自动检查 Node.js, npm, git
2. ✅ 克隆仓库到本地
3. ✅ 安装所有依赖
4. ✅ 构建生产版本
5. ✅ 引导 Cloudflare 部署

### 部署选项

脚本会提供 3 种部署方式:

**选项1: 克隆仓库并本地部署** (推荐)
- 自动完成所有步骤
- 适合第一次部署

**选项2: 只克隆仓库**
- 仅克隆代码和安装依赖
- 适合需要自定义配置

**选项3: 在当前目录部署**
- 在已克隆的项目中执行
- 适合更新部署

---

## 手动部署

### 步骤 1: 克隆仓库

```bash
git clone https://github.com/kinai9661/flux-chat-cf.git
cd flux-chat-cf
```

### 步骤 2: 安装依赖

```bash
npm install
```

如果遇到依赖安装问题:

```bash
# 清理缓存，重新安装
npm cache clean --force
rm -rf node_modules package-lock.json
npm install

# 或使用 yarn
yarn install
```

### 步骤 3: 本地测试

```bash
# 启动开发服务器
npm run dev

# 打开浏览器访问
open http://localhost:5173
```

### 步骤 4: 构建项目

```bash
npm run build
```

构建后的文件在 `dist/` 目录。

### 步骤 5: 部署到 Cloudflare Pages

#### 5.1 登录 Cloudflare

```bash
npx wrangler login
```

这会打开浏览器,登录你的 Cloudflare 账号。

#### 5.2 部署

```bash
# 使用 npm script
npm run deploy

# 或直接使用 wrangler
npx wrangler pages deploy dist --project-name=flux-chat-ui
```

#### 5.3 获取部署链接

部署成功后,你会得到类似这样的链接:
```
https://flux-chat-ui.pages.dev
```

---

## 本地开发

### 开发流程

```bash
# 1. 启动开发服务器
npm run dev

# 2. 修改代码 (Vite 支持热更新)
# 编辑 src/ 目录下的文件

# 3. 测试功能
# 在浏览器中查看效果

# 4. 构建预览
npm run build
npm run preview  # 在 Cloudflare Workers 环境中测试
```

### 项目目录说明

```
flux-chat-cf/
├── functions/           # Cloudflare Pages Functions (API 路由)
│   └── api/
│       ├── chat.ts     # 聊天 API
│       ├── image.ts    # 图片生成 API
│       └── models.ts   # 模型发现 API
│
├── src/                 # 前端源代码
│   ├── components/     # React 组件
│   ├── lib/            # 状态管理和工具
│   ├── App.tsx        # 主应用
│   └── main.tsx       # 入口文件
│
├── public/             # 静态资源
├── dist/               # 构建输出 (自动生成)
├── wrangler.toml       # Cloudflare 配置
└── package.json        # 项目依赖
```

### 修改 API 配置

编辑 `wrangler.toml`:

```toml
[vars]
DEFAULT_API_URL = "https://your-api-url.com"  # 修改 API 地址
DEFAULT_API_KEY = "your-api-key"              # 修改 API Key
```

---

## 常见问题

### Q1: 一键部署脚本在 Windows 上无法运行?

**解决方案:**

1. 使用 **Git Bash**:
   ```bash
   # 在 Git Bash 中运行
   curl -fsSL https://raw.githubusercontent.com/kinai9661/flux-chat-cf/main/deploy.sh | bash
   ```

2. 使用 **WSL (Windows Subsystem for Linux)**:
   ```bash
   # 在 WSL 中运行
   curl -fsSL https://raw.githubusercontent.com/kinai9661/flux-chat-cf/main/deploy.sh | bash
   ```

3. **手动部署** (推荐):
   ```bash
   git clone https://github.com/kinai9661/flux-chat-cf.git
   cd flux-chat-cf
   npm install
   npm run build
   npm run deploy
   ```

### Q2: npm install 失败?

**常见原因:**
- Node.js 版本过低 (需要 18+)
- 网络问题
- 权限问题

**解决方案:**

```bash
# 检查 Node.js 版本
node -v  # 应该 >= 18.x

# 清理缓存，重新安装
npm cache clean --force
rm -rf node_modules package-lock.json
npm install

# 使用国内镜像 (中国用户)
npm config set registry https://registry.npmmirror.com
npm install

# 或使用 yarn
npm install -g yarn
yarn install
```

### Q3: 部署后无法访问?

**检查清单:**

1. 确认构建成功:
   ```bash
   npm run build
   # 检查 dist/ 目录是否生成
   ls dist/
   ```

2. 检查 Cloudflare Pages 配置:
   - 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
   - 进入 "Pages" → "你的项目"
   - 检查 "Build output directory" 是否为 `dist`

3. 查看部署日志:
   ```bash
   npx wrangler pages deployment list --project-name=flux-chat-ui
   ```

### Q4: 聊天功能无法使用?

**可能原因:**
- API 地址错误
- API Key 无效
- CORS 问题

**解决方案:**

1. 检查 API 配置:
   ```toml
   # wrangler.toml
   [vars]
   DEFAULT_API_URL = "https://fluxes.zeabur.app"  # 确认地址正确
   DEFAULT_API_KEY = "1"                           # 确认 Key 有效
   ```

2. 测试 API 连接:
   ```bash
   curl https://fluxes.zeabur.app/v1/models \
     -H "Authorization: Bearer 1"
   ```

3. 查看浏览器控制台错误信息

### Q5: 图片生成失败?

**常见原因:**
- 提示词包含敏感内容
- 模型不支持
- API 限额用尽

**解决方案:**

1. 修改提示词,避免敏感内容
2. 尝试更换模型
3. 检查 API 额度

### Q6: 如何更新项目?

```bash
# 进入项目目录
cd flux-chat-cf

# 拉取最新代码
git pull origin main

# 安装新依赖
npm install

# 构建并部署
npm run build
npm run deploy
```

---

## 进阶配置

### GitHub Actions 自动部署

1. Fork 仓库
2. 在 GitHub 仓库设置中添加 Secrets:
   - `Settings` → `Secrets and variables` → `Actions`
   - 添加 `CLOUDFLARE_API_TOKEN`
   - 添加 `CLOUDFLARE_ACCOUNT_ID`

3. 推送代码到 main 分支自动部署:
   ```bash
   git add .
   git commit -m "Update code"
   git push origin main
   ```

### 自定义域名

1. 在 Cloudflare Pages 项目设置中
2. 点击 "Custom domains"
3. 添加你的域名
4. 按照提示配置 DNS 记录

---

## 相关资源

- [主 README](./README.md)
- [项目仓库](https://github.com/kinai9661/flux-chat-cf)
- [Cloudflare Pages 文档](https://developers.cloudflare.com/pages/)
- [Wrangler 文档](https://developers.cloudflare.com/workers/wrangler/)
- [问题反馈](https://github.com/kinai9661/flux-chat-cf/issues)

---

## 需要帮助?

如果你遇到任何问题:

1. 查看 [常见问题](#常见问题)
2. 搜索 [Issues](https://github.com/kinai9661/flux-chat-cf/issues)
3. 创建新的 [Issue](https://github.com/kinai9661/flux-chat-cf/issues/new)

---

<div align="center">

**祝你部署顺利! 🎉**

Made with ❤️ by [@kinai9661](https://github.com/kinai9661)

</div>
