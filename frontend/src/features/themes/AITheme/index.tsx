import React from 'react';
import './aiTheme.scss';
import AIChatInterface from './AIChatInterface';
import ThemeSwitcher from '../../../shared/components/ThemeSwitcher';
import LanguageSwitcher from "../../../shared/components/LanguageSwitcher";
import Sidebar from "../../../shared/components/themes/Sidebar";
import type { SidebarThemeConfig } from "../../../shared/components/themes/Sidebar";
import { useTranslations } from "../../../shared/hooks/useTranslations";
import avatarImg from '../../../assets/images/avatar.png';

const AITheme: React.FC = () => {
  const { t } = useTranslations();

  const sidebarConfig: SidebarThemeConfig = {
    themePrefix: 'ai',
    linkColor: '#10b981',
  };

  return (
    <div className="ai-theme">
      <div className="ai-header">
        <div className="ai-avatar">
          <img src={avatarImg} alt="AI Avatar" />
        </div>
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
        <Sidebar themeConfig={sidebarConfig} />
        <AIChatInterface />
      </div>
    </div>
  );
};

export default AITheme;
