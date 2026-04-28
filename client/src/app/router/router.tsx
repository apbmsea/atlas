import { createBrowserRouter } from 'react-router-dom';
import Layout from '@app/Layout';
import { HomePage } from '@pages/Home';
import { NotFoundPage } from '@pages/NotFound';
import { MenuPage } from '@pages/Menu';
import { ModelList } from '@pages/ModelList';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children: [
			{ index: true, element: <HomePage /> },
			{ path: 'menu', element: <MenuPage /> },
			{ path: 'modelList', element: <ModelList /> },
			{ path: '*', element: <NotFoundPage /> },

		]
	}
]);
