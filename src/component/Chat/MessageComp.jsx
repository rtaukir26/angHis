import ReactScrollToBottom from "react-scroll-to-bottom";
import sendIcon from "../../assets/images/send.png";
import userIcon from "../../assets/images/user.png";
import attchmentIcon from "../../assets/images/attachment.png";

const MessageComp = ({
  messages,
  userSocketId,
  sendMessage,
  setSendMessage,
  handleSendMessage,
}) => {
  return (
    <>
      <ReactScrollToBottom className="chat_body">
        {messages?.map((item, i) => (
          <div
            key={item.key}
            className={
              item.id === userSocketId ? "outgoing_message" : "incoming_message"
            }
          >
            <div className="user_icon">
              <img src={userIcon} alt="user" />
            </div>
            <p>{item?.message}</p>
            <small>11:20 am</small>
          </div>
        ))}
      </ReactScrollToBottom>

      <div className="send_div">
        <input
          type="text"
          value={sendMessage}
          onChange={(e) => setSendMessage(e.target.value)}
          autoFocus
          placeholder="write something..."
        />
        <div className="send_btn">
          <img className="" src={attchmentIcon} alt="attach btn" />
          <img
            className=""
            src={sendIcon}
            alt="send btn"
            onClick={handleSendMessage}
          />
        </div>
      </div>
    </>
  );
};

export default MessageComp;
