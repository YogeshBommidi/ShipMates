import React, { useEffect, useRef, useState } from "react";
import aboutData from "../../utils/about.json";
import "./About.css";

const paragraphStyles = {
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  display: "-webkit-box",
};

const About = () => {
  const [isOpen, setIsOpen] = useState(1);

  return (
    <div className="about-wrapper">
      <div className=" paddings innerWidth about-container">
        <img src={"./header-logo.png"} alt="" />
        <div>
          {aboutData.slice(0, isOpen).map((item, i) => (
            <div key={i} className="about-item">
              <span className="primaryText">{item.question}</span>
              <span
                className="secondaryText"
                style={isOpen > 1 ? null : paragraphStyles}
              >
                {item.answer}
              </span>
            </div>
          ))}

          <button onClick={() => setIsOpen((prev) => (prev === 1 ? 10 : 1))}>
            {isOpen ? "Read Less" : "Read More"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;
