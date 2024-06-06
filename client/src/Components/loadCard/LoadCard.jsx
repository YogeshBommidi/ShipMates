import React from "react";
import "./LoadCard.css";
import { truncate } from "lodash";
import { useNavigate } from "react-router-dom";
import Heart from "../Heart/Heart";

const LoadCard = ({ card }) => {
  const navigate = useNavigate();
  return (
    <div
      className="load-card"
      onClick={() => navigate(`../MarketPlace/${card.id}`)}
    >
      <Heart id={card.id} />
      <img src={card.image} alt="Load-image" />
      <span className="primaryText">
        <span style={{ color: "orange" }}>$ </span>
        <span>{card.price}</span>
      </span>
      <span className="primaryText">
        {truncate(card.title, { length: 15 })}
      </span>
      <span className="secondaryText">
        {truncate(card.description, { length: 50 })}
      </span>
    </div>
  );
};

export default LoadCard;
