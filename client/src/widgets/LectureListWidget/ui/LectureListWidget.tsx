import React, { useEffect } from 'react';
import style from './LectureListWidget.module.scss';
import { LecturesListFeature } from '@features/lectures-list';
import { LectureCardWidget } from '@widgets/LectureCardWidget';
import { useDispatch, useSelector } from 'react-redux';

export const LectureListWidget: React.FC = () => {
  const dispatch = useDispatch();
  const { list, loading, error } = useSelector(LecturesListFeature.selectors);

  useEffect(() => {
    dispatch(LecturesListFeature.actions.fetchListRequest());
  }, [dispatch]);

  return (
    <section className={style.widget}>
      <div className={style.widget__heading}>Ваши лекции</div>

      {loading && <div className={style.widget__placeholder}>Загружаем список…</div>}
      {!loading && !!error && <div className={style.widget__error}>{error}</div>}
      {!loading && !error && list.length === 0 && (
        <div className={style.widget__placeholder}>Пока нет доступных лекций</div>
      )}

      {!loading && !error && list.length > 0 ? (
        <ul className={style.widget__list}>
          {list.map((item) => (
            <li key={item.id} className={style.widget__item}>
              <LectureCardWidget item={item} />
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
};
