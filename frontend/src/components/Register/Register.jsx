// Node Module Imports
import React, { useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import {
  MdOutlineRemoveRedEye,
  MdRemoveRedEye,
  MdCheckBox,
  MdCheckBoxOutlineBlank,
} from "react-icons/md";

// Local Imports
import "./Register.css";
// Other Components
import LoadingButton from "#components/LoadingButton/LoadingButton";
import InputField from "#components/InputField/InputField";
// Util Functions
import { getNonProfit, NpPages, createPageNavigator } from "#utils/pathUtils";
import passwordRequirements from "#default-data/passwordRequirementsDefault.json";
import accountInfoDefaultData from "#default-data/accountInfoDefaultData.json";

function Register({ setLoggedIn, nav, registerFetch, defaults }) {
  // Constant Variables
  const nonprofit = getNonProfit();
  const navigate = useNavigate();
  const location = useLocation();
  const pageNavigator = createPageNavigator(navigate, location);

  // State Variables
  const [username, setUsername] = useState(defaults?.username || "");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [email, setEmail] = useState(defaults?.email || "");
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
    const invalid = findValidationErrors();
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
    const user = {
      username: username,
      password: password,
      email: email,
    };
    setLoading(true);
    registerFetch(nonprofit, user).then(registerCallback);
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
    for (const req of passwordRequirements) {
      const regex = new RegExp(req.value, "g");
      if (!regex.test(password)) {
        errorMessage += "Password requirements not met. ";
        break;
      }
    }
    if (password.length < 8) {
      errorMessage += "Password must be at least 8 characters. ";
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
  function registerCallback(result) {
    setLoading(false);
    if (result.valid) {
      setLoggedIn(true);
      setSuccessText(result.data);
      // Navigate to the home page after 2 seconds
      setTimeout(() => {
        nav("");
        setSuccessText("");
      }, 1000); // 2000 milliseconds = 2 seconds
    } else {
      setErrorText(result.error);
    }
  }

  /**
   * Checks the password against the password requirements and updates the requirements view
   * @param {object} value - Object containing the value of the password
   */
  function setPasswordHelper(value) {
    setPassword(value);
    for (const req of passwordRequirements) {
      const regex = new RegExp(req.value, "g");
      if (!regex.test(value)) {
        req.valid = false;
      } else {
        req.valid = true;
      }
    }
  }

  /**
   * Navigates to the login page
   */
  function goToLogin() {
    const path = location.pathname;
    const allLocations = path.split("/");
    const ending = allLocations[allLocations.length - 1];
    const newPath = path.replace(ending, NpPages.LOGIN);
    pageNavigator(newPath);
  }

  useEffect(() => {}, []);
  return (
    <div className="Register">
      <div className="topButtons">
        <button onClick={goToLogin}>Login Instead?</button>
        <button onClick={() => navigate("/")}>Change Nonprofit</button>
      </div>
      <div className="userInfo">
        <div className="registerField">
          <InputField
            obj={{ ...accountInfoDefaultData.username, value: username }}
            setValue={(_, value) => {
              setUsername(value);
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
              setPasswordHelper(e.target.value);
            }}
          />
          <div
            className="showPassword"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <MdRemoveRedEye /> : <MdOutlineRemoveRedEye />}
          </div>
        </div>
        <div className="passwordRequirements">
          <div>
            <strong>Password Requirements:</strong>
          </div>
          {passwordRequirements.map((req, index) => (
            <div className="passwordParam" key={index}>
              <div>{req.name}: </div>
              {req.valid ? (
                <div className="checked">
                  <MdCheckBox />
                </div>
              ) : (
                <div className="unchecked">
                  <MdCheckBoxOutlineBlank />
                </div>
              )}
            </div>
          ))}
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
          <InputField
            obj={{ ...accountInfoDefaultData.email, value: email }}
            setValue={(_, value) => {
              setEmail(value);
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
    </div>
  );
}

export default Register;
