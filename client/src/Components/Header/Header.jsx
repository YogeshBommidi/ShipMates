import React from "react";
import "./Header.css";
const Header = () => {
  return (
    <div className="header-wrapper">
      <div className="innerWidth header-container">
        <a href="">
          <img src="./header-logo.png" alt="logo" />
        </a>

        <div className="header-menu">
          <ul id="NavBar">
            <li>
              <a href="" className="active">
                HOME
              </a>
            </li>
            <li>
              <a href="">MEMBERSHIP</a>
            </li>
            <li>
              <a href="">MARKET PLACE</a>
            </li>
            <li>
              <a href="">TRANSPORT DIRECTORY</a>
            </li>
            <li>
              <button className="btn">LOGIN/SIGNUP</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
