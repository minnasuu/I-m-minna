import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTranslations } from '../../hooks/useTranslations';
import { personalDataMultiLang } from '../../data/personalData';
import './ArticleDetailPage.css';

const ArticleDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { language } = useLanguage();
  const { t } = useTranslations();
  const data = personalDataMultiLang[language];

  const article = data.articles.find(article => article.id === id);

  if (!article) {
    return <Navigate to="/articles" replace />;
  }

  return (
    <div className="article-detail-page">
      <div className="article-detail-container">
        <header className="article-detail-header">
          <div className="article-meta">
            <span className="article-date">
              {t('articles.publishedOn')} {new Date(article.publishDate).toLocaleDateString(language === 'zh' ? 'zh-CN' : 'en-US')}
            </span>
            <span className="article-read-time">
              {article.readTime} {t('articles.readTime')}
            </span>
          </div>
          
          <h1 className="article-title">{article.title}</h1>
          
          <div className="article-tags">
            {article.tags.map((tag, index) => (
              <span key={index} className="article-tag">
                {tag}
              </span>
            ))}
          </div>
        </header>
        
        <div className="article-content">
          <div className="article-summary">
            <h2>{t('articles.summary')}</h2>
            <p>{article.summary}</p>
          </div>
          
          <div className="article-body">
            <h2>{t('articles.content')}</h2>
            <div className="content-text">
              {article.content}
            </div>
          </div>
        </div>
        
        <div className="article-actions">
          {article.link && (
            <a 
              href={article.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="external-link-btn"
            >
              {t('articles.readOriginal')}
            </a>
          )}
          
          <Link to="/articles" className="back-to-articles-btn">
            {t('articles.backToArticles')}
          </Link>
          
          <Link to="/" className="back-to-home-btn">
            {t('common.backToHome')}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetailPage;
