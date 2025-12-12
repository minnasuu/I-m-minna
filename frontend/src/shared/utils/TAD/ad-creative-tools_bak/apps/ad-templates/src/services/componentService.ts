import { supabase } from '../../supaClient';
import type { ComponentItem } from '../types';

// 生成随机int8类型的唯一ID (0-127)
async function generateUniqueInt8Id(): Promise<number> {
  const maxAttempts = 10;
  let attempts = 0;
  
  while (attempts < maxAttempts) {
    // 生成0-127之间的随机整数 (int8的正数范围)
    const randomId = Math.floor(Math.random() * 128);
    
    try {
      // 检查这个ID是否已经存在
      const { error } = await supabase
        .from('adTemplateList')
        .select('id')
        .eq('id', randomId)
        .single();
      
      // 如果查询出错且错误是"没有找到记录"，说明ID可用
      if (error && error.code === 'PGRST116') {
        return randomId;
      }
      
      // 如果没有错误，说明ID已存在，继续尝试
      attempts++;
    } catch (error) {
      console.error('Error checking ID uniqueness:', error);
      attempts++;
    }
  }
  
  // 如果尝试多次都没有找到唯一ID，抛出错误
  throw new Error('Unable to generate unique int8 ID after multiple attempts');
}

// 获取所有组件数据
export async function getComponents(): Promise<ComponentItem[]> {
  try {
    const { data, error } = await supabase
      .from('adTemplateList')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching components:', error);
      throw error;
    }

    if (!data || data.length === 0) {
      return [];
    }

    return data;
  } catch (error) {
    console.error('Error in getComponents:', error);
    throw error;
  }
}

// 根据分类获取组件
export async function getComponentsByRatio(ratio: string): Promise<ComponentItem[]> {
  try {
    const { data, error } = await supabase
      .from('adTemplateList')
      .select('*')
      .eq('ratio', ratio)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching components by ratio:', error);
      throw error;
    }

    if (!data || data.length === 0) {
      return [];
    }

    return data;
  } catch (error) {
    console.error('Error in getComponentsByRatio:', error);
    throw error;
  }
}

// 获取用户上传的组件
export async function getUserComponents(userId: string): Promise<ComponentItem[]> {
  try {
    const { data, error } = await supabase
      .from('adTemplateList')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching user components:', error);
      throw error;
    }

    if (!data || data.length === 0) {
      return [];
    }

    return data;
  } catch (error) {
    console.error('Error in getUserComponents:', error);
    throw error;
  }
}

// 创建新组件
export interface CreateComponentData {
  name: string;
  ratio: string;
  desc?: string;
  html?: string;
  css?: string;
  js?: string;
  user_id: string;
  width?: string;
  height?: string;
}
export async function createComponent(componentData: CreateComponentData): Promise<ComponentItem> {
  console.log(componentData);
  
  try {
    // 生成唯一的int8 ID
    const uniqueId = await generateUniqueInt8Id();
    
    const { data, error } = await supabase
      .from('adTemplateList')
      .insert([{
        id: uniqueId,
        name: componentData.name,
        ratio: componentData.ratio,
        desc: componentData.desc || '',
        html: componentData.html || '',
        css: componentData.css || '',
        js: componentData.js || '',
        user_id: componentData.user_id,
        width: componentData.width || '1280',
        height: componentData.height || '720',
        updated_at: new Date().toISOString().split('T')[0]
      }])
      .select()
      .single();

    if (error) {
      console.error('Error creating component:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error in createComponent:', error);
    throw error;
  }
}

// 更新组件
export interface UpdateComponentData {
  name: string;
  ratio: string;
  desc?: string;
  html?: string;
  css?: string;
  js?: string;
  width?: string;
  height?: string;
}

export async function updateComponent(id: string, componentData: UpdateComponentData): Promise<ComponentItem> {
  try {
    const { data, error } = await supabase
      .from('adTemplateList')
      .update({
        name: componentData.name,
        ratio: componentData.ratio,
        desc: componentData.desc || '',
        html: componentData.html || '',
        css: componentData.css || '',
        js: componentData.js || '',
        width: componentData.width || '1280',
        height: componentData.height || '720',
        updated_at: new Date().toISOString().split('T')[0]
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating component:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error in updateComponent:', error);
    throw error;
  }
}
