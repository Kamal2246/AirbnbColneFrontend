import React from "react";
import { useParams } from "react-router-dom";
import { BookingContextProvider } from "../BookingContext";
import PlacesPage from "../PlacesPage";

const Booked = ({ Static_uri }) => {
  const { id } = useParams();
  return (
    <div>
      <BookingContextProvider id={id}>
        <PlacesPage booked={true} Static_uri={Static_uri} />
      </BookingContextProvider>
    </div>
  );
};

export default Booked;
