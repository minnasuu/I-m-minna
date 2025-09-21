import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from "../../../contexts/LanguageContext";
import { personalDataMultiLang } from "../../../data/personalData";
import "../styles/ArticlesPage.css";
import { Icon, LandButton, LandSelect } from "@suminhan/land-design";

const selectData = [
  { label: "全部", key: "all" },
  { label: "随笔", key: "essay" },
  { label: "技术", key: "tech" },
];

const ArticlesPage: React.FC = () => {
  const { language } = useLanguage();
  const data = personalDataMultiLang[language];

  // 按照发布时间排序，最新的文章在前面
  const sortedArticles = [...data.articles].sort((a, b) => {
    return (
      new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
    );
  });
  const [selectValue, setSelectValue] = useState<string>("all");
  const filteredArticles = useMemo(() => {
    return sortedArticles.filter((article) => {
      if (selectValue === "all") {
        return true;
      }
      return article.type === selectValue;
    });
  }, [sortedArticles, selectValue]);

  return (
    <div className="articles-page">
      <div className="articles-container">
        <div className="articles-header">
          <div className="back-to-home-top">
            <Link to="/" className="back-btn-top">
              <Icon name="last-step" />
            </Link>
          </div>
          <div className="articles-action-buttons">
            <LandSelect
              data={selectData}
              selected={selectValue}
              onChange={(value) => setSelectValue(value.key)}
            />
          </div>
        </div>

        <div className="articles-grid">
          {filteredArticles.map((article, index) => (
            <article
              key={article.id}
              className={`article-card ${
                index % 2 === 0 ? "article-card-even" : "article-card-odd"
              }`}
            >
              <Link to={`/articles/${article.id}`}>
                <div
                  className="article-card-content"
                  style={{
                    flexDirection: index % 2 === 0 ? "row" : "row-reverse",
                  }}
                >
                  <div className="article-card-content-info">
                    <div className="article-title">{article.title}</div>
                    <p className="article-summary">{article.summary}</p>

                    <div className="article-tags">
                      {article.tags.map((tag, index) => (
                        <span key={index} className="article-tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="article-meta">
                      <span className="article-date">
                        {new Date(article.publishDate).toLocaleDateString(
                          language === "zh" ? "zh-CN" : "en-US"
                        )}
                      </span>
                    </div>
                    <div className="article-buttons">
                      <Link
                        to={`/articles/${article.id}`}
                        className="article-button"
                      >
                        <LandButton.ButtonArrow text="阅读更多" type="fill" />
                      </Link>
                    </div>
                  </div>
                  <div className="article-card-image">
                    {article.coverImage?.endsWith(".mp4") ? (
                      <video src={article.coverImage} autoPlay loop muted />
                    ) : (
                      <img src={article.coverImage} alt={article.title} />
                    )}
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArticlesPage;
