import React, { useEffect, useMemo, useRef } from 'react';
import style from './ModelsListWiget.module.scss';
import { Button } from 'atlas-ui-kit';

import { useAppDispatch, useAppSelector } from '@shared/store/hooks';
import { ModelsListFeature } from '@features/models-list';
import { ModelUploadFeature } from '@features/model-upload';
import { ModelDeleteFeature } from '@features/model-delete';
import type { FileInfo } from '@shared/types/file';
import { formatBytes, formatDate } from '@shared/utils/format';

type Props = {
  /** Открыть модель (страница передаст navigate) */
  onOpenModel: (objectKey: string) => void;
};

const ModelRow: React.FC<{
  fileInfo: FileInfo;
  onOpen: (objectKey: string) => void;
  onDelete: (objectKey: string) => void;
}> = ({ fileInfo, onOpen, onDelete }) => {
  const { objectKey, size, contentType, createdAt } = fileInfo;
  const fileName = useMemo(
    () => decodeURIComponent(objectKey.split('/').pop() || objectKey),
    [objectKey]
  );

  return (
    <div className={style.row}>
      <div className={style.row__meta}>
        <div className={style.row__name} title={objectKey}>{fileName}</div>
        <div className={style.row__sub}>
          <span>{contentType || 'application/octet-stream'}</span>
          <span>•</span>
          <span>{formatBytes(size)}</span>
          {createdAt ? (
            <>
              <span>•</span>
              <span>{formatDate(createdAt)}</span>
            </>
          ) : null}
        </div>
      </div>
      <div className={style.row__actions}>
        <Button
          variant="primary"
          rightIcon={<span aria-hidden>→</span>}
          onClick={() => onOpen(objectKey)}
        >
          Открыть
        </Button>
        <Button
          variant="secondary"
          rightIcon={<span aria-hidden>🗑</span>}
          onClick={() => onDelete(objectKey)}
        >
          Удалить
        </Button>
      </div>
    </div>
  );
};

export const ModelsListWidget: React.FC<Props> = ({ onOpenModel }) => {
  const dispatch = useAppDispatch();

  const { list: models = [], loading, error } =
    useAppSelector(ModelsListFeature.selectors);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    dispatch(ModelsListFeature.actions.fetchListRequest());
  }, [dispatch]);

  const handleDelete = (objectKey: string) => {
    if (window.confirm('Удалить модель? Это действие необратимо.')) {
      dispatch(ModelDeleteFeature.actions.deleteRequest({ objectKey }));
    }
  };

  const handleUploadClick = () => fileInputRef.current?.click();

  const handleFileChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const file = event.target.files?.[0];
    event.currentTarget.value = '';
    if (file) {
      dispatch(ModelUploadFeature.actions.uploadRequest({ file }));
    }
  };

  return (
    <section className={style.widget}>
      <div className={style.widget__toolbar}>
        <input
          ref={fileInputRef}
          type="file"
          accept=".obj,.gltf,.glb,.zip,model/obj,model/gltf+json"
          onChange={handleFileChange}
          className={style.widget__hiddenInput}
        />
        <Button variant="secondary" rightIcon={<span aria-hidden>＋</span>} onClick={handleUploadClick}>
          Загрузить
        </Button>
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
            onOpen={onOpenModel}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </section>
  );
};