import React from 'react';
import style from './ModelHelpersWidget.module.scss';
import { CloseIcon, PlayIcon, QuestionIcon, ZoomIcon } from 'atlas-ui-kit';

export const ModelHelpersWidget: React.FC = () => {
  return (
    <section className={style.widget} aria-label="Вспомогательные функции">
      <div className={style.widget__title}>Вспомогательные функции</div>

      <div className={style.widget__buttons}>
        <button className={style.button} type="button" title="Увеличить" aria-label="Увеличить">
          <ZoomIcon />
        </button>
        <button className={style.button} type="button" title="Запустить" aria-label="Запустить">
          <PlayIcon />
        </button>
        <button className={style.button} type="button" title="Подсказка" aria-label="Подсказка">
          <QuestionIcon />
        </button>
        <button className={style.button} type="button" title="Скрыть" aria-label="Скрыть">
          <CloseIcon />
        </button>
      </div>
    </section>
  );
};

