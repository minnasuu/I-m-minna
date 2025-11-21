import React, { useEffect, useState, useRef } from 'react';
import { useParams, Navigate, Link } from "react-router-dom";
import { useLanguage } from '../../../shared/contexts/LanguageContext';
import { personalDataMultiLang } from '../../../data/personalData';
import type { Article } from "../../../shared/types";
import "../styles/ArticleDetailPage.scss";
import LineAnchor from '../components/LineAnchor/LineAnchor';
import { Icon } from "@suminhan/land-design";
import ArticleSliders from '../components/ArticleSliders/ArticleSliders';
import BackButton from '../../../shared/components/BackButton';

interface ArticleDetailPageProps {
  article?: Article; // 可选的 props，如果没有传入则从 personalData 中获取
}

const ArticleDetailPage: React.FC<ArticleDetailPageProps> = ({
  article: propArticle,
}) => {
  const { id } = useParams<{ id: string }>();
  const { language } = useLanguage();
  const data = personalDataMultiLang[language];

  // 优先使用 props 传入的文章，如果没有则从 personalData 中查找
  const article =
    propArticle || data.articles.find((article) => article.id === id);

  if (!article) {
    return <Navigate to="/articles" replace />;
  }

  const [articleAnchors,setArticleAnchors] = useState<{ key: string; title: string }[]>([]);
  const [isSliderView, setIsSliderView] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // 处理章节变化
  const handleSectionChange = () => {
    // 可以在这里添加其他逻辑，比如更新URL hash
  };

  // 页面初始化滚动到顶部
  useEffect(() => {
    // 立即滚动到顶部，处理页面刷新或首次加载
    window.scrollTo(0, 0);
    
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: 0,
        behavior: 'auto' // 使用 'auto' 确保立即滚动，不使用平滑动画
      });
    }
  }, []);

  // 当文章ID变化时滚动到顶部（处理路由切换）
  useEffect(() => {
    window.scrollTo(0, 0);
    
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: 0,
        behavior: 'auto'
      });
    }
  }, [id]);

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
      {!isSliderView && <>
      <div className="article-detail-page-bottom-mask"></div>
      {articleAnchors.length > 0 && (
        <LineAnchor
          anchors={articleAnchors}
          contentRef={contentRef}
          onSectionChange={handleSectionChange}
        />
      )}
      <div className="articles-header">
        <div className="header-content" style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <BackButton to="/articles" />
          {article.markdownContent && (
            <button 
              onClick={() => setIsSliderView(true)}
              style={{
                background: 'var(--color-bg-2)',
                border: '1px solid var(--color-border-1)',
                borderRadius: '20px',
                padding: '6px 16px',
                cursor: 'pointer',
                color: 'var(--color-text-1)',
                fontSize: '14px'
              }}
            >
              Slider View
            </button>
          )}
        </div>
      </div>
      </>}

      {isSliderView && article.markdownContent ? (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 2000, background: 'var(--color-bg-1)' }}>
            <ArticleSliders article={article} onClose={() => setIsSliderView(false)} />
        </div>
      ) : (
      <div className="article-detail-container" ref={scrollRef}>
        <header className="article-detail-header">
          
          {/* 标题和 Meta 信息上移，作为页面的一级信息 */}
          <h1 className="article-detail-title">{article.title}</h1>
          
          <div className="article-meta">
            <span className="article-date">
              {new Date(article.publishDate).toLocaleDateString(
                language === "zh" ? "zh-CN" : "en-US",
                { year: 'numeric', month: 'long', day: 'numeric' }
              )}
            </span>
            
            <div className="article-detail-tags">
              {article.tags.map((tag, index) => (
                <span key={index} className="article-detail-tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* 封面图作为视觉分割，放在标题下方 */}
          {article.coverImage && (
            <div className="article-header-background">
              {article.coverImage.endsWith(".mp4") ? (
                 <video 
                   src={article.coverImage} 
                   autoPlay loop muted playsInline 
                   style={{width: '100%', height: '100%', objectFit: 'cover'}}
                 />
              ) : (
                <div 
                  className="article-header-image"
                  style={{ backgroundImage: `url(${article.coverImage})` }}
                />
              )}
            </div>
          )}
        </header>

        <div className="article-content">
          <div className="article-detail-body">
            <div className="article-detail-body-content" ref={contentRef}>
              {article.content}
            </div>
          </div>
        </div>
      </div>
      )}
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
