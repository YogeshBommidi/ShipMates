import React from "react";
import "./BidCards.css";

const BidCards = ({ card }) => {
  return (
    <div className="bidcard">
      <div>
        <span className="primaryText">{card.truckPriceEmail}</span>
        <span className="orangeText">{card.quotedPrice}</span>
      </div>
      <button className="btn">Cancel</button>
      <button className="btn">Select</button>
    </div>
  );
};

export default BidCards;
