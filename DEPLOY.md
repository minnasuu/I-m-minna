# 部署指南

## 1. 准备工作

确保服务器已安装：
- Docker
- Docker Compose

## 2. 文件传输

将以下文件和文件夹上传到服务器的同一目录下（例如 `/app/minna-blog`）：

- `dist/` (无需上传，Docker 会自动构建)
- `node_modules/` (无需上传)
- `server/` (整个文件夹)
- `src/` (整个文件夹)
- `package.json`
- `package-lock.json`
- `Dockerfile`
- `docker-compose.yml`
- `nginx.conf`
- `tsconfig.json` (及其他配置文件)
- `.env` (包含敏感信息，如 DIFY_API_KEY，**不要提交到 git**)

## 3. 环境变量配置

在服务器目录创建 `.env` 文件：

```bash
DIFY_API_KEY=your_dify_api_key_here
DIFY_API_URL=https://api.dify.ai/v1
# 如果有域名，填写真实域名；本地测试可用 http://localhost
FRONTEND_URL=http://your-server-ip-or-domain
```

## 4. 启动服务

在项目根目录下运行：

```bash
# 构建并后台启动
docker-compose up -d --build
```

## 5. 验证

- 前端访问：`http://your-server-ip`
- 后端 API：`http://your-server-ip:8001/health`

## 6. 常用命令

- 查看日志：
  ```bash
  docker-compose logs -f
  ```
- 重启后端（代码更新后）：
  ```bash
  docker-compose restart backend
  ```
- 停止所有服务：
  ```bash
  docker-compose down
  ```
- 彻底清理（包括数据卷）：
  ```bash
  docker-compose down -v
  ```

