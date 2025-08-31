import {useEffect, useRef, useState} from 'react';
import {useParams} from 'react-router';
import useChatMessages from '../hooks/queries/useChatMessages';
import useLoggedInUser from '../hooks/queries/useLoggedInUser';
import {formatDateTime, isNullOrUndefined} from '../utils/constants';

const Chat = () => {
  /** @type {React.RefObject<WebSocket>} */
  const socket = useRef(null);
  const {receiverId} = useParams();
  const user = useLoggedInUser();
  const [receiver, setReceiver] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const {data: chatMessages} = useChatMessages(receiverId);
  /** @type {React.RefObject<HTMLDivElement>} */
  const chatContainerRef = useRef(null);
  /** @type {React.RefObject<HTMLInputElement>} */
  const inputRef = useRef(null);

  const handleSendMessage = () => {
    if (!newMessage.trim()) {
      return;
    }
    socket.current.send(
      JSON.stringify({
        event: 'sendMessage',
        message: {
          senderId: user._id,
          receiverId,
          content: newMessage,
        },
      }),
    );
    setNewMessage('');
  };

  const isSenderMessage = ({senderId}) => senderId._id === user?._id;

  useEffect(() => {
    inputRef.current?.focus();
    if (chatMessages) {
      setMessages(chatMessages);
    }
  }, [chatMessages]);

  const onConnect = () => {
    socket.current.send(
      JSON.stringify({
        event: 'joinRoom',
        message: {
          senderId: user._id,
          receiverId,
        },
      }),
    );
    setNewMessage('');
    console.info('websocket connection established');
  };

  const onDisconnect = () => {
    console.warn('websocket connection disconnected');
  };

  /** @param {MessageEvent} event */
  const onMessage = event => {
    const data = JSON.parse(event.data);
    switch (data.event) {
      case 'roomJoined': {
        const {receiver} = data;
        setReceiver(receiver);
        break;
      }
      case 'messageDelivered': {
        const {message} = data;
        setMessages(prevMessages => [...prevMessages, message]);
        break;
      }
      default:
        console.log('Unhandled event: ', event);
    }
  };

  useEffect(() => {
    /** @type {Array<number>} */
    const connectedStates = [WebSocket.OPEN, WebSocket.CONNECTING];
    if (user?._id && !connectedStates.includes(socket.current?.readyState)) {
      socket.current = new WebSocket(import.meta.env.VITE_WEBSOCKET_SERVER_URL);

      socket.current.addEventListener('open', onConnect);
      socket.current.addEventListener('close', onDisconnect);
      socket.current.addEventListener('message', onMessage);
    }

    return () => {
      if (socket.current?.readyState === WebSocket.OPEN) {
        socket.current.removeEventListener('open', onConnect);
        socket.current.removeEventListener('close', onDisconnect);
        socket.current.removeEventListener('message', onMessage);
        socket.current.close();
      }
    };
  }, [receiverId, user]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

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
      <div
        ref={chatContainerRef}
        className="p-4 h-[calc(100%-8rem)] overflow-y-auto"
      >
        {messages.length > 0 &&
          messages.map(message => (
            <div
              key={message._id}
              className={`chat ${
                isSenderMessage(message) ? 'chat-end' : 'chat-start'
              }`}
            >
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="user-avatar"
                    src={message.senderId.profileImageUrl}
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
              <time className="my-2 text-xs opacity-50">
                {formatDateTime(message.createdAt)}
              </time>
            </div>
          ))}
      </div>

      <div className="w-full flex items-center border-t border-gray-600 justify-between absolute bottom-0">
        <input
          type="text"
          ref={inputRef}
          value={newMessage}
          disabled={socket.current?.readyState !== WebSocket.OPEN}
          onChange={e => setNewMessage(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') handleSendMessage();
          }}
          placeholder="Type a new message"
          className="input input-bordered w-full m-4 flex-5/6"
        />
        <button
          className="btn btn-primary m-2 flex-1/6"
          onClick={handleSendMessage}
          disabled={socket.current?.readyState !== WebSocket.OPEN}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
