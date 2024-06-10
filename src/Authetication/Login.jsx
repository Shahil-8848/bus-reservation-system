import React, { useState } from "react";
import "../Authetication/Login.css";
import { NavLink, useNavigate } from "react-router-dom";
import { UserNameContext } from "../UserNameContext";
import { useContext } from "react";
const Login = ({ setUserRole }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setPageName } = useContext(UserNameContext);

  async function handleLogin() {
    if (!username || !password) {
      alert("Please fill in both username and password fields.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8081/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        const isAdmin = data.role === "admin";
        setUserRole(isAdmin ? "admin" : "user");
        // const Username = data.username;
        // console.log(username);
        setPageName(username);

        alert(isAdmin ? "Admin is logged in" : "User logged in successfully");

        // Navigate after setting the user role
        navigate(isAdmin ? "/bookinginfo" : "/");
      } else {
        alert(data.msg);
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert("Something went wrong. Please try again later.");
    }
  }

  return (
    <div id="login-page">
      <div className="login-banner"></div>
      <div className="login-container">
        <div className="login-top">
          <h1>Log In</h1>
          <div className="login-data">
            <div className="input-username">
              <span>Username</span>
              <input
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter the username"
                required
              />
            </div>
            <div className="input-password">
              <span>Password</span>
              <input
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter the password"
                type="password"
                required
              />
            </div>
          </div>
        </div>
        <div className="login-below">
          <label className="create-ac">
            <NavLink to="/signup">Create an Account</NavLink>
          </label>
          <button onClick={handleLogin}>Login</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
