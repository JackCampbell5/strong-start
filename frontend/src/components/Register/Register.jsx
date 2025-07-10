// Node Module Imports
import React from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { MdOutlineRemoveRedEye, MdRemoveRedEye } from "react-icons/md";

// Local Imports
import "./Register.css";
// Other Components
import LoadingButton from "#components/LoadingButton/LoadingButton";
// Util Functions
import { registerNonprofitEmployee } from "#fetch/nonprofitEmployeeFetchUtils";
import { getNonProfit } from "#utils/pathUtils";

function Register() {
  // Constant Variables
  let nonprofit = getNonProfit();
  const navigate = useNavigate();
  let location = useLocation().pathname;

  // State Variables
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [successText, setSuccessText] = useState("");
  const [loading, setLoading] = useState(false);

  /**
   * Handles the register button click
   */
  function registerButtonClicked() {
    setSuccessText("");
    setErrorText("");
    let invalid = findValidationErrors();
    if (invalid) {
      setErrorText(invalid);
    } else {
      handleRegister();
    }
  }

  /**
   * Handles the actual register request if all fields are valid
   */
  function handleRegister() {
    let user = {
      username: username,
      password: password,
      email: email,
    };
    setLoading(true);
    registerNonprofitEmployee(nonprofit, user).then(registerReturn);
  }

  /**
   * Finds all validation errors
   * @returns string of all validation errors or empty string if no errors
   */
  function findValidationErrors() {
    let errorMessage = "";
    if (username === "") {
      errorMessage += "Username cannot be empty. ";
    }
    if (password === "") {
      errorMessage += "Password cannot be empty. ";
    }
    if (password !== passwordCheck) {
      errorMessage += "Passwords do not match. ";
    }
    if (email === "") {
      errorMessage += "Email cannot be empty. ";
    }
    return errorMessage;
  }

  /**
   * Processes the result of the register request
   * @param {object} result - The result of the register request
   */
  function registerReturn(result) {
    setLoading(false);
    if (result.valid) {
      setSuccessText(result.data);
    } else {
      setErrorText(result.error);
    }
  }

  /**
   * Navigates to the login page
   */
  function goToLogin() {
    let allLocations = location.split("/");
    let ending = allLocations[allLocations.length - 1];
    let newPath = location.replace(ending, "login");
    navigate(newPath);
  }
  return (
    <div className="Register">
      <div className="userInfo">
        <div className="registerField">
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
        <div className="registerField">
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
        <div className="registerField">
          <p>Confirm Password:</p>
          <input
            className="password"
            type={showPassword ? "text" : "password"}
            placeholder="password"
            value={passwordCheck}
            onChange={(e) => {
              setPasswordCheck(e.target.value);
              if (e.target.value !== password) {
                setErrorText("Passwords do not match");
              } else {
                setErrorText("");
              }
            }}
          />
        </div>
        <div className="registerField">
          <p>Email:</p>
          <input
            className="email"
            type="text"
            value={email}
            placeholder="email@domain.com"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
      </div>
      <LoadingButton
        loading={loading}
        onClick={registerButtonClicked}
        text="Register"
      />
      <p className="errorText">{errorText}</p>
      <p className="successText">{successText}</p>
      <button onClick={goToLogin}>Login?</button>
    </div>
  );
}

export default Register;
