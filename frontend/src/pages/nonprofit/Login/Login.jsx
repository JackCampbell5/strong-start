import React from "react";
import ReactDOM from "react-dom";
import "./Login.css";
import PropTypes from "prop-types";
import Register from "#components/Register/Register";
import SignIn from "#components/SignIn/SignIn";

function Login({}) {
  return (
    <div className="Login">
      <h3>Login</h3>
      <Register />
      <SignIn />
    </div>
  );
}

Login.propTypes = {
  // data: PropTypes.func.isRequired,
};

export default Login;
