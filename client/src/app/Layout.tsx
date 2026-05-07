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

	return (
		<ThemeProvider initialTheme="dark">
			<div className='app-layout'>
				{!location.pathname.startsWith('/modelList') && <Header />}
				<Outlet />
			</div>
		</ThemeProvider>
	);
};
