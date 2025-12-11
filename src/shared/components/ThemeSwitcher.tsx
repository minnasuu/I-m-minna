import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { themes, getRandomTheme } from '../../config/themes';
import type { ThemeStyle } from '../types';
import './ThemeSwitcher.css';

const ThemeSwitcher: React.FC = () => {
  const { currentTheme, setTheme } = useTheme();
  const [isHovered, setIsHovered] = useState(false);

  const handleDiceClick = () => {
    const randomTheme = getRandomTheme(currentTheme) as ThemeStyle;
    setTheme(randomTheme);
  };

  return (
    <div 
      className="theme-switcher"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 骰子按钮 */}
      <button
        className="dice-button"
        onClick={handleDiceClick}
        title="随机切换主题"
      >
        🎲
      </button>

      {/* 主题选项列表 - 只显示图标 */}
      <div className={`theme-list ${isHovered ? 'show' : ''}`}>
        {themes.map((theme, index) => (
          <button
            key={theme.name}
            className={`theme-option ${currentTheme === theme.name ? 'active' : ''}`}
            onClick={() => setTheme(theme.name)}
            title={theme.displayName}
            style={{
              animationDelay: `${index * 0.1}s`
            }}
          >
            <span className="theme-icon">{theme.icon}</span>
            {/* 气泡提示 */}
            <div className="tooltip">{theme.displayName}</div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ThemeSwitcher;
