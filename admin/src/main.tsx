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
    children: [{
      path: "/dashboard",
      element: <DashboardPage/>,
    }]
  },
]);

createRoot(document.getElementById('root')!).render(
    <RouterProvider router={router} />,
)
