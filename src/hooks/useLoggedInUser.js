import {useQuery} from '@tanstack/react-query';
import {useNavigate} from 'react-router';
import environment from '../config/environment';

const useLoggedInUser = () => {
  const navigate = useNavigate();
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
        navigate('/');
        return response.json();
      }
    },
  });

  return user;
};

export default useLoggedInUser;
