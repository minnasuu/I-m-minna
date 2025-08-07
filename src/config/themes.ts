import type { ThemeConfig } from "../types";

export const themes: ThemeConfig[] = [
  {
    name: 'terminal',
    displayName: '科幻终端',
    description: '黑客风格的终端界面',
    icon: '💻'
  }
];

export const getRandomTheme = (): string => {
  const randomIndex = Math.floor(Math.random() * themes.length);
  return themes[randomIndex].name;
};
