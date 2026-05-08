import React, { useMemo, useState } from 'react';
import style from './ProfilePage.module.scss';
import { Select, TextField } from 'atlas-ui-kit';
import { ThemeSwitcherWidget } from '@widgets/ThemeSwitcherWidget';
import { LectureListWidget } from '@widgets/LectureListWidget';
import { BankCardWidget } from '@widgets/BankCardWidget';
// import classNames from 'classnames';

// const cx = classNames.bind(style);

type Option = { value: string; label: string };

type IconProps = { className?: string };

const GearIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path
      d="M12 15.4a3.4 3.4 0 1 0 0-6.8 3.4 3.4 0 0 0 0 6.8Z"
      stroke="currentColor"
      strokeWidth="1.7"
    />
    <path
      d="M19.4 12a7.72 7.72 0 0 0-.08-1l1.76-1.37-1.7-2.94-2.14.86a7.7 7.7 0 0 0-1.73-1l-.32-2.28h-3.4l-.32 2.28a7.7 7.7 0 0 0-1.73 1l-2.14-.86-1.7 2.94L4.68 11a7.72 7.72 0 0 0-.08 1c0 .34.03.67.08 1l-1.76 1.37 1.7 2.94 2.14-.86c.54.41 1.12.74 1.73 1l.32 2.28h3.4l.32-2.28c.61-.26 1.19-.59 1.73-1l2.14.86 1.7-2.94L19.32 13c.05-.33.08-.66.08-1Z"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinejoin="round"
    />
  </svg>
);

const AccountIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path
      d="M12 12a4.2 4.2 0 1 0-4.2-4.2A4.2 4.2 0 0 0 12 12Z"
      stroke="currentColor"
      strokeWidth="1.7"
    />
    <path
      d="M4.5 20.2a7.5 7.5 0 0 1 15 0"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
    />
  </svg>
);

const BookIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path
      d="M7 4.5h9.5A2.5 2.5 0 0 1 19 7v13.5H7A2.5 2.5 0 0 0 4.5 18V7A2.5 2.5 0 0 1 7 4.5Z"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinejoin="round"
    />
    <path d="M7 8h8.5M7 12h8.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
  </svg>
);

const CardIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path
      d="M4.5 7.5A2.5 2.5 0 0 1 7 5h10a2.5 2.5 0 0 1 2.5 2.5v9A2.5 2.5 0 0 1 17 19H7a2.5 2.5 0 0 1-2.5-2.5v-9Z"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinejoin="round"
    />
    <path d="M4.5 9h15" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    <path d="M7.5 15h3.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
  </svg>
);

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
  const [section, setSection] = useState<'language' | 'appearance' | 'account' | 'lectures' | 'payments'>('language');

  return (
    <main className={style.page}>
      <section className={style.shell}>
        <aside className={style.sidebar}>
          <div className={style.sidebar__title}>Настройки</div>
          <div className={style.sidebar__search}>
            <TextField placeholder="Поиск" />
          </div>

          <nav className={style.sidebar__nav}>
            <div className={style.navGroup}>
              <button
                className={style.groupHeader}
                type="button"
                aria-expanded={isBaseOpen}
                onClick={() => setIsBaseOpen((v) => !v)}
              >
                <span className={style.groupHeader__left}>
                  <GearIcon className={style.navIcon} />
                  <span>Основные</span>
                </span>
                <span className={`${style.chevron} ${isBaseOpen ? style.chevron__open : ''}`}>▾</span>
              </button>

              {isBaseOpen && (
                <div className={style.groupItems}>
                  <button
                    className={`${style.navItem} ${section === 'language' ? style.navItem__active : ''}`}
                    type="button"
                    onClick={() => setSection('language')}
                  >
                    <span>Язык и регион</span>
                  </button>
                  <button
                    className={`${style.navItem} ${section === 'appearance' ? style.navItem__active : ''}`}
                    type="button"
                    onClick={() => setSection('appearance')}
                  >
                    <span>Внешний вид</span>
                  </button>
                </div>
              )}
            </div>

            <button
              className={`${style.navItem} ${section === 'account' ? style.navItem__active : ''}`}
              type="button"
              onClick={() => setSection('account')}
            >
              <AccountIcon className={style.navIcon} />
              <span>Аккаунт</span>
            </button>

            <button
              className={`${style.navItem} ${section === 'lectures' ? style.navItem__active : ''}`}
              type="button"
              onClick={() => setSection('lectures')}
            >
              <BookIcon className={style.navIcon} />
              <span>Доступные лекции</span>
            </button>

            <button
              className={`${style.navItem} ${section === 'payments' ? style.navItem__active : ''}`}
              type="button"
              onClick={() => setSection('payments')}
            >
              <CardIcon className={style.navIcon} />
              <span>Платёжная система</span>
            </button>
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
            ) : section === 'appearance' ? (
              <>
                <div className={style.card__title}>Внешний вид</div>
                <div className={style.card__subtitle}>
                  Выберите комфортный для вас внешний вид
                </div>

                <ThemeSwitcherWidget />
              </>
            ) : section === 'account' ? (
              <>
                <div className={style.card__title}>Аккаунт</div>
                <div className={style.card__subtitle}>Настройки вашего аккаунта</div>

                <div className={style.accountList}>
                  <div className={style.accountRow}>
                    <div className={style.accountRow__left}>
                      <div className={style.accountRow__label}>Почта:</div>
                      <div className={style.accountRow__value}>sh1zu1@gmail.com</div>
                    </div>
                    <button className={style.accountRow__action} type="button">
                      Изменить
                    </button>
                  </div>
                  <div className={style.accountRow}>
                    <div className={style.accountRow__left}>
                      <div className={style.accountRow__label}>Пароль:</div>
                      <div className={style.accountRow__value}>••••••••1222</div>
                    </div>
                    <button className={style.accountRow__action} type="button">
                      Изменить
                    </button>
                  </div>
                </div>
              </>
            ) : section === 'payments' ? (
              <>
                <div className={style.card__title}>Платёжная система</div>
                <div className={style.card__subtitle}>
                  Выберите подключённый метод оплаты и управлять картами
                </div>

                <BankCardWidget />
              </>
            ) : (
              <>
                <div className={style.card__title}>Доступные лекции</div>
                <div className={style.card__subtitle}>
                  Здесь вы можете найти все доступные для вас лекции
                </div>

                <LectureListWidget />
              </>
            )}
          </div>
        </section>
      </section>
    </main>
  );
};

