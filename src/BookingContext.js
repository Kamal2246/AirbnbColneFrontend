import React, { useContext } from "react";
import axios from "axios";
import { UserContext } from "./UserContext";

export const BookingContext = React.createContext({});

export function BookingContextProvider({ children, id }) {
  const [Bookings, setBookings] = React.useState(() => {
    const bookings = localStorage.getItem("bookings");
    return bookings ? JSON.parse(bookings) : "";
  });
  const { user } = useContext(UserContext);

  React.useEffect(() => {
    user &&
      axios
        .get(`getThisBooking/${id}`)
        .then((res) => {
          setBookings(res.data[0]);
          localStorage.setItem("bookings", JSON.stringify(res.data[0]));
        })
        .catch((err) => console.log(err));
  }, [id, user]);
  return (
    <BookingContext.Provider value={{ Bookings, setBookings }}>
      {children}
    </BookingContext.Provider>
  );
}
