import React from 'react';
import type { PersonalData } from '../../types';
import './MagazineTheme.css';
import { useTranslations } from '../../hooks/useTranslations';

interface MagazineThemeProps {
  data: PersonalData;
}

const MagazineTheme: React.FC<MagazineThemeProps> = ({ data }) => {
  const { t } = useTranslations();
  return (
    <div className="magazine-theme theme-magazine">
      <header className="magazine-header">
        <div className="magazine-cover">
          <div className="cover-content">
            <h1 className="cover-title">{data.info.name}</h1>
            <p className="cover-subtitle">{data.info.title}</p>
            <div className="cover-bio">{data.info.bio}</div>
          </div>
          {data.info.avatar && (
            <div className="cover-image">
              <img src={data.info.avatar} alt={data.info.name} />
            </div>
          )}
        </div>
      </header>

      <main className="magazine-content">
        <section className="magazine-section">
          <h2 className="section-headline">{t('skills.title')}</h2>
          <div className="skills-grid">
            {data.skills.map((skill, index) => (
              <div key={index} className="skill-card">
                <div className="skill-header">
                  {skill.link ? (
                    <a 
                      href={skill.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="skill-name-link"
                    >
                      <h3>{skill.name}</h3>
                    </a>
                  ) : (
                    <h3>{skill.name}</h3>
                  )}
                  <span className="skill-percentage">{skill.level}%</span>
                </div>
                <div className="skill-progress">
                  <div
                    className="skill-bar"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
                <span className="skill-category">{skill.category}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="magazine-section">
          <h2 className="section-headline">{t('interests.title')}</h2>
          <div className="interests-grid">
            {data.interests.map((interest, index) => (
              <div key={index} className="interest-card">
                <h3>{interest.name}</h3>
              </div>
            ))}
          </div>
        </section>

        <section className="magazine-section">
          <h2 className="section-headline">{t('articles.title')}</h2>
          <div className="articles-grid">
            {data.articles.map((article) => (
              <article key={article.id} className="article-card">
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

        <section className="magazine-section">
          <h2 className="section-headline">{t('projects.title')}</h2>
          <div className="projects-showcase">
            {data.projects.filter(p => p.featured).map((project) => (
              <div key={project.id} className="project-card">
                <div className="project-image">
                  {project.image ? (
                    <img src={project.image} alt={project.name} />
                  ) : (
                    <div className="project-placeholder">🍉</div>
                  )}
                </div>
                <div className="project-content">
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
                      <span key={index} className="tech-badge">{tech}</span>
                    ))}
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
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default MagazineTheme;
