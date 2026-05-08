import React, { useMemo, useState } from 'react';
import style from './BankCardWidget.module.scss';

type CardBrand = 'visa' | 'mastercard';

type CardItem = {
  id: string;
  brand: CardBrand;
  title: string;
  subtitle: string;
  masked: string;
};

export const BankCardWidget: React.FC = () => {
  const cards: CardItem[] = useMemo(
    () => [
      {
        id: 'visa-0234',
        brand: 'visa',
        title: 'VISA',
        subtitle: 'Основной',
        masked: '•••• •••• •••• 0234',
      },
      {
        id: 'mc-0124',
        brand: 'mastercard',
        title: 'MASTERCARD',
        subtitle: 'Второстепенный',
        masked: '•••• •••• •••• 0124',
      },
    ],
    []
  );

  const [activeId, setActiveId] = useState(cards[0]?.id ?? '');

  return (
    <section className={style.widget} aria-label="Платёжные методы">
      <div className={style.header}>
        <div className={style.header__title}>Платёжные методы</div>
        <button className={style.header__action} type="button">
          Добавить новый
        </button>
      </div>

      <div className={style.list} role="list">
        {cards.map((card) => (
          <button
            key={card.id}
            type="button"
            role="listitem"
            className={`${style.card} ${activeId === card.id ? style.card__active : ''}`}
            onClick={() => setActiveId(card.id)}
          >
            <div className={`${style.brand} ${card.brand === 'visa' ? style.brand__visa : style.brand__mastercard}`}>
              {card.brand === 'visa' ? (
                <span className={style.brand__text}>VISA</span>
              ) : (
                <span className={style.brand__circles} aria-hidden />
              )}
            </div>

            <div className={style.meta}>
              <div className={style.meta__title}>{card.title}</div>
              <div className={style.meta__masked}>{card.masked}</div>
              <div className={style.meta__sub}>{card.subtitle}</div>
            </div>

            <span className={style.chevron} aria-hidden>
              ›
            </span>
          </button>
        ))}
      </div>

      <div className={style.footer}>
        <div className={style.footer__title}>История операций</div>
        <button className={style.footer__action} type="button">
          Очистить
        </button>
      </div>
    </section>
  );
};

