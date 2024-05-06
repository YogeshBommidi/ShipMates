import React from "react";
import "./NavBar.css";

const NavBar = () => {
  return (
    <section className="header-wrapper">
      <div className="flexCenter paddings innerWidth header-container">
        <img src="./home-logo.png" alt="Logo" />
        <ul className="flexCenter orangeText header-menu">
          <li>MemberShip</li>
          <li>MarketPlace</li>
          <li>Transport Directory</li>
          <button className="btn">LogIn/SignUp</button>
        </ul>
      </div>
    </section>
  );
};

export default NavBar;
