import React from "react";
import "./Hero.css";

const Hero = () => {
  return (
    <div className="hero-wrapper">
      <div className="paddings innerWidth hero-container">
        <div className="hero-left">
          <div className="primaryText hero-title">
            <h1> Online Truck Booking & Transport Services in India.</h1>
          </div>
          <div className="orangeText hero-description">
            <span>India's #1 truck booking platform</span>
          </div>
          <div className="hero-buttons">
            <button className="btn">Find Load</button>
            <button className="btn">Explore More</button>
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
