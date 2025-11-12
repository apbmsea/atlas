import React from 'react';
import './Avatar.css';
import ProfileIcon from '../../icons/ProfileIcon';

type AvatarSize = 'small' | 'medium' | 'large';

interface AvatarProps {
  size?: AvatarSize;
  image?: string;
  isActive?: boolean;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

const Avatar: React.FC<AvatarProps> = ({
  size = 'medium',
  image,
  isActive = false,
  className,
  style,
  onClick
}) => {
  const sizeMap: Record<AvatarSize, { avatar: number; icon: number }> = {
    small: { avatar: 32, icon: 20 },
    medium: { avatar: 44, icon: 24 },
    large: { avatar: 56, icon: 28 }
  };

  const sizes = sizeMap[size];

  return (
    <div
      className={`avatar avatar--${size}${isActive ? ' avatar--active' : ''}${className ? ' ' + className : ''}`}
      style={{ width: sizes.avatar, height: sizes.avatar, ...style }}
      onClick={onClick}
    >
      {image ? (
        <img src={image} alt="Avatar" className="avatar__image" />
      ) : (
        <div
          className="avatar__icon"
          style={{
            width: sizes.icon,
            height: sizes.icon,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <ProfileIcon style={{ width: '100%', height: '100%' }} />
        </div>
      )}
      {isActive && <span className="avatar__indicator"></span>}
    </div>
  );
};

export default Avatar;