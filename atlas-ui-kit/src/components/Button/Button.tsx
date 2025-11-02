import React from 'react';
import './Button.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode;
	leftIcon?: React.ReactNode;
	rightIcon?: React.ReactNode;
	loading?: boolean;
	variant?: 'primary' | 'secondary';
}

const Button: React.FC<ButtonProps> = ({
	children,
	leftIcon,
	rightIcon,
	loading,
	variant = 'primary',
	...props
}) => {
	return (
		<button
			{...props}
			className={`button ${variant} ${loading ? 'button--loading' : ''}`}
			disabled={props.disabled || loading}
		>
			<span className='button__content' style={{ visibility: loading ? 'hidden' : 'visible' }}>
				{leftIcon && <span className='button__icon'>{leftIcon}</span>}
				<span className='button__text'>{children}</span>
				{rightIcon && <span className='button__icon'>{rightIcon}</span>}
			</span>

			{loading && <span className='button__spinner' />}
		</button>
	);
};

export default Button;