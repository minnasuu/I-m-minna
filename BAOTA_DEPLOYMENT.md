# 🎛️ 宝塔面板部署指南

在宝塔面板上部署 Minna 个人网站的完整指南。

## 📋 前置要求

### 服务器要求
- 操作系统：CentOS 7+、Ubuntu 18+、Debian 9+
- 内存：至少 1GB
- 已安装宝塔面板 7.x 或更高版本

### 宝塔面板环境
需要在宝塔面板安装以下软件：
- ✅ Nginx 1.20+
- ✅ Node.js 18.x
- ✅ PM2 管理器
- ⚠️ Docker（可选，用于容器化部署）

---

## 🚀 方式一：标准部署（推荐）

使用 Nginx + PM2 + Node.js 的标准部署方式。

### 第 1 步：上传代码

#### 方式 A：使用宝塔文件管理器
1. 登录宝塔面板
2. 点击 **文件** → 进入 `/www/wwwroot/`
3. 创建目录 `minna` 并进入
4. 点击 **上传** → 上传整个项目压缩包
5. 解压文件

#### 方式 B：使用 Git（推荐）
1. 点击 **文件** → 进入 `/www/wwwroot/`
2. 点击 **终端** 按钮打开命令行
3. 执行命令：
```bash
cd /www/wwwroot/
git clone https://github.com/your-username/I-m-minna.git minna
cd minna
```

### 第 2 步：配置环境变量

> 💡 **提示**：如果不熟悉命令行编辑器，查看 [编辑器使用指南](./EDITOR_GUIDE.md)

#### 方式 A：使用宝塔文件管理器（推荐，最简单）

1. 在宝塔面板点击 **文件**
2. 进入 `/www/wwwroot/minna`
3. 找到 `env.example` 文件，右键 → **复制**
4. 粘贴后重命名为 `.env`
5. 右键 `.env` → **编辑**
6. 修改以下配置：
```env
DIFY_API_KEY=your-actual-dify-api-key-here
DIFY_API_URL=https://api.dify.ai/v1
PORT=3001
FRONTEND_URL=http://your-domain.com
```
7. 点击 **保存**

⚠️ **安全提醒**：请替换 `your-actual-dify-api-key-here` 为你的真实 Dify API 密钥

#### 方式 B：使用命令行

```bash
cd /www/wwwroot/minna

# 方法1: 复制示例文件后编辑（推荐）
cp env.example .env
vi .env
# 按 i 进入编辑模式，修改 DIFY_API_KEY 为你的真实密钥
# 编辑完成后按 ESC，输入 :wq 保存退出

# 方法2: 使用 cat 直接写入
cat > .env << 'EOF'
DIFY_API_KEY=your-actual-dify-api-key-here
DIFY_API_URL=https://api.dify.ai/v1
PORT=3001
FRONTEND_URL=http://your-domain.com
EOF

# ⚠️ 记得替换 your-actual-dify-api-key-here 为真实密钥
```

### 第 3 步：安装 Node.js 环境

#### 3.1 安装 Node.js
1. 点击 **软件商店**
2. 搜索 **Node 版本管理器**
3. 安装 **Node.js 版本管理器**
4. 安装 **Node.js 18.x**

#### 3.2 安装 PM2
1. 在软件商店搜索 **PM2**
2. 点击安装 **PM2 管理器**

### 第 4 步：构建前端

1. 打开宝塔终端
2. 执行命令：

```bash
cd /www/wwwroot/minna

# 安装前端依赖
npm install

# 构建前端
npm run build
```

构建完成后会生成 `dist` 目录。

### 第 5 步：安装和启动后端

```bash
cd /www/wwwroot/minna/server

# 安装后端依赖
npm install

# 测试启动（确保没有错误）
node index.js
# 看到 "🚀 Dify Proxy Server is running" 后按 Ctrl+C 退出
```

### 第 6 步：配置 PM2 管理后端

#### 6.1 创建 PM2 配置文件

在项目根目录创建 `ecosystem.config.cjs`：

```bash
cd /www/wwwroot/minna
cat > ecosystem.config.cjs << 'EOF'
module.exports = {
  apps: [{
    name: 'minna-backend',
    script: './server/index.js',
    cwd: '/www/wwwroot/minna',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '500M',
    env: {
      NODE_ENV: 'production',
      PORT: 3001
    }
  }]
}
EOF
```

