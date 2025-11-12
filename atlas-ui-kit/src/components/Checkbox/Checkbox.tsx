import React, { useId } from 'react';
import {
  CheckboxDefault,
  CheckboxChecked,
  CheckboxMinus
} from '../../icons';
import './Checkbox.css';

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'checked'> {
  checked: boolean;
  disabled?: boolean;
  variant?: 'primary' | 'secondary';
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  children?: React.ReactNode;
}

const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  disabled = false,
  variant = 'primary',
  onChange,
  children,
  ...props
}) => {
  const id = useId();

  const icons = {
    primary: { unchecked: <CheckboxDefault />, checked: <CheckboxChecked /> },
    secondary: { unchecked: <CheckboxDefault />, checked: <CheckboxMinus /> }
  };

  const Icon = checked ? icons[variant].checked : icons[variant].unchecked;

  return (
    <label className={`checkbox ${disabled ? 'checkbox--disabled' : ''}`}>
      <input
        {...props}
        id={id}
        type="checkbox"
        className="checkbox__input"
        disabled={disabled}
        checked={checked}
        onChange={onChange}
      />

      <span className="checkbox__icon">{Icon}</span>
      {children && <span className="checkbox__label">{children}</span>}
    </label>
  );
};

export default Checkbox;
