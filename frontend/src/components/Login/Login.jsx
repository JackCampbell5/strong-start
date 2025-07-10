import React, { useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { MdOutlineRemoveRedEye, MdRemoveRedEye } from "react-icons/md";

// Local Imports
import "./Login.css";
// Other components
import LoadingButton from "#components/LoadingButton/LoadingButton";
//Util Functions
import {
  loginNonprofitEmployee,
  testLoginNonprofitEmployee,
} from "#fetch/nonprofitEmployeeFetchUtils";
import { createPageNavigator } from "#utils/pathUtils";
import { getNonProfit } from "#utils/pathUtils";

function Login() {
  // Constant Variables
  const nonprofit = getNonProfit();
  const navigate = useNavigate();
  const location = useLocation();
  const pageNavigator = createPageNavigator(navigate, location);

  // State Variables
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [successText, setSuccessText] = useState("");
  const [loading, setLoading] = useState(false);

  /**
   * Checks if the username and password are valid and attempts to log in the user
   * If the login succeeds success text is set to the returned message if it fails
   * error text is set to the returned error message
   */
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
    loginNonprofitEmployee(nonprofit, username, password).then(loginCallback);
  }
  /**
   * Provides the error or success message from the login
   * @param {object} result - The result of the login
   */
  function loginCallback(result) {
    setLoading(false);
    if (result.valid) {
      setSuccessText(result.data);
    } else {
      setErrorText(result.error);
    }
  }

  /**
   * Navigates to the register page
   */
  function goToRegister() {
    const path = location.pathname;
    const allLocations = path.split("/");
    const ending = allLocations[allLocations.length - 1];
    const newPath = path.replace(ending, "register");
    pageNavigator(newPath);
  }

  /**
   *  If successful provides the username of the currently signed in employee and if not provides nothing
   * @param {object} result - The result of the test login
   */
  function loginTestCallback(result) {
    if (result.valid) {
      if (result.data) {
        setSuccessText(result.data);
      }
    } else {
      setErrorText(result.error);
    }
  }

  useEffect(() => {
    testLoginNonprofitEmployee(nonprofit).then(loginTestCallback);
  }, []);

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
            type={showPassword ? "text" : "password"}
            value={password}
            placeholder="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <div
            className="showPassword"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <MdRemoveRedEye /> : <MdOutlineRemoveRedEye />}
          </div>
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
