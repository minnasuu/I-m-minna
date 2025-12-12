import { useState } from 'react';
import Avatar from './Avatar';

interface User {
  id: string;
  email: string;
  user_metadata?: {
    username?: string;
    avatar_url?: string;
    sex?: string;
    is_official?: boolean;
  };
}

interface UserAvatarProps {
  user: User;
  onLogout: () => void;
}

export default function UserAvatar({ user, onLogout }: UserAvatarProps) {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = async () => {
    onLogout();
    setShowDropdown(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex items-center space-x-1 bg-gray-100 hover:bg-gray-200 rounded-full pl-1 pr-3 py-1 transition-colors"
      >
        <Avatar user={user} size={32} />
        <span className="text-sm text-gray-700 hidden sm:block">
          {user.user_metadata?.username || user.email}
        </span>
      </button>

      {showDropdown && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-10">
          <div className="py-1">
            <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-200">
              {user.user_metadata?.username || user.email}
            </div>
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
            >
              退出登录
            </button>
          </div>
        </div>
      )}
    </div>
  );
}