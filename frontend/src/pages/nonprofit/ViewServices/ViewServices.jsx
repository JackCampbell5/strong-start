import React, { use } from "react";
import ReactDOM from "react-dom";
import { useState, useEffect } from "react";
import "./ViewServices.css";
import PropTypes from "prop-types";

// Other components
import ServiceList from "#components/ServiceList/ServiceList";
// util functions
import { fetchAllServices } from "#fetch/serviceFetchUtils";

function ViewServices({}) {
  const [searchResults, setSearchResults] = useState([]);
  useEffect(() => {
    fetchAllServices().then((results) => {
      setSearchResults(results.data);
    });
  });
  return (
    <div className="ViewServices">
      <h1>All Services</h1>
      <ServiceList data={searchResults} />
    </div>
  );
}

ViewServices.propTypes = {
  // data: PropTypes.func.isRequired,
};

export default ViewServices;
