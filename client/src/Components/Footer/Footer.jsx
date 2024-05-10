import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer-wrapper">
      <div className="paddings innerWidth footer-container">
        <div className="footer-1">
          <img src={"./header-logo.png"} alt="" />

          <div className="footer-accounts">
            <span className="primaryText">
              <h2>Accounts</h2>
            </span>
            <ul>
              <li className="secondaryText">Privacy Policy</li>
              <li className="secondaryText">Terms Of Use</li>
              <li className="secondaryText">Cookie Policy</li>
              <li className="secondaryText">Careers</li>
            </ul>
          </div>
          <div className="footer-socials">
            <span className="primaryText">
              <h2>Socials</h2>
            </span>
            <ul>
              <li className="secondaryText">Instagram</li>
              <li className="secondaryText">LinkedIn</li>
              <li className="secondaryText">Facebook</li>
              <li className="secondaryText">YouTube</li>
            </ul>
          </div>
        </div>
        <div className=" paddings footer-2">
          <div className="copy-right">
            <span>&copy; Copyright </span>
            <a href="">ShipMates</a>
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
