import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import type { PersonalData } from '../types';
import type { Language } from '../contexts/LanguageContext';
import PixelTheme from '../themes/PixelTheme';
import MagazineTheme from '../themes/MagazineTheme';
import TerminalTheme from '../themes/TerminalTheme';
import MinimalTheme from '../themes/MinimalTheme';

interface ThemeRendererProps {
  data: Record<Language, PersonalData>;
}

const ThemeRenderer: React.FC<ThemeRendererProps> = ({ data }) => {
  const { currentTheme } = useTheme();
  const { language } = useLanguage();
  
  // 根据当前语言获取对应的数据
  const currentData = data[language];

  const renderTheme = () => {
    switch (currentTheme) {
      case 'pixel':
        return <PixelTheme data={currentData} />;
      case 'magazine':
        return <MagazineTheme data={currentData} />;
      case 'terminal':
        return <TerminalTheme data={currentData} />;
      case 'minimal':
        return <MinimalTheme data={currentData} />;

      default:
        return <MinimalTheme data={currentData} />;
    }
  };

  return (
    <div className="theme-renderer">
      {renderTheme()}
    </div>
  );
};

export default ThemeRenderer;
