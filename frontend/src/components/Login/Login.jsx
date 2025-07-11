import React, { useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { MdOutlineRemoveRedEye, MdRemoveRedEye } from "react-icons/md";
import "./Login.css";

// Other components
import LoadingButton from "#components/LoadingButton/LoadingButton";

//util functions
import {
  loginNonprofitEmployee,
  checkEmployeeLoginStatus,
} from "#fetch/nonprofitEmployeeFetchUtils";
import { createPageNavigator } from "#utils/pathUtils";
import { getNonProfit } from "#utils/pathUtils";

function Login({}) {
  const nonprofit = getNonProfit();
  const navigate = useNavigate();
  const location = useLocation();
  const pageNavigator = createPageNavigator(navigate, location);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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
    loginNonprofitEmployee(nonprofit, username, password).then(loginReturn);
  }
  function loginReturn(result) {
    setLoading(false);
    if (result.valid) {
      setSuccessText(result.data);
    } else {
      setErrorText(result.error);
    }
  }

  function goToRegister() {
    let path = location.pathname;
    let allLocations = path.split("/");
    let ending = allLocations[allLocations.length - 1];
    let newPath = path.replace(ending, "register");
    pageNavigator(newPath);
  }

  useEffect(() => {
    checkEmployeeLoginStatus(nonprofit).then((result) => {
      if (result.valid) {
        if (result.data) {
          setSuccessText(result.data);
        }
      } else {
        setErrorText(result.error);
      }
    });
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
