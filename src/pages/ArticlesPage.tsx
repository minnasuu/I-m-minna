import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslations } from '../hooks/useTranslations';
import { personalDataMultiLang } from '../data/personalData';
import './ArticlesPage.css';

const ArticlesPage: React.FC = () => {
  const { language } = useLanguage();
  const { t } = useTranslations();
  const data = personalDataMultiLang[language];

  return (
    <div className="articles-page">
      <div className="articles-container">
        <header className="articles-header">
          <h1>{t('articles.title')}</h1>
          <p>{t('articles.subtitle')}</p>
        </header>
        
        <div className="articles-grid">
          {data.articles.map((article) => (
            <article key={article.id} className="article-card">
              <div className="article-meta">
                <span className="article-date">
                  {t('articles.publishedOn')} {new Date(article.publishDate).toLocaleDateString(language === 'zh' ? 'zh-CN' : 'en-US')}
                </span>
                <span className="article-read-time">
                  {article.readTime} {t('articles.readTime')}
                </span>
              </div>
              
              <h2 className="article-title">
                <Link to={`/articles/${article.id}`}>
                  {article.title}
                </Link>
              </h2>
              
              <p className="article-summary">{article.summary}</p>
              
              <div className="article-tags">
                {article.tags.map((tag, index) => (
                  <span key={index} className="article-tag">
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="article-actions">
                <Link to={`/articles/${article.id}`} className="read-more-btn">
                  {t('articles.readMore')}
                </Link>
                {article.link && (
                  <a 
                    href={article.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="external-link-btn"
                  >
                    {t('articles.externalLink')}
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

export default ArticlesPage;
