import React from 'react';
import './PixelTheme.css';
import type { PersonalData } from '../../types';

interface PixelThemeProps {
  data: PersonalData;
}

const PixelTheme: React.FC<PixelThemeProps> = ({ data }) => {
  return (
    <div className="pixel-theme">
      <div className="pixel-header">
        <div className="pixel-avatar">
          {data.info.avatar ? (
            <img src={data.info.avatar} alt={data.info.name} />
          ) : (
            <div className="pixel-avatar-placeholder">👤</div>
          )}
        </div>
        <div className="pixel-info">
          <h1 className="pixel-name">{data.info.name}</h1>
          <p className="pixel-title">{data.info.title}</p>
          <p className="pixel-bio">{data.info.bio}</p>
        </div>
      </div>

      <div className="pixel-content">
        <section className="pixel-section">
          <h2 className="pixel-section-title">🎯 技能</h2>
          <div className="pixel-skills">
            {data.skills.map((skill, index) => (
              <div key={index} className="pixel-skill">
                <span className="skill-name">{skill.name}</span>
                <div className="skill-bar">
                  <div
                    className="skill-fill"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
                <span className="skill-level">{skill.level}%</span>
              </div>
            ))}
          </div>
        </section>

        <section className="pixel-section">
          <h2 className="pixel-section-title">📝 文章</h2>
          <div className="pixel-articles">
            {data.articles.map((article) => (
              <div key={article.id} className="pixel-article">
                <h3>{article.title}</h3>
                <p>{article.summary}</p>
                <div className="article-meta">
                  <span>{article.publishDate}</span>
                  <span>{article.readTime}分钟</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="pixel-section">
          <h2 className="pixel-section-title">🚀 项目</h2>
          <div className="pixel-projects">
            {data.projects.map((project) => (
              <div key={project.id} className="pixel-project">
                <h3>{project.name}</h3>
                <p>{project.description}</p>
                <div className="project-tech">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default PixelTheme;
