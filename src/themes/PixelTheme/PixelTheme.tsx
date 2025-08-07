import React from 'react';
import './PixelTheme.css';
import type { PersonalData } from '../../types';
import { useTranslations } from '../../hooks/useTranslations';

interface PixelThemeProps {
  data: PersonalData;
}

const PixelTheme: React.FC<PixelThemeProps> = ({ data }) => {
  const { t } = useTranslations();
  return (
    <div className="pixel-theme theme-pixel">
      <div className="pixel-header">
        <div className="pixel-avatar">
          {data.info.avatar ? (
            <img src={data.info.avatar} alt={data.info.name} />
          ) : (
            <div className="pixel-avatar-placeholder">👤</div>
          )}
        </div>
        <div className="pixel-info">
          <h1 className="pixel-name">{data.info.name}</h1>
          <p className="pixel-title">{data.info.title}</p>
          <p className="pixel-bio">{data.info.bio}</p>
        </div>
      </div>

      <div className="pixel-content">
        <section className="pixel-section">
          <h2 className="pixel-section-title">🎯 {t('skills.title')}</h2>
          <div className="pixel-skills">
            {data.skills.map((skill, index) => (
              <div key={index} className="pixel-skill">
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
                <span className="skill-level">{skill.level}%</span>
              </div>
            ))}
          </div>
        </section>

        <section className="pixel-section">
          <h2 className="pixel-section-title">🎨 {t('interests.title')}</h2>
          <div className="pixel-interests">
            {data.interests.map((interest, index) => (
              <div key={index} className="pixel-interest">
                <div className="interest-header">
                  <h3 className="interest-name">{interest.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="pixel-section">
          <h2 className="pixel-section-title">📝 {t('articles.title')}</h2>
          <div className="pixel-articles">
            {data.articles.map((article) => (
              <div key={article.id} className="pixel-article">
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
                  <span>{article.publishDate}</span>
                  <span>{article.readTime} {t('articles.readTime')}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="pixel-section">
          <h2 className="pixel-section-title">🚀 {t('projects.title')}</h2>
          <div className="pixel-projects">
            {data.projects.map((project) => (
              <div key={project.id} className="pixel-project">
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
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default PixelTheme;
