import { useEffect, useMemo, useRef, useState } from 'react';
import ComponentRenderer from './ComponentRenderer';
import CodeViewer from './CodeViewer';
import type { ComponentItem } from '../types';
import { getUserInfo } from '../services/userService';
import { Icon, LandButton, LandDialog } from '@suminhan/land-design';
import { getAspectRatio } from '../hooks/getAspectRatio';
import { addTemplateInstance, getCurrentEditedHtml } from '../services/instanceService';
import { useAuth } from '../contexts/AuthContext';
import type { ComponentInstance } from '../types';

interface ComponentDetailModalProps {
  component: ComponentItem | null;
  isOpen: boolean;
  onClose: () => void;
  components?: ComponentItem[];
  onNavigate?: (component: ComponentItem) => void;
}


const ComponentDetailModal:React.FC<ComponentDetailModalProps> = ({ component, isOpen, onClose, components = [], onNavigate }) => {
  const [avatarUrl, setAvatarUrl] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [copySuccess, setCopySuccess] = useState<{ [key: string]: boolean }>({});
  const [contentWidth, setContentWidth] = useState<number>(966);
  const [codeVisible, setCodeVisible] = useState<boolean>(false);
  const [isAddingInstance, setIsAddingInstance] = useState<boolean>(false);
  const [currentInstance, setCurrentInstance] = useState<ComponentInstance | null>(null);
  const [viewMode, setViewMode] = useState<'template' | 'instance'>('template');
  const contentRef = useRef<HTMLDivElement>(null);
  const componentRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  // 获取当前组件在列表中的索引
  const getCurrentIndex = () => {
    if (!component || !components.length) return -1;
    return components.findIndex(c => c.id === component.id);
  };

  // 导航到上一个组件
  const navigatePrevious = () => {
    const currentIndex = getCurrentIndex();
    if (currentIndex <= 0 || !components.length) return;
    
    const previousComponent = components[currentIndex - 1];
    if (onNavigate && previousComponent) {
      onNavigate(previousComponent);
    }
  };

  // 导航到下一个组件
  const navigateNext = () => {
    const currentIndex = getCurrentIndex();
    if (currentIndex === -1 || currentIndex >= components.length - 1) return;
    
    const nextComponent = components[currentIndex + 1];
    if (onNavigate && nextComponent) {
      onNavigate(nextComponent);
    }
  };

  // 检查是否可以导航
  const canNavigatePrevious = () => {
    const currentIndex = getCurrentIndex();
    return currentIndex > 0;
  };

  const canNavigateNext = () => {
    const currentIndex = getCurrentIndex();
    return currentIndex !== -1 && currentIndex < components.length - 1;
  };

  // 切换到实例查看模式
  const handleInstanceClick = (instance: ComponentInstance) => {
    setCurrentInstance(instance);
    setViewMode('instance');
    setCodeVisible(false); // 切换时隐藏代码
  };


  // 重置视图状态当组件改变时
  useEffect(() => {
    setCurrentInstance(null);
    setViewMode('template');
    setCodeVisible(false);
  }, [component?.id]);

  const fetchUserInfo = async (userId: string) => {
    try {
      const user = await getUserInfo(userId);
      
      if (user) {
        setUsername(user.username || 'Unknown User');
        setAvatarUrl(user.avatar_url || '');
      } else {
        setUsername('Unknown User');
        setAvatarUrl('');
      }
    } catch (error) {
      console.error('Error fetching user info:', error);
      setUsername('Unknown User');
      setAvatarUrl('');
    }
  };

  useEffect(() => {
    if (component?.user_id) {
      fetchUserInfo(component.user_id);
    }
  }, [component?.user_id]);

  // 监听键盘事件
  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
          e.preventDefault();
          navigatePrevious();
          break;
        case 'ArrowRight':
        case 'ArrowDown':
          e.preventDefault();
          navigateNext();
          break;
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeydown);
      // 禁止背景滚动
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeydown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose, navigatePrevious, navigateNext]);

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopySuccess({ ...copySuccess, [type]: true });
      setTimeout(() => {
        setCopySuccess({ ...copySuccess, [type]: false });
      }, 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  useEffect(() => {
    if (!contentRef.current) return;
    
    const handleResize = () => {
      setContentWidth(contentRef.current?.clientWidth || 966);
    };
    
    // 初始设置宽度
    handleResize();
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const getEditablehtml = (html: string) => {
    // 给所有文字元素加上 contenteditable="true"
    if (!html) return html;
    
    // 创建一个临时的 DOM 解析器
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    
    // 定义可以包含文字的标签
    const textTags = [
      'p', 'span', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'a', 'button', 'label', 'td', 'th', 'li', 'blockquote',
      'strong', 'em', 'b', 'i', 'u', 'small', 'mark', 'del',
      'ins', 'sub', 'sup', 'code', 'pre', 'cite', 'q', 'abbr',
      'time', 'address', 'figcaption', 'dt', 'dd'
    ];
    
    // 生成唯一ID
    const generateId = () => 'upload-' + Math.random().toString(36).substr(2, 9);
    
    // 递归处理所有元素
    const processElement = (element: Element) => {
      const tagName = element.tagName.toLowerCase();
      
      // 处理图片节点
      if (tagName === 'img') {
        const imgElement = element as HTMLImageElement;
        const originalSrc = imgElement.getAttribute('src') || '';
        const originalAlt = imgElement.getAttribute('alt') || '';
        const originalStyle = imgElement.getAttribute('style') || '';
        const originalClass = imgElement.getAttribute('class') || '';
        
        // 生成唯一ID用于文件上传
        const uploadId = generateId();
        
        // 创建包装容器，继承原始图片的样式
        const wrapper = doc.createElement('div');
        wrapper.setAttribute('class', `image-upload-wrapper ${originalClass}`);
        wrapper.setAttribute('style', `${originalStyle}; position: relative; cursor: pointer;`);
        
        // 创建隐藏的文件输入
        const fileInput = doc.createElement('input');
        fileInput.setAttribute('type', 'file');
        fileInput.setAttribute('accept', 'image/*');
        fileInput.setAttribute('id', uploadId);
        fileInput.setAttribute('style', 'display: none;');
        
        // 创建新的图片元素，移除原始样式（已转移到包装容器）
        const newImg = doc.createElement('img');
        newImg.setAttribute('src', originalSrc);
        newImg.setAttribute('alt', originalAlt);
        newImg.setAttribute('style', 'width: 100%; height: 100%; object-fit: inherit; transition: opacity 0.2s;');
        newImg.setAttribute('class', '');
        
        // 创建上传覆盖层
        const overlay = doc.createElement('div');
        overlay.setAttribute('class', 'upload-overlay');
        overlay.setAttribute('style', `
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.2s;
          color: white;
          font-size: 14px;
          font-weight: 500;
          padding: 4px;
          text-align: center;
          backdrop-filter: blur(1px);
        `);
        overlay.textContent = '点击上传';
        
        // 添加点击事件属性
        wrapper.setAttribute('onclick', `document.getElementById('${uploadId}').click()`);
        wrapper.setAttribute('onmouseenter', `this.querySelector('.upload-overlay').style.opacity = '1'`);
        wrapper.setAttribute('onmouseleave', `this.querySelector('.upload-overlay').style.opacity = '0'`);
        
        // 添加文件上传处理
        fileInput.setAttribute('onchange', `
          const file = this.files[0];
          if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
              const img = document.querySelector('#${uploadId}').parentElement.querySelector('img');
              if (img) {
                img.src = e.target.result;
              }
            };
            reader.readAsDataURL(file);
          }
        `);
        
        // 组装元素
        wrapper.appendChild(newImg);
        wrapper.appendChild(overlay);
        wrapper.appendChild(fileInput);
        
        // 替换原始图片
        element.parentNode?.replaceChild(wrapper, element);
        return; // 不需要继续处理子元素
      }
      
      // 检查是否是文本容器标签
      if (textTags.includes(tagName)) {
        // 检查元素是否直接包含文本内容（排除只包含子元素的情况）
        const hasDirectTextContent = Array.from(element.childNodes).some(
          node => node.nodeType === Node.TEXT_NODE && node.textContent?.trim()
        );
        
        // 如果有直接文本内容，或者是常见的文本标签，添加 contenteditable 属性
        if (hasDirectTextContent || ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'span', 'a', 'button', 'label'].includes(tagName)) {
          element.setAttribute('contenteditable', 'true');
          // 添加一些基础样式，防止编辑时样式混乱
          element.setAttribute('style', 
            (element.getAttribute('style') || '') + 
            '; outline: none; cursor: text;'
          );
        }
      }
      
      // 递归处理子元素
      Array.from(element.children).forEach(child => {
        processElement(child);
      });
    };
    
    // 处理 body 中的所有元素
    const bodyElement = doc.body;
    if (bodyElement) {
      Array.from(bodyElement.children).forEach(child => {
        processElement(child);
      });
      
      // 返回处理后的 HTML
      return bodyElement.innerHTML;
    }
    
    return html;
  }

  const hasEditNew = useMemo(() => {
    if (!component) return false;
    return component.html !== getEditablehtml(component.html || '') || component.css !== component.css || component.js !== component.js;
  }, [component?.html, component?.css, component?.js]);
  const handleDownloadImage = async () => {

  }
  
  const showMessage = (message: string, type: 'success' | 'error' = 'error') => {
    // 简单的消息提示实现
    const messageEl = document.createElement('div')
    messageEl.className = `fixed top-4 right-4 z-50 px-4 py-2 rounded-lg text-white ${
      type === 'success' ? 'bg-green-500' : 'bg-red-500'
    }`
    messageEl.textContent = message
    document.body.appendChild(messageEl)
    
    setTimeout(() => {
      document.body.removeChild(messageEl)
    }, 3000)
  }

  const handleAddToInstance = async () => {
    if (!component || !user) {
      showMessage('请先登录');
      return;
    }

    setIsAddingInstance(true);
    
    try {
      // 1. 获取当前编辑后的HTML内容
      const currentHtml = getCurrentEditedHtml(componentRef.current || undefined);
      
      if (!currentHtml) {
        showMessage('无法获取编辑后的内容');
        return;
      }

      // 2. 生成实例名称
      const instanceName = `${component.name} - 实例 ${Date.now()}`;

      // 3. 调用服务添加实例
      await addTemplateInstance(
        component.id,
        {
          name: instanceName,
          html: currentHtml,
          css: component.css,
          js: component.js,
          width: component.width,
          height: component.height,
        },
        user.id
      );

      showMessage('实例添加成功！', 'success');
      
      // 4. 可以触发刷新或更新父组件状态
      // 如果需要的话，可以调用 onNavigate 或其他回调来更新组件数据
      
    } catch (error) {
      console.error('添加实例失败:', error);
      showMessage('添加实例失败，请重试');
    } finally {
      setIsAddingInstance(false);
    }
  }

  if (!isOpen || !component) return null;

  return (
    <LandDialog
      mask
      size='large'
      show={isOpen}
      onClose={onClose}
      footerComponent={null}
      className="w-full mx-4 max-h-[90vh] overflow-hidden"
      title={<><div className="flex items-center gap-4">
        <h2 className="text-md font-semibold text-gray-900">{component.name}</h2>
        <div
          className="text-sm px-3 py-1 rounded-full bg-gray-100"
        >
          {component.ratio}
        </div>
      </div></>}
    >
       {/* 弹窗内容 */}
       <div ref={contentRef} className="relative bg-white w-full h-[65vh] pb-6 flex flex-col overflow-hidden">

        {/* 内容区域 */}
        <div className="flex-1 overflow-y-auto relative box-border">
          {viewMode === 'template' ? (
            // 模板查看模式
            <div ref={componentRef} className="overflow-hidden" style={{width:`${contentWidth}px`,aspectRatio: getAspectRatio(component.ratio)}}>
                {component.html || component.css || component.js ? (
                  <ComponentRenderer
                    html={getEditablehtml(component.html || '')}
                    css={component.css}
                    js={component.js}
                    style={{
                      transform: `scale(${contentWidth/(Number(component.width)||contentWidth)})`,
                      transformOrigin: 'top left',
                    }}
                  />
                ) : (
                  <div className="flex gap-2 items-center justify-center h-full">
                    <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                    <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                    <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                  </div>
                )}
            </div>
          ) : (
            // 实例对比查看模式
            <div className="px-6 h-full flex flex-col">
              
              {/* 对比视图 */}
              <div className="flex-1 flex gap-4 overflow-hidden">
                {/* 原模板 - 左上角缩小显示 */}
                <div className="flex-shrink-0 w-1/3">
                  <div className="mb-2">
                    <h3 className="text-sm font-medium text-gray-700">原模板</h3>
                  </div>
                  <div className="border border-gray-200 rounded-lg overflow-hidden" style={{aspectRatio: getAspectRatio(component.ratio)}}>
                    {component.html || component.css || component.js ? (
                      <ComponentRenderer
                        html={component.html || ''}
                        css={component.css}
                        js={component.js}
                        style={{
                          transform: `scale(${(contentWidth - 24) * 0.3/(Number(component.width)||contentWidth)})`,
                          transformOrigin: 'top left',
                        }}
                      />
                    ) : (
                      <div className="flex gap-2 items-center justify-center h-full">
                        <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                        <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                        <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex-1 px-6 pb-4 pt-4 bg-[rgba(255,255,255,0.6)] backdrop-blur-sm">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-medium text-gray-700">
                      模板实例 ({component?.instance_templates?.length})
                    </h3>
                  </div>
                  <div className="flex gap-3 overflow-x-auto pb-2">
                     {component?.instance_templates?.map((instance) => (
                       <div
                         key={instance.id}
                         onClick={() => handleInstanceClick(instance)}
                         className="flex-shrink-0 cursor-pointer group flex"
                         style={{width: '100px', height: '100px'}}
                       >
                         <div className={`rounded-lg overflow-hidden transition-colors group-hover:shadow-md border-2 ${
                           currentInstance?.id === instance.id 
                             ? 'border-blue-500 shadow-lg' 
                             : 'border-transparent hover:border-blue-300'
                         }`}>
                          <div >
                            {instance.html || instance.css || instance.js ? (
                              <ComponentRenderer
                                html={instance.html || ''}
                                css={instance.css}
                                js={instance.js}
                                style={{
                                  transform: `scale(${100/(Number(instance.width)||100)})`,
                                  transformOrigin: 'top left',
                                }}
                              />
                            ) : (
                              <div className="flex items-center justify-center h-full">
                                <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                                <div className="w-1 h-1 bg-gray-400 rounded-full mx-1"></div>
                                <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* 当前实例 - 主显示区域 */}
                <div className="flex-3">
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-700">实例: {currentInstance?.name}</h3>
                    <span className="text-xs text-gray-500">{currentInstance?.created_at}</span>
                  </div>
                  <div ref={componentRef} className="border border-gray-200 rounded-lg overflow-hidden" style={{aspectRatio: getAspectRatio(component.ratio)}}>
                    {currentInstance && (currentInstance.html || currentInstance.css || currentInstance.js) ? (
                      <ComponentRenderer
                        html={currentInstance.html || ''}
                        css={currentInstance.css}
                        js={currentInstance.js}
                        style={{
                          transform: `scale(${(contentWidth - 24) * 0.65/(Number(currentInstance.width)||contentWidth)})`,
                          transformOrigin: 'top left',
                        }}
                      />
                    ) : (
                      <div className="flex gap-2 items-center justify-center h-full">
                        <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                        <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                        <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

            {/* 代码区域 */}
            <div className={`absolute bottom-0 left-0 right-0 w-full h-full space-y-4 px-6 bg-white ${codeVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
              {/* HTML 代码 */}
              {(viewMode === 'template' ? component.html : currentInstance?.html) && (
                <div className='h-full w-full flex flex-col overflow-y-auto'>
                  <div className="flex items-center justify-between px-2 pb-2">
                    <h4 className="text-sm font-medium text-gray-700">HTML</h4>
                    <LandButton
                    type='text'
                    size='small'
                      onClick={() => copyToClipboard((viewMode === 'template' ? component.html : currentInstance?.html)!, 'html')}
                      className="flex items-center gap-2 px-3 py-1 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                      icon= {copySuccess.html ? (
                        <>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </>
                      ) : (
                        <>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" stroke="currentColor" strokeWidth="2" fill="none"/>
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" stroke="currentColor" strokeWidth="2" fill="none"/>
                          </svg>
                        </>
                      )}
                    >
                    </LandButton>
                  </div>
                  <CodeViewer
                    value={viewMode === 'template' ? (component.html || '') : (currentInstance?.html || '')}
                    language="html"
                    height="320px"
                  />
                </div>
              )}

              {/* CSS 代码 */}
              {(viewMode === 'template' ? component.css : currentInstance?.css) && (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm font-medium text-gray-700">CSS</h4>
                    <button
                      onClick={() => copyToClipboard((viewMode === 'template' ? component.css : currentInstance?.css)!, 'css')}
                      className="flex items-center gap-2 px-3 py-1 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      {copySuccess.css ? (
                        <>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          已复制
                        </>
                      ) : (
                        <>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" stroke="currentColor" strokeWidth="2" fill="none"/>
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" stroke="currentColor" strokeWidth="2" fill="none"/>
                          </svg>
                          复制
                        </>
                      )}
                    </button>
                  </div>
                  <CodeViewer
                    value={viewMode === 'template' ? (component.css || '') : (currentInstance?.css || '')}
                    language="css"
                    height="180px"
                  />
                </div>
              )}

              {/* JavaScript 代码 */}
              {(viewMode === 'template' ? component.js : currentInstance?.js) && (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm font-medium text-gray-700">JavaScript</h4>
                    <button
                      onClick={() => copyToClipboard((viewMode === 'template' ? component.js : currentInstance?.js)!, 'js')}
                      className="flex items-center gap-2 px-3 py-1 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      {copySuccess.js ? (
                        <>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          已复制
                        </>
                      ) : (
                        <>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" stroke="currentColor" strokeWidth="2" fill="none"/>
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" stroke="currentColor" strokeWidth="2" fill="none"/>
                          </svg>
                          复制
                        </>
                      )}
                    </button>
                  </div>
                  <CodeViewer
                    value={viewMode === 'template' ? (component.js || '') : (currentInstance?.js || '')}
                    language="javascript"
                    height="180px"
                  />
                </div>
              )}
            </div>
        </div>
      </div>

      <div className="absolute bottom-4 right-0 w-full flex items-center justify-between gap-2 px-4 box-border">
        <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden flex-shrink-0 ring-1 ring-gray-100">
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt={username || "User"}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                    const parent = target.parentElement;
                    if (parent) {
                      parent.innerHTML = `<span class="text-sm text-gray-500 font-medium">${
                        username?.charAt(0).toUpperCase() || "U"
                      }</span>`;
                    }
                  }}
                />
              ) : (
                <span className="text-sm text-gray-500 font-medium">
                  {username?.charAt(0).toUpperCase() || "U"}
                </span>
              )}
            </div>
            <p className="text-gray-900 font-medium">{username || "Unknown User"}</p>
        </div>
        <div className='flex items-center gap-2'>
            <LandButton 
              disabled={!hasEditNew || isAddingInstance || !user || viewMode === 'instance'} 
              text={isAddingInstance ? '添加中...' : '添加为实例'} 
              onClick={handleAddToInstance}
            />
             {component?.instance_templates?.length && component?.instance_templates?.length > 0 && <LandButton text={viewMode === 'template' ? '查看实例' : '返回模板'} onClick={() => {
               if (viewMode === 'template') {
                 // 切换到实例模式时，默认选中第一个实例
                 if (component.instance_templates && component.instance_templates.length > 0) {
                   setCurrentInstance(component.instance_templates[0]);
                 }
                 setViewMode('instance');
               } else {
                 // 返回模板模式
                 setCurrentInstance(null);
                 setViewMode('template');
               }
             }}/>}
          <LandButton text='下载图片' onClick={handleDownloadImage}/>
          <LandButton
            onClick={() => setCodeVisible(!codeVisible)}
            icon={<Icon name='code'/>}
            text={codeVisible ? '隐藏源码' : (viewMode === 'template' ? '模版源码' : '实例源码')}
          />
        </div>
     {components.length > 1 && <div className="flex items-center gap-2">
      {components.length > 1 && (
        <div className="text-sm text-gray-500">
            {getCurrentIndex() + 1} / {components.length}
          </div>
        )}
        {/* 导航按钮 */}
        {components.length > 1 && (
          <>
            <button
              onClick={navigatePrevious}
              disabled={!canNavigatePrevious()}
              className={`p-2 rounded-lg transition-colors ${
                canNavigatePrevious()
                  ? 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  : 'text-gray-300 cursor-not-allowed'
              }`}
              title="上一个 (←/↑)"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button
              onClick={navigateNext}
              disabled={!canNavigateNext()}
              className={`p-2 rounded-lg transition-colors ${
                canNavigateNext()
                  ? 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  : 'text-gray-300 cursor-not-allowed'
              }`}
              title="下一个 (→/↓)"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </>
        )}
      </div>}
      </div>
    </LandDialog>
  );
}

export default ComponentDetailModal;