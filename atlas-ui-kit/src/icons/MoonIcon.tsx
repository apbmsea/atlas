import React from 'react';
import { IconProps } from '../types/IconProps';

const MoonIcon: React.FC<IconProps> = ({ size = 20, color = 'currentColor', ...props }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 21 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">

      <path d="M0.77716 11.1748C1.13716 16.3248 5.50716 20.5148 10.7372 20.7448C14.4272 20.9048 17.7272 19.1848 19.7072 16.4748C20.5272 15.3648 20.0872 14.6248 18.7172 14.8748C18.0472 14.9948 17.3572 15.0448 16.6372 15.0148C11.7472 14.8148 7.74716 10.7248 7.72716 5.89484C7.71716 4.59484 7.98716 3.36484 8.47716 2.24484C9.01716 1.00484 8.36716 0.414844 7.11716 0.944844C3.15716 2.61484 0.44716 6.60484 0.77716 11.1748Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  );
};

export default MoonIcon;