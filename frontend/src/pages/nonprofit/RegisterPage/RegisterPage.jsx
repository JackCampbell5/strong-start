// Node Module Imports
import React from "react";

// Local Imports
import "./RegisterPage.css";
// Other Components
import Register from "#components/Register/Register";

function RegisterPage({ setLoggedIn }) {
  {
    return (
      <div className="RegisterPage">
        <h1>Register For a New Account</h1>
        <Register setLoggedIn={setLoggedIn} />
      </div>
    );
  }
}

export default RegisterPage;
