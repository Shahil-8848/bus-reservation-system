import React from "react";
import "../Styles/Services.css";
import { IoTicket } from "react-icons/io5";
import { IoTimeSharp } from "react-icons/io5";
import { RiSecurePaymentLine } from "react-icons/ri";
const Services = () => {
  return (
    <div className="features-container">
      <div className="feature">
        <div className="feature-icon">{<IoTicket />}</div>
        <h4>Easy Booking</h4>
        <p>Book your bus tickets in just a few clicks.</p>
      </div>
      <div className="feature">
        <div className="feature-icon">{<IoTimeSharp />}</div>
        <h4>Real-time Schedules</h4>
        <p>View up-to-date bus schedules & arrival times.</p>
      </div>
      <div className="feature">
        <div className="feature-icon">{<RiSecurePaymentLine />}</div>
        <h4>Secure Payments</h4>
        <p>Pay for your tickets securely with your preferred method.</p>
      </div>
    </div>
  );
};

export default Services;
