import React from "react";
import ReactDOM from "react-dom";
import "./Account.css";
import PropTypes from "prop-types";
import AccountInfoChange from "#components/AccountInfoChange/AccountInfoChange";

function Account({}) {
  return (
    <div className="Account">
      <h3>Account</h3>
      <AccountInfoChange />
    </div>
  );
}

Account.propTypes = {
  // data: PropTypes.func.isRequired,
};

export default Account;
