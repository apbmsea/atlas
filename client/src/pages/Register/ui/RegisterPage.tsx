import React, { useMemo, useState } from 'react';
import style from './RegisterPage.module.scss';
import { Button, TextField } from 'atlas-ui-kit';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

const cx = classNames.bind(style);

export const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  const passwordMismatch = useMemo(() => {
    if (!password || !password2) return false;
    return password !== password2;
  }, [password, password2]);

  return (
    <main className={style.page}>
      <div className={style.bgLight} />

      <section className={style.card} aria-label="Регистрация">
        <div className={style.logo}>
          <img src="/Logo.svg" alt="Atlas" />
        </div>

        <form
          className={style.form}
          onSubmit={(e) => {
            e.preventDefault();
            if (passwordMismatch) return;
            // TODO: подключить реальную регистрацию
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
              autoComplete="new-password"
            />
          </div>

          <div>
            <div className={cx('label', { labelError: passwordMismatch })}>
              Введите пароль еще раз
            </div>
            <TextField
              placeholder="********"
              value={password2}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword2(e.target.value)}
              type="password"
              autoComplete="new-password"
            />
            <div className={cx('hint', { hintVisible: passwordMismatch })}>
              Пароли не совпадают
            </div>
          </div>

          <div className={style.actions}>
            <Button variant="secondary" type="submit" disabled={passwordMismatch}>
              Зарегистрироваться
            </Button>
          </div>
        </form>

        <div className={style.footer}>
          Уже есть аккаунт? <Link to="/auth">Войти</Link>
        </div>
      </section>
    </main>
  );
};

