import { useQuery } from '@tanstack/react-query';
import environment from '../config/environment';

const Profile = () => {
  const {data, isSuccess} = useQuery({
    queryKey: ['loggedInUser'],
    queryFn: async () => {
      const response = await fetch(`${environment.baseApiUrl}/users/profile`, {
        credentials: 'include',
      });
      return response.json();
    },
  });

  return <h1>Profile Component</h1>;
};

export default Profile;
