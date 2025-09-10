import React, { useEffect, useState, useRef } from 'react';
import { useParams, Navigate, Link } from "react-router-dom";
import { useLanguage } from '../../contexts/LanguageContext';
import { useTranslations } from '../../hooks/useTranslations';
import { personalDataMultiLang } from '../../data/personalData';
import type { Article } from "../../types";
import "./ArticleDetailPage.css";
import LineAnchor from './components/LineAnchor/LineAnchor';
import { Icon } from '@suminhan/land-design';

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

  const [articleAnchors,setArticleAnchors] = useState<{ key: string; title: string }[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);

  // 处理章节变化
  const handleSectionChange = (sectionIndex: number) => {
    // 可以在这里添加其他逻辑，比如更新URL hash
    console.log('Current section changed to:', sectionIndex, articleAnchors[sectionIndex]?.title);
  };

  useEffect(() => {
    // 等待DOM渲染完成后提取标题节点
    const timer = setTimeout(() => {
      if (contentRef.current) {
        const extractHeadings = () => {
          const headings = contentRef.current?.querySelectorAll('h1,h2');
          const anchors: { key: string; title: string }[] = [];
          
          headings?.forEach((heading, index) => {
            let headingId = heading.id;
            
            // 如果没有id，则自动生成一个
            if (!headingId) {
              headingId = `heading-${index + 1}`;
              heading.id = headingId;
            }
            
            // 提取标题文本
            const title = heading.textContent?.trim() || `标题 ${index + 1}`;
            
            anchors.push({
              key: headingId,
              title: title
            });
          });
          
          setArticleAnchors(anchors);
        };

        extractHeadings();
      }
    }, 100); // 给一点时间让React渲染完成

    return () => clearTimeout(timer);
  }, [article.content]);

  // 监听DOM变化，当内容变化时重新提取标题
  useEffect(() => {
    if (!contentRef.current) return;

    const observer = new MutationObserver(() => {
      // 延迟执行，避免频繁更新
      const timer = setTimeout(() => {
        if (contentRef.current) {
          const headings = contentRef.current.querySelectorAll('h1');
          const anchors: { key: string; title: string }[] = [];
          
          headings?.forEach((heading, index) => {
            let headingId = heading.id;
            
            // 如果没有id，则自动生成一个
            if (!headingId) {
              headingId = `heading-${index + 1}`;
              heading.id = headingId;
            }
            
            // 提取标题文本
            const title = heading.textContent?.trim() || `标题 ${index + 1}`;
            
            anchors.push({
              key: headingId,
              title: title
            });
          });
          
          setArticleAnchors(anchors);
        }
      }, 50);

      return () => clearTimeout(timer);
    });

    observer.observe(contentRef.current, {
      childList: true,
      subtree: true,
      characterData: true
    });

    return () => observer.disconnect();
  }, []);
  return (
    <div className="article-detail-page" id="article-detail-page">
      {articleAnchors.length > 0 && (
        <LineAnchor 
          anchors={articleAnchors} 
          contentRef={contentRef}
          onSectionChange={handleSectionChange}
        />
      )}
      <div className="articles-header">
        <Link to="/articles" className="back-btn-top">
          <Icon name='last-step'/>
        </Link>
      </div>
      <div className="article-detail-container">
        <header className="article-detail-header">
          <div className="article-meta">
            <span className="article-date">
              {t("articles.publishedOn")}{" "}
              {new Date(article.publishDate).toLocaleDateString(
                language === "zh" ? "zh-CN" : "en-US"
              )}
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
          <div className="article-detail-body">
            <div className="article-detail-body-content" ref={contentRef}>{article.content}</div>
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
