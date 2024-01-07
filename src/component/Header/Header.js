import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import profileIcon from "../../assets/images/profile2.png";
import BrandLogo from "../../assets/images/brandLogo.png";
import logOutIcon from "../../assets/images/check-out.png";

const Header = () => {
  const navigate = useNavigate();
  const [themeChange, setThemeChange] = useState(false);

  //useffect for checking dark mode
  useEffect(() => {
    const themeChangeValue = localStorage.getItem("theme-mode");
    setThemeChange(themeChangeValue === "dark-theme");
  }, []);

  //handle click theme changing toggle
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
    navigate("/login");
  };
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

            <li tabIndex="0" className="logout_li">
              <img className="user_icon_img" src={logOutIcon} alt="logout" />

              <div className="user_details_con">
                <div className="user_header">
                  <img src={profileIcon} alt="user icon" />
                  <div>
                    <p>Md Tauqueer</p>
                    <p>Tauqueer@gmail.com</p>
                  </div>
                </div>
                <p className="confirm_text">Are you sure you want to logout?</p>
                <div className="btn_grp">
                  <button>No</button>
                  <button onClick={handleClickLogout}>Yes</button>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Header;
