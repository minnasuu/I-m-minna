import React, { useState, useEffect } from 'react';
import './TerminalTheme.scss';
import type { PersonalData } from '../../types';
import { useTranslations } from '../../hooks/useTranslations';

interface TerminalThemeProps {
  data: PersonalData;
}

const TerminalTheme: React.FC<TerminalThemeProps> = ({ data }) => {
  const { t } = useTranslations();
  const [currentLine, setCurrentLine] = useState(0);
  const [displayedLines, setDisplayedLines] = useState<Array<{ type: string; content: string; link?: string }>>([]);
  const [isTyping, setIsTyping] = useState(true);

  const terminalLines = [
    { type: 'command', content: 'whoami' },
    { type: 'output', content: data.info.name },
    { type: 'command', content: 'cat about.txt' },
    { type: 'output', content: data.info.bio },
    { type: 'command', content: 'ls skills/' },
    ...data.skills.map(skill => ({ type: 'skill-item', content: `${skill.name} - ${skill.level}%` })),
    { type: 'command', content: 'ls interests/' },
    ...data.interests.map(interest => ({ type: 'interest-item', content: `${interest.name}` })),
    { type: 'command', content: 'cat articles/*.md | head -5' },
    ...data.articles.slice(0, 5).map(article => ({ type: 'article-list', content: `${article.title} (${article.readTime}min read)` })),
    ...(data.articles.length > 5 ? [{ type: 'view-more', content: `... and ${data.articles.length - 5} more articles`, link: '#articles' }] : []),
    { type: 'command', content: 'find projects/ -name "*.featured"' },
    ...data.projects.filter(p => p.featured).slice(0, 5).map(project => ({ type: 'project-list', content: `${project.name} - ${project.description}` })),
    ...(data.projects.filter(p => p.featured).length > 5 ? [{ type: 'view-more', content: `... and ${data.projects.filter(p => p.featured).length - 5} more projects`, link: '#projects' }] : []),
    { type: 'command', content: 'echo "Ready for next command..."' },
    { type: 'info-message', content: 'Ready for next command...' },
    { type: 'command', content: '_' }
  ];

  // 当data改变时，重置状态
  useEffect(() => {
    setCurrentLine(0);
    setDisplayedLines([]);
    setIsTyping(true);
  }, [data]);

  useEffect(() => {
    if (currentLine < terminalLines.length) {
      const timer = setTimeout(() => {
        setDisplayedLines(prev => [...prev, terminalLines[currentLine]]);
        setCurrentLine(prev => prev + 1);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setIsTyping(false);
    }
  }, [currentLine, terminalLines]);

  return (
    <div className="terminal-theme theme-terminal">
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
          <div className="terminal-text">
            {displayedLines.map((line, index) => (
              <div key={index} className={`terminal-line ${line.type}`}>
                {line.type === 'command' && <span className="command-prompt">minna@portfolio:~$ </span>}
                {line.type === 'view-more' ? (
                  <a 
                    href={line.link} 
                    className="view-more-link"
                    onClick={(e) => {
                      e.preventDefault();
                      // 这里可以添加跳转逻辑，比如切换到其他主题或显示详细信息
                      if (line.link === '#articles') {
                        alert(`查看全部 ${data.articles.length} 篇文章\n\n${data.articles.map(article => `• ${article.title} (${article.readTime}min)`).join('\n')}`);
                      } else if (line.link === '#projects') {
                        alert(`查看全部 ${data.projects.filter(p => p.featured).length} 个项目\n\n${data.projects.filter(p => p.featured).map(project => `• ${project.name} - ${project.description}`).join('\n')}`);
                      }
                    }}
                  >
                    {line.content}
                  </a>
                ) : (
                  line.content
                )}
              </div>
            ))}
            {isTyping && <span className="cursor">█</span>}
          </div>
        </div>

        <div className="terminal-sidebar">
          <div className="sidebar-section">
            <h3>👧 {t('common.systemInfo')}</h3>
            <div className="info-item">
              <img src={data.info.avatar} alt="avatar" className="avatar" />
            </div>
            <div className="info-item">
              <span className="label">{t('common.name')}:</span>
              <span className="value">{data.info.name}</span>
            </div>
            <div className="info-item">
              <span className="label">{t('common.role')}:</span>
              <span className="value">{data.info.title}</span>
            </div>
            <div className="info-item">
              <span className="label">{t('common.location')}:</span>
              <span className="value">{data.info.location}</span>
            </div>
            <div className="info-item">
              <span className="label">{t('common.wechat')}:</span>
              <span className="value">{data.info.wechat}</span>
            </div>
          </div>

          <div className="sidebar-section">
            <h3>🕸️ {t('common.socialLinks')}</h3>
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

          <div className="sidebar-section">
            <h3>⚡️ {t('skills.title')}</h3>
            <div className="skill-list">
            {data.skills.map((skill, index) => (
              <div key={index} className="skill-item">
                {skill.link ? (
                  <a 
                    href={skill.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="skill-name-link"
                  >
                    <span className="skill-name">{skill.name}</span>
                  </a>
                ) : (
                  <span className="skill-name">{skill.name}</span>
                )}
                <div className="skill-bar">
                  <div
                    className="skill-fill"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </div>
            ))}
            </div>
          </div>

          <div className="sidebar-section">
            <h3>📷 {t('interests.title')}</h3>
            <div className="interest-list"> 
            {data.interests.map((interest, index) => (
              <div key={index} className="interest-item">
                <span className="interest-name">{interest.name}</span>
              </div>
            ))}
            </div>
          </div>

          <div className="sidebar-section">
            <h3>📄 {t('articles.title')}</h3>
            <div className="interest-list"> 
            {data.articles.map((article, index) => (
              <div key={index} className="interest-item">
                {article.link ? (
                  <a 
                    href={article.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="article-title-link"
                  >
                    <span className="interest-name">{article.title}</span>
                  </a>
                ) : (
                  <span className="interest-name">{article.title}</span>
                )}
              </div>
            ))}
            </div>
          </div>

          <div className="sidebar-section">
            <h3>✨ {t('projects.title')}</h3>
            <div className="interest-list"> 
            {data.projects.map((project, index) => (
              <div key={index} className="interest-item">
                {project.link ? (
                  <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="project-title-link"
                  >
                    <span className="interest-name">{project.name}</span>
                  </a>
                ) : (
                  <span className="interest-name">{project.name}</span>
                )}
              </div>
            ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default TerminalTheme;