#### 6.2 使用宝塔 PM2 管理器

1. 点击左侧菜单 **软件商店** → 找到 **PM2 管理器** → 点击 **设置**
2. 点击 **添加项目**
3. 填写配置：
   - **项目名称**: `minna-backend`
   - **项目路径**: `/www/wwwroot/minna`
   - **启动文件**: `server/index.js`
   - **运行目录**: `/www/wwwroot/minna`
4. 点击 **提交**
5. 在项目列表中点击 **启动**

或使用命令行：
```bash
cd /www/wwwroot/minna
pm2 start ecosystem.config.cjs
pm2 save
pm2 startup
```

### 第 7 步：配置 Nginx

#### 7.1 创建网站

1. 点击 **网站** → **添加站点**
2. 填写信息：
   - **域名**: `your-domain.com`（你的域名）
   - **根目录**: `/www/wwwroot/minna`（⚠️ 注意：是项目根目录，不是 dist）
   - **PHP 版本**: 选择 **纯静态**
3. 点击 **提交**

> ⚠️ **重要**：根目录设置为项目根目录 `/www/wwwroot/minna`，而不是 `/www/wwwroot/minna/dist`。  
> 这样可以避免宝塔面板在 dist 目录创建 `.user.ini` 等文件，导致构建失败。  
> 真正的静态文件路径会在 Nginx 配置中通过 `root` 指令指定。

#### 7.2 配置反向代理

1. 在网站列表找到刚创建的网站
2. 点击 **设置** → **反向代理**
3. 点击 **添加反向代理**
4. 填写配置：
   - **代理名称**: `minna-api`
   - **目标URL**: `http://127.0.0.1:3001`
   - **发送域名**: `$host`
   - **代理目录**: `/api`
5. 点击 **提交**

#### 7.3 配置 Nginx 静态文件和路由（重要！）

点击网站的 **设置** → **配置文件**，找到 `location / { }` 部分，修改为：

```nginx
location / {
    root /www/wwwroot/minna/dist;
    try_files $uri $uri/ /index.html;
    index index.html;
    
    # 静态资源缓存
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}

# API 反向代理（如果之前添加了，这里会自动生成）
location /api/ {
    proxy_pass http://127.0.0.1:3001;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}
```

点击 **保存** 并重载配置。

### 第 8 步：配置 SSL（可选但推荐）

1. 在网站设置中点击 **SSL**
2. 选择 **Let's Encrypt** 免费证书
3. 输入邮箱地址
4. 勾选域名
5. 点击 **申请**
6. 开启 **强制 HTTPS**

### 第 9 步：测试访问

1. 访问 `http://your-domain.com` 或 `https://your-domain.com`
2. 检查后端 API：`http://your-domain.com/api/health`（应该返回 JSON）
3. 测试 AI 对话功能

---

## 🐳 方式二：Docker 部署（进阶）

如果你的宝塔面板安装了 Docker。

### 第 1 步：安装 Docker

1. 点击 **软件商店**
2. 搜索 **Docker**
3. 安装 **Docker 管理器**

### 第 2 步：上传代码并配置

同方式一的第 1、2 步。

### 第 3 步：使用 Docker Compose

1. 打开终端，进入项目目录：
```bash
cd /www/wwwroot/minna
```

2. 构建前端：
```bash
npm install
npm run build
```

3. 使用简化的 Docker Compose：
```bash
docker-compose -f docker-compose.simple.yml up -d
```

4. 查看状态：
```bash
docker-compose -f docker-compose.simple.yml ps
docker-compose -f docker-compose.simple.yml logs -f
```

### 第 4 步：配置 Nginx 反向代理

在宝塔面板创建网站，配置反向代理：
- 前端：`http://127.0.0.1:80`
- 后端：`http://127.0.0.1:3001`

---

## 🔧 维护管理

### 查看后端日志

#### 使用宝塔 PM2 管理器
1. 点击 **软件商店** → **PM2 管理器** → **设置**
2. 找到 `minna-backend` 项目
3. 点击 **日志** 查看

#### 使用命令行
```bash
pm2 logs minna-backend
pm2 logs minna-backend --lines 100
```

### 重启服务

#### 重启后端
```bash
pm2 restart minna-backend
```

或在宝塔 PM2 管理器中点击 **重启** 按钮。

