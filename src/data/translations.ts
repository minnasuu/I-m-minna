import type { Language } from '../contexts/LanguageContext';

export interface Translations {
  // 个人信息
  info: {
    title: string;
    bio: string;
    location: string;
  };
  
  // 技能部分
  skills: {
    title: string;
    categories: {
      frontend: string;
      backend: string;
      devops: string;
      design: string;
      other: string;
    };
  };
  
  // 兴趣部分
  interests: {
    title: string;
    categories: {
      technology: string;
      art: string;
      music: string;
      sports: string;
      travel: string;
      reading: string;
      gaming: string;
      other: string;
    };
    levels: {
      beginner: string;
      intermediate: string;
      advanced: string;
      expert: string;
    };
  };
  
  // 文章部分
  articles: {
    title: string;
    subtitle: string;
    readMore: string;
    readTime: string;
    publishedOn: string;
    externalLink: string;
    summary: string;
    content: string;
    readOriginal: string;
    backToArticles: string;
    viewAll: string;
  };
  
  // 项目部分
  projects: {
    title: string;
    subtitle: string;
    viewProject: string;
    viewCode: string;
    viewLive: string;
    viewDetails: string;
    viewAll: string;
    technologies: string;
    featured: string;
    projectDetails: string;
    detailsPlaceholder: string;
    backToProjects: string;
  };
  
  // 通用
  common: {
    loading: string;
    error: string;
    noData: string;
    systemInfo: string;
    socialLinks: string;
    name: string;
    role: string;
    location: string;
    wechat: string;
  };
}

export const translations: Record<Language, Translations> = {
  zh: {
    info: {
      title: "成为一名UX工程师",
      bio: "热爱编程、设计和创造的数字艺术家，专注于构建优雅的用户体验和创新的技术解决方案。",
      location: "深圳, 中国"
    },
    skills: {
      title: "技能",
      categories: {
        frontend: "前端开发",
        backend: "后端开发", 
        devops: "运维部署",
        design: "设计工具",
        other: "其他技能"
      }
    },
    interests: {
      title: "兴趣爱好",
      categories: {
        technology: "技术",
        art: "艺术",
        music: "音乐",
        sports: "运动",
        travel: "旅行",
        reading: "阅读",
        gaming: "游戏",
        other: "其他"
      },
      levels: {
        beginner: "初学者",
        intermediate: "中级",
        advanced: "高级",
        expert: "专家"
      }
    },
    articles: {
      title: "随笔",
      subtitle: "分享我的技术思考和经验",
      readMore: "阅读更多",
      readTime: "阅读时间",
      publishedOn: "发布于",
      externalLink: "外部链接",
      summary: "摘要",
      content: "内容",
      readOriginal: "阅读原文",
      backToArticles: "返回文章列表",
      viewAll: "查看全部"
    },
    projects: {
      title: "项目展示",
      subtitle: "我参与开发的一些项目",
      viewProject: "查看项目",
      viewCode: "查看代码",
      viewLive: "在线预览",
      viewDetails: "查看详情",
      viewAll: "查看全部",
      technologies: "技术栈",
      featured: "精选",
      projectDetails: "项目详情",
      detailsPlaceholder: "这里是项目的详细描述，包括开发过程、技术难点、解决方案等信息。",
      backToProjects: "返回项目列表"
    },
    common: {
      loading: "加载中...",
      error: "出错了",
      noData: "暂无数据",
      systemInfo: "个人信息",
      socialLinks: "社交链接",
      name: "姓名",
      role: "角色",
      location: "位置",
      wechat: "微信"
    }
  },
  en: {
    info: {
      title: "Becoming a UX Engineer",
      bio: "A digital artist passionate about programming, design, and creation, focused on building elegant user experiences and innovative technical solutions.",
      location: "Shenzhen, China"
    },
    skills: {
      title: "Skills",
      categories: {
        frontend: "Frontend",
        backend: "Backend",
        devops: "DevOps", 
        design: "Design",
        other: "Other"
      }
    },
    interests: {
      title: "Interests & Hobbies",
      categories: {
        technology: "Technology",
        art: "Art",
        music: "Music",
        sports: "Sports",
        travel: "Travel",
        reading: "Reading",
        gaming: "Gaming",
        other: "Other"
      },
      levels: {
        beginner: "Beginner",
        intermediate: "Intermediate",
        advanced: "Advanced",
        expert: "Expert"
      }
    },
    articles: {
      title: "Articles",
      subtitle: "Sharing my technical thoughts and experiences",
      readMore: "Read More",
      readTime: "Read Time",
      publishedOn: "Published on",
      externalLink: "External Link",
      summary: "Summary",
      content: "Content",
      readOriginal: "Read Original",
      backToArticles: "Back to Articles",
      viewAll: "View All"
    },
    projects: {
      title: "Projects",
      subtitle: "Some projects I've worked on",
      viewProject: "View Project",
      viewCode: "View Code",
      viewLive: "Live Demo",
      viewDetails: "View Details",
      viewAll: "View All",
      technologies: "Technologies",
      featured: "Featured",
      projectDetails: "Project Details",
      detailsPlaceholder: "Here are the detailed descriptions of the project, including development process, technical challenges, solutions, etc.",
      backToProjects: "Back to Projects"
    },
    common: {
      loading: "Loading...",
      error: "Error",
      noData: "No Data",
      systemInfo: "Personal Info",
      socialLinks: "Social Links",
      name: "Name",
      role: "Role",
      location: "Location",
      wechat: "WeChat"
    }
  }
};

export const getTranslation = (language: Language, key: string): string => {
  const keys = key.split('.');
  let value: any = translations[language];
  
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      return key; // 如果找不到翻译，返回原key
    }
  }
  
  return typeof value === 'string' ? value : key;
};
