import React from "react";
import reviewsData from "../../utils/reviews.json";
import './Reviews.css'

const Reviews = () => {
  return (
    <div className="review-wrapper">
      <div className="paddings innerWidth review-container">
        <div className="review-title">
          <span className="primaryText"><h2>We're Loved By Our Customers</h2></span>
        </div>
        <div className="review-card-section">
          {reviewsData.map((card, i) => {
            return (
              <div className="review-card" key={i}>
                <div className="review-card-image">
                  <img src={card.image} alt="" />
                </div>
                <div className="review-card-text">
                  <span>{card.name}</span>
                  <span>{card.company}</span>
                  <span>{card.review}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
