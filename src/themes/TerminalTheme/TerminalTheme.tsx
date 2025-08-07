import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './TerminalTheme.scss';
import type { PersonalData } from '../../types';
import { useTranslations } from '../../hooks/useTranslations';
import { IconArrowLineRight } from '../../components/Icon';

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
                  <Link 
                    to={line.link === '#articles' ? '/articles' : '/projects'} 
                    className="view-more-link"
                  >
                    {line.content}
                  </Link>
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
            <div className="section-header">
              <h3>👧 {t('common.systemInfo')}</h3>
            </div>
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
            <div className="section-header">
              <h3>🕸️ {t('common.socialLinks')}</h3>
            </div>
            {data.info.socialLinks.map((socialLink: { name: string; url: string }, index: number) => (
              socialLink.url && (
                <div className="social-link-item" key={index}>
                  {socialLink.name}：
                  <a
                  key={index}
                  href={socialLink.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                >
                  {socialLink.url}
                </a>
                </div>
              )
            ))}
          </div>

          <div className="sidebar-section">
            <div className="section-header">
              <h3>⚡️ {t('skills.title')}</h3>
            </div>
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
            <div className="section-header">
              <h3>📷 {t('interests.title')}</h3>
            </div>
            <div className="interest-list"> 
            {data.interests.map((interest, index) => (
              <div key={index} className="interest-item">
                <span className="interest-name">{interest.name}</span>
              </div>
            ))}
            </div>
          </div>

          <div className="sidebar-section">
            <div className="section-header">
              <h3>📄 {t('articles.title')}</h3>
              <Link to="/articles" className="view-all-link">
                {t('articles.viewAll')}
                <IconArrowLineRight size={12}/>
              </Link>
            </div>
            <div className="interest-list"> 
            {data.articles.slice(0, 3).map((article, index) => (
              <div key={index} className="interest-item">
                <Link to={`/articles/${article.id}`} className="article-title-link">
                  <span className="interest-name">{article.title}</span>
                </Link>
              </div>
            ))}
            </div>
          </div>

          <div className="sidebar-section">
            <div className="section-header">
              <h3>✨ {t('projects.title')}</h3>
              <Link to="/projects" className="view-all-link">
                {t('projects.viewAll')}
                <IconArrowLineRight size={12}/>
              </Link>
            </div>
            <div className="interest-list"> 
            {data.projects.slice(0, 3).map((project, index) => (
              <div key={index} className="interest-item">
                <Link to={`/projects/${project.id}`} className="project-title-link">
                  <span className="interest-name">{project.name}</span>
                </Link>
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
