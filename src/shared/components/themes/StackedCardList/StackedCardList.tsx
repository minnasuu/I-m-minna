import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
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
  /** 主题前缀，用于应用主题样式 */
  themePrefix?: string
}

export default function StackedCardList({
  items,
  maxVisibleItems = 10,
  cardWidth = 120,
  overlapOffset = 30,
  className = '',
  viewMoreLink,
  viewMoreText = 'View More',
  themePrefix,
}: StackedCardListProps) {
  const [expanded, setExpanded] = useState<boolean>(false)
  const navigate = useNavigate()
  
  const visibleItems = items.slice(0, maxVisibleItems)
  const hasMore = items.length > maxVisibleItems
  
  // 点击卡片处理：未展开时先展开，展开后再跳转
  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>, item: StackedCardItem) => {
    e.preventDefault()
    
    // 如果已经展开且有链接，则跳转
    if (expanded && item.link) {
      // 判断是内部链接还是外部链接
      if (item.link.startsWith('http') || item.link.startsWith('//')) {
        // 外部链接，新窗口打开
        window.open(item.link, '_blank', 'noopener,noreferrer')
      } else {
        // 内部链接，使用 react-router 导航
        navigate(item.link)
      }
    } else {
      // 未展开时，展开卡片
      setExpanded(true)
      
      // 将点击的卡片滚动到可视区域
      const clickedCard = e.currentTarget
      setTimeout(() => {
        clickedCard.scrollIntoView({ 
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        })
      }, 200)
    }
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
        </div>
      </>
    )
    
    const cardProps = {
      className: `stacked-card ${expanded ? 'expanded' : ''} ${item.link ? 'clickable' : ''}`,
      style: getCardStyle(index),
      onClick: (e: React.MouseEvent<HTMLDivElement>) => handleCardClick(e, item),
    }
    
    // 所有卡片都用 div 包裹，点击跳转或展开
    return (
      <div key={item.id} {...cardProps}>
        {cardContent}
      </div>
    )
  }
  
  const wrapperClass = `stacked-card-list-wrapper ${themePrefix ? `${themePrefix}-stacked-card-list-wrapper` : ''} ${className}`.trim()
  
  return (
    <div className={wrapperClass} onMouseLeave={() => setExpanded(false)}>
      <div className="stacked-card-list">
        {visibleItems.map((item, index) => renderCard(item, index))}
      </div>
      
      {hasMore && viewMoreLink && (
        <div className="stacked-card-view-more">
          <a
            href={viewMoreLink}
            onClick={(e) => {
              e.preventDefault()
              if (viewMoreLink.startsWith('http') || viewMoreLink.startsWith('//')) {
                window.open(viewMoreLink, '_blank', 'noopener,noreferrer')
              } else {
                navigate(viewMoreLink)
              }
            }}
            className="view-more-button"
          >
            {viewMoreText}
            <span className="arrow">→</span>
          </a>
        </div>
      )}
    </div>
  )
}
