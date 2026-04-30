import { Link } from 'react-router-dom';
import style from './Header.module.scss';
import { TextField } from 'atlas-ui-kit';

// const ThemeToggleButton = () => {
// 	const { toggleTheme } = useTheme();
// 	return <button onClick={toggleTheme}>Сменить тему</button>;
// };

export const Header = () => {
	return (
		<header className={style['header']}>
			<Link to='/home'>логотип</Link>
			<div className={style['header__content']}>
				<TextField
					leftIcon={
						<svg
							width='24'
							height='24'
							viewBox='0 0 24 24'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								d='M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z'
								stroke='#A7A7A7'
								stroke-width='1.5'
								stroke-linecap='round'
								stroke-linejoin='round'
							/>
							<path
								d='M22 22L20 20'
								stroke='#A7A7A7'
								stroke-width='1.5'
								stroke-linecap='round'
								stroke-linejoin='round'
							/>
						</svg>
					}
					placeholder='Поиск'
				/>
				<Link className={style['header__content-link']} to='/shop'>
					магазин
				</Link>
				<Link className={style['header__content-link']} to='/profile'>
					личный кабинет
				</Link>
			</div>
		</header>
	);
};
