// 个人信息数据类型定义
export interface PersonalInfo {
  name: string;
  title: string;
  avatar?: string;
  bio: string;
  email: string;
  location: string;
  wechat?: string;
  socialLinks: { name: string;  url: string ,abbreviation?: string;}[];
}

export interface Skill {
  name: string;
  level: number; // 1-100
  category: 'frontend' | 'backend' | 'devops' | 'design' | 'other';
  link?: string; // 可选的链接
}

export interface Interest {
  name: string;
  link?: string; // 可选的链接
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
  link?: string; // 可选的链接
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
  link?: string; // 可选的链接
}

export interface Craft {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  image?: string;
  featured: boolean;
  link?: string; // 可选的链接
}

export interface PersonalData {
  info: PersonalInfo;
  skills: Skill[];
  interests: Interest[];
  articles: Article[];
  projects: Project[];
  crafts: Craft[];
}

// 风格类型定义
export type ThemeStyle = 'terminal';

export interface ThemeConfig {
  name: ThemeStyle;
  displayName: string;
  description: string;
  icon: string;
}
