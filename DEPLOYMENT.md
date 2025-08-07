# GitHub Pages 部署指南

## 自动部署

这个项目已经配置了 GitHub Actions 来自动部署到 GitHub Pages。

### 部署步骤

1. **推送代码到 main 分支**
   ```bash
   git add .
   git commit -m "Update for deployment"
   git push origin main
   ```

2. **GitHub Actions 会自动运行**
   - 构建项目
   - 部署到 GitHub Pages

3. **访问你的网站**
   - 网站地址：`https://[你的用户名].github.io/I-m-minna/`
   - 部署可能需要几分钟时间

## 手动部署

如果你想手动部署，可以运行：

```bash
# 构建项目
npm run build

# 或者使用部署脚本
./deploy.sh
```

## 配置说明

### Vite 配置
- 生产环境使用 `/I-m-minna/` 作为基础路径
- 开发环境使用 `/` 作为基础路径

### GitHub Actions
- 工作流文件：`.github/workflows/deploy.yml`
- 触发条件：推送到 main 分支或创建 PR
- 部署目录：`./dist`

## 故障排除

### 如果部署失败
1. 检查 GitHub Actions 日志
2. 确保所有依赖都已安装
3. 确保构建没有错误

### 如果网站无法访问
1. 检查 GitHub Pages 设置
2. 确保仓库是公开的
3. 等待几分钟让部署完成

## 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建项目
npm run build

# 预览构建结果
npm run preview
``` 