import React from "react";
import { useLanguage } from "../contexts/LanguageContext";
import "./LanguageSwitcher.css";

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const handleLanguageToggle = () => {
    setLanguage(language === "zh" ? "en" : "zh");
  };

  return (
    <div className="language-switcher">
      <button
        className="language-button"
        onClick={handleLanguageToggle}
        title={language === "zh" ? "Switch to English" : "切换到中文"}
      >
        <span className="language-text">
          {language === "zh" ? "English" : "中文"}
        </span>
      </button>
    </div>
  );
};

export default LanguageSwitcher;
