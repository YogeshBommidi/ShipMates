import React, { useState } from "react";
import "react-accessible-accordion/dist/fancy-example.css";
import { MdOutlineArrowDropDown } from "react-icons/md";
import faqData from "../../data/faq.json";
import "./FAQ.css";

const FAQ = () => {
  const [isOpen, setIsopen] = useState(4);

  const [isItemOpen, setIsItemOpen] = useState(null);

  const handleToggle = (index) => {
    setIsItemOpen((prev) => (prev === index ? null : index));
  };

  return (
    <div className="faq-wrapper">
      <div className="paddings innerWidth faq-container">
        <span className="primaryText">FAQ's</span>
        <div className="faq-section">
          {faqData.slice(0, isOpen).map((items, i) => {
            return (
              <div className="faq-item" key={i}>
                <div>
                  {items.question}
                  <button onClick={() => handleToggle(i)}>
                    <MdOutlineArrowDropDown size={30} />
                  </button>
                </div>
                {i === isItemOpen ? <p className="secondaryText">{items.answer}</p> : null}
              </div>
            );
          })}
        </div>
        <button
          onClick={() => setIsopen((prev) => (prev === 4 ? faqData.length : 4))}
        >
          {isOpen === 4 ? "View More Answers" : "View Less Answers"}
        </button>
      </div>
    </div>
  );
};

export default FAQ;
