import React from "react";
import { HiHeart } from "react-icons/hi";
import "./LoadCard.css";
import { truncate } from "lodash";

const LoadCard = ({ card }) => {
  return (
    <div className="load-card">
      <HiHeart id={card.id} color="white" size={20} />
      <img src={card.image} alt="Load-image" />
      <span className="primaryText">
        <span style={{ color: "orange" }}>$ </span>
        <span>{card.price}</span>
      </span>
      <span className="primaryText">
        {truncate(card.title, { length: 15 })}
      </span>
      <span className="secondaryText">{truncate(card.description, {length : 60})}</span>
    </div>
  );
};

export default LoadCard;
