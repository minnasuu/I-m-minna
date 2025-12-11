# 启动开发环境

## 方式 1: 手动启动（推荐用于调试）

### 1. 启动后端服务器
```bash
# 终端 1
cd server
npm start
# 或者使用自动重载
npm run dev
```

### 2. 启动前端
```bash
# 终端 2
npm run dev
```

## 方式 2: 并发启动（一次性启动）

如果你安装了 `concurrently`：

```bash
npm install --save-dev concurrently
```

然后在根目录的 `package.json` 中添加：

```json
"scripts": {
  "dev:server": "cd server && npm run dev",
  "dev:client": "vite",
  "dev:all": "concurrently \"npm run dev:server\" \"npm run dev:client\""
}
```

启动：
```bash
npm run dev:all
```

## 访问地址

- 前端: http://localhost:5173
- 后端: http://localhost:3001
- 后端健康检查: http://localhost:3001/health

## 故障排查

### 后端启动失败
1. 确保 `.env.server` 文件存在且配置正确
2. 检查端口 3001 是否被占用

### 前端无法连接后端
1. 确保后端服务器正在运行
2. 检查浏览器控制台的 CORS 错误
3. 访问 http://localhost:3001/health 确认后端正常
