import React from 'react';
import { IconProps } from '../types/IconProps';

const ArrowRightIcon: React.FC<IconProps> = ({ size = 20, color = 'currentColor', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox='0 0 20 20'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <path
      d='M7.4585 3.39961L12.8918 8.83294C13.5335 9.47461 13.5335 10.5246 12.8918 11.1663L7.4585 16.5996'
      stroke={color}
      strokeWidth='1.5'
      strokeMiterlimit='10'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

export default ArrowRightIcon;
