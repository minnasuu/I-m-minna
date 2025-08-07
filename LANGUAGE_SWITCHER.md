# 语言切换功能

## 功能概述

在页面右上角导航右侧新增了语言切换按钮，支持中英文切换。个人名字会根据语言设置自动切换，专有名词保持不变。

## 功能特性

### 🌍 多语言支持
- **中文 (zh)**: 默认语言，包含完整的中文内容，显示中文名字"苏敏晗"
- **英文 (en)**: 英文版本，包含对应的英文翻译，显示英文名字"minna"

### 🔄 语言切换
- 点击右上角的语言切换按钮即可在中英文之间切换
- 按钮显示当前语言对应的国旗图标和语言代码
- 悬停时显示切换提示

### 📱 响应式设计
- 在移动设备上自动隐藏语言文本，只显示图标
- 适配不同屏幕尺寸

### 👤 名字切换
- 中文模式：显示中文名字"苏敏晗"
- 英文模式：显示英文名字"minna"
- 专有名词（技术栈、项目名称等）保持不变

### 🏷️ 标签翻译
- Terminal主题中的侧边栏标签也会根据语言切换
- 中文：姓名、角色、位置、微信
- 英文：Name、Role、Location、WeChat

## 技术实现

### 核心组件

1. **LanguageContext** (`src/contexts/LanguageContext.tsx`)
   - 提供语言状态管理
   - 支持语言切换功能

2. **LanguageSwitcher** (`src/components/LanguageSwitcher.tsx`)
   - 语言切换按钮组件
   - 包含国旗图标和语言代码

3. **Translations** (`src/data/translations.ts`)
   - 国际化翻译数据
   - 支持嵌套键值结构

4. **useTranslations Hook** (`src/hooks/useTranslations.ts`)
   - 提供翻译函数
   - 简化组件中的翻译使用

### 数据结构

```typescript
// 多语言个人数据
export const personalDataMultiLang: Record<Language, PersonalData> = {
  zh: { 
    info: {
      name: "苏敏晗",  // 中文名字
      // ... 其他数据
    }
  },
  en: { 
    info: {
      name: "minna",   // 英文名字
      // ... 其他数据
    }
  }
};
```

### 翻译键结构

```typescript
interface Translations {
  info: {
    title: string;
    bio: string;
    location: string;
  };
  skills: {
    title: string;
    categories: { /* 技能分类 */ };
  };
  articles: {
    title: string;
    readMore: string;
    readTime: string;
    publishedOn: string;
  };
  projects: {
    title: string;
    viewProject: string;
    viewCode: string;
    technologies: string;
  };
  common: {
    loading: string;
    error: string;
    noData: string;
    systemInfo: string;
    socialLinks: string;
    name: string;
    role: string;
    location: string;
    wechat: string;
  };
}
```

## 使用方法

### 在组件中使用翻译

```typescript
import { useTranslations } from '../hooks/useTranslations';

const MyComponent = () => {
  const { t } = useTranslations();
  
  return (
    <div>
      <h1>{t('info.title')}</h1>
      <p>{t('info.bio')}</p>
    </div>
  );
};
```

### 获取当前语言

```typescript
import { useLanguage } from '../contexts/LanguageContext';

const MyComponent = () => {
  const { language } = useLanguage();
  
  return (
    <div>
      当前语言: {language}
    </div>
  );
};
```

## 样式定制

语言切换按钮的样式可以通过修改 `src/components/LanguageSwitcher.css` 来自定义：

- 按钮外观和悬停效果
- 工具提示样式
- 响应式断点
- 动画效果

## 注意事项

1. **专有名词保持不变**: 技术栈名称、项目名称、GitHub链接等专有名词在中英文版本中保持一致
2. **名字切换**: 个人名字会根据语言设置自动切换（中文：苏敏晗，英文：minna）
3. **标签翻译**: Terminal主题中的侧边栏标签也会根据语言切换
4. **数据同步**: 确保中英文版本的数据结构完全一致
5. **性能优化**: 翻译数据在构建时静态生成，避免运行时开销
6. **可扩展性**: 可以轻松添加更多语言支持

## 未来扩展

- 支持更多语言（如日语、韩语等）
- 添加语言偏好本地存储
- 支持动态语言包加载
- 添加语言检测功能
