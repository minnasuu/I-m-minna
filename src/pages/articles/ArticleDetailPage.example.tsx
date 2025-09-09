import React from 'react';
import { ArticleDetailPageWithProps } from './ArticleDetailPage';
import type { Article } from '../../types';

// 示例文章数据 - 展示自动提取标题功能
const exampleArticleWithHeadings: Article = {
  id: "example-headings",
  title: "自动提取标题功能示例",
  summary: "这篇文章展示了如何自动提取标题节点并生成导航锚点。",
  content: (
    <div>
      <h1>主标题：React组件开发指南</h1>
      <p>这是文章的开头部分，介绍React组件开发的基本概念。</p>
      
      <h2>组件设计原则</h2>
      <p>良好的组件设计应该遵循以下原则：</p>
      <ul>
        <li>单一职责原则</li>
        <li>可复用性</li>
        <li>可测试性</li>
      </ul>
      
      <h3>状态管理</h3>
      <p>组件状态管理是React开发中的重要概念。</p>
      
      <h3>生命周期</h3>
      <p>理解组件的生命周期有助于优化性能。</p>
      
      <h2>最佳实践</h2>
      <p>以下是一些React开发的最佳实践：</p>
      
      <h3>性能优化</h3>
      <p>使用React.memo、useMemo等优化性能。</p>
      
      <h3>错误边界</h3>
      <p>实现错误边界来捕获和处理错误。</p>
      
      <h4>错误处理策略</h4>
      <p>详细的错误处理策略说明。</p>
      
      <h5>日志记录</h5>
      <p>如何记录和监控错误日志。</p>
    </div>
  ),
  publishDate: "2025-01-01",
  tags: ["React", "组件", "最佳实践"],
  readTime: 8,
  type: "tech"
};

// 示例：已有ID的标题
const exampleArticleWithExistingIds: Article = {
  id: "example-existing-ids",
  title: "保留现有ID的示例",
  summary: "展示如何保留标题节点中已有的ID。",
  content: (
    <div>
      <h1 id="introduction">介绍</h1>
      <p>这个标题已经有ID了，组件会保留它。</p>
      
      <h2>主要内容</h2>
      <p>这个标题没有ID，组件会自动生成一个。</p>
      
      <h3 id="custom-section">自定义章节</h3>
      <p>这个标题也有自定义ID。</p>
      
      <h4>子章节</h4>
      <p>没有ID的标题会自动生成ID。</p>
    </div>
  ),
  publishDate: "2025-01-01",
  tags: ["示例", "ID管理"],
  readTime: 3,
  type: "tech"
};

const ArticleDetailPageExample: React.FC = () => {
  return (
    <div className="examples-container">
      <h1>自动提取标题功能示例</h1>
      
      <section>
        <h2>示例1：自动提取所有标题</h2>
        <p>这篇文章包含多个层级的标题，组件会自动提取并生成导航锚点：</p>
        <ArticleDetailPageWithProps article={exampleArticleWithHeadings} />
      </section>
      
      <section>
        <h2>示例2：保留现有ID</h2>
        <p>这篇文章中的一些标题已有ID，组件会保留它们并为没有ID的标题生成新的ID：</p>
        <ArticleDetailPageWithProps article={exampleArticleWithExistingIds} />
      </section>
      
      <section>
        <h2>功能说明</h2>
        <ul>
          <li><strong>自动识别</strong>：自动识别h1-h6标题节点</li>
          <li><strong>ID管理</strong>：保留现有ID，为没有ID的标题自动生成</li>
          <li><strong>文本提取</strong>：自动提取标题的文本内容</li>
          <li><strong>动态更新</strong>：监听DOM变化，实时更新锚点列表</li>
          <li><strong>导航集成</strong>：自动集成到LandAnchor导航组件</li>
        </ul>
      </section>
    </div>
  );
};

export default ArticleDetailPageExample;
