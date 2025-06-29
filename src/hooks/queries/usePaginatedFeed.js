import {useQueries} from '@tanstack/react-query';
import environment from '../../config/environment';
import {FEED_LIMIT} from '../../utils/constants';

/**
 * @param {number} page The page number to fetch users for
 * @returns
 * {[
 *   import('@tanstack/react-query').UseQueryResult<{count: number}, Error>,
 *   import('@tanstack/react-query').UseQueryResult<Array<Record<string, any>>, Error>
 * ]} The array containing total count and limited users in the selected page
 */
const usePagninatedFeed = page => {
  async function fetchUsers() {
    const response = await fetch(
      `${environment.baseApiUrl}/users/feed?page=${page}&limit=${FEED_LIMIT}`,
      {credentials: 'include'},
    );
    if (!response.ok) {
      return null;
    }
    return response.json();
  }
  return useQueries({
    queries: [
      {
        queryKey: ['feedCount'],
        queryFn: async () => {
          const response = await fetch(
            `${environment.baseApiUrl}/users/feed/count`,
            {credentials: 'include'},
          );
          return response.json();
        },
      },
      {
        queryKey: ['users', page],
        queryFn: () => fetchUsers(),
      },
    ],
  });
};

export default usePagninatedFeed;
