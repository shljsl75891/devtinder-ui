import {useEffect, useState} from 'react';
import {useParams} from 'react-router';
import useLoggedInUser from '../hooks/queries/useLoggedInUser';
import {isNullOrUndefined} from '../utils/constants';
import socket from '../utils/socket';

const Chat = () => {
  const {receiverId} = useParams();
  const user = useLoggedInUser();
  const [receiver, setReceiver] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    setNewMessage('');
    socket.emit('sendMessage', {
      senderId: user._id,
      receiverId,
      content: newMessage,
    });
  };

  const isSenderMessage = ({senderId}) => senderId === user._id;

  useEffect(() => {
    if (user?._id) {
      socket.connect();
      socket.emit('join', {senderId: user._id, receiverId});

      socket.on('joinedRoom', ({receiver}) => {
        setReceiver(receiver);
      });

      socket.on('receiveMessage', newMessage => {
        setMessages(prevMessages => [...prevMessages, newMessage]);
      });
    }

    return () => {
      socket.off('joinedRoom');
      socket.off('receiveMessage');
      socket.disconnect();
    };
  }, [receiverId, user]);

  return (
    <div className="mx-auto mt-12 w-3/4 h-[80vh] border border-gray-500 rounded-md shadow-2xl relative">
      <div className="h-12 px-4 flex items-center gap-4 bg-gray-600">
        {!isNullOrUndefined(receiver) ? (
          <>
            <img
              className="w-10 h-10 rounded-full"
              src={receiver.profileImageUrl}
              alt="receiver-avatar"
            />
            <div>{receiver.firstName + ' ' + receiver.lastName}</div>
          </>
        ) : (
          <div className="text-white">Loading...</div>
        )}
      </div>
      <div className="p-4">
        {messages.length > 0 &&
          messages.map((message, index) => (
            <div
              key={index}
              className={`chat ${
                isSenderMessage(message) ? 'chat-end' : 'chat-start'
              }`}
            >
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="user-avatar"
                    src={
                      isSenderMessage(message)
                        ? user.profileImageUrl
                        : receiver.profileImageUrl
                    }
                  />
                </div>
              </div>
              <div
                className={`chat-bubble ${
                  isSenderMessage(message) && 'chat-bubble-primary'
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
      </div>

      <div className="w-full flex items-center justify-between absolute bottom-0">
        <input
          type="text"
          value={newMessage}
          onChange={e => setNewMessage(e.target.value)}
          placeholder="Type a new message"
          className="input input-bordered w-full m-4 flex-5/6"
        />
        <button
          className="btn btn-primary m-2 flex-1/6"
          onClick={handleSendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
