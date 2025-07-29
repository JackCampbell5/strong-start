// Node Module Imports
import React, { useState } from "react";

// Local Imports
import "./RegisterPage.css";
// Other Components
import Register from "#components/Register/Register";
// Util Functions
import { registerNonprofitEmployee } from "#fetch/nonprofitEmployeeFetchUtils";

function RegisterPage({ setLoggedIn, nav }) {
  const registerFetch = registerNonprofitEmployee;
  {
    return (
      <div className="RegisterPage">
        <h1>Register For a New Account</h1>
        <Register
          setLoggedIn={setLoggedIn}
          nav={nav}
          registerFetch={registerFetch}
        />
      </div>
    );
  }
}

export default RegisterPage;
