import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon, LandButton } from '@suminhan/land-design';
import './BackButton.scss';

interface BackButtonProps {
  to?: string; // 可选的跳转路径，如果不传则默认返回上一页
  onClick?: () => void; // 可选的点击事件处理
  className?: string;
  style?: React.CSSProperties;
}

const BackButton: React.FC<BackButtonProps> = ({ to, onClick, className = '', style }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (to) {
      navigate(to);
    } else {
      navigate(-1); // 默认行为：返回上一页
    }
  };

  return (
    <div className={`back-btn-wrapper ${className}`} style={style}>
      <LandButton 
        type='fill' 
        onClick={handleClick} 
        icon={<Icon name='last-step' strokeWidth={4}/>}
        className="back-btn-circle"
      />
    </div>
  );
};

export default BackButton;

