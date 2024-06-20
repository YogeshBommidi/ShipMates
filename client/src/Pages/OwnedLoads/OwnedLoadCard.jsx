import React from "react";
import "./OwnedLoadCard.css";
import { truncate } from "lodash";
import { useNavigate } from "react-router-dom";

const OwnedLoadCard = ({ card }) => {
  const navigate = useNavigate();
  return (
    <div
      className="owned-load-card"
      onClick={() => navigate(`../OwnedLoads/${card.id}`)}
    >
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

export default OwnedLoadCard;
