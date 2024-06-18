import React, { useEffect, useState } from "react";
import "./BusDetails.css";
import { PiSteeringWheelFill } from "react-icons/pi";
import { MdOutlineRestartAlt } from "react-icons/md";

const BusDetails = () => {
  const [busDetails, setBusDetails] = useState([]);
  const [showSeats, setShowSeats] = useState({});

  useEffect(() => {
    async function fetchBusDetails() {
      try {
        const response = await fetch("http://localhost:8081/users/BusDetails", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const result = await response.json();
        if (result.code !== 200) {
          alert("There is an issue");
        } else {
          setBusDetails(result.data);
        }
      } catch (error) {
        console.error("Error fetching bus details:", error);
        alert("Failed to fetch bus details");
      }
    }
    fetchBusDetails();
  }, []);

  const toggleSeats = (rideID) => {
    setShowSeats((prevState) => ({
      ...prevState,
      [rideID]: !prevState[rideID],
    }));
  };

  return (
    <div className="bus-details-container">
      {busDetails.map((bus) => (
        <div key={bus.rideID} className="bus-card">
          <div className="bus-info">
            <h2>{bus.busType}</h2>
            <div className="bus-detail-grid">
              <div className="bus-detail-item">
                <strong>From:</strong> {bus.fromDest}
              </div>
              <div className="bus-detail-item">
                <strong>To:</strong> {bus.toDest}
              </div>
              <div className="bus-detail-item">
                <strong>Shift:</strong> {bus.shift}
              </div>
              <div className="bus-detail-item">
                <strong>Ride Time:</strong> {bus.rideTime}
              </div>
              <div className="bus-detail-item">
                <strong>Features:</strong> {bus.busFeatures}
              </div>
            </div>
            <button onClick={() => toggleSeats(bus.rideID)}>
              {showSeats[bus.rideID] ? "Hide Seats" : "Show Seats"}
            </button>
          </div>
          {showSeats[bus.rideID] && (
            <div className="seat-availability">
              <div className="seat-box">
                <div className="row-1">
                  <div className="row-1-in">
                    <ul className="ul-tag1">
                      <span
                        // style={{
                        //   fontSize: "25px",
                        //   marginTop: "120px",
                        //   paddingTop: "30px",
                        //   paddingLeft: "19px",
                        // }}
                        className="driverSeat"
                      >
                        <PiSteeringWheelFill />
                      </span>
                      {JSON.parse(bus.seatsAvaliable)
                        .slice(18, 25)
                        .map((seat) => (
                          <span
                            key={seat.seatNumber}
                            className={`seat ${
                              seat.isAvailable ? "available" : "unavailable"
                            }`}
                          >
                            {seat.seatNumber}
                          </span>
                        ))}
                    </ul>
                  </div>
                  <div className="row-1-out">
                    <ul>
                      {JSON.parse(bus.seatsAvaliable)
                        .slice(9, 17)
                        .map((seat) => (
                          <span
                            key={seat.seatNumber}
                            className={`seat ${
                              seat.isAvailable ? "available" : "unavailable"
                            }`}
                          >
                            {seat.seatNumber}
                          </span>
                        ))}
                    </ul>
                  </div>
                </div>
                <div className="row-2">
                  <div className="row-2-in">
                    <ul>
                      {JSON.parse(bus.seatsAvaliable)
                        .slice(0, 8)
                        .map((seat) => (
                          <span
                            key={seat.seatNumber}
                            className={`seat ${
                              seat.isAvailable ? "available" : "unavailable"
                            }`}
                          >
                            {seat.seatNumber}
                          </span>
                        ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="reset-seats-cnt">
                <button className="reset">
                  <span>{<MdOutlineRestartAlt />} </span> Reset seat
                </button>
                <br></br>
                {/* <button className="update">Update seat</button> */}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default BusDetails;
//{
//   JSON.parse(bus.seatsAvaliable).map((seat) => (
//     <span
//       key={seat.seatNumber}
//       className={`seat ${seat.isAvailable ? "available" : "unavailable"}`}
//     >
//       {seat.seatNumber}
//     </span>
//   ));
// }
