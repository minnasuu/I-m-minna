import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslations } from '../hooks/useTranslations';
import { personalDataMultiLang } from '../data/personalData';
import './ProjectDetailPage.css';

const ProjectDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { language } = useLanguage();
  const { t } = useTranslations();
  const data = personalDataMultiLang[language];

  const project = data.projects.find(project => project.id === id);

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  return (
    <div className="project-detail-page">
      <div className="project-detail-container">
        <header className="project-detail-header">
          <div className="project-header-info">
            <h1 className="project-title">{project.name}</h1>
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
        </header>
        
        <div className="project-content">
          <div className="project-details">
            <h2>{t('projects.projectDetails')}</h2>
            <div className="details-content">
              <p>{t('projects.detailsPlaceholder')}</p>
              {/* 这里可以添加更多项目详情内容 */}
            </div>
          </div>
        </div>
        
        <div className="project-actions">
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
          
          <Link to="/projects" className="back-to-projects-btn">
            {t('projects.backToProjects')}
          </Link>
          
          <Link to="/" className="back-to-home-btn">
            {t('common.backToHome')}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailPage;
