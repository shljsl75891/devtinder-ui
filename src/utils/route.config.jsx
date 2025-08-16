import {lazy} from 'react';
import {createBrowserRouter} from 'react-router';
import App from '../App.jsx';
import ErrorPage from '../components/ErrorPage.jsx';
import Login from '../components/Login.jsx';
import SignUp from '../components/SignUp.jsx';
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
        path: '/signup',
        Component: SignUp,
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
      {
        path: '/chat/:receiverId',
        Component: lazy(() => import('../components/Chat.jsx')),
      },
    ],
  },
]);

export default router;
