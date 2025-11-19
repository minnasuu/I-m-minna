import React from 'react';
import './AITheme.scss';
import AIChatInterface from './AIChatInterface';
import AIAvatar from './AIAvatar';
import ThemeSwitcher from '../../../shared/components/ThemeSwitcher';
import LanguageSwitcher from "../../../shared/components/LanguageSwitcher";
import AISidebar from "./AISidebar";
import { useTranslations } from "../../../shared/hooks/useTranslations";

const AITheme: React.FC = () => {
  const { t } = useTranslations();

  return (
    <div className="ai-theme">
      <div className="ai-header">
        <AIAvatar />
        <div className="ai-title">
          <h1>{t("aiTheme.title")}</h1>
          <p>{t("aiTheme.subtitle")}</p>
        </div>
        <div className="ai-controls">
          <LanguageSwitcher />
          <ThemeSwitcher />
        </div>
      </div>
      <div className="ai-content">
        <AISidebar />
        <AIChatInterface />
      </div>
    </div>
  );
};

export default AITheme;
