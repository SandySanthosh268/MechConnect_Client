import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

let stompClient = null;

export const connectWebSocket = (onMessageReceived) => {
  const socket = new SockJS('https://mechconnect-server.onrender.com/ws');
  stompClient = new Client({
    webSocketFactory: () => socket,
    debug: (str) => console.log(str),
    onConnect: () => {
      console.log('Connected to WebSocket');
      stompClient.subscribe('/user/topic/notifications', (message) => {
        if (onMessageReceived) {
          onMessageReceived(JSON.parse(message.body));
        }
      });
    },
    onStompError: (frame) => {
      console.error('Broker reported error: ' + frame.headers['message']);
      console.error('Additional details: ' + frame.body);
    },
  });

  stompClient.activate();
};

export const disconnectWebSocket = () => {
  if (stompClient) {
    stompClient.deactivate();
  }
};
