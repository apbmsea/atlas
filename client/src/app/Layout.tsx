import { setNavigate } from '@shared/utils/navigate';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { ThemeProvider } from 'atlas-ui-kit';
import 'atlas-ui-kit/dist/styles.css';
import { Header } from '@widgets/Header';

const Layout = () => {
	const navigate = useNavigate();

	useEffect(() => {
		setNavigate(navigate);
	}, [navigate]);

	return (
		<ThemeProvider>
			<div className='app-layout'>
				<Header />
				<Outlet />
			</div>
		</ThemeProvider>
	);
};

export default Layout;
