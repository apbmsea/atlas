import React from 'react';
import style from './ModelsListPage.module.scss';
import { Button } from 'atlas-ui-kit';
import { useNavigate } from 'react-router-dom';
import { ModelsListWidget } from '@widgets/ModelListWidget/ui/ModelListWidget';
import { ModelHelpersWidget } from '@widgets/ModelHelpersWidget/ui/ModelHelpersWidget';
import { RenderStreamViewer } from '@features/render-preview';
import classNames from 'classnames/bind';

const cx = classNames.bind(style);

export const ModelsListPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <main className={style['models-page']}>
      <header className={style['models-page__header']}>
        <div className={style['models-page__header-left']}>
          <Button
            variant="secondary"
            leftIcon={<span aria-hidden>←</span>}
            onClick={() => navigate(-1)}
            children='Назад'
          />
        </div>
      </header>

      <section className={style['models-page__content']}>
        <RenderStreamViewer />
        <aside className={style['models-page__sidebar']}>
          <div className={cx('models-page__sidebarCard', 'models-page__sidebarCardGrow')}>
            <ModelsListWidget />
          </div>
          <div className={style['models-page__sidebarPlain']}>
            <ModelHelpersWidget />
          </div>
        </aside>
      </section>
    </main>
  );
};