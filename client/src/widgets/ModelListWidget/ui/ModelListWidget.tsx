import React, { useEffect, useMemo } from 'react';
import style from './ModelsListWidget.module.scss';

import { useAppDispatch, useAppSelector } from '@shared/store/hooks';
import { ModelsListFeature } from '@features/models-list';
import { ModelSelectionFeature } from '@features/model-selection';
import type { FileInfo } from '@shared/types/file';

const ModelRow: React.FC<{
  fileInfo: FileInfo;
  onOpen: (objectKey: string) => void;
}> = ({ fileInfo, onOpen }) => {
  const { objectKey } = fileInfo;
  const fileName = useMemo(
    () => decodeURIComponent(objectKey.split('/').pop() || objectKey),
    [objectKey]
  );

  return (
    <div
      className={style.row}
      role="button"
      tabIndex={0}
      onClick={() => onOpen(objectKey)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onOpen(objectKey);
      }}
      title={fileName}
    >
      <div className={style.row__name}>{fileName}</div>
    </div>
  );
};

export const ModelsListWidget: React.FC = () => {
  const dispatch = useAppDispatch();

  const { list: models = [], loading, error } =
    useAppSelector(ModelsListFeature.selectors);

  useEffect(() => {
    dispatch(ModelsListFeature.actions.fetchListRequest());
  }, [dispatch]);

  return (
    <section className={style.widget}>
      <div className={style.widget__toolbar}>
      </div>

      {loading && <div className={style.widget__placeholder}>Загружаем список…</div>}
      {!loading && !!error && <div className={style.widget__error}>{error}</div>}
      {!loading && !error && models.length === 0 && (
        <div className={style.widget__placeholder}>Пока нет ни одной модели</div>
      )}


      <div className={style.widget__list}>
        {models.map((fileInfo) => (
          <ModelRow
            key={fileInfo.objectKey}
            fileInfo={fileInfo}
            onOpen={(objectKey) => dispatch(ModelSelectionFeature.actions.selectModel(objectKey))}
          />
        ))}
      </div>
    </section>
  );
};