# 一. 什么是深色模式？

深色模式（Dark Mode）也叫做作暗黑模式，是一种低光用户界面（low-light UI）。深色模式可降低设备屏幕发出的亮度，同时满足最低色彩对比度，具有一定用处：

- 有助于改善视觉人体工程学，减少眼睛疲劳
- 方便在黑暗环境中使用屏幕
- 节省电池电量

例如，[在 iPhone 或 iPad 中切换深色模式](https://support.apple.com/zh-cn/108350)体验深色模式的效果。

<img src="https://cdsassets.apple.com/live/7WUAS350/images/ios/locale/zh-cn/ios-17-iphone-15-pro-settings-control-center.gif" alt="iOS深色模式切换" style="width: 35%;" />

# 二. 深色模式的兴起与发展

深色模式的概念最早可以追溯到早期的计算机界面设计。在图形用户界面（GUI）出现之前，命令行界面普遍采用浅色文字配深色背景的显示方式。随着Web技术的发展，受印刷品设计影响，白底黑字成为网页设计的主流。

**深色模式的回归背景:**

- CSS3的成熟使得样式定制更加灵活，CSS变量（Custom Properties）的引入为主题切换提供了技术基础。
- JavaScript引擎性能的提升，使得实时主题切换成为可能。
- 现代显示技术的发展，特别是OLED屏幕的普及，凸显了深色模式在节能方面的优势。
- 随着移动设备使用时间的增加，用户对夜间浏览体验的要求不断提高,用户需求的转变推动了深色模式的普及。
- 系统级深色模式的支持（如macOS的Dark Mode和Windows的夜间模式），也促使网页开发者必须考虑深色模式的实现。

# 三. 一些深色模式规范

## 1. TDesign

[TDesign的深色模式](https://tdesign.tencent.com/design/dark)也叫 Dark Mode（暗黑模式）——暗黑模式是一种夜间友好的颜色主题，主要侧重于UI界面中每个元素可读性所需的最小色彩对比度，以保证出色的阅读体验。

<img src="https://static.tdesign.tencent.com/assets/starter-UABtSUhJ.png" alt="TDesign深色模式" style="width: 80%;" />

### 设计原则：

- 内容优先：优先保证内容的识别度，确保文本内容易于阅读。
- 阅读舒适度：使用低饱和度或稍微柔和的颜色会减少人眼的视觉疲劳。
- 信息层级一致性：浅色模式和深色模式下转换时应该保持信息层级一致性。
- 符合 WCAG2.0 标准：依据 WCAG2.0 设计标准，文本的视觉呈现以及文本图像至少要有 1:4.5 的对比度。

### 配置方式：

给 `html` 增加 `theme-mode` 属性来控制浅色/暗色展示：

```javascript
// 设置暗色模式
document.documentElement.setAttribute('theme-mode', 'dark');
// 重置为浅色模式
document.documentElement.removeAttribute('theme-mode');
```

### 实现原理：

css variables（自定义属性）

## 2. Ant Design

[Ant Design 的暗黑模式](https://ant.design/docs/spec/dark-cn)——把所有 UI 换成黑色或者深色的一个主题模式。对此，Ant Design给出了两种使用场景：

- 当需要**长时间在暗光环境下工作**时，建议使用暗黑模式，减小亮度对比带来的视觉压力，保证使用者的体验舒适。
- 当需要**沉浸式的专注工作内容**时，建议使用暗黑模式，可以帮助使用者更关注凸显出来的内容和操作。

### 设计原则：

- 内容的舒适性：避免使用对比很强的色彩或内容，长时间使用会带来疲劳感。
- 信息的一致性：暗黑模式下的信息内容需要和浅色模式保持一致性，不应该打破原有的层级关系。

### 实现原理：

Ant Design将暗黑模式是作为众多主题模式中的一种，因为实现的原理是相同的。

<img src="src/assets/articles/articles2025-1-2-1.png" alt="Ant Design主题系统" style="width: 80%;" />

### 配置方式：

Ant Design 深色模式的配置方式和配置其他主题模式一样，通过修改 Design Token来呈现不同的主题。这种方式使得 And Design的主题配置非常灵活。

- 支持动态切换主题;
- 支持同时存在多个主题；
- 支持针对某个/某些组件修改主题变量；

#### 方式1：修改主题变量

```jsx
<ConfigProvider
  theme={{
    token: {
      // Seed Token，影响范围大
      colorPrimary: '#00b96b',
      borderRadius: 2,

      // 派生变量，影响范围小
      colorBgContainer: '#f6ffed',
    },
  }}
>
  <Space>
    <Button type="primary">Primary</Button>
    <Button>Default</Button>
  </Space>
</ConfigProvider>
```

#### 方式2：使用预设的暗色算法——theme.darkAlgorithm

```jsx
<ConfigProvider
  theme={{
    darkAlgorithm: darkAlgorithm,
  }}
>
  ...
</ConfigProvider>
```

### 实现原理

CSS-in-JS

## 3. Apple Developer

[Apple Developer对深色模式的定义](https://developer.apple.com/cn/design/human-interface-guidelines/dark-mode)是——深色模式是一种系统范围的外观设置，使用深色调色盘为低光环境提供舒适的浏览体验。

### 设计原则（最佳实践）：

- 避免提供 App 特定的外观设置
- 确保 App 在两种外观模式下都能很好地呈现
- 测试你的内容以确保在两种外观模式下都能保持舒适易读
- 在极少数情况下，可以考虑在界面中只使用深色外观（例如股票面板）
- 颜色原则：
  - 包含适合当前外观的颜色。
  - 力求所有外观都有足够的颜色对比度：至少要确保颜色之间的对比度不低于 4.5:1。对于自定义前景色和背景色，应尽量将对比度设为 7:1，尤其是在小文本中。
  - 柔化白色背景的颜色：如果显示的内容图像包含白色背景，应考虑略微调暗图像，以防止背景在周围的深色模式环境中发光。
- 图标原则：
  - 尽可能使用 SF 符号（使用动态颜色来着色）
  - 如有必要，为浅色和深色外观设计单独的界面图标。
  - 确保全彩图像和图标在两种外观中都有良好的效果。

<img src="../../../../../assets/articles/articles2025-1-2-2.png" alt="Apple深色模式指南" style="width:80%;" />

# 四. 网页开发中如何适配深色模式？

结合上述 TDesign 和 And Design 对深色模式的实现方案，可以得到网页开发中最常见的两种适配方案——**CSS变量**和**CSS-in-JS**。

这两种方案的原理其实是相同的，核心在于将涉及到深色模式的css属性用变量赋值，再在不同模式中去改变这些变量。

### 方案一：CSS 变量

首先，假设我们在项目中定义了一组主题样式变量：

```css
:root {
  --color-primary-6: #1677FF;
  --color-bg-container: #fff;
}
```

当开启深色模式后，需要在更高的优先级将变量的值更新：

```css
:root {
  --color-primary-6: #177ddc;
  --color-bg-container: #001529;
}
```

### 方案二：CSS-in-JS

首先，假设我们在项目中实现样式时引用了css变量：

```css
:root {
  color: var(--color-primary-6, #177ddc);
  background-color: var(--color-bg-container, #fff);
}
```

当开启深色模式后，需要将对应的css变量重新赋值：

```jsx
<ConfigProvider
  style={{
    '--color-primary-6': '#177ddc',
    '--color-bg-container': '#001529',
  }}
/>
```
