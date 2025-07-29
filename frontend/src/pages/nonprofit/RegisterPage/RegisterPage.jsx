// Node Module Imports
import React, { useState } from "react";

// Local Imports
import "./RegisterPage.css";
// Other Components
import Register from "#components/Register/Register";
// Util Functions
import { registerNonprofitEmployee } from "#fetch/nonprofitEmployeeFetchUtils";
import { useLocation, useNavigate } from "react-router";
import { createPageNavigator, NpPages } from "#utils/pathUtils";

function RegisterPage({ setLoggedIn, nav }) {
  // Constant Values
  const navigate = useNavigate();
  const location = useLocation();
  const pageNavigator = createPageNavigator(navigate, location);
  const registerFetch = registerNonprofitEmployee;

  /**
   * Navigates to the login page
   */
  function goToLogin() {
    const path = location.pathname;
    const allLocations = path.split("/");
    const ending = allLocations[allLocations.length - 1];
    const newPath = path.replace(ending, NpPages.LOGIN);
    pageNavigator(newPath);
  }
  {
    return (
      <div className="RegisterPage">
        <h1>Register For a New Account</h1>
        <div className="topButtons">
          <button onClick={goToLogin}>Login Instead?</button>
          <button onClick={() => navigate("/")}>Change Nonprofit</button>
        </div>
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
