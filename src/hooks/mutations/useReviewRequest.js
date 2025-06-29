import {useMutation, useQueryClient} from '@tanstack/react-query';
import environment from '../../config/environment';
import useToaster from '../useToaster';

const KEYS_TO_INVALIDATE = ['requests', 'connections', 'feedCount', 'users'];

/**
 * @returns {import('@tanstack/react-query').UseMutationResult<
 *    number,
 *    Error,
 *    {id: string, status: 2 | 3}>}
 * >}
 */
const useReviewRequest = () => {
  const queryClient = useQueryClient();
  const toaster = useToaster();

  return useMutation({
    mutationFn: async ({id, status}) => {
      const res = await fetch(
        `${environment.baseApiUrl}/requests/review/${id}/${status}`,
        {method: 'PATCH', credentials: 'include'},
      );
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || 'Failed to review request');
      }
      return status;
    },
    onSuccess: async status => {
      const actualStatus = status === 2 ? 'accepted' : 'rejected';
      await Promise.all(
        KEYS_TO_INVALIDATE.map(key =>
          queryClient.invalidateQueries({queryKey: [key]}),
        ),
      );
      toaster(`Request ${actualStatus} successfully`, 'success');
    },
    onError: error => {
      toaster(error.message, 'error');
    },
  });
};

export default useReviewRequest;
