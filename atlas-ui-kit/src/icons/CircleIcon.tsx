// src/icons/CircleIcon.tsx
import React from 'react';

interface CircleIconProps {
  size?: number;
  color?: string;
  strokeWidth?: number;
}

const CircleIcon: React.FC<CircleIconProps> = ({
  size = 20,
  color = 'currentColor',
  strokeWidth = 2,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ pointerEvents: 'none' }} // чтобы не мешал кликам
    >
      <circle
        cx="10"
        cy="10"
        r="8"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default CircleIcon;