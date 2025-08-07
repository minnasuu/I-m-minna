import React from 'react';
import { Link } from 'react-router-dom';
import './CraftsPage.css';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTranslations } from '../../hooks/useTranslations';
import { personalDataMultiLang } from '../../data/personalData';

const CraftsPage: React.FC = () => {
  const { language } = useLanguage();
  const { t } = useTranslations();
  const data = personalDataMultiLang[language];

  return (
    <div className="crafts-page">
      <div className="crafts-header">
        <h1>{t('crafts.title')}</h1>
        <p>{t('crafts.subtitle')}</p>
      </div>

      <div className="crafts-grid">
        {data.crafts.map((craft) => (
          <div key={craft.id} className={`craft-card ${craft.featured ? 'featured' : ''}`}>
            {craft.featured && (
              <div className="featured-badge">{t('crafts.featured')}</div>
            )}
            
            <div className="craft-content">
              <h3>{craft.name}</h3>
              <p>{craft.description}</p>
              
              <div className="craft-technologies">
                <span className="technologies-label">{t('crafts.technologies')}:</span>
                <div className="technology-tags">
                  {craft.technologies.map((tech, index) => (
                    <span key={index} className="technology-tag">{tech}</span>
                  ))}
                </div>
              </div>

              <div className="craft-actions">
                <Link to={`/crafts/${craft.id}`} className="btn btn-primary">
                  {t('crafts.viewDetails')}
                </Link>
                
                {craft.liveUrl && (
                  <a href={craft.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                    {t('crafts.viewLive')}
                  </a>
                )}
                
                {craft.githubUrl && (
                  <a href={craft.githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                    {t('crafts.viewCode')}
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="crafts-footer">
        <Link to="/" className="btn btn-back">
          ← {t('common.backToHome')}
        </Link>
      </div>
    </div>
  );
};

export default CraftsPage; 