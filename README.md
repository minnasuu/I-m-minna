# 🌟 Minna's Personal Website

一个现代化的个人网站，支持多种主题风格和 AI 对话功能。

## ✨ 主要特性

- 🎨 **多主题支持** - AI 助手主题、终端主题等
- 🤖 **AI 对话功能** - 基于 Dify API 的智能对话
- 📝 **文章系统** - Markdown 支持的技术博客
- 💾 **本地缓存** - 24小时对话历史保存
- 🚀 **现代技术栈** - React 19 + TypeScript + Vite
- 📱 **响应式设计** - 完美适配移动端和桌面端

---

## 🚀 快速开始

### 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 启动后端服务（如需 AI 功能）
npm run dev:server
```

访问 `http://localhost:5173`

---

## 📦 部署

### 方式 1: 宝塔面板部署（推荐）

详细步骤请查看 [宝塔部署文档](./BAOTA_DEPLOYMENT.md)

```bash
# 1. 配置环境变量
cp env.example .env
vi .env  # 填写配置

# 2. 运行部署脚本
./deploy-baota.sh

# 3. 在宝塔面板配置 Nginx
# 详见 BAOTA_DEPLOYMENT.md
```

### 方式 2: Docker 部署

详细步骤请查看 [Docker 部署文档](./DOCKER_DEPLOYMENT.md)

```bash
# 1. 配置环境变量
cp env.example .env
vi .env  # 填写配置

# 2. 运行部署脚本
./deploy-docker.sh
```

### 方式 3: 快速查看

查看 [快速部署指南](./QUICK_DEPLOY.md)

---

## 🛠️ 技术栈

### 前端
- **React 19** - UI 框架
- **TypeScript** - 类型安全
- **Vite 6** - 构建工具
- **Tailwind CSS** - 样式框架
- **React Router** - 路由管理
- **React Markdown** - Markdown 渲染

### 后端
- **Node.js 18+** - 运行环境
- **Express** - Web 框架
- **Dify API** - AI 对话服务

### 部署
- **Docker** - 容器化
- **Nginx** - Web 服务器
- **PM2** - 进程管理

---

## 📁 项目结构

```
I-m-minna/
├── src/                          # 前端源代码
│   ├── features/
│   │   ├── themes/              # 主题组件
│   │   │   ├── AITheme/        # AI 对话主题
│   │   │   └── TerminalTheme/  # 终端主题
│   │   └── articles/            # 文章系统
│   ├── shared/                  # 共享组件
│   │   ├── components/         # 通用组件
│   │   ├── contexts/           # React Context
│   │   └── utils/              # 工具函数
│   └── data/                   # 数据配置
│
├── server/                      # 后端服务
│   ├── index.js               # Express 服务器
│   └── package.json           # 后端依赖
│
├── public/                      # 静态资源
├── docs/                       # 文档
│   ├── BAOTA_DEPLOYMENT.md   # 宝塔部署文档
│   └── DOCKER_DEPLOYMENT.md  # Docker 部署文档
│
├── Dockerfile                  # 前端 Docker 配置
├── docker-compose.yml         # Docker Compose 配置
├── nginx.conf                 # Nginx 配置
├── ecosystem.config.js        # PM2 配置
└── deploy-*.sh               # 部署脚本
```

---

## 🔧 配置

### 环境变量

创建 `.env` 文件：

```env
# Dify API 配置
DIFY_API_KEY=your-api-key-here
DIFY_API_URL=https://api.dify.ai/v1

# 服务配置
PORT=3001
FRONTEND_URL=http://your-domain.com
```

### 前端配置

编辑 `src/data/personalData.tsx` 更新个人信息：
- 个人信息
- 技能列表
- 项目作品
- 文章内容

---

## 🎨 主题系统

### AI 主题
- 智能对话功能
- Markdown 渲染
- 对话历史缓存
- 暂停/继续生成

### 终端主题
- 复古终端界面
- 命令行交互
- 打字机效果

---

## 📝 文章系统

支持 Markdown 格式的技术文章：
- 代码高亮
- 图片展示
- 目录导航
- 响应式布局

---

## 🔐 安全说明

### API 密钥保护 ⚠️ 重要

本项目使用**后端代理模式**保护 Dify API 密钥：

```
浏览器 → 前端 → 后端代理 → Dify API
                    ↑
              密钥只存在这里
```

- ✅ **前端代码**：不包含任何 API 密钥
- ✅ **后端服务**：API 密钥存储在 `.env.server` 中
- ✅ **Git 保护**：`.env*` 文件已添加到 `.gitignore`
- ✅ **HTTPS**：支持 SSL 证书，加密传输
- ✅ **CORS**：限制允许的域名访问

详细安全说明请查看 [SECURITY.md](./SECURITY.md)

---

## 📊 性能优化

- ✅ Gzip 压缩
- ✅ 静态资源缓存
- ✅ 代码分割
- ✅ 懒加载
- ✅ CDN 支持

---

## 🐛 故障排查

### 前端问题

**页面刷新 404**
- 确保 Nginx 配置了 `try_files $uri $uri/ /index.html;`

**静态资源加载失败**
- 检查 `root` 目录是否指向 `dist` 文件夹

### 后端问题

**无法连接后端**
- 检查 PM2 状态：`pm2 status`
- 查看日志：`pm2 logs minna-backend`

**API 调用失败**
- 验证 Dify API Key 是否正确
- 检查 Dify 工作流是否已发布

---

## 📖 文档

- [宝塔部署指南](./BAOTA_DEPLOYMENT.md) - 完整的宝塔面板部署步骤
- [Docker 部署指南](./DOCKER_DEPLOYMENT.md) - Docker 容器化部署
- [快速开始](./QUICK_DEPLOY.md) - 快速部署参考
- [开发环境设置](./DEV_SETUP.md) - 本地开发环境配置

---

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

---

## 📄 许可证

MIT License

---

## 👤 作者

**苏敏晗 (Minna Su)**

- Website: https://suminhan.cn
- GitHub: [@minnasuuGitHub](https://github.com/minnasuuGitHub)

---

**⭐ 如果这个项目对你有帮助，请给个 Star！**
