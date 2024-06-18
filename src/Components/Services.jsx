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
        <h3>Easy Booking</h3>
        <p>Book your bus tickets in just a few clicks.</p>
      </div>
      <div className="feature">
        <div className="feature-icon">{<IoTimeSharp />}</div>
        <h3>Real-time Schedules</h3>
        <p>View up-to-date bus schedules and arrival times.</p>
      </div>
      <div className="feature">
        <div className="feature-icon">{<RiSecurePaymentLine />}</div>
        <h3>Secure Payments</h3>
        <p>Pay for your tickets securely with your preferred method.</p>
      </div>
    </div>
  );
};

export default Services;
