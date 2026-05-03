import React, { useMemo, useState } from 'react';
import style from './ProfilePage.module.scss';
import { Select, TextField } from 'atlas-ui-kit';
import { ThemeSwitcherWidget } from '@widgets/ThemeSwitcherWidget';
// import classNames from 'classnames';

// const cx = classNames.bind(style);

type Option = { value: string; label: string };

export const ProfilePage: React.FC = () => {
  const languageOptions: Option[] = useMemo(
    () => [
      { value: 'ru', label: 'Русский язык' },
      { value: 'en', label: 'English' },
    ],
    []
  );

  const regionOptions: Option[] = useMemo(
    () => [
      { value: 'ru', label: 'Россия' },
      { value: 'kz', label: 'Казахстан' },
      { value: 'uz', label: 'Узбекистан' },
    ],
    []
  );

  const [language, setLanguage] = useState('ru');
  const [region, setRegion] = useState('ru');
  const [isBaseOpen, setIsBaseOpen] = useState(true);
  const [section, setSection] = useState<'language' | 'appearance'>('language');

  return (
    <main className={style.page}>
      <section className={style.shell}>
        <aside className={style.sidebar}>
          <div className={style.sidebar__title}>Настройки</div>
          <div className={style.sidebar__search}>
            <TextField placeholder="Поиск" />
          </div>

          <nav className={style.sidebar__nav}>
            <button
              className={style.groupHeader}
              type="button"
              aria-expanded={isBaseOpen}
              onClick={() => setIsBaseOpen((v) => !v)}
            >
              <span>Основные</span>
              <span className={`${style.chevron} ${isBaseOpen ? style.chevron__open : ''}`}>▾</span>
            </button>

            {isBaseOpen && (
              <div className={style.groupItems}>
                <button
                  className={`${style.navItem} ${section === 'language' ? style.navItem__active : ''}`}
                  type="button"
                  onClick={() => setSection('language')}
                >
                  Язык и регион
                </button>
                <button
                  className={`${style.navItem} ${section === 'appearance' ? style.navItem__active : ''}`}
                  type="button"
                  onClick={() => setSection('appearance')}
                >
                  Внешний вид
                </button>
              </div>
            )}
          </nav>
        </aside>

        <section className={style.content}>
          <div className={style.card}>
            {section === 'language' ? (
              <>
                <div className={style.card__title}>Язык и регион</div>
                <div className={style.card__subtitle}>
                  Выберите удобный или соответствующий для вас язык и регион
                </div>

                <div className={style.form}>
                  <div className={style.field}>
                    <div className={style.field__label}>Текущий язык</div>
                    <Select
                      options={languageOptions}
                      defaultValue={language}
                      onChange={(v) => setLanguage(v)}
                    />
                  </div>

                  <div className={style.field}>
                    <div className={style.field__label}>Текущий регион</div>
                    <Select
                      options={regionOptions}
                      defaultValue={region}
                      onChange={(v) => setRegion(v)}
                    />
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className={style.card__title}>Внешний вид</div>
                <div className={style.card__subtitle}>
                  Выберите комфортный для вас внешний вид
                </div>

                <ThemeSwitcherWidget />
              </>
            )}
          </div>
        </section>
      </section>
    </main>
  );
};

