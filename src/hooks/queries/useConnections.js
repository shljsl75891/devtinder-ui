import {useQuery} from '@tanstack/react-query';
import environment from '../../config/environment';

const useConnections = () => {
  return useQuery({
    queryFn: async () => {
      const response = await fetch(
        environment.baseApiUrl + '/users/connections',
        {credentials: 'include'},
      );
      return response.json();
    },
    queryKey: ['connections'],
  });
};

export default useConnections;
