import React, { useEffect, useReducer, useRef, useState } from "react";
import { BiMenuAltRight } from "react-icons/bi";
import { GiCancel } from "react-icons/gi";
import OutsideClickHandler from "react-outside-click-handler";
import "./Header.css";

const Header = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const mobile = window.innerWidth <= 768 ? true : false;

  const [menuOpened, setMenuOpened] = useState(false);

  return (
    <div className="header-wrapper">
      <div className="innerWidth header-container">
        <a href="">
          <img src="./header-logo.png" alt="logo" />
        </a>
        <OutsideClickHandler onOutsideClick={() => setMenuOpened(false)}>
          {menuOpened === false && mobile === true ? (
            <div onClick={() => setMenuOpened(!menuOpened)}>
              <BiMenuAltRight size={30} />
            </div>
          ) : (
            <div className="header-menu">
              <div>
                {menuOpened === true ? (
                  <GiCancel size={30} onClick={() => setMenuOpened(false)} />
                ) : null}
              </div>
              <ul className="navbar">
                <li
                  className={activeIndex === 0 ? "active" : ""}
                  onClick={() => setActiveIndex(0)}
                >
                  HOME
                </li>
                <li
                  className={activeIndex === 1 ? "active" : ""}
                  onClick={() => setActiveIndex(1)}
                >
                  MEMBERSHIP
                </li>
                <li
                  className={activeIndex === 2 ? "active" : ""}
                  onClick={() => setActiveIndex(2)}
                >
                  MARKET PLACE
                </li>
                <li
                  className={activeIndex === 3 ? "active" : ""}
                  onClick={() => setActiveIndex(3)}
                >
                  TRANSPORT DIRECTORY
                </li>
                <li>
                  <button className="btn">LOGIN/SIGNUP</button>
                </li>
              </ul>
            </div>
          )}
        </OutsideClickHandler>
      </div>
    </div>
  );
};

export default Header;
