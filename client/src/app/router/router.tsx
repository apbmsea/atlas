import { createBrowserRouter } from 'react-router-dom';
import Layout from '@app/Layout';
import { HomePage } from '@pages/Home';
import { NotFoundPage } from '@pages/NotFound';
import { MenuPage } from '@pages/Menu';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children: [
			{ index: true, element: <HomePage /> },
			{ path: 'menu', element: <MenuPage /> },
			{ path: '*', element: <NotFoundPage /> },
			
		]
	}
]);
