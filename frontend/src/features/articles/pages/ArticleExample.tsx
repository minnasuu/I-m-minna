import React from 'react';
import { ArticleDetailPageWithProps } from './ArticleDetailPage';
import type { Article } from '../../../shared/types';

// 示例文章数据
const exampleArticle: Article = {
  id: "example-1",
  title: "通过组件传入的文章示例",
  summary: "这是一个演示如何通过 props 传入文章内容的示例。",
  content: `这是文章的完整内容。

你可以通过以下方式使用这个组件：

1. 直接传入文章对象：
   <ArticleDetailPageWithProps article={articleData} />

2. 动态生成文章内容：
   const dynamicArticle = {
     id: "dynamic-1",
     title: "动态生成的文章",
     summary: "这是动态生成的文章摘要",
     content: "这是动态生成的文章内容...",
     publishDate: "2025-01-01",
     tags: ["示例", "动态"],
     readTime: 3
   };

3. 从 API 获取文章数据：
   const [article, setArticle] = useState<Article | null>(null);
   
   useEffect(() => {
     fetchArticleFromAPI().then(setArticle);
   }, []);
   
   if (article) {
     return <ArticleDetailPageWithProps article={article} />;
   }

这种方式的优势：
- 组件更加灵活和可复用
- 可以从不同的数据源获取文章内容
- 支持动态内容生成
- 便于测试和调试`,
  publishDate: "2025-01-01",
  tags: ["示例", "组件", "Props"],
  readTime: 5,
  link: "https://example.com/article",
  type: "tech"
};

const ArticleExample: React.FC = () => {
  return (
    <div>
      <h1>文章组件示例</h1>
      <p>这个页面展示了如何通过 props 传入文章内容：</p>
      
      <ArticleDetailPageWithProps article={exampleArticle} />
    </div>
  );
};

export default ArticleExample; 