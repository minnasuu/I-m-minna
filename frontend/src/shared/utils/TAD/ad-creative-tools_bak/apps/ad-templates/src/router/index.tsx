import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from '../components/Layout';
import Home from '../pages/Home';
import About from '../pages/About';
import Register from '../components/login/Register';
import Login from '../components/login/Login';
import ProtectedRoute from '../components/ProtectedRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'about',
        element: <About />
      },
      {
        path: 'register',
        element: <Register />
      },
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'profile',
        element: (
          <ProtectedRoute>
            <div className="p-8">
              <h1 className="text-2xl font-bold mb-4">个人资料</h1>
              <p>这是受保护的页面，只有登录用户才能访问。</p>
            </div>
          </ProtectedRoute>
        )
      }
    ]
  }
], {
  basename: process.env.NODE_ENV === 'production' ? '/insignificant-elements' : '/'
});

export default function Router() {
  return <RouterProvider router={router} />;
}