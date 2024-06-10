import React, { useEffect, useState } from "react";

import "../Booking/Booking.css";

const Booking = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function bookingdetails() {
      try {
        const response = await fetch(
          "http://localhost:8081/users/bookingDetails",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const result = await response.json();
        if (result.code !== 200) {
          alert("Something needs to be fixed");
        } else {
          setData(result.data); // Assuming the response has a `data` field containing the booking details
        }
      } catch (error) {
        console.error("Error fetching booking details:", error);
        alert("Failed to fetch booking details");

        if (data.length === 0) {
          return <h1 style={{ textAlign: "center" }}>No buses Available</h1>;
        }
      }
    }
    bookingdetails();
  }, []);

  if (data.length === 0) {
    return <h1 style={{ textAlign: "center" }}>makki chit</h1>;
  }

  return (
    <React.Fragment>
      <div className="booking-main-page">
        <h1>Booking Details</h1>
        <div className="booking-details-grid">
          {data.map((passenger, index) => (
            <div key={index} className="passenger-details">
              <div className="detail">
                <strong>Name:</strong> {passenger.passenger_name}
              </div>
              <div className="detail">
                <strong>Email:</strong> {passenger.email}
              </div>
              <div className="detail">
                <strong>Phone:</strong> {passenger.phone_no}
              </div>
              <div className="detail">
                <strong>Gender:</strong> {passenger.gender}
              </div>
              <div className="detail">
                <strong>Ride ID:</strong> {passenger.rideID}
              </div>
              <div className="detail">
                <strong>Bus Name:</strong> {passenger.bus_name}
              </div>
              <div className="detail">
                <strong>Seat Details:</strong> {passenger.seat_details}
              </div>
              <div className="detail">
                <strong>Shift:</strong> {passenger.shift}
              </div>
              <div className="detail">
                <strong>Time:</strong> {passenger.time}
              </div>
              <div className="detail">
                <strong>Route To:</strong> {passenger.route_to}
              </div>
              <div className="detail">
                <strong>Route From:</strong> {passenger.route_from}
              </div>
              <div className="detail">
                <strong>Date:</strong> {passenger.date}
              </div>
            </div>
          ))}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Booking;
