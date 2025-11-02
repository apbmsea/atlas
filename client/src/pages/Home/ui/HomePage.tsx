import React from 'react'
import style from './HomePage.module.scss'
import { Button } from 'atlas-ui-kit'
import { useTheme } from 'atlas-ui-kit';

const ThemeToggleButton = () => {
	const { toggleTheme } = useTheme();
	return (
		<button onClick={toggleTheme}>Сменить тему</button>
	);
};

const HomePage: React.FC = () => {
  return (
    <main className={style['home-page']}>
      <ThemeToggleButton />
      <Button>Привет</Button>
    </main>
  )
}

export default HomePage