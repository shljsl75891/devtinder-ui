import {useMutation, useQueryClient} from '@tanstack/react-query';
import {useNavigate} from 'react-router';
import environment from '../../config/environment';
import useToaster from '../useToaster';

/**
 * @returns {import('@tanstack/react-query').UseMutationResult<
 *    {message: string},
 *    Error
 * >}
 */
const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const toatser = useToaster();

  return useMutation({
    mutationFn: async () => {
      const res = await fetch(`${environment.baseApiUrl}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || 'Failed to log out');
      }
      return res.json();
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey: ['loggedInUser']});
      navigate('/login');
      toatser('Logged out successfully', 'success');
    },
  });
};

export default useLogout;
