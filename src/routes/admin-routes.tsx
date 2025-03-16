import { AdminPage } from '../pages/admin/admin';
import { Routes } from 'src/services/models/routes.types';
import NotFound from 'src/pages/404/404';

export const adminRoutes: Routes[] = [
  {
    path: '/',
    name: 'Admin',
    element: <AdminPage />,
  },
  {
    path: '/admin-page',
    name: 'Admin',
    element: <AdminPage />,
  },
  {
    path: '*',
    name: 'Not Found',
    element: <NotFound />,
  },
];
