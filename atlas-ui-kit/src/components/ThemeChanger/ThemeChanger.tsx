import React from 'react';
import './ThemeChanger.css';
import SunIcon from '../../icons/SunIcon';
import MoonIcon from '../../icons/MoonIcon';
import { useTheme } from '../../providers/ThemeProdiver';

interface ThemeToggleProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  disabled?: boolean;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({
  disabled = false,
  onClick,
  ...props
}) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    toggleTheme();
    onClick?.(e);
  };

  return (
    <button
      {...props}
      className={`theme_toggle ${disabled ? 'theme-toggle--disabled' : ''}`}
      disabled={disabled}
      onClick={handleClick}
    >
      <span className="button_icon">
        {isDark ? <MoonIcon size={20} /> : <SunIcon size={20} />}
      </span>
    </button>
  );
};

export default ThemeToggle;