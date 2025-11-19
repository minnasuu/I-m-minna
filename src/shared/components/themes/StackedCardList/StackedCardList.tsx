import { useState } from 'react'
import { Link } from 'react-router-dom'
import './StackedCardList.scss'

export interface StackedCardItem {
  id: string
  title: string
  coverImage?: string
  link?: string
  meta?: {
    date?: string
    readTime?: number
  }
  description?: string
  renderContent?: () => React.ReactNode
}

interface StackedCardListProps {
  items: StackedCardItem[]
  maxVisibleItems?: number
  cardWidth?: number
  overlapOffset?: number
  className?: string
  viewMoreLink?: string
  viewMoreText?: string
}

export default function StackedCardList({
  items,
  maxVisibleItems = 10,
  cardWidth = 120,
  overlapOffset = 30,
  className = '',
  viewMoreLink,
  viewMoreText = 'View More',
}: StackedCardListProps) {
  const [expanded, setExpanded] = useState<boolean>(false)
  
  const visibleItems = items.slice(0, maxVisibleItems)
  const hasMore = items.length > maxVisibleItems
  
  // 切换卡片展开状态
  const toggleCard = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    setExpanded(true)
    
    // 将点击的卡片滚动到可视区域
    const clickedCard = e.currentTarget
    setTimeout(() => {
      clickedCard.scrollIntoView({ 
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
      })
    }, 200) // 延迟一点让展开动画开始后再滚动
  }
  
  // 计算每张卡片的初始位置
  const getCardStyle = (index: number) => {
    return {
      '--card-index': index,
      '--overlap-offset': `${overlapOffset}px`,
      '--card-width': `${cardWidth}px`,
    } as React.CSSProperties
  }
  
  const renderCard = (item: StackedCardItem, index: number) => {
    const cardContent = (
      <>
        <div className="stacked-card-preview">
          {item.coverImage ? (
            item.coverImage.endsWith('.mp4') ? (
              <video
                src={item.coverImage}
                className="stacked-card-thumbnail"
                muted
                loop
                playsInline
              />
            ) : (
              <img src={item.coverImage} alt={item.title} className="stacked-card-thumbnail" />
            )
          ) : (
            <div className="stacked-card-thumbnail-placeholder">
              <span>📄</span>
            </div>
          )}
          
          {/* 渐变遮罩 */}
          <div className="stacked-card-overlay" />
        </div>
        
        <div className="stacked-card-info">
          <div className="stacked-card-title">{item.title}</div>
          
          {/* {isExpanded && (
            <>
              {item.meta && (
                <div className="stacked-card-meta">
                  {item.meta.date && <span className="card-date">{item.meta.date}</span>}
                  {item.meta.readTime && <span className="card-readtime">{item.meta.readTime}min</span>}
                </div>
              )}
              
              {item.description && (
                <div className="stacked-card-description">{item.description}</div>
              )}
              
              {item.renderContent && item.renderContent()}
            </>
          )} */}
        </div>
      </>
    )
    
    const cardProps = {
      className: `stacked-card ${expanded ? 'expanded' : ''}`,
      style: getCardStyle(index),
      onClick: toggleCard,
    }
    
    // 所有卡片都用 div 包裹，点击切换展开状态
    return (
      <div key={item.id} {...cardProps}>
        {cardContent}
      </div>
    )
  }
  
  return (
    <div className={`stacked-card-list-wrapper ${className}`} onMouseLeave={() => setExpanded(false)}>
      <div className="stacked-card-list">
        {visibleItems.map((item, index) => renderCard(item, index))}
      </div>
      
      {hasMore && viewMoreLink && (
        <div className="stacked-card-view-more">
          {viewMoreLink.startsWith('http') ? (
            <a
              href={viewMoreLink}
              target="_blank"
              rel="noopener noreferrer"
              className="view-more-button"
            >
              {viewMoreText}
              <span className="arrow">→</span>
            </a>
          ) : (
            <Link to={viewMoreLink} className="view-more-button">
              {viewMoreText}
              <span className="arrow">→</span>
            </Link>
          )}
        </div>
      )}
    </div>
  )
}
