// Node Module Imports
import React, { useState } from "react";
import PropTypes from "prop-types";
import { MdOutlineRemoveRedEye, MdRemoveRedEye } from "react-icons/md";

// Local Imports
import "./AccountInfoCheck.css";
// Other Components
import LoadingButton from "#components/LoadingButton/LoadingButton";
// Until Methods
import { loginNonprofitEmployee } from "#utils/fetch/nonprofitEmployeeFetchUtils";
import { getNonProfit } from "#utils/pathUtils";

function AccountInfoCheck({ setUserChecked, userData }) {
  // Constant Variables
  const username = userData.username;
  const nonprofit = getNonProfit();
  // State Variables
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorText, setErrorText] = useState("");

  /**
   * Method that runs when the user clicks the verify button to check the login status. It makes sure the password is not empty and then calls the loginNonprofitEmployee method to check the login status.
   */
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
  /**
   * Callback function that runs when the loginNonprofitEmployee method returns a result. If the result is valid, it sets the userChecked state to true. If the result is not valid, it delivers an error message.
   * @param {object} result - The result object returned from the loginNonprofitEmployee method.
   */
  function passwordCheckCallback(result) {
    setLoading(false);
    if (result.valid) {
      setUserChecked(true);
    } else {
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
        text="Verify"
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
