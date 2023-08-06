import React, { useEffect, useState } from "react";
import useIcon from "../../assets/images/user.png";
// import { ReactComponent as BrandLogo } from "../../assets/images/drupal.svg";
import BrandLogo from "../../assets/images/brandLogo.png";
// import sunIcon from "../../assets/images/sun.png";

const Header = () => {
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
        <div className="middle_header">middle</div>
        <div className="right_header">
          <ul>
            <li onClick={handleClick_themeChanging}>
              <div
                className="toggle_div"
                title={
                  themeChange
                    ? "switch to light theme"
                    : "switch to dark theme"
                }
              >
                <span
                  className={`toggle_ball ${
                    !themeChange ? "light_view" : "dark_view"
                  }`}
                ></span>
              </div>
            </li>
            <li>
              <img className="user_icon_li" src={useIcon} alt="user" />{" "}
            </li>
            <li>log out</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Header;
