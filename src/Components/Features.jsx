import React from "react";
import "../Styles/Features.css";
import model from "../Photos/model.png";
const Features = () => {
  return (
    <>
      <div className="features-cnt">
        <div className="features-box">
          <div className="features-left">
            <div className="model-pic">
              <img src={model} alt="" />
            </div>
            {/* <div className="h1">2</div> */}
          </div>
          <div className="features-right">
            <div className="features-text">
              <h4 className="book">Book</h4>
              <p>your Seats</p>
              <h4>AnyTime,</h4>
              <h4>AnyWhere </h4>
              <p className="bottom-text"> with just few clicks</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Features;
