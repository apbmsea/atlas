import React from 'react';
import './Switch.css';

interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  disabled?: boolean;
}

const Switch: React.FC<SwitchProps> = ({
  disabled,
  children,
  id,
  ...props
}) => {
  const autoId = React.useId();
  const inputId = id || autoId;

  return (
    <>
      <input
        {...props}
        id={inputId}
        type="checkbox"
        className="switch-input"
        disabled={disabled}
      />
      <label htmlFor={inputId} className="switch-label">
        <span className="switch-track"></span>
        <span className="switch-thumb"></span>
        {children}
      </label>
    </>
  );
};

export default Switch;