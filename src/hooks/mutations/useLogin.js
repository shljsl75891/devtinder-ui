import {useMutation, useQueryClient} from '@tanstack/react-query';
import {useNavigate} from 'react-router';
import environment from '../../config/environment';
import useToaster from '../useToaster';

/**
 * Custom hook to handle user login.
 * @returns {import('@tanstack/react-query').UseMutationResult<
 *    {message: string},
 *    Error,
 *    {email: string, password: string}>}
 * >}
 */
const useLogin = () => {
  const toaster = useToaster();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({email, password}) => {
      const res = await fetch(`${environment.baseApiUrl}/auth/login`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, password}),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || 'Failed to login');
      }
      return res.json();
    },
    onSuccess: async () => {
      navigate('/');
      await queryClient.invalidateQueries();
    },
    onError: error => {
      toaster.error(error.message);
    },
  });
};

export default useLogin;
