import React, { use } from "react";
import ReactDOM from "react-dom";
import { useState, useEffect } from "react";
import "./ViewServices.css";
import PropTypes from "prop-types";

// Other components
import ServiceList from "#components/ServiceList/ServiceList";
// util functions
import { fetchAllServices } from "#fetch/serviceFetchUtils";
import { getNonProfit } from "#utils/pathUtils";

function ViewServices() {
  let nonprofit = getNonProfit();
  const [searchResults, setSearchResults] = useState([]);
  const [errorText, setErrorText] = useState("");
  useEffect(() => {
    fetchAllServices(nonprofit).then((results) => {
      if (results.valid) {
        setErrorText("");
        setSearchResults(results.data);
      } else {
        setErrorText(results.error);
      }
    });
  });
  return (
    <div className="ViewServices">
      <h1>All Services</h1>
      <ServiceList data={searchResults} />
      <p className="errorText">{errorText}</p>
    </div>
  );
}

export default ViewServices;
