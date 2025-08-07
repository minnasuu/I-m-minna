import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { themes } from '../config/themes';
import './ThemeSwitcher.css';

const ThemeSwitcher: React.FC = () => {
  const { currentTheme, setTheme } = useTheme();

  return (
    <div className="theme-switcher">
      <div className="theme-grid">
        {themes.map((theme) => (
          <button
            key={theme.name}
            className={`theme-option ${currentTheme === theme.name ? 'active' : ''}`}
            onClick={() => setTheme(theme.name)}
            title={theme.displayName}
          >
            <span className="theme-icon">{theme.icon}</span>
            <span className="theme-name">{theme.displayName}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ThemeSwitcher;
