import ComponentRenderer from './ComponentRenderer';
import type { ComponentItem } from '../types';
import { useEffect, useRef, useState } from 'react';
import { getUserInfo } from '../services/userService';
import { useAuth } from '../contexts/AuthContext';
import { getAspectRatio } from '../hooks/getAspectRatio';

interface ComponentCardProps {
  component: ComponentItem;
  onEdit?: (component: ComponentItem) => void;
  onDetail?: (component: ComponentItem) => void;
}

export default function ComponentCard({
  component,
  onEdit,
  onDetail,
}: ComponentCardProps) {
  const { user } = useAuth();
  const [avatarUrl, setAvatarUrl] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [contentWidth, setContentWidth] = useState<number>(400);
  const cardRef = useRef<HTMLDivElement>(null);

  // 检查当前用户是否是组件的创建者
  const isOwner = user && user.id === component.user_id;

  const fetchUserInfo = async (userId: string) => {
    try {
      const user = await getUserInfo(userId);

      if (user) {
        setUsername(user.username || "Unknown User");
        setAvatarUrl(user.avatar_url || "");
      } else {
        setUsername("Unknown User");
        setAvatarUrl("");
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
      setUsername("Unknown User");
      setAvatarUrl("");
    }
  };
  useEffect(() => {
    fetchUserInfo(component.user_id);
  }, [component.user_id]);
  const handleCardClick = () => {
    if (onDetail) {
      onDetail(component);
    }
  };
  useEffect(() => {
    if(!cardRef.current) return;
    setContentWidth(cardRef.current.clientWidth - 32);
    const handleResize = () => {
      setContentWidth(Number(cardRef.current?.clientWidth) - 32 || 400);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [cardRef]);

  return (
    <div
      ref={cardRef}
      className="flex flex-col gap-4 h-full border border-gray-100 rounded-[16px] p-4 transition-shadow transition-transform duration-300 cursor-pointer hover:shadow-lg hover:border-gray-200"
      onClick={handleCardClick}
    >
      <div className="flex-1 flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <h3 className="text-sm">{component.name}</h3>
          </div>
          <div className="flex items-center gap-2">
            {isOwner && onEdit && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(component);
                }}
                className="text-gray-400 hover:text-gray-600 transition-colors duration-300 p-1"
                title="编辑组件"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="m18.5 2.5 3 3L12 15l-4 1 1-4 9.5-9.5z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            )}
            <div
              className="text-gray-500 text-xs px-2 py-1 rounded-md bg-gray-100"
            >
              {component.ratio}
            </div>
          </div>
        </div>

        {component.desc && (
          <div className="mt-2">
            <p className="text-xs text-gray-600 line-clamp-2">
              {component.desc}
            </p>
          </div>
        )}


        <div className="flex justify-between items-center mt-auto">
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden flex-shrink-0 ring-1 ring-gray-100">
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt={username || "User"}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback to initials if image fails to load
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                    const parent = target.parentElement;
                    if (parent) {
                      parent.innerHTML = `<span class="text-xs text-gray-500 font-medium">${
                        username?.charAt(0).toUpperCase() || "U"
                      }</span>`;
                    }
                  }}
                />
              ) : (
                <span className="text-xs text-gray-500 font-medium">
                  {username?.charAt(0).toUpperCase() || "U"}
                </span>
              )}
            </div>
            <span
              className="text-gray-600 text-xs truncate hover:text-gray-900 transition-colors"
              title={username || "Unknown User"}
            >
              {username || "Unknown User"}
            </span>
          </div>
          <span className="text-gray-500 text-xs flex-shrink-0 ml-2">
            {new Date(component.created_at).toLocaleDateString()}
          </span>
        </div>
      </div>

      <div className="relative w-[400px] mx-auto bg-white rounded-[12px] border border-gray-200 overflow-hidden" style={{width:`${contentWidth}px`,aspectRatio: getAspectRatio(component.ratio)}}>
        {component.html || component.css || component.js ? (
          <ComponentRenderer
            html={component.html}
            css={component.css}
            js={component.js}
            style={{
              transform: `scale(${contentWidth/(Number(component.width)||contentWidth)})`,
              transformOrigin: 'top left',
            }}
          />
        ) : (
          <div className="flex gap-2 items-center justify-center h-full">
            <div className="preview-element w-2 h-2 bg-gray-600 rounded-full"></div>
            <div className="preview-element w-2 h-2 bg-gray-600 rounded-full"></div>
            <div className="preview-element w-2 h-2 bg-gray-600 rounded-full"></div>
          </div>
        )}
      </div>

      {/* 实例展示区域 */}
      {component.instance_templates && component.instance_templates.length > 0 && (
       <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
       {component.instance_templates.map((instance) => (
         <div
           key={instance.id}
           className="flex-shrink-0 w-[80px] bg-white rounded-sm border border-gray-200 overflow-hidden hover:border-gray-300 transition-colors cursor-pointer"
           style={{aspectRatio: getAspectRatio(instance.ratio)}}
           title={instance.name}
         >
           {instance.html || instance.css || instance.js ? (
             <ComponentRenderer
               html={instance.html}
               css={instance.css}
               js={instance.js}
               style={{
                //  transform: `scale(${80/(Number(instance.width)||80)})`,
                transform: `scale(0.0625)`,
                 transformOrigin: 'top left',
               }}
             />
           ) : (
             <div className="flex items-center justify-center h-full">
               <div className="flex gap-1">
                 <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                 <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                 <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
               </div>
             </div>
           )}
         </div>
       ))}
     </div>
      )}
    </div>
  );
}