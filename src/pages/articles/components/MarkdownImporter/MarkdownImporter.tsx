import React, { useState } from 'react';
import { LandDrawer, LandButton, LandUpload, LandTextArea, Icon } from '@suminhan/land-design';
import { parseMarkdownToComponents } from './markdownParser';
import { ComponentPreview } from './ComponentPreview';
import './MarkdownImporter.css';

interface MarkdownImporterProps {
  visible: boolean;
  onClose: () => void;
}

export interface ParsedComponent {
  id: string;
  type: string;
  props: any;
  content?: string;
}

const MarkdownImporter: React.FC<MarkdownImporterProps> = ({ visible, onClose }) => {
  const [markdownContent, setMarkdownContent] = useState<string>('');
  const [parsedComponents, setParsedComponents] = useState<ParsedComponent[]>([]);
  const [isPreviewMode, setIsPreviewMode] = useState<boolean>(false);
  const [editingIndex, setEditingIndex] = useState<number>(-1);

  const handleFileUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      setMarkdownContent(content);
      handleParseMarkdown(content);
    };
    reader.readAsText(file);
  };

  const handleParseMarkdown = (content: string = markdownContent) => {
    try {
      const components = parseMarkdownToComponents(content);
      setParsedComponents(components);
      setIsPreviewMode(true);
    } catch (error) {
      console.error('解析Markdown失败:', error);
    }
  };

  const handleEditComponent = (index: number, newProps: any) => {
    const updatedComponents = [...parsedComponents];
    updatedComponents[index] = { ...updatedComponents[index], props: newProps };
    setParsedComponents(updatedComponents);
  };

  const handleDeleteComponent = (index: number) => {
    const updatedComponents = parsedComponents.filter((_, i) => i !== index);
    setParsedComponents(updatedComponents);
  };

  const handleCopyCode = () => {
    const codeString = generateComponentCode(parsedComponents);
    navigator.clipboard.writeText(codeString);
  };

  const generateComponentCode = (components: ParsedComponent[]) => {
    return components.map(component => {
      switch (component.type) {
        case 'title':
          return `<ArticleTitle type="${component.props.type}" title="${component.props.title}" />`;
        case 'desc':
          return `<ArticleDesc${component.props.noIndent ? ' noIndent' : ''}${component.props.useBg ? ' useBg' : ''}>\n  ${component.content}\n</ArticleDesc>`;
        case 'code':
          return `<ArticleCode language="${component.props.language}" codeStr={\`${component.props.codeStr}\`} />`;
        case 'image':
          return `<ArticleImage url="${component.props.url}" alt="${component.props.alt}" />`;
        case 'list':
          return `<ArticleList ${component.props.ordered ? 'ordered ' : ''}list={${JSON.stringify(component.props.list)}} />`;
        case 'table':
          return `<ArticleTable>\n  ${component.content}\n</ArticleTable>`;
        default:
          return `<!-- Unknown component type: ${component.type} -->`;
      }
    }).join('\n\n');
  };

  const handleReset = () => {
    setMarkdownContent('');
    setParsedComponents([]);
    setIsPreviewMode(false);
    setEditingIndex(-1);
  };

  return (
    <LandDrawer
      visible={visible}
      onClose={onClose}
      title="Markdown 导入工具"
      width={800}
      className="markdown-importer-drawer"
    >
      <div className="markdown-importer-container">
        {!isPreviewMode ? (
          <div className="import-section">
            <div className="upload-section">
              <h3>上传 Markdown 文件</h3>
              <LandUpload
                accept=".md,.markdown"
                onChange={(files) => files[0] && handleFileUpload(files[0])}
                showFileList={false}
              >
                <div className="upload-area">
                  <Icon name="upload" />
                  <p>点击或拖拽上传 .md 文件</p>
                </div>
              </LandUpload>
            </div>

            <div className="divider">或</div>

            <div className="textarea-section">
              <h3>直接输入 Markdown</h3>
              <LandTextArea
                value={markdownContent}
                onChange={(value) => setMarkdownContent(value)}
                placeholder="在此输入或粘贴 Markdown 内容..."
                rows={12}
              />
            </div>

            <div className="action-buttons">
              <LandButton
                type="primary"
                text="解析预览"
                onClick={() => handleParseMarkdown()}
                disabled={!markdownContent.trim()}
              />
            </div>
          </div>
        ) : (
          <div className="preview-section">
            <div className="preview-header">
              <h3>组件预览 ({parsedComponents.length} 个组件)</h3>
              <div className="preview-actions">
                <LandButton
                  type="transparent"
                  text="重新编辑"
                  onClick={() => setIsPreviewMode(false)}
                />
                <LandButton
                  type="success"
                  text="复制代码"
                  onClick={handleCopyCode}
                />
                <LandButton
                  type="danger"
                  text="重置"
                  onClick={handleReset}
                />
              </div>
            </div>

            <div className="components-list">
              {parsedComponents.map((component, index) => (
                <ComponentPreview
                  key={component.id}
                  component={component}
                  index={index}
                  isEditing={editingIndex === index}
                  onEdit={(newProps) => handleEditComponent(index, newProps)}
                  onDelete={() => handleDeleteComponent(index)}
                  onStartEdit={() => setEditingIndex(index)}
                  onCancelEdit={() => setEditingIndex(-1)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </LandDrawer>
  );
};

export default MarkdownImporter;


