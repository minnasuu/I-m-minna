import React from "react";
import getRandomRgbaColor from "../../../../shared/utils/getRandomRgba";
import SectorWheel from "./SectorWheel";
import ArticleMarkdown from "../../components/ArticleMarkdown";
import articleMd from "./data.md?raw";

// 创建基础轮盘示例
const BasicSectorWheel = () => (
  <div className="w-full flex justify-center">
    <SectorWheel
      size={400}
      sectorData={[
        ...Array.from({ length: 10 }).map((_i, idx) => ({
          deg: 36,
          id: `sector-${idx}`,
          color: getRandomRgbaColor(0.3),
        })),
      ]}
      startDeg={0}
      strokeWidth={2}
    />
  </div>
);

// 创建包含文字的轮盘示例
const TextSectorWheel = () => (
  <SectorWheel
    size={400}
    sectorData={[
      ...Array.from({ length: 10 }).map((_i, idx) => ({
        deg: 36,
        id: `sector-${idx}`,
        color: getRandomRgbaColor(0.3),
        component: (
          <div
            className="flex items-center w-full h-full color-gray-3 font-bold"
            style={{ paddingLeft: "24px" }}
          >
            {idx + 1}
          </div>
        ),
      })),
    ]}
    startDeg={0}
    strokeWidth={2}
    style={{ margin: "20px auto" }}
  />
);

// 创建包含图片的轮盘示例
const ImageSectorWheel = () => (
  <SectorWheel
    size={400}
    sectorData={[
      ...[47.5, 66, 23, 23, 23, 23, 23.5, 32.5, 98.5].map((i, idx) => ({
        deg: i,
        id: `sector-${idx + 1}`,
        color: getRandomRgbaColor(0.1),
      })),
    ]}
    strokeWidth={2}
    startDeg={-72}
    style={{ margin: "20px auto" }}
    defaultImgUrl="https://qzonestyle.gdtimg.com/gdt_ui_proj/imghub/dist/eqq-home-rotary-circle-icons-full-new-0324.png?max_age=31536000"
  />
);

// 组件映射表
const componentMap = {
  BasicSectorWheel: <BasicSectorWheel />,
  TextSectorWheel: <TextSectorWheel />,
  ImageSectorWheel: <ImageSectorWheel />,
};

// 解析 markdown 内容并替换组件标记
const parseMarkdownWithComponents = (content: string) => {
  const parts: React.ReactNode[] = [];
  const componentRegex = /\{\{(\w+)\}\}/g;
  let lastIndex = 0;
  let match;
  let partIndex = 0;

  while ((match = componentRegex.exec(content)) !== null) {
    // 添加组件前的 markdown 内容
    if (match.index > lastIndex) {
      const markdownContent = content.slice(lastIndex, match.index);
      if (markdownContent.trim()) {
        parts.push(
          <ArticleMarkdown key={`markdown-${partIndex}`}>
            {markdownContent}
          </ArticleMarkdown>
        );
        partIndex++;
      }
    }

    // 添加组件
    const componentName = match[1] as keyof typeof componentMap;
    if (componentMap[componentName]) {
      parts.push(
        <div key={`component-${partIndex}`}>{componentMap[componentName]}</div>
      );
      partIndex++;
    }

    lastIndex = match.index + match[0].length;
  }

  // 添加最后剩余的 markdown 内容
  if (lastIndex < content.length) {
    const remainingContent = content.slice(lastIndex);
    if (remainingContent.trim()) {
      parts.push(
        <ArticleMarkdown key={`markdown-${partIndex}`}>
          {remainingContent}
        </ArticleMarkdown>
      );
    }
  }

  return parts;
};

export const svg_interactive_wheel = (
  <div>{parseMarkdownWithComponents(articleMd)}</div>
);
