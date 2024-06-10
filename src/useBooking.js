import { useState } from "react";

export const useBooking = () => {
  const [bookingDetails, setBookingDetails] = useState({
    selectedSeat: [],
    selectedBus: "",
    seatPrice: 0,
    routeTo: "",
    routeFrom: "",
  });

  return { bookingDetails, setBookingDetails };
};
