import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BrandLogo from "../../assets/images/brandLogo.png";
import chatIcon from "../../assets/images/chat2.png";
import logOutIcon from "../../assets/images/logout.png";
import routePaths from "../../routes/routePaths";
import UserDetails from "./UserDetails";
import Chat from "../Chat/Chat";
import { createSocketConnection, socket } from "../../socket";

const Header = () => {
  const navigate = useNavigate();
  const [themeChange, setThemeChange] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [userSocketId, setUserSocketId] = useState("");

  const [allActiveUsers, setAllActiveUsers] = useState([]);
  //useffect for checking dark mode
  useEffect(() => {
    const themeChangeValue = localStorage.getItem("theme-mode");
    setThemeChange(themeChangeValue === "dark-theme");
  }, []);

  //handle click toggle - theme
  const handleClick_themeChanging = () => {
    const body = document.getElementsByTagName("body")[0];
    if (themeChange) {
      body.classList.remove("dark-theme");
      body.classList.add("light-theme");
      localStorage.setItem("theme-mode", "light-theme");
      setThemeChange(!themeChange);
    } else {
      body.classList.add("dark-theme");
      body.classList.remove("light-theme");
      localStorage.setItem("theme-mode", "dark-theme");
      setThemeChange(!themeChange);
    }
  };
  const handleClickLogout = () => {
    localStorage.removeItem("user");
    navigate(routePaths.login);
  };

  const handleOnChatIcon = () => {
    setIsChatOpen(!isChatOpen);
    createSocketConnection()
      .then((socket) => {
        setUserSocketId(socket.id);
      })
      .catch((err) => err);
  };

  useEffect(() => {
    socket.on("userOnline", (users) => {
      setAllActiveUsers(users);

      console.log("users", users);
    });
  }, []);
  return (
    <section>
      <div className="main_header_div">
        <div className="left_header">
          <span>
            {/* <BrandLogo /> */}
            <img src={BrandLogo} alt="logo" />
          </span>
          <span className="brand_name">AngHis</span>
        </div>

        <div className="middle_header">
          <ul>
            <li>Home</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
        </div>

        <div className="right_header">
          <ul>
            <li onClick={handleClick_themeChanging}>
              <div
                className="toggle_div"
                title={
                  themeChange ? "switch to light theme" : "switch to dark theme"
                }
              >
                <span
                  className={`toggle_ball ${
                    !themeChange ? "light_view" : "dark_view"
                  }`}
                ></span>
              </div>
            </li>
            {/* Chat */}
            <li className="user_chat_li">
              <img
                className="user_icon_img"
                src={chatIcon}
                alt="logout"
                onClick={handleOnChatIcon}
              />

              {isChatOpen && (
                <Chat
                  setIsChatOpen={setIsChatOpen}
                  userSocketId={userSocketId}
                  allActiveUsers={allActiveUsers}
                />
              )}
            </li>

            <li tabIndex="0" className="logout_li">
              <img className="user_icon_img" src={logOutIcon} alt="logout" />

              <UserDetails handleClickLogout={handleClickLogout} />
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Header;
