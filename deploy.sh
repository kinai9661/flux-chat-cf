#!/bin/bash

set -e

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 清屏
clear

echo -e "${BLUE}"
cat << "EOF"
╭────────────────────────────────────────────────╮
│                                                │
│      🚀 FLUX Chat UI - 一键部署脚本      │
│                                                │
│   基于 Cloudflare Pages 的 AI 聊天和图片生成  │
│                                                │
╰────────────────────────────────────────────────╯
EOF
echo -e "${NC}"

echo -e "${GREEN}正在检查环境...${NC}"

# 检查 Node.js
if ! command -v node &> /dev/null; then
    echo -e "${RED}✗ 未检测到 Node.js，请先安装 Node.js 18+${NC}"
    echo -e "${YELLOW}访问: https://nodejs.org/${NC}"
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo -e "${RED}✗ Node.js 版本过低 (当前: $(node -v))，需要 18+${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Node.js 版本: $(node -v)${NC}"

# 检查 npm
if ! command -v npm &> /dev/null; then
    echo -e "${RED}✗ 未检测到 npm${NC}"
    exit 1
fi
echo -e "${GREEN}✓ npm 版本: $(npm -v)${NC}"

# 检查 git
if ! command -v git &> /dev/null; then
    echo -e "${RED}✗ 未检测到 git${NC}"
    exit 1
fi
echo -e "${GREEN}✓ git 版本: $(git --version)${NC}"

echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

# 选择部署方式
echo -e "${YELLOW}请选择部署方式:${NC}"
echo -e "  ${GREEN}1)${NC} 克隆仓库并本地部署 (推荐)"
echo -e "  ${GREEN}2)${NC} 只克隆仓库，不自动部署"
echo -e "  ${GREEN}3)${NC} 在当前目录安装依赖并部署"
echo ""
read -p "请输入选项 (1-3): " DEPLOY_MODE

case $DEPLOY_MODE in
    1)
        echo -e "\n${GREEN}正在克隆仓库...${NC}"
        
        # 检查目录是否存在
        if [ -d "flux-chat-cf" ]; then
            echo -e "${YELLOW}目录 flux-chat-cf 已存在，是否删除? (y/n)${NC}"
            read -p "" REMOVE_DIR
            if [ "$REMOVE_DIR" = "y" ] || [ "$REMOVE_DIR" = "Y" ]; then
                rm -rf flux-chat-cf
            else
                echo -e "${RED}取消部署${NC}"
                exit 1
            fi
        fi
        
        git clone https://github.com/kinai9661/flux-chat-cf.git
        cd flux-chat-cf
        
        echo -e "\n${GREEN}正在安装依赖...${NC}"
        npm install
        
        echo -e "\n${GREEN}正在构建项目...${NC}"
        npm run build
        
        echo -e "\n${YELLOW}是否立即部署到 Cloudflare Pages? (y/n)${NC}"
        read -p "" DEPLOY_NOW
        
        if [ "$DEPLOY_NOW" = "y" ] || [ "$DEPLOY_NOW" = "Y" ]; then
            echo -e "\n${GREEN}正在登录 Cloudflare...${NC}"
            npx wrangler login
            
            echo -e "\n${GREEN}正在部署...${NC}"
            npx wrangler pages deploy dist --project-name=flux-chat-ui
            
            echo -e "\n${GREEN}✓ 部署完成！${NC}"
        else
            echo -e "\n${BLUE}手动部署命令:${NC}"
            echo -e "${YELLOW}cd flux-chat-cf && npm run deploy${NC}"
        fi
        ;;
    
    2)
        echo -e "\n${GREEN}正在克隆仓库...${NC}"
        
        if [ -d "flux-chat-cf" ]; then
            echo -e "${YELLOW}目录 flux-chat-cf 已存在，是否删除? (y/n)${NC}"
            read -p "" REMOVE_DIR
            if [ "$REMOVE_DIR" = "y" ] || [ "$REMOVE_DIR" = "Y" ]; then
                rm -rf flux-chat-cf
            else
                echo -e "${RED}取消部署${NC}"
                exit 1
            fi
        fi
        
        git clone https://github.com/kinai9661/flux-chat-cf.git
        cd flux-chat-cf
        
        echo -e "\n${GREEN}正在安装依赖...${NC}"
        npm install
        
        echo -e "\n${GREEN}✓ 仓库克隆完成！${NC}"
        echo -e "\n${BLUE}后续步骤:${NC}"
        echo -e "${YELLOW}cd flux-chat-cf${NC}"
        echo -e "${YELLOW}npm run dev      # 本地开发${NC}"
        echo -e "${YELLOW}npm run build    # 构建${NC}"
        echo -e "${YELLOW}npm run deploy   # 部署${NC}"
        ;;
    
    3)
        echo -e "\n${GREEN}正在安装依赖...${NC}"
        
        if [ ! -f "package.json" ]; then
            echo -e "${RED}✗ 当前目录不是 flux-chat-cf 项目${NC}"
            exit 1
        fi
        
        npm install
        
        echo -e "\n${GREEN}正在构建项目...${NC}"
        npm run build
        
        echo -e "\n${YELLOW}是否立即部署到 Cloudflare Pages? (y/n)${NC}"
        read -p "" DEPLOY_NOW
        
        if [ "$DEPLOY_NOW" = "y" ] || [ "$DEPLOY_NOW" = "Y" ]; then
            echo -e "\n${GREEN}正在登录 Cloudflare...${NC}"
            npx wrangler login
            
            echo -e "\n${GREEN}正在部署...${NC}"
            npx wrangler pages deploy dist --project-name=flux-chat-ui
            
            echo -e "\n${GREEN}✓ 部署完成！${NC}"
        else
            echo -e "\n${BLUE}手动部署命令:${NC}"
            echo -e "${YELLOW}npm run deploy${NC}"
        fi
        ;;
    
    *)
        echo -e "${RED}无效的选项${NC}"
        exit 1
        ;;
esac

echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "${GREEN}✨ 完成！${NC}"
echo ""
echo -e "${BLUE}📚 常用命令:${NC}"
echo -e "  ${YELLOW}npm run dev${NC}      - 启动开发服务器"
echo -e "  ${YELLOW}npm run build${NC}    - 构建项目"
echo -e "  ${YELLOW}npm run preview${NC}  - 预览 (Cloudflare 环境)"
echo -e "  ${YELLOW}npm run deploy${NC}   - 部署到 Cloudflare Pages"
echo ""
echo -e "${BLUE}🔗 相关链接:${NC}"
echo -e "  项目仓库: ${YELLOW}https://github.com/kinai9661/flux-chat-cf${NC}"
echo -e "  Cloudflare: ${YELLOW}https://dash.cloudflare.com/pages${NC}"
echo ""
echo -e "${GREEN}Made with ❤️  by kinai9661${NC}"
echo ""
