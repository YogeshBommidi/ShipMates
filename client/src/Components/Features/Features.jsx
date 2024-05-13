import React from "react";
import "./Features.css";
import featuresData from "../../utils/Features-data.json";
import HomeCards from "../HomeCards/HomeCards";
const Features = () => {
  return (
    <div className="features-wrapper">
      <div className="paddings innerWidth features-container">
        <span className="primaryText features-head">
          <h2>Right Trucking Partner for Your Business</h2>
        </span>
        <span className="secondaryText features-desc">
          Experience hassle-free online truck booking without wasting money and
          time. Check estimated transportation costs and book trucks for your
          desired locations across India in just a few clicks. Here are some
          unnoticeable reasons why you should choose us:
        </span>
        <div className="features-cards">
          {featuresData.map((cards, i) => {
            return <HomeCards cards={cards} key={i} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Features;
