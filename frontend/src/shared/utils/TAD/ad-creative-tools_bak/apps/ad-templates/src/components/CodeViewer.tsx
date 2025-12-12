import React from 'react';
import Editor from '@monaco-editor/react';

interface CodeViewerProps {
  value: string;
  language: 'html' | 'css' | 'javascript';
  height?: string;
}

const CodeViewer: React.FC<CodeViewerProps> = ({
  value,
  language,
  height = '200px'
}) => {
  const getLanguageConfig = (lang: string) => {
    const baseOptions = {
      minimap: { enabled: false },
      scrollBeyondLastLine: false,
      wordWrap: 'on' as const,
      automaticLayout: true,
      fontSize: 13,
      lineNumbers: 'on' as const,
      folding: false,
      lineDecorationsWidth: 0,
      lineNumbersMinChars: 3,
      renderLineHighlight: 'none' as const,
      selectOnLineNumbers: true,
      roundedSelection: false,
      readOnly: true, // 设置为只读
      cursorStyle: 'line' as const,
      tabSize: 2,
      insertSpaces: true,
      detectIndentation: false,
      trimAutoWhitespace: true,
      wordBasedSuggestions: 'off' as const,
      suggestOnTriggerCharacters: false, // 禁用建议
      acceptSuggestionOnEnter: 'off' as const,
      acceptSuggestionOnCommitCharacter: false,
      snippetSuggestions: 'none' as const,
      emptySelectionClipboard: false,
      mouseWheelZoom: false, // 禁用鼠标滚轮缩放
      multiCursorModifier: 'ctrlCmd' as const,
      formatOnPaste: false,
      formatOnType: false,
      bracketPairColorization: {
        enabled: true
      },
      contextmenu: false, // 禁用右键菜单
      scrollbar: {
        vertical: 'auto' as const,
        horizontal: 'auto' as const,
        verticalScrollbarSize: 8,
        horizontalScrollbarSize: 8
      },
      overviewRulerBorder: false,
      hideCursorInOverviewRuler: true,
      overviewRulerLanes: 0,
    };

    switch (lang) {
      case 'html':
        return {
          language: 'html',
          theme: 'vs-light',
          options: baseOptions
        };
      case 'css':
        return {
          language: 'css',
          theme: 'vs-light',
          options: baseOptions
        };
      case 'javascript':
        return {
          language: 'javascript',
          theme: 'vs-light',
          options: baseOptions
        };
      default:
        return {
          language: 'plaintext',
          theme: 'vs-light',
          options: baseOptions
        };
    }
  };

  const config = getLanguageConfig(language);

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
      <Editor
        height={height}
        language={config.language}
        theme={config.theme}
        value={value}
        options={config.options}
        loading={
          <div className="flex items-center justify-center h-full bg-gray-50">
            <div className="text-gray-500 text-sm">加载代码中...</div>
          </div>
        }
      />
    </div>
  );
};

export default CodeViewer;
