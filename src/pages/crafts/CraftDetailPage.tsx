import React from 'react';
import { useParams, Link } from 'react-router-dom';
import './CraftDetailPage.css';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTranslations } from '../../hooks/useTranslations';
import { personalDataMultiLang } from '../../data/personalData';

const CraftDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { language } = useLanguage();
  const { t } = useTranslations();
  const data = personalDataMultiLang[language];

  const craft = data.crafts.find(c => c.id === id);

  if (!craft) {
    return (
      <div className="craft-detail-page">
        <div className="error-container">
          <h2>{t('common.error')}</h2>
          <p>{t('common.noData')}</p>
          <Link to="/crafts" className="btn btn-primary">
            {t('crafts.backToCrafts')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="craft-detail-page">
      <div className="craft-detail-header">
        <div className="craft-detail-title">
          <h1>{craft.name}</h1>
          {craft.featured && (
            <span className="featured-badge">{t('crafts.featured')}</span>
          )}
        </div>
        <p className="craft-description">{craft.description}</p>
      </div>

      <div className="craft-detail-content">
        <div className="craft-technologies-section">
          <h3>{t('crafts.technologies')}</h3>
          <div className="technology-tags">
            {craft.technologies.map((tech, index) => (
              <span key={index} className="technology-tag">{tech}</span>
            ))}
          </div>
        </div>

        <div className="craft-details-section">
          <h3>{t('crafts.craftDetails')}</h3>
          <p>{t('crafts.detailsPlaceholder')}</p>
        </div>

        <div className="craft-actions">
          {craft.liveUrl && (
            <a href={craft.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              {t('crafts.viewLive')}
            </a>
          )}
          
          {craft.githubUrl && (
            <a href={craft.githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
              {t('crafts.viewCode')}
            </a>
          )}
        </div>
      </div>

      <div className="craft-detail-footer">
        <Link to="/crafts" className="btn btn-back">
          ← {t('crafts.backToCrafts')}
        </Link>
      </div>
    </div>
  );
};

export default CraftDetailPage; 