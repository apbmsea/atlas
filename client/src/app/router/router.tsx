import { createBrowserRouter } from 'react-router-dom';
import Layout from '@app/Layout';
import { HomePage } from '@pages/Home';
import { MenuPage } from '@pages/Menu';
import { ModelsListPage } from '@pages/ModelListPage';
import { NotFoundPage } from '@pages/NotFound';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children: [
			{ index: true, element: <HomePage /> },
			{ path: 'menu', element: <MenuPage /> },
			{ path: 'modelList', element: <ModelsListPage /> },
			{ path: '*', element: <NotFoundPage /> },

		]
	}
]);
