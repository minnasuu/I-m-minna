# AI Theme - AI人格化对话风格

## 概述

AI主题是一个现代化的AI对话界面，模拟与AI助手的交互体验。该主题采用渐变背景、毛玻璃效果和流畅的动画，为用户提供沉浸式的AI对话体验。

## 特性

- 🤖 **AI人格化**: 展示AI助手的性格特征和描述
- 💬 **实时对话**: 模拟真实的AI对话交互
- 🎨 **现代化设计**: 渐变背景、毛玻璃效果、流畅动画
- 📱 **响应式布局**: 支持桌面和移动设备
- 🎭 **动态状态**: 在线状态指示器和打字动画

## 组件结构

```
AITheme/
├── index.tsx          # 主入口组件
├── AITheme.tsx        # 主题包装器
├── AITheme.scss       # 主题样式
├── AIAvatar.tsx       # AI头像组件
├── AIPersonality.tsx  # AI人格展示组件
├── AIChatInterface.tsx # AI聊天界面组件
└── README.md          # 说明文档
```

## 主要组件

### AIAvatar
- 动态旋转的AI头像
- 渐变背景和阴影效果
- 机器人表情符号标识

### AIPersonality
- 展示AI助手的性格特征标签
- 详细的AI人格描述
- 可交互的特征标签

### AIChatInterface
- 完整的聊天界面
- 用户和AI消息区分
- 打字指示器动画
- 响应式输入框

## 样式特性

- **渐变背景**: 蓝紫色渐变背景
- **毛玻璃效果**: backdrop-filter实现的模糊效果
- **动画效果**: 旋转、脉冲、打字等动画
- **响应式设计**: 网格布局和媒体查询
- **现代化UI**: 圆角、阴影、过渡效果

## 使用方法

1. 在主题切换器中选择"AI对话"主题
2. 与AI助手进行对话交互
3. 查看AI人格特征和描述
4. 体验流畅的动画效果

## 技术实现

- React Hooks (useState, useEffect, useRef)
- SCSS样式预处理器
- CSS Grid和Flexbox布局
- CSS动画和过渡效果
- 响应式设计原则

## 自定义配置

可以通过修改以下文件来自定义AI主题：

- `AITheme.scss`: 调整颜色、布局和动画
- `AIPersonality.tsx`: 修改AI人格特征和描述
- `AIChatInterface.tsx`: 自定义聊天逻辑和响应
- `themeColors.ts`: 调整主题背景色和文字颜色
