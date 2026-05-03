import React from 'react';
import style from './ThemeSwitcherWidget.module.scss';
import { useTheme } from 'atlas-ui-kit';

export const ThemeSwitcherWidget: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={style.appearance}>
      <button
        type="button"
        className={`${style.themeCard} ${theme === 'dark' ? style.themeCard__active : ''}`}
        onClick={() => { if (theme !== 'dark') toggleTheme(); }}
      >
        <div className={`${style.themePreview} ${style.themePreview__dark}`} />
        <div className={style.themeLabel}>Тёмная</div>
      </button>

      <button
        type="button"
        className={`${style.themeCard} ${theme === 'light' ? style.themeCard__active : ''}`}
        onClick={() => { if (theme !== 'light') toggleTheme(); }}
      >
        <div className={`${style.themePreview} ${style.themePreview__light}`} />
        <div className={style.themeLabel}>Светлая</div>
      </button>
    </div>
  );
};

