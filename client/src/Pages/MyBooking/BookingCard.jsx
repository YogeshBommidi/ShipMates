import React from "react";
import "./BookingCard.css";
import { truncate } from "lodash";
import { useNavigate } from "react-router-dom";

const BookingCard = ({ card }) => {
  const navigate = useNavigate();
  return (
    <div
      className="booking-card"
      onClick={() => navigate(`../MarketPlace/${card.id}`)}
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

export default BookingCard;
