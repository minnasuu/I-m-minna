# 🔒 安全说明

## API 密钥保护

### ✅ 当前实现（安全）

本项目采用**后端代理模式**，确保 Dify API 密钥不会暴露给前端用户：

```
用户浏览器 → 前端 React App → 后端 Express Server → Dify API
                          ↑
                    API 密钥只存在这里
```

#### 前端（安全）
- ✅ 前端代码不包含任何 API 密钥
- ✅ 前端只调用自己的后端代理 `/api/chat`
- ✅ 所有敏感配置都在后端处理

参见：`src/shared/utils/backendClient.ts`

#### 后端（安全）
- ✅ API 密钥存储在 `.env.server` 文件中
- ✅ `.env.server` 已添加到 `.gitignore`
- ✅ 后端代理负责与 Dify API 通信

参见：`server/index.js`

---

## 环境变量管理

### ⚠️ 重要文件

| 文件 | 用途 | 是否提交 |
|------|------|---------|
| `.env` | 生产环境配置（包含真实密钥） | ❌ 不提交 |
| `.env.server` | 后端环境配置（包含真实密钥） | ❌ 不提交 |
| `env.example` | 配置模板（占位符） | ✅ 提交 |
| `server/env.example` | 后端配置模板（占位符） | ✅ 提交 |

### ✅ 已配置的保护

`.gitignore` 中已添加：

```gitignore
# Environment variables with sensitive data
.env
.env.local
.env.server
.env.production
src/config/dify.ts
```

---

## 部署安全检查清单

### 部署前检查

- [ ] 确认 `.env` 或 `.env.server` 不在 Git 仓库中
- [ ] 确认所有示例文件使用占位符，不包含真实密钥
- [ ] 确认前端代码不包含任何 API 密钥
- [ ] 确认后端 CORS 配置限制了允许的域名

### 部署时配置

1. **在服务器上创建 `.env` 文件**
   ```bash
   cp env.example .env
   vi .env  # 填入真实密钥
   ```

2. **设置正确的文件权限**
   ```bash
   chmod 600 .env
   chmod 600 .env.server
   ```

3. **验证环境变量**
   ```bash
   # 不要在生产环境运行此命令，这里仅用于测试
   # cat .env  # 仅在安全环境查看
   ```

---

## 常见安全问题

### ❌ 错误做法

```typescript
// ❌ 不要在前端直接调用 Dify API
const response = await fetch('https://api.dify.ai/v1/chat-messages', {
  headers: {
    'Authorization': 'Bearer app-xxx...'  // 这会暴露在浏览器中！
  }
});
```

### ✅ 正确做法

```typescript
// ✅ 调用自己的后端代理
const response = await fetch('/api/chat', {
  method: 'POST',
  body: JSON.stringify({ query: message })
});
// 后端会使用服务器上的 API 密钥调用 Dify
```

---

## Git 提交前检查

### 自动检查命令

```bash
# 1. 检查是否有敏感信息
git diff | grep -i "api_key\|password\|secret\|Bearer app-"

# 2. 检查 .env 文件是否被跟踪
git ls-files | grep ".env"
# 应该没有输出（除了 env.example）

# 3. 检查暂存的文件
git status | grep ".env"
# 不应该包含 .env、.env.server 等

# 4. 搜索代码中的硬编码密钥
rg "app-[a-zA-Z0-9]{20,}" src/
# 不应该有任何匹配
```

### 已提交敏感信息的补救

如果不小心提交了敏感信息：

```bash
# 1. 立即撤销 Git 历史中的密钥（谨慎操作）
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch .env" \
  --prune-empty --tag-name-filter cat -- --all

# 2. 强制推送
git push origin --force --all

# 3. 立即更换 API 密钥
# 前往 Dify 控制台重新生成新的 API 密钥
```

---

## 生产环境加固

### 1. CORS 配置

确保 `server/index.js` 中 CORS 限制到你的域名：

```javascript
app.use(cors({
  origin: 'https://your-domain.com',  // 不要使用 '*'
  credentials: true
}));
```

### 2. HTTPS

- ✅ 使用 HTTPS 加密传输
- ✅ 配置 SSL 证书（宝塔面板自动配置）
- ✅ 强制 HTTPS 重定向

### 3. 环境隔离

```bash
# 开发环境
FRONTEND_URL=http://localhost:5173

# 生产环境
FRONTEND_URL=https://your-domain.com
```

### 4. 日志安全

确保后端日志不输出敏感信息：

```javascript
// ❌ 不要记录完整的 API 密钥
console.log('API Key:', difyApiKey);

// ✅ 只记录状态
console.log('API Key configured:', !!difyApiKey);
```

---

## 验证安全性

### 前端验证

在浏览器开发者工具中：

1. **Network 标签**
   - ✅ 不应该看到对 `api.dify.ai` 的直接请求
   - ✅ 只应该看到对你自己服务器 `/api/chat` 的请求

2. **Sources 标签**
   - ✅ 搜索 `app-`，不应该找到任何 API 密钥
   - ✅ 搜索 `Authorization`，不应该在前端代码中出现

### 后端验证

```bash
# 检查后端进程的环境变量
pm2 env minna-backend | grep DIFY
# 应该显示 DIFY_API_KEY，但这是服务器端的，用户看不到
```

---

## 紧急联系

如果发现安全问题：

1. 立即更换受影响的 API 密钥
2. 检查访问日志是否有异常
3. 更新代码并重新部署
4. 审查相关的 Git 提交历史

---

## 相关文档

- [后端代理实现](./server/index.js)
- [前端客户端](./src/shared/utils/backendClient.ts)
- [环境变量模板](./env.example)
- [部署指南](./BAOTA_DEPLOYMENT.md)

---

**安全是持续的过程，请定期检查和更新！** 🔒
