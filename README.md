# I'm Minna - 多风格个人页面

一个支持多种视觉风格的个人作品集网站，每次访问都会随机展示不同的设计风格。

## 🎨 支持的风格

- **🎮 像素游戏风格** - 复古像素艺术风格，像经典游戏界面
- **📰 杂志封面风格** - 现代杂志布局，优雅的排版设计
- **💻 科幻终端风格** - 黑客风格的终端界面
- **⚪ 极简主义风格** - 简洁干净的设计风格
- **🌃 霓虹赛博风格** - 赛博朋克霓虹灯效果

## 🚀 特性

- **随机风格加载** - 每次访问随机选择一种风格
- **手动风格切换** - 右上角主题切换器支持手动切换
- **统一数据源** - 所有风格使用相同的数据结构
- **响应式设计** - 支持移动端和桌面端
- **TypeScript支持** - 完整的类型安全

## 📁 项目结构

```
src/
├── components/          # 通用组件
│   ├── ThemeRenderer.tsx    # 主题渲染器
│   ├── ThemeSwitcher.tsx    # 主题切换器
│   └── ThemeSwitcher.css    # 切换器样式
├── contexts/           # React上下文
│   └── ThemeContext.tsx     # 主题状态管理
├── data/              # 数据层
│   └── personalData.ts      # 个人数据
├── themes/            # 风格组件
│   ├── PixelTheme.tsx       # 像素风格
│   ├── PixelTheme.css
│   ├── MagazineTheme.tsx    # 杂志风格
│   ├── MagazineTheme.css
│   ├── TerminalTheme.tsx    # 终端风格
│   ├── TerminalTheme.css
│   ├── MinimalTheme.tsx     # 极简风格
│   ├── MinimalTheme.css
│   ├── NeonTheme.tsx        # 霓虹风格
│   └── NeonTheme.css
├── types/             # TypeScript类型定义
│   └── index.ts
├── config/            # 配置文件
│   └── themes.ts           # 主题配置
└── App.tsx            # 主应用组件
```

## 🛠️ 技术栈

- **React 19** - 前端框架
- **TypeScript** - 类型安全
- **Vite** - 构建工具
- **CSS3** - 样式和动画

## 📊 数据结构

所有风格都使用统一的数据结构：

```typescript
interface PersonalData {
  info: PersonalInfo;      // 个人信息
  skills: Skill[];         // 技能列表
  articles: Article[];     // 文章列表
  projects: Project[];     // 项目列表
}
```

## 🎯 使用方法

1. **安装依赖**
   ```bash
   npm install
   ```

2. **启动开发服务器**
   ```bash
   npm run dev
   ```

3. **构建生产版本**
   ```bash
   npm run build
   ```

## 🎨 自定义数据

编辑 `src/data/personalData.ts` 文件来更新你的个人信息：

- 个人信息（姓名、职位、简介等）
- 技能列表（技术栈和熟练度）
- 文章列表（博客文章或技术分享）
- 项目列表（作品集项目）

## 🔧 添加新风格

1. 在 `src/themes/` 目录下创建新的风格组件
2. 在 `src/config/themes.ts` 中添加新风格配置
3. 在 `src/components/ThemeRenderer.tsx` 中添加渲染逻辑
4. 在 `src/types/index.ts` 中更新 `ThemeStyle` 类型

## 📱 响应式支持

所有风格都支持响应式设计，在移动设备上会自动调整布局。

## 🎲 随机风格

- 首次访问时随机选择一种风格
- 用户选择会保存在本地存储中
- 点击随机按钮可以重新随机选择

## 🔮 未来计划

- [ ] 添加更多风格主题
- [ ] 支持深色/浅色模式切换
- [ ] 添加动画过渡效果
- [ ] 支持国际化
- [ ] 添加更多交互功能

---

**享受你的多风格个人页面！** 🎉
