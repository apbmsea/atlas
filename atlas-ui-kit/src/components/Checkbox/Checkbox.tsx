import React from 'react';
import './Checkbox.css';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: 'checkbox' | 'radio' | 'multi';
  checked?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({
  type = 'checkbox',
  checked = false,
  disabled = false,
  icon,
  children,
  onChange,
  ...props
}) => {
  return (
    <div className="container">
      <input
        {...props}
        type={type}
        className={`input ${type}`}
        disabled={disabled}
        id="input"
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor="input" className="label">
        {icon && <span className="icon">{icon}</span>}
        {children}
      </label>
    </div>
  );
};

export default Checkbox;