import { 
  LandDrawer, 
  type DrawerProps,
  LandRadioGroup,
  LandInput,
} from '@suminhan/land-design'
import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { createComponent, updateComponent, type CreateComponentData, type UpdateComponentData } from '../../services/componentService'
import type { ComponentItem } from '../../types'
import CodeEditor from '../CodeEditor'
import ComponentRenderer from '../ComponentRenderer'
import { getAspectRatio } from '../../hooks/getAspectRatio'

interface RatioOption {
  key: string;
  label: string;
}

type Props = {
  initialRatio?: string;
  onSuccess?: () => void;
  editingComponent?: ComponentItem | null;
} & DrawerProps

const CreateDrawer: React.FC<Props> = ({
  initialRatio = '1:1',
  onSuccess,
  editingComponent,
  ...restProps
}) => {
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    ratio: initialRatio,
    desc: '',
    html: '',
    css: '',
    js: '',
    width: '1280',
    height: '720',
    })

  const isEditMode = !!editingComponent
  
  // 本地缓存key
  const CACHE_KEY = 'create_drawer_form_data'

    const ratios: RatioOption[] = [
    { key: '16:9', label: '16:9' },
    { key: '9:16', label: '9:16' },
    { key: '4:5', label: '4:5' },
    { key: '5:4', label: '5:4' },
    { key: '3:4', label: '3:4' },
    { key: '4:3', label: '4:3' },
    { key: '1:1', label: '1:1' }
  ]

  // 保存表单数据到本地缓存
  const saveToCache = useCallback(() => {
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify(formData))
      showMessage('已保存到本地缓存', 'success')
    } catch (error) {
      console.error('保存到缓存失败:', error)
      showMessage('保存到缓存失败')
    }
  }, [formData])

  // 从本地缓存加载表单数据
  const loadFromCache = useCallback(() => {
    try {
      const cachedData = localStorage.getItem(CACHE_KEY)
      if (cachedData) {
        const parsedData = JSON.parse(cachedData)
        return parsedData
      }
    } catch (error) {
      console.error('从缓存加载失败:', error)
    }
    return null
  }, [])

  // 清空本地缓存
  const clearCache = useCallback(() => {
    try {
      localStorage.removeItem(CACHE_KEY)
    } catch (error) {
      console.error('清空缓存失败:', error)
    }
  }, [])

  // 处理键盘快捷键
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    // 检测 Cmd+S (Mac) 或 Ctrl+S (Windows/Linux)
    if ((event.metaKey || event.ctrlKey) && event.key === 's') {
      event.preventDefault() // 阻止浏览器默认保存行为
      saveToCache()
    }
  }, [saveToCache])

  // 当编辑模版或初始类别变化时更新表单
  useEffect(() => {
    if (editingComponent) {
      // 编辑模式：填入模版数据
      setFormData({
        name: editingComponent.name,
        ratio: editingComponent.ratio,
        desc: editingComponent.desc || '',
        html: editingComponent.html || '',
        css: editingComponent.css || '',
        js: editingComponent.js || '',
        width: editingComponent.width || '1280',
        height: editingComponent.height || '720',
      })
    } else {
      // 创建模式：尝试从缓存加载，否则使用默认值
      const cachedData = loadFromCache()
      if (cachedData) {
        setFormData({
          ...cachedData,
          ratio: cachedData.ratio || initialRatio
        })
      } else {
        setFormData(prev => ({
          ...prev,
          ratio: initialRatio
        }))
      }
    }
  }, [editingComponent, initialRatio, loadFromCache])

  // 添加键盘事件监听器
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleKeyDown])


  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  // 获取当前登录用户的ID
  const getCurrentUserId = (): string | null => {
    if (!user || !user.id) {
      return null
    }
    return user.id
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

  const handleSubmit = async () => {
      if (!formData.name.trim()) {
      showMessage('请输入标题')
      return
    }

    if (!formData.ratio) {
      showMessage('请选择比例')
      return
    }

    setLoading(true)
    try {

      if (isEditMode && editingComponent) {
        // 编辑模式：更新模版
        const updateData: UpdateComponentData = {
          name: formData.name.trim(),
          ratio: formData.ratio,
          desc: formData.desc.trim() || undefined,
          html: formData.html.trim(),
          css: formData.css.trim(),
          js: formData.js.trim(),
        }

        await updateComponent(editingComponent.id, updateData)
        showMessage('更新成功！', 'success')
      } else {
        // 创建模式：创建新模版
        const currentUserId = getCurrentUserId()
        if (!currentUserId) {
          showMessage('用户未登录，请先登录')
          return
        }

        const componentData: CreateComponentData = {
          name: formData.name.trim(),
          ratio: formData.ratio,
          desc: formData.desc.trim() || undefined,
          html: formData.html.trim(),
          css: formData.css.trim(),
          js: formData.js.trim(),
          user_id: currentUserId
        }

        await createComponent(componentData)
        showMessage('创建成功！', 'success')
      }
      
      // 重置表单（仅在创建模式下）
      if (!isEditMode) {
        setFormData({
          name: '',
          ratio: initialRatio,
          desc: '',
          html: '',
          css: '',
          js: '',
          width: '1280',
          height: '720',
        })
        clearCache() // 创建成功后清空缓存
      }

      // 调用成功回调
      onSuccess?.()
    } catch (error) {
      console.error(isEditMode ? '更新模版失败:' : '创建模版失败:', error)
      showMessage(isEditMode ? '更新失败，请重试' : '创建失败，请重试')
    } finally {
      setLoading(false)
    }
  }

  const submitDisabled = useMemo(() => {
    return loading || !formData.name || !formData.ratio || !formData.html
  }, [loading, formData])

  return (
    <LandDrawer
      mask
      title={isEditMode ? "编辑模版" : "新建模版"}
      size="large"
      onSubmit={handleSubmit}
      submitLabel={loading ? (isEditMode ? '更新中...' : '创建中...') : (isEditMode ? '确定更新' : '确定创建')}
      cancelLabel={isEditMode ? "取消" : "重置"}
      submitDisabled={submitDisabled}
      onCancel={() => {
        if (!isEditMode) {
          setFormData({
            name: '',
            ratio: initialRatio,
            width: '1280',
            height: '720',
            desc: '',
            html: '',
            css: '',
            js: '',
          })
          clearCache() // 清空本地缓存
        }
      }}
      {...restProps}
    >
      <div className="h-full flex text-xs">
        {/* 左侧表单区域 */}
        <div className="flex-1 flex flex-col gap-5 overflow-y-auto p-4 border-r border-gray-200">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">标题 <span className="text-red-500">*</span></label>
          <LandInput
            type="background"
            value={formData.name}
            onChange={(value) => handleInputChange('name', value)}
            placeholder="请输入模版标题"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">类别 <span className="text-red-500">*</span></label>
          <LandRadioGroup
              checked={formData.ratio}
            onChange={(value) => handleInputChange('ratio', value)}
            data={ratios}
          />
        </div>

        <div className='flex gap-2'>
          <div className='flex-1 flex flex-col gap-2'>
          <label className="block text-sm font-medium text-gray-700 mb-2">宽度</label>
          <LandInput
            type="background"
            value={formData.width}
            onChange={(value) => handleInputChange('width', value)}
            placeholder="请输入模版宽度（可选）"
          />
          </div>
          <div className='flex-1 flex flex-col gap-2'>
          <label className="block text-sm font-medium text-gray-700 mb-2">高度</label>
           <LandInput
            type="background"
            value={formData.height}
            onChange={(value) => handleInputChange('height', value)}
            placeholder="请输入模版高度（可选）"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">描述</label>
          <LandInput
            type="background"
            value={formData.desc}
            onChange={(value) => handleInputChange('desc', value)}
            placeholder="请输入模版描述（可选）"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">HTML</label>
          <CodeEditor
            value={formData.html}
            onChange={(value) => handleInputChange('html', value)}
            language="html"
            placeholder="请输入HTML代码"
            height="400px"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">CSS</label>
          <CodeEditor
            value={formData.css}
            onChange={(value) => handleInputChange('css', value)}
            language="css"
            placeholder="请输入CSS代码"
            height="300px"
          />
        </div>
        </div>

        {/* 右侧预览区域 */}
        <div className="w-[50%] p-4 flex items-center justify-center flex-shrink-0">
        <div className="relative w-[400px] bg-white border border-gray-200 overflow-hidden" style={{ aspectRatio: getAspectRatio(formData.ratio) }}>
                {formData.html || formData.css || formData.js ? (
                  <ComponentRenderer
                    html={formData.html}
                    css={formData.css}
                    js={formData.js}
                    style={{
                      transform: `scale(${400/(Number(formData.width)||400)})`,
                      transformOrigin: 'top left',
                    }}
                  />
                ) : (
                  <div className="flex gap-2 items-center justify-center h-full">
                    <div className="preview-element w-2 h-2 bg-gray-300 rounded-full"></div>
                    <div className="preview-element w-2 h-2 bg-gray-300 rounded-full"></div>
                    <div className="preview-element w-2 h-2 bg-gray-300 rounded-full"></div>
                  </div>
                )}
              </div>
        </div>
      </div>
    </LandDrawer>
  )
}

export default CreateDrawer