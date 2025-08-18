import React from 'react';
import './AITheme.scss';
import AIChatInterface from './AIChatInterface';
import AIAvatar from './AIAvatar';
import ThemeSwitcher from '../../components/ThemeSwitcher';
import AISidebar from "./AISidebar";

const AITheme: React.FC = () => {
  return (
    <div className="ai-theme">
      <div className="ai-header">
        <AIAvatar />
        <div className="ai-title">
          <h1>Minna</h1>
          <p>Who know about me best.</p>
        </div>
        <div style={{ marginLeft: "auto" }}>
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
