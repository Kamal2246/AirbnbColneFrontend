import React from "react";
import axios from "axios";
import "./Account.css";
import { UserContext } from "../UserContext";

const Profile = ({ user }) => {
  const { setUser } = React.useContext(UserContext);
  async function logout() {
    await axios
      .post("/logout")
      .then(setUser(""))
      .then(console.log("Logged Out"))
      .catch((e) => console.log(e));
  }
  return (
    <div className="profile-main">
      <p>This is Profile page of {user.username}</p>
      <div>Logged in as {user.email}</div>
      <button onClick={logout}>Log Out</button>
    </div>
  );
};

export default Profile;
