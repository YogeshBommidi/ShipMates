import React from "react";
import "./Hero.css";

const Hero = () => {
  return (
    <div className="hero-wrapper">
      <div className="innerWidth hero-container">
        {/**
  <div className="hero-left">
  <h1 className="primaryText">
  Online Truck Booking & Transport Services in India.
  </h1>
  <p className="orangeText">India's #1 truck booking platform</p>
  <div className="hero-buttons">
  <button className="btn">Explore More</button>
  <button className="btn">Find Loads</button>
  </div>
  </div>
*/}
        <div className="hero-left-grid">
          <div className="grid-items">
            <h1 className="primaryText">
              Online Truck Booking & Transport Services in India.
            </h1>
          </div>
          <div className="grid-items">
            <p className="orangeText">India's #1 truck booking platform</p>
          </div>
          <div className="grid-items">
            <button className="btn">Explore More</button>
            <button className="btn">Find Loads</button>
          </div>
        </div>
        <div className="hero-right">
          <img src="/hero-image.png" alt="truck-image" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
