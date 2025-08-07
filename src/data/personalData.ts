import type { PersonalData } from '../types';

export const personalData: PersonalData = {
  info: {
    name: "Minna",
    title: "Full Stack Developer & Creative Coder",
    bio: "热爱编程、设计和创造的数字艺术家，专注于构建优雅的用户体验和创新的技术解决方案。",
    email: "minna@example.com",
    location: "北京, 中国",
    socialLinks: {
      github: "https://github.com/minna",
      linkedin: "https://linkedin.com/in/minna",
      twitter: "https://twitter.com/minna",
      website: "https://minna.dev"
    }
  },
  skills: [
    { name: "React", level: 90, category: "frontend" },
    { name: "TypeScript", level: 85, category: "frontend" },
    { name: "Node.js", level: 80, category: "backend" },
    { name: "Python", level: 75, category: "backend" },
    { name: "Docker", level: 70, category: "devops" },
    { name: "Figma", level: 65, category: "design" },
    { name: "Three.js", level: 60, category: "frontend" },
    { name: "AWS", level: 55, category: "devops" }
  ],
  articles: [
    {
      id: "1",
      title: "构建现代化React应用的10个最佳实践",
      summary: "探讨React开发中的关键模式和技巧，帮助你构建更高效、可维护的应用。",
      content: "这里是文章的完整内容...",
      publishDate: "2024-01-15",
      tags: ["React", "最佳实践", "前端开发"],
      readTime: 8
    },
    {
      id: "2",
      title: "TypeScript高级类型系统详解",
      summary: "深入理解TypeScript的类型系统，掌握高级类型技巧。",
      content: "这里是文章的完整内容...",
      publishDate: "2024-01-10",
      tags: ["TypeScript", "类型系统"],
      readTime: 12
    }
  ],
  projects: [
    {
      id: "1",
      name: "AI驱动的任务管理应用",
      description: "基于机器学习的智能任务管理系统，能够自动分类和优化工作流程。",
      technologies: ["React", "Node.js", "TensorFlow", "MongoDB"],
      githubUrl: "https://github.com/minna/ai-task-manager",
      liveUrl: "https://ai-task-manager.demo.com",
      featured: true
    },
    {
      id: "2",
      name: "3D交互式数据可视化平台",
      description: "使用Three.js构建的沉浸式数据可视化工具，支持多种数据格式和交互方式。",
      technologies: ["Three.js", "React", "WebGL", "D3.js"],
      githubUrl: "https://github.com/minna/3d-viz",
      featured: true
    },
    {
      id: "3",
      name: "实时协作代码编辑器",
      description: "支持多人实时协作的在线代码编辑器，具有语法高亮和版本控制功能。",
      technologies: ["WebSocket", "React", "Monaco Editor", "Redis"],
      githubUrl: "https://github.com/minna/collab-editor",
      liveUrl: "https://collab-editor.demo.com",
      featured: true
    }
  ]
};
