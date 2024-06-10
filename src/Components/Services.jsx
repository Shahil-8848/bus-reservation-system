import React from "react";
import "../Styles/Services.css";
import { IoTicket } from "react-icons/io5";
import { IoTimeSharp } from "react-icons/io5";
import { RiSecurePaymentLine } from "react-icons/ri";
const Services = () => {
  return (
    <div className="services-page">
      <div className="services-cnt">
        <div className="cl-1">
          <div className="ticket">
            <span>{<IoTicket />}</span>
            <h2>Easy Bookings</h2>
            <p>Book your seat tickets in just a few clicks</p>
          </div>
        </div>
        <div className="cl-2">
          <div className="reservation">
            <span>{<IoTimeSharp />}</span>
            <h2>Real-time reservation</h2>
            <p>View up-to date bus schedules and route times</p>
          </div>
        </div>
        <div className="cl-3">
          <div className="secure-pay">
            <span>{<RiSecurePaymentLine />}</span>
            <h2>Secure Payments </h2>
            <p>Pay for your ticket securely</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
