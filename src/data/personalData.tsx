import type { PersonalData } from '../shared/types';
import type { Language } from '../shared/contexts/LanguageContext';
import {  svg_interactive_wheel } from '../features/articles/data/svg-interactive-wheel/svg_interactive_wheel';
import { dark_mode_and_adaptation } from "../features/articles/data/dark_mode_and_adaptation/dark_mode_and_adaptation";
import { deep_understanding_of_images } from "../features/articles/data/deep_understanding_of_images/deep_understanding_of_images";
import css_implementation_of_morphing_animation from "../features/articles/data/css-implementation-of-morphing-animatio/css_implementation_of_morphing_animatio";
import { build_a_smooth_ai_chat_layout } from "../features/articles/data/build-a-smooth-ai-chat-layout/build_a_smooth_ai_chat_layout";
import { web_shortcut_key } from "../features/articles/data/web-shortcut-key/web_shortcut_key";
import { article_1763369707943 } from "../features/articles/data/article-1763369707943/article_1763369707943";

// Import assets
import avatarImg from '../assets/images/avatar.png';
import cktMiniprogramQr from '../assets/images/ckt-miniprogram-qr.jpg';
import darkModeAdaptationCover from '../assets/articles/covers/dark_mode_and_adaptation.jpg';
import svgInteractiveWheelCover from '../assets/articles/covers/svg-interactive-wheel.mp4';
import deepUnderstandingImagesCover from '../assets/articles/covers/deep_understanding_of_images.jpg';
// import buildAiChatLayoutCover from '../assets/articles/covers/build_a_smooth_ai_chat_layout.jpg'; // File doesn't exist
import coverMock from '../assets/articles/covers/cover-mock.png';
import nuovoCinemaParadisoCover from '../assets/articles/covers/nuovo_cinema_paradiso.jpg';

