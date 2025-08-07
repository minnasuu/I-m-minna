import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import type { PersonalData } from '../types';
import PixelTheme from '../themes/PixelTheme';
import MagazineTheme from '../themes/MagazineTheme';
import TerminalTheme from '../themes/TerminalTheme';
import MinimalTheme from '../themes/MinimalTheme';


interface ThemeRendererProps {
  data: PersonalData;
}

const ThemeRenderer: React.FC<ThemeRendererProps> = ({ data }) => {
  const { currentTheme } = useTheme();

  const renderTheme = () => {
    switch (currentTheme) {
      case 'pixel':
        return <PixelTheme data={data} />;
      case 'magazine':
        return <MagazineTheme data={data} />;
      case 'terminal':
        return <TerminalTheme data={data} />;
      case 'minimal':
        return <MinimalTheme data={data} />;

      default:
        return <MinimalTheme data={data} />;
    }
  };

  return (
    <div className="theme-renderer">
      {renderTheme()}
    </div>
  );
};

export default ThemeRenderer;
