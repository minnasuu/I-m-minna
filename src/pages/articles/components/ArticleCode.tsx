import React, { type CSSProperties } from "react";
import { useState } from "react";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

type Props = {
  language?: string;
  codeStr?: string;
  style?: CSSProperties;
  className?: string;
}
const ArticleCode: React.FC<Props> = ({
  language = 'text',
  codeStr = '',
  style,
  className = '',
}) => {
  const [isCopied, setIsCopied] = useState<number>(-1);
  const handleCopy = async () => {
    if (!codeStr) return;
    try {
      await navigator.clipboard.writeText(codeStr);
      setIsCopied(1);
    } catch (err) {
      setIsCopied(2);
    }
  };
  return <div className={`flex flex-col w-full rounded-lg bg-gray border-box border border-gray-2 overflow-hidden ${className}`} style={style}>
    <div className="flex items-center justify-between px-16 py-12 w-full bg-gray-3 border-b border-gray-2 border-box">
      <p className="font-bold">{language}</p>
      <div className="flex items-center gap-12">
        <button onClick={handleCopy}>复制</button>
      </div>
    </div>
    <SyntaxHighlighter
      language={language}
      wrapLongLines
      showLineNumbers
        customStyle={{
          // 自定义容器样式
          borderRadius: "8px",
          backgroundColor: "#f0f0f0",
          padding: "20px",
        }}
      >
      {codeStr.trim()}
    </SyntaxHighlighter>
    {isCopied > 0 && (
      <div>{isCopied > 1 ? "复制失败,您的浏览器不支持剪贴板操作" : "复制成功！"}</div>
    )}
  </div>
};
export default ArticleCode;
