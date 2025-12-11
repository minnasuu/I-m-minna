FROM node:18-alpine

WORKDIR /app

# 复制后端依赖文件
COPY package*.json ./
COPY prisma ./prisma/

# 安装依赖
RUN npm install

# 生成 Prisma Client
RUN rm -rf node_modules/.prisma/client && npx prisma generate

# 复制后端源代码
COPY index.js ./
COPY routes ./routes

# 暴露端口
EXPOSE 3001

# 健康检查
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3001/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# 启动服务
CMD ["node", "index.js"]
