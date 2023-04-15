import React, { useContext } from "react";
import { UserContext } from "./UserContext";
import "./Header.css";

const Header = () => {
  const { user } = useContext(UserContext);
  return (
    <div>
      <div className="header_container">
        <div className="Logo">
          <a href="/">
            <img src={"/images/logo.png"} alt="logo" />
          </a>
        </div>
        {/* <nav className="nav_links">
          <a href="#" target="blank">
            <div className="links">Link 1</div>
          </a>
          <a href="#" target="blank">
            <div className="links">Link 2</div>
          </a>
          <a href="#" target="blank">
            <div className="links">Link 3</div>
          </a>
        </nav> */}
        <div>
          {user ? (
            <p className="User-info">{user.username}</p>
          ) : (
            <div className="no-user">
              <p>Use Email & Pwd :"aklon@gmail.com"</p>
              <p> or signup</p>
            </div>
          )}
        </div>
        {/* <div className="Search">
          <input type="text" placeholder="Search..."></input>
          <a href="#" target="blank">
            <img src={"./images/search.png"} alt="Search"></img>
          </a>
        </div> */}
        <div className="User">
          <div className="Usericon">
            <a href={user ? "/account" : "/login"}>
              <img src={"./images/user.png"} alt="user"></img>
            </a>
          </div>
          {/* <div className="Hamberger">
            <img src="./images/hamber.png" alt="hamber" />
          </div> */}
        </div>
        {/* <div className="Social_link">
          <img src={"./images/insta.png"} alt="instagram"></img>
          <img src={"./images/whatsapp.png"} alt="Whatsapp"></img>
          <img src={"./images/github.png"} alt="GitHub"></img>
        </div> */}
      </div>
    </div>
  );
};

export default Header;
