import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "./UserContext";
import "./Places.css";
import Carousel from "./Utils/Carousel";
import { BookingContext } from "./BookingContext";

const PlacesPage = ({ booked = false, Static_uri }) => {
  const { id } = useParams();
  const [place, setPlace] = React.useState({});
  const { Bookings } = useContext(BookingContext);
  const { user } = useContext(UserContext);
  const [Loading, setLoading] = useState(true);
  const [checkIn, setcheckIn] = useState("");
  const [checkout, setcheckout] = useState("");
  const [name, setname] = useState("");
  const [email, setemail] = useState("");

  React.useEffect(() => {
    axios
      .get(`getSinglePlaces/${id}`)
      .then((res) => {
        setLoading(false);
        return setPlace(res.data[0]);
      })
      .catch((err) => console.log(err));
  }, []);

  function createBooking() {
    const data = {
      place: place._id,
      name,
      email,
      checkIn,
      checkout,
    };
    axios.post("/createBooking", data).then((res) => console.log(res.data));
    setname("");
    setemail("");
    setcheckIn("");
    setcheckout("");
  }
  return (
    <div className="Container-singlePage">
      <div className="Carousel-Container">
        {Loading ? (
          <h1>Loading ....</h1>
        ) : (
          <Carousel images={place.photos} Static_uri={Static_uri} />
        )}
      </div>

      <div className="booking-info">
        <div className="PlaceInformation">
          <div>
            <a
              href={`https://www.google.com/maps/search/${place.address}`}
              target="_blank"
            >
              {place.address}
            </a>
          </div>

          <div className="Info-heading">Title</div>
          <div>{place.title}</div>
          <div className="Info-heading">Description</div>
          <div>{place.description}</div>
          <div className="Info-heading">Extra Information</div>
          <div>{place.extraInfo}</div>
          <div>
            {place.checkIn}
            <span>&nbsp;&nbsp;&nbsp; to &nbsp;&nbsp;&nbsp;</span>
            {place.checkOut}
          </div>
          <div>MaxGuest : {place.maxGuest}</div>
        </div>
        {!booked && (
          <div className="booking-action">
            <h2> Booking Details</h2>
            <h4>Price per Night/person</h4>
            <div>
              <label htmlFor="checkin">Check In : </label>
              <input
                type="date"
                name="checkin"
                value={checkIn}
                onChange={(e) => {
                  setcheckIn(e.target.value);
                }}
              />
            </div>
            <div>
              <label htmlFor="checkout">Check In : </label>
              <input
                type="date"
                name="checkout"
                value={checkout}
                onChange={(e) => {
                  setcheckout(e.target.value);
                }}
              />
              {checkIn && checkout && (
                <div className="add-Name">
                  <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => {
                      setname(e.target.value);
                    }}
                  />
                </div>
              )}
              {checkIn && checkout && (
                <div className="add-Name">
                  <input
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => {
                      setemail(e.target.value);
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      {!booked ? (
        <div className="Booking-button">
          {checkIn < place.checkIn ? (
            <p>Avialable from : {place.checkIn}</p>
          ) : checkout && checkout > place.checkOut ? (
            <p>Avialable till : {place.checkOut}</p>
          ) : checkIn > checkout ? (
            <p>Cannot Checkout before CheckIn</p>
          ) : !name ? (
            <p>Name is required</p>
          ) : !email ? (
            <p>Email is required</p>
          ) : (
            <Link to={user ? "/account/bookings" : "/login"}>
              <button type="button" onClick={createBooking}>
                Book this Place
              </button>
            </Link>
          )}
        </div>
      ) : (
        <div className="Booking-button">
          Booked From {new Date(Bookings.checkIn).toLocaleDateString("en-US")}{" "}
          to {new Date(Bookings.checkout).toLocaleDateString("en-US")}
        </div>
      )}
    </div>
  );
};

export default PlacesPage;
