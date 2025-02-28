import React, { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import "../SearchBus/BusSearch.css";
import { IoCloseCircle } from "react-icons/io5";
import { FaLongArrowAltRight } from "react-icons/fa";
import { PiSteeringWheelFill } from "react-icons/pi";
import Footer from "../../Layout/Footer";
import { FcAlarmClock } from "react-icons/fc";
// import { useNavigate } from "react-router-dom";

const BusSearch = ({ setSelectedBus, setSeatPrice }) => {
  let param = useLocation();
  const searchParams = new URLSearchParams(param.search);
  let fromDest = searchParams.get("from");
  let toDestination = searchParams.get("to");
  let selectedDate = searchParams.get("date");
  const navigate = useNavigate();

  let [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [showDialog, setShowDialog] = useState(false);
  const [selectedSeat, setSelectedSeat] = useState([]);
  const [price, setPrice] = useState(0);
  // const navigate = useNavigate();
  console.log(data);
  // const handleContinue = () => {
  //   navigate("/passenger-details", { state: { selectedSeat } });
  // };
  console.log("let go");
  function handleSelectedSeat(seat) {
    const isSeatSelected = selectedSeat.some(
      (selected) => selected.seatNumber === seat.seatNumber
    );
    if (isSeatSelected) {
      const updatedSelectedSeat = selectedSeat.filter(
        (selected) => selected.seatNumber !== seat.seatNumber
      );
      setSelectedSeat(updatedSelectedSeat);
      setPrice((price) => price - 300);
    } else {
      setSelectedSeat([...selectedSeat, seat]);
      setPrice((price) => price + 300);
    }
  }
  setSeatPrice(price);
  async function getBooking() {
    const response = await fetch("http://localhost:8081/users/searchBus", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        toDestination: toDestination,
        fromDestination: fromDest,
      }),
    });
    const data = await response.json();
    if (data.code !== 200) {
      setLoading(false);
      return setData([]);
    }
    setLoading(false);
    return setData(data);
  }

  useEffect(() => {
    getBooking();
  }, []);

  const openDialog = () => {
    setShowDialog(true);
  };

  const closeDialog = () => {
    setShowDialog(false);
  };

  if (loading) return <h1>Data is loading....</h1>;

  if (data.length < 1) {
    return <h1 style={{ textAlign: "center" }}>No buses Available</h1>;
  }

  setSelectedBus(selectedSeat);
  const handleOnContinue = () => {
    if (selectedSeat.length === 0) {
      alert("Seat a seat");
      return;
    } else {
      navigate("/form");
    }
  };
  return (
    <React.Fragment>
      <div className="bus-search-page">
        <div className="bus-search-main">
          <div className="route-heading">
            <div className="route-to-from">
              <span>{fromDest} </span>
              <span style={{ marginTop: "5px" }}>
                <FaLongArrowAltRight />
              </span>
              <span>{toDestination}</span>
            </div>
            <div className="route-date-cnt">
              <div className="route-date">
                <span>{<FcAlarmClock />}</span>
                <h4>{selectedDate}</h4>
              </div>
            </div>
          </div>
          <div className="bus-search-container">
            <div className="search-heading">
              <div className="heading-list">
                <ul>
                  <li>Bus No.</li>
                  <li>BusType</li>
                  <li> Accessiblity</li>
                  <li>Shift</li>
                  <li>Time</li>
                  <li>Seats Available</li>
                </ul>
              </div>
            </div>
            <div className="available-bus-items">
              {data?.data.map((e, r) => (
                <div key={r} className="bus-items-container">
                  <ul>
                    <li className="bus-list">
                      <div className="bus-items">
                        <div className="row-one">
                          <div style={{ display: "block" }}>{e.rideId}</div>
                          <div style={{ display: "block" }}>{e.busType}</div>
                          <div style={{ display: "block", width: "80px" }}>
                            {e.busFeatures}
                          </div>
                          <div style={{ display: "block" }}>{e.shift}</div>
                          <div style={{ display: "block" }}>{e.rideTime}</div>
                          <div style={{ display: "block" }}>Seats details</div>
                        </div>
                        <div className="row-two">
                          <button onClick={openDialog}>View seats</button>
                        </div>
                      </div>
                      {showDialog && (
                        <dialog className="bus-dialog" open>
                          <div className="search-heading-cnt">
                            <h3>Select your seat</h3>
                            <span onClick={closeDialog}>
                              <IoCloseCircle />
                            </span>
                          </div>
                          <div className="seats-main-cnt">
                            <div className="seats-wrapper">
                              <div className="seats-cnt">
                                <div className="seats-box">
                                  <div className="box-top">
                                    <div className="seats-double">
                                      <div className="seats-window">
                                        <ul>
                                          {e?.seatsAvaliable
                                            ?.slice(0, 8)
                                            .map((seat, index) => (
                                              <li
                                                key={index}
                                                style={{
                                                  listStyle: "none",
                                                  backgroundColor:
                                                    seat.isAvailable
                                                      ? selectedSeat.find(
                                                          (x) =>
                                                            x.seatNumber ===
                                                            seat.seatNumber
                                                        )
                                                        ? "silver"
                                                        : "#60BB47"
                                                      : "#FF0000",
                                                }}
                                                onClick={() => {
                                                  if (!seat.isAvailable) return;
                                                  handleSelectedSeat(seat);
                                                }}
                                              >
                                                {seat.seatNumber}
                                              </li>
                                            ))}
                                        </ul>
                                      </div>
                                      <div className="seats-no-window">
                                        <ul>
                                          {e?.seatsAvaliable
                                            ?.slice(9, 17)
                                            .map((seat, index) => (
                                              <li
                                                onClick={() => {
                                                  if (!seat.isAvailable) return;
                                                  handleSelectedSeat(seat);
                                                }}
                                                key={index}
                                                style={{
                                                  listStyle: "none",
                                                  backgroundColor:
                                                    seat.isAvailable
                                                      ? selectedSeat.find(
                                                          (x) =>
                                                            x.seatNumber ===
                                                            seat.seatNumber
                                                        )
                                                        ? "silver"
                                                        : "#60BB47"
                                                      : "#FF0000",
                                                }}
                                              >
                                                {seat.seatNumber}
                                              </li>
                                            ))}
                                        </ul>
                                      </div>
                                    </div>
                                    <div className="seats-single">
                                      <ul>
                                        <span
                                          style={{
                                            fontSize: "30px",
                                            textAlign: "center",
                                            marginLeft: "5px",
                                            paddingBottom: "15px",
                                          }}
                                        >
                                          <PiSteeringWheelFill />
                                        </span>
                                        {e?.seatsAvaliable
                                          ?.slice(18, 25)
                                          .map((seat, index) => (
                                            <li
                                              key={index}
                                              onClick={() => {
                                                if (!seat.isAvailable) return;
                                                handleSelectedSeat(seat);
                                              }}
                                              style={{
                                                listStyle: "none",
                                                backgroundColor:
                                                  seat.isAvailable
                                                    ? selectedSeat.find(
                                                        (x) =>
                                                          x.seatNumber ===
                                                          seat.seatNumber
                                                      )
                                                      ? "silver"
                                                      : "#60BB47"
                                                    : "#FF0000",
                                              }}
                                            >
                                              {seat.seatNumber}
                                            </li>
                                          ))}
                                      </ul>
                                    </div>
                                  </div>
                                  <div className="box-bottom">
                                    <div className="bus-avail-info">
                                      <div className="seats-avail">
                                        <span
                                          style={{ backgroundColor: "green" }}
                                        >
                                          .
                                        </span>
                                        <h4>Available</h4>
                                      </div>
                                      <div className="seats-reserved">
                                        <span
                                          style={{ backgroundColor: "red" }}
                                        ></span>
                                        <h4>Reserved</h4>
                                      </div>
                                      <div className="seats-holded">
                                        <span
                                          style={{
                                            backgroundColor: "silver",
                                          }}
                                        ></span>
                                        <h4>Holded</h4>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="box-left">
                                <div className="pricing-details">
                                  <div className="box-seats-pricing">
                                    <h2>{e.busType}</h2>
                                    <span>Fare: Rs {price}</span>

                                    <h4>No of seats: {selectedSeat.length}</h4>
                                    <div
                                      style={{
                                        textDecoration: "none",
                                        color: "white",
                                      }}
                                      onClick={handleOnContinue}
                                    >
                                      <button className="continue-btn">
                                        Continue
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </dialog>
                      )}
                    </li>
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default BusSearch;
