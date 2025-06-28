import {useMutation} from '@tanstack/react-query';
import {useNavigate} from 'react-router';
import environment from '../../config/environment';
import useToaster from '../useToaster';

/**
 * Custom hook to handle user signup.
 * @returns {import('@tanstack/react-query').UseMutationResult<
 *    {message: string},
 *    Error,
 *    {
 *      firstName: string,
 *      lastName: string,
 *      email: string,
 *      password: string}>
 *    }
 * >}
 */
const useSignup = () => {
  const toaster = useToaster();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async payload => {
      const res = await fetch(`${environment.baseApiUrl}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || 'Failed to sign up');
      }
      return res.json();
    },
    onSuccess: ({message}) => {
      toaster(message, 'success');
      navigate('/login');
    },
    onError: error => {
      toaster(error.message, 'error');
    },
  });
};

export default useSignup;
