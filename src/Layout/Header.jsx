import React, { useContext } from "react";
import "../Layout/Header.css";
import { NavLink } from "react-router-dom";
// import { IoLogoReact } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";

import { UserNameContext } from "../UserNameContext";
const Header = () => {
  const { userPageName } = useContext(UserNameContext);
  return (
    <nav id="navbar">
      <div className="nav-container">
        <div className="nav-left">
          <span className="logo">
            <img
              src="https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA5L2ZyZWVpbWFnZXNjb21wYW55XzNkX3JlbmRlcl9jaGFyYWN0ZXJfb2ZfbWFuX3BsYXlpbmdfZ2FtZV9vbl9nYV8xZjNhNjNmNi1hNzJkLTRmMjAtOWVjOS0wZjcyMDBiOTM4MGMucG5n.png"
              alt=""
            />
          </span>
        </div>
        <div className="nav-right">
          <ul className="nav-list">
            <NavLink
              to="/"
              style={{
                listStyle: "none",
                fontSize: "25px",
                fontWeight: "400",
                cursor: "pointer",
                textDecoration: "none",
                color: "black",
              }}
            >
              Home
            </NavLink>
            {/* <NavLink
              to="/bookinginfo"
              style={{
                listStyle: "none",
                fontSize: "25px",
                fontWeight: "400",
                cursor: "pointer",
                textDecoration: "none",
                color: "black",
              }}
            >
              Reserve
            </NavLink> */}
            <li>About</li>
            <li>Contact</li>
          </ul>
          <div className="login-div">
            <div className="login-cnt">
              {" "}
              <span>
                <NavLink
                  to="/logIn"
                  style={{ textDecoration: "none", color: "#FFC206" }}
                >
                  {<CgProfile />}
                </NavLink>
              </span>
            </div>

            <div className="login">{userPageName}</div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
