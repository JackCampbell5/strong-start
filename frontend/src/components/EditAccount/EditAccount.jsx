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
import "./EditAccount.css";
// Other Components
import LoadingButton from "#components/LoadingButton/LoadingButton";
import InputField from "#components/InputField/InputField";
// Util Functions
import { getNonProfit } from "#utils/pathUtils";
import passwordRequirements from "#default-data/passwordRequirementsDefault.json";
import accountInfoDefaultData from "#default-data/accountInfoDefaultData.json";

function EditAccount({
  setLoggedIn,
  nav,
  editAccountFetch,
  defaults,
  newAccount,
}) {
  // Constant Variables
  const nonprofit = getNonProfit();

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
   * Handles the editAccount button click
   */
  function editAccountButtonClicked() {
    setSuccessText("");
    setErrorText("");
    const invalid = findValidationErrors();
    if (invalid) {
      setErrorText(invalid);
    } else {
      handleEditAccount();
    }
  }

  /**
   * Handles the actual editAccount request if all fields are valid
   */
  function handleEditAccount() {
    const user = {
      username: username,
      password: password,
      email: email,
    };
    setLoading(true);
    editAccountFetch(nonprofit, user).then(editAccountCallback);
  }

  /**
   * Finds all validation errors
   * @returns string of all validation errors or empty string if no errors
   */
  function findValidationErrors() {
    let errorMessage = "";
    if (password !== passwordCheck) {
      errorMessage += "Passwords do not match. ";
    }
    if (newAccount) {
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
      if (email === "") {
        errorMessage += "Email cannot be empty. ";
      }
    }
    return errorMessage;
  }

  /**
   * Processes the result of the editAccount request
   * @param {object} result - The result of the editAccount request
   */
  function editAccountCallback(result) {
    setLoading(false);
    if (result.valid) {
      setLoggedIn(true);
      setSuccessText(result.data);
      // Navigate to the home page after 2 seconds
      setTimeout(() => {
        setSuccessText("");
        if (newAccount) {
          nav("");
        }
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

  useEffect(() => {}, []);
  return (
    <div className="EditAccount">
      <div className="userInfo">
        <div className="editAccountField">
          <InputField
            obj={{ ...accountInfoDefaultData.username, value: username }}
            setValue={(_, value) => {
              setUsername(value);
            }}
          />
        </div>
        <div className="editAccountField">
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
        <div className="editAccountField">
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
        <div className="editAccountField">
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
        onClick={editAccountButtonClicked}
        text={newAccount ? "Register" : "Save Changes"}
      />
      <p className="errorText">{errorText}</p>
      <p className="successText">{successText}</p>
    </div>
  );
}

export default EditAccount;
