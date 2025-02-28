import React, { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import "./Booking.css";
// import AdminPage from "./AdminPage";
// import { Outlet } from "react-router-dom";

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
          setData(result.data);
        }
      } catch (error) {
        console.error("Error fetching booking details:", error);
        alert("Failed to fetch booking details");
      }
    }
    bookingdetails();
  }, []);

  // if (data.length === 0) {
  //   return <h1 style={{ textAlign: "center" }}>No passengers available</h1>;
  // }

  async function handlePsgDelete(passengerId) {
    try {
      const response = await fetch(
        "http://localhost:8081/users/deletePassenger",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            passengerid: passengerId,
          }),
        }
      );
      const result = await response.json();
      if (result.msg === "Passenger deleted successfully") {
        alert("Passenger deleted successfully");
        // Remove the deleted passenger from the state
        setData(data.filter((passenger) => passenger.id !== passengerId));
      } else {
        alert(result.msg);
      }
    } catch (error) {
      console.error("Error deleting passenger:", error);
      alert("Failed to delete passenger");
    }
  }

  return (
    <>
      <div className="booking-main-page">
        <h1>Booking Details</h1>
        <div className="booking-details-grid">
          {data.map((passenger, index) => (
            <div key={index} className="passenger-details">
              <button
                className="delete-btn"
                onClick={() => handlePsgDelete(passenger.id)}
              >
                <AiFillDelete />
              </button>
              <div className="detailname">
                <h5>{passenger.passenger_name}</h5>
              </div>
              {/* <div className="detail">
                <strong>Id:</strong> {passenger.id}
              </div> */}
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
    </>
  );
};

export default Booking;
