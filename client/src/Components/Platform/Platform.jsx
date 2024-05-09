import React from "react";
import platformData from "../../utils/platform.json";
import "./Platform.css";
import HomeCards from "../HomeCards/HomeCards";

const Platform = () => {
  return (
    <div className="platform-wrapper">
      <div className="paddings innerWidth platform-container">
        <div className="platform-heading">
          <span className="primaryText">India’s Largest Trucking Platform</span>
        </div>
        <div className="platform-cards">
          {platformData.map((cards) => {
            return <HomeCards cards={cards} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Platform;
