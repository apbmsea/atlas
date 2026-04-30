import React, { useState } from 'react';
import style from './ModelsListPage.module.scss';
import { Button } from 'atlas-ui-kit';
import { useNavigate } from 'react-router-dom';
import { ModelsListWidget } from '@widgets/ModelListWidget/ui/ModelListWidget';
import { RenderStreamViewer } from '@features/render-preview';

export const ModelsListPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedModelId, setSelectedModelId] = useState<string | null>(null);

  return (
    <main className={style['models-page']}>
      <header className={style['models-page__header']}>
        <div className={style['models-page__header-left']}>
          <Button
            variant="secondary"
            leftIcon={<span aria-hidden>←</span>}
            onClick={() => navigate(-1)}
          >
            Назад
          </Button>
        </div>
      </header>

      <section className={style['models-page__content']}>
        <div className={style['models-page__viewer']}>
          {selectedModelId ? (
            <RenderStreamViewer modelId={selectedModelId} height={700} />
          ) : (
            <div className={style['models-page__viewerPlaceholder']}>
              Выберите модель из списка
            </div>
          )}
        </div>

        <div className={style['models-page__list']}>
          <ModelsListWidget
            onOpenModel={(objectKey) => setSelectedModelId(objectKey)}
          />
        </div>
      </section>
    </main>
  );
};