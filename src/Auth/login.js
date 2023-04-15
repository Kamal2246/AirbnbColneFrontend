import React, { useContext } from "react";
import "./Auth.css";
import axios from "axios";

import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";

const Login = () => {
  const { user, setUser } = useContext(UserContext);

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [redirect, setredirect] = React.useState(false);
  const handelLogin = async (e) => {
    e.preventDefault();
    try {
      const userInfo = await axios.post("/login", { email, password });
      setUser(userInfo.data);
      if (userInfo.data) {
        setredirect(true);
      } else {
        setUser(null);
        alert("Login Failed");
      }
    } catch (error) {
      alert("Login Failed");
      console.log(error);
    }
  };

  if (redirect) {
    return <Navigate to={"/"} />;
  }
  return (
    <div className="Form_container">
      <form onSubmit={handelLogin} className="Form">
        <input
          placeholder="Email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>Submit</button>
        <p>
          Don't have the Account <Link to={`../register`}>Sign Up</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
