import { io } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;

// current socket
export const currentSocket = (socketRef) => {
  socketRef.current = io(SOCKET_URL, {
    // transports: ["websocket"],
  });
};
