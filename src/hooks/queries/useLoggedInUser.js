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

  const {data: user} = useQuery({
    queryKey: ['loggedInUser'],
    retry: false,
    queryFn: async () => {
      const response = await fetch(`${environment.baseApiUrl}/users/profile`, {
        credentials: 'include',
      });
      if (!response.ok) {
        navigate('/login');
        return null;
      } else {
        // redirect to feed if the user is already logged in
        if (pathname === '/login' || pathname === '/register') {
          navigate('/');
        }
        return response.json();
      }
    },
  });

  return user;
};

export default useLoggedInUser;
