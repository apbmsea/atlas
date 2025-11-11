import React from 'react';
import Radio from '../Radio/Radio';
import './RadioGroup.css';

export interface RadioOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface RadioGroupProps {
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  className?: string;
}

const RadioGroup: React.FC<RadioGroupProps> = ({
  options,
  value,
  onChange,
  disabled = false,
  className
}) => {
  const handleChange = (optionValue: string) => {
    onChange(optionValue);
  };

  return (
    <div className={`radio-group ${className || ''}`}>
      {options.map((option) => (
        <Radio
          key={option.value}
          checked={value === option.value}
          onChange={() => handleChange(option.value)}
          disabled={disabled || option.disabled}
        >
          {option.label}
        </Radio>
      ))}
    </div>
  );
};

export default RadioGroup;
