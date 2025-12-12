import { supabase } from '../../supaClient';
import type { ComponentItem, ComponentInstance } from '../types';

/**
 * 从HTML中提取所有图片并上传到Supabase Storage
 * @param html HTML字符串
 * @param templateId 模板ID，用于创建存储路径
 * @returns 返回更新后的HTML和上传的图片信息
 */
export async function extractAndUploadImages(html: string, templateId: string): Promise<{
  updatedHtml: string;
  uploadedImages: Array<{ originalSrc: string; storagePath: string; publicUrl: string }>;
}> {
  if (!html) return { updatedHtml: html, uploadedImages: [] };

  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const images = doc.querySelectorAll('img');
  const uploadedImages: Array<{ originalSrc: string; storagePath: string; publicUrl: string }> = [];

  for (let i = 0; i < images.length; i++) {
    const img = images[i];
    const src = img.getAttribute('src');
    
    if (!src || src.startsWith('http://') || src.startsWith('https://')) {
      // 跳过外部链接的图片
      continue;
    }

    if (src.startsWith('data:')) {
      // 处理base64图片
      try {
        const response = await fetch(src);
        const blob = await response.blob();
        
        // 生成文件名
        const timestamp = Date.now();
        const random = Math.random().toString(36).substring(2);
        const extension = blob.type.split('/')[1] || 'png';
        const fileName = `${timestamp}-${random}.${extension}`;
        const storagePath = `ad-creative-tools/templates/${templateId}/${fileName}`;

        // 上传到Supabase Storage
        const { error } = await supabase.storage
          .from('I-am-minna') // 使用现有的bucket
          .upload(storagePath, blob, {
            contentType: blob.type,
            upsert: false
          });

        if (error) {
          console.error('Image upload error:', error);
          continue;
        }

        // 获取公共URL
        const { data: urlData } = supabase.storage
          .from('I-am-minna')
          .getPublicUrl(storagePath);

        const publicUrl = urlData.publicUrl;

        // 更新图片src
        img.setAttribute('src', publicUrl);

        uploadedImages.push({
          originalSrc: src,
          storagePath,
          publicUrl
        });

      } catch (error) {
        console.error('Error processing base64 image:', error);
      }
    }
  }

  return {
    updatedHtml: doc.body.innerHTML,
    uploadedImages
  };
}

/**
 * 从DOM元素中获取当前的HTML内容
 * @param containerElement 包含可编辑内容的容器元素
 * @returns 当前的HTML内容
 */
export function getCurrentEditedHtml(containerElement?: HTMLElement): string {
  if (!containerElement) {
    return '';
  }

  // 查找容器内的iframe（ComponentRenderer可能使用iframe）
  const iframe = containerElement.querySelector('iframe');
  if (iframe && iframe.contentDocument && iframe.contentDocument.body) {
    return iframe.contentDocument.body.innerHTML;
  }

  // 如果没有iframe，直接获取容器内容
  // 但要排除一些不需要的元素（如上传覆盖层等）
  const clonedContainer = containerElement.cloneNode(true) as HTMLElement;
  
  // 移除上传覆盖层和文件输入元素
  const overlays = clonedContainer.querySelectorAll('.upload-overlay');
  const fileInputs = clonedContainer.querySelectorAll('input[type="file"]');
  
  overlays.forEach(overlay => overlay.remove());
  fileInputs.forEach(input => input.remove());

  return clonedContainer.innerHTML;
}

/**
 * 生成唯一的实例ID
 */
function generateInstanceId(): string {
  return 'instance-' + Date.now() + '-' + Math.random().toString(36).substring(2, 9);
}

/**
 * 添加模板实例到数据库
 * @param templateId 原始模板ID
 * @param instanceData 实例数据
 * @param userId 当前用户ID
 * @returns 更新后的模板数据
 */
export async function addTemplateInstance(
  templateId: string,
  instanceData: {
    name: string;
    html: string;
    css?: string;
    js?: string;
    width?: string;
    height?: string;
  },
  userId: string
): Promise<ComponentItem> {
  try {
    // 1. 获取当前模板数据
    const { data: template, error: fetchError } = await supabase
      .from('adTemplateList')
      .select('*')
      .eq('id', templateId)
      .single();

    if (fetchError || !template) {
      throw new Error('模板不存在或获取失败');
    }

    // 2. 处理图片上传
    const { updatedHtml, uploadedImages } = await extractAndUploadImages(instanceData.html, templateId);

    // 3. 创建实例对象
    const newInstance: ComponentInstance = {
      id: generateInstanceId(),
      name: instanceData.name,
      ratio: template.ratio,
      desc: template.desc,
      html: updatedHtml,
      css: instanceData.css || template.css,
      js: instanceData.js || template.js,
      user_id: userId,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      width: instanceData.width || template.width,
      height: instanceData.height || template.height,
    };

    // 4. 更新模板的instance_templates字段
    const currentInstances = template.instance_templates || [];
    const updatedInstances = [...currentInstances, newInstance];

    const { data: updatedTemplate, error: updateError } = await supabase
      .from('adTemplateList')
      .update({
        instance_templates: updatedInstances,
        updated_at: new Date().toISOString()
      })
      .eq('id', templateId)
      .select()
      .single();

    if (updateError) {
      // 如果数据库更新失败，尝试删除已上传的图片
      for (const image of uploadedImages) {
        await supabase.storage
          .from('I-am-minna')
          .remove([image.storagePath]);
      }
      throw updateError;
    }

    return updatedTemplate;

  } catch (error) {
    console.error('Error adding template instance:', error);
    throw error;
  }
}

/**
 * 获取模板的所有实例
 * @param templateId 模板ID
 * @returns 模板实例列表
 */
export async function getTemplateInstances(templateId: string): Promise<ComponentInstance[]> {
  try {
    const { data: template, error } = await supabase
      .from('adTemplateList')
      .select('instance_templates')
      .eq('id', templateId)
      .single();

    if (error || !template) {
      return [];
    }

    return template.instance_templates || [];
  } catch (error) {
    console.error('Error fetching template instances:', error);
    return [];
  }
}

/**
 * 删除模板实例
 * @param templateId 模板ID
 * @param instanceId 实例ID
 * @returns 更新后的模板数据
 */
export async function removeTemplateInstance(templateId: string, instanceId: string): Promise<ComponentItem> {
  try {
    // 1. 获取当前模板数据
    const { data: template, error: fetchError } = await supabase
      .from('adTemplateList')
      .select('*')
      .eq('id', templateId)
      .single();

    if (fetchError || !template) {
      throw new Error('模板不存在或获取失败');
    }

    // 2. 过滤掉要删除的实例
    const currentInstances = template.instance_templates || [];
    const updatedInstances = currentInstances.filter((instance: ComponentInstance) => instance.id !== instanceId);

    // 3. 更新数据库
    const { data: updatedTemplate, error: updateError } = await supabase
      .from('adTemplateList')
      .update({
        instance_templates: updatedInstances,
        updated_at: new Date().toISOString()
      })
      .eq('id', templateId)
      .select()
      .single();

    if (updateError) {
      throw updateError;
    }

    // 4. 清理相关的存储文件（可选）
    // TODO: 实现图片文件清理逻辑

    return updatedTemplate;

  } catch (error) {
    console.error('Error removing template instance:', error);
    throw error;
  }
}
