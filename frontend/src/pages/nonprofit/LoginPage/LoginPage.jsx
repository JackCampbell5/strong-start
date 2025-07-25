// Node Module Imports
import React from "react";

// Local Imports
import "./LoginPage.css";
// Other Components
import Login from "#components/Login/Login";

function LoginPage({ setLoggedIn, nav }) {
  return (
    <div className="LoginPage">
      <h1>Employee Login</h1>
      <Login setLoggedIn={setLoggedIn} nav={nav} />
    </div>
  );
}

export default LoginPage;
