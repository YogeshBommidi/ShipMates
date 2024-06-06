import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/css";
import "./Reviews.css";
import reviewsData from "../../data/reviews.json";
import { sliderSettings } from "../../utils/common";

const paragraphStyles = {
  WebkitLineClamp: 3,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  display: "-webkit-box",
};

const Reviews = () => {
  const [isOpenIndex, setIsOpenIndex] = useState(null);

  const [showReadMore, setShowReadMore] = useState(false);

  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      setShowReadMore(ref.current.scrollHeight !== ref.current.clientHeight);
    }
  }, []);

  return (
    <div className="review-wrapper">
      <div className="paddings innerWidth review-container">
        <div className="primaryText review-heading">
          We're Loved By Our Customers
        </div>
        <div className="review-card-section">
          <Swiper {...sliderSettings}>
            <SliderButtons />
            {reviewsData.map((cards, i) => (
              <SwiperSlide key={i}>
                <div className="review-cards">
                  <img src={cards.image} alt="home" />
                  <div className="review-text">
                    <span>{cards.name}</span>
                    <span>{cards.company}</span>
                    <p
                      style={i === isOpenIndex ? null : paragraphStyles}
                      className="secondaryText"
                      ref={ref}
                    >
                      {cards.review}
                    </p>
                    {showReadMore && (
                      <button
                        onClick={() =>
                          setIsOpenIndex((prevIndex) =>
                            prevIndex === i ? null : i
                          )
                        }
                      >
                        {i === isOpenIndex ? "Read Less" : "Read More "}
                      </button>
                    )}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};
export default Reviews;

const SliderButtons = () => {
  const swiper = useSwiper();
  return (
    <div className="review-buttons">
      <button className="btn" onClick={() => swiper.slidePrev()}>
        &lt;
      </button>
      <button className="btn" onClick={() => swiper.slideNext()}>
        &gt;
      </button>
    </div>
  );
};
