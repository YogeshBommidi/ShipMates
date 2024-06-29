import React from "react";
import "./BidCards.css";
import { useNavigate } from "react-router-dom";

const BidCards = ({ card }) => {
  const navigate = useNavigate();
  return (
    <div className="bidcard">
      <div>
        <span className="primaryText">{card.truckPriceEmail}</span>
        <span className="orangeText">{card.quotedPrice}</span>
      </div>
      <button
        className="btn"
        onClick={() => navigate(`../${card.truckPriceEmail}/${card.loadId}`)}
      >
        Select
      </button>
    </div>
  );
};

export default BidCards;
