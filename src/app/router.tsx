import { createBrowserRouter } from 'react-router-dom';

import ProtectedRoute from './router/ProtectedRoute';

import LoginPage from '../features/auth/pages/LoginPage';
import ProductsPage from '../features/products/pages/ProductsPage';
import SuppliersPage from '../features/suppliers/pages/SuppliersPage';
import DashboardLayout from '../layouts/DashboardLayout';
import DashboardHomePage from '../pages/DashboardHomePage';
import NotFoundPage from '../pages/NotFoundPage';

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <DashboardHomePage />,
      },
      {
        path: 'products',
        element: <ProductsPage />,
      },
      {
        path: 'suppliers',
        element: <SuppliersPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);
