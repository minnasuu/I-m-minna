import type { ThemeConfig } from "../types";

export const themes: ThemeConfig[] = [
  {
    name: 'terminal',
    displayName: '科幻终端',
    description: '黑客风格的终端界面',
    icon: '💻'
  },
  {
    name: 'ai',
    displayName: 'AI对话',
    description: 'AI人格化对话界面',
    icon: '🤖'
  }
];

export const getRandomTheme = (currentTheme?: string): string => {
  // 如果只有一个主题，直接返回它
  if (themes.length <= 1) {
    return themes[0]?.name || '';
  }
  
  // 过滤掉当前主题，从剩余主题中随机选择
  const availableThemes = themes.filter(theme => theme.name !== currentTheme);
  
  // 如果没有可用主题（理论上不会发生），返回第一个主题
  if (availableThemes.length === 0) {
    return themes[0].name;
  }
  
  const randomIndex = Math.floor(Math.random() * availableThemes.length);
  return availableThemes[randomIndex].name;
};
