import type { PersonalData } from '../types';
import type { Language } from '../contexts/LanguageContext';

// 多语言个人数据
export const personalDataMultiLang: Record<Language, PersonalData> = {
  zh: {
    info: {
      name: "苏敏晗",
      avatar: './avatar.png',
      title: "成为一名UX工程师",
      bio: "热爱编程、设计和创造的数字艺术家，专注于构建优雅的用户体验和创新的技术解决方案。",
      email: "minhansu508@gmail.com",
      location: "深圳, 中国",
      wechat: "minnana1220",
      socialLinks: {
        github: "https://github.com/minnasuu",
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
    interests: [
      {
        name: "3D建模与动画",
      },
      {
        name: "电子音乐制作",
      },
      {
        name: "摄影与后期",
      },
      {
        name: "游戏开发",
      },
      {
        name: "科幻小说阅读",
      },
      {
        name: "徒步旅行",
      },
      {
        name: "开源贡献",
      },
      {
        name: "设计思维",
      }
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
      },
      {
        id: "3",
        title: "Docker容器化部署最佳实践",
        summary: "从零开始学习Docker，掌握容器化部署的核心概念和实践技巧。",
        content: "这里是文章的完整内容...",
        publishDate: "2024-01-08",
        tags: ["Docker", "DevOps", "部署"],
        readTime: 10
      },
      {
        id: "4",
        title: "Three.js 3D图形编程入门指南",
        summary: "探索WebGL和Three.js，创建令人惊叹的3D网页体验。",
        content: "这里是文章的完整内容...",
        publishDate: "2024-01-05",
        tags: ["Three.js", "WebGL", "3D图形"],
        readTime: 15
      },
      {
        id: "5",
        title: "Node.js微服务架构设计",
        summary: "构建可扩展的微服务架构，提升系统性能和可维护性。",
        content: "这里是文章的完整内容...",
        publishDate: "2024-01-03",
        tags: ["Node.js", "微服务", "架构设计"],
        readTime: 18
      },
      {
        id: "6",
        title: "AWS云服务实战指南",
        summary: "深入AWS云平台，掌握云计算的核心服务和最佳实践。",
        content: "这里是文章的完整内容...",
        publishDate: "2024-01-01",
        tags: ["AWS", "云计算", "DevOps"],
        readTime: 20
      },
      {
        id: "7",
        title: "Figma设计系统构建",
        summary: "从零开始构建完整的设计系统，提升团队协作效率。",
        content: "这里是文章的完整内容...",
        publishDate: "2023-12-28",
        tags: ["Figma", "设计系统", "UI/UX"],
        readTime: 14
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
      },
      {
        id: "4",
        name: "智能聊天机器人平台",
        description: "基于NLP技术的智能客服系统，支持多语言对话和情感分析。",
        technologies: ["Python", "TensorFlow", "FastAPI", "PostgreSQL"],
        githubUrl: "https://github.com/minna/chatbot-platform",
        liveUrl: "https://chatbot.demo.com",
        featured: true
      },
      {
        id: "5",
        name: "区块链投票系统",
        description: "去中心化的电子投票平台，确保投票过程的透明性和安全性。",
        technologies: ["Solidity", "React", "Web3.js", "IPFS"],
        githubUrl: "https://github.com/minna/blockchain-voting",
        featured: true
      },
      {
        id: "6",
        name: "移动端AR导航应用",
        description: "基于AR技术的室内外导航应用，提供沉浸式的导航体验。",
        technologies: ["React Native", "ARKit", "ARCore", "Three.js"],
        githubUrl: "https://github.com/minna/ar-navigation",
        liveUrl: "https://ar-nav.demo.com",
        featured: true
      },
      {
        id: "7",
        name: "云端音乐制作工具",
        description: "基于Web Audio API的在线音乐制作平台，支持实时协作。",
        technologies: ["Web Audio API", "React", "WebRTC", "Node.js"],
        githubUrl: "https://github.com/minna/cloud-music",
        liveUrl: "https://cloud-music.demo.com",
        featured: true
      }
    ]
  },
  en: {
    info: {
      name: "minna",
      avatar: './avatar.png',
      title: "Becoming a UX Engineer",
      bio: "A digital artist passionate about programming, design, and creation, focused on building elegant user experiences and innovative technical solutions.",
      email: "minhansu508@gmail.com",
      location: "Shenzhen, China",
      wechat: "minnana1220",
      socialLinks: {
        github: "https://github.com/minnasu",
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
    interests: [
      {
        name: "3D Modeling and Animation",
      },
      {
        name: "Electronic Music Production",
      },
      {
        name: "Photography and Post-Production",
      },
      {
        name: "Game Development",
      },
      {
        name: "Science Fiction Reading",
      },
      {
        name: "Hiking",
      },
      {
        name: "Open Source Contribution",
      },
      {
        name: "Design Thinking",
      }
    ],
    articles: [
      {
        id: "1",
        title: "10 Best Practices for Building Modern React Applications",
        summary: "Explore key patterns and techniques in React development to help you build more efficient and maintainable applications.",
        content: "Here is the complete article content...",
        publishDate: "2024-01-15",
        tags: ["React", "Best Practices", "Frontend Development"],
        readTime: 8
      },
      {
        id: "2",
        title: "Advanced TypeScript Type System Deep Dive",
        summary: "Deep understanding of TypeScript's type system and mastering advanced type techniques.",
        content: "Here is the complete article content...",
        publishDate: "2024-01-10",
        tags: ["TypeScript", "Type System"],
        readTime: 12
      },
      {
        id: "3",
        title: "Docker Containerization Deployment Best Practices",
        summary: "Learn Docker from scratch and master the core concepts and practical skills of containerized deployment.",
        content: "Here is the complete article content...",
        publishDate: "2024-01-08",
        tags: ["Docker", "DevOps", "Deployment"],
        readTime: 10
      },
      {
        id: "4",
        title: "Three.js 3D Graphics Programming Beginner's Guide",
        summary: "Explore WebGL and Three.js to create stunning 3D web experiences.",
        content: "Here is the complete article content...",
        publishDate: "2024-01-05",
        tags: ["Three.js", "WebGL", "3D Graphics"],
        readTime: 15
      },
      {
        id: "5",
        title: "Node.js Microservices Architecture Design",
        summary: "Build scalable microservices architecture to improve system performance and maintainability.",
        content: "Here is the complete article content...",
        publishDate: "2024-01-03",
        tags: ["Node.js", "Microservices", "Architecture Design"],
        readTime: 18
      },
      {
        id: "6",
        title: "AWS Cloud Services Practical Guide",
        summary: "Deep dive into AWS cloud platform and master core cloud computing services and best practices.",
        content: "Here is the complete article content...",
        publishDate: "2024-01-01",
        tags: ["AWS", "Cloud Computing", "DevOps"],
        readTime: 20
      },
      {
        id: "7",
        title: "Figma Design System Construction",
        summary: "Build a complete design system from scratch to improve team collaboration efficiency.",
        content: "Here is the complete article content...",
        publishDate: "2023-12-28",
        tags: ["Figma", "Design System", "UI/UX"],
        readTime: 14
      }
    ],
    projects: [
      {
        id: "1",
        name: "AI-Driven Task Management Application",
        description: "An intelligent task management system based on machine learning that can automatically classify and optimize workflows.",
        technologies: ["React", "Node.js", "TensorFlow", "MongoDB"],
        githubUrl: "https://github.com/minna/ai-task-manager",
        liveUrl: "https://ai-task-manager.demo.com",
        featured: true
      },
      {
        id: "2",
        name: "3D Interactive Data Visualization Platform",
        description: "An immersive data visualization tool built with Three.js that supports multiple data formats and interaction methods.",
        technologies: ["Three.js", "React", "WebGL", "D3.js"],
        githubUrl: "https://github.com/minna/3d-viz",
        featured: true
      },
      {
        id: "3",
        name: "Real-time Collaborative Code Editor",
        description: "An online code editor that supports multi-user real-time collaboration with syntax highlighting and version control features.",
        technologies: ["WebSocket", "React", "Monaco Editor", "Redis"],
        githubUrl: "https://github.com/minna/collab-editor",
        liveUrl: "https://collab-editor.demo.com",
        featured: true
      },
      {
        id: "4",
        name: "Intelligent Chatbot Platform",
        description: "An intelligent customer service system based on NLP technology that supports multilingual conversations and sentiment analysis.",
        technologies: ["Python", "TensorFlow", "FastAPI", "PostgreSQL"],
        githubUrl: "https://github.com/minna/chatbot-platform",
        liveUrl: "https://chatbot.demo.com",
        featured: true
      },
      {
        id: "5",
        name: "Blockchain Voting System",
        description: "A decentralized electronic voting platform that ensures transparency and security in the voting process.",
        technologies: ["Solidity", "React", "Web3.js", "IPFS"],
        githubUrl: "https://github.com/minna/blockchain-voting",
        featured: true
      },
      {
        id: "6",
        name: "Mobile AR Navigation Application",
        description: "An indoor and outdoor navigation application based on AR technology that provides an immersive navigation experience.",
        technologies: ["React Native", "ARKit", "ARCore", "Three.js"],
        githubUrl: "https://github.com/minna/ar-navigation",
        liveUrl: "https://ar-nav.demo.com",
        featured: true
      },
      {
        id: "7",
        name: "Cloud Music Production Tool",
        description: "An online music production platform based on Web Audio API that supports real-time collaboration.",
        technologies: ["Web Audio API", "React", "WebRTC", "Node.js"],
        githubUrl: "https://github.com/minna/cloud-music",
        liveUrl: "https://cloud-music.demo.com",
        featured: true
      }
    ]
  }
};

// 保持向后兼容
export const personalData = personalDataMultiLang.zh;
