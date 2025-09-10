import React, { useState, useEffect, useRef } from 'react';
import './LineAnchor.css';

interface LineAnchorProps {
  anchors: { key: string; title: string }[];
  contentRef: React.RefObject<HTMLDivElement | null>;
  onSectionChange?: (currentSection: number) => void;
}

interface AnchorData {
  key: string;
  title: string;
  progress: number; // 0-1 表示该标题下内容的百分比
  isActive: boolean;
}

const LineAnchor: React.FC<LineAnchorProps> = ({ anchors, contentRef, onSectionChange }) => {
  const [anchorData, setAnchorData] = useState<AnchorData[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [currentSection, setCurrentSection] = useState<number>(0);
  const lineRefs = useRef<(HTMLDivElement | null)[]>([]);

  // 计算每个标题的内容百分比
  const calculateProgress = () => {
    if (!contentRef.current || anchors.length === 0) return;

    // 使用文档的总高度
    const contentHeight = document.documentElement.scrollHeight;
    
    const newAnchorData: AnchorData[] = anchors.map((anchor, index) => {
      const element = document.getElementById(anchor.key);
      if (!element) {
        return {
          key: anchor.key,
          title: anchor.title,
          progress: 0.15, // 默认最小长度
          isActive: false
        };
      }

      // 计算当前标题到下一个标题之间的内容高度
      const currentTop = element.offsetTop;
      const nextElement = anchors[index + 1] ? document.getElementById(anchors[index + 1].key) : null;
      const nextTop = nextElement ? nextElement.offsetTop : contentHeight;
      
      const sectionHeight = nextTop - currentTop;
      
      // 计算该章节内容占全文的百分比
      // 使用更合理的计算方式：章节高度 / 总内容高度
      const progress = Math.min(sectionHeight / contentHeight, 1);
      
      // 设置最小和最大长度
      const minProgress = 0.15; // 最小15%
      const maxProgress = 0.8;  // 最大80%
      
      return {
        key: anchor.key,
        title: anchor.title,
        progress: Math.max(Math.min(progress, maxProgress), minProgress),
        isActive: false
      };
    });

    setAnchorData(newAnchorData);
  };

  // 监听滚动，更新当前激活的标题
  const updateActiveAnchor = React.useCallback(() => {
    if (!contentRef.current || anchors.length === 0) return;

    // 检测实际的滚动容器
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const containerHeight = window.innerHeight;
    
    // 使用页面滚动位置
    const scrollBottom = scrollTop + containerHeight;
    const scrollCenter = scrollTop + containerHeight / 2;

    let newCurrentSection = currentSection; // 保持当前章节作为默认值
    let maxVisibleRatio = 0;

    // 遍历所有章节，找到最合适的当前章节
    for (let index = 0; index < anchors.length; index++) {
      const anchor = anchors[index];
      const element = document.getElementById(anchor.key);
      if (!element) continue;

      const elementTop = element.offsetTop;
      const nextElement = anchors[index + 1] ? document.getElementById(anchors[index + 1].key) : null;
      const nextTop = nextElement ? nextElement.offsetTop : document.documentElement.scrollHeight;
      
      // 计算当前章节在视口中的可见比例
      const visibleTop = Math.max(scrollTop, elementTop);
      const visibleBottom = Math.min(scrollBottom, nextTop);
      const visibleHeight = Math.max(0, visibleBottom - visibleTop);
      const sectionHeight = nextTop - elementTop;
      const visibleRatio = sectionHeight > 0 ? visibleHeight / sectionHeight : 0;
      
      // 如果章节标题在视口上方且下一个章节还没到，则这是当前章节
      if (scrollTop >= elementTop - 100) {
        newCurrentSection = index;
      }
      
      // 如果有更好的可见比例，更新当前章节
      if (visibleRatio > maxVisibleRatio && visibleRatio > 0.2) {
        maxVisibleRatio = visibleRatio;
        newCurrentSection = index;
      }
    }

    // 使用最新的anchorData状态
    setAnchorData(prevAnchorData => {
      return prevAnchorData.map((anchor, index) => {
        const element = document.getElementById(anchor.key);
        if (!element) return anchor;

        const elementTop = element.offsetTop;
        const nextElement = anchors[index + 1] ? document.getElementById(anchors[index + 1].key) : null;
        const nextTop = nextElement ? nextElement.offsetTop : document.documentElement.scrollHeight;
        
        // 更精确的激活判断
        const isInViewport = scrollBottom > elementTop && scrollTop < nextTop;
        const isCenterInSection = scrollCenter >= elementTop && scrollCenter < nextTop;
        const isActive = isInViewport && (isCenterInSection || scrollTop >= elementTop - 50);
        
        return {
          ...anchor,
          isActive
        };
      });
    });

    // 更新当前章节状态
    if (newCurrentSection !== currentSection) {
      setCurrentSection(newCurrentSection);
      onSectionChange?.(newCurrentSection);
    }
  }, [anchors, contentRef, currentSection, onSectionChange]);

  // 点击横线跳转到对应标题
  const handleLineClick = (anchorKey: string) => {
    const element = document.getElementById(anchorKey);
    if (element) {
      // 找到对应的章节索引
      const sectionIndex = anchors.findIndex(anchor => anchor.key === anchorKey);
      if (sectionIndex !== -1) {
        setCurrentSection(sectionIndex);
        onSectionChange?.(sectionIndex);
      }
      
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  // 初始化计算
  useEffect(() => {
    const timer = setTimeout(() => {
      calculateProgress();
      // 初始化后立即调用一次updateActiveAnchor
      setTimeout(updateActiveAnchor, 100);
    }, 50);
    
    return () => clearTimeout(timer);
  }, [anchors, contentRef.current, updateActiveAnchor]);

  // 监听滚动 - 监听window的滚动事件
  useEffect(() => {
    if (!contentRef.current) return;

    let scrollTimer: NodeJS.Timeout;
    const handleScroll = () => {
      // 使用防抖，避免频繁调用
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        updateActiveAnchor();
      }, 16); // 约60fps
    };

    const handleResize = () => {
      calculateProgress();
      setTimeout(updateActiveAnchor, 100);
    };

    // 监听window的滚动事件而不是contentElement
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(scrollTimer);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [contentRef.current, updateActiveAnchor]);

  // 监听内容变化，重新计算
  useEffect(() => {
    if (!contentRef.current) return;

    const observer = new MutationObserver(() => {
      setTimeout(calculateProgress, 100);
    });

    observer.observe(contentRef.current, {
      childList: true,
      subtree: true,
      characterData: true
    });

    return () => observer.disconnect();
  }, [anchors]);

  // 获取当前章节信息（暂时注释掉，未来可能用到）
  // const getCurrentSectionInfo = () => {
  //   if (currentSection >= 0 && currentSection < anchorData.length) {
  //     return {
  //       index: currentSection,
  //       key: anchorData[currentSection]?.key,
  //       title: anchorData[currentSection]?.title,
  //       progress: anchorData[currentSection]?.progress,
  //       isActive: anchorData[currentSection]?.isActive
  //     };
  //   }
  //   return null;
  // };

  if (anchorData.length === 0) return null;

  return (
    <div className="line-anchor">
      <div className="line-anchor-container">
        {anchorData.map((anchor, index) => (
          <div
            key={anchor.key}
            ref={el => {
              lineRefs.current[index] = el;
            }}
            className={`line-anchor-item ${anchor.isActive ? 'active' : ''} ${hoveredIndex === index ? 'hovered' : ''} ${currentSection === index ? 'current' : ''}`}
            onClick={() => handleLineClick(anchor.key)}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            style={{
              '--line-width': `${Math.min(anchor.progress * 80, 80)}px`
            } as React.CSSProperties}
          >
            <div className="line-anchor-line" />
            {hoveredIndex === index && (
              <div className="line-anchor-tooltip">
                <div className="tooltip-title">{anchor.title.split('\n').map((line, i) => (
                  <React.Fragment key={i}>
                    {line}
                    {i < anchor.title.split('\n').length - 1 && <br />}
                  </React.Fragment>
                ))}</div>
                <div className="tooltip-progress">
                  {Math.round(anchor.progress * 100)}% 内容
                </div>
                {currentSection === index && (
                  <div className="tooltip-current">当前阅读</div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LineAnchor;
