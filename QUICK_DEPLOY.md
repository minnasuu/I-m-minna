# 🚀 快速部署指南

## Docker 部署（推荐）

```bash
# 1. 配置环境变量
cp env.example .env
vi .env  # 或使用任何文本编辑器，填写你的 DIFY_API_KEY

# 2. 运行部署脚本
./deploy-docker.sh

# 3. 访问应用
# 前端: http://localhost
# 后端: http://localhost:3001
```

详细文档：[DOCKER_DEPLOYMENT.md](./DOCKER_DEPLOYMENT.md)

---

## 宝塔面板部署

```bash
# 1. 配置环境变量（推荐使用宝塔文件管理器）
# 在宝塔面板：文件 → 复制 env.example 为 .env → 右键编辑

# 或使用命令行
cp env.example .env
vi .env  # 填写你的 DIFY_API_KEY

# 2. 运行部署脚本
./deploy-baota.sh

# 3. 在宝塔面板配置 Nginx
# 详见 BAOTA_DEPLOYMENT.md
```

详细文档：[BAOTA_DEPLOYMENT.md](./BAOTA_DEPLOYMENT.md)

---

## 选择部署方式

- **Docker 部署**：适合熟悉 Docker 的用户，一键部署
- **宝塔面板**：适合使用宝塔管理服务器的用户，可视化操作
