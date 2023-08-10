import React from "react";
import Header from "../Header/Header";
// import App from "../Terminal/Terminal";

const Home = () => {
  return (
    <section className="super_main_sec">
      <Header />
      <div className="main_body">
        <div className="sub_body">
          {/* ===left side menu==== */}
          <div className="left_menu">
            <div className="search_div">
              <input type="text" placeholder="search by festival name" />
            </div>
            <ul>
              <li>Eid</li>
              <li>Diwali</li>
              <li>Bakrid</li>
              <li>Muharram</li>
              <li>Durga Puja</li>
              <li>Rakshbandhan</li>
              <li>Independence day</li>
              <li>Republic day</li>
              <li>Wedding</li>
              <li>Function</li>
            </ul>
          </div>

          {/* ===right side body=== */}
          <div className="right_div">
            <div className="banner_div">
              <div className="banner1">banner1</div>
              <div className="banner1">2</div>
              <div className="banner1">3</div>
            </div>
            <div className="right_body_div"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
