import React from 'react';
import { IconProps } from '../types/IconProps';
const RadioChecked: React.FC<IconProps> = ({
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
		<circle cx='10' cy='10' r='9.5' stroke={color} />
		<circle cx='10' cy='10' r='5' fill={color} />
	</svg>
);
export default RadioChecked;
