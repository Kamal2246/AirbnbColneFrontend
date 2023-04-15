import React from "react";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";
const Register = () => {
  const [Name, setName] = React.useState("");
  const [Password, setPassword] = React.useState("");
  const [Email, setEmail] = React.useState("");
  const [redirect, setredirect] = React.useState(false);

  //   const handleClick = () => {
  //     console.log(Name);
  //     console.log(Email);
  //     console.log(Password);
  //   };

  const registerUser = (e) => {
    e.preventDefault();
    axios.post("/register", {
      username: Name,
      email: Email,
      password: Password,
    });
    alert("Registration complete");
    setName("");
    setEmail("");
    setPassword("");
    document.getElementById("see").innerText =
      "Registration complete Redirecting .....";
    setTimeout(() => {
      setredirect(true);
    }, 2000);
  };
  if (redirect) {
    return <Navigate to={"/login"} />;
  }
  return (
    <div className="Form_container">
      <form onSubmit={registerUser} className="Form">
        <input
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          value={Name}
          type="text"
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          placeholder="@gmail.com"
          value={Password}
          type="email"
        />
        <input
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Password"
          value={Email}
          type="password"
        />
        <p id="see"></p>
        <button>Register</button>
        <p>
          Already have an Account <Link to={`../login`}>Log In</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
