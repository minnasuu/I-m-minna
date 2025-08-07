import React from 'react';
import './MinimalTheme.css';
import type { PersonalData } from '../../types';

interface MinimalThemeProps {
  data: PersonalData;
}

const MinimalTheme: React.FC<MinimalThemeProps> = ({ data }) => {
  return (
    <div className="minimal-theme">
      <header className="minimal-header">
        <div className="container">
          <h1 className="minimal-name">{data.info.name}</h1>
          <p className="minimal-title">{data.info.title}</p>
          <p className="minimal-bio">{data.info.bio}</p>
        </div>
      </header>

      <main className="minimal-content">
        <div className="container">
          <section className="minimal-section">
            <h2>Skills</h2>
            <div className="skills-list">
              {data.skills.map((skill, index) => (
                <div key={index} className="skill-item">
                  <span className="skill-name">{skill.name}</span>
                  <div className="skill-level">
                    <div
                      className="skill-bar"
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="minimal-section">
            <h2>Articles</h2>
            <div className="articles-list">
              {data.articles.map((article) => (
                <article key={article.id} className="article-item">
                  <h3>{article.title}</h3>
                  <p>{article.summary}</p>
                  <div className="article-meta">
                    <time>{article.publishDate}</time>
                    <span>{article.readTime} min read</span>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="minimal-section">
            <h2>Projects</h2>
            <div className="projects-list">
              {data.projects.map((project) => (
                <div key={project.id} className="project-item">
                  <h3>{project.name}</h3>
                  <p>{project.description}</p>
                  <div className="project-tech">
                    {project.technologies.join(', ')}
                  </div>
                  <div className="project-links">
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        GitHub
                      </a>
                    )}
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        Live
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      <footer className="minimal-footer">
        <div className="container">
          <div className="social-links">
            {Object.entries(data.info.socialLinks).map(([platform, url]) => (
              url && (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {platform}
                </a>
              )
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MinimalTheme;
