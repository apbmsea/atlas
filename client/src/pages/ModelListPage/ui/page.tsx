import React from 'react';
import style from './ModelsListPage.module.scss';
import { Button } from 'atlas-ui-kit';
import { useNavigate } from 'react-router-dom';
import { ModelsListWidget } from '@widgets/ModelListWiget/ui/ModelListWiget';

export const ModelsListPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <main className={style['models-page']}>
      <header className={style['models-page__header']}>
        <Button
          variant="secondary"
          leftIcon={<span aria-hidden>←</span>}
          onClick={() => navigate(-1)}
        >
          Назад
        </Button>

        <h1 className={style['models-page__title']}>Список моделей</h1>

        <div className={style['models-page__spacer']} />
      </header>

      <ModelsListWidget
        onOpenModel={(objectKey) => navigate(`/models/${encodeURIComponent(objectKey)}`)}
      />
    </main>
  );
};