import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import style from "../SearchBus/BusSearch.module.css";
import { IoCloseCircle } from "react-icons/io5";
import { FaLongArrowAltRight } from "react-icons/fa";
import { PiSteeringWheelFill } from "react-icons/pi";
import Footer from "../../Layout/Footer";
import { TbClockHour10 } from "react-icons/tb";

import { IoMdStar } from "react-icons/io";
import { BusContext } from "../../BusContext";

const BusSearch = () => {
  const { setBusDetails } = useContext(BusContext);
  let param = useLocation();
  const searchParams = new URLSearchParams(param.search);
  let fromDest = searchParams.get("from");
  let toDestination = searchParams.get("to");
  let selectedDate = searchParams.get("date");
  const navigate = useNavigate();

  let [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDialog, setShowDialog] = useState(null);
  const [selectedSeat, setSelectedSeat] = useState([]);
  const [price, setPrice] = useState(0);

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

  useEffect(() => {
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
        setTimeout(() => {
          setLoading(false);
          setData([]);
        }, 1000);
        return;
      }

      const parsedData = data.data.map((bus) => {
        if (typeof bus.seatsAvaliable === "string") {
          return {
            ...bus,
            seatsAvaliable: JSON.parse(bus.seatsAvaliable),
          };
        }
        return bus;
      });

      setTimeout(() => {
        setLoading(false);
        setData(parsedData);
      }, 1000);
    }
    getBooking();
  }, [fromDest, toDestination]);

  const openDialog = (index) => {
    setShowDialog(index);
  };

  const closeDialog = () => {
    setShowDialog(null);
  };

  const handleOnContinue = (rideID, busType, rideTime, shift) => {
    if (selectedSeat.length === 0) {
      alert("Select a seat");
      return;
    } else {
      setBusDetails((prevDetails) => ({
        ...prevDetails,
        selectedBus: selectedSeat,
        seatPrice: price,
        routeFrom: fromDest,
        routeTo: toDestination,
        travelDate: selectedDate,
        rideTime: rideTime,
        rideID: rideID,
        busType: busType,
        shift: shift,
      }));
      navigate("/form");
    }
  };

  if (loading) {
    return (
      <div className={style["loader-container"]}>
        <div className={style["loader"]}></div>
      </div>
    );
  }

  if (data.length < 1) {
    return <h1 style={{ textAlign: "center" }}>No buses Available</h1>;
  }

  return (
    <React.Fragment>
      <div className={style["bus-search-page"]}>
        <div className={style["bus-search-main"]}>
          <div className={style["route-heading"]}>
            <div className={style["route-to-from"]}>
              <h4>{fromDest}</h4>
              <span style={{ marginTop: "5px" }}>
                <FaLongArrowAltRight />
              </span>
              <h4>{toDestination}</h4>
            </div>
            <div className={style["route-date-cnt"]}>
              <div className={style["route-date"]}>
                <span>{<TbClockHour10 />}</span>
                <h3>{selectedDate}</h3>
              </div>
            </div>
          </div>
          <div className={style["bus-search-container"]}>
            <div className={style["search-heading"]}>
              <div className={style["heading-list"]}>
                <ul>
                  <li>Bus No.</li>
                  <li>BusType</li>
                  <li>Accessibility</li>
                  <li>Shift</li>
                  <li>Time</li>
                  <li>Seats Available</li>
                </ul>
              </div>
            </div>
            <div className={style["available-bus-items"]}>
              {data.map((e, r) => (
                <div key={r} className={style["bus-items-container"]}>
                  <ul>
                    <li className={style["bus-list"]}>
                      <div className={style["bus-items"]}>
                        <div className={style["row-one"]}>
                          <div style={{ display: "block", color: "green" }}>
                            A{e.rideID}
                          </div>
                          <div
                            className={style["bus-title"]}
                            style={{ display: "block" }}
                          >
                            <div className={["duo"]}>
                              <h3>{e.busType}</h3>
                              <p className={style["ratings"]}>
                                {<IoMdStar />}
                                {<IoMdStar />}
                                {<IoMdStar />}
                                {<IoMdStar />}
                                {<IoMdStar />}
                              </p>
                            </div>
                          </div>
                          <div style={{ display: "block", width: "80px" }}>
                            {e.busFeatures}
                          </div>
                          <div style={{ display: "block" }}>{e.shift}</div>
                          <div style={{ display: "block" }}>{e.rideTime}</div>
                          <div
                            style={{ display: "block" }}
                            className={style["view-seats"]}
                          >
                            <button onClick={() => openDialog(r)}>
                              View seats
                            </button>
                          </div>
                        </div>
                      </div>
                      {showDialog === r && (
                        <dialog className={style["bus-dialog"]} open>
                          <div className={style["search-heading-cnt"]}>
                            <h3>Select your seat</h3>
                            <span onClick={closeDialog}>
                              <IoCloseCircle />
                            </span>
                          </div>
                          <div className={style["seats-main-cnt"]}>
                            <div className={style["seats-wrapper"]}>
                              <div className={style["seats-cnt"]}>
                                <div className={style["seats-box"]}>
                                  <div className={style["box-top"]}>
                                    <div className={style["seats-double"]}>
                                      <div className={style["seats-window"]}>
                                        <ul>
                                          {e.seatsAvaliable
                                            .slice(0, 8)
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
                                      <div className={style["seats-no-window"]}>
                                        <ul>
                                          {e.seatsAvaliable
                                            .slice(9, 17)
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
                                    </div>
                                    <div className={style["seats-single"]}>
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
                                        {e.seatsAvaliable
                                          .slice(18, 25)
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
                                  </div>
                                  <div className={style["box-bottom"]}>
                                    <div className={style["bus-avail-info"]}>
                                      <div className={style["seats-avail"]}>
                                        <span
                                          style={{ backgroundColor: "green" }}
                                        >
                                          .
                                        </span>
                                        <h4>Available</h4>
                                      </div>
                                      <div className={style["seats-reserved"]}>
                                        <span
                                          style={{ backgroundColor: "red" }}
                                        ></span>
                                        <h4>Reserved</h4>
                                      </div>
                                      <div className={style["seats-holded"]}>
                                        <span
                                          style={{ backgroundColor: "silver" }}
                                        ></span>
                                        <h4>Holded</h4>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className={style["box-left"]}>
                                <div className={style["pricing-details"]}>
                                  <div className={style["box-seats-pricing"]}>
                                    <h2>{e.busType}</h2>
                                    <span>Fare: Rs {price}</span>
                                    <h4>No of seats: {selectedSeat.length}</h4>
                                    <div
                                      style={{
                                        textDecoration: "none",
                                        color: "white",
                                      }}
                                      onClick={() =>
                                        handleOnContinue(
                                          e.rideID,
                                          e.busType,
                                          e.rideTime,
                                          e.shift
                                        )
                                      }
                                    >
                                      <button className={style["continue-btn"]}>
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
