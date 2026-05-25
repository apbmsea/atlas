import React from 'react';
import style from './ThemeSwitcherWidget.module.scss';
import { useTheme } from 'atlas-ui-kit';
import classNames from 'classnames/bind';

const cx = classNames.bind(style);

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
          className={cx('themeCard', { themeCard__active: theme === 'dark' })}
          onClick={() => { if (theme !== 'dark') toggleTheme(); }}
        >
          <div
            className={cx('themePreview', 'themePreview__dark', { themePreview__active: theme === 'dark' })}
          >
            {theme === 'dark' && <span className={style.activeMark} aria-hidden />}
          </div>
          <div className={cx('themeLabel', { themeLabel__active: theme === 'dark' })}>Тёмная</div>
        </button>

        <button
          type="button"
          className={cx('themeCard', { themeCard__active: theme === 'light' })}
          onClick={() => { if (theme !== 'light') toggleTheme(); }}
        >
          <div
            className={cx('themePreview', 'themePreview__light', { themePreview__active: theme === 'light' })}
          >
            {theme === 'light' && <span className={style.activeMark} aria-hidden />}
          </div>
          <div className={cx('themeLabel', { themeLabel__active: theme === 'light' })}>Светлая</div>
        </button>
      </div>
    </section>
  );
};

