import environment from '../../config/environment';
import {queryClient} from '../constants';

const connectionsLoader = async () => {
  return queryClient.ensureQueryData({
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

export default connectionsLoader;
