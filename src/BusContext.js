import React, { createContext, useState } from "react";

export const BusContext = createContext();

export const BusProvider = ({ children }) => {
  const [busDetails, setBusDetails] = useState({
    selectedBus: [],
    seatPrice: 0,
    routeFrom: "",
    routeTo: "",
    travelDate: "",
    rideTime: "",
    rideID: "",
    busType: "",
    shift: "",
  });

  return (
    <BusContext.Provider value={{ busDetails, setBusDetails }}>
      {children}
    </BusContext.Provider>
  );
};
