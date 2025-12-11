import type { ReactNode } from 'react';

export interface SidebarThemeConfig {
  /** 主题类名前缀，用于样式定制 */
  themePrefix: string;
  /** 链接颜色，用于替换腾讯/Tencent链接 */
  linkColor?: string;
  /** 自定义渲染某些section */
  customRenderers?: {
    avatar?: (avatarUrl: string) => ReactNode;
  };
}
