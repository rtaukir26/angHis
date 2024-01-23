import { useEffect, useState } from "react";
import { socket } from "../../socket";
import crossIcon from "../../assets/images/cross.png";
import expandIcon from "../../assets/images/expand.png";
import chatIcon from "../../assets/images/chat3.png";
import grpIcon from "../../assets/images/group.png";
import needIcon from "../../assets/images/needs.png";
import backIcon from "../../assets/images/back4.png";
import ListOfPeople from "./ListOfPeople";
import MessageComp from "./MessageComp";

const Chat = ({ setIsChatOpen, userSocketId, allActiveUsers }) => {
  console.log("allActiveUsers", allActiveUsers);

  const [userOptions, setUserOptions] = useState([
    { name: "chat", icon: chatIcon, status: "active" },
    { name: "groupChat", icon: grpIcon, status: "inactive" },
    { name: "updates", icon: needIcon, status: "inactive" },
  ]);

  const [currentUserChat, setCurrentUserChat] = useState("");
  const [sendMessage, setSendMessage] = useState("");
  const [messages, setMessages] = useState([]); //all messages

  const [peopleStatus, setPeopleStatus] = useState(true);
  const [isChatOn, setIsChatOn] = useState(false);

  console.log("dd isChatOn", isChatOn);
  console.log("dd peopleStatus", peopleStatus);

  //handle options - chat/group/update
  const handleOptionStatus = (option) => {
    setPeopleStatus(!peopleStatus);
    setIsChatOn(!isChatOn);
    setUserOptions((pre) => {
      if (pre?.name === option?.name) {
        return { ...pre, status: "active" };
      }
    });
  };
  //Handle back
  const handleBack = () => {
    setPeopleStatus(!peopleStatus);
    setIsChatOn(!isChatOn);
  };

  //handle click on user name
  const handleOnUser = (user) => {
    setCurrentUserChat(user);
    setIsChatOn(true);
    setPeopleStatus(false);
  };
  //handle send message
  const handleSendMessage = () => {
    socket.emit("message", {
      room: currentUserChat.socketId,
      id: userSocketId,
      message: sendMessage,
    });
    setSendMessage("");
  };

  //hanlde getting all message
  useEffect(() => {
    socket.on("replyMessage", (data) => {
      setMessages([...messages, data]);

      return () => {
        socket.off();
      };
    });
  }, [messages]);
  console.log("messages", messages);

  return (
    <div className="chat_con">
      {/* Chat Header */}
      <div className={`chat_header ${isChatOn && "d_flex"}`}>
        {isChatOn && (
          <div className="left">
            <img src={backIcon} alt="back" onClick={handleBack} />
            <span>{currentUserChat?.name}</span>
          </div>
        )}
        <div className="right">
          <img id="expand" src={expandIcon} alt="expand" />
          <img
            src={crossIcon}
            alt="cross"
            onClick={() => {
              setIsChatOpen(false);
            }}
          />
        </div>
      </div>

      {/* Options - chat/group/updates icon */}
      {!isChatOn && (
        <div className="user_status_con">
          {userOptions?.map((option) => (
            <span
              key={option.name}
              className={option.status === "active" && "active_class"}
              onClick={() => handleOptionStatus(option)}
            >
              <img src={option.icon} alt="group" />
            </span>
          ))}
        </div>
      )}

      {/* List of people */}
      {peopleStatus && (
        <ListOfPeople
          allActiveUsers={allActiveUsers}
          handleOnUser={handleOnUser}
        />
      )}

      {/* Message box */}
      {isChatOn && (
        <MessageComp
          messages={messages}
          userSocketId={userSocketId}
          sendMessage={sendMessage}
          setSendMessage={setSendMessage}
          handleSendMessage={handleSendMessage}
        />
      )}
    </div>
  );
};

export default Chat;
