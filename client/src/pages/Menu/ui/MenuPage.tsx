import React from 'react';
import style from './MenuPage.module.scss';

export const MenuPage: React.FC = () => {
	return (
		<main className={style['menu-page']}>
			<div className={style['bg-light']} />

			<div className={style['menu-page__content']}>
				<div className={style['menu-page__block']}>
					<span className={style['menu-page__block-title']}>Объемная модель</span>
				</div>
				<div className={style['menu-page__block']}>
					<span className={style['menu-page__block-title']}>Срез</span>
				</div>
			</div>
		</main>
	);
};
