import React from 'react';
import avatarImg from '../../assets/images/avatar.png';

const AIAvatar: React.FC = () => {
  return (
    <div className="ai-avatar">
      <img src={avatarImg} alt="AI Avatar" />
    </div>
  );
};

export default AIAvatar;
