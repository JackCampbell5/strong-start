// Node Module Imports
import React, { useState } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { MdOutlineRemoveRedEye, MdRemoveRedEye } from "react-icons/md";

// Local Imports
import "./AccountInfoCheck.css";
import { loginNonprofitEmployee } from "#utils/fetch/nonprofitEmployeeFetchUtils";
import { getNonProfit } from "#utils/pathUtils";
import LoadingButton from "#components/LoadingButton/LoadingButton";

function AccountInfoCheck({ setUserChecked, userData }) {
  // Constant Variables
  const username = userData.username;
  const nonprofit = getNonProfit();
  // State Variables
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorText, setErrorText] = useState("");

  function handlePasswordCheck() {
    setErrorText("");
    if (password === "") {
      setErrorText("Password cannot be empty");
      return;
    }
    setLoading(true);
    loginNonprofitEmployee(nonprofit, username, password).then(
      passwordCheckCallback
    );
  }

  function passwordCheckCallback(result) {
    setLoading(false);
    if (result.valid) {
      setUserChecked(true);
    } else {
      setUserChecked(false);
      setErrorText(result.error);
    }
  }
  return (
    <div className="AccountInfoCheck">
      <h3>Verify password to modify account settings </h3>
      <p>
        Username: <strong>{username}</strong>
      </p>
      <div className="passwordField">
        <p>Password:</p>
        <input
          className="password"
          type={showPassword ? "text" : "password"}
          value={password}
          placeholder="password"
          autoComplete="current-password"
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
      <LoadingButton
        loading={loading}
        onClick={handlePasswordCheck}
        text="Log In"
      />
      <p className="errorText">{errorText}</p>
    </div>
  );
}

AccountInfoCheck.propTypes = {
  setUserChecked: PropTypes.func.isRequired,
  userData: PropTypes.object.isRequired,
};

export default AccountInfoCheck;
