import { io } from "socket.io-client";

export const socket = io("http://localhost:4004", {
  transports: ["websocket"],
});

export const createSocketConnection = async () => {
  return await socket.on("connect", () => {
    console.log("user is connected", socket.id);
  });
};
