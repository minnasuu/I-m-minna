# 🐳 Docker 部署指南

完整的前后端 Docker 部署方案，一键启动整个应用。

## 📋 目录结构

```
I-m-minna/
├── Dockerfile              # 前端 Dockerfile
├── nginx.conf              # Nginx 配置
├── docker-compose.yml      # Docker Compose 编排
├── .dockerignore           # Docker 忽略文件
├── .env.production.example # 环境变量模板
└── server/
    └── Dockerfile          # 后端 Dockerfile
```

## 🚀 快速开始

### 1. 配置环境变量

创建 `.env` 文件：

```bash
cp .env.production.example .env
```

编辑 `.env` 文件，填入你的配置：

```env
DIFY_API_KEY=app-your-actual-key-here
DIFY_API_URL=https://api.dify.ai/v1
FRONTEND_URL=http://your-domain.com
```

### 2. 构建并启动服务

```bash
# 构建并启动所有服务
docker-compose up -d

# 查看日志
docker-compose logs -f

# 查看运行状态
docker-compose ps
```

### 3. 访问应用

- 前端：http://localhost
- 后端 API：http://localhost:3001
- 健康检查：http://localhost:3001/health

## 🔧 常用命令

### 服务管理

```bash
# 启动服务
docker-compose up -d

# 停止服务
docker-compose down

# 重启服务
docker-compose restart

# 停止并删除容器、网络（保留镜像）
docker-compose down

# 停止并删除所有内容（包括镜像）
docker-compose down --rmi all
```

### 查看日志

```bash
# 查看所有服务日志
docker-compose logs -f

# 查看前端日志
docker-compose logs -f frontend

# 查看后端日志
docker-compose logs -f backend

# 查看最近100条日志
docker-compose logs --tail=100
```

### 重新构建

```bash
# 重新构建所有服务
docker-compose build

# 重新构建并启动
docker-compose up -d --build

# 只重新构建前端
docker-compose build frontend

# 只重新构建后端
docker-compose build backend
```

### 进入容器

```bash
# 进入前端容器
docker-compose exec frontend sh

# 进入后端容器
docker-compose exec backend sh
```

## 🌐 生产环境部署

### 使用自定义域名

1. 修改 `docker-compose.yml` 中的端口映射（如果需要）：

```yaml
services:
  frontend:
    ports:
      - "8080:80"  # 改为其他端口
```

2. 配置反向代理（Nginx/Caddy）：

```nginx
# 示例 Nginx 配置
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:80;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

### HTTPS 支持

使用 Let's Encrypt 和 Certbot：

```bash
# 安装 certbot
sudo apt install certbot python3-certbot-nginx

# 获取证书
sudo certbot --nginx -d your-domain.com

# 自动续期
sudo certbot renew --dry-run
```

或者使用 Caddy（自动 HTTPS）：

```caddyfile
your-domain.com {
    reverse_proxy localhost:80
}
```

## 🔍 故障排查

### 检查服务状态

```bash
# 查看容器状态
docker-compose ps

# 查看容器健康状态
docker ps --format "table {{.Names}}\t{{.Status}}"
```

### 检查网络连接

```bash
# 检查网络
docker network ls
docker network inspect minna-network

# 测试后端连接
docker-compose exec frontend ping backend
```

### 常见问题

#### 1. 后端连接失败

```bash
# 检查后端健康状态
curl http://localhost:3001/health

# 查看后端日志
docker-compose logs backend
```

#### 2. 前端无法访问后端

检查 nginx 配置中的代理设置：

```nginx
location /api/ {
    proxy_pass http://backend:3001;
}
```

#### 3. 环境变量未生效

```bash
# 重新构建并启动
docker-compose down
docker-compose up -d --build
```

#### 4. 端口冲突

```bash
# 查看端口占用
sudo lsof -i :80
sudo lsof -i :3001

# 修改端口映射
# 编辑 docker-compose.yml 更改端口
```

## 📊 监控和维护

### 查看资源使用

```bash
# 查看容器资源使用情况
docker stats

# 查看磁盘使用
docker system df
```

### 清理资源

```bash
# 清理未使用的容器
docker container prune

# 清理未使用的镜像
docker image prune

# 清理所有未使用的资源
docker system prune -a

# 清理构建缓存
docker builder prune
```

### 备份和恢复

```bash
# 备份环境变量
cp .env .env.backup

# 导出镜像
docker save -o minna-frontend.tar minna-frontend
docker save -o minna-backend.tar minna-backend

# 导入镜像
docker load -i minna-frontend.tar
docker load -i minna-backend.tar
```

## 🔐 安全建议

1. **保护 .env 文件**
   ```bash
   chmod 600 .env
   ```

2. **使用 secrets（Docker Swarm）**
   ```yaml
   services:
     backend:
       secrets:
         - dify_api_key
   secrets:
     dify_api_key:
       external: true
   ```

3. **限制容器权限**
   ```yaml
   services:
     backend:
       user: "node"
       read_only: true
   ```

4. **更新依赖**
   ```bash
   # 定期更新镜像
   docker-compose pull
   docker-compose up -d
   ```

## 🚢 云平台部署

### Docker Hub

```bash
# 登录
docker login

# 标记镜像
docker tag minna-frontend your-username/minna-frontend:latest
docker tag minna-backend your-username/minna-backend:latest

# 推送
docker push your-username/minna-frontend:latest
docker push your-username/minna-backend:latest
```

### AWS ECS / Azure Container Instances / Google Cloud Run

使用 `docker-compose.yml` 作为基础配置，根据各平台要求调整。

## 📝 开发环境

本地开发时不建议使用 Docker，直接使用：

```bash
# 前端
npm run dev

# 后端
cd server && npm run dev
```

## 🆘 获取帮助

- 查看日志：`docker-compose logs -f`
- 检查配置：`docker-compose config`
- 官方文档：https://docs.docker.com/compose/

---

## 📄 服务架构

```
┌─────────────────────────────────────────┐
│                                         │
│  用户浏览器 (http://your-domain.com)    │
│                                         │
└──────────────────┬──────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────┐
│        Nginx (Port 80)                  │
│  - 静态文件服务                          │
│  - API 反向代理                          │
│  - Gzip 压缩                             │
└──────────────────┬──────────────────────┘
                   │
         ┌─────────┴─────────┐
         ▼                   ▼
┌─────────────────┐  ┌──────────────────┐
│  Frontend       │  │   Backend        │
│  (React/Vite)   │  │   (Express)      │
│  Port: 80       │  │   Port: 3001     │
└─────────────────┘  └────────┬─────────┘
                              │
                              ▼
                     ┌─────────────────┐
                     │   Dify API      │
                     │  (External)     │
                     └─────────────────┘
```

## 🎉 完成！

现在你的应用已经在 Docker 容器中运行了。享受容器化带来的便利！
