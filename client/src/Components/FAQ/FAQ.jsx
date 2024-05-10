import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
  AccordionItemState,
} from "react-accessible-accordion";
import "react-accessible-accordion/dist/fancy-example.css";
import { MdOutlineArrowDropDown } from "react-icons/md";
import faqData from "../../utils/faq.json";
import "./FAQ.css";

const FAQ = () => {
  return (
    <div className="faq-wrapper">
      <div className="paddings innerWidth faq-container">
        <span className="primaryText" style={{textAlign: "center"}}><h2>FAQ's</h2></span>
        <div className="faq-section">
          <Accordion className="accordion" allowMultipleExpanded={false}>
            {faqData.map((items, i) => {
              return (
                <AccordionItem className="accordion-item" key={i} uuid={i}>
                  <AccordionItemHeading>
                    <AccordionItemButton className="accordion-button">
                      <span className="primaryText">{items.question}</span>
                      <MdOutlineArrowDropDown size={40} />
                    </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                    <p>{items.answer}</p>
                  </AccordionItemPanel>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
