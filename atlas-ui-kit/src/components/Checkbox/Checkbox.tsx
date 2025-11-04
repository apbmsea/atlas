import React from 'react';
import './Checkbox.css';

interface Checkbox extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: 'checkbox' | 'radio';
  checked?: boolean
  disabled?: boolean
}

const Checkbox: React.FC<Checkbox> = ({
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
        className={`input ${variant}`}
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

export default Checkbox;