import {useQuery} from '@tanstack/react-query';
import environment from '../../config/environment';

/** @param {string} receiverId - The ID of the user to whom messages are sent or received. */
const useChatMessages = receiverId => {
  return useQuery({
    queryFn: async () => {
      const response = await fetch(
        `${environment.baseApiUrl}/chats/messages/${receiverId}`,
        {credentials: 'include'},
      );
      return response.json();
    },
    queryKey: ['chatMessages', receiverId],
    staleTime: 0,
  });
};

export default useChatMessages;
