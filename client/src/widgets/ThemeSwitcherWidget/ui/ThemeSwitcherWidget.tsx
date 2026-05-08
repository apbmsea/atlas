import React from 'react';
import style from './ThemeSwitcherWidget.module.scss';
import { useTheme } from 'atlas-ui-kit';

export const ThemeSwitcherWidget: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <section className={style.widget} aria-label="Выбор темы">
      <div className={style.widget__head}>
        <div className={style.widget__title}>Выбор темы</div>
        <div className={style.widget__hint}>Текущая</div>
      </div>

      <div className={style.appearance}>
        <button
          type="button"
          className={`${style.themeCard} ${theme === 'dark' ? style.themeCard__active : ''}`}
          onClick={() => { if (theme !== 'dark') toggleTheme(); }}
        >
          <div
            className={`${style.themePreview} ${style.themePreview__dark} ${
              theme === 'dark' ? style.themePreview__active : ''
            }`}
          >
            {theme === 'dark' && <span className={style.activeMark} aria-hidden />}
          </div>
          <div className={`${style.themeLabel} ${theme === 'dark' ? style.themeLabel__active : ''}`}>Тёмная</div>
        </button>

        <button
          type="button"
          className={`${style.themeCard} ${theme === 'light' ? style.themeCard__active : ''}`}
          onClick={() => { if (theme !== 'light') toggleTheme(); }}
        >
          <div
            className={`${style.themePreview} ${style.themePreview__light} ${
              theme === 'light' ? style.themePreview__active : ''
            }`}
          >
            {theme === 'light' && <span className={style.activeMark} aria-hidden />}
          </div>
          <div className={`${style.themeLabel} ${theme === 'light' ? style.themeLabel__active : ''}`}>Светлая</div>
        </button>
      </div>
    </section>
  );
};

