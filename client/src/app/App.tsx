import { RouterProvider } from 'react-router-dom';
import { router } from '@app/router/router';
import '@shared/styles/index.scss';

export function App() {
	return <RouterProvider router={router} />;
}

