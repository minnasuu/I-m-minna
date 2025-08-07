import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTranslations } from '../../hooks/useTranslations';
import { personalDataMultiLang } from '../../data/personalData';
import './ProjectsPage.css';

const ProjectsPage: React.FC = () => {
  const { language } = useLanguage();
  const { t } = useTranslations();
  const data = personalDataMultiLang[language];

  return (
    <div className="projects-page">
      <div className="projects-container">
        <header className="projects-header">
          <h1>{t('projects.title')}</h1>
          <p>{t('projects.subtitle')}</p>
        </header>
        
        <div className="projects-grid">
          {data.projects.map((project) => (
            <article key={project.id} className="project-card">
              <div className="project-header">
                <h2 className="project-title">
                  <Link to={`/projects/${project.id}`}>
                    {project.name}
                  </Link>
                </h2>
                {project.featured && (
                  <span className="featured-badge">
                    {t('projects.featured')}
                  </span>
                )}
              </div>
              
              <p className="project-description">{project.description}</p>
              
              <div className="project-technologies">
                <h3>{t('projects.technologies')}</h3>
                <div className="tech-tags">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="project-actions">
                <Link to={`/projects/${project.id}`} className="view-project-btn">
                  {t('projects.viewDetails')}
                </Link>
                
                {project.githubUrl && (
                  <a 
                    href={project.githubUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="github-btn"
                  >
                    {t('projects.viewCode')}
                  </a>
                )}
                
                {project.liveUrl && (
                  <a 
                    href={project.liveUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="live-btn"
                  >
                    {t('projects.viewLive')}
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
        
        <div className="back-to-home">
          <Link to="/" className="back-btn">
            {t('common.backToHome')}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;
