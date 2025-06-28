import {useQuery} from '@tanstack/react-query';
import {useLocation, useNavigate} from 'react-router';
import environment from '../../config/environment';

/**
 * @returns {Record<string, any>}
 * The logged-in user's profile, if user is logged in. Otherwise, redirects to login page.
 */
const useLoggedInUser = () => {
  const navigate = useNavigate();
  const {pathname} = useLocation();
  const isAuthPage = ['/login', '/signup'].includes(pathname);

  const {data: user} = useQuery({
    queryKey: ['loggedInUser'],
    retry: false,
    queryFn: async () => {
      const response = await fetch(`${environment.baseApiUrl}/users/profile`, {
        credentials: 'include',
      });
      if (!response.ok) {
        // if the user is not logged in, redirect to login page
        if (!isAuthPage) {
          navigate('/login');
        }
        return null;
      } else {
        // redirect to feed if the user is already logged in
        if (isAuthPage) {
          navigate('/');
        }
        return response.json();
      }
    },
  });

  return user;
};

export default useLoggedInUser;
