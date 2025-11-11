import React from 'react';
import Checkbox from '../Checkbox/Checkbox';
import './CheckboxGroup.css';

export interface CheckboxOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface CheckboxGroupProps {
  options: CheckboxOption[];
  value: string[];
  onChange: (selected: string[]) => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  className?: string;
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  options,
  value,
  onChange,
  variant = 'primary',
  disabled = false,
  className
}) => {
  const handleChange = (checked: boolean, optionValue: string) => {
    if (checked) {
      onChange([...value, optionValue]);
    } else {
      onChange(value.filter((v) => v !== optionValue));
    }
  };

  return (
    <div className={`checkbox-group ${className || ''}`}>
      {options.map((option) => (
        <Checkbox
          key={option.value}
          checked={value.includes(option.value)}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleChange(e.target.checked, option.value)
          }
          disabled={disabled || option.disabled}
          variant={variant}
        >
          {option.label}
        </Checkbox>
      ))}
    </div>
  );
};

export default CheckboxGroup;
