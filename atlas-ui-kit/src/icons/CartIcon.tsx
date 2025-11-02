import React from 'react';
import { IconProps } from '../types/IconProps';

const CartIcon: React.FC<IconProps> = ({
	size = 20,
	color = 'currentColor',
	...props
}) => (
	<svg
		width={size}
		height={size}
		viewBox='0 0 20 20'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
		{...props}
	>
		<path
			d='M1.6665 1.66663H3.11651C4.01651 1.66663 4.72484 2.44163 4.64984 3.33329L3.95817 11.6333C3.8415 12.9916 4.9165 14.1583 6.28317 14.1583H15.1582C16.3582 14.1583 17.4082 13.175 17.4998 11.9833L17.9498 5.7333C18.0498 4.34996 16.9998 3.22496 15.6082 3.22496H4.84984'
			stroke={color}
			strokeWidth='1.5'
			strokeMiterlimit='10'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
		<path
			d='M13.5417 18.3333C14.117 18.3333 14.5833 17.867 14.5833 17.2917C14.5833 16.7164 14.117 16.25 13.5417 16.25C12.9664 16.25 12.5 16.7164 12.5 17.2917C12.5 17.867 12.9664 18.3333 13.5417 18.3333Z'
			stroke={color}
			strokeWidth='1.5'
			strokeMiterlimit='10'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
		<path
			d='M6.87516 18.3333C7.45046 18.3333 7.91683 17.867 7.91683 17.2917C7.91683 16.7164 7.45046 16.25 6.87516 16.25C6.29987 16.25 5.8335 16.7164 5.8335 17.2917C5.8335 17.867 6.29987 18.3333 6.87516 18.3333Z'
			stroke={color}
			strokeWidth='1.5'
			strokeMiterlimit='10'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
		<path
			d='M7.5 6.66663H17.5'
			stroke={color}
			strokeWidth='1.5'
			strokeMiterlimit='10'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
	</svg>
);

export default CartIcon;
