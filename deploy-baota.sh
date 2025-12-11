#!/bin/bash

# 宝塔面板一键部署脚本

echo "🎛️  宝塔面板部署脚本"
echo "===================="
echo ""

# 检查是否在正确的目录
if [ ! -f "package.json" ]; then
    echo "❌ 错误：请在项目根目录运行此脚本"
    exit 1
fi

# 1. 检查 .env 文件
if [ ! -f ".env" ]; then
    echo "⚠️  警告：未找到 .env 文件"
    echo "请先创建 .env 文件并配置："
    echo ""
    echo "方式1（推荐）: 使用宝塔文件管理器"
    echo "  在宝塔面板：文件 → 复制 env.example 为 .env → 右键编辑"
    echo ""
    echo "方式2: 使用命令行"
    echo "  cp env.example .env"
    echo "  vi .env  # 或使用宝塔终端的文件编辑功能"
    echo ""
    read -p "是否已配置 .env 文件？(y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# 2. 安装前端依赖
echo "📦 安装前端依赖..."
npm install

# 3. 构建前端
echo "🏗️  构建前端..."
npm run build

if [ ! -d "dist" ]; then
    echo "❌ 前端构建失败"
    exit 1
fi
echo "✅ 前端构建完成"

# 4. 安装后端依赖
echo "📦 安装后端依赖..."
cd server
npm install
cd ..
echo "✅ 后端依赖安装完成"

# 5. 创建日志目录
mkdir -p logs
chmod 755 logs

# 6. 停止现有 PM2 进程
echo "🔄 停止现有服务..."
pm2 stop minna-backend 2>/dev/null || true
pm2 delete minna-backend 2>/dev/null || true

# 7. 启动 PM2
echo "▶️  启动后端服务..."
pm2 start ecosystem.config.cjs
pm2 save

# 8. 显示状态
echo ""
echo "📊 服务状态："
pm2 status

# 9. 测试后端
sleep 2
echo ""
echo "🔍 测试后端健康状态..."
if curl -f http://127.0.0.1:3001/health > /dev/null 2>&1; then
    echo "✅ 后端服务正常"
else
    echo "⚠️  后端服务可能未正常启动"
    echo "请查看日志: pm2 logs minna-backend"
fi

echo ""
echo "✅ 部署完成！"
echo ""
echo "📋 下一步操作："
echo "1. 在宝塔面板创建网站，根目录指向: $(pwd)/dist"
echo "2. 配置 Nginx 反向代理 /api/ -> http://127.0.0.1:3001"
echo "3. 配置 SSL 证书（推荐）"
echo ""
echo "📖 详细文档：BAOTA_DEPLOYMENT.md"
echo ""
echo "🔧 常用命令："
echo "   pm2 logs minna-backend    # 查看日志"
echo "   pm2 restart minna-backend # 重启服务"
echo "   pm2 status                # 查看状态"
