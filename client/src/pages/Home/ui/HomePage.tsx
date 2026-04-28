import React from 'react';
import style from './HomePage.module.scss';
import { Button } from 'atlas-ui-kit';
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
  const navigate = useNavigate()
	return (
		<main className={style['home-page']}>
			<div className={style['bg-light']} />
			<div className={style['bg-human']} />

			<div className={style['content']}>
				<h1 className={style['home-page__title']}>
					Атлас организма человека
				</h1>
				{/* <p>Подготавливаем срезы и модели...</p> */}
        <Button onClick={() => navigate('menu')} variant='secondary'>Начать</Button>
			</div>
		</main>
	);
};

export default HomePage;
