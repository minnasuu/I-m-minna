import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { ThemeStyle } from '../types';
import { getRandomTheme } from '../../config/themes';
import { applyThemeBackground, resetThemeBackground } from '../../config/themeColors';

interface ThemeContextType {
  currentTheme: ThemeStyle;
  setTheme: (theme: ThemeStyle) => void;
  randomizeTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<ThemeStyle>('terminal');

  // 初始化时随机选择主题
  useEffect(() => {
    const savedTheme = localStorage.getItem('selectedTheme') as ThemeStyle;
    if (savedTheme) {
      setCurrentTheme(savedTheme);
      applyThemeBackground(savedTheme);
    } else {
      const randomTheme = getRandomTheme() as ThemeStyle;
      setCurrentTheme(randomTheme);
      applyThemeBackground(randomTheme);
    }
  }, []);

  const setTheme = (theme: ThemeStyle) => {
    setCurrentTheme(theme);
    localStorage.setItem('selectedTheme', theme);
    applyThemeBackground(theme);
  };

  const randomizeTheme = () => {
    const randomTheme = getRandomTheme() as ThemeStyle;
    setTheme(randomTheme);
  };

  // 组件卸载时清理
  useEffect(() => {
    return () => {
      resetThemeBackground();
    };
  }, []);

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme, randomizeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
