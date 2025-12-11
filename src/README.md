# 项目源码结构说明

## 📁 目录结构

```
src/
├── app/                          # 应用核心
│   ├── App.tsx                   # 主应用组件
│   ├── App.css                   # 全局样式
│   ├── main.tsx                  # 应用入口
│   └── router.tsx                # 路由配置
│
├── features/                     # 功能模块（按业务领域划分）
│   ├── articles/                # 文章功能模块
│   │   ├── components/          # 文章相关组件
│   │   ├── pages/               # 文章页面
│   │   ├── data/                # 文章数据和内容
│   │   ├── styles/              # 文章样式
│   │   └── index.ts             # 导出
│   │
│   └── themes/                  # 主题功能模块
│       ├── AITheme/             # AI对话主题
│       ├── TerminalTheme/       # 终端主题
│       └── index.ts             # 导出
│
├── shared/                       # 共享资源
│   ├── components/              # 通用组件
│   │   ├── Icon.tsx
│   │   ├── LanguageSwitcher/
│   │   ├── ThemeSwitcher/
│   │   └── ThemeRenderer.tsx
│   │
│   ├── contexts/                # 全局上下文
│   │   ├── LanguageContext.tsx
│   │   └── ThemeContext.tsx
│   │
│   ├── hooks/                   # 通用hooks
│   │   └── useTranslations.ts
│   │
│   ├── utils/                   # 工具函数
│   │   └── getRandomRgba.ts
│   │
│   └── types/                   # 类型定义
│       └── index.ts
│
├── config/                       # 配置文件
│   ├── themes.ts                # 主题配置
│   └── themeColors.ts           # 主题颜色配置
│
├── assets/                       # 静态资源
│   ├── images/                  # 通用图片
│   │   ├── avatar.png
│   │   ├── avatar.svg
│   │   └── ckt-miniprogram-qr.jpg
│   │
│   └── articles/                # 文章相关资源
│       ├── images/              # 文章内嵌图片
│       └── covers/              # 文章封面
│
├── data/                         # 数据层
│   ├── personalData.tsx         # 个人信息数据
│   └── translations.ts          # 国际化翻译
│
└── styles/                       # 全局样式
    ├── index.css                # 全局CSS
    ├── index.scss               # 全局SCSS
    └── scrollbar.css            # 滚动条样式
```

## 🎯 设计原则

### 1. 按功能模块划分（Features）
- **目的**：将相关的业务逻辑、组件、样式聚合在一起
- **优势**：
  - 高内聚，低耦合
  - 易于维护和扩展
  - 便于团队协作
  - 代码重用性强

### 2. 共享资源集中管理（Shared）
- **目的**：避免代码重复，统一管理通用资源
- **包含**：
  - 跨模块使用的组件
  - 全局状态管理（Context）
  - 通用工具函数和Hooks
  - 类型定义

### 3. 配置与数据分离
- **config/**：静态配置（主题、颜色等）
- **data/**：动态数据（个人信息、翻译等）
- **assets/**：静态资源文件

### 4. 样式管理
- 全局样式放在 `styles/`
- 模块样式与模块代码放在一起
- 主题样式在各自主题文件夹内

## 🔄 导入路径规范

### 从功能模块导入共享资源
```typescript
// ✅ 正确
import { useLanguage } from '../../../shared/contexts/LanguageContext';
import type { PersonalData } from '../../../shared/types';

// ❌ 错误
import { useLanguage } from '../../contexts/LanguageContext';
```

### 从共享资源导入配置/数据
```typescript
// ✅ 正确
import { getTranslation } from '../../data/translations';
import { themes } from '../../config/themes';

// ❌ 错误
import { themes } from '../config/themes';
```

### 导入静态资源
```typescript
// ✅ 正确
import avatarImg from '../../../assets/images/avatar.png';
import coverImg from '../../../assets/articles/covers/xxx.jpg';

// ❌ 错误
import avatarImg from '../../assets/images/avatar.png';
```

## 📦 模块导出

每个功能模块都应该有一个 `index.ts` 文件统一导出：

```typescript
// features/articles/index.ts
export { default as ArticlesPage } from './pages/ArticlesPage';
export { default as ArticleDetailPage } from './pages/ArticleDetailPage';

// features/themes/index.ts
export { default as AITheme } from './AITheme';
export { default as TerminalTheme } from './TerminalTheme';
```

## 🚀 开发建议

1. **新增功能**：在 `features/` 下创建新的功能模块
2. **新增通用组件**：放在 `shared/components/`
3. **新增工具函数**：放在 `shared/utils/`
4. **新增类型定义**：放在 `shared/types/`
5. **新增静态资源**：根据类型放在 `assets/` 对应目录

## 📝 变更记录

### 2025-11-19 重构
- ✅ 按业务领域划分功能模块（features/）
- ✅ 统一管理共享资源（shared/）
- ✅ 分离配置、数据、样式
- ✅ 优化静态资源组织
- ✅ 减少目录嵌套和冗余
- ✅ 降低模块耦合度
