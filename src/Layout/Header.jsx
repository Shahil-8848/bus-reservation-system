import React, { useContext } from "react";
import "../Layout/Header.css";
import { NavLink } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { UserNameContext } from "../UserNameContext";

const Header = () => {
  const { userPageName } = useContext(UserNameContext);

  const isLoggedIn = userPageName !== "Log-In";

  return (
    <nav id="navbar">
      <div className="nav-container">
        <div className="nav-left">
          <NavLink to="/" className="logo">
            <img
              src="https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA5L2ZyZWVpbWFnZXNjb21wYW55XzNkX3JlbmRlcl9jaGFyYWN0ZXJfb2ZfbWFuX3BsYXlpbmdfZ2FtZV9vbl9nYV8xZjNhNjNmNi1hNzJkLTRmMjAtOWVjOS0wZjcyMDBiOTM4MGMucG5n.png"
              alt="Logo"
            />
          </NavLink>
        </div>
        <div className="nav-right">
          <ul className="nav-list">
            <li>
              <NavLink to="/" className="nav-link">
                Home
              </NavLink>
            </li>
            <li
              className="nav-link"
              onClick={(e) => alert("Rijim is bus provider!")}
            >
              About
            </li>
            <li
              onClick={(e) =>
                alert("contact us at 9708989678. Birtamode jhapa")
              }
              className="nav-link"
            >
              Contact
            </li>
            <li>
              <div className="login-div">
                {isLoggedIn ? (
                  <NavLink to="/" className="userlogged">
                    <img
                      src="https://img.lovepik.com/element/45001/3052.png_860.png"
                      alt=""
                    />
                    {/* <div className="userProfile">Your Info</div> */}
                  </NavLink>
                ) : (
                  <NavLink to="/logIn" className="nav-link login-link">
                    <CgProfile />
                  </NavLink>
                )}
                <span className="login-text">{userPageName}</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
