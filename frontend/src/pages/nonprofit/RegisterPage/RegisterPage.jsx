import React from "react";
import ReactDOM from "react-dom";
import "./RegisterPage.css";
import PropTypes from "prop-types";

// Other Components
import Register from "#components/Register/Register";

function RegisterPage({}) {
  {
    return (
      <div className="RegisterPage">
        <h3>Register For a New Account</h3>
        <Register />
      </div>
    );
  }
}

RegisterPage.propTypes = {
  // data: PropTypes.func.isRequired,
};

export default RegisterPage;
