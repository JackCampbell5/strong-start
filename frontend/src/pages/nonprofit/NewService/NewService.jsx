import React from "react";
import ReactDOM from "react-dom";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./NewService.css";

// Components
import EditService from "#components/EditService/EditService";

//util functions
import { testLoginNonprofitEmployee } from "#fetch/nonprofitEmployeeFetchUtils";
import { getNonProfit } from "#utils/pathUtils";

function NewService() {
  const nonprofit = getNonProfit();
  const [errorText, setErrorText] = useState("");

  useEffect(() => {
    testLoginNonprofitEmployee(nonprofit).then((result) => {
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
