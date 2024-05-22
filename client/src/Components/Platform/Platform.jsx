import React from "react";
import platformData from "../../data/platform.json";
import "./Platform.css";
import HomeCards from "../HomeCards/HomeCards";

const Platform = () => {
  return (
    <div className="platform-wrapper">
      <div className="paddings innerWidth platform-container">
        <div className="platform-heading primaryText">
          India’s Largest Trucking Platform
        </div>
        <div className="platform-cards">
          {platformData.map((cards, i) => {
            return <HomeCards cards={cards} key={i} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Platform;
