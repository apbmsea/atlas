import React, { useMemo } from 'react';
import type { LectureListItem } from '@shared/types/lecture';
import style from './LectureCardWidget.module.scss';

export type LectureCardWidgetProps = {
  item: LectureListItem;
  onOpen?: (id: string) => void;
};

export const LectureCardWidget: React.FC<LectureCardWidgetProps> = ({ item, onOpen }) => {
  const { progressPercent } = item;

  const actionLabel = useMemo(() => {
    if (progressPercent != null && progressPercent > 0) return 'Продолжить просмотр';
    return 'Начать просмотр';
  }, [progressPercent]);

  const showProgress = progressPercent != null;
  const progressValue = progressPercent ?? 0;

  return (
    <article className={style.card}>
      <div className={style.card__body}>
        <div className={style.card__title}>{item.title}</div>
        {item.sectionLabel ? <div className={style.card__tag}>{item.sectionLabel}</div> : null}
        {showProgress ? (
          <div
            className={style.progress}
            role="progressbar"
            aria-valuenow={progressValue}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Прогресс просмотра лекции"
          >
            <div className={style.progress__track}>
              <div className={style.progress__fill} style={{ width: `${progressValue}%` }} />
            </div>
            <span className={style.progress__value}>{Math.round(progressValue)}%</span>
          </div>
        ) : null}
      </div>
      <button
        type="button"
        className={style.card__action}
        onClick={() => onOpen?.(item.id)}
      >
        {actionLabel}
      </button>
    </article>
  );
};
