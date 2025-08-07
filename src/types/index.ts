// 个人信息数据类型定义
export interface PersonalInfo {
  name: string;
  title: string;
  avatar?: string;
  bio: string;
  email: string;
  location: string;
  socialLinks: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    website?: string;
  };
}

export interface Skill {
  name: string;
  level: number; // 1-100
  category: 'frontend' | 'backend' | 'devops' | 'design' | 'other';
  icon?: string;
}

export interface Article {
  id: string;
  title: string;
  summary: string;
  content: string;
  publishDate: string;
  tags: string[];
  readTime: number; // 分钟
  coverImage?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  image?: string;
  featured: boolean;
}

export interface PersonalData {
  info: PersonalInfo;
  skills: Skill[];
  articles: Article[];
  projects: Project[];
}

// 风格类型定义
export type ThemeStyle = 'pixel' | 'magazine' | 'terminal' | 'minimal' | 'neon';

export interface ThemeConfig {
  name: ThemeStyle;
  displayName: string;
  description: string;
  icon: string;
}
