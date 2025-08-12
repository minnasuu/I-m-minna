import React from 'react';
import './AITheme.scss';
import AIChatInterface from './AIChatInterface';
import AIPersonality from './AIPersonality';
import AIAvatar from './AIAvatar';

const AITheme: React.FC = () => {
  return (
    <div className="ai-theme">
      <div className="ai-header">
        <AIAvatar />
        <div className="ai-title">
          <h1>AI Assistant - Minna</h1>
          <p>Your Personal AI Companion</p>
        </div>
      </div>
      
      <div className="ai-content">
        <AIPersonality />
        <AIChatInterface />
      </div>
      
      <div className="ai-footer">
        <div className="ai-status">
          <span className="status-indicator online"></span>
          <span>AI Online - Ready to Chat</span>
        </div>
      </div>
    </div>
  );
};

export default AITheme;
