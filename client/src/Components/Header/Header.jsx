import React, { useState, useEffect } from "react";
import { BiMenuAltRight } from "react-icons/bi";
import { GiCancel } from "react-icons/gi";
import OutsideClickHandler from "react-outside-click-handler";
import { Link, NavLink } from "react-router-dom";
import "./Header.css";
import { useAuth0 } from "@auth0/auth0-react";
import ProfileMenu from "../ProfileMenu/ProfileMenu";

const Header = () => {
  const [menuOpened, setMenuOpened] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const { loginWithRedirect, isAuthenticated, user, logout } = useAuth0();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="header-wrapper">
      <div className="innerWidth header-container">
        <Link to="/">
          <img src="./header-logo.png" alt="logo" />
        </Link>
        {menuOpened === false && isMobile ? (
          <div onClick={() => setMenuOpened(!menuOpened)} className="menu-icon">
            <BiMenuAltRight size={35} />
          </div>
        ) : (
          <div className="header-menu">
            {menuOpened && isMobile ? (
              <div className="close-icon">
                <GiCancel size={30} onClick={() => setMenuOpened(false)} />
              </div>
            ) : null}
            <NavLink to="/MarketPlace" onClick={() => setMenuOpened(false)}>
              Market Place
            </NavLink>
            <a
              href="mailto:yogeshbommidi@gmail.com"
              onClick={() => setMenuOpened(false)}
            >
              Contact Us
            </a>
            {!isAuthenticated ? (
              <button className="btn" onClick={loginWithRedirect}>
                Login
              </button>
            ) : (
              <ProfileMenu user={user} logout={logout} />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
