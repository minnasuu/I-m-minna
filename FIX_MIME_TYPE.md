# 🔧 修复 MIME 类型错误

## ❌ 错误信息

```
Failed to load module script: Expected a JavaScript-or-Wasm module script 
but the server responded with a MIME type of "application/octet-stream". 
Strict MIME type checking is enforced for module scripts per HTML spec.
```

---

## 🔍 问题原因

Nginx 没有正确配置 JavaScript 模块文件的 MIME 类型。浏览器期望 `.js` 文件返回 `application/javascript` 或 `text/javascript`，但服务器返回了 `application/octet-stream`。

---

## ✅ 解决方案（宝塔面板）

### 方法 1：添加 MIME 类型配置（推荐）

在网站设置 → 配置文件中，在 `server { }` 块的**开头**添加：

```nginx
server {
    # 在这里添加 MIME 类型配置
    # ⚠️ 宝塔面板使用完整路径
    include /www/server/nginx/conf/mime.types;
    default_type application/octet-stream;
    
    # 或者直接定义 types（如果上面的路径不对）
    types {
        application/javascript js mjs;
        text/javascript js;
        application/json json;
        text/css css;
        text/html html htm;
        image/svg+xml svg svgz;
        application/woff woff;
        application/woff2 woff2;
        font/ttf ttf;
        font/otf otf;
        image/x-icon ico;
        image/png png;
        image/jpeg jpg jpeg;
        image/gif gif;
        image/webp webp;
    }
    
    # ... 其他配置 ...
    listen 80;
    server_name your-domain.com;
    root /www/wwwroot/minna/dist;
```

### 方法 2：检查 mime.types 文件引用

确保 Nginx 配置引用了正确的 `mime.types` 文件：

```nginx
http {
    include /www/server/nginx/conf/mime.types;
    default_type application/octet-stream;
    
    # ... 其他配置 ...
}
```

### 方法 3：使用 Charset 模块（宝塔特有）

在宝塔面板：
1. 网站设置 → **配置文件**
2. 找到或添加 `charset` 配置：

```nginx
server {
    listen 80;
    server_name your-domain.com;
    
    charset utf-8;
    
    # 确保包含 MIME 类型（宝塔面板使用完整路径）
    include /www/server/nginx/conf/mime.types;
    default_type text/html;
    
    # ... 其他配置 ...
}
```

---

## 🚀 快速修复（复制粘贴）

### 完整的 Nginx 配置示例

```nginx
server {
    listen 80;
    server_name your-domain.com;
    
    # MIME 类型配置（重要！）
    # 宝塔面板使用完整路径
    include /www/server/nginx/conf/mime.types;
    default_type application/octet-stream;
    
    # 字符集
    charset utf-8;
    
    # 根目录
    root /www/wwwroot/minna/dist;
    index index.html;
    
    # Gzip 压缩
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types text/plain text/css text/xml text/javascript 
               application/json application/javascript application/xml+rss 
               application/x-javascript;
    
    # SPA 路由处理
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # 静态资源缓存
    location ~* \.(js|mjs|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot|otf|webp)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        access_log off;
    }
    
    # API 反向代理
    location /api/ {
        proxy_pass http://127.0.0.1:3001;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_cache_bypass $http_upgrade;
    }
    
    # 安全头
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    
    # 错误页面（保留宝塔标记）
    #ERROR-PAGE-START
    #error_page 404 /404.html;
    #error_page 502 /502.html;
    #ERROR-PAGE-END
}
```

---

## 🔧 验证修复

### 1. 检查配置是否正确

```bash
# SSH 连接到服务器
nginx -t
```

应该显示：
```
nginx: configuration file /www/server/nginx/conf/nginx.conf test is successful
```

### 2. 重载 Nginx

在宝塔面板或命令行：
```bash
nginx -s reload
# 或在宝塔面板点击"重载配置"
```

### 3. 浏览器验证

1. **清除浏览器缓存**（Ctrl+Shift+Delete 或 Cmd+Shift+Delete）
2. **硬刷新页面**（Ctrl+Shift+R 或 Cmd+Shift+R）
3. 打开**开发者工具** → **Network** 标签
4. 刷新页面，检查 `.js` 文件的响应头：

应该显示：
```
Content-Type: application/javascript; charset=utf-8
```

而不是：
```
Content-Type: application/octet-stream
```

---

## 🐛 如果还是不行

### 检查 1：确认 mime.types 文件存在

```bash
ls -l /www/server/nginx/conf/mime.types
```

### 检查 2：查看实际响应头

```bash
curl -I https://your-domain.com/assets/index-xxxxx.js
```

查看输出中的 `Content-Type` 行。

### 检查 3：确认文件扩展名

检查 `dist/assets/` 目录中的文件：
```bash
ls -la /www/wwwroot/minna/dist/assets/
```

确保文件扩展名是 `.js` 而不是其他。

### 检查 4：查看 Nginx 错误日志

```bash
tail -f /www/wwwlogs/your-domain.com.error.log
```

---

## 💡 预防措施

在部署时，确保：

1. ✅ Nginx 配置包含 `include mime.types;`
2. ✅ 为 JavaScript 模块明确指定 MIME 类型
3. ✅ 启用 Gzip 压缩以提高性能
4. ✅ 设置正确的字符集 `charset utf-8;`
5. ✅ 配置后重载 Nginx

---

## 📚 相关文档

- [BAOTA_DEPLOYMENT.md](./BAOTA_DEPLOYMENT.md) - 完整部署指南
- [nginx.conf](./nginx.conf) - Docker 部署的 Nginx 配置示例

---

**修复后记得清除浏览器缓存并硬刷新！** 🎯
