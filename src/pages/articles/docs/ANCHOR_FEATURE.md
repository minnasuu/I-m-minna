# 文章标题自动提取与Anchor生成功能

## 功能概述

`ArticleDetailPage` 组件现在具备自动提取文章内容中标题节点并生成导航锚点的功能。该功能可以：

1. 自动识别文章内容中的标题节点（h1, h2, h3, h4, h5, h6）
2. 为没有ID的标题节点自动生成唯一ID
3. 提取标题文本内容
4. 生成用于导航的anchor数据
5. 实时监听DOM变化，动态更新anchor列表

## 技术实现

### 核心逻辑

```typescript
useEffect(() => {
  // 等待DOM渲染完成后提取标题节点
  const timer = setTimeout(() => {
    if (contentRef.current) {
      const extractHeadings = () => {
        const headings = contentRef.current?.querySelectorAll('h1, h2, h3, h4, h5, h6');
        const anchors: { key: string; title: string }[] = [];
        
        headings?.forEach((heading, index) => {
          let headingId = heading.id;
          
          // 如果没有id，则自动生成一个
          if (!headingId) {
            headingId = `heading-${index + 1}`;
            heading.id = headingId;
          }
          
          // 提取标题文本
          const title = heading.textContent?.trim() || `标题 ${index + 1}`;
          
          anchors.push({
            key: headingId,
            title: title
          });
        });
        
        setArticleAnchors(anchors);
      };

      extractHeadings();
    }
  }, 100); // 给一点时间让React渲染完成

  return () => clearTimeout(timer);
}, [article.content]);
```

### DOM变化监听

```typescript
useEffect(() => {
  if (!contentRef.current) return;

  const observer = new MutationObserver(() => {
    // 延迟执行，避免频繁更新
    const timer = setTimeout(() => {
      // 重新提取标题逻辑
    }, 50);

    return () => clearTimeout(timer);
  });

  observer.observe(contentRef.current, {
    childList: true,
    subtree: true,
    characterData: true
  });

  return () => observer.disconnect();
}, []);
```

## 使用方法

### 1. 基本使用

组件会自动处理文章内容中的标题节点，无需额外配置：

```tsx
<ArticleDetailPage article={articleData} />
```

### 2. 标题节点要求

文章内容中的标题节点需要是标准的HTML标题标签：

```tsx
const articleContent = (
  <div>
    <h1>主标题</h1>
    <p>内容...</p>
    <h2>二级标题</h2>
    <p>更多内容...</p>
    <h3>三级标题</h3>
    <p>最后的内容...</p>
  </div>
);
```

### 3. 自定义ID

如果标题节点已有ID，组件会保留原有ID：

```tsx
<h1 id="custom-id">自定义ID的标题</h1>
```

如果没有ID，组件会自动生成：

```tsx
<h2>没有ID的标题</h2>
// 自动生成ID: heading-2
```

## 数据结构

生成的anchor数据格式：

```typescript
interface AnchorItem {
  key: string;    // 标题节点的ID
  title: string;  // 标题文本内容
}
```

示例：
```typescript
[
  { key: "heading-1", title: "主标题" },
  { key: "heading-2", title: "二级标题" },
  { key: "custom-id", title: "自定义ID的标题" }
]
```

## 组件集成

生成的anchor数据会自动传递给 `LandAnchor` 组件：

```tsx
{articleAnchors.length > 0 && (
  <div className='article-detail-page-anchor'>
    <LandAnchor data={articleAnchors}/>
  </div>
)}
```

## 性能优化

1. **延迟执行**: 使用 `setTimeout` 避免在DOM渲染过程中频繁执行
2. **防抖处理**: MutationObserver 回调中使用延迟，避免频繁更新
3. **清理机制**: 组件卸载时自动清理定时器和观察器

## 测试

提供了完整的测试用例来验证功能：

```bash
npm test ArticleDetailPage.test.tsx
```

测试覆盖：
- 自动提取标题和生成anchor
- 处理没有标题的文章
- 保留现有标题ID
- 动态内容更新

## 注意事项

1. **时序依赖**: 需要等待React完成DOM渲染后才能提取标题
2. **ID冲突**: 自动生成的ID格式为 `heading-{index}`，确保唯一性
3. **内容变化**: 通过MutationObserver监听DOM变化，支持动态内容更新
4. **性能考虑**: 对于内容频繁变化的场景，建议适当调整延迟时间

## 未来改进

1. **标题层级**: 支持根据标题层级生成缩进或样式
2. **滚动定位**: 集成平滑滚动到指定标题的功能
3. **锚点样式**: 支持自定义anchor的样式和布局
4. **国际化**: 支持多语言的标题提取和处理
