import React, { useRef } from 'react';
import style from './ModelActionsWidget.module.scss';
import { EditIcon, PlusIcon, TrashIcon } from '@shared/ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '@app/store/rootReducer';
import { ModelUploadFeature } from '@features/model-upload';
import { ModelDeleteFeature } from '@features/model-delete';
import { ModelSelectionFeature } from '@features/model-selection';

export const ModelActionsWidget: React.FC = () => {
  const dispatch = useDispatch();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const selectedModelId = useSelector(
    ModelSelectionFeature.selectors.selectSelectedModelId
  );
  const uploading = useSelector((state: RootState) => state.modelUpload.uploading);
  const deleting = useSelector((state: RootState) => state.modelDelete.deleting);

  const handleAddClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    dispatch(ModelUploadFeature.actions.uploadRequest({ file }));
  };

  const handleDeleteClick = () => {
    if (!selectedModelId || deleting) return;
    dispatch(ModelDeleteFeature.actions.deleteRequest({ objectKey: selectedModelId }));
  };

  return (
    <section className={style.widget} aria-label="Действия с моделями">
      <input
        ref={fileInputRef}
        className={style.widget__hiddenInput}
        type="file"
        accept=".obj,model/obj"
        onChange={handleFileChange}
        tabIndex={-1}
        aria-hidden
      />

      <div className={style.widget__buttons}>
        <button
          className={style.button}
          type="button"
          title="Редактировать модель"
          aria-label="Редактировать модель"
        >
          <EditIcon size={28} />
        </button>
        <button
          className={style.button}
          type="button"
          title="Удалить модель"
          aria-label="Удалить модель"
          onClick={handleDeleteClick}
          disabled={!selectedModelId || deleting}
        >
          <TrashIcon size={28} />
        </button>
        <button
          className={style.button}
          type="button"
          title="Добавить модель"
          aria-label="Добавить модель"
          onClick={handleAddClick}
          disabled={uploading}
        >
          <PlusIcon size={28} />
        </button>
      </div>
    </section>
  );
};
