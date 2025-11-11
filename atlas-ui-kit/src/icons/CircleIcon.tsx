import React from 'react';
import { IconProps } from '../types/IconProps';

const CircleIcon: React.FC<IconProps> = ({ size = 20, color = 'currentColor', ...props }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ pointerEvents: 'none' }}
    >

      <circle
        cx="10"
        cy="10"
        r="8"
        fill={color}
      />

    </svg>
  );
};

export default CircleIcon;