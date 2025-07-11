import React from "react";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

// Local Imports
import "./NewService.css";
// Components
import EditService from "#components/EditService/EditService";
//Util Functions
import { checkEmployeeLoginStatus } from "#fetch/nonprofitEmployeeFetchUtils";
import { getNonProfit } from "#utils/pathUtils";

function NewService() {
  // Constant Variables
  const nonprofit = getNonProfit();
  // State Variables
  const [errorText, setErrorText] = useState("");

  useEffect(() => {
    checkEmployeeLoginStatus(nonprofit).then((result) => {
      if (result.valid) {
        if (!result.data) {
          setErrorText("No user signed in, please sign in to add a service");
        }
      } else {
        setErrorText(result.error);
      }
    });
  }, []);
  return (
    <div className="NewService">
      <h1>Create a New Service</h1>
      <p className="errorText">{errorText}</p>
      <EditService />
    </div>
  );
}

export default NewService;
