import React, { useState, useEffect } from 'react';
import './TerminalTheme.css';
import type { PersonalData } from '../../types';

interface TerminalThemeProps {
  data: PersonalData;
}

const TerminalTheme: React.FC<TerminalThemeProps> = ({ data }) => {
  const [currentLine, setCurrentLine] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  const terminalLines = [
    `> whoami`,
    `${data.info.name}`,
    `> cat about.txt`,
    `${data.info.bio}`,
    `> ls skills/`,
    ...data.skills.map(skill => `  ${skill.name} - ${skill.level}%`),
    `> cat articles/*.md | head -5`,
    ...data.articles.map(article => `  ${article.title} (${article.readTime}min read)`),
    `> find projects/ -name "*.featured"`,
    ...data.projects.filter(p => p.featured).map(project => `  ${project.name} - ${project.description}`),
    `> echo "Ready for next command..."`,
    `> _`
  ];

  useEffect(() => {
    if (currentLine < terminalLines.length) {
      const timer = setTimeout(() => {
        setDisplayedText(prev => prev + terminalLines[currentLine] + '\n');
        setCurrentLine(prev => prev + 1);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setIsTyping(false);
    }
  }, [currentLine, terminalLines]);

  return (
    <div className="terminal-theme">
      <div className="terminal-header">
        <div className="terminal-buttons">
          <span className="terminal-btn close"></span>
          <span className="terminal-btn minimize"></span>
          <span className="terminal-btn maximize"></span>
        </div>
        <div className="terminal-title">minna@portfolio:~</div>
      </div>

      <div className="terminal-body">
        <div className="terminal-content">
          <pre className="terminal-text">
            {displayedText}
            {isTyping && <span className="cursor">█</span>}
          </pre>
        </div>

        <div className="terminal-sidebar">
          <div className="sidebar-section">
            <h3>📊 System Info</h3>
            <div className="info-item">
              <span className="label">Name:</span>
              <span className="value">{data.info.name}</span>
            </div>
            <div className="info-item">
              <span className="label">Role:</span>
              <span className="value">{data.info.title}</span>
            </div>
            <div className="info-item">
              <span className="label">Location:</span>
              <span className="value">{data.info.location}</span>
            </div>
          </div>

          <div className="sidebar-section">
            <h3>🔧 Skills Matrix</h3>
            {data.skills.map((skill, index) => (
              <div key={index} className="skill-item">
                <span className="skill-name">{skill.name}</span>
                <div className="skill-bar">
                  <div
                    className="skill-fill"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <div className="sidebar-section">
            <h3>🌐 Social Links</h3>
            {Object.entries(data.info.socialLinks).map(([platform, url]) => (
              url && (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                >
                  {platform}://{url.split('//')[1]}
                </a>
              )
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TerminalTheme;
