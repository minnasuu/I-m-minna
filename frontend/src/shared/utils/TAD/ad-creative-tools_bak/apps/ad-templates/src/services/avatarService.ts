import { supabase } from '../../supaClient';

class AvatarService {
  private readonly BUCKET_NAME = 'I-am-minna'; // Supabase Storage bucket 名称
  
  /**
   * 获取头像的签名URL（适用于私有存储）
   * 每次调用都重新从 Supabase Storage 获取，不使用任何缓存
   * @param avatarPath 存储在user_metadata中的头像路径
   * @returns Promise<string | null> 可访问的签名URL
   */
  async getAvatarUrl(avatarPath?: string): Promise<string | null> {
    if (!avatarPath) return null;
    
    // 如果已经是完整的HTTP URL，直接返回
    if (avatarPath.startsWith('http://') || avatarPath.startsWith('https://')) {
      return avatarPath;
    }
    
    try {
      // 每次都重新从 Supabase Storage 获取签名URL，不使用缓存
      const { data, error } = await supabase.storage
        .from(this.BUCKET_NAME)
        .createSignedUrl(avatarPath, 60); // 1小时有效期
      
      if (error) {
        console.error('获取头像签名URL失败:', error);
        return null;
      }
      
      return data?.signedUrl || null;
    } catch (error) {
      console.error('Error getting avatar URL:', error);
      return null;
    }
  }

  /**
   * 获取默认头像内容（基于用户名或邮箱的首字母）
   * @param user 用户对象
   * @returns 默认头像的配置
   */
  getDefaultAvatarContent(user: { email: string; user_metadata?: { username?: string } }) {
    const displayName = user.user_metadata?.username || user.email;
    const firstLetter = displayName.charAt(0).toUpperCase();
    
    return {
      letter: firstLetter,
      backgroundColor: this.getColorFromString(displayName)
    };
  }

  /**
   * 根据字符串生成一致的颜色
   * @param str 字符串
   * @returns CSS颜色值
   */
  
  private getColorFromString(str: string): string {
    const colors = [
      '#3B82F6', // blue-500
      '#EF4444', // red-500
      '#10B981', // emerald-500
      '#F59E0B', // amber-500
      '#8B5CF6', // violet-500
      '#EC4899', // pink-500
      '#06B6D4', // cyan-500
      '#84CC16', // lime-500
    ];
    
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    return colors[Math.abs(hash) % colors.length];
  }
}

export const avatarService = new AvatarService();
