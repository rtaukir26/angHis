import { socket } from ".";

export const listenSocketEvents = () => {
  //   ecuSocket.off(socketEvents.replyVciDeviceInfo);
  socket.on("welcome", replyWelcomeMessageCallBack);
};

//Note used yet
