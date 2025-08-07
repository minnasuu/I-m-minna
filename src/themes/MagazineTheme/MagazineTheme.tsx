import React from 'react';
import type { PersonalData } from '../../types';
import './MagazineTheme.css';

interface MagazineThemeProps {
  data: PersonalData;
}

const MagazineTheme: React.FC<MagazineThemeProps> = ({ data }) => {
  return (
    <div className="magazine-theme">
      <header className="magazine-header">
        <div className="magazine-cover">
          <div className="cover-content">
            <h1 className="cover-title">{data.info.name}</h1>
            <p className="cover-subtitle">{data.info.title}</p>
            <div className="cover-bio">{data.info.bio}</div>
          </div>
          {data.info.avatar && (
            <div className="cover-image">
              <img src={data.info.avatar} alt={data.info.name} />
            </div>
          )}
        </div>
      </header>

      <main className="magazine-content">
        <section className="magazine-section">
          <h2 className="section-headline">专业技能</h2>
          <div className="skills-grid">
            {data.skills.map((skill, index) => (
              <div key={index} className="skill-card">
                <div className="skill-header">
                  <h3>{skill.name}</h3>
                  <span className="skill-percentage">{skill.level}%</span>
                </div>
                <div className="skill-progress">
                  <div
                    className="skill-bar"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
                <span className="skill-category">{skill.category}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="magazine-section">
          <h2 className="section-headline">最新文章</h2>
          <div className="articles-grid">
            {data.articles.map((article) => (
              <article key={article.id} className="article-card">
                <div className="article-header">
                  <h3>{article.title}</h3>
                  <div className="article-meta">
                    <time>{article.publishDate}</time>
                    <span className="read-time">{article.readTime}分钟阅读</span>
                  </div>
                </div>
                <p className="article-summary">{article.summary}</p>
                <div className="article-tags">
                  {article.tags.map((tag, index) => (
                    <span key={index} className="tag">{tag}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="magazine-section">
          <h2 className="section-headline">精选项目</h2>
          <div className="projects-showcase">
            {data.projects.filter(p => p.featured).map((project) => (
              <div key={project.id} className="project-card">
                <div className="project-image">
                  {project.image ? (
                    <img src={project.image} alt={project.name} />
                  ) : (
                    <div className="project-placeholder">🚀</div>
                  )}
                </div>
                <div className="project-content">
                  <h3>{project.name}</h3>
                  <p>{project.description}</p>
                  <div className="project-tech">
                    {project.technologies.map((tech, index) => (
                      <span key={index} className="tech-badge">{tech}</span>
                    ))}
                  </div>
                  <div className="project-links">
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        GitHub
                      </a>
                    )}
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        在线预览
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default MagazineTheme;
