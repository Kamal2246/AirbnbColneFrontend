import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import "../Cards.css";

const Bookings = () => {
  const [bookings, setBookings] = React.useState([]);

  React.useEffect(() => {
    axios
      .get("/getMyBookings")
      .then((res) => {
        setBookings(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="Container">
      {bookings.map((data) => {
        return (
          <div className="Cards" key={data._id}>
            <div className="image">
              <Link to={`/placespage/booked/${data._id}`}>
                <img
                  src={`http://localhost:5000/Models/Uploads/${data.photos[0]}`}
                  alt={data._id}
                />
              </Link>
              {console.log(data.photos[0])}
            </div>
            <div className="Info">
              <p>{data.title}</p>
              <p className="description"> {data.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Bookings;
