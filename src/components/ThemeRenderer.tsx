import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import type { PersonalData } from '../types';
import type { Language } from '../contexts/LanguageContext';
import TerminalTheme from '../themes/TerminalTheme';
import AITheme from '../themes/AITheme';

interface ThemeRendererProps {
  data: Record<Language, PersonalData>;
}

const ThemeRenderer: React.FC<ThemeRendererProps> = ({ data }) => {
  const { language } = useLanguage();
  const { currentTheme } = useTheme();
  
  // 根据当前语言获取对应的数据
  const currentData = data[language];

  const renderTheme = () => {
    switch (currentTheme) {
      case 'ai':
        return <AITheme />;
      case 'terminal':
      default:
        return <TerminalTheme data={currentData} />;
    }
  };

  return (
    <div className="theme-renderer">
      {renderTheme()}
    </div>
  );
};

export default ThemeRenderer;
