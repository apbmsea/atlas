import React from 'react';
import { IconProps } from '../types/IconProps';

const QuestionIcon: React.FC<IconProps> = ({
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
			d='M9.97396 18.3337C14.5763 18.3337 18.3073 14.6027 18.3073 10.0003C18.3073 5.39795 14.5763 1.66699 9.97396 1.66699C5.37159 1.66699 1.64062 5.39795 1.64062 10.0003C1.64062 14.6027 5.37159 18.3337 9.97396 18.3337Z'
			stroke={color}
			strokeWidth='1.5'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
		<path
			d='M7.2832 10.1912V8.79953C7.2832 7.0662 8.5082 6.35787 10.0082 7.22453L11.2165 7.92453L12.4249 8.62453C13.9249 9.4912 13.9249 10.9079 12.4249 11.7745L11.2165 12.4745L10.0082 13.1745C8.5082 14.0412 7.2832 13.3329 7.2832 11.5995V10.1912Z'
			stroke={color}
			strokeWidth='1.5'
			strokeMiterlimit='10'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
	</svg>
);

export default QuestionIcon;
