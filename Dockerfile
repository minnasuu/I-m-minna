# 前端构建阶段
FROM node:18-alpine AS builder

WORKDIR /app

# 复制前端依赖文件
COPY package*.json ./
# 如果有 pnpm-lock.yaml，可以使用 pnpm
# COPY pnpm-lock.yaml ./

# 安装依赖
# RUN npm install -g pnpm && pnpm install
RUN npm install

# 复制前端源代码
COPY . .

# 构建前端应用 (Production Mode)
RUN npm run build

# Nginx 服务阶段
FROM nginx:alpine

# 复制构建好的前端文件
COPY --from=builder /app/dist /usr/share/nginx/html

# 复制 nginx 配置
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 暴露端口
EXPOSE 80

# 启动 nginx
CMD ["nginx", "-g", "daemon off;"]
