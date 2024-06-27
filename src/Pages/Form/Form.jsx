import style from "../Form/Form.module.css";
import Layout from "../../Layout/Layout";
import { BusContext } from "../../BusContext";
import { useContext, useState } from "react";

const Form = () => {
  const { busDetails } = useContext(BusContext);
  const [gender, setGender] = useState("");
  const [psgName, setPsgName] = useState("");
  const [psgEmail, setPsgEmail] = useState("");
  const [psgPhone, setPsgPhone] = useState("");
  const [psgAge, setPsgAge] = useState("");

  async function handlePassengerDetails() {
    const reserve = await fetch(
      "http://localhost:8081/users/passengerDetails",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          psgName: psgName,
          psgEmail: psgEmail,
          psgPhone: psgPhone,
          gender: gender,
          // age: psgAge,
          rideID: busDetails.rideID,
          busName: busDetails.busType,
          seatDetails: busDetails.selectedBus
            .map((seat) => seat.seatNumber)
            .join(", "),
          shift: busDetails.shift,
          time: busDetails.rideTime,

          routeTo: busDetails.routeTo,
          routeFrom: busDetails.routeFrom,
          date: busDetails.travelDate,
        }),
      }
    );
    let a = await reserve.json();
    if (a.msg === "ok") {
      alert("Reserved seat successfully");
      // Reset the form fields
      setPsgName("");
      setPsgEmail("");
      setPsgPhone("");
      setGender("");
      setPsgAge("");
      return (window.location.href = "/");
    } else {
      alert(a.msg);
    }
  }

  return (
    <Layout>
      <div className={style["Form-main"]}>
        <div className={style["form-cnt"]}>
          <div className={style["page-left-main"]}>
            <div className={style["page-left-cnt"]}>
              <div className={style["psg-details"]}>
                <h4>Passenger Details</h4>
                <div className={style["psg-input"]}>
                  <div className={style["psg-name"]}>
                    <span>Name</span>
                    <br></br>
                    <input
                      value={psgName}
                      onChange={(e) => {
                        setPsgName(e.target.value);
                      }}
                    ></input>
                  </div>

                  <div className={style["psg-info"]}>
                    <div className={style["psg-gender"]}>
                      <h4>Gender</h4>

                      <div className={style["gender-label"]}>
                        <div className={style["male"]}>
                          <div className={style["male-click"]}>
                            <input
                              type="radio"
                              id="male"
                              name="gender"
                              value="male"
                              checked={gender === "male"}
                              onChange={(e) => setGender(e.target.value)}
                            />
                          </div>
                          <label htmlFor="male">Male</label>
                        </div>
                        <div className={style["female"]}>
                          <div className={style["female-click"]}>
                            <input
                              type="radio"
                              id="female"
                              name="gender"
                              value="female"
                              checked={gender === "female"}
                              onChange={(e) => setGender(e.target.value)}
                            />
                          </div>
                          <label htmlFor="female">Female</label>
                        </div>
                      </div>
                    </div>
                    <div className={style["psg-age"]}>
                      <span>Age</span>
                      <br></br>
                      <div className={style["psg-age-input"]}>
                        <input
                          value={psgAge}
                          onChange={(e) => {
                            setPsgAge(e.target.value);
                          }}
                        ></input>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={style["psg-contact"]}>
                <h4>Contact Details</h4>
                <div className={style["psg-contact-input"]}>
                  <div className={style["psg-email"]}>
                    <span>Email</span>
                    <br></br>
                    <input
                      placeholder="Enter your Email address"
                      value={psgEmail}
                      onChange={(e) => {
                        setPsgEmail(e.target.value);
                      }}
                    ></input>
                  </div>
                  <div className={style["psg-phone-no"]}>
                    <span>Phone Number</span>
                    <br></br>
                    <input
                      placeholder="+977"
                      value={psgPhone}
                      onChange={(e) => {
                        setPsgPhone(e.target.value);
                      }}
                    ></input>
                  </div>
                </div>
              </div>
              <div className={style["payment-details"]}>
                <h4>Choose the payment ways</h4>
                <div className={style["pay-mode"]}>
                  <ul>
                    <li>
                      <img
                        style={{
                          fontSize: "20px",
                          objectFit: "cover",
                          borderRadius: "50%",
                        }}
                        src="https://e7.pngegg.com/pngimages/261/608/png-clipart-esewa-zone-office-bayalbas-google-play-iphone-iphone-electronics-text-thumbnail.png"
                        alt="esewa"
                      />
                    </li>
                    <li>
                      <img
                        style={{
                          fontSize: "20px",
                          objectFit: "cover",
                          borderRadius: "50%",
                        }}
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPCXCv_8pLGTylRwA60dH5Lk_95a59Z9iEUTOkAHCTEA&s"
                        alt="esewa"
                      />
                    </li>
                    <li>
                      <img
                        style={{
                          fontSize: "45px",
                          objectFit: "cover",
                          borderRadius: "50%",
                        }}
                        src="https://blog.khalti.com/wp-content/uploads/2021/01/khalti-icon.png"
                        alt="esewa"
                      />
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className={style["page-right"]}>
            <div className={style["page-right-cnt"]}>
              <div className={style["travel-details-cnt"]}>
                <h1>Travel-details</h1>
                <div className={style["travel-details"]}>
                  <div className={style["route-details"]}>
                    <span>Route </span>
                    <div className={style["route-details"]}>
                      <h4>
                        {busDetails.routeFrom} - {busDetails.routeTo}
                      </h4>
                    </div>
                  </div>
                  <div className={style["time-details"]}>
                    <h2>Time </h2>
                    <h4>
                      {busDetails.travelDate} * {busDetails.rideTime}
                    </h4>
                  </div>
                  <div className={style["shift-details"]}>
                    <h2>Shift </h2>
                    <h4> {busDetails.shift}</h4>
                  </div>
                  <div className={style["selected-seats-details"]}>
                    <h2>Seat </h2>
                    <div className={style["seats-choosen"]}>
                      {busDetails.selectedBus
                        .map((seat) => seat.seatNumber)
                        .join(", ")}
                    </div>
                  </div>
                  <div className={style["bus-choosen"]}>
                    <h2>Bus Name (Id:{busDetails.rideID})</h2>
                    <div className={style["bus-choosen-name"]}>
                      <h3>{busDetails.busType}</h3>
                    </div>
                  </div>
                </div>
              </div>
              <div className={style["payment-details-cnt"]}>
                <div className={style["payment-details-cash"]}>
                  <h1>Payment Details</h1>
                  <div className={style["payment-total-cnt"]}>
                    <div className={style["payment-cost"]}>
                      <h2>Cost</h2>
                      <h3>NPR {busDetails.seatPrice}</h3>
                    </div>
                    <div className={style["discount"]}>
                      <h2>Discount</h2>
                      <h3>NPR 0</h3>
                    </div>
                    <div className={style["total-cost"]}>
                      <h2>Total Cost</h2>
                      <h3>NPR {busDetails.seatPrice}</h3>
                    </div>
                  </div>
                </div>
              </div>
              <div className={style["reserve-confirm"]}>
                <button onClick={handlePassengerDetails}>Book Seat</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Form;
