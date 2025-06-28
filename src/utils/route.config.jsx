import {lazy} from 'react';
import {createBrowserRouter} from 'react-router';
import App from '../App.jsx';
import ErrorPage from '../components/ErrorPage.jsx';
import Login from '../components/Login.jsx';
import '../index.css';

const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        Component: lazy(() => import('../components/Feed.jsx')),
      },
      {
        path: '/login',
        Component: Login,
      },
      {
        path: '/requests',
        Component: lazy(() => import('../components/Requests.jsx')),
      },
      {
        path: '/connections',
        Component: lazy(() => import('../components/Connections.jsx')),
      },
      {
        path: '/profile',
        Component: lazy(() => import('../components/Profile.jsx')),
      },
    ],
  },
]);

export default router;