#### 重载 Nginx
在宝塔面板：
1. 点击 **软件商店** → 找到 **Nginx**
2. 点击 **设置** → **服务** → **重载配置**

### 更新代码

```bash
cd /www/wwwroot/minna

# 拉取最新代码
git pull

# 更新前端
npm install
npm run build

# 更新后端依赖（如果有变化）
cd server
npm install
cd ..

# 重启后端服务
pm2 restart minna-backend
```

### 监控资源使用

```bash
# 查看 PM2 进程状态
pm2 status

# 查看详细监控
pm2 monit

# 查看资源使用
pm2 list
```

---

## 🔍 故障排查

### 问题 1：后端启动失败

**检查步骤：**
```bash
# 查看 PM2 日志
pm2 logs minna-backend --lines 50

# 手动测试启动
cd /www/wwwroot/minna/server
node index.js
```

**常见原因：**
- `.env` 文件配置错误
- 端口 3001 被占用
- Node.js 版本不兼容（需要 18+）

**解决方法：**
```bash
# 检查端口占用
netstat -tlnp | grep 3001

# 杀死占用端口的进程
kill -9 [PID]

# 检查 Node.js 版本
node -v  # 应该是 v18.x.x
```

### 问题 2：前端无法访问后端

**检查步骤：**
1. 确认后端服务运行：`curl http://127.0.0.1:3001/health`
2. 检查 Nginx 反向代理配置
3. 查看 Nginx 错误日志：`/www/wwwlogs/your-domain.com.error.log`

**解决方法：**
- 确保 Nginx 配置正确
- 检查防火墙规则
- 确认 SELinux 设置（CentOS）

### 问题 3：页面刷新 404

**原因：** Nginx 没有配置 SPA 路由回退

**解决方法：**
在 Nginx 配置中确保有：
```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

### 问题 4：构建失败

**检查：**
```bash
# 清除缓存重新构建
rm -rf node_modules
rm -rf dist
npm install
npm run build
```

---

## 📊 性能优化

### 1. 开启 Gzip 压缩

在宝塔 Nginx 配置中添加：
```nginx
gzip on;
gzip_vary on;
gzip_min_length 1024;
gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/json application/javascript;
```

### 2. 配置缓存

静态资源已在配置中设置 1 年缓存：
```nginx
location ~* \.(jpg|jpeg|png|gif|ico|css|js)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

### 3. 优化 PM2 配置

编辑 `ecosystem.config.js`：
```javascript
module.exports = {
  apps: [{
    name: 'minna-backend',
    script: './server/index.js',
    instances: 'max',  // 使用所有 CPU 核心
    exec_mode: 'cluster',  // 集群模式
    max_memory_restart: '500M',
    autorestart: true,
    watch: false,
    env: {
      NODE_ENV: 'production'
    }
  }]
}
```

---

## 🔐 安全建议

### 1. 保护 .env 文件

确保 `.env` 文件权限：
```bash
chmod 600 /www/wwwroot/minna/.env
```

### 2. 配置防火墙

在宝塔面板：
1. 点击 **安全**
2. 确保只开放必要端口：80、443
3. **不要**开放 3001 端口给外网

### 3. 定期更新

```bash
# 更新系统
yum update -y  # CentOS
apt update && apt upgrade -y  # Ubuntu/Debian

# 更新 Node.js 依赖
cd /www/wwwroot/minna
npm audit fix
```

### 4. 配置访问限制（可选）

如果需要限制某些 IP 访问，在 Nginx 配置中：
```nginx
location /api/ {
    # allow 1.2.3.4;  # 允许特定IP
    # deny all;        # 拒绝其他所有IP
    proxy_pass http://127.0.0.1:3001;
}
```

---

## 📱 快速命令参考

```bash
# 项目目录
cd /www/wwwroot/minna

# 查看后端日志
pm2 logs minna-backend

# 重启后端
pm2 restart minna-backend

# 查看后端状态
pm2 status

# 更新代码
git pull

# 重新构建前端
npm run build

# 查看后端健康状态
curl http://127.0.0.1:3001/health

# 重载 Nginx
nginx -s reload
```

---

## 🎉 完成！

现在你的网站应该已经在宝塔面板上成功运行了！

- **前端地址**: `https://your-domain.com`
- **后端 API**: `https://your-domain.com/api/`
- **健康检查**: `https://your-domain.com/api/health`

如果遇到问题，请查看故障排查部分或查看日志文件。
