import React from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { UserContext } from "../UserContext";
import "./Account.css";
import Bookings from "./Bookings";
import Places from "./Places";
import Places_Form from "./Places_Form";
import Profile from "./Profile";
const Account = () => {
  const { user, ready } = React.useContext(UserContext);

  let { subPage, id } = useParams();
  if (subPage === undefined) {
    subPage = "profile";
  }

  React.useEffect(() => {
    let timeout;

    if (!ready) {
      timeout = setTimeout(() => {
        window.location.reload();
      }, 5000);
    }

    return () => clearTimeout(timeout);
  }, [ready]);
  if (!ready) {
    return <h1>Loading.....</h1>;
  }
  if (ready && !user) {
    return <Navigate to={"/"} />;
  }
  function linkClassName(type = null) {
    if ((type === subPage) | (subPage === undefined && type === "profile")) {
      return "focused";
    }
  }
  return (
    <div>
      <div className="accountNAV">
        <Link to={"/account/"}>
          <div className={linkClassName("profile")}>Profile</div>
        </Link>
        <Link to={"/account/bookings"}>
          <div className={linkClassName("bookings")}> Bookings</div>
        </Link>
        <Link to={"/account/places"}>
          <div className={linkClassName("places")}>My Accommodations</div>
        </Link>
      </div>
      <div>
        {subPage === "profile" && (
          <div>
            <Profile user={user} />
          </div>
        )}
        {subPage === "bookings" && (
          <div>
            <Bookings />
          </div>
        )}
        {subPage === "places" && !id && (
          <div>
            {console.log("Places")}
            <Places />
          </div>
        )}
        {id && (
          <div>{id !== "new" ? <Places_Form id={id} /> : <Places_Form />}</div>
        )}
      </div>
    </div>
  );
};

export default Account;
