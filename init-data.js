// 临时数据初始化脚本
// 使用方法：在服务器上运行 docker cp init-data.js minna-backend:/app/
// 然后 docker exec -it minna-backend node init-data.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const articles = [
  {
    title: "欢迎来到我的博客",
    summary: "这是我的第一篇文章，欢迎大家访问！",
    content: `# 欢迎来到我的博客

这是一篇测试文章，用于验证博客系统是否正常工作。

## 功能特性

- ✅ Markdown 支持
- ✅ 代码高亮
- ✅ 响应式设计
- ✅ AI 聊天功能

感谢您的访问！`,
    publishDate: new Date("2024-12-01"),
    tags: ["欢迎", "测试"],
    readTime: 2,
    type: "life"
  },
  {
    title: "React 19 新特性解析",
    summary: "深入探讨 React 19 带来的重大更新和改进",
    content: `# React 19 新特性解析

React 19 带来了许多激动人心的新特性。

## Server Components

Server Components 允许我们在服务器端渲染组件，提升性能。

## Actions

新的 Actions API 简化了表单处理和数据提交。

\`\`\`typescript
function MyForm() {
  async function handleSubmit(formData: FormData) {
    'use server'
    // Server-side logic
  }
  
  return <form action={handleSubmit}>...</form>
}
\`\`\`

## 总结

React 19 是一个重大更新，值得升级！`,
    publishDate: new Date("2024-12-05"),
    tags: ["React", "前端", "技术"],
    readTime: 5,
    type: "tech"
  },
  {
    title: "Docker 容器化部署最佳实践",
    summary: "从零开始学习 Docker 容器化部署的完整指南",
    content: `# Docker 容器化部署最佳实践

## 什么是 Docker？

Docker 是一个开源的容器化平台，让应用部署变得更加简单。

## 基础命令

\`\`\`bash
docker build -t my-app .
docker run -d -p 8080:80 my-app
docker logs my-app
\`\`\`

Happy Coding! 🚀`,
    publishDate: new Date("2024-12-10"),
    tags: ["Docker", "DevOps", "部署"],
    readTime: 8,
    type: "tech"
  }
];

async function main() {
  console.log('🚀 开始初始化数据...');
  
  for (const article of articles) {
    const created = await prisma.article.create({ data: article });
    console.log(`✅ 创建文章: ${created.title}`);
  }
  
  const count = await prisma.article.count();
  console.log(`\n✅ 完成！数据库中现在有 ${count} 篇文章`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
