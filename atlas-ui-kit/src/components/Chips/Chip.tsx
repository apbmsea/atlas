import React from 'react';
import './Chip.css';
import CloseIcon from '../../icons/CloseIcon';

interface ChipProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
}

const Chip: React.FC<ChipProps> = ({
  children,
  size = 'medium',
  disabled = false,
  ...restProps
}) => {
  return (
    <div
      className={`chip chip__${size} ${disabled ? 'chip__disabled' : ''}`}
      {...restProps}
    >
      <span className="chip__text">{children}</span>
      <button
        type="button"
        className="chip__remove"
        disabled={disabled}
        aria-label="Удалить чип"
      >
        <CloseIcon size={20} color={disabled ? 'var(--text-tertiary)' : 'currentColor'} />
      </button>
    </div>
  );
};

export default Chip;