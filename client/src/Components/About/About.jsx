import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="about-wrapper">
      <div className=" paddings innerWidth about-container">
        <img src={"./header-logo.png"} alt="" />
        <div>
          <span className="primaryText">
            Your Reliable and Trusted Transport Services Provider
          </span>
          <span className="secondaryText">
            WheelsEye is dedicated to offering high-quality and cost-effective
            transport services to various business owners in India. We aim to
            reduce the gap between the customers and manufacturers/traders
            through our hassle-free and quick transportation services. Our
            online booking platform has simplified the process of hiring trucks
            to transport your goods from one city to another. We manage the
            highest number of trucks, which are more than 20 lakhs Trucks, for
            shipping goods across PAN-India.
          </span>
          <a href="">Read More</a>
        </div>
      </div>
    </div>
  );
};

export default About;
