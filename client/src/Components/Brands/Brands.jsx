import React from "react";
import brandsData from "../../data/brands.json";
import "./Brands.css";
const Brands = () => {
  return (
    <div className="brands-wrapper">
      <div className="paddings innerWidth brands-container">
        <div className="brands-title primaryText">Brands Who Trust Us</div>
        <div className="brands-logos">
          {brandsData.map((logos, i) => {
            return <img src={logos.image} alt="Brand Logo" key={i} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Brands;
