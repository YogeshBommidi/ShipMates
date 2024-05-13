import React, { useState } from "react";
import "./Header.css";

const Header = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleItemClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className="header-wrapper">
      <div className="innerWidth header-container">
        <a href="">
          <img src="./header-logo.png" alt="logo" />
        </a>

        <div className="header-menu">
          <ul className="navbar">
            <li
              className={activeIndex === 0 ? "active" : ""}
              onClick={() => handleItemClick(0)}
            >
              HOME
            </li>
            <li
              className={activeIndex === 1 ? "active" : ""}
              onClick={() => handleItemClick(1)}
            >
              MEMBERSHIP
            </li>
            <li
              className={activeIndex === 2 ? "active" : ""}
              onClick={() => handleItemClick(2)}
            >
              MARKET PLACE
            </li>
            <li
              className={activeIndex === 3 ? "active" : ""}
              onClick={() => handleItemClick(3)}
            >
              TRANSPORT DIRECTORY
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
