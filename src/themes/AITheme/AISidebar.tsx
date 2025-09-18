
import { Link } from 'react-router-dom'
import { useLanguage } from '../../contexts/LanguageContext'
import { personalDataMultiLang } from '../../data/personalData'
import { useTranslations } from '../../hooks/useTranslations'
import { IconArrowLineRight } from '../../components/Icon'

export default function AISidebar() {
  const { language } = useLanguage()
  const { t } = useTranslations()
  const data = personalDataMultiLang[language]

  return (
    <div className="ai-sidebar">
      {/* 系统信息 */}
      <div className="ai-sidebar-section">
        <div className="section-header">
          <h3>👧 {t("common.systemInfo")}</h3>
        </div>
        <div className="info-item avatar-item">
          <img src={data.info.avatar} alt="avatar" className="avatar" />
        </div>
        <div className="info-item">
          <span className="label">{t("common.name")}:</span>
          <span className="value">{data.info.name}</span>
        </div>
        <div className="info-item">
          <span className="label">{t("common.role")}:</span>
          <span
            className="value"
            dangerouslySetInnerHTML={{
              __html: data.info.title
                .replace(
                  /腾讯/g,
                  '<a href="https://www.tencent.com" target="_blank" rel="noopener noreferrer" style="color: #10b981; text-decoration: underline;">腾讯</a>'
                )
                .replace(
                  /Tencent/g,
                  '<a href="https://www.tencent.com" target="_blank" rel="noopener noreferrer" style="color: #10b981; text-decoration: underline;">Tencent</a>'
                ),
            }}
          />
        </div>
        <div className="info-item">
          <span className="label">{t("common.location")}:</span>
          <span className="value">{data.info.location}</span>
        </div>
        <div className="info-item">
          <span className="label">{t("common.wechat")}:</span>
          <span className="value">{data.info.wechat}</span>
        </div>
        <div className="info-item">
          <span className="label">{t("common.email")}:</span>
          <span className="value">{data.info.email}</span>
        </div>
      </div>

      {/* 链接 */}
      <div className="ai-sidebar-section">
        <div className="section-header">
          <h3>🧲 {t("common.socialLinks")}</h3>
        </div>
        {data.info.socialLinks.map((socialLink, index) =>
          socialLink.url && (
            <div className="social-link-item" key={index}>
              {socialLink.name}：
              <a
                href={socialLink.url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                {socialLink.abbreviation || socialLink.url}
              </a>
            </div>
          )
        )}
      </div>

      {/* 技能 */}
      <div className="ai-sidebar-section">
        <div className="section-header">
          <h3>⚡️ {t("skills.title")}</h3>
        </div>
        <div className="interest-list">
          {data.skills.map((skill, index) => (
            <div
              key={index}
              className={`label-item ${skill.link ? "with-link" : ""}`}
            >
              {skill.link ? (
                <a
                  href={skill.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="skill-name-link"
                >
                  <span className="interest-name">{skill.name}</span>
                </a>
              ) : (
                <span className="interest-name">{skill.name}</span>
              )}
              {skill.link && <span className="interest-link">🔗</span>}
            </div>
          ))}
        </div>
      </div>

      {/* 兴趣爱好 */}
      <div className="ai-sidebar-section">
        <div className="section-header">
          <h3>📸 {t("interests.title")}</h3>
        </div>
        <div className="interest-list">
          {data.interests.map((interest, index) => (
            <div
              key={index}
              className={`label-item ${interest.link ? "with-link" : ""}`}
            >
              <span className="interest-name">{interest.name}</span>
              {interest.link && <Link to={`/journals/${interest.link}`} className="interest-link">🔗</Link>}
            </div>
          ))}
        </div>
      </div>

      {/* 文章 */}
      <div className="ai-sidebar-section">
        <div className="section-header">
          <h3>📄 {t("articles.title")}</h3>
          <Link to="/articles" className="view-all-link">
            {t("articles.viewAll")}
            <IconArrowLineRight size={12} />
          </Link>
        </div>
        <div className="interest-list">
          {data.articles.reverse().slice(0, 3).map((article, index) => (
            <div key={index} className={`label-item ${article.link ? "with-link" : ""}`}>
              <Link
                to={`/articles/${article.id}`}
                className="article-title-link"
              >
                <span className="interest-name">{article.title}</span>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* 项目 */}
      <div className="ai-sidebar-section">
        <div className="section-header">
          <h3>💎 {t("projects.title")}</h3>
        </div>
        <div className="interest-list">
          {data.projects.map((project, index) => (
            <div key={index} className={`label-item ${project.link ? "with-link" : ""}`}>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="project-title-link"
              >
                <span className="interest-name">{project.name}</span>
              </a>
              {project.imgPopUrl && (
                <div className='img-pop-container'>
                  <img src={project.imgPopUrl} alt="img-pop" className='img-pop' />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 作品 */}
      <div className="ai-sidebar-section">
        <div className="section-header">
          <h3>♾️ {t("crafts.title")}</h3>
        </div>
        <div className="craft-list">
          {data.crafts.map((craft, index) => (
            <div
              key={index}
              className={`craft-item ${craft.link ? "with-link" : ""}`}
            >
              <a
                href={craft.link}
                target="_blank"
                rel="noopener noreferrer"
                className="craft-title-link"
              >
                <span className="craft-name">{craft.name}</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