// 多语言个人数据
export const personalDataMultiLang: Record<Language, PersonalData> = {
  zh: {
    info: {
      name: "苏敏晗",
      avatar: avatarImg,
      title: "UI 开发 @腾讯",
      bio: "我觉得自己是一个热爱生活、用心做体验、追求产品品质的 UI开发工程师。我希望自己成为一个技术与艺术并重的、专业的全栈体验开发工程师。",
      email: "minhansu508@gmail.com",
      location: "深圳, 中国",
      wechat: "minnana1220",
      socialLinks: [
        {
          name: "Github",
          url: "https://github.com/minnasuu",
        },
        {
          name: "CodePen",
          url: "https://codepen.io/minhan-su",
        },
        {
          name: "小红书",
          abbreviation: "Suumhan",
          url: "https://www.xiaohongshu.com/user/profile/5de3f0e60000000001001e98?xsec_token=YB_O8hD8Al3lV4mGSuuDDC4m6bSlsqSBOICoeFzx1KgMU=&xsec_source=app_share&xhsshare=CopyLink&appuid=5de3f0e60000000001001e98&apptime=1754584198&share_id=d50b51a3b3be43288a2cd5ec5bf7c6b3",
        },
      ],
    },
    skills: [
      { name: "React", level: 90, category: "frontend" },
      { name: "TypeScript", level: 85, category: "frontend" },
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
        name: "最近看过（天堂电影院）",
      },
    ],
    articles: [
      {
        id: "article-1763369707943",
        title: "前端项目样式组织方案探索",
        summary: "xxx",
        content: article_1763369707943,
        publishDate: "2025-11-17",
        tags: ["css", "原子类", "Material Design"],
        readTime: 10,
        link: "https://blog.example.com/article-1763369707943",
        type: "tech",
      },
      {
        id: "dark-mode-and-adaptation",
        title: "网页深色模式与适配 ☀️🌙",
        summary: "探讨网页深色模式与适配，帮助你构建更高效、可维护的应用。",
        content: dark_mode_and_adaptation,
        publishDate: "2025-01-02",
        tags: [
          "CSS 自定义变量",
          "CSS-in-JS",
          "TDesign",
          "Ant Design",
          "Apple Developer",
        ],
        readTime: 5,
        link: "https://blog.example.com/dark-mode-and-adaptation",
        type: "tech",
        coverImage: darkModeAdaptationCover,
      },
      {
        id: "svg-interactive-wheel",
        title: "SVG 实现可交互轮盘",
        summary: "使用SVG实现可交互轮盘，支持自定义样式和交互效果。",
        content: svg_interactive_wheel,
        publishDate: "2025-01-16",
        tags: ["SVG mask", "React"],
        readTime: 2,
        link: "https://blog.example.com/svg-interactive-wheel",
        type: "tech",
        coverImage: svgInteractiveWheelCover,
      },
      {
        id: "deep-understanding-of-images",
        title: "深刻认识图片",
        summary: "深刻认识图片，了解图片的格式、大小、质量、加载方式等。",
        content: deep_understanding_of_images,
        publishDate: "2025-01-20",
        tags: ["图片", "格式", "大小", "质量", "加载方式"],
        readTime: 2,
        link: "https://blog.example.com/know-more-about-image",
        type: "tech",
        coverImage: deepUnderstandingImagesCover,
      },
      {
        id: "css-implementation-of-morphing-animation",
        title: "CSS实现变形动画（Morph）的关键",
        summary:
          "CSS实现变形动画（Morph）的关键，了解变形动画的原理和实现方式。",
        content: css_implementation_of_morphing_animation,
        publishDate: "2025-02-22",
        tags: ["clip-path", "SVG Path", "Morphing Animation"],
        readTime: 15,
        link: "https://blog.example.com/threejs-guide",
        type: "tech",
        coverImage: nuovoCinemaParadisoCover,
      },
      {
        id: "build-a-smooth-ai-chat-layout",
        title: "搭建流畅的 AI Chat布局",
        summary: "搭建流畅的 AI Chat布局，了解AI Chat的布局和实现方式。",
        content: build_a_smooth_ai_chat_layout,
        publishDate: "2025-03-28",
        tags: ["AI Chat", "布局", "实现方式"],
        readTime: 18,
        link: "https://blog.example.com/ai-chat-layout",
        type: "tech",
        coverImage: coverMock,
      },
      {
        id: "web-shortcut-key",
        title: "揭秘网页快捷键",
        summary: "揭秘网页快捷键，了解网页快捷键的原理和实现方式。",
        content: web_shortcut_key,
        publishDate: "2025-09-15",
        tags: ["网页快捷键", "Linear", "YouTuBe"],
        readTime: 15,
        link: "https://blog.example.com/web-shortcut-key",
        type: "tech",
      },
    ],
    projects: [
      {
        id: "tencent-advertising-official-website",
        name: "腾讯广告官网",
        description: "腾讯广告官网，用于展示腾讯广告的产品和服务。",
        technologies: ["React", "TypeScript", "SCSS"],
        liveUrl: "https://e.qq.com/ads",
        featured: true,
        link: "https://e.qq.com/ads",
      },
      {
        id: "tencent-advertising-admuse",
        name: "腾讯广告妙思",
        description: "腾讯广告妙思，腾讯广告AI创意工具集合站。",
        technologies: ["React", "TypeScript", "SCSS"],
        liveUrl: "https://admuse.qq.com/",
        featured: true,
        link: "https://admuse.qq.com/",
      },
      {
        id: "tencent-advertising-miaowen",
        name: "腾讯广告妙问",
        description: "腾讯广告妙问，腾讯广告Agent智能问答工具。",
        technologies: ["React", "TypeScript", "SCSS"],
        liveUrl: "https://miaowen.qq.com/miaowen-station/index",
        featured: true,
        link: "https://miaowen.qq.com/miaowen-station/index",
      },
      {
        id: "crochet-knit-time",
        name: "织作时光",
        description: "原创手工编织教程与工具小程序，用户数累计7800+。",
        technologies: ["微信小程序"],
        featured: true,
        imgPopUrl: cktMiniprogramQr,
      },
    ],
    crafts: [
      {
        id: "component-library-test-field",
        name: "组件库试验田",
        description:
          "基于React的组件库试验田，用于测试和展示组件库的实现和效果。",
        technologies: ["React", "TypeScript", "SCSS"],
        githubUrl: "https://github.com/minnasuu/land-design",
        liveUrl: "https://minnasuu.github.io/land-design/",
        featured: true,
        link: "https://minnasuu.github.io/land-design/",
      },
      {
        id: "image-processing-tools-collection",
        name: "图片处理工具集合",
        description: "图片处理工具集合，用于处理和展示图片。",
        technologies: ["React", "TypeScript", "SCSS"],
        githubUrl: "https://github.com/minnasuu/image-tools",
        liveUrl: "https://minnasuu.github.io/image-tools/",
        featured: true,
        link: "https://minnasuu.github.io/image-tools/",
      },
      {
        id: "3d-audio-particle",
        name: "3d粒子音乐播放器",
        description: "通过3d粒子可视化显示音乐，支持自定义上传。",
        technologies: ["React", "TypeScript", "SCSS"],
        githubUrl: "https://github.com/minnasuu/3d-audio-particle",
        liveUrl: "https://minnasuu.github.io/3d-audio-particle/",
        featured: true,
        link: "https://minnasuu.github.io/3d-audio-particle/",
      },
    ],
  },
  en: {
    info: {
      name: "minna",
      avatar: avatarImg,
      title: "UI Developer @Tencent",
      bio: "I think I am a UI developer who is passionate about life, focused on experience, and building products. I hope to become a professional full-stack experience developer who is good at both technology and art.",
      email: "minhansu508@gmail.com",
      location: "Shenzhen, China",
      wechat: "minnana1220",
      socialLinks: [
        {
          name: "Github",
          url: "https://github.com/minnasuu",
        },
        {
          name: "CodePen",
          url: "https://codepen.io/minhan-su",
        },
        {
          name: "Redbook",
          abbreviation: "Suumhan",
          url: "https://www.xiaohongshu.com/user/profile/5de3f0e60000000001001e98?xsec_token=YB_O8hD8Al3lV4mGSuuDDC4m6bSlsqSBOICoeFzx1KgMU=&xsec_source=app_share&xhsshare=CopyLink&appuid=5de3f0e60000000001001e98&apptime=1754584198&share_id=d50b51a3b3be43288a2cd5ec5bf7c6b3",
        },
      ],
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
        name: "Recently watched (Nuovo Cinema Paradiso)",
      },
    ],
    articles: [
      {
        id: "article-1763369707943",
        title: "前端项目样式组织方案探索",
        summary: "xxx",
        content: article_1763369707943,
        publishDate: "2025-11-17",
        tags: ["css", "原子类", "Material Design"],
        readTime: 10,
        link: "https://blog.example.com/article-1763369707943",
        type: "tech",
      },
      {
        id: "dark-mode-and-adaptation",
        title: "Dark Mode and Adaptation",
        summary:
          "Explore key patterns and techniques in React development to help you build more efficient and maintainable applications.",
        content: dark_mode_and_adaptation,
        publishDate: "2025-01-02",
        tags: [
          "CSS Custom Properties",
          "CSS-in-JS",
          "TDesign",
          "Ant Design",
          "Apple Developer",
        ],
        readTime: 5,
        link: "https://blog.example.com/dark-mode-and-adaptation",
        type: "tech",
        coverImage: darkModeAdaptationCover,
      },
      {
        id: "svg-interactive-wheel",
        title: "SVG Interactive Wheel (React Version)",
        summary:
          "Use SVG to implement an interactive wheel, support custom styles and interactive effects.",
        content: svg_interactive_wheel,
        publishDate: "2025-01-16",
        tags: ["SVG mask", "React"],
        readTime: 2,
        link: "https://blog.example.com/svg-interactive-wheel",
        type: "tech",
        coverImage: svgInteractiveWheelCover,
      },
      {
        id: "deep-understanding-of-images",
        title: "Deep Understanding of Images",
        summary:
          "Deep understanding of images, understand the format, size, quality, loading method, etc. of images.",
        content: deep_understanding_of_images,
        publishDate: "2025-01-20",
        tags: ["图片", "格式", "大小", "质量", "加载方式"],
        readTime: 2,
        link: "https://blog.example.com/know-more-about-image",
        type: "tech",
        coverImage: deepUnderstandingImagesCover,
      },
      {
        id: "css-implementation-of-morphing-animation",
        title: "CSS Implementation of Morphing Animation (Morph)",
        summary:
          "CSS implementation of morphing animation (Morph), understand the key points of morphing animation and its implementation method.",
        content: css_implementation_of_morphing_animation,
        publishDate: "2025-02-22",
        tags: ["clip-path", "SVG Path", "Morphing Animation"],
        readTime: 15,
        link: "https://blog.example.com/threejs-guide",
        type: "tech",
        coverImage: coverMock,
      },
      {
        id: "build-a-smooth-ai-chat-layout",
        title: "Build a Smooth AI Chat Layout",
        summary:
          "Build a smooth AI Chat Layout, understand the layout and implementation method of AI Chat.",
        content: build_a_smooth_ai_chat_layout,
        publishDate: "2025-03-28",
        tags: ["AI Chat", "布局", "实现方式"],
        readTime: 18,
        link: "https://blog.example.com/ai-chat-layout",
        type: "tech",
        coverImage: coverMock,
      },
      {
        id: "web-shortcut-key",
        title: "Web Shortcut Key",
        summary: "Web Shortcut Key, understand the shortcut key of web.",
        content: web_shortcut_key,
        publishDate: "2025-09-15",
        tags: ["网页快捷键", "Linear", "YouTuBe"],
        readTime: 15,
        link: "https://blog.example.com/web-shortcut-key",
        type: "tech",
        coverImage: coverMock,
      },
    ],
    projects: [
      {
        id: "tencent-advertising-official-website",
        name: "Tencent Advertising Official Website",
        description:
          "Tencent Advertising Official Website, used to show the products and services of Tencent Advertising.",
        technologies: ["React", "TypeScript", "SCSS"],
        liveUrl: "https://e.qq.com/ads",
        featured: true,
        link: "https://e.qq.com/ads",
      },
      {
        id: "tencent-advertising-admuse",
        name: "Tencent Advertising AdMuse",
        description:
          "Tencent Advertising AdMuse, Tencent Advertising AI Creative Tools Collection Site.",
        technologies: ["React", "TypeScript", "SCSS"],
        liveUrl: "https://admuse.qq.com/",
        featured: true,
        link: "https://admuse.qq.com/",
      },
      {
        id: "tencent-advertising-miaowen",
        name: "Tencent Advertising Miaowen",
        description:
          "Tencent Advertising Miaowen, Tencent Advertising Agent Intelligent Question and Answer Tool.",
        technologies: ["React", "TypeScript", "SCSS"],
        liveUrl: "https://miaowen.qq.com/miaowen-station/index",
        featured: true,
        link: "https://miaowen.qq.com/miaowen-station/index",
      },
      {
        id: "crochet-knit-time",
        name: "Crochet&Knit Time",
        description:
          "Original crochet and knitting tutorial and tool mini-program, with more than 7,800 users.",
        technologies: ["WeChat Mini Program"],
        featured: true,
        imgPopUrl: cktMiniprogramQr,
      },
    ],
    crafts: [
      {
        id: "component-library-test-field",
        name: "Component Library Test Field",
        description:
          "A component library test field based on React, used to test and show the implementation and effect of the component library.",
        technologies: ["React", "TypeScript", "SCSS"],
        githubUrl: "https://github.com/minnasuu/land-design",
        liveUrl: "https://minnasuu.github.io/land-design/",
        featured: true,
        link: "https://minnasuu.github.io/land-design/",
      },
      {
        id: "image-processing-tools-collection",
        name: "Image Processing Tools Collection",
        description:
          "Image processing tools collection, used to process and show images.",
        technologies: ["React", "TypeScript", "SCSS"],
        githubUrl: "https://github.com/minnasuu/image-tools",
        liveUrl: "https://minnasuu.github.io/image-tools/",
        featured: true,
        link: "https://minnasuu.github.io/image-tools/",
      },
      {
        id: "3d-audio-particle",
        name: "3D Audio Particle",
        description:
          "Visualize music through 3D particles, support custom upload.",
        technologies: ["React", "TypeScript", "SCSS"],
        githubUrl: "https://github.com/minnasuu/3d-audio-particle",
        liveUrl: "https://minnasuu.github.io/3d-audio-particle/",
        featured: true,
        link: "https://minnasuu.github.io/3d-audio-particle/",
      },
    ],
  },
};

// 保持向后兼容
export const personalData = personalDataMultiLang.zh;
