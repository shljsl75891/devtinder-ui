import {io} from 'socket.io-client';
import environment from '../config/environment';

const socket = io(environment.baseApiUrl, {
  withCredentials: true,
  autoConnect: false,
});

socket.on('connect_error', err => {
  console.error(err);
});

socket.on('disconnect', () => {
  socket.off('connect_error');
  console.info('Disconnected from the server');
});

export default socket;
