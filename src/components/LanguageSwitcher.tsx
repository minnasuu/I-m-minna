import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import './LanguageSwitcher.css';

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const [isHovered, setIsHovered] = useState(false);

  const handleLanguageToggle = () => {
    setLanguage(language === 'zh' ? 'en' : 'zh');
  };

  return (
    <div 
      className="language-switcher"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button
        className="language-button"
        onClick={handleLanguageToggle}
        title={language === 'zh' ? 'Switch to English' : '切换到中文'}
      >
        <span className="language-text">
          {language === 'zh' ? 'English' : '中文'}
        </span>
      </button>
      
      {/* 气泡提示 */}
      <div className={`language-tooltip ${isHovered ? 'show' : ''}`}>
        {language === 'zh' ? 'Switch to English' : '切换到中文'}
      </div>
    </div>
  );
};

export default LanguageSwitcher;
