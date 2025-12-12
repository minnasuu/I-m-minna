import React, { useState, useEffect } from 'react';
import { avatarService } from '../services/avatarService';

interface AvatarProps {
  /** 用户对象 */
  user?: {
    id?: string;
    email: string;
    user_metadata?: {
      username?: string;
      avatar_url?: string;
    };
  };
  /** 直接指定头像URL（用于预览等场景） */
  src?: string;
  /** 头像尺寸 */
  size?: number | string;
  /** 额外的CSS类名 */
  className?: string;
  /** 额外的样式 */
  style?: React.CSSProperties;
  /** 是否显示为圆形 */
  rounded?: boolean;
  /** 点击事件 */
  onClick?: () => void;
}

export default function Avatar({
  user,
  src,
  size = 32,
  className = '',
  style = {},
  rounded = true,
  onClick
}: AvatarProps) {
  const [avatarUrl, setAvatarUrl] = useState<string>('');
  const [loading, setLoading] = useState(false);
  
  const sizeStyle = typeof size === 'number' ? `${size}px` : size;

  useEffect(() => {
    const loadAvatar = async () => {
      // 重置状态，确保每次都是全新加载
      setAvatarUrl('');
      setLoading(false);

      if (src) {
        // 如果直接提供了src，使用它（用于预览场景）
        setAvatarUrl(src);
        return;
      }

      if (!user?.user_metadata?.avatar_url) {
        return;
      }

      setLoading(true);
      try {
        // 每次都重新从数据库获取，不使用任何缓存
        const url = await avatarService.getAvatarUrl(user.user_metadata.avatar_url);
        setAvatarUrl(url || '');
      } catch (error) {
        console.error('加载头像失败:', error);
        setAvatarUrl('');
      } finally {
        setLoading(false);
      }
    };

    loadAvatar();
  }, [src, user?.user_metadata?.avatar_url, user?.email, user?.id]); // 添加更多依赖确保用户完全变化时重新加载

  const containerClass = `
    inline-flex items-center justify-center overflow-hidden
    ${rounded ? 'rounded-full' : 'rounded'}
    ${onClick ? 'cursor-pointer' : ''}
    ${className}
  `.trim();

  const containerStyle: React.CSSProperties = {
    width: sizeStyle,
    height: sizeStyle,
    ...style
  };

  // 获取默认头像配置
  const defaultAvatar = user ? avatarService.getDefaultAvatarContent(user) : null;

  return (
    <div 
      className={containerClass}
      style={containerStyle}
      onClick={onClick}
    >
      {loading ? (
        <div className="w-full h-full bg-gray-200 animate-pulse" />
      ) : avatarUrl ? (
        <img
          src={avatarUrl}
          alt="头像"
          className="w-full h-full object-cover"
          onError={() => {
            setAvatarUrl('');
          }}
        />
      ) : defaultAvatar ? (
        <div
          className="w-full h-full flex items-center justify-center text-white font-medium"
          style={{
            backgroundColor: defaultAvatar.backgroundColor,
            fontSize: `${parseInt(sizeStyle) / 2.5}px`
          }}
        >
          {defaultAvatar.letter}
        </div>
      ) : (
        // 如果没有用户信息，显示默认的灰色头像
        <div
          className="w-full h-full flex items-center justify-center bg-gray-300 text-gray-600 font-medium"
          style={{ fontSize: `${parseInt(sizeStyle) / 2.5}px` }}
        >
          ?
        </div>
      )}
    </div>
  );
}
