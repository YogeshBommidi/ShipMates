import React from "react";
import './HomeCards.css'

const HomeCards = ({cards}) => {
  return (
    <div className="home-cards">
      <img src={cards.image} alt="" />
      <div className="home-cards-text">
        <span className="home-cards-heading">{cards.heading}</span>
        <span className="home-cards-details secondaryText">{cards.details}</span>
      </div>
    </div>
  );
};

export default HomeCards;
