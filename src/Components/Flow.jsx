import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css"; // Import datepicker styles
// Import your CSS file for styling
import "../Styles/Flow.css";
import { FaBusSimple } from "react-icons/fa6";
import { IoLocationSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const Flow = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  let navigate = useNavigate();
  const handleOnSearch = () => {
    if (!selectedDate) {
      alert("Date select gar");
      return;
    }
    if (fromLocation === "" || toLocation === "") {
      alert("Select the routes");
    } else {
      navigate(
        `/search?from=${fromLocation}&to=${toLocation}&date=${selectedDate}`
      );
    }
  };
  return (
    <div className="reservation-form">
      <div className="route-container">
        <div className="route-from">
          <div className="route-from-detail">
            <div className="route-from-logo">
              <span>
                <FaBusSimple />
              </span>
              <h4>From</h4>
            </div>
            <select
              className="route-location"
              onChange={(e) => setFromLocation(e.target.value)}
            >
              <option style={{ fontStyle: "oblique" }} value="">
                Choose location
              </option>
              <option value="Birtamode">Birtamode</option>
              <option value="Damak">Damak</option>
              <option value="Charali">Charali</option>
              <option value="Dhulabari">Dhulabari</option>
            </select>
          </div>
        </div>
        <div className="route-to">
          <div className="route-to-detail">
            <div className="route-to-logo">
              <span>
                <IoLocationSharp />
              </span>
              <h4>To</h4>
            </div>
            <select
              className="route-destination"
              onChange={(e) => setToLocation(e.target.value)}
            >
              <option value="" className="default-option">
                Choose destination
              </option>
              <option value="Kathmandu">Kathmandu</option>
              <option value="Pokhara">Pokhara</option>
              <option value="Taplejung">Taplejung</option>
            </select>
          </div>
        </div>
        <div className="route-date-time">
          <div className="route-date">
            {/* <label>Date:</label> */}
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>
        </div>
        <div className="routes-search">
          <button onClick={handleOnSearch}>SEARCH</button>
        </div>
      </div>
    </div>
  );
};

export default Flow;

/* <div className="route-time">
<label>Time:</label>
<input
  type="time"
  value={selectedTime}
  onChange={(e) => setSelectedTime(e.target.value)}
/>
</div> */
