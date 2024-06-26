import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer-wrapper">
      <div className="paddings innerWidth footer-container">
        <div className="footer-1">
          <img src={"./header-logo.png"} alt="" />

          <div className="footer-accounts">
            <span className="primaryText">Developer</span>
            <ul>
              <li className="secondaryText">About Developer</li>
              <a href="https://github.com/YogeshBommidi/ShipMates" className="orangeText">ShipMates Code</a>
            </ul>
          </div>
          <div className="footer-socials">
            <span className="primaryText">SOCIALS</span>
            <ul>
              <li className="secondaryText">Instagram</li>
              <a href="https://www.linkedin.com/in/yogesh-bommidi-74263223b/" className="orangeText">LinkedIn</a>
              <li className="secondaryText">Facebook</li>
              <li className="secondaryText">YouTube</li>
            </ul>
          </div>
        </div>
        <div className=" paddings footer-2">
          <div className="copy-right">
            <span>&copy; Copyright </span>
            <a href="" className="orangeText"> ShipMates</a>
          </div>
          <div className="rights">
            <span>All Right Reserved</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
