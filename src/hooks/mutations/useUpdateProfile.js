import {useMutation, useQueryClient} from '@tanstack/react-query';
import environment from '../../config/environment';
import useToaster from '../useToaster';

/**
 * Custom hook to update logged-in user's profile.
 * @returns {import('@tanstack/react-query').UseMutationResult<
 *    {message: string},
 *    Error,
 *    {
 *      age: number,
 *      gender: 0 | 1 | 2,
 *      profileImageUrl: string,
 *      about: string,
 *      skills: string[],
 *    }
 * >}
 */
const useUpdateProfile = () => {
  const toaster = useToaster();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async payload => {
      const res = await fetch(
        `${environment.baseApiUrl}/users/update-profile`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
          credentials: 'include',
        },
      );
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || 'Failed to update profile');
      }
      return res.json();
    },
    onSuccess: () => {
      toaster('Profile updated successfully', 'success');
    },
    onError: error => {
      toaster(error.message, 'error');
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['loggedInUser'],
      });
    },
  });
};

export default useUpdateProfile;
