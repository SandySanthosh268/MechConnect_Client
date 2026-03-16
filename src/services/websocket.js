import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

let stompClient = null;

export const connectWebSocket = (onMessageReceived) => {

  const socket = new SockJS("https://mechconnect-server.onrender.com/ws");

  stompClient = new Client({
    webSocketFactory: () => socket,

    reconnectDelay: 5000,

    debug: (str) => {
      console.log("STOMP: ", str);
    },

    onConnect: () => {
      console.log("WebSocket Connected");

      stompClient.subscribe("/user/topic/notifications", (message) => {
        if (message.body && onMessageReceived) {
          const data = JSON.parse(message.body);
          onMessageReceived(data);
        }
      });
    },

    onStompError: (frame) => {
      console.error("Broker error:", frame.headers["message"]);
      console.error("Details:", frame.body);
    }
  });

  stompClient.activate();
};

export const disconnectWebSocket = () => {
  if (stompClient) {
    console.log("Disconnecting WebSocket...");
    stompClient.deactivate();
    stompClient = null;
  }
};