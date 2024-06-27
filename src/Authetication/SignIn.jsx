import React from "react";
import "../Authetication/SignIn.css";
import { useState } from "react";
import { NavLink } from "react-router-dom";
const SignIn = () => {
  const [newUser, setNewUser] = useState("");
  const [newUserPass, setNewUserpass] = useState("");

  async function handleOnSubmit() {
    let d = await fetch("http://localhost:8081/users/newuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: newUser,
        password: newUserPass,
      }),
    });
    let a = await d.json();

    if (a.msg == "ok") {
      alert("User signIn successful");
    } else {
      alert(a.msg);
    }
  }

  return (
    <>
      <div id="login-page">
        <div className="login-banner"></div>
        <div className="login-container">
          <div className="login-top">
            <h1>Create Account</h1>
            <div className="login-data">
              <div className="input-username">
                <span>Username</span>
                <input
                  onChange={(e) => setNewUser(e.target.value)}
                  placeholder="Enter the username"
                  required
                ></input>
              </div>
              <div className="input-password">
                <span>Password</span>
                <input
                  onChange={(e) => setNewUserpass(e.target.value)}
                  placeholder="Enter the username"
                  type="password"
                  required
                ></input>
              </div>
            </div>
          </div>
          <div className="login-below">
            <button onClick={handleOnSubmit}>Sign Up</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
