#!/bin/bash

# Docker 部署脚本
# 用于快速部署前后端服务到生产环境

set -e  # 遇到错误立即退出

echo "🚀 开始部署 Minna 应用..."

# 检查 .env 文件
if [ ! -f .env ]; then
    echo "❌ 错误：未找到 .env 文件"
    echo "请先复制 .env.production.example 到 .env 并填写配置"
    exit 1
fi

# 检查 Docker 是否安装
if ! command -v docker &> /dev/null; then
    echo "❌ 错误：未安装 Docker"
    echo "请先安装 Docker: https://docs.docker.com/get-docker/"
    exit 1
fi

# 检查 Docker Compose 是否安装
if ! command -v docker-compose &> /dev/null; then
    echo "❌ 错误：未安装 Docker Compose"
    echo "请先安装 Docker Compose: https://docs.docker.com/compose/install/"
    exit 1
fi

# 停止现有服务
echo "📦 停止现有服务..."
docker-compose down

# 拉取最新代码（如果是 git 仓库）
if [ -d .git ]; then
    echo "🔄 拉取最新代码..."
    git pull
fi

# 构建镜像
echo "🏗️  构建 Docker 镜像..."
docker-compose build --no-cache

# 启动服务
echo "▶️  启动服务..."
docker-compose up -d

# 等待服务启动
echo "⏳ 等待服务启动..."
sleep 10

# 检查服务状态
echo "🔍 检查服务状态..."
docker-compose ps

# 检查后端健康状态
echo "🏥 检查后端健康状态..."
if curl -f http://localhost:3001/health > /dev/null 2>&1; then
    echo "✅ 后端服务正常"
else
    echo "⚠️  后端服务可能未正常启动，请检查日志："
    echo "   docker-compose logs backend"
fi

# 显示日志
echo ""
echo "📋 最近的日志："
docker-compose logs --tail=20

echo ""
echo "✅ 部署完成！"
echo ""
echo "📍 访问地址："
echo "   前端: http://localhost"
echo "   后端: http://localhost:3001"
echo "   健康检查: http://localhost:3001/health"
echo ""
echo "📊 查看日志："
echo "   docker-compose logs -f"
echo ""
echo "🛑 停止服务："
echo "   docker-compose down"
