import type { PersonalData } from '../types';
import type { Language } from '../contexts/LanguageContext';

// 多语言个人数据
export const personalDataMultiLang: Record<Language, PersonalData> = {
  zh: {
    info: {
      name: "苏敏晗",
      avatar: './avatar.png',
      title: "UI 开发 @腾讯",
      bio: "我觉得自己是一个热爱生活、用心做体验、追求产品品质的 UI开发工程师。我希望自己成为一个技术与艺术并重的、专业的全栈体验开发工程师。",
      email: "minhansu508@gmail.com",
      location: "深圳, 中国",
      wechat: "minnana1220",
      socialLinks: [
        {
          name:"Github",
          url: "https://github.com/minnasuu",
        },
        {
          name: "小红书",
          abbreviation: "Suumhan",
          url: "https://www.xiaohongshu.com/user/profile/5de3f0e60000000001001e98?xsec_token=YB_O8hD8Al3lV4mGSuuDDC4m6bSlsqSBOICoeFzx1KgMU=&xsec_source=app_share&xhsshare=CopyLink&appuid=5de3f0e60000000001001e98&apptime=1754584198&share_id=d50b51a3b3be43288a2cd5ec5bf7c6b3",
        }
      ]
    },
    skills: [
      { name: "React", level: 90, category: "frontend",  },
      { name: "TypeScript", level: 85, category: "frontend",  },
      { name: "Node.js", level: 80, category: "backend" },
      { name: "SCSS", level: 70, category: "frontend" },
      { name: "微信小程序", level: 70, category: "frontend" },
      { name: "TailwindCSS", level: 50, category: "frontend" },
      { name: "Figma", level: 65, category: "design" },
      { name: "Three.js", level: 50, category: "frontend" },
      { name: "Python", level: 30, category: "backend" },
    ],
    interests: [
      {
        name: "动画",
      },
      {
        name: "AI",
      },
      {
        name: "手工编织",
      },
      {
        name: "摄影",
      },
      {
        name: "猫咪",
      },
      {
        name: "最近在听（孙燕姿-风衣）",
      },
      {
        name: "最近看过（绿皮书）",
      }
    ],
    articles: [
      {
        id: "1",
        title: "网页深色模式与适配",
        summary: "探讨网页深色模式与适配，帮助你构建更高效、可维护的应用。",
        content: "这里是文章的完整内容...",
        publishDate: "2025-01-02",
        tags: [ "前端开发"],
        readTime: 5,
        link: "https://blog.example.com/dark-mode-and-adaptation"
      },
      {
        id: "2",
        title: "SVG 实现可交互轮盘（React版本）",
        summary: "使用SVG实现可交互轮盘，支持自定义样式和交互效果。",
        content: "这里是文章的完整内容...",
        publishDate: "2025-01-16",
        tags: ["React", "SVG", "轮盘"],
        readTime: 2,
        link: "https://blog.example.com/svg-interactive-wheel"
      },
      {
        id: "3",
        title: "深刻认识图片",
        summary: "深刻认识图片，了解图片的格式、大小、质量、加载方式等。",
        content: "这里是文章的完整内容...",
        publishDate: "2025-01-20",
          tags: ["图片", "格式", "大小", "质量", "加载方式"],
        readTime: 2,
        link: "https://blog.example.com/know-more-about-image"
      },
      {
        id: "4",
        title: "CSS实现变形动画（Morph）的关键",
        summary: "CSS实现变形动画（Morph）的关键，了解变形动画的原理和实现方式。",
        content: "这里是文章的完整内容...",
        publishDate: "2025-02-22",
        tags: ["CSS", "变形动画", "Morph"],
        readTime: 15,
        link: "https://blog.example.com/threejs-guide"
      },
      {
        id: "5",
        title: "搭建流畅的 AI Chat布局",
        summary: "搭建流畅的 AI Chat布局，了解AI Chat的布局和实现方式。",
        content: "这里是文章的完整内容...",
        publishDate: "2024-03-28",
        tags: ["AI Chat", "布局", "实现方式"],
        readTime: 18,
        link: "https://blog.example.com/ai-chat-layout"
      }
    ],
    projects: [
      {
        id: "1",
        name: "腾讯广告官网",
        description: "腾讯广告官网，用于展示腾讯广告的产品和服务。",
        technologies: ["React", "TypeScript", "SCSS"],
        liveUrl: "https://e.qq.com/ads",
        featured: true,
        link: "https://e.qq.com/ads"
      },
      {
        id: "2",
        name: "腾讯广告妙思",
        description: "腾讯广告妙思，腾讯广告AI创意工具集合站。",
        technologies: ["React", "TypeScript", "SCSS"],
        liveUrl: "https://admuse.qq.com/",
        featured: true,
        link: "https://admuse.qq.com/"
      }
    ],
    crafts: [
      {
        id: "1",
        name: "组件库试验田",
        description: "基于React的组件库试验田，用于测试和展示组件库的实现和效果。",
        technologies: ["React", "TypeScript", "SCSS"],
        githubUrl: "https://github.com/minnasuu/land-design",
        liveUrl: "https://minnasuu.github.io/land-design/",
        featured: true,
        link: "https://minnasuu.github.io/land-design/"
      }
    ]
  },
  en: {
    info: {
      name: "minna",
      avatar: './avatar.png',
      title: "UI Developer @Tencent",
      bio: "I think I am a UI developer who is passionate about life, focused on experience, and building products. I hope to become a professional full-stack experience developer who is good at both technology and art.",
      email: "minhansu508@gmail.com",
      location: "Shenzhen, China",
      wechat: "minnana1220",
      socialLinks: [
        {
          name:"Github",
          url: "https://github.com/minnasuu",
        },
        {
          name: "Redbook",
          abbreviation: "Suumhan",
          url: "https://www.xiaohongshu.com/user/profile/5de3f0e60000000001001e98?xsec_token=YB_O8hD8Al3lV4mGSuuDDC4m6bSlsqSBOICoeFzx1KgMU=&xsec_source=app_share&xhsshare=CopyLink&appuid=5de3f0e60000000001001e98&apptime=1754584198&share_id=d50b51a3b3be43288a2cd5ec5bf7c6b3",
        }
      ]
    },
    skills: [
        { name: "React", level: 90, category: "frontend" },
      { name: "TypeScript", level: 85, category: "frontend" },
      { name: "Node.js", level: 80, category: "backend" },
      { name: "SCSS", level: 70, category: "frontend" },
      { name: "WeChat Mini Program", level: 70, category: "frontend" },
      { name: "TailwindCSS", level: 50, category: "frontend" },
      { name: "Python", level: 30, category: "backend" },
      { name: "Figma", level: 65, category: "design" },
      { name: "Three.js", level: 50, category: "frontend" },
    ],
    interests: [
      {
        name: "Animation",
      },
      {
        name: "AI",
      },
      {
        name: "Handmade Knitting",
      },
      {
        name: "Photography",
      },
      {
        name: "Cats",
      },
      {
        name: "Recently listening (Singer: Sun Yanzi - Windbreaker)",
      },
      {
        name: "Recently watched (Green Book)",
      }
    ],
    articles: [
      {
        id: "1",
        title: "Dark Mode and Adaptation",
        summary: "Explore key patterns and techniques in React development to help you build more efficient and maintainable applications.",
        content: "Here is the complete article content...",
        publishDate: "2025-01-02",
        tags: ["React", "Dark Mode", "Adaptation"],
        readTime: 5,
        link: "https://blog.example.com/dark-mode-and-adaptation"
      }
    ],
    projects: [
      {
        id: "1",
        name: "Tencent Advertising Official Website",
        description: "Tencent Advertising Official Website, used to show the products and services of Tencent Advertising.",
        technologies: ["React", "TypeScript", "SCSS"],
        liveUrl: "https://e.qq.com/ads",
        featured: true,
        link: "https://e.qq.com/ads"
      },
      {
        id: "2",
        name: "Tencent Advertising AdMuse",
        description: "Tencent Advertising AdMuse, Tencent Advertising AI Creative Tools Collection Site.",
        technologies: ["React", "TypeScript", "SCSS"],
        liveUrl: "https://admuse.qq.com/",
        featured: true,
        link: "https://admuse.qq.com/"
      }
    ],
    crafts: [
      {
        id: "1",
        name: "Component Library Test Field",
        description: "A component library test field based on React, used to test and show the implementation and effect of the component library.",
        technologies: ["React", "TypeScript", "SCSS"],
        githubUrl: "https://github.com/minnasuu/land-design",
        liveUrl: "https://minnasuu.github.io/land-design/",
        featured: true,
        link: "https://minnasuu.github.io/land-design/"
      }
    ]
  }
};

// 保持向后兼容
export const personalData = personalDataMultiLang.zh;
