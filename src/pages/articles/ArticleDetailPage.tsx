import React from 'react';
import { useParams, Navigate } from "react-router-dom";
import { useLanguage } from '../../contexts/LanguageContext';
import { useTranslations } from '../../hooks/useTranslations';
import { personalDataMultiLang } from '../../data/personalData';
import type { Article } from "../../types";
import "./ArticleDetailPage.css";

interface ArticleDetailPageProps {
  article?: Article; // 可选的 props，如果没有传入则从 personalData 中获取
}

const ArticleDetailPage: React.FC<ArticleDetailPageProps> = ({
  article: propArticle,
}) => {
  const { id } = useParams<{ id: string }>();
  const { language } = useLanguage();
  const { t } = useTranslations();
  const data = personalDataMultiLang[language];

  // 优先使用 props 传入的文章，如果没有则从 personalData 中查找
  const article =
    propArticle || data.articles.find((article) => article.id === id);

  if (!article) {
    return <Navigate to="/articles" replace />;
  }

  return (
    <div className="article-detail-page">
      <div className="article-detail-container">
        <header className="article-detail-header">
          <div className="article-meta">
            <span className="article-date">
              {t("articles.publishedOn")}{" "}
              {new Date(article.publishDate).toLocaleDateString(
                language === "zh" ? "zh-CN" : "en-US"
              )}
            </span>
            <span className="article-read-time">
              {article.readTime} {t("articles.readTime")}
            </span>
          </div>

          <h1 className="article-detail-title">{article.title}</h1>

          <div className="article-detail-tags">
            {article.tags.map((tag, index) => (
              <span key={index} className="article-detail-tag">
                {tag}
              </span>
            ))}
          </div>
        </header>

        <div className="article-content">
          <div className="article-detail-summary">
            <h2>{t("articles.summary")}</h2>
            <p>{article.summary}</p>
          </div>

          <div className="article-detail-body">
            <h2>{t("articles.content")}</h2>
            <div className="article-detail-body-content">{article.content}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// 示例：如何通过 props 传入文章内容
export const ArticleDetailPageWithProps: React.FC<{ article: Article }> = ({
  article,
}) => {
  return <ArticleDetailPage article={article} />;
};

export default ArticleDetailPage;
