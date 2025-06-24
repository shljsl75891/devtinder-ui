import {lazy} from 'react';
import {createBrowserRouter, redirect} from 'react-router';
import App from '../App.jsx';
import ErrorPage from '../components/ErrorPage.jsx';
import Login from '../components/Login.jsx';
import environment from '../config/environment.js';
import '../index.css';
import {queryClient} from './constants.js';
import connectionsLoader from './loaders/connections.loader.js';
import GenericFallback from './loaders/generic.fallback.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        Component: lazy(() => import('../components/Feed.jsx')),
        hydrateFallbackElement: GenericFallback('Feed'),
        loader: async () => {
          return queryClient.ensureQueryData({
            queryKey: ['feedCount'],
            queryFn: async () => {
              const response = await fetch(
                `${environment.baseApiUrl}/users/feed/count`,
                {credentials: 'include'},
              );
              if (!response.ok) {
                return redirect('/login');
              }
              return response.json();
            },
          });
        },
      },
      {
        path: '/login',
        Component: Login,
      },
      {
        path: '/connections',
        Component: lazy(() => import('../components/Connections.jsx')),
        hydrateFallbackElement: GenericFallback('Connections'),
        loader: connectionsLoader,
      },
      {
        path: '/profile',
        Component: lazy(() => import('../components/Profile.jsx')),
      },
    ],
  },
]);

export default router;
