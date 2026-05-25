import React from 'react';
import type { IconProps } from './types';

export const EditIcon: React.FC<IconProps> = ({
  size = 20,
  color = 'currentColor',
  ...props
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
    {...props}
  >
    <path
      d="M11.05 3.00002L4.20833 9.84169C3.875 10.175 3.66667 10.6084 3.625 11.075L3.41667 13.3334L5.675 13.125C6.14167 13.0834 6.575 12.875 6.90833 12.5417L13.75 5.70002L11.05 3.00002Z"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9.375 4.67502L14.325 9.62502"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M3.75 16.25H16.25"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
