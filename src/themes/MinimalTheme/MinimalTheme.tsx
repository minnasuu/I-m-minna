import React from 'react';
import './MinimalTheme.css';
import type { PersonalData } from '../../types';
import { useTranslations } from '../../hooks/useTranslations';

interface MinimalThemeProps {
  data: PersonalData;
}

const MinimalTheme: React.FC<MinimalThemeProps> = ({ data }) => {
  const { t } = useTranslations();
  
  return (
    <div className="minimal-theme theme-minimal">
      <header className="minimal-header">
        <div className="container">
          <h1 className="minimal-name">{data.info.name}</h1>
          <p className="minimal-title">{data.info.title}</p>
          <p className="minimal-bio">{data.info.bio}</p>
        </div>
      </header>

      <main className="minimal-content">
        <div className="container">
          <section className="minimal-section">
            <h2>{t('skills.title')}</h2>
            <div className="skills-list">
              {data.skills.map((skill, index) => (
                <div key={index} className="skill-item">
                  {skill.link ? (
                    <a 
                      href={skill.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="skill-name-link"
                    >
                      {skill.name}
                    </a>
                  ) : (
                    <span className="skill-name">{skill.name}</span>
                  )}
                  <div className="skill-level">
                    <div
                      className="skill-bar"
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="minimal-section">
            <h2>{t('interests.title')}</h2>
            <div className="interests-list">
              {data.interests.map((interest, index) => (
                <div key={index} className="interest-item">
                  <p className="interest-name">{interest.name}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="minimal-section">
            <h2>{t('articles.title')}</h2>
            <div className="articles-list">
              {data.articles.map((article) => (
                <article key={article.id} className="article-item">
                  {article.link ? (
                    <a 
                      href={article.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="article-title-link"
                    >
                      <h3>{article.title}</h3>
                    </a>
                  ) : (
                    <h3>{article.title}</h3>
                  )}
                  <p>{article.summary}</p>
                  <div className="article-meta">
                    <time>{article.publishDate}</time>
                    <span>{article.readTime} {t('articles.readTime')}</span>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="minimal-section">
            <h2>{t('projects.title')}</h2>
            <div className="projects-list">
              {data.projects.map((project) => (
                <div key={project.id} className="project-item">
                  {project.link ? (
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="project-title-link"
                    >
                      <h3>{project.name}</h3>
                    </a>
                  ) : (
                    <h3>{project.name}</h3>
                  )}
                  <p>{project.description}</p>
                  <div className="project-tech">
                    {project.technologies.join(', ')}
                  </div>
                  <div className="project-links">
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        {t('projects.viewCode')}
                      </a>
                    )}
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        {t('projects.viewProject')}
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      <footer className="minimal-footer">
        <div className="container">
          <div className="social-links">
            {Object.entries(data.info.socialLinks).map(([platform, url]) => (
              url && (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {platform}
                </a>
              )
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MinimalTheme;
