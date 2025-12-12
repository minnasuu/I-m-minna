import React from 'react';
import Editor from '@monaco-editor/react';

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  language: 'html' | 'css' | 'javascript';
  placeholder?: string;
  height?: string;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  value,
  onChange,
  language,
  height = '200px'
}) => {
  const handleEditorChange = (value: string | undefined) => {
    onChange(value || '');
  };

  const getLanguageConfig = (lang: string) => {
    switch (lang) {
      case 'html':
        return {
          language: 'html',
          theme: 'one-light',
          options: {
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            wordWrap: 'on' as const,
            automaticLayout: true,
            fontSize: 14,
            lineNumbers: 'on' as const,
            folding: true,
            lineDecorationsWidth: 0,
            lineNumbersMinChars: 0,
            renderLineHighlight: 'none' as const,
            selectOnLineNumbers: true,
            roundedSelection: false,
            readOnly: false,
            cursorStyle: 'line' as const,
            tabSize: 2,
            insertSpaces: true,
            detectIndentation: false,
            trimAutoWhitespace: true,
            wordBasedSuggestions: 'off' as const,
            suggestOnTriggerCharacters: true,
            acceptSuggestionOnEnter: 'on' as const,
            acceptSuggestionOnCommitCharacter: true,
            snippetSuggestions: 'top' as const,
            emptySelectionClipboard: false,
            mouseWheelZoom: true,
            multiCursorModifier: 'ctrlCmd' as const,
            formatOnPaste: true,
            formatOnType: true,
            bracketPairColorization: {
              enabled: true
            },
            backgroundColor: 'transparent'
          }
        };
      case 'css':
        return {
          language: 'css',
          theme: 'vs-light',
          options: {
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            wordWrap: 'on' as const,
            automaticLayout: true,
            fontSize: 14,
            lineNumbers: 'on' as const,
            folding: true,
            lineDecorationsWidth: 0,
            lineNumbersMinChars: 0,
            renderLineHighlight: 'none' as const,
            selectOnLineNumbers: true,
            roundedSelection: false,
            readOnly: false,
            cursorStyle: 'line' as const,
            tabSize: 2,
            insertSpaces: true,
            detectIndentation: false,
            trimAutoWhitespace: true,
            wordBasedSuggestions: 'off' as const,
            suggestOnTriggerCharacters: true,
            acceptSuggestionOnEnter: 'on' as const,
            acceptSuggestionOnCommitCharacter: true,
            snippetSuggestions: 'top' as const,
            emptySelectionClipboard: false,
            mouseWheelZoom: true,
            multiCursorModifier: 'ctrlCmd' as const,
            formatOnPaste: true,
            formatOnType: true,
            bracketPairColorization: {
              enabled: true
            },
            backgroundColor: 'transparent'
          }
        };
      case 'javascript':
        return {
          language: 'javascript',
          theme: 'vs-light',
          options: {
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            wordWrap: 'on' as const,
            automaticLayout: true,
            fontSize: 14,
            lineNumbers: 'on' as const,
            folding: true,
            lineDecorationsWidth: 0,
            lineNumbersMinChars: 0,
            renderLineHighlight: 'none' as const,
            selectOnLineNumbers: true,
            roundedSelection: false,
            readOnly: false,
            cursorStyle: 'line' as const,
            tabSize: 2,
            insertSpaces: true,
            detectIndentation: false,
            trimAutoWhitespace: true,
            wordBasedSuggestions: 'matchingDocuments' as const,
            suggestOnTriggerCharacters: true,
            acceptSuggestionOnEnter: 'on' as const,
            acceptSuggestionOnCommitCharacter: true,
            snippetSuggestions: 'top' as const,
            emptySelectionClipboard: false,
            mouseWheelZoom: true,
            multiCursorModifier: 'ctrlCmd' as const,
            formatOnPaste: true,
            formatOnType: true,
            bracketPairColorization: {
              enabled: true
            },
          }
        };
      default:
        return {
          language: 'plaintext',
          theme: 'vs-light',
          options: {
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            wordWrap: 'on' as const,
            automaticLayout: true,
            fontSize: 14,
            lineNumbers: 'on' as const,
            folding: true,
            lineDecorationsWidth: 0,
            lineNumbersMinChars: 0,
            renderLineHighlight: 'none' as const,
            selectOnLineNumbers: true,
            roundedSelection: false,
            readOnly: false,
            cursorStyle: 'line' as const,
            tabSize: 2,
            insertSpaces: true,
            detectIndentation: false,
            trimAutoWhitespace: true,
            wordBasedSuggestions: 'off' as const,
            suggestOnTriggerCharacters: true,
            acceptSuggestionOnEnter: 'on' as const,
            acceptSuggestionOnCommitCharacter: true,
            snippetSuggestions: 'top' as const,
            emptySelectionClipboard: false,
            mouseWheelZoom: true,
            multiCursorModifier: 'ctrlCmd' as const,
            formatOnPaste: true,
            formatOnType: true,
            bracketPairColorization: {
              enabled: true
            },
          }
        };
    }
  };

  const config = getLanguageConfig(language);

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden pl-2 py-2">
      <Editor
        height={height}
        language={config.language}
        theme={config.theme}
        value={value}
        onChange={handleEditorChange}
        options={config.options}
        loading={
          <div className="flex items-center justify-center h-full bg-gray-100">
            <div className="text-gray-500">加载编辑器中...</div>
          </div>
        }
      />
    </div>
  );
};

export default CodeEditor;
