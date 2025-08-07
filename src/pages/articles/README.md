# 文章页面组件

## 概述

文章页面组件支持两种使用方式：
1. 通过路由参数自动获取文章内容（原有方式）
2. 通过 props 直接传入文章内容（新增方式）

## 组件说明

### ArticleDetailPage

主要的文章详情页面组件，支持两种数据获取方式：

```typescript
interface ArticleDetailPageProps {
  article?: Article; // 可选的 props，如果没有传入则从 personalData 中获取
}
```

**使用方式：**

1. **通过路由参数（原有方式）**：
   ```tsx
   <Route path="/articles/:id" element={<ArticleDetailPage />} />
   ```

2. **通过 props 传入文章内容**：
   ```tsx
   <ArticleDetailPage article={articleData} />
   ```

### ArticleDetailPageWithProps

专门用于通过 props 传入文章内容的包装组件：

```typescript
const ArticleDetailPageWithProps: React.FC<{ article: Article }> = ({ article }) => {
  return <ArticleDetailPage article={article} />;
};
```

**使用方式：**
```tsx
<ArticleDetailPageWithProps article={articleData} />
```

## 使用示例

### 1. 直接传入文章对象

```tsx
import { ArticleDetailPageWithProps } from './ArticleDetailPage';
import type { Article } from '../../types';

const article: Article = {
  id: "custom-1",
  title: "自定义文章标题",
  summary: "文章摘要",
  content: "文章内容...",
  publishDate: "2025-01-01",
  tags: ["标签1", "标签2"],
  readTime: 5
};

function MyComponent() {
  return <ArticleDetailPageWithProps article={article} />;
}
```

### 2. 从 API 获取文章数据

```tsx
import React, { useState, useEffect } from 'react';
import { ArticleDetailPageWithProps } from './ArticleDetailPage';
import type { Article } from '../../types';

function ArticleFromAPI() {
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/articles/1')
      .then(res => res.json())
      .then(data => {
        setArticle(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>加载中...</div>;
  if (!article) return <div>文章不存在</div>;

  return <ArticleDetailPageWithProps article={article} />;
}
```

### 3. 动态生成文章内容

```tsx
import React from 'react';
import { ArticleDetailPageWithProps } from './ArticleDetailPage';
import type { Article } from '../../types';

function DynamicArticle() {
  const generateArticle = (): Article => ({
    id: `dynamic-${Date.now()}`,
    title: "动态生成的文章",
    summary: "这是动态生成的文章摘要",
    content: `生成时间: ${new Date().toLocaleString()}
    
这是动态生成的文章内容...`,
    publishDate: new Date().toISOString().split('T')[0],
    tags: ["动态", "生成"],
    readTime: 3
  });

  return <ArticleDetailPageWithProps article={generateArticle()} />;
}
```

## 优势

通过 props 传入文章内容的优势：

1. **灵活性**：可以从任何数据源获取文章内容
2. **可复用性**：组件可以在不同场景下使用
3. **测试友好**：便于单元测试和集成测试
4. **动态内容**：支持动态生成文章内容
5. **API 集成**：便于与后端 API 集成

## 注意事项

1. 当通过 props 传入文章时，组件会忽略 URL 中的 `id` 参数
2. 确保传入的 `Article` 对象符合类型定义
3. 如果既没有传入 props 也没有找到对应的文章，组件会重定向到 `/articles` 页面

## 类型定义

```typescript
interface Article {
  id: string;
  title: string;
  summary: string;
  content: string;
  publishDate: string;
  tags: string[];
  readTime: number;
  coverImage?: string;
  link?: string;
}
``` 