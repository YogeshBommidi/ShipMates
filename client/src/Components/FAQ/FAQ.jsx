import React, { useState } from "react";
import "react-accessible-accordion/dist/fancy-example.css";
import { MdOutlineArrowDropDown } from "react-icons/md";
import faqData from "../../utils/faq.json";
import "./FAQ.css";

const FAQ = () => {
  const [isOpen, setIsopen] = useState(4);

  const [isItemOpen, setIsItemOpen] = useState(null);

  const handleToggle = (index) => {
    setIsItemOpen((prev) => (prev === index ? null : index));
  };

  return (
    <div className="faq-wrapper">
      <div className="innerWidth faq-container">
        <span className="primaryText">
          <h2>FAQ's</h2>
        </span>
        <div className="faq-section">
          {faqData.slice(0, isOpen).map((items, i) => {
            return (
              <div className="faq-item" key={i}>
                <div>
                  <h4>{items.question}</h4>
                  <button onClick={() => handleToggle(i)}>
                    <MdOutlineArrowDropDown size={30} />
                  </button>
                </div>
                {i === isItemOpen ? <p>{items.answer}</p> : null}
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
