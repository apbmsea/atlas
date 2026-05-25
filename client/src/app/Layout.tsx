import { setNavigate } from '@shared/utils/navigate';
import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { ThemeProvider } from 'atlas-ui-kit';
import 'atlas-ui-kit/dist/styles.css';
import { Header } from '@widgets/Header';

export const Layout = () => {
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		setNavigate(navigate);
	}, [navigate]);

	const isAuthRoute =
		location.pathname === '/auth' ||
		location.pathname === '/register' ||
		location.pathname.startsWith('/auth/') ||
		location.pathname.startsWith('/register/');

	return (
		<ThemeProvider initialTheme="dark">
			<div className='app-layout'>
				{!location.pathname.startsWith('/modelList') && !isAuthRoute && <Header />}
				<Outlet />
			</div>
		</ThemeProvider>
	);
};
