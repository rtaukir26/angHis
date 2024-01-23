import userIcon from "../../assets/images/user.png";

const RenderMessage = () => {
  return (
    <div className="incoming_message">
      <div className="user_icon">
        <img src={userIcon} alt="user" />
      </div>
      <p>
        message came and the wide of the tour was faboulus and the meeting
        around there was an accelant the world of the
      </p>
      <small>11:20 am</small>
    </div>
  );
};

export default RenderMessage;
