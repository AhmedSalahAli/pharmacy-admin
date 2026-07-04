import { createBrowserRouter } from 'react-router-dom';

import DashboardLayout from '../layouts/DashboardLayout';
import DashboardHomePage from '../pages/DashboardHomePage';
import NotFoundPage from '../pages/NotFoundPage';
import ProductsPage from '../features/products/pages/ProductsPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <DashboardLayout />,
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
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);