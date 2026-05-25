import { createBrowserRouter } from 'react-router-dom';
import {Layout} from '@app/Layout';
import { HomePage } from '@pages/Home';
import { MenuPage } from '@pages/Menu';
import { ModelsListPage } from '@pages/ModelListPage';
import { ProfilePage } from '@pages/Profile';
import { AuthPage } from '@pages/Auth';
import { RegisterPage } from '@pages/Register';
import { NotFoundPage } from '@pages/NotFound';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children: [
			{ index: true, element: <HomePage /> },
			{ path: 'home', element: <HomePage /> },
			{ path: 'menu', element: <MenuPage /> },
			{ path: 'modelList', element: <ModelsListPage /> },
			{ path: 'auth', element: <AuthPage /> },
			{ path: 'register', element: <RegisterPage /> },
			{ path: 'profile', element: <ProfilePage /> },
			{ path: '*', element: <NotFoundPage /> },

		]
	}
]);
