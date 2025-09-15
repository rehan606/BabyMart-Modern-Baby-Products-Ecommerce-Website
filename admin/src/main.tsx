// File: admin/src/main.tsx
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";

import './index.css'
import App from './App.tsx';
import Login from './pages/Login.tsx';
import Register from './pages/Register.tsx';
import DashboardPage from './pages/DashboardPage.tsx';
import Account from './pages/Account.tsx';
import Users from './pages/Users.tsx';
import Orders from './pages/Orders.tsx';
import Invoices from './pages/Invoices.tsx';
import Banners from './pages/Banners.tsx';
import Products from './pages/Products.tsx';
import Categories from './pages/Categories.tsx';
import Brands from './pages/Brands.tsx';
import Settings from './pages/Settings.tsx';
import Reports from './pages/Reports.tsx';


const router = createBrowserRouter([
  
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/dashboard",
        element: <DashboardPage/>,
      },
      {
        path: "/dashboard/account",
        element: <Account/>,
      },
      {
        path: "/dashboard/users",
        element: <Users/>,
      },
      {
        path: "/dashboard/orders",
        element: <Orders/>,
      },
      {
        path: "/dashboard/invoices",
        element: <Invoices/>,
      },
      {
        path: "/dashboard/banners",
        element: <Banners/>,
      },
      {
        path: "/dashboard/products",
        element: <Products/>,
      },
      {
        path: "/dashboard/categories",
        element: <Categories/>,
      },
      {
        path: "/dashboard/brands",
        element: <Brands/>,
      },
      {
        path: "/dashboard/reports",
        element: <Reports/>,
      },
      {
        path: "/dashboard/settings",
        element: <Settings/>,
      },
    ]
  },
]);

createRoot(document.getElementById('root')!).render(
    <RouterProvider router={router} />,
)
