FROM node:18-alpine

WORKDIR /app

# 复制后端依赖文件
COPY package*.json ./
COPY prisma ./prisma/

# 安装依赖 (Production)
RUN npm install --production

# 安装 Prisma CLI (开发依赖，用于 generate 和 migrate)
RUN npm install -D prisma

# 生成 Prisma Client
RUN npx prisma generate

# 复制后端源代码
COPY index.js ./
COPY routes ./routes

# 暴露端口
EXPOSE 3001

# 启动脚本：先运行 migrate 确保数据库同步，然后启动服务
CMD ["sh", "-c", "npx prisma migrate deploy && node index.js"]
