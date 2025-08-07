import type { ThemeConfig } from "../types";

export const themes: ThemeConfig[] = [
  {
    name: 'terminal',
    displayName: '科幻终端',
    description: '黑客风格的终端界面',
    icon: '💻'
  },
  {
    name: 'pixel',
    displayName: '像素游戏',
    description: '复古像素风格，像经典游戏界面',
    icon: '🎮'
  },
  {
    name: 'magazine',
    displayName: '杂志封面',
    description: '现代杂志布局，优雅的排版设计',
    icon: '📰'
  },
  {
    name: 'minimal',
    displayName: '极简主义',
    description: '简洁干净的设计风格',
    icon: '⚪'
  },

];

export const getRandomTheme = (): string => {
  const randomIndex = Math.floor(Math.random() * themes.length);
  return themes[randomIndex].name;
};
