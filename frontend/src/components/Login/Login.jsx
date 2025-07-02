import React from "react";
import ReactDOM from "react-dom";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { loginNonprofitEmployee } from "#fetch/nonprofitEmployeeFetchUtils";

import "./Login.css";
import PropTypes, { func } from "prop-types";

// Other components
import LoadingButton from "#components/LoadingButton/LoadingButton";

function Login({}) {
  const navigate = useNavigate();
  let location = useLocation().pathname;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorText, setErrorText] = useState("");
  const [successText, setSuccessText] = useState("");
  const [loading, setLoading] = useState(false);

  function handleLogin() {
    setSuccessText("");
    setErrorText("");
    if (username === "") {
      setErrorText("Username cannot be empty");
      return;
    }
    if (password === "") {
      setErrorText("Password cannot be empty");
      return;
    }
    setLoading(true);
    loginNonprofitEmployee(username, password, loginReturn);
  }
  function loginReturn(data) {
    setLoading(false);
    if (data.success) {
      setSuccessText(data.message);
    } else {
      setErrorText(data.message);
    }
  }

  function goToRegister() {
    let allLocations = location.split("/");
    let ending = allLocations[allLocations.length - 1];
    let newPath = location.replace(ending, "register");
    console.log(newPath);
    navigate(newPath);
  }

  return (
    <div className="Login">
      <div className="userInfo">
        <div className="loginField">
          <p>Username:</p>
          <input
            className="username"
            type="text"
            value={username}
            placeholder="username"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>
        <div className="loginField">
          <p>Password:</p>
          <input
            className="password"
            type="text"
            value={password}
            placeholder="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
      </div>
      <LoadingButton loading={loading} onClick={handleLogin} text="Log In" />
      <p className="errorText">{errorText}</p>
      <p className="successText">{successText}</p>
      <button onClick={goToRegister}>Register</button>
    </div>
  );
}

export default Login;
