import { useEffect, useRef } from 'react';

interface ComponentRendererProps {
  html?: string;
  css?: string;
  js?: string;
  style?: React.CSSProperties;
}

export default function ComponentRenderer({ html, css, js,style }: ComponentRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    // 清空容器
    container.innerHTML = '';

    // 创建样式元素
    if (css) {
      const styleElement = document.createElement('style');
      styleElement.textContent = css;
      container.appendChild(styleElement);
    }

    // 创建 HTML 内容
    if (html) {
      const htmlElement = document.createElement('div');
      htmlElement.innerHTML = html;
      htmlElement.style.width = 'fit-content';
      htmlElement.style.height = 'fit-content';
      htmlElement.style.display = 'flex';
      htmlElement.style.alignItems = 'center';
      htmlElement.style.justifyContent = 'center';
      htmlElement.style.flexShrink = '0';
      container.appendChild(htmlElement);
    }

    // 执行 JavaScript
    if (js) {
      try {
        // 创建一个安全的函数来执行 JavaScript
        const scriptElement = document.createElement('script');
        scriptElement.textContent = js;
        container.appendChild(scriptElement);
      } catch (error) {
        console.error('Error executing component JavaScript:', error);
      }
    }

    // 清理函数
    return () => {
      if (container) {
        container.innerHTML = '';
      }
    };
  }, [html, css, js]);

  return (
    <div
      ref={containerRef}
      style={{
        width: 'fit-content',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...style,
      }}
    />
  );
}
