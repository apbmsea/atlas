import React from 'react';
import './Input.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: 'checkbox' | 'radio';
  checked?: boolean
  disabled?: boolean
}

const InputCheckbox: React.FC<InputProps> = ({
  variant = 'checkbox',
  disabled,
  checked,
  children,
  ...restProps
}) => {
  return (
    <div className='container'>
      <input
        type={variant}
        className={`input ${variant} ${checked} ? '' checked : ''`}
        disabled={disabled}
        {...restProps}
        id='input'
      />
      <label htmlFor="input" className={`label`}>
        {children}
      </label>
    </div>
  );
};

export default InputCheckbox;