// Node Module Imports
import React from "react";
import { useState, useEffect } from "react";

// Local Imports
import "./AllServices.css";
// Other Components
import ServiceList from "#components/ServiceList/ServiceList";
// Util Functions
import { fetchAllServices } from "#fetch/serviceFetchUtils";
import { getNonProfit } from "#utils/pathUtils";

function AllServices() {
  // Constant Variables
  let nonprofit = getNonProfit();

  // State Variables
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
  }, []);
  return (
    <div className="ViewServices">
      <h1>All Services</h1>
      <ServiceList data={searchResults} />
      <p className="errorText">{errorText}</p>
    </div>
  );
}
export default AllServices;
