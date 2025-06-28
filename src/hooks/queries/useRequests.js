import {useQuery} from '@tanstack/react-query';
import environment from '../../config/environment';

const useRequests = () => {
  const requestsQuery = useQuery({
    queryKey: ['requests'],
    queryFn: async () => {
      const response = await fetch(
        environment.baseApiUrl + '/requests/received',
        {credentials: 'include'},
      );
      return response.json();
    },
  });

  return requestsQuery;
};

export default useRequests;
