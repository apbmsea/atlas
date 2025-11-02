import React from 'react';
import { IconProps } from '../types/IconProps';

const ArrowLeftIcon: React.FC<IconProps> = ({ size = 20, color = 'currentColor', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox='0 0 20 20'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <path
      d='M12.5415 3.39961L7.1082 8.83294C6.46654 9.47461 6.46654 10.5246 7.1082 11.1663L12.5415 16.5996'
      stroke={color}
      strokeWidth='1.5'
      strokeMiterlimit='10'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

export default ArrowLeftIcon;
