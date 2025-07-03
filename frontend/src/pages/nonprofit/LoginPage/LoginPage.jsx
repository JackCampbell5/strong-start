import React from "react";
import ReactDOM from "react-dom";
import "./LoginPage.css";
import PropTypes from "prop-types";
import Register from "#components/Register/Register";
import Login from "#components/Login/Login";

function LoginPage({}) {
  return (
    <div className="LoginPage">
      <h1>Login Page</h1>
      <Login />
    </div>
  );
}

LoginPage.propTypes = {
  // data: PropTypes.func.isRequired,
};

export default LoginPage;
