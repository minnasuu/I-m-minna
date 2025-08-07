import type { ThemeStyle } from '../types';

// 主题背景色配置
export const themeBackgrounds: Record<ThemeStyle, string> = {
  minimal: '#ffffff',
  pixel: '#2d2d2d',
  terminal: '#0a0a0a',
  magazine: '#f8f9fa',
  neon: '#000000'
};

// 主题背景渐变配置
export const themeBackgroundGradients: Record<ThemeStyle, string> = {
  minimal: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
  pixel: 'linear-gradient(135deg, #2d2d2d 0%, #1a1a1a 100%)',
  terminal: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
  magazine: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
  neon: 'linear-gradient(135deg, #000000 0%, #1a0033 50%, #330066 100%)'
};

// 主题文字颜色配置
export const themeTextColors: Record<ThemeStyle, string> = {
  minimal: '#333333',
  pixel: '#00ff00',
  terminal: '#00ff00',
  magazine: '#333333',
  neon: '#00ffff'
};

// 主题过渡动画配置
export const themeTransitions: Record<ThemeStyle, string> = {
  minimal: 'all 0.3s ease',
  pixel: 'all 0.2s ease',
  terminal: 'all 0.1s ease',
  magazine: 'all 0.4s ease',
  neon: 'all 0.2s ease'
};

// 应用主题背景色到body
export const applyThemeBackground = (theme: ThemeStyle) => {
  const body = document.body;
  const root = document.getElementById('root');
  
  if (body) {
    // 使用渐变背景
    body.style.background = themeBackgroundGradients[theme];
    body.style.color = themeTextColors[theme];
    body.style.transition = themeTransitions[theme];
    
    // 移除所有主题类名
    body.classList.remove('theme-minimal', 'theme-pixel', 'theme-terminal', 'theme-magazine', 'theme-neon');
    // 添加当前主题类名
    body.classList.add(`theme-${theme}`);
  }
  
  if (root) {
    root.style.background = themeBackgroundGradients[theme];
    root.style.transition = themeTransitions[theme];
  }
};

// 重置主题背景色
export const resetThemeBackground = () => {
  const body = document.body;
  const root = document.getElementById('root');
  
  if (body) {
    body.style.backgroundColor = '';
    body.style.color = '';
    body.style.transition = '';
    // 移除所有主题类名
    body.classList.remove('theme-minimal', 'theme-pixel', 'theme-terminal', 'theme-magazine', 'theme-neon');
  }
  
  if (root) {
    root.style.backgroundColor = '';
    root.style.transition = '';
  }
};
