import React, { useState } from 'react';
import style from './AuthPage.module.scss';
import { Button, Checkbox, TextField } from 'atlas-ui-kit';
import { Link } from 'react-router-dom';

export const AuthPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);

  return (
    <main className={style.page}>
      <div className={style.bgLight} />

      <section className={style.card} aria-label="Авторизация">
        <div className={style.logo}>
          <img src="/Logo.svg" alt="Atlas" />
        </div>

        <form
          className={style.form}
          onSubmit={(e) => {
            e.preventDefault();
            // TODO: подключить реальную авторизацию
          }}
        >
          <div>
            <div className={style.label}>Введите почту</div>
            <TextField
              placeholder="student@gmail.com"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              type="email"
              autoComplete="email"
            />
          </div>

          <div>
            <div className={style.label}>Введите пароль</div>
            <TextField
              placeholder="********"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              type="password"
              autoComplete={remember ? 'current-password' : 'off'}
            />
          </div>

          <div className={style.row}>
            <Checkbox
              variant="primary"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
            >
              Запомнить меня
            </Checkbox>
          </div>

          <div className={style.actions}>
            <Button variant="secondary" type="submit">
              Войти
            </Button>
          </div>
        </form>

        <div className={style.divider}>Войти через сервис</div>
        <div className={style.social} aria-label="Вход через сервисы">
          <button className={style.iconBtn} type="button" aria-label="Войти через Google">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M21.6 12.23c0-.7-.06-1.38-.18-2.03H12v3.85h5.37a4.6 4.6 0 0 1-2 3.02v2.5h3.25c1.9-1.74 2.98-4.3 2.98-7.34Z"
                fill="#4285F4"
              />
              <path
                d="M12 22c2.7 0 4.96-.9 6.61-2.43l-3.25-2.5c-.9.6-2.05.95-3.36.95-2.6 0-4.8-1.76-5.58-4.12H3.06v2.58A9.98 9.98 0 0 0 12 22Z"
                fill="#34A853"
              />
              <path
                d="M6.42 13.9A6 6 0 0 1 6.1 12c0-.66.12-1.3.32-1.9V7.52H3.06A10 10 0 0 0 2 12c0 1.62.39 3.15 1.06 4.48l3.36-2.58Z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.98c1.47 0 2.8.5 3.84 1.5l2.88-2.88A9.7 9.7 0 0 0 12 2 10 10 0 0 0 3.06 7.52l3.36 2.58C7.2 7.74 9.4 5.98 12 5.98Z"
                fill="#EA4335"
              />
            </svg>
          </button>

          <button className={style.iconBtn} type="button" aria-label="Войти через Telegram">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M21.9 5.2 19 19.4c-.22 1.01-.8 1.26-1.6.79l-4.43-3.27-2.14 2.06c-.24.24-.44.44-.9.44l.32-4.6 8.38-7.58c.36-.32-.08-.5-.56-.18L7.7 13.8 3.2 12.4c-.99-.31-1-1 .21-1.47l17.6-6.78c.82-.3 1.54.2 1.27 1.05Z"
                fill="#2AABEE"
              />
            </svg>
          </button>
        </div>

        <div className={style.footer}>
          Нет аккаунта? <Link to="/register">Зарегистрируйтесь</Link>
        </div>
      </section>
    </main>
  );
};

