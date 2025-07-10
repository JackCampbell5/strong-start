// Node Module Imports
import React from "react";
import PropTypes from "prop-types";

// Local Imports
import "./Account.css";
// Other Components
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
