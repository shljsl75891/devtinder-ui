import {useMutation, useQueryClient} from '@tanstack/react-query';
import environment from '../../config/environment';
import useToaster from '../useToaster';

/**
 * @param {number} selectedPage
 * @returns {import('@tanstack/react-query').UseMutationResult<
 *    {message: string},
 *    Error,
 *    {userId: string, status: 0 | 1}>}
 * >}
 */
const useSendRequest = function (selectedPage) {
  const queryClient = useQueryClient();
  const toaster = useToaster();
  return useMutation({
    mutationFn: async ({userId, status}) => {
      const res = await fetch(
        `${environment.baseApiUrl}/requests/send/${status}/${userId}`,
        {method: 'POST', credentials: 'include'},
      );
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || 'Failed to send request');
      }
      return res.json();
    },
    onSuccess: ({status}) => {
      const actualStatus = status === 0 ? 'interested' : 'ignored';
      toaster.success(`Request ${actualStatus} successfully`);
    },
    onError: error => {
      toaster.error(error.message);
    },
    onSettled: () =>
      Promise.all([
        queryClient.invalidateQueries({
          queryKey: ['users', selectedPage],
        }),
        queryClient.invalidateQueries({
          queryKey: ['feedCount'],
        }),
      ]),
  });
};

export default useSendRequest;
