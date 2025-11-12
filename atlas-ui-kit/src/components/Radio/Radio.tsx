import React, { useId } from 'react';
import { RadioDefault, RadioChecked } from '../../icons';
import './Radio.css';

export interface RadioProps
	extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'checked'> {
	checked: boolean;
	disabled?: boolean;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	children?: React.ReactNode;
}

const Radio: React.FC<RadioProps> = ({
	checked,
	disabled = false,
	onChange,
	children,
	...props
}) => {
	const id = useId();

	const Icon = checked ? <RadioChecked /> : <RadioDefault />;

	return (
		<label className={`radio ${disabled ? 'radio--disabled' : ''}`}>
			<input
				{...props}
				id={id}
				type='radio'
				className='radio__input'
				disabled={disabled}
				checked={checked}
				onChange={onChange}
			/>
			<span className='radio__icon'>{Icon}</span>
			{children && <span className='radio__label'>{children}</span>}
		</label>
	);
};

export default Radio;
