import React from 'react';
import { IconProps } from '../types/IconProps';

const CheckIcon: React.FC<IconProps> = ({ size = 20, color = 'currentColor', ...props }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ pointerEvents: 'none' }}
    >
      <path
        d="M7 10l3 3 6-6"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default CheckIcon;