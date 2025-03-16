import { AdminPage } from '../pages/admin/admin';
import { Routes } from 'shared/services/models/routes.types';
import NotFound from 'shared/pages/404/404';

export const adminRoutes: any[] = [
  {
    path: '/admin-page',
    // name: 'Admin',
    element: <AdminPage />,
  },
  {
    path: '*',
    // name: 'Not Found',
    element: <NotFound />,
  },
];
